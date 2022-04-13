// クラスを生成する
var insert_to_autoNumber_table = Class.create();
insert_to_autoNumber_table.prototype = Object.extendsObject(global.AbstractAjaxProcessor, {

    // 新規追加された製品の情報を自動番号管理表に追加処理
    insertAutoNumber: function() {
        try {
            // ajaxで取得されたパラメータ：製品名
            var proName = this.getParameter('pro_name');
            // ajaxで取得されたパラメータ：自動番号
            var proNumber = this.getParameter('pro_number');
            // 自動番号管理表を設定
            var autoNumberTable = new GlideRecord("x_720653_loujun_sn_production_number");
            // 初期化
            autoNumberTable.initialize();
            // 追加用の製品名を設定する
            autoNumberTable.pro_name = proName;
            // 追加用の自動番号を設定する
            autoNumberTable.pro_number = proNumber;
            // 追加処理を行う
            autoNumberTable.insert();
            // 追加結果をOKで返す
            return 'OK';
        } catch (error) {
            // エラーが発生する場合、ログを出力する
            gs.log('自動番号管理表に追加が失敗しました。');
            // 追加結果をfalseで返す
            return 'False';
        }
    },

    type: 'insert_to_autoNumber_table'
});