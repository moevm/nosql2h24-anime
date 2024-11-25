import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom'

let base_url = 'http://localhost:5000/api/User?'
let name = ""
let admin = ""
let sort = new Map([
    ["name", ""],
    ["order", ""],
  ]);

const UsersList = () => {
    const [users, setUsers] = useState([]);

    useEffect(() => {

        fetchUsers();
    }, []);

    async function searchByName(newname) {
        name = 'login=' + newname + '&'
        fetchUsers()
    }

    async function Sort(name, order) {
        sort.set("name", name)
        sort.set("order", order)
        fetchUsers()
    }
    async function AdminFilter(check, ad) {
        if (check)
            admin = ad
        else
            admin = ''
        fetchUsers()
    }

    const fetchUsers = async () => {
        let url = base_url + name 
        + "&sort=" + sort.get("name") + "&order=" + sort.get("order")
        + "&role=" + admin
        const response = await fetch(url, {method: 'GET'});
        const data = await response.json();
        setUsers(data);
    };

    return (
        <div>
            <h1>Список пользователей</h1>
            <input
                type="text"
                placeholder="Поиск пользователей..."
                onChange={e => searchByName(e.target.value)}
            />
            <div>
            <label>
            <input type="radio" value="" name="radio" onChange={e => Sort("reviews_count", "-1")}/> Больше всего отзывов
            </label>
            <label>
            <input type="radio" value=""  name="radio"onChange={e => Sort("reviews_count", "1")}/>  Меньше всего отзывов
            </label>
            </div>
        <div>
            <label>
            <input type="radio" value=""  name="radio" onChange={e => Sort("registred_at", "-1")}/>  Самые новые
        </label>
        <label>
            <input type="radio" value="" name="radio" onChange={e => Sort("registred_at", "1")}/>  Самые давние
            </label>
        </div>
        <div>
            <label>
            <input type="radio" value=""  name="radio"onChange={e => Sort("rates_count", "-1")}/>  Больше всего оценок
            </label>
            <label>
            <input type="radio" value=""  name="radio" onChange={e => Sort("rates_count", "1")}/>  Меньше всего оценок
        </label>
        </div>
        <label>
        <input type = "checkbox" onChange={e => AdminFilter(e.target.checked, "admin" )}/> Только администрация
        </label>
            <ul>
                {users.map(user => (
                    <li key={user.id}>
                       <div> <Link to={`/User/${user.id}`}>{user.login}</Link></div>
                       <div> Зарегистрирован {user.registrationDate.split('T')[0]}</div>
                       <div> Оценок {user.ratesCount}</div>
                       <div> Обзоров {user.reviewsCount}</div>
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default UsersList;
