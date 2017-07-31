Handlebars.registerHelper('formatDate', d => {
    if (d != null && moment(d).isValid()) {
        return moment(d).format('DD/MM/YYYY');
    }
    return d;
});