import { BaseHighChart } from '../base';
import { RecordSet } from '../../common/interfaces';
import { CommonProvider } from '../../common/providers';
import { Configuration } from '../../common/configuration';

export class Funnel extends BaseHighChart {

    private serie: any;

    protected onInit() {
        this.serie = {
            data: []
        };
    }

    protected processRecordSet(recordset: RecordSet, configuration: Configuration) {
        if (configuration.dataSeries && configuration.dataSeries.name && configuration.labelField && configuration.labelField.name) {
            let indexDataSeries = this.getPosition(configuration.dataSeries.name);
            let indexLabelField = this.getPosition(configuration.labelField.name);
            if (recordset) {
                recordset.rows = recordset.rows || [];
            }
            recordset.rows.forEach(row => {
                this.addSerie(row[indexLabelField], row[indexDataSeries],
                    this.getConditionFormatLabelColor(configuration, row[indexLabelField], row) || this.getConditionFormatLabelColor(configuration, row[indexDataSeries], row),
                    configuration);
            })
        }
    }

    protected getHighChartConfiguration(configuration: Configuration) {
        return {
            colors: configuration.colorPalette ? CommonProvider.getColorByPaletteKey(configuration.colorPalette, configuration.invertedColorPalette) : CommonProvider.getColorsPaletteDefault(configuration.invertedColorPalette),
            chart: {
                type: 'funnel',
                spacingBottom: 50
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
            legend: {
                itemStyle: {
                    fontSize: this.getFontSize() + 'px'
                }
            },
            tooltip: {
                enabled: configuration ? !configuration.dataLabelAxisY : false,
                formatter: function () {
                    return CommonProvider.formatValue(this.y, configuration.format, configuration.formatPrecision);
                }
            },
            plotOptions: {
                series: {
                    dataLabels: {
                        enabled: true,
                        formatter: function () {
                            return '<b>' + CommonProvider.formatValue(this.y, configuration.format, configuration.formatPrecision) + ' <br/> '+this.point.name+'</b>'
                        },
                    },
                    center: ['40%', '50%'],
                    neckWidth: '30%',
                    neckHeight: '25%',
                    width: '70%'
                }
            },
            credits: {
                enabled: false
            },
            exporting: {
                enabled: false
            },
            series: [this.serie]
        };
    }

    private addSerie(name: string, value: any, color: string, configuration: Configuration): void {
        let categorieValue = CommonProvider.formatValue(name, configuration.labelField.format, configuration.labelField.formatPrecision);   
        this.serie.data.push({name:categorieValue, y:Number(value), color: color, dataLabels: {
          style: {
            fontSize: this.getFontSize() + 'px'
          }
        }});
    }

    private getConditionFormatLabelColor(configuration: Configuration, value: any, row): string {
        let color = undefined;
        if(configuration.hasOwnProperty('conditionalsFormatting')){
          configuration.conditionalsFormatting.forEach(conditionalsFormatting => {
            if(conditionalsFormatting.compareOtherField){
              conditionalsFormatting.value = row[this.getPosition(conditionalsFormatting.fieldCompare)];
            }
            if(CommonProvider.isConditionalFormatting(conditionalsFormatting.condition, value, conditionalsFormatting.value)){
              color = conditionalsFormatting.color.value;
            }
          })
        }
        return color;
    }

}
