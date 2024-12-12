import { Routes, Route } from 'react-router-dom';


// Helpers
import './App.css';
import Home from '../Home/Home';

export default function App() {


  return (
    <main className="App">
      <>
        <Routes>
          <Route path="/*" element={<Home />} />
        </Routes>
      </>
    </main>
  );
}
