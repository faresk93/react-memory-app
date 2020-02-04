import React, {Component} from 'react'
import shuffle from 'lodash.shuffle'
import './App.css'
import Card from './card/Card'
import GuessCount from './guess-count/GuessCount'
import HallOfFame from "./HallOfFame";
import HighScoreInput from "./HighScoreInput";

export const SYMBOLS = '😀🎉💖🎩🐶🐱🦄🐬🌍🌛🌞💫🍎🍌🍓🍐🍟🍿'
const VISUAL_PAUSE_MSECS = 750
const DEFAULT_STATE = {
    cards: [],
    currentPair: [],
    matchedCardsIndexes: [],
    guesses: 0,
    difficulty: 4,
    hallOfFame: null
}

class App extends Component {
    refTest = React.createRef();

    constructor(props) {
        super(props);
        this.state = {...DEFAULT_STATE, cards: this.generateCards(4)};
    }

    componentDidMount() {
        document.title = 'Tick-Tack-Toe'
    }


    // arrow function for this binding
    displayHOF = hallOfFame => {
        this.setState({hallOfFame})
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

    onHandleDifficulty = (event) => {
        const difficulty = +event.target.value;
        this.setState({...DEFAULT_STATE, difficulty, cards: this.generateCards(difficulty)})
    };


    // arrow function for this scope
    handleCardClick = (index, event) => {
        const {currentPair} = this.state
        if (currentPair.length === 0) {
            this.setState({currentPair: [index]});
            return;
        }
        if (currentPair.length === 2) {
            return;
        }
        this.handleNewPairClosedBy(index, event)
    };

    handleNewPairClosedBy(index, event) {
        const {cards, currentPair, guesses, matchedCardsIndexes} = this.state
        if (currentPair[0] === index) {
            return;
        }
        const newPair = [currentPair[0], index]
        const newGuesses = guesses + 1
        const matched = cards[newPair[0]] === cards[newPair[1]]
        this.setState({currentPair: newPair, guesses: newGuesses})
        if (matched) {
            this.setState({matchedCardsIndexes: [...matchedCardsIndexes, ...newPair]})
        }
        event.preventDefault();
        setTimeout(() => this.setState({currentPair: []}), VISUAL_PAUSE_MSECS)
    }

    render() {
        const {cards, guesses, matchedCardsIndexes, hallOfFame} = this.state
        const won = matchedCardsIndexes.length === cards.length;
        return (
            <div ref={this.refTest}>
                <div className="game">
                    <div className="title">
                        <h1>Tic-Tac-Toe</h1>
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
                                <span className="badge badge-light difficulty">Choose difficulty: </span>
                            </label>
                            <select className="form-control" onChange={this.onHandleDifficulty} defaultValue={4}>
                                <option value="2">Easy</option>
                                <option value="4">Medium</option>
                                <option value="6">Hard</option>
                            </select>
                        </div>
                    </div>
                    <GuessCount guesses={guesses}/>
                    <div className="cards">
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
                            <HighScoreInput guesses={guesses} onStored={this.displayHOF}/>
                    )}
                </div>
            </div>
        )
    }
}

export default App
