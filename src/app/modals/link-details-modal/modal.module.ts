import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { LinkDetailsModal } from './modal.component';
import { FusionChartsModule } from 'angular-fusioncharts';
// import * as FusionCharts from 'fusioncharts';
// import * as Charts from 'fusioncharts/fusioncharts.charts';
// import * as FintTheme from 'fusioncharts/themes/fusioncharts.theme.fint';



// FusionChartsModule.fcRoot(FusionCharts, Charts, FintTheme);

@NgModule({
  imports: [BrowserModule, NgbModule, FusionChartsModule],
  declarations: [LinkDetailsModal],
  exports: [LinkDetailsModal],
  bootstrap: [LinkDetailsModal]
})
export class NgbdTabsetBasicModule {}
