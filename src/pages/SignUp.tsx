import Button from "@mui/material/Button";
import Box from "@mui/material/Box";
import Container from "@mui/material/Container";
import Grid from "@mui/material/Grid";
import { SubmitHandler, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { signUpSchema, TInputs } from "@validation/signup";
import { Input } from "@components/index";
import useCheckEmail from "@hooks/useCheckEmail";

const SignUp = () => {
  const {
    register,
    handleSubmit,
    trigger,
    getFieldState,
    formState: { errors },
  } = useForm<TInputs>({
    resolver: zodResolver(signUpSchema),
    mode: "onBlur",
  });

  const { emailStatus, enteredEmail, checkEmail, resetCheckEmail } =
    useCheckEmail();

  const submitForm: SubmitHandler<TInputs> = (data) => {
    console.log(data);
  };
  const onBlurEmail = async (e: React.FocusEvent<HTMLInputElement>) => {
    const value = e.target.value;
    await trigger("email");
    const { isDirty, invalid } = getFieldState("email");

    if (isDirty && !invalid && enteredEmail !== value) {
      checkEmail(value);
    }

    if (isDirty && invalid && enteredEmail) {
      resetCheckEmail();
    }
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
          <Grid item xs={12} sm={6}>
            <Input
              label="First Name"
              name="firstName"
              error={errors?.firstName?.message as string}
              register={register}
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <Input
              label="Last Name"
              name="lastName"
              error={errors?.lastName?.message as string}
              register={register}
            />
          </Grid>
          <Grid item xs={12}>
            <Input
              label="email"
              name="email"
              register={register}
              onBlur={onBlurEmail}
              error={
                (errors?.email?.message as string)
                  ? errors?.email?.message
                  : emailStatus === "notAvailable"
                    ? "This email is already in use."
                    : emailStatus === "failed"
                      ? "Error from the server."
                      : ""
              }
              formText={emailStatus === "checking" ? "checking..." : ""}
              success={
                emailStatus === "available"
                  ? "This email is available for use."
                  : ""
              }
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
          <Grid item xs={12}>
            <Input
              label="Confim Password"
              name="confim_password"
              error={errors?.confim_password?.message as string}
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
          disabled={emailStatus === "checking"}
        >
          sign up
        </Button>
      </Box>
    </Container>
  );
};

export default SignUp;
