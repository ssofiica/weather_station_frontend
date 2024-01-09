import { FC, useState } from 'react';
import axios, { AxiosResponse } from 'axios';
import Cookies from 'js-cookie';
import { Form } from "react-bootstrap"
import { useDispatch} from 'react-redux';
import { useNavigate } from "react-router-dom"
import {loginUser} from '../../store/slices/auth_slices'
import './login.css'

const LoginPage: FC = () =>{
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    //const [message, setMessage] = useState('')
    const dispatch = useDispatch()
    const navigate = useNavigate()

    const submitHandler = async () => {
        try {
          console.log(email)
          const response: AxiosResponse = await axios.post(`/api/login/`, { email, password});
          console.log(response.data);
          const token = Cookies.get('session_id');
          console.log(token)
          if (token) {
            Cookies.set('session_id', token);
            console.log(response.data.is_superuser)
            dispatch(loginUser({ is_admin: response.data.is_superuser, email: response.data.email }));
            var a = 'true';
            localStorage.setItem('auth', a);
            localStorage.setItem('admin', response.data.is_superuser.toString());
            localStorage.setItem('email', response.data.email);
            navigate('/weather_station_frontend/phenomens/') 
          } else {
            console.error('Ошибка входа');
          }
        } catch (error) {
          console.log(error)
        }
    };

    return(
          <>  
              <Form className="login-form">
                  <h1 className="title-login">Авторизация</h1>
                  <input type="email" onChange={((event) => setEmail(event.target.value))} placeholder="Почта" value={email} className="my_items"/>
                  <input type="password mt-2" onChange={((event) => setPassword(event.target.value))} placeholder="Пароль" value={password} className="my_items"/>
                  <button className="btn-login" type="button" onClick={submitHandler}>Войти</button>
                  <div className="navigate" onClick={()=>navigate('/weather_station_frontend/signup/')}>Зарегистрироваться</div>
              </Form>
          </>
        
    )
}

export default LoginPage