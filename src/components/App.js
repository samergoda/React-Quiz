import { useEffect, useReducer } from "react";
import Header from "./Header.js";
import Main from "./Main.js";
import Loader from "./Loader.js";
import Error from "./Error.js";
import StartScreen from "./StartScreen.js";
import Question from "./Question.js";
import NextQuestion from "./NextQuestion.js";
import Progress from "./Progress.js";
import FinishScreen from "./FinishScreen.js";
import Timer from "./Timer.js";

//state
const initialState = {
  questions: [],
  status: "ready",
  index: 0,
  answer: null,
  points: 0,
  highScore: 0,
  seconds: 10,
};

function reducer(state, action) {
  // console.log(state);
  switch (action.type) {
    case "dataRecived":
      return { ...state, questions: action.payload, status: "ready",seconds:state.questions.length*30 }; //change in state
    case "dataFaild":
      return { ...state, status: "error" }; //change in state
    case "active":
      return { ...state, status: "active" }; //change in state
    case "newAnswer":
      const question = state.questions.at(state.index);
      return {
        ...state,
        answer: action.payload,
        points:
          action.payload === question.correctOption
            ? state.points + question.points
            : state.points,
      }; //change in state
    case "finish":
      return {
        ...state,
        status: "finished",
        highScore:
          state.points > state.highScore ? state.points : state.highScore,
      }; //change in state
    case "restart":
      return {
        ...initialState,
        questions: state.questions,
        status: "ready",
      }; //change in state
    case "nextQuestion":
      return { ...state, index: state.index + 1, answer: null }; //change in state
    case "timer":
      return { ...state, seconds: state.seconds - 1 }; //change in state
    default:
      throw new Error("Error");
  }
}
function App() {
  const [{ questions, status, index, answer, points, highScore ,seconds }, dispatch] =
    useReducer(reducer, initialState);
  const maxPoints = questions.reduce((acc, curr) => acc + curr.points, 0);
  const numQuestion = questions.length;
  useEffect(() => {
    fetch("http://localhost:9000/questions")
      .then((res) => res.json())
      .then((data) => dispatch({ type: "dataRecived", payload: data }))
      .catch((err) => dispatch({ type: "dataFaild" }));
  }, []);
  return (
    <div className="app">
      <Header />
      <Main>
        {status === "loading" && <Loader />}
        {status === "error" && <Error />}
        {status === "ready" && (
          <StartScreen numQuestion={numQuestion} dispatch={dispatch} />
        )}
        {status === "active" && (
          <>
            <Progress
              points={points}
              index={index}
              answer={answer}
              numQuestion={numQuestion}
              maxPoints={maxPoints}
            />
            <Question
              question={questions[index]}
              dispatch={dispatch}
              answer={answer}
            />
            <Timer dispatch={dispatch} seconds={seconds}/>
            <NextQuestion
              dispatch={dispatch}
              index={index}
              numQuestion={numQuestion}
            />
          </>
        )}
        {status === "finished" && (
          <FinishScreen
            points={points}
            maxPoints={maxPoints}
            highScore={highScore}
            dispatch={dispatch}
          />
        )}
      </Main>
    </div>
  );
}

export default App;
