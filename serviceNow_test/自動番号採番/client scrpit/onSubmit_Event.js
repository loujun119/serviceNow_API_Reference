/**
 * 製品管理表に新規追加を送信する際に、イベントを行う
 */
function onSubmit() {
    // 製品名を取得
    var proName = g_form.getValue('product');
    // 製品の自動番号を取得
    var proNameCode = g_form.getValue('auto_number'); // SAS-NE00005
    // 自動番号の製品コードを抜き、番号だけを取得
    var proNumber = proNameCode.substring(proNameCode.length - 5, proNameCode.length);

    // ajaxでserver側のメソッドを使って、製品名と自動番号を自動番号管理表に追加；
    var maxNumberAjax = new GlideAjax('insert_to_autoNumber_table');
    maxNumberAjax.addParam('sysparm_name', 'insertAutoNumber');
    maxNumberAjax.addParam('pro_name', proName);
    maxNumberAjax.addParam('pro_number', proNumber);
    maxNumberAjax.getXML(callBackFunction);

    function callBackFunction(response) {
        // 追加処理結果を取得
        var answer = response.responseXML.documentElement.getAttribute('answer');
        // 結果はOKの場合、trueを返す(trueを返すと、submit処理を認める)
        return answer === 'OK' ? true : false;
    }
}