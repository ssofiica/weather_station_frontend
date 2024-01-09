import { FC } from "react"
import { Form } from "react-bootstrap"
import './login.css'
import { useNavigate } from "react-router-dom"

interface LoginProps{
    password : string
    email : string
    setPassword : (valuePassword : string) => void
    setEmail : (valueEmail : string) => void
    submitHandler:(event: any)=>void

}

const Login:FC <LoginProps> = ({password, email, setPassword, setEmail, submitHandler}) =>{
    const navigate = useNavigate()
    return(
        <>  
            <Form className="login-form" onSubmit={submitHandler}>
                <h1 className="title-login">Авторизация</h1>
                <input type="email"  onChange={((event) => setEmail(event.target.value))} placeholder="Почта" value={email} className="my_items"/>
                <input type="password mt-2" onChange={((event) => setPassword(event.target.value))} placeholder="Пароль" value={password} className="my_items"/>
                <button className="btn-login" type="submit">Войти</button>
                <div className="navigate" onClick={()=>navigate('/weather_station_frontend/signup/')}>Зарегистрироваться</div>
            </Form>
        </>
    )
}

export default Login