sap.ui.define(['sap/fe/test/ListReport'], function(ListReport) {
    'use strict';

    var CustomPageDefinitions = {
        actions: {},
        assertions: {}
    };

    return new ListReport(
        {
            appId: 'customer.govern9902',
            componentId: 'CTR9902List',
            contextPath: '/CTR9902'
        },
        CustomPageDefinitions
    );
});