import React, { useState } from "react";

const AddReview = ({ animeId, animeName, coverurl, onReviewAdded }) => {
  const [userId, setUserId] = useState(sessionStorage.getItem("id"));
  const [rate, setRate] = useState(); // Оценка по умолчанию
  const [text, setText] = useState("");
  const [error, setError] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();

    
    const review = {
      userId: userId,
      animeId: animeId,
      animeName: animeName,
      coverUrl: coverurl, 
      date: new Date().toISOString(),
      rate: rate,
      text: text,
      reccomendation: null,
    };

    try {
      // Отправка запроса на сервер
      const response = await fetch("http://localhost:5000/api/Review", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(review),
      });

      if (!response.ok) {
        throw new Error("Ошибка при добавлении отзыва");
      }

      const result = await response.json();
      console.log("Отзыв добавлен", result);

      // Очистка формы и вызов коллбэка
      setRate();
      setText("");
      setError(null);
      if (onReviewAdded) onReviewAdded(result);
    } catch (err) {
      console.error(err);
      setError(err.message);
    }
  };

  return (
    <div>
      <h2>Добавить отзыв для "{animeName}"</h2>
      <form onSubmit={handleSubmit}>
        <div>
          <label>Ваш ID пользователя:</label>
          <p>{userId}</p>
          
        </div>
        <div>
          {/*<label>Оценка:</label>
          <input
            type="number"
            value={rate}
            onChange={(e) => setRate(Number(e.target.value))}
            min="1"
            max="10"
            required
          />*/}
        </div>
        <div>
          <label>Ваш отзыв:</label>
          <textarea
            value={text}
            onChange={(e) => setText(e.target.value)}
            required
          />
        </div>
        {error && <p style={{ color: "red" }}>{error}</p>}
        <button type="submit">Отправить</button>
      </form>
    </div>
  );
};

export default AddReview;