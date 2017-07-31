namespace ASPTypeScriptSample.View {
    var scripts = [];

    export function registerScript(src: string) {
        scripts.push(src);
    }

    export function renderScripts() {
        return scripts.map(src => `<script src="${src}"></script>`).join();
    }

    export function getTemplate(path: string) {
        var stream = new ActiveXObject('ADODB.Stream') as ADODB.Stream;
        stream.Type = adTypeText;
        stream.CharSet = 'utf-8';
        stream.Open();
        stream.LoadFromFile(Server.MapPath(path));
        var result = stream.ReadText();
        stream.Close();

        return Handlebars.compile(result);
    }

    export function activeNavItem(controller: string, action: string = 'index') {
        let c = Request.QueryString('c')() || 'home';
        let a = Request.QueryString('a')() || 'index';

        if (controller === c && action === a)
            return 'active';
    }

    export function navItem(label: string, controller: string = 'home', action: string = 'index') {
        let active = activeNavItem(controller, action);

        return `<li class="nav-item ${active}">
                  <a class="nav-link" href="?c=${controller}&a=${action}">${label}</a>
                </li>`;
    }

    let title: string;

    export function setTitle(t: string) {
        title = t;
    }

    export function getTitle() {
        return (title && title + ' - ' || '') + 'Classic ASP + TypeScript';
    }
}