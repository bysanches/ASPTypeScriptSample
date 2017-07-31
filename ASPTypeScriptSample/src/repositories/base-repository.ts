namespace ASPTypeScriptSample.Repositories {
    const connectionString = Application('connectionString') as string;

    export interface Closable {
        Close();
        State: number;
    }

    export function using<T extends Closable>(closable: T, expr: (closable: T) => any) {
        try {
            return expr.call(this, closable);
        } finally {
            if (closable.State === adStateOpen) closable.Close();
        }
    }

    export class BaseRepository {
        protected openConnection(): ADODB.Connection {
            let conn = new ActiveXObject('ADODB.Connection') as ADODB.Connection;
            conn.Open(connectionString);
            return conn;
        }
    }
}