import React from 'react'
import './Card.css'
import PropTypes from 'prop-types'

const HIDDEN_SYMBOL = '❓';
const getDifficultyClass = (difficulty) => {
    switch (difficulty) {
        case 2:
            return 'easy';
        case 4:
            return 'medium';
        case 6:
            return 'hard';
        default:
            return 'medium'
    }
};
const Card = ({card, index, feedback, difficulty, onClick}) => {
    const difficultyClass = getDifficultyClass(difficulty);
    return (
        <div className={`card ${feedback} ${difficultyClass}`}
             onClick={_ => onClick(index)}>
            <span className="symbol">
                {feedback === 'hidden' ? HIDDEN_SYMBOL : card}
            </span>
        </div>
    )
};

Card.propTypes = {
    card: PropTypes.string.isRequired,
    index: PropTypes.number.isRequired,
    feedback: PropTypes.oneOf([
        'visible', 'hidden', 'justMatched', 'justMismatched'
    ]),
    difficulty: PropTypes.number.isRequired,
    onClick: PropTypes.func.isRequired

};

export default Card
