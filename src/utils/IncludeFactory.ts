import Dict = NodeJS.Dict;
import { Includeable } from 'sequelize';
import { Injectable } from '@nestjs/common';

@Injectable()
export default class IncludeFactory {

  constructor(private mapping: Dict<string>) {

  }

  build(entities: string | string[]): Includeable[] {
    if (!entities) return [];
    const requiredEntities = Array.isArray(entities) ? entities : [entities];
    const include = [];
    Object.keys(this.mapping).forEach(key => {
      if (requiredEntities.includes(key)) {
        include.push(this.mapping[key]);
      }
    });
    return include;
  }
}
