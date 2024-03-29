import { MarkSheet } from "./MarkSheet";

export class Student {

    public Id!: number;
    public studentRollNumber!: string;

    public name!: string
    public age!: number

    public collageName!: string

    public email!: string
    public password!: string

    public number!: string
    public branch!: string
    public markSheets!: MarkSheet[]
}