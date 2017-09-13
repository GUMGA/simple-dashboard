import { Title, Field, ConditionalFormatting, GaugeBand, NumberValue } from '../common/interfaces';

export class Configuration {

    title = {} as Title;
    axisX = {} as Field;
    axisY = [] as Array<Field>;
    dataSeries = {} as Field;
    labelField = {} as Field;
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

    constructor() {
      this.title = {
        text: ''
      }
      this.boardFontSize = 'SMALL';
      this.labelField.format = 'no_format';
      this.showValues = false;
      this.showLegend = true;
      this.showGridLineWidthAxisY = true;
      this.bands = new Array();
    }

}
