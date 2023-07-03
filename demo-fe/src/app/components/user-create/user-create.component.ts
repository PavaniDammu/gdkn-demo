import { Component, OnInit } from '@angular/core';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-user-create',
  templateUrl: './user-create.component.html',
  styleUrls: ['./user-create.component.css']
})
export class UserCreateComponent implements OnInit {
  user = {
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    dob: '',
    gender: ''
  };
  submitted = false;

  constructor(private userService: UserService) { }

  ngOnInit() {
  }

  saveUser() {
    const data = this.user;

    this.userService.create(data)
      .subscribe(response => {
          this.submitted = true;
        },
        error => {console.log(error);});
  }

  newuser() {
    this.submitted = false;
    this.user = {
      firstName: '',
      lastName: '',
      email: '',
      phone: '',
      dob: '',
      gender: ''
    };
  }

}
