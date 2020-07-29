/* eslint-disable no-unused-vars */
/* eslint-disable import/prefer-default-export */
import firebase from 'firebase';

const firebaseConfig = {
  apiKey: 'AIzaSyAdJ7KepoRyriPZhUR6rxH8d_R79wpL6Hg',
  authDomain: 'firenotes-d60f3.firebaseapp.com',
  databaseURL: 'https://firenotes-d60f3.firebaseio.com',
  projectId: 'firenotes-d60f3',
  storageBucket: 'firenotes-d60f3.appspot.com',
  messagingSenderId: '575715863882',
  appId: '1:575715863882:web:341e6bec713dafe331a5b3',
  measurementId: 'G-95WL78D2QD',
};
  // Initialize Firebase
firebase.initializeApp(firebaseConfig);

const db = firebase.database();

export function fetchNotes(callback) {
  db.ref('notes').on('value', (snapshot) => {
    const newNoteState = snapshot.val();
    callback(newNoteState);
  });
}

export function addNote(noteInfo) {
  db.ref('notes').push(noteInfo);
}

export function removeNote(id) {
  db.ref('notes').child(id).remove();
}

export function updateNote(id, noteInfo) {
  db.ref('notes').child(id).update(noteInfo);
}
