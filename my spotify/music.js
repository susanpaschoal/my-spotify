const musica = document.getElementById ( "nome-som");
const banda = document.getElementById ("nome-da-banda")
const som = document.getElementById("audio")
const capa1 = document.getElementById("capa1")
const play = document.getElementById("play")
const avançar = document.getElementById("avançar")
const voltar = document.getElementById("voltar")
const progresso = document.getElementById("progresso")
const progressoContainer = document.getElementById("progresso-container")
const aleatoriobutton = document.getElementById("aleatorio")

 

const pericles = {

    musica: "Ate que durou",
    file : 'pericles',
    banda: "Periclés",
};

 

const jao = {
    musica: "Acontece",
    file : 'jao',
    banda: "Jão"
};

 

const charlie = {
    musica: "Tudo que ela gosta de escutar",
    file : 'charlie',
    banda: "Charlie Brown Jr"
};

const ferrugem = {
    musica: "Ela",
    capa1 : 'ferrugem',
    banda: "Sorriso Maroto,Ferrugem"

};


let isPlaying = false;
let isShuffled = false;
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

 

function inicioSom(){
    musica.innerText = sortedPlaylist[index].musica;
    banda.innerText = sortedPlaylist[index].banda;
    som.src = `/audio/${sortedPlaylist[index].file}.mp3`;
    capa1.src = `/imagens/${sortedPlaylist[index].capa1}.imagem`;

   

}

 

function voltarMusica(){

    if(index === 0){
     index = sortedPlaylist.length - 1;
 
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
    }

    else{
        index = index + 1;
    }

   inicioSom ();
   playMusic();

}


function atualizarProgresso(){
   const barralargura = (som.currentTime/som.duration)*100;
   progresso.style.setProperty('--progress' ,`${barralargura}%`);

}


function jumpTo(){
   const whidth=  progressoContainer.clientWidth;
   const clickPosition = event.offsetX;;
   const jumpToTime = (clickPosition/whidth)* som.duration;
   som.currentTime = jumpToTime;

}

function shuffleArray(preShuffleArray){
    const size = preShuffleArray.length;
    let currentIndex = size - 1;

    while(currentIndex > 0){

     let randomIndex =Math.floor(Math.random() * size);
     let aux = preShuffleArray [ currentIndex];
     preShuffleArray[currentIndex] = preShuffleArray[randomIndex];
     preShuffleArray[randomIndex] = aux;
     currentIndex -= 1;

    }

}

function modoaleatorio(){

    if(isShuffled === false){
        isShuffled = true;
        shuffleArray(sortedPlaylist);
        shuffleButton.classList.add('button-alatorio')    

    } else {
        isShuffled = false;
        sortedPlaylist = [...originalPlaylist];
        shuffleButton.classList.remove('button-alatorio');
      }

}

inicioSom();

play.addEventListener('click', playPauseDecider);
voltar.addEventListener('click',voltarMusica);
avançar.addEventListener('click',avançarMusica);
som.addEventListener('timeupdate',atualizarProgresso);
progressoContainer.addEventListener('click',jumpTo);
aleatoriobutton.addEventListener('click', modoaleatorio);