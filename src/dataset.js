this.RECLINE = this.RECLINE || {};

RECLINE.Model = function ($, _, Backbone) {
  var my = {};

  // A Dataset model.
  my.Dataset = Backbone.Model.extend({
    initialize: function(data, rawTabularData) {
      this.tabularData = new my.TabularData(rawTabularData);
    }

    // get TabularData object associated with this Dataset
    //
    // async (as may involve getting data from the server) implementing standard promise API
    , getTabularData: function() {
      var dfd = $.Deferred();
      dfd.resolve(this.tabularData);
      return dfd.promise();
    }
  });

  // TabularData model
  my.TabularData = Backbone.Model.extend({
    getLength: function() { 
      return this.get('rows').length;
    }
    , getRows: function(numRows, start) {
      if (start === undefined) {
        start = 0;
      }
      if (numRows === undefined) {
        numRows = 10;
      }
      var dfd = $.Deferred();
      var results = this.get('rows').slice(start, start+numRows);
      dfd.resolve(results);
      return dfd.promise();
    }
  });

  return my;
}(this.jQuery, this._, this.Backbone);

