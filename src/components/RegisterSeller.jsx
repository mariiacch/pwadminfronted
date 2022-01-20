import React from 'react'
import { useContext, useRef} from 'react';
import{useNavigate} from 'react-router-dom'
import axios from "axios";
import { GlobalStyles } from '../styles/GlobalStyles';
import { AuthContext } from '../context/AuthContext';
//import { axiosInstance } from '../../../config';


export default function Register() {
const navigate= useNavigate();
    const {user}= useContext(AuthContext)
    console.log(user)

    const nombre= useRef();
    const apellido= useRef();
    const cedula= useRef();
    const contact= useRef();
   

    const handleClick=async(e)=>{
        e.preventDefault();
        const newSeller={
            nombre:nombre.current.value,
            apellido:apellido.current.value,
            contact:contact.current.value,
            cedula:cedula.current.value,
            
        }
        try{
         await axios.post("vendedor/register", newSeller)
          
           navigate("/ConsultSeller")

        }catch(err){
            console.log(err);
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
                        Registro de vendedores para el sistema
                    </span>
                    
                    
                </div>

                <div className="RegisterRight">
                    <form className="loginBox" onSubmit={handleClick} >
                        
                        
                                
                        <input placeholder="Nombres" className="loginInput" ref={nombre} required/>

                        <input placeholder="Apellidos" className="loginInput" ref={apellido} required/>

                        <input placeholder="Cedula" className="loginInput" ref={cedula} required/>

                        <input placeholder="Numero de Contacto" className="loginInput" ref={contact} required/>
                        
                        
                        <button className="loginButton" type="submit">
                        Registrar
                            </button>

                        
                        

                    </form>
                </div>
        </div>
           </div>
       

       </>
    )
}
