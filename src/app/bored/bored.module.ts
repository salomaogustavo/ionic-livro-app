import { NgModule } from "@angular/core";
import { BoredRoutingModule } from "./bored-routing.module";
import { IonicModule } from "@ionic/angular";
import { BoredListaComponent } from "./components/bored-lista/bored-lista.component";
import { CommonModule } from "@angular/common";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";

@NgModule({
  imports: [BoredRoutingModule, CommonModule, IonicModule, FormsModule, ReactiveFormsModule],
  declarations: [BoredListaComponent]
})
export class BoredModule { }
