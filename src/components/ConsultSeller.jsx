import React from 'react'
import{useEffect, useState} from 'react'
import { GlobalStyles } from '../styles/GlobalStyles';
import axios from "axios";
import {Modal, ModalBody, ModalFooter} from 'reactstrap';
//import { axiosInstance } from '../../../config';


const Url='https://pwadmin.herokuapp.com/vendedor/api'

export default function ConsultSeller() {
//estado 1 almacena estatico:
const [Vendedores,setVendedores]= useState([]);

// estado 2 alamacena dinamico
const [tablaVendedores,setTablaVendedores]= useState([]);

// estado 3 controla el input buscador
const [busqueda,setBusqueda]=useState("");

// peticion get vendedores:
const getSeller= async()=>{
  const res= await axios.get("https://pwadmin.herokuapp.com/api/vendedor/sellers")
  try{
   setVendedores(res.data);
   setTablaVendedores(res.data);
  }catch(err){
   console.log(err)
  }
}

//estado para controlar que vendedor esta seleccionado
  //este es un obj que debe tener los mismo atributos de mi data recorrida de los sellers

  const [sellerSeleccionado, setSellerSeleccionado] = useState({
    _id: '',
    nombre: '',
    apellido:'',
    cedula:'',
    contact:'',
  });

const handleChange=(e)=>{
  setBusqueda(e.target.value);
  filtrar(e.target.value);

}
const filtrar=(terminoBusqueda)=>{
  let resultadosBusqueda=tablaVendedores.filter((elemento)=>{
      if(elemento.nombre.toString().toLowerCase().includes(terminoBusqueda.toLowerCase())
      || (elemento.apellido.toString().toLowerCase().includes(terminoBusqueda.toLowerCase())))
      {
        return elemento;
      }
    });
    setVendedores(resultadosBusqueda);


}
useEffect(()=>{
  getSeller();
  return () => {
      setVendedores([]); // limpia los estados para no tener bug
      setTablaVendedores([]);
      
    };
  },[])

//con esta funcion se logra asignar al estado lo que el usuario esta escribiendo , en base al nombre del input
  //asi que el estado debe coincidir con el nombre que se le da al input
  //para los modales
  const handleChangeModals=e=>{
    const {name, value}=e.target;
    setSellerSeleccionado((prevState)=>({
      ...prevState,
      [name]: value
    }));
    //aca verifico si se guardo en mi estado
   // console.log(sellerSeleccionado);
  }

  //estado modalEliminar para controlar cuando se abre y cierra
  const [modalEliminar, setModalEliminar] = useState(false);
  //estado modalEliminar para controlar cuando se abre y cierra
  const [modalEditar, setModalEditar] = useState(false);

  const seleccionarSeller=(seller, caso)=>{
    setSellerSeleccionado(seller);
      (caso==='Editar')
      ?setModalEditar(true)
      :setModalEliminar(true)
      
    }

      //funcion para eliminar
//filtra la data , los users que se queden son los que no coinciden con el user que se selecciono  setUsuarios(usuarios.filter(user=>user._id!==userSeleccionado._id));
  const eliminar = async()=>{
   
    try{
    await axios.delete(Url + sellerSeleccionado._id )
    setVendedores(Vendedores.filter(user=>user._id!==sellerSeleccionado._id));
       //cierra modal
         setModalEliminar(false);
      
      }catch(err){
          console.log(err)
      }
     
   }

   //funcion editar 
  //creo una variable auxiliar para poder almacenar la datanueva
  const editar = async()=>{
    
    try{
      await axios.put(Url + sellerSeleccionado._id,sellerSeleccionado)
      let vendedorNuevo=Vendedores;
      vendedorNuevo.map(seller=>{
        if(seller._id===sellerSeleccionado._id){
          seller.nombre=sellerSeleccionado.nombre;
          seller.apellido=sellerSeleccionado.apellido;
          seller.cedula=sellerSeleccionado.cedula;
          seller.contact=sellerSeleccionado.contact;

        }
        return vendedorNuevo;
      });
      //ahora asigno al estado mi variable auxiliar(usuarioNuevo)
        setVendedores(vendedorNuevo);
       //cierra modal
         setModalEditar(false);
      
      }catch(err){
          console.log(err)
      }
    
   
  }
    return (
        <>
        <GlobalStyles/>
        
        <div className="ConsultTable">
            
            <div className="ConsultHeader">
                <div className="titleConsult">
                    <h2> Consulta de Vendedores </h2>
                </div>

                <div className="buscadorInput">
                    <input type="text" 
                    className="consultInput"
                    required
                    placeholder="Busqueda por nombre o apellido "
                    value={busqueda}
                    onChange={handleChange}
                    
                    />
                    

                    <svg className="btn-Search" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" /></svg>
                    
                </div>

                
                </div>

            <div className="WrapSellersTable">
                <table className="tableSell">
          <thead>
            <tr>
              <th className="tableHeader  bg-grey">Nombres</th>
              <th className="tableHeader bg-grey" >Apellidos</th>
              <th  className="tableHeader bg-grey ">Cedula</th>
              <th className="tableHeader bg-grey " >Contacto</th>
              
            </tr>
          </thead>

          <tbody>
          {Vendedores &&
            Vendedores.map((seller)=>(
              <tr>
                     
                <td className="sellTd" >{seller.nombre}</td>
                <td className="sellTd " >{seller.apellido}</td>
                <td className="sellTd ">{seller.cedula}</td>
                 <td className="sellTd " >{seller.contact}</td>
                 
                 <td>
                   
                   <svg onClick={()=>seleccionarSeller(seller, 'Editar')}  className="icons" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" /></svg>
                   
                   </td>

                 <td>
                   <svg onClick={()=>seleccionarSeller(seller, 'Eliminar')}  className=" icons" fill="none" stroke="red" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" /></svg>

                   
                   
                   </td>
                
              </tr>
            ))}
              
    
          
          </tbody>
        </table>
                </div>
        </div>


        {/** VENTANA MODAL para editar:*/}
     
      <Modal className="overlayModal" isOpen={modalEditar} >
        <div className="containerModal">
        
         
            <h3 className="bg-grey" >Editar Usuario</h3>
            <input
              className="none"
              readOnly
              type="text"
              name="_id"
              value={sellerSeleccionado && sellerSeleccionado._id}
            />
          
        <ModalBody className="modalBody">
          <div className="form-group">
                       
           

            <label className='labelModal'>Nombres</label>
            <input
              className="inputModal"
              type="text"
              name="nombre"
              value={sellerSeleccionado && sellerSeleccionado.nombre}
              onChange={handleChangeModals}
            />
            <br />
            
            <label className='labelModal'>Apellidos</label>
            <input
              className="inputModal"
              type="text"
              name="apellido"
              value={sellerSeleccionado && sellerSeleccionado.apellido}
              onChange={handleChangeModals}
            />
            <br />

            <label className='labelModal'>Cedula</label>
            <input
              className="inputModal"
              type="text"
              name="cedula"
              value={sellerSeleccionado && sellerSeleccionado.cedula}
              onChange={handleChangeModals}
            />
            <br />

            <label className='labelModal'>Contacto</label>
            <input
              className="inputModal"
              type="text"
              name="contact"
              value={sellerSeleccionado && sellerSeleccionado.contact}
              onChange={handleChangeModals}
            />
            <br />
            
            
            
            
            
          </div>
        </ModalBody>
        <ModalFooter className='modalFooter'>
          
          <button className="btn-update" onClick={()=>editar()} >
            Actualizar
          </button>
          
          <button
            className=" btn-danger"
            onClick={()=>setModalEditar(false)}
          >
            Cancelar
          </button>
        </ModalFooter>
        </div>
      </Modal>


      {/** VENTANA MODAL para eliminar:*/}
     <Modal  className="overlayModal" isOpen={modalEliminar}>
        <ModalBody className="modalBodyEliminar" >
         <span className='bg-grey'> ¿Estás Seguro que deseas eliminar a {sellerSeleccionado && sellerSeleccionado.nombre}? </span>
         
        </ModalBody>
        
        <ModalFooter className="modalFooterEliminar"  >
          <button className="btn-siEliminar" onClick={()=>eliminar()}>
            Sí
          </button>
          
          <button
            className="btn-noEliminar"
            onClick={()=>setModalEliminar(false)}
          >
            No
          </button>
        </ModalFooter>
      </Modal>
       
        
        </>
             
    )
}
