const getToDoList = document.getElementById("todo-list");

// reload new DOM
async function setToDoData() {
  try {
    while (getToDoList.lastChild) {
      getToDoList.lastChild.remove();
    }
    const toDoData = await getToDoData();
    toDoData.forEach((task) => {
      // create new li element
      const newLi = document.createElement("li");
      newLi.setAttribute("class", "new-li");
      getToDoList.appendChild(newLi);

      // create checkbox
      const checkBox = document.createElement("input");
      checkBox.setAttribute("type", "checkbox");
      checkBox.setAttribute("class", "checkbox");
      checkBox.setAttribute("id", task._id);
      newLi.appendChild(checkBox);

      // create task description
      const description = document.createElement("label");
      description.innerHTML = task.description;
      description.setAttribute("class", "description");
      newLi.appendChild(description);

      // create edit button
      const editBtn = document.createElement("button");
      editBtn.innerHTML = "Edit";
      editBtn.setAttribute("id", task._id);
      editBtn.setAttribute("class", "edit-btn");
      newLi.appendChild(editBtn);

      // create text input for edit mode
      const editDescription = document.createElement("input");
      editDescription.setAttribute("type", "text");
      editDescription.setAttribute("class", "edit-description");
      editDescription.setAttribute("value", task.description);

      // create trash button
      const trashBtn = document.createElement("button");
      trashBtn.innerHTML = '<i class="fas fa-trash"></i>';
      trashBtn.setAttribute("id", task._id);
      trashBtn.setAttribute("class", "trash-btn");
      newLi.appendChild(trashBtn);

      // put task as done in API if checkbox is checked, and vice versa
      checkBox.addEventListener("change", function () {
        if (checkBox.checked) {
          const checkId = checkBox.id;
          async function awaitFunction() {
            await checkToDoData(checkId);
            setToDoData();
          }
          awaitFunction();
        } else {
          const checkId = checkBox.id;
          async function awaitFunction() {
            await uncheckToDoData(checkId);
            setToDoData();
          }
          awaitFunction();
        }
      });

      // show task still as checked when DOM reloads and set strikethrough
      if (task.done === true) {
        checkBox.checked = true;
        description.setAttribute("class", "strike");
      } else if (task.done === false) {
        checkBox.checked = false;
      }

      // go into edit mode after edit button pressed
      let editMode = false;
      editBtn.addEventListener("click", function () {
        if (editMode === false) {
          newLi.replaceChild(editDescription, description);
          editBtn.innerHTML = "Update";
          editMode = true;
        } else {
          const editBtnId = editBtn.id;
          const editValue = editDescription.value;
          editBtn.innerHTML = "Edit";
          editMode = false;
          editToDoData(editBtnId, editValue);
          setToDoData();
        }
      });

      // delete task in API after trash button pressed
      trashBtn.addEventListener("click", function () {
        const btnTrashId = trashBtn.id;
        async function awaitFunction() {
          await deleteToDoData(btnTrashId);
          setToDoData();
        }
        awaitFunction();
      });
    });
  } catch (error) {
    console.log(error);
  }
}
setToDoData();

// add new task to API
const addNewTask = document.getElementById("new-task-btn");
addNewTask.addEventListener("click", function () {
  const newTask = document.getElementById("new-task-input").value;
  postToDoData(newTask);
  setToDoData();
});
