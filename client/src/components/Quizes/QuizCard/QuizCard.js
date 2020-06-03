import React, { useContext } from "react";
import imgQuizTime from "../../../public/img/quiz-time.jpg";
import { Link } from "react-router-dom";
import RegistrationContext from "../../../context/registration/registrationContext";

//REDUX
import { connect } from "react-redux";
//REDUX ACTIONS
import { deleteQuiz } from "../../../redux/actions";

const QuizCard = (props) => {
  return props.info && props.quiz ? (
    <div className={`quiz quiz--${props.info.difficulty}`}>
      <div className="quiz__header">
        <div className="quiz__header--date">{props.info.date}</div>
        <div className="quiz__header--question">
          {props.quiz.length} Question
        </div>
        <div className="quiz__header--img">
          {props.info.imageInformation ? (
            <img
              src={`./img/${props.info.imageInformation.filename}`}
              alt=""
            ></img>
          ) : (
            <img src={imgQuizTime} alt="Quiz Time" />
          )}
          {props.user && props.user._id === props.info.quizAuthor ? (
            <div
              className="quiz__header--delete-button"
              onClick={() => props.dispatch(deleteQuiz(props.info.id))}
            >
              <i className="far fa-trash-alt"></i>
            </div>
          ) : null}
        </div>
      </div>

      {/*QUIZ BODY*/}
      <div className="quiz__body">
        <div className="body__header">
          <div className="body__header--title">{props.info.title}</div>
          <div className="body__header--description">
            {props.info.description}
          </div>
        </div>

        <div className="body__information">
          <div className="body__information--category">
            {props.info.category}
          </div>
          <div className="body__information--type">{props.info.type}</div>
          <div className="body__information--difficulty">
            {props.info.difficulty}
          </div>
        </div>
      </div>

      <Link
        to={`/quizes/${props.index}`}
        className={`quiz__button quiz__button--${props.info.difficulty}`}
      >
        Start
      </Link>
    </div>
  ) : null;
};

const mapStateToProps = (state) => {
  return {
    user: state.user.user,
  };
};

export default connect(mapStateToProps)(QuizCard);
