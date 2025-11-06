const nuevaTareaBtn = document.getElementsByClassName("botonAniadir")[0];

nuevaTareaBtn.addEventListener("click", function (event) {
  event.preventDefault();
  const contenedorTareas = document.createElement("div");
  contenedorTareas.id = "contenedorTareas";
  document.body.appendChild(contenedorTareas);
  agregarTarea(contenedorTareas);
});

function agregarTarea(contenedorTareas) {
  //aniadir titulo (por defecto de momento)
  const newTask = document.createElement("label");
  newTask.textContent = "Nueva Tarea: ";
  contenedorTareas.appendChild(newTask);

  //aniadir contenido
  const taskContent = document.createElement("input");
  taskContent.type = "text";
  taskContent.placeholder = "Descripción de la tarea";
  taskContent.className = "taskContent";
  newTask.appendChild(taskContent);

  //guardar
  taskContent.addEventListener("change", function (event) {
    if (taskContent.value === "") return;

    const tareaGuardada = document.createElement("p");
    tareaGuardada.textContent = taskContent.value;
    //se reemplaza el input por el p con la tarea guardada
    newTask.replaceChild(tareaGuardada, taskContent);
    botonEditar(newTask, tareaGuardada);
  });
}

function botonEditar(newTask, tareaGuardada) {
  const btnEdit = document.createElement("input");
  btnEdit.type = "button";
  btnEdit.value = "✍";
  btnEdit.id = "btnEdit";
  tareaGuardada.appendChild(btnEdit);

  //crear evento
  btnEdit.addEventListener("click", function (event) {
    event.preventDefault();
  });
}
