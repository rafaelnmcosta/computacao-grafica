console.log("Trabalho 1 - Computação Gráfica");

const tela = document.getElementById("tela");
const cursor = tela.getContext("2d");

let telaAltura = tela.height;
let telaLargura = tela.width;

let x = telaLargura/2;
let y = telaAltura/2;

cursor.fillStyle = "black";
cursor.fillRect(x, y, 8, 8);

document.addEventListener("keydown", function(event){

    if(event.key == "x" || event.key == "X" || event.key == "5"){
        console.log("limpa");
        cursor.fillStyle = "white";
        cursor.fillRect(0, 0, telaLargura, telaAltura);
    }

    if(event.key == "w" || event.key == "W" || event.key == "8"){
        y -= 8;
        console.log("cima");
    }
    else if(event.key == "s" || event.key == "S" || event.key == "2"){
        y += 8;
        console.log("baixo");
    }
    else if(event.key == "a" || event.key == "A" || event.key == "4"){
        x -= 8;
        console.log("esquerda");
    }
    else if(event.key == "d" || event.key == "D" || event.key == "6"){
        x += 8;
        console.log("direita");
    }

    cursor.fillStyle = "black";
    cursor.fillRect(x, y, 8, 8);

});