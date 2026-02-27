import { useContext } from "react";
import { AuthContext } from "../ContextAPI/AuthContext";

const UseAuth = () => {
    return useContext(AuthContext);
};

export default UseAuth;