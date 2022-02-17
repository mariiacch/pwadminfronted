import React from 'react'
import {  useRef } from 'react';
import { GlobalStyles } from '../styles/GlobalStyles';
import { useNavigate } from 'react-router';
//import { axiosInstance } from '../../../config';
import axios from "axios"

export default function Register() {
    const navigate= useNavigate();

    const nombres= useRef();
    const rif= useRef();
    const email = useRef(); 
    const contact = useRef();
    
const handleClick=(e)=>{
    e.preventDefault();
    const newProovedor={
        nombres:nombres.current.value,
        rif:rif.current.value,
        email:email.current.value,
        contact:contact.current.value,
    }
    try{
      axios.post("https://pwadmin.herokuapp.com/api/proovedor/register",newProovedor)
      navigate("/ConsultProovedor")
        
      
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
                        Registro de Proovedores para el sistema
                    </span>
                    
                    
                </div>

                <div className="RegisterRight">
                    <form className="loginBox" onSubmit={handleClick} >
                        
                        
                                
                        <input placeholder="Nombres" className="loginInput" ref={nombres} required/>

                        <input placeholder="Rif" className="loginInput" ref={rif} required/>

                        <input placeholder="email" className="loginInput" ref={email} required/>

                        <input placeholder="Numero de Contacto" className="loginInput" ref={contact} required/>
                        
                        
                        <button type="submit" className="loginButton">
                            Registra
                            </button>

                        
                        

                    </form>
                </div>
        </div>
       
       </div>
       </>
    )
}
