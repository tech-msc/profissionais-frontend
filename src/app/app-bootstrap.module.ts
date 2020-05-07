import { BrowserModule } from '@angular/platform-browser'
import { ModalModule } from 'ngx-bootstrap/modal'
import { BsDropdownModule } from 'ngx-bootstrap/dropdown'
import { TooltipModule } from 'ngx-bootstrap/tooltip'
import { NgModule } from '@angular/core'

@NgModule({
  declarations: [],
  imports: [
    BrowserModule,
    BsDropdownModule.forRoot(),
    ModalModule.forRoot(),
    TooltipModule.forRoot(),
    BsDropdownModule.forRoot(),
  ],
  exports: [BsDropdownModule, ModalModule, TooltipModule, BsDropdownModule],
})
export class AppBootstrapModule {}
