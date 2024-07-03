// ◆カタログクライアントスクリプト（onchange）
function onChange(control, oldValue, newValue, isLoading) {
    if (isLoading || newValue == '') {
        return;
    }

    g_form.addErrorMessage("フィルタテスト　カタログ　開始：" + newValue);

    var gr = new GlideRecord('x_nttmc_com_sfdb_projectid_list');
    gr.addQuery('project_id', newValue);
    gr.query(CallBack);

    function CallBack(rec) {
        if (rec.next()) {
            projectid = gr.getValue('project_id');
        }
    }

    g_form.addErrorMessage("projectid　：" + projectid);

    var win = (0, eval)('this');
    var jQ = win.jQuery;
    var ngMain = win.angular.element('main');
    var rootScope = ngMain.injector().get('$rootScope');
    var whichData = {
        "filter": "project_id=" + projectid,
        "maximum_entries": 20
    };

    // テーブルにあるレコードリストを取得
    var tableList = g_form.getValue('listname')
    // idに合うレコードを取得
    tableList.filter(function (item) {
        item.project_id = newValue
    })
    // フィルターした後のレコードをリストに再設定
    g_form.setValue('listname', tableList)






    rootScope.$broadcast('getData', whichData);

    g_form.addErrorMessage("フィルタテスト　カタログ　終了：" + whichData);

    //g_form.addErrorMessage("利用データの取得　開始：" + new Date());
    //g_form.addInfoMessage("利用データの取得　開始：" + new Date.tostring());
    //Type appropriate comment here, and begin script below
    //   	alert('onChange : ' + sessionStorage.getItem("under_operation"));
    if (sessionStorage.getItem("under_operation") == null || sessionStorage.getItem("under_operation") == "false") {
        sessionStorage.setItem("under_operation", "false");
        //   	alert('onChange then : ' + sessionStorage.getItem("under_operation"));
    }
    else {
        sessionStorage.setItem("under_operation", "false");
        //   	alert('onChange else : ' + sessionStorage.getItem("under_operation"));
        return;
    }
    sessionStorage.setItem("userdb_id", newValue);

    //g_form.addInfoMessage("利用データの取得中です。データが表示されるまで、しばらくお待ちください。");
    //既存利用データの読み込み
    var gr = new GlideRecord('x_nttmc_com_sfdb_projectid_list');
    gr.addQuery('sys_id', newValue);
    gr.query(CallBack);

    function CallBack(rec) {
        if (rec.next()) {
            azure_ad_security_group = gr.getValue('project_id');
            sessionStorage.setItem("project_id", azure_ad_security_group);
            var ga = new GlideAjax('call_flow_userdb'); // 呼び出すスクリプトインクルード
            ga.addParam('sysparm_name', 'callFlow'); // 呼び出す関数
            ga.addParam('sysparm_azure_ad_security_group', azure_ad_security_group); // 呼び出す関数
            ga.getXMLAnswer(call_Back);

            function call_Back(response) {
                var res = JSON.parse(response);
            }
        }
    }
    //g_form.addErrorMessage("利用データの取得　終了：" + new Date());
}

// ◆カタログクライアントスクリプト（onload)
function onLoad() {
    //Get the windows object
    alert('onLoad start: ');
    var win = (0, eval)('this');
    var jQ = win.jQuery;
    var ngMain = win.angular.element('main');
    var rootScope = ngMain.injector().get('$rootScope');
    var currentUser = sessionStorage.getItem("userdb_id");
    var whichData = {
        "table": "x_nttmc_com_sfdb_userdb_control",
        "filter": "prjcd_id" + currentUser,
        "display_field": "既存利用データ情報（利用テーブル）",
        "secondary_fields": "u_start_date,u_end_date",
        "title": "Select one of your requests",
        "maximum_entries": 5
    };
    alert('onLoad end: ' + currentUser);
    //As the widget loads after the catalog item, we'll poll to see when it's up and listening
    win.sessionStorage.setItem('test_filter', 'sending');
    broadcastAngular(0);

    function broadcastAngular(timer) {
        //broadcast every 100ms until the widget is listening or a max of 5 seconds has passed
        if (win.sessionStorage.getItem('test_filter') == 'sending' && timer < 5000) {

            //try to broadcast
            rootScope.$broadcast('getData', whichData);
            //loop to see if the broadcast was heard (as broadcasting will become received)
            win.setTimeout(function () {
                timer += 100;
                broadcastAngular(timer);
            }, 100);
        }
    }

    //this runs when a user clicks on a record in the simple list
    rootScope.$on('$sp.list.click', function (event, details) {
        //change fields on the form using information from Simple List
        g_form.setValue('userdb_id', details.record.display_field.display_value);
    });

    //Type appropriate comment here, and begin script below
    // onload時にonchangeを処理させないための制御用フラグ（under_operation）
    //	alert('onLoad : ' + sessionStorage.getItem("under_operation"));
    if (sessionStorage.getItem("under_operation") == null) {
    }
    else {
        sessionStorage.setItem("under_operation", "ture");
    }
    //	alert('onLoad2 : ' + sessionStorage.getItem("under_operation"));
    g_form.setValue("applicant_name", sessionStorage.getItem("applicant_name"));
    g_form.setValue("applicant_email", sessionStorage.getItem("applicant_email"));
    g_form.setValue("applicant_affiliation", sessionStorage.getItem("applicant_affiliation"));
    g_form.setValue("project_name", sessionStorage.getItem("project_name"));
    g_form.setValue("userdb_id", sessionStorage.getItem("userdb_id"));
    g_form.setValue("responsible_user_name", sessionStorage.getItem("responsible_user_name"));
    g_form.setValue("responsible_user_email", sessionStorage.getItem("responsible_user_email"));
    g_form.setValue("responsible_user_affiliation", sessionStorage.getItem("responsible_user_affiliation"));
    g_form.setValue("responsible_dbuser_name", sessionStorage.getItem("responsible_dbuser_name"));
    g_form.setValue("responsible_dbuser_email", sessionStorage.getItem("responsible_dbuser_email"));
    g_form.setValue("Responsible_dbusers_affiliation", sessionStorage.getItem("Responsible_dbusers_affiliation"));
    g_form.setValue("oder_type", 'プロジェクト');
}

// ◆ウィジェット
// 　・サーバ
(function () {
    /*  "use strict"; - linter issues */
    // populate the 'data' object
    var sp_page = $sp.getValue('sp_page');
    var pageGR = new GlideRecord('sp_page');
    pageGR.get(sp_page);
    data.page_id = pageGR.getValue("id");
    $sp.getValues(data);
    if (data.field_list) {
        data.fields_array = data.field_list.split(',');
    } else {
        data.field_list = $sp.getListColumns(data.table);
    }
    //At the start of the server script listen for input from the client
    if (input.hasOwnProperty('table')) {
        options.table = input.table;
        options.filter = input.filter;
        //		options.display_field    = input.display_field;
        //		options.order_by         = input.display_field;
        //		options.secondary_fields = input.secondary_fields;
        options.title = input.title;
        options.maximum_entries = input.maximum_entries;
        options.sp_page = false;
        options.url = '';
    }
    if (input) {
        data.p = input.p;
        data.o = input.o;
        data.d = input.d;
        data.q = input.q;
    }
    data.p = data.p || 1;
    data.o = data.o || $sp.getValue('order_by');
    data.d = data.d || $sp.getValue('order_direction');

    data.page_index = (data.p - 1);
    data.window_size = $sp.getValue('maximum_entries') || 10;
    data.window_start = (data.page_index * data.window_size);
    data.window_end = (((data.page_index + 1) * data.window_size));
    data.filter = $sp.getValue("filter");

    var gr = new GlideRecordSecure(data.table);
    if (!gr.isValid()) {
        data.invalid_table = true;
        data.table_label = data.table;
        return;
    }
    data.table_label = gr.getLabel();

    options.table = data.table;
    options.fields = data.field_list;
    options.o = data.o;
    options.d = data.d;
    //	options.filter=data.filter;
    options.window_size = data.window_size;
    options.view = data.view;
    options.useInstanceTitle = true; // to make sure Data Table widget uses headerTitle always
    options.headerTitle = options.title;
    options.show_breadcrumbs = true;
    options.table = input.table;
    options.filter = input.filter;
    gs.info("options.filter: " + options.filter);
    data.dataTableWidget = $sp.getWidget('widget-data-table', options);
})();

// ◆クライアント
function ($scope, spUtil, $location, spAriaFocusManager) {
    var c = this;
    //Listen for catalog client onload/onchange scripts 
    $rootScope.$on('getData', function (event, details) {
        //Let the catalog script know we've heard
        window.sessionStorage.setItem('test_filter', 'received');
        //Interact with the widget server code
        c.server.get(details).then(function (response) {
            c.data = response.data;
            c.options.title = details.title;
            c.options.color = "default"
        })
    });

    $scope.$on('data_table.click', function (e, parms) {
        var p = $scope.data.page_id || 'form';
        var s = { id: p, table: parms.table, sys_id: parms.sys_id, view: 'sp' };
        var newURL = $location.search(s);
        spAriaFocusManager.navigateToLink(newURL.url());
    });
}