import './App.css';
import { observer } from "mobx-react-lite";
import Header from "./Header"

const App = observer(() => {
  return (
    <div className="App">
      <Header />
    </div>
  );
})

export default App;