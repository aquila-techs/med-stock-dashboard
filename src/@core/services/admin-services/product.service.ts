import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { HttpService } from '../http.service';

@Injectable({
  providedIn: 'root'
})
export class ProductService {

  public selectProduct: BehaviorSubject<any>;

  constructor(private _http: HttpService) {
    this.selectProduct = new BehaviorSubject({});
   }

  setSelectedproduct(user: any){
    this.selectProduct.next(user);
  }

  getSelectedProduct(){
    return this.selectProduct.asObservable();
  }

  getAllCategories(){
    return this._http.get('category')
  }

  getAllProucts(queryParams){
    return this._http.get('product'+queryParams)
  }

  addNewProdcut(data){
    return this._http.post('product',data)
  }

  updateProduct(id, data){
    return this._http.put('product/'+id,data)
  }
}
