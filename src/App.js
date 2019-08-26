import React from "react";
import Keyboard from "./components/Keyboard/Keyboard";
import soundplayer from "./soundplayer";
import { ScreenClassProvider } from "react-grid-system";
import useWindowSize from "./hooks/useWindowSize";
import GlobalStyle from "./styles/GlobalStyle";

function App() {
  const windowSize = useWindowSize();

  return (
    <>
      <GlobalStyle />
      <Keyboard
        width={windowSize.width}
        onChange={notes => soundplayer.play(notes)}
      />
    </>
  );
}

export default App;
