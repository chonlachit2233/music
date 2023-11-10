const image = document.getElementById('cover'),
title = document.getElementById('music-title'),
artist = document.getElementById('music-artlist'),
currentTimeEL = document.getElementById('curent-time'),
durationEL = document.getElementById('duration'),
progress = document.getElementById('progress'),
playerProgress =document.getElementById('player-progess'),
prevBtn = document.getElementById('prev'),
nextBtn = document.getElementById('next'),
playBtn = document.getElementById('play'),
background = document.getElementById('bg-img');


const music = new Audio();

const songs = [
    {
        path: 'assts/music1.mp3',
        displayName: 'นิโครติน',
        cover: 'assts/pic.jpg',
        artist: 'Hanu Dixit',
    },
    
    {
        path: 'assts/music2.mp3',
        displayName: 'รักเเฟน',
        cover: 'assts/pic2.jpg',
        artist: 'Neffic',
    },
     {
        path: 'assts/music3.mp3',
        displayName: 'วาเลนติน่า',
        cover: 'assts/pic3.jpg',
        artist: 'Young logos',
    }
];

let musicIndex = 0;
let isPlaying = false;

function togglePlay(){
    if(isPlaying){
        pauseMusic();  
    }else{
        playMusic();
    }
}

function playMusic(){
    isPlaying =  true;
   //change play button icon

    playBtn.classList.replace('fa-play', 'fa-pause');
    //set button hover title
    playBtn.setAttribute('title', 'Pause');
    music.play();
}

function pauseMusic(){
    isPlaying =  false;
   //change puse button icon

    playBtn.classList.replace('fa-pause', 'fa-play');
    //set button hover title
    playBtn.setAttribute('title', 'Play');
    music.pause();
}

function londMusic(song){
    music.src = song.path;
    title.textContent = song.displayName;
    artist,textContent = song.artist;
    image.src = song.cover;
    background.src = song.cover;
}

function changeMusic(direction){
    musicIndex = (musicIndex + direction + songs.length) % songs.length;
    londMusic(songs[musicIndex]);
    playMusic();
}

function updatProgressBar(){
    const {duration, currentTime} = music;
    const progessPercent = (currentTime / duration) * 100;
    progress.style.width = `${progessPercent}%`;

    const formatTime = (time) => String(Math.floor(time)).padStart(2, '0');
    durationEL.textContent = `${formatTime ( duration / 60)}:${formatTime(duration % 60)}`;
    currentTimeEL.textContent = `${formatTime (currentTime / 60)}:${formatTime(currentTime % 60)}`;
    
}

function setProgrogressBar (e) {
    const width = playerProgress.clientWidth;
    const clickX = e.offsetX;
    music.currentTime = (clickX / width) * music.duration;
}

playBtn.addEventListener('click', togglePlay);
prevBtn.addEventListener('click', () => changeMusic(-1));
nextBtn.addEventListener('click', () => changeMusic(1));
music.addEventListener('ended', () => changeMusic(1));
music.addEventListener('timeupdate', updatProgressBar);
playerProgress.addEventListener('click', setProgrogressBar);


londMusic(songs[musicIndex]);
