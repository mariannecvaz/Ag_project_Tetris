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
let gameOver = false;

let takenY = []
let takenX = []

// Classe Peça
class Piece {
    constructor(shape) {
        this.shape = shape
        this.rotation = 0
        this.leftStop = true
        this.rightStop = true
    }
    //posiçoes inicias de cada peça (x,y)
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
    //desenha cada peça e especifica a cor de cada uma 
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
    //
    update() {

        //guardar as informaçoes das coordenadas x no array 
        takenX.push(this.x1)
        takenX.push(this.x2)
        takenX.push(this.x3)
        takenX.push(this.x4)

        //guardar as informaçoes das coordenadas y no array 
        takenY.push(this.y1)
        takenY.push(this.y2)
        takenY.push(this.y3)
        takenY.push(this.y4)


        if (pieces.length > 1) {
            for (let j = 0; j < 4; j++) {
                for (let i = 0; i < pieces.length - 1; i++) {
                    //As peças param no fim do canvas
                    if ((((takenY[j] + 30) == pieces[i].y1 && takenX[j] == pieces[i].x1) || ((takenY[j] + 30) == pieces[i].y2 && takenX[j] == pieces[i].x2) ||
                            ((takenY[j] + 30) == pieces[i].y3 && takenX[j] == pieces[i].x3) || ((takenY[j] + 30) == pieces[i].y4 && takenX[j] == pieces[i].x4)) &&
                        this.stop != true) {
                        this.stop = true
                        scoreLine()
                        //Deteta quando uma peça toca no inicio do canvas tendo uma peça por baixo
                        if ((this.y1 <= 0 || this.y2 <= 0 || this.y3 <= 0 || this.y4 <= 0) && this.stop) {

                            ctx.clearRect(0, 0, W, H)

                            pieces = [] //Coloca o array a nulo
                            if (document.getElementById("btnPlay").clicked === true) {
                                initializePiece() //cria uma nova peça começando o jogo de novo
                            } else { //Mostra o game over e o botão para jogar novamente
                                document.getElementById("btnPlay").style.display = "inline";
                                document.getElementById("gameOverTxt").style.display = "inline";
                            }
                        }
                    }
                    //Deteta as colisões do lado esquerdo das peças
                    if ((((takenY[j]) == pieces[i].y1 - 30 && takenX[j] == pieces[i].x1 + 30) || ((takenY[j]) == pieces[i].y2 - 30 && takenX[j] == pieces[i].x2 + 30) ||
                            ((takenY[j]) == pieces[i].y3 - 30 && takenX[j] == pieces[i].x3 + 30) || (takenY[j] == pieces[i].y4 - 30 && takenX[j] == pieces[i].x4 + 30)) &&
                        this.stop != true) {
                        this.leftStop = false
                    }
                    //Deteta as colisões do lado direito das peças
                    if ((((takenY[j]) == pieces[i].y1 - 30 && takenX[j] == pieces[i].x1 - 30) || ((takenY[j]) == pieces[i].y2 - 30 && takenX[j] == pieces[i].x2 - 30) ||
                            ((takenY[j]) == pieces[i].y3 - 30 && takenX[j] == pieces[i].x3 - 30) || (takenY[j] == pieces[i].y4 - 30 && takenX[j] == pieces[i].x4 - 30)) &&
                        this.stop != true) {
                        this.rightStop = false
                    }
                    this.rightStop = true
                    this.lefttStop = true
                }
            }
            takenX = []
            takenY = []
        }
        //Limites do Canvas
        if ((this.y1 + 30 === H || this.y2 + 30 === H || this.y3 + 30 === H || this.y4 + 30 === H) && this.stop != true) {
            this.stop = true;
            takenX = []
            takenY = []
            scoreLines()
        } else if (this.stop != true) {
            takenX = []
            takenY = []

            this.y1 += 30;
            this.y2 += 30;
            this.y3 += 30;
            this.y4 += 30;
        }
    }
    //Funçao criada para inicializar a rotaçao de cada peça
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
            } else {
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
            } else if (this.rotation == 1) {
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
            } else if (this.rotation == 1) {
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

//seleciona uma peça das 7 possiveis 
function initializePiece() {
    shape = Math.floor(Math.random() * 6)
    pieces.push(new Piece(shape))
    pieces[pieces.length - 1].createPiece();
}

initializePiece()

let frameCounter = 0
let s = 10

// Chama as funções criadas na class
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

let deletedLineCounter;
let deletedCounter;
let score = 0
document.getElementById("txtScore").innerHTML = score

//Função que elimina uma linha quando esta se encontra totalmente preenchida 
function scoreLine() {

    for (let p = 585; p >= 15; p -= 30) {
        let newLine = 0
        for (let l = 15; l <= 345; l += 30) {
            let pixel = ctx.getImageData(l, p, 1, 1)
            let color = `rgba( ${pixel.data[0]}, ${pixel.data[1]}, ${pixel.data[2]}, ${pixel.data[3]})`

            //Enquanto detetar um espaço a preto na linha, a peça continua a cair
            if (color === "rgba( 0, 0, 0, 0)") {

            } 
            else {
                newLine += 1
                if (newLine === 12) {
                    deletedCounter++
                    deletedLineCounter = p - 15

                    score += 100  //Quando uma linha é eliminada, a pontuação do jogador aumenta 100 pontos
                    document.getElementById("txtScore").innerHTML = score
                  
                    //Elimina a linha que está completamente preenchida
                    for (let g = 0; g < pieces.length; g++) {
                        if (pieces[g].y1 === p - 15) {
                            pieces[g].x1 = -30
                        }
                        if (pieces[g].y2 === p - 15) {
                            pieces[g].x2 = -30
                        }
                        if (pieces[g].y3 === p - 15) {
                            pieces[g].x3 = -30
                        }
                        if (pieces[g].y4 === p - 15) {
                            pieces[g].x4 = -30
                        }
                    }
                    break
                }
            }
        }
    }
    pieceFall();
    deletedLineCounter = 0
    newLine = 0
}

// Função que permite as peças que estavam em cima da linha eliminada cairem
function pieceFall() {

    for (let g = 0; g < pieces.length; g++) {
        if (pieces[g].y1 < deletedLineCounter) {
            pieces[g].y1 += 30 * deletedCounter
        }
        if (pieces[g].y2 < deletedLineCounter) {
            pieces[g].y2 += 30 * deletedCounter
        }
        if (pieces[g].y3 < deletedLineCounter) {
            pieces[g].y3 += 30 * deletedCounter
        }
        if (pieces[g].y4 < deletedLineCounter) {
            pieces[g].y4 += 30 * deletedCounter
        }
    }
    deletedCounter = 0
}
setInterval(render, 50);

window.addEventListener('keydown', ArrowPressed);
window.addEventListener('keyup', ArrowReleased);

//Função que dá funcionalidade às teclas
function ArrowPressed(e) {

    if (e.key == 'ArrowRight' && pieces[pieces.length - 1].x1 + 30 < W && pieces[pieces.length - 1].x2 + 30 < W &&
        pieces[pieces.length - 1].x3 + 30 < W && pieces[pieces.length - 1].x4 + 30 < W && pieces[pieces.length - 1].rightStop) {

        pieces[pieces.length - 1].x1 += 30;
        pieces[pieces.length - 1].x2 += 30;
        pieces[pieces.length - 1].x3 += 30;
        pieces[pieces.length - 1].x4 += 30;
    }

    if (e.key == 'ArrowLeft' && pieces[pieces.length - 1].x1 >= 30 && pieces[pieces.length - 1].x2 >= 30 &&
        pieces[pieces.length - 1].x3 >= 30 && pieces[pieces.length - 1].x4 >= 30 && pieces[pieces.length - 1].leftStop) {

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
    if (e.key == 'ArrowRight' || e.key == 'ArrowLeft' || e.key == 'ArrowUp') {
    }

    if (e.key == 'ArrowDown') {
        s = 10
    }
}