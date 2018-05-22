import {Routes, RouterModule} from "@angular/router"
import {Registration} from "./auth/regisrtation"
import {HomeComponent} from "./home.component"
import {SeasonsComponent} from "./pages/seasons/seasons.component"
import {WeeksComponent} from "./pages/weeks/weeks.component"
import {DaysComponent} from "./pages/days/days.component"
import {TasksComponent} from "./pages/tasks/tasks.component"
import {AuthComponent} from "./components/auth/auth.component";
import {AuthCanActivateService} from "./auth-can-activate.service";

const routes: Routes = [
  {
    path: 'registration',
    component: Registration
  },
  {
    path: '',
    component: HomeComponent,
    canActivate: [AuthCanActivateService]
  },
  {
    path: 'seasons',
    component: SeasonsComponent,
    canActivate: [AuthCanActivateService]
  },
  {
    path: 'weeks',
    component: WeeksComponent,
    canActivate: [AuthCanActivateService]
  },
  {
    path: 'days',
    component: DaysComponent,
    canActivate: [AuthCanActivateService]
  },
  {
    path: 'tasks',
    component: TasksComponent,
    canActivate: [AuthCanActivateService]
  },
  {
    path: 'auth',
    component: AuthComponent
  }
];

export const routing = RouterModule.forRoot(routes);