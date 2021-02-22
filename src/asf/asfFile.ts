import {File} from "../file";
import UuidWrapper from "../uuidWrapper";
import BaseObject from "./objects/baseObject";

export default class AsfFile extends File {
    public readDWord(): number {}
    public readGuid(): UuidWrapper {}
    public readQWord(): bigint {}
    public readObject(position: number): BaseObject {}
    public readObjects(count: number, position: number): BaseObject[] {}
    public readUnicode(length: number): string {}
    public readWord(): number {}
}
