

import { useState,useContext } from 'react';
import { varContext,var2Context,resultContext} from '../App';





function NotesList({ noteText, noteIndex, deleteHandler, noteTitle  }) {

  const {title,setTitle} = useContext(varContext)
  const {text,setText} = useContext(var2Context)
  const {result,setResult} = useContext(resultContext)

  const [modal, setModal] = useState(false);
  // const [editNote,SetEditNote] = useState({tl:title,tx:text})

  const toggleModal = () => setModal(!modal)

  const handleEditTitle = (e) => {
    setTitle(e.target.value)
    
  
  }
  const handleEditText = (e) => {
    setText(e.target.value)
    
  
  }

  const editHandler = () => {
    
  }


  

  return (
    <div className='container'>
      <span className='element'> <h4 onClick={toggleModal} className='elementtitle'>{noteTitle}</h4>
        {modal && (
          
          <div className='modal'>
            <div className='overlay'>
              <div className='modal-content'>
                <button onClick={() => editHandler(noteTitle,noteText,noteIndex)}>Edit</button>
                
                <span className='elementmodal'><input className='inputchange' onChange={handleEditTitle} placeholder={title}></input><textarea className='textchange' onChange={handleEditText} placeholder={text} ></textarea>
                <button onClick={toggleModal} className='closebutton'>x</button></span>
              </div>
            </div>
            </div>
         
         


        )}<span onClick={toggleModal} style={{ fontSize: '14px', margin: '4px' }}>{noteText}</span><button onClick={() => deleteHandler(noteIndex)} className='closebutton'>x</button>

      </span>
    </div>
  )
}



export default NotesList