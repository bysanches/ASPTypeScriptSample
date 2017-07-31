namespace ASPTypeScriptSample.Routers {
    function isNullOrWhitespace(str: string) {
        return str == null || /^\s*$/.test(str);
    }

    function dashedToPascalCase(dashed: string): string {
        if (dashed != null) {
            return dashed.replace(/^([a-z])|-([a-z])/g,
                match => match.toUpperCase()).replace('-', '');
        }
    }

    export interface Router {
        route(): () => any;
    }

    export class QueryStringRouter implements Router {
        private controllerName: string;
        private actionName: string;

        constructor(defaultCtrl?: string, defaultAction?: string) {
            this.controllerName = Request.QueryString('c')();
            this.actionName = Request.QueryString('a')();

            if (isNullOrWhitespace(this.controllerName)) this.controllerName = defaultCtrl || 'home';
            if (isNullOrWhitespace(this.actionName)) this.actionName = defaultAction || 'index';
        }

        private getControllerClassName(controller: string): string {
            return dashedToPascalCase(controller) + 'Controller';
        }

        private invalidRoute() {
            throw new Error('Path not found:' +
                ` c = ${this.controllerName},` +
                ` a = ${this.actionName}`);
        }

        route() {
            let controllers = ASPTypeScriptSample.Controllers;
            let ctrlClassName = this.getControllerClassName(this.controllerName);

            let ctrlClass = controllers[ctrlClassName];
            let actionMethod = ctrlClass && ctrlClass.prototype[this.actionName];

            if (ctrlClass != null && actionMethod != null) {
                return () => actionMethod.call(new ctrlClass());
            } else {
                this.invalidRoute();
            }
        }
    }
}