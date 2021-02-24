import React, { useEffect, useState } from 'react'
import axios from "axios"

const FormUser = () => {
  
  const [user, setUser] = useState({username: ""});
  const [users, setUsers] = useState(null);

  useEffect(() => {
    getUsers();
  }, [])

  const getUsers = () => {
    axios.get('http://localhost:4000/api/users')
    .then(res => {
      setUsers(res.data)
      console.log(res.data)
    })
    .catch(err => {
      console.log("Error: " + err)
    })
  }

  const onChangeUsername = (e) => {
    setUser({username: e.target.value})
  }

  const deleteUser = async(id) => {
    const res = await axios.delete('http://localhost:4000/api/users/' + id);
    console.log(res.data);
    getUsers();
  }

  const renderUsers = (items) => {
    return(
      <ul className="list-group">
        {items.map((item) => (
          <li className="list-group-item list-group-item-action"
            key={item._id}
            onClick={() => deleteUser(item._id)}
          >
            {item.username}
          </li>
        )
)}
      </ul>
    )
  }

  const onSubmit = async(e) => {
    e.preventDefault();
    if(user.username){
      const res = await axios.post('http://localhost:4000/api/users', user)
      setUser({username: ""})
      getUsers();
      return;
    }
    alert("Input an username")
    
  }

  return (
    <div className="row">
      <div className="col-md-4">
        <div className="card card-body">
          <h3>Create New User</h3>
          <form onSubmit={onSubmit}>
            <div className="form-group">
              <input type="text" 
              className="form-control" 
              value={user.username}
              onChange={onChangeUsername}/>
            </div>
            <button type="submit" className="btn btn-primary">
              Save
            </button>
          </form>
        </div>
      </div>
      <div className="col-md-8">
        {
          (users) 
          ? renderUsers(users)
          : <p>No hay usuarios registrados</p>
        }
      </div>
    </div>
  )
}

export default FormUser
