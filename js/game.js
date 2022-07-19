'use strict'
const WALL = '🔶'
const FOOD = '▫'
const EMPTY = ' '
const CHERRY = '🍒'
const SUPER_FOOD = '🍺'

var gCherryInterval
var gBoard
var gFoodCount = 56
const gGame = {
    score: 0,
    isOn: false
}

function init() {

    gBoard = buildBoard()
    gFoodCount = 56
    createPacman(gBoard)
    createGhosts(gBoard)
    printMat(gBoard, '.board-container')
    gCherryInterval = setInterval(addCherry, 15000)
    gGame.score = 0
    updateScore(0)
    gGame.isOn = true
    getRandEmptyCell()
    toggleModal('')
}

function buildBoard() {
    const size = 10
    const board = []
    for (var i = 0; i < size; i++) {
        board.push([])
        for (var j = 0; j < size; j++) {
            board[i][j] = FOOD
            if (i === 0 || i === size - 1 ||
                j === 0 || j === size - 1 ||
                (j === 3 && i > 4 && i < size - 2)) {
                board[i][j] = WALL
            }

        }
    }
    board[1][1] = SUPER_FOOD
    board[1][size - 2] = SUPER_FOOD
    board[size - 2][1] = SUPER_FOOD
    board[size - 2][size - 2] = SUPER_FOOD
    // console.log('board:', board)
    return board
}



function updateScore(diff) {
    // TODO: update model and dom
    // Model
    gGame.score += diff

    //DOM
    document.querySelector('h2 span').innerText = gGame.score
}

function gameOver() {
    // TODO
    // document.querySelector('.lost').style.display = 'block'
    toggleModal('You lost ☹')
    // console.log('Game Over')
    clearInterval(gIntervalGhosts)
    clearInterval(gCherryInterval)
    renderCell(gPacman.location, '💀')
    gGame.isOn = false
}

function gameVictory() {
    // document.querySelector('.win').style.display = 'block'
    clearInterval(gIntervalGhosts)
    renderCell(gPacman.location, '😎')
    gGame.isOn = false
    toggleModal('You won!👑👑')
}

function superMode() {
    gPacman.isSuper = true

    setTimeout(() => {
        gPacman.isSuper = false
        gGhosts = gGhosts.concat(gDeadGhosts)
        gDeadGhosts = []
    }, 5000)
}

function addCherry() {
    var randCell = getRandEmptyCell()
    gBoard[randCell.i][randCell.j] = CHERRY
    renderCell(randCell, CHERRY)
}

function toggleModal(msg) {
    const elModal = document.querySelector('.modal')
    const elMsg = document.querySelector('.user-msg')
    elMsg.innerText = msg
    elModal.hidden = !elModal.hidden
}