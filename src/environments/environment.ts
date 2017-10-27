// The file contents for the current environment will overwrite these during build.
// The build system defaults to the dev environment which uses `environment.ts`, but if you do
// `ng build --env=prod` then `environment.prod.ts` will be used instead.
// The list of which env maps to which file can be found in `.angular-cli.json`.

import { FrontComponent } from '../app/front/front.component';
import { AuthenticationComponent } from '../app/authentication/authentication.component';
import { NotFoundComponent } from '../app/error/not-found/not-found.component';
import { ProfileComponent } from '../app/profile/profile.component';
import { UploadComponent } from '../app/upload/upload.component';
import { PermGuard } from '../app/perm.guard';
import { AuthGuard } from '../app/auth.guard';
import { DashboardComponent } from '../app/dashboard/dashboard.component';

export const environment = {
    production: false,
    firebase: {
        apiKey: 'AIzaSyD3aCWQkYyrF5Z3RU7kujpo2kE68NEOVjA',
        authDomain: 'bruhno-afb29.firebaseapp.com',
        databaseURL: 'https://bruhno-afb29.firebaseio.com',
        projectId: 'bruhno-afb29',
        storageBucket: 'bruhno-afb29.appspot.com',
        messagingSenderId: '809415579811'
    },
    routes: [
        { path: '', component: FrontComponent, data: {title: 'Bruhno'} },
        { path: 'dashboard', component: DashboardComponent, data: {title: 'Dashboard • Bruhno'}, canActivate: [PermGuard] },
        { path: 'login', component: AuthenticationComponent, data: {title: 'Login • Bruhno'} },
        { path: 'gallery', component: NotFoundComponent, data: {title: 'Gallery • Bruhno'} },
        { path: 'projects', component: NotFoundComponent, data: {title: 'Projects • Bruhno'} },
        { path: 'profile', component: ProfileComponent, data: {title: 'Profile • Bruhno'}, canActivate: [AuthGuard] },
        { path: 'upload', component: UploadComponent, data: {title: 'Upload • Bruhno'} },
        { path: '404', component: NotFoundComponent, data: {title: 'Not found (404)'} },
        { path: '**', redirectTo: '/404' }
    ]
};
