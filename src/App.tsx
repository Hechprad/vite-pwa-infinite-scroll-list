import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';

import Navbar from '@/components/Navbar';
import About from '@/pages/About';
import Products from '@/pages/Products';
import Home from '@/pages/Home';

function App() {
  return (
    <Router>
      <Navbar />

      <main>
        <Routes>
          <Route path='/' element={<Home />} />
          <Route path='/about' element={<About />} />
          <Route path='/products' element={<Products />} />
        </Routes>
      </main>
    </Router>
  );
}

export default App;
