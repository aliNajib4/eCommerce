import { SubmitHandler, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { signInSchema, TInputs } from "@validation/signin";
import { useNavigate, useSearchParams } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "@store/hooks";
import { actSignIn, cleanUp } from "@store/auth/authSlice";
import { useEffect } from "react";

const useSignup = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<TInputs>({
    resolver: zodResolver(signInSchema),
    mode: "onBlur",
  });

  const dispatch = useAppDispatch();
  const [searchParams, setSearchParams] = useSearchParams();
  const navigate = useNavigate();
  const { loading, error } = useAppSelector((state) => state.auth);

  const submitForm: SubmitHandler<TInputs> = (data) => {
    dispatch(actSignIn(data))
      .unwrap()
      .then(() => navigate("/"));
  };

  const handleCllickSubmit = () => {
    if (searchParams.get("massage")) setSearchParams("");
  };

  useEffect(
    () => () => {
      dispatch(cleanUp());
    },
    [dispatch],
  );
  return {
    searchParams,
    handleSubmit,
    submitForm,
    errors,
    register,
    loading,
    handleCllickSubmit,
    error,
  };
};

export default useSignup;
