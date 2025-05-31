import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { StopListResponse } from '../models/stop';
import { Observable } from 'rxjs';
import { FilterName, MBTAFilter } from '../models/mbta-filter';
import { LocationType } from '../enum/location_type';


@Injectable({
  providedIn: 'root'
})
export class MBTAApiService {

  private baseApiUrl: string = "https://api-v3.mbta.com"

  private http = inject(HttpClient);

  private addParamsToURL(url: URL, filters: FilterName[], params: MBTAFilter): void {
    filters.forEach( filter => {
      if (filter in params) url.searchParams.append(`filter[${filter}]`, String(params[filter]?.toString()));
    })
  }

  getStops(params: MBTAFilter): Observable<StopListResponse> {
    let url = new URL(this.baseApiUrl+'/stops')
    this.addParamsToURL(url, ['location_type'], {location_type: LocationType.PLATFORM})
    this.addParamsToURL(url, ['route_type'], params)
    return this.http.get<StopListResponse>(url.toString())
  }

}
