import {Routes, RouterModule} from "@angular/router"
import{ Registration} from "./auth/regisrtation"
import {HomeComponent} from "./home.component"
import {SeasonsComponent} from "./pages/seasons/seasons.component"
import {WeeksComponent} from "./pages/weeks/weeks.component"
import {DaysComponent} from "./pages/days/days.component"
import {TasksComponent} from "./pages/tasks/tasks.component"

const routes: Routes =[
  {
    path:'registration',
    component: Registration
  },
  {
    path:'',
    component: HomeComponent
  },
  {
    path:'seasons',
    component: SeasonsComponent
  },
  {
    path:'weeks',
    component: WeeksComponent
  },
  {
    path:'days',
    component: DaysComponent
  },
  {
    path:'tasks',
    component: TasksComponent
  }
];

export const routing = RouterModule.forRoot(routes);