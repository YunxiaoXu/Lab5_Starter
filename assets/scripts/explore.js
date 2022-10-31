// explore.js

window.addEventListener('DOMContentLoaded', init);

function init() {
  const synth = window.speechSynthesis;

  const image = document.querySelector("#explore > img");
  const text = document.querySelector("textarea#text-to-speak");
  const select = document.querySelector("select#voice-select");
  const button = document.querySelector("button");

  synth.onvoiceschanged = _ => addVoicesOptions(synth, select);
  button.onclick = _ => speakText(synth, select.value, text, image)
}

function addVoicesOptions(synth, select) {
  for (const voice of synth.getVoices()) {
    let option = new Option(`${voice.name} (${voice.lang})`);
    option.value = voice.voiceURI;
    select.appendChild(option);
  }
}

function speakText(synth, voice, text, image) {
  let utter = new SpeechSynthesisUtterance(text.value);
  if (voice !== "select") {
    utter.voice = synth.getVoices().find(v => v.voiceURI === voice);
  }
  utter.onstart = _ => setImage(image, 'assets/images/smiling-open.png');
  utter.onend = _ => setImage(image, 'assets/images/smiling.png');

  synth.speak(utter);
}

function setImage(image, src) {
  image.src = src;
}