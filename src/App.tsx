import React from 'react';
import { Routes, Route } from 'react-router-dom';
import GoodsItemForm from './components/GoodsItemForm';
import HomePage from './pages/HomePage';
import { Provider } from 'react-redux';
import { BrowserRouter } from 'react-router-dom';
import { store } from './rdx/store';

function App() {
  return (
    <BrowserRouter>
      <Provider store={store}>
        <Routes>
          <Route path='' element={<HomePage />}>
            <Route path='item' element={<GoodsItemForm />} />
          </Route>
        </Routes>
      </Provider>
    </BrowserRouter>
  );
}

export default App;
