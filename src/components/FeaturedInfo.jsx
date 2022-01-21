import React from 'react'
import styled from 'styled-components'
import { GlobalStyles } from '../styles/GlobalStyles';
import { useState, useEffect } from "react"
import axios from "axios";
//import { axiosInstance } from '../../../config';

export default function FeaturedInfo() {

  //estado del user:
const [Totalclient,setTotalclient]= useState({});
  
const [TotalVenta,setTotalVenta]= useState({});

const [TotalVentaMensual,setTotalVentaMensual]= useState({});
  
  //fetch clients

  useEffect(()=>{
  const fetchTotalClient= async()=>{
      const res= await axios.get(
         'https://pwadmin.herokuapp.com/clients/totalclients');
         setTotalclient(res.data);
         
  };
  const fetchVentas= async()=>{
    const res= await axios.post(
       'https://pwadmin.herokuapp.com/ventaSemanal/getlast');
       setTotalVenta(res.data);
       
};

const fetchVentasMensual= async()=>{
  const res= await axios.post(
     'https://pwadmin.herokuapp.com/ventaMensual/getlast');
     setTotalVentaMensual(res.data);
     
};
  fetchVentas()
  fetchTotalClient()
  fetchVentasMensual()

  return () => {
    setTotalclient([]); // limpia los estados para no tener bug
    setTotalVenta([]); // limpia los estados para no tener bug
  };
},[])

//console.log(Object.values(Totalclient));

//hice la conversion a un array por que react no lo toma como un obj
const totalClientes = Object.values(Totalclient);
//hice la conversion a un array por que react no lo toma como un obj
const totalVentas = Object.values(TotalVenta);

//hice la conversion a un array por que react no lo toma como un obj
const totalVentasMensual = Object.values(TotalVentaMensual);


    const Featured=styled.div`
    
    display: flex;
   
    border-radius: 10px;
    cursor: pointer;

    justify-content: space-between;
  
    
   
    `;

    
    return (
        <Featured>
            <GlobalStyles/>
            <div className="featuredItem">
            <span className="featuredTitle">Ventas Diarias</span>
           
            <div className="featuredMoneyContainer">
            <span className="featuredMoney"></span>
            <span className="featuredMoneyRate">
           { totalVentas &&
            totalVentas.map((proovedor)=>(

              <span>{proovedor.cantidadBolivares
              } bs </span> 


            )

            )}
            
            
            </span>
            </div>
            <span className="featuredSub">Ultima Venta Registrada</span>
            
        </div>
        

        <div className="featuredItem">
        <span className="featuredTitle">Venta Mensual</span>

        <div className="featuredMoneyContainer">
          <span className="featuredMoney">
          { totalVentasMensual &&
            totalVentasMensual.map((proovedor)=>(

              <span>{proovedor.cantidadBolivares
              } bs </span> 


            )

            )}
            
            
            </span>
          
        </div>
        <span className="featuredSub">Ultima Venta Registrada</span>
      </div>

      <div className="featuredItem">
        <span className="featuredTitle">Total de Clientes</span>
        <div className="featuredMoneyContainer">
         
          <span className="featuredMoneyRate">
        {totalClientes}
          </span>
          
          
        </div>
        <span className="featuredSub">Cantidad de Clientes Registrados</span>
      </div>

      
      
        </Featured>


    )
}
