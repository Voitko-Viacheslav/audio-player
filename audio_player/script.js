import playList from './playList.js';
// console.log(playList);

const audio = document.querySelector('.current-trek');
const playBtn = document.querySelector('.play-btn');
const playBtnNext = document.querySelector('.play-next');
const playBtnPrev = document.querySelector('.play-prev');
const bigBG = document.querySelector('.blur');
const smallBG = document.querySelector('.player-bg');
const title = document.querySelector('.trek-title');
const executor = document.querySelector('.trek-executor');

let playNum = 0;
// console.log(playList[playNum].src);

// todo start sound
function playAudio() {
  if (audio.paused) {
    audio.play();
    playBtn.classList.add('pause');
    setInterval(updateProgressValue, 700);
  } else {
    audio.pause();
    playBtn.classList.remove('pause');
  }
}

function changeBG() {
  bigBG.style.backgroundImage = `url(${playList[playNum].img})`;
  smallBG.style.backgroundImage = `url(${playList[playNum].img})`;
  title.innerHTML = `${playList[playNum].title}`;
  executor.innerHTML = `${playList[playNum].name}`;
}

const playNext = () => {
  playNum++;
  if (playNum > playList.length - 1) {
    playNum = 0;
  }
  audio.src = playList[playNum].src;
  playAudio();
  changeBG();
  playBtn.classList.add('pause');
};

const playPrev = () => {
  playNum--;
  if (playNum < 0) {
    playNum = playList.length - 1;
  }
  audio.src = playList[playNum].src;
  playAudio();
  changeBG();
  playBtn.classList.add('pause');
};

// авто проигрывает
audio.addEventListener('ended', playNext);

playBtn.addEventListener('click', playAudio);
playBtnNext.addEventListener('click', playNext);
playBtnPrev.addEventListener('click', playPrev);

const progressBar = document.querySelector('.progress-bar');
const progress = document.querySelector('.progress');
const durationTime = document.querySelector('.duration-time');
const currentTime = document.querySelector('.current-time');
const volumeOnOff = document.querySelector('.sound-on');
const volumeBar = document.querySelector('.volume-bar');
const progressVolume = document.querySelector('.progress-volume');

currentTime.textContent = '0:00';
durationTime.textContent = '0:00';

// Прогрес бар
function updateProgress(data) {
  const { duration, currentTime } = data.srcElement;
  const progressPercent = (currentTime / duration) * 100;
  progress.style.width = `${progressPercent}%`;
}

audio.addEventListener('timeupdate', updateProgress);

// активный прогресс бар
function setProgress(data) {
  const width = this.clientWidth;
  const clickX = data.offsetX;
  audio.currentTime = (clickX / width) * audio.duration;
}
progressBar.addEventListener('click', setProgress);

// считает время
function updateProgressValue() {
  durationTime.textContent = formatTime(audio.duration);
  currentTime.textContent = formatTime(audio.currentTime);
}

// считает время
function formatTime(seconds) {
  let min = Math.floor(seconds / 60);
  let sec = Math.floor(seconds - min * 60);
  if (sec < 10) {
    sec = `0${sec}`;
  }
  return `${min}:${sec}`;
}

// звук
function volumeOff() {
  volumeOnOff.classList.toggle('sound-off');
  progressVolume.classList.toggle('progress-volume');
  if (audio.muted === true) {
    audio.muted = false;
  } else {
    audio.muted = true;
  }
}
volumeOnOff.addEventListener('click', volumeOff);

// активный звук
progressVolume.style.width = '50%';
audio.volume = 0.5;
function audioVolume(e) {
  const width = this.clientWidth;
  const clickX = e.offsetX;
  const volume = clickX / width;
  progressVolume.style.width = `${clickX}px`;
  audio.volume = volume;
}
volumeBar.addEventListener('click', audioVolume);
