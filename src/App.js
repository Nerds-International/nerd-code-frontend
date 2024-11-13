// App.jsx
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Navbar from './components/navbar/Navbar';
import MainPage from './pages/main_page/MainPage';
import DiscussPage from './pages/dicuss_page/DiscussPage';
import ProblemsPage from './pages/problem_list_page/ProblemsListPage';
import BattlePage from './pages/battle_page/BattlePage';
import BattleScreen from './components/battle_screen/BattleScreen';
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
                <Route path="/problems" element={<ProblemsPage />} />
                <Route path="/discuss" element={<DiscussPage />} />
                <Route path="/search_battle" element={<BattlePage />} />
                <Route path="/battle" element={<BattleScreen />} />
                <Route path="/" element={<MainPage />} />
            </Routes>
        </Router>
    );
};

export default App;