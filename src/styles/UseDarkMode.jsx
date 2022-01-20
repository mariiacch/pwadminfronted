
import { useState, useEffect } from "react"
//para el dark mode se usaran los hooks de useState y UseEffect 
//

export default function UseDarkMode() {
    
    // useState del tema
    const [theme, setTheme]= useState('dark')
    //funcion para guardar el modo de theme al localstorage
    const setMode=mode=>{
        window.localStorage.setItem('theme', mode);
        setTheme(mode);
    }
    //funcion para el cambio de tema de dark y light
    const toggleTheme=()=>{
        
        theme==='dark' ? setMode('light') : setMode('dark');
    }
//actualizo mi variable theme con useEffect y renderizo
    useEffect(()=>{
        
        const localTheme= window.localStorage.getItem('theme')
        localTheme ? setTheme(localTheme) : setMode('dark')
    },[])
    
    return [theme, toggleTheme];

}
