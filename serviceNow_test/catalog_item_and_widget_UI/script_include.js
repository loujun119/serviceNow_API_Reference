// クラス生成
var GetAssetList = Class.create();

// ajax用処理メソッドを作成
GetAssetList.prototype = Object.extendsObject(global.AbstractAjaxProcessor, {
  // 資産管理テーブルを取得
  getNumberList: function () {
    // テーブルを呼び出す
    var assetList = new GlideRecord("u_asset_number_management_table");
    // 資産番号の昇順
    assetList.orderBy("u_asset_no");
    // 検索を実行
    assetList.query();

    // 処理結果のオブジェクト
    var result = {};
    // 資産情報リスト
    var numberList = [];

    // 検索結果を処理（検索結果は直接使えないため、ループして、必要な情報をリストに格納）
    // 検索結果がある場合
    if (assetList.hasNext()) {
      // ループ処理を行う
      while (assetList.next()) {
        // 資産番号をリストに格納
        numberList.push(assetList.getValue("u_asset_no"));
      }
      // 処理結果のオブジェクトに追加
      result = {
        numberList: numberList,
      };
      // JSON string形でclient scriptに返却
      return JSON.stringify(result);
    } else {
      // 検索結果がない場合、nullを返す
      result = {
        numberList: null,
      };
      return JSON.stringify(result);
    }
  },

  //  指定された資産番号の情報を取得
  getAssetInfo: function () {
    var assetNo = this.getParameter("asset_no");
    var assetList = new GlideRecord("u_asset_number_management_table");
    // 検索条件を設定
    assetList.addQuery("u_asset_no", assetNo);
    assetList.orderBy("u_asset_no");
    assetList.query();

    // ループ処理を行う
    while (assetList.next()) {
      var result = {
        asset_type: assetList.getValue("u_asset_type"),
        managing_section: assetList.getValue("u_managing_section"),
        isexpired: assetList.getValue("u_isexpired"),
      };
      // JSON string形でclient scriptに返却
      return JSON.stringify(result);
    }
  },

  // クラス名と一致しないいけない
  type: "GetAssetList",
});
