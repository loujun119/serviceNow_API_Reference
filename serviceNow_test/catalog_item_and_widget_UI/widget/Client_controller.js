api.controller = function($scope) {
    /* widget controller 
    1.Server scriptにあるメーソトを読み取り、必要な情報を取得
    2.取得情報を処理して、html(widget画面UI)に表示
  */
    // angularのコントローラ
    var c = this;
    // 初期判定フラグ, 
    // true：画面は初期起動
    var isInitial = true;

    var isExpired_parma = '';

    var initialPage = {
        // 現在のページ
        currentPage: 1,
        // ページサイズ
        pageSize: 10,
        // トータルペイン数
        totalPages: 1,
    }

    // ページング用初期設定
    c.initialPagination = {
        header: {
            first: '先頭',
            prev: '前へ',
            next: '次へ',
            last: '最後',
        },
        // 現在のページ
        currentPage: initialPage.currentPage,
        // ページサイズ
        pageSize: initialPage.pageSize,
        // トータルペイン数
        totalPages: initialPage.totalPages,
    }

    // 資産管理テーブルのヘーダを設定
    c.assetTableList = {
        header: {
            asset_no: '資産番号',
            asset_type: '資産タイプ',
            managing_section: '管理部門',
            isexpired: '有効期限'
        },
        body: []
    };

    // 监听'asset_no_changed'事件
    $rootScope.$on('isExpired_changed', function(newValue) {
        isInitial = false;
        isExpired_parma = newValue
        getAssetTableList(initialPage.currentPage, initialPage.pageSize);
    });

    c.setPage = function (page) {
			alert('new pageNumber:' + page);
			alert('totalPages:' + c.initialPagination.totalPages);
        if (page >= 1 && page <= c.initialPagination.totalPages) {
            c.initialPagination.currentPage = page;
        }
    };

    // 用于更新 $scope 以便于 AngularJS 触发数据绑定
    $scope.$watch('c.initialPagination.currentPage', function () {
		alert('new pageNumber watch!!!!!!!!!!!!!!!');
        getAssetTableList(c.initialPagination.currentPage, c.initialPagination.pageSize);
    });

    function getAssetTableList(currentPage, pageSize) {
        c.server.get({
            action: 'getAssetListByPagenation',
            currentPage: currentPage,
            pageSize: pageSize,
            isExpired: isExpired_parma,
        }).then(function(response) {
            console.log('response.data' + JSON.stringify(response.data))
            var result = response.data.result;
            c.assetTableList.body = result.list;
            c.initialPagination.totalPages = result.totalPages;
        });
    }
};