
Vue.component('table-name', {
    props: ['table'],
    template: '<p class="singolebox"><input type="checkbox">{{ table.tableName }}</p>'
});

var vue_tb = new Vue({
    el: '#vue',
    data: {
        tableList: [{tableName: 'pip'}
        ]
    },
    methods: {
        docose: function() {
            ipcRenderer.sendSync('bakup', 'Account');
        }
    }
});
function customizza(string) {
    var jsonObj = [];
    var splitted = string.split(',');
    for (var i = 0; i < splitted.length; i++) {
        //console.log('.');
        jsonObj[i] = {tableName: splitted[i]};
        if (i === splitted.length-1) {
            vue_tb.tableList = jsonObj;
            vue_tb.tableList.sort(dynamicSort('tableName'));
        }
    }
};
//modifica ai dati presenti nel reparto 'data' della vue


function dynamicSort(property) {
    var sortOrder = 1;
    if (property[0] === "-") {
        sortOrder = -1;
        property = property.substr(1);
    }
    return function (a, b) {
        var result = (a[property] < b[property]) ? -1 : (a[property] > b[property]) ? 1 : 0;
        return result * sortOrder;
    }
} //sort preso da internet https://stackoverflow.com/questions/1129216/sort-array-of-objects-by-string-property-value-in-javascript
