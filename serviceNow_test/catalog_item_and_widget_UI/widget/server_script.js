// widget Server scriptの処理メソッド
(function () {
  /**
   * 資産管理テーブル情報を取得
   * @param {*} pageSize ページサイズ
   * @param {*} currentPage 現在のページ
   * @param {*} isExpired 有効期間チェック情報
   * @returns 指定されたページの情報とトータルペイン数
   */
  function getAssetListByPagination(pageSize, currentPage, isExpired) {
    var limit = pageSize || 10;
    var pageNumber = currentPage || 1;
    // 検索結果をリストに追加する時、開始位置を判断する
    var offset = (pageNumber - 1) * limit;

    // テーブルを呼び出す
    var assetList = new GlideRecord("u_asset_number_management_table");

    // 有効期間チェック情報がある場合、検索条件を追加
    // ない場合、全件検索
    if (isExpired && isExpired !== "") {
      assetList.addQuery("u_isexpired", isExpired);
    }
    // 資産番号の昇順
    assetList.orderBy("u_asset_no");
    assetList.query();

    // 検索件数を使って、トータルページ数を計算
    var totalPages = Math.ceil(assetList.getRowCount() / limit);

    // 表示用資産情報リスト
    var resultList = [];

    // 開始追加位置判定
    var count = 0;
    // 検索結果をループ
    while (assetList.next()) {
      // 開始位置前の情報を追加しない
      if (count++ < offset) continue;

      // 追加した件数はページサイズと同じ場所、ループ処理を中止
      if (resultList.length >= limit) break;

      //   資産情報をリストに格納
      resultList.push({
        asset_no: assetList.getValue("u_asset_no"),
        asset_type: assetList.getValue("u_asset_type"),
        managing_section: assetList.getValue("u_managing_section"),
        isexpired:
          assetList.getValue("u_isexpired") === "0"
            ? "有効期限内"
            : "有効期限切れ",
      });
    }

    return {
      list: resultList,
      totalPages: totalPages,
    };
  }

  // widget controllerに設定されたactionと判定、同じ場合、メソッドを行う
  if (input && input.action === "getAssetListByPagination") {
    var pageSize = input.pageSize;
    var currentPage = input.currentPage;
    var isExpired = input.isExpired;
    data.result = getAssetListByPagination(pageSize, currentPage, isExpired);
  }
})();
