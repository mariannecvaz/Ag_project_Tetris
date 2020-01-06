// GLOBAL
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

// JOGADOR 1
const canvas = document.querySelector('#myCanvas');
const ctx = canvas.getContext("2d");

const W = canvas.width;
const H = canvas.height;

let takenY = []
let takenX = []
let deletedLine;
let deletedLineCounter;

//Classe Peça
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
    //Desenha cada peça e especifica a cor de cada uma 
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
                    //as peças param no fim do canvas
                    if ((((takenY[j] + 30) == pieces[i].y1 && takenX[j] == pieces[i].x1) || ((takenY[j] + 30) == pieces[i].y2 && takenX[j] == pieces[i].x2) ||
                        ((takenY[j] + 30) == pieces[i].y3 && takenX[j] == pieces[i].x3) || ((takenY[j] + 30) == pieces[i].y4 && takenX[j] == pieces[i].x4)) &&
                        this.stop != true) {
                        this.stop = true
                        scoreLine()
                        //deteta quando uma peça toca no inicio do canvas tendo uma peça por baixo
                        if ((this.y1 <= 0 || this.y2 <= 0 || this.y3 <= 0 || this.y4 <= 0) && this.stop) {

                            ctx.clearRect(0, 0, W, H)
                            //coloca o array a nulo
                            pieces = []
                            pieces2 = []
                            //se o botao " Play Again" for clicado
                            if (document.getElementById("btnPlay").clicked === true) {
                                initializePiece() //cria uma nova peça começando o jogo de novo
                            } else {
                                //mostra o game over e o botao para jogar outra vez
                                document.getElementById("btnPlay").style.display = "inline";
                                document.getElementById("gameOverTxt").style.display = "inline";
                            }
                        }
                    }
                    //deteta as colisoes do lado esquerdo das peças 
                    if ((((takenY[j]) == pieces[i].y1 - 30 && takenX[j] == pieces[i].x1 + 30) || ((takenY[j]) == pieces[i].y2 - 30 && takenX[j] == pieces[i].x2 + 30) ||
                        ((takenY[j]) == pieces[i].y3 - 30 && takenX[j] == pieces[i].x3 + 30) || (takenY[j] == pieces[i].y4 - 30 && takenX[j] == pieces[i].x4 + 30)) &&
                        this.stop != true) {
                        this.leftStop = false
                    }
                    //deteta as colisoes do lado direito das peças 
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
        //limites do canvas
        if ((this.y1 + 30 === H || this.y2 + 30 === H || this.y3 + 30 === H || this.y4 + 30 === H) && this.stop != true) {
            this.stop = true;
            takenX = []
            takenY = []
            scoreLine()
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

let score1 = 0
document.getElementById("txtScore1").innerHTML = score1

//funçao que elimina linha quando preenchida
function scoreLine() {
    for (let p = 585; p >= 15; p -= 30) {
        let newLine = 0
        for (let l = 15; l <= 345; l += 30) {
            let pixel = ctx.getImageData(l, p, 1, 1)
            let color = `rgba( ${pixel.data[0]}, ${pixel.data[1]}, ${pixel.data[2]}, ${pixel.data[3]})`
            if (color === "rgba( 0, 0, 0, 0)") {
                //enquanto detetar um espaço a preto na linha, a peça continua a cair
            } else {
                newLine += 1
                if (newLine === 12) {
                    deletedLineCounter++
                    deletedLine = p - 15

                    score1 += 100 //quando uma linha é eliminada, a pontuaçao do jogador 1 aumenta 100 pontos
                    document.getElementById("txtScore1").innerHTML = score1

                    //elimina a linha que esta completamente preenchida
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
    deletedLine = 0
    newLine = 0
}
//funçao que permite as peças que estavam em cima da linha que caiam
function pieceFall() {

    for (let g = 0; g < pieces.length; g++) {
        if (pieces[g].y1 < deletedLine) {
            pieces[g].y1 += 30 * deletedLineCounter
        }
        if (pieces[g].y2 < deletedLine) {
            pieces[g].y2 += 30 * deletedLineCounter
        }
        if (pieces[g].y3 < deletedLine) {
            pieces[g].y3 += 30 * deletedLineCounter
        }
        if (pieces[g].y4 < deletedLine) {
            pieces[g].y4 += 30 * deletedLineCounter
        }


    }
    deletedLineCounter = 0

}
// Teclas jogador 2
window.addEventListener('keydown', ArrowPressed);
window.addEventListener('keyup', ArrowReleased);

//Funçao que da funcionalidades as teclas
function ArrowPressed(e) {

    if (e.code == 'KeyD' && pieces[pieces.length - 1].x1 + 30 < W && pieces[pieces.length - 1].x2 + 30 < W &&
        pieces[pieces.length - 1].x3 + 30 < W && pieces[pieces.length - 1].x4 + 30 < W && pieces[pieces.length - 1].rightStop) {

        pieces[pieces.length - 1].x1 += 30;
        pieces[pieces.length - 1].x2 += 30;
        pieces[pieces.length - 1].x3 += 30;
        pieces[pieces.length - 1].x4 += 30;
    }

    if (e.key == 'ArrowRight' && pieces2[pieces2.length - 1].x1 + 30 < W1 && pieces2[pieces2.length - 1].x2 + 30 < W1 &&
        pieces2[pieces2.length - 1].x3 + 30 < W1 && pieces2[pieces2.length - 1].x4 + 30 < W1 && pieces2[pieces2.length - 1].rightStop) {

        pieces2[pieces2.length - 1].x1 += 30;
        pieces2[pieces2.length - 1].x2 += 30;
        pieces2[pieces2.length - 1].x3 += 30;
        pieces2[pieces2.length - 1].x4 += 30;
    }

    if (e.code == 'KeyA' && pieces[pieces.length - 1].x1 >= 30 && pieces[pieces.length - 1].x2 >= 30 &&
        pieces[pieces.length - 1].x3 >= 30 && pieces[pieces.length - 1].x4 >= 30 && pieces[pieces.length - 1].leftStop) {

        pieces[pieces.length - 1].x1 -= 30;
        pieces[pieces.length - 1].x2 -= 30;
        pieces[pieces.length - 1].x3 -= 30;
        pieces[pieces.length - 1].x4 -= 30;
    }

    if (e.key == 'ArrowLeft' && pieces2[pieces2.length - 1].x1 >= 30 && pieces2[pieces2.length - 1].x2 >= 30 &&
        pieces2[pieces2.length - 1].x3 >= 30 && pieces2[pieces2.length - 1].x4 >= 30 && pieces2[pieces2.length - 1].leftStop) {

        pieces2[pieces2.length - 1].x1 -= 30;
        pieces2[pieces2.length - 1].x2 -= 30;
        pieces2[pieces2.length - 1].x3 -= 30;
        pieces2[pieces2.length - 1].x4 -= 30;
    }

    if (e.code == 'KeyS') {
        s = 2
    }
    if (e.key == 'ArrowDown') {
        s2 = 2
    }
    if (e.code == 'KeyW') {
        pieces[pieces.length - 1].rotate();
    }
    if (e.key == 'ArrowUp') {
        pieces2[pieces2.length - 1].rotate2();
    }
}
function ArrowReleased(e) {
    if (e.key == 'ArrowRight' || e.key == 'ArrowLeft' || e.key == 'ArrowUp' || e.code == 'KeyD' || e.code == 'KeyA' || e.code == 'KeyW') {
    }
    if (e.key == 'ArrowDown' || e.code == 'KeyS') {
        s = 10
        s2 = 10
    }
}




// JOGADOR 2
const canvas1 = document.querySelector('#my2Canvas');
const ctx1 = canvas1.getContext("2d");

const W1 = canvas1.width;
const H1 = canvas1.height;

let takenY2 = []
let takenX2 = []

class Piece2 {
    constructor(shape2) {
        this.shape2 = shape2
        this.rotation = 0
        this.leftStop = true
        this.rightStop = true
    }
    //posiçoes inicias de cada peça (x,y)
    createPiece2() {
        //Barra
        if (this.shape2 == 0) {
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
        else if (this.shape2 == 1) {
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
        else if (this.shape2 == 2) {
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
        else if (this.shape2 == 3) {
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
        else if (this.shape2 == 4) {
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
        else if (this.shape2 == 5) {
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
        else if (this.shape2 == 6) {
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
    draw2() {
        if (this.shape2 == 0)
            ctx1.fillStyle = 'red';

        if (this.shape2 == 1)
            ctx1.fillStyle = 'yellow'

        if (this.shape2 == 2)
            ctx1.fillStyle = "green"

        if (this.shape2 == 3)
            ctx1.fillStyle = "orange"

        if (this.shape2 == 4)
            ctx1.fillStyle = "blue"

        if (this.shape2 == 5)
            ctx1.fillStyle = "purple"

        if (this.shape2 == 6)
            ctx1.fillStyle = "cyan"

        if (this.shape2 == 7)
            ctx1.fillStyle = "red"

        ctx1.fillRect(this.x1, this.y1, 30, 30);
        ctx1.strokeStyle = 'black';
        ctx1.strokeRect(this.x1, this.y1, 30, 30);
        ctx1.lineWidth = 3;

        ctx1.fillRect(this.x2, this.y2, 30, 30);
        ctx1.strokeStyle = 'black';
        ctx1.strokeRect(this.x2, this.y2, 30, 30);
        ctx1.lineWidth = 3;

        ctx1.fillRect(this.x3, this.y3, 30, 30);
        ctx1.strokeStyle = 'black';
        ctx1.strokeRect(this.x3, this.y3, 30, 30);
        ctx1.lineWidth = 3;

        ctx1.fillRect(this.x4, this.y4, 30, 30);
        ctx1.strokeStyle = 'black';
        ctx1.strokeRect(this.x4, this.y4, 30, 30);
        ctx1.lineWidth = 3;

    }
    //
    update2() {

        //guardar as informaçoes das coordenadas x no array 
        takenX2.push(this.x1)
        takenX2.push(this.x2)
        takenX2.push(this.x3)
        takenX2.push(this.x4)

        //guardar as informaçoes das coordenadas y no array 
        takenY2.push(this.y1)
        takenY2.push(this.y2)
        takenY2.push(this.y3)
        takenY2.push(this.y4)


        if (pieces2.length > 1) {
            for (let j = 0; j < 4; j++) {
                for (let i = 0; i < pieces2.length - 1; i++) {
                    //as peças param no fim do canvas
                    if ((((takenY2[j] + 30) == pieces2[i].y1 && takenX2[j] == pieces2[i].x1) || ((takenY2[j] + 30) == pieces2[i].y2 && takenX2[j] == pieces2[i].x2) ||
                        ((takenY2[j] + 30) == pieces2[i].y3 && takenX2[j] == pieces2[i].x3) || ((takenY2[j] + 30) == pieces2[i].y4 && takenX2[j] == pieces2[i].x4)) &&
                        this.stop != true) {
                        this.stop = true
                        scoreLine2()
                        //deteta quando uma peça toca no inicio do canvas tendo uma peça por baixo
                        if ((this.y1 <= 0 || this.y2 <= 0 || this.y3 <= 0 || this.y4 <= 0) && this.stop) {

                            ctx1.clearRect(0, 0, W1, H1)
                            //coloca o array a nulo
                            pieces = []
                            pieces2 = []
                            //se o botao " Play Again" for clicado
                            if (document.getElementById("btnPlay").clicked === true) {
                                initializePiece2()
                            } else {
                                //mostra o game over e o botao para jogar outra vez
                                document.getElementById("btnPlay").style.display = "inline";
                                document.getElementById("gameOverTxt").style.display = "inline";
                            }
                        }
                    }
                    //deteta as colisoes do lado esquerdo das peças 
                    if ((((takenY2[j]) == pieces2[i].y1 - 30 && takenX2[j] == pieces2[i].x1 + 30) || ((takenY2[j]) == pieces2[i].y2 - 30 && takenX2[j] == pieces2[i].x2 + 30) ||
                        ((takenY2[j]) == pieces2[i].y3 - 30 && takenX2[j] == pieces2[i].x3 + 30) || (takenY2[j] == pieces2[i].y4 - 30 && takenX2[j] == pieces2[i].x4 + 30)) &&
                        this.stop != true) {
                        this.leftStop = false
                    }
                    //deteta as colisoes do lado direito das peças 
                    if ((((takenY2[j]) == pieces2[i].y1 - 30 && takenX2[j] == pieces2[i].x1 - 30) || ((takenY2[j]) == pieces2[i].y2 - 30 && takenX2[j] == pieces2[i].x2 - 30) ||
                        ((takenY2[j]) == pieces2[i].y3 - 30 && takenX2[j] == pieces2[i].x3 - 30) || (takenY2[j] == pieces2[i].y4 - 30 && takenX2[j] == pieces2[i].x4 - 30)) &&
                        this.stop != true) {
                        this.rightStop = false
                    }
                    this.rightStop = true
                    this.lefttStop = true

                }
            }

            takenX2 = []
            takenY2 = []
        }
        //limites do canvas
        if ((this.y1 + 30 === H1 || this.y2 + 30 === H1 || this.y3 + 30 === H1 || this.y4 + 30 === H1) && this.stop != true) {
            this.stop = true;
            takenX2 = []
            takenY2 = []
            scoreLine2()
        } else if (this.stop != true) {
            takenX2 = []
            takenY2 = []
            this.y1 += 30;
            this.y2 += 30;
            this.y3 += 30;
            this.y4 += 30;

        }
    }
    //Funçao criada para inicializar a rotaçao de cada peça
    rotate2() {
        if (this.shape2 == 0) {
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
        if (this.shape2 == 2) {
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
        if (this.shape2 == 3) {
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
        if (this.shape2 == 4) {
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
        if (this.shape2 == 5) {
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
        if (this.shape2 == 6) {
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
let pieces2 = new Array();
let shape2

//seleciona uma peça das 7 possiveis 
function initializePiece2() {
    shape2 = Math.floor(Math.random() * 6)
    pieces2.push(new Piece2(shape2))
    pieces2[pieces2.length - 1].createPiece2();
}

let deletedLine2;
let deletedLineCounter2;

let score2 = 0
document.getElementById("txtScore2").innerHTML = score2

//funçao que elimina linha quando preenchida
function scoreLine2() {
    for (let p = 585; p >= 15; p -= 30) {
        let newLine = 0
        for (let l = 15; l <= 345; l += 30) {
            let pixel = ctx1.getImageData(l, p, 1, 1)
            let color = `rgba( ${pixel.data[0]}, ${pixel.data[1]}, ${pixel.data[2]}, ${pixel.data[3]})`
            if (color === "rgba( 0, 0, 0, 0)") {
                //enquanto detetar um espaço a preto na linha, a peça continua a cair
            } else {
                newLine += 1
                if (newLine === 12) {
                    deletedLineCounter2++
                    deletedLine2 = p - 15

                    score2 += 100  //quando uma linha é eliminada, a pontuaçao do jogador 1 aumenta 100 pontos
                    document.getElementById("txtScore2").innerHTML = score2
                    //elimina a linha que esta completamente preenchida
                    for (let g = 0; g < pieces2.length; g++) {
                        if (pieces2[g].y1 === p - 15) {
                            pieces2[g].x1 = -30

                        }
                        if (pieces2[g].y2 === p - 15) {
                            pieces2[g].x2 = -30

                        }
                        if (pieces2[g].y3 === p - 15) {
                            pieces2[g].x3 = -30

                        }
                        if (pieces2[g].y4 === p - 15) {
                            pieces2[g].x4 = -30

                        }
                    }
                    break
                }
            }
        }
    }
    pieceFall2();
    deletedLine2 = 0
    newLine = 0
}
//funçao que permite as peças que estavam em cima da linha que caiam
function pieceFall2() {

    for (let g = 0; g < pieces2.length; g++) {
        if (pieces2[g].y1 < deletedLine2) {
            pieces2[g].y1 += 30 * deletedLineCounter2
        }
        if (pieces2[g].y2 < deletedLine2) {
            pieces2[g].y2 += 30 * deletedLineCounter2
        }
        if (pieces2[g].y3 < deletedLine2) {
            pieces2[g].y3 += 30 * deletedLineCounter2
        }
        if (pieces2[g].y4 < deletedLine2) {
            pieces2[g].y4 += 30 * deletedLineCounter2
        }


    }
    deletedLineCounter2 = 0

}
// ------------------------------------------------ RENDER -------------------------------------------

initializePiece()
initializePiece2()

let frameCounter = 0
let s = 10
let s2 = 10

function render() {
    frameCounter++
    //utiliza funçoes criadas na classe
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
    if (frameCounter % s2 == 0) {
        ctx1.clearRect(0, 0, W1, H1)
        pieces2.forEach(function (piece2) {
            piece2.draw2();
            piece2.update2();
            if (pieces2[pieces2.length - 1].stop) {
                initializePiece2()
            }
        })
    }
}
setInterval(render, 50);