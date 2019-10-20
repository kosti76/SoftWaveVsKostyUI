import { Routes } from '@angular/router';
import { HomeComponent} from './home/home.component'

import { ErrorComponent} from './error.component'

import {MsalGuard} from "@azure/msal-angular";
import {TodoListComponent} from "./todo-list/todo-list.component";
import {UserDataComponent} from "./user-data/user-data.component";
import { DemoComponent } from './demo/demo.component';

export const appRoutes: Routes = [
  { path: 'home', component: HomeComponent  },
  { path: '#', component: HomeComponent  },
  { path: 'demo' ,component: DemoComponent, canActivate : [MsalGuard]},
  { path: '',component: HomeComponent  },
  { path: '**', component: ErrorComponent }
];




