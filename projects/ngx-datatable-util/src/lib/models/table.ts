/******************************************
 ************* DEFAULT VALUES *************
 ******************************************/
import {Page} from './page';

export const COLUMN_TYPE = {
  HTML: 'html',
  TEXT: 'text',
  LIST: 'list',
  MONEY: 'money',
  BADGE: 'badge',
  ACTIVE: 'active'
};

export const COLUMN_HIDDEN = {
  NA: '',
  XS: 'xs',
  SM: 'sm',
  MD: 'md',
  LG: 'lg'
};

/*******************************************
 ************* INTERFACE TABLE *************
 *******************************************/

export interface ISelectRowCondition {
  key: string;
  value: any;
}

export interface ITableConfig {
  // for column total
  columnSum?: string[];
  hasFooter?: boolean;

  scrollH?: boolean;
  isCheckRow?: boolean;
  isSelectRow?: boolean;
  toggleRowBtn?: boolean;
  isDeleteColumn?: boolean;
  isGroupButtons?: boolean;

  selectRowCondition?: ISelectRowCondition[];

  searchCriterion?: string[];
  searchLabel?: string;

  // for server side pagination
  allowServerSidePage?: boolean;
  page?: Page;
}

export interface ITable {
  config: ITableConfig;

  rows?: any[];
  search?: any[];
  selectedRows?: any[];
}

/******************************************
 ************* DEFAULT VALUES *************
 ******************************************/

export const defaultTable: ITable = {
  config: {
    columnSum: [],
    hasFooter: false,

    scrollH: false,
    isCheckRow: false,
    isSelectRow: false,
    toggleRowBtn: false,
    isDeleteColumn: false,
    isGroupButtons: false,

    selectRowCondition: [],

    searchCriterion: [],
    searchLabel: 'Buscar',

    allowServerSidePage: false,
    page: new Page(),
  }
};
