import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom'

let base_url = 'http://localhost:5000/api/User?'
let name = ""
let admin = ""
let minRatesValue = 0
let maxRatesValue = 1000
let minValue = 0
let maxValue = 1000
let sort = new Map([
    ["name", ""],
    ["order", ""],
  ]);
  let dates = new Map([
    ["from", ""],
    ["to", ""],
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
    async function DateFromFilter(from) {
        dates.set("from", from)
        fetchUsers()
    }
    async function DateToFilter(to) {
        dates.set("to", to)
        fetchUsers()
    }

    const handleChangeMinValue = (e) => {
        minValue = Number(e.target.value)
        fetchUsers()
      };
      const handleChangeMaxValue = (e) => {
        maxValue =  Number(e.target.value)
        fetchUsers()
      };
      const handleChangeMinRatesValue = (e) => {
        minRatesValue = Number(e.target.value)
        fetchUsers()
      };
      const handleChangeMaxRatesValue = (e) => {
        maxRatesValue = Number(e.target.value)
        fetchUsers()
      };

    const fetchUsers = async () => {
        let url = base_url + name 
        + "&sort=" + sort.get("name") + "&order=" + sort.get("order")
        + "&role=" + admin 
        + "&fromDate=" + dates.get("from") + "&toDate=" + dates.get("to")
        + "&minReviews=" + minValue + "&maxReviews=" + maxValue
        + "&minRates=" + minRatesValue + "&maxRates=" + maxRatesValue
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
        <div> Дата регистрации:
       С <input type="date" onChange={e => DateFromFilter(e.target.value)}/> 
        По <input type="date" onChange={e => DateToFilter(e.target.value)}/> 
        </div>
        <div>
        <label>
          Минимум обзоров: {minValue} <p>
          <input
            type="range"
            min="0"
            max="1000"
            value={minValue}
            onChange={(e) => {handleChangeMinValue(e)}}
          />
          </p>
        </label>
      </div>
      <div>
        <label>
          Максимум обзоров: {maxValue} <p>
          <input
            type="range"
            min="0"
            max="1000"
            value={maxValue}
            onChange={(e) => {handleChangeMaxValue(e)}}
          />
          </p>
        </label>
      </div>
      <div>
        <label>
          Минимум оценок: {minRatesValue} <p>
          <input
            type="range"
            min="0"
            max="1000"
            value={minRatesValue}
            onChange={(e) => {handleChangeMinRatesValue(e)}}
          />
          </p>
        </label>
      </div>
      <div>
        <label>
          Максимум оценок: {maxRatesValue} <p>
          <input
            type="range"
            min="0"
            max="1000"
            value={maxRatesValue}
            onChange={(e) => {handleChangeMaxRatesValue(e)}}
          /></p>
        </label>
      </div>
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
