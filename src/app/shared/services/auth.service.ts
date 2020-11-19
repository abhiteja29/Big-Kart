import { UserService } from "./user.service";
import { AppUser } from "../models/app-user";
import { ActivatedRoute } from "@angular/router";
import { Observable } from "rxjs/Observable";
import { AngularFireAuth } from "angularfire2/auth";
import { Injectable } from "@angular/core";
import "rxjs/add/operator/switchMap";
import "rxjs/add/observable/of";
import * as firebase from "firebase";
import { BehaviorSubject } from "rxjs";
import { AngularFireDatabase } from "angularfire2/database";

@Injectable()
export class AuthService {
  private eventAuthError = new BehaviorSubject<string>("");
  eventAuthError$ = this.eventAuthError.asObservable();
  user$: Observable<firebase.User>;
  newUser: any;
  constructor(
    private userService: UserService,
    private afAuth: AngularFireAuth,
    private db: AngularFireDatabase,
    private route: ActivatedRoute
  ) {
    this.user$ = afAuth.authState;
  }

  createUser(user) {
    let returnUrl = this.route.snapshot.queryParamMap.get("returnUrl") || "/";
    localStorage.setItem("returnUrl", returnUrl);
    this.afAuth.auth
      .createUserWithEmailAndPassword(user.email, user.password)
      .then((userCredential) => {
        this.newUser = user;

        userCredential.updateProfile({
          displayName: user.firstName + " " + user.lastName,
        });
        this.insertUser(userCredential).then(() => {
          returnUrl;
        });
      })
      .catch((error) => {
        // this.eventAuthError.next(error);
      });
  }

  insertUser(userCredential) {
    return this.db.object(`users/${userCredential.uid}`).update({
      email: this.newUser.email,
      firstName: this.newUser.firstName,
      lastName: this.newUser.lastName,
    });
  }

  logInUser(email: string, password: string) {
    let returnUrl = this.route.snapshot.queryParamMap.get("returnUrl") || "/";
    localStorage.setItem("returnUrl", returnUrl);

    this.afAuth.auth
      .signInWithEmailAndPassword(email, password)
      .then((userCredential) => {
        if (userCredential) {
          returnUrl;
        }
      })
      .catch((error) => {
        // this.eventAuthError.next(error);
      });
  }

  forgotPassword(email: string) {
    this.afAuth.auth
      .sendPasswordResetEmail(email)
      .then(() => {
        alert(`A password reset email is sent to your email address.`);
      })
      .catch((error) => {
        // this.eventAuthError.next(error);
      });
  }

  logout() {
    this.afAuth.auth.signOut();
  }

  get appUser$(): Observable<AppUser> {
    return this.user$.switchMap((user) => {
      if (user) return this.userService.get(user.uid);

      return Observable.of(null);
    });
  }
}
