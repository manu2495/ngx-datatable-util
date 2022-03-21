import {
  ChangeDetectorRef,
  Component,
  EventEmitter,
  HostListener,
  Input,
  OnInit,
  Output,
  TemplateRef,
  ViewChild
} from '@angular/core';
import {ColumnMode, DatatableComponent, SelectionType} from "@swimlane/ngx-datatable";
import {ITableButton} from "./models/table-button";
import {COLUMN_TYPE, ITable} from "./models/table";
import {ITableColumn} from "./models/table-column";
import {Router} from "@angular/router";
import {NgxDatatableUtilService} from "./ngx-datatable-util.service";
import {UtilHelper} from "./helpers/util.helper";

export interface OnTableBtnInterface {
  id: number; // row's ID
  element: any;
  button: ITableButton;
}

interface IContextEvent {
  row: any;
  button: ITableButton;
  show: boolean;
  x: 0;
  y: 0;
}

@Component({
  selector: 'lib-ngx-datatable-util',
  templateUrl: './ngx-datatable-util.component.html',
  styles: [
  ]
})
export class NgxDatatableUtilComponent implements OnInit {
  columnType = COLUMN_TYPE;

  /**
   * input with all configurations data
   */
  @Input() flex: number = 0;
  @Input() dataTable: ITable;
  @Input() dataTableColumn: ITableColumn[] = [];
  @Input() dataTableButton: ITableButton[] = [];
  @Input() rowLimit: number = 8;

  /**
   * config for table
   */
  loading: boolean = false;
  @ViewChild(DatatableComponent) table: DatatableComponent;

  // define si el estado de un catalogo ha pasado de activo a inactivo
  @Output() onTableRowSelected: EventEmitter<any> = new EventEmitter<any>();
  @Output() onBtnActiveClicked: EventEmitter<any> = new EventEmitter<any>();
  @Output() onTableBtnClicked: EventEmitter<OnTableBtnInterface> = new EventEmitter<OnTableBtnInterface>();

  // item template
  // using in row toggle to show different details
  @Input() itemTemplate: TemplateRef<any>;

  // for toggle button and arrow
  toggleActive = { '0': false };

  // using for temporary data
  btnTempClicked = undefined;

  /**
   * responsive configuration
   */
  screenQuery: any = {};
  _mobileQueryListener: () => void;

  /**
   * server side pagination
   */
  @Output() onSetServerSidePage: EventEmitter<any> = new EventEmitter<any>();

  /**
   * table configuration
   */
  columnMode = ColumnMode;
  selectionType = SelectionType;

  /**
   * context menu
   */
  contextEvent: IContextEvent = { row: undefined, show: false, button: undefined, x: 0, y: 0};

  /**
   * constructor
   * @param router
   * @param toast
   * @param modalService
   * @param responsiveService
   * @param changeDetectorRef
   */
  constructor(private router: Router,
              private changeDetectorRef: ChangeDetectorRef,
              private responsiveService: NgxDatatableUtilService) {

    this._mobileQueryListener = () => changeDetectorRef.detectChanges();
    this.responsiveService.config(this._mobileQueryListener);
    this.screenQuery = responsiveService.getConfigScreen();
  }

  /**************************************************** END OF CONSTRUCTOR **************************************************************/

  ngOnInit() {
  }

  ngOnDestroy(): void {
    this.responsiveService.onDestroy();
  }

  /**************************************************** INIT **************************************************************/

  search(event) {
    let value = event.target.value.toLowerCase();
    this.searchByCriterion(value);
  }

  searchByCriterion(value, index = 0) {
    this.dataTable.rows = this.dataTable.search.filter((element) => {
      return element[this.dataTable.config.searchCriterion[index]].toLowerCase().indexOf(value) !== -1 || !value;
    });

    if (this.dataTable.rows.length <= 0) {
      if (index < this.dataTable.config.searchCriterion.length - 1) {
        index = index + 1;
        this.searchByCriterion(value, index);
      }
    }
  }

  /**************************************************** ROW EXPAND DETAIL **************************************************************/

  /**
   * detail row
   * @param row
   */
  toggleExpandRow(row) {
    this.table.rowDetail.toggleExpandRow(row);
  }

  /**************************************************** CHECK OPTION **************************************************************/

  showCheckOption(row) {
    return this.dataTable.config.selectRowCondition.every(e => row[e.key] == e.value);
  }

  /**************************************************** SERVER SIDE PAGE **************************************************************/

  setPage(event) {
    this.dataTable.config.page.pageNumber = event.offset;
    event.offset += 1;
    this.onSetServerSidePage.emit(event);
  }

  /**************************************************** SELECTION MODE **************************************************************/

  /**
   * evento emite cuando selecciona una fila de la tabla
   * @param event
   */
  onSelect(event) {
    this.onTableRowSelected.emit(event.selected);
  }

  onActivate(event) {
    // only work when you click a row
    if (event.type === 'click' && event.cellIndex == 0) {
      if (
        event.event.target.className.indexOf('btn-option-modal') == -1 &&
        event.event.target.className.indexOf('fa-bars') == -1 &&
        event.event.target.className.indexOf('datatable-body-cell') == -1 &&
        event.event.target.className.indexOf('card-body') == -1
      ) {
        event.cellElement.blur();

        this.onTableBtnClickEvent(this.btnTempClicked, event.row.id, event.row);
        this.btnTempClicked = undefined;
      }
    }
  }

  onContextMenu(event) {
    event.event.preventDefault();
    event.event.stopPropagation();

    // show menu item with right click
    this.contextEvent.row = event.content;

    this.contextEvent.show = true;
    this.contextEvent.x = event.event.pageX;
    this.contextEvent.y = event.event.pageY;
  }

  onClickContextMenuItem(event, button) {
    // save the action of the right click
    this.contextEvent.button = button;

    if (this.contextEvent.row != undefined && this.contextEvent.button != undefined) {
      this.onTableBtnClickEvent(this.contextEvent.button, this.contextEvent.row.id, this.contextEvent.row);

      // reset menu
      this.contextEvent.row = undefined;
      this.contextEvent.button = undefined;

      // hide menu
      this.contextEvent.show = false;
      this.contextEvent.x = 0;
      this.contextEvent.y = 0;
    }
  }

  /**************************************************** FOOTER **************************************************************/

  getMoney(columnSum) {
    let column = this.dataTableColumn.find(e => e.name == columnSum);
    return column.typeOption.money;
  }

  // show total in money configured in typeOption.money
  getTotal(columnSum) {
    return UtilHelper.sumArray(this.dataTable.rows, columnSum);
  }

  /**************************************************** ROUTER LINK **************************************************************/

  /**
   * cerrar modal cuando le das click fuera del boton del menu de opciones
   * @param event
   */
  @HostListener('document:click', ['$event'])
  clickOut(event) {
    if (!this.dataTable) return;

    // hide context menu when you click outside of them
    if (this.contextEvent.show) {
      if (event.target.className !== 'context-card') {
        this.contextEvent.show = false;
        this.contextEvent.x = 0;
        this.contextEvent.y = 0;
      }
    }

    if (this.dataTable.rows.some(e => e.open))
      if (event.target.className.indexOf('btn-option-modal') == -1 && event.target.className.indexOf('fa-bars') == -1) {
        this.closeAllBtnOptionModal();
      }
  }

  openBtnOptionModal(row) {
    this.closeAllBtnOptionModal(row);
    row.open = !row.open;
  }

  closeAllBtnOptionModal(row = undefined) {
    this.dataTable.rows.filter(e => row ? e.id != row.id : true).forEach(e => e.open = false);
  }

  /**
   * use this for save temporary data
   * @param button
   */
  onClickBtnEvent(button) {
    this.btnTempClicked = button;
  }

  onTableBtnClickEvent(button: ITableButton, id, row) {
    if (id == undefined) {
      console.log('property id not defined');
      return;
    }

    if (button == undefined) return;
    if (button.routerLink != '') {
      this.router.navigate([this.routerLinkFormat(button.routerLink, id)]).then();
    } else {
      button.onClickEvent({ id: id, element: row, button: button });
      this.onTableBtnClicked.emit({ id: id, element: row, button: button });
    }
  }

  routerLinkFormat(url, id) {
    return UtilHelper.routerLinkFormat(url, id);
  }

  /**************************************************** ACTIONS **************************************************************/

  delete(row) {
    // const modal = this.modalService.open(ConfirmationModalComponent);
    // modal.componentInstance.message = 'Esta seguro que desea eliminar el siguiente elemento?';
    //
    // modal.result.then((result) => {
    //   if (result) {
    //     this.onBtnActiveClicked.emit({id: row.id, estaActivo: false});
    //   }
    // }, () => {});
  }

  /**************************************************** HELPERS **************************************************************/

  calculateColumnBtnLength(buttons: ITableButton[]) {
    if (this.flex != 0) return this.flex;
    if (this.dataTable.config.isGroupButtons) return 0.5;

    if (this.screenQuery['xs'].matches && buttons.length == 0) return 0.3;
    if (this.screenQuery['xs'].matches && buttons.length == 1) return 0.5;

    let exp = 0;
    buttons.forEach(e => { exp += e.label != '' ? 1 : 0.5});

    if (exp == 0) exp = 1;

    if (UtilHelper.isMobile()) return exp + 0.5;
    return (buttons.length == 1) ? (exp + 0.5) : ( (buttons.length == 3) ? (exp - 0.5) : (exp) );
    // return 1;
  }
}
