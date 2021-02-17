import Header from './components/Header'
import Tasks from './components/Tasks'
import AddTask from './components/AddTask'
import {useState, useEffect} from 'react'
import firebase from './firebase'
import SnapshotFirebase from './SnapshotFirebase'

function App() {
 
  const get = false;

  return (
    <SnapshotFirebase />
  );
}

export default App;