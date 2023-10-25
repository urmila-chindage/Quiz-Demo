import { BrowserRouter, Routes, Route } from 'react-router-dom';
import './App.css';
import Authenticate from './components/Authenticate';
import Layout from './components/Layout';
import Login from './components/Login';
import Quiz from './components/Quiz';
import Result from './components/Result';
import Registration from './components/Registration';
import PageNotFound from './components/PageNotFound';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/register" element={<Registration />} />
        <Route path="*" element={<PageNotFound />} />
       <Route element={<Authenticate />}>
        <Route path="/" element={<Layout />}> 
            <Route path="/quiz" element={<Quiz />} />
            <Route path="/result" element={<Result />} />
        </Route>
        </Route>  
       
      </Routes>
    </BrowserRouter >
  );
}

export default App;
