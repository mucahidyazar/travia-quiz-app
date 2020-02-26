import React, { useReducer } from "react";
import axios from "../../axios-orders";
import quizesContext from "./quizesContext";
import quizesReducer from "./quizesReducer";
import {
  //COMMON
  SET_VALID_QUIZES,
  SEARCH_QUIZES,
  SORT_YOUR_QUIZES_BY_DATE,
  SORT_YOUR_QUIZES_BY_TITLE,
  SORT_YOUR_QUIZES_BY_QUESTION,

  //GET TRAVIAS QUIZES
  GET_TRAVIAS_QUIZES,

  //GET YOUR QUIZES
  GET_YOUR_QUIZES,
  GET_QUIZ_SCOREBOARD,

  //GET_USER_QUIZES
  GET_USER_QUIZES
} from "../actionTypes";

const QuizesState = props => {
  const initialState = {
    //Common
    validQuizes: null,
    countdown: 60,
    disabledTwoOff: false,
    disabledTime: false,

    //All Quizes
    allQuizes: [],
    searchedQuizes: null,
    sortedQuizes: null,

    //TraviasQuizes
    traviasQuizes: null,
    quizesLoading: true,
    getQuizesError: null,

    //YourQuizes
    yourQuizes: [],

    //UserQuizes
    userQuizes: [],

    specialQuizScoreboard: null
  };

  const quizLinks = [
    //General Knowledge
    "https://opentdb.com/api.php?amount=10&category=9",
    //Entertainment: Books
    "https://opentdb.com/api.php?amount=10&category=10",
    //Entertainment: Films
    "https://opentdb.com/api.php?amount=10&category=11",
    //Entertainment: Music
    "https://opentdb.com/api.php?amount=10&category=12",
    //Entertainment: Musicals & Theatres
    "https://opentdb.com/api.php?amount=10&category=13"
  ];

  const [state, dispatch] = useReducer(quizesReducer, initialState);

  // setValidQuizes
  const setValidQuizes = quizes => {
    dispatch({
      type: SET_VALID_QUIZES,
      quizes
    });
  };

  // getTraviasQuizes
  const getTraviasQuizes = async () => {
    try {
      const quizData1 = await axios.get(quizLinks[0], {
        headers: {
          "Content-Type": "application/json"
        }
      });
      const quizData2 = await axios.get(quizLinks[1]);
      const quizData3 = await axios.get(quizLinks[2]);
      const quizData4 = await axios.get(quizLinks[3]);
      const quizData5 = await axios.get(quizLinks[4]);
      let traviasQuizes = [
        quizData1.data.results,
        quizData2.data.results,
        quizData3.data.results,
        quizData4.data.results,
        quizData5.data.results
      ];
      dispatch({
        type: GET_TRAVIAS_QUIZES,
        traviasQuizes
      });
    } catch (err) {}
  };

  /* ########### */

  //getYourQuizes
  const getYourQuizes = async () => {
    try {
      const yourQuizes = await axios.get("/quizes");
      dispatch({
        type: GET_YOUR_QUIZES,
        yourQuizes: yourQuizes.data
      });
    } catch (err) {
      console.error(err);
    }
  };

  //getUserQuizes
  const getUserQuizes = async id => {
    try {
      const userQuizes = await axios.get(`/quizes/${id}`);
      dispatch({
        type: GET_USER_QUIZES,
        userQuizes: userQuizes.data
      });
    } catch (err) {
      console.error(err);
    }
  };

  const searchQuizes = key => {
    dispatch({
      type: SEARCH_QUIZES,
      key
    });
  };

  const sortYourQuizesByDate = () => {
    dispatch({
      type: SORT_YOUR_QUIZES_BY_DATE
    });
  };

  const sortYourQuizesByTitle = () => {
    dispatch({
      type: SORT_YOUR_QUIZES_BY_TITLE
    });
  };

  const sortYourQuizesByQuestion = () => {
    dispatch({
      type: SORT_YOUR_QUIZES_BY_QUESTION
    });
  };

  const getQuizScoreboard = quizScoreboard => {
    dispatch({
      type: GET_QUIZ_SCOREBOARD,
      quizScoreboard
    });
  };

  return (
    <quizesContext.Provider
      value={{
        //COMMON
        validQuizes: state.validQuizes,
        setValidQuizes,

        //AllQuizes
        allQuizes: state.allQuizes,
        searchedQuizes: state.searchedQuizes,
        sortedQuizes: state.sortedQuizes,
        searchQuizes,
        sortYourQuizesByDate,
        sortYourQuizesByTitle,
        sortYourQuizesByQuestion,

        //TraviasQuizes
        traviasQuizes: state.traviasQuizes,
        quizesLoading: state.quizesLoading,
        getTraviasQuizes,

        //YourQuizes
        yourQuizes: state.yourQuizes,
        getYourQuizes,

        specialQuizScoreboard: state.specialQuizScoreboard,
        getQuizScoreboard,

        //UserQuizes
        userQuizes: state.userQuizes,
        getUserQuizes
      }}
    >
      {props.children}
    </quizesContext.Provider>
  );
};

export default QuizesState;
