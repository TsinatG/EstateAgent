
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
      <header>
        <div>
         
          <h1>Estate Agent App</h1>
        </div>
      </header>
          <main>
            <Routes>
              <Route path="/" element={<HomePage />} />
              <Route path="/property/:id" element={<PropertyPage />} />
            </Routes>
          </main>
          <footer>
             <div>
               <p>© 2026 Client Side Estate Agent App</p>
             </div>
          </footer>
        </div>
  )
}

export default App
