import React from 'react'
import './Card.css'
import PropTypes from 'prop-types'

const HIDDEN_SYMBOL = '❓';

const Card = ({card, index, feedback, onClick}) => {
    return (
        <div className={`card ${feedback}`}
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
    onClick: PropTypes.func.isRequired

};

export default Card
