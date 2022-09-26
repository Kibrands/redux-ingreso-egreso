import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { map } from 'rxjs';
import { Usuario } from '../models/usuario.model';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(
    public auth: AngularFireAuth,
    public firestore: AngularFirestore
  ) { }

  initAuthListener() {
    this.auth.authState.subscribe(fuser => console.log(fuser))
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
