import React from 'react'
import PropTypes from 'prop-types'

import './HallOfFame.css'

const HallOfFame = ({entries}) => (
    <div className="w-100">
        <div className="alert alert-success w-100 text-center">Won !</div>
        <table className="hallOfFame">
            <thead>
            <th>Date</th>
            <th>Guesses</th>
            <th>Name</th>
            <th>Time</th>
            </thead>
            <tbody>
            {entries.map(({id, date, guesses, player, time}) => (
                <tr key={id}>
                    <td className="date">{date}</td>
                    <td className="guesses">{guesses}</td>
                    <td className="player">{player}</td>
                    <td className="time">{time}</td>
                </tr>
            ))}
            </tbody>
        </table>
    </div>
);

HallOfFame.propTypes = {
    entries: PropTypes.arrayOf(
        PropTypes.shape({
            id: PropTypes.number.isRequired,
            date: PropTypes.string.isRequired,
            guesses: PropTypes.number.isRequired,
            player: PropTypes.string.isRequired
        })
    ).isRequired
};

export default HallOfFame

const HOF_KEY = '::Memory::HallofFame'
const HOF_MAX_SIZE = 10

export function saveHOFEntry(entry, onStored) {
    entry.date = new Date().toLocaleDateString()
    entry.id = Date.now()

    const entries = JSON.parse(localStorage.getItem(HOF_KEY) || '[]')
    const insertionPoint = entries.findIndex(
        ({guesses}) => guesses >= entry.guesses
    )

    if (insertionPoint === -1) {
        entries.push(entry)
    } else {
        entries.splice(insertionPoint, 0, entry)
    }
    if (entries.length > HOF_MAX_SIZE) {
        entries.splice(HOF_MAX_SIZE, entries.length)
    }

    localStorage.setItem(HOF_KEY, JSON.stringify(entries))
    onStored(entries)
}
