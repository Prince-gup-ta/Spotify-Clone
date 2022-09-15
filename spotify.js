console.log("Welcome to Spotify");

// Intialize The Variables
let songIndex = 0;
let audioElement =  new Audio ('songs/1.mp3');
let playMaster = document.getElementById('playMaster');
let myProgressBar = document.getElementById('myProgressBar')
let gif = document.getElementById('gif')
let songItems = Array.from(document.getElementsByClassName('songItem'));
let masterSongname = document.getElementById('masterSongname');
 
let songs = [
    { songName: "Kesariya-brahmastra", filePath: "songs/1.mp3", coverPath: "covers/1.jpg" },
    { songName: "Raatan Lambiyaan", filePath: "songs/2.mp3", coverPath: "covers/2.jpg" },
    { songName: "Fitoor", filePath: "songs/1.mp3", coverPath: "covers/3.jpg" },
    { songName: "Ranjha", filePath: "songs/1.mp3", coverPath: "covers/4.jpg" },
    { songName: "Jai Jai Shree Ram Bolega", filePath: "songs/2.mp3", coverPath: "covers/5.jpg" },
]

songItems.forEach((element, i)=>{
    element.getElementsByTagName("img")[0].src = songs[i].coverPath; 
    element.getElementsByClassName("songName")[0].innerText = songs[i].songName;
})

// audioElement.play();

//  Handle play/pause click     
playMaster.addEventListener('click',()=>{
    if(audioElement.paused || audioElement.currentTime<=0){
        audioElement.play();
        playMaster.classList.remove('fa-circle-play');
        playMaster.classList.add('fa-circle-pause');
        gif.style.opacity = 1;
    }
    else{
        audioElement.pause();
        playMaster.classList.remove('fa-circle-pause');
        playMaster.classList.add('fa-circle-play');  
        gif.style.opacity = 0;
    }
})
    

// Listen to Events
audioElement.addEventListener('timeupdate',()=>{
    // update seekbaar
    progress = parseInt((audioElement.currentTime/audioElement.duration)* 100);
    myProgressBar.value = progress;
});

myProgressBar.addEventListener('change', ()=>{
    audioElement.currentTime = myProgressBar.value*audioElement.duration/100;;
})

const makeAllPlays = ()=>{
    Array.from(document.getElementsByClassName('songItemPlay')).forEach((element)=>{
        element.classList.remove('fa-circle-pause');
        element.classList.add('fa-circle-play');
    })
}

Array.from(document.getElementsByClassName('songItemPlay')).forEach((element)=>{
    element.addEventListener('click', (e)=>{
        makeAllPlays();
        songIndex = parseInt(e.target.id);
        e.target.classList.remove('fa-circle-play');
        e.target.classList.add('fa-circle-pause');
        audioElement.src = `songs/${songIndex+1 }.mp3`
        masterSongname.innerText = songs[songIndex].songName;
        audioElement.currentTime = 0;
        audioElement.play();
        gif.style.opacity = 1;
        playMaster.classList.remove('fa-circle-play');
        playMaster.classList.add('fa-circle-pause');
        
    })
})

document.getElementById('next').addEventListener('click',()=>{
    if(songIndex<=0){
        songIndex = 0
    }
    else{
        songIndex +=1;
    }

    audioElement.src = `songs/${songIndex+1 }.mp3`
    masterSongname.innerText = songs[songIndex].songName;
    audioElement.currentTime = 0;
    audioElement.play();
    playMaster.classList.remove('fa-circle-play');
    playMaster.classList.add('fa-circle-pause');

})

document.getElementById('previous').addEventListener('click',()=>{
    if(songIndex>=4){
        songIndex = 0
    }
    else{
        songIndex -=1;
    }

    audioElement.src = `songs/${songIndex+1 }.mp3`
    masterSongname.innerText = songs[songIndex].songName
    audioElement.currentTime = 0;
    audioElement.play();
    playMaster.classList.remove('fa-circle-play');
    playMaster.classList.add('fa-circle-pause');
})

