Handlebars.registerHelper('formatDate', function (d) {
    if (d != null && moment(d).isValid()) {
        return moment(d).format('DD/MM/YYYY');
    }
    return d;
});
//# sourceMappingURL=handlebars-helpers.js.map