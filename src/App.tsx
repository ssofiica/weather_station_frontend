import { useEffect, useState } from 'react';
import { useDispatch} from 'react-redux';
import MainPage from './pages/Phenomens/start.tsx'
import DetailsPage from './pages/detail.tsx'
import LoginPage from './pages/Login/login.tsx';
import RequestsPage from './pages/Requests/requests.tsx'
import SignupPage from './pages/signup.tsx';
import OneRequestPage from './pages/OneRequest/OneRequest.tsx';
import PhenomenTable from './pages/PhenomenTable/PhenomenTable.tsx'
import PhenomenEdit from './pages/PhenomEdit/PhenomEdit.tsx'
import { Routes, Route, BrowserRouter} from 'react-router-dom';
import Navigate from './components/header/header.tsx'
import './app-style.css'
import {loginUser} from './store/slices/auth_slices'

function App() {
  const dispatch = useDispatch();
  const [auth, setAuth] = useState(false);
  const [admin, setAdmin] = useState(false)

  useEffect(() => {
    const au = localStorage.getItem('auth') ==='true';
    setAuth(au);
    const moderator = localStorage.getItem('admin');
    const bool = moderator === 'true';
    setAdmin(bool);
    const email = localStorage.getItem('email');
    if (auth == true) {
      dispatch(loginUser({ is_admin: bool, email: email }));
    }
  }, [dispatch]);

    return (
      <BrowserRouter>
        <Navigate/>
        <Routes>
          <Route path='/weather_station_frontend/phenomens/' element={<MainPage/>}/>
          <Route path='/weather_station_frontend/phenomens/:id/' element={<DetailsPage/>}/>

          {admin && (<>
            <Route path='/weather_station_frontend/phenomens/edit/' element={<PhenomenTable/>}/>
            <Route path='/weather_station_frontend/phenomens/edit/:id/' element={<PhenomenEdit/>}/>
          </>)}
          <Route path='/weather_station_frontend/login/' element={<LoginPage/>}/>
          <Route path='/weather_station_frontend/signup/' element={<SignupPage/>}/> 
          {auth && (
            <>
            <Route path='/weather_station_frontend/requests/' element={<RequestsPage/>}/>
            <Route path='/weather_station_frontend/requests/:id/' element={<OneRequestPage/>}/>
            </>)
          }
        </Routes> 
      </BrowserRouter>
    )
}

export default App