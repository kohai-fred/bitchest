import {
  Box,
  Button,
  Container,
  FormGroup,
  FormHelperText,
  TextField,
  Typography,
} from "@mui/material";
import RequireAuth from "@src/auth/RequireAuth";
import axiosInstance from "@src/services/axiosInstance";
import { UserType } from "@src/types/user.type";
import { getUserCookies, setUserCookies } from "@src/utils/cookiesUser";
import { useQuery } from "@tanstack/react-query";
import { useState } from "react";
import { useForm } from "react-hook-form";

type FormValues = {
  email: string;
  password: string;
};

const RULES = {
  email: {
    pattern: {
      value: /^[a-zA-Z0-9.+_-]+@[a-zA-Z0-9-_]+\.[a-zA-Z]{2,10}$/,
      message: "format email is not valid",
    },
  },
  password: {
    pattern: {
      value: /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{8,}$/,
      message:
        "8 characters min. which contain at least one numeric digit, one uppercase and one lowercase letter ",
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
  console.log("🆘 GET USER", res);
  setUserCookies(res.user as UserType);
  return res;
}
const LoginPage = () => {
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

  return (
    <RequireAuth>
      {!user && !data?.user && (
        <Container
          sx={{ display: "grid", placeContent: "center", height: "60vh" }}
        >
          <Box
            sx={{
              border: "1px solid",
              borderColor: "ActiveBorder",
              p: 2,
            }}
          >
            <Typography variant="h4">Bienvenue sur </Typography>
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

              <Button type="submit" variant="outlined" size="large">
                Se connecter
              </Button>
            </Box>
            {isFetching && <p>Fetching</p>}
            {isLoading && <p>Loading</p>}
            {isError && <p>{(error as Error).message}</p>}
            {data && <p>{data.user?.role}</p>}
          </Box>
        </Container>
      )}
    </RequireAuth>
  );
};

export default LoginPage;
