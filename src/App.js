import './App.css';
import { observer } from "mobx-react-lite";
import Battle from "./components/battle/Battle"
import BattleScreen from "./components/battle_screen/BattleScreen";
import Header from "./components/header/Header"
import AddTask  from "./components/add_task/AddTask";
import ListTask from "./components/list_task/ListTask";

const App = observer(() => {
  return (
    <div className="App">
      <Header />
      <Battle />
      <BattleScreen />
      <AddTask />
      <ListTask />

    </div>
  );
})

export default App;