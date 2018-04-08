import {Routes, RouterModule} from "@angular/router"
import{ Registration} from "./auth/regisrtation"
import {HomeComponent} from "./home.component"
import {SeasonsComponent} from "./pages/seasons/seasons.component";
import {WeeksComponent} from "./pages/weeks/weeks.component"

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
  }
];

export const routing = RouterModule.forRoot(routes);