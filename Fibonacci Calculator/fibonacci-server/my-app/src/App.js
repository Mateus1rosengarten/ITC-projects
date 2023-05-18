import logo from './logo.svg';
import './App.css';
import { useState ,useEffect } from 'react';

function ButtonComp(){
  const [counter,setCounter] = useState(0)
  setCounter(counter+1)

  return(
    <div>
    <label>Counter</label>
    <button onClick={()=>{setCounter()}}>Click me</button>
    </div>
  )

  

}

function App() {
  return (
    <>
    <h1>texto</h1>
    <div className="App">
      <ButtonComp />
      
     
    </div>
    </>
  );
}

export default App;
