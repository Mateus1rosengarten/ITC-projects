

function FormComponent ({onTitle,onText,onNote}) {
    return(
        <div className='notebox'>
        <input className="inputStyle"  onChange={onTitle} placeholder='title'></input>
        <textarea className="textStyle" onChange={onText} placeholder='your note...'></textarea>
        <button className='addbutton' onClick={onNote}>Add</button>
      </div>
    )
}


export default FormComponent