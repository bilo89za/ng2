import { Component, Input, Output, Inject, EventEmitter } from '@angular/core';
import { NgClass } from '@angular/common';
import { Point } from '../../models/geojson.models';
import { GeocoderService } from '../../services/geocoder.service';
import { WsListComponent } from '../ws-list/ws-list.component';
import { WsItem } from '../models'; 
import template from './ws-point.component.html!text';
import style from './ws-point.component.css!text';
import wsStyle from '../scss/ws.css!text';
import materialize from '../scss/materialize.css!text';

export class WsPoint {
    constructor(
        public name: string,
        public point: Point) {
    }
}
@Component({
    selector: 'ws-point',
    template,
    styles: [ style, wsStyle, materialize ]
})
export class WsPointComponent {
    
    @Input() wsName: string;
    @Input() wsColor: string = '#00ADEE';
    @Input() wsOpacity: number = 1.0;
    @Input() wsPoint: Point;
    @Input() searchLat: number;
    @Input() searchLon: number;
    @Input() wsToggleEnabled: boolean = true;
    @Output() wsChanged$: EventEmitter<WsPoint> = new EventEmitter<WsPoint>();

    public searchText: string;
    public searchResults: WsPoint[] = [];
    public listItems: WsItem[] = [];
    public showingCoordinate: boolean = false;
    private geocoding: boolean = true;
    private isSearching;

    constructor(
        @Inject(GeocoderService) private geocoder: GeocoderService) {
    }

    ngAfterViewInit() {
        this.activateSearchInput();
    }

    ngOnChanges(changes) {
        if (changes.searchLat && changes.searchLon) {
            if (changes.searchLat.currentValue != changes.searchLat.previousValue ||
                changes.searchLon.currentValue != changes.searchLon.previousValue) {
                this.reverseGeocode(new Point([changes.searchLon.currentValue, changes.searchLat.currentValue]));
            }
        }
    }

    toggleInput() {
        console.log('Showing Coordinates: ' + this.showingCoordinate);
        this.showingCoordinate = !this.showingCoordinate;
        if (this.showingCoordinate) {
            this.activatePointInput();
        } else {
            this.activateSearchInput();
        }
    }

    activatePointInput() {
        this.showingCoordinate = true;
        this.geocoding = false;
    }

    activateSearchInput() {
        this.showingCoordinate = false;
        this.geocoding = true;
    }

    public searching() {
        return !this.searchText ? false :
            this.isSearching &&
            this.searchText.length > 0 &&
            this.searchResults.length > 0;
    }

    geocode(address) {
        console.log('Getting Coordinates for: ', address);
        if (this.searchText.length > 0) {
            this.isSearching = true;
            this.geocoder.addressToPoint(this.searchText).subscribe(
                response => {
                    this.processResponse(response.json());
                },
                error => {
                    console.log(error);
                },
                () => {
                });
        } else {
            this.isSearching = false;
        }
    }

    reverseGeocode(point) {
        // console.log('Getting Address for: ', point);

        if (Point.validLatLong(this.searchLat, this.searchLon)) {
            this.geocoder.addressFromPoint(point).subscribe(
                response => {
                    this.processResponse(response.json());
                    this.searchText = this.searchResults[0].name;
                    this.wsChanged$.emit(new WsPoint(this.searchText, point));
                },
                error => {
                    console.log(error);
                },
                () => {
                });
        } else {
            // console.log('invalid latlng');
        }
    }

    public updateLat(latitude) {
        this.searchLat = latitude;
        this.reverseGeocode(new Point([this.searchLon, this.searchLat]));
    }

    public updateLon(longitude) {
        this.searchLon = longitude;
        this.reverseGeocode(new Point([this.searchLon, this.searchLat]));
    }

    processResponse(obj: any) {
        this.searchResults = [];
        for (var i in obj.results) {
            this.searchResults.push(
                new WsPoint(obj.results[0].formatted_address,
                    new Point([
                        obj.results[0].geometry.location.lng,
                        obj.results[0].geometry.location.lat
                    ])
                )
            );
        }

        this.listItems = [];        
        this.searchResults.forEach((location: WsPoint) => {
            this.listItems.push(new WsItem(location.name, location.point, undefined, false));
        });
    }

    selectItem(item: WsItem) {
        console.log({ item });
        this.searchText = item.name;
        this.searchLat = item.value.latitude();
        this.searchLon = item.value.longitude();
        this.isSearching = false;
        this.wsChanged$.emit(new WsPoint(item.name, item.value));
    }
}