import { GlobalStyles } from '../styles/GlobalStyles';
import{useEffect, useState} from 'react'
import axios from "axios";
import {Modal, ModalBody, ModalFooter} from 'reactstrap';



const Url='https://pwadmin.herokuapp.com/api/proovedor/proovedors/'

export default function ConsultProo() {

    //estado 1 almacena estatico:
const [Proovedors,setProovedors]= useState([]);

// estado 2 alamacena dinamico
const [tablaProovedors,setTablaProovedors]= useState([]);

// estado 3 controla el input buscador
const [busqueda,setBusqueda]=useState("");

// peticion get usuarios:
const getPro= async()=>{
    const res= await axios.get("https://pwadmin.herokuapp.com/api/proovedor/proovedors")
    try{
      setProovedors(res.data);
      setTablaProovedors(res.data);
    }catch(err){
     console.log(err)
    }
 }

 const handleChange=(e)=>{
  setBusqueda(e.target.value);
  filtrar(e.target.value);

}

const filtrar=(terminoBusqueda)=>{
  let resultadosBusqueda=tablaProovedors.filter((elemento)=>{
      if(elemento.empresa.toString().toLowerCase().includes(terminoBusqueda.toLowerCase())
      
      ){
        return elemento;
      }
    });
    setProovedors(resultadosBusqueda);


}

//efecto getUsers
useEffect(()=>{
  getPro();
  return () => {
      setProovedors([]); // limpia los estados para no tener bug
      setTablaProovedors([]);
      
    };
  },[])

  //estado para controlar que proovedor esta seleccionado
  //este es un obj que debe tener los mismo atributos de mi data recorrida de los proovedorr

  const [proSeleccionado, setProSeleccionado] = useState({
    _id: '',
    empresa: '',
    rif:'',
    email:'',
    contact:'',
  });

  //con esta funcion se logra asignar al estado lo que el usuario esta escribiendo , en base al nombre del input
  //asi que el estado debe coincidir con el nombre que se le da al input
  //para los modales
  const handleChangeModals=e=>{
    const {name, value}=e.target;
    setProSeleccionado((prevState)=>({
      ...prevState,
      [name]: value
    }));
    //aca verifico si se guardo en mi estado
   // console.log(proSeleccionado);
  }

  //estado modalEliminar para controlar cuando se abre y cierra
  const [modalEliminar, setModalEliminar] = useState(false);
  //estado modalEliminar para controlar cuando se abre y cierra
  const [modalEditar, setModalEditar] = useState(false);

  const seleccionarPro=(proovedor, caso)=>{
    setProSeleccionado(proovedor);
      (caso==='Editar')
      ?setModalEditar(true)
      :setModalEliminar(true)
      
    }

    //funcion para eliminar
//filtra la data , los users que se queden son los que no coinciden con el user que se selecciono  setUsuarios(usuarios.filter(user=>user._id!==userSeleccionado._id));
  const eliminar = async()=>{
   
    try{
    await axios.delete(Url + proSeleccionado._id )
    setProovedors(Proovedors.filter(pro=>pro._id!==proSeleccionado._id));
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
      await axios.put(Url + proSeleccionado._id, proSeleccionado)
      let proovedorNuevo=Proovedors;
      proovedorNuevo.map(proovedor=>{
        if(proovedor._id===proSeleccionado._id){
          proovedor.empresa=proSeleccionado.empresa;
          proovedor.rif=proSeleccionado.rif;
          proovedor.email=proSeleccionado.email;
          proovedor.contact=proSeleccionado.contact;

        }
        return proovedorNuevo;
      });
      //ahora asigno al estado mi variable auxiliar(usuarioNuevo)
      setProovedors(proovedorNuevo);
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
                    <h2> Consulta de Proovedores</h2>
                </div>

                <div className="buscadorInput">
                    <input type="text" className="consultInput" placeholder="Busqueda por nombre de la empresa"
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
              
              <th className="tableHeader  bg-grey">Nombre</th>
              <th className="tableHeader  bg-grey">Rif</th>
              <th className="tableHeader  bg-grey" >Email</th>
              <th className="tableHeader  bg-grey" >Numero de Contacto</th>
              
            </tr>
          </thead>

          <tbody>
            
              
              

              {Proovedors &&
            Proovedors.map((proovedor)=>(
              <tr>
                
                
                <td className="sellTd " >{proovedor.empresa}</td>
                
                
                <td className="sellTd  ">{proovedor.rif}</td>

                 <td className="sellTd " >{proovedor.email}</td>
                 
                 <td className="sellTd   " >{proovedor.contact}</td>
                 
                 <td>
                   
                   <svg onClick={()=>seleccionarPro(proovedor, 'Editar')}  className="icons" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" /></svg>
                   
                   </td>
                   <td>
                   <svg onClick={()=>seleccionarPro(proovedor, 'Eliminar')}  className=" icons" fill="none" stroke="red" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" /></svg>

                   
                   
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
        
         
            <h3 className="bg-grey" >Editar Proovedor</h3>
            <input
              className="none"
              readOnly
              type="text"
              name="_id"
              value={proSeleccionado && proSeleccionado._id}
            />
          
        <ModalBody className="modalBody">
          <div className="form-group">
                       
           

            <label className='labelModal'>Empresa</label>
            <input
              className="inputModal"
              type="text"
              name="empresa"
              value={proSeleccionado && proSeleccionado.empresa}
              onChange={handleChangeModals}
            />
            <br />
            
            <label className='labelModal'>Rif</label>
            <input
              className="inputModal"
              type="text"
              name="rif"
              value={proSeleccionado && proSeleccionado.rif}
              onChange={handleChangeModals}
            />
            <br />
            <label className='labelModal'>Email</label>
            <input
              className="inputModal"
              type="text"
              name="email"
              value={proSeleccionado && proSeleccionado.email}
              onChange={handleChangeModals}
            />
            <br />

            <label className='labelModal'>Contacto</label>
            <input
              className="inputModal"
              type="text"
              name="contact"
              value={proSeleccionado && proSeleccionado.contact}
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
         <span className='bg-grey'> ¿Estás Seguro que deseas eliminar a {proSeleccionado && proSeleccionado.empresa}? </span>
         
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

