const candidatos = {
    "01": { nome: "Vânia Pereira", foto: "/src/image/vania.jpg" },
    "02": { nome: "Maria José", foto: "/src/image/maria.jpg" },
    // "03": { nome: "Terezinha", foto: "/src/image/84.png" },
    // "04": { nome: "Terezinha", foto: "/src/image/84.png" },
    // "05": { nome: "Terezinha", foto: "/src/image/84.png" },
    // "06": { nome: "Terezinha", foto: "/src/image/84.png" },
    // "07": { nome: "Terezinha", foto: "/src/image/84.png" },
    // "08": { nome: "Terezinha", foto: "/src/image/84.png" },
    // "09": { nome: "Terezinha", foto: "/src/image/84.png" },
    // "10": { nome: "Terezinha", foto: "/src/image/84.png" },
    // "11": { nome: "Terezinha", foto: "/src/image/84.png" },
    // "12": { nome: "Terezinha", foto: "/src/image/84.png" },
    // "13": { nome: "Terezinha", foto: "/src/image/84.png" },
    // "14": { nome: "Terezinha", foto: "/src/image/84.png" },
    // "15": { nome: "Terezinha", foto: "/src/image/84.png" },
    // "16": { nome: "Terezinha", foto: "/src/image/84.png" },
    // "17": { nome: "Terezinha", foto: "/src/image/84.png" },
};

let votos = JSON.parse(localStorage.getItem('votos')) || {};

function tocarSom(id) {
    const som = document.getElementById(id);
    som.currentTime = 0;
    som.play();
}

function digitarNumero(num) {
    const input = document.getElementById('numero');
    if (input.value.length < 2) {
        input.value += num;
        if (input.value.length === 2) mostrarCandidato();
        tocarSom('somTecla');
    }
}

function mostrarCandidato() {
    const numero = document.getElementById('numero').value;
    const info = candidatos[numero];
    const fotoDiv = document.getElementById('fotoCandidato');
    if (info) {
        fotoDiv.innerHTML = `<p>${info.nome}</p><img src="${info.foto}" alt="${info.nome}">`;
    } else {
        fotoDiv.innerHTML = "";
    }
}

function corrigirNumero() {
    document.getElementById('numero').value = '';
    document.getElementById('fotoCandidato').innerHTML = '';
    tocarSom('somTecla');
}

function confirmarVoto() {
    const numero = document.getElementById('numero').value;
    const info = candidatos[numero];

    if (!info) {
        alert('Número inválido.');
        return;
    }

    mostrarCandidato();
    votos[numero] = (votos[numero] || 0) + 1;
    localStorage.setItem('votos', JSON.stringify(votos));
    tocarSom('somConfirma');
    document.getElementById('mensagem').innerText = 'Votação registrada com sucesso!';
    document.getElementById('numero').value = '';
    document.getElementById('fotoCandidato').innerHTML = '';
    setTimeout(() => document.getElementById('mensagem').innerText = '', 3000);
}

function toggleResultados() {
    const resultadosDiv = document.getElementById('resultados');
    const resultadosLista = document.getElementById('resultadosLista');
    resultadosDiv.style.display = (resultadosDiv.style.display === 'block' ? 'none' : 'block');

    if (resultadosDiv.style.display === 'block') {
        resultadosLista.innerHTML = '';
        for (let num in votos) {
            resultadosLista.innerHTML += `<p>Candidato ${candidatos[num]?.nome}: ${votos[num]} votos</p>`;
        }
    }
}

document.addEventListener('keydown', function(event) {
    if (event.key === 'Enter') {
        confirmarVoto();
    } else if (event.key === 'Backspace' || event.key === 'Delete') {
        corrigirNumero();
        event.preventDefault();
    }
});

document.getElementById('numero').addEventListener('input', function () {
    if (this.value.length === 2) {
        mostrarCandidato();
    } else {
        document.getElementById('fotoCandidato').innerHTML = '';
    }
});
