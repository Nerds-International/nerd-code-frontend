import "./App.css";
import Battle from "./components/battle/Battle";
import { observer } from "mobx-react-lite";
import { useState } from "react";
import { LanguageProvider } from "./context/ProgrammingLanguageContext";

const App = observer(() => {
  return (
    <div className="App">
      <MyButton />
      <LanguageProvider>
        <Battle />
      </LanguageProvider>
    </div>
  );
});

export default App;

function MyButton() {
  const [count, setCount] = useState(0);

  function handleClick() {
    setCount(count + 1);
  }
  return (
    <button
      onClick={handleClick}
      className="bg-blue-500 hover:bg-blue-700 rounded py-2 px-4 text-white font-bold"
    >
      I have been clicked {count} times
    </button>
  );
}
