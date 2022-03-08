import React from 'react'
import { useContext, useRef } from 'react';
import { AuthContext } from '../context/AuthContext';
import { GlobalStyles } from '../styles/GlobalStyles';
import { useNavigate } from 'react-router';
//import { axiosInstance } from '../../../config';
import axios from "axios"

export default function Register() {
    const navigate= useNavigate();
    const username= useRef();
    const email= useRef();
    const password= useRef();
    const passwordAgain = useRef();
    const nombres = useRef();
    const apellidos = useRef();

    const {user}= useContext(AuthContext)
    console.log(user)

//useEffect

    const handleClick= async(e)=>{
        e.preventDefault();
       // if(passwordAgain.current.value !== password.current.value){
           // passwordAgain.current.setCustomValidity("No coinciden las contraseñas!")
      //  }else{
            const Newuser={
                nombres:nombres.current.value,
                apellidos:apellidos.current.value,
                username: username.current.value,
                email:email.current.value,
                password:password.current.value,

            };
            try{
              await axios.post("https://pwadmin.herokuapp.com/api/auth/register", Newuser)
              navigate("/ConsultUser")
             
            
            }catch(err){
                console.log(err)
            }
       // }

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
                        Registro de Usuarios para el sistema
                    </span>
                    
                   
                    
                    
                </div>

                <div className="RegisterRight">
                    <form className="loginBox"  onSubmit={handleClick}>
                        
                        <input placeholder="Usuario" className="loginInput" ref={username} required/>
                        
                        <input placeholder="email" className="loginInput" ref={email} required/>
                        
                        <input placeholder="Contraseña" type="password" className="loginInput" ref={password} required
                        minLength="6" />

                      {/**<input placeholder="Verifica la contraseña" type="password" className="loginInput" ref={passwordAgain} required
                        minLength="6" /> */}  

                        <input placeholder="Nombres" type="text" className="loginInput" ref={nombres} required
                                                minLength="6" />

                            <input placeholder="Apellidos" type="text" className="loginInput" ref={apellidos} required
                                                    minLength="6" />
                        
                        <button className="loginButton" type="submit" >
                            Registrar
                            </button>

                    </form>
                </div>
                </div>
          
     
       </div>
       </>
    )
}
