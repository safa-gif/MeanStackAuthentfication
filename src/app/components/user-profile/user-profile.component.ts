import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { AuthServiceService } from 'src/app/shared/auth-service.service';

@Component({
  selector: 'app-user-profile',
  templateUrl: './user-profile.component.html',
  styleUrls: ['./user-profile.component.css']
})
export class UserProfileComponent  implements OnInit{
  currentUser: any = {};


  constructor(public authService: AuthServiceService,
    private actRoute: ActivatedRoute) {

    }
    ngOnInit(){
      console.log(this.actRoute.snapshot.paramMap.get("id"));
        this.authService.getUserProfile(this.actRoute.snapshot.paramMap.get("id")).subscribe((data)=>{
         this.currentUser = data
        })
      // this.authService.getUserProfile(id).subscribe((res) => {
      //   this.currentUser = res;
      // });
      // console.log(this.currentUser)
      // this.actRoute.snapshot.paramMap.get('_id')

    }
}
