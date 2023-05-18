

const EditNoteHandle = ({noteID,setresult}) => {
    setresult((result) => {
      return result.filter((noteItem) => {
        return noteItem.noteID !== noteID;
      });
    });
  }

  