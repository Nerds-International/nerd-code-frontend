import "./App.css";
import {observer} from "mobx-react-lite";
import Navbar from "./components/navbar/Navbar";
import {pageStore} from "./store/PageStore";
import MainPage from "./pages/MainPage";
import ProblemsListPage from "./pages/ProblemsListPage";
import BattlePage from "./pages/BattlePage";
import DiscussPage from "./pages/DiscussPage";

const App = observer(() => {
  return (
    <div className="App">
      <Navbar/>
      <PageLayout/>
    </div>
  );
});

export default App;



const PageLayout = observer(() => {
  const { Pages, getCurrentPage } = pageStore;

  return (<>
    {getCurrentPage() === Pages.MAIN && <MainPage/>}
    {getCurrentPage() === Pages.PROBLEMS_LIST && <ProblemsListPage/>}
    {getCurrentPage() === Pages.BATTLE && <BattlePage/>}
    {getCurrentPage() === Pages.DISCUSS && <DiscussPage/>}
  </>);
})