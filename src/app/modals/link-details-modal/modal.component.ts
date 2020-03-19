import {Component, Input, Output, OnInit, PipeTransform} from '@angular/core';
import {NgbModal, NgbActiveModal} from '@ng-bootstrap/ng-bootstrap';
import { CreateLinkModel } from '../../../models/create-link.model';
import { FormGroup, FormBuilder, Validators, FormControl } from '@angular/forms';
import { Links } from '../../../models/links.model';
import { LinkStats } from '../../../models/linkStats.model';

@Component({
    selector: 'links-details-content',
    templateUrl: './modal.component.html',
    styleUrls: ['./modal.component.scss']
})

export class LinkDetailsModal implements OnInit {
    @Input() link: Links;
    @Input() linkClicksDetails;
    
    linkStats: Array<LinkStats> = [];
    myForm: FormGroup;
    filter = new FormControl('');

    multi: any[];

    view: any[] = [700, 400];

    mostPopularHours: Object;
    mapSource;

    title: string;
    totalClicks = '0';
    clicksToday = '0';
    lastClick = '0';

    constructor(
        public activeModal: NgbActiveModal) {
            
        }
        
    ngOnInit(){
        this.linkStats.push(...this.link.link_stats);
        this.totalClicks = this.linkClicksDetails.total_clicks[0].total_clicks;
        this.clicksToday = this.linkClicksDetails.total_clicks_today[0].total_clicks_today;
        this.lastClick = this.linkClicksDetails.last_click.length > 0 ? this.linkClicksDetails.last_click[0].created_at : 0;
        console.log("LinkDetailsModal -> ngOnInit -> this.linkClicksDetails", this.linkClicksDetails)
        this.mostPopularHours = {
            chart: {
              caption: '',
              subCaption: '',
              xAxisName: '',
              yAxisName: '',
              numberSuffix: '',
              theme: 'zune'
            },
            data: [
              { 
                label: '12am', 
                value: this.compute(this.linkClicksDetails.most_popular_hours[0], this.linkClicksDetails.most_popular_hours[1], this.linkClicksDetails.most_popular_hours[2]) },
              { 
                label: '3am', 
                value: this.compute(this.linkClicksDetails.most_popular_hours[3], this.linkClicksDetails.most_popular_hours[4], this.linkClicksDetails.most_popular_hours[5]) },
              { 
                label: '6am', 
                value: this.compute(this.linkClicksDetails.most_popular_hours[6], this.linkClicksDetails.most_popular_hours[7], this.linkClicksDetails.most_popular_hours[8]) },
              { 
                label: '9am', 
                value: this.compute(this.linkClicksDetails.most_popular_hours[9], this.linkClicksDetails.most_popular_hours[10], this.linkClicksDetails.most_popular_hours[11]) },
              { 
                label: '12pm', 
                value: this.compute(this.linkClicksDetails.most_popular_hours[12], this.linkClicksDetails.most_popular_hours[13], this.linkClicksDetails.most_popular_hours[14]) },
              { 
                label: '3pm', 
                value: this.compute(this.linkClicksDetails.most_popular_hours[15], this.linkClicksDetails.most_popular_hours[16], this.linkClicksDetails.most_popular_hours[17]) },
              { 
                label: '6pm', 
                value: this.compute(this.linkClicksDetails.most_popular_hours[18], this.linkClicksDetails.most_popular_hours[19], this.linkClicksDetails.most_popular_hours[20])},
              { 
                label: '9pm', 
                value: this.compute(this.linkClicksDetails.most_popular_hours[21], this.linkClicksDetails.most_popular_hours[22], this.linkClicksDetails.most_popular_hours[23])}
            ]
        };
        
        this.loadMap();
    }

    search(text: string, pipe: PipeTransform) {
        return this.linkStats.filter(linkStats => {
          const term = text.toLowerCase();
          return 
        });
      }

    compute(val1, val2, val3) {
        return (val1 + val2 + val3)/3;
    }

    loadMap() {
      const data = [{id: '117', value: '100', useSNameInLabels: 1, showLabel: 1}]
      const keys = []
      const values = []
      if(this.linkClicksDetails.countries.length > 0) {
        this.linkClicksDetails.countries[0].forEach((value, index) => {
          if(index % 2 === 0){
            keys.push(value.toUpperCase())
          }else[
            values.push(value)
          ]
        });
        
        for (let index = 0; index < keys.length; index++) {
          for (let index2 = 0; index2 < values.length; index2++) {
            // data.push({id:keys[index],value:values[index2], useSNameInLabels: 1, showLabel: 1})
          }
          
        }
      }
      
      console.log("LinkDetailsModal -> loadMap -> data", data)
        this.mapSource = {
            chart: {
              entityFillColor: "#A8A8A8",
              entityFillHoverColor: "#FFF9C4",
              nullEntityColor: '#d9d9d9',
              theme: "fusion",
              hoverOnNull: "0"
            },
            colorrange: {
              minvalue: "0",
              code: "#FFE0B2",
              gradient: "1",
              color: [
          
                {
                  maxvalue: 30,
                  color: "#FFD74D"
                },
                {
                  maxvalue: 60,
                  color: "#FB8C00"
                },
                {
                  maxvalue: 100,
                  color: "#E65100"
                }
              ]
            },
            data: data
          }
    }
}
