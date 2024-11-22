import { Link } from 'react-router-dom'
import useAuth from "../hooks/useAuth";

function Navbar() {
    const { isAuthenticated } = useAuth()
    return (
        <>
            <nav>
                <p>{sessionStorage.getItem('login')}</p>{sessionStorage.getItem('login') ? <Link to="/logout">Logout</Link> : <Link to="/login">Login</Link>}
            </nav>
        </>
    )
}

export default Navbar
