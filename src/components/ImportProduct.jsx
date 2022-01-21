import React from 'react'
import { GlobalStyles } from '../styles/GlobalStyles';
import axios from 'axios';
import {  useRef } from 'react';
import { Link} from "react-router-dom";
//import { axiosInstance } from '../../../config';


export default function RegisterProduct() {



    const nombre= useRef();
    const codigo= useRef();
    const grados= useRef();
    const tipo= useRef();
    const precio= useRef();
    
 

   const handleClick=(e)=>{
       e.preventDefault();
    const newProduct={
        nombre:nombre.current.value,
        codigo:codigo.current.value,
        grados:grados.current.value,
        tipo:tipo.current.value,
        precio:precio.current.value,
       
    }
    try{
        axios.post("https://pwadmin.herokuapp.com/api/products/register",newProduct)
          // navigate("/ConsultClient")
          document.getElementById('formProduct').reset();

         
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
                        Registro de productos para el sistema
                        
                    </span>
                   
                    
                    <div className="consultBox">
                    <Link  className="links" to="/ConsultProduct" style={{textDecoration:"none" }}>
                    <button className='btn-consult'>
                        Consultar Productos
                    </button>
                    </Link>
                    </div>
                   
                    
                    
                  </div>  
                    
               

                <div className="RegisterRight">
                    <form  id="formProduct" className="loginBox" onSubmit={handleClick}>
                        
                        
                                
                        <input placeholder="Nombre del Licor" className="loginInput" ref={nombre} required/>

                        <input placeholder="Codigo" className="loginInput" ref={codigo} required/>

                        <input placeholder="Grado alcoholico" className="loginInput" ref={grados} required/>

                        <input placeholder="Tipo de Licor" className="loginInput" ref={tipo} required/>

                        <input placeholder="Precio en Bolivares" className="loginInput" ref={precio} required/>
                        
                        
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
