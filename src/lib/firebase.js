import firebase from 'firebase/app';
import 'firebase/firestore';
import 'firebase/storage';
import firebaseConfig from '../config/firebaseConfig.js';

// Initialize Cloud Firestore through Firebase
firebase.initializeApp(firebaseConfig);

// Get a reference to the database service
let db = firebase.firestore();

// Get a reference to the storage service, which is used to create references in your storage bucket
let storage = firebase.storage();

// Define re-usable functions
export function getMessages() {
  return db.collection('messages').get();
}

export function postMessage(payload) {
  return db.collection('messages').add(payload);
}

export function setMessageListener(successCallback, errorCallback) {
  return db.collection('messages')
    .orderBy('date', 'desc')
    .limit(10)
    .onSnapshot(function (querySnapshot) {
      successCallback(querySnapshot);
    }, function (error) {
      errorCallback(error);
    });
}

export function getMessagesStartAfter(lastVisible) {
  return db.collection('messages')
    .orderBy('date', 'desc')
    .startAfter(lastVisible)
    .limit(10)
    .get();
}

export function getUser() {
  return firebase.auth().currentUser;
}

export function updateUserDisplayName(user, displayName) {
  user.updateProfile({ displayName: displayName });
}

export function updateUserPhoto(user, photoURL) {
  user.updateProfile({ photoURL: photoURL });
}

export function setUserInFirestore(user) {
  return db.collection('users').doc(user.uid).set({
    userName: user.displayName,
    avatarURL: user.photoURL,
  });
}

export function getUserById(userId) {
  return db.collection('users').doc(userId).get();
}

export async function uploadUserPhoto(file, userId) {
  // const timestamp = Number(new Date());
  const storageRef = await storage.ref(userId);
  const snapshot = await storageRef.put(file);
  return snapshot.ref.getDownloadURL();
}