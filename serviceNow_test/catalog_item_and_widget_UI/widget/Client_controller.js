api.controller = function ($scope) {
  /**
   * widget UIのコントローラ
   *  1.Server scriptにあるメーソトを読み取り、必要な情報を取得
   *  2.取得情報を処理して、html(widget画面UI)に表示
   */
  // angularのコントローラ
  var c = this;

  // 初期判定フラグ,
  // true：画面は初期起動
  var isInitial = true;

  // catalog itemから取得された、有効期間チェックの選択値
  var isExpired_parma = "";

  // 初期状態のページネーション情報
  var initialPage = {
    // 現在のページ
    currentPage: 1,
    // ページサイズ
    pageSize: 10,
    // トータルペイン数
    totalPages: 1,
  };

  // ページング用初期設定
  c.initialPagination = {
    // ページングのボタンラベル
    header: {
      first: "先頭",
      prev: "前へ",
      next: "次へ",
      last: "最後",
    },
    // 現在のページ
    currentPage: initialPage.currentPage,
    // ページサイズ
    pageSize: initialPage.pageSize,
    // トータルペイン数
    totalPages: initialPage.totalPages,
  };

  // 資産管理テーブルのヘーダを設定
  c.assetTableList = {
    title: "資産管理テーブル",
    header: {
      asset_no: "資産番号",
      asset_type: "資産タイプ",
      managing_section: "管理部門",
      isexpired: "有効期限",
    },
    body: [],
  };

  // 画面初期表示する時、資産管理テーブル情報を取得
  if (isInitial) {
    getAssetTableList();
    isInitial = false;
  }

  // catalog item(有効期間チェック)を監視して、変更する際に、資産管理テーブル情報をチェック結果で再取得
  // 注意：function パラメータのeventを削除しないでください。
  $scope.$on("isExpired_changed", function (event, newValue) {
    // client scriptから取得されたチェック値
    isExpired_parma = newValue;

    // ページング情報を初期に戻る
    c.initialPagination.currentPage = initialPage.currentPage;
    c.initialPagination.pageSize = initialPage.pageSize;
    // 検索メソッドを行う
    getAssetTableList();
  });

  // ページングボタンのクリック操作を監視している
  // 初期状態ではない場合、ボタンをクリックしたら、現在のページ情報を更新
  if (!isInitial) {
    c.setPage = function (page) {
      if (page >= 1 && page <= c.initialPagination.totalPages) {
        c.initialPagination.currentPage = page;
      }
    };
  }

  // 現在のページ情報を監視して、変更する際に、資産管理テーブル情報をチェック結果で再取得
  $scope.$watch("c.initialPagination.currentPage", function () {
    getAssetTableList();
  });

  /**
   * 資産管理テーブル情報取得メソッド
   * action service scriptにあるメソッドを指定
   * currentPage 現在のページ情報
   * pageSize ページサイズ
   * isExpired 有効期間チェック情報
   */
  function getAssetTableList() {
    // widgetのservice scriptのメソッドを呼び出す
    c.server
      .get({
        action: "getAssetListByPagination",
        currentPage: c.initialPagination.currentPage,
        pageSize: c.initialPagination.pageSize,
        isExpired: isExpired_parma,
      })
      .then(function (response) {
        // 検索結果を処理
        var result = response.data.result;
        // テーブル用リスト情報
        c.assetTableList.body = result.list;
        // ページング用トータルペイン数
        c.initialPagination.totalPages = result.totalPages;
      });
  }
};
