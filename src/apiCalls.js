//import { axiosInstance } from "../../config";

//import { axiosInstance } from "../../config";
import axios from "axios"

//login
//http://localhost:8800/api/auth/login
  //  if(passwordAgain.current.value !== password.current.value){
   //     passwordAgain.current.setCustomValidity("No coinciden las contraseñas!")
export const loginCall = async (userCredential, dispatch) => {
  dispatch({ type: "LOGIN_START" });
  
  try {
    const res = await axios.post("https://pwadmin.herokuapp.com/api/auth/login", userCredential);
    dispatch({ type: "LOGIN_SUCCESS", payload: res.data });
    console.log(dispatch);
    
  } catch (err) {
    dispatch({ type: "LOGIN_FAILURE", payload: err });
    console.log(err);
    console.log(' no coinciden los datos')
  }
};

//logout
export  const logoutCall= (dispatch)=>{
  dispatch({ type: "LOG_OUT" });

  
}

//actualizar usuario
  
//http://localhost:8800/api/users/:id