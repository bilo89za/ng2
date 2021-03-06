# The Map

The Map component uses [LeafletJS](http://leafletjs.com/), an open-source Javascript library for mobile-friendly interactive maps.

In this document, we cover the composition of the map component, it's functionality and how to include it in other projects.

## Getting Started

To start using the map, you need to import it into the respective Angular 2 Component (e.g. `test.component.ts`):

`test.component.ts`:
```js
// The Angular 2 component using the map 
import { Component } from '@angular/core'
import { MapComponent } from 'path-to-map/map.component'
import { WsMapService, WsMapPoint, WsMapLine } from 'path/to/map/ws-map.component'
import template from './text.component.html!text';
import style from './text.component.css!text';

@Component({
    selector: 'test',
    template,
    styles: [ style ]
})
export class TestComponent {
    constructor(@Inject(WsMapService) private map: WsMapService) { }
}
```

`test.component.html`:
```html
<ws-map></ws-map>
```

And voila, you should be able to see a map on this component.

## Map Actions

All interactions with the map are performed via the `MapService`. Effectively, the MapService contains a bunch of events, which the map component listens to.

### Example
If you would like to draw a point on a map, you would use the MapService's `showPoints$` event, specifying an array of type `MapPoint`, as follows:

`test.component.ts`:
```js
this.map.showPoints$.emit( [ new MapPoint('Point name', new Point([18.4239,-33.9235]), '#00ADEE') ] );
```

All events follow this convention, so rather than providing an example of each event in use, we will provide a table with all existing events in the sections that follow.
All geographic shapes (lines, points, polygons, etc.) use the [GeoJSON](http://geojson.org/geojson-spec.html#geojson-objects) standard.

## Map Events & Classes 

There are various classes and events, requiring those classes, for map interactions to occur.

### Classes

**MapPoint**: Display a Point with a label
```js
class MapPoint {
    constructor(
        name: string,
        point: Point // GeoJson
    ) { }
}
```

**MapPoint**: Display a Line with a color
```js
class MapLine {
    constructor(
        color: string,
        linestring: LineString // GeoJson
    ) { }
}
```

### Events

- `showPoints$`: MapPoint[]
- `showLines$`: MapLine[]