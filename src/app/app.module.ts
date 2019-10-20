import { MbscModule } from '@mobiscroll/angular';
import { BrowserModule } from '@angular/platform-browser';
import { NgModule, APP_INITIALIZER } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { RouterModule } from '@angular/router';
import { AppComponent } from './app.component';
import { HomeComponent } from './home/home.component'

import { DemoComponent } from './demo/demo.component'
import { ErrorComponent } from './error.component'

import { appRoutes } from './app.routes';
import { HTTP_INTERCEPTORS, HttpClientModule, HttpClientJsonpModule } from "@angular/common/http";
import { MsalModule } from "@azure/msal-angular";
import { MsalInterceptor } from "@azure/msal-angular";

import { TodoListComponent } from './todo-list/todo-list.component';
import { TodoListService } from "./todo-list/todo-list.service";
import { UserDataComponent } from "./user-data/user-data.component";
import { HttpServiceHelper } from './common/HttpServiceHelper';
import { environment } from '../environments/environment'
import { NgCircleProgressModule } from 'ng-circle-progress';
import { FlexLayoutModule } from '@angular/flex-layout';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import {
  MatButtonModule,
  MatFormFieldModule,
  MatInputModule,
  MatRippleModule,
  MatSortModule,
  MatTableModule,
  MatPaginatorModule,
  MatIconModule,
  MatDialogModule,
  MatSelectModule,
  MatToolbarModule,
  MatCardModule,
  MatMenuModule,
  MatGridListModule,
  MatListModule
} from '@angular/material';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { SettingsService } from './common/settings.service';

const MaterialModules = [
  MatButtonModule,
  MatFormFieldModule,
  MatInputModule,
  MatRippleModule,
  MatSortModule,
  MatTableModule,
  MatPaginatorModule,
  MatIconModule,
  MatProgressBarModule,
  MatDialogModule,
  MatGridListModule,
  MatSelectModule,
  MatListModule,
  MatToolbarModule,
  MatCardModule,
  MatMenuModule
];
export function loggerCallback(logLevel, message, piiEnabled) {
  console.log("client logging" + message);
}
export const OAuthSettings = getOAuthSettings();

export function getOAuthSettings() {
  var request = new XMLHttpRequest();
  request.open('GET', "assets/configs/settings.json", false);  // request application settings synchronous
  request.send(null);

  const settings = JSON.parse(request.responseText);

  console.log(settings.OAuthSettings[0])
  return settings.OAuthSettings[0];
}


export const protectedResourceMap:[string, string[]][]= [
  ['https://softwavwvskostyapi20191020010953.azurewebsites.net/api/getdata', ['api://9bd180a1-9bd9-470d-ab71-10fe74c29078/api-access']],    
  ['https://graph.microsoft.com/v1.0/me', ['user.read']]] ;

@NgModule({
  declarations: [
    AppComponent, HomeComponent, ErrorComponent, TodoListComponent, UserDataComponent, DemoComponent
  ],
  imports: [
    MbscModule,
    BrowserModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    HttpClientJsonpModule,
    ...MaterialModules,
    FlexLayoutModule,
    NgCircleProgressModule.forRoot({
      // set defaults here
      radius: 100,
      outerStrokeWidth: 16,
      innerStrokeWidth: 8,
      outerStrokeColor: "#78C000",
      innerStrokeColor: "#C7E596",
      animationDuration: 300
    }),
    BrowserAnimationsModule,
    RouterModule.forRoot(appRoutes),
    MsalModule.forRoot({
      clientID: environment.adalConfig.clientId,
      authority: environment.adalConfig.authority,
      validateAuthority: true,
      redirectUri: environment.adalConfig.redirectUri,
      cacheLocation : "localStorage",
      postLogoutRedirectUri: environment.adalConfig.postLogoutRedirectUri,
      navigateToLoginRequestUrl: true,
      popUp: true,
      consentScopes: [ environment.adalConfig.graphscope, environment.adalConfig.scope],
      unprotectedResources: ["https://www.microsoft.com/en-us/"],
      protectedResourceMap: protectedResourceMap,
      logger: loggerCallback,
      correlationId: '1234',
      //level: LogLevel.Info,
      piiLoggingEnabled: true
    },

    ),
  ],
  providers: [TodoListService, HttpServiceHelper,
    {
      provide: APP_INITIALIZER,
      useFactory: (setting: SettingsService) => function () { return setting.loadAppConfig() },
      deps: [SettingsService],
      multi: true
    },
    { provide: HTTP_INTERCEPTORS, useClass: MsalInterceptor, multi: true }
  ],
  bootstrap: [AppComponent]
})
export class AppModule {

}
