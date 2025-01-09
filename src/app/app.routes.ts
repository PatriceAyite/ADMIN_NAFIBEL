import { Routes } from '@angular/router';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { HairDressersComponent } from './components/hair-dressers/hair-dressers.component';
import { ClientsComponent } from './components/clients/clients.component';
import { AppointmentsComponent } from './components/appointments/appointments.component';
import {DetailHairstyleComponent} from './components/detail-hairstyle/detail-hairstyle.component';
import {HairStyleComponent} from './components/hair-style/hair-style.component';


export const routes: Routes = [
  { path: 'dashboard', component: DashboardComponent },
  { path: 'hairstyle', component:HairStyleComponent },
  { path: 'hairdresser', component: HairDressersComponent },
  { path: 'client', component: ClientsComponent },
  { path: 'appointment', component: AppointmentsComponent },
  { path: '', redirectTo: '/dashboard', pathMatch: 'full' }
];
