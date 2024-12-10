import { Route, Routes } from 'react-router-dom';
import { PrivateRoute } from '../components/PrivateRoute';
import Main from '../pages/Main';
import Login from '../pages/Login';
import Admin from '../pages/Admin';
import Anime from '../pages/Anime'
import Logout from '../pages/LogOut';
import UsersList from '../pages/UsersList'
import UserReviews from '../pages/UserReviews'
import UserUpdate from '../pages/UserUpdate'
import User from '../pages/User'
export const useRoutes = () => {

    return (
        <Routes>
            <Route index element={<Main />} />
            <Route path="/" element={<Main />} />
            <Route path="/login" element={<Login />} />
            <Route path="/UsersList" element={<UsersList />} />
            <Route path="/Anime/:id" element={<Anime />} />
            <Route path="/UserReviews/:id" element={<UserReviews />} />
            <Route path="/Logout" element={<Logout />} />
            <Route path="/User/:id" element={<User />} />
            <Route path="/UserUpdate/:id" element={<UserUpdate />} />
            <Route element={<PrivateRoute />}>
                <Route path='/admin' element={<Admin />} />
                
            </Route>

        </Routes>
    )
}

export default useRoutes