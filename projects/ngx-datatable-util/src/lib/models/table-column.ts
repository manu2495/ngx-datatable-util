import {COLUMN_HIDDEN, COLUMN_TYPE} from './table';

interface IStatusOption {
  value: number;
  color: string;
  label: string;
}

interface ITypeOption {
  // for COLUMN_TYPE: MONEY
  money: 'cordoba' | 'dollar';
}

export interface ITableColumn {
  name: string;
  title: string;

  type?: string;
  flex?: number;
  hidden?: string; // xs, sm, md, lg

  frozen?: boolean;
  alignRight?: boolean;
  typeOption?: ITypeOption; // for COLUMN_TYPE: MONEY
  statusOption?: IStatusOption[];
}

/******************************************
 ************* DEFAULT VALUES *************
 ******************************************/

export const defaultTypeOption : ITypeOption = {
  money: 'cordoba'
}

export const defaultStatusOption : IStatusOption = {
  value: 1,
  color: 'primary',
  label: 'No Especificado'
};

export const defaultTableColumn: ITableColumn = {
  name: '',
  title: '',
  type: COLUMN_TYPE.TEXT,
  flex: 2,
  hidden: COLUMN_HIDDEN.NA,
  frozen: false,
  alignRight: false,
  typeOption: defaultTypeOption,
  statusOption: [defaultStatusOption]
}
