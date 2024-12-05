import { Color } from "src/models/color.model";
import { AbstractPromise } from "./AbstractRepository";

export interface IColorRepository extends AbstractPromise<Color>{
    findRelationById(id:number): Promise<Color>;
}