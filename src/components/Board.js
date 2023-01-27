import '../styles/Board.scss';
import React from 'react';
import Card from './Card';
import { useState, useEffect } from 'react';

const colors = [        
    'coral',
    'lime',
    'pink',
    'peru',
    'bisque',
    'cornflowerblue',
    'chocolate',
    'firebrick',
    'orchid',
    'mediumslateblue',
    'midnightblue',
    'wheat',
    'teal',
    'yellowgreen',
    'sienna',
    'salmon',
    'honeydew',
    'indigo',
    'indianred',
    'khaki',
    'cyan',
    'chartreuse',
    'olive',
    'burlywood'
]

function Board() {
     const [game, setGame] = useState([])
     const [flippedCount, setFlippedCount] = useState(0)
     const [flippedIndexes, setFlippedIndexes] = useState([]);

    useEffect(() => {
        const newGame = []
        for( let i = 0; i < 18; i++) {
            const originalcard = {
                id: 2 * i,
                color: colors[i],
                matchId: i,
                matched: false
            }
            const paircard = {
                id: 2 * i + 1,
                color: colors[i],
                matchId: i,
                matched: false
            }

            newGame.push(originalcard)
            newGame.push(paircard)
        }

        const shuffledGame = newGame.sort(() => Math.random() - 0.5)
        setGame(shuffledGame)

    }, [])

     
    
    // Si 2 cartes sont retournées, regarde si elle match, si oui met à jour l'objet game
    if(flippedIndexes.length === 2) {
        const match = game[flippedIndexes[0]].matchId === game[flippedIndexes[1]].matchId

        if (match) {
            const newGame = [...game]
            newGame[flippedIndexes[0]].matched = true
            newGame[flippedIndexes[1]].matched = true
            console.log(newGame)
            setGame(newGame)
            const newIndexes = [...flippedIndexes]
            newIndexes.push(false)
            setFlippedIndexes(newIndexes)
        } else {
            const newIndexes = [...flippedIndexes]
            newIndexes.push(true)
            setFlippedIndexes(newIndexes)
        }
    }          

    
    if (game.length === 0) return <div>loading...</div>
    else { 
        return(
            <div className="Board">            
                <h2 className="title-board">My Memory</h2>
                <div className="Board-wrapper">
                    {
                        game.map((card, index) => {
                            return (
                                <Card 
                                    key={index}
                                    id={index}
                                    color={card.color}
                                    matched={card.matched}   
                                    
                                    // pour les hooks
                                    flippedCount={flippedCount}
                                    setFlippedCount={setFlippedCount}
                                    flippedIndexes={flippedIndexes}
                                    setFlippedIndexes={setFlippedIndexes}
                                />                                   
                                );
                        })
                    }               
                </div>                
            </div>
        )
    }
     
}

export default Board;