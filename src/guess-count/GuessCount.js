import React from 'react'
import './GuessCount.css'
import PropTypes from 'prop-types'

// Guess SFC
const GuessCount = ({guesses}) => <div className="guesses">N° of Guesses: <strong>{guesses}</strong></div>
// Prop Types
GuessCount.propTypes = {
    guesses: PropTypes.number.isRequired
};

export default GuessCount
