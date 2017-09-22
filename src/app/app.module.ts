import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterModule, Routes } from '@angular/router';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MaterializeModule } from 'ng2-materialize';
import { AngularFireModule } from 'angularfire2';
import { AngularFireDatabaseModule } from 'angularfire2/database';
import { AngularFireAuthModule } from 'angularfire2/auth';
import { AuthService } from './auth.service';
import { AuthGuard } from './auth.guard';
import { PermService } from './perm.service';
import { PermGuard } from './perm.guard';
import { UploadService } from './upload.service';
import { FileDropDirective } from './file-drop.directive';
import { environment } from '../environments/environment';
import { Ng2ScrollimateModule } from 'ng2-scrollimate';
import {
    MdAutocompleteModule,
    MdButtonModule,
    MdButtonToggleModule,
    MdCardModule,
    MdCheckboxModule,
    MdChipsModule,
    MdCoreModule,
    MdDatepickerModule,
    MdDialogModule,
    MdExpansionModule,
    MdGridListModule,
    MdIconModule,
    MdInputModule,
    MdListModule,
    MdMenuModule,
    MdNativeDateModule,
    MdPaginatorModule,
    MdProgressBarModule,
    MdProgressSpinnerModule,
    MdRadioModule,
    MdRippleModule,
    MdSelectModule,
    MdSidenavModule,
    MdSliderModule,
    MdSlideToggleModule,
    MdSnackBarModule,
    MdSortModule,
    MdTableModule,
    MdTabsModule,
    MdToolbarModule,
    MdTooltipModule,
} from '@angular/material';

import { AppComponent } from './app.component';
import { HeaderComponent } from './front/header/header.component';
import { NavigationComponent } from './navigation/navigation.component';
import { AboutComponent } from './front/about/about.component';
import { FooterComponent } from './footer/footer.component';
import { AuthenticationComponent } from './authentication/authentication.component';
import { LoginComponent } from './authentication/login/login.component';
import { EmailComponent } from './authentication/email/email.component';
import { GalleryComponent } from './gallery/gallery.component';
import { ImageComponent } from './gallery/image/image.component';
import { FrontComponent } from './front/front.component';
import { ErrorComponent } from './error/error.component';
import { NotFoundComponent } from './error/not-found/not-found.component';
import { UploadComponent } from './upload/upload.component';
import { UploadFormComponent } from './upload/upload-form/upload-form.component';
import { UploadListComponent } from './upload/upload-list/upload-list.component';
import { UploadDetailComponent } from './upload/upload-detail/upload-detail.component';
import { ProfileComponent } from './profile/profile.component';

export const routes: Routes = [
    { path: '', component: FrontComponent },
    { path: 'login', component: AuthenticationComponent, data: {title: 'Login'} },
    { path: 'gallery', component: NotFoundComponent },
    { path: 'projects', component: NotFoundComponent },
    { path: 'profile', component: ProfileComponent },
    { path: 'upload', component: UploadComponent, canActivate: [PermGuard] },
    { path: '404', component: NotFoundComponent },
    { path: '**', redirectTo: '/404' }
];

@NgModule({
    declarations: [
        AppComponent,
        HeaderComponent,
        NavigationComponent,
        AboutComponent,
        FooterComponent,
        AuthenticationComponent,
        LoginComponent,
        EmailComponent,
        GalleryComponent,
        ImageComponent,
        FrontComponent,
        ErrorComponent,
        NotFoundComponent,
        UploadComponent,
        FileDropDirective,
        UploadFormComponent,
        UploadListComponent,
        UploadDetailComponent,
        ProfileComponent,
    ],
    imports: [
        BrowserModule,
        BrowserAnimationsModule,
        FormsModule,
        ReactiveFormsModule,
        MaterializeModule.forRoot(),
        RouterModule.forRoot(routes),
        AngularFireModule.initializeApp(environment.firebase),
        AngularFireDatabaseModule,
        AngularFireAuthModule,
        Ng2ScrollimateModule,
        MdDialogModule,
        MdNativeDateModule,
        MdAutocompleteModule,
        MdButtonModule,
        MdButtonToggleModule,
        MdCardModule,
        MdCheckboxModule,
        MdChipsModule,
        MdCoreModule,
        MdDatepickerModule,
        MdDialogModule,
        MdExpansionModule,
        MdGridListModule,
        MdIconModule,
        MdInputModule,
        MdListModule,
        MdMenuModule,
        MdNativeDateModule,
        MdPaginatorModule,
        MdProgressBarModule,
        MdProgressSpinnerModule,
        MdRadioModule,
        MdRippleModule,
        MdSelectModule,
        MdSidenavModule,
        MdSliderModule,
        MdSlideToggleModule,
        MdSnackBarModule,
        MdSortModule,
        MdTableModule,
        MdTabsModule,
        MdToolbarModule,
        MdTooltipModule
    ],
    entryComponents: [
        AuthenticationComponent
    ],
    providers: [
        AuthService,
        AuthGuard,
        UploadService,
        FileDropDirective,
        PermService,
        PermGuard
    ],
    bootstrap: [
        AppComponent
    ]
})

export class AppModule {}
