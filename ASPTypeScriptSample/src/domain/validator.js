var Validator = (function () {
    function Validator() {
        this.notifications = [];
    }
    Validator.prototype.addNotification = function (prop, message) {
        this.notifications.push([prop, message]);
    };
    Validator.prototype.valid = function () {
        return this.notifications.length === 0;
    };
    Validator.prototype.getNotifications = function () {
        return this.notifications.slice(0);
    };
    Validator.prototype.required = function (prop, val) {
        if (!val || val == null) {
            this.addNotification(prop, 'valor requerido');
        }
        return this;
    };
    Validator.prototype.number = function (prop, val) {
        if (val && val != null) {
            if (!/^(?:-?\d+|-?\d{1,3}(?:,\d{3})+)?(?:\.\d+)?$/.test(val)) {
                this.addNotification(prop, 'valor inválido');
            }
        }
        return this;
    };
    Validator.prototype.digits = function (prop, val) {
        if (val && val != null) {
            if (/\D/.test(val)) {
                this.addNotification(prop, 'o campo deve conter apenas dígitos');
            }
        }
        return this;
    };
    Validator.prototype.maxLength = function (prop, val, length) {
        if (val && val != null) {
            if (val.length > length) {
                this.addNotification(prop, "o campo deve ter " + length + " caracteres ou menos");
            }
        }
        return this;
    };
    Validator.prototype.fixedLength = function (prop, val, length) {
        if (val && val != null) {
            if (val.length !== length) {
                this.addNotification(prop, "o campo deve ter exatamente " + length + " caracteres");
            }
        }
        return this;
    };
    Validator.prototype.date = function (prop, val) {
        if (val && val != null) {
            if (!moment.isDate(val) && !moment(val, 'DD/MM/YYYY').isValid()) {
                this.addNotification(prop, 'data inválida');
            }
        }
        return this;
    };
    return Validator;
}());
//# sourceMappingURL=validator.js.map