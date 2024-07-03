/**
 * 指定された項目が編集すると、イベントが行われる
 * @param {*} newValue 設定された製品の情報
 * @param {*} isLoading テーブルの読み込み情報
 */
function onChange(control, oldValue, newValue, isLoading, isTemplate) {
  // テーブルは読み込み中(初期表示)や製品名が空の場合、処理中止
  if (isLoading) {
    return;
  }
  if (newValue === "") {
    g_form.setValue("auto_number", "");
    return;
  }

  // ajaxでserver側のメソッドを使って、選択された製品と関連の自動番号を取得；
  var maxNumberAjax = new GlideAjax("getMaxAutoNumber"); // getMaxAutoNumberはscript includeに追加されたクラスの名称
  ga.addParam("sysparm_name", "getNameDetails");
  maxNumberAjax.addParam("pro_sys_id", newValue); // ajaxリクエストの送信情報
  maxNumberAjax.getXMLAnswer(callBackFunction); // ajaxを実行する(functionのメソッドで結果を処理)
  // ajax結果処理メソッド
  function callBackFunction(response) {
    alert("response:" + response);
    // responseにある自動番号情報を取得
    var result = JSON.parse(response);
    // 製品コード自動採番
    var autoNumberAndNameCode = result.autoNumberAndNameCode;
    // 製品表の項目"自動番号"を更新する
    g_form.setValue(
      "auto_number",
      autoNumberAndNameCode !== "NotFound" ? autoNumberAndNameCode : ""
    );
  }
}
