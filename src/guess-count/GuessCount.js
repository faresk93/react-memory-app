import React from 'react'
import './GuessCount.css'
import PropTypes from 'prop-types'

// Guess SFC
const GuessCount = ({guesses}) => (
    <div className="guesses ml-2">N° of Guesses: <strong className="text-white bg-dark p-2">{guesses}</strong></div>
);
// Prop Types
GuessCount.propTypes = {
    guesses: PropTypes.number.isRequired
};

export default GuessCount
