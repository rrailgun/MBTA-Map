import { Injectable } from '@angular/core';
import { TweakControl } from '../components/tweakpane/tweakpane.component';
import { FilterName, MBTAFilter } from '../models/mbta-filter';

@Injectable({
  providedIn: 'root'
})
export class FilterRequestService {

  private params: MBTAFilter = {};

  setDefaultParams(tweakControls: TweakControl[]) {
    tweakControls.forEach(tweak => {
      if (tweak.value !== undefined) this.updateParam(tweak.name, tweak.value)
    })
  }

  deleteParam(name: FilterName) {
    if (name in this.params) delete this.params[name]
  }

  updateParam(name: FilterName, value: any) {
    this.params[name] = value;
  }

  getParams(): MBTAFilter {
    return this.params;
  }


}

