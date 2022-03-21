import {defaultTable, ISelectRowCondition, ITable, ITableConfig} from "./table";
import {Page} from "./page";
import {UtilHelper} from "../helpers/util.helper";

/**************************************
 ************* MAIN CLASS *************
 **************************************/

export class TableModel implements ITable {

  /* attributes */
  config: ITableConfig;

  rows: any[] = [];
  search: any[] = [];
  selectedRows: any[] = [];

  constructor(iTable: ITable = defaultTable) {
    // if config is undefined
    if (iTable.hasOwnProperty('config')) this.config = new TableConfigModel(iTable.config);
    else this.config = defaultTable.config;
  }

  set setRows(rows) {
    this.rows = rows;
    this.search = rows;
  }

  set setSelectedRows(rows) {
    this.selectedRows = rows;
  }

  setPage(totalElements, totalPages) {
    this.config.page.totalElements = totalElements;
    this.config.page.totalPages = totalPages;
  }
}

/****************************************
 ************* CONFIG CLASS *************
 ****************************************/

class TableConfigModel implements ITableConfig {
  columnSum: string[];
  hasFooter: boolean;

  scrollH: boolean;
  isCheckRow: boolean;
  isSelectRow: boolean;
  toggleRowBtn: boolean;
  isDeleteColumn: boolean;
  isGroupButtons: boolean;

  selectRowCondition: ISelectRowCondition[];
  searchCriterion: any[];
  searchLabel: string;

  allowServerSidePage: boolean;
  page: Page;

  constructor(iTable: any) {
    this.columnSum =            UtilHelper.setDefaultValue(iTable.columnSum, defaultTable.config.columnSum);

    this.scrollH =              UtilHelper.setDefaultValue(iTable.scrollH, defaultTable.config.scrollH);
    this.hasFooter =            UtilHelper.setDefaultValue(iTable.hasFooter, defaultTable.config.hasFooter);
    this.isCheckRow =           UtilHelper.setDefaultValue(iTable.isCheckRow, defaultTable.config.isCheckRow);
    this.isSelectRow =          UtilHelper.setDefaultValue(iTable.isSelectRow, defaultTable.config.isSelectRow);
    this.toggleRowBtn =         UtilHelper.setDefaultValue(iTable.toggleRowBtn, defaultTable.config.toggleRowBtn);
    this.isDeleteColumn =       UtilHelper.setDefaultValue(iTable.isDeleteColumn, defaultTable.config.isDeleteColumn);
    this.isGroupButtons =       UtilHelper.setDefaultValue(iTable.isGroupButtons, defaultTable.config.isGroupButtons);

    this.selectRowCondition =   UtilHelper.setDefaultValue(iTable.selectRowCondition, defaultTable.config.selectRowCondition);
    this.searchCriterion =      UtilHelper.setDefaultValue(iTable.searchCriterion, defaultTable.config.searchCriterion);
    this.searchLabel =          UtilHelper.setDefaultValue(iTable.searchLabel, defaultTable.config.searchLabel);
    this.allowServerSidePage =  UtilHelper.setDefaultValue(iTable.allowServerSidePage, defaultTable.config.allowServerSidePage);
    this.page =                 UtilHelper.setDefaultValue(iTable.page, defaultTable.config.page);
  }
}
