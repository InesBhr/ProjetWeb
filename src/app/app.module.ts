import { NgModule } from "@angular/core";
import { BrowserModule } from "@angular/platform-browser";
import { AppRoutingModule } from "./app-routing.module";
import { AppComponent } from "./app.component";
import { CoreModule } from "./core/core.module";
import { SharedModule } from "./shared/shared.module";
import { HomeModule } from "./home/home.module";
import { BrowserAnimationsModule } from "@angular/platform-browser/animations";
import { initializeApp, provideFirebaseApp } from "@angular/fire/app";
import { getAuth, provideAuth } from "@angular/fire/auth";
import { getFirestore, provideFirestore } from "@angular/fire/firestore";
import { LoginComponent } from "./authentification/login/login.component";
import { RegisterComponent } from "./authentification/register/register.component";
import { ReactiveFormsModule, FormsModule } from "@angular/forms";
import { environment } from "src/environments/environment";
import { MatInputModule } from "@angular/material/input";
import { getStorage, provideStorage } from "@angular/fire/storage";
import { RouterModule } from "@angular/router";

@NgModule({
  declarations: [AppComponent, LoginComponent, RegisterComponent],

  imports: [
    MatInputModule,
    ReactiveFormsModule,
    FormsModule,
    BrowserModule,
    AppRoutingModule,
    CoreModule,
    SharedModule,
    HomeModule,
    RouterModule,
    BrowserAnimationsModule,
    provideFirebaseApp(() => initializeApp(environment.firebaseConfig)),
    provideAuth(() => getAuth()),
    provideFirestore(() => getFirestore()),
    provideStorage(() => getStorage()),
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
