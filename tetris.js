class piece {
    constructor(x, y) {
        this.x = x
        this.y = y
        this.g = 0.05
        this.shape = shape
        this.color = color
        this.dy=0
    }
    draw(){
        ctx.fillStyle = this.color;
        ctx.beginPath();
        ctx.rect(this.x, this.y, 5, 5);
        ctx.fill();

    }
    update(){

    }
}