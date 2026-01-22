import { Component, EventEmitter, Input, Output, OnChanges, SimpleChanges, output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { DialogModule } from 'primeng/dialog';
import { InputTextModule } from 'primeng/inputtext';
import { InputSwitchModule } from 'primeng/inputswitch';
import { ButtonModule } from 'primeng/button';


@Component({
  selector: 'app-user-form',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    DialogModule,
    InputTextModule,
    InputSwitchModule,
    ButtonModule
  ],
  templateUrl: './user-form.component.html',
  styleUrl: './user-form.component.scss'
})
export class UserFormComponent implements OnChanges {
  @Input() visible: boolean = false;
  @Input() userData: any = null;
  @Output() visibleChange = new EventEmitter<boolean>();
  @Output() onSave = new EventEmitter<any>();
  @Output() onCancel = new EventEmitter<void>();
  
  isEditMode: boolean = false;
  userForm: any = { name: '', mail: '', phone: '', is_active: 1 };

  ngOnChanges(changes: SimpleChanges) {
    if (changes['userData'] && this.userData) {
      this.isEditMode = true;
      this.userForm = { ...this.userData };
    } else if (changes['visible'] && !this.visible && !this.userData) {
      this.isEditMode = false;
      this.resetForm();
  }
}
  save() {
    this.onSave.emit(this.userForm);
  }

  cancel() {
    this.resetForm();
    this.visibleChange.emit(false);
    this.onCancel.emit();
  }
  closeDialog() {
    this.cancel();
  }

  private resetForm() {
    this.userForm = { id: null, name: '', mail: '', phone: '', is_active: 1 };
  }

  get dialogTitle(): string {
    return this.isEditMode ? 'Editar Usuario' : 'Crear Usuario';
  }

  get saveButtonLabel(): string {
    return this.isEditMode ? 'Actualizar' : 'Crear';
  } 
    }