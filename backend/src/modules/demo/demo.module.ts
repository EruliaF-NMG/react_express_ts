
import { Module } from "../../core";
import DemoController from "./demo.controller";
import { DemoRepositories } from "./demo.repositories";
import { DemoService } from "./demo.service";

    

@Module({
    controllers:[DemoController],
    services:[{ provide: 'IDemo', useClass: DemoService }],
    repositories:[{ provide: 'IDemoRepo', useClass: DemoRepositories }],
})
export default class DemoModule{}