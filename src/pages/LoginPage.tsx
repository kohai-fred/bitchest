import {
  Box,
  Button,
  CircularProgress,
  Container,
  FormGroup,
  FormHelperText,
  TextField,
  Typography,
} from "@mui/material";
import ImageText from "@src/assets/text_150.png";
import RequireAuth from "@src/auth/RequireAuth";
import { authenticateUser } from "@src/services/authenticateUser";
import { getUserCookies } from "@src/utils/cookiesUser";
import { USER_FORM_RULES } from "@src/validation/userFormRules";
import { useQuery } from "@tanstack/react-query";
import { useSnackbar } from "notistack";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";

type FormValues = {
  email: string;
  password: string;
};

const LoginPage = () => {
  const { enqueueSnackbar } = useSnackbar();
  const user = getUserCookies();
  const [formData, setFormData] = useState("");

  const { data, isError, error, isFetching, isLoading } = useQuery({
    queryKey: ["login"],
    queryFn: () => authenticateUser(formData),
    enabled: !!formData,
    staleTime: Infinity,
    refetchOnWindowFocus: false,
    retry: false,
  });

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormValues>();

  const formSubmit = async (formValue: FormValues) => {
    setFormData(JSON.stringify(formValue));
  };

  useEffect(() => {
    if (!isError) return;
    const err = error as Error;
    if (err.message) enqueueSnackbar(err.message, { variant: "error" });
  }, [isError]);

  return (
    <RequireAuth>
      {!user && !data?.user && (
        <Container
          sx={{ display: "grid", placeContent: "center", height: "80vh" }}
        >
          <Box
            sx={{
              border: "1px solid",
              borderColor: "customColors.bitchest.light",
              p: 3,
              width: "clamp(330px, 50vw, 500px)",
            }}
          >
            <Typography variant="h4">Bienvenue sur </Typography>
            <img src={ImageText} alt="nom du site : Bitchest" />
            <Box
              component="form"
              mt={8}
              sx={{ display: "flex", flexDirection: "column", gap: 4 }}
              onSubmit={handleSubmit(formSubmit)}
              noValidate
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
                >
                  Email
                </TextField>
                <FormHelperText sx={{ color: "red" }}>
                  {errors.email?.message}
                </FormHelperText>
              </FormGroup>
              <FormGroup>
                <TextField
                  label="Mot de passe"
                  type="password"
                  id="password"
                  {...register("password", {
                    ...USER_FORM_RULES.password,
                    required: "le mot de passe est obligatoire",
                  })}
                >
                  Mot de passe
                </TextField>
                <FormHelperText sx={{ color: "red" }}>
                  {errors.password?.message}
                </FormHelperText>
              </FormGroup>
              <Button
                type="submit"
                variant="outlined"
                size="large"
                sx={{
                  color: "customColors.bitchest.light",
                  borderColor: "customColors.bitchest.light",
                }}
              >
                Se connecter
                <CircularProgress
                  size={12}
                  sx={{
                    ml: 2,
                    color: isFetching ? "var(--bitchest-main)" : "transparent",
                  }}
                />
              </Button>
            </Box>
          </Box>
        </Container>
      )}
    </RequireAuth>
  );
};

export default LoginPage;
