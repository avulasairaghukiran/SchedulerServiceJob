// if (AV === undefined) {
//     var AV = {};
// }

// AV.Common = {};
// AV.Common.API = {};
// AV.Common.Utility = {};


// AV.Common = (function () {
//     let MESSAGE_TYPE = { "INFO": "INFO", "WARNING": "WARNING" };

//     var openAlertDialog = function (confirmButtonLbl, alertMsg, alertTitle, height, width, successCallBack, errorCallBack, alertType) {
//         let alertStrings = '';
//         let iconCode = '';
//         if (alertType !== null && alertType !== undefined) {
//             if (alertType === MESSAGE_TYPE.INFO) {
//                 iconCode = '🛈 ';
//             }
//             else if (alertType === MESSAGE_TYPE.WARNING) {
//                 iconCode = '⚠ ';
//             }
//         }

//         if (alertTitle != undefined && alertTitle != null) {
//             alertStrings = { confirmButtonLabel: confirmButtonLbl, text: alertMsg, title: iconCode + alertTitle };
//         }

//         else {
//             alertStrings = { confirmButtonLabel: confirmButtonLbl, text: alertMsg };
//         }
//         var alertOptions = { height: height, width: width };


//         Xrm.Navigation.openAlertDialog(alertStrings, alertOptions).then(successCallBack, errorCallBack);
//     };

//     var openConfirmDialog = function (confirmButtonLbl, cancelButtonLabel, title, subtitle, text, height, width, successCallBack, errorCallBack) {
//         let confirmStrings = {};

//         if (confirmButtonLbl != null && confirmButtonLbl != 'undefined' && confirmButtonLbl != '') { confirmStrings.confirmButtonLabel = confirmButtonLbl; } else { confirmStrings.confirmButtonLabel = 'Ok'; }

//         if (cancelButtonLabel != null && cancelButtonLabel != 'undefined' && cancelButtonLabel != '') { confirmStrings.cancelButtonLabel = cancelButtonLabel; } else { confirmStrings.cancelButtonLabel = 'Cancel'; }

//         if (title != null && title != 'undefined' && title != '') { confirmStrings.title = title; } else { confirmStrings.title = 'Confirm'; }

//         if (subtitle != null && subtitle != 'undefined' && subtitle != '') { confirmStrings.subtitle = subtitle; }

//         if (text != null && text != 'undefined' /*&& text != ''*/) { confirmStrings.text = text; } else { confirmStrings.text = 'Are you sure you want to confirm?'; }

//         let confirmOptions = { height: height, width: width };

//         Xrm.Navigation.openConfirmDialog(confirmStrings, confirmOptions).then(successCallBack, errorCallBack);
//     };

//     /**
//      * This function is used to open html web resource as Modal popup
//      * @param {string} webResourceNameWithFullPath
//      * @param {string} title
//      * @param {number} position 
//      * @param {json} dataJsonObject
//      * @param {number} height
//      * @param {number} width
//      * @param {function} successCallback
//      * @param {function} errorCallback
//      */
//     let openWebResourceAsModal = function (webResourceNameWithFullPath, title, position, dataJsonObject, height, width, successCallback, errorCallback) {
//         try {

//             //custom parameter that you need in the modal dialog 
//             var dialogParameters = {
//                 pageType: "webresource",//required 
//                 webresourceName: webResourceNameWithFullPath,//Html Webresource that will be shown 
//                 data: JSON.stringify(dataJsonObject)//optional 
//             };

//             var navigationOptions = {
//                 target: 2,//use 1 if you want to open page inline or 2 to open it as dialog 
//                 width: width,
//                 height: height,
//                 position: position,//1 to locate dialog in center and 2 to locate it on the side
//                 title: title
//             };

//             Xrm.Navigation.navigateTo(dialogParameters, navigationOptions).then(
//                 function (result) {
//                     successCallback(result);
//                 },
//                 function (error) {
//                     errorCallback(error);
//                 });
//         } catch (e) {
//             throw e;
//         }
//     };


//     /**
//  * This function is used to open html web resource as Modal popup
//  * @param {string} entityLogicalName
//  * @param {guid} entityId
//  * @param {json} createFromEntity
//  * @param {json} dataJsonObject
//  * @param {number} height
//  * @param {number} width
//  * @param {string} title
//  * @param {function} successCallback
//  * @param {function} errorCallback
//  */
//     let openEntityRecordAsModal = function (entityLogicalName, entityId, createFromEntity, formId, dataJsonObject, height, width, title, position, successCallback, errorCallback) {
//         try {

//             //custom parameter that you need in the modal dialog 
//             var dialogParameters = {
//                 pageType: "entityrecord",//required
//                 entityName: entityLogicalName,
//                 data: dataJsonObject//optional
//             };

//             if (entityId !== null && entityId !== undefined && entityId !== '') {
//                 dialogParameters.entityId = entityId;
//             }

//             if (formId !== null && formId !== undefined && formId !== '') {
//                 dialogParameters.formId = formId;
//             }

//             if (createFromEntity !== null && createFromEntity !== undefined && createFromEntity !== '') {
//                 dialogParameters.createFromEntity = createFromEntity; //{entityType:"account",id:"00f731cf-14cd-ec11-a7b5-000d3a848502"}
//             }

//             var navigationOptions = {
//                 target: 2,//use 1 if you want to open page inline or 2 to open it as dialog 
//                 width: width,
//                 height: height,
//                 position: (position !== null && position !== undefined) ? position : 1,//1 to locate dialog in center and 2 to locate it on the side
//                 title: title
//             };

//             Xrm.Navigation.navigateTo(dialogParameters, navigationOptions).then(
//                 function (result) {
//                     if (successCallback !== null && successCallback !== undefined) {
//                         successCallback(result);
//                     }
//                     else {
//                         try { Xrm.Utility.refreshParentGrid({ "entityType": entityLogicalName }) } catch { }
//                     }
//                 },
//                 function (error) {
//                     if (errorCallback !== null && errorCallback !== undefined)
//                         errorCallback(error);
//                 });
//         } catch (e) {
//             throw e;
//         }
//     };

//     let openEntityRecordAsInline = function (entityLogicalName, entityId, createFromEntity, formId, dataJsonObject, title, position, successCallback, errorCallback) {
//         try {

//             //custom parameter that you need in the Inline 
//             var dialogParameters = {
//                 pageType: "entityrecord",//required
//                 entityName: entityLogicalName,
//                 data: dataJsonObject//optional
//             };

//             if (entityId !== null && entityId !== undefined && entityId !== '') {
//                 dialogParameters.entityId = entityId;
//             }

//             if (formId !== null && formId !== undefined && formId !== '') {
//                 dialogParameters.formId = formId;
//             }

//             if (createFromEntity !== null && createFromEntity !== undefined && createFromEntity !== '') {
//                 dialogParameters.createFromEntity = createFromEntity; //{entityType:"account",id:"00f731cf-14cd-ec11-a7b5-000d3a848502"}
//             }

//             var navigationOptions = {
//                 target: 1,//use 1 if you want to open page inline or 2 to open it as dialog 
//                 position: (position !== null && position !== undefined) ? position : 1,//1 to locate dialog in center and 2 to locate it on the side
//                 title: title
//             };

//             Xrm.Navigation.navigateTo(dialogParameters, navigationOptions).then(
//                 function (result) {
//                     if (successCallback !== null && successCallback !== undefined)
//                         successCallback(result);
//                 },
//                 function (error) {
//                     if (errorCallback !== null && errorCallback !== undefined)
//                         errorCallback(error);
//                 });
//         } catch (e) {
//             throw e;
//         }
//     };

//     var openErrorDialog = function (errorMsg, errorDetailMsg, errorCode) {
//         var errorOptions = {
//             details: errorDetailMsg,
//             errorCode: errorCode, //this is error code if you want to show some specific one. If you specify invalid code or none, the default error code wouldbe displayed
//             message: errorMsg
//         };

//         Xrm.Navigation.openErrorDialog(errorOptions);
//     }

//     var refreshFormData = function (formContext, save) {
//         if (AV.Common.Utility.isObjectAvailable(save) && save) {
//             formContext.data.refresh(save);
//         }
//         else {
//             formContext.data.refresh();
//         }
//     }

//     var openForm = function (entityFormOptions, formParameters, successCallBack, errorCallBack) {
//         Xrm.Navigation.openForm(entityFormOptions, formParameters).then(successCallBack, errorCallBack);
//     }

//     var getUserSettings = function () {
//         return Xrm.Utility.getGlobalContext().userSettings;
//     }

//     var getLoggedInUserId = function () {
//         return Xrm.Utility.getGlobalContext().userSettings.userId;
//     }

//     var getAttribute = function (formContext, attributeName) {
//         return formContext.getAttribute(attributeName);
//     }

//     var getAttributeValue = function (formContext, attributeName) {
//         return formContext.getAttribute(attributeName).getValue();
//     }

//     var setAttributeValue = function (formContext, attributeName, controlValue) {
//         return formContext.getAttribute(attributeName).setValue(controlValue);
//     }

//     var setDisabled = function (formContext, controlName, isDisabled) {
//         formContext.getControl(controlName).setDisabled(isDisabled);
//     }

//     var setRequiredLevel = function (formContext, attributeName, isRequired) {
//         if (isRequired)
//             formContext.getAttribute(attributeName).setRequiredLevel("required");
//         else
//             formContext.getAttribute(attributeName).setRequiredLevel("none");
//     }

//     var setVisible = function (formContext, controlName, isVisible) {
//         formContext.getControl(controlName).setVisible(isVisible);
//     }

//     var setVisibleSection = function (formContext, tabName, sectionName, isVisible) {
//         formContext.ui.tabs.get(tabName).sections.get(sectionName).setVisible(isVisible);
//     }

//     var setLebleOnSection = function (formContext, tabName, sectionName, message) {
//         formContext.ui.tabs.get(tabName).sections.get(sectionName).setLabel(message);

//     }

//     var removeOption = function (formContext, fieldName, optionSetValue) {
//         formContext.getControl(fieldName).removeOption(optionSetValue);
//     }

//     var getOption = function (formContext, fieldName, optionValue) {
//         return formContext.getAttribute(fieldName).getOption(optionValue);
//     }

//     var addOption = function (formContext, fieldName, option) {
//         formContext.getControl(fieldName).addOption(option);
//     }

//     var clearOptions = function (formContext, fieldName) {
//         formContext.getControl(fieldName).clearOptions();
//     }

//     var showProgressIndicator = function (loadingMessage) {
//         Xrm.Utility.showProgressIndicator(loadingMessage);
//     }

//     var closeProgressIndicator = function () {
//         Xrm.Utility.closeProgressIndicator();
//     }

//     var selectTab = function (formContext, tabName) {
//         formContext.ui.tabs.get(tabName).setFocus();
//     };

//     var setVisibleTab = function (formContext, tabName, isVisible) {
//         formContext.ui.tabs.get(tabName).setVisible(isVisible);
//     };

//     var setFieldNotification = function (formContext, fieldName, message, uniqueId) {
//         if (uniqueId !== null && uniqueId !== undefined) {
//             formContext.getControl(fieldName).setNotification(message, uniqueId);
//         }
//         else {
//             formContext.getControl(fieldName).setNotification(message);
//         }
//     };

//     var clearFieldNotification = function (formContext, fieldName, uniqueId) {
//         if (uniqueId !== null && uniqueId !== undefined) {
//             formContext.getControl(fieldName).clearNotification(uniqueId);
//         }
//         else {
//             formContext.getControl(fieldName).clearNotification();
//         }
//     };

//     var setFormNotification = function (formContext, message, level, uniqueId) {
//         if (uniqueId !== null && uniqueId !== undefined) {
//             formContext.ui.setFormNotification(message, level, uniqueId);
//         } else {
//             formContext.ui.setFormNotification(message, level);
//         }
//     }

//     var clearFormNotification = function (formContext, uniqueId) {
//         if (uniqueId !== null && uniqueId !== undefined) {
//             formContext.ui.clearFormNotification(uniqueId);
//         }
//     };

//     var lockAllFieldsOnTheForm = function (formContext) {
//         let formControls = formContext.ui.controls;
//         formControls.forEach(element => {
//             if (element.getName() != "" && element.getName() != null) {
//                 element.setDisabled(true);
//             }
//         });
//     };

//     var differenceBetweenTwoDatesInDays = function (startDate, endDate) {
//         var day = 1000 * 60 * 60 * 24;
//         let duration = ((endDate - startDate) / day) + 1;
//         if (duration < 0) {
//             duration = 0;
//         }
//         return duration;
//     };

//     var getWeekdaysBetweenDates = function (startDate, endDate) {
//         // Copy the start date so we don't modify the original
//         const currentDate = new Date(startDate);

//         // Array to store weekdays
//         const weekdays = [];

//         // Iterate over each day between the start and end dates
//         while (currentDate <= endDate) {
//             // Check if the current day is a weekday (Monday to Friday)
//             if (currentDate.getDay() >= 1 && currentDate.getDay() <= 5) {
//                 weekdays.push(new Date(currentDate)); // Add the current date to the array
//             }

//             // Move to the next day
//             currentDate.setDate(currentDate.getDate() + 1);
//         }

//         return weekdays.length;
//     }

//     var setLabel = function (formContext, fieldName, message) {
//         formContext.getControl(fieldName).setLabel(message);

//     };


//     var isDirtyAttribute = function (formContext, attributeName) {
//         return formContext.getAttribute(attributeName).getIsDirty();
//     }

//     var addCustomView = function (formContext, fieldName, viewId, entityName, viewDisplayName, fetchXml, layoutXml, isDefault) {
//         formContext.getControl(fieldName).addCustomView(viewId, entityName, viewDisplayName, fetchXml, layoutXml, isDefault);
//     }

//     let refreshSubgrid = function (formContext, subgridSchemaName) {
//         try {
//             formContext.getControl(subgridSchemaName).refresh();
//         }
//         catch {
//             Xrm.Page.getControl(subgridSchemaName).refresh();
//         }

//     }

//     let getFormType = function (formContext) {
//         return formContext.ui.getFormType();
//     }

//     let showHideQuickViewForm = function (formContext, formName, isVisible) {
//         formContext.ui.quickForms.get(formName).setVisible(isVisible);
//     }

//     let setBodyVisible = function (formContext, isVisible) {
//         formContext.ui.headerSection.setBodyVisible(isVisible);
//     }

//     let setTabNavigatorVisible = function (formContext, isVisible) {
//         formContext.ui.headerSection.setTabNavigatorVisible(isVisible);
//     }

//     let setCommandBarVisible = function (formContext, isVisible) {
//         formContext.ui.headerSection.setCommandBarVisible(isVisible);
//     }

//     let getAttributeValueFromQuickViewForm = function (formContext, quickViewFormName, attributeName) {
//         return formContext.ui.quickForms.get(quickViewFormName).getControl(attributeName).getAttribute().getValue();
//     }

//     let setVisibleFieldOnQuickViewForm = function (formContext, quickViewFormName, attributeName, isVisible) {
//         formContext.ui.quickForms.get(quickViewFormName).getControl(attributeName).setVisible(isVisible);
//     }

//     let getEntityObjectTypeCode = async function (entityLogicalName) {
//         try {
//             let entityCode = await Xrm.Utility.getEntityMetadata(entityLogicalName, ['objectTypeCode']).then(
//                 function (entityMetadata) {
//                     return entityMetadata._objectTypeCode;
//                 }, function (e) {
//                     alert(e.error.message);
//                 });

//             return entityCode;
//         } catch (e) {
//             throw e;
//         }
//     }

//     let updateQuickViewFormLabel = function (formContext, quickViewFormName, attributeName, message) {
//         formContext.ui.quickForms.get(quickViewFormName).getControl(attributeName).setLabel(message);
//     }

//     return {
//         //Common
//         openAlertDialog: openAlertDialog,
//         openConfirmDialog: openConfirmDialog,
//         openWebResourceAsModal: openWebResourceAsModal,
//         openErrorDialog: openErrorDialog,
//         refreshFormData: refreshFormData,
//         openForm: openForm,
//         getUserSettings: getUserSettings,
//         getLoggedInUserId: getLoggedInUserId,
//         getAttribute: getAttribute,
//         getAttributeValue: getAttributeValue,
//         setAttributeValue: setAttributeValue,
//         setDisabled: setDisabled,
//         setRequiredLevel: setRequiredLevel,
//         setVisible: setVisible,
//         setVisibleSection: setVisibleSection,
//         setLebleOnSection: setLebleOnSection,
//         removeOption: removeOption,
//         getOption: getOption,
//         addOption: addOption,
//         clearOptions: clearOptions,
//         showProgressIndicator: showProgressIndicator,
//         closeProgressIndicator: closeProgressIndicator,
//         selectTab: selectTab,
//         setVisibleTab: setVisibleTab,
//         setFieldNotification: setFieldNotification,
//         clearFieldNotification: clearFieldNotification,
//         setFormNotification: setFormNotification,
//         lockAllFieldsOnTheForm: lockAllFieldsOnTheForm,
//         differenceBetweenTwoDatesInDays: differenceBetweenTwoDatesInDays,
//         getWeekdaysBetweenDates: getWeekdaysBetweenDates,
//         setLabel: setLabel,
//         isDirtyAttribute: isDirtyAttribute,
//         openEntityRecordAsModal: openEntityRecordAsModal,
//         openEntityRecordAsInline: openEntityRecordAsInline,
//         addCustomView: addCustomView,
//         refreshSubgrid: refreshSubgrid,
//         getFormType: getFormType,
//         MESSAGE_TYPE: MESSAGE_TYPE,
//         showHideQuickViewForm: showHideQuickViewForm,
//         clearFormNotification: clearFormNotification,
//         setBodyVisible: setBodyVisible,
//         setTabNavigatorVisible: setTabNavigatorVisible,
//         setCommandBarVisible: setCommandBarVisible,
//         getAttributeValueFromQuickViewForm: getAttributeValueFromQuickViewForm,
//         setVisibleFieldOnQuickViewForm: setVisibleFieldOnQuickViewForm,
//         getEntityObjectTypeCode: getEntityObjectTypeCode,
//         updateQuickViewFormLabel: updateQuickViewFormLabel
//     };
// })();

// AV.Common.Utility = (function () {
//     var getModalDialogParams = function () {
//         var queryString = location.search.substring(1);
//         var params = {};
//         var pieces = queryString.split("=");
//         params = JSON.parse(decodeURIComponent(pieces[1]));

//         return params;
//     };

//     var getQueryStrings = function (param) {
//         param = param.replace(/[\[]/, '\\[').replace(/[\]]/, '\\]');
//         var regex = new RegExp('[\\?&]' + param + '=([^&#]*)');
//         var results = regex.exec(location.search);
//         return results === null ? false : decodeURIComponent(results[1].replace(/\+/g, ' '));
//     };

//     var getWebResourceQueryStringData = function (paramName) {
//         let search = new URLSearchParams(window.location.search);
//         let paramValue = search.get(paramName);
//         return paramValue;
//     };

//     var isObjectAvailable = function (objName) {
//         if (objName === undefined || objName == null || typeof objName == "undefined")
//             return false;
//         return true;
//     };

//     var guidsAreEqual = function (guid1, guid2) {
//         var isEqual;
//         if (guid1 === null || guid2 === null || guid1 === undefined || guid2 === undefined) {
//             isEqual = false;
//         }
//         else {
//             isEqual = guid1.replace(/[{}]/g, "").toLowerCase() === guid2.replace(/[{}]/g, "").toLowerCase();
//         }

//         return isEqual;
//     };

//     var getClientUrl = function () {
//         var URL;
//         if (Xrm.Utility.getGlobalContext().getClientUrl) //Post UR 12
//         {
//             URL = Xrm.Utility.getGlobalContext().getClientUrl();
//         }

//         return URL;
//     };

//     var stringToBoolean = function (stringText) {
//         switch (stringText.toLowerCase().trim()) {
//             case "true":
//             case "yes":
//             case "1":
//                 return true;

//             case "false":
//             case "no":
//             case "0":
//             case null:
//                 return false;

//             default:
//                 return Boolean(stringText);
//         }
//     };

//     var createDynamicControl = function (ctrlType, id, name, clas, defaultValue, placeholder, optionList, addSelectOptionAsFirstOption, isReadOnly, otherAttributesJsonObject) {
//         try {
//             let ctrl;
//             switch (ctrlType) {
//                 case 'text':
//                     ctrl = $('<input/>').prop({ type: 'text', id: id, name: name, placeholder: placeholder }).addClass(clas).val(defaultValue);
//                     break;
//                 case 'checkbox':
//                     ctrl = $('<input/>').prop({ type: 'checkbox', id: id, name: name }).addClass(clas).prop('checked', defaultValue);
//                     break;
//                 case 'picklist':
//                     ctrl = $("<select></select>").prop({ id: id, name: name }).addClass(clas);
//                     if (addSelectOptionAsFirstOption)
//                         ctrl.append("<option value=\"\">-- Select --</option > ");
//                     $.each(optionList, function (i, el) {
//                         ctrl.append("<option value=\"" + el.value + "\"" + (el.value == defaultValue ? 'selected' : '') + "> " + el.text + "</option > ");
//                     });
//                     break;
//                 default:
//                     ctrl = $('<input/>').prop({ type: 'text', id: id, name: name, placeholder: placeholder }).addClass(clas).val(defaultValue);
//             }

//             if (isReadOnly)
//                 ctrl.prop('disabled', true);

//             if (isObjectAvailable(otherAttributesJsonObject))
//                 ctrl.attr(otherAttributesJsonObject);

//             return ctrl;
//         } catch (e) {
//             throw 'AlphavimaCommon >> createDynamicControl >> ' + e;
//         }
//     };

//     var checkUserHasRoles = function (securityRoles, shouldHaveAll) {
//         // GUID of role to check
//         var roleId = '';
//         let containsRole = true;
//         // Get all the roles of the Logged in User.
//         var currentUserRoles = AV.Common.getUserSettings().securityRoles;
//         if (shouldHaveAll) {
//             containsRole = securityRoles.every(function (val) {
//                 return currentUserRoles.indexOf(val.toLowerCase()) >= 0;
//             });
//         }
//         else {
//             containsRole = securityRoles.some(r => currentUserRoles.includes(r.toLowerCase()));
//         }
//         return containsRole;
//     };

//     var checkUserNameHasRoles = function (securityRoles, shouldHaveAll) {
//         // GUID of role to check
//         let securityRoleName = '';
//         let arrSecurityRoleNames = [];
//         let containsRole = true;
//         // Get all the roles of the Logged in User.
//         //var currentUserRoles = AV.Common.getUserSettings().securityRoles;
//         var roleGuids = AV.Common.getUserSettings().securityRoles;
//         for (let i = 0; i < roleGuids.length; i++) {
//             securityRoleName = AV.Common.getUserSettings().roles._collection[roleGuids[i]].name;
//             arrSecurityRoleNames.push(securityRoleName.toLowerCase());
//         }

//         if (shouldHaveAll) {
//             containsRole = securityRoles.every(function (val) {
//                 return arrSecurityRoleNames.indexOf(val.toLowerCase()) >= 0;
//             });
//         }
//         else {
//             containsRole = securityRoles.some(r => arrSecurityRoleNames.includes(r.toLowerCase()));
//         }
//         return containsRole;

//     };

//     var getEnvironmentVariableValue = async function (name) {
//         let results = await AV.Common.API.retrieveMultipleRecords("environmentvariabledefinition", `?$filter=schemaname eq '${name}'&$select=environmentvariabledefinitionid&$expand=environmentvariabledefinition_environmentvariablevalue($select=value)`, null);

//         if (!results || !results.entities || results.entities.length < 1) return null;
//         let variable = results.entities[0];
//         if (!variable.environmentvariabledefinition_environmentvariablevalue || variable.environmentvariabledefinition_environmentvariablevalue.length < 1) return null;

//         return variable.environmentvariabledefinition_environmentvariablevalue[0].value;
//     };

//     var prepareLookupObject = function (recordId, recordName, recordEntityType) {
//         try {
//             let lookUpObject = new Array();
//             lookUpObject[0] = new Object();
//             lookUpObject[0].id = recordId;
//             lookUpObject[0].name = recordName;
//             lookUpObject[0].entityType = recordEntityType;
//             return lookUpObject;
//         } catch (e) {
//             throw 'AlphavimaCommon >> prepareLookupObject >> ' + e;
//         }
//     };

//     let errorCallBack = function (error) {
//         try {
//             Xrm.Utility.closeProgressIndicator();
//             let errorMsg = error.message;
//             let errorDetailMsg = error.message;
//             let errorCode = error.errorCode;
//             AV.Common.openErrorDialog(errorMsg, errorDetailMsg, errorCode);
//         } catch (e) {
//             throw 'AlphavimaCommon >> errorCallBack >> ' + e;
//         }
//     };

//     let calculateTruckDistance = async function (sourceAddress, destinationAddress, bingMapKey, distanceUnit) {    //distanceUnit should be mile or mi/kilometer or km
//         try {
//             let distance;
//             let schemaName = "avpx_BingmapKey";

//             try {
//                 sourceAddress = sourceAddress !== null ? sourceAddress.replace(/\n/g, " ") : '';
//                 destinationAddress = destinationAddress !== null ? destinationAddress.replace(/\n/g, " ") : '';

//                 if (!isObjectAvailable(bingMapKey) || bingMapKey === "") {
//                     bingMapKey = await AV.Common.Utility.getEnvironmentVariableValue(schemaName);
//                 }

//                 if (distanceUnit === undefined || distanceUnit === null) {
//                     distanceUnit = "mi"
//                 }

//                 if (isObjectAvailable(bingMapKey) && bingMapKey !== "") {
//                     if (sourceAddress !== '' && destinationAddress !== '') {
//                         let settings = {
//                             "url": "https://dev.virtualearth.net/REST/V1/Routes/Truck?routeAttributes=RouteSummariesOnly&wp.0=" + sourceAddress + "&wp.1=" + destinationAddress + "&distanceUnit=" + distanceUnit + "&key=" + bingMapKey,
//                             "method": "GET",
//                             'async': false
//                         };

//                         $.ajax(settings).done(function (response) {
//                             distance = response.resourceSets[0].resources[0].travelDistance;
//                         });

//                         return distance;
//                     }
//                     else {
//                         return 0;
//                     }
//                 }
//                 else {
//                     throw "Bingmapkey is not found";
//                 }

//             } catch (e) {
//                 AV.Common.openErrorDialog(e, e, '');
//             }
//         } catch (e) {
//             throw 'AlphavimaCommon >> calculateTruckDistance >> ' + e;
//         }
//     };

//     let getOwnerBUAddress = async function (ownerId) {
//         let branchName = '';
//         let fullAddress = '';
//         let suitNo = '';
//         let streetAddress = '';
//         let city = '';
//         let state = '';
//         let country = '';
//         let postalCode = '';

//         let buisnessUnitFetch = "<fetch version='1.0' output-format='xml-platform' mapping='logical' distinct='true'>" +
//             "  <entity name='businessunit'>" +
//             "    <attribute name='address1_postalcode' />" +
//             "    <attribute name='address1_line1' />" +
//             "    <attribute name='address1_line2' />" +
//             "    <attribute name='address1_city' />" +
//             "    <attribute name='address1_stateorprovince' />" +
//             "    <attribute name='address1_country' />" +
//             "    <attribute name='name' />" +
//             "    <attribute name='businessunitid' />" +
//             "    <order attribute='name' descending='false' />" +
//             "    <link-entity name='systemuser' from='businessunitid' to='businessunitid' link-type='inner' alias='ac'>" +
//             "      <filter type='and'>" +
//             "        <condition attribute='systemuserid' operator='eq' value='" + ownerId + "' />" +
//             "      </filter>" +
//             "    </link-entity>" +
//             "  </entity>" +
//             "</fetch>"

//         let buisnessUnitRec = await AV.Common.API.retrieveMultipleRecords('businessunit', null, buisnessUnitFetch);
//         if (buisnessUnitRec != null && buisnessUnitRec.entities != null && buisnessUnitRec.entities.length > 0) {

//             branchName = buisnessUnitRec.entities[0].name;

//             suitNo = buisnessUnitRec.entities[0].address1_line1;
//             if (isObjectAvailable(suitNo) && suitNo !== '') {
//                 fullAddress = suitNo + "\n";
//             }
//             streetAddress = buisnessUnitRec.entities[0].address1_line2;
//             if (isObjectAvailable(streetAddress) && streetAddress !== '') {
//                 fullAddress = fullAddress + streetAddress + "\n";
//             }
//             city = buisnessUnitRec.entities[0].address1_city;
//             if (isObjectAvailable(city) && city !== '') {
//                 fullAddress = fullAddress + city + "\n";
//             }
//             state = buisnessUnitRec.entities[0].address1_stateorprovince;
//             if (isObjectAvailable(state) && state !== '') {
//                 fullAddress = fullAddress + state + "\n";
//             }
//             postalCode = buisnessUnitRec.entities[0].address1_postalcode;
//             if (isObjectAvailable(postalCode) && postalCode !== '') {
//                 fullAddress = fullAddress + postalCode + "\n";
//             }
//             country = buisnessUnitRec.entities[0].address1_country;
//             if (isObjectAvailable(country) && country !== '') {
//                 fullAddress = fullAddress + country;
//             }
//         }
//         return {
//             "BUId": buisnessUnitRec.entities[0].businessunitid,
//             "Name": branchName,
//             "SuitNo": suitNo,
//             "StreetAddress": streetAddress,
//             "City": city,
//             "State": state,
//             "PostalCode": postalCode,
//             "Country": country,
//             "FullAddress": fullAddress
//         };
//     }

//     let lockEditableSubgridColumns = function (executionContext, disableFields) {
//         try {
//             let currentEntity = executionContext.getEventSource();
//             currentEntity._attributes.forEach(function (attribute, i) {
//                 if (disableFields.indexOf(attribute.getName()) > -1) {
//                     var attributeToDisable = attribute.controls.get(0);
//                     attributeToDisable.setDisabled(true);
//                 }
//             });
//         } catch (e) {
//             throw e;
//         }
//     }

//     let openCustomerAddressFormAsModal = function (primaryControl, parentId, objectTypeCode, primaryEntityId, subgridNameToRefresh) {
//         let extraqs = {};
//         extraqs["parentid"] = parentId;
//         extraqs["objecttypecode"] = objectTypeCode;
//         AV.Common.openEntityRecordAsModal("customeraddress", primaryEntityId, null, null, extraqs, null, null, null, 1, function (res) {
//             AV.Common.refreshSubgrid(primaryControl, subgridNameToRefresh);
//         }, AV.Common.Utility.errorCallBack);
//     }

//     let isCreateForm = function (formContext) {
//         let formType = formContext.ui.getFormType();
//         return (formType === 1 || formType === 5);
//     }

//     let isEditForm = function (formContext) {
//         return formContext.ui.getFormType() === 2;
//     }

//     let hideTabsOnCreateForm = function (formContext, arrTabs) {
//         if (isObjectAvailable(arrTabs)) {
//             let isVisible = true;
//             let formType = formContext.ui.getFormType();
//             if (formType === 1) {
//                 isVisible = false;
//             }
//             arrTabs.forEach(function (tabName) {
//                 let tabCtrl = formContext.ui.tabs.get(tabName);
//                 if (tabCtrl !== null && tabCtrl !== undefined) {
//                     tabCtrl.setVisible(isVisible);
//                 }
//             });
//         }
//     }

//     let validationForFileField = function (formContext, entityLogicalName, entityId, fieldLogicalName) {
//         setTimeout(function () {
//             let clientUrl = AV.Common.Utility.getClientUrl();
//             //    AV.Common.setAttributeValue(formContext, fieldLogicalName, null);
//             let requestUrl = "" + clientUrl + "/api/data/v9.0/" + entityLogicalName + "(" + entityId + ")/" + fieldLogicalName + "";
//             $.ajax({
//                 type: "DELETE",
//                 contentType: "application/json; charset=utf-8",
//                 datatype: "json",
//                 url: requestUrl,
//                 async: false,
//                 beforeSend: function (XMLHttpRequest) {
//                     XMLHttpRequest.setRequestHeader("Accept", "application/json");
//                     XMLHttpRequest.setRequestHeader("Prefer", "odata.include-annotations=*");
//                 },
//                 success: function (data, textStatus, XmlHttpRequest) {
//                     //    AV.Common.refreshFormData(formContext);
//                     AV.Common.setFieldNotification(formContext, fieldLogicalName, "Please upload docx or pdf file only.");
//                     //   alert("Deleted successfully");
//                 },
//                 error: function (XMLHttpRequest, textStatus, errorThrown) {
//                     alert("error occured");
//                 }
//             });
//         }, 1000);
//     }

//     let createCookie = function (name, value, minutes) {
//         if (minutes) {
//             var date = new Date();
//             date.setTime(date.getTime() + (minutes * 60 * 1000));
//             var expires = "; expires=" + date.toGMTString();
//         } else {
//             var expires = "";
//         }
//         document.cookie = name + "=" + value + expires + "; path=/";
//     }

//     let getCookie = function (cname) {
//         let name = cname + "=";
//         let decodedCookie = decodeURIComponent(document.cookie);
//         let ca = decodedCookie.split(';');
//         for (let i = 0; i < ca.length; i++) {
//             let c = ca[i];
//             while (c.charAt(0) == ' ') {
//                 c = c.substring(1);
//             }
//             if (c.indexOf(name) == 0) {
//                 return c.substring(name.length, c.length);
//             }
//         }
//         return "";
//     }

//     let showHideSubGrids = function (formContext, arrayOfSubGridsToHide, aarayOfSubGridsToShow, buttonId) {
//         try {
//             arrayOfSubGridsToHide.forEach(function (item, index) {
//                 //AV.Common.setVisible(formContext, item, false);
//                 if (Xrm.Page.ui.controls.get(item) !== null) {
//                     Xrm.Page.ui.controls.get(item).setVisible(false);
//                 }
//                 else if (parent.Xrm.Page.ui.controls.get(item) !== null) {
//                     parent.Xrm.Page.ui.controls.get(item).setVisible(false);
//                 }
//             });

//             aarayOfSubGridsToShow.forEach(function (item, index) {
//                 //AV.Common.setVisible(formContext, item, true);
//                 if (Xrm.Page.ui.controls.get(item) !== null) {
//                     Xrm.Page.ui.controls.get(item).setVisible(true);
//                 }
//                 else if (parent.Xrm.Page.ui.controls.get(item) !== null) {
//                     parent.Xrm.Page.ui.controls.get(item).setVisible(true);
//                 }
//             });

//             //document.getElementsByClassName('cardtxt').classList.remove('active');
//             //document.getElementById(buttonId).classList.add('active');
//         } catch (e) {
//             AV.Common.openErrorDialog(e, "showHideSubGrids >> " + e);
//         }
//     }

//     let setFormContextInWebResource = function (formContext, webResourceName) {
//         if (webResourceName === null || webResourceName === undefined || webResourceName === "") {
//             webResourceName = "WebResource_GenericRentalButton";
//         }

//         let wrControl = formContext.getControl(webResourceName);
//         if (wrControl) {
//             wrControl.getContentWindow().then(
//                 function (contentWindow) {
//                     contentWindow.setClientApiContext(Xrm, formContext);
//                 }
//             )
//         }
//     }

//     let showPaymentRibbonButtons = async function (primaryControl) {
//         formContext = primaryControl;
//         let enablePaymentFeature = await AV.Common.Utility.getEnvironmentVariableValue('avpx_EnablePaymentFeature');
//         if (enablePaymentFeature == 'yes') {
//             return true;
//         }
//         else {
//             return false;
//         }
//     }

//     return {
//         getModalDialogParams: getModalDialogParams,
//         getQueryStrings: getQueryStrings,
//         getWebResourceQueryStringData: getWebResourceQueryStringData,
//         isObjectAvailable: isObjectAvailable,
//         guidsAreEqual: guidsAreEqual,
//         getClientUrl: getClientUrl,
//         createDynamicControl: createDynamicControl,
//         stringToBoolean: stringToBoolean,
//         checkUserHasRoles: checkUserHasRoles,
//         checkUserNameHasRoles: checkUserNameHasRoles,
//         getEnvironmentVariableValue: getEnvironmentVariableValue,
//         prepareLookupObject: prepareLookupObject,
//         errorCallBack: errorCallBack,
//         calculateTruckDistance: calculateTruckDistance,
//         getOwnerBUAddress: getOwnerBUAddress,
//         lockEditableSubgridColumns: lockEditableSubgridColumns,
//         openCustomerAddressFormAsModal: openCustomerAddressFormAsModal,
//         isCreateForm: isCreateForm,
//         isEditForm: isEditForm,
//         hideTabsOnCreateForm: hideTabsOnCreateForm,
//         validationForFileField: validationForFileField,
//         createCookie: createCookie,
//         getCookie: getCookie,
//         showHideSubGrids: showHideSubGrids,
//         setFormContextInWebResource: setFormContextInWebResource,
//         showPaymentRibbonButtons: showPaymentRibbonButtons
//     };

// })();

// AV.Common.API = (function () {
//     var onlineWebApi = Xrm.WebApi.online;

//     var createRecordAsync = function (entityLogicalName, data, successCallback, errorCallback) {
//         onlineWebApi.createRecord(entityLogicalName, data).then(successCallback, errorCallback);
//     };

//     var createRecord = async function (entityLogicalName, data) {
//         let id = await onlineWebApi.createRecord(entityLogicalName, data).then(
//             function success(res) {
//                 return res.id;
//             },
//             function error(error) {
//                 AV.Common.openErrorDialog('An error occured while creating the record.', error.message);
//                 return null;
//             });

//         return id;
//     };

//     var deleteRecordAsync = function (entityLogicalName, id, successCallback, errorCallback) {
//         onlineWebApi.deleteRecord(entityLogicalName, id).then(successCallback, errorCallback);
//     };

//     var retrieveRecordAsync = function (entityLogicalName, id, options, successCallback, errorCallback) {
//         onlineWebApi.retrieveRecord(entityLogicalName, id, options).then(successCallback, errorCallback);
//     };

//     var retrieveRecord = async function (entityLogicalName, id, options) {
//         let result = await onlineWebApi.retrieveRecord(entityLogicalName, id, options).then(
//             function success(res) {
//                 return res;
//             },
//             function error(error) {
//                 AV.Common.openErrorDialog('An error occured while retrieving the record.', error.message);
//                 return null;
//             });

//         return result;
//     };

//     var retrieveMultipleRecordsAsync = function (entityLogicalName, odataQuery, fetchXML, successCallback, errorCallback) {
//         let options;
//         if (fetchXML !== null && fetchXML !== undefined && fetchXML.trim() !== '') {
//             options = "?fetchXml=" + encodeURIComponent(fetchXML);
//         }
//         else {
//             options = odataQuery;
//         }

//         onlineWebApi.retrieveMultipleRecords(entityLogicalName, options).then(successCallback, errorCallback);
//     };

//     var retrieveMultipleRecords = async function (entityLogicalName, odataQuery, fetchXML) {
//         let options;
//         if (fetchXML !== null && fetchXML !== undefined && fetchXML.trim() !== '') {
//             options = "?fetchXml=" + encodeURIComponent(fetchXML);
//         }
//         else {
//             options = odataQuery;
//         }

//         let result = await onlineWebApi.retrieveMultipleRecords(entityLogicalName, options).then(
//             function success(res) {
//                 return res;
//             },
//             function error(error) {
//                 AV.Common.openErrorDialog('An error occured while retrieving the records.', error.message);
//                 return null;
//             }
//         );

//         return result;
//     };

//     var updateRecordAsync = function (entityLogicalName, id, data, successCallback, errorCallback) {
//         onlineWebApi.updateRecord(entityLogicalName, id, data).then(successCallback, errorCallback);
//     };

//     var updateRecord = async function (entityLogicalName, id, data) {
//         let result = await onlineWebApi.updateRecord(entityLogicalName, id, data).then(
//             function success(res) {
//                 return true;
//             },
//             function error(error) {
//                 AV.Common.openErrorDialog('An error occured while retrieving the records.', error.message);
//                 return false;
//             }
//         );

//         return result;
//     };

//     var executeMultiple = function (requests, successCallback, errorCallback) {
//         onlineWebApi.executeMultiple(requests).then(successCallback, errorCallback);
//     };

//     return {
//         createRecordAsync: createRecordAsync,
//         createRecord: createRecord,
//         deleteRecordAsync: deleteRecordAsync,
//         retrieveRecordAsync: retrieveRecordAsync,
//         retrieveRecord: retrieveRecord,
//         retrieveMultipleRecordsAsync: retrieveMultipleRecordsAsync,
//         retrieveMultipleRecords: retrieveMultipleRecords,
//         updateRecordAsync: updateRecordAsync,
//         updateRecord: updateRecord,
//         executeMultiple: executeMultiple
//     };

// })();

// export { AV };