import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FlexLayoutModule } from "@angular/flex-layout";
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatListModule } from '@angular/material/list';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { MatToolbarModule } from '@angular/material/toolbar';
import { AppRoutingModule } from '../app-routing.module';
import { HeaderComponent } from './header/header.component';
import { NotFoundComponent } from './not-found/not-found.component';

@NgModule({
  declarations: [HeaderComponent, NotFoundComponent],
  imports: [
    AppRoutingModule,
    CommonModule,
    MatToolbarModule,
    MatButtonModule,
    MatIconModule,
    MatSnackBarModule,
    FlexLayoutModule,
    MatSidenavModule,
    MatListModule
  ],
  exports: [HeaderComponent, NotFoundComponent],
})
export class SharedModule {}
