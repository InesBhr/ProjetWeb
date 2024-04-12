// dashboard.component.ts

import { Component } from "@angular/core";
import { ReactiveFormsModule } from "@angular/forms";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { Firestore, getDocs } from "@angular/fire/firestore";
import { addDoc, collection, doc, updateDoc } from "firebase/firestore";
import { Storage, ref, uploadBytesResumable } from "@angular/fire/storage";
import { getDownloadURL } from "@angular/fire/storage";
import { CreateQuotation, Status } from "src/app/core/models/quotation.model";
import { Auth } from "@angular/fire/auth";
import { User } from "firebase/auth";
import { getAuth } from "@angular/fire/auth";

@Component({
  selector: "app-dashboard",
  templateUrl: "./dashboard.component.html",
  styleUrls: ["./dashboard.component.scss"],
  standalone: true,
  imports: [ReactiveFormsModule],
})
export class DashboardComponent {
  quoteForm: FormGroup;
  quotation?: CreateQuotation;
  userId?: string;
  url: string = "";

  constructor(private formBuilder: FormBuilder, private firestore: Firestore, private storage: Storage, private afAuth: Auth) {
    this.quoteForm = this.formBuilder.group({
      title: ["", Validators.required],
      description: ["", Validators.required],
      image: ["", Validators.required],
    });
  }

  public async onPhotoSelected(event: any) {
    const image = event.target.files[0];
    const storageRef = ref(this.storage, image.name);
    const uploadTask = await uploadBytesResumable(storageRef, image);
    this.url = await getDownloadURL(uploadTask.ref);
  }

  async submitQuote() {
    const auth = getAuth();
    const user: User | null = auth.currentUser;
    if (user) {
      this.userId = user.uid;
    }
    const usersCollection = collection(this.firestore, "Utilisateurs");
    const usersData = await getDocs(usersCollection);
    const usersDataCollection: any = [];
    usersData.docs.forEach((user) => {
      usersDataCollection.push({ ...user.data(), id: user.id });
    });
    const userId = usersDataCollection.find((utilisateur: User) => utilisateur.email === user?.email ?? "");

    this.quotation = {
      title: this.quoteForm.value.title,
      description: this.quoteForm.value.description,
      images: this.url,
      id_user: userId.id,
      status: Status.progress,
    };
    const docSnap = await addDoc(collection(this.firestore, "quotation"), {
      ...this.quotation,
    });

    const docRef = doc(this.firestore, "quotation", docSnap.id);
    await updateDoc(docRef, { ...this.quotation, id: docSnap.id });

    this.quoteForm.reset();

    alert("Votre demande a été envoyé avec succès!");
  }
}
