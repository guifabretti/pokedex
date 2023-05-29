const botaoModal = document.querySelector("#vermais")
const modal = document.querySelector("dialog")
const botaoFechar = document.querySelector("dialog button")

function viewMore(){
    modal.showModal()
}

botaoFechar.onclick = function(){
    modal.close()
}

