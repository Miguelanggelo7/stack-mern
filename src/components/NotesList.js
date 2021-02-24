import React, { useEffect, useState } from 'react'
import axios from "axios"
import { format } from 'timeago.js'
import { Link } from 'react-router-dom';
const NotesLists = () => {

  const [notes, setNotes] = useState(null);

  useEffect(() => {
    getNotes()
  }, [])

  const getNotes = () => {
    axios.get('http://localhost:4000/api/notes')
    .then(res => {
      setNotes(res.data)
      console.log(res.data)
    })
    .catch(err => {
      console.log("Error: " + err)
    })
  }

  const deleteNote = async(id) => {
    const res = await axios.delete('http://localhost:4000/api/notes/' + id);
    getNotes();
  }

  const renderNotes = (items) => {
    return(
      <>
        {
          items.map(item => (
            <div className="col-md-4 p-2" key={item._id}>
              <div className="card">
                <div className="card-header d-flex justify-content-between">
                  <h5>{item.title}</h5>
                  <Link className="btn btn-secondary" to={"/edit/" + item._id}>Edit</Link>
                </div>
                <div className="card-body">
                  <p>{item.content}</p>
                  <p style={{color: "gray"}}>{item.author}</p>
                  <p style={{color: "gray"}}>{format(item.date)}</p>
                </div>
                <div className="card-footer">
                  <button className="btn btn-danger" onClick={() => deleteNote(item._id)}>
                    Delete
                  </button>
                </div>
              </div>
            </div>
          ))
        }
      </>
    )
  }

  return (
    <div className="row">
      {
        notes 
        ? renderNotes(notes)
        : <p>No hay notas creadas aún</p>
      }
    </div>
  )
}

export default NotesLists
