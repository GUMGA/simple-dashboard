import './table.style.scss';
import {BaseTable} from '../base'
import {Configuration}  from '../../common/configuration';
import {RecordSet} from '../../common/interfaces';

export class TableOne extends BaseTable {
    private rows: Array<any>;
    private columns: Array<any>;

    protected onInit(): void {
        this.rows = [];
        this.columns = [];
    }

    protected processRecordSet(recordset: RecordSet, configuration: Configuration): void {
        if(configuration.dynamicColumns && recordset && recordset.columns){
            this.columns = recordset.columns.map(function(column){
                return {name: column, label: column, operation: ''};
            })
        }else{
            configuration
                .columns
                .forEach((column) => this.columns.push(column));
        }
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

    protected generateTemplate(element: HTMLElement, recordset: RecordSet, configuration: Configuration): void {
        const template = `
        <div class="simple-dashboard-table">
          <table class="table">
            <thead>
              <tr>
                <th>ID</th>
                <th>Name</th>
                <th>Link</th>
                <th>Status</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td data-title="ID">1</td>
                <td data-title="Name">Material Design Color Palette</td>
                <td data-title="Link">
                  <a href="https://github.com/zavoloklom/material-design-color-palette" target="_blank">GitHub</a>
                </td>
                <td data-title="Status">Completed</td>
              </tr>
              <tr>
                <td data-title="ID">1</td>
                <td data-title="Name">Material Design Color Palette</td>
                <td data-title="Link">
                  <a href="https://github.com/zavoloklom/material-design-color-palette" target="_blank">GitHub</a>
                </td>
                <td data-title="Status">Completed</td>
              </tr>
            </tbody>
          </table>
        </div>
        `;
        element.innerHTML = template;
    }

}