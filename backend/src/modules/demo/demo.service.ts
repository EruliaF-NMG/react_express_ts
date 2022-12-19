

import { Inject, Injectable } from '../../core/decorators/ioc.decorator';
import { IDemoRepo } from './interface/demo.repositories.interface';
import { IDemo } from './interface/demo.service.interface';

@Injectable()
export class DemoService implements IDemo {

    constructor(
       @Inject("IDemoRepo") private _demo: IDemoRepo,
    ) {}


    public sayHelo(): Object {
        return this._demo.sayRepo();
    }

}