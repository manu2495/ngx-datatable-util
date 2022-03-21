import { Injectable } from '@angular/core';
import {MediaMatcher} from "@angular/cdk/layout";

@Injectable({
  providedIn: 'root'
})
export class NgxDatatableUtilService {

  mobileQuery: any = {};
  _mobileQueryListener: () => void;

  constructor(private media: MediaMatcher) {
    this.mobileQuery = {
      xs: this.media.matchMedia('(max-width: 575px)'),
      sm: this.media.matchMedia('(max-width: 768px)'),
      md: this.media.matchMedia('(max-width: 992px)'),
      lg: this.media.matchMedia('(max-width: 1200px)'),
      xl: this.media.matchMedia('(min-width: 1200px)')
    };
  }

  /**
   *
   * @param _mobileQueryListener
   */
  config(_mobileQueryListener) {
    this._mobileQueryListener = _mobileQueryListener;

    this.mobileQuery['xs'].addListener(this._mobileQueryListener);
    this.mobileQuery['sm'].addListener(this._mobileQueryListener);
    this.mobileQuery['md'].addListener(this._mobileQueryListener);
    this.mobileQuery['lg'].addListener(this._mobileQueryListener);
    this.mobileQuery['xl'].addListener(this._mobileQueryListener);
  }

  /**
   *
   */
  getConfigScreen() {
    return this.mobileQuery;
  }

  /**
   *
   */
  onDestroy() {
    this.mobileQuery['xs'].removeListener(this._mobileQueryListener);
    this.mobileQuery['sm'].removeListener(this._mobileQueryListener);
    this.mobileQuery['md'].removeListener(this._mobileQueryListener);
    this.mobileQuery['lg'].removeListener(this._mobileQueryListener);
    this.mobileQuery['xl'].removeListener(this._mobileQueryListener);
  }
}
