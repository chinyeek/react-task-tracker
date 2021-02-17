import firebase from 'firebase/app'
import 'firebase/firestore'

const firebaseConfig = {
  apiKey: "AIzaSyDUQZO9wIwiknFdhC0GmdavPjLmoNXlznw",
  authDomain: "chinyeekarwehl-task-tracker.firebaseapp.com",
  projectId: "chinyeekarwehl-task-tracker",
  storageBucket: "chinyeekarwehl-task-tracker.appspot.com",
  messagingSenderId: "554490262600",
  appId: "1:554490262600:web:ac0b644394b0d7bc23147d"
};
// Initialize Firebase
firebase.initializeApp(firebaseConfig);

export default firebase;