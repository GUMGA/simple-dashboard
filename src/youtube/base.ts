import { Configuration }  from '../common/configuration';
import { RecordSet } from '../common/interfaces';

export abstract class BaseYoutube {

    private configuration : Configuration;
    private recordset : RecordSet;
    private element: HTMLElement;

    constructor(element: HTMLElement, recordset: RecordSet, configuration: Configuration) {
        this.element = element;
        this.recordset = recordset;
        if(this.recordset){
          this.recordset.columns = this.recordset.columns || [];
          this.recordset.rows = this.recordset.rows || [];
        }
        this.configuration  = Object.assign({}, new Configuration(), configuration);
        this.render();
    }

    protected abstract onInit():void;
    protected abstract processRecordSet(recordset: RecordSet, configuration: Configuration):void;
    protected abstract generateTemplate(element: HTMLElement, recordset: RecordSet, configuration: Configuration):void;

    public render() :void {
        this.onInit();
        this.processRecordSet(this.recordset, this.configuration);
        this.generateTemplate(this.element, this.recordset, this.configuration);
    };
    
}
