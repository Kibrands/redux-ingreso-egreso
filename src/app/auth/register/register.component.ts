import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';

import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {

  miFormulario: FormGroup = this.fb.group({
    nombre: ['',[Validators.required,Validators.minLength(6)]],
    email: ['',[Validators.required,Validators.email]],
    password: ['',[Validators.required,Validators.minLength(8)]]
  })

  constructor(
    private fb: FormBuilder,
    private authService: AuthService,
    private router: Router
  ) { }

  ngOnInit(): void {
  }

  registrar(): void {
    if (this.miFormulario.invalid) {
      return
    }
    Swal.fire({
      title: 'Registrando usuario',
      html: 'Espere un momento...',
      didOpen: () => {
        Swal.showLoading()
        const {nombre,email,password} = this.miFormulario.value;
        this.authService.crearUsuario(nombre,email,password)
        .then(credenciales => {
          this.miFormulario.reset()
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
