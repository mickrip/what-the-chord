import React, { useEffect, useState } from "react";
import { useQueryParams, DelimitedArrayParam } from "use-query-params";
import { useAppState } from "../AppState";

const AppWrapper = ({ children }) => {
  const [isReady, setIsReady] = useState(false);
  const { selectedNotes, setSelectedNotes } = useAppState("keyboard");

  const [query, setQuery] = useQueryParams({
    kn: DelimitedArrayParam
  });
  useEffect(() => {
    if (query.kn && !isReady) {
      setSelectedNotes(query.kn.map(v => parseInt(v)));
    }
    setIsReady(true);
  }, [setSelectedNotes, setIsReady, isReady, query.kn]);

  useEffect(() => {
    setQuery({ kn: selectedNotes });
  }, [selectedNotes, setQuery]);

  return <div>{children}</div>;
};

export default AppWrapper;
