import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { BoredListaComponent } from "./components/bored-lista/bored-lista.component";

const routes: Routes = [
  {
    path: '',
    component: BoredListaComponent
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class BoredRoutingModule { }

