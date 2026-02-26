sap.ui.define([
    "sap/m/MessageToast"
], function(MessageToast) {
    'use strict';

    return {
        /**
         * Generated event handler.
         *
         * @param oContext the context of the page on which the event was fired. `undefined` for list report page.
         * @param aSelectedContexts the selected contexts of the table rows.
         */
        process: function(oContext, aSelectedContexts) {
            let oView= this.getRouting().getView();
            let actionID = "com.sap.gateway.srvd.ui_ctr9902govtp.v0001.CreateMassRequestSelected";
            let mParameters = {
                contexts: aSelectedContexts,
                invocationGrouping: 'ChangeSet'
            };
            oView.getModel()?.attachMessageChange(function (oResponse) {
                responseMassRequest(oResponse, oView);
            });
            oView.getController().getExtensionAPI().getEditFlow().invokeAction(actionID, mParameters);
            MessageToast.show("Custom handler invoked 2.");
        },
        responseMassRequest: function(oResponse, oView) {
            let sProcessId;
            let aMessages = Messaging.getMessageModel().getData();
            if (aMessages) {
                $.each(aMessages, function (i, oMessage) {
                    if (oMessage.type !== MessageType.Error) {
                        if (oMessage.code === "MDC_GOV_BO_MSG/100") {
                            sProcessId = JSON.parse(oMessage.message).Process;
                        }
                        Messaging.removeMessages(oMessage);
                    }
                });
            }
            if (sProcessId) {
                //@ts-expect-error: Generated
                oView.getController().getExtensionAPI().getIntentBasedNavigation()
                    .navigateOutbound("toManageGovProcesses", { MasterDataChangeProcess: sProcessId });
            }
        }
    };
});
