console.log("Trabalho 2 - Computação Gráfica");

const tela = document.getElementById("tela");
const cursor = tela.getContext("2d");

let cores = ["white", "red", "green", "blue", "yellow", "cyan", "magenta", "orange"];
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

function desenharPoligono(pontos, corLinha, corPreenchimento){

    // contorno usando a função de linha
    for(let i = 0; i < pontos.length; i++){
        let atual = pontos[i];
        let proximo = pontos[(i + 1) % pontos.length];

        linhaDDA(atual.x, atual.y, proximo.x, proximo.y, corLinha);
    }

    // acha yMin e yMax
    let yMin = Infinity;
    let yMax = -Infinity;

    for(let p of pontos){
        if(p.y < yMin) yMin = p.y;
        if(p.y > yMax) yMax = p.y;
    }

    // loop pra cada linha de varredura
    for(let y = Math.floor(yMin); y <= Math.floor(yMax); y++){

        // linterseções da linha com os lados do polígono
        let intersecoes = [];

        // percorre os lados do polígono (eh a tabela de lados mas não precisa guardar em memoria)
        for(let i = 0; i < pontos.length; i++){
            let p1 = pontos[i];
            let p2 = pontos[(i + 1) % pontos.length];

            // desconsidera os lados horizontais
            if(p1.y === p2.y) continue;

            // Ymin e Ymax do lado
            let ymin = Math.min(p1.y, p2.y);
            let ymax = Math.max(p1.y, p2.y);

            if(y < ymin || y >= ymax) continue;

            // equação da reta
            // X = (1/m)(Yvarredura - Ymin) + X(ymin)
            // 1/m = dx/dy = (p2.x - p1.x) / (p2.y - p1.y)
            let x = (p2.x - p1.x) / (p2.y - p1.y) * (y - p1.y) + p1.x;

            // adiciona o ponto de interseção na lista
            intersecoes.push(x);
        }

        // interseções da esquerda para direita
        intersecoes.sort(function(a, b){
            return a - b;
        });

        // preenche entre pares de interseções
        for(let i = 0; i < intersecoes.length; i += 2){

            let x1 = Math.floor(intersecoes[i]);
            let x2 = Math.floor(intersecoes[i + 1]);

            // desenha todos os pontos entre os dois limites
            for(let x = x1; x <= x2; x++){
                desenharPonto(x, y, corPreenchimento);
            }
        }
    }
}

function gerarPoligonoAleatorio(){

    // quantidade de pontos entre 3 e 10
    let n = Math.floor(Math.random() * 8) + 3;

    let pontos = [];

    for(let i = 0; i < n; i++){
        let x = Math.floor(Math.random() * telaLargura);
        let y = Math.floor(Math.random() * telaAltura);

        pontos.push({x: x, y: y});
    }

    return pontos;
}


// comandos
document.addEventListener("keydown", function(event){

    // o esc não tá mais funcionando :(
    if(event.key === "Escape"){
        executando = false;
    }

    if(event.key === " " && executando){

        // polígono
        let pontos = gerarPoligonoAleatorio();

        // cor da linha
        let corLinha = cores[Math.floor(Math.random() * cores.length)];

        // cor de preenchimento
        let corPreenchimento = cores[Math.floor(Math.random() * cores.length)];

        // evita ficar igual
        while(corPreenchimento === corLinha){
            corPreenchimento = cores[Math.floor(Math.random() * cores.length)];
        }

        // desenha
        desenharPoligono(pontos, corLinha, corPreenchimento);
    }

});