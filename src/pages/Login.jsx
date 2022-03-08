import React from 'react'
import styled from 'styled-components'
import { useContext, useRef } from 'react';

import { AuthContext } from '../context/AuthContext';
import CircularProgress from '@mui/material/CircularProgress';
import { loginCall} from "../apiCalls"




export default function Login() {
    const username= useRef();
    const password= useRef();
    
    const {user, isFetching, error, dispatch}= useContext(AuthContext)
    
    console.log(user)

    const handleClick=(e) =>{
        e.preventDefault();
       
        loginCall({username:username.current.value,password:password.current.value}, dispatch)
            
    }
    const Login = styled.div`
        width: 100vw;
        height: 100vh;
        background-color: #f0f2f5;
        display: flex;
        align-items: center;
        justify-content: center;
        @media (max-width: 768px) {
           // background-color: red;
            display: flex;
            flex-direction:column;
        }
    `;
    const LoginWrapper = styled.div`
         width: 70%;
         height: 70%;
         display: flex;
         .loginLeft, .loginRight{
            flex: 1;
            display: flex;
            flex-direction: column;
            justify-content: center;
         }
         .loginLogo{
            font-size: 50px;
            font-weight: 800;
            margin-bottom: 10px;
            text-align: center;
            .loginAster{
                color: #6200ee;
                margin-left: 5px;
                margin-top: 4px;
                margin-bottom: 0;
                font-size: 50px;
                font-weight: bold;
                padding: 0;
            }
            
         }
         .loginDesc{
                text-align: center;
            }
            .loginBox{
                height: 300px;
                padding: 20px;
                background-color: white;
                border-radius: 10px;
                display: flex;
                flex-direction: column;
                justify-content: space-between;
                
            }
            .loginInput{
            height: 50px;
            border-radius: 10px;
            border: 1px solid gray;
            font-size: 18px;
            padding-left:20px ;
            &:focus{
                outline: none;
            }
            }
            .loginButton{
                height: 50px;
                border: none;
                border-radius: 10px;
                background-color: #6200ee;
                color: white;
                font-size: 20px;
                font-weight: 500;
                cursor: pointer;
            }
            .loginForgot{
                text-align: center;
                cursor: pointer;
                &:hover{
                    color: #6200ee;
                    
                }
            }
            
`;



    return (
      <>

       <Login>
           
           <LoginWrapper>
           
           <div className="loginLeft">
                    <h3 className="loginLogo">
                        PWADMIN 
                        <span className='loginAster'>*</span>
                    </h3>
                    <span className="loginDesc">
                        ¡Prueba nuestros modulos administrativos!
                    </span>
                </div>

                <div className="loginRight">
                    <form className="loginBox" onSubmit={handleClick}>
                        
                        <input placeholder="Usuario" className="loginInput" ref={username} required/>
                        
                        <input placeholder="Contraseña" type="password"
                         className="loginInput" ref={password} required
                        minLength="6" />

                        <button className="loginButton">
                            {isFetching 
                            ? <CircularProgress color="secondary"/>
                            : "Ingresar"}
                            
                            </button>

                        <span>Ingresa con el usuario AdminTester para realizar pruebas</span>

                    </form>
                </div>
           </LoginWrapper>
       </Login> 
    
       </>
    ) 


}
