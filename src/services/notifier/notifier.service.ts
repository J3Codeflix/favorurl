import { Injectable } from '@angular/core';
import { NotifierService } from 'angular-notifier';


@Injectable()
export class NotifierAppService {

    constructor(
        private notifier: NotifierService
    ){
        this.notifier = notifier;
    }

    showErrorNotification(message: string) {
        this.notifier.notify('error', message);
    }

    showSuccessNotification(message: string) {
        this.notifier.notify('success', message);
    }

    showWarningNotification(message: string) {
        this.notifier.notify('warning', message);
    }

    showInfoNotification(message: string) {
        this.notifier.notify('info', message);
    }
}