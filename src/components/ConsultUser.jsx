import { GlobalStyles } from '../styles/GlobalStyles';
import{useEffect, useState,useRef } from 'react'

import {Modal, ModalBody, ModalFooter} from 'reactstrap';
//import { axiosInstance } from '../../../config';
import axios from "axios"


export default function ConsultUser() {

    const password= useRef();
    const passwordAgain = useRef();

  const Url='https://pwadmin.herokuapp.com/users/'

  //estado del modal:
  const [estadoModal1, cambiarEstadoModal1]= useState(false);
  console.log(cambiarEstadoModal1);
  console.log(estadoModal1);
/**creare 3 estados
 * 1 para almacenar de forma estatica
 * 2 para almacenar los datos que arroja de forma dinamica
 * 3 para controlar lo que se escribe en la barra de busqueda(input )
 
 */

//estado 1 almacena estatico:
const [usuarios,setUsuarios]= useState([]);
console.log(usuarios);

// estado 2 alamacena dinamico
const [tablaUsuarios,setTablaUsuarios]= useState([]);

// estado 3 controla el input buscador
const [busqueda,setBusqueda]=useState("");

//estado para controlar que user esta seleccionado
  //este es un obj que debe tener los mismo atributos de mi data recorrida de los users

  const [userSeleccionado, setUserSeleccionado] = useState({
    _id: '',
    username: '',
    nombres: '',
    apellidos:'',
    email:'',
    password:'',
    passwordAgain:''
  });

// peticion get usuarios:
const getUsers= async()=>{
   const res= await axios.get("users/users")
   try{
    setUsuarios(res.data);
    setTablaUsuarios(res.data);
   }catch(err){
    console.log(err)
   }
}



// capturo lo que el usuario escribe en el input y lo almaceno en el estado
// a su vez llamo la funcion filtrar para la busqueda de elementos
const handleChange=(e)=>{
    setBusqueda(e.target.value);
    filtrar(e.target.value);

}
//esta funcion es para capturar lo que el usuario escribe en cada uno de los inputs
  //con esta funcion se logra asignar al estado lo que el usuario esta escribiendo , en base al nombre del input
  //asi que el estado debe coincidir con el nombre que se le da al input
  const handleChangeModals=e=>{
    const {name, value}=e.target;
    setUserSeleccionado((prevState)=>({
      ...prevState,
      [name]: value
    }));
    //aca verifico si se guardo en mi estado
   // console.log(userSeleccionado);
  }
const filtrar=(terminoBusqueda)=>{
    let resultadosBusqueda=tablaUsuarios.filter((elemento)=>{
        if(elemento.username.toString().toLowerCase().includes(terminoBusqueda.toLowerCase())
        
        ){
          return elemento;
        }
      });
      setUsuarios(resultadosBusqueda);


}

 
//efecto getUsers
useEffect(()=>{
    getUsers();
    return () => {
        setUsuarios([]); // limpia los estados para no tener bug
        setTablaUsuarios([]);
        
      };
    },[])

    //estado modalEliminar para controlar cuando se abre y cierra
  const [modalEliminar, setModalEliminar] = useState(false);
  //estado modalEliminar para controlar cuando se abre y cierra
  const [modalEditar, setModalEditar] = useState(false);
    
  const seleccionarUser=(user, caso)=>{
    setUserSeleccionado(user);
      (caso==='Editar')
      ?setModalEditar(true)
      :setModalEliminar(true)
      
    }
    
    //funcion para eliminar
//filtra la data , los users que se queden son los que no coinciden con el user que se selecciono  setUsuarios(usuarios.filter(user=>user._id!==userSeleccionado._id));
  const eliminar = async()=>{
   
   try{
   await axios.delete(Url + userSeleccionado._id )
      setUsuarios(usuarios.filter(user=>user._id!==userSeleccionado._id));
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
      await axios.put(Url + userSeleccionado._id,userSeleccionado )
      let usuarioNuevo=usuarios;
      usuarioNuevo.map(user=>{
        if(user._id===userSeleccionado._id){
          user.username=userSeleccionado.username;
          user.nombres=userSeleccionado.nombres;
          user.apellidos=userSeleccionado.apellidos;
          user.email=userSeleccionado.email;
          user.password=userSeleccionado.password;

        }
        return usuarioNuevo;
      });
      //ahora asigno al estado mi variable auxiliar(usuarioNuevo)
        setUsuarios(usuarioNuevo);
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
                    <h2> Consulta de Usuarios </h2>
                    
                </div>

                <div className="buscadorInput">
                    <input type="text" 
                    className="consultInput"
                    required
                    placeholder="Busqueda por nombre de usuario "
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
              <th className="tableHeader bg-grey " >Usuario</th>
              <th className="tableHeader bg-grey">Nombres</th>
              <th className="tableHeader bg-grey" >Apellidos</th>
              <th  className="tableHeader bg-grey ">Email</th>
              
            </tr>
          </thead>

          <tbody>
          {usuarios &&
            usuarios.map((user)=>(
              <tr key={user._id}>

                <td  className="sellTd " > 
                {user.username}</td>
                
                <td className="sellTd  ">{user.nombres}</td>

                <td className="sellTd  " >{user.apellidos}</td>
              
                 <td className="sellTd" >{user.email}</td>
                 <td>
                   
                   <svg  onClick={()=>seleccionarUser(user, 'Editar')}  className="icons" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" /></svg>
                   
                   </td>

                   <td>
                   <svg  onClick={()=>seleccionarUser(user, 'Eliminar')} className=" icons" fill="none" stroke="red" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" /></svg>

                   
                   
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
              value={userSeleccionado && userSeleccionado._id}
            />
          
        <ModalBody className="modalBody">
          <div className="form-group">
                       
           <label >Username</label>
            <input
              className="inputModal "
              type="text"
              name="username"
              value={userSeleccionado && userSeleccionado.username}
              onChange={handleChangeModals}
            />
            <br />


            <label className='labelModal'>Nombres</label>
            <input
              className="inputModal"
              type="text"
              name="nombres"
              value={userSeleccionado && userSeleccionado.nombres}
              onChange={handleChangeModals}
            />
            <br />
            
            <label className='labelModal'>Apellidos</label>
            <input
              className="inputModal"
              type="text"
              name="apellidos"
              value={userSeleccionado && userSeleccionado.apellidos}
              onChange={handleChangeModals}
            />
            <br />

            <label className='labelModal'>Email</label>
            <input
              className="inputModal"
              type="text"
              name="email"
              value={userSeleccionado && userSeleccionado.email}
              onChange={handleChangeModals}
            />
            <br />
            
            <label className='labelModal'>Reestablece Contraseña</label>
            <input
              className="inputModal"
              type="password"
              name="password"
              ref={password}
              value={userSeleccionado && userSeleccionado.password}
              onChange={handleChangeModals}
            />
            <br />
            <label className='labelModal'>Confirma Contraseña</label>
            <input
              className="inputModal"
              type="password"
              name="passwordAgain"
              ref={passwordAgain}
              value={userSeleccionado && userSeleccionado.passwordAgain}
              onChange={handleChangeModals}
            />
            
            
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
         <span className='bg-grey'> ¿Estás Seguro que deseas eliminar el usuario {userSeleccionado && userSeleccionado.username}? </span>
         
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
