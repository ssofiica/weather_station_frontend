import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import './header.css'
import axios from 'axios';
import Cookies from 'js-cookie';
import { useDispatch } from 'react-redux';
import { NavLink, Link, useNavigate } from 'react-router-dom';
import {logoutUser} from '../../store/slices/auth_slices'
import { useIsAuth, useIsAdmin, useEmail} from '../../store/slices/auth_slices'


function Navigate() {
  const navigate = useNavigate()
  const dispatch = useDispatch()
  const is_auth = useIsAuth()
  const admin = useIsAdmin()
  const email = useEmail()
  const token = Cookies.get('session_id')

  const logout = async () =>{
    try {
      await axios.post('/api/logout/', {
        headers: {'Cookie': `session_id=${token}`}
      });
      dispatch(logoutUser());
      localStorage.clear()
      navigate('/weather_station_frontend/phenomens/') 
      } catch (error) {
      console.error('Ошибка при авторизации:', error);
      }
  }
  return (
    <Navbar expand="lg" className="mynavbar" data-bs-theme="light">
      <Container>
      <Navbar.Brand href="#"> Метеостанция</Navbar.Brand>
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="me-auto">
            <Link className="link" to="/weather_station_frontend/phenomens/">Природные явления</Link>
            { is_auth && (<Link className="link" to="/weather_station_frontend/requests/">Заявки</Link>) }
            { admin && (<Link className="link" to="/weather_station_frontend/phenomens/edit/">Редактировать явления</Link>) }
          </Nav>
        </Navbar.Collapse>
        <Navbar.Collapse className="auth">
          {is_auth 
            ? ( 
            <>
            <h5>{email}</h5>
            <button className="btn-auth" onClick={logout}>Выйти</button> 
            </>
            )
            : (
            <>
            <button className="btn-auth me-2" onClick={() => navigate(`/weather_station_frontend/login/`, {replace: true})}>Войти</button>
            <button className="btn-auth" onClick={() => navigate(`/weather_station_frontend/signup/`, {replace: true})}>Зарегистрироваться</button>
            </>
            )
          }
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}

export default Navigate;