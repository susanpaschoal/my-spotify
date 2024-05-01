const musica = document.getElementById ( "nome-som");
const banda = document.getElementById ("nome-da-banda")
const som = document.getElementById("audio")
let capa1 = document.getElementById("capa1")
const play = document.getElementById("play")
const avançar = document.getElementById("avançar")
const voltar = document.getElementById("voltar")
const progresso = document.getElementById("progresso")
const likebutton = document.getElementById("like")
const progressoContainer = document.getElementById("progresso-container")
const aleatoriobutton = document.getElementById("aleatorio")
const repitirbutton = document.getElementById("repitir")
const tempoMusica = document.getElementById("tempo-musica")
const totalTempo = document.getElementById("total-tempo")


const pericles = {
    musica: "Ate que durou",
    file : 'pericles',
    banda: "Periclés",
    liked: false,
};

const jao = {
    musica: "Acontece",
    file : 'jao',
    banda: "Jão",
    liked: false,
};
 
const charlie = {

    musica: "Tudo que ela gosta de escutar",
    file : 'charlie',
    banda: "Charlie Brown Jr",
    liked: false,
};
const ferrugem = {
    musica: "Ela",
    file : 'ferrugem',
    banda: "Sorriso Maroto,Ferrugem",
    liked: false,
};

let isPlaying = false;
let isShuffled = false;
let repeatOn = false;
const originalPlaylist = [pericles, jao, charlie, ferrugem];
let sortedPlaylist = [...originalPlaylist];
let index = 0;

function pauseMusic() {
    isPlaying = false; 
    play.querySelector('i.bi').classList.add('bi-play-circle-fill');
    play.querySelector('i.bi').classList.remove('bi-pause-circle-fill');
    som.pause();
}

function playMusic() {
    isPlaying = true;
    play.querySelector('i.bi').classList.remove('bi-play-circle-fill');
    play.querySelector('i.bi').classList.add('bi-pause-circle-fill');
    som.play();
}
function playPauseDecider (){
    if(isPlaying === false){
        playMusic();
    }
    else {
        pauseMusic()
    }
 
}

function inicioSom() {
    capa1.src = `/imagens/${sortedPlaylist[index].file}.png`;
    musica.innerText = sortedPlaylist[index].musica;
    banda.innerText = sortedPlaylist[index].banda;
    som.src = `/audio/${sortedPlaylist[index].file}.mp3`;
}
function voltarMusica(){
    if(index === 0){
     index = sortedPlaylist.length - 1
    }
    else{
        index = index - 1;

    }
   inicioSom ();
   playMusic();
}
function avançarMusica(){
    if(index === sortedPlaylist.length - 1){
     index = 0;
}    else{
        index = index + 1;
    }

   inicioSom ();
   playMusic();
}

 

function atualizarProgresso(){
   const barralargura = (som.currentTime/som.duration)*100;
   progresso.style.setProperty('--progress' ,`${barralargura}%`);
   tempoMusica.innerText = toHHMMSS(som.currentTime);
}
function jumpTo(){
   const whidth=  progressoContainer.clientWidth;
   const clickPosition = event.offsetX;;
   const jumpToTime = (clickPosition/whidth)* som.duration;
   som.currentTime = jumpToTime;
}
function shuffleArray(preShuffleArray) {
    const size = preShuffleArray.length;
    let currentIndex = size;
    while (currentIndex !== 0) {
        let randomIndex = Math.floor(Math.random() * currentIndex);
        currentIndex -= 1;

        // Troca os elementos
        let temp = preShuffleArray[currentIndex];
        preShuffleArray[currentIndex] = preShuffleArray[randomIndex];
        preShuffleArray[randomIndex] = temp;
    }

}

function modoaleatorio() {
    if (isShuffled === false) {
        isShuffled = true;
        shuffleArray(sortedPlaylist);
        aleatoriobutton.classList.add('button-aleatorio'); // Corrigido de shuffleButton para aleatoriobutton
    } else {
        isShuffled = false;
        sortedPlaylist = [...originalPlaylist];
        aleatoriobutton.classList.remove('button-aleatorio'); // Corrigido de shuffleButton para aleatoriobutton
    }

}

function repetição(){
    if(repeatOn === false){
        repeatOn= true;
        repitirbutton .classList.add('button-repitir');
    }
    else{  repeatOn= false;
        repitirbutton .classList.remove('button-repitir');
    }

}
 
function proxOuRepitir (){
    if(repeatOn === false){

        avançarMusica();

    }
    else [
        playMusic()
    ]
}

 
function toHHMMSS(numeroOriginal) {
    let horas = Math.floor(numeroOriginal / 3600);
    let minutos = Math.floor((numeroOriginal % 3600) / 60);
    let segundos = Math.floor(numeroOriginal % 60);
    return `${horas.toString().padStart(2, '0')}:${minutos.toString().padStart(2, '0')}:${segundos.toString().padStart(2, '0')}`;
}

function atualizarTotalTempo (){
    totalTempo.innerText = toHHMMSS(som.duration);
}

function curtir() {
    const currentSongLiked = sortedPlaylist[index].liked;
    if (currentSongLiked) {
        likebutton.querySelector('.bi').classList.remove('bi-heart');
        likebutton.querySelector('.bi').classList.add('bi-heart-fill');
        likebutton.classList.add('curtir'); // Adiciona uma classe para estilização adicional
    } else {
        likebutton.querySelector('.bi').classList.add('bi-heart');
        likebutton.querySelector('.bi').classList.remove('bi-heart-fill');
        likebutton.classList.remove('curtir'); // Remove a classe para estilização adicional
    }
}

function curtirclick(event) {
    sortedPlaylist[index].liked = !sortedPlaylist[index].liked; // Inverte o estado de curtir
    curtir();
    localStorage.setItem('playlist', JSON.stringify(sortedPlaylist));
}


inicioSom();

play.addEventListener('click', playPauseDecider);
voltar.addEventListener('click',voltarMusica);
avançar.addEventListener('click',avançarMusica);
som.addEventListener('timeupdate',atualizarProgresso);
som.addEventListener('ended', proxOuRepitir);
som.addEventListener('loadedmetadata', atualizarTotalTempo);
progressoContainer.addEventListener('click',jumpTo);
aleatoriobutton.addEventListener('click', modoaleatorio);
repitirbutton.addEventListener('click', repetição);
likebutton.addEventListener('click', function (){curtirclick(index)});