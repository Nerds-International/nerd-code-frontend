import {BrowserRouter as Router, Route, Routes} from 'react-router-dom';
import Navbar from './components/navbar/Navbar';
import BattleScreen from './components/battle_screen/BattleScreen';
import MainPage from './pages/main_page/MainPage';
import DiscussPage from './pages/dicuss_page/DiscussPage';
import ProblemsPage from './pages/problem_list_page/ProblemsListPage';
import ProblemPage from './pages/problem_page/ProblemPage';
import TopicPage from "./pages/topic_page/TopicPage";

const App = () => {
  return (
    <Router>
      <Navbar />
      <Routes>
        <Route path="/problems" element={<ProblemsPage />} />
        <Route path="/problem" element={<ProblemPage />} />
        <Route path="/discuss" element={<DiscussPage />} />
        <Route path="/discuss/:topicId" element={<TopicPage/>} />
        <Route path="/battle" element={<BattleScreen />} />
        <Route path="/" element={<MainPage />} />
      </Routes>
    </Router>
  );
};

export default App;