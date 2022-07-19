'use strict'
// const GHOST = '&#9781'
const GHOST ='ꌇ'
var gGhosts = []
var gDeadGhosts = []
var gIntervalGhosts

function createGhost(board, idx) {
    // DONE
    var ghost = {
        location: {
            i: 2 + idx,
            // i: 2,
            j: 6
        },
        currCellContent: FOOD,
        color: getRandomColor()
    }

    gGhosts.push(ghost)
    board[ghost.location.i][ghost.location.j] = GHOST
}

function createGhosts(board) {
    gGhosts = []
    // DONE: 3 ghosts and an interval
    for (var i = 0; i < 3; i++) {
        createGhost(board, i)
    }
    gIntervalGhosts = setInterval(moveGhosts, 1000)
}

function moveGhosts() {
    // DONE: loop through ghosts
    for (var i = 0; i < gGhosts.length; i++) {
        var ghost = gGhosts[i]
        moveGhost(ghost)
    }
    // console.log('')
}








function moveGhost(ghost) {
    // DONE: figure out moveDiff, nextLocation, nextCell
    const moveDiff = getMoveDiff()

    const nextLocation = {
        i: ghost.location.i + moveDiff.i,
        j: ghost.location.j + moveDiff.j
    }

    var nextCell = gBoard[nextLocation.i][nextLocation.j]
    // console.log(nextLocation);

    // DONE: return if cannot move
    if (nextCell === WALL) return

    if (nextCell === GHOST) return


    // DONE: hitting a pacman?  call gameOver
    if (nextCell === PACMAN) {
        if (!gPacman.isSuper) {
            gameOver()
            return
        }
        return
        // nextCell=EMPTY
        // var ghost = gGhosts.pop()
        // gDeadGhosts.push(ghost)
    }


    // DONE: moving from current position:
    // DONE: update the model
    gBoard[ghost.location.i][ghost.location.j] = ghost.currCellContent
    // DONE: update the DOM
    renderCell(ghost.location, ghost.currCellContent)


    // DONE: Move the ghost to new location
    // DONE: update the model
    ghost.currCellContent = nextCell
    ghost.location = nextLocation
    gBoard[ghost.location.i][ghost.location.j] = GHOST
    // DONE: update the DOM
    renderCell(ghost.location, getGhostHTML(ghost))
}




function getMoveDiff() {
    // const randNum = getRandomIntInclusive(1, 100)
    // if (randNum <= 25) {
    //     return { i: 0, j: 1 }
    // } else if (randNum <= 50) {
    //     return { i: -1, j: 0 }
    // } else if (randNum <= 75) {
    //     return { i: 0, j: -1 }
    // } else {
    //     return { i: 1, j: 0 }
    // }

    const randNum = getRandomIntInclusive(1, 4)
    if (randNum === 1) {
        return { i: 0, j: 1 }
    } else if (randNum === 2) {
        return { i: -1, j: 0 }
    } else if (randNum === 3) {
        return { i: 0, j: -1 }
    } else {
        return { i: 1, j: 0 }
    }
}


function getGhostHTML(ghost) {
    const color = gPacman.isSuper ? 'yellow' : ghost.color
    return `<span style="color:${color}">${GHOST}</span>`
}

function removeGhosts(nextLocation) {
    for (var i = 0; i < gGhosts.length; i++) {
        const ghost = gGhosts[i]
        if (ghost.location.i === nextLocation.i && ghost.location.j === nextLocation.j) {
            const deadGhost = gGhosts.splice(i, 1)[0]
            if (deadGhost.currCellContent === FOOD) {
                gFoodCount--
                deadGhost.currCellContent = EMPTY
            }
            gDeadGhosts.push(deadGhost)
        }
    }
}