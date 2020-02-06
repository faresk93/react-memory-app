import PropTypes from 'prop-types'
import React, {Component} from 'react'
import {Button} from 'react-bootstrap'
import './HighScoreInput.css'
import {saveHOFEntry} from "./HallOfFame";

class HighScoreInput extends Component {
    state = {winner: ''};
    // arrow function for this binding
    handleWinnerUpdate = event => {
        this.setState({winner: event.target.value.toUpperCase()})

    };
    persistWinner = event => {
        event.preventDefault();
        const timerTime = this.props.time
        let seconds = Math.floor(timerTime / 1000) % 60
        const time = seconds + 's'
        const newEntry = {guesses: this.props.guesses, player: this.state.winner, time}
        console.log(this.props.time)
        saveHOFEntry(newEntry, this.props.onStored)
    };

    render() {
        return (
            <form className="highScoreInput" onSubmit={this.persistWinner}>
                <p>
                    <label>
                        <span className="badge badge-success">Good Work</span> ! Enter your name :
                        <input
                            className="form-control"
                            type="text"
                            autoComplete="given-name"
                            value={this.state.winner}
                            onChange={this.handleWinnerUpdate}
                        />
                    </label>
                    <Button variant="success" type={"submit"}>I won</Button>
                </p>
            </form>
        )
    }
}

HighScoreInput.propTypes = {
    guesses: PropTypes.number.isRequired,
    onStored: PropTypes.func.isRequired
}

export default HighScoreInput
