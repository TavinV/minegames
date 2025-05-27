const API_PATH = "/"

function selectCharacter(personagem, event) {
    // Atualiza a imagem principal
    document.querySelector(".character-display > h1").innerText = personagem.nome.toUpperCase()
    const mainCharacter = document.getElementById('main-character');
    mainCharacter.src = `${API_PATH}/personagens/${personagem.nome}/standing`;

    // Remove a classe 'active' de todos os botões
    const buttons = document.querySelectorAll('.character-btn');
    buttons.forEach(btn => btn.classList.remove('active'));

    // Adiciona a classe 'active' ao botão clicado
    event.currentTarget.classList.add('active');

    // Efeito de animação
    mainCharacter.style.transform = 'scale(0.95)';
    setTimeout(() => {
        mainCharacter.style.transform = 'scale(1)';
    }, 100);
}

async function loadButtons(){
    // Carregar personagens

    fetch(`${API_PATH}personagens`).then(async (resposta) =>{
        /*if(!resposta.ok || !resposta){
            alert("Erro na requisição. redirecionando para a home.")
            window.location.href = '../../index.html'
        }*/
        personagens = [
  {
    "nome": "ivor",
    "standing": "standing-ivor.webp",
    "icon": "icon-ivor.webp"
  },
  {
    "nome": "jesse",
    "standing": "standing-jesse.webp",
    "icon": "icon-jesse.webp"
  },
  {
    "nome": "lukas",
    "standing": "standing-lukas.webp",
    "icon": "icon-lukas.webp"
  },
  {
    "nome": "petra",
    "standing": "standing-petra.webp",
    "icon": "icon-petra.webp"
  },
  {
    "nome": "romeo",
    "standing": "standing-romeo.webp",
    "icon": "icon-romeo.webp"
  }
]
        personagens.forEach(p => {
            const button = document.createElement('button')
            button.classList.add("character-btn")
            button.addEventListener('click',(e) => selectCharacter(p, e))

            const buttonImg = document.createElement("img")
            buttonImg.src = `${API_PATH}personagens/${p.nome}/icon`

            button.appendChild(buttonImg)

            document.querySelector('.character-selector').appendChild(button)
        });

    }).catch(err => {
        alert("Erro na requisição. redirecionando para a home.")
        window.location.href = '../../index.html'
    })
}

loadButtons()
// Seleciona o primeiro personagem por padrão
window.onload = function () {
    document.querySelector('.character-btn').classList.add('active');
};
