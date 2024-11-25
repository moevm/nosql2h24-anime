import { useLocation, useNavigate } from 'react-router-dom';
import { Form, Button } from "react-bootstrap"
import { useState } from 'react';

let base_url = 'http://localhost:5000/api/User/Auth/'

const Login = () => {
    const [formData, setFormData] = useState({login: '', password: ''});
    const navigate = useNavigate()
    const location = useLocation()
    const from = location.state?.from?.pathname || '/'

    function handleLoginChange(e){
        setFormData(prevData => ({...prevData, "login": e.target.value}))
    }
    function handlePasswordChange(e){
        setFormData(prevData => ({...prevData, "password": e.target.value}))
    }

    const auth = async(e) => {
        e.preventDefault()
        let url = base_url
        const response = await fetch(url, {method: 'POST', headers: {'Content-Type': 'application/json'},
        body: JSON.stringify(formData)
    });
        console.log(response.status)
        if(response.status != 404){
            const data = await response.json();
            sessionStorage.setItem("login", data.login)
            sessionStorage.setItem("role", data.role)
            sessionStorage.setItem("id", data.id)
            navigate(from, { replace: true })
        }
        else{
            alert("Пароль или логин неверны")
        }
    };
    return (
        <>
                  <h2>Вход</h2>
                  <p>Для входа введите логин и пароль.</p>
                  <Form onSubmit={auth}>
                      <Form.Group className="mb-3" controlId="formBasicLogin">
                          <Form.Label>Логин</Form.Label>
                          <Form.Control type="text" placeholder="Логин" onChange={(e)=>handleLoginChange(e)}/>
                      </Form.Group>
                      
                      <Form.Group className="mb-3" controlId="formBasicPassword">
                          <Form.Label>Пароль</Form.Label>
                          <Form.Control type="password" placeholder="Пароль" onChange={(e)=>handlePasswordChange(e)}/>
                      </Form.Group>
                      <Button variant="primary" type="submit">
                          Вход
                      </Button>
                  </Form>
        </>
        
    )
}

export default Login