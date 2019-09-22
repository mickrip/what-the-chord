import React from "react";
import GlobalStyle from "./styles/GlobalStyle";
import AppStateWrapper from "./components/AppState/AppStateWrapper";
import useKeyboard from "./state/useKeyboard";
import Entry from "./components/Entry/Entry";
import AppWrapper from "./components/AppWrapper/AppWrapper";
import useDebugVariations from "./state/useDebugVariations";

const stateContainers = {
  keyboard: useKeyboard,
  variations: useDebugVariations
};

function App() {
  return (
    <>
      <GlobalStyle />

      <AppStateWrapper containers={stateContainers} wrappers={[<AppWrapper />]}>
        <Entry />
      </AppStateWrapper>
    </>
  );
}

export default App;
