//import { axiosInstance } from "../../config";

//import { axiosInstance } from "../../config";
import axios from "axios"

//login
export const loginCall = async (userCredential, dispatch) => {
  dispatch({ type: "LOGIN_START" });
  try {
    const res = await axios.post("/auth/login", userCredential);
    dispatch({ type: "LOGIN_SUCCESS", payload: res.data });
    console.log(dispatch);
    
  } catch (err) {
    dispatch({ type: "LOGIN_FAILURE", payload: err });
    console.log(err);
  }
};

//logout
export  const logoutCall= (dispatch)=>{
  dispatch({ type: "LOG_OUT" });

  
}

//actualizar usuario
  
//http://localhost:8800/api/users/:id