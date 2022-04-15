// クラスを生成する
var getMaxAutoNumber = Class.create();
getMaxAutoNumber.prototype = Object.extendsObject(global.AbstractAjaxProcessor, {
	// 最新の自動番号取得処理
    getMaxNumber: function() {
        // ajaxで取得されたパラメータ：製品名
        var proName = this.getParameter('pro_name');
        // 製品名と合わせる全部の自動番号情報を格納用リスト
        var autoNumberList = [];
        // 自動番号管理表を設定
        var proNumberList = new GlideRecord("x_720653_loujun_sn_production_number");
        // 検索用のwhere情報を設定する
        proNumberList.addQuery('pro_name', proName);
        // 自動番号の順でソートする
        proNumberList.orderBy("pro_number");
        // 検索を実施
        proNumberList.query();

        // 検索結果を判定して、空の場合、製品の番号は初期状態になる。
        if (!proNumberList.hasNext()) {
            return '00001';
        } else {
            // 検索結果を判定して、情報があるの場合、ループで自動番号をリストに格納する
            while (proNumberList.next()) {
                autoNumberList.push(proNumberList.pro_number);
            }
            // リストにある、最後の番号を取得
            var lastNumber = autoNumberList[autoNumberList.length - 1];
            // 番号をnumber形に変更して、プラス1をする
            var autoNumber = Number(lastNumber) + 1;
            // 最新の番号を文字列に戻る
            autoNumber = autoNumber.toString();
            // 文字列を表示用の自動番号形に変更する(xxx00123)
            var strNum = '00000';
            strNum = strNum.substring(0, strNum.length - autoNumber.length);
            // 自動番号形の番号をクライアントサイドに戻る
            return strNum + autoNumber;
        }
    },

    type: 'getMaxAutoNumber'
});