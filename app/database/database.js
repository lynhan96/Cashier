import * as firebase from 'firebase'

const config = {
  apiKey: 'AIzaSyBYHMW0Ujfq1OOo0Kx9AJcrCtsK0pu6uMg',
  authDomain: 'restaurant-8fb75.firebaseapp.com',
  databaseURL: 'https://restaurant-8fb75.firebaseio.com',
  projectId: 'restaurant-8fb75',
  storageBucket: 'restaurant-8fb75.appspot.com',
  messagingSenderId: '138275142864'
}

export const firebaseApp = firebase.initializeApp(config)

export const database = firebaseApp.database()

export const firebaseAuth = firebaseApp.auth()

export const timestamp = firebase.database.ServerValue.TIMESTAMP
