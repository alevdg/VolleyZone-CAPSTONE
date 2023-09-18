import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { environment } from '../environments/environment';
import { AngularFireModule } from '@angular/fire/compat';
import { DashboardComponent } from './component/dashboard/dashboard.component';
import { LandingPageComponent } from './component/landing-page/landing-page.component';
import { InputTextModule } from 'primeng/inputtext';
import { ButtonModule } from 'primeng/button';
import { TabViewModule } from 'primeng/tabview';
import { DialogModule } from 'primeng/dialog';
import { LogRegisterComponent } from './component/log-register/log-register.component';
import { MenubarModule } from 'primeng/menubar';
import { MenuItem } from 'primeng/api';
import { CardModule } from 'primeng/card';
import { HttpClientModule } from '@angular/common/http';
import { AngularFireAuth, AngularFireAuthModule } from '@angular/fire/compat/auth';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { CarouselModule } from 'primeng/carousel';
import { initializeApp, provideFirebaseApp } from '@angular/fire/app';
import { provideAuth, getAuth } from '@angular/fire/auth';
import { provideDatabase, getDatabase } from '@angular/fire/database';
import { provideFirestore, getFirestore } from '@angular/fire/firestore';
import { provideStorage, getStorage } from '@angular/fire/storage';
import firebase from 'firebase/compat/app';
import { AuthService } from './shared/auth.service';
import { SignInComponent } from './sign-in/sign-in.component';
import { SignUpComponent } from './component/sign-up/sign-up.component';

@NgModule({
  declarations: [
    AppComponent,
    LogRegisterComponent,
    DashboardComponent,
    LandingPageComponent,
    SignInComponent,
    SignUpComponent,

  ],
  imports: [
    BrowserModule,
    FormsModule,
    AppRoutingModule,
    AngularFireModule.initializeApp(environment.firebase),
    InputTextModule,
    ButtonModule,
    TabViewModule,
    DialogModule,
    MenubarModule,
    CardModule,
    HttpClientModule,
    AngularFireAuthModule,
    CarouselModule,
    BrowserAnimationsModule,


    provideFirebaseApp(() => initializeApp(environment.firebase)),
    provideAuth(() => getAuth()),
    provideFirestore(() => getFirestore()),
    provideStorage(() => getStorage()),
  ],
  providers: [AuthService],
  bootstrap: [AppComponent]
})
export class AppModule { }
