sap.ui.define([
   "sap/ui/core/mvc/ControllerExtension",
   "sap/fe/templates/ObjectPage/ExtensionAPI",
   "sap/m/Button",
   "sap/m/library",
   "sap/ui/core/Messaging",
   "sap/m/MessageToast",
   "sap/ushell/Container",
   "sap/m/Dialog",
   "sap/m/MessageView",
   "sap/m/MessageItem",
   "sap/ui/model/json/JSONModel",
   "sap/m/Bar",
   "sap/m/Title",
   "sap/ui/core/IconPool",
   "sap/ui/mdc/Table",
   "sap/ui/mdc/table/Column",
   "sap/ui/core/Icon",
   "sap/m/ScrollContainer",
   "sap/fe/navigation/SelectionVariant",
   "sap/ui/core/routing/HashChanger"
], function(
   ControllerExtension,
   ExtensionAPI,
   Button,
   library,
   Messaging,
   MessageToast,
   Container,
   Dialog,
   MessageView,
   MessageItem,
   JSONModel,
   Bar,
   Title,
   IconPool,
   Table,
   Column,
   Icon,
   ScrollContainer,
   SelectionVariant,
   HashChanger
) {
 "use strict";
   var ButtonType = library.ButtonType;
   return ControllerExtension.extend("customer.govern9902appvar03.ext.controller.ObjectPageExt", {
//        cButtonSubmit: "nw.core.md.mdc.bp.gov::BusinessPartnerObjectPage--fe::DataFieldForAction::com.sap.gateway.srvd.c_businesspartnergovtp_srv.v0001.SubmitMasterDataChangeProcess::com.sap.gateway.srvd.c_businesspartnergovtp_srv.v0001.BusinessPartnerType",
//        cButtonSave: "nw.core.md.mdc.bp.gov::BusinessPartnerObjectPage--fe::FooterBar::StandardAction::Save",
//        bRelationshipCreation: false,
//        oDpiOPConfigurationHandler: new DpiOPConfigurationHandler(),
//        getExtensionHooks: function () {
//            return this.oExtensionHooks;
//        },
       override: {
           onInit: function () {
//                var oView = this.base.getView();
//                var that = this;
// //                oView.getController().getOwnerComponent()?.runAsOwner(function () {
// //                    Controller.create({
// //                        name: "nw.core.md.mdc.bp.gov.ext.controller.ExtensionHooks"
// //                    }).then(function (ExtensionHooksInstance) {
// //                        that.oExtensionHooks = ExtensionHooksInstance;
// //                    });
// //                });
//                var oButtonSubmit = oView.byId(this.cButtonSubmit);
//                if (oButtonSubmit) {
//                    oButtonSubmit.attachPress(function (e) {
//                        oView.getBindingContext().getModel()?.attachMessageChange(function () {
//                            var aMessages = Messaging.getMessageModel().getData();
//                            if (aMessages) {
//                                aMessages.forEach(function (oMessage) {
//                                    if (oMessage.code === "MDC_GOV_BO_MSG/105") {
//                                        MessageToast.show(oMessage.message);
//                                        Messaging.removeMessages(oMessage);
//                                    }
//                                    if (oMessage.code === "MDC_GOV_BO_MSG/100") {
//                                        Messaging.removeMessages(oMessage);
//                                    }
//                                });
//                            }
//                        });
//                        var counter = 0;
//                        var iDelay = oView.getBusyIndicatorDelay();
//                        oView.setBusyIndicatorDelay(0);
//                        oView.setBusy(true);
//                        function fnRead() {
//                            var oViewContext = oView.getBindingContext();
//                            oViewContext.requestProperty("MDChgProcessIsStarted").then(function (value) {
//                                if (value === false) {
//                                    setTimeout(fnRead, 500 + counter * 500);
//                                    counter++;
//                                    oViewContext.requestRefresh();
//                                } else {
//                                    oView.setBusy(false);
//                                    oView.setBusyIndicatorDelay(iDelay);
//                                }
//                            });
//                        }
//                        setTimeout(fnRead, 500);
//                    });
//                }
//                var Properties = { navigationCounter: {}, itemsBindingLength: {} };
//                var oPropertiesModel = new JSONModel(Properties);
//                oView.setModel(oPropertiesModel, "viewProperties");
//                // Weiteres UI Setup (SaveAndSubmit Button, Link Binding, Relationship Buttons) hier analog zu TS
           },
 
           routing: {
               onAfterBinding: function (oContext) {
                   // Implementation analog TS
               },
               onBeforeNavigation: function (context) {
                   // Implementation analog TS
               }
           },
           editFlow: {
               onBeforeSave: function (oContext) {
               },
               onAfterSave: function (oContext) {
                   this.onSave(oContext.context);
               }
           },
           intentBasedNavigation: {
               adaptNavigationContext: function (oSelectionVariant, oNavigationInfo) {
                   oSelectionVariant.removeSelectOption("CreatedByUserName");
                   if (oNavigationInfo.semanticObject === "CTR9902") {
                       oSelectionVariant.removeSelectOption("MasterDataChangeProcess");
                   }
               }
           }
       },
    onSave: function (oContext) {
      var oObject = oContext.getObject();
      var aMessages = Messaging.getMessageModel().getData() || [];
 
      for (var i = aMessages.length - 1; i >= 0; i--) {
        aMessages[i].setPersistent(false);
        Messaging.updateMessages(aMessages[i], aMessages[i]);
 
        switch (aMessages[i].code) {
          case "MDC_PROCESS_MSG/350":
            MessageToast.show(aMessages[i].message);
            Messaging.removeMessages(aMessages[i]);
            break;
 
          case "MDC_GOV_BO_MSG/207":
            MessageToast.show(aMessages[i].message);
            Messaging.removeMessages(aMessages[i]);
            break;
 
          case "MDC_GOV_BO_MSG/100":
            var oNavTo = JSON.parse(aMessages[i].message);
            var sNavigationTarget = "CTR9902-govern";
            Messaging.removeAllMessages();

            Container.getServiceAsync("Navigation").then(function (oNavigationService) {
            var sShellHash =
                sNavigationTarget +
                "&/CTR9902(" +
                "MasterDataChangeProcess='" +
                oNavTo.Process +
                "',MDChgProcessSrceSystem='" +
                encodeURIComponent(oNavTo.System) +
                "',MDChgProcessSrceObject='" +
                encodeURIComponent(
                oObject.MDChgProcessSrceObject ? oObject.MDChgProcessSrceObject : "" + oNavTo.Object1 + oNavTo.Object2
                ) +
                "',DraftUUID=00000000-0000-0000-0000-000000000000,IsActiveEntity=true)";

                oNavigationService.navigate({
                target: { shellHash: sShellHash },
                writeHistory: false
            });
            });

            break;
 
          case "MDC_GOV_BO_MSG/008":
            Messaging.removeMessages(aMessages[i]);
            break;
        }
      }
    }       
    // Weitere private/helper-Methoden analog TS: validateBeforeSave, DisplayMessages, setTableProperties, etc.
   });
});