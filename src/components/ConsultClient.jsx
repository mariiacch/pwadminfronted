import { GlobalStyles } from '../styles/GlobalStyles';
import{useEffect, useState} from 'react'
import axios from "axios";
import {Modal, ModalBody, ModalFooter} from 'reactstrap';




//http://localhost:8800/api/users?id=${id}


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
    nombres: '',
    cedula:'',
    contact:'',
    licencia:'',
    ciudad:''
  });
//let seleccion = console.log(clientSeleccionado);
//let setSeleccion = console.log(setClientSeleccionado);
console.log(NewClients)


// peticion get usuarios:
useEffect(() => {
  const getPro = async () => {
    const res= await axios.get("clients/clients")
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
      if(elemento.nombres.toString().toLowerCase().includes(terminoBusqueda.toLowerCase())
      
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

    const Url=`clients/`

         //funcion para eliminar
//filtra la data , los users que se queden son los que no coinciden con el user que se selecciono  setUsuarios(usuarios.filter(user=>user._id!==userSeleccionado._id));
  const eliminar = async()=>{
   
    try{
    await axios.delete(Url + clientSeleccionado._id )
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
       
     await  axios.put( Url + clientSeleccionado._id, clientSeleccionado)
      let clientNuevo=Clients;
      
     // await axios.put( Url + clientSeleccionado._id)
      
      clientNuevo.map(client=>{
        if(client._id===clientSeleccionado._id){
          client.nombres=clientSeleccionado.nombres;
          client.cedula=clientSeleccionado.cedula;
          client.contact=clientSeleccionado.contact;
          client.licencia=clientSeleccionado.licencia;
          client.ciudad=clientSeleccionado.ciudad;
         
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


  //handlesubmitEdit
  const handleSubmitEdit = async (e) => {
    e.preventDefault();
    const response = await axios.put(`${Url}${clientSeleccionado.id}`, clientSeleccionado)
    if (response.status === 200) {
        console.log(
            'Guardado!',
            `El registro ${clientSeleccionado.id} ha sido actualizado exitosamente!`,
            'success'
        )
        //handleCloseModal();
        //setUpdateList(!updateList)
        //setNewClients(!NewClients);
    }else {
       console.log('err'
        )
    }
}



    return (
        <>
        <GlobalStyles/>
        <div className="ConsultTable">
       
          <div className="ConsultHeader">
                <div className="titleConsult">
                    <h2> Consulta de Clientes</h2>
                </div>

                <div className="buscadorInput">
                    <input type="text" className="consultInput" 
                    placeholder="Busqueda por nombre del cliente"
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
              
              <th className="tableHeader  bg-grey">Nombres y Apellidos</th>
              <th className="tableHeader  bg-grey" >Cedula</th>
              <th className="tableHeader  bg-grey" >Numero de Contacto</th>
              <th className="tableHeader  bg-grey" >Numero de Licencia</th>
              <th className="tableHeader  bg-grey">Ciudad </th>
              
              
              
            </tr>
          </thead>

          <tbody>
            
              
              

              {Clients &&
            Clients.map((client)=>(
              <tr key={client._id}>
                
                <td className="none" >{client._id}</td>
                
                <td className="sellTd " >{client.nombres}</td>
              
                 <td className="sellTd " >{client.cedula}</td>
                 
                 <td className="sellTd   " >{client.contact}</td>
                 
                 <td className="sellTd   " >{client.licencia}</td>

                 <td className="sellTd   " >{client.ciudad}</td>
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
        
         
            <h3 className="bg-grey" >Editar Cliente</h3>
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
                       
           

            <label className='labelModal'>Nombres y Apellidos</label>
            <input
              className="inputModal"
              type="text"
              name="nombres"
              value={clientSeleccionado && clientSeleccionado.nombres}
              onChange={handleChangeModals}
            />
            <br />
            
            <label className='labelModal'>Cedula</label>
            <input
              className="inputModal"
              type="text"
              name="cedula"
              value={clientSeleccionado && clientSeleccionado.cedula}
              onChange={handleChangeModals}
            />
            <br />

            <label className='labelModal'>Contacto</label>
            <input
              className="inputModal"
              type="text"
              name="contact"
              value={clientSeleccionado && clientSeleccionado.contact}
              onChange={handleChangeModals}
            />
            <br />
            <label className='labelModal'>Licencia</label>
            <input
              className="inputModal"
              type="text"
              name="licencia"
              value={clientSeleccionado && clientSeleccionado.licencia}
              onChange={handleChangeModals}
            />
            <br />
            <label className='labelModal'>Ciudad</label>
            <input
              className="inputModal"
              type="text"
              name="ciudad"
              value={clientSeleccionado && clientSeleccionado.ciudad}
              onChange={handleChangeModals}
            />
            <br />

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
         <span className='bg-grey'> ¿Estás Seguro que deseas eliminar a {clientSeleccionado && clientSeleccionado.nombres}? </span>
         
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

