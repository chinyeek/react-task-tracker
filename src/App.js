import Header from './components/Header'
import Tasks from './components/Tasks'
import AddTask from './components/AddTask'
import {useState, useEffect} from 'react'
import firebase from './firebase'

function App() {
  const [showAddTask, setShowAddTask] = useState(false);
  const [loading, setLoading] = useState(false);
  const [tasks, setTasks] = useState([]);

  // const [tasks, setTasks] = useState([
    //   {
      //     id: 1,
      //     text: 'doctors appointment',
      //     day: '05/02/2021 at 14:30',
      //     reminder: true,
      //   },
      //   {
        //     id: 2,
        //     text: 'meeting at school',
  //     day: '12/02/2021 at 18:30',
  //     reminder: true,
  //   },
  //   {
    //     id: 3,
  //     text: 'food shopping',
  //     day: '06/02/2021 at 10:30',
  //     reminder: false,
  //   }
  // ]);
   
  // Add task function
  const addTask = (task) => {
    const id = Math.floor(Math.random() * 10000) + 1;
    const newTask = {id, ...task};
    setTasks([...tasks, newTask]);
  };
  
  // Delete task function
  const deleteTask = (id) => {
    setTasks(tasks.filter((t) => t.id !== id));
  };
  
  // Toggle reminder function
  const toggleReminder = (id) => {
    setTasks(tasks.map((t) => {
      if(t.id === id){
        // returns every props in t as they are except the "reminder" prop
        // set "reminder" prop to the opposite of what it used to be
        return { ...t, reminder: !t.reminder};
      } else {
        return t;
      }
    }))
  };
  
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

export default App;