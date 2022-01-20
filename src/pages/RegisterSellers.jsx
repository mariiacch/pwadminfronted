import { lightTheme,darkTheme } from '../styles/GlobalStyles';
import styled from 'styled-components'
import useDarkMode from '../styles/UseDarkMode';
import Topbar from '../components/Topbar'
import { ThemeProvider } from 'styled-components';
import Sidebar from '../components/Sidebar';

import { useState} from 'react';

import RegisterSeller from '../components/RegisterSeller';


function RegisterSellers() {
    const Container =styled.div`
    display: flex;
    
    margin-top: 25px;
    height: 100vh;
    width: 100vw;  
    z-index: -1; 
     
  `

const Wrapper =styled.div`
    display: flex;
    flex-direction: column;
    flex-wrap:wrap;
    width: 100%;
    -webkit-box-shadow: 0px 0px 15px -10px rgba(0, 0, 0, 0.75);
  box-shadow: 0px 0px 15px -10px rgba(0, 0, 0, 0.75);
  //padding: 20px;

`
   const [selected,setSelected] = useState("");
   console.log(selected);
  
   //estado de la funcion usedarkmode
    const [theme,toggleTheme] = useDarkMode();
    
    const themeMode= theme === 'light' ?  lightTheme : darkTheme;
  
    return (
      <>
          <ThemeProvider theme={themeMode}> 
          <div className="index">
          <Topbar theme={theme} toggleTheme={toggleTheme}
          selected={selected} setSelected={setSelected}
          />
          </div>
                
               <Container>
               <Sidebar/>
                  <Wrapper>
                  
                  <RegisterSeller/> 
                  
                  </Wrapper>
                   
                  
               </Container>
               
               
                    
            
               
                
               
                
                
          </ThemeProvider>
          
                
      </>
    );
  }
  
  export default RegisterSellers;

