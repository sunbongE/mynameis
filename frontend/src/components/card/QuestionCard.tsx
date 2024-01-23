import styled from "styled-components";

interface QuestionCardProps {
    questionText: string
}


const StyleQuestionCard = styled.div`
    display: flex;
    width: 865px;
    height: 144px;
    padding: 30px 20px;
    justify-content: center;
    align-items: center;

    border-radius: 20px;
    background: rgba(255, 255, 255, 0.90);
    box-shadow: 0px 0px 20px 0px rgba(0, 0, 0, 0.25);
    backdrop-filter: blur(5px);

    color: #000;

    text-align: center;
    font-family: Pretendard;
    font-size: 32px;
    font-style: normal;
    font-weight: 700;
    line-height: normal;
`

function QuestionCard (props: QuestionCardProps) {

    return (
        <StyleQuestionCard>
            {props.questionText}
        </StyleQuestionCard>
    )
}

export default QuestionCard