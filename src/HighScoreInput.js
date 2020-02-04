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
        const newEntry = {guesses: this.props.guesses, player: this.state.winner}
        saveHOFEntry(newEntry, this.props.onStored)
    };

    render() {
        return (
            <form className="highScoreInput" onSubmit={this.persistWinner}>
                <p>
                    <label>
                        <span className="badge badge-success">Bravo</span> ! Enter your name :
                        <input
                            className="form-control"
                            type="text"
                            autoComplete="given-name"
                            value={this.state.winner}
                            onChange={this.handleWinnerUpdate}
                        />
                    </label>
                    <Button variant="success" type={"submit"}>J'ai gagné</Button>
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
