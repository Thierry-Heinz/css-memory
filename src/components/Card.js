import '../styles/Card.scss';
import React, { useState, useEffect } from "react";
import {useSpring, animated as a } from "react-spring";

const Card = ({
    id,
    color,
    matched,
    flippedCount,
    setFlippedCount,
    flippedIndexes,
    setFlippedIndexes,

}) => {
    const [faceUp, changeFace] = useState(false);
    const {transform, opacity} = useSpring({
        opacity: faceUp ? 1 : 0,
        transform: `perspective(600px) rotateY(${faceUp ? 180 : 0}deg)`,
        config: {mass: 8, tension: 700, friction: 100},
      }) 
    
    // gère l'interaction click, si la carte n'est pas déjà retournée et le nombre de ertournement inférieur à 2
    const onCardClick = (id) => {    
        if( !matched && flippedCount % 3 === 0 ) {
            changeFace( state => !state)
            setFlippedCount( flippedCount + 1);
            const newIndexes = [...flippedIndexes];
            newIndexes.push(id)
            setFlippedIndexes(newIndexes)
        } else if ( flippedCount % 3 === 1 && !matched && flippedIndexes.indexOf(id) < 0 ) {
            changeFace( state => !state)
            setFlippedCount(flippedCount + 1)
            const newIndexes = [...flippedIndexes]
            newIndexes.push(id)
            setFlippedIndexes(newIndexes)
        }        
        console.log(flippedCount)  
    }

    // retourne les cartes si ce n'est pas un match
    useEffect(() => {
          if (flippedIndexes[2] === true && flippedIndexes.indexOf(id) > -1) {
            setTimeout(() => {   
              changeFace( state => !state)
              setFlippedCount(flippedCount + 1)
              setFlippedIndexes([])
            }, 1000)
          } else if (flippedIndexes[2] === false && id === 0) {
            setFlippedCount(flippedCount + 1)
            setFlippedIndexes([])
          }
      }, [flippedIndexes]) 
      
      
      
//Change l'affichage des cartes + animation
    let display =''
    let cardstyle = {}
    if(faceUp) {
        display = color
        cardstyle = {
            opacity,
            transform: transform.to(t => `${t} rotateY(180deg)`),
            backgroundColor: color,
        }    
    }
    else {
        display = '';
        cardstyle = {
            opacity: opacity.to(o => 1 - o),
            transform,
            backgroundColor: 'gray'
        } 
    }    

    return (        
        <a.div className={`Card ${faceUp}`} style={cardstyle} onClick={() => onCardClick(id)} > { display } </a.div>
    );
}

export default Card;