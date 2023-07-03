/*
 *
 * Copyright (c) Tamtron Oy. All rights reserved.
 *
 */

import { Pipe, PipeTransform } from '@angular/core';
import * as _ from 'lodash';
@Pipe({
  name: 'filterUser'
})
export class filterUsersPipe implements PipeTransform {
  transform(items: any[] | undefined, options: any): any[] {
    if (!_.isArray(items)) {
      return [];
    } else if (!options) {
      return items;
    }

    if (!_.isObject(options) || !Object.keys(options).length) {
      return _.filter(items, (item: any) => this.isMatchFound(item, options));
    }

    return _.filter(items, options);
  }

  private isMatchFound(item: any, searchStr: string): any { 
    if (!item || !Object.keys(item).length || !searchStr.length) {
      return false;
    }
     
    return 0 < Object.keys(item).filter((key: string) =>
      key && (key=="userName") && item[key] && item[key].toString().toLowerCase().includes(searchStr.toLowerCase())
    ).length;
    
  }
}
