import { ModuleWithProviders } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { AccessControlGuard } from './shared/guards/accesscontrol.service';

export const ROUTES: Routes = [
    {path: '', redirectTo: 'login', pathMatch: 'full'},
    {path: 'login', component: LoginComponent},
    {path: 'home', loadChildren: './home/home.module#HomeModule', canActivate: [AccessControlGuard]},
    {path: 'friends', loadChildren: './friends/friends.module#FriendsModule', canActivate: [AccessControlGuard]}
];

export const ROUTING: ModuleWithProviders = RouterModule.forRoot(ROUTES);
