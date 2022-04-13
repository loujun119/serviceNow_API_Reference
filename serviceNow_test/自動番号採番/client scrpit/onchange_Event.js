// 製品の専用コード
var SAS_PRODUCT_NAME = 'NEC-SAS';

/**
 * 指定された項目が編集すると、イベントが行われる
 * @param {*} newValue 設定された製品の情報
 * @param {*} isLoading テーブルの読み込み情報
 */
function onChange(newValue, isLoading) {
    // テーブルは読み込み中(初期表示)や製品名が空の場合、処理中止
    if (isLoading || newValue === '') {
        return;
    }
	
	// ajaxでserver側のメソッドを使って、選択された製品と関連の自動番号を取得；
	var maxNumberAjax = new GlideAjax('getMaxAutoNumber');// getMaxAutoNumberはscript includeに追加されたクラスの名称
    maxNumberAjax.addParam('sysparm_name', 'getMaxNumber');// getMaxNumberはクラスに設定されたfunctionの名称
	maxNumberAjax.addParam('pro_name', newValue);// ajaxリクエストの送信情報
	maxNumberAjax.getXML(callBackFunction);// ajaxを実行する(functionのメソッドで結果を処理)
	
    // ajax結果処理メソッド
	function callBackFunction(response){
        // responseにある自動番号情報を取得
		var answer = response.responseXML.documentElement.getAttribute('answer');
        // 製品名で製品のコードを変更する
		var nameCode = getNameCode(newValue);
        // 製品表の項目"自動番号"を更新する
		g_form.setValue('auto_number', nameCode + answer);
	}
}

/**
 * 製品名による、製品のコードを取得
 * @param {*} proName 製品名 
 * @returns 製品のコード
 */
function getNameCode(proName) {
   var nameCode = '';
	switch(proName){
      case 'SAS':
         nameCode = SAS_PRODUCT_NAME;
      break;

      default:
         nameCode = '';
         break;
			
	}
	return nameCode;
}
