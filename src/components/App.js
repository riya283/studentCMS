import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from './Home';
import StudentRegistration from './StudentRegistration';
import StudentFilterRecord from './StudentFilterRecord';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path='/' element={<Home />} />
        <Route path="registration" element={<StudentRegistration />} /> 
        <Route path="filterRecord" element={<StudentFilterRecord />} />  
      </Routes>
    </BrowserRouter>
  );
}

export default App;
