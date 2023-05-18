import {useState} from 'react'

function Modal ({titleNote,textNote}) {
    const [modal, setModal] = useState(false);

     const modalToglle = () => setModal(!modal)

     return(
        
          <div className='modal'>
            <div className='overlay'>
              <div className='modal-content'>
                <button>Edit</button>
                
                <span className='elementmodal'><h4 className='titlemodal'>{titleNote}</h4>
                  {textNote}<button onClick={modalToglle} className='closebutton'>x</button></span>
              </div>
            </div>
            </div>
         


        )}
     
    
export default Modal