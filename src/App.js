import React, {useState, useEffect, createRef} from 'react'
import Card from './components/Card'
import data from './data.json'
import AnimateList from './AnimateList'

function App() {
  const [cards, setCards] = useState(data)
  
  const cardList = cards.map((card, i) =>{
    return(
      <Card
        key={card.userID}
        userID = {card.userID}
        displayName = {card.displayName}
        picture = {card.picture}
        score = {card.score}
        update = {card.update}
        ref = {createRef()}
      />  
    )
  })

  // Generate random card and random points
  function randomInc(){
    let chosenCard = cards[Math.floor(Math.random() * cards.length)]
    let incAmount = Math.floor((Math.random() + 1) * 2000)
    
    setCards(prevCards => prevCards.map(card => { 
      if(card.userID === chosenCard.userID){
        return {...card, score: card.score + incAmount, update: true}
      }else{
        return {...card, update: false}
      }
    }))
  }
  
  // Sort cards 
  useEffect(() => {
      setCards(prev => prev.sort((a,b) => {
          return b.score-a.score
      }))
  }, [cards]);
    
  // Choose random card point to increase 
  useEffect(() => {
    const interval = setInterval(() => {
      randomInc()
    }, 1000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="App">
      <header className="App-header">
        <AnimateList>
            {cardList}
        </AnimateList>
      </header>
    </div>
  );
  
}

export default App;
