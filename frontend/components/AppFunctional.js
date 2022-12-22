
  import React from 'react'
  import { useState, useEffect } from 'react'
  import axios from 'axios'
  
  // Suggested initial states
  const initialMessage = ''
  const initialEmail = ''
  const initialSteps = 0
  const initialIndex = 4 // the index the "B" is at
  const initialCoordinates = "2,2"
  const initialName = ""
  const array = [0, 1, 2, 3, 4, 5, 6, 7, 8]
  const coordinatesArray = [  "1,1",  "2,1",  "3,1",  "1,2",  "2,2",  "3,2",  "1,3",  "2,3",  "3,3"]
  
  export default function AppFunctional(props) {
    
    // Initialize the activeSquare state with the index of the initial square
    const [activeSquare, setActiveSquare] = useState(initialIndex)
    const [message, setMessage] = useState(initialMessage)
    const [email, setEmail] = useState(initialEmail)
    const [steps, setSteps] = useState(initialSteps)
    const [coordinates, setCoordinates] = useState(initialCoordinates)
    const [screenName, setScreenName] = useState(initialName)
  
    // No need for these helper functions
    // function getXY() {}
    // function getXYMessage() {}
  
    function reset() {
      setMessage(initialMessage)
      setScreenName(initialName)
      setEmail(initialEmail)
      setActiveSquare(initialIndex)
      setSteps(initialSteps)
      setCoordinates(initialCoordinates)
    }
  
    function onClickUp() {
      if(activeSquare > 2){
        setActiveSquare(activeSquare - 3)
        setCoordinates(coordinatesArray[activeSquare - 3])
        setSteps(steps + 1)
        setMessage(initialMessage)
      } else {
        setMessage("You can't go up")
      }
    }
  
    function onClickDown() {
      if (activeSquare < 6) {
        setActiveSquare(activeSquare + 3);
        setCoordinates(coordinatesArray[activeSquare + 3]);
        setSteps(steps + 1);
        setMessage(initialMessage);
      } else {
        setMessage("You can't go down");
      }
    }

    function onClickRight() {
      if(coordinates[0] !== "3"){
        setActiveSquare(activeSquare + 1)
        setCoordinates(coordinatesArray[activeSquare + 1])
        setSteps(steps + 1)
        setMessage(initialMessage)
      }
      else{
        setMessage("You can't go Right")
      }
    }
  
    function onClickLeft() {
      if(activeSquare % 3 !== 0){
        setActiveSquare(activeSquare - 1)
        setCoordinates(coordinatesArray[activeSquare - 1]) 
        setSteps(steps + 1)
        setMessage(initialMessage)
      }else{  
        setMessage("You can't go left") 
      }
    }
    
    function onChange(evt) {
        setEmail(evt.target.value)
    }


    function onSubmit(evt){
      evt.preventDefault()

      axios.post('http://localhost:9000/api/result', {
        "x": coordinates[0],
        "y": coordinates[2],
        "steps": steps,
        "email": email
      }).then(res => {
        reset(),
        setMessage(res.data.message)
        
      })
      .catch(error => {
        if(error.response.status === 422){
          setMessage(error.response.data.message)
        }
        if(error.response.status === 500){
          setMessage("Server Error")
          
        }
        if(error.response.status === 403){
          setMessage(error.response.data.message)
          
        }
      })
    }
    
    useEffect(() => {
      setActiveSquare(initialIndex)
    }, [])







  return (
    <div id="wrapper" className={props.className}>
      <div className="info">
        <h3 id="coordinates">Coordinates {coordinates}</h3>
        <h3 id="steps">You moved {steps} times</h3>
      </div>

      <div id="grid">
        {
          
          array.map(idx => (
          
            <div key={idx} className={`square ${idx === activeSquare ? ' active' : ''}`}>
              {idx === activeSquare ? 'B' : ''}
              
            </div>
          ))
         
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
