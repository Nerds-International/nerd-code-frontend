import './App.css';
import { observer } from "mobx-react-lite";
import { useState } from "react";
import React from "react";
import Header from "./Header"

const App = observer(() => {
  return (
    <div className="App">
      <Header />
    </div>
  );
})

export default App;

export function sampleFunction(a, b) {
  return a + b
}