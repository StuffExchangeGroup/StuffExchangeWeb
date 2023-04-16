import { NgxSpinnerModule } from 'ngx-spinner';
import { ToastrModule } from 'ngx-toastr';
import { HashLocationStrategy, LocationStrategy } from '@angular/common';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AngularFireModule } from '@angular/fire/compat';
import { AngularFireMessagingModule } from '@angular/fire/compat/messaging';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { CanActivatePermission } from './common/guards/can-activate-permission';
import { httpInterceptorProviders } from './interceptors';
import { NgxPaginationModule } from 'ngx-pagination';
import { LayoutComponent } from './layout/layout.component';
import { BsDatepickerModule } from 'ngx-bootstrap/datepicker';
import { initializeApp, provideFirebaseApp } from '@angular/fire/app';
import { environment } from '../environments/environment';
import { provideAuth, getAuth } from '@angular/fire/auth';
import { provideDatabase, getDatabase } from '@angular/fire/database';
import { provideMessaging, getMessaging } from '@angular/fire/messaging';
// import { AngularDayjsModule } from 'angular-dayjs';


@NgModule({
    declarations: [
        AppComponent,
        LayoutComponent
    ],
    imports: [
        BrowserAnimationsModule,
        BrowserModule.withServerTransition({ appId: 'serverApp' }),
        AppRoutingModule,
        HttpClientModule,
        ToastrModule.forRoot(),
        NgxPaginationModule,
        BsDatepickerModule.forRoot(),
        AngularFireModule.initializeApp(environment.firebase),
        provideAuth(() => getAuth()),
        provideDatabase(() => getDatabase()),
        provideMessaging(() => getMessaging()),
    ],
    providers: [
        CanActivatePermission,
        httpInterceptorProviders,
        {
            provide: LocationStrategy,
            useClass: HashLocationStrategy
        }
    ],
    bootstrap: [AppComponent]
})
export class AppModule { }
