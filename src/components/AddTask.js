import {useState} from 'react'

const AddTask = ({onAdd}) => {
  // these are component level state NOT app level state
  const [text, setText] = useState('');
  const [day, setDay] = useState('');
  const [reminder, setReminder] = useState(false);

  const onSubmit = (e) => {
    e.preventDefault();
    
    // validate if any text exist
    if(!text){
      alert('please add a task');
      return;
    }

    // if it passes the above text validation, we pass one object to the onAdd method, this object has 3 properties
    onAdd({text, day, reminder});

    // clear form again
    setText('');
    setDay('');
    setReminder(false);
  };
  
  return (
    <form className='add-form' onSubmit={onSubmit}>
      <div className="form-control">
        <label>Task</label>
        <input 
          type="text" 
          placeholder='add task' 
          value={text} 
          onChange={(e) => setText(e.target.value)}
        />
      </div>
      <div className="form-control">
        <label>Day & Time</label>
        <input 
          type="text" 
          placeholder='add day & time' 
          value={day} 
          onChange={(e) => setDay(e.target.value)}
        />
      </div>
      <div className="form-control form-control-check">
        <label>Set Reminder</label>
        <input 
          type="checkbox" 
          checked={reminder} 
          value={reminder} 
          onChange={(e) => setReminder(e.currentTarget.checked)}
        />
      </div>
      <input 
        type="submit" 
        value='Save Task' 
        className='btn btn-block'
      />
    </form>
  );
};

export default AddTask;