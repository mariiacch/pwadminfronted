import { createContext, useReducer,useEffect } from "react"
import AuthReducer from "./AuthReducer"
//estado inicial
const INITIAL_STATE={
    user:null,
    isFetching: false,
    error:false,

}

//creo el context
export const AuthContext = createContext(INITIAL_STATE)

//Creo el wrapper de toda la app
export const AuthContextProvider=({children})=>{

    //hook useReducer
  const [state, dispatch] = useReducer(AuthReducer, INITIAL_STATE)

 useEffect(()=>{
    localStorage.setItem("user", JSON.stringify(state.user))
  },[state.user])

 return(
     <AuthContext.Provider value={{
         user:state.user,
         isFetching: state.isFetching, 
         error:state.error,
         dispatch
     }}>
         {children}
     </AuthContext.Provider>
 )
}