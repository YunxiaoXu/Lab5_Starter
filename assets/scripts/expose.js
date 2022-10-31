// expose.js

window.addEventListener('DOMContentLoaded', init);

const IMAGE_DIR = 'assets/images/';
const AUDIO_DIR = 'assets/audio/';
const ICON_DIR = 'assets/icons/';

const jsConfetti = new JSConfetti();

function init() {
  let select = document.querySelector('select#horn-select');
  let image = document.querySelector('#expose > img');
  let audio = document.querySelector('audio.hidden');
  let input = document.querySelector('input#volume');
  let icon = document.querySelector('#volume-controls > img');
  let button = document.querySelector('button');
  // event listeners
  select.onchange = _ => selectHorn(select.value, image, audio);
  input.onchange = _ => changeVolume(input.valueAsNumber, icon, audio);
  button.onclick = _ => playSound(audio, select.value == 'party-horn');
}

function selectHorn(value, image, audio) {
  image.src = IMAGE_DIR + value + '.svg';
  audio.src = AUDIO_DIR + value + '.mp3';
}

function changeVolume(value, icon, audio) {
  let volLevel = (value >= 1) + (value >= 33) + (value >= 67);
  icon.src = ICON_DIR + 'volume-level-' + volLevel + '.svg';
  audio.volume = value / 100;
}

function playSound(audio, isPartyHorn) {
  audio.play();
  if (isPartyHorn) {
    jsConfetti.addConfetti();
  }
}