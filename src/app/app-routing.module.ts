import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DashboardComponent } from './component/dashboard/dashboard.component';
import { LandingPageComponent } from './component/landing-page/landing-page.component';
import { SignInComponent } from './component/sign-in/sign-in.component';
import { SignUpComponent } from './component/sign-up/sign-up.component';
import { AdminComponent } from './component/admin/admin.component';
import { TeamPageComponent } from './pages/team-page/team-page.component';


// route guard
import { AuthGuard } from './shared/guard/auth.guard';
const routes: Routes = [
  { path: '', component: LandingPageComponent, pathMatch: 'full' },
  { path: 'Login', component: SignInComponent },
  { path: 'Register', component: SignUpComponent },
  { path: 'Dashboard', component: DashboardComponent },
  { path: 'Team', component: TeamPageComponent },
  { path: 'Manage', component: AdminComponent },

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }

