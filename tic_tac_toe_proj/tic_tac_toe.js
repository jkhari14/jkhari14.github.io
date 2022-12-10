window.addEventListener('DOMContentLoaded', () => { //makes sure html doc fully loaded before doing anything
    const tiles = Array.from(document.querySelectorAll('.tile'));
    const playerDisplay = document.querySelector('.display-player');
    const resetButton = document.querySelector('#reset');
    const announcer = document.querySelector('.announcer');

    let board = ['', '', '', '', '', '', '', '', '', '', '', '', '', '', '', ''];
    let currentPlayer = 'X';
    let isGameActive = true;

    const PLAYERX_WON = 'PLAYERX_WON';
    const PLAYERO_WON = 'PLAYERO_WON';
    const TIE = 'TIE';


    /*
        Indexes within the board
        [0] [1] [2] [3]
        [4] [5] [6] [7]
        [8] [9] [10] [11]
        [12] [13] [14] [15]
    */

    let winningConditions = [
        [0, 1, 2, 3],
        [4, 5, 6, 7],
        [6, 7, 8, 9],
        [12, 13, 14, 15],
        [0, 5, 10, 15],
        [3, 6, 9, 12],
        [1, 5, 9, 13],
        [2, 6, 10, 14],
        [0, 4, 8, 12],
        [3, 7, 11, 15]
    ];

    function handleResultValidation() {
        let roundWon = false;
        for (let i=0;i<10;i++) {
            let winCondition = winningConditions[i];
            const a = board[winCondition[0]];
            const b = board[winCondition[1]];
            const c = board[winCondition[2]];
            const d = board[winCondition[3]];
            if (a === '' || b === '' || c === '' || d === '') {
                continue;
            }
            if (a === b && b === c && c === d) {
                roundWon = true;
                break;
            }
        }

        if (roundWon) {
                announce(currentPlayer === 'X' ? PLAYERX_WON : PLAYERO_WON);
                isGameActive = false;
                return;
            }

    if (!board.includes(''))
        announce(TIE);
    }

    const announce = (type) => {
        switch(type){
            case PLAYERO_WON:
                announcer.innerHTML = '<span class="playerO">O</span> Won!';
                break;
            case PLAYERX_WON:
                announcer.innerHTML = '<span class="playerX">X</span> Won!';
                break;
            case TIE:
                announcer.innerText = 'SCRATCH >:)';
        }
        announcer.classList.remove('hide');
    };

    const isValidAction = (tile) => {
        if (tile.innerText === 'X' || tile.innerText === 'O'){
            return false;
        }

        return true;
    };

    const updateBoard =  (index) => {
        board[index] = currentPlayer;
    }

    const changePlayer = () => {
        playerDisplay.classList.remove(`player${currentPlayer}`);
        currentPlayer = currentPlayer === 'X' ? 'O' : 'X';
        playerDisplay.innerText = currentPlayer;
        playerDisplay.classList.add(`player${currentPlayer}`);
    }

    const userAction = (tile, index) => {
        if(isValidAction(tile) && isGameActive) {
            tile.innerText = currentPlayer;
            tile.classList.add(`player${currentPlayer}`);
            updateBoard(index);
            handleResultValidation();
            changePlayer();
        }
    }
    
    const resetBoard = () => {
        board = ['', '', '', '', '', '', '', '', '', '', '', '', '', '', '', ''];
        isGameActive = true;
        announcer.classList.add('hide');

        if (currentPlayer === 'O') {
            changePlayer();
        }

        tiles.forEach(tile => {
            tile.innerText = '';
            tile.classList.remove('playerX');
            tile.classList.remove('playerO');
        });
    }

    tiles.forEach( (tile, index) => {
        tile.addEventListener('click', () => userAction(tile, index));
    });

    resetButton.addEventListener('click', resetBoard);
});