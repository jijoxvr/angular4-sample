import { Injectable } from '@angular/core';
import { Observable } from "rxjs/Rx";

@Injectable()
export class AppConfigService {

  insuranceStatus = {
    'PAYMENT_PENDING': 1,
    'ACTIVATION_PENDING': 2,
    'ACTIVATION_PROGRESS': 3,
    'ACTIVATED': 4,
    'CLAIMED': 5
  }
  claimReason = {
    'DAMAGE': 1,
    'LOST': 2,
    'ACCIDENTAL_DAMAGE': 10,
    'LIQUID_DAMAGE': 11,
    'THEFT': 10,
    'BURGLARY': 11,
    'ROBBERY': 12,
  }

  constructor() { }

  testUserInfo(): Observable<any> {
    return Observable.create(observer => {
      console.log('testing')
      observer.complete();
    })
  }
}
