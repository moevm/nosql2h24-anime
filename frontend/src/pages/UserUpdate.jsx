import React, { useState, useEffect } from "react";
import { useParams } from 'react-router-dom';
import { Form, Button, Spinner, Alert } from "react-bootstrap";

function EditUserForm({ userId, onUpdate }) {
  const [user, setUser] = useState(null); // Данные пользователя
  const [loading, setLoading] = useState(true); // Индикатор загрузки
  const [error, setError] = useState(null); // Ошибки
  const {id} = useParams();
  // Загружаем данные пользователя с сервера
  useEffect(() => {
    const fetchUserData = async () => {
      try {
        console.log(id);
        const response = await fetch(`http://localhost:5000/api/User/${id}`);
        if (!response.ok) {
          throw new Error("Не удалось загрузить данные пользователя");
        }
        const data = await response.json();
        setUser(data);
        setLoading(false);
      } catch (err) {
        setError(err.message);
        setLoading(false);
      }
    };

    fetchUserData();
  }, [userId]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setUser((prevUser) => ({
      ...prevUser,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch(`http://localhost:5000/api/User/${id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(user),
        
      });
      console.log(user);

      if (!response.ok) {
        throw new Error(`Ошибка HTTP: ${response.status}`);
      }


      alert("Данные успешно обновлены!");
    } catch (err) {
      alert("Ошибка: " + err.message);
    }
  };

  if (loading) {
    return (
      <Spinner animation="border" role="status">
        <span className="visually-hidden">Загрузка...</span>
      </Spinner>
    );
  }

  if (error) {
    return <Alert variant="danger">{error}</Alert>;
  }

  return (
    <Form onSubmit={handleSubmit}>
      <Form.Group className="mb-3" controlId="formBasicLogin">
        <Form.Label>Логин</Form.Label>
        <Form.Control
          type="text"
          name="login"
          value={user.login || ""}
          onChange={handleChange}
        />
      </Form.Group>

      <Form.Group className="mb-3" controlId="formBasicEmail">
        <Form.Label>Email</Form.Label>
        <Form.Control
          type="email"
          name="email"
          value={user.email || ""}
          onChange={handleChange}
        />
      </Form.Group>

      <Form.Group className="mb-3" controlId="formBasicPhotoUrl">
        <Form.Label>Ссылка на фото</Form.Label>
        <Form.Control
          type="text"
          name="photoUrl"
          value={user.photoUrl || ""}
          onChange={handleChange}
        />
      </Form.Group>

      <Form.Group className="mb-3" controlId="formBasicRole">
        <Form.Label>Роль</Form.Label>
        <Form.Select
            name="role"
            value={user.role || ""}
            onChange={handleChange}
        >
            <option value="">Выберите роль</option>
            <option value="0">Администратор</option>
            <option value="1">Пользователь</option>
        </Form.Select>
      </Form.Group>

      <Form.Group className="mb-3" controlId="formBasicPassword">
        <Form.Label>Пароль</Form.Label>
        <Form.Control
          type="password"
          name="password"
          value={user.password || ""}
          onChange={handleChange}
        />
      </Form.Group>

      <Button variant="primary" type="submit">
        Сохранить изменения
      </Button>
    </Form>
  );
}

export default EditUserForm;
