import { Routes } from '@angular/router';
import {HomeComponent} from './pages/home/home.component';
import {AuthComponent} from './components/auth/auth.component';
import { authGuard } from './guards/auth.guard';
import { ClientesFormComponent } from './pages/clientes-form/clientes-form.component';

export const routes: Routes = [
    {path: '', redirectTo:'auth',pathMatch:'full'},
    /*{path: 'home', component: HomeComponent, canActivate:[authGuard]},
    {path: 'clientes-form/:id', component: ClientesFormComponent, canActivate:[authGuard]},*/
    {path: 'home', component: HomeComponent},
    {path: 'clientes-form/:id', component: ClientesFormComponent},
    {path: 'auth', component: AuthComponent},
    {path: '**', redirectTo:'auth',pathMatch:'full'},
];
