import {
  connectFirestoreEmulator,
  Firestore,
  getFirestore,
  doc,
  onSnapshot,
  collection,
  addDoc,
  query,
  where,
} from "firebase/firestore";
import { emulator, firebaseApp } from "../main";
import { BackgroundTask, Teacher } from "../models/home_model";

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
    console.log("fetching ", id);
    const teacherDoc = doc(this.firestore, `users/${id}`);

    return onSnapshot(teacherDoc, {}, (snapshot) => {
      if (snapshot.exists()) {
        console.log(snapshot.id);
        listener(snapshot.data() as Teacher);
      }
    });
  }

  subscribeToTasks(
    userId: string,
    listener: (task: BackgroundTask<any>, deleted: boolean) => void
  ) {
    const ref = collection(this.firestore, "tasks");
    const tasksquery = query(
      ref,
      where("user", "==", userId),
      where("completed", "!=", true)
    );

    return onSnapshot(tasksquery, {}, (snapshot) => {
      snapshot.docChanges().forEach((doc) => {
        listener(
          {
            ...doc.doc.data(),
            id: doc.doc.id,
          } as any,
          doc.type == "removed"
        );
      });
    });
  }

  async createTask(task: BackgroundTask<any>) {
    const tasks = collection(this.firestore, "tasks");
    await addDoc(tasks, {
      ...task,
    });
  }
}
