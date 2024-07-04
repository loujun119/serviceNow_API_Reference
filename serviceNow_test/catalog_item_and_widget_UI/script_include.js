var GetAssetList = Class.create();
GetAssetList.prototype = Object.extendsObject(global.AbstractAjaxProcessor, {

    getList: function () {
        // 製品のsys_id取得
        // var itemName = this.getParameter('itemName');
        // var itemValue = this.getParameter('itemValue');

        var assetList = new GlideRecord("u_asset_number_management_table");

        // if (itemValue && itemValue !== '') {
        //     assetList.addQuery(itemName, itemValue);
        // }
        // assetList.addQuery('u_asset_no');
        assetList.orderBy('u_asset_no');
        assetList.query();

        var result = {};

        var resultList = [];

        if (assetList.hasNext()) {

            while (assetList.next()) {
                resultList.push({
                    u_asset_no: assetList.getValue('u_asset_no'),
                    u_asset_type: assetList.getValue('u_asset_type'),
                    u_managing_section: assetList.getValue('u_managing_section'),
                    u_isexpired: assetList.getValue('u_isexpired'),
                });
            }

            result = {
                'assetList': resultList,
            };
            return JSON.stringify(result);

        } else {
            result = {
                'assetList': null,
            };
            return JSON.stringify(result);

        }
    },

    getNumberList: function () {
        var assetList = new GlideRecord("u_asset_number_management_table");
        assetList.orderBy('u_asset_no');
        assetList.query();
        var result = {};

        var numberList = [];

        if (assetList.hasNext()) {

            while (assetList.next()) {
                numberList.push(assetList.getValue('u_asset_no'));
            }

            result = {
                'numberList': numberList,
            };
            return JSON.stringify(result);

        } else {
            result = {
                'numberList': null,
            };
            return JSON.stringify(result);

        }
    },

    getAssetInfo: function () {
        var assetNo = this.getParameter('asset_no');
        var assetList = new GlideRecord("u_asset_number_management_table");
        assetList.addQuery('u_asset_no', assetNo);
        assetList.orderBy('u_asset_no');
        assetList.query();

        while (assetList.next()) {
            var result = {
                'asset_type': assetList.getValue('u_asset_type'),
                'managing_section': assetList.getValue('u_managing_section'),
                'isexpired': assetList.getValue('u_isexpired')
            };
            return JSON.stringify(result);
        }




    },

    type: 'GetAssetList'
});