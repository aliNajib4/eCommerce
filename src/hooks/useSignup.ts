import { SubmitHandler, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { signUpSchema, TInputs } from "@validation/signup";
import useCheckEmail from "@hooks/useCheckEmail";
import { useAppDispatch, useAppSelector } from "@store/hooks";
import { actSignUp } from "@store/auth/authSlice";
import { useNavigate } from "react-router-dom";

const useSignup = () => {
  const dispatch = useAppDispatch();
  const Navigate = useNavigate();
  const { loading, error } = useAppSelector((state) => state.auth);

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
    dispatch(actSignUp(data))
      .unwrap()
      .then(() => Navigate("/signin?massage=Account_created_successfully"));
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
  return {
    handleSubmit,
    submitForm,
    errors,
    register,
    onBlurEmail,
    emailStatus,
    loading,
    error,
  };
};

export default useSignup;
