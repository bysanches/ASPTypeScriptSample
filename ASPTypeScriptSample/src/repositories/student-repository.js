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
    var Repositories;
    (function (Repositories) {
        function createStudentRepository() {
            return new InMemoryStudentRepository();
        }
        Repositories.createStudentRepository = createStudentRepository;
        function guid() {
            return s4() + s4() + '-' + s4() + '-' + s4() + '-' +
                s4() + '-' + s4() + s4() + s4();
        }
        function s4() {
            return Math.floor((1 + Math.random()) * 0x10000)
                .toString(16)
                .substring(1);
        }
        var InMemoryStudentRepository = (function () {
            function InMemoryStudentRepository() {
            }
            InMemoryStudentRepository.prototype.all = function () {
                var students;
                if (Session('students') != null) {
                    students = JSON.parse(Session('students'));
                }
                else {
                    students = [
                        { id: guid(), name: 'Ada', document: '81858948843', birthdate: new Date(1995, 0, 1) },
                        { id: guid(), name: 'Ben', document: '53666237070', birthdate: new Date(1990, 1, 2) },
                        { id: guid(), name: 'Cid', document: '71563144751', birthdate: new Date(2001, 2, 3) }
                    ];
                    setSession('students', JSON.stringify(students));
                }
                return students;
            };
            InMemoryStudentRepository.prototype.query = function (term) {
                term = term.toLowerCase();
                return this.all().filter(function (s) {
                    return s.name.toLowerCase().indexOf(term) > -1 ||
                        s.document.indexOf(term) > -1;
                });
            };
            InMemoryStudentRepository.prototype.getById = function (id) {
                var students = this.all().filter(function (s) { return s.id === id; });
                if (students.length === 1)
                    return students[0];
                return undefined;
            };
            InMemoryStudentRepository.prototype.create = function (name, document, birthdate) {
                var students = this.all();
                var newStudent = {
                    id: guid(),
                    name: name, document: document, birthdate: birthdate
                };
                students.push(newStudent);
                setSession('students', JSON.stringify(students));
                return newStudent.id;
            };
            InMemoryStudentRepository.prototype.update = function (id, name, document, birthdate) {
                var students = this.all();
                var student = students.filter(function (s) { return s.id === id; })[0];
                student.name = name;
                student.document = document;
                student.birthdate = birthdate;
                setSession('students', JSON.stringify(students));
            };
            return InMemoryStudentRepository;
        }());
        function fetchScalar(conn, sql) {
            return Repositories.using(conn.Execute(sql), function (rs) { return !rs.EOF ? rs.Fields(0).Value : undefined; });
        }
        var SqlStudentRepository = (function (_super) {
            __extends(SqlStudentRepository, _super);
            function SqlStudentRepository() {
                return _super !== null && _super.apply(this, arguments) || this;
            }
            SqlStudentRepository.prototype.all = function () {
                var _this = this;
                var sql = 'SELECT id, name, [document], birthdate FROM students';
                var result = [];
                Repositories.using(this.openConnection(), function (conn) {
                    Repositories.using(conn.Execute(sql), function (rs) {
                        while (!rs.EOF) {
                            result.push(_this.createStudent(rs));
                            rs.MoveNext();
                        }
                    });
                });
                return result;
            };
            SqlStudentRepository.prototype.query = function (term) {
                var _this = this;
                term = '%' + term + '%';
                var sql = "SELECT id, name, [document], birthdate\n                         FROM students\n                        WHERE name LIKE ?\n                           OR [document] LIKE ?";
                var result = [];
                Repositories.using(this.openConnection(), function (conn) {
                    var cmd = new ActiveXObject('ADODB.Command');
                    cmd.ActiveConnection = conn;
                    cmd.CommandText = sql;
                    cmd.Parameters.Append(cmd.CreateParameter('', adVarWChar, adParamInput, term.length, term));
                    cmd.Parameters.Append(cmd.CreateParameter('', adVarWChar, adParamInput, term.length, term));
                    Repositories.using(cmd.Execute(), function (rs) {
                        while (!rs.EOF) {
                            result.push(_this.createStudent(rs));
                            rs.MoveNext();
                        }
                    });
                });
                return result;
            };
            SqlStudentRepository.prototype.getById = function (id) {
                var _this = this;
                var sql = 'SELECT id, name, [document], birthdate FROM students WHERE id = ?';
                var student;
                Repositories.using(this.openConnection(), function (conn) {
                    var cmd = new ActiveXObject('ADODB.Command');
                    cmd.ActiveConnection = conn;
                    cmd.CommandText = sql;
                    cmd.Parameters.Append(cmd.CreateParameter('id', adVarWChar, adParamInput, 36, id));
                    Repositories.using(cmd.Execute(), function (rs) {
                        if (!rs.EOF) {
                            student = _this.createStudent(rs);
                        }
                    });
                });
                return student;
            };
            SqlStudentRepository.prototype.create = function (name, document, birthdate) {
                var id = guid();
                var sql = 'INSERT INTO students (id, name, [document], birthdate) VALUES (?, ?, ?, ?)';
                Repositories.using(this.openConnection(), function (conn) {
                    var cmd = new ActiveXObject('ADODB.Command');
                    cmd.ActiveConnection = conn;
                    cmd.CommandText = sql;
                    cmd.Parameters.Append(cmd.CreateParameter('id', adVarWChar, adParamInput, 36, id));
                    cmd.Parameters.Append(cmd.CreateParameter('name', adVarWChar, adParamInput, 50, name));
                    cmd.Parameters.Append(cmd.CreateParameter('document', adVarWChar, adParamInput, 11, document));
                    cmd.Parameters.Append(cmd.CreateParameter('birthdate', adDBDate, adParamInput, 0, ToVBDate(birthdate)));
                    cmd.Execute();
                });
                return id;
            };
            SqlStudentRepository.prototype.update = function (id, name, document, birthdate) {
                var sql = "UPDATE students\n                          SET name = ?,\n                              [document] = ?,\n                              birthdate = ?\n                        WHERE id = ?";
                Repositories.using(this.openConnection(), function (conn) {
                    var cmd = new ActiveXObject('ADODB.Command');
                    cmd.ActiveConnection = conn;
                    cmd.CommandText = sql;
                    cmd.Parameters.Append(cmd.CreateParameter('name', adVarWChar, adParamInput, 50, name));
                    cmd.Parameters.Append(cmd.CreateParameter('document', adVarWChar, adParamInput, 11, document));
                    cmd.Parameters.Append(cmd.CreateParameter('birthdate', adDBDate, adParamInput, 0, ToVBDate(birthdate)));
                    cmd.Parameters.Append(cmd.CreateParameter('id', adVarWChar, adParamInput, 36, id));
                    cmd.Execute();
                });
            };
            SqlStudentRepository.prototype.createStudent = function (rs) {
                return {
                    id: ('' + rs('id').Value).replace('{', '').replace('}', ''),
                    name: rs('name').Value,
                    document: rs('document').Value,
                    birthdate: new Date('' + rs('birthdate').Value)
                };
            };
            return SqlStudentRepository;
        }(Repositories.BaseRepository));
    })(Repositories = ASPTypeScriptSample.Repositories || (ASPTypeScriptSample.Repositories = {}));
})(ASPTypeScriptSample || (ASPTypeScriptSample = {}));
//# sourceMappingURL=student-repository.js.map