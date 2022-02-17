import React from 'react'
import Home from './pages/Home'
import Login from './pages/Login'
import Profile from './pages/Profile'
import {
   BrowserRouter, 
   Routes, 
   Route, 
   Navigate} 
   from "react-router-dom";

import RegisterProfile from './pages/RegisterProfile';
import ConsultSeller from './pages/ConsultSeller';
import ConsultUser from './pages/ConsultUser';
import ConsultProovedor from './pages/ConsultProovedor';

import { useContext } from "react";
import { AuthContext } from "./context/AuthContext";
import RegisterSellers from './pages/RegisterSellers';
import RegisterProovedors from './pages/RegisterProovedors';
import ImportProducts from './pages/ImportProducts';
import RegisterClient from './pages/RegisterClient';
import ConsultClient from './pages/ConsultClients';
import ConsultProduct from './pages/ConsultProducts';
import ConsultProductStock from './pages/ConsultStock';
import GeneralVentas from './pages/GeneralVentas';
import GeneralVentasMensual from './pages/GeneralVentasMensual';
import CreateFactura from './pages/CreateFact';
import ConsultVentasDiarias from './pages/ConsultVentasDiarias';
import ConsultVentasMensuales from './pages/ConsultVentasMensual';
import { MobileLogin } from './components/responsive/MobileLogin';
import AppMobile from './components/responsive/AppMobile';



export default function App() {

  const {user}= useContext(AuthContext)

  return (
    
    <BrowserRouter>
    <Routes>
        <Route  exact
         path="/" 
         element={ user ? <Home/> : <Login/>}/>
        
        <Route path="/login" element=
        { user ? <Navigate to="/"/>: <Login/> }/>

       

        <Route path="/logout" element=
        {user 
          ?
          <Navigate to="/"/>
          : 
          <Login/>
        }/>

        <Route path="/profile/:username" element=
        {
          user 
          ?
       <Profile/>
       :
       <Navigate to="/login"/>
      

      } />
        
        <Route path="/Registerprofile" element={
       user
       ?
      <RegisterProfile/>
      : <Navigate to="/login"/>
      

      } /> 

        <Route path="/Registerseller"
         element={
         user
         ?
         <RegisterSellers/>
        :
        <Navigate to="/login"/>
        } /> 

      <Route path="/RegisterClient" element={
        user
        ?
        <RegisterClient/>
        :
        <Navigate to="/login"/>  
      } /> 

        <Route path="/Registerproveedor" element={
        user
        ?
        <RegisterProovedors/>
        :
        <Navigate to="/login"/>  
      } /> 

        <Route path="/ImportProducts"
         element={
         user 
         ?
         <ImportProducts/>
         :
         <Navigate to="/login"/> 
        } /> 

        <Route path="/ConsultSeller" element={
        
        <ConsultSeller/>
        
        
      } /> 

      <Route path="/ConsultUser" element={
        user
        ?
        <ConsultUser/>
        :
        <Navigate to="/login"/>  
      } /> 

      <Route path="/ConsultProovedor" element={
        user
        ?
        <ConsultProovedor/>
        :
        <Navigate to="/login"/>  
      } /> 

      <Route path="/ConsultClient" element={
        user
        ?
        <ConsultClient/>
        :
        <Navigate to="/login"/>  
      } /> 

    <Route path="/ConsultProduct" element={
        user
        ?
        <ConsultProduct/>
        :
        <Navigate to="/login"/>  
      } /> 

     <Route path="/ConsultProductStock" element={
        user
        ?
        <ConsultProductStock/>
        :
        <Navigate to="/login"/>  
      } /> 

    <Route path="/GeneralVentas" element={
        user
        ?
        <GeneralVentas/>
        :
        <Navigate to="/login"/>  
      } /> 

<Route path="/GeneralVentasMensual" element={
        user
        ?
        <GeneralVentasMensual/>
        :
        <Navigate to="/login"/>  
      } /> 

<Route path="/CreateFact" element={
        
        <CreateFactura/>   
  } /> 

      <Route path="/ConsultVentasDiarias" element={
        user
        ?
        <ConsultVentasDiarias/>
        :
        <Navigate to="/login"/>  
      } /> 

    <Route path="/ConsultVentasMensuales" element={
        user
        ?
        <ConsultVentasMensuales/>
        :
        <Navigate to="/login"/>  
      } /> 

    

      </Routes>


    </BrowserRouter>
    
  )
}



