import { IDemoRepo } from './interface/demo.repositories.interface';

export class DemoRepositories implements IDemoRepo {

    public sayRepo(): Object {
        return { "say":"Repo...!!" };
    }

}