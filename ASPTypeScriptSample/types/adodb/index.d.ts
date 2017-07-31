declare namespace ADODB {
    interface Connection {

        /** Sets or returns the details used to create a connection to a data source */
        ConnectionString: string;

        /** Returns a value describing if the connection is open or closed */
        State: number;

        /** Opens a connection to a data source */
        Open(connectionString?: string, userId?: string, password?: string, options?: number);

        /** Closes a connection */
        Close();

        /**
         * Begins a new transaction.
         * This method can also be used to return a long value that is the level of nested transactions.
         * A top level transaction has a return value of 1. Each additional level increments by one.
         */
        BeginTrans(): number;

        /** Saves any changes and ends the current transaction */
        CommitTrans();

        /** Cancels any changes in the current transaction and ends the transaction */
        RollbackTrans();

        /**
         * Executes a query, statement, procedure or provider specific text
         *
         * The results are stored in a new Recordset object if it is a row-returning query. A closed Recordset
         * object will be returned if it is not a row-returning query.
         *
         * Note: The returned Recordset is always a read-only, forward-only Recordset!
         *
         * @param commandText The SQL statement, stored procedure, or provider-specific text to execute.
         * @param ra The number of records affected by the query.
         * @param options Sets how the provider should evaluate the commandtext parameter. Can be one or more
         *     CommandTypeEnum or ExecuteOptionEnum values. Default is adCmdUnspecified
         */
        Execute(commandText: string, ra?: number, options?: number): Recordset;
    }

    interface Command {
        ActiveConnection: Connection | string;
        CommandText: string;
        CommandTimeout: number;
        CommandType: number;
        Name: string;
        Prepared: boolean;
        State: number;

        Cancel(): void;
        CreateParameter(name?: string, type?: number, direction?: number, size?: number, value?: any): Parameter;
        Execute(ra?: number, parameters?: Parameter[], options?: number): Recordset;

        Parameters: ParameterCollection;
    }

    interface ParameterCollection {
        Append(parameter: Parameter): void;
    }

    interface Parameter {
        Attributes?: number;
        Direction?: number;
        Name?: string;
        NumericScale?: number;
        Precision?: number;
        Size?: number;
        Type?: number;
        Value?: any;

        AppendChunk(data: any): void;
        Delete(idx: number): void;
    }

    interface Recordset {

        /**
         * Sets or returns a definition for a connection if the connection is closed, or the current
         * Connection object if the connection is open
         */
        ActiveConnection: Connection;

        /** Returns true if the current record position is after the last record, otherwise false */
        EOF: boolean;

        /** Returns true if the current record position is before the first record, otherwise false */
        BOF: boolean;

        /** Moves the record pointer to the next record */
        MoveNext(): void;

        /** Returns a value that describes if the Recordset object is open, closed, connecting, executing or retrieving data */
        State: number;

        /**
         * Opens a database element that gives you access to records in a table, the results of a query,
         * or to a saved Recordset
         *
         * @param source Specifies a data source.  The source parameter may be one of the following:
         *     - A URL
         *     - A relative/full file path name
         *     - A command object
         *     - An SQL statement
         *     - A stored procedure
         *     - A table name
         * @param actconn A connection string or a Connection object
         * @param cursortyp A CursorTypeEnum value that specifies the type of cursor to use when opening a
         *     Recordset object. Default is adOpenForwardOnly
         * @param locktyp A LockTypeEnum value that specifies the type of locking on a Recordset object.
         *     Default is adLockReadOnly
         * @param opt Specifies how to evaluate the source parameter if it is not a Command object.
         *     Can be one or more CommandTypeEnum or ExecuteOptionEnum values
         */
        Open(source?: string, actconn?: Connection, cursortyp?: number, locktyp?: number, opt?: number): void;

        Fields: FieldCollection;

        /** Returns a specified item in the fields collection. */
        (key: string | number): Field;

        /** Closes a recordset */
        Close(): void;
    }

    interface FieldCollection {
        /** Returns the number of items in the fields collection. Starts at zero. */
        Count(): number;

        /** Returns a specified item in the fields collection. */
        (key: string | number): Field;

        /** Returns a specified item in the fields collection. */
        Item(key: string | number): Field;
    }

    interface Field {
        Name: string;
        Type: number;
        Value: any;
    }

    interface Stream {
        CharSet: string;
        EOS: boolean;

        /**
         * The LineSeparator property sets or returns a
         * LineSeparatorsEnum value that indicates the line separator
         * character used in a text Stream object. Default is adCRLF.
         *  
         * adCRLF (-1) Default. Carriage return line feed
         * adLF (10) Line feed only
         * adCR (13) Carriage return only
         */
        LineSeparator: number;

        Mode: number;
        Position: number;
        Size: number;
        State: number;
        Type: number;

        Cancel(): void;
        Close(): void;
        CopyTo(dest: Stream, numchars: number): void;
        Flush(): void;
        LoadFromFile(filename: string): void;
        Open(source?: string, mode?: number, opt?: number, username?: string, psword?: string): void;
        Read(numbytes: number): any;
        ReadText(numchars?: number): string;
        SaveToFile(filename: string, option?: number): void;
        SetEOS(): void;
        SkipLine(): void;
        Write(buffer: any[]): void;
        WriteText(data: string, opt?: number): void;
    }
}