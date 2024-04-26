const musica = document.getElementById ( "nome-som");       
const banda = document.getElementById ("nome-da-banda")
const som = document.getElementById("audio")
const capa1 = document.getElementById("capa1")
const play = document.getElementById("play")
const avançar = document.getElementById("avançar")
const voltar = document.getElementById("voltar")

const pericles = {
    musica: "Ate que durou",
    file : 'pericles',
    banda: "Periclés"

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
    file : 'ferrugem',
    banda: "Ferrugem"
    
};

let isPlaying = false;
const playlist = [pericles, jao, charlie, ferrugem];
let index = 0;

function pauseMusic() {

    play.querySelector('i.bi').classList.add('bi-play-circle-fill');
    play.querySelector('i.bi').classList.remove('bi-pause-circle-fill');
    som.pause();
   
}

function playMusic() {

    play.querySelector('i.bi').classList.remove('bi-play-circle-fill');
    play.querySelector('i.bi').classList.add('bi-pause-circle-fill');
    som.play();
    

}


function playPauseDecider (){

    if(isPlaying === true){
        pauseMusic();

    }
    else {
        playMusic()
    }
        

    

}

function inicioSom(){
    musica.innerText = playlist[index].musica;
    banda.innerText = playlist[index].banda;
    som.src = `/audio/${playlist[index].file}.mp3`;
    capa1.src = `/imagens/${playlist[index].file}.webp`;
    
}

function voltarMusica(){
    if(index === 0){
     index = playlist.length - 1;

    }
    else{
        index = index - 1;
    }
   inicioSom ();
   playMusic();

}

function avançarMusica(){
    if(index === playlist.length - 1){
     index = 0;

    }
    else{
        index = index + 1;
    }
   inicioSom ();
   playMusic();

}

inicioSom();

play.addEventListener('click', playMusic);
voltar.addEventListener('click',voltarMusica);
avançar.addEventListener('click',avançarMusica)