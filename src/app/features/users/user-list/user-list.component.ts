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
import { ConfirmationService, MessageService } from 'primeng/api';
import { UserFormComponent } from '../user-form/user-form.component';
import { MessagesModule } from 'primeng/messages';
import { ToastModule } from 'primeng/toast';




@Component({
  selector: 'app-user-list',
  standalone: true,
  imports: [
    CommonModule,
    TableModule,
    ButtonModule,
    TagModule,
    FormsModule,
    DialogModule,
    InputTextModule,
    InputSwitchModule,
    ConfirmDialogModule,
    MessagesModule,
    UserFormComponent,
    ToastModule
],

  providers: [ConfirmationService, MessageService],
  templateUrl: './user-list.component.html',
  styleUrl: './user-list.component.scss'
})
export class UserListComponent implements OnInit{ 
  user: any[] = [];
  displayDialog: boolean = false;
  newUser = {name:'', mail:'', phone:'', is_active: 1};
  selectedUser: any = null;

  constructor(
    private userService: UserService,
     private confirmationService: ConfirmationService, 
     private messageService: MessageService
    ) { }

  ngOnInit(){
    this.loadUsers();
  } 
   
  openCreateUserDialog() {
    this.displayDialog = true;
    this.selectedUser = null;
  }
  openEditDialog(user: any) {
    this.selectedUser = { ...user };
    this.displayDialog = true;
  }
  onCancelForm() {
    this.displayDialog = false;
    this.selectedUser = null;
  }

  saveUser(userData: any) {
    if (userData.id) {
      this.userService.updateUser(userData.id, userData).subscribe({
        next: () => {
          this.loadUsers();
          this.displayDialog = false;
          this.messageService.add({
            severity: 'success', 
            summary: 'Éxito', 
            detail: 'Usuario actualizado exitosamente'
          });
        },
        error: () => {
          this.messageService.add({
            severity: 'error', 
            summary: 'Error', 
            detail: 'Error al actualizar el usuario'
        });
      }
      });
    } else {
        this.userService.saveUser(userData).subscribe({
        next: () => {
        this.loadUsers();
        this.displayDialog = false;
        this.messageService.add({
          severity: 'success', 
          summary: 'Éxito', 
          detail: 'Usuario creado exitosamente'
        });
      },
      error: () => {
        this.messageService.add({
          severity: 'error', 
          summary: 'Error', 
          detail: 'Error al crear el usuario'
        });
      }
    });
  }
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
    this.userService.getUsers().subscribe({
      next: (data) => this.user = data.map(user => ({
        ...user,
        is_active: user.is_active === 1 || user.is_active === true
      })),
      error: () => {
        this.messageService.add({
        severity: 'error', 
        summary: 'Error', 
        detail: 'Error al cargar los usuarios'
        })
    }
  });
  }
}
