/**
 * @license
 * Copyright (c) 2014, 2019, Oracle and/or its affiliates.
 * The Universal Permissive License (UPL), Version 1.0
 */
/*
 * Your dashboard ViewModel code goes here
 */
define(['ojs/ojcore', 'knockout', 'jquery', 'ojs/ojdatetimepicker', 'ojs/ojlabel', 'ojs/ojinputtext', 'ojs/ojformlayout', 'ojs/ojbutton',
  'ojs/ojvalidation-datetime', 'ojs/ojvalidation-number', 'ojs/ojtimezonedata', 'ojs/ojselectcombobox', 'ojs/ojvalidationgroup'],
  function (oj, ko, $) {

    function DashboardViewModel() {
      var self = this;

      self.groupValid = ko.observable();
      self.invoiceId = ko.observable("MAR-818");
      self.dueDateValueRisk = ko.observable();
      self.payDateValueRisk = ko.observable();
      self.invoiceAmount = ko.observable(75.30);
      self.customerSelected = ko.observable("11");
      var currentDate = new Date();
      self.currentDateValueRisk = ko.observable(oj.IntlConverterUtils.dateToLocalIso(currentDate));

      var dateConverterFactory = oj.Validation.converterFactory("datetime");
      self.dateConverter = dateConverterFactory.createConverter();

      self.constructNumberConverter = function () {
        var options = { style: "currency", currency: "USD", currencyDisplay: "symbol" };
        var numberConverterFactory = oj.Validation.converterFactory("number");
        return numberConverterFactory.createConverter(options);
      }

      self.numberConverter = self.constructNumberConverter();

      self.paymentRiskCalculation = function () {
        document.getElementById("d3").validate();
        document.getElementById("d4").validate();

        var tracker = document.getElementById("tracker");

        if (tracker.valid === "valid") {
          console.log("VALIDATION => SUCCESSFUL");
        } else {
          tracker.showMessages();
          tracker.focusOn("@firstInvalidShown");
        }
      }

      self.dueDateCheck = {
        validate: function (value) {
          if (!value) {
            return true;
          }
          var dueDate = oj.IntlConverterUtils.isoToDate(value);
          var invoiceDate = oj.IntlConverterUtils.isoToDate(self.currentDateValueRisk());

          if (dueDate < invoiceDate) {
            throw new Error('Payment Due Date must be after Invoice Date');
          }

          return true;
        }
      };

      self.paymentDateCheck = {
        validate: function (value) {
          if (!value) {
            return true;
          }
          var paymentDate = oj.IntlConverterUtils.isoToDate(value);
          var invoiceDate = oj.IntlConverterUtils.isoToDate(self.currentDateValueRisk());

          if (paymentDate < invoiceDate) {
            throw new Error('Payment Date must be after Invoice Date');
          }

          return true;
        }
      };

      // Below are a set of the ViewModel methods invoked by the oj-module component.
      // Please reference the oj-module jsDoc for additional information.

      /**
       * Optional ViewModel method invoked after the View is inserted into the
       * document DOM.  The application can put logic that requires the DOM being
       * attached here. 
       * This method might be called multiple times - after the View is created 
       * and inserted into the DOM and after the View is reconnected 
       * after being disconnected.
       */
      self.connected = function () {
        // Implement if needed
      };

      /**
       * Optional ViewModel method invoked after the View is disconnected from the DOM.
       */
      self.disconnected = function () {
        // Implement if needed
      };

      /**
       * Optional ViewModel method invoked after transition to the new View is complete.
       * That includes any possible animation between the old and the new View.
       */
      self.transitionCompleted = function () {
        // Implement if needed
      };
    }

    /*
     * Returns a constructor for the ViewModel so that the ViewModel is constructed
     * each time the view is displayed.  Return an instance of the ViewModel if
     * only one instance of the ViewModel is needed.
     */
    return new DashboardViewModel();
  }
);
