
import './styles/App.css'
import './pages/HomePage'
import { Link } from 'react-router-dom';
import { Routes, Route } from 'react-router-dom';
import HomePage from './pages/HomePage';
import PropertyPage from './pages/PropertyPage';
import { ArrowRight } from 'lucide-react';

function App() {


  return (
    <div>
          <main>
            <Routes>
              <Route path="/" element={<HomePage />} />
              <Route path="/property/:id" element={<PropertyPage />} />
            </Routes>
          </main>
        </div>
  )
}

export default App
