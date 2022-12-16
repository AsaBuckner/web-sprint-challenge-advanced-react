import React from 'react'
import { useState, useEffect} from 'react'
import axios from 'axios'

// Suggested initial states
const initialMessage = ''
const initialEmail = ''
const initialSteps = 0
const initialIndex = 4 // the index the "B" is at
const initialCoordinates = "2,2"
const initialName = ""


const coordinatesArray =[
  "1,1",
  "2,1",
  "3,1",
  "1,2",
  "2,2",
  "3,2",
  "1,3",
  "2,3",
  "3,3"
]

export default function AppFunctional(props) {
  
  const [message, setMessage] = useState(initialMessage)
  const [email, setEmail] = useState(initialEmail)
  const [numOfMoves, setNumOfMoves] = useState(initialSteps)
  const [activeSquare, setActiveSquare] = useState(initialIndex)
  const [coordinates, setCoordinates] = useState(initialCoordinates)
  const [screenName, setScreenName] = useState(initialName)

  // THE FOLLOWING HELPERS ARE JUST RECOMMENDATIONS.
  // You can delete them and build your own logic from scratch.

  function getXY() {
    // It it not necessary to have a state to track the coordinates.
    // It's enough to know what index the "B" is at, to be able to calculate them.
  }

  function getXYMessage() {
    // It it not necessary to have a state to track the "Coordinates (2, 2)" message for the user.
    // You can use the `getXY` helper above to obtain the coordinates, and then `getXYMessage`
    // returns the fully constructed string.
  }

  function reset() {
    setMessage(initialMessage)
    setScreenName(initialName)
    setEmail(initialEmail)
    setActiveSquare(initialIndex)
    setNumOfMoves(initialSteps)
    setCoordinates(initialCoordinates)
  }

  function onClickUp() {
    if(activeSquare > 2){
      setActiveSquare(activeSquare - 3)
      setCoordinates(coordinatesArray[activeSquare - 3])
      setNumOfMoves(numOfMoves + 1)
      setMessage(initialMessage)
    } else {
      setMessage("You can't go up")
    }
  }

  function onClickDown() {
    if(activeSquare < 6 ){
      setActiveSquare(activeSquare + 3)
      setCoordinates(coordinatesArray[activeSquare + 3])
      setNumOfMoves(numOfMoves + 1)
      setMessage(initialMessage)
    }
    else{
      setMessage("You can't go down")
    }
  }

  function onClickRight() {
    if(coordinates[0] !== "3"){
      setActiveSquare(activeSquare + 1)
      setCoordinates(coordinatesArray[activeSquare + 1])
      setNumOfMoves(numOfMoves + 1)
      setMessage(initialMessage)
    }
    else{
      setMessage("You can't go down")
    }
  }

  function onClickLeft() {
    if(activeSquare % 3 !== 0){
      setActiveSquare(activeSquare - 1)
      setCoordinates(coordinatesArray[activeSquare - 1]) 
      setNumOfMoves(numOfMoves + 1)
      setMessage(initialMessage)
    }else{  
      setMessage("You can't go left") 
    }
  }
  
  function onChange(evt) {
    // You will need this to update the value of the input.
      setEmail(evt.target.value)
  }

  function retrieveName() {
    let name = ""
    for (let i = 0; i < email.length; i++){
        if(email[i] === "@"){
          console.log(name)
          return(name)
        }else{name += email[i]}
    }
  }

  function onSubmit(evt){
    evt.preventDefault()
    axios.post('http://localhost:9000/api/result', {
       "x": coordinates[0], "y": coordinates[2], "steps": numOfMoves, "email": email }
    )
    setMessage(`${retrieveName()} win #145`)
    setEmail(initialEmail) 
  }
    






  return (
    <div id="wrapper" className={props.className}>
      <div className="info">
        <h3 id="coordinates">Coordinates {coordinates}</h3>
        <h3 id="steps">You moved {numOfMoves} times</h3>
      </div>

      <div id="grid">
        {
          ////////////////////////////////////////////////////////
          [0, 1, 2, 3, 4, 5, 6, 7, 8].map(idx => (
            <div key={idx} className={`square ${idx == {activeSquare} ? ' active' : ''}`}>
              {idx == {activeSquare} ? 'B' : null}
            </div>
          ))
          ////////////////////////////////////////////////////////
        }
      </div>

      <div className="info">
        <h3 id="message">{message}</h3>
      </div>

      <div id="keypad">
        <button onClick={onClickLeft} id="left">LEFT</button>
        <button onClick={onClickUp} id="up">UP</button>
        <button onClick={onClickRight} id="right">RIGHT</button>
        <button onClick={onClickDown} id="down">DOWN</button>
        <button onClick={reset} id="reset">reset</button>
      </div>
      <form>

        <input onChange={onChange}
        value = {email}
        id="email" 
        type="email" 
        placeholder="type email"/>

        <input 
        id="submit" 
        onClick={onSubmit}
        type="submit"/>

      </form>
    </div>
  )
}
