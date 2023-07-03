import { Component, OnInit } from '@angular/core';
import { UserService } from 'src/app/services/user.service';
import { User } from '../models/user.model';

@Component({
  selector: 'app-users-list',
  templateUrl: './users-list.component.html',
  styleUrls: ['./users-list.component.css']
})
export class UsersListComponent implements OnInit {

  users: any;
  currentUser = null;
  currentIndex = -1;

  searchQuery: string = '';
  filteredUsers: any;
  user: any;

  constructor(private userService: UserService) {
  }

  ngOnInit() {
    this.getUsers();
  }

  getUsers() {
    this.userService.getAll()
      .subscribe(data => {
        this.users = data;
        this.user = this.users[0];
        this.showSelectedUser(this.user, 0);
        this.currentUser = this.user;
      },
        error => { console.log(error); });
  }

  showSelectedUser(user, index) {
    this.currentUser = user;
    this.currentIndex = index;
  }

  refreshUsersList() {
    this.getUsers();
    this.currentUser = null;
    this.currentIndex = -1;
  }

  searchUsersByUsername(username: string): User[] {
    return this.users.filter((user: { username: any; }) => {
      return user.username ? username : ''
    });
  }

  onSearch(): void {
    this.filteredUsers = this.searchUsersByUsername(this.searchQuery);
  }
}
