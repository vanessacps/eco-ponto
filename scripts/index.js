const buttonSearch = document.querySelector("#page-home main a")
const modal = document.querySelector("#modal")
const close = document.querySelector("#modal .header a")
const busca = document.getElementById("busca")

buttonSearch.addEventListener("click", () => {
    
    modal.classList.remove("hide")
})

close.addEventListener("click", () => {
    modal.classList.add("hide")
})

busca.addEventListener("submit", (event) => {
    event.preventDefault();
    const formData = new FormData(event.currentTarget);
    const params = new URLSearchParams(formData);
    const destino = `${event.currentTarget.action}?${params.toString()}`;
    window.location = destino;
});


if (!localStorage.getItem('pontos_de_coleta')) {
    localStorage.setItem('pontos_de_coleta', JSON.stringify([])); // Banco de dados vazio
}