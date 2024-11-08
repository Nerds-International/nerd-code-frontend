// App.jsx
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
// import Header from './components/header/Header';
import Navbar from './components/navbar/Navbar';
import BattleScreen from './components/battle_screen/BattleScreen';
import MainPage from './pages/MainPage';
// import BattlePage from './pages/BattlePage';
import DiscussPage from './pages/dicuss_page/DiscussPage';
import ProblemsPage from './pages/ProblemsListPage';

const App = () => {
    return (
        <Router>
            <Navbar />
            <Routes>
                <Route path="/problems" element={<ProblemsPage />} />
                <Route path="/discuss" element={<DiscussPage />} />
                <Route path="/battle" element={<BattleScreen />} />
                <Route path="/" element={<MainPage />} />
            </Routes>
        </Router>
    );
};

export default App;