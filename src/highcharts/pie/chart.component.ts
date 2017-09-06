import { BaseHighChart } from '../base';
import { RecordSet     } from '../../common/interfaces';
import { CommonProvider} from '../../common/providers';
import { Configuration } from '../';

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
         this.addSerie(row[indexLabelField], row[indexDataSeries], this.getConditionFormatLabelColor(configuration, row[indexLabelField]) || this.getConditionFormatLabelColor(configuration, row[indexDataSeries]));
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
          title: configuration.title,
          legend: {
              itemStyle: {
              }
          },
          tooltip:{
              enabled: true
          },
          plotOptions: {
              pie: {
                  allowPointSelect: false,
                  cursor: 'pointer',
                  dataLabels: {
                      enabled: true
                  },
                  showInLegend: true
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

  private addSerie(name:string, value:any, color: string):void {
    this.serie.data.push({name:name, y:Number(value), color: color, dataLabels: {
      style: {
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
