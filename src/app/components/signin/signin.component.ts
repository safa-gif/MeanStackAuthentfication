import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthServiceService } from 'src/app/shared/auth-service.service';

@Component({
  selector: 'app-signin',
  templateUrl: './signin.component.html',
  styleUrls: ['./signin.component.css']
})
export class SigninComponent implements OnInit{
  signinForm!: FormGroup;
  constructor(public fb: FormBuilder, public authService : AuthServiceService, public router: Router) {
    this.signinForm = this.fb.group({
      email: [''],
      password: [''],
    });
  }
  ngOnInit() {}

  loginUser() {
    this.authService.signIn(this.signinForm.value);
    this.router.navigate(['/dashboard/:id']);
  }
}
