import React from "react";
import quizesContext from "../../../context/quizes/quizesContext";

export default function ProfileQuizes({ userQuizes }) {
  return (
    <div className="profile-quizes">
      <div className="profile-quizes__title">Quizes</div>
      <div className="profile-quizes__body">
        {userQuizes.map((userQuiz, index) => (
          <div className="profile-quizes__body--item">
            <div>{userQuiz.quizTitle}</div>
            <div>{userQuiz.quizCategory}</div>
            <div>{userQuiz.quizQuestions.length}</div>
          </div>
        ))}
      </div>
    </div>
  );
}
