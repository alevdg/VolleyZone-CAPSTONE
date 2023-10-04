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
import { SignInComponent } from './component/sign-in/sign-in.component';
import { SignUpComponent } from './component/sign-up/sign-up.component';
import { AngularFirestoreModule } from '@angular/fire/compat/firestore';
import { CreateTeamComponent } from './component/create-team/create-team.component';
import { TeamListComponent } from './component/team-list/team-list.component';
import { TeamPageComponent } from './pages/team-page/team-page.component';
import { TeamDetailComponent } from './component/team-detail/team-detail.component';
import { AdminComponent } from './component/admin/admin.component';
import { DatabaseService } from './shared/database.service';
import { RouterModule } from '@angular/router';
import { ReactiveFormsModule } from '@angular/forms';
import { FooterComponent } from './pages/footer/footer.component';
import { TeamService } from './shared/team.service';
import { AuthGuard } from './shared/guard/auth.guard';
import { ProfileComponent } from './pages/profile/profile.component';
import { MdbTabsModule } from 'mdb-angular-ui-kit/tabs';
import { SidebarComponent } from './pages/side-bar/side-bar.component';
import { NekomaTeamComponent } from './pages/nekoma-team/nekoma-team.component';
import { AobaTeamComponent } from './pages/aoba-team/aoba-team.component';
import { MessageComponent } from './component/message/message.component';


@NgModule({
  declarations: [
    AppComponent,
    DashboardComponent,
    LandingPageComponent,
    SignInComponent,
    SignUpComponent,
    CreateTeamComponent,
    TeamListComponent,
    TeamPageComponent,
    TeamDetailComponent,
    AdminComponent,
    FooterComponent,
    ProfileComponent,
    SidebarComponent,
    NekomaTeamComponent,
    AobaTeamComponent,
    MessageComponent

  ],
  imports: [
    BrowserModule,
    FormsModule,
    AppRoutingModule,
    AngularFireModule.initializeApp(environment.firebase),
    AngularFireAuthModule,
    AngularFirestoreModule,
    InputTextModule,
    ButtonModule,
    TabViewModule,
    DialogModule,
    MenubarModule,
    CardModule,
    HttpClientModule,
    CarouselModule,
    BrowserAnimationsModule,
    ReactiveFormsModule,
    MdbTabsModule,


    provideFirebaseApp(() => initializeApp(environment.firebase)),
    provideAuth(() => getAuth()),
    provideFirestore(() => getFirestore()),
    provideStorage(() => getStorage()),
  ],
  providers: [AuthService, TeamService, DatabaseService, AuthGuard],
  bootstrap: [AppComponent]
})
export class AppModule { }
