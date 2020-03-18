import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';

import { LinksModalContent } from './modal.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

@NgModule({
  imports: [
    BrowserModule, 
    NgbModule,
    FormsModule,
    ReactiveFormsModule
  ],
  declarations: [LinksModalContent],
  exports: [LinksModalContent],
  bootstrap: [LinksModalContent]
})
export class NewLinkModalModule {}
