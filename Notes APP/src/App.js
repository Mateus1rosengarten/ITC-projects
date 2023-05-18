
import './App.css';
import AddNotesComponent from './components/NotesAdd';
import React,{createContext,useState} from 'react';


export const varContext = createContext()
export const var2Context = createContext()
export const resultContext = createContext()


function App() { 
  const [title, setTitle] = useState('');
  const [text, setText] = useState(false); 
  const [result, setResult] = useState([]);                                                     
  return (
   <>
   <div className='fullpagediv'>
    <resultContext.Provider value={{result,setResult}}>
  <varContext.Provider value={{title,setTitle}}>
    <var2Context.Provider value={{text,setText}}>
    <AddNotesComponent />
    </var2Context.Provider>
    </varContext.Provider>
    </resultContext.Provider>
   </div>
   </>
  );
}

export default App;
