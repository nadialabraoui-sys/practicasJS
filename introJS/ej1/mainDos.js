const nuevaTareaBtn = document.getElementsByClassName("botonAniadir")[0];

// 1️⃣ Al cargar la página, mostramos las tareas guardadas
document.addEventListener("DOMContentLoaded", function () {
  let tareasGuardadas = JSON.parse(localStorage.getItem("tareas")) || [];

  // Creamos el contenedor si no existe
  let contenedorTareas = document.getElementById("contenedorTareas");
  if (!contenedorTareas) {
    contenedorTareas = document.createElement("div");
    contenedorTareas.id = "contenedorTareas";
    document.body.appendChild(contenedorTareas);
  }

  // Mostramos las tareas guardadas
  tareasGuardadas.forEach((texto) => {
    agregarTarea(contenedorTareas, texto);
  });
});

// 2️⃣ Añadir nueva tarea
nuevaTareaBtn.addEventListener("click", function (event) {
  event.preventDefault();

  let contenedorTareas = document.getElementById("contenedorTareas");
  if (!contenedorTareas) {
    contenedorTareas = document.createElement("div");
    contenedorTareas.id = "contenedorTareas";
    document.body.appendChild(contenedorTareas);
  }

  agregarTarea(contenedorTareas);
});

function agregarTarea(contenedorTareas, textoGuardado = "") {
  const tareaDiv = document.createElement("div");
  tareaDiv.className = "tareaDiv";
  contenedorTareas.appendChild(tareaDiv);

  const tareaLabel = document.createElement("label");
  tareaLabel.textContent = "Nueva Tarea: ";
  tareaDiv.appendChild(tareaLabel);

  // Si viene con texto guardado, mostramos directamente el <p>
  if (textoGuardado) {
    const tareaGuardada = document.createElement("p");
    tareaGuardada.textContent = textoGuardado;
    tareaLabel.appendChild(tareaGuardada);
    agregarBotones(tareaDiv, tareaLabel, tareaGuardada);
    return;
  }

  // Si es nueva, dejamos el input
  const taskContent = document.createElement("input");
  taskContent.type = "text";
  taskContent.placeholder = "Descripción de la tarea";
  taskContent.className = "taskContent";
  tareaLabel.appendChild(taskContent);

  taskContent.addEventListener("change", function () {
    if (taskContent.value.trim() === "") return;

    const tareaGuardada = document.createElement("p");
    tareaGuardada.textContent = taskContent.value;

    tareaLabel.replaceChild(tareaGuardada, taskContent);
    guardarTareaLocalStorage(tareaGuardada.textContent);

    agregarBotones(tareaDiv, tareaLabel, tareaGuardada);
  });
}

// 3️⃣ Función para crear los botones Editar y Eliminar
function agregarBotones(tareaDiv, tareaLabel, tareaGuardada) {
  // Botón editar
  const btnEditar = document.createElement("input");
  btnEditar.type = "button";
  btnEditar.value = "Editar";
  btnEditar.className = "botonEditar";
  tareaDiv.appendChild(btnEditar);

  btnEditar.addEventListener("click", function () {
    const inputEditado = document.createElement("input");
    inputEditado.type = "text";
    inputEditado.value = tareaGuardada.textContent;

    tareaLabel.replaceChild(inputEditado, tareaGuardada);
    inputEditado.focus();

    inputEditado.addEventListener("change", function () {
      if (inputEditado.value.trim() === "") return;
      tareaGuardada.textContent = inputEditado.value;
      tareaLabel.replaceChild(tareaGuardada, inputEditado);
      actualizarLocalStorage();
    });
  });

  // Botón eliminar
  const botonEliminar = document.createElement("input");
  botonEliminar.type = "button";
  botonEliminar.className = "botonEliminar";
  botonEliminar.value = "Eliminar";
  tareaDiv.appendChild(botonEliminar);

  botonEliminar.addEventListener("click", function () {
    tareaDiv.remove();
    actualizarLocalStorage();
  });
}

// 4️⃣ Guardar tarea en localStorage
function guardarTareaLocalStorage(texto) {
  let tareas = JSON.parse(localStorage.getItem("tareas")) || [];
  tareas.push(texto);
  localStorage.setItem("tareas", JSON.stringify(tareas));
}

// 5️⃣ Actualizar localStorage después de editar o eliminar
function actualizarLocalStorage() {
  const tareas = [];
  document.querySelectorAll(".tareaDiv p").forEach((p) => {
    tareas.push(p.textContent);
  });
  localStorage.setItem("tareas", JSON.stringify(tareas));
}
