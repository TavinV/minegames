document.addEventListener('DOMContentLoaded', () => {
    const memoryBoard = document.getElementById('memoryBoard');
    const mobs = ['enderman', 'creeper', 'steeve', 'porco'];
    let cards = [...mobs, ...mobs];
    let flippedCards = [];
    let matchedPairs = 0;
    let canFlip = true;

    function shuffleArray(array) {
        for (let i = array.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            [array[i], array[j]] = [array[j], array[i]];
        }
        return array;
    }

    function createBoard() {
        memoryBoard.innerHTML = '';
        shuffledCards = shuffleArray([...cards]);
        flippedCards = [];
        matchedPairs = 0;
        canFlip = true;

        shuffledCards.forEach((mob, index) => {
            const card = document.createElement('div');
            card.className = 'card';
            card.dataset.index = index;
            card.dataset.mob = mob;

            const img = document.createElement('img');
            img.src = `image/${mob}.webp`;
            img.alt = mob;

            card.appendChild(img);
            card.addEventListener('click', flipCard);
            memoryBoard.appendChild(card);
        });
    }

    function flipCard() {
        if (!canFlip) return;
        if (flippedCards.length === 2) return;
        if (this === flippedCards[0]) return;
        if (this.querySelector('img').classList.contains('visible')) return;

        const img = this.querySelector('img');
        img.classList.add('visible');

        flippedCards.push(this);

        if (flippedCards.length === 2) {
            canFlip = false;
            setTimeout(checkForMatch, 500);
        }
    }

    function checkForMatch() {
        const [card1, card2] = flippedCards;
        const mob1 = card1.dataset.mob;
        const mob2 = card2.dataset.mob;

        if (mob1 === mob2) {
            matchedPairs++;
            if (matchedPairs === mobs.length) {
                setTimeout(() => {
                    alert('Parabéns! Você venceu!');
                    createBoard();
                }, 300);
            }
        } else {
            card1.querySelector('img').classList.remove('visible');
            card2.querySelector('img').classList.remove('visible');
        }

        flippedCards = [];
        canFlip = true;
    }

    createBoard();
});