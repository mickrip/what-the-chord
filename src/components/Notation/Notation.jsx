import React, { useEffect, useState, useRef } from "react";
import NotationStyles from "./NotationStyles.jsx";
import VexFlow from "vexflow";
import { selectedNotesToVex } from "../../helpers/noteutils";

const VF = VexFlow.Flow;
const { Formatter, Renderer, Stave, StaveNote } = VF;


const Notation = ({ selectedNotes }) => {


  const [vexNotes, setNexVotes] = useState({ "bass": [], "treble": [] });

  const container = useRef();
  const rendererRef = useRef();


  const addToStave = (context, staffRef, notes, clef) => {
    if (notes.length === 0) return null;

    let note = new VF.StaveNote({ keys: notes, duration: "q", auto_stem: true, clef });

    notes.forEach((n, k) => {
      if (n.substr(1, 1) === "#") {
        note = note.addAccidental(k, new VF.Accidental("#"));
      }

    });
    let voice = new VF.Voice({ num_beats: 1, resolution: VF.RESOLUTION });
    var notes = [note];
    voice.addTickables(notes);
    return voice;

  };


  useEffect(() => {
    console.log("--", selectedNotesToVex(selectedNotes));
    setNexVotes(selectedNotesToVex(selectedNotes));
  }, [selectedNotes]);


  useEffect(() => {

    container.current.innerHTML = "";
    rendererRef.current = new Renderer(
      container.current,
      Renderer.Backends.SVG
    );


    const renderer = rendererRef.current;
    renderer.resize(200, 300);
    const context = renderer.getContext();

    var topStaff = new VF.Stave(30, 50, 140);
    var bottomStaff = new VF.Stave(30, 140, 140);

    var brace = new VF.StaveConnector(topStaff, bottomStaff).setType(3);
    var lineLeft = new VF.StaveConnector(topStaff, bottomStaff).setType(1);
    var lineRight = new VF.StaveConnector(topStaff, bottomStaff).setType(6);

    topStaff.addClef("treble");
    bottomStaff.addClef("bass");
    topStaff.setContext(context).draw();
    bottomStaff.setContext(context).draw();
    brace.setContext(context).draw();
    lineLeft.setContext(context).draw();
    lineRight.setContext(context).draw();


    var formatter = new VF.Formatter();


// Make sure the staves have the same starting point for notes
    var startX = Math.max(topStaff.getNoteStartX(), bottomStaff.getNoteStartX());
    topStaff.setNoteStartX(startX);
    bottomStaff.setNoteStartX(startX);

    const tv = addToStave(context, topStaff, vexNotes.treble, "treble");
    const bv = addToStave(context, bottomStaff, vexNotes.bass, "bass");

    if(tv)formatter.joinVoices([tv]);
    if(bv)formatter.joinVoices([bv]);

    const joined = [tv,bv].filter( v => !!v);

    if(joined.length > 0){
      console.log("K", joined);
      formatter.format(joined, 1);
      formatter.formatToStave(joined, topStaff, { align_rests: true });
      if(tv)var beamsTreble = VF.Beam.applyAndGetBeams(tv);
      if(bv)var beamsBass = VF.Beam.applyAndGetBeams(bv);

      if(tv)tv.draw(context, topStaff);
      if(bv)bv.draw(context, bottomStaff);
    }









  }, [vexNotes]);

  return (
    <>
      <NotationStyles>
        <div ref={container}/>
      </NotationStyles>
    </>
  );
};

export default Notation;
