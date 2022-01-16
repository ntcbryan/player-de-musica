let musicas = [
    {titulo: 'Gospel', artista: 'Morada', src: 'musics/JESUS EM TUA PRESENÇA _ MORADA.mp3', 
    img: 'imgs/guitarPic.jpg'},

    {titulo: 'Pra ser sincero', artista: 'Engenheiros do havai', src: 'musics/Engenheiros Do Hawaii - Pra Ser Sincero.mp3', 
    img: 'imgs/sertanejoPhoto.jpg'},

    {titulo: 'Idiota', artista: 'Jão', src: 'musics/Jão - Idiota.mp3', 
    img: 'imgs/fotoJao.jpg'},
]

let musica = document.querySelector('audio');
let indexMusica = 0;
let duracaoMusica = document.querySelector('.fimDaMusica');
let imagem = document.querySelector('img');
let nomeMusica = document.querySelector('.descricao h2');
let nomeArtista = document.querySelector('.descricao i')

renderizarMusica(indexMusica);

//               EVENTOS
document.querySelector('.botao-play').addEventListener('click', tocarMusica);

document.querySelector('.botao-pause').addEventListener('click', pausarMusica);

musica.addEventListener('timeupdate', atualizarBarra);

document.querySelector('.anterior').addEventListener('click', () => {
    indexMusica--;
    if(indexMusica < 0){
        indexMusica =2;
    }
    renderizarMusica(indexMusica);
    
});


document.querySelector('.proxima').addEventListener('click', () => {
    indexMusica++;
    if(indexMusica >2){
        indexMusica =0;
    }
    renderizarMusica(indexMusica);
});


//                FUNÇÔES
function renderizarMusica(index){
    musica.setAttribute('src', musicas[index].src);
    musica.addEventListener('loadeddata', () => {
        nomeMusica.textContent = musicas[index].titulo;
        nomeArtista.textContent = musicas[index].artista;
        imagem.src = musicas[index].img;
        duracaoMusica.textContent = segundosParaMinutos(Math.floor(musica.currentTime));
    });
}

function tocarMusica(){
    musica.play();
    //precisamos substituir o botao de play pelo de pause
    document.querySelector('.botao-pause').style.display = 'block'
    document.querySelector('.botao-play').style.display = 'none'
}
function pausarMusica(){
    musica.pause();
    document.querySelector('.botao-pause').style.display = 'none'
    document.querySelector('.botao-play').style.display = 'block'
}
function atualizarBarra(){
    let barra = document.querySelector('progress');
    //a barra de progresso acompanha o tamanho dela "width", a divisao devolve um numero quebrado
    //o math floor arredonda p baixo e concatenamos com sinal de porcentagem
    barra.style.width = Math.floor((musica.currentTime / musica.duration) * 100) + '%';

    //Tambem atualizamos o texto de tempo que ja passou
    let tempoCorrido = document.querySelector('.inicioDaMusica')
    tempoCorrido.textContent = segundosParaMinutos(Math.floor(musica.currentTime));
}

function segundosParaMinutos(segundos){
    //Para deixar o campo de tempo da musica no formato "N:NN" pegamos o tempo e segundos e divimos por 
    //60(um minuto), então 60s = 1m, 120s = 2m e etc...
    let campoMinutos = Math.floor(segundos/60);
    let campoSegundos = segundos % 60;
    if (campoSegundos<10){
        campoSegundos = '0' + campoSegundos;
    }

    return campoMinutos+ ':' +campoSegundos;
}


