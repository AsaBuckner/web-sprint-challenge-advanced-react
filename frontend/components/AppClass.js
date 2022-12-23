import React from 'react'
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

export default class AppClass extends React.Component {
  constructor(){
    super()
    this.state = {
      activeSquare: initialIndex,
      steps: initialSteps,
      screenName: initialName,
      message : initialMessage,
      email: initialEmail,
      coordinates: initialCoordinates
    }
    
  }
  // THE FOLLOWING HELPERS ARE JUST RECOMMENDATIONS.
  // You can delete them and build your own logic from scratch.

  componentDidMount = () => {
    
  }

  reset = () => {
    this.setState({
      message: initialMessage,
      screenName: initialName,
      email: initialEmail,
      activeSquare: initialIndex,
      steps: initialSteps,
      coordinates: initialCoordinates
    })
    // Use this helper to reset all states to their initial values.d
  }


  onCLickUp = () => {
    if(this.state.activeSquare > 2){
    this.setState({
      ...this.state,activeSquare: (
        this.state.activeSquare - 3)
     ,coordinates: coordinatesArray[this.state.activeSquare - 3]
     ,steps: this.state.steps + 1
     ,message: initialMessage})
      } else {
        this.setState({
          ...this.state, 
          message: "You can't go up"
        })
      }
  }

  onCLickDown = () => {
    if(this.state.activeSquare < 6 ){
    this.setState({
      ...this.state
        ,activeSquare: (this.state.activeSquare + 3)
        ,coordinates: coordinatesArray[this.state.activeSquare + 3]
        ,steps: this.state.steps + 1
        ,message: initialMessage
      })}
      else{
        this.setState({
          ...this.state, 
          message: "You can't go down"
        })
      }
  }


  onCLickRight = () => {
    if(this.state.coordinates[0] !== "3"){
    this.setState({
      ...this.state,activeSquare: (
        this.state.activeSquare + 1
      )
      ,coordinates: coordinatesArray[this.state.activeSquare + 1]
      ,steps: this.state.steps + 1
      ,message: initialMessage
    })}
    else{
      this.setState({
        ...this.state, 
        message: "You can't go right"
      })
    }
  }

  onCLickLeft = () => {
    if(this.state.activeSquare % 3 !== 0){
      this.setState({
        ...this.state,activeSquare: (
          this.state.activeSquare - 1
        )
        ,coordinates: coordinatesArray[this.state.activeSquare - 1]
        ,steps: this.state.steps + 1
        ,message: initialMessage
      })
    }else{ 
      this.setState({
      ...this.state, 
      message: "You can't go left"
    })}
  }

  


  onChange = (evt) => {
    // You will need this to update the value of the input.
    this.setState({
      ...this.state, 
      email: evt.target.value
    })
  }

  onSubmit = (evt) => {
    
    evt.preventDefault();

    axios.post('http://localhost:9000/api/result', {
       x: this.state.coordinates[0], y: this.state.coordinates[2], steps: this.state.steps, email: this.state.email 
    })
      .then(res => {
        
        this.setState({
        ...this.state, 
        message: res.data.message,
        email: initialEmail,
        
        
        })
      })
      
      .catch(error => {
        if(error.response.status === 422){
          this.setState({
            ...this.state, 
            message: error.response.data.message})
        }
        if(error.response.status === 500){
          this.setState({
            ...this.state, 
            message: error.response.data.message})
        }
        if(error.response.status === 403){
          this.setState({
            ...this.state, 
            message: error.response.data.message})
        }
      }
  )}
      
      
  
/////////////////////////


  render() {
    const { className } = this.props
    return (
      <div id="wrapper" className={className}>
        <div className="info">
        <h3 id="coordinates">Coordinates ({this.state.coordinates})</h3>
          <h3 id="steps">{this.state.steps === 1 ? `You moved ${this.state.steps} time`: `You moved ${this.state.steps} times`}</h3>
        </div>
        <div id="grid">
          {
            [0, 1, 2, 3, 4, 5, 6, 7, 8].map(idx => {
              return(
              <div key={idx} className={`square${idx === this.state.activeSquare ? ' active' : ''}`}>
                {idx === this.state.activeSquare ? 'B' : null}
              </div>)
              
            }
              )
          }
        </div>

       
        <div className="info">
          <h3 id="message">{this.state.message}</h3>
        </div>



        <div id="keypad">
          <button id="left" onClick={this.onCLickLeft}>LEFT</button>
          <button id="up" onClick={this.onCLickUp}>UP</button>
          <button id="right" onClick={this.onCLickRight}>RIGHT</button>
          <button id="down" onClick={this.onCLickDown}>DOWN</button>
          <button id="reset" onClick={this.reset}>reset</button>
        </div>
        <form>
          <input id="email"
            type="email" 
            placeholder="type email"
            onChange={this.onChange}
            value={this.state.email}
          />
          

          <input id="submit"
            type="submit"
            onClick={this.onSubmit}
          />
        </form>
      </div>
    )
  }
}
