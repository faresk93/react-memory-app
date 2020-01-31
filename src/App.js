import React, {Component} from 'react'
import shuffle from 'lodash.shuffle'

import './App.css'

import Card from './card/Card'
import GuessCount from './guess-count/GuessCount'
import HallOfFame, {FAKE_HOF} from "./HallOfFame";

const SIDE = 6
const SYMBOLS = '😀🎉💖🎩🐶🐱🦄🐬🌍🌛🌞💫🍎🍌🍓🍐🍟🍿'
const VISUAL_PAUSE_MSECS = 750

class App extends Component {

    state = {
        cards: this.generateCards(),
        currentPair: [],
        matchedCardsIndexes: [],
        guesses: 0
    };

    generateCards() {
        const result = []
        const size = SIDE * SIDE
        const candidates = shuffle(SYMBOLS)
        while (result.length < size) {
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
        const {cards, guesses, matchedCardsIndexes} = this.state
        const won = matchedCardsIndexes.length === cards.length;
        return (
            <div className="memory">
                <GuessCount guesses={guesses}/>
                {
                    cards.map((card, index) => (
                        <Card
                            key={index}
                            card={card}
                            index={index}
                            feedback={this.getFeedbackForCard(index)}
                            onClick={this.handleCardClick}
                        />
                    ))
                }
                {won && <HallOfFame entries={FAKE_HOF}/>}
            </div>
        )
    }
}

export default App
