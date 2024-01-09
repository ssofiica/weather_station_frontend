import { FC } from "react"
import { Form } from "react-bootstrap"
import { useNavigate } from "react-router-dom"
import "./signup.css"

interface SignUpProps{
    email : string
    password : string
    name: string
    surname: string
    setPassword : (password : string) => void
    setEmail : (email : string) => void
    setName: (name : string) => void
    setSurname: (surname : string) => void
    submitHandler:(event: any)=>void

}

const Signup:FC<SignUpProps> = ({email, password, name, surname, setPassword, setEmail,  setName, setSurname, submitHandler}) =>{
    const navigate = useNavigate()
    return(
        <>  
            <Form className="signup" onSubmit={submitHandler}>
                <h1 className="title-login">Регистрация</h1>
                <input type="text" onChange={((event) => setName(event.target.value))} placeholder="Имя" value={name} className="my_items"/>
                <input type="text" onChange={((event) => setSurname(event.target.value))} placeholder="Фамилия" value={surname} className="my_items"/>
                <input type="text"  onChange={((event) => setEmail(event.target.value))} placeholder="Почта" value={email} className="my_items"/>
                <input type="password" onChange={((event) => setPassword(event.target.value))} placeholder="Пароль" value={password} className="my_items"/>
                <button className="btn-login" type="submit">Зарегистрироваться</button>
                <div onClick={()=>navigate('/weather_station_frontend/login')} className="navigate">Войти</div>
            </Form>
        </>
    )
}

export default Signup