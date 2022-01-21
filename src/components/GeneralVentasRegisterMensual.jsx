import React from 'react'
import { GlobalStyles } from '../styles/GlobalStyles';
import {  useRef} from 'react';
import { Link} from "react-router-dom";
import "react-datepicker/dist/react-datepicker.css";
//import { axiosInstance } from '../../../config';
import axios from "axios"

export default function RegisterProduct() {
    


    const Mes= useRef();
    const cantidadBolivares= useRef();
  
 

   const handleClick= (e)=>{
       e.preventDefault();
    const newProduct={
        Mes:Mes.current.value,
        cantidadBolivares:cantidadBolivares.current.value,
       
    }
    try{
       axios.post("https://pwadmin.herokuapp.com/ventaMensual/register",newProduct)
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
                        Registro de Ventas Mensuales para el sistema
                        
                    </span>
                   
                    
                    <div className="consultBox">
                    <Link  className="links" to="/ConsultVentasMensuales" style={{textDecoration:"none" }}>
                    <button className='btn-consult'>
                        Consultar Ventas
                    </button>
                    </Link>
                    </div>
                   
                    
                    
                  </div>  
                    
               

                <div className="RegisterRight">
                    <form  id="formProduct" className="loginBox" onSubmit={handleClick}>
                        
                        
                        <label className='bg-grey'> Mes</label>   
                        
                        
                        <input 
                        type='String' 
                        className="loginInput" 
                        ref={Mes} required/>

    
             

                        <label className='bg-grey'>Cantidad en Bolivares</label>
                        <input type='Number'
                         className="loginInput" ref={cantidadBolivares} required/>
                        
                        
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
