import "./BattleScreen.css";
import { observer } from "mobx-react-lite";
import { useState } from "react";
import { useProgrammingLanguage } from "../../context/ProgrammingLanguageContext";
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
import { solarizedlight } from 'react-syntax-highlighter/dist/esm/styles/prism';

const BattleScreen = observer() => (() => {
  return (
    <div classname="BattleScreen">
      <BattleWindows />
      <Abilities />
      <Task />
      <>
    </div>
  );
});
