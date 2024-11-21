import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
let base_url = 'http://localhost:5000/api/User/'

let r_date = "";
let u_date = "";
let role = ''

const User = () => {
    const {id} = useParams()
    const [user, setUser] = useState([]);
    const [rates, setRates] = useState([]);


    useEffect(() => {

        fetchUser();
    }, []);


    const fetchUser = async () => {
        let url = base_url + id
        const response = await fetch(url, {method: 'GET'});
        const data = await response.json();
        setUser(data);
        r_date = data.registrationDate.split('T')[0]
        u_date = data.updateDate.split('T')[0]
        if(data.role == 0)
            role = 'admin'
        else
            role = 'user'
        if(data.rates != null)
        setRates(data.rates)
    };
    const content = user === undefined ? <p>wait</p> 
:<div>
<ul>
           <div> {user.login}</div>
           <div> <img src={user.photoUrl} alt="Картинка" style={{ width: '75px', height: 'auto' }} /></div>
           <div> Роль: {role}</div>
           <div> Дата регистрации: {r_date}</div>
           <div> Профиль обновлён: {u_date}</div>
           <div> Оценено: {user.ratesCount}</div>
           <div> Обзоров: {user.reviewsCount}</div>
           <div> Количество оценок: {user.ratesCount}</div>
           <div>Оценки:
                {rates.map(rate => (
                    <li key={rate.id}>
                        <div>{rate.animeName}</div>
                        <div>Дата: {rate.date.split('T')[0]}</div>
                        <div>Оценка: {rate.rateNum}</div>
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

export default User;
