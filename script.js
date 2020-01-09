load()
function load(){
    const form = document.querySelector("form"),
          clear = document.getElementById("clear"),
          ul = document.querySelector("ul"),
          sortName =document.getElementById("sortName"),
          sortPriority = document.getElementById("sortPriority")
    form.addEventListener('submit', function(event){
        event.preventDefault();
        let input = document.querySelector("input"),
            select = document.getElementById("select").selectedIndex,
            options = document.getElementById("select").options

        if(options[select].text == 'Select Priority'){
            alert("Выберите приоритет задачи!")
        } else if(input.value == '') {
            alert("Задача не может быть пустой!")
        } else {
            addTask(input.value, options[select].text)
        }

    })

    clear.addEventListener('click', function(){
        const ul = document.querySelector("ul"),
              tasksBoard = document.querySelector(".tasksBoard")
        ul.innerHTML = ''
        tasksBoard.style.display = 'none'

    })

    ul.addEventListener("click", function(event){
        if(event.target.className == 'delete'){
            deleteTask(event)
        } else {
            tickTask(event)
        }
    })
    
}

sortName.addEventListener('click', function(){
    const list = document.querySelector(".sortList")
    let getLi,shouldSwitch
    let switching = true
    let i
    while(switching){
        switching = false;
        getLi = list.getElementsByTagName("LI")
        getLabel = list.getElementsByTagName("label")
        console.log(getLabel[0].innerHTML)
        for( i = 0; i < (getLabel.length );i++){
            shouldSwitch = false
            //console.log(getLi[i].innerHTML.toLowerCase())
            if (getLabel[i].innerHTML.toLowerCase() > getLabel[i + 1].innerHTML.toLowerCase()) {
                shouldSwitch = true
                break
            }
        }
        if(shouldSwitch){
            getLi[i].parentNode.insertBefore(getLi[i + 1], getLi[i])
            switching = true
        }
    }
})

function addTask(task,priority){
    const ul = document.querySelector("ul"),
          li = document.createElement("li")

    li.innerHTML = `<span class="delete">х</span><span class="priority">Priority: ${priority}</span><input type="checkbox"><label class="label">${task}</label>`
    ul.appendChild(li)
    document.querySelector(".tasksBoard").style.display = "block"
}

function deleteTask(event){
    let remove = event.target.parentNode
    let parentNode = remove.parentNode
    parentNode.removeChild(remove)
}
function tickTask(event){
    const task = event.target.nextSibling
    if(event.target.checked) {
        task.style.textDecoration = "line-through"
        task.style.color = "#ff0000"
    } else {
        task.style.textDecoration = "none"
        task.style.color = "#2f4f4f"
    }
}