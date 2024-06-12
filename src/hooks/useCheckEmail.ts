import axios from "axios";
import { useState } from "react";

type TStatus = "idle" | "checking" | "available" | "notAvailable" | "failed";

const useCheckEmail = () => {
  const [emailStatus, setEmailStatus] = useState<TStatus>("idle");
  const [enteredEmail, setEnteredEmail] = useState<string | null>("");

  const checkEmail = async (email: string) => {
    setEmailStatus("checking");
    setEnteredEmail(email);
    await axios
      .get(`/users?email=${email}`)
      .then((res) => res.data)
      .then((data) => {
        if (data.length > 0) {
          setEmailStatus("notAvailable");
        } else {
          setEmailStatus("available");
        }
      })
      .catch(() => {
        setEmailStatus("failed");
      });
  };
  const resetCheckEmail = () => {
    setEmailStatus("idle");
    setEnteredEmail(null);
  };
  return { emailStatus, enteredEmail, checkEmail, resetCheckEmail };
};
export default useCheckEmail;
