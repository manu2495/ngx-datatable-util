export interface ITableButton {
  name: string;
  icon?: string;
  color?: string;

  label?: string;
  helpLabel: string;

  condition?: any;
  routerLink?: string;
  onClickEvent?: (evt) => void;
}

/******************************************
 ************* DEFAULT VALUES *************
 ******************************************/

export const defaultButton: ITableButton = {
  name: '',
  icon: 'fa fa-eye',
  color: 'primary',
  label: '',
  helpLabel: '', // same as label
  condition: null,
  routerLink: '',
  onClickEvent: () => {},
}
