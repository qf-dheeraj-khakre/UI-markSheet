export class Template {
    public TemplateId: number;
    public TemplateName: string;
    public TemplateDomain: string;
    public TemplateString: string;
    public CkEditorString: string;
    public LastModifiedOn: Date;
    public LastModifiedBy: string;
    public IsActive: boolean;

    constructor() {
        this.TemplateId = 0;
        this.TemplateName = "";
        this.TemplateDomain = "";
        this.TemplateString = "";
        this.CkEditorString = "";
        this.LastModifiedOn = new Date();
        this.LastModifiedBy = "";
        this.IsActive = false;
    }
}