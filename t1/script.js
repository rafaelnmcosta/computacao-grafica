console.log("Trabalho 1 - Computação Gráfica");

const tela = document.getElementById("tela");
const cursor = tela.getContext("2d");

let x = 196;
let y = 196;

cursor.fillStyle = "black";
cursor.fillRect(x, y, 8, 8);

