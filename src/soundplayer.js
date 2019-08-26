import tone_0000_JCLive_sf2_file from "./soundfonts/0000_JCLive_sf2_file";
window.tone_0000_JCLive_sf2_file = tone_0000_JCLive_sf2_file;
require("webaudiofont");

const randomUID = () => {
  return Math.floor(Math.random() * 9999999999 + 1);
};

const soundplayer = () => {
  if (!window) return;

  const AudioContextFunc = window.AudioContext || window.webkitAudioContext;
  const audioContext = new AudioContextFunc();
  const player = new window.WebAudioFontPlayer();
  let currentlyPlayingId;

  const selectedPreset = tone_0000_JCLive_sf2_file;

  player.loader.decodeAfterLoading(audioContext, "tone_0000_JCLive_sf2_file");

  const playChord = (notes, uid) => {
    const rollSpeed = notes.length * 20;
    let noteLength = notes.length > 3 ? notes.length * 0.5 : 2;
    if (noteLength > 4) noteLength = 4;
    notes
      .sort((a, b) => a - b)
      .forEach((note, k) => {
        setTimeout(() => {
          if (uid === currentlyPlayingId) {
            player.queueWaveTable(
              audioContext,
              audioContext.destination,
              selectedPreset,
              0,
              note,
              noteLength,
              0.3
            );
          }
        }, rollSpeed * k);
      });
  };

  return {
    play: notes => {
      currentlyPlayingId = randomUID();
      playChord(notes, currentlyPlayingId);
    }
  };
};

export default soundplayer();
