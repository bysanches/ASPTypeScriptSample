namespace ASPTypeScriptSample.Controllers {
    const viewRoot = '/src/views/student/';

    export class StudentController extends BaseController {
        index() {
            let term = Request.QueryString('term')();
            let repo = Repositories.createStudentRepository();
            let students = term ? repo.query(term) : repo.all();

            this.registerFilterPartial();
            View.setTitle('Students');
            return this.view(viewRoot + 'index.html', { term, items: students });
        }

        private registerFilterPartial() {
            Handlebars.registerPartial('filter', this.getTemplate(viewRoot + 'filter.html'))
        }

        details() {
            let id = Request.QueryString('id')();
            if (!id || id.length !== 36) return this.badRequest();

            let repo = Repositories.createStudentRepository();
            let student = repo.getById(id);

            if (student == null) return this.notFound();

            View.setTitle('Student Detail');
            return this.view(viewRoot + 'details.html', student);
        }

        create() {
            View.registerScript('/assets/js/student/edit.js');
            View.setTitle('New Student');
            return this.view(viewRoot + 'create.html', {});
        }

        edit() {
            let id = Request.QueryString('id')();
            if (!id || id.length !== 36) return this.badRequest();

            let repo = Repositories.createStudentRepository();
            let student = repo.getById(id);

            if (student == null) return this.notFound();

            View.registerScript('/assets/js/student/edit.js');
            View.setTitle('Edit Student');
            return this.view(viewRoot + 'edit.html', student);
        }

        save() {
            this.postOnly();

            let v = this.validateSave();

            if (!v.valid()) {
                return this.view('/src/views/shared/validation-error.html', v.getNotifications());
            }

            let cmd = this.getSaveCommand();
            
            let repo = Repositories.createStudentRepository();
            let id: string;

            if (cmd.id) {
                repo.update(cmd.id, cmd.name, cmd.document, cmd.birthdate);
                id = cmd.id;
            } else {
                id = repo.create(cmd.name, cmd.document, cmd.birthdate);
            }

            this.redirectTo('student', 'details', { id });
        }

        private validateSave() {
            let s = {
                id: Request.Form('id')(),
                name: Request.Form('name')(),
                document: Request.Form('document')(),
                birthdate: Request.Form('birthdate')(),
            };

            let v = new Validator()
                .fixedLength('id', s.id, 36)
                .required('name', s.name)
                .maxLength('name', s.name, 50)
                .required('document', s.document)
                .fixedLength('document', s.document, 11)
                .required('birthdate', s.birthdate)
                .date('birthdate', s.birthdate);

            return v;
        }

        private getSaveCommand(): SaveCommand {
            return {
                id: Request.Form('id')(),
                name: Request.Form('name')(),
                document: Request.Form('document')(),
                birthdate: moment(Request.Form('birthdate')(), 'DD/MM/YYYY').toDate()
            };
        }

        reset() {
            Session.Contents.Remove('students')
            this.redirectTo('student');
        }

        debug() {
            let data = JSON.parse(Session('students'));
            return `<pre>${JSON.stringify(data, null, 2)}</pre>`;
        }
    }

    interface SaveCommand {
        id?: string;
        name: string;
        document: string;
        birthdate: Date;
    }
}