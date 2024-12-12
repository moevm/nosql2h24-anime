import { Link } from 'react-router-dom'
import useAuth from "../hooks/useAuth";

function Navbar() {
    const { isAuthenticated } = useAuth()
    return (
        <>
            <nav>
                <Link to={`/Import`}>Импорт и экспорт</Link>
                <p><Link to={`/User/${sessionStorage.getItem('id')}`}>{sessionStorage.getItem('login')}</Link></p>{sessionStorage.getItem('login') ? <Link to="/logout">Logout</Link> : <Link to="/login">Login</Link>}
            </nav>
        </>
    )
}

export default Navbar
