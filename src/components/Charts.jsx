import { GlobalStyles } from '../styles/GlobalStyles';

import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';

import { useState, useEffect } from "react"
import axios from "axios"


  //axiosInstance 

export default function Charts() {
    const [VentaMensual,setVentaMensual]= useState({});

    //hice la conversion a un array por que react no lo toma como un obj
const VentaMensuales = Object.values(VentaMensual);


    useEffect(()=>{
        const fetchVentasMensual= async()=>{
            const res= await axios.get(
               'https://pwadmin.herokuapp.com/ventaMensual/sellers');
               setVentaMensual(res.data);

               //console.log(VentaMensual)

              
               
            }

            
         

          fetchVentasMensual();

        //console.log(VentaMensuales)
        },[])

 

          const nuevaLista = VentaMensuales.map(function(i) {
            return (i.cantidadBolivares);
        });

        console.log(nuevaLista)

      //const nuevalista2= VentaMensuales.forEach(element,index => element);
      //console.log(nuevalista2)

      //const nuevalista2= VentaMensuales.forEach(element => console.log(element));

      //console.log(nuevalista2)


   
    return (
        <>
        <GlobalStyles/>
       
            <div className="chartWrap">
               <h3 className="chartTitle">
                   Estadísticas de la Venta Mensual
               </h3>
              
              

            
               <LineChart
                    width={700}
                    height={350}
                    data={VentaMensual}
                    

        >
                   <XAxis dataKey="Mes" stroke='#555' />
                   <YAxis   />
                   
                   <Line type="monotone" dataKey="cantidadBolivares" stroke="#8884d8"/>

                   <Tooltip />
               </LineChart>
            </div>
     

        </>
    )
}
