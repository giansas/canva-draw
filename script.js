//  ----INITIAL DATA----
let currentColor = 'Black';

let screen = document.querySelector('#tela');
//  Draw the context (ctx) in 2D
let ctx = screen.getContext('2d');
let canDraw = false;
let mouseX = 0;
let mouseY = 0;

//  ----EVENTS----

//  Getting the event CLICK from class of the color options 
document.querySelectorAll('.colorArea .color').forEach(item => {
    item.addEventListener('click', colorClickEvent);
});

/*
    Step to Step do draw in canvas:
    - When mouse click, start drawing mode;
    - When mouse start moving AND drawing mode activated, draw;
    - When leave click, stop drawing;
*/

screen.addEventListener('mousedown', mouseDownEvent);
screen.addEventListener('mousemove', mouseMoveEvent);
screen.addEventListener('mouseup', mouseUpEvent);
document.querySelector('.clear').addEventListener('click', clearScreen);

//  ----FUNCTIONS----

//  Getting the selected color
function colorClickEvent(e){
    let color = e.target.getAttribute('data-color');
    currentColor = color;

    //  Selecting the active color and removing it, then add active in the current color
    document.querySelector('.color.active').classList.remove('active');
    e.target.classList.add('active');
};

function mouseDownEvent(e){
    canDraw = true;
    //  Current position when clicks
    mouseX = e.pageX - screen.offsetLeft;
    mouseY = e.pageY - screen.offsetTop;
};

function mouseMoveEvent(e){
    if(canDraw){
        /*
        //  Coordinates of the page - coordinates of Canva:
        let pointX = e.pageX - screen.offsetLeft;
        let pointY = e.pageY - screen.offsetTop;
        console.log(pointX, pointY);
        */
        draw(e.pageX, e.pageY);
    }
};

function draw(x, y){
    //  Get the position of the mouse
    let pointX = x - screen.offsetLeft;
    let pointY = y - screen.offsetTop;

    //  Drawing
    ctx.beginPath();
    ctx.lineWidth = 5;
    ctx.lineJoin = 'round';
    ctx.moveTo(mouseX, mouseY);
    ctx.lineTo(pointX, pointY);
    ctx.closePath();
    ctx.strokeStyle = currentColor;
    ctx.stroke();

    //  Saving the position
    mouseX = pointX;
    mouseY = pointY;
}

function mouseUpEvent(){
    canDraw = false;
};

function clearScreen(){
    ctx.setTransform(1, 0, 0, 1, 0, 0);
    ctx.clearRect(0, 0, ctx.canvas.width, ctx.canvas.height);
}