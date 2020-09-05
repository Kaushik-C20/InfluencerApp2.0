import { Injectable } from '@angular/core';

import { HttpClient, HttpRequest, HttpEventType, HttpResponse,HttpHeaders } from '@angular/common/http';
import {Router} from "@angular/router";
import {tap} from "rxjs/operators";
@Injectable({
  providedIn: 'root'
})
export class InfluencerServiceService {

  constructor(private httpClient : HttpClient, private router :Router) { }


  submitGig(data){

    
    const url = `http://localhost:6001/webhook/create-gig`;
 
  return this.httpClient.post(url, data).pipe(
    tap(result =>{})
  );

}

}
