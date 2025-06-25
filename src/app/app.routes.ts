import { Routes } from '@angular/router';
import { LoginComponent } from './auth/login/login.component';
import { authGuard } from './core/guard/auth.guard';

export const routes: Routes = [
    {
        path: 'login',
        component: LoginComponent,
    },
    {
        path: '',
        redirectTo: 'login',
        pathMatch: 'full',
    },
    {
        path: 'admin',
        loadComponent: () => import('./admin/form-generate/form-generate.component').then(m => m.FormGenerateComponent),
        canActivate: [authGuard],
        data: { role: 'admin' }
    },
    {
        path: 'form/:id',
        loadComponent: () => import('./user/form-submission/form-submission.component').then(m => m.FormSubmissionComponent),
        canActivate: [authGuard],
        data: { role: 'user' }
    },
    {
        path: 'unauthorized',
        loadComponent: () => import('./shared/unauthorised/unauthorised.component').then(m => m.UnauthorisedComponent)
    },
    { path: '**', redirectTo: 'login' }
];
