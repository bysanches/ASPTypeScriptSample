namespace ASPTypeScriptSample.Repositories {
    export interface StudentRepository {
        all(): Student[];
        query(term: string): Student[];
        getById(id: string): Student;
        create(name: string, document: string, birthdate: Date): string;
        update(id: string, name: string, document: string, birthdate: Date): void;
    }

    export function createStudentRepository(): StudentRepository {
        return new InMemoryStudentRepository();
    }

    // source: https://stackoverflow.com/a/105074/1599115
    function guid() {
        return s4() + s4() + '-' + s4() + '-' + s4() + '-' +
            s4() + '-' + s4() + s4() + s4();
    }

    function s4() {
        return Math.floor((1 + Math.random()) * 0x10000)
            .toString(16)
            .substring(1);
    }

    class InMemoryStudentRepository implements StudentRepository {
        all() {
            let students: Student[];

            if (Session('students') != null) {
                students = JSON.parse(Session('students'));
            } else {
                students = [
                    { id: guid(), name: 'Ada', document: '81858948843', birthdate: new Date(1995, 0, 1) },
                    { id: guid(), name: 'Ben', document: '53666237070', birthdate: new Date(1990, 1, 2) },
                    { id: guid(), name: 'Cid', document: '71563144751', birthdate: new Date(2001, 2, 3) }
                ];
                setSession('students', JSON.stringify(students));
            }

            return students;
        }

        query(term: string): Student[] {
            term = term.toLowerCase();
            return this.all().filter(s =>
                s.name.toLowerCase().indexOf(term) > -1 ||
                s.document.indexOf(term) > -1);
        }

        getById(id: string): Student {
            let students = this.all().filter(s => s.id === id);
            if (students.length === 1) return students[0];
            return undefined;
        }

        create(name: string, document: string, birthdate: Date): string {
            let students = this.all();
            let newStudent: Student = {
                id: guid(),
                name, document, birthdate
            };
            students.push(newStudent);
            setSession('students', JSON.stringify(students));
            return newStudent.id;
        }

        update(id: string, name: string, document: string, birthdate: Date): void {
            let students = this.all();
            let student = students.filter(s => s.id === id)[0];

            student.name = name;
            student.document = document;
            student.birthdate = birthdate;

            setSession('students', JSON.stringify(students));
        }
    }

    function fetchScalar(conn: ADODB.Connection, sql: string) {
        return using(conn.Execute(sql), rs => !rs.EOF ? rs.Fields(0).Value : undefined);
    }

    class SqlStudentRepository extends BaseRepository implements StudentRepository {
        all(): Student[] {
            let sql = 'SELECT id, name, [document], birthdate FROM students';
            let result = [];

            using(this.openConnection(), conn => {
                using(conn.Execute(sql), rs => {
                    while (!rs.EOF) {
                        result.push(this.createStudent(rs));
                        rs.MoveNext();
                    }
                });
            });
            return result;
        }

        query(term: string): Student[] {
            term = '%' + term + '%';
            let sql = `SELECT id, name, [document], birthdate
                         FROM students
                        WHERE name LIKE ?
                           OR [document] LIKE ?`;
            let result = [];

            using(this.openConnection(), conn => {
                let cmd = new ActiveXObject('ADODB.Command') as ADODB.Command;
                cmd.ActiveConnection = conn;
                cmd.CommandText = sql;
                cmd.Parameters.Append(cmd.CreateParameter('', adVarWChar, adParamInput, term.length, term));
                cmd.Parameters.Append(cmd.CreateParameter('', adVarWChar, adParamInput, term.length, term));

                using(cmd.Execute(), rs => {
                    while (!rs.EOF) {
                        result.push(this.createStudent(rs));
                        rs.MoveNext();
                    }
                });
            });
            return result;
        }

        getById(id: string): Student {
            let sql = 'SELECT id, name, [document], birthdate FROM students WHERE id = ?';
            let student: Student;

            using(this.openConnection(), conn => {
                let cmd = new ActiveXObject('ADODB.Command') as ADODB.Command;
                cmd.ActiveConnection = conn;
                cmd.CommandText = sql;
                cmd.Parameters.Append(cmd.CreateParameter('id', adVarWChar, adParamInput, 36, id));

                using(cmd.Execute(), rs => {
                    if (!rs.EOF) {
                        student = this.createStudent(rs);
                    }
                });
            });

            return student;
        }

        create(name: string, document: string, birthdate: Date): string {
            let id = guid();
            let sql = 'INSERT INTO students (id, name, [document], birthdate) VALUES (?, ?, ?, ?)';

            using(this.openConnection(), conn => {
                let cmd = new ActiveXObject('ADODB.Command') as ADODB.Command;
                cmd.ActiveConnection = conn;
                cmd.CommandText = sql;

                cmd.Parameters.Append(cmd.CreateParameter('id', adVarWChar, adParamInput, 36, id));
                cmd.Parameters.Append(cmd.CreateParameter('name', adVarWChar, adParamInput, 50, name));
                cmd.Parameters.Append(cmd.CreateParameter('document', adVarWChar, adParamInput, 11, document));
                // jscript's date is not compatible with adodb
                cmd.Parameters.Append(cmd.CreateParameter('birthdate', adDBDate, adParamInput, 0, ToVBDate(birthdate)));

                cmd.Execute();
            });

            return id;
        }

        update(id: string, name: string, document: string, birthdate: Date): void {
            let sql = `UPDATE students
                          SET name = ?,
                              [document] = ?,
                              birthdate = ?
                        WHERE id = ?`;

            using(this.openConnection(), conn => {
                let cmd = new ActiveXObject('ADODB.Command') as ADODB.Command;
                cmd.ActiveConnection = conn;
                cmd.CommandText = sql;

                cmd.Parameters.Append(cmd.CreateParameter('name', adVarWChar, adParamInput, 50, name));
                cmd.Parameters.Append(cmd.CreateParameter('document', adVarWChar, adParamInput, 11, document));
                // jscript's date is not compatible with adodb
                cmd.Parameters.Append(cmd.CreateParameter('birthdate', adDBDate, adParamInput, 0, ToVBDate(birthdate)));
                cmd.Parameters.Append(cmd.CreateParameter('id', adVarWChar, adParamInput, 36, id));

                cmd.Execute();
            });
        }

        private createStudent(rs: ADODB.Recordset): Student {
            return {
                id: ('' + rs('id').Value).replace('{', '').replace('}', ''),
                name: rs('name').Value,
                document: rs('document').Value,
                birthdate: new Date('' + rs('birthdate').Value)
            };
        }
    }
}