import { Injectable } from "@angular/core";
import { initializeApp } from "firebase/app";
import { Firestore, getFirestore, collection, addDoc, doc, updateDoc, DocumentData, CollectionReference, onSnapshot, QuerySnapshot, getDoc, query, where } from "firebase/firestore";
import { Subject } from "rxjs";
import { environment } from "src/environments/environment";
import { User } from "../models/user.model";
import { Quotation } from "../models/quotation.model";

@Injectable({
  providedIn: "root",
})
export class FirebaseService {
  db: Firestore;
  userCol: CollectionReference<DocumentData>;
  quotationCol: CollectionReference<DocumentData>;
  private updatedSnapshotEvent = new Subject<QuerySnapshot<DocumentData>>();
  obsr_UpdatedSnapshotEvent = this.updatedSnapshotEvent.asObservable();

  constructor() {
    initializeApp(environment.firebaseConfig);
    this.db = getFirestore();
    this.quotationCol = collection(this.db, "quotation");
    this.userCol = collection(this.db, "Utilisateurs");
  }

  async createUser(user: Partial<User>) {
    const docSnap = await addDoc(this.userCol, {
      ...user,
    });

    const docRef = doc(this.db, "Utilisateurs", docSnap.id);
    await updateDoc(docRef, { ...user, id: docSnap.id });
    return;
  }

  async createQuotation(quotation: Quotation) {
    await addDoc(this.quotationCol, {
      ...quotation,
    });
    return;
  }
}
