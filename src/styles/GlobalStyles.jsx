
import { createGlobalStyle } from 'styled-components';

export let grey =`rgb(240, 240, 255);`;

 export const GlobalStyles = createGlobalStyle `
   

 body{
    
    background:${({theme})=> theme.body};
    color:${({theme})=> theme.text};
    transition: all .4s ;
    overflow-x: hidden;
    
    
}
.icons{
    width: 20px;
    height: 20px;
    cursor: pointer;
}

.index{
    position: sticky;
            top: 0;
            z-index: 1;   
            
            background:${({theme})=> theme.body};
            
}
.sidebarMenu{
    margin-bottom: 10px;
}
.sidebarTitle {
  font-size: 1rem;
  
}
.logo{
        font-weight: bold;
        font-size: 2rem;
        cursor: pointer;
        display: flex;
    }
    .aster{
        color: #6200ee;
        margin-left: 5px;
        margin-top: 4px;
        margin-bottom: 0;
        font-size: 2rem;
        font-weight: bold;
        padding: 0;
    }

    .bg-grey{
        background-color:  ${grey};
        color: black;
        border-radius: 10px;
        padding: 5px;
    }
    .sidebarList{
        list-style: none;
        padding: 5px;
    }
    .sidebarListItem{
        padding: 5px;
        cursor: pointer;
        display: flex;
        align-items: center;
        border-radius: 10px;
        &:hover.active{
            background-color: ${grey};
            color:black;
        }
    }
    .featuredItem{
        margin: 0px 20px;
        padding: 30px;
    }
    .featuredTitle{
    font-size: 20px;
}

.links{
    color:${({theme})=> theme.text};
  text-decoration: none;


}

.links:visited {
  text-decoration: none;
 }
 
 .links:hover, .links:focus {
  text-decoration: none;
  }

.dropdown-content{
    position: absolute;
  top: 100%;
  left: 86%;
  padding: 10px;
  background: #fff;
  font-weight: 500;
  width: 140px;
  border: none;
  border-radius: 10px;
}
.dropdown-item{
  padding: 10px;
  cursor: pointer;
  transition: all 0.2s;
  color:black;
  &:hover{
    background-color: ${grey};
            color:black;
            border-radius: 10px;
  }
}

.ConsultTable{
    
         height: 100vh;      
        display: flex;
        flex-direction: column; 
        .ConsultHeader{
            display: flex;
            justify-content: center;
            flex-direction: column;
            align-items: center;
            width: 100%;
            height: 150px;  
           
            
        }
        
        
}


.titleConsult{
        text-align: center;
        font-size: 20px;
    }
    .buscadorInput{
        display: flex;
        justify-content: center;
       
        width: 100%;
        height: 40px;
        .consultInput{
            width: 450px;
            height: 100%;
            border-radius: 10px;
            border: 1px solid gray;
            font-size: 15px;
            padding-left:20px ;
            margin-bottom:10px;
        }
        .consultInput:focus{
            outline: none;
        }
        .btn-Search{
            margin-left: 6px;
            width: 30px;
            height: 30px;
            background-color: #8045EF;
            border-radius: 10px;
           padding: 5px;
        }
    }

    .btn-edit{
                height: 25px;
                border: none;
                border-radius: 10px;
                background-color: #6200ee;
                color: white;
                font-size: 15px;
                font-weight: 500;
                cursor: pointer;
    }
    
    .consultBox{
        display:flex;
        justify-content:center;
        margin-top:10px;
        align-items:center;
    }
        .btn-consult{
            padding:10px;
              
               width: 180px;  
                height: 35px;
                border: none;
                border-radius: 10px;
                background-color: #6200ee;
                color: white;
                font-size: 15px;
                font-weight: 500;
                cursor: pointer;
        }
    .WrapSellersTable{
            display: flex;
            
            margin-top: 25px;
            justify-content: space-around;
            flex-direction: column;
            flex-wrap: wrap;
           .tableSell{
            //border: 1px solid;
               padding: 15px;
               tbody{
                
                   text-align: center;
               }
               .sellTd{  
                
                width: 450px;
                height: 100%;
                border-radius: 5px;
                //border: 1px solid ${grey} ;
                font-size: 15px;
                padding-left:20px ;
                margin-bottom:10px;
                cursor: pointer;
                text-align: center;
                &:hover.active{
                background-color: ${grey};
                color:black;
        }

       
               }
           }

           .containUsername{
            text-align: center;
            position: relative;
            
            .aster2{
                position: absolute;
                color: #6200ee;
                left: 10px;
                top: 6px;
                font-weight: bold;
                padding: 0;
                font-size: 25px;
            }
           
            
        }
       
           
        }



        .Register{        
            height: 100vh; 
            display: flex;
            align-items: center;
            justify-content: center;
        .RegisterWrapper{
            width: 70%;
            height: 70%;
            display: flex;
            .RegisterLeft, .RegisterRight{
            flex: 1;
            display: flex;
            flex-direction: column;
            justify-content: center;
         }

         .loginLogo{
            font-size: 50px;
            font-weight: 800;
            margin-bottom: 10px;
            text-align: center;
            .loginAster{
                color: #6200ee;
                margin-left: 5px;
                margin-top: 4px;
                margin-bottom: 0;
                font-size: 50px;
                font-weight: bold;
                padding: 0;
            }
            
         }
         .loginDesc{
                text-align: center;
            }
            .loginBox{
                width: 100%;
                height: 100%;
               
                padding: 20px;
                background-color: white;
                border-radius: 10px;
                display: flex;
                flex-direction: column;
                justify-content: space-between;
                
            }
            .loginInput{
            height: 50px;
            border-radius: 10px;
            border: 1px solid gray;
            font-size: 15px;
            padding-left:20px ;
            margin-bottom:10px;
            
            &:focus{
                outline: none;
            }
            }
            .loginButton{
                height: 50px;
                border: none;
                border-radius: 10px;
                background-color: #6200ee;
                color: white;
                font-size: 20px;
                font-weight: 500;
                cursor: pointer;
            }
            .loginForgot{
                text-align: center;
                cursor: pointer;
                &:hover{
                    color: #6200ee;
                    
                }
            }
            .ProfileUserWrap{
                display: flex;
                margin-top: 20px;
                height:150px;
                width: 100%;
                //background-color: #F0F0FF;
                justify-content: center;
                align-items: center;
                .imgPerfil{
                height: 150px;
                width: 150px;
                border-radius: 50%;  
                object-fit: cover;
                cursor: pointer;
                }
            }
        }
    }

    .PerfilButtons{
       
        display: flex;
        justify-content:space-around;
        .PerfilButton{
            
                border: none;
                border-radius: 10px;
                background-color: #6200ee;
                color: white;
                font-size: 20px;
                font-weight: 500;
                cursor: pointer;
                padding: 5px;
                height: 50px;
                width: 100px;
        }
    }
    .none{
                display: none;
            }

            .overlayModal{
                width: 100vw;
                height: 100vh;
                position: fixed;
                top: 0;
                left: 0;
                background-color: rgba(0,0,0,0.5);
                padding: 40px;
                display: flex;
                align-items: center;
                justify-content: center;
                
                .containerModal{
                    width: 500px;
                    height: 100%;
                    
                    background: #fff;
                    position: relative;
                    border-radius: 5px;
                    box-shadow:rgba(100,100,111,0.2) 0px 7px 29px 0px;
                    padding: 30px;
                }   
                   
                    h3{
                        text-align: center;
                        font-weight: 500;
                        font-size: 26px;
                        
                    }
              
                .modalBody{
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    padding: 20px;
                    label{
                        color: black;
                    }
                    .inputModal{
                        width: 450px;
                        height: 35px;
                        border-radius: 10px;
                        border: 1px solid gray;
                        font-size: 15px;
                        padding-left:20px ;
                        margin-bottom:10px;
                    }
                    .selectModal{
                        width: 472px;
                        height: 35px;
                        border-radius: 10px;
                        border: 1px solid gray;
                        font-size: 15px;
                        padding-left:20px ;
                        margin-bottom:10px;
                    }
                }
                .modalFooter{
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    //margin-top:15px;
                    margin-bottom: 25px;
                    padding-bottom: 30px;
                    .btn-update{
                        
                        height: 35px;
                        border: none;
                        border-radius: 10px;
                        padding: 10px;
                        background-color: #6200ee;
                        color: white;
                        font-size: 16px;
                        font-weight: 500;
                        cursor: pointer;
                        
                    }
                    .btn-danger{
                        height: 35px;
                        border: none;
                        border-radius: 10px;
                        padding: 10px;
                        background-color: #b61b1b;
                        color: white;
                        font-size: 16px;
                        font-weight: 500;
                        cursor: pointer;
                        margin-left: 10px;
                    }

                    .btn-stock{
                        height: 35px;
                        border: none;
                        border-radius: 10px;
                        padding: 10px;
                                background-color: #107919;
                                color: white;
                                font-size: 16px;
                                font-weight: 500;
                                cursor: pointer;
                                margin-left: 10px;
                                
                    }
                }
            }
            .modalBodyEliminar{
                width: 500px;
                    height: 100%;
                    //min-height: 100px;
                    background: #fff;
                    position: relative;
                    padding: 30px;
            }
            .modalFooterEliminar{
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    //margin-top:15px;
                    margin-bottom: 25px;
                    padding-bottom: 30px;
                    background: #fff;
                    .btn-siEliminar{
                        width: 70px;
                        height: 35px;
                        border: none;
                        border-radius: 10px;
                        padding: 10px;
                        background-color: #6200ee;
                        color: white;
                        font-size: 16px;
                        font-weight: 500;
                        cursor: pointer;
                        margin-left: 10px;
                    }
                    .btn-noEliminar{
                        width: 70px;
                        height: 35px;
                        border: none;
                        border-radius: 10px;
                        padding: 10px;
                        background-color: #b61b1b;
                        color: white;
                        font-size: 16px;
                        font-weight: 500;
                        cursor: pointer;
                        margin-left: 10px;
                    }
            }

            .consultContainer{
                display: flex;
                margin-top: 25px;
                height: 100vh;
                width: 100vw;  
                z-index: -1; 
                .consultWrapper{
                    display: flex;
                    flex-direction: column;
                    flex-wrap:wrap;
                    width: 100%;
                    -webkit-box-shadow: 0px 0px 15px -10px rgba(0, 0, 0, 0.75);
                box-shadow: 0px 0px 15px -10px rgba(0, 0, 0, 0.75);
                //padding: 20px;
                }
            }

            
                
                .chartWrap{
                    margin:20px;
                    padding:20px;
                    -webkit-box-shadow: 0px 0px 15px -10px rgba(0, 0, 0, 0.75);
                box-shadow: 0px 0px 15px -10px rgba(0, 0, 0, 0.75);
            .chartTitle{
                margin-bottom:20px;
            }    
            }

            .containerFactura{
                    display: flex;
                    flex-direction: column;
                    flex-wrap:wrap;
                    width: 75%;
                    margin:auto;
                    //padding:10px;
                    justify-content:center;
                    align-items:center;
                    -webkit-box-shadow: 0px 0px 15px -10px rgba(0, 0, 0, 0.75);
                    box-shadow: 0px 0px 15px -10px rgba(0, 0, 0, 0.75);
                    
                    .primeraSeccion{
                        display: flex;
                        align-items:center;
                        justify-content:center;
                        width: 100%;
                        .cardSeccion{
                            
                            display:flex;
                            flex-direction: column;
                            flex-wrap:wrap;
                            justify-content:center;
                            align-items:center;
                            width: 100%;
                            
                            .card-body{
                                display:flex;
                                align-items:center;
                               
                            justify-content:center;
                                
                            -webkit-box-shadow: 0px 0px 15px -10px rgba(0, 0, 0, 0.75);
                            box-shadow: 0px 0px 15px -10px rgba(0, 0, 0, 0.75);
                            }
                            .formbody{
                                width: 100%;
                               
                                display:flex;
                                align-items:center;
                                justify-content:space-between;
                                height:250px;
                                flex-wrap:wrap;
                                
                                
                            .form-group{
                               
                                width: 300px;
                                display:flex;
                                flex-direction: column;
                                align-items:center;
                               
                                justify-content:space-between;
                                .form-control{
                                    width: 250px;
                                    padding:10px;
                                    //outline:none;
                                    border-radius: 5px;
                                    border: 1px solid gray;
                                    font-size: 15px;
                                   
                                    
                                    
                                }
                                
                            }
                            }


                        }

                    }
                    .segundaSeccion{
                        margin-top:50px;
                        display: flex;
                                align-items:center;
                                justify-content:center;
                                width: 100%;
                     .cardsegundaSeccion{
                        display:flex;
                        flex-direction: column;
                        flex-wrap:wrap;
                        justify-content:center;
                        align-items:center;
                        width: 100%;
                        .card-bodySegundo{
                            display:flex;
                            align-items:center;
                           
                        justify-content:center;
                            
                            //width: 100%;
                        }
                     }
                     .formbodySegundo{
                        width: 95%;
                        
                        display:flex;
                        align-items:center;
                        justify-content:space-between;
                        height:180px;
                        flex-wrap:wrap;

                        .form-groupSegundo{
                            
                            width: 280px;
                            display:flex;
                            flex-direction: column;
                            align-items:center;
                           
                            justify-content:space-between;
                            .form-control{
                                width: 250px;
                                outline:none;
                                border:none;
                                border-radius: 5px;
                                border: 1px solid gray;
                                font-size: 15px;
                                padding:10px ;
                                
                                
                                
                                
                            }
                        }
                    }
              }

            }
            
            
`;
 
export const lightTheme = {
    body:'#fff',
    text:'#121212',
    primary:'#6200ee'
    
};


export const darkTheme = {
    body:'#222',
    text:'#fff',
    primary:"#bb86fc"
};

//otros colores

