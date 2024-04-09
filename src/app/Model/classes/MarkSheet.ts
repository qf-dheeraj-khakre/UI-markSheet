import { Subject } from "./Subject"


export class MarkSheet {

    public markSheetId: number
    public examinationDate: string
    public semester: number
    public status: string
    public result: string
    public subjects: Subject[]
    public sgpa: number
    public cgpa: number
    public issueDate: string
    public StudentId: number

    constructor() {
        this.markSheetId = 0
        this.examinationDate = ""
        this.semester = 0
        this.status = ""
        this.result = ""
        this.subjects = []
        this.sgpa = 0
        this.cgpa = 0
        this.issueDate = ''
        this.StudentId = 0

    }



}