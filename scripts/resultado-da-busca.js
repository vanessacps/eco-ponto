const cardsContainer = document.getElementById("cards-container")
const queryString = window.location.search;
const params = new URLSearchParams(queryString).get('search')
console.log(params)
const pontos = JSON.parse(localStorage.getItem('pontos_de_coleta')) ?? []



function listaConsulta () {
    cardsContainer.innerHTML = '';
    pontos.filter(ponto => ponto.name.toLowerCase().indexOf(params.toLowerCase()) !== -1 ).forEach(ponto => {
        let card = document.createElement('div');
        card.classList.add('card');
    
        card.innerHTML = `
            <img src="${ponto.image}" alt="${ponto.name}">
            <h1>${ponto.name}</h1>
            <h3>${ponto.items}</h3>
            <p>${ponto.address}</p>
            <button class="remove-btn" data-id="${ponto.id}">Remover</button>
        `;
        
        cardsContainer.appendChild(card);
    });
}

listaConsulta()


 // Adiciona funcionalidade para remover pontos
 const removeButtons = document.querySelectorAll('.remove-btn');
 removeButtons.forEach((button, posicao) => {
     button.addEventListener('click', function() {
        const id = this.getAttribute('data-id')
        const novaLista = pontos.filter(ponto => ponto.id != id)
        localStorage.setItem('pontos_de_coleta', JSON.stringify(novaLista));
        window.location.reload() // atualiza a lista de pontos após a remoção
     });
 });