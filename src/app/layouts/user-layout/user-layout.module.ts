import { FormsModule } from '@angular/forms';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { UserLayoutRoutes } from './user-layout.routing';
import { UserLayoutComponent } from './user-layout.component';
import { FooterComponent } from './components/footer/footer.component';
import { HeaderComponent } from './components/header/header.component';



@NgModule({
    declarations: [
        UserLayoutComponent,
        FooterComponent,
        HeaderComponent
    ],
    imports: [
        RouterModule.forChild(UserLayoutRoutes),
        CommonModule,
        FormsModule,
    ]
})
export class UserLayoutModule { }
