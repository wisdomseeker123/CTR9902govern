sap.ui.define([
    "sap/fe/test/JourneyRunner",
	"customer/govern9902/test/integration/pages/CTR9902List",
	"customer/govern9902/test/integration/pages/CTR9902ObjectPage"
], function (JourneyRunner, CTR9902List, CTR9902ObjectPage) {
    'use strict';

    var runner = new JourneyRunner({
        launchUrl: sap.ui.require.toUrl('customer/govern9902') + '/test/flp.html#app-preview',
        pages: {
			onTheCTR9902List: CTR9902List,
			onTheCTR9902ObjectPage: CTR9902ObjectPage
        },
        async: true
    });

    return runner;
});

