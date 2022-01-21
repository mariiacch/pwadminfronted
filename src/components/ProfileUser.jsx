
import { useState, useEffect } from "react"
import axios from "axios";
import { useParams } from 'react-router';
import { GlobalStyles } from '../styles/GlobalStyles';
import { useContext, useRef } from 'react';
import { AuthContext } from '../context/AuthContext';
//import { axiosInstance } from "../../../config";


export default function ProfileUser() {
  
    const { user}= useContext(AuthContext)
//console.log(currentUser)
//const { user: currentUser, dispatch } = useContext(AuthContext);

//defino la variable con useparams
const username= useParams().username;
const id= useParams()._id;


//estado del user2 put:
const [unUser, setUsuario] = useState([]);

//console.log(unUser)
const bunUser={...unUser};
console.log(bunUser.username)


// peticion get usuarios:
useEffect(() => {
    const fetchUser = async () => {
        const res = await axios.get(`https://pwadmin.herokuapp.com/users?username=${username}`);
        setUsuario(res.data);
        //dispatch({ type: "CURRENT_USER", payload: res.data });
        //console.log(dispatch)
      };
    fetchUser();
    
    },[])

  //console.log(unUser);*/

  //console.log(unUser)
//Estado del usuario para actualizarlo
const [usuario,setUser]= useState({
    
    username:'currentUser.username',
    names:'mariatest6',
    apellidos:'alvares carrero',
    cedula:'26841896',
    contacto:'04247523183',
    userId:'619d8c12b8ce9a684fd02b14'

});
//console.log(nameUser)

//funcion para manejar el cambio del estado de usuario
const handleChange=(e)=>{
    console.log(e.target.name, e.target.value);
    setUser({...usuario,[e.target.name]:e.target.value})

}


//estado del user2 put:
const [userPut,setUserPut]= useState([]);

//console.log(userPut)




//useref de registro
    const nombreUser= useRef();
    const nombresUser= useRef();
    const apellidos= useRef();
    const cedula = useRef(); 
    const contact = useRef();
    const userId = useRef();


    //funcion editar put users
const handleClick= async e =>{
    e.preventDefault();

    const putUser={
        nombreUser:nombreUser.current.value,
        nombresUser:nombresUser.current.value,
        apellidos:apellidos.current.value,
        cedula:cedula.current.value,
        contact:contact.current.value,
        userId:userId.current.value,
    }
    
    try{
        
    const res= await axios.put(
        `https://pwadmin.herokuapp.com/api/users?id=${id}`, putUser)
    
    setUserPut(res.data);
    //dispatch({ type: "LOGIN_SUCCESS", payload: res.data });
//console.log(setUser)
   
}catch(err){
        console.log(err)
    }

    
}


    return (

        <>
        <GlobalStyles/>
           <div className="Register">
               <div className="RegisterWrapper">

               <div className="RegisterLeft">
             <div className="ProfileUserWrap">
                    <div className="imgPerfil" >
                    
                    <svg className="imgPerfil" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M5.121 17.804A13.937 13.937 0 0112 16c2.5 0 4.847.655 6.879 1.804M15 10a3 3 0 11-6 0 3 3 0 016 0zm6 2a9 9 0 11-18 0 9 9 0 0118 0z" /></svg> 
                    </div>
                </div>  

                    <h3 className="loginLogo">
                        PWADMIN 
                        <span className='loginAster'>*</span>
                    </h3>
                    <span className="loginDesc">
                        Perfil del usuario {user.username}
                    </span>

                    
                    
                    
                </div>
           
            <div className="RegisterRight">
            
            
            <div   className="loginBox" >
                        
          
                       
                            <span className=" loginInput bg-grey" >
                                <b>Nombres&nbsp;</b> {user.nombres}
                             </span>
                        
                        
                            <span className=" loginInput bg-grey" >
                            <b>Apellidos &nbsp;</b> {user.apellidos}
                            </span>
    
                            <span className=" loginInput bg-grey" >
                                <b>Email &nbsp;</b> {user.email}
                            </span>

                      
                        <span  className="loginInput bg-grey">
                            <b>Cedula &nbsp;</b> {user.cedula}
                            </span>

                            <span  className=" loginInput bg-grey">
                            <b>Contacto &nbsp;</b> {user.contact}
                            </span>

                   

                       

                        
                        

                    </div>                     
                    
                  
                 

                    </div>
                
                    </div>  
                    </div> 
                
        </>
    )
}

/*

<span >
                        Nombres {user.nombres}
                    </span>
                    
                    <span >
                        Apellidos {user.apellidos}
                    </span>
                    <span >
                        Email {user.email}
                    </span>
                    <span >
                        Cedula {user.cedula}
                    </span>
*/