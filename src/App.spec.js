import React from 'react'
import {expect} from 'chai'
import {shallow} from 'enzyme'
import sinon from 'sinon'
import App, {SYMBOLS} from './App'
import GuessCount from "./guess-count/GuessCount"

describe('<App/>', () => {
    it('renders without crashing', () => {
        const wrapper = shallow(<App/>)
        expect(wrapper, 'why not').to.exist
    })
    it('contains Guess Count Component', () => {
        const wrapper = shallow(<App/>)
        expect(wrapper).to.contain(<GuessCount guesses={0}/>)
    })
    it('has 16 cards', () => {
        const wrapper = shallow(<App/>)
        expect(wrapper.find('Card')).to.have.length(16)
    })
    it('should match snapshot', () => {
        const mock = sinon.stub(App.prototype, 'generateCards')
            .returns([...SYMBOLS
                .repeat(2)])

        try {
            const wrapper = shallow(<App/>)
            expect(wrapper).to.matchSnapshot()
        } finally {
            mock.restore()
        }
    })
})
