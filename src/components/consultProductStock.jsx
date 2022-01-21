import { GlobalStyles } from '../styles/GlobalStyles';
import React,{useEffect, useState} from 'react'
import {Modal, ModalBody, ModalFooter} from 'reactstrap';
import { Link } from 'react-router-dom';
//import { axiosInstance } from '../../../config';
import axios from 'axios'

const urlStock="https://pwadmin.herokuapp.com/api/stockProducts/stock";
const urlG='https://pwadmin.herokuapp.com/api/stockProducts/';


export default function ConsultClient() {


    //estado 1 almacena estatico:
const [Clients,setClients]= useState([]);

//nuevo estado que almacene estatico mis clientes para poder hacer put
const [NewClients,setNewClients]= useState([
  

]);

// estado 2 alamacena dinamico
const [tablaProovedors,setTablaProovedors]= useState([]);

// estado 3 controla el input buscador
const [busqueda,setBusqueda]=useState("");

//estado para controlar que vendedor esta seleccionado
  //este es un obj que debe tener los mismo atributos de mi data recorrida de los sellers

  const [clientSeleccionado, setClientSeleccionado] = useState({
    _id: '',
    Producto: '',
    cantidad:'',
    mes:'',
    year:'',
    createdAt:''
  });
//let seleccion = console.log(clientSeleccionado);
//let setSeleccion = console.log(setClientSeleccionado);
console.log(NewClients)


// peticion get stock:
useEffect(() => {
  const getPro = async () => {
    const res= await axios.get(urlStock)
    try{
      setClients(res.data);
      setNewClients(res.data);
      setTablaProovedors(res.data);
    }catch(err){
     console.log(err)
    }
    };
    getPro();
  
  },[])

//console.log(Clients)
//console.log(tablaProovedors)

 const handleChange=(e)=>{
  setBusqueda(e.target.value);
  filtrar(e.target.value);

}

const filtrar=(terminoBusqueda)=>{
  let resultadosBusqueda=tablaProovedors.filter((elemento)=>{
      if(elemento.mes.toString().toLowerCase().includes(terminoBusqueda.toLowerCase())
      
      ){
        return elemento;
      }
    });
    setClients(resultadosBusqueda);
    
}


  


  //con esta funcion se logra asignar al estado lo que el usuario esta escribiendo , en base al nombre del input
  //asi que el estado debe coincidir con el nombre que se le da al input
  //para los modales
  const handleChangeModals=e=>{
    const {name, value}=e.target;
    setClientSeleccionado((prevState)=>({
      ...prevState,
      [name]: value
    }));
    //aca verifico si se guardo en mi estado
   // console.log(clientSeleccionado);

  }

  //estado modalEliminar para controlar cuando se abre y cierra
  const [modalEliminar, setModalEliminar] = useState(false);
  //estado modalEliminar para controlar cuando se abre y cierra
  const [modalEditar, setModalEditar] = useState(false);

  const seleccionarClient=(client, caso)=>{
    setClientSeleccionado(client);
      (caso==='Editar')
      ?setModalEditar(true)
      :setModalEliminar(true)
      
    }


         //funcion para eliminar
//filtra la data , los users que se queden son los que no coinciden con el user que se selecciono  setUsuarios(usuarios.filter(user=>user._id!==userSeleccionado._id));
  const eliminar = async()=>{
   
    try{
    await axios.delete(urlG + clientSeleccionado._id )
    setClients(Clients.filter(user=>user._id!==clientSeleccionado._id));
       //cierra modal
         setModalEliminar(false);
      
      }catch(err){
          console.log(err)
      }
     
   }

    //funcion editar 
  //creo una variable auxiliar para poder almacenar la datanueva
  const editar = async(e)=>{
    e.preventDefault();

    try{
       
     await axios.put( urlG + clientSeleccionado._id, clientSeleccionado)
      let clientNuevo=Clients;
      
     // await axios.put( Url + clientSeleccionado._id)
      
      clientNuevo.map(client=>{
        if(client._id===clientSeleccionado._id){
          client.producto=clientSeleccionado.Producto;
          client.cantidad=clientSeleccionado.cantidad;
          client.mes=clientSeleccionado.mes;
          client.year=clientSeleccionado.year;
          
         
        }
        
        console.log(clientNuevo)
         
        
      });
      
      //ahora asigno al estado mi variable auxiliar(usuarioNuevo)
      setClients(clientNuevo);
       
       ///console.log(setClients)
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
                    <h2> Consulta de Productos en Stock </h2>
                </div>

                <div className="buscadorInput">
                    <input type="text" className="consultInput" 
                    placeholder="Busca por mes Registrado"
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
              
              <th className="tableHeader  bg-grey">Producto</th>
              <th className="tableHeader  bg-grey">Cantidad</th>
              <th className="tableHeader  bg-grey" >Mes</th>
              <th className="tableHeader  bg-grey" >Año</th>
              
            </tr>
          </thead>

          <tbody>
            
              
              

              {Clients &&
            Clients.map((client)=>(
              <tr key={client._id}>
                
                <td className="none" >{client._id}</td>
                
                <td className="sellTd " >{client.Producto}</td>
                
                <td className="sellTd  ">{client.cantidad}</td>

                 <td className="sellTd " >{client.mes}</td>
                 
                 <td className="sellTd " >{client.year}</td>
                 
                 <td className="none " >{client.createdAt}</td>
                 <td>
                   
                   <svg onClick={()=>seleccionarClient(client, 'Editar')}  className="icons" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" /></svg>
                   
                   </td>

                   <td>
                   <svg onClick={()=>seleccionarClient(client, 'Eliminar')}  className=" icons" fill="none" stroke="red" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" /></svg>

                   
                   
                   </td>
                
              </tr>
            ))}
                
              
          
          </tbody>
        </table>
        
                </div>
       

             
        </div>

         {/** VENTANA MODAL para editar:*/}
     
      <Modal className="overlayModal" isOpen={modalEditar} >
        <form className="containerModal" onSubmit={editar}>
        
         
            <h3 className="bg-grey" >Detalles del Producto en Stock</h3>
            <input
              className="none"
              readOnly
              type="text"
              name="_id"
              value={clientSeleccionado && clientSeleccionado._id}
              onChange={handleChangeModals}
            />
          
        <ModalBody className="modalBody">
          <div className="form-group">
            <label className='labelModal'>Producto</label>
            <input
              className="inputModal"
              type="text"
              name="producto"
              value={clientSeleccionado && clientSeleccionado.Producto}
              onChange={handleChangeModals}
            />
            <br />
            
            <label className='labelModal'>Cantidad</label>
            <input
              className="inputModal"
              type="number"
              name="cantidad"
              value={clientSeleccionado && clientSeleccionado.cantidad}
              onChange={handleChangeModals}
            />
            <br />

            <label className='labelModal'>Mes</label>
            <input
              className="inputModal"
              type="text"
              name="mes"
              value={clientSeleccionado && clientSeleccionado.mes}
              onChange={handleChangeModals}
            />
            <br />

            <label className='labelModal'>Año</label>
            <input
              className="inputModal"
              type="text"
              name="year"
              value={clientSeleccionado && clientSeleccionado.year}
              onChange={handleChangeModals}
            />

            <br />
            <label className='labelModal'>Fecha de Registro</label>
            <span className='bg-grey'> {clientSeleccionado && clientSeleccionado.createdAt} </span>
          </div>
        </ModalBody>
        <ModalFooter className='modalFooter'>
          
          <button className="btn-update" type='submit' >
            Actualizar
          </button>
          
          <button
            className=" btn-danger"
            onClick={()=>setModalEditar(false)}
          >
            Cancelar
          </button>
        </ModalFooter>
        </form>
      </Modal>


      {/** VENTANA MODAL para eliminar:*/}
     <Modal  className="overlayModal" isOpen={modalEliminar}>
        <ModalBody className="modalBodyEliminar" >
         <span className='bg-grey'> ¿Estás Seguro que deseas eliminar a {clientSeleccionado && clientSeleccionado.Producto} del stock? </span>
         
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

