// App.jsx
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Header from './components/header/Header';
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
                <Route path="/" element={<h1>Home Page</h1>} /> {/* Главная страница */}
            </Routes>
        </Router>
    );
};

export default App;