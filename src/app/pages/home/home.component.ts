import { Component, OnInit } from '@angular/core';
import { AngularFireDatabase } from '@angular/fire/database';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
})
export class HomeComponent implements OnInit {
  users = [];
  posts = [];

  isLoading = false;

  constructor(private db: AngularFireDatabase, private toastr: ToastrService) {
    this.isLoading = true;

    //Get All Users
    db.object('/users')
      .valueChanges()
      .subscribe((obj) => {
        if (obj) {
          this.users = Object.values(obj); //syntax to convert all objects into array and store them into a variable
          this.isLoading = false;
        } else {
          this.toastr.error('NO User Found');
          this.users = [];
          this.isLoading = false;
        }
      });

    //Grab All Posts From Firebase
    db.object('/posts')
      .valueChanges()
      .subscribe((obj) => {
        if (obj) {
          this.posts = Object.values(obj).sort((a, b) => b.date - a.date);
          this.isLoading = false;
        } else {
          this.toastr.error('No Post To Display');
          this.posts = [];
          this.isLoading = false;
        }
      });
  }

  ngOnInit(): void {}
}
