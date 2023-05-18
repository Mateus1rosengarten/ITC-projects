import { useState,useContext } from 'react';
import NotesList from './NotesList';
import FormComponent from './FormComponent';
import { varContext,var2Context,resultContext} from '../App';
import { useEffect} from 'react';
import localforage from 'localforage';
///////////////////////////////////////////////////////////////////////////////// ADD NOTES COMPONENT
function AddNotesComponent() {

  const {title,setTitle} = useContext(varContext)
  const {text,setText} = useContext(var2Context)
  const {result,setResult} = useContext(resultContext)

  
 const savingForage = async () => {
  const forage = await localforage.setItem('TWEETS_SAVED', JSON.stringify(result))
  console.log('test2',forage)
  return forage
 } 

 console.log(savingForage)

 async function gettingForage(){
  const getforage = await localforage.getItem('TWEETS_SAVED')
  console.log('1',) 
  return JSON.parse(getforage)

 }

 useEffect(() => {
  savingForage()

 },[result])

 useEffect(() => {
 gettingForage()
 
 },[])
 

  //////////////////////////////////////////////////////////////////////////////////// HANDLE ONLCICK BUTTON

  const addNote = () => {
   
    const newItem = {txt: text + '(' + settingDate() + ')',titl : title,};
    
   
    text && setResult([...result, newItem ])

  }


  /////////////////////////////////////////////////////////////////////////////////////// SETTING DATE
  const settingDate = () => {
    const months = [
      'Jan', 'Fev', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'
    ]
    let date = new Date();
    let daydate = date.getDate()
    let monthdate = months[date.getMonth()]
    let hourdate = date.getHours()
    let minutedate = date.getMinutes()
    let format = hourdate >= 12 ? 'PM' : 'AM'

    let shortdate = monthdate + ' ' + daydate + 'th' + " " + hourdate + ":" + minutedate + ' ' + format;

    return shortdate
  }
  ////////////////////////////////////////////////////////////////////////////////////// HANDLE ONCHANGE INPUT
   
  const HandleTitle = (e) => setTitle(e.target.value);


  const HandleText = (e) => setText(e.target.value);


  /////////////////////////////////////////////////////////////////////////////////// CODE THAT DELETE SPECIFIC RESULT


  const closeNoteHandle = (noteID) => {
    const promptmessage = window.confirm('Are you sure you want to delete your note?');
    result.splice(noteID, 1);
    { promptmessage && setResult([...result]) };

  }

   const editNoteHandle = (title,content,noteID) => {
     
      const tobeUpdated = result.find((eachitem,noteID) => eachitem.noteID === noteID)
      // tobeUpdated.noteID = noteID
      tobeUpdated.noteTitle = title;
      tobeUpdated.noteText = content;
      setResult([...tobeUpdated])
  }


  ////////////////////////////////////////////////////////////////////////////////////////////////////// JSX RETURN
  return (
    <>
    
    <FormComponent onTitle={HandleTitle} onText={HandleText} onNote={addNote}/>
     
      <div className='resultdiv'>
        {result.map((item, index) => (<NotesList
          key={item + index}
          noteIndex={index}
          noteTitle={item.titl}
          noteText={item.txt}
          deleteHandler={closeNoteHandle}
          editHandler={editNoteHandle}
        />
        ))}
      </div>
      
    </>
  )
}

export default AddNotesComponent