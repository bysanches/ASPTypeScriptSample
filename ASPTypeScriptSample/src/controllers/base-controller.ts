namespace ASPTypeScriptSample.Controllers {
    export class BaseController {
        /**
         * Validates the current request to accept POST method only.
         */
        protected postOnly() {
            let method = Request.ServerVariables('REQUEST_METHOD')();
            if (method !== 'POST') {
                return this.methodNotAllowed();
            }
        }

        protected methodNotAllowed() {
            //Response.Clear();
            //Response.Status = '405 Method Not Allowed';
            //Response.End();
            return new HttpErrorResult(new MethodNotAllowedError());
        }

        protected badRequest() {
            //Response.Clear();
            //Response.Status = '400 Bad Request';
            //Response.End();
            return new HttpErrorResult(new BadRequestError());
        }

        protected notFound() {
            //Response.Clear();
            //Response.Status = '404 Not Found';
            //Response.End();
            return new HttpErrorResult(new NotFoundError());
        }

        protected redirectTo(ctrl: string, action: string = 'index', params?: object) {
            let url = `?c=${ctrl}&a=${action}`;
            let qs = '';
            if (params != null) {
                for (let key in params) {
                    if (params.hasOwnProperty(key)) {
                        if (qs.length > 0) qs += '&';
                        qs += key + '=' + Server.URLEncode(params[key]);
                    }
                }
            }
            url += qs.length > 0 ? '&' + qs : '';
            Response.Redirect(url);
        }

        protected getTemplate(path: string) {
            return View.getTemplate(path);
        }

        protected view(path: string, data: any) {
            let template = this.getTemplate(path);
            return new HtmlResult(template(data));
        }
    }
}