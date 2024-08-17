// Seleção de elementos do DOM
const html = document.querySelector("html");
const focoBotao = document.querySelector(".app__card-button--foco");
const curtoBotao = document.querySelector(".app__card-button--curto");
const longoBotao = document.querySelector(".app__card-button--longo");
const banner = document.querySelector(".app__image");
const titulo = document.querySelector(".app__title");
const botoes = document.querySelectorAll(".app__card-button");
const musicaFocoInput = document.querySelector("#alternar-musica");
const startPauseBotao = document.querySelector("#start-pause");

// Criação de objetos de áudio
const musica = new Audio("./sons/luna-rise-part-one.mp3");
const audioPlay = new Audio("./sons/play.wav");
const audioPause = new Audio("./sons/pause.mp3");
const audioBeep = new Audio("./sons/beep.mp3");

// Variáveis de controle
let tempoDecorridoEmSegundos = 1500; // 25 minutos em segundos
let intervalo;

// Configuração da música de fundo
musica.loop = true;

// Event listener para alternar música
musicaFocoInput.addEventListener("change", () => {
    if (musica.paused) {
        musica.play();
    } else {
        musica.pause();
    }
});

// Event listeners para botões de contexto (foco, descanso curto, descanso longo)
focoBotao.addEventListener("click", () => {
    tempoDecorridoEmSegundos = 1500;
    mudarContexto("foco");
    focoBotao.classList.add("active");
});

curtoBotao.addEventListener("click", () => {
    tempoDecorridoEmSegundos = 300;
    mudarContexto("descanso-curto");
    curtoBotao.classList.add("active");
});

longoBotao.addEventListener("click", () => {
    tempoDecorridoEmSegundos = 900;
    mudarContexto("descanso-longo");
    longoBotao.classList.add("active");
});

// Função para mudar o contexto (foco, descanso curto, descanso longo)
function mudarContexto(contexto) {
    // Verifica se elementos necessários existem
    if (!html || !banner || !titulo || !botoes) {
        console.error("One or more required elements are missing");
        return;
    }

    // Atualiza atributos e classes
    html.setAttribute("data-contexto", contexto);
    banner.setAttribute("src", `./imagens/${contexto}.png`);
    botoes.forEach(botao => botao.classList.remove("active"));

    // Atualiza o título baseado no contexto
    switch (contexto) {
        case "foco":
            titulo.innerHTML = `Otimize sua produtividade,<br>
            <strong class="app__title-strong">mergulhe no que importa.</strong>`;
            break;
        case "descanso-curto":
            titulo.innerHTML = `Que tal dar uma respirada?<br>
            <strong class="app__title-strong">Faça uma pausa curta.</strong>`;
            break;
        case "descanso-longo":
            titulo.innerHTML = `Hora de voltar à superfície.<br>
            <strong class="app__title-strong">Faça uma pausa longa.</strong>`;
            break;
    }
    mostrarTempo();
}

// Função de contagem regressiva
const contagemRegressiva = () => {
    if (tempoDecorridoEmSegundos <= 0) {
        audioBeep.play();
        clearInterval(intervalo);
        intervalo = null;
        startPauseBotao.innerHTML = `<img class="app__card-primary-butto-icon" src="./imagens/play_arrow.png" alt="">
        <span>Começar</span>`;
        return;
    }
    tempoDecorridoEmSegundos--;
    mostrarTempo();
};

// Função para exibir o tempo formatado
const mostrarTempo = () => {
    const tempo = new Date(tempoDecorridoEmSegundos * 1000);
    const tempoFormatado = tempo.toLocaleTimeString('pt-Br', {minute: '2-digit', second: '2-digit'});
    document.getElementById("timer").innerHTML = tempoFormatado;
}

// Event listener para o botão de iniciar/pausar
startPauseBotao.addEventListener("click", () => {
    if (intervalo) {
        audioPause.play();
        clearInterval(intervalo);
        intervalo = null;
        startPauseBotao.innerHTML = `<img class="app__card-primary-butto-icon" src="./imagens/play_arrow.png" alt="">
        <span>Começar</span>`;
    } else {
        audioPlay.play();
        intervalo = setInterval(contagemRegressiva, 1000);
        startPauseBotao.innerHTML = `<img class="app__card-primary-butto-icon" src="./imagens/pause.png" alt="">
        <span>Pausar</span>`;
    }
});

// Exibe o tempo inicial
mostrarTempo();
