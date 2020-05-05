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
  ],
  exports: [BsDropdownModule, ModalModule, TooltipModule],
})
export class AppBootstrapModule {}
