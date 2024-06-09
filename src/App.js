import { Route, Routes } from 'react-router-dom';
import Header from './components/Header';
import Home from './pages/Home';
import './scss/app.scss';
import NotFound from './pages/NotFound';
import Cart from './pages/Cart';
import { createContext, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';

export const SearchContext = createContext();
function App() {
    const dispatch = useDispatch();
    
  const [searchInput, setSearchInput] = useState('');

  return (
    <div className="wrapper">
      <SearchContext.Provider value={{searchInput, setSearchInput}}>
        <Header />
        <div className="content">
          <div className="container">
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="*" element={<NotFound />} />
              <Route path="/cart" element={<Cart />} />
            </Routes>
          </div>
        </div>
      </SearchContext.Provider>
    </div>
  );
}

export default App;
