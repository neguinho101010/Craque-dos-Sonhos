function mostrarTela(id) {
    document.querySelectorAll("div").forEach(div => div.classList.add("oculto"));
    document.getElementById(id).classList.remove("oculto");
}

function iniciarJogo() {
    let nome = document.getElementById("nome-jogador").value;
    if (nome.trim() === "") {
        alert("Digite um nome!");
        return;
    }
    document.getElementById("nome-exibido").innerText = nome;
    mostrarTela("tela-jogo");
    iniciarSimulacao();
}

function iniciarSimulacao() {
    let canvas = document.getElementById("campo");
    let ctx = canvas.getContext("2d");
    canvas.width = 400;
    canvas.height = 300;

    let jogador = { x: 50, y: 150, tamanho: 20 };
    let bola = { x: 200, y: 150, tamanho: 10 };

    function desenhar() {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        ctx.fillStyle = "blue";
        ctx.fillRect(jogador.x, jogador.y, jogador.tamanho, jogador.tamanho);

        ctx.fillStyle = "white";
        ctx.beginPath();
        ctx.arc(bola.x, bola.y, bola.tamanho, 0, Math.PI * 2);
        ctx.fill();
    }

    function mover(event) {
        if (event.key === "ArrowUp" && jogador.y > 0) jogador.y -= 10;
        if (event.key === "ArrowDown" && jogador.y < canvas.height - jogador.tamanho) jogador.y += 10;
        if (event.key === "ArrowLeft" && jogador.x > 0) jogador.x -= 10;
        if (event.key === "ArrowRight" && jogador.x < canvas.width - jogador.tamanho) jogador.x += 10;
        if (event.key === " ") chutarBola();
        desenhar();
    }

    function chutarBola() {
        bola.x += 100;
        if (bola.x > canvas.width) {
            document.getElementById("resultado").innerText = "GOL! Você venceu!";
            mostrarTela("tela-resultado");
        }
        desenhar();
    }

    document.addEventListener("keydown", mover);
    desenhar();
}