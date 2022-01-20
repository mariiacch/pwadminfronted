import { GlobalStyles } from '../styles/GlobalStyles';
import React,{useEffect, useState, useRef} from 'react'
import axios from "axios";

import DatePicker from "react-datepicker";

 function CrearFact() {
    const UrlProducts='http://localhost:8800/api/products/products'

    const UrlClients='http://localhost:8800/api/clients/clients'

    const [startDate, setStartDate] = useState(new Date());
    
    const nombre= useRef();
    const fecha= useRef();
    const precioTotal= useRef();

    //estado counter :
    const [counter, setCounter]= useState(0);

    // estado  alamacena productos:
const [Products,setProducts]= useState([]);

// estado  alamacena clientes:
const [Clients,setClients]= useState([]);

//estado que maneja los onchange:
const [itemSelect,setitemSelect]= useState({
    name:'',
    precio:'',
    domicilio: '',
    rif: '',
    ciudad:'',
    licencia:'',
    codigo:'',
    pago:'',
    telf:'',
    producto:'',
    cantidad:''
    
  });

  const handleChangeInputs=e=>{
    const {name, value}=e.target;
    setitemSelect((prevState)=>({
      ...prevState,
      [name]: value
    }));
    //aca verifico si se guardo en mi estado
    console.log(itemSelect);
  }

  const handleChangeDate=value=>{
      console.log(value);
    setStartDate({inputValue: value})
  }

  


// peticion get products:
const getPro= async()=>{
    const res= await axios.get( UrlProducts)
    try{
        setProducts(res.data);
    }catch(err){
     console.log(err)
    }
 }

 //peticion get Clients:
 const getClients= async()=>{
    const res= await axios.get( UrlClients)
    try{
        setClients(res.data);
    }catch(err){
     console.log(err)
    }
 }
 //efecto getUsers
useEffect(()=>{
    getPro();
    getClients();
    return () => {
        setProducts([]); // limpia los estados para no tener bug
        setClients()
      };
    },[])

    const guardarProduct=(e)=>{
        e.preventDefault()
        //crear el obj de la cabecera de la factura
    let objFactura={
        //nombre:{itemSelect.name.value}
        nombre:nombre.current.value,
        fecha:startDate.Date,
    }
        console.log(objFactura);
    }

    

     
    return (
        <>
        <GlobalStyles/>
        
           <div className="containerFactura">
            <h1 className="titleFact "> Factura</h1>
            <hr/>
            

                {/**primera seccion de la factura */}
       
        <section className="primeraSeccion">
                

                <div className="cardSeccion">
                
                <div className="cardSeccionHeader">
                    <h3>Cabecera de Factura</h3>
                </div>
                <input type="text"
                value={counter }
                />
                    <div className="card-body">
                        <form className='formbody' id="formCabecera">
                            <div className="form-group">
                                <label>Razon Social o Nombres y Apellidos</label>
                                
                                

                                <select className='form-control'
                                name="name" value={itemSelect.name}
                                 onChange={handleChangeInputs}
                                 ref={nombre}
                
                                >
                                    {Clients && 
                                    Clients.map((e)=>(
                                        <option  key={e.nombres} value={e.name}>{e.nombres}</option>
                                    ))
                                    }
                                </select>

                               
                            </div>
                            <div className="form-group">
                                <label>Fecha</label>
                                

                                <DatePicker className='form-control' 
                                value={startDate.inputValue}
                                ref={fecha}
                                selected={startDate.inputValue} 
                                onChange={handleChangeDate}
                                 />
                                 
                               
                            </div>
                            <div className="form-group">
                                <label>Domicilio Fiscal</label>
                               
                                <input name='domicilio' 
                                type="text" 
                                className="form-control"
                                placeholder="Ejm : Calle 3 Carrera 12"
                                value={itemSelect.domicilio}
                                onChange={handleChangeInputs}
                                />
                            </div>
                            
                            <div className="form-group">
                                <label>Rif y/o Cedula</label>
                                <input 
                                value={itemSelect.rif}
                                onChange={handleChangeInputs}
                                name='rif' 
                                type="text" 
                                className="form-control"
                                placeholder="Ejm : J-05064820"
                               
                                />
                            </div>
                            
                            <div className="form-group">
                                <label>Ciudad Destino</label>
                                <input name='ciudad' type="text" 
                                className="form-control"
                                placeholder="Ejm : J-05064820"
                                value={itemSelect.ciudad}
                                onChange={handleChangeInputs}
                                />
                            </div>

                            <div className="form-group">
                                <label>Licencia</label>
                                <input name='licencia' type="number"
                                className="form-control"
                                value={itemSelect.licencia}
                                placeholder='Numero de Licencia o Registro'
                                onChange={handleChangeInputs}
                                />
                            </div>

                            <div className="form-group">
                                <label>Codigo del Cliente</label>
                                <input name='codigo' type="number"
                                className="form-control"
                                value={itemSelect.codigo}
                                placeholder='Codigo del Cliente'
                                onChange={handleChangeInputs}
                                />
                            </div>

                            <div className="form-group ">
                                <label >Forma de Pago</label>
                                <input name='pago' 
                                type="text" 
                                className="form-control"
                                placeholder="Ingrese metodo de pago"
                                value={itemSelect.pago}
                                onChange={handleChangeInputs}
                                />
                                
                            </div>

                            <div className="form-group">
                                <label>Telefono</label>
                                <input  name='telf'type="number"
                                className="form-control"
                                value={itemSelect.telf}
                                placeholder='Telefono del Cliente'
                                onChange={handleChangeInputs}
                                />
                            </div>

                            


                        </form>
                    </div>
               
            </div>
        </section>
        {/** Fin primera seccion de la factura */}

        <section className="segundaSeccion">
            
                <div className="cardsegundaSeccion">
                    <div className="card-bodySegundo">
                        <form className='formbodySegundo' id="formDetalle" >
                            
                            <div className="form-groupSegundo ">
                                <label> Cantidad</label>
                                <input type="number"
                                value={itemSelect.cantidad} 
                                className="form-control" 
                                name='cantidad'
                                onChange={handleChangeInputs}
                                />
                            </div>

                            <div className="form-groupSegundo ">
                                <label >Producto</label>
                                <select className='form-control'
                                name="producto" 
                                value={itemSelect.producto}
                                 onChange={handleChangeInputs}
                
                                >
                                    {Products && 
                                    Products.map((e)=>(
                                        <option  key={e.nombre} value={e.producto}>{e.nombre}</option>
                                    ))
                                    }
                                </select>
                                
                            </div>
                            <div className="form-groupSegundo">
                                <label > P. Unit</label>
                                <input  name='precio'   
                                type="number" className="form-control" 
                                value={itemSelect.precio}
                                id="precioUnitario"
                                onChange={handleChangeInputs}
                                />
                            </div>
                            <div className="form-groupSegundo">
                                <label >P.Total</label>
                                <input type="number"  
                                className="form-control" 
                                value={itemSelect.precioTotal}
                                name="precioTotal"/>
                            </div>
                            <div className="form-groupSegundo">
                                
                               <button type="submit" className="btn-consult">
                                    Agregar
                               </button>
                            </div>

                            <div className="form-groupSegundo">
                        <button
                        onClick={guardarProduct}
                        className="btn-consult" id="btnGuardar">
                            Guardar Factura 
                        </button>
                         </div>
                        </form>
                    </div>
                </div>
           
        
        
        </section>
        

        <section className="row mt-4">
            <div className="col">
                <table className="table text-center">
                    <thead>
                        <tr>
                            <th>Cantidad</th>
                            <th>Descripcion</th>
                            <th>Precio Unitario</th>
                            <th>Precio Total</th>
                           
                        </tr>
                    </thead>
                    
                    <tbody id="cuerpoTabla">
                        <tr>{}</tr>
                    </tbody>
                </table>
            </div>
        </section>
    
    
</div>
        
        </>
    )
}

export default CrearFact;
