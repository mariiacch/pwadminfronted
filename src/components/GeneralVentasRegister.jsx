import React from 'react'
import { GlobalStyles } from '../styles/GlobalStyles';
import axios from 'axios';
import {  useRef} from 'react';
import { Link} from "react-router-dom";
import "react-datepicker/dist/react-datepicker.css";


export default function RegisterProduct() {

    const cantidadBolivares= useRef();

   const handleClick=(e)=>{
    e.preventDefault();
    const newRegister={
        cantidadBolivares:cantidadBolivares.current.value,
        
    }
    //https://pwadmin.herokuapp.com/api/proovedor/register
    
    try{
        axios.post("https://pwadmin.herokuapp.com/api/ventaSemanal/register",newRegister)
          //navigate("/ConsultClient")
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
                        Registro de Ventas Diarias para el sistema
                        
                    </span>
                   
                    
                    <div className="consultBox">
                    <Link  className="links" to="/ConsultVentasDiarias" style={{textDecoration:"none" }}>
                    <button className='btn-consult'>
                        Consultar Ventas
                    </button>
                    </Link>
                    </div>
                   
                    
                    
                  </div>  
                    
               

                <div className="RegisterRight">
                    <form  id="formProduct" className="loginBox" onSubmit={handleClick}>
                        
                    <br />

                        <label className='bg-grey'> Ingresa la Cantidad en Bolivares</label>
                        <input type='Number'
                         className="loginInput" 
                         ref={cantidadBolivares} required/>
                        
                        
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
