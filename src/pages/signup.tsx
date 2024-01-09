import { FC, useState } from "react"
import Signup from "../components/signup/signup"
import axios from "axios"
import { useNavigate } from "react-router-dom"

const SignupPage:FC =() =>{
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [name, setName] = useState('')
    const [surname, setSurname] = useState('')

    const navigate = useNavigate()

    const submitHandler = async (event: React.FormEvent<HTMLFormElement>) => {
        try {
            event.preventDefault()
            const response = await axios.post(`/api/api-auth/`, {email: email, password: password, name: name, surname: surname})
            const userData = response.data;
            console.log(userData)
            navigate('/weather_station_frontend/login/')

            } catch (error) {
                console.error('Ошибка при регистрации:', error);
            }
      };

    return(
        <>
                <Signup password={password} 
                        email={email} 
                        name={name}
                        surname={surname}
                        setEmail={(email)=>setEmail(email)}
                        setPassword={(password)=>setPassword(password)} 
                        setName={(name)=>setName(name)}
                        setSurname={(surname)=>setSurname(surname)}
                        submitHandler={submitHandler}
                        />
        </>
        
    )
}

export default SignupPage