gs.info('Salesデータテストデータ作成');

var gr = new GlideRecord('u_sales');

var salesDate = new GlideDateTime();
salesDate.setValue('2017-01-01');

for(var i = 0; i < 100; i++) {
    salesDate.addDaysUTC(1); // 売上日を1日ずつ加算して行く

    gr.initialize(); // レコード初期化

    // テストレコード設定
    gr.setValue('u_customername', 'TESTCUSTOMER');
    gr.setValue('u_saledate', salesDate);
    gr.setValue('u_product', 'TESTPRODUCT');
    gr.setValue('u_unitprice', 50);
    gr.setValue('u_quantity', 4);
    gr.setValue('u_price', 200);

    gr.insert();     // レコード追加

}
