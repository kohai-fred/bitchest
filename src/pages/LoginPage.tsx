import {
  Box,
  Button,
  CircularProgress,
  Container,
  FormGroup,
  FormHelperText,
  TextField,
  Typography,
  useTheme,
} from "@mui/material";
import RequireAuth from "@src/auth/RequireAuth";
import axiosInstance from "@src/services/axiosInstance";
import { UserType } from "@src/types/user.type";
import { getUserCookies, setUserCookies } from "@src/utils/cookiesUser";
import { useQuery } from "@tanstack/react-query";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import ImageText from "@src/assets/text_150.png";
import { useSnackbar } from "notistack";

type FormValues = {
  email: string;
  password: string;
};

const RULES = {
  email: {
    pattern: {
      value: /^[a-zA-Z0-9.+_-]+@[a-zA-Z0-9-_]+\.[a-zA-Z]{2,10}$/,
      message: "L'email n'est pas valid",
    },
  },
  password: {
    pattern: {
      value: /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{8,}$/,
      message:
        "8 caract. min. et au moins 1 chiffre, 1 minuscule et 1 majuscule",
    },
  },
};

async function getUser(payload: string) {
  const [res, status, message] = await axiosInstance({
    url: "/login",
    data: JSON.parse(payload),
    method: "post",
  });
  if (status) throw new Error(message);
  setUserCookies(res.user as UserType);
  return res;
}
const LoginPage = () => {
  const theme = useTheme();
  const { enqueueSnackbar } = useSnackbar();
  const user = getUserCookies();
  const [formData, setFormData] = useState("");
  const { data, isError, error, isFetching, isLoading } = useQuery({
    queryKey: ["login", formData],
    queryFn: () => getUser(formData),
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
                  label="Email"
                  type="email"
                  {...register("email", {
                    ...RULES.email,
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
                    ...RULES.password,
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
