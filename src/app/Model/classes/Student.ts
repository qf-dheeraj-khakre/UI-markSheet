import { MarkSheet } from "./MarkSheet";

export class Student {

    public id: Number
    public studentRollNumber!: string;
    public name: string
    public age: number
    public DOB: string
    public collageName: string

    public email: string
    public password: string

    public number: string
    public branch: string
    public markSheets: MarkSheet[]

    constructor() {
        this.id = 0;
        this.studentRollNumber = '';
        this.name = ''
        this.password = ""
        this.age = 0
        this.collageName = ''
        this.markSheets = []
        this.email = ''
        this.number = ''
        this.branch = ''
        this.DOB = ''
    }
}