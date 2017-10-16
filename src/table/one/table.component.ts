import './table.style.scss';
import {BaseTable} from '../base'
import {Configuration}  from '../../common/configuration';
import {RecordSet} from '../../common/interfaces';
import {CommonProvider} from '../../common/providers';

declare let window;

export class TableOne extends BaseTable {

    private rows: Array<any>;
    private columns: Array<any>;
    private STRIPED_COLOR: string;

    protected onInit(): void {
        this.rows = [];
        this.columns = [];
        this.STRIPED_COLOR = '#F5F5F5';
    }

    public setStripedColor(color: string){
        this.STRIPED_COLOR = color;
        super.render();
    }

    protected processRecordSet(recordset: RecordSet, configuration: Configuration): void {
        if(configuration.dynamicColumns && recordset && recordset.columns){
            this.columns = recordset.columns.map(function(column){
                return {name: column, label: column, operation: ''};
            })
        }else{
            configuration
                .columns
                .forEach((column, index) => this.columns[index] = column);
        }
        this.columns = this.columns.sort((a, b) => a.sequence - b.sequence);
        this.rows = configuration.data ? configuration.data.rows : [];
    }

    private getTableHeader(){
        return this.columns.reduce((prev, next, index) => {
            return prev += `
                <th>
                    <strong>
                        ${next.label || next.name}
                    </strong>
                </th>
            `;
        }, ' ');
    }

    private getColumnIndex(column: any, recordset: RecordSet){
        let indexColumn = -1;
        recordset.columns.forEach((columnData, index) => {
            if(column && columnData == column.name) indexColumn = index;
        });
        return indexColumn;
    }

    private getColumnConditionalsFormatting(nextRow, nextColumn, recordset: RecordSet, configuration: Configuration){
        let toReturn = '';
        configuration.conditionalsFormatting = configuration.conditionalsFormatting || [];
        configuration.conditionalsFormatting.filter(data => {
            return data && nextColumn && data.field == nextColumn.name && data.typeColor == 'COLUMN';
        }).forEach(data => {
            let value = nextRow[this.getColumnIndex(nextColumn, recordset)];
            if(CommonProvider.isConditionalFormatting(data.condition, value, data.value) && data.color && data.color.value){
                toReturn += 'background-color: '+data.color.value+';';
            }
        });
        let columnType = configuration.data.types[this.getColumnIndex(nextColumn, recordset)] || 'String';

        if(columnType == 'Number'){
            toReturn += 'text-align: right;';
        }

        return toReturn;
    }

    private getRowConditionalsFormatting(nextRow, indexRow, recordset: RecordSet, configuration: Configuration){
        let toReturn = '';
        configuration.conditionalsFormatting = configuration.conditionalsFormatting || [];
        configuration.conditionalsFormatting.filter(data => {
            return data && data.typeColor == 'LINE';
        }).forEach(data => {
            let value = nextRow[this.getColumnIndex({name: data.field}, recordset)];
            if(CommonProvider.isConditionalFormatting(data.condition, value, data.value) && data.color && data.color.value){
                toReturn += 'background-color: '+data.color.value+';';
            }
        });
        if(toReturn == '' && (indexRow % 2) == 0){
            toReturn = 'background: '+ this.STRIPED_COLOR + ';';
        }
        return toReturn;
    }

    private getTableBody(recordset: RecordSet, configuration: Configuration){
        return this.rows.reduce((prevRow, nextRow, indexRow) => {
            return prevRow += `
                <tr>
                    ${
                      this.columns.reduce((prevColumn, nextColumn, indexColumn) => {
                        return prevColumn += `
                            <td style="${this.getRowConditionalsFormatting(nextRow, indexRow, recordset, configuration)}${this.getColumnConditionalsFormatting(nextRow, nextColumn, recordset, configuration)}">
                                ${this.formatValue(indexColumn, nextRow[this.getColumnIndex(nextColumn, recordset)])}
                            </td>
                        `;
                      }, ' ')
                    }
                </tr>
            `;
        }, ' ');
    }

    private getColumnSum(column, recordset: RecordSet){
        return this.rows.reduce((prev, next) => prev + next[this.getColumnIndex(column, recordset)], 0);
    }

    private getColumnFooterByOperation(column, recordset: RecordSet){
        switch (column.operation) {
            case 'SUM':
                return this.getColumnSum(column, recordset);
            case 'AVG':
                let value = this.getColumnSum(column, recordset) / this.rows.length;
                return value.toFixed(2);
            case 'COUNT':
                return this.rows.length;
        }
    }

    private getTableFooter(recordset: RecordSet, configuration: Configuration){
        return this.columns.reduce((prev, next, index) => {
            let value = '';
            if(next.operation){
                value = this.getColumnFooterByOperation(next, recordset);
                value = this.formatValue(index, value);
            }
            return prev += `
                <td>
                    ${value}
                </td>
            `;
        }, ' ');
    }

    private formatValue(index, value){
        if (value || value == 0) {
            this.columns[index].format = this.columns[index].format || '';
            this.columns[index].formatPrecision = this.columns[index].formatPrecision || 2;
            return CommonProvider.formatValue(value, this.columns[index].format, this.columns[index].formatPrecision);
        }
        return '';
    }

    private handlingSmartGrid(element: HTMLElement){
        if(!window.$) return;
        window.$(element.getElementsByTagName('table')[0]).smartGrid({
            head: true,
            foot: this.hasColumnsOperation(),
            left: 1
        });
    }

    private hasColumnsOperation(){
        return this.columns.filter(column => column.operation).length > 0;
    }

    protected generateTemplate(element: HTMLElement, recordset: RecordSet, configuration: Configuration): void {
        const template = `
        ${configuration.title ? `
            <h6 class="table-title">${configuration.title}</h6>  
        ` : ``}
        <div class="table-responsive simple-dashboard-table">
            <table class="table">
                <thead>
                    <tr>
                    ${this.getTableHeader()}
                    </tr>
                </thead>
                <tbody>
                    ${this.getTableBody(recordset, configuration)}
                </tbody>
                ${this.hasColumnsOperation() ? `
                <tfoot>
                    <tr>
                    ${this.getTableFooter(recordset, configuration)}
                    </tr>
                </tfoot>
                ` : ``}
            </table>
        </div>
        `;
        element.innerHTML = template;
        this.handlingSmartGrid(element);
    }

}