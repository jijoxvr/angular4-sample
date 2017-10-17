import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import {
  MatButtonModule,
  MatCheckboxModule,
  MatInputModule,
  MatListModule,
  MatProgressBarModule,
  MatProgressSpinnerModule,
  MatSelectModule,
  MatTabsModule,
  MatToolbarModule,
  MatSnackBarModule,
  MatSidenavModule,
  MatIconModule,
  MatCardModule,
  MatFormFieldModule,
  MatSortModule,
  MatTableModule,
  MatPaginatorModule,
  
  
} from '@angular/material';


const modules = [
  CommonModule,
  FormsModule,
  MatButtonModule,
  MatCheckboxModule,
  MatInputModule,
  MatListModule,
  MatSelectModule,
  MatProgressSpinnerModule,
  MatProgressBarModule,
  MatSelectModule,
  MatSnackBarModule,
  MatTabsModule,
  MatToolbarModule,
  MatSidenavModule,
  MatIconModule,
  MatCardModule,
  MatFormFieldModule,
  MatSortModule,
  MatTableModule,
  MatPaginatorModule
  
];

@NgModule({
  imports: [ modules ],
  exports: [ modules ],
  declarations: [],
})
export class MaterialModule { }