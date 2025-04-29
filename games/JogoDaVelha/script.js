document.addEventListener('DOMContentLoaded', () => {
    const cells = document.querySelectorAll('.cell');
    const resetButton = document.getElementById('resetButton');
    const resetScoreButton = document.getElementById('resetScore');
    const pvpButton = document.getElementById('pvp');
    const pvcButton = document.getElementById('pvc');
    const explosion = document.getElementById('explosion');
    
    // Elementos do placar
    const scoreSteve = document.getElementById('score-steve');
    const scoreCreeper = document.getElementById('score-creeper');
    const scoreDraw = document.getElementById('score-draw');
    
    // Sons do Minecraft
    const sounds = {
        place: new Audio('https://assets.mixkit.co/sfx/preview/mixkit-arcade-game-jump-coin-216.mp3'),
        creeper: new Audio('https://assets.mixkit.co/sfx/preview/mixkit-explosion-impact-1684.mp3'),
        steve: new Audio('https://assets.mixkit.co/sfx/preview/mixkit-unlock-game-notification-253.mp3'),
        win: new Audio('https://assets.mixkit.co/sfx/preview/mixkit-winning-chimes-2015.mp3'),
        draw: new Audio('https://assets.mixkit.co/sfx/preview/mixkit-retro-arcade-lose-2027.mp3')
    };
    
    let gameState = ['', '', '', '', '', '', '', '', ''];
    let currentPlayer = 'Steve';
    let gameActive = true;
    let vsComputer = false;
    let scores = { Steve: 0, Creeper: 0, Draw: 0 };
    
    const winningConditions = [
        [0, 1, 2],
        [3, 4, 5],
        [6, 7, 8],
        [0, 3, 6],
        [1, 4, 7],
        [2, 5, 8],
        [0, 4, 8],
        [2, 4, 6]
    ];
    
    // Inicializa o placar
    updateScoreboard();
    
    // Event Listeners
    cells.forEach(cell => cell.addEventListener('click', handleCellClick));
    resetButton.addEventListener('click', handleResetGame);
    resetScoreButton.addEventListener('click', resetScores);
    pvpButton.addEventListener('click', () => setGameMode(false));
    pvcButton.addEventListener('click', () => setGameMode(true));
    
    function setGameMode(againstComputer) {
        vsComputer = againstComputer;
        pvpButton.classList.toggle('active', !againstComputer);
        pvcButton.classList.toggle('active', againstComputer);
        handleResetGame();
    }
    
    function handleCellClick(e) {
        if (!gameActive) return;
        
        const clickedCell = e.target;
        const clickedCellIndex = parseInt(clickedCell.getAttribute('data-index'));
        
        if (gameState[clickedCellIndex] !== '') return;
        
        makeMove(clickedCell, clickedCellIndex);
        
        // Se for modo contra computador e o jogo não terminou
        if (vsComputer && gameActive && currentPlayer === 'Creeper') {
            setTimeout(computerMove, 800);
        }
    }
    
    function makeMove(cell, index) {
        gameState[index] = currentPlayer;
        cell.classList.add(currentPlayer);
        
        // Tocar som
        sounds.place.currentTime = 0;
        sounds.place.play();
        
        checkGameResult();
    }
    
    function computerMove() {
        if (!gameActive) return;
        
        // Lógica simples da IA: primeiro tenta vencer, depois bloqueia, depois escolhe aleatório
        let move = findWinningMove('Creeper') || 
                   findWinningMove('Steve') || 
                   findRandomMove();
        
        if (move !== null) {
            const cell = document.querySelector(`.cell[data-index="${move}"]`);
            makeMove(cell, move);
        }
    }
    
    function findWinningMove(player) {
        for (let condition of winningConditions) {
            const [a, b, c] = condition;
            // Verifica se há duas marcas do jogador e um espaço vazio
            if (gameState[a] === player && gameState[b] === player && gameState[c] === '') return c;
            if (gameState[a] === player && gameState[c] === player && gameState[b] === '') return b;
            if (gameState[b] === player && gameState[c] === player && gameState[a] === '') return a;
        }
        return null;
    }
    
    function findRandomMove() {
        const emptyCells = gameState.reduce((acc, val, index) => {
            if (val === '') acc.push(index);
            return acc;
        }, []);
        
        if (emptyCells.length > 0) {
            return emptyCells[Math.floor(Math.random() * emptyCells.length)];
        }
        return null;
    }
    
    function checkGameResult() {
        let roundWon = false;
        
        for (let condition of winningConditions) {
            const [a, b, c] = condition;
            if (gameState[a] === '' || gameState[b] === '' || gameState[c] === '') continue;
            
            if (gameState[a] === gameState[b] && gameState[b] === gameState[c]) {
                roundWon = true;
                break;
            }
        }
        
        if (roundWon) {
            endGame(currentPlayer);
            return;
        }
        
        if (!gameState.includes('')) {
            endGame('Draw');
            return;
        }
        
        switchPlayer();
    }
    
    function endGame(winner) {
        gameActive = false;
        
        if (winner === 'Creeper') {
            sounds.creeper.play();
            explosion.style.display = 'block';
            setTimeout(() => {
                explosion.style.display = 'none';
            }, 800);
            
            if (vsComputer) {
                alert('Você perdeu! O Creeper venceu!');
            } else {
                alert('Creeper (Jogador 2) venceu!');
            }
        } else if (winner === 'Steve') {
            sounds.steve.play();
            if (vsComputer) {
                alert('Você ganhou! Steve venceu!');
            } else {
                alert('Steve (Jogador 1) venceu!');
            }
        } else {
            sounds.draw.play();
            alert('Empate! Ninguém venceu desta vez!');
        }
        
        sounds.win.play();
        
        // Atualizar placar
        if (winner !== 'Draw') {
            scores[winner]++;
        } else {
            scores.Draw++;
        }
        
        updateScoreboard();
        handleResetGame();
    }
    
    function switchPlayer() {
        currentPlayer = currentPlayer === 'Steve' ? 'Creeper' : 'Steve';
    }
    
    function handleResetGame() {
        gameState = ['', '', '', '', '', '', '', '', ''];
        gameActive = true;
        currentPlayer = 'Steve';
        
        cells.forEach(cell => {
            cell.classList.remove('Steve', 'Creeper');
        });
    }
    
    function resetScores() {
        scores = { Steve: 0, Creeper: 0, Draw: 0 };
        updateScoreboard();
    }
    
    function updateScoreboard() {
        scoreSteve.textContent = scores.Steve;
        scoreCreeper.textContent = scores.Creeper;
        scoreDraw.textContent = scores.Draw;
    }
});