import { Component, OnInit } from '@angular/core';
import { Links } from '../../models/links.model';
import { RealLinks } from '../dummies/dummies';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { LinksModalContent } from '../modals/new-link-modal/modal.component';
import { UserAccountService } from '../../services/user/user-account.service';
import { CreateLinkModel } from '../../models/create-link.model';
import { NotifierAppService } from '../../services/notifier/notifier.service';
import { LinkDetailsModal } from '../modals/link-details-modal/modal.component';
import { GetLinkDetailsModel } from '../../models/get-link-details.model';
import { SharedDetails } from '../shared/shared-details';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {

  links: Array<Links> = [];
  count: number;
  counts: string;
  total: string;
  c;
  linksDetails = [];

  constructor(
    private modal:NgbModal,
    private user: UserAccountService,
    private notifier: NotifierAppService) { }

  async ngOnInit() {

    const links = await this.user.getLinks();
    this.count = links.length;
    this.counts = this.count > 1 ? 'Links' : 'Link';
    this.total = this.count.toString() + ' ' + this.counts;
    this.links.push(...links);
    SharedDetails.links.push(...links);
    console.log("DashboardComponent -> ngOnInit -> this.links", this.links);

    links.forEach(linkDetails => {
      const detailsReq: GetLinkDetailsModel = {
        id: linkDetails.id,
        slash_tag: '',
        destination_url: '',
        protocol: 'http',
        _type: 'Hours'
      }

      this.user.getLinkDetails(detailsReq).then((linkRequest) => {
        this.linksDetails.push(...linkRequest)
      });
    });

  }

  openModal(){
    if(!this.modal.hasOpenModals()){
      const modalRef = this.modal.open(LinksModalContent);
      modalRef.componentInstance.slash = this.getRandomString(6);
      modalRef.result.then((createLink: CreateLinkModel) => {
        if(createLink){
          this.user.createLink(createLink).then(() => {
            this.notifier.showSuccessNotification('Link Creation Successful');
          }).catch(err => {
            this.notifier.showErrorNotification('Link Creation Failed');
          })
        }
      }).catch((err) => {
        this.notifier.showErrorNotification('Link Creation Cancelled');
      });
    }else {
      this.notifier.showErrorNotification('Something is open');
    }
  }

  async deleteLink(id){
    const deleteLink = await this.user.deleteLinks(id);
    if(deleteLink){
      this.notifier.showSuccessNotification('Link Deletion Successful');
    }else{
      this.notifier.showErrorNotification('Link Deletion Failed');
    }
  }

  async detailsLink(detailsLink: Links){
    const detailsReq: GetLinkDetailsModel = {
      id: detailsLink.id,
      slash_tag: '',
      destination_url: '',
      protocol: 'http',
      _type: 'Hours'
    }

    this.notifier.showInfoNotification('Loading details...');
    
    this.user.getLinkDetails(detailsReq).then((linkRequest) => {
      if(!this.modal.hasOpenModals()){
        const detailsModal = this.modal.open(LinkDetailsModal);
        detailsModal.componentInstance.link = detailsLink;
        detailsModal.componentInstance.linkClicksDetails = linkRequest;
      } else {
        this.notifier.showWarningNotification('Please wait while the details is getting loaded');
      }
    }).catch((err) => {
    console.log("DashboardComponent -> detailsLink -> err", err)
      this.notifier.showErrorNotification('Could not get link details');
    });

  }

  async detailsLinkV2() {

  }

  getRandomString(length) {
    var randomChars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    var result = '';
    for ( var i = 0; i < length; i++ ) {
        result += randomChars.charAt(Math.floor(Math.random() * randomChars.length));
    }
    return result;
}

}
