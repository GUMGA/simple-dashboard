import { Title, Field, ConditionalFormatting, GaugeBand, NumberValue, RecordSet, StringValue } from './interfaces';

export class Configuration {

    title : any = '';
    axisX = {} as Field;
    axisY = [] as any;
    dataSeries = {} as Field;
    labelField = {} as Field;
    field = {} as Field;
    fieldOne = {} as Field;
    fieldTwo = {} as Field;
    fieldThree = {} as Field;
    conditionalsFormatting = [] as Array<ConditionalFormatting>;
    boardFontSize: string;
    format: string;
    titleAxisY: string;
    stacking: string;
    precision: number;
    showLegend: Boolean;
    showValues: Boolean;
    showGridLineWidthAxisY: Boolean;
    dataLabelAxisY: Boolean;
    showLegendAxisY: Boolean;
    fixedValue: Boolean;
    minimumValue: Field;
    maximumValue: Field;
    currentValue: Field;
    beginningColor: string;
    middleColor: string;
    endColor: string;
    bands: Array<GaugeBand>;
    columnAxisY: Field;
    lineAxisY: Array<Field>;
    pies: Array<Configuration>;
    data: RecordSet;
    color: StringValue;
    fontColor: StringValue;
    iconColor: StringValue;
    icon: StringValue;
    mapIcon: String;
    mapiconSize: number;
    name: string;
    columns: Array<any>;
    dynamicColumns: Boolean;
    startAutomatically: Boolean;
    url: string;
    code: string;
    text: string;
    lastUpdate: any;
    showlastUpdate: Boolean;
    colorPalette: string;
    latField: string;
    lngField: string;
    invertedColorPalette: Boolean;
    formatPrecision: number;

    constructor() {
      this.boardFontSize = 'SMALL';
      this.labelField.format = 'no_format';
      this.showValues = false;
      this.showLegend = true;
      this.showGridLineWidthAxisY = true;
      this.bands = new Array();
      this.pies = new Array();
    }

}
