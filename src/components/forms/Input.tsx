import TextField from "@mui/material/TextField";
import { FieldValues, Path, UseFormRegister } from "react-hook-form";

type TInputsProps<TFieldValue extends FieldValues> = {
  label: string;
  name: Path<TFieldValue>;
  type?: string;
  register: UseFormRegister<TFieldValue>;
  error: string;
  onBlur?: (e: React.FocusEvent<HTMLInputElement>) => void;
  formText?: string;
  success?: string;
};

const Input = <TFieldValue extends FieldValues>({
  label,
  name,
  type = "text",
  register,
  error,
  onBlur,
  formText,
  success,
}: TInputsProps<TFieldValue>) => {
  const onBlurHandler = (e: React.FocusEvent<HTMLInputElement>) => {
    if (onBlur) {
      onBlur(e);
      register(name).onBlur(e);
    } else {
      register(name).onBlur(e);
    }
  };
  return (
    <TextField
      fullWidth
      label={label}
      {...register(name)}
      error={error ? true : false}
      type={type}
      onBlur={onBlurHandler}
      helperText={formText ? formText : error ? error : success}
      color={error ? "error" : success ? "success" : "primary"}
    />
  );
};

export default Input;
