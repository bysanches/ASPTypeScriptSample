class Validator {
    private notifications;

    constructor() {
        this.notifications = [];
    }

    private addNotification(prop: string, message: string) {
        this.notifications.push([prop, message]);
    }

    valid() {
        return this.notifications.length === 0;
    }

    getNotifications() {
        return this.notifications.slice(0);
    }

    required(prop: string, val: string): Validator {
        if (!val || val == null) {
            this.addNotification(prop, 'valor requerido');
        }
        return this;
    }

    number(prop: string, val: string): Validator {
        if (val && val != null) {
            if (!/^(?:-?\d+|-?\d{1,3}(?:,\d{3})+)?(?:\.\d+)?$/.test(val)) {
                this.addNotification(prop, 'valor inválido');
            }
        }
        return this;
    }

    digits(prop: string, val: string): Validator {
        if (val && val != null) {
            if (/\D/.test(val)) {
                this.addNotification(prop, 'o campo deve conter apenas dígitos');
            }
        }
        return this;
    }

    maxLength(prop: string, val: string, length: number): Validator {
        if (val && val != null) {
            if (val.length > length) {
                this.addNotification(prop, `o campo deve ter ${length} caracteres ou menos`);
            }
        }
        return this;
    }

    fixedLength(prop: string, val: string, length: number): Validator {
        if (val && val != null) {
            if (val.length !== length) {
                this.addNotification(prop, `o campo deve ter exatamente ${length} caracteres`);
            }
        }
        return this;
    }

    date(prop: string, val: string): Validator {
        if (val && val != null) {
            if (!moment.isDate(val) && !moment(val, 'DD/MM/YYYY').isValid()) {
                this.addNotification(prop, 'data inválida');
            }
        }
        return this;
    }
}