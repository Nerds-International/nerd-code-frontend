import './App.css';
import { observer } from "mobx-react-lite";
import Header from "./components/header/Header"

const App = observer(() => {
  return (
    <div className="App">
      <Header />
    </div>
  );
})

export default App;