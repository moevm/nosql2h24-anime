import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { Link } from 'react-router-dom'

let base_url = 'http://localhost:5000/api/User/History/'


const UserLogs = () => {
    const {id} = useParams()
    const [logs, setLogs] = useState([]);
    const [login, setLogin] = useState();

    useEffect(() => {
        fetchUser();
        fetchLogs();
    }, []);

    const typecheck = (type) => {
        if (type == 0)
            return 'создание';
        if (type == 1)
            return 'переименование';
        if (type == 2)
            return 'оценка';
        if (type == 3)
            return 'отзыв';
    }

    const fetchUser = async () => {
        let url = 'http://localhost:5000/api/User/' + id
        const response = await fetch(url, {method: 'GET'});
        const data = await response.json();
        setLogin(data.login);
    };

    const fetchLogs = async () => {
        let url = base_url + id
        const response = await fetch(url, {method: 'GET'});
        const data = await response.json();
        setLogs(data);
    };
    const content = logs === undefined ? <p>wait</p> 
:<div>
<ul>
<div>
    {logs.length != 0  ? <div>Логи {login}</div>: <div>Кажется, здесь пусто...</div> }
                {logs.map(log => (
                    <li key={log.id}>
                        <div>Дата: {log.date.split('T')[0]}</div>
                        <div>Тип: {typecheck(log.type)}</div>
                        <div>{log.description}</div>
                        </li>
                ))}
            </div>
    
</ul>
</div>
    return (
        <div>
        {content}
        </div>
    );
};

export default UserLogs;
