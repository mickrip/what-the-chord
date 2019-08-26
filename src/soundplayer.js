import tone_0000_JCLive_sf2_file from "./soundfonts/0000_JCLive_sf2_file";
window.tone_0000_JCLive_sf2_file = tone_0000_JCLive_sf2_file;

require("webaudiofont");

const soundplayer = () => {
  var AudioContextFunc = window.AudioContext || window.webkitAudioContext;
  var audioContext = new AudioContextFunc();
  var player = new window.WebAudioFontPlayer();

  var selectedPreset = tone_0000_JCLive_sf2_file;

  player.loader.decodeAfterLoading(audioContext, "tone_0000_JCLive_sf2_file");

  return {
    play: notes => {
      const rollSpeed = notes.length * 10;

      notes
        .sort((a, b) => a - b)
        .forEach((note, k) => {
          setTimeout(() => {
            player.queueWaveTable(
              audioContext,
              audioContext.destination,
              selectedPreset,
              0,
              note,
              2,
              0.3
            );
          }, rollSpeed * k);
        });
    }
  };
};

export default soundplayer();
