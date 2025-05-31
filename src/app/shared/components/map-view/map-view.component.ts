import { Component, inject, OnInit, ViewChild } from '@angular/core';
import { NgxMapLibreGLModule } from '@maplibre/ngx-maplibre-gl';
import { BehaviorSubject, map } from 'rxjs';
import { MBTAApiService } from '../../services/mbta-api.service';
import { AsyncPipe } from '@angular/common';
import { convertStopsToGeoJSON } from '../../util/map-util';
import { FeatureCollection } from 'geojson';
import { LocationType } from '../../enum/location_type';
import { TweakControl, TweakpaneComponent } from '../tweakpane/tweakpane.component';
import { FilterRequestService } from '../../services/filter-requests.service';
import { MapComponent } from '@maplibre/ngx-maplibre-gl';
import { RouteType } from '../../enum/route_type';

export type MarkerPoint = {
  longitude: number,
  latitude: number,
  label: string
}

@Component({
  selector: 'app-map-view',
  imports: [NgxMapLibreGLModule, TweakpaneComponent, AsyncPipe],
  templateUrl: './map-view.component.html',
  styleUrl: './map-view.component.css'
})
export class MapViewComponent implements OnInit {

  mapComponent!: maplibregl.Map;


  readonly EMPTY_FEATURE_COLLECTION: FeatureCollection = {
    type: 'FeatureCollection',
    features: []
  };

  MBTAStops$: BehaviorSubject<FeatureCollection> = new BehaviorSubject<FeatureCollection>(this.EMPTY_FEATURE_COLLECTION);

  mbtaApi: MBTAApiService = inject(MBTAApiService);
  filterRequestService: FilterRequestService = inject(FilterRequestService);

  tweakControls: TweakControl[] = [
    {
      name: 'route_type',
      label: 'Route Type',
      type: 'dropdown',
      value: undefined,
      options: [
        { label: 'All', value: undefined },
        { label: 'Bus', value: RouteType.BUS },
        { label: 'Ferry', value: RouteType.FERRY },
        { label: 'Light Rail and Subway', value: [RouteType.LIGHT_RAIL, RouteType.SUBWAY] },
        { label: 'Commuter Rail', value: RouteType.RAIL },
      ]
    },
  ];

  constructor() {
    this.filterRequestService.setDefaultParams(this.tweakControls);
  }

  mouseEventTest(event:any) {
    console.log(event.features?.[0].properties)
  }


  ngOnInit(): void {
    this.fetchData();
  }

  onMapLoad(map: maplibregl.Map) {
    this.mapComponent = map;
  }

  fetchData(): void {
    this.mbtaApi.getStops(this.filterRequestService.getParams()).subscribe(res => {
      let data = convertStopsToGeoJSON(res.data);
      this.MBTAStops$.next(data);
    })
  }

  onControlChange(event: any) {
    console.log('Changed:', event);
    if (event.value === undefined) {
      this.filterRequestService.deleteParam(event.name);
    } else {
    this.filterRequestService.updateParam(event.name, event.value);
    }
    this.fetchData();
  }



}
