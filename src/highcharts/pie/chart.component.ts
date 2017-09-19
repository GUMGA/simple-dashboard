import { BaseHighChart } from '../base';
import { RecordSet     } from '../../common/interfaces';
import { CommonProvider} from '../../common/providers';
import { Configuration }  from '../../common/configuration';

export class Pie extends BaseHighChart {

  private serie:any;

  protected onInit() {
    this.serie = {
      data: []
    };
  }

  protected processRecordSet(recordset: RecordSet, configuration: Configuration) {
    if(configuration.dataSeries && configuration.dataSeries.name && configuration.labelField && configuration.labelField.name) {
      let indexDataSeries = this.getPosition(configuration.dataSeries.name);
      let indexLabelField = this.getPosition(configuration.labelField.name);
      if(recordset){
        recordset.rows = recordset.rows || [];
      }
      recordset.rows.forEach(row => {
         this.addSerie(row[indexLabelField], row[indexDataSeries],
           this.getConditionFormatLabelColor(configuration, row[indexLabelField]) || this.getConditionFormatLabelColor(configuration, row[indexDataSeries]),
         configuration);
      })
    }
  }

  protected getHighChartConfiguration(configuration: Configuration) {
    return {
          chart: {
              plotBackgroundColor: null,
              plotBorderWidth: null,
              plotShadow: false,
              type: 'pie',
              zoomType: false
          },
          lang: {
              noData: "Sem dados para apresentar"
          },
          title: {
            text  : configuration.title.text,
            style : {
              fontSize: this.getFontSize() + 'px'
            }
          },
          legend: {
              itemStyle: {
                fontSize: this.getFontSize() + 'px'
              }
          },
          tooltip:{
             formatter: function () {
                 return CommonProvider.formatValue(this.y, configuration.format, configuration.precision);
             },
             enabled: !configuration.showValues ? true : false
         },
          plotOptions: {
              pie: {
                  allowPointSelect: false,
                  cursor: 'pointer',
                  dataLabels: {
                    enabled: configuration.showValues ? true : false,
                    formatter: function(){
                      return '<b>'+CommonProvider.formatValue(this.y, configuration.format, configuration.precision)+'</b>'
                    },
                  },
                  showInLegend: configuration.showLegend
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

  private addSerie(name:string, value:any, color: string, configuration: Configuration):void {
    let categorieValue = CommonProvider.formatValue(name, configuration.labelField.format, configuration.labelField.formatPrecision)
    this.serie.data.push({name:categorieValue, y:Number(value), color: color, dataLabels: {
      style: {
        fontSize: this.getFontSize() + 'px'
      }
    }});
  }

  private getConditionFormatLabelColor(configuration: Configuration, value: any):string {
    let color = undefined;
    if(configuration.hasOwnProperty('conditionalsFormatting')){
      configuration.conditionalsFormatting.forEach(conditionalsFormatting => {
        if(CommonProvider.isConditionalFormatting(conditionalsFormatting.condition, value, conditionalsFormatting.value)){
          color = conditionalsFormatting.color.value;
        }
      })
    }
    return color;
  }

}
