import {FC} from 'react'
import MainPage from './pages/start.tsx'
import DetailsPage from './pages/detail.tsx'
import { Routes ,Route, BrowserRouter} from 'react-router-dom';
import Navigate from './components/header/header.tsx'
import './app-style.css'

const StartPage: FC = () => {
    return (
      <BrowserRouter>
        <Navigate/>
        <Routes>
          <Route path='/phenomens/' element={<MainPage/>}/>
          <Route path='/phenomens/:id' element={<DetailsPage/>}/>
        </Routes>
      </BrowserRouter>
    )
}

export default StartPage