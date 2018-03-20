import { Configuration } from '../../common/configuration';
import { RecordSet } from '../../common/interfaces';
import { CommonProvider } from '../../common/providers';
declare let window;

export class MapBox {

    private configuration: Configuration;
    protected recordset: RecordSet;
    private element: HTMLElement;

    constructor(element: HTMLElement, recordset: RecordSet, configuration: Configuration) {
        this.element = element;
        this.recordset = recordset;
        if (this.recordset) {
            this.recordset.columns = this.recordset.columns || [];
            this.recordset.rows = this.recordset.rows || [];
        }
        this.configuration = Object.assign({}, new Configuration(), configuration);
        this.render();
    }

    render() {
        let baseLayer = window.Leaflet.tileLayer('http://{s}.tile.osm.org/{z}/{x}/{y}.png', {
            accessToken: 'pk.eyJ1IjoiZ3VtZ2EiLCJhIjoiY2plem5zam01MGVyMDMzbm40c204ZnRzeCJ9.h991BuTgPT74-6cljbvLRg'
        });

        let markers = this.getMarkers(), group = window.Leaflet.featureGroup(markers);

        let map = window.Leaflet.map(this.element, {
            attributionControl: false,
            layers: [
                baseLayer,
                group
            ]
        });

        if (markers.length > 0) map.fitBounds(group.getBounds());
    }

    getPosition(column: string): number {
        return this.recordset.columns.filter(column => column != null).indexOf(column);
    }

    getMarkers() {
        let markers = [];

        let latIndex   = this.getPosition(this.configuration.latField),
            lngIndex   = this.getPosition(this.configuration.lngField),
            labelIndex = -1;
        
        if(this.configuration.labelField){
            labelIndex = this.getPosition(this.configuration.labelField.name);
        }

        this.recordset.rows.forEach(row => {
            let marker = window.Leaflet.marker([row[latIndex], row[lngIndex]], this.getCustomMarker());
            if(labelIndex != -1) {
                marker = marker.bindPopup(`${ CommonProvider.formatValue(row[labelIndex], this.configuration.labelField.format, this.configuration.labelField.formatPrecision)}`);
            }
            markers.push(marker);
        });

        return markers;
    }

    getCustomMarker() {
        let config = {};
        if (this.configuration.mapIcon) {
            config['icon'] = window.Leaflet.icon({
                iconUrl: this.configuration.mapIcon,
                iconSize: [
                    this.configuration.mapIconSize || 40,
                    this.configuration.mapIconSize || 40
                ]
            });
        }
        return config;
    }

}