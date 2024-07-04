// InitialDisplay
function onLoad() {
    // ajaxでscript includeにあるクラスを呼び出す
    var assetList = new GlideAjax('GetAssetList');
    // クラスなかのメソッドを指定
    assetList.addParam('sysparm_name', 'getNumberList');
    // ajaxを実行、処理結果をcallBackFunctionで処理
    assetList.getXMLAnswer(callBackFunction);


    // ajax結果処理メソッド
    function callBackFunction(response) {
        // 処理結果をstringからオブジェクトに転換
        var result = JSON.parse(response);
        // 資産番号オプション用リスト
        var numberList = result.numberList;

        // オプションに追加
        for (var i = 0; i < numberList.length; i++) {
            var number = numberList[i];
            g_form.addOption('asset_no', number, number);
        }
    }
}

// SelectAssetNumner
function onChange(control, oldValue, newValue, isLoading) {
    // 初期表示や未選択の場合、タイプ、部門、有効期間のアイテムを非表示
    if (isLoading || newValue == '') {
        g_form.setDisplay('asset_type', false);
        g_form.setDisplay('managing_section', false);
        g_form.setDisplay('expired', false);
        return;
    }

    // 選択された場合、ajaxで選択された番号で、テーブルからレコードを検索
    var assetList = new GlideAjax('GetAssetList');
    assetList.addParam('sysparm_name', 'getAssetInfo');
    assetList.addParam('asset_no', newValue);
    assetList.getXMLAnswer(callBackFunction);

    // ajax結果処理メソッド
    function callBackFunction(response) {
        var result = JSON.parse(response);
        // 処理結果がある場合、
        if (result !== null) {
            // タイプ、部門、有効期間のアイテムを表示
            g_form.setDisplay('asset_type', true);
            g_form.setDisplay('managing_section', true);
            g_form.setDisplay('expired', true);
            // タイプ、部門、有効期間のアイテムの値を変更
            g_form.setValue('asset_type', result.asset_type);
            g_form.setValue('managing_section', result.managing_section);
            g_form.setValue('expired', (result.isexpired === '1' ? '有効期限内' : '有効期間切れ'));
        }

    }
}

// FilterItemIsexpiredChanged
function onChange(control, oldValue, newValue, isLoading) {
    if (isLoading) {
        return;
    }
    // 有効期間チェックの値を変更された場合、angularのに追加
    // windowのdom
    var win = (0, eval)('this');
    var $rootScope = win.angular.element('main').injector().get('$rootScope');
    $rootScope.$broadcast('isExpired_changed', newValue);

}

