import React, { useState, useEffect } from "react";

const EditReview = ({ reviewId, currentRate, currentText, onReviewUpdated }) => {
    const [rate, setRate] = useState(currentRate); // Текущая оценка
    const [text, setText] = useState(currentText); // Текущий текст
    const [error, setError] = useState(null);
  
    useEffect(() => {
      setRate(currentRate);
      setText(currentText);
    }, [currentRate, currentText]);
  
    const handleUpdate = async (e) => {
      e.preventDefault();
  
      const updatedReview = {
        rate: rate,
        text: text,
      };
  
      try {
        const response = await fetch(`http://localhost:5000/api/Review/${reviewId}`, {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(updatedReview),
        });
  
        if (!response.ok) {
          throw new Error("Ошибка при обновлении отзыва");
        }
  
        const result = await response.json();
        console.log("Отзыв обновлен", result);
  
        setError(null);
        if (onReviewUpdated) onReviewUpdated(result);
      } catch (err) {
        console.error(err);
        setError(err.message);
      }
    };
  
    return (
      <div>
        <h2>Изменить отзыв</h2>
        <form onSubmit={handleUpdate}>
          <div>
            <label>Оценка:</label>
            <input
              type="number"
              value={rate}
              onChange={(e) => setRate(Number(e.target.value))}
              min="1"
              max="10"
              required
            />
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
          <button type="submit">Сохранить изменения</button>
        </form>
      </div>
    );
  };
  
  export default EditReview;
  