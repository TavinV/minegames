const API_PATH = "http://localhost:3000"

function selectCharacter(personagem, event) {
    // Atualiza a imagem principal
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

    fetch(`${API_PATH}/personagens`).then(async (resposta) =>{
        if(!resposta.ok){
            alert("Erro na requisição. redirecionando para a home.")
            window.location.href = '../../index.html'
        }
        personagens = await resposta.json()

        personagens.forEach(p => {
            const button = document.createElement('button')
            button.classList.add("character-btn")
            button.addEventListener('click',(e) => selectCharacter(p, e))

            const buttonImg = document.createElement("img")
            buttonImg.src = `${API_PATH}/personagens/${p.nome}/icon`

            button.appendChild(buttonImg)

            document.querySelector('.character-selector').appendChild(button)
        });

    })
}

loadButtons()
// Seleciona o primeiro personagem por padrão
window.onload = function () {
    document.querySelector('.character-btn').classList.add('active');
};

{/* <button class="character-btn" onclick="selectCharacter('steve')">
                <img src="http://localhost:3000/personagens/ivor/icon"
                    alt="Steve">
            </button>
            <button class="character-btn" onclick="selectCharacter('alex')">
                <img src="https://www.minecraft.net/content/dam/minecraft/touchup-2020/characters/char_alex.png"
                    alt="Alex">
            </button>
            <button class="character-btn" onclick="selectCharacter('zombie')">
                <img src="https://www.minecraft.net/content/dam/minecraft/touchup-2020/characters/char_zombie.png"
                    alt="Zumbi">
            </button>
            <button class="character-btn" onclick="selectCharacter('enderman')">
                <img src="https://www.minecraft.net/content/dam/minecraft/touchup-2020/characters/char_enderman.png"
                    alt="Enderman">
            </button>
            <button class="character-btn" onclick="selectCharacter('creeper')">
                <img src="https://www.minecraft.net/content/dam/minecraft/touchup-2020/characters/char_creeper.png"
                    alt="Creeper">
            </button> */}