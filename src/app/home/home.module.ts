import { NgModule } from '@angular/core'
import { CommonModule } from '@angular/common'
import { HomeComponent } from './home.component'
import { HomeRoutingModule } from './home-routing.module'
import { FormsModule ,ReactiveFormsModule} from '@angular/forms'
import { SharedModule } from '../shared/shared.module'

@NgModule({
	declarations: [
		HomeComponent
	],
	imports: [
		CommonModule, HomeRoutingModule, FormsModule, SharedModule, ReactiveFormsModule
	]
})
export class HomeModule { }
