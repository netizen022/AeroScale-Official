/* ==========================================================
   SCALEWING MARKET
   Archivo: script.js

   Este archivo contiene toda la lógica de la aplicación.

   No se utiliza una base de datos.
   Los productos se almacenan en un arreglo de objetos,
   simulando el funcionamiento de un marketplace.
========================================================== */


/* ==========================================================
   REGISTRO DE PRODUCTOS

   idProducto es la CLAVE del registro.

   ¿Por qué?

   Porque identifica de forma única cada publicación.
   No pueden existir dos publicaciones con el mismo idProducto.
========================================================== */

const productos = [

{
    idProducto:1,
    modeloAvion:"Boeing 747-400",
    marca:"Gemini Jets",
    escala:"1:400",
    estado:"Nuevo",
    precio:120000,
    tipoOperacion:"Venta",
    descripcion:"Modelo metálico en caja original.",
    imagen:"assets/productos/boeing 747.jpg"
},

{
    idProducto:2,
    modeloAvion:"Airbus A320",
    marca:"Herpa",
    escala:"1:200",
    estado:"Usado",
    precio:95000,
    tipoOperacion:"Venta",
    descripcion:"Excelente estado, con soporte.",
    imagen:"assets/productos/a320.jpg"
},

{
    idProducto:3,
    modeloAvion:"Concorde",
    marca:"Hogan",
    escala:"1:200",
    estado:"Nuevo",
    precio:180000,
    tipoOperacion:"Intercambio",
    descripcion:"Edición limitada para coleccionistas.",
    imagen:"assets/productos/concorde.jpg"
},

{
    idProducto:4,
    modeloAvion:"F-14 Tomcat",
    marca:"Hobby Master",
    escala:"1:72",
    estado:"Usado",
    precio:140000,
    tipoOperacion:"Venta",
    descripcion:"Incluye armamento y base.",
    imagen:"assets/productos/f14.jpg"
},

{
    idProducto:5,
    modeloAvion:"Boeing 737-8",
    marca:"Gemini Jets",
    escala:"1:400",
    estado:"Nuevo",
    precio: 130000,
    tipoOperacion:"Venta",
    descripcion:"Modelo metálico en caja original.",
    imagen:"assets/productos/boeing 737.jpg"
},

{
    idProducto:6,
    modeloAvion:"Boeing 787-9",
    marca:"Herpa",
    escala:"1:200",
    estado:"Usado",
    precio: 85000,
    tipoOperacion:"Venta",
    descripcion:"Excelente estado, con soporte.",
    imagen:"assets/productos/boeing 787.jpg"
},

{
    idProducto:7,
    modeloAvion:"Boeing 727",
    marca:"Hogan",
    escala:"1:200",
    estado:"Usado",
    precio: 200000,
    tipoOperacion:"Intercambio",
    descripcion:"Edición limitada para coleccionistas.",
    imagen:"assets/productos/boeing 727.jpg"
},

{
    idProducto:8,
    modeloAvion:"Boeing 707",
    marca:"Hobby Master",
    escala:"1:72",
    estado:"Nuevo",
    precio: 150000,
    tipoOperacion:"Venta",
    descripcion:"Incluye elementos miniatura de aeropuerto.",
    imagen:"assets/productos/boeing 707.jpg"
},

{
    idProducto:9,
    modeloAvion:"Boeing 757",
    marca:"Gemini Jets",
    escala:"1:400",
    estado:"Nuevo",
    precio: 110000,
    tipoOperacion:"Venta",
    descripcion:"Era para mi primito pero al nene le gusta los militares nomás, asi que no me tocó de otra q venderlo.",
    imagen:"assets/productos/boeing 757.jpg"
}
];


/* ==========================================================
   REFERENCIAS A LOS ELEMENTOS DEL HTML
========================================================== */

const contenedor = document.getElementById("contenedorProductos");

const buscador = document.getElementById("buscador");

const filtroMarca = document.getElementById("filtroMarca");

const filtroEscala = document.getElementById("filtroEscala");

const filtroEstado = document.getElementById("filtroEstado");

const filtroOperacion = document.getElementById("filtroOperacion");


/* ==========================================================
   CARGAR OPCIONES DE LOS FILTROS

   Recorre los productos y agrega automáticamente
   las opciones de cada filtro.

   Así no es necesario escribirlas manualmente.
========================================================== */

function cargarFiltros(){

    const marcas = [...new Set(productos.map(p => p.marca))];

    const escalas = [...new Set(productos.map(p => p.escala))];

    const estados = [...new Set(productos.map(p => p.estado))];

    const operaciones = [...new Set(productos.map(p => p.tipoOperacion))];


    marcas.forEach(marca=>{

        filtroMarca.innerHTML += `<option value="${marca}">${marca}</option>`;

    });

    escalas.forEach(escala=>{

        filtroEscala.innerHTML += `<option value="${escala}">${escala}</option>`;

    });

    estados.forEach(estado=>{

        filtroEstado.innerHTML += `<option value="${estado}">${estado}</option>`;

    });

    operaciones.forEach(op=>{

        filtroOperacion.innerHTML += `<option value="${op}">${op}</option>`;

    });

}


/* ==========================================================
   MOSTRAR PRODUCTOS

   Recibe una lista de productos y genera las tarjetas
   dinámicamente dentro del contenedor.
========================================================== */

function mostrarProductos(lista){

    contenedor.innerHTML="";

    lista.forEach(producto=>{

        contenedor.innerHTML += `

        <div class="tarjeta">

            <img src="${producto.imagen}" alt="${producto.modeloAvion}">

            <div class="info">

                <h3>${producto.modeloAvion}</h3>

                <p><strong>Marca:</strong> ${producto.marca}</p>

                <p><strong>Escala:</strong> ${producto.escala}</p>

                <p><strong>Estado:</strong> ${producto.estado}</p>

                <p><strong>Precio:</strong> $${producto.precio.toLocaleString()}</p>

                <p><strong>Operación:</strong> ${producto.tipoOperacion}</p>

                <button onclick="verDetalles(${producto.idProducto})">
                    Ver detalles
                </button>

            </div>

        </div>

        `;

    });

}


/* ==========================================================
   FILTRAR PRODUCTOS

   Aplica todos los filtros y la búsqueda al mismo tiempo.
========================================================== */

function filtrarProductos(){

    const texto = buscador.value.toLowerCase();

    const marca = filtroMarca.value;

    const escala = filtroEscala.value;

    const estado = filtroEstado.value;

    const operacion = filtroOperacion.value;


    const resultado = productos.filter(producto=>{

        return (

            producto.modeloAvion.toLowerCase().includes(texto)

            &&

            (marca==="" || producto.marca===marca)

            &&

            (escala==="" || producto.escala===escala)

            &&

            (estado==="" || producto.estado===estado)

            &&

            (operacion==="" || producto.tipoOperacion===operacion)

        );

    });


    mostrarProductos(resultado);

}


/* ==========================================================
   VER DETALLES

   Envía el id del producto a producto.html.

   Más adelante utilizaremos este id para mostrar
   toda la información del producto seleccionado.
========================================================== */

function verDetalles(idProducto){

    window.location.href = `producto.html?id=${idProducto}`;

}


/* ==========================================================
   EVENTOS

   Cada vez que el usuario escribe o cambia un filtro,
   la lista de productos se actualiza automáticamente.
========================================================== */

buscador.addEventListener("input",filtrarProductos);

filtroMarca.addEventListener("change",filtrarProductos);

filtroEscala.addEventListener("change",filtrarProductos);

filtroEstado.addEventListener("change",filtrarProductos);

filtroOperacion.addEventListener("change",filtrarProductos);


/* ==========================================================
   INICIALIZACIÓN

   Cuando se carga la página:

   1) Se llenan los filtros.
   2) Se muestran todos los productos.
========================================================== */

cargarFiltros();

mostrarProductos(productos);

/* ==========================================================
   SIMULAR PUBLICACIÓN DE UN PRODUCTO

   Este código solo se ejecuta en publicar.html.
========================================================== */

const formulario = document.getElementById("formPublicacion");

if (formulario) {

    formulario.addEventListener("submit", function (e) {

        // Evita que la página se recargue
        e.preventDefault();

        // Crear un nuevo objeto con los datos del formulario
        const nuevoProducto = {

            idProducto: Number(document.getElementById("idProducto").value),

            modeloAvion: document.getElementById("modeloAvion").value,

            marca: document.getElementById("marca").value,

            escala: document.getElementById("escala").value,

            estado: document.getElementById("estado").value,

            precio: Number(document.getElementById("precio").value),

            tipoOperacion: document.getElementById("tipoOperacion").value,

            descripcion: document.getElementById("descripcion").value,

            // Imagen por defecto
            imagen: "assets/productos/default.jpg"

        };

        // Agregar el producto al arreglo
        productos.push(nuevoProducto);

        // Mostrar mensaje
        alert("¡La publicación fue creada correctamente!");

        // Limpiar el formulario
        formulario.reset();

    });

}