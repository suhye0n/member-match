import './App.css';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Header from './layout/Header';
import Footer from './layout/Footer';
import List from './pages/List/List';
import MyList from './pages/List/MyList';
import Login from './pages/Login/Login';
import Main from './pages/Main/Main';
import Mypage from './pages/Mypage/Mypage';
import Project from './pages/Project/Project';
import Reset from './pages/Reset/Reset';
import Signup from './pages/Signup/Signup';
import Write from './pages/Write/Write';
import Admin from './pages/Admin/Admin';

function App() {
  return (
    <>
      <BrowserRouter>
          <Header />
          <Routes>
            <Route path="/" element={<Main />}></Route>
            <Route path="/signup" element={<Signup />}></Route>
            <Route path="/login" element={<Login />}></Route>
            <Route path="/list" element={<List />}></Route>
            <Route path="/list/my" element={<MyList />}></Route>
            <Route path="/mypage" element={<Mypage />}></Route>
            <Route path="/reset" element={<Reset />}></Route>
            <Route path="/project" element={<Project />}></Route>
            <Route path="/write" element={<Write />}></Route>
            <Route path="/admin" element={<Admin />}></Route>
          </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;