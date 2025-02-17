// Itens de coleta
// pegar todos os li`s
document.getElementById("modal").classList.add("hide")
const itemsToCollect = document.querySelectorAll(".items-grid li")

for (const item of itemsToCollect) {
    item.addEventListener("click", handleSelectedItem)
}

const collectedItems = document.querySelector("input[name=items]")

let selectedItems = []

function handleSelectedItem(event) {
    const itemLi = event.target
    // adicionar ou remover uma classe com javascript
    itemLi.classList.toggle("selected")
    const itemId = itemLi.dataset.id

    // verificar se existem itens selecionados, se sim
    // pegar os itens selecionados
    const alreadySelected = selectedItems.findIndex( item => {
        const itemFound = item == itemId // isso será true ou false
        return itemFound
    })

    // se já estiver selecionado, 
    if( alreadySelected >= 0 ) {
        // tirar da selecao
        const filteredItems = selectedItems.filter( item => {
            const itemIsDifferent = item != itemId // false
            return itemIsDifferent
        })

        selectedItems = filteredItems
    } else {
        // se não estiver selecionado
        // adicionar à seleção
        selectedItems.push(itemId)
    }
    // atualizar o campo escondido com os itens selecionados
    collectedItems.value = selectedItems
}

document.getElementById("criar_posto").addEventListener('submit', (event) => {
    event.preventDefault() // Ignora o evento emitido pelo formulário
    
    let pontos = JSON.parse(localStorage.getItem('pontos_de_coleta')) ?? [];

    let object = {};
    const elementos = new FormData(event.currentTarget);
    elementos.forEach(function(value, key){
        object[key] = value;
    });
    
    object.id = Date.now()
    pontos.push(object);

    localStorage.setItem('pontos_de_coleta', JSON.stringify(pontos));

    document.getElementById("modal").classList.remove("hide")

    setTimeout(() => {
        window.location = "/"
    }, 2000)
})