import React, { useEffect, useState } from "react";
import { Helmet } from "react-helmet";
import get from "lodash/get";

const Meta = ({ results }) => {

  const [title, setTitle] = useState("");

  useEffect(() => {

    if (results.matches.length > 0) {
      const t = get(results.matches, "0");
      const root = get(t, "root");
      const modifier = get(t, "modifier");
      setTitle(` - ${root} ${modifier}`);
    } else {
      setTitle("");
    }
  }, [results]);
  return (
    <>
      <Helmet>
        <meta charSet="utf-8"/>
        <title>What the Chord{title}</title>
      </Helmet>
    </>
  );
};

export default Meta;
