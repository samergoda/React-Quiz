function Progress({index, points ,numQuestion,maxPoints,answer}) {
    return (
        <header className="progress">
           <progress max={numQuestion} value={index} />
            <p>Question <strong>{index+1}</strong> / {numQuestion}</p>
            <p><strong>{points}</strong> / {maxPoints}</p>
        </header>
    )
}

export default Progress
