
import { Module } from "./core";
import DemoModule from "./modules/demo/demo.module";

@Module({
    modules:[DemoModule]
})
export default class MainModule{}