/* GET ELEMENTS */
const player=document.querySelector('.player');
const video=document.querySelector('.viewer');
const progress = player.querySelector('.progress');
const progressBar = player.querySelector('.progress__filled');
const toggle = player.querySelector('.toggle');
const skipButtons = player.querySelectorAll('[data-skip]');
const ranges = player.querySelectorAll('.player__slider');

/* functions */
function togglePlay(){
    if(video.paused){
        video.play();
        
    } else{
        video.pause();
    }
}

function updateButton(){
    const icon=this.paused ? '►' : '❚ ❚';
    toggle.textContent=icon;
}

function skip(){
    video.currentTime += parseFloat(this.dataset.skip);
}

function handleRangeUpdate(){
    video[this.name]=this.value;
}

function handleProgress(){
    const percent=(video.currentTime / video.duration) * 100;
    progressBar.style.flexBasis = `${percent}%`
}

function scrub(e){
    const scrubTime=(e.offsetX / progress.offsetWidth) * video.duration;
    video.currentTime=scrubTime;
}


/* event listeners */
//play video
video.addEventListener('click', togglePlay);
toggle.addEventListener('click', togglePlay);
//change play/pause icon
video.addEventListener('play',updateButton);
video.addEventListener('pause',updateButton);
//skipping
skipButtons.forEach(button => button.addEventListener('click', skip));
//sliders
ranges.forEach(range => range.addEventListener('change',handleRangeUpdate));
//update video progress
video.addEventListener('timeupdate', handleProgress);
//click to scrub video
progress.addEventListener('click', scrub);
//drag and click to scrub video
let mouseDown=false;
progress.addEventListener('mousemove', (e)=>mouseDown&&scrub(e));
progress.addEventListener('mousedown', () => mouseDown=true);
progress.addEventListener('mouseup', () => mouseDown=false);
