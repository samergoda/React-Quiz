function StartScreen({numQuestion,dispatch}) {
    return (
        <div className="start">
            <h2>Welcome to React Quiz</h2>
            <h3>{numQuestion} questions to test your React mastry</h3>
            <button className="btn btn-ui" onClick={()=>dispatch({type:'active'})}>Let's start</button>
        </div>
    )
}

export default StartScreen
