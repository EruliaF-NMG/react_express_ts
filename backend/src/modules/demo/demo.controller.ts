import { Request, Response } from "express";
import { Controller } from "../../core/decorators/controller.decorator";
import { Inject, Injectable } from "../../core/decorators/ioc.decorator";
import { Get } from "../../core/decorators/router.decorator";
import { IDemo } from "./interface/demo.service.interface";

@Injectable()
@Controller('/api/demo')
export default class DemoController {
    
    constructor(
        @Inject("IDemo") private _demo: IDemo,
    ) {}

    @Get("/get")
    get(req: Request, response: Response) {
       response.send({ data: this._demo.sayHelo() });
    }

}

