import React from 'react'
import {shallow} from 'enzyme'
import {expect} from 'chai'
import sinon from 'sinon'
import Card from './card/Card'

describe('<Card/>', () => {
    it('should trigger its `onClick` prop when clicked', () => {
        // function (spy) to save all calls
        // Jest const onClick = jest.fn();
        // SINON
        const onClick = sinon.spy();
        const wrapper = shallow(<Card card="😊" difficulty={4} index={0} onClick={onClick}/>)

        wrapper.simulate('click');
        expect(onClick).to.have.been.calledWith(0)
    })

    it('should match its reference snapshot', () => {
        const onClick = sinon.spy();
        const wrapper = shallow(<Card card="😊" difficulty={4} index={0} onClick={onClick}/>)

        expect(wrapper).to.matchSnapshot()
    })
})
