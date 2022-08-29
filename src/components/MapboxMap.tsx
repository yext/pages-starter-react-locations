// MapboxMap.tsx
import React, { useRef, useLayoutEffect } from "react";
import ReactDOM from "react-dom";
import { useSearchState, Result } from "@yext/search-headless-react";
import mapboxgl, { Map } from "mapbox-gl";
import "mapbox-gl/dist/mapbox-gl.css";

interface Coordinate {
  latitude?: number,
  longitude?: number,
}

type CoordinateGetter<TEntity> = (result: Result<TEntity>) => Coordinate | undefined;

export type MapPinComponent<TEntity> = (props: { result: Result<TEntity> }) => JSX.Element;

interface MapProps<TEntity> {
  mapboxAccessToken: string;
  mapboxStyle?: string | mapboxgl.Style;
  PinComponent?: MapPinComponent<TEntity>;
  getCoordinate: CoordinateGetter<TEntity>;
  defaultCenter?: mapboxgl.LngLatLike;
}

function notEmpty<TValue>(value: TValue | null | undefined): value is TValue {
  return value !== null && value !== undefined;
}

interface BoundingArea {
  west: number;
  east: number;
  south: number;
  north: number;
  sw: mapboxgl.LngLat;
  ne: mapboxgl.LngLat;
  llb: mapboxgl.LngLatBounds;
  centerLng: number;
  centerLat: number;
};

function calculateBoundingArea<TEntity>(
  results: Result<TEntity>[],
  getCoordinate: CoordinateGetter<TEntity>
): BoundingArea {

  const lats = results.map(result => getCoordinate(result)?.latitude)
  const lngs = results.map(result => getCoordinate(result)?.longitude);

  const nonNullLats = lats.filter(notEmpty);
  const nonNullLngs = lngs.filter(notEmpty);

  const west = Math.min(...nonNullLats);
  const east = Math.max(...nonNullLats);
  const south = Math.min(...nonNullLngs);
  const north = Math.max(...nonNullLngs);

  const sw = new mapboxgl.LngLat(south, west);
  const ne = new mapboxgl.LngLat(north, east);
  const llb = new mapboxgl.LngLatBounds(sw, ne);

  const centerLng = west - (east - west) / 2;
  const centerLat = north - (north - south) / 2;

  return {
    west,
    east,
    south,
    north,
    sw,
    ne,
    llb,
    centerLng,
    centerLat
  }
}

function MapboxMap<TEntity>({
  mapboxAccessToken,
  PinComponent,
  getCoordinate,
  mapboxStyle = "mapbox://styles/mapbox/streets-v11",
  defaultCenter = [-122.33, 47.60],
}: MapProps<TEntity>): JSX.Element {

  mapboxgl.accessToken = mapboxAccessToken;

  //TODO: Don't just cast this, use TS Generics
  const results = useSearchState(s => s.vertical.results) as any as Result<TEntity>[];

  const mapContainer = useRef<HTMLDivElement | null>(null);
  const map = useRef<Map | null>(null);

  useLayoutEffect(() => {
    if (map.current) {
      return;
    } else {
      let center = defaultCenter;
      if (results) {
        const { centerLng, centerLat } = calculateBoundingArea(results, getCoordinate);
        center = [centerLng, centerLat];
      }
      map.current = new mapboxgl.Map({
        accessToken: mapboxAccessToken,
        container: mapContainer.current || '',
        style: mapboxStyle,
        interactive: true,
        center: center,
        zoom: 9,
      });
      map.current.addControl(new mapboxgl.NavigationControl());
    }
  }, [results])

  useLayoutEffect(() => {
    if (results && map.current) {
      results?.forEach((result, i) => {
        const coordinates = getCoordinate(result);
        if (coordinates && coordinates.latitude && coordinates.longitude) {
          const { latitude, longitude } = coordinates;
          const coord = { lat: latitude, lon: longitude };
          const el = document.createElement('div');
          PinComponent && ReactDOM.render(<PinComponent result={result} />, el);
          el.className = "marker";
          new mapboxgl.Marker(el)
            .setLngLat(coord)
            // @ts-ignore: Object is possibly 'null'.
            .addTo(map.current);
        }
      });
      if (results.length > 0) {
        const boundingArea = calculateBoundingArea(results, getCoordinate);
        map.current.fitBounds(boundingArea.llb);
      }
    }
  }, [results])

  return (
    <div className="h-full w-full">
       <div ref={mapContainer} className="w-full h-full map-container" />
    </div>
  )
}

export default MapboxMap;