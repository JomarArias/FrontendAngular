import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TableModule } from 'primeng/table';
import { ButtonModule } from 'primeng/button';
import { TagModule } from 'primeng/tag';
import { OnInit } from '@angular/core';
import { UserService } from '../../../core/services/user.service';
import { FormsModule } from '@angular/forms';
import { DialogModule } from 'primeng/dialog';
import { InputTextModule } from 'primeng/inputtext';
import { InputSwitchModule } from 'primeng/inputswitch';
import { ConfirmDialogModule } from 'primeng/confirmdialog';
import { ConfirmationService } from 'primeng/api';


@Component({
  selector: 'app-user-list',
  standalone: true,
  imports: [CommonModule, TableModule, ButtonModule, TagModule, FormsModule, DialogModule, InputTextModule, InputSwitchModule, ConfirmDialogModule],
  providers: [ConfirmationService],
  templateUrl: './user-list.component.html',
  styleUrl: './user-list.component.scss'
})
export class UserListComponent implements OnInit{ 
  user: any[] = [];
  displayDialog: boolean = false;
  newUser = {name:'', mail:'', phone:'', is_active: 1};
  constructor(private userService: UserService, private confirmationService: ConfirmationService) { }

  ngOnInit(){
    this.loadUsers();
  } 

  saveUser() {
    this.userService.saveUser(this.newUser).subscribe(() => {
      this.loadUsers();
      this.displayDialog = false;
      this.newUser = {name:'', mail:'', phone:'', is_active: 1};
    });
  }
  

toggleStatus(user: any) {
  
  const statusText = user.is_active ? 'inactivo' : 'activo';
  const newStatus = !user.is_active;
    
  this.confirmationService.confirm({
    message: `¿Estás seguro de que deseas cambiar el estado del usuario ${user.name} a ${statusText}?`,
    header: 'Confirmar cambio',
    icon: 'pi pi-exclamation-triangle',
    acceptLabel: 'Sí',
    rejectLabel: 'No',
    accept: () => {
      this.userService.toggleUserStatus(user.id, newStatus ? 1 : 0).subscribe(() => {
        user.is_active = newStatus;
      });
    },
    reject: () => {
      user.is_active = !newStatus;
    }
  });
}

  loadUsers(){ 
    this.userService.getUsers().subscribe(data => {
      this.user = data.map(user => ({
        ...user,
        is_active: user.is_active === 1 || user.is_active === true
      }));
    });
  }
}
