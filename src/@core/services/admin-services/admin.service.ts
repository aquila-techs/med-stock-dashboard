import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { HttpService } from '../http.service';

@Injectable({
  providedIn: 'root'
})
export class AdminService {
  public selectedUser: BehaviorSubject<any>;

  constructor(private _http: HttpService) {
    this.selectedUser = new BehaviorSubject({});
   }

  setSelectedUser(user: any){
    this.selectedUser.next(user);
  }

  getSelectedUser(){
    return this.selectedUser.asObservable();
  }

  createSeller(data){
    return this._http.post('user/seller-sign-up',data)
  }

  getAllSeller(queryParams){
    return this._http.post('admin/get-all-seller'+queryParams,{})
  }

  getAllBuyer(queryParams){
    return this._http.post('admin/get-all-buyers'+queryParams,{})
  }
 

  getAllPendingApprovalSeller(queryParams){
    return this._http.post('admin/get-all-pending-approval-seller'+queryParams,{})
  }

  buyerApproved(id){
    return this._http.post('admin/buyer-approved',id)
  }

  buyerDisapproved(id){
    return this._http.post('admin/buyer-disapproved',id)
  }

  sellerApproved(id){
    return this._http.post('admin/seller-approved',id)
  }

  sellerDisapproved(id){
    return this._http.post('admin/seller-disapproved',id)
  }
}
