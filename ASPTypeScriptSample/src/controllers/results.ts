namespace ASPTypeScriptSample.Controllers {
    export class HtmlResult {
        constructor(public content: string) { }

        toString() {
            return this.content;
        }
    }

    export class HttpErrorResult {
        constructor(public error: HttpError) { }

        toString() {
            return `${this.error.name}: ${this.error.message}`;
        }
    }
}