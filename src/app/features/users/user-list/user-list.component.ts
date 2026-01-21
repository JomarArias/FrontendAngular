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


@Component({
  selector: 'app-user-list',
  standalone: true,
  imports: [CommonModule, TableModule, ButtonModule, TagModule, FormsModule, DialogModule, InputTextModule, InputSwitchModule],
  templateUrl: './user-list.component.html',
  styleUrl: './user-list.component.scss'
})
export class UserListComponent implements OnInit{ 
  user: any[] = [];
  displayDialog: boolean = false;
  newUser = {name:'', mail:'', phone:'', is_active: 1};
  constructor(private userService: UserService) { }

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
  console.log('Toggle Status llamado para:', user);
  
  const previousStatus = user.is_active;
  
  user.is_active = !user.is_active;
  console.log('Nuevo estado:', user.is_active);
  
  this.userService.toggleUserStatus(user.id, user.is_active ? 1 : 0).subscribe({
    next: (res) => {
      console.log('Respuesta del servidor:', res);
      console.log('Estado actualizado a:', user.is_active);
    },
    error: (err) => {
      console.error('Error al cambiar estado:', err);
      user.is_active = previousStatus;
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

  confirmDelete(id: number) {
    this.userService.delateUser(id).subscribe(
      () => {
        this.loadUsers();
      },
  )
}
}
