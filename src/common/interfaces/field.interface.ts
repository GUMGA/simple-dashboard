import { StringValue, FieldOperation } from './index';

export interface Field {
  name: string;
  type: string;
  format: string;
  formatPrecision: number;
  label: string;
  icon: StringValue;
  color: StringValue;
  fontColor: StringValue;
  iconColor: StringValue;
  fontFamily: string;
  displayOrder: number;
  title: string;
  sequence: number;
  description: string;
  value: any;
  operation: FieldOperation;
  showValues: Boolean;
}
