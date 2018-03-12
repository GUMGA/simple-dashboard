import { BaseHighChart } from '../base';
import { RecordSet     } from '../../common/interfaces';
import { Configuration }  from '../../common/configuration';
import { CommonProvider} from '../../common/providers';

export class Bar extends BaseHighChart {

  private categories: Array<string>;
  private series: Array<any>;

  protected onInit() {
    this.categories = new Array();
    this.series     = new Array();
  }

  protected processRecordSet(recordset: RecordSet, configuration: Configuration) {
        recordset.rows.forEach(row => {
        let categorieValue = row[this.getPosition(configuration.axisX.name)];
        this.addCategorie(categorieValue);
      });
      var indexAxisX = this.getPosition(configuration.axisX.name);
      if(configuration.dynamicColumns) {
          configuration.axisY = [];
          this.recordset.columns
              .filter((column) => configuration.axisX.name != column)
              .forEach((column) => configuration.axisY.push({name: column, label:column}));
      }
      configuration.axisY.forEach(axisY => {
        if(axisY && axisY.name){
          let indexAxisY = this.getPosition(axisY.name), values:Array<any> = [];
          recordset.rows.forEach((row, index) => {
             let value = row[indexAxisY];
             let color = this.getConditionFormatColor(axisY.name, value, configuration, row) || this.getConditionFormatColor(configuration.axisX.name, row[indexAxisX], configuration, row)
             if(color) {
                 values.push({y:Number(value), color: color});
             } else {
                 values.push(Number(value));
             }
          });
          let color = axisY.color && axisY.color.value ? axisY.color.value : null;
          this.addSerie(axisY.label ? axisY.label : axisY.name, values, color);
        }
      })
  }

  private getConditionFormatColor(column, value, configuration: Configuration, row) {
    let result = undefined;
    configuration.conditionalsFormatting = configuration.conditionalsFormatting || [];
    configuration
        .conditionalsFormatting
        .filter((data) => {
            return data.field && data.field.toLowerCase() === column.toLowerCase();
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

  protected getHighChartConfiguration(configuration: Configuration) {
    let stacking = (!configuration.stacking || configuration.stacking === 'DISABLE') ? null : configuration.stacking.toLowerCase();

    return {
        colors: configuration.dynamicColumns && configuration.colorPalette ? CommonProvider.getColorByPaletteKey(configuration.colorPalette, configuration.invertedColorPalette) : CommonProvider.getColorsPaletteDefault(configuration.invertedColorPalette) ,
        chart: {
            type: 'column',
            zoomType: false,
            spacingBottom: 50,
            spacingTop: 20
        },
        lang: {
            noData: "Sem dados para apresentar"
        },
        title: {
          text: configuration.title && configuration.title ? configuration.title : '',
          style: {
            fontSize: (this.getFontSize() + 7) +"px"
          }
        },
        xAxis: {
            categories: this.categories,
            title: {
                text: configuration ? configuration.axisX.label : 'Titulo do eixo horizontal'
            },
            labels: {
                formatter: function () {
                    let mask = configuration.axisX && configuration.axisX.format ? configuration.axisX.format : configuration.format;
                    return CommonProvider.formatValue(this.value, mask, configuration.axisX.formatPrecision);
                },
                style: {
                   fontSize: this.getFontSize() + "px"
                }
            }
        },
        legend: {
            enabled: configuration ? configuration.showLegendAxisY : true,
            itemStyle: {
              fontSize: this.getFontSize() + "px"
            }
        },
        tooltip: {
            enabled: configuration ? !configuration.dataLabelAxisY : false,
            formatter: function () {
                return CommonProvider.formatValue(this.y, configuration.format, configuration.formatPrecision);
            }
        },
        zAxis: {
          labels: {
            style: {
              fontSize: this.getFontSize() + "px"
            }
          }
        },
        yAxis: {
            gridLineWidth: configuration ? configuration.showGridLineWidthAxisY ? 1 : 0 : 1,
            title: {
                text: ''
            },
            labels: {
                formatter: function () {
                    return CommonProvider.formatValue(this.value, configuration.format, configuration.formatPrecision);
                },
                style: {
                  fontSize: this.getFontSize() + "px"
                }
            }
        },
        credits: {
            enabled: false
        },
        exporting: {
            enabled: false
        },
        series: this.series,
        plotOptions: {
            column: {
                stacking: stacking,
                dataLabels: {
                    enabled: configuration ? configuration.dataLabelAxisY : true,
                    formatter: function () {
                        return CommonProvider.formatValue(this.y, configuration.format, configuration.formatPrecision);
                    }
                }
            }
        }
      }
  }

  private addCategorie(name:string):void {
    this.categories.push(name);
  }

  private addSerie(name:string, values:Array<any>, color: string):void {
      let serie = {
          name: name,
          data: values,
          color: color,
          dataLabels: {}
      }
      if(!color) {
          delete serie.color;
      }
      this.series.push(serie);

  }

}
