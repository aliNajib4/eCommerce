import Button from "@mui/material/Button";
import Box from "@mui/material/Box";
import Container from "@mui/material/Container";
import Grid from "@mui/material/Grid";
import Alert from "@mui/material/Alert";
import { Input } from "@components/index";
import useSignin from "@hooks/useSignin";

const SignIn = () => {
  const {
    searchParams,
    handleSubmit,
    submitForm,
    errors,
    register,
    loading,
    handleCllickSubmit,
    error,
  } = useSignin();

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
      {searchParams.get("massage") && (
        <Alert
          severity="success"
          variant="outlined"
          sx={{ mb: 5, fontSize: 16 }}
        >
          {searchParams.get("massage") === "Account_created_successfully"
            ? "account created successfully, please sign in"
            : searchParams.get("massage") === "Please_signin" &&
              "you need to sign in, please sign in"}
        </Alert>
      )}
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
          disabled={loading === "pending"}
          onClick={handleCllickSubmit}
        >
          sign in
        </Button>
        {error && <Alert severity="error">{error}</Alert>}
      </Box>
    </Container>
  );
};

export default SignIn;
