var canvas = document.querySelector('canvas');

canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

var c = canvas.getContext('2d');

//// Multiple Circle ////
var mouse = {
    x: undefined,
    y: undefined
}


var colorArray = [
    '#1E254B',
    '#4B2F65',
    '#82346A',
    '#BD3B70',
    '#EF4275',
]

window.addEventListener('mousemove', function (e) {
    mouse.x = e.x;
    mouse.y = e.y;
})

window.addEventListener('resize', function () {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
    // init();
})

function Circle(x, y, dx, dy, radius, color) {
    this.x = x
    this.y = y
    this.dx = dx
    this.dy = dy
    this.radius = radius
    this.minRadius = radius;
    this.maxRadius = 40;
    this.color = color

    this.draw = function () {
        c.beginPath()
        c.arc(this.x, this.y, this.radius, 0, Math.PI * 2, false)
        // c.strokeStyle = color
        c.fillStyle = color
        // c.stroke()
        c.fill()
    }

    this.update = function () {
        if (this.x + this.radius > innerWidth || this.x - this.radius < 0) {
            this.dx = -this.dx;
        }

        if (this.y + this.radius > innerHeight || this.y - this.radius < 0) {
            this.dy = -this.dy;
        }

        this.x += this.dx;
        this.y += this.dy;

        // interactivity
        if (Math.abs(mouse.x - this.x) < 50 && Math.abs(mouse.y - this.y) < 50) {
            if (this.radius < this.maxRadius) {

                this.radius += 1;
            }
        }
        else if (this.radius > this.minRadius) {
            this.radius -= 1;
        }

        this.draw();
    }
}

// var circle = new Circle(200, 200, 5, 5, 30)
// var circle2 = new Circle(300, 200, 3, 9, 30)

var circleArray = [];
function init() {

    // circleArray = [];
    for (var i = 0; i < 500; i++) {

        var dx = (Math.random() - 0.5) * 5;
        var dy = (Math.random() - 0.5) * 5;
        var radius = Math.random() * 5 + 1;
        var x = Math.random() * innerWidth + radius;
        var y = Math.random() * innerHeight + radius;
        var color = `rgb(${Math.random() * 255},${Math.random() * 255},${Math.random() * 255})`
        circleArray.push(new Circle(x, y, dx, dy, radius, colorArray[Math.floor(Math.random() * colorArray.length)]))
    }
}

function animate() {
    requestAnimationFrame(animate);
    c.clearRect(0, 0, innerWidth, innerHeight);
    circleArray.forEach(circle => circle.update())
}

init();
animate();