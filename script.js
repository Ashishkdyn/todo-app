let listContainer = document.getElementsByClassName("list-container")[0];
let container = document.getElementsByClassName("container")[0];
let firstDiv = document.getElementsByClassName("firstDiv")[0];
let secondDiv = document.getElementsByClassName("secondDiv")[0];
let thirdDiv = document.getElementsByClassName("thirdDiv")[0];
let keyValue = localStorage.getItem("data");

//checking if there is no task, so notask image will display
if (keyValue === null || keyValue === undefined || keyValue === "") {
  let div1 = document.createElement("div");
  div1.classList.add("noTask");
  thirdDiv.appendChild(div1);
  let div2 = document.createElement("div");
  div2.classList.add("blank");
  div1.appendChild(div2);
  let text1 = document.createElement("h3");
  text1.textContent = "No Task";
  text1.classList.add("text1");
  div1.appendChild(text1);
}
function createTask() {
  let noTaskDiv = document.getElementsByClassName("noTask")[0];
  //hiding no task image and no task text
  if (document.contains(noTaskDiv) === false) {
    let div1 = document.createElement("div");
    div1.classList.add("noTask");
    let div2 = document.createElement("div");
    div2.classList.add("blank");
    div1.appendChild(div2);
    let text1 = document.createElement("h3");
    text1.textContent = "No Task";
    text1.classList.add("text1");
    div1.appendChild(text1);
    if (keyValue === null || keyValue === undefined || keyValue === "") {
      thirdDiv.appendChild(div1);
    }
  } else {
    let noTaskDiv = document.getElementsByClassName("noTask")[0];
    noTaskDiv.style.display = "none";
  }

  let addTaskk = document.querySelector(".addTask");
  if (!addTaskk) {
    secondDiv.style.display = "flex";
    //creating add task div
    let addTask = document.createElement("div");
    addTask.classList.add("addTask");
    secondDiv.appendChild(addTask);

    // creating text area
    let textArea = document.createElement("textarea");
    textArea.setAttribute("id", "textarea1");
    textArea.setAttribute("cols", "45");
    textArea.setAttribute("row", "3");
    textArea.setAttribute("placeholder", "Enter Task name...");
    addTask.appendChild(textArea);

    // creating buttons div
    let addTaskButtons = document.createElement("div");
    addTaskButtons.classList.add("addTaskButtons");
    addTask.appendChild(addTaskButtons);

    //creating cancel button
    let cancelBtn = document.createElement("button");
    cancelBtn.textContent = "Cancel";
    cancelBtn.classList.add("cancelBtn");
    addTaskButtons.appendChild(cancelBtn);
    setTimeout(() => {
      addTask.style.transform = "translateX(0)";
    }, 0);
    //creating save button
    let saveBtn = document.createElement("button");
    saveBtn.textContent = "Save";
    saveBtn.classList.add("saveBtn");
    addTaskButtons.appendChild(saveBtn);

    // .listContainer = //parent container
    // .addTask = //child element
    addTask.addEventListener("scroll", () => {
      let rect = addTask.getBoundingClientRect();
      if (rect.y >= 440) {
        listContainer.scrollTop += 20;
      }
    });

    saveBtn.addEventListener("click", () => {
      // let rect = addTask.getBoundingClientRect();
      // console.log(rect.y);
      // if(rect.y >= 100){
      //     console.log("first")
      //     container.scrollTop += 3000;
      // }

      if (textArea.value === "") {
        alert("please enter task name in text field!");
      } else {
        let li = document.createElement("li");
        li.innerHTML = textArea.value;
        let span = document.createElement("span");
        span.innerHTML = "&#10006;";
        li.appendChild(span);

        setTimeout(() => {
          addTask.style.transform = "translateX(-150%)";
        }, 0);
        if (addTask) {
          setTimeout(() => {
            firstDiv.appendChild(li);
            saveData();
          }, 400);
        } else {
          setTimeout(() => {
            firstDiv.appendChild(li);
          }, 400);
          textArea.value = "";
        }
      }
    });
    cancelBtn.addEventListener("click", () => {
      setTimeout(() => {
        addTask.style.transform = "translateX(-150%)";
      }, 0);
      setTimeout(() => {
        secondDiv.style.display = "none";
        textArea.value = "";

        let keyValue = localStorage.getItem("data");
        if (keyValue === null || keyValue === undefined || keyValue === "") {
          noTaskDiv.style.display = "flex";
        }
      }, 300);
    });
  } else {
    let rect = addTaskk.getBoundingClientRect();
    console.log(rect.y);

    if (rect.y >= 100) {
      firstDiv.scrollTop = 500;
    }

    secondDiv.style.display = "flex";
    setTimeout(() => {
      document.querySelector(".addTask").style.transform = "translateX(0px)";
    }, 0);

    setTimeout(() => {
      document.getElementById("textarea1").value = "";
      addTaskk.style.transform = "translateX(0%)";
    }, 0);
  }
}
const saveData = () => {
  localStorage.setItem("data", firstDiv.innerHTML);
};
const getData = () => {
  firstDiv.innerHTML = localStorage.getItem("data");
};
getData();

firstDiv.addEventListener("click", (e) => {
  if (e.target.tagName === "LI") {
    e.target.classList.toggle("checked");
    saveData();
  } else if (e.target.tagName === "SPAN") {
    e.target.parentElement.remove();
    secondDiv.style.display = "none";
    saveData();
    let keyValue = localStorage.getItem("data");
    let noTaskDiv = document.getElementsByClassName("noTask")[0];

    if (document.contains(noTaskDiv) === false) {
      let div1 = document.createElement("div");
      div1.classList.add("noTask");
      let div2 = document.createElement("div");
      div2.classList.add("blank");
      div1.appendChild(div2);
      let text1 = document.createElement("h3");
      text1.textContent = "No Task";
      text1.classList.add("text1");
      div1.appendChild(text1);
      if (keyValue === null || keyValue === undefined || keyValue === "") {
        thirdDiv.appendChild(div1);
      }
    } else {
      if (keyValue === null || keyValue === undefined || keyValue === "") {
        let noTaskDiv = document.getElementsByClassName("noTask")[0];
        noTaskDiv.style.display = "flex";
      }
    }
  }
});
