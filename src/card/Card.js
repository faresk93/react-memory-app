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
        <div className={`flip-card ${feedback} ${difficultyClass}`} onClick={event => onClick(index, event)}>
            <div className={`flip-card-inner ${feedback !== 'hidden' && 'flipped'}`}>
                <div className="flip-card-front">
                    {/*{feedback === 'hidden' ? HIDDEN_SYMBOL : card}*/}
                    <span className="symbol">{HIDDEN_SYMBOL}</span>
                </div>
                <div className="flip-card-back">
                    <span className="symbol">{card}</span>
                </div>
            </div>
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
