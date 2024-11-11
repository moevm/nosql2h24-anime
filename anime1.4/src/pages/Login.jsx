import useAuth from '../hooks/useAuth';
import { useLocation, useNavigate } from 'react-router-dom';

const Login = () => {
    const { setAuth } = useAuth()
    const navigate = useNavigate()
    const location = useLocation()
    const from = location.state?.from?.pathname || '/'

    return (
        <>
            <div className="containerLogin">
               <div>Регистрируйтесь, чтобы получить больше возможностей!!!</div>
                <input placeholder="Введите ваш ник" className="reg"/>
               <button className="reg" type={'button'} onClick={() => {
                   setAuth(true)
                 navigate(from, { replace: true });
                  }}>Login</button>
            </div>
        </>
    )
}

export default Login