import {useState, useEffect, Fragment} from 'react'
import Header from './components/Header'
import AddTask from './components/AddTask'
import Tasks from './components/Tasks'
import firebase from './firebase'
import { v4 as uuidv4 } from 'uuid'

const SnapshotFirebase = () => {
 
  const [showAddTask, setShowAddTask] = useState(false);
  const [loading, setLoading] = useState(false);
  const [tasks, setTasks] = useState([]);

  // Read data from Firebase Database
  const fbDB = firebase.firestore();
  const fbCol = fbDB.collection('tasks');
  
  function getTasks(){
    setLoading(true);
    fbCol.onSnapshot((querySnapshot) => {
      const items = [];
      querySnapshot.forEach((doc) => {
        items.push(doc.data());
      });
      setTasks(items);
      setLoading(false);
    });
  }

  useEffect(() => {
    getTasks();
  }, []);

  // Add task to Firebase DB
  const addTask = (task) => {
    const id = uuidv4();
    const newTask = {id, ...task};
    fbCol.doc(id).set(newTask).catch((error) => {console.error("Error adding document:", error)});
    setTasks([...tasks, newTask]);
    console.log(tasks);
  };
  
  // Delete task function
  const deleteTask = (id) => {
    fbCol.doc(id).delete().catch((error) => {console.error("Error removing document: ", error)});
    // setTasks(tasks.filter((t) => t.id !== id));
  };
  
  // Toggle reminder function
  const toggleReminder = (id) => {
    fbCol.doc(id).update({
      "reminder": false,
    })
    .catch((error) => {console.log("Error updating document: ", error)});
  }

  if(loading){
    return <h1>Loading ...</h1>
  }

  return (
    // can only return ONE parent element in JSX
    <div className="container">
      <Header onAdd={() => setShowAddTask(!showAddTask)} showForm={showAddTask}/>
      {showAddTask && <AddTask onAdd={addTask}/>}
      <Tasks tasks={tasks} onDelete={deleteTask} onToggle={toggleReminder}/>
    </div>
  );
}

export default SnapshotFirebase;