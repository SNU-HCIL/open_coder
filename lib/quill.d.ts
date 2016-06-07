declare class Delta {
    constructor(options?: Object);
    retain(length, attributes?: Object);
    delete(length: number);
    insert(text, attributes?: Object);
}

declare class Quill {
    constructor(selector: string, options?: Object);

    //Retrieval
    getText(start?: number, end?: number);
    getLength();
    getContents(start?: number, end?: number);
    getHTML();

    //Manipulation
    insertText(index: number, text: string, source?: string);
    insertText(index: number, text: string, name: string, value: string, source?: string);
    insertText(index: number, text: string, formats: Object, source?: string);

    deleteText(start: number, end: number, source?: string);

    formatText(start: number, end: number, source?: string);
    formatText(start: number, end: number, name: string, value: string, source?: string);
    formatText(start: number, end: number, formats: Object, source?: string);

    insertEmbed(index: number, type: string, url: string, source?: string);
    updateContents(delta: Delta);
    setContents(delta: Delta);
    setHTML(html: string);
    setText(text: string);

    //Selection
    getSelection();
    setSelection(start: number, end: number, source?: string);
    setSelection(range: Object, source?: string);
    prepareFormat(format: string, value: string);
    focus();

    //Customization
    registerModule(name: string, options: Function);
    addModule(name: string, options?: Object);
    getModule(name: string);
    onModuleLoad(name: string, callback: Function);
    addFormat(name: string, config: Object);
    addContainer(cssClass: string, before: boolean);
}
