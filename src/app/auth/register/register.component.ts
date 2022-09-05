import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

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

  constructor(private fb: FormBuilder) { }

  ngOnInit(): void {
  }

  registrar(): void {
    if (this.miFormulario.invalid) {
      return
    }
    this.miFormulario.reset()
  }

}
