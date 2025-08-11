import { use } from "react";
import { AuthContext } from "../../Components/Context/AuthContext/AuthContext";

const useAuth = () => {
  return use(AuthContext);
};

export default useAuth;
