import logo from './logo.svg';
import './App.css';
import {observer} from "mobx-react-lite";

const App = observer(() => {

  function aboba() {
    alert(1 + 1)
  }

  return (
    <div>
      go
      <button onClick={aboba}>ida</button>
    </div>
  );
})

export default App;
