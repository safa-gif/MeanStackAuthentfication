import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthServiceService } from 'src/app/shared/auth-service.service';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent implements OnInit {
  signupForm: FormGroup;
  constructor(public fb: FormBuilder, public authSer: AuthServiceService, public router: Router) {
    this.signupForm = this.fb.group({
      name: [''],
      email: [''],
      telephone: [''],
      password: [''],
    });
   }
  ngOnInit() {

  }
  registerUser() {
    this.authSer.signUp(this.signupForm.value).subscribe((res) => {
      // console.log(name)
      if (res.result) {
        this.signupForm.reset();
        this.router.navigate(['login']);
      }
    });
  }
}
