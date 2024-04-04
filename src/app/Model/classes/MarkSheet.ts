import { Subject } from "./Subject"


export class MarkSheet {

    public markSheetId!: number
    public examinationDate!: string
    public semester!: number
    public status!: string
    public result!: string
    public subjects?: Subject[]
    public SGPA!: number
    public CGPB!: number
    public issueDate!: string
    public StudentId!: number

    constructor() {

    }



}