import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { map, Subscription } from 'rxjs';
import { Usuario } from '../models/usuario.model';
import { Store } from '@ngrx/store';
import * as authActions from '../auth/auth.actions';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  userSubscription!: Subscription;

  constructor(
    public auth: AngularFireAuth,
    private firestore: AngularFirestore,
    private store: Store
  ) { }

  initAuthListener() {
    this.auth.authState.subscribe(fuser => {
      if(fuser) {
        this.userSubscription = this.firestore.doc(`${fuser.uid}/usuario`).valueChanges()
          .subscribe(firestoreUser => {
            const tempUser = Usuario.fromFirebase(firestoreUser);
            this.store.dispatch(authActions.setUser({user:tempUser}))
          })
      } else {
        if(this.userSubscription) {
          this.userSubscription.unsubscribe()
        }
        this.store.dispatch(authActions.unSetUser())
      }
    })
  }

  crearUsuario(nombre: string, email: string, password: string) {
    return this.auth.createUserWithEmailAndPassword(email,password)
      .then(fbUser => {
        const newUser = new Usuario(fbUser.user!.uid, nombre, email);
        return this.firestore
          .doc(`${newUser.uid}/usuario`)
          .set({...newUser})
      })
  }

  login(email: string, password: string) {
    return this.auth.signInWithEmailAndPassword(email,password)
  }

  logout() {
    return this.auth.signOut()
  }

  isAuth() {
    return this.auth.authState.pipe(
      map(fbUser => fbUser != null)
    )
  }
}
