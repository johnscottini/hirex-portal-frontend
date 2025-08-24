import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import './App.css';
import UserDetail from './pages/UserDetail/UserDetail';
import UserList from './pages/UserList/UserList';
import Header from './components/Header/Header';

function App() {
  return (
    <Router>
      <div className="App">
        <Header />
        <main className="container">
          <Routes>
            <Route path="/" element={<UserList />} />
            <Route path="/users" element={<UserList />} />
            <Route path="/users/:id" element={<UserDetail />} />
          </Routes>
        </main>
      </div>
    </Router>
  );
}

export default App;
