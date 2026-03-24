console.log("Trabalho 2 - Computação Gráfica");

const tela = document.getElementById("tela");
const cursor = tela.getContext("2d");

let telaAltura = tela.height;
let telaLargura = tela.width;
let executando = true;

cursor.fillStyle = "black";
cursor.fillRect(0, 0, telaLargura, telaAltura);

function desenharPonto(x, y, cor){
    cursor.fillStyle = cor;
    cursor.fillRect(Math.round(x), Math.round(y), 1, 1);
}

function linhaDDA(xi, yi, xf, yf, cor){
    let dx = xf - xi;
    let dy = yf - yi;

    let passos = Math.abs(dx);

    // aqui eh quando eh só um ponto
    if(passos === 0){
        desenharPonto(xi, yi, cor);
        return;
    }
    if(Math.abs(dy) > passos){
        passos = Math.abs(dy);
    }

    let incrementoX = dx / passos;
    let incrementoY = dy / passos;

    let x = xi;
    let y = yi;

    // vai desenhando ponto por ponto
    for(let i = 0; i <= passos; i++){
        desenharPonto(x, y, cor);
        x += incrementoX;
        y += incrementoY;
    }
}

function desenharSimetrico(xc, yc, x, y, cor){
    desenharPonto(xc + x, yc + y, cor);
    desenharPonto(xc - x, yc + y, cor);
    desenharPonto(xc + x, yc - y, cor);
    desenharPonto(xc - x, yc - y, cor);

    desenharPonto(xc + y, yc + x, cor);
    desenharPonto(xc - y, yc + x, cor);
    desenharPonto(xc + y, yc - x, cor);
    desenharPonto(xc - y, yc - x, cor);
}

function circBrasenham(xc, yc, r, cor){
    let x = 0;
    let y = r;
    let d = 3 - 2 * r;

    while(y >= x){
        desenharSimetrico(xc, yc, x, y, cor);

        x++;

        if(d > 0){
            y--;
            d = d + 4 * (x - y) + 10;
        }
        else{
            d = d + 4 * x + 6;
        }
    }
}

// fecha com esc
document.addEventListener("keydown", function(event){
    if(event.key === "Escape"){
        executando = false;
    }
});

let cores = ["white", "red", "green", "blue", "yellow", "cyan", "magenta", "orange"];

let intervalo = setInterval(function(){
    if(!executando){
        clearInterval(intervalo);
        return;
    }

    // sorteio do tipo e da cor
    let tipo = Math.floor(Math.random() * 2);
    let cor = cores[Math.floor(Math.random() * cores.length)];

    if(tipo === 0){

        // sorteio dos pontos da linha
        let xi = Math.floor(Math.random() * telaLargura); //x inicial
        let yi = Math.floor(Math.random() * telaAltura); //y inicial
        let xf = Math.floor(Math.random() * telaLargura); //x final
        let yf = Math.floor(Math.random() * telaAltura); //y final

        linhaDDA(xi, yi, xf, yf, cor);

    }
    else{

        // sorteio do raio
        let r = Math.floor(Math.random() * 50) + 10;

        // sorteio do meio do circulo checando pra estar dentro da tela
        let xc = Math.floor(Math.random() * (telaLargura - 2 * r)) + r;
        let yc = Math.floor(Math.random() * (telaAltura - 2 * r)) + r;

        circBrasenham(xc, yc, r, cor);

    }

}, 250);