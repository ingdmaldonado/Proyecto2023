

/********************************************************************************************************/
/********************************************************************************************************/
/************************************** PROGRAMA PRINCIPAL  *********************************************/
/********************************************************************************************************/
/********************************************************************************************************/

window.addEventListener("load",()=>
{

    /***********************************************/
    /*** PRIMERA PARTE - BUSCAR CLIENTE POR (ID) ***/
    /***********************************************/

    const txtClienteIdParaBuscar = document.querySelector("#txtClienteIdParaBuscar"); // me vinculo a la caja del (ID) para buscar
    const btnBuscarClientePorId = document.querySelector("#btnBuscarClientePorId"); // me al botón de Buscar por (ID)

    btnBuscarClientePorId.addEventListener("click",async ()=> // implementamos el Evento Click del Botón Buscar por (ID) observar que tiene la palabra async
    {       
        let clienteid = parseInt(txtClienteIdParaBuscar.value); // Obtengo el (ID) que ingresó en la caja de texto (ID)
        await fnBuscarClientePorID(clienteid); // Invoco la función fnBuscarClientePorID pasandole como parámetro el (ID)
    })

    /*************************************************/
    /*** SEGUNDA PARTE - BUSCAR CLIENTE POR (CUIT) ***/
    /*************************************************/

    const txtClienteCuitParaBuscar = document.querySelector("#txtClienteCuitParaBuscar"); // me vinculo a la caja de texto donde se ingresa el Cuit a Buscar
    const btnBuscarClientePorCuit = document.querySelector("#btnBuscarClientePorCuit"); // me vinculo al botón que dice buscar por Cuit

    btnBuscarClientePorCuit.addEventListener("click", async()=> // Implemento el Click del Boton Buscar por Cuit - Observar que lleva la palabra async
    {
        let clientecuit = txtClienteCuitParaBuscar.value; // Obtengo el Cuit que ingreso en la caja de texto

        if (clientecuit.length === 11) // Si la longitud del Cuit Ingresado es de 11 dígitos entro y busco
        {
            await fnBuscarClientePorCUIT(clientecuit); // busco de forma síncrona el cuit, invocando la funcion y pasandole como parámetro el CUIT.
        }
        else
        {
            alert("faltan digitos en el cuit para realizar la busqueda"); // Si no cumple con los 11 dígitos no busco
        }
    })

    /******************************************************/
    /*** TERCERA PARTE - VISUALIZACION DE LOS DATOS     ***/
    /******************************************************/

    const txtclienteid = document.querySelector("#txtclienteid"); // me vinculo con la caja donde muestro el clienteid
    const txtclientecuit = document.querySelector("#txtclientecuit"); // me vinculo con la caja donde muestro el cuit
    const txtclientenombre = document.querySelector("#txtclientenombre"); // me vinculo con la caja donde muestro el nombre
    const btnNuevoCliente = document.querySelector("#btnNuevoCliente"); // me vinculo con el boton Nuevo Cliente
	const btnGuardarCambios = document.querySelector("#btnGuardarCambios"); // me vinculo con el boton Guardar Cambios

    /*** EL BOTON NUEVO => Lo unico que hace es Limpiar las cajas de texto y poner el (ID) en CERO     
        Al Poner el (ID) en Cero, significa que el dato que voy a ingresar es NUEVO, LIMPIO, es decir
        que se intentará guardar en la base de datos      
    */
    btnNuevoCliente.addEventListener("click",()=>
    {     

        txtclienteid.value = 0; // pongo en cero la caja del id
        txtclientecuit.value = 0; // pongo en cero la caja del cuit
        txtclientenombre.value = ""; // pongo en vacío la caja del nombre

    })
 
    /*** EL BOTON GUARDAR => En Caso que la caja de Texto txtclienteid sea === 0 => entiende que se debe actualizar */
    btnGuardarCambios.addEventListener("click",async ()=>
    {
        let clienteidParaActualizar = txtclienteid.value; // saco el ID de la caja de texto
        let ClienteCuitParaActualizar = txtclientecuit.value; // saco el CUIT de la caja de texto
        let ClienteNombreParaActualizar = txtclientenombre.value; // saco el NOMBRE de la caja de texto

        /* aqui armo un objeto literal */
        let ClienteParaActualizar = {clienteid:clienteidParaActualizar,clientecuit:ClienteCuitParaActualizar,clientenombre:ClienteNombreParaActualizar};
      
        /* Previo a Insertar / actualizar se debería verificar que el CUIT sea válido, que el nombre no esté vacio, etc */

        if (parseInt(clienteidParaActualizar) === 0) // por el Lado verdadero intento INSERTAR REGISTRO NUEVO
        {           
            await fnActualizarCliente(JSON.stringify(ClienteParaActualizar),'POST');
            alert("insertando uno nuevo");        
        }
        else // por el Lado Falso MODIFICO UN REGISTRO EXISTENTE
        {           
            await fnActualizarCliente(JSON.stringify(ClienteParaActualizar),'PUT');
            alert("modificando uno existente");    
        }      
    }) 

    /***************************************************/
    /*** CUARTA PARTE - BUSCAR CLIENTE POR (NOMBRE) ***/
    /***************************************************/

    const txtClienteNombreParaBuscar = document.querySelector("#txtClienteNombreParaBuscar"); // me vinculo a la caja de texto donde voy a obtener el nombre a buscar
    const btnBuscarClientePorNombre = document.querySelector("#btnBuscarClientePorNombre"); // me vinculo al boton que dice Buscar por Nombre
    const idTableBody = document.querySelector("#idTableBody");

    /* Le implemento el click al Boton Buscar por Nombre */
    btnBuscarClientePorNombre.addEventListener("click",async ()=> // observar que tiene antepuesto el nombre async
    {    
        let clientenombre = txtClienteNombreParaBuscar.value; // saco el nombre a buscar de la caja de texto

        await fnBuscarClientePorNOMBRE(clientenombre); // Invoco la funcion que Busca efectivamente pasandole como parametro el nombre
    })

    /*****************************************************/
    /*** QUINTA PARTE - BUSQUEDA PROGRESIVA POR NOMBRE ***/
    /*****************************************************/

    const idtxtBusquedaProgresiva = document.querySelector("#idtxtBusquedaProgresiva");
    const idlblBusquedaProgresiva = document.querySelector("#idlblBusquedaProgresiva");

    console.log(idtxtBusquedaProgresiva);
    console.log(idlblBusquedaProgresiva);

    // Agrega un event listener al input para detectar cambios de entrada
    idtxtBusquedaProgresiva.addEventListener('input',async () => {
        // Actualiza el contenido del label con el valor del input
        idlblBusquedaProgresiva.textContent = idtxtBusquedaProgresiva.value;
        await fnBuscarClientePorNOMBRE(idtxtBusquedaProgresiva.value);  
    });


})


/********************************************************************************************************/
/********************************************************************************************************/
/********************************** FIN PROGRAMA PRINCIPAL  *********************************************/
/********************************************************************************************************/
/********************************************************************************************************/



/********************************************************/
/* PRIMERA PARTE - FUNCIÓN DE BUSQUEDA CLIENTE POR (ID) */
/********************************************************/

    const fnBuscarClientePorID = async (clienteid)=> 
    {
        try 
        {
            let URLEndPoint = `http://localhost:3000/cliente/${clienteid}`;

            let Resultado = await fetch(URLEndPoint);
    
            let Datos = await Resultado.json();

            console.log(Datos);
    
            if (Datos.result_estado === 'ok')
            {
                if (parseInt(Datos.result_rows) > 0)
                {                   
                    fnMostrarCliente(Datos.result_data);                    
                }
                else
                {
                    alert("No Encontramos Datos");
                    txtclienteid.value = 0;
                    txtclientecuit.value = 0;
                    txtclientenombre.value = "";
                }
            }
            else
            {
                alert(`Se produjo un error en el BACK END: => ${Datos.result_message}`);
            }
            
        } catch (error) 
        {
            alert(`Se produjo un error en el FRONT END: => ${error.message}`);
        }
    }

/**********************************************************/
/* SEGUNDA PARTE - FUNCIÓN DE BUSQUEDA CLIENTE POR (CUIT) */
/**********************************************************/

    const fnBuscarClientePorCUIT = async (clientecuit)=>
    {
        try 
        {
            let URLEndPoint = `http://localhost:3000/clienteporcuit/${clientecuit}`;

            let Resultado = await fetch(URLEndPoint);

            let Datos = await Resultado.json();

            console.log(Datos);

            if (Datos.result_estado === 'ok')
            {
                if (parseInt(Datos.result_rows) > 0)
                {   
                    fnMostrarCliente(Datos.result_data);                    
                }
                else
                {
                    alert("No Encontramos Datos");
                    txtclienteid.value = 0;
                    txtclientecuit.value = 0;
                    txtclientenombre.value = "";
                }
            }
            else
            {
                alert(`Se produjo un error en el BACK END: => ${Datos.result_message}`);
            }        
        } catch (error) 
        {
            alert(`Se produjo un error en el FRONT END: => ${error.message}`);
        }
    }

/**********************************************************/
/* TERCERA PARTE - VISUALIZAMOS LOS DATOS DEL CLIENTE     */
/**********************************************************/

    /* Función que recibe como parametro un cliente en FORMATO JSON y lo muestra en 
    las cajas de texto correspondientes */

    const fnMostrarCliente = (cliente)=>
    {   
        txtclienteid.value = cliente.clienteid;
        txtclientecuit.value = cliente.clientecuit;
        txtclientenombre.value = cliente.clientenombre;
    }

    /* función asíncrona que recibe como parámetro un Cliente en Formato JSON,
    como así también el VerboHTTP que quiero ejecutar 

        Si Recibo la palabra POST => Invoco al EndPoint correspondiente
        Si Recibo la palabra PUT => Invoco al EndPoint correspondiente

    */

    
    const fnActualizarCliente = async (clienteEnFormatoJSON,VerboHTTP) =>
    {               

        try 
            {
                let URLEndPoint = `http://localhost:3000/cliente/`; // Apunto al End Point Correspondiente

                /* Creo las Opciones del Fetch */
                const OpcionesDelFetch = {
                    method: VerboHTTP, // le indico el verbo // debe llevar la palabra POST ó PUT
                    headers: {
                      'Content-Type': 'application/json', // En la cabecera le digo que recibirá datos en formato JSON
                    },
                    body: clienteEnFormatoJSON, // En el cuerpo del mensaje envío el Cliente en formato JSON
                  };

                let Resultado = await fetch(URLEndPoint,OpcionesDelFetch); // hago el fetch y le digo que espere a terminar y que devuelva los datos y lo guarde en Resultado

                let Datos = await Resultado.json(); // Convierto el Resultado a formato JSON

                if (Datos.result_estado === 'ok') // Si todo salió bien
                {
                    if (Datos.result_rows > 0) // Si devolvió mas de un registro
                    {
                        fnMostrarCliente(Datos.result_data); // muestro el cliente completo invocando a la función correspondiente y pasandole como parametro el cliente        
                    }
                }
                else
                {
                    alert(`Se produjo un error en el BACK END: => ${Datos.result_message}`); // Si detecto que hubo un error en el BACK END muestro el error
                }        
            } 
        catch (error) 
            {
                alert(`Se produjo un error en el FRONT END: => ${error.message}`); // Si se produjo un error en el FRONTEND lo muestro
            }
    }

/**********************************************************/
/* CUARTA PARTE - FUNCIÓN DE BUSQUEDA CLIENTE POR (CUIT) */
/**********************************************************/

    /* Función Asíncrona que recibe como parametro el nombre de un cliente y los busca en la base
    conectandose al EndPoint que corresponde */

    const fnBuscarClientePorNOMBRE = async (clientenombre)=>
    {
       try 
            {
                let URLEndPoint = `http://localhost:3000/clientepornombre?nombre=${clientenombre}`; // Este es el EndPoint que devuelve clientepornombre pasandole como parametro el nombre en el Link ó URL

                /* aqui tiene que esperar hasta que termine */
                let Resultado = await fetch(URLEndPoint); // Hago un Fetch. que es un Request a esa Ruta pasandole como parámetro el URL ó Link anteriormente creado

                /* aqui tiene que esperar hasta que termine */
                let Datos = await Resultado.json(); // Al Resultado del paso anterior, lo convierto en formato JSON.

                //console.log(Datos); // muestro los datos por la consola

                if (Datos.result_estado === 'ok') // Si Todo salió bien
                {
                    if (parseInt(Datos.result_rows) > 0) // Si la cantidad de registros es mayor que cero
                    {                        
                        fnDibujarTabla(Datos.result_data); // dibujo y actualizo la tabla invocando a la función que dibuja la tabla y pasandole los resultados en formato JSON                
                    }
                    else
                    {       
                        //alert("No encontramos datos"); // en caso que no haya resultados mostramos el cartelito
                    }
                }
                else
                {
                    //alert(`Se produjo un error en el BACK END: => ${Datos.result_message}`); // por aquí me fijo si hubo errores en el BACK END y muestro el error
                }        
            } 
        catch (error) // Esto se va a producir si existe un error en el FRONT END
            {
                alert(`Se produjo un error en el FRONT END: => ${error.message}`); // muestro el error
            }
    }


    /* Esta es la función que se encarga de dibujar la Tabla y recibe como parametros
    una lista de clientes en formato JSON */

    const fnDibujarTabla = (DatosEnFormatoJSON)=>
    {        
        idTableBody.textContent = ''; // Limpio la tabla en caso que existieran datos de la busqueda anterior

        DatosEnFormatoJSON.forEach((item,indice)=> // Recorro los Items de la lista en formato JSON, item x item.
        {
            let Fila = document.createElement("tr"); // creo una fila de una tabla

            let Dato1 = document.createElement("td"); // creo el dato1 (clienteid) de la fila donde voy a guardar el (ID)
            Dato1.textContent = item.clienteid; // lo saco de la lista y se lo paso a la celda dinámica 

            let Dato2 = document.createElement("td"); // creo el dato2 (clientecuit) de la fila donde voy a guardar el CUIT
            Dato2.textContent = item.clientecuit; // lo saco de la lista y se lo paso a la celda dinámica

            let Dato3 = document.createElement("td"); // creo el dato3 (clientenombre) de la fila donde voy a guardar el NOMBRE
            Dato3.textContent = item.clientenombre; // lo saco de la lista y se lo paso a la celda dinámica

            let Dato4 = document.createElement("input"); // creo dinámicamente el botón del tipo input
            Dato4.type = 'button'; // le digo que va a ser del tipo button
            Dato4.value = 'Seleccionar' // el valor que mostrará el boton será Seleccionar
            Dato4.addEventListener("click",()=> // Le implemento el click del botón Seleccionar
            {
                //alert(`me están presionando en el cliente cuyo ID es ${item.clienteid}`);
                fnBuscarClientePorID(item.clienteid); // a cada Elemento que se genere, cuando lo presionen, le digo que haga una busqueda pasandole como parametro el id del item que estamos ITERANDO.

            })


            Fila.appendChild(Dato1); // Agrego la columna 1 (celda) a la Fila
            Fila.appendChild(Dato2); // Agrego la columna 2 (celda) a la Fila
            Fila.appendChild(Dato3); // Agrego la columna 3 (celda) a la Fila
            Fila.appendChild(Dato4); // Agrego la columna 4 (celda) a la Fila

            //console.log(Fila);

            idTableBody.appendChild(Fila); // Agrego esa Fila al Cuertpo de la Tabla //
            
        })
    }

   