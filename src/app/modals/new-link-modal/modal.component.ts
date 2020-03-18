import {Component, Input, Output, OnInit} from '@angular/core';
import {NgbModal, NgbActiveModal} from '@ng-bootstrap/ng-bootstrap';
import { CreateLinkModel } from '../../../models/create-link.model';

@Component({
    selector: 'links-modal-content',
    templateUrl: './modal.component.html',
    styleUrls: ['./modal.component.scss']
})
export class LinksModalContent {
    @Input() slash;
    // @Output() closeModal = new EventEmitter();
    // myForm: FormGroup;
    destinationUrl;
    protocol;
    brandedDomain;
    constructor(
        public activeModal: NgbActiveModal
        ) {

    }

    onSubmit(){
        console.log("LinksModalContent -> onSubmit -> destinationUrl:: ", this.destinationUrl)
        const createLink: CreateLinkModel = {
            protocol: this.protocol,
            destination_url: this.destinationUrl,
            branded_domain: this.brandedDomain,
            slash_tag: this.slash,
        }
        console.log("LinksModalContent -> onSubmit -> this.createLink", createLink)
        this.activeModal.close(createLink);
    }
}
