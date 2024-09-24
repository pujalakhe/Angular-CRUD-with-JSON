import { Component, OnInit } from '@angular/core';
import { UserModel } from '../../model/user';
import { FormsModule, NgForm } from '@angular/forms';
import { CommonModule, NgFor, TitleCasePipe } from '@angular/common';
import { UserService } from '../../service/user.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-user',
  standalone: true,
  imports: [FormsModule, TitleCasePipe, CommonModule],
  templateUrl: './user.component.html',
  styleUrl: './user.component.scss',
})
export class UserComponent implements OnInit {
  constructor(
    private userService: UserService,
    private toastrService: ToastrService
  ) {}
  editMode: boolean = false;
  userList: UserModel[] = [];
  user: UserModel = {
    department: '',
    name: '',
    mobile: '',
    email: '',
    gender: '',
    join_date: new Date(),
    salary: 0,
    address: '',
    status: false,
  };
  departmentList: string[] = [
    'Sales',
    'Human Resource',
    'Management',
    'Accountant',
    'IT',
    'Marketing',
    'Customer Service',
    'Research and Development',
    'Legal',
    'Quality Assurance',
    'Business Development',
    'Finance',
    'Administrative',
    'Engineering',
    'Product Management',
  ];
  ngOnInit(): void {
    this.getUserList();
  }
  getUserList() {
    this.userService.getUsers().subscribe((res) => {
      this.userList = res;
    });
  }
  onResetForm(form: NgForm) {
    form.reset();
    this.editMode = false;
    this.getUserList();
  }
  onEditForm(userData: UserModel) {
    this.user = userData;
    this.editMode = true;
  }
  onDeleteForm(id: any) {
    const isConfirm = confirm('Are you sure you want to delete this user');
    if (isConfirm) {
      this.userService.deleteUser(id).subscribe((res) => {
        this.toastrService.error('User Deleted Successfully', 'Deleted');
        this.getUserList();
      });
    }
  }
  onSubmit(form: NgForm): void {
    if (form.valid) {
      if (this.editMode) {
        this.userService.updateUser(this.user).subscribe((res) => {
          this.getUserList();
          this.editMode = false;
          form.reset();
          this.toastrService.success('User updated Successfully', 'Success');
        });
      } else {
        this.userService.addUser(this.user).subscribe((res) => {
          this.getUserList();
          form.reset();
          this.toastrService.success('User Added Successfully', 'Success');
        });
      }
    } else {
      this.toastrService.error('User form is Invalid', 'Invalid');
    }
  }
}
