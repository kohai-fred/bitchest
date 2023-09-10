import {
  Box,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  FormControl,
  FormGroup,
  FormHelperText,
  InputLabel,
  MenuItem,
  Select,
  TextField,
} from "@mui/material";
import { USER_ROLE } from "@src/constants/userRoles";
import {
  createUser,
  emailIsAlreadyTaken,
  updateUser,
} from "@src/services/users";
import { UserType } from "@src/types/user.type";
import { getUserCookies } from "@src/utils/cookiesUser";
import {
  MESSAGE_EMAIL_IS_TAKEN,
  USER_FORM_RULES,
} from "@src/validation/userFormRules";
import { useQuery } from "@tanstack/react-query";
import { useSnackbar } from "notistack";
import { useEffect, useState } from "react";
import { Controller, useForm } from "react-hook-form";

type ModalProps = {
  open: boolean;
  userEdit: null | UserType;
  setOpen: (close: false) => void;
  refetch: () => void;
};

export type FormValuesUser = Omit<
  UserType,
  "created_at" | "updated_at" | "email_verified_at" | "id" | "token"
> & { id?: number; password?: string };

const initialUser: FormValuesUser = {
  firstname: "",
  lastname: "",
  email: "",
  role: "client",
  password: "",
  presentation: "",
};

const ModalUserForm = ({ open, userEdit, setOpen, refetch }: ModalProps) => {
  const isEdit = !!userEdit;
  const user = !userEdit ? { ...initialUser } : { ...userEdit, password: "" };
  const connectedUser = getUserCookies();
  const [formData, setFormData] = useState(user);
  const [isEmailExist, setIsEmailExist] = useState(false);
  const [makeRequest, setMakeRequest] = useState(false);
  const { enqueueSnackbar } = useSnackbar();
  const role = getUserCookies()?.role;

  const queryFunction = formData.id ? updateUser : createUser;
  const { isError, error, isFetching, isFetched, isSuccess, remove } = useQuery(
    {
      queryKey: ["create_user"],
      queryFn: () => queryFunction(formData),
      enabled: makeRequest,
      staleTime: Infinity,
      refetchOnWindowFocus: false,
      retry: false,
    }
  );

  const {
    register,
    handleSubmit,
    formState: { errors },
    control,
    reset,
  } = useForm<FormValuesUser>({
    defaultValues: {
      ...formData,
    },
  });

  const formSubmit = async (formValue: FormValuesUser) => {
    if (isEmailExist) return;
    if (connectedUser?.id !== user.id && isEdit) {
      delete formValue.password;
    }
    setFormData(formValue);
    setMakeRequest(true);
    clearForm();
  };

  async function checkEmail(email: string) {
    if (!email) {
      setIsEmailExist(false);
      return;
    }

    const mail = await emailIsAlreadyTaken(email);

    if (userEdit) {
      if (mail.exists) {
        setIsEmailExist(userEdit.email !== mail.email);
      } else {
        setIsEmailExist(false);
      }
      return;
    }

    setIsEmailExist(() => mail.exists);
  }

  function clearForm() {
    setFormData(() => ({ ...initialUser }));
    reset();
    setIsEmailExist(() => false);
  }

  const handleClose = () => {
    clearForm();
    setOpen(false);
  };

  useEffect(() => {
    if (!isError) return;
    setMakeRequest(false);
    enqueueSnackbar(`Une erreur est survenue : ${(error as Error).message}`, {
      variant: "error",
    });
    handleClose();
  }, [isError]);

  useEffect(() => {
    if (!isSuccess) return;
    const message = !userEdit
      ? `L'utilisateur : ${formData.firstname} ${formData.lastname} a bien été créé !`
      : "Modification réussi";

    enqueueSnackbar(message, {
      variant: "success",
    });
    refetch();
    remove();
    handleClose();
  }, [isSuccess, formData]);
  return (
    <Dialog open={open} onClose={handleClose}>
      <DialogTitle>
        {userEdit
          ? `Mettre à jour ${userEdit.firstname} ${userEdit.lastname}`
          : "Créer un nouvel utilisateur"}
      </DialogTitle>
      <DialogContent>
        <DialogContentText>
          Attention tous les champs sont obligatoire.
        </DialogContentText>
        <Box
          component="form"
          mt={2}
          sx={{ display: "flex", flexDirection: "column", gap: 4 }}
          onSubmit={handleSubmit(formSubmit)}
          noValidate
          id="modal_form"
        >
          <FormGroup>
            <TextField
              autoFocus
              label="Email"
              type="email"
              {...register("email", {
                ...USER_FORM_RULES.email,
                required: "l'email est obligatoire",
              })}
              onBlur={(event) => checkEmail(event.target.value)}
              defaultValue={formData.email}
            />
            <FormHelperText sx={{ color: "red" }}>
              {errors.email?.message}
              {isEmailExist ? MESSAGE_EMAIL_IS_TAKEN : ""}
            </FormHelperText>
          </FormGroup>
          {(!isEdit || connectedUser?.id === user.id) && (
            <FormGroup>
              <TextField
                label="Mot de passe"
                type="password"
                id="password"
                {...register("password", {
                  ...USER_FORM_RULES.password,
                  required: "le mot de passe est obligatoire",
                })}
              />
              <FormHelperText sx={{ color: "red" }}>
                {errors.password?.message}
              </FormHelperText>
            </FormGroup>
          )}
          <FormGroup>
            <TextField
              label="Prénom"
              type="text"
              id="firstname"
              {...register("firstname", {
                ...USER_FORM_RULES.name,
                required: "le prénom est obligatoire",
              })}
              defaultValue={formData.firstname}
            />
            <FormHelperText sx={{ color: "red" }}>
              {errors.firstname?.message}
            </FormHelperText>
          </FormGroup>
          <FormGroup>
            <TextField
              label="Nom"
              type="text"
              id="lastname"
              {...register("lastname", {
                ...USER_FORM_RULES.name,
                required: "le nom est obligatoire",
              })}
              defaultValue={formData.lastname}
            />
            <FormHelperText sx={{ color: "red" }}>
              {errors.lastname?.message}
            </FormHelperText>
          </FormGroup>
          {role === "admin" && (
            <Controller
              name="role"
              control={control}
              render={({ field: { onChange, value } }) => (
                <FormControl fullWidth>
                  <InputLabel id="user-role-label">Role</InputLabel>
                  <Select
                    labelId="user-role-label"
                    id="user-role"
                    value={value}
                    label="role"
                    onChange={(newValue) => onChange(newValue)}
                    defaultValue={userEdit ? formData.role : USER_ROLE[0]}
                  >
                    {USER_ROLE.map((role) => (
                      <MenuItem value={role} key={crypto.randomUUID()}>
                        {role}
                      </MenuItem>
                    ))}
                  </Select>
                </FormControl>
              )}
            />
          )}
          <FormGroup>
            <TextField
              label="Présentation"
              multiline
              id="presentation"
              {...register("presentation", {
                maxLength: {
                  value: 200,
                  message: "Maximum 200 caractères",
                },
              })}
              placeholder="Maximum 200 caractères"
              defaultValue={formData.presentation}
            />
            <FormHelperText sx={{ color: "red" }}>
              {errors.presentation?.message}
            </FormHelperText>
          </FormGroup>
        </Box>
      </DialogContent>
      <DialogActions>
        {!userEdit && (
          <Button variant="outlined" type="button" onClick={clearForm}>
            Reset
          </Button>
        )}
        <Button
          variant="outlined"
          type="submit"
          form="modal_form"
          sx={{
            color: "customColors.bitchest.main",
            borderColor: "customColors.bitchest.main",
            "&:hover": {
              borderColor: "customColors.bitchest.main",
            },
          }}
        >
          {userEdit ? "Mettre à jour" : "Créer"}
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default ModalUserForm;
