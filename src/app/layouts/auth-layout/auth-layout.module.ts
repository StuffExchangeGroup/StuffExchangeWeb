import { AuthLayoutComponent } from './auth-layout.component';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { AuthLayoutRoutes } from './auth-layout.routing';
import { FooterComponent } from './components/footer/footer.component';
import { HeaderComponent } from './components/header/header.component';
import { UserLayoutModule } from '../user-layout/user-layout.module';

@NgModule({
    imports: [
        CommonModule,
        RouterModule.forChild(AuthLayoutRoutes),
        FormsModule,
        UserLayoutModule
    ],
    declarations: [
        AuthLayoutComponent,
        FooterComponent,
        HeaderComponent

    ]
})
export class AuthLayoutModule { }
