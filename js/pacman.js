'use strict'
const PACMAN = '😬'

var gPacman
function createPacman(board) {
    // TODO
    gPacman = {
        location: {
            i: 2,
            j: 2
        },
        isSuper: false
    }

    board[gPacman.location.i][gPacman.location.j] = PACMAN
}
function movePacman(ev) {
    // console.log('ev:', ev)
    if (!gGame.isOn) return
    // DONE: use getNextLocation(), nextCell
    const nextLocation = getNextLocation(ev.key)
    var nextCell = gBoard[nextLocation.i][nextLocation.j]
    // console.log('gGhosts:', gGhosts)
    // console.log('gDeadGhosts:', gDeadGhosts)
    // DONE: return if cannot move
    if (nextCell === WALL) return

    // DONE: hitting a ghost?  call gameOver
    if (nextCell === GHOST) {
        if (!gPacman.isSuper) {
            gameOver()
            return
        }
        removeGhosts(nextLocation)
    }

    if (nextCell === FOOD) {
        gFoodCount--
        console.log('gFoodCount:', gFoodCount)
        if (gFoodCount === 0) {
            gameVictory()
            return
        }
        updateScore(1)

    } else if (nextCell === SUPER_FOOD) {
        if (gPacman.isSuper) return
        superMode()
    } else if (nextCell === CHERRY) {
        updateScore(10)
    }

    // DONE: moving from current position:
    // DONE: update the model
    gBoard[gPacman.location.i][gPacman.location.j] = EMPTY
    // DONE: update the DOM
    renderCell(gPacman.location, EMPTY)

    // DONE: Move the pacman to new location
    // DONE: update the model
    gPacman.location = nextLocation // {i:2 ,j:3}
    gBoard[gPacman.location.i][gPacman.location.j] = PACMAN
    // DONE: update the DOM
    renderCell(gPacman.location, PACMAN)
}





function getNextLocation(eventKeyboard) {
    // TODO: figure out nextLocation

    const nextLocation = {
        i: gPacman.location.i,
        j: gPacman.location.j
    }

    switch (eventKeyboard) {
        case 'ArrowUp':
            nextLocation.i--
            break;
        case 'ArrowRight':
            nextLocation.j++
            break;
        case 'ArrowDown':
            nextLocation.i++
            break;
        case 'ArrowLeft':
            nextLocation.j--
            break;

        default:
            break;
    }
    return nextLocation
}