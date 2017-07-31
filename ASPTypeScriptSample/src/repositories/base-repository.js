var ASPTypeScriptSample;
(function (ASPTypeScriptSample) {
    var Repositories;
    (function (Repositories) {
        var connectionString = Application('connectionString');
        function using(closable, expr) {
            try {
                return expr.call(this, closable);
            }
            finally {
                if (closable.State === adStateOpen)
                    closable.Close();
            }
        }
        Repositories.using = using;
        var BaseRepository = (function () {
            function BaseRepository() {
            }
            BaseRepository.prototype.openConnection = function () {
                var conn = new ActiveXObject('ADODB.Connection');
                conn.Open(connectionString);
                return conn;
            };
            return BaseRepository;
        }());
        Repositories.BaseRepository = BaseRepository;
    })(Repositories = ASPTypeScriptSample.Repositories || (ASPTypeScriptSample.Repositories = {}));
})(ASPTypeScriptSample || (ASPTypeScriptSample = {}));
//# sourceMappingURL=base-repository.js.map