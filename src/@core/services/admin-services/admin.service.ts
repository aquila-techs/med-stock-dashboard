import { Injectable } from '@angular/core';
import { HttpService } from '../http.service';

@Injectable({
  providedIn: 'root'
})
export class AdminService {

  constructor(private _http: HttpService) { }

  createSeller(data){
    return this._http.post('user/seller-sign-up',data)
  }

  getAllSeller(queryParams){
    return this._http.post('admin/get-all-seller'+queryParams,{})
  }

  sellerApproved(id){
    return this._http.post('admin/seller-approved',id)
  }

  sellerDisapproved(id){
    return this._http.post('admin/seller-disapproved',id)
  }
}
