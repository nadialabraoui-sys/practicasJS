const nuevaTareaBtn = document.getElementsByClassName("botonAniadir")[0];
let tareasGuardadas;

// 1️⃣ Al cargar la página, mostramos las tareas guardadas
document.addEventListener("DOMContentLoaded", function (event) {
  if (JSON.parse(localStorage.getItem("tareas"))) {
    tareasGuardadas = JSON.parse(localStorage.getItem("tareas"));
  } else {
    tareasGuardadas = [];
  }
  //se crea el div principal si no existe
  let contenedorTareas = document.getElementById("contenedorTareas");
  if (!contenedorTareas) {
    contenedorTareas = document.createElement("div");
    contenedorTareas.id = "contenedorTareas";
    document.body.appendChild(contenedorTareas);
  }
});
nuevaTareaBtn.addEventListener("click", function (event) {
  event.preventDefault();

  agregarTarea(contenedorTareas);
});

function agregarTarea(contenedorTareas) {
  //añadir contenedor de cada tarea
  const tareaDiv = document.createElement("div");
  tareaDiv.className = "tareaDiv";
  contenedorTareas.appendChild(tareaDiv);

  //Etiqueta de tarea
  const tareaLabel = document.createElement("label");
  tareaLabel.textContent = "Nueva Tarea: ";
  tareaDiv.appendChild(tareaLabel);
  //añadir contenido por input

  const taskContent = document.createElement("input");
  taskContent.type = "text";
  taskContent.placeholder = "Descripción de la tarea";
  taskContent.className = "taskContent";
  tareaLabel.appendChild(taskContent);

  //guardar el contenido al pulsar fuera del input
  taskContent.addEventListener("change", function (event) {
    //si está vacio, no se guarda nada
    if (taskContent.value.trim() === "") return;

    const tareaGuardada = document.createElement("p");
    tareaGuardada.textContent = taskContent.value;
    //se reemplaza el input por el p con la tarea guardada
    tareaLabel.replaceChild(tareaGuardada, taskContent);

    const btnEditar = document.createElement("input");
    btnEditar.type = "button";
    btnEditar.value = "Editar";
    btnEditar.className = "botonEditar";

    tareaDiv.appendChild(btnEditar);

    btnEditar.addEventListener("click", function () {
      const inputEditado = document.createElement("input");
      tareaLabel.replaceChild(inputEditado, tareaGuardada);
      inputEditado.focus();

      inputEditado.addEventListener("change", function (event) {
        if (inputEditado.value.trim() === "") return;
        tareaGuardada.textContent = inputEditado.value;
        tareaLabel.replaceChild(tareaGuardada, inputEditado);
      });
    });
    //crear boton eliminar
    const botonEliminar = document.createElement("input");

    botonEliminar.type = "button";
    botonEliminar.className = "botonEliminar";
    botonEliminar.value = "Eliminar";
    tareaDiv.appendChild(botonEliminar);

    botonEliminar.addEventListener("click", function (event) {
      event.preventDefault();
      contenedorTareas.removeChild(tareaDiv);
    });
  });
}
