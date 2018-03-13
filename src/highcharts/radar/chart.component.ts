import { BaseHighChart } from '../base';
import { RecordSet } from '../../common/interfaces';
import { CommonProvider } from '../../common/providers';
import { Configuration } from '../../common/configuration';

export class Radar extends BaseHighChart {

  private categories: Array<string>;
  private series: Array<any>;
  private maxValue;
  private minValue;

  protected onInit() {
    this.categories = new Array();
    this.series = new Array();
  }

  protected processRecordSet(recordset: RecordSet, configuration: Configuration) {
    let indexAxisX = this.getPosition(configuration.axisX.name);
    recordset
      .rows
      .forEach((row) => {
        var categorieValue = row[indexAxisX];
        categorieValue = CommonProvider.formatValue(categorieValue, configuration.axisX.format, configuration.axisX.formatPrecision)
        this.addCategorie(categorieValue);
      });
    configuration.lineAxisY.forEach((axisY) => {
      let indexLineAxisY = this.getPosition(axisY.name);
      let seriesLineAxisY = [];
      var color = axisY.color && axisY.color.value ? axisY.color.value : undefined;

      recordset
        .rows
        .forEach((row) => {
          seriesLineAxisY.push(Number(row[indexLineAxisY]));
          const conditionColor = this.getConditionFormatColor(axisY.name, Number(row[indexLineAxisY]), configuration, row);
          if(conditionColor) color = conditionColor;
        });
      this.addSerieArea(axisY, seriesLineAxisY, color);
    });

    let values = [];
    this.series.map(serie => serie.data).forEach(data => values = values.concat(data));
    this.maxValue = Math.max(...values);
    this.minValue = Math.min(...values);
  }

  protected getConditionFormatColor(column, value, configuration: Configuration, row){
    var result = undefined;
    configuration
        .conditionalsFormatting
        .filter(function(data) {
            return column && data.field && data.field.toLowerCase() === column.toLowerCase();
        })
        .forEach((data) => {
            if(data.compareOtherField){
                data.value = row[this.getPosition(data.fieldCompare)];
            }
            if(CommonProvider.isConditionalFormatting(data.condition, value, data.value)) {
                result = data.color.value;
            }
        });
    return result;
  }

  protected addSerieArea(axisY, values, color): void {
    this.series.push({
      name: (axisY.label || axisY.name), data: values, pointPlacement: 'on', color: color, type: 'area', dataLabels: {
        style: {
          fontSize: this.getFontSize() + "px"
        }
      }
    })
  }

  protected getHighChartConfiguration(configuration: Configuration) {
    return {
      chart: {
        spacingBottom: 50,
        spacingTop: 20,
        polar: true,
        type: 'line'
      },
      lang: {
        noData: "Sem dados para apresentar"
      },
      title: {
        text: configuration && configuration.title ? configuration.title : '',
        style: {
          fontSize: (this.getFontSize() + 7) + 'px'
        }
      },
      pane: {
        size: '80%'
      },
      exporting: {
        enabled: false
      },
      xAxis: {
        categories: this.categories,
        tickmarkPlacement: 'on',
        lineWidth: 0
      },
      yAxis: {
        gridLineInterpolation: 'circle',
        lineWidth: 0,
        min: this.minValue,
        max: this.maxValue,
        labels: {
          enabled: false
        }
      },
      credits: {
        enabled: false
      },
      plotOptions: {
        series: {
          dataLabels: {
            enabled: configuration.showValues ? true : false,
            formatter: function () {
              return '<b>' + CommonProvider.formatValue(this.y, configuration.format, configuration.formatPrecision) + '</b>'
            },
          }
        }
      },
      tooltip: {
        formatter: function () {
          return CommonProvider.formatValue(this.y, configuration.format, configuration.formatPrecision);
        },
        enabled: configuration.showValues != undefined ? configuration.showValues : true
      },
      series: this.series
    };
  }

  protected addCategorie(name: string): void {
    this.categories.push(name);
  }

}
