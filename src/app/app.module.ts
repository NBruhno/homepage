import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HttpModule } from '@angular/http';
import { MaterializeModule } from 'ng2-materialize';
import { AngularFireModule } from 'angularfire2';
import { AngularFireDatabaseModule } from 'angularfire2/database';
import { AngularFireAuthModule } from 'angularfire2/auth';
import { AngularFirestoreModule } from 'angularfire2/firestore';
import { AuthService } from './auth.service';
import { AuthGuard } from './auth.guard';
import { AlertDialog, DialogService } from "./dialog.service";
import { PermService } from './perm.service';
import { PermGuard } from './perm.guard';
import { UploadService } from './upload.service';
import { FileDropDirective } from './file-drop.directive';
import { environment } from '../environments/environment';
import { Ng2ScrollimateModule } from 'ng2-scrollimate';
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
import { UsernameComponent } from './authentication/username/username.component';

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
        UsernameComponent,
        AlertDialog
    ],
    imports: [
        BrowserModule,
        BrowserAnimationsModule,
        FormsModule,
        ReactiveFormsModule,
        HttpModule,
        MaterializeModule.forRoot(),
        RouterModule.forRoot(environment.routes),
        AngularFireModule.initializeApp(environment.firebase),
        AngularFireDatabaseModule,
        AngularFireAuthModule,
        AngularFirestoreModule.enablePersistence(),
        Ng2ScrollimateModule,
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
        UsernameComponent,
        AlertDialog,
    ],
    providers: [
        AuthService,
        AuthGuard,
        DialogService,
        FileDropDirective,
        MatIconRegistry,
        UploadService,
        PermService,
        PermGuard
    ],
    bootstrap: [
        AppComponent
    ]
})

export class AppModule {}
