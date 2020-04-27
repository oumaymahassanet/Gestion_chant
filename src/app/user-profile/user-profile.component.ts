import { Component, OnInit } from '@angular/core';
import { UserService } from '../shared/user.service';


import { Chant } from '../shared/chant.model';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { FlashMessagesService } from 'angular2-flash-messages';

declare var M: any;

@Component({
  selector: 'app-user-profile',
  templateUrl: './user-profile.component.html',
  styleUrls: ['./user-profile.component.css'],
  providers: [UserService]

})
export class UserProfileComponent implements OnInit {

  userDetails;

  constructor(public userService: UserService, private router: Router) { }

  ngOnInit() {
    this.userService.getUserProfile().subscribe(
      res => {
        this.userDetails = res['user'];
      },
      err => {
        console.log(err);

      }
    );
    this.resetForm();
    this.refreshChantList();
  }
  onLogout(){
    this.userService.deleteToken();
    this.router.navigate(['/login']);
  }

  refreshChantList() {
    this.userService.getChant().subscribe((res) => {
      this.userService.chant = res as Chant[];
    });
  }

  resetForm(form?: NgForm) {
    if (form)
      form.reset();
    this.userService.selectedchant = {
      _id: "",
      name: "",
      contenu: "",
      dateCreation: null

    }
  }
  onSubmit(form: NgForm) {
    if (form.value._id == "") {
      this.userService.postChant(form.value).subscribe((res) => {
        this.resetForm(form);
        this.refreshChantList();
        M.toast({ html: 'Saved successfully', classes: 'rounded' });
      });
    }
    else {
      this.userService.putChant(form.value).subscribe((res) => {
        this.resetForm(form);
        this.refreshChantList();
        M.toast({ html: 'Updated successfully', classes: 'rounded' });
      });
    }
  }
  onEdit(ch: Chant) {
    this.userService.selectedchant = ch;
  }

  onDelete(_id: string, form: NgForm) {
    if (confirm('Are you sure to delete this record ?') == true) {
      this.userService.deleteChant(_id).subscribe((res) => {
        this.refreshChantList();
        this.resetForm(form);
        M.toast({ html: 'Deleted successfully', classes: 'rounded' });
      });
    }
  }





}
