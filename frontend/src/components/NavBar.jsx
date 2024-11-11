import { Link } from 'react-router-dom'
import useAuth from "../hooks/useAuth";

function Navbar() {
    const { isAuthenticated } = useAuth()
    return (
        <>
            <nav>

                <Link to="/admin">Admin</Link>
                {isAuthenticated ? <Link to="/logout">Logout</Link> : <Link to="/login">Login</Link>}
            </nav>
        </>
    )
}

export default Navbar
