// InitialDisplay
function onLoad() {
    var assetList = new GlideAjax('GetAssetList');
    assetList.addParam('sysparm_name', 'getNumberList');
    assetList.getXMLAnswer(callBackFunction);


    // ajax結果処理メソッド
    function callBackFunction(response) {
        var result = JSON.parse(response);
        var numberList = result.numberList;

        for (var i = 0; i < numberList.length; i++) {
            var number = numberList[i];
            g_form.addOption('asset_no', number, number);
        }
    }
}

// SelectAssetNumner
function onChange(control, oldValue, newValue, isLoading) {
    if (isLoading || newValue == '') {
        g_form.setDisplay('asset_type', false);
        g_form.setDisplay('managing_section', false);
        g_form.setDisplay('expired', false);
        return;
    }

    var assetList = new GlideAjax('GetAssetList');
    assetList.addParam('sysparm_name', 'getAssetInfo');
    assetList.addParam('asset_no', newValue);
    assetList.getXMLAnswer(callBackFunction);
    // ajax結果処理メソッド


    function callBackFunction(response) {
        var result = JSON.parse(response);

        if (result !== null) {
            g_form.setDisplay('asset_type', true);
            g_form.setDisplay('managing_section', true);
            g_form.setDisplay('expired', true);

            g_form.setValue('asset_type', result.asset_type);
            g_form.setValue('managing_section', result.managing_section);
            g_form.setValue('expired', (result.isexpired === 1 ? '有効期限内' : '有効期間切れ'));
        }

    }

}

// FilterItemIsexpiredChanged
function onChange(control, oldValue, newValue, isLoading) {
    if (isLoading) {
        return;
    }
    var win = (0, eval)('this');
    var $rootScope = win.angular.element('main').injector().get('$rootScope');
    $rootScope.$broadcast('isExpired_changed', newValue);

}

