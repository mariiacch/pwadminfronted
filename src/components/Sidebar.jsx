import React from 'react'
import styled from 'styled-components'
import { GlobalStyles } from '../styles/GlobalStyles';
import { Link} from "react-router-dom";
export default function Sidebar() {
    
    const Sidebar=styled.div`
    
    position: sticky;
    top: 50px;
    //border: 1px solid red;
    margin-left: 10px;
    padding-bottom: 25px;
    width: 300px;
    -webkit-box-shadow: 0px 0px 15px -10px rgba(0, 0, 0, 0.75);
  box-shadow: 0px 0px 15px -10px rgba(0, 0, 0, 0.75);
  //padding: 20px;
  overflow-y: scroll;

  &::-webkit-scrollbar{
    width: 5px;
}
 &::-webkit-scrollbar-track{
    background-color: #f1f1f1;
}
&::-webkit-scrollbar-thumb{
    background-color: #c1c1c1;
}
   
    `
    const SidebarWrapper=styled.div`
        padding: 20px;
        
        
    `
    return (
        

        
            <Sidebar>
                <GlobalStyles/>
                <SidebarWrapper>
                <div className="sidebarMenu">
               

                <h3 className="sidebarTitle bg-grey">Consulta Principal</h3>
            <ul className="sidebarList">
                   
                <Link  className="links" to="/ConsultUser" style={{textDecoration:"none" }}>
                   <li  className="sidebarListItem active" key="uniqueId1">
                    Usuarios
                    </li>
                   </Link>
                   
                    <Link  className="links" to="/ConsultSeller" style={{textDecoration:"none" }}>
                    
                    <li className="sidebarListItem" key="uniqueId2">
                    Vendedores
                    </li>
                    
                    </Link>
                    
                    <Link  className="links" to="/ConsultProovedor" style={{textDecoration:"none" }}>
                    <li className="sidebarListItem" key="uniqueId3">
                    
                    Proveedores
                    </li>
                    </Link>
                    
                <Link  className="links" to="/ConsultClient" style={{textDecoration:"none" }}>
                    <li  className="sidebarListItem" key="uniqueId4">
                     Clientes
                    </li>
                </Link>
            </ul>

                 </div>

                 <div className="sidebarMenu">
                <h3 className="sidebarTitle bg-grey">Registros</h3>
            <ul className="sidebarList">
           
                   
                    
                    <Link  className="links" to="/Registerprofile" style={{textDecoration:"none" }}>
                    <li className="sidebarListItem active" key="uniqueId5">
                        Usuarios
                        </li>
                    </Link>

                   
                    
                    <Link className="links" to="/Registerseller"  >
                    
                    <li className="sidebarListItem" key="uniqueId6">
                    
                    Vendedores
                    </li>
                     </Link>
                    

                    <Link className="links" to="/Registerproveedor" >
                    <li  className="sidebarListItem" key="uniqueId7">
                    
                    Proovedores
                    </li>
                    </Link>

                <Link className="links" to="/RegisterClient"key="uniqueId8" >
                    <li  className="sidebarListItem">
                     Clientes
                    </li>
                </Link>
                    
            </ul>

                 </div>
                


                 <div className="sidebarMenu">
                <h3 className="sidebarTitle bg-grey">Inventario</h3>
           
            <ul className="sidebarList">
           
                    <Link className="links" to="/ImportProducts" >
                    <li className="sidebarListItem active" key="uniqueId11">
                    
                    Productos
                    </li>
                    </Link>
                    
                    
                    
                    <Link className="links" to="/ConsultProductStock" >
                    <li className="sidebarListItem" key="uniqueId13">
                    
                    Consultar Stock
                    </li>
                    </Link>
                    
                    
            </ul>

            

                 </div>


                 <div className="sidebarMenu">
                <h3 className="sidebarTitle bg-grey">Ventas</h3>
           
            <ul className="sidebarList">
           
            <Link className="links" to="/GeneralVentas" >
                    <li className="sidebarListItem active" key="uniqueId14">
                    
                    Diarias
                    </li>
                    
            </Link>
            
            <Link className="links" to="/GeneralVentasMensual" >
            <li className="sidebarListItem " key="uniqueId14">
                    
                    Mensuales
                    </li>
                 </Link>
            </ul>
        
            

                 </div>

                 <div className="sidebarMenu">

                 <ul className="sidebarList"> 

                 <h3 className="sidebarTitle bg-grey">Facturas</h3>
                 <a href="https://pwadmin-factura.netlify.app/">
                 <li className="sidebarListItem " key="uniqueId15">
                    
                    Genera Factura
                </li>
                </a>

                </ul>
                 </div>
                
                </SidebarWrapper>
            </Sidebar>

        
           
        
        
    )
}
