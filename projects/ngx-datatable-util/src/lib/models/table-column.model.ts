import { defaultTableColumn, ITableColumn } from "./table-column";
import {UtilHelper} from "../helpers/util.helper";

/****************************************
 ************* COLUMN CLASS *************
 ****************************************/

export class TableColumnModel implements ITableColumn {
  name: string;
  title: string;

  type?: string;
  flex?: number;
  hidden?: string;

  frozen?: boolean;
  alignRight?: boolean;

  typeOption?: any;
  statusOption?: any[];

  constructor(iTable: ITableColumn) {
    this.flex =     UtilHelper.setDefaultValue(iTable.flex, defaultTableColumn.flex);
    this.name =     UtilHelper.setDefaultValue(iTable.name, defaultTableColumn.name);
    this.title =    UtilHelper.setDefaultValue(iTable.title, defaultTableColumn.title);

    this.type =     UtilHelper.setDefaultValue(iTable.type, defaultTableColumn.type);
    this.hidden =   UtilHelper.setDefaultValue(iTable.hidden, defaultTableColumn.hidden);

    this.frozen =       UtilHelper.setDefaultValue(iTable.frozen, defaultTableColumn.frozen);
    this.alignRight =   UtilHelper.setDefaultValue(iTable.alignRight, defaultTableColumn.alignRight);
    this.typeOption =   UtilHelper.setDefaultValue(iTable.typeOption, defaultTableColumn.typeOption);
    this.statusOption = UtilHelper.setDefaultValue(iTable.statusOption, defaultTableColumn.statusOption);
  }
}
