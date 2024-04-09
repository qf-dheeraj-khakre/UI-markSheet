import { NumberSymbol } from "@angular/common"

export class Subject {

    public id: number
    public subjectCode: string
    public subjectName: string
    public totalmark: Number
    public earnMarks: number
    public grade: string
    public marksheetid: number
    constructor() {
        this.id = 0
        this.subjectCode = ""
        this.subjectName = ""
        this.totalmark = 100
        this.earnMarks = 0
        this.grade = ""
        this.marksheetid = 0
    }
}