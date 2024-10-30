// App.jsx
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Header from './components/header/Header';
import MainPage from './pages/MainPage';
import BattlePage from './pages/BattlePage';
import DiscussPage from './pages/DiscussPage';
import ProblemsPage from './pages/ProblemsListPage';

const App = () => {
    return (
        <Router>
            <Header />
            <Routes>
                <Route path="/problems" element={<ProblemsPage />} />
                <Route path="/discuss" element={<DiscussPage />} />
                <Route path="/battle" element={<BattlePage />} />
                <Route path="/" element={<MainPage />} />
            </Routes>
        </Router>
    );
};

export default App;