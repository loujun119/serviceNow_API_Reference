(function() {
    function getAssetListByPagenation(pageSize, currentPage, isExpired) {
        // 获取传入的分页信息
        var limit = pageSize || 10;
        var pageNumber = currentPage || 1; // 当前页码
        var offset = (pageNumber - 1) * limit; // 计算偏移量

        var assetList = new GlideRecord('u_asset_number_management_table');
        if (isExpired && isExpired !== '') {
            assetList.addQuery('u_isexpired', isExpired);
        }
        assetList.orderBy('u_asset_no');
        assetList.query();

        var totalPages = Math.ceil(assetList.getRowCount() / limit);

        var resultList = [];
        var count = 0;

        while (assetList.next()) {
            // 跳过前面的记录
            if (count++ < offset) continue;

            // 达到分页数量后停止
            if (resultList.length >= limit) break;

            resultList.push({
                asset_no: assetList.getValue('u_asset_no'),
                asset_type: assetList.getValue('u_asset_type'),
                managing_section: assetList.getValue('u_managing_section'),
                isexpired: assetList.getValue('u_isexpired') === '0' ? '有効期限内' : '有効期限切れ'
            });
        }

        return {
            list: resultList,
            totalPages: totalPages,
        };
        // return resultList;
    }


    if (input && input.action === 'getAssetListByPagenation') {
        var pageSize = input.pageSize;
        var currentPage = input.currentPage;
        var isExpired = input.isExpired;
        data.result = getAssetListByPagenation(pageSize, currentPage, isExpired);
    }
})();