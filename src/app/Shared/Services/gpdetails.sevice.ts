import {Injectable} from '@angular/core';
import { GPDetail } from '../../models/gpdetail.model';
import { Observer } from 'rxjs/Observer';
import {Observable} from 'rxjs/Observable';
import {Http,Response} from '@angular/http';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';
import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { ErrorObservable } from 'rxjs/observable/ErrorObservable';

@Injectable()
//..........  GPDetailService
export class GPDetailsService{

  baseAPIUrls = 'https://doctorwebapi20190125105306.azurewebsites.net/api';
  
   
  //......    Inject dependencies 
   constructor(
       private _http:Http,
       private _httpClient:HttpClient){}

   
   //......   Get GPDetails
   getGpDetails(): Observable<GPDetail[]> 
   {    
      
    return  this._http.get(this.baseAPIUrls+'/GPDetail')
       .map((response:Response)=><GPDetail[]>response.json())
       .catch((error)=>{
        return Observable.throw(error);
        })
   }
 
   //......  Save General Practitioner data to database
   Save(gpDetail: GPDetail):Observable<GPDetail>
    {       
         return this._httpClient.post<GPDetail>(this.baseAPIUrls+'/GPDetail/AddGPDetail',gpDetail,{
             headers:new HttpHeaders({
                 'Content-Type':'application/json'
               })
         }).catch((error)=>{
            return Observable.throw(error);
        })      
    }


}