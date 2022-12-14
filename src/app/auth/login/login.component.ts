import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';
import Swal from 'sweetalert2';

import { AuthService } from '../../services/auth.service';
import { AppState } from '../../app.reducer';
import * as ui from '../../shared/ui.actions';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit, OnDestroy {

  loginForm: FormGroup = this.fb.group({
    email: ['',[Validators.required,Validators.email]],
    password: ['',[Validators.required,Validators.minLength(8)]]
  });

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

  login(): void {
    if(this.loginForm.invalid) {
      return
    }

    this.store.dispatch(ui.isLoading())
    
    const {email,password} = this.loginForm.value;
    this.authService.login(email,password)
    .then(credenciales => {
      this.loginForm.reset()
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
