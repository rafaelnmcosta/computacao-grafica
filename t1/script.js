console.log("Trabalho 1 - Computação Gráfica");

const tela = document.getElementById("tela");
const cursor = tela.getContext("2d");

let telaAltura = tela.height;
let telaLargura = tela.width;
let tamanhoCursor = 8;

let x = telaLargura/2;
let y = telaAltura/2;

cursor.fillStyle = "black";
cursor.fillRect(x, y, tamanhoCursor, tamanhoCursor);

document.addEventListener("keydown", function(event){

    if(event.key === "Escape"){
        window.close();
    }

    if(event.key == "x" || event.key == "X" || event.key == "5"){
        cursor.fillStyle = "white";
        cursor.fillRect(0, 0, telaLargura, telaAltura);
    }

    if(event.key == "w" || event.key == "W" || event.key == "8"){
        y -= tamanhoCursor;
    }
    else if(event.key == "s" || event.key == "S" || event.key == "2"){
        y += tamanhoCursor;
    }
    else if(event.key == "a" || event.key == "A" || event.key == "4"){
        x -= tamanhoCursor;
    }
    else if(event.key == "d" || event.key == "D" || event.key == "6"){
        x += tamanhoCursor;
    }

    cursor.fillStyle = "black";
    cursor.fillRect(x, y, tamanhoCursor, tamanhoCursor);

    // controle pro cursor nao sair da tela
    if(x < 0){
        x = 0;
    }
    else if(x > telaLargura - tamanhoCursor){
        x = telaLargura - tamanhoCursor;
    }

    if(y < 0){
        y = 0;
    }
    else if(y > telaAltura - tamanhoCursor){
        y = telaAltura - tamanhoCursor;
    }

});