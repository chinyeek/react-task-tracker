import Task from './Task'

const Tasks = ({tasks, onDelete, onToggle}) => {
  return (
    <>
      {tasks.map((t) => (
        // .map method outputs a list
        // the parent of the list, in this case 'h3' MUST have a key property
        <Task 
          key={t.id} 
          task={t} 
          onDelete={onDelete} 
          onToggle={onToggle}
        />
      ))}
    </>
  );
};

export default Tasks;