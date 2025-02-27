const queryString = window.location.search;
const params = new URLSearchParams(queryString).get('id');
document.getElementById("modal").classList.add("hide");

let selectedItems = []; // Declare a variável 'selectedItems' antes de usá-la

if (params) {
    // Editando um ponto existente
    let pontos = JSON.parse(localStorage.getItem('pontos_de_coleta')) ?? [];
    const ponto = pontos.find(ponto => ponto.id == params);

    if (ponto) {
        populateForm(ponto);
        // Preencher a lista de itens selecionados para edição
        selectedItems = ponto.items ? ponto.items.split(',') : []; // Convertendo a string de itens de volta para array
        updateSelectedItemsDisplay();
    }
}

// Função para preencher os campos do formulário
function populateForm(ponto) {
    const formElements = ['name', 'image', 'address', 'address2'];
    formElements.forEach(field => {
        const element = document.getElementsByName(field)[0];
        if (element && ponto[field]) {
            element.value = ponto[field];
        }
    });
}

// Função para atualizar a exibição dos itens selecionados
function updateSelectedItemsDisplay() {
    const itemsToCollect = document.querySelectorAll(".items-grid li");
    itemsToCollect.forEach(item => {
        const itemId = item.dataset.id;
        if (selectedItems.includes(itemId)) {
            item.classList.add("selected");
        } else {
            item.classList.remove("selected");
        }
    });
}

// Itens de coleta
const itemsToCollect = document.querySelectorAll(".items-grid li");
itemsToCollect.forEach(item => item.addEventListener("click", handleSelectedItem));

const collectedItems = document.querySelector("input[name=items]");

// Função para gerenciar a seleção de itens
function handleSelectedItem(event) {
    const itemLi = event.target;
    itemLi.classList.toggle("selected");

    const itemId = itemLi.dataset.id;
    const itemIndex = selectedItems.indexOf(itemId);

    if (itemIndex >= 0) {
        selectedItems.splice(itemIndex, 1); // Remover item da seleção
    } else {
        selectedItems.push(itemId); // Adicionar item à seleção
    }

    collectedItems.value = selectedItems.join(','); // Atualizar campo escondido com os itens selecionados
}

// Submissão do formulário
document.getElementById("criar_posto").addEventListener('submit', (event) => {
    event.preventDefault(); // Ignorar o evento emitido pelo formulário

    let pontos = JSON.parse(localStorage.getItem('pontos_de_coleta')) ?? [];
    const formData = new FormData(event.currentTarget);

    // Criar objeto com os dados do formulário
    const object = {};
    formData.forEach((value, key) => {
        object[key] = value;
    });

    // Garantir que apenas os itens atualmente selecionados sejam salvos
    object.items = selectedItems.join(','); // Aqui estamos garantindo que apenas os itens selecionados sejam salvos

    // Se estiver editando, atualiza o ponto existente; se for novo, cria um novo id
    if (params) {
        // Editando um ponto existente
        object.id = params;
        pontos = pontos.map(ponto => ponto.id == params ? object : ponto);
    } else {
        // Cadastrando um novo ponto
        object.id = Date.now(); // Gerar ID único
        pontos.push(object);
    }

    localStorage.setItem('pontos_de_coleta', JSON.stringify(pontos));

    document.getElementById("modal").classList.remove("hide");

    setTimeout(() => {
        window.location = "/"; // Redirecionar após 2 segundos
    }, 2000);
});
