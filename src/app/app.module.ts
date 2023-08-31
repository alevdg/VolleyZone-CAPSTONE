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

@NgModule({
  declarations: [
    AppComponent,
    LogRegisterComponent,
    DashboardComponent,
    LandingPageComponent,

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

  ],
  providers: [{ provide: 'environment', useValue: environment }],
  bootstrap: [AppComponent]
})
export class AppModule { }
