import { Routes } from '@angular/router';
import { HomeComponent } from './pages/home/home.component';
import { LoginComponent } from './pages/login/login.component';
import { RegisterComponent } from './pages/register/register.component';
import { PostDetailComponent } from './pages/post-detail/post-detail.component';
import { ProfileComponent } from './pages/profile/profile.component';
import { NewAvionComponent } from './pages/new-avion/new-avion.component';

export const appRoutes: Routes = [
  { path: '', redirectTo: 'home', pathMatch: 'full' },
  { path: 'home', component: HomeComponent },
  { path: 'login', component: LoginComponent },
  { path: 'register', component: RegisterComponent },
  { path: 'avion/:id', component: PostDetailComponent },
  { path: 'profile/:username', component: ProfileComponent },
  { path: 'nuevo-avion', component: NewAvionComponent },

  { path: 'new', component: NewAvionComponent },
];
