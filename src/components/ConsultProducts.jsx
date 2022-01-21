import { GlobalStyles } from '../styles/GlobalStyles';
import{useEffect, useState} from 'react'

import {Modal, ModalBody, ModalFooter} from 'reactstrap';
import {  useRef } from 'react';
import { useNavigate } from 'react-router';
import axios from 'axios'


const UrlStock='https://pwadmin.herokuapp.com/api/stockProducts/register'

export default function ConsultProo() {
  const navigate= useNavigate();

    //useRef para registrar productos al stock
    const Producto= useRef();
    const cantidad= useRef();
    const mes= useRef();
    const year= useRef();
    //funcion de registro Stock
    
    const handleClickStock=(e)=>{
      e.preventDefault();
   const newStock={
       Producto:Producto.current.value,
       cantidad:cantidad.current.value,
       mes:mes.current.value,
       year:year.current.value,
      
   }
   try{
       axios.post(UrlStock,newStock)
          navigate("/ConsultProductStock")
         //document.getElementById('formProduct').reset();

        
        }catch(err){
            console.log(err)
        }
  }


    //estado 1 almacena estatico:
const [Proovedors,setProovedors]= useState([]);

// estado 2 alamacena dinamico
const [tablaProovedors,setTablaProovedors]= useState([]);

// estado 3 controla el input buscador
const [busqueda,setBusqueda]=useState("");

// peticion get usuarios:
const getPro= async()=>{
    const res= await axios.get("https://pwadmin.herokuapp.com/api/products/products")
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
      if(elemento.nombre.toString().toLowerCase().includes(terminoBusqueda.toLowerCase())
      
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
    nombre: '',
    codigo:'',
    grados:'',
    tipo:'',
    precio:'',
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
    console.log(proSeleccionado);
  }

  //estado modalEliminar para controlar cuando se abre y cierra
  const [modalEliminar, setModalEliminar] = useState(false);
  
  //estado modalEditar para controlar cuando se abre y cierra
  const [modalEditar, setModalEditar] = useState(false);

   // 1 estado modalstock para controlar cuando se abre y cierra
   const [modalStock, setModalStock] = useState(false);
    
   //2 estado modalstock de registro para controlar cuando se abre y cierra
    const [modalstockRegistro, setModalStockRegistro] = useState(false);


  const seleccionarPro=(proovedor, caso)=>{
    setProSeleccionado(proovedor);
     if(caso==='Editar' ){
      setModalEditar(true)  
      
     } 
     
     else{
      setModalEliminar(true)
     } 
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
   const Url=`https://pwadmin.herokuapp.com/api/products/` 
   //funcion editar 
  //creo una variable auxiliar para poder almacenar la datanueva
  const editar = async()=>{
   

    try{
      
      await axios.put(Url+ proSeleccionado._id, proSeleccionado);
     
     let proovedorNuevo=Proovedors;
      
      proovedorNuevo.map(proovedor=>{
        if(proovedor._id===proSeleccionado._id){
          proovedor.nombre=proSeleccionado.nombre;
          proovedor.codigo=proSeleccionado.codigo;
          proovedor.grados=proSeleccionado.grados;
          proovedor.tipo=proSeleccionado.tipo;
          proovedor.precio=proSeleccionado.precio;

        }
       return proovedorNuevo
        
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
                    <h2> Productos Registrados</h2>
                </div>

                <div className="buscadorInput">
                    <input type="text" className="consultInput" placeholder="Busqueda por nombre de producto"
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
              
              <th className=" bg-grey">Nombre</th>
              <th className=" bg-grey">codigo</th>
              <th className=" bg-grey" >grado</th>
              <th className=" bg-grey" >tipo</th>
              <th className=" bg-grey" >Precio en Bolivares</th>
            </tr>
          </thead>

          <tbody>
            
              
              

              {Proovedors &&
            Proovedors.map((proovedor)=>(
              <tr>
                
                
                <td className="sellTd " >{proovedor.nombre}</td>
                
                
                <td className="sellTd  ">{proovedor.codigo}</td>

                 <td className="sellTd " >{proovedor.grados}</td>
                 
                 <td className="sellTd   " >{proovedor.tipo}</td>

                 <td className="sellTd   " >{proovedor.precio}</td>
                 
                 <td>
                   
                   <svg onClick={()=>seleccionarPro(proovedor, 'Editar')}  className="icons" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                     
                   <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v3m0 0v3m0-3h3m-3 0H9m12 0a9 9 0 11-18 0 9 9 0 0118 0z" />
                      
                     </svg>

                  
                   
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
        
         
            <h3 className="bg-grey" > Detalles del Producto</h3>
            <input
             className='none'
             readOnly
              type="text"
              name="_id"
              defaultValue={proSeleccionado && proSeleccionado._id}
            />
          
        <ModalBody className="modalBody">
          <div className="form-group">

            <label className='labelModal'>Nombre </label>
            <input
              className="inputModal"
              type="text"
              name="nombre"
              defaultValue={proSeleccionado && proSeleccionado.nombre}
              onChange={handleChangeModals}
            />
            <br />
            
            <label className='labelModal'>Codigo</label>
            <input
              className="inputModal"
              type="text"
              name="codigo"
              defaultValue={proSeleccionado && proSeleccionado.codigo}
              onChange={handleChangeModals}
            />
            <br />
            <label className='labelModal'>Grados</label>
            <input
              className="inputModal"
              type="number"
              name="grados"
              defaultValue={proSeleccionado && proSeleccionado.grados}
              onChange={handleChangeModals}
            />
            <br />

            <label className='labelModal'>Tipo de Licor</label>
            <input
              className="inputModal"
              type="text"
              name="tipo"
              defaultValue={proSeleccionado && proSeleccionado.tipo}
              onChange={handleChangeModals}
            />

        <label className='labelModal'>Precio en Bolivares</label>
            <input
              className="inputModal"
              type="number"
              name="precio"
              defaultValue={proSeleccionado && proSeleccionado.precio}
              onChange={handleChangeModals}
            />
            <br />

          </div>
        </ModalBody>
        <ModalFooter className='modalFooter'>
          
          <button className="btn-update" onClick={()=>editar()}>
            Editar
          </button>

          <button
            className=" btn-stock"
            onClick={()=>setModalStock(true)}
          >
           Add Stock
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

     
{/** VENTANA MODAL para stock ¿ quiere agregar al stock?:*/}
<Modal  className="overlayModal" isOpen={modalStock}>
        <ModalBody className="modalBodyEliminar" >
         <span className='bg-grey'> ¿Quieres agregar el producto {proSeleccionado && proSeleccionado.nombre} al stock? </span>
         
        </ModalBody>
        
        <ModalFooter className="modalFooterEliminar"  >
          <button className="btn-siEliminar"  onClick={()=>setModalStockRegistro(true)}>
            Sí
          </button>
          
          <button
            className="btn-noEliminar"
            onClick={()=>setModalStock(false)}
          >
            No
          </button>
        </ModalFooter>
      </Modal>

         {/** VENTANA MODAL para registrar producto en el stock:*/}
     
         <Modal className="overlayModal" isOpen={modalstockRegistro} >
        
        <form className="containerModal" onSubmit={handleClickStock}>
        
         
            <h3 className="bg-grey" >Registro de Stock</h3>
            
            <input
              className="none"
              readOnly
              type="text"
              value={proSeleccionado && proSeleccionado._id}
            />
          
        <ModalBody className="modalBody">
          <div className="form-group">

            <label className='labelModal'>Producto</label>
            <input
              className="inputModal"
              type="text"
              defaultValue={proSeleccionado && proSeleccionado.nombre}
              ref={Producto}

            />
            <br />
            
            <label className='labelModal'>Cantidad</label>
            <input
              className="inputModal"
              type="number"   
              ref={cantidad}
            />
            <br />
            
            <label className='labelModal'>Mes</label>
            <input
              className="inputModal"
              type="text"
              ref={mes}
            />
            <br />

            <label className='labelModal'>Año</label>
            <input
              className="inputModal"
              type="number"
              
              ref={year}
              
            />
            <br />
            
          </div>
        </ModalBody>
        <ModalFooter className='modalFooter'>
          

          <button
          type='submit'
            className="btn-stock"
          >
           Add Stock
          </button>
          
          <button
            className=" btn-danger"
            onClick={()=>setModalStockRegistro(false)}
          >
            Cancelar
          </button>
        </ModalFooter>
        </form>
      </Modal>


      {/** VENTANA MODAL para eliminar:*/}
     <Modal  className="overlayModal" isOpen={modalEliminar}>
        <ModalBody className="modalBodyEliminar" >
         <span className='bg-grey'> ¿Estás Seguro que deseas eliminar el producto {proSeleccionado && proSeleccionado.nombre}? </span>
         
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

