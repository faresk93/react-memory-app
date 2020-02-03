import React, {Component} from 'react'
import shuffle from 'lodash.shuffle'
import './App.css'
import Card from './card/Card'
import GuessCount from './guess-count/GuessCount'
import HallOfFame, {FAKE_HOF} from "./HallOfFame";

const SYMBOLS = '😀🎉💖🎩🐶🐱🦄🐬🌍🌛🌞💫🍎🍌🍓🍐🍟🍿'
const VISUAL_PAUSE_MSECS = 750

class App extends Component {
    refTest = React.createRef();

    // lifeCycles
    constructor(props) {
        super(props);
        console.log('constructor')
    }

    componentDidMount() {
        console.log('componentDidMount')
    }

    componentDidUpdate(prevProps, prevState, snapshot) {
        console.log('componentDidUpdate')
    }

    componentWillUnmount() {
        console.log('componentWillUnmount')
    }

    componentDidCatch(error, errorInfo) {
        console.log('error', error)
    }

    state = {
        cards: this.generateCards(4),
        currentPair: [],
        matchedCardsIndexes: [],
        guesses: 0,
        difficulty: 4
    };

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
        this.setState({
            cards: this.generateCards(difficulty),
            difficulty: difficulty
        })
    };


    // arrow function for this scope
    handleCardClick = index => {
        const {currentPair} = this.state
        if (currentPair.length === 0) {
            this.setState({currentPair: [index]});
            return;
        }
        if (currentPair.length === 2) {
            return;
        }
        this.handleNewPairClosedBy(index)
    };

    handleNewPairClosedBy(index) {
        const {cards, currentPair, guesses, matchedCardsIndexes} = this.state

        const newPair = [currentPair[0], index]
        const newGuesses = guesses + 1
        const matched = cards[newPair[0]] === cards[newPair[1]]
        this.setState({currentPair: newPair, guesses: newGuesses})
        if (matched) {
            this.setState({matchedCardsIndexes: [...matchedCardsIndexes, ...newPair]})
        }
        setTimeout(() => this.setState({currentPair: []}), VISUAL_PAUSE_MSECS)
    }

    render() {
        console.log('render')
        const {cards, guesses, matchedCardsIndexes} = this.state
        const won = matchedCardsIndexes.length === cards.length;
        return (
            <div ref={this.refTest}>
                <div className="memory mt-5">
                    <div className="w-100 mb-3">
                        <div className="d-flex">
                            <label className="w-50 my-auto">Choose difficulty: </label>
                            <select className="form-control" onChange={this.onHandleDifficulty} defaultValue={4}>
                                <option value="2">Easy</option>
                                <option value="4">Medium</option>
                                <option value="6">Hard</option>
                            </select>
                        </div>
                    </div>
                    <GuessCount guesses={guesses}/>
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
                    {won && <HallOfFame entries={FAKE_HOF}/>}
                </div>
            </div>
        )
    }
}

export default App
