import { BrowserAnimationsModule } from "@angular/platform-browser/animations";
import { BrowserModule } from '@angular/platform-browser';
import { NgModule, ErrorHandler } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { ClarityModule } from 'clarity-angular';
import { AppComponent } from './app.component';
import { ROUTING } from "./app.routing";
import { SharedModule } from "./shared/shared.module";
import { LoginComponent } from './login/login.component';
import { AppState, INITIAL_APP_STATE } from './store/state';
import { StoreModule, combineReducers, ActionReducer } from "@ngrx/store";
import { EffectsModule } from '@ngrx/effects';
import { AngularFireModule } from 'angularfire2';
import { AngularFireDatabaseModule } from 'angularfire2/database';
import { AngularFireAuthModule } from 'angularfire2/auth';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';
import { UserReducer } from './store/reducers/userReducer';
import { ViewReducer } from './store/reducers/viewReducer';
import { AppEffects } from './store/effects/appEffects';
import { AccessControlGuard } from './shared/guards/accesscontrol.service';
import { environment } from '../environments/environment';
import { Angulartics2Module } from 'angulartics2';
import { Angulartics2GoogleAnalytics } from 'angulartics2/ga';
import * as Raven from 'raven-js';

const reducers = {
  user: UserReducer,
  view: ViewReducer
};

const effects = [
  EffectsModule.run(AppEffects)
];

const combinedReducers: ActionReducer<AppState> = combineReducers(reducers);

export function appReducers(state: AppState = INITIAL_APP_STATE, action: any) {
  return combinedReducers(state, action);
}

Raven
  .config('https://7f5b1190d02a4c9387b2c55cc3e4e80e@sentry.io/1223771')
  .install();

export class RavenErrorHandler implements ErrorHandler {
  handleError(err: any): void {
    Raven.captureException(err);
  }
}

@NgModule({
    declarations: [
        AppComponent,
        LoginComponent,
    ],
    imports: [
        BrowserAnimationsModule,
        BrowserModule,
        FormsModule,
        ReactiveFormsModule,
        HttpModule,
        ClarityModule.forRoot(),
        ROUTING,
        SharedModule.forRoot(),
        StoreModule.provideStore(appReducers),
        effects,
        AngularFireModule.initializeApp(environment.firebase),
        AngularFireDatabaseModule,
        AngularFireAuthModule,
        StoreDevtoolsModule.instrumentOnlyWithExtension({
          maxAge: 3
        }),
        Angulartics2Module.forRoot([Angulartics2GoogleAnalytics])
    ],
    providers: [AccessControlGuard, { provide: ErrorHandler, useClass: RavenErrorHandler }],
    bootstrap: [AppComponent]
})
export class AppModule {
}
