function FinishScreen({points,maxPoints, highScore,dispatch}) {
    return <>
        <p className="result">
            Your scored <strong>{points}</strong> out of {maxPoints} ({Math.ceil((points/maxPoints)*100)}%)
        </p>
        <p className="highscore">Highscore : {highScore} points</p>
        <div>
            <button className="btn btn-ui" onClick={()=>dispatch({type:'restart'})}>Restart</button>
        </div>
   </>
}

export default FinishScreen
