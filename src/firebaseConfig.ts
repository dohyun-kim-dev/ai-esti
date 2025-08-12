import { initializeApp, getApps, getApp, FirebaseOptions } from 'firebase/app'
import { getAuth } from 'firebase/auth'
import { getFirestore } from 'firebase/firestore'
import { getStorage } from 'firebase/storage'
import { getAI } from 'firebase/ai'
import { devLog } from '@/utils/devLogger'

const firebaseConfig: FirebaseOptions = {
  apiKey: process.env.NEXT_PUBLIC_FIREBASE_API_KEY,
  authDomain: process.env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN,
  projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID,
  storageBucket: process.env.NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: process.env.NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID,
  appId: process.env.NEXT_PUBLIC_FIREBASE_APP_ID,
}

let app
devLog('>>>> Firebase Config: Attempting initialization...')
if (!getApps().length) {
  try {
    app = initializeApp(firebaseConfig)
    devLog('>>>> Firebase Config: Initialized successfully:', app.name)
  } catch (error) {
    console.error('>>>> Firebase Config: Error during initializeApp:', error)
  }
} else {
  app = getApp()
  devLog('>>>> Firebase Config: App already exists, getting app:', app.name)
}

const auth = getAuth(app)
const db = app ? getFirestore(app) : null
const storage = app ? getStorage(app) : null
const ai = app ? getAI(app) : null

export { app, auth, db, storage, ai }
