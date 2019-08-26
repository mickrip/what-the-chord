import React from "react";
import { useState, useEffect } from "react";
import FullScreenSpinner from "../FullScreenSpinner/FullScreenSpinner";

let scriptCount = 0;
let scriptCountReady = 0;

function useScript(srcArray = []) {
  const [isError, setIsError] = useState(false);
  const [isReady, setIsReady] = useState(false);
  const [percentDone, setPercentDone] = useState(0);

  const onScriptLoad = _ => {
    scriptCountReady++;

    const perc = Math.floor((scriptCountReady / scriptCount) * 100);

    setPercentDone(perc);
    if (perc === 100) setIsReady(true);
  };

  const onScriptError = _ => {
    setIsError(true);
  };

  useEffect(() => {
    scriptCount = srcArray.length;

    srcArray.forEach(src => {
      let script = document.createElement("script");
      script.src = src;
      script.async = true;

      script.addEventListener("load", onScriptLoad);
      script.addEventListener("error", onScriptError);

      document.body.appendChild(script);

      return script;
    });
  }, []);

  return {
    isReady,
    isError,
    percentDone
  };
}

const ScriptLoader = ({ scripts = [], children }) => {
  if (!Array.isArray(scripts)) scripts = new Array(scripts);

  const { isReady, isError } = useScript(scripts);

  if (isError === true)
    return (
      <>
        <strong>The Application Failed to initialise</strong>
        <br />
        <small>Scripts didn't load.</small>
      </>
    );
  if (isReady === false) return <FullScreenSpinner />;

  return children;
};

export default ScriptLoader;
