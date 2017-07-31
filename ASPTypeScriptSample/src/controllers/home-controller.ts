namespace ASPTypeScriptSample.Controllers {
    export class HomeController extends BaseController {
        index() {
            let model = { message: 'Classic ASP + TypeScript Sample Web App' };
            return this.view('/src/views/home/index.html', model);
        }

        about() {
            throw new Error('not implemented');
        }
    }
}