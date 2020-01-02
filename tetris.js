const canvas = document.querySelector('#myCanvas');
const ctx = canvas.getContext("2d");

const W = canvas.width;
const H = canvas.height;

let x1
let y1
let x2
let y2
let x3
let y3
let x4
let y4

let stop = false;

let takenY = []
let takenX = []

// const row = 20;
// const col = column = 10;
// const sq = squareSize = 30;
// const vacant = "black"; // color of an empty square

// function drawBoard() {
//     for (r = 0; r < row; r++) {
//         for (c = 0; c < col; c++) {
//             drawSquare(c, r, board[r][c]);
//         }
//     }
// }

// function drawSquare(x, y, color) {
//     ctx1.fillStyle = color;
//     ctx1.fillRect(x * sq, y * sq, sq, sq);

//     ctx1.strokeStyle = "white";
//     ctx1.strokeRect(x * sq, y * sq, sq, sq);
// }

// let board = [];
// for (r = 0; r < row; r++) {
//     board[r] = [];
//     for (c = 0; c < col; c++) {
//         board[r][c] = vacant;
//     }
// }



class Piece {
    constructor(shape) {
        this.shape = shape
        this.rotation = 0
    }
    createPiece() {
        //Barra
        if (this.shape == 0) {
            this.x1 = 120;
            this.y1 = 0;
            this.x2 = 150;
            this.y2 = 0;
            this.x3 = 180;
            this.y3 = 0;
            this.x4 = 210;
            this.y4 = 0;
        }
        //Quadrado
        else if (this.shape == 1) {
            this.x1 = 150;
            this.y1 = 0;
            this.x2 = 180;
            this.y2 = 0;
            this.x3 = 150;
            this.y3 = 30;
            this.x4 = 180;
            this.y4 = 30;
        }
        //T
        else if (this.shape == 2) {
            this.x1 = 120;
            this.y1 = 0;
            this.x2 = 150;
            this.y2 = 0;
            this.x3 = 180;
            this.y3 = 0;
            this.x4 = 150;
            this.y4 = 30;
        }
        //Z
        else if (this.shape == 3) {
            this.x1 = 120;
            this.y1 = 0;
            this.x2 = 150;
            this.y2 = 0;
            this.x3 = 180;
            this.y3 = 30;
            this.x4 = 150;
            this.y4 = 30;
        }
        //L
        else if (this.shape == 4) {
            this.x1 = 120;
            this.y1 = 0;
            this.x2 = 150;
            this.y2 = 0;
            this.x3 = 180;
            this.y3 = 0;
            this.x4 = 180;
            this.y4 = -30;
        }
        //S
        else if (this.shape == 5) {
            this.x1 = 120;
            this.y1 = 30;
            this.x2 = 150;
            this.y2 = 30;
            this.x3 = 180;
            this.y3 = 0;
            this.x4 = 150;
            this.y4 = 0;
        }
        //Bota
        else if (this.shape == 6) {
            this.x1 = 120;
            this.y1 = -30;
            this.x2 = 120;
            this.y2 = 0;
            this.x3 = 150;
            this.y3 = 0;
            this.x4 = 180;
            this.y4 = 0;
        }
    }
    draw() {
        if (this.shape == 0)
            ctx.fillStyle = 'red';

        if (this.shape == 1)
            ctx.fillStyle = 'yellow'

        if (this.shape == 2)
            ctx.fillStyle = "green"

        if (this.shape == 3)
            ctx.fillStyle = "orange"

        if (this.shape == 4)
            ctx.fillStyle = "blue"

        if (this.shape == 5)
            ctx.fillStyle = "purple"

        if (this.shape == 6)
            ctx.fillStyle = "cyan"

        if (this.shape == 7)
            ctx.fillStyle = "red"

        ctx.fillRect(this.x1, this.y1, 30, 30);
        ctx.strokeStyle = 'black';
        ctx.strokeRect(this.x1, this.y1, 30, 30);
        ctx.lineWidth = 3;

        ctx.fillRect(this.x2, this.y2, 30, 30);
        ctx.strokeStyle = 'black';
        ctx.strokeRect(this.x2, this.y2, 30, 30);
        ctx.lineWidth = 3;

        ctx.fillRect(this.x3, this.y3, 30, 30);
        ctx.strokeStyle = 'black';
        ctx.strokeRect(this.x3, this.y3, 30, 30);
        ctx.lineWidth = 3;

        ctx.fillRect(this.x4, this.y4, 30, 30);
        ctx.strokeStyle = 'black';
        ctx.strokeRect(this.x4, this.y4, 30, 30);
        ctx.lineWidth = 3;

    }
    update() {

        takenX.push(this.x1)
        takenX.push(this.x2)
        takenX.push(this.x3)
        takenX.push(this.x4)

        takenY.push(this.y1)
        takenY.push(this.y2)
        takenY.push(this.y3)
        takenY.push(this.y4)


        if (pieces.length > 1) {
            for (let j = 0; j < 4; j++) {
                for (let i = 0; i < pieces.length - 1; i++) {
                    if ((((takenY[j] + 30) == pieces[i].y1 && takenX[j] == pieces[i].x1) || ((takenY[j] + 30) == pieces[i].y2 && takenX[j] == pieces[i].x2) ||
                        ((takenY[j] + 30) == pieces[i].y3 && takenX[j] == pieces[i].x3) || ((takenY[j] + 30) == pieces[i].y4 && takenX[j] == pieces[i].x4)) &&
                        this.stop != true) {
                        this.stop = true
                    }
                }
            }

            takenX = []
            takenY = []
        }
        if ((this.y1 + 30 === H || this.y2 + 30 === H || this.y3 + 30 === H || this.y4 + 30 === H) && this.stop != true) {
            this.stop = true;
           

            takenX = []
            takenY = []
        }
        else if (this.stop != true) {
            takenX = []
            takenY = []
            this.y1 += 30;
            this.y2 += 30;
            this.y3 += 30;
            this.y4 += 30;


        }

    }
    rotate() {
        if (this.shape == 0) {
            if (this.rotation == 0) {
                this.x1 = this.x2;
                this.y1 = this.y2 - 30;
                this.x3 = this.x2;
                this.y3 = this.y2 + 30;
                this.x4 = this.x2;
                this.y4 = this.y2 + 60;
                this.rotation = 1
            }
            else {
                this.x1 = this.x2 - 30;
                this.y1 = this.y2
                this.x3 = this.x2 + 30;
                this.y3 = this.y2;
                this.x4 = this.x2 + 60;
                this.y4 = this.y2;
                this.rotation = 0
            }
        }
        if (this.shape == 2) {
            if (this.rotation == 0) {
                this.x1 = this.x2
                this.y1 = this.y2 - 30
                this.x3 = this.x2
                this.y3 = this.y2 + 30
                this.x4 = this.x2 - 30
                this.y4 = this.y2
                this.rotation = 1
            } else if (this.rotation == 1) {
                this.x1 = this.x2 - 30
                this.y1 = this.y2
                this.x3 = this.x2 + 30
                this.y3 = this.y2
                this.x4 = this.x2
                this.y4 = this.y2 - 30
                this.rotation = 2
            } else if (this.rotation == 2) {
                this.x1 = this.x2
                this.y1 = this.y2 - 30
                this.x3 = this.x2
                this.y3 = this.y2 + 30
                this.x4 = this.x2 + 30
                this.y4 = this.y2
                this.rotation = 3
            } else if (this.rotation == 3) {
                this.x1 = this.x2 - 30
                this.y1 = this.y2
                this.x3 = this.x2 + 30
                this.y3 = this.y2
                this.x4 = this.x2
                this.y4 = this.y2 + 30
                this.rotation = 0
            }
        }
        if (this.shape == 3) {
            if (this.rotation == 0) {
                this.x1 = this.x2
                this.y1 = this.y2 - 30
                this.x3 = this.x2 - 30
                this.y3 = this.y2 + 30
                this.x4 = this.x2 - 30
                this.y4 = this.y3 - 30
                this.rotation = 1
            } else if (this.rotation == 1) {
                this.x1 = this.x2 + 30
                this.y1 = this.y2
                this.x3 = this.x2 + 30
                this.y3 = this.y2 + 30
                this.x4 = this.x3 + 30
                this.y4 = this.y3
                this.rotation = 0
            }
        }
        if (this.shape == 4) {
            if (this.rotation == 0) {
                this.x1 = this.x2
                this.y1 = this.y2 - 30
                this.x3 = this.x2
                this.y3 = this.y2 + 30
                this.x4 = this.x3 - 30
                this.y4 = this.y1
                this.rotation = 1
            } else if (this.rotation == 1) {
                this.x1 = this.x2 - 30
                this.y1 = this.y2
                this.x3 = this.x2 + 30
                this.y3 = this.y2
                this.x4 = this.x3
                this.y4 = this.y1 - 30
                this.rotation = 2
            } else if (this.rotation == 2) {
                this.x1 = this.x2
                this.y1 = this.y2 - 30
                this.x3 = this.x2
                this.y3 = this.y2 + 30
                this.x4 = this.x3 + 30
                this.y4 = this.y3
                this.rotation = 0
            }
        }
        if (this.shape == 5) {
            if (this.rotation == 0) {
                this.x1 = this.x2
                this.y1 = this.y2 + 30
                this.x3 = this.x2 + 30
                this.y3 = this.y2 + 30
                this.x4 = this.x2 + 30
                this.y4 = this.y3 + 30
                this.rotation = 1
            }
            else if (this.rotation == 1) {
                this.x1 = this.x2 + 30
                this.y1 = this.y2
                this.x3 = this.x2 + 30
                this.y3 = this.y2 - 30
                this.x4 = this.x3 + 30
                this.y4 = this.y3
                this.rotation = 0
            }
        }
        if (this.shape == 6) {
            if (this.rotation == 0) {
                this.x1 = this.x2
                this.y1 = this.y2 - 30
                this.x3 = this.x2
                this.y3 = this.y2 + 30
                this.x4 = this.x3 - 30
                this.y4 = this.y3
                this.rotation = 1
            }
            else if (this.rotation == 1) {
                this.x1 = this.x2 - 30
                this.y1 = this.y2
                this.x3 = this.x2 + 30
                this.y3 = this.y2
                this.x4 = this.x1
                this.y4 = this.y2 - 30
                this.rotation = 2
            } else if (this.rotation == 2) {
                this.x1 = this.x2
                this.y1 = this.y2 - 30
                this.x3 = this.x2
                this.y3 = this.y2 + 30
                this.x4 = this.x3 + 30
                this.y4 = this.y1
                this.rotation = 0
            }
        }
    }
}

let pieces = new Array();
let shape
function initializePiece() {
    shape = Math.floor(Math.random() * 6)
    pieces.push(new Piece(shape))
    pieces[pieces.length - 1].createPiece();
}

initializePiece()
let frameCounter = 0
let s = 10
function render() {
    frameCounter++
    if (frameCounter % s == 0) {
        ctx.clearRect(0, 0, W, H)
        pieces.forEach(function (piece) {
            piece.draw();
            piece.update();
            if (pieces[pieces.length - 1].stop) {
                initializePiece()
            }
        })
    }
}
setInterval(render, 50);

window.addEventListener('keydown', ArrowPressed);
window.addEventListener('keyup', ArrowReleased);

function ArrowPressed(e) {
    if (e.key == 'ArrowRight' && pieces[pieces.length - 1].x1 + 30 < W && pieces[pieces.length - 1].x2 + 30 < W &&
        pieces[pieces.length - 1].x3 + 30 < W && pieces[pieces.length - 1].x4 + 30 < W) {

        pieces[pieces.length - 1].x1 += 30;
        pieces[pieces.length - 1].x2 += 30;
        pieces[pieces.length - 1].x3 += 30;
        pieces[pieces.length - 1].x4 += 30;
    }

    if (e.key == 'ArrowLeft' && pieces[pieces.length - 1].x1 >= 30 && pieces[pieces.length - 1].x2 >= 30 &&
        pieces[pieces.length - 1].x3 >= 30 && pieces[pieces.length - 1].x4 >= 30) {

        pieces[pieces.length - 1].x1 -= 30;
        pieces[pieces.length - 1].x2 -= 30;
        pieces[pieces.length - 1].x3 -= 30;
        pieces[pieces.length - 1].x4 -= 30;
    }

    if (e.key == 'ArrowDown') {
        s = 2
    }
    if (e.key == 'ArrowUp') {
        pieces[pieces.length - 1].rotate();
    }
}
function ArrowReleased(e) {
    if (e.key == 'ArrowRight' || e.key == 'ArrowLeft'
        || e.key == 'ArrowUp') {
    }
    if (e.key == 'ArrowDown') {
        s = 10
    }
}

