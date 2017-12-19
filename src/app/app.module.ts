import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HttpClientModule } from '@angular/common/http';
import { FlexLayoutModule } from '@angular/flex-layout';
import { AngularFireModule } from 'angularfire2';
import { AngularFireDatabaseModule } from 'angularfire2/database';
import { AngularFireAuthModule } from 'angularfire2/auth';
import { AngularFirestoreModule } from 'angularfire2/firestore';
import { AuthService } from './auth.service';
import { AuthGuard } from './auth.guard';
import { AlertDialog, DialogService } from './dialog.service';
import { AppRoutingModule } from './app-routing.module';
import { ServiceWorkerModule } from '@angular/service-worker';
import { ErrorService } from './error.service';
import { PermService } from './perm.service';
import { PermGuard } from './perm.guard';
import { UploadService } from './upload.service';
import { SeoService } from './seo.service';
import { FileDropDirective } from './file-drop.directive';
import { environment } from '../environments/environment';
import {
    MatAutocompleteModule,
    MatButtonModule,
    MatButtonToggleModule,
    MatCardModule,
    MatCheckboxModule,
    MatChipsModule,
    MatDatepickerModule,
    MatDialogModule,
    MatExpansionModule,
    MatGridListModule,
    MatIconModule,
    MatIconRegistry,
    MatInputModule,
    MatListModule,
    MatMenuModule,
    MatNativeDateModule,
    MatPaginatorModule,
    MatProgressBarModule,
    MatProgressSpinnerModule,
    MatRadioModule,
    MatRippleModule,
    MatSelectModule,
    MatSidenavModule,
    MatSliderModule,
    MatSlideToggleModule,
    MatSnackBarModule,
    MatSortModule,
    MatTableModule,
    MatTabsModule,
    MatToolbarModule,
    MatTooltipModule
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
import { NameComponent } from './profile/name/name.component';
import { AvatarComponent } from './profile/avatar/avatar.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { UsersListComponent } from './dashboard/users-list/users-list.component';
import { DetailsComponent } from './authentication/details/details.component';

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
        NameComponent,
        AlertDialog,
        AvatarComponent,
        DashboardComponent,
        UsersListComponent,
        DetailsComponent
    ],
    imports: [
        BrowserModule,
        BrowserAnimationsModule,
        AppRoutingModule,
        FlexLayoutModule,
        ServiceWorkerModule.register('/ngsw-worker.js', { enabled: environment.production }),
        FormsModule,
        ReactiveFormsModule,
        HttpClientModule,
        RouterModule.forRoot(environment.routes),
        AngularFireModule.initializeApp(environment.firebase),
        AngularFireDatabaseModule,
        AngularFireAuthModule,
        AngularFirestoreModule.enablePersistence(),
        MatAutocompleteModule,
        MatButtonModule,
        MatButtonToggleModule,
        MatCardModule,
        MatCheckboxModule,
        MatChipsModule,
        MatDatepickerModule,
        MatDialogModule,
        MatExpansionModule,
        MatGridListModule,
        MatIconModule,
        MatInputModule,
        MatListModule,
        MatMenuModule,
        MatNativeDateModule,
        MatPaginatorModule,
        MatProgressBarModule,
        MatProgressSpinnerModule,
        MatRadioModule,
        MatRippleModule,
        MatSelectModule,
        MatSidenavModule,
        MatSliderModule,
        MatSlideToggleModule,
        MatSnackBarModule,
        MatSortModule,
        MatTableModule,
        MatTabsModule,
        MatToolbarModule,
        MatTooltipModule,
    ],
    entryComponents: [
        NameComponent,
        AlertDialog,
        AvatarComponent
    ],
    providers: [
        AuthService,
        AuthGuard,
        DialogService,
        FileDropDirective,
        MatIconRegistry,
        UploadService,
        PermService,
        PermGuard,
        SeoService,
        ErrorService
    ],
    bootstrap: [
        AppComponent
    ]
})

export class AppModule {}
