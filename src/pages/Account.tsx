import { useAppSelector } from "@store/hooks";

const Account = () => {
  const {
    user: { email, firstName, lastName },
  } = useAppSelector((state) => state.auth);
  return (
    <div>
      <div>
        name: {firstName} {lastName}
      </div>
      <div>email: {email}</div>
    </div>
  );
};

export default Account;
