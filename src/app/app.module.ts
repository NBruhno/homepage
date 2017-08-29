import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';
import {FormsModule} from '@angular/forms';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {MaterializeModule} from 'ng2-materialize';
import { AngularFireModule } from 'angularfire2';
import { AngularFireDatabaseModule } from 'angularfire2/database';
import { AngularFireAuthModule } from 'angularfire2/auth';

import { AppComponent } from './app.component';
import { HeaderComponent } from './header/header.component';
import { NavigationComponent } from './navigation/navigation.component';
import { AboutComponent } from './about/about.component';
import { FooterComponent } from './footer/footer.component';

export const firebaseConfig = {
    apiKey: 'AIzaSyD3aCWQkYyrF5Z3RU7kujpo2kE68NEOVjA',
    authDomain: 'bruhno-afb29.firebaseapp.com',
    databaseURL: 'https://bruhno-afb29.firebaseio.com',
    storageBucket: 'bruhno-afb29.appspot.com',
    messagingSenderId: '809415579811'
};

@NgModule({
    declarations: [
        AppComponent,
        HeaderComponent,
        NavigationComponent,
        AboutComponent,
        FooterComponent
    ],
    imports: [
        BrowserModule,
        BrowserAnimationsModule,
        FormsModule,
        MaterializeModule.forRoot(),
        AngularFireModule.initializeApp(firebaseConfig),
        AngularFireDatabaseModule,
        AngularFireAuthModule
    ],
    providers: [],
    bootstrap: [AppComponent]
})

export class AppModule {}
