import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';

import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  loginForm: FormGroup = this.fb.group({
    email: ['',[Validators.required,Validators.email]],
    password: ['',[Validators.required,Validators.minLength(8)]]
  });

  constructor(
    private fb: FormBuilder,
    private authService: AuthService,
    private router: Router
  ) { }

  ngOnInit(): void {
  }

  login(): void {
    if(this.loginForm.invalid) {
      return
    }
    
    Swal.fire({
      title: 'Accediendo',
      html: 'Espere un momento...',
      didOpen: () => {
        Swal.showLoading()
        const {email,password} = this.loginForm.value;
        this.authService.login(email,password)
        .then(credenciales => {
          this.loginForm.reset()
          Swal.close()
          this.router.navigate(['/'])
        }).catch(err => {
          Swal.fire({
            icon: 'error',
            title: 'Oops...',
            text: err.message
          })
        });
      }
    })
  }

}
