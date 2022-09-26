import { Component, OnInit, OnDestroy } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';

import { AuthService } from '../../services/auth.service';
import { AppState } from '../../app.reducer';
import { Store } from '@ngrx/store';
import { Subscription } from 'rxjs';
import * as ui from '../../shared/ui.actions';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit, OnDestroy {

  miFormulario: FormGroup = this.fb.group({
    nombre: ['',[Validators.required,Validators.minLength(6)]],
    email: ['',[Validators.required,Validators.email]],
    password: ['',[Validators.required,Validators.minLength(8)]]
  })

  cargando: boolean = false;

  uiSubscription!: Subscription;

  constructor(
    private fb: FormBuilder,
    private authService: AuthService,
    private router: Router,
    private store: Store<AppState>
  ) { }

  ngOnInit(): void {
    this.uiSubscription = this.store.select('ui').subscribe(ui => this.cargando = ui.isLoading)
  }

  ngOnDestroy(): void {
    this.uiSubscription.unsubscribe()
  }

  registrar(): void {
    if (this.miFormulario.invalid) {
      return
    }

    this.store.dispatch(ui.isLoading())

    const {nombre,email,password} = this.miFormulario.value;
    this.authService.crearUsuario(nombre,email,password)
    .then(credenciales => {
      this.miFormulario.reset()
      this.store.dispatch(ui.stopLoading())
      this.router.navigate(['/'])
    }).catch(err => {
      this.store.dispatch(ui.stopLoading())
      Swal.fire({
        icon: 'error',
        title: 'Oops...',
        text: err.message
      })
    });

  }

}
