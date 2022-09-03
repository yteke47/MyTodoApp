const
    parser = new DOMParser(),
    todoListDOM = document.querySelector("#todoList"),
    todoList = document.querySelector("#todoList > li"),
    todoInputForm = document.querySelector("#todoInput"),
    todoInput = document.querySelector("#todoInput > input"),
    contextMenu = document.querySelector("#contextMenu"),
    deleteContextBtn = document.querySelector("#delete"),
    renameContextBtn = document.querySelector("#rename"),
    clearBtn = document.querySelector("#clearBtn"),
    deleteAllBtn = document.querySelector("#deleteAll"),
    noFileSection = document.querySelector("#noFileItem");

let itemsArray = localStorage.getItem('items') ? JSON.parse(localStorage.getItem('items')) : [];
localStorage.setItem('items', JSON.stringify(itemsArray));
const data = JSON.parse(localStorage.getItem('items'));

let clickedLi,
    renameinputDOM;

// li etiketi oluşturan bir fonksiyon, içeriğini text parametresi ile atıyoruz.
let liMaker = text => {
    let li = parser.parseFromString(`<li class="list-group-item">${text}</li>`, "text/html");
    todoListDOM.appendChild(li.body.firstChild)
}

//Hiç görev yokken 
function newTodoClick() {
    todoInput.focus();
}

//Liste giriş alanı
todoInputForm.addEventListener("submit", e => {
    e.preventDefault();
    if (todoInput.value.trim()) {
        itemsArray.push(todoInput.value);
        localStorage.setItem('items', JSON.stringify(itemsArray));
        liMaker(todoInput.value);
        contextMenu.style.display = "none";
    }
    else {
        console.log("lütfen bilgi girişi sağlayın");
    }
    todoInput.value = ""
    checkItems();
});

//Sağ Tık Menu
todoListDOM.addEventListener("contextmenu", (e) => {
    e.preventDefault()
    clickedLi = e.target;
    let x = clickedLi.offsetWidth,
        y = clickedLi.offsetTop;
    contextMenu.style.left = `${x}px`;
    contextMenu.style.top = `${y}px`;
    contextMenu.style.display = "block";
})

contextMenu.addEventListener("contextmenu", (e) => { e.preventDefault() })

document.addEventListener("click", (e) => {
    if (e.target.localName == "li" || e.target.localName == "html") {
        contextMenu.style.display = "none";
    }
})

//Silme butonu
deleteContextBtn.addEventListener("click", () => {
    localStorage.removeItem("items", "1")
    clickedLi.remove()
    contextMenu.style.display = "none";
    refreshLocalStorage()
    checkItems();
})

//Değistir butonu
renameContextBtn.addEventListener("click", () => {
    let renameinput = parser.parseFromString(`<input placeholder="${clickedLi.innerHTML}" type="text" id="renameİnput" class="form-control">`, "text/html");
    clickedLi.innerHTML = ""
    clickedLi.appendChild(renameinput.body.firstChild);
    renameinputDOM = document.querySelector("#renameİnput");
    renameinputDOM.addEventListener("keypress", (e) => {
        if (e.keyCode == 13) {
            clickedLi.innerHTML = renameinputDOM.value;
            refreshLocalStorage();
        }
    })
    contextMenu.style.display = "none";
})

//İlk sayfaya girişte local storage'da yer alan verilerle listeyi yenile
data.forEach(item => {
    liMaker(item);
});

//Her şeyi sil
function clearAllItems() {
    localStorage.clear()
    itemsArray = [];
    document.querySelectorAll("#todoList > li").forEach(element => {
        element.remove();
    });
    todoInput.value = ""
    contextMenu.style.display = "none";
    checkItems();
}

//Local storage da yer alan verileri güncelleme fonksiyonu
function refreshLocalStorage() {
    localStorage.clear();
    itemsArray = [];
    document.querySelectorAll("#todoList > li").forEach(element => {
        itemsArray.push(element.innerHTML);
    });
    localStorage.setItem('items', JSON.stringify(itemsArray));
}

//Todo Listemizde item var mı yok mu kontrol ettik, Her şeyi sil butonunu devre dışı bıraktık
function checkItems() {
    if (document.querySelector("#todoList > li")) {
        deleteAllBtn.disabled = false;
        noFileSection.classList.replace("d-flex", "d-none");
    }
    else {
        deleteAllBtn.disabled = true;
        noFileSection.classList.replace("d-none", "d-flex");
    }
}
checkItems();
