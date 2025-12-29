
import './styles/App.css'
import './pages/HomePage'
import { Routes, Route } from 'react-router-dom';
import HomePage from './pages/HomePage';

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
              <Route path="/property/:id" element={<div>hello world</div>} />
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
