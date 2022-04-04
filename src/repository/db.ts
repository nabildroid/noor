import {
  connectFirestoreEmulator,
  Firestore,
  getFirestore,
  doc,
  
  onSnapshot,
} from "firebase/firestore";
import { emulator, firebaseApp } from "../main";
import { Teacher } from "../models/home_model";

export default class DB {
  private firestore: Firestore;
  private static _instance?: DB;

  static get instance() {
    if (!DB._instance) {
      DB._instance = new DB();
    }
    return DB._instance!;
  }
  constructor() {
    this.firestore = getFirestore(firebaseApp);

    if (emulator) {
      connectFirestoreEmulator(this.firestore, "localhost", 8080);
    }
  }

  subscribeToTeacher(id: string, listener: (teacher: Teacher) => void) {
      console.log("fetching ",id);
    const teacherDoc = doc(this.firestore, `users/${id}`);

    return onSnapshot(teacherDoc, {}, (snapshot) => {
      if (snapshot.exists()) {
          console.log(snapshot.id);
        listener(snapshot.data() as Teacher);
      }
    });
  }

  
}
