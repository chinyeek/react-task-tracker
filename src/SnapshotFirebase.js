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

  // Read data from Firestore
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

  // Add task to Firestore
  const addTask = (task) => {
    const id = uuidv4();
    const newTask = {id, ...task};
    fbCol.doc(id).set(newTask).catch((error) => {console.error("Error adding document:", error)});
  };
  
  // Delete task from Firestore
  const deleteTask = (id) => {
    fbCol.doc(id).delete().catch((error) => {console.error("Error removing document: ", error)});
  };
  
  // Toggle reminder - Update Reminder value in Firestore
  const toggleReminder = (id) => {
    fbCol.doc(id).get()
      .then(d => {
        if(d.exists){
          let reminderStatus = d.data().reminder;
          fbCol.doc(id).update({
            "reminder": !reminderStatus,
          });
        } else {
          console.log("no such document");
        }
      })
      .catch(error => {console.log("Error getting data by id: ", error)});
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