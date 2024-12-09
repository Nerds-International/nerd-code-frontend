import {BrowserRouter as Router, Route, Routes} from 'react-router-dom';
import Navbar from './components/navbar/Navbar';
import MainPage from './pages/main_page/MainPage';
import DiscussPage from './pages/dicuss_page/DiscussPage';
import ProblemsListPage from './pages/problem_list_page/ProblemsListPage';
import ProblemPage from './pages/problem_page/ProblemPage';
import BattlePage from './pages/battle_page/BattlePage';
import BattleScreen from './components/battle_screen/BattleScreen';
import TopicPage from "./pages/topic_page/TopicPage";
import Bugsnag from '@bugsnag/js'
import BugsnagPluginReact from '@bugsnag/plugin-react'

Bugsnag.start({
    apiKey: process.env.REACT_APP_BUGSNAG_API_KEY,
    plugins: [new BugsnagPluginReact()]
})

const App = () => {
    return (
        <Router>
            <Navbar />
            <Routes>
                <Route path="/problems" element={<ProblemsListPage />} />
                <Route path="/discuss" element={<DiscussPage />} />
                <Route path="/discuss/:topicId" element={<TopicPage />} />
                <Route path="/problem" element={<ProblemPage />} />
                <Route path="/search_battle" element={<BattlePage />} />
                <Route path="/battle" element={<BattleScreen />} />
                <Route path="/" element={<MainPage />} />
            </Routes>
        </Router>
    );
};

export default App;