import { Injectable } from '@angular/core';
import {Item} from 'src/app/model/Item';
import { environment } from 'src/environments/environment';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import {Observable, throwError} from 'rxjs';
import {retry, catchError} from 'rxjs/operators';

const apiUrl = environment.apiUrl;

@Injectable({
  providedIn: 'root'
})
export class ItemServiceService {

  constructor(private http: HttpClient) { }

  httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json'
    })
  }

  itemList: Item[]= [
    {id: 1, img:"assets/img/milk.jpg", name:"Milk"},
    {id: 2, img:"assets/img/eggs.jpg", name:"Eggs"},
    {id: 3, img:"assets/img/milk.jpg", name:"dsjbdsd"},

  ];

  getListItem() : Observable<Item>{
    // return this.itemList;
    return this.http.get<Item>(apiUrl+ '/item/')
    .pipe(
      retry(1),
      catchError(this.errorHandl)
    )
  }

  addNewItem(item): Observable<Item>{
    return this.http.post<Item>(apiUrl + '/item/', JSON.stringify(item), this.httpOptions)
    .pipe(
      retry(1),
      catchError(this.errorHandl),
    )
  }

  removeItem (item: Item) : Observable<Item> {
    return this.http.delete<Item>(apiUrl +'/item/' + item.id, this.httpOptions)
    .pipe(
      retry(1),
      catchError(this.errorHandl),
    )
  }


   // Error handling
   errorHandl(error) {
    let errorMessage = '';
    if(error.error instanceof ErrorEvent) {
      // Get client-side error
      errorMessage = error.error.message;
    } else {
      // Get server-side error
      errorMessage = `Error Code: ${error.status}\nMessage: ${error.message}`;
    }
    console.log(errorMessage);
    return throwError(errorMessage);
 }
}
