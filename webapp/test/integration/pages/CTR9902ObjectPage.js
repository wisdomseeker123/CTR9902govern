sap.ui.define(['sap/fe/test/ObjectPage'], function(ObjectPage) {
    'use strict';

    var CustomPageDefinitions = {
        actions: {},
        assertions: {}
    };

    return new ObjectPage(
        {
            appId: 'customer.govern9902',
            componentId: 'CTR9902ObjectPage',
            contextPath: '/CTR9902'
        },
        CustomPageDefinitions
    );
});