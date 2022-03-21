import { defaultButton, ITableButton } from "./table-button";
import {UtilHelper} from "../helpers/util.helper";

/****************************************
 ************* BUTTON CLASS *************
 ****************************************/

export class TableButtonModel implements ITableButton {
  name: string;
  icon: string;
  color: string;

  label: string;
  helpLabel: string;

  condition: any;
  routerLink: string;
  onClickEvent: () => {};

  /**
   * onClickEvent: ejecuta primero que el routerLink
   * si el valor es true, el componente ignora el routerLink
   *
   * routerLink: debe especificar una ruta
   * si el routerLink esta vacio, el boton no hace nada
   * @param iTable
   */
  constructor(iTable: ITableButton) {
    this.name =           UtilHelper.setDefaultValue(iTable.name, defaultButton.name);
    this.icon =           UtilHelper.setDefaultValue(iTable.icon, defaultButton.icon);
    this.color =          UtilHelper.setDefaultValue(iTable.color, defaultButton.color);
    this.label =          UtilHelper.setDefaultValue(iTable.label, defaultButton.label);

    this.helpLabel =      UtilHelper.setDefaultValue(iTable.helpLabel, iTable.label);
    this.condition =      UtilHelper.setDefaultValue(iTable.condition, defaultButton.condition);
    this.routerLink =     UtilHelper.setDefaultValue(iTable.routerLink, defaultButton.routerLink);
    this.onClickEvent =   UtilHelper.setDefaultValue(iTable.onClickEvent, defaultButton.onClickEvent);
  }
}
