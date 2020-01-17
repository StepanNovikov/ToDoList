load()
function load(){
    const form = document.querySelector("form"),
          clear = document.getElementById("clear"),
          ul = document.querySelector("ul"),
          sortName = document.getElementById("sortName"),
          sortPriority = document.getElementById("sortPriority");

    form.addEventListener('submit', function(event){
        event.preventDefault();
        let input = document.querySelector("input"),
            select = document.getElementById("select").selectedIndex,
            options = document.getElementById("select").options;

        if(options[select].text === 'Select Priority'){
            alert("Выберите приоритет задачи!");
        } else if(input.value === '') {
            alert("Задача не может быть пустой!");
        } else {
            addTask(input.value, options[select].text);
        }

    })

    clear.addEventListener('click', function(){
        const ul = document.querySelector("ul"),
              tasksBoard = document.querySelector(".tasksBoard");
        ul.innerHTML = '';
        tasksBoard.style.display = 'none';

    })

    ul.addEventListener("click", function(event){
        if(event.target.className === 'delete'){
            deleteTask(event);
        } else {
            tickTask(event);
        }
    })
    
}

sortName.addEventListener('click', function(){
    const list = document.querySelector(".sortList");
    let li = "";
    let shouldSwitch = "";
    let switching = true;
    let i = 0;

    while(switching){
        switching = false;
        li = list.getElementsByTagName("LI");
        let label = list.getElementsByTagName("label");
        for( i = 0; i < label.length-1; i++){
            shouldSwitch = false;

            if (label[i].textContent> label[i + 1].textContent) {
                shouldSwitch = true;
                break;
            }
        }
        if(shouldSwitch){
            li[i].parentNode.insertBefore(li[i + 1], li[i]);
            switching = true;
        }
    }
})

sortPriority.addEventListener('click', function(){
    const list = document.querySelector(".sortList");
    let li = "";
    let shouldSwitch = "";
    let switching = true;
    let i = 0;

    while(switching){
        switching = false;
        li = list.getElementsByTagName("LI");
        let priorityClass = list.getElementsByClassName("priority");
        for( i = 0; i < priorityClass.length-1; i++){
            shouldSwitch = false;

            if (priorityClass[i].getAttribute("id")> priorityClass[i + 1].getAttribute("id")) {
                shouldSwitch = true;
                break;
            }
        }
        if(shouldSwitch){
            li[i].parentNode.insertBefore(li[i + 1], li[i]);
            switching = true;
        }
    }

})

function addTask(task,priority){
    const ul = document.querySelector("ul"),
          li = document.createElement("li"),
          listLi  = document.getElementsByTagName("li"),
          sortName = document.getElementById("sortName"),
          sortPriority = document.getElementById("sortPriority");
    let priorityId = 0;

    switch(priority){
        case "High":
            priorityId = 1;
            break;
        case "Middle":
            priorityId = 2;
            break;
        case "Low":
            priorityId = 3;
    }      

    li.innerHTML = `<span class="delete">х</span><span class="priority" id=${priorityId}>Priority: ${priority}</span><input type="checkbox"><label class="label">${task}</label>`;
    ul.appendChild(li);
    
    document.querySelector(".tasksBoard").style.display = "block";
    document.querySelector(".filterBoard").style.display = "block";
    sortName.setAttribute("disabled", "true");
    sortPriority.setAttribute("disabled","true");
    
    if(listLi.length > 1) {
        sortName.removeAttribute("disabled");
        sortPriority.removeAttribute("disabled");
        sortName.style.backgroundColor = "#ff5e00c9";
        sortPriority.style.backgroundColor = "#ff5e00c9";
    }
    
}

function deleteTask(event){
    let remove = event.target.parentNode;
    let parentNode = remove.parentNode;
    parentNode.removeChild(remove);
}
function tickTask(event){
    const task = event.target.nextSibling;
    if(event.target.checked) {
        task.style.textDecoration = "line-through";
        task.style.color = "#ff0000";
    } else {
        task.style.textDecoration = "none";
        task.style.color = "#2f4f4f";
    }
}