import 'bootstrap/dist/css/bootstrap.min.css'
import './App.css';
import Navigation from './components/Navigation'
import FormNote from './components/FormNote'
import FormUser from './components/FormUser'
import NotesList from './components/NotesList'
import {BrowserRouter as Router, Route} from 'react-router-dom'

function App() {
  return (
    <Router>
      
      <Navigation/>
      <div className="container p-4">
        <Route path="/" exact component={NotesList}/>
        <Route path="/edit/:id" exact component={FormNote}/>
        <Route path="/create" exact component={FormNote}/>
        <Route path="/user" exact component={FormUser}/>
      </div>
    </Router>
  );
}

export default App;
