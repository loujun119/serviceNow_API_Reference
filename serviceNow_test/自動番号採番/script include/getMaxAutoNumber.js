var getMaxAutoNumber = Class.create();
getMaxAutoNumber.prototype = Object.extendsObject(global.AbstractAjaxProcessor, {

    getMaxNumber: function() {
        // 製品のsys_id取得
        var sysId = this.getParameter('pro_sys_id');
        var autoNumberList = [];
        // idで製品情報表から関連情報を取得
        var productData = new GlideRecord("x_720653_loujun_sn_product_name");
        productData.addQuery('sys_id', sysId);
        productData.query();
		productData.next();
        // 製品名
		var proName = productData.getValue('pro_name');
        // 製品コード
		var proNameCode = productData.getValue('pro_name_code');
        // 製品コード長さ
		var proNumberLength = productData.getValue('pro_number_length');

        if (proNameCode && proNumberLength) {
            var proNumberList = new GlideRecord("x_720653_loujun_sn_production_number");
            proNumberList.addQuery('pro_name', proName);
            proNumberList.orderBy("pro_number");
            proNumberList.query();

            if (!proNumberList.hasNext()) {
                var result_first = {
                    'autoNumberAndNameCode': proNameCode + (proNumberLength === '5' ? '00001' : '0001'),
                };
                return JSON.stringify(result_first);
            } else {
                while (proNumberList.next()) {
                    autoNumberList.push(proNumberList.getValue('pro_number'));
                }
                var lastNumber = autoNumberList[autoNumberList.length - 1]; //0000007
                var autoNumber = Number(lastNumber) + 1;
                autoNumber = autoNumber.toString(); // 128
                var strNum = proNumberLength === '5' ? '00000' : '0000';
                strNum = strNum.substr(0, strNum.length - autoNumber.length);
                strNum = strNum + autoNumber;
                var result_set = {
                    "autoNumberAndNameCode": proNameCode + strNum,
                };
                return JSON.stringify(result_set);
            }
        } else {
            var result_null = {
                'autoNumberAndNameCode': 'NotFound',
            };
            return JSON.stringify(result_null);
        }
    },

    type: 'getMaxAutoNumber'
});