import QuestionCard from "./QuestionCard"

function Questions() {
    return (
        <>
            <QuestionCard
                question='What is 1 + 1?'
                options={["2", "3", "1000", "10"]}
                onAnswer={(answerID: number, answerString: string) => alert(`${answerString} Might be right!`)}
            ></QuestionCard>
        </>
    )
}
export default Questions