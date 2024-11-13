import {observer} from "mobx-react-lite";
import Battle from "../../components/battle/Battle";
// import BattleScreen from "../../components/battle/BattleScreen";

const BattlePage = observer (() => {
  // return (<BattleScreen />);
  return (<Battle />);
})

export default BattlePage;