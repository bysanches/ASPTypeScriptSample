var __extends = (this && this.__extends) || (function () {
    var extendStatics = Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
        function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
var ASPTypeScriptSample;
(function (ASPTypeScriptSample) {
    var Controllers;
    (function (Controllers) {
        var viewRoot = '/src/views/student/';
        var StudentController = (function (_super) {
            __extends(StudentController, _super);
            function StudentController() {
                return _super !== null && _super.apply(this, arguments) || this;
            }
            StudentController.prototype.index = function () {
                var term = Request.QueryString('term')();
                var repo = ASPTypeScriptSample.Repositories.createStudentRepository();
                var students = term ? repo.query(term) : repo.all();
                this.registerFilterPartial();
                ASPTypeScriptSample.View.setTitle('Students');
                return this.view(viewRoot + 'index.html', { term: term, items: students });
            };
            StudentController.prototype.registerFilterPartial = function () {
                Handlebars.registerPartial('filter', this.getTemplate(viewRoot + 'filter.html'));
            };
            StudentController.prototype.details = function () {
                var id = Request.QueryString('id')();
                if (!id || id.length !== 36)
                    return this.badRequest();
                var repo = ASPTypeScriptSample.Repositories.createStudentRepository();
                var student = repo.getById(id);
                if (student == null)
                    return this.notFound();
                ASPTypeScriptSample.View.setTitle('Student Detail');
                return this.view(viewRoot + 'details.html', student);
            };
            StudentController.prototype.create = function () {
                ASPTypeScriptSample.View.registerScript('/assets/js/student/edit.js');
                ASPTypeScriptSample.View.setTitle('New Student');
                return this.view(viewRoot + 'create.html', {});
            };
            StudentController.prototype.edit = function () {
                var id = Request.QueryString('id')();
                if (!id || id.length !== 36)
                    return this.badRequest();
                var repo = ASPTypeScriptSample.Repositories.createStudentRepository();
                var student = repo.getById(id);
                if (student == null)
                    return this.notFound();
                ASPTypeScriptSample.View.registerScript('/assets/js/student/edit.js');
                ASPTypeScriptSample.View.setTitle('Edit Student');
                return this.view(viewRoot + 'edit.html', student);
            };
            StudentController.prototype.save = function () {
                this.postOnly();
                var v = this.validateSave();
                if (!v.valid()) {
                    return this.view('/src/views/shared/validation-error.html', v.getNotifications());
                }
                var cmd = this.getSaveCommand();
                var repo = ASPTypeScriptSample.Repositories.createStudentRepository();
                var id;
                if (cmd.id) {
                    repo.update(cmd.id, cmd.name, cmd.document, cmd.birthdate);
                    id = cmd.id;
                }
                else {
                    id = repo.create(cmd.name, cmd.document, cmd.birthdate);
                }
                this.redirectTo('student', 'details', { id: id });
            };
            StudentController.prototype.validateSave = function () {
                var s = {
                    id: Request.Form('id')(),
                    name: Request.Form('name')(),
                    document: Request.Form('document')(),
                    birthdate: Request.Form('birthdate')()
                };
                var v = new Validator()
                    .fixedLength('id', s.id, 36)
                    .required('name', s.name)
                    .maxLength('name', s.name, 50)
                    .required('document', s.document)
                    .fixedLength('document', s.document, 11)
                    .required('birthdate', s.birthdate)
                    .date('birthdate', s.birthdate);
                return v;
            };
            StudentController.prototype.getSaveCommand = function () {
                return {
                    id: Request.Form('id')(),
                    name: Request.Form('name')(),
                    document: Request.Form('document')(),
                    birthdate: moment(Request.Form('birthdate')(), 'DD/MM/YYYY').toDate()
                };
            };
            StudentController.prototype.reset = function () {
                Session.Contents.Remove('students');
                this.redirectTo('student');
            };
            StudentController.prototype.debug = function () {
                var data = JSON.parse(Session('students'));
                return "<pre>" + JSON.stringify(data, null, 2) + "</pre>";
            };
            return StudentController;
        }(Controllers.BaseController));
        Controllers.StudentController = StudentController;
    })(Controllers = ASPTypeScriptSample.Controllers || (ASPTypeScriptSample.Controllers = {}));
})(ASPTypeScriptSample || (ASPTypeScriptSample = {}));
//# sourceMappingURL=student-controller.js.map