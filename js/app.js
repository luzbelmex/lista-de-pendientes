// Variables
const listaPendientes = document.getElementById('lista-pendientes');

// Eventos
eventListeners();
function eventListeners() {
    // Obtener informacion del formulario
    document.querySelector('#formulario').addEventListener('submit', agregarPendiente);
    // Borrar Pendientes
    listaPendientes.addEventListener('click', borrarPendiente);
    // Contenido Cargado
    document.addEventListener('DOMContentLoaded', localStorageListo);
}

// Funciones
    // Añadir Pendiente del formulario
function agregarPendiente(e){
    e.preventDefault();
    // Leer el valor del Textarea
    const pendiente = document.getElementById('pendiente').value;
    // Crear boton para borrar
    const botonBorrar = document.createElement('a');
    botonBorrar.classList = 'borrar-pendiente';
    botonBorrar.innerText = 'X';
    // Crear elemento y añadir contenido
    const li = document.createElement('li');
    li.innerText = pendiente;
    // añadir el boton de borrar al pendiente
    li.appendChild(botonBorrar);
    // añadir pendiente a la lista
    listaPendientes.appendChild(li);
    // añadir a localstorage
    agregarPendienteLocalStorage(pendiente);
} 
    // Eliminar Pendiente del DOM
function borrarPendiente (e) {
    e.preventDefault();
    
    if (e.target.className === 'borrar-pendiente') {
        e.target.parentElement.remove();
        borrarPendienteLocalStorage(e.target.parentElement.innerText);
    }
}
    // mostrar los datos de LocalStorage en la lista de pendientes
function localStorageListo() {
    let pendientes;

    pendientes = obtenerPendientesLocalStorage();

    pendientes.forEach( function (pendiente) {
        // Crear boton para borrar
        const botonBorrar = document.createElement('a');
        botonBorrar.classList = 'borrar-pendiente';
        botonBorrar.innerText = 'X';
        // Crear elemento y añadir contenido
        const li = document.createElement('li');
        li.innerText = pendiente;
        // añadir el boton de borrar al pendiente
        li.appendChild(botonBorrar);
        // añadir pendiente a la lista
        listaPendientes.appendChild(li);
    });
}
    // Agregar pendiente al LocalStorage
function agregarPendienteLocalStorage(pendiente) {
    let pendientes;
    pendientes = obtenerPendientesLocalStorage();
    // Añadir el nuevo pendiente
    pendientes.push(pendiente);
    // convertir el string en arreglo
    localStorage.setItem('pendientes', JSON.stringify(pendientes));
}
    // Comprobar que existan elementos en el LocalStorage
function obtenerPendientesLocalStorage() {
    let pendientes;
    // revisar los valores del LocalStorage
    if (localStorage.getItem('pendientes') === null) {
        pendientes = [];
    } else {
        pendientes = JSON.parse(localStorage.getItem('pendientes'));
    }
    return pendientes;
}
    // Eliminar pendientes de LocalStorage
function borrarPendienteLocalStorage(pendiente) {
    let pendientes;
    let pendienteBorrar;
    // eliminar la X del pendiente
    pendienteBorrar = pendiente.substring(0, pendiente.length -1);

    pendientes = obtenerPendientesLocalStorage();

    pendientes.forEach(function (pendiente, index) {
        if (pendienteBorrar === pendiente) {
            pendientes.splice(index, 1);
        }
    });

    localStorage.setItem('pendientes', JSON.stringify(pendientes));
}