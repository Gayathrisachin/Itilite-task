import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { SeatConfig } from '../model/seatConfig';

@Injectable({
  providedIn: 'root'
})
export class SeatMapService {
url:string='http://localhost:3000/seatConfig'
  constructor(private http:HttpClient) { }

  getSeats(){
    return this.http.get<SeatConfig[]>(this.url);
  }
}
