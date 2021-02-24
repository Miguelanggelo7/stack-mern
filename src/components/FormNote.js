import React, { useEffect, useState } from 'react'
import axios from "axios"
import DatePicker from 'react-datepicker' 
import 'react-datepicker/dist/react-datepicker.css'

const FormNote = (props) => {
  
  const newNote = {
    date: new Date(),
    author: "",
    title: "",
    content: "",
  }
  const [users, setUsers] = useState(null);
  const [note, setNote] = useState(newNote);
  const [editing, setEditing] = useState(false);

  useEffect(() => {
    getUsers();
  }, [])

  const getUsers = () => {
    axios.get('http://localhost:4000/api/users')
    .then(res => {
      setUsers(res.data)
      // Solo guarda los nombres
      // const users = res.data.map(user => user.username);
      // setUsers(users);
      setNote({...note, author: res.data[0].username})
    })
    .catch(err => {
      console.log("Error: " + err)
    })

    // Valida si lo que se quiere es editar la nota
    if(props.match.params.id){  
      axios.get(`http://localhost:4000/api/notes/${props.match.params.id}`)
      .then(res => {
        const data = res.data;
        setNote({date: new Date(data.date), author: data.author, content: data.content, title: data.title})
      })
      setEditing(true);
    }
  }

  const onSubmit = async(e) => {
    e.preventDefault();
    if(note.author === "" || note.content === "" || note.title === ""){
      alert("Fill all the fields");
      return;
    }

    if(props.match.params.id){
      // Actualizacion de nota
      await axios.put(`http://localhost:4000/api/notes/${props.match.params.id}`, note)
      console.log("Note edited")
    }else {
      // Creación de notas
      await axios.post('http://localhost:4000/api/notes', note)
      alert("Note Saved");
      setNote({...newNote, author: note.author})
    }
    
    window.location.href = '/';
  }

  const renderUsers = (items) => {
    return(
      <div className="form-group">
        <select className="form-control"
        name="userSelected"
        onChange={(e) => setNote({...note, author: e.target.value})}
        >
          {
            items.map((item) => (
              <option key={item._id} value={item.username}>
                {item.username}
              </option>
            ))
          }
        </select>
      </div>
    )
  }

  const onChangeText = (e) => {
    setNote({ ...note, [e.target.name] : e.target.value })
  }

  return (
    <div className="col-md-6 offset-md-3">
      <div className="card card-body">
        <h4>Create a Note</h4>
        {/*  SELECT USER */}
        {
          (users) 
          ? renderUsers(users) 
          : <p>No hay usuarios registrados</p>
        }
        <div className="form-group">
          <input type="text" className="form-control" placeholder="Title" name="title" required
            onChange={onChangeText} value={note.title}
          />
        </div>
        <div className="form-group">
          <textarea 
            name="content" 
            value={note.content}
            className="form-control" 
            placeholder="Content" required 
            onChange={onChangeText} 
          />
        </div>
        <div className="form-group">
          <DatePicker 
            className="form-control"
            selected={note.date}
            onChange={(e) => setNote({...note, date: e})}
          />
        </div>

        <form onSubmit={onSubmit}>
          <button type="submit" className="btn btn-primary">
            Save Note
          </button>
        </form>
      </div>
    </div>
  )
}

export default FormNote
