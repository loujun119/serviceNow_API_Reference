// 1.onload：

function onLoad() {
    //Get the windows object
    //alert('onLoad start: ');
    var win = (0, eval)('this');
    var jQ = win.jQuery;
    var ngMain = win.angular.element('main');
    var rootScope = ngMain.injector().get('$rootScope');
    var currentUser = sessionStorage.getItem("userdb_id");
    var whichData = {
        "table": "x_nttmc_com_sfdb_userdb_control",
        "display_field": "既存利用データ情報（利用テーブル）",
        "secondary_fields": "u_start_date,u_end_date",
        "title": "Select one of your requests",
        "maximum_entries": 5
    };
    //alert('onLoad end: ' + currentUser);
    //As the widget loads after the catalog item, we'll poll to see when it's up and listening
    win.sessionStorage.setItem('test_filter', 'sending');
    broadcastAngular(0);

    function broadcastAngular(timer) {
        //broadcast every 100ms until the widget is listening or a max of 5 seconds has passed
        if (win.sessionStorage.getItem('test_filter') == 'sending' && timer < 5000) {

            //try to broadcast
            rootScope.$broadcast('getData', whichData);
            //loop to see if the broadcast was heard (as broadcasting will become received)
            win.setTimeout(function() {
                timer += 100;
                broadcastAngular(timer);
            }, 100);
        }
    }

    //this runs when a user clicks on a record in the simple list
    rootScope.$on('$sp.list.click', function(event, details) {
        //change fields on the form using information from Simple List
        g_form.setValue('userdb_id', details.record.display_field.display_value);
    });

}

// 2.widget:
// Body HTML template:

<div>
  <div ng-if="data.invalid_table">
    <div class="alert alert-info">
      <span ng-if="data.table_label">${Table not defined} '{{data.table_label}}'</span>
      <span ng-if="!data.table_label">${Select table on field below or specify on URL} ?id=list&amp;table=table_name</span>
    </div>
    <sn-record-picker field="selectedTable" table="'sys_db_object'"
                      display-field="'label'"
                      value-field="'name'"
                      display-fields="'name'"
                      search-fields="'label,name'" page-size="100" on-change="onChange()" ></sn-record-picker>
  </div>
  <div ng-if="data.dataTableWidget && !data.invalid_table">
  	<sp-widget widget="data.dataTableWidget"></sp-widget>
  </div>
</div>

// CSS:

.widget-data-table .clearfix {
  display: none;
}

.panel-primary .panel-heading {
  button:not(.btn-default) {
    &:focus {
      outline-color: #FFFFFF;
      border-color: #FFFFFF;
      box-shadow: 0px 0px 5px #FFFFFF;
    }
  }
}

// Server script:

(function() {
    //    gs.info("08 options.filter: start");
    /*  "use strict"; - linter issues */
    // populate the 'data' object
    var sp_page = $sp.getValue('sp_page');
    var pageGR = new GlideRecord('sp_page');
    pageGR.get(sp_page);
    data.page_id = pageGR.getValue("id");
    //	$sp.getValues(data);
    if (data.field_list) {
        data.fields_array = data.field_list.split(',');
    } else {
        data.field_list = $sp.getListColumns(data.table);
    }
    if (input) {
        data.p = input.p;
        data.o = input.o;
        data.d = input.d;
        data.q = input.q;
        //At the start of the server script listen for input from the client
        if (input.hasOwnProperty('table')) {
            options.table = input.table;
            options.filter = input.filter;
            //		    options.display_field    = input.display_field;
            //		    options.order_by         = input.display_field;
            //		    options.secondary_fields = input.secondary_fields;
            options.title = input.title;
            options.maximum_entries = input.maximum_entries;
            options.sp_page = false;
            options.url = '';
        }
    }
    gs.info("08 input.table" + input.table);
    gs.info("08 input.filter" + input.filter);
    gs.info("08 input.title" + input.title);
    data.p = data.p || 1;
    data.o = data.o || $sp.getValue('order_by');
    data.d = data.d || $sp.getValue('order_direction');

    data.page_index = (data.p - 1);
    data.window_size = $sp.getValue('maximum_entries') || 10;
    data.window_start = (data.page_index * data.window_size);
    data.window_end = (((data.page_index + 1) * data.window_size));
    // data.filter = $sp.getValue("filter");
    data.filter = input.filter;
    data.table = input.table;

    var gr = new GlideRecordSecure(data.table);
    if (!gr.isValid()) {
        data.invalid_table = true;
        data.table_label = data.table;
        return;
    }
    data.table_label = gr.getLabel();

    options.table = data.table;
    options.fields = data.field_list;
    //	options.o=data.o;
    options.o = 'project_id';
    options.d = data.d;
    options.filter = data.filter;
    //copyParameters(options, ['filter']);
    options.window_size = data.window_size;
    //	options.view = data.view;
    options.useInstanceTitle = true; // to make sure Data Table widget uses headerTitle always
    options.headerTitle = options.title;
    options.show_breadcrumbs = true;
    //	options.table=input.table;
    //	options.filter=input.filter;
    gs.info("08 input.Addtable filter " + options.filter);
    data.dataTableWidget = $sp.getWidget('widget-data-table', options);

    gs.info("08 server end");


})();

// Client controller:

function($scope, $rootScope, $location, spUtil, $timeout, spAriaFocusManager) {
    var canNavigate = true;
    if ($scope.data.dataTableWidget)
        angular.extend($scope.data.dataTableWidget.options, $scope.options);

    $scope.$on('data_table.click', callDataClick);

    $scope.$on('select2.ready', function(e, $el) {
        if ($scope.data.invalid_table) {
            e.stopPropagation();
            $el.select2('open');
        }
    })

    var c = this;

    //Listen for catalog client onload/onchange scripts 
    $rootScope.$on('getData', function(event, details) {
        //Let the catalog script know we've heard
        window.sessionStorage.setItem('test_filter', 'received');
        //Interact with the widget server code
        c.server.get(details).then(function(response) {
            c.data = response.data;
            c.options.title = details.title;
            c.options.color = "default"
        })
    });

    $scope.$watch(function() {
        return $scope.page.g_form.getDisplayValue('userdb_id');
    }, function(value) {
        $scope.options.headerTitle = 'Select one of your requests'
        if (value != '' && value != null && value != undefined)
            $scope.options.filter = "project_id=" + value;
        getData(true);
    })

    $scope.selectedTable = {
        displayValue: $scope.data.table,
        value: $scope.data.table
    }

    function resetParams() {
        delete $scope.data.p;
        delete $scope.data.o;
        delete $scope.data.d;
        delete $scope.data.q;
        delete $scope.data.table;
    }

    $scope.onChange = function() {
        resetParams();
        $scope.data.table = $scope.selectedTable.value;
        $scope.data.fields = ""; // reset
        $scope.data.invalid_table = false;
        getData(true);
    }

    function callDataClick(e, parms) {
        var oid = $location.search().id;
        var p = $scope.data.page_id || 'form';
        var s = {
            id: p,
            table: parms.table,
            sys_id: parms.sys_id,
            view: $scope.data.view
        };
        if (oid == p) {
            s.spa = 1;
            var t = $location.search();
            s = angular.extend(t, s);
            $rootScope.$broadcast('$sp.list.click', s);
        }

        var newURL = $location.search(s);
        spAriaFocusManager.navigateToLink(newURL.url());
    }

    function getData(updateUrl) {
        var f = $scope.data;
        spUtil.update($scope).then(function(data) {
            $scope.data.dataTableWidget = null;
            $timeout(function() {
                $scope.data.dataTableWidget = data.dataTableWidget;
                angular.extend($scope.data.dataTableWidget.options, $scope.options);
                //  if (updateUrl)
                //     setPermalink(f.table);
            });
        });
    }

    function setPermalink(table) {
        $scope.ignoreLocationChange = true;
        var searchParms = $location.search();
        var search = {
            spa: 1,
            table: table,
            id: searchParms.id
        };
        $location.search(search);
    }
}

// Option schema:

[{"hint":"Show Instance option title instead of the table's plural label","name":"use_instance_title","default_value":"false","section":"Presentation","label":"Use Instance Title","type":"boolean"},{"hint":"If enabled, show the filter in the breadcrumb section of the table","name":"enable_filter","default_value":"false","section":"Presentation","label":"Enable Filter","type":"boolean"}]





