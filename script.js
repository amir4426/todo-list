document.addEventListener("DOMContentLoaded", () => {
  const textInput = document.getElementById("text-input");
  const addTaskBtn = document.getElementById("add-task-btn");
  const taskList = document.querySelector(".task-list");
  const emtpyImg = document.querySelector(".empty-img");
  const todoContainer = document.querySelector(".todos-container");

  const progressBar = document.getElementById("progressBar");
  const progressNumber = document.getElementById("numbers");

  const updateProgressBar = (checkCompletion = true) => {
    const totalTasks = taskList.children.length;
    const completionTask =
      taskList.querySelectorAll(".checkbox:checked").length;
    progressBar.style.width =
      totalTasks === 0 ? "0%" : `${(completionTask / totalTasks) * 100}%`;
    progressNumber.textContent = `${completionTask} / ${totalTasks}`;
  };

  const toggleEmptyImage = () => {
    emtpyImg.style.display = taskList.children.length === 0 ? "block" : "none";
    // todoContainer.style.width = taskList.children.length === 0 ? "100%" : "50%";
  };

  const addTask = (event) => {
    event.preventDefault();

    const taskText = textInput.value.trim();
    if (!taskText) {
      return;
    }

    const li = document.createElement("li");
    li.innerHTML = `
    <input type="checkbox" class="checkbox"/>
    <span class="task-text">${taskText}</span>

    <div class= "task-buttons">
        <button class="edit-btn"><i class="fa-solid fa-pen-to-square"></i></button>
        <button class="delete-btn"><i class="fa-solid fa-trash"></i></button>
    </div>
  `;

    const checkBox = li.querySelector(".checkbox");
    const editBtn = li.querySelector(".edit-btn");
    editBtn.addEventListener("click", () => {
      if (!checkBox.checked) {
        textInput.value = li.querySelector("span").textContent;
        li.remove();
        toggleEmptyImage();
      }
    });

    li.querySelector(".delete-btn").addEventListener("click", () => {
      li.remove();
      toggleEmptyImage();
    });

    taskList.appendChild(li);
    textInput.value = "";
    toggleEmptyImage();
  };

  addTaskBtn.addEventListener("click", addTask);

  textInput.addEventListener("keypress", (e) => {
    if (e.key === "Enter") {
      addTask(e);
    }
  });
});
