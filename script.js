load()
function load(){
    const form = document.querySelector("form"),
          clear = document.getElementById("clear"),
          ul = document.querySelector("ul")
    form.addEventListener('submit', function(event){
        event.preventDefault();
        let input = document.querySelector("input")
        if(input.value != ''){
            addTask(input.value)
        }
        input.value = ''
    })

    clear.addEventListener('click', function(){
        const ul = document.querySelector("ul")
        ul.innerHTML = ''
    })

    ul.addEventListener("click", function(event){
        if(event.target.className == 'delete'){
            deleteTask(event)
        } else {
            tickTask(event)
        }
    })
}

function addTask(task){
    const ul = document.querySelector("ul"),
          li = document.createElement("li")
    li.innerHTML = `<span class="delete">х</span><input type="checkbox"><label>${task}</label>`
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