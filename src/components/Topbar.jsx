import React, { useContext } from 'react'
import styled from 'styled-components'
import { GlobalStyles } from '../styles/GlobalStyles';
import { useState} from 'react';
import { Link} from "react-router-dom";
import { logoutCall} from "../apiCalls"
import { AuthContext } from "../context/AuthContext";


export default function Topbar({theme,toggleTheme,setSelected}) {    
    
    const {user,dispatch}= useContext(AuthContext)
    

    //useState para dropdown menu
    const [isActive,setIsActive] = useState(false);
    
    //console.log(theme);
 
    const handleLogout=()=>{
        
        logoutCall(dispatch)
    }
    

    //variable de color
    let grey;
    grey=`#f1ebfe`;
    
    
//varibles para estilos svg (logos)
    let Sun, Moon;

        Sun = Moon =styled.svg`
        width: 25px;
        height: 25px;
        cursor:pointer;
        transition: all .5s linear;
        background-color:${grey};
        border-radius:50%;
        padding:3px;
`;



//contenedor topbar
    const TopBar= styled.div`
            
            width: 100%;
            height: 60px;        

    `;
    
    //wrap topbar
    const Wrap= styled.div`
            height: 100%;
            padding: 0px 20px;
            display: flex;
            align-items: center;
            justify-content: space-between;       
    `;
    
    //logo pwadmin *
    const BoxLogo=styled.div`
    display: flex;  
    .logo {
            font-size: 30px;
            font-weight: 800;
            //margin-bottom: 10px;
        }
    `;
    
    // wraptopRight contenedor para activar modo oscuro
    
    const WrapperTopRight=styled.div`
    display: flex;
    align-items: center;
    width: auto;
    height: 25px;
    
    `;
     
    const TopRight=styled.div`
    display: flex;
    align-items: center;
    width: auto;
    height: 25px;
    
    
    `;

    const TopRightUser= styled.div`
    display: flex;
    align-items: center;
    width: auto;
    height: 25px;
    margin-left: 5px;

    .topbarImg{
        width: 32px;
        height: 32px;
        object-fit: cover;
        border-radius: 50%;
        cursor: pointer;
    }
    `
     
    return (
       
        <TopBar>
            <Wrap>
            <GlobalStyles/>
            
            <Link  className="links"to="/">
            <BoxLogo>
           
            <span className="logo ">PWADMIN 
            </span> <p className="aster">*</p>
           
           
            
            </BoxLogo>
            </Link>
            
            <WrapperTopRight>
           
            <TopRight  onClick={toggleTheme}>
            
            
            {theme==='light' ? 
            
            <Moon className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg " >
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z" />
                </Moon>
            :
            <Sun className="w-6 h-6" fill="none" stroke="black" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" ><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364 6.364l-.707-.707M6.343 6.343l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707.707M16 12a4 4 0 11-8 0 4 4 0 018 0z" /></Sun>
        }
                 
            </TopRight>

            {/**logo user con dropdown 
             * 
            */}
             <TopRightUser>

            <svg onClick={e=>setIsActive(!isActive)}
            className="topbarImg" fill="none" 
            stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5.121 17.804A13.937 13.937 0 0112 16c2.5 0 4.847.655 6.879 1.804M15 10a3 3 0 11-6 0 3 3 0 016 0zm6 2a9 9 0 11-18 0 9 9 0 0118 0z" /></svg> 

             </TopRightUser>
              

             

            {isActive &&(
                <div className="dropdown-content">
                
               

                <div className="dropdown-item">
                <Link className="links"
                   to={`/profile/${user.username}`}   >
                  <span className="sidebarListItem bg-grey">
                    Perfil
                  </span>
                   </Link>
                </div>
                
                <div className="dropdown-item" onClick={handleLogout} >
                
                <span className="sidebarListItem bg-grey">
                Cerrar sesión

                </span>
                
             
                
              
                </div>
                
            </div>
            )}
            </WrapperTopRight>
            </Wrap>
            
        </TopBar>
    )
}
