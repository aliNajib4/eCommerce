import Button from "@mui/material/Button";
import Box from "@mui/material/Box";
import Container from "@mui/material/Container";
import Grid from "@mui/material/Grid";
import { SubmitHandler, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { signInSchema, TInputs } from "@validation/signin";
import { Input } from "@components/index";

const SignIn = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<TInputs>({
    resolver: zodResolver(signInSchema),
    mode: "onBlur",
  });

  const submitForm: SubmitHandler<TInputs> = (data) => {
    console.log(data);
  };

  return (
    <Container
      component="div"
      maxWidth="xs"
      sx={{
        marginTop: 8,
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
      }}
    >
      <Box component="form" onSubmit={handleSubmit(submitForm)}>
        <Grid container spacing={2}>
          <Grid item xs={12}>
            <Input
              label="email"
              name="email"
              error={errors?.email?.message as string}
              register={register}
            />
          </Grid>
          <Grid item xs={12}>
            <Input
              label="Password"
              name="password"
              error={errors?.password?.message as string}
              register={register}
              type="password"
            />
          </Grid>
        </Grid>
        <Button
          type="submit"
          fullWidth
          variant="contained"
          sx={{ mt: 3, mb: 2 }}
        >
          sign up
        </Button>
      </Box>
    </Container>
  );
};

export default SignIn;
