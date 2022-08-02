import React from 'react';
import {
  BrowserRouter as Router,
  Routes,
  Route
} from "react-router-dom";
import LandingPage from './components/views/LandingPage/LandingPage';
import LoginPage from './components/views/LoginPage/LoginPage';
import NavBar from './components/views/NavBar/NavBar';
import RegisterPage from './components/views/RegisterPage/RegisterPage';
import JSONUploadPage from './components/views/JSONUploadPage/JSONUploadPage';
import Auth from './hoc/auth'; 
import MainPage from './components/views/MainPage/MainPage';

function App() {
  return (
    <Router>
      <NavBar />
      {/* 스위치는 옛날 방식 */}
      <div>
      <Routes>
        {/* 라우트 연결시에 엘리멘트 사용 */}
        {/* <Route exact path="/" element={Auth(<LandingPage />, null)} />
        <Route path="/login" element={Auth(<LoginPage />, false)} />
        <Route path="/register" element={Auth(<RegisterPage />, false)} />
        {/* <Route path="/movie/:movieId" element={Auth(<MovieDetail />, null)} /> */}
        {/* <Route path="/json/upload" element={Auth(<JSONUploadPage/>, true)} /> */}

        <Route exact path="/" element={Auth(MainPage, null)} />
        <Route path="/land" element={Auth(LandingPage, true)} />
        <Route path="/login" element={Auth(LoginPage, false)} />
        <Route path="/register" element={Auth(RegisterPage , false)} />
        {/* <Route path="/movie/:movieId" element={Auth(<MovieDetail />, null)} /> */}
        <Route path="/json/upload" element={Auth(JSONUploadPage, true)} />
        
        {/* <Route exact path="/" element={<LandingPage />} /> */}
        {/* <Route path="/login" element={<LoginPage />} />
        <Route path="/register" element={<RegisterPage />} />
        <Route path="/movie/:movieId" element={<MovieDetail />} />
        <Route path="/json/upload" element={<JSONUploadPage/>} /> */}
        
      </Routes>
      </div>
    </Router>

  )
}


export default App