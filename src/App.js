import React, {Component} from 'react'
import shuffle from 'lodash.shuffle'
import './App.scss'
import Card from './card/Card'
import GuessCount from './guess-count/GuessCount'
import HallOfFame from "./HallOfFame";
import HighScoreInput from "./HighScoreInput";
import {Timer} from "./timer/Timer";

export const SYMBOLS = '😀🎉💖🎩🐶🐱🦄🐬🌍🌛🌞💫🍎🍌🍓🍐🍟🍿'
const VISUAL_PAUSE_MSECS = 750
const SHOW_CARDS_TIMEOUT = 3000
const DEFAULT_STATE = {
    cards: [],
    currentPair: [],
    matchedCardsIndexes: [],
    guesses: 0,
    difficulty: 4,
    hallOfFame: null,
    gameStart: false,
    gameStarted: false,
    timer: null,
    timerOn: false,
    timerStart: 0,
    timerTime: 0,
    countDown: 3
}

class App extends Component {
    timer;
    countDown;
    restartGame = () => {
        this.setState({
            ...DEFAULT_STATE,
            difficulty: this.state.difficulty,
            cards: this.generateCards(this.state.difficulty)
        })
        this.startGame()
        console.log('restart')
    };

    constructor(props) {
        super(props);
        this.state = {...DEFAULT_STATE, cards: this.generateCards(4)};
    }

    refTest = React.createRef();

    startGame = () => {
        this.setState({gameStart: true, gameStarted: false, countDown: 3})
        this.countDown = setInterval(() => {
            this.setState((prevState, props) => (
                {countDown: prevState.countDown - 1}
            ))
        }, 1000)
        clearInterval(this.timer);
        setTimeout(() => {
            this.setState({gameStarted: true});
            this.startTimer();
            clearInterval(this.countDown);
        }, SHOW_CARDS_TIMEOUT)
    };
    startTimer = () => {
        this.setState({
            timerOn: true,
            timerStart: Date.now()
        });
        this.timer = setInterval(() => {
            this.setState((prevState, props) => (
                {timerTime: Date.now() - prevState.timerStart}
            ));
        }, 10)
    };

    // arrow function for this binding
    displayHOF = hallOfFame => {
        this.setState({
            hallOfFame,
            timer: null,
            timerTime: 0,
            timerStart: 0
        })
    }


    generateCards(size) {
        const difficulty = Math.pow(size, 2)
        const result = []
        const candidates = shuffle(SYMBOLS)
        while (result.length < difficulty) {
            const card = candidates.pop()
            result.push(card, card)
        }
        return shuffle(result)
    }

    getFeedbackForCard(index) {

        if (!this.state.gameStarted) {
            return 'visible'
        } else {
            const {currentPair, matchedCardsIndexes} = this.state
            const indexMatched = matchedCardsIndexes.includes(index)

            if (currentPair.length < 2) {
                return indexMatched || index === currentPair[0] ? 'visible' : 'hidden'
            }

            if (currentPair.includes(index)) {
                return indexMatched ? 'justMatched' : 'justMismatched'
            }
            return indexMatched ? 'visible' : 'hidden'
        }
    }

    onHandleDifficulty = (event) => {
        const difficulty = +event.target.value;
        this.setState({
            ...DEFAULT_STATE,
            difficulty,
            cards: this.generateCards(difficulty),
            gameStart: true
        })
        this.startGame();
    };


    // arrow function for this scope
    handleCardClick = (index, event) => {
        if (this.state.gameStarted) {
            const {currentPair} = this.state
            if (currentPair.length === 0) {
                this.setState({currentPair: [index]});
                return;
            }
            if (currentPair.length === 2) {
                return;
            }
            this.handleNewPairClosedBy(index, event)
        }
    };

    handleNewPairClosedBy(index, event) {
        let {cards, currentPair, guesses} = this.state
        if (currentPair[0] === index) {
            return;
        }
        const newPair = [currentPair[0], index]
        const newGuesses = guesses + 1
        const matched = cards[newPair[0]] === cards[newPair[1]]
        this.setState({currentPair: newPair, guesses: newGuesses})
        if (matched) {
            this.setState((prevState, props) => (
                {matchedCardsIndexes: [...prevState.matchedCardsIndexes, ...newPair]}
            ), () => {
                const won = this.state.matchedCardsIndexes.length === cards.length;
                if (won) {
                    clearInterval(this.timer);
                }
            })
        }

        setTimeout(() => this.setState({currentPair: []}), VISUAL_PAUSE_MSECS)
    }

    render() {
        const {cards, guesses, matchedCardsIndexes, hallOfFame} = this.state
        const won = matchedCardsIndexes.length === cards.length;
        return (
            <div ref={this.refTest}>
                {this.state.gameStart ?
                    (<div className="game-board">
                        <div className="game">
                            <div className="title">
                                <h1>Memory Game</h1>
                                <span>Game</span>
                            </div>
                            <div className="logo">
                                <img
                                    src="https://talan.com/typo3conf/ext/subtheme_t3kit_talan/Resources/Public/Images/logo-talan.png"
                                    alt="logo-Talan"/>
                            </div>
                        </div>
                        <div className="memory mt-5">
                            <div className="fares">
                                <h1>By Fares</h1>
                            </div>
                            <div className="w-100 mb-3">
                                <div className="d-flex">
                                    <label className="w-50 my-auto">
                                        <span className="badge badge-light difficulty">Memory Level: </span>
                                    </label>
                                    <select className="form-control" style={{cursor: 'pointer'}}
                                            onChange={this.onHandleDifficulty}
                                            value={this.state.difficulty}
                                            disabled={!this.state.gameStarted}>
                                        <option value="2">Turtle</option>
                                        <option value="4">Elephant</option>
                                        <option value="6">Dolphin</option>
                                    </select>
                                </div>
                            </div>
                            <GuessCount guesses={guesses}/>
                            <div className="cards">

                                <div className="timer">
                                    {won ? (
                                        <div className="restart">
                                            <h3 onClick={this.restartGame}>Restart</h3>
                                        </div>
                                    ) : (
                                        <div>
                                            {this.state.timerOn ? <Timer timerTime={this.state.timerTime}/> : (
                                                <span>{this.state.countDown}</span>
                                            )}
                                        </div>
                                    )}
                                </div>
                                {
                                    cards.map((card, index) => (
                                        <Card
                                            key={index}
                                            card={card}
                                            index={index}
                                            difficulty={this.state.difficulty}
                                            feedback={this.getFeedbackForCard(index)}
                                            onClick={this.handleCardClick}
                                        />
                                    ))
                                }
                            </div>
                            {won && (
                                hallOfFame ? <HallOfFame entries={hallOfFame}/> :
                                    <HighScoreInput time={this.state.timerTime} guesses={guesses}
                                                    onStored={this.displayHOF}/>
                            )}
                        </div>
                    </div>) :
                    <div className="game-start">
                        <div className="start-button" onClick={this.startGame}>Start Game</div>
                    </div>
                }

            </div>
        )
    }
}

export default App
