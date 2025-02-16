
import NavBar from './components/NavBar';
import HomePage from './pages/HomePage';
import ProductPage from './pages/ProductPage';
import {Routes, Route } from 'react-router-dom';
import {Toaster} from 'react-hot-toast';

const app =()=>{

  return(
  <div className="min-h-screen bg-base-200 transition-colors  duration-300">
    <NavBar/>
    <Routes>
      <Route path="/" element={<HomePage/>}/>
      <Route path="/product/:id" element={<ProductPage/>}/>
    </Routes>
    <Toaster/>
  </div>
  )
}

export default app ;