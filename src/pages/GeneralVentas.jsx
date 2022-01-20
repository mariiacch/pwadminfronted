import { lightTheme,darkTheme } from '../styles/GlobalStyles';
import useDarkMode from '../styles/UseDarkMode';
import Topbar from '../components/Topbar'
import { ThemeProvider } from 'styled-components';
import Sidebar from '../components/Sidebar';
import GeneralVentasRegister from '../components/GeneralVentasRegister';
import { GlobalStyles } from '../styles/GlobalStyles';

import { useState} from 'react';



function GeneralVentas() {
   

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
                <GlobalStyles/>

               <div className="consultContainer">
               <Sidebar/>
                
                <div className="consultWrapper">
                  
                 <GeneralVentasRegister/>
                  
                 </div>
                   
                  
                </div>
               
               
                    
            
               
                
               
                
                
          </ThemeProvider>
          
                
      </>
    );
  }
  
  export default GeneralVentas;