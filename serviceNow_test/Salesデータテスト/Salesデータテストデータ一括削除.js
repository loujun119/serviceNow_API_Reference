gs.info('Salesデータテストデータ一括削除');

var gr = new GlideRecord('u_sales');
gr.addQuery('u_customername', 'TESTCUSTOMER'); // customernameで対象データを絞り込む
gr.addQuery('u_product', 'TESTPRODUCT'); // product
gr.query();

var targetCount = gr.getRowCount(); // 対象件数をあらかじめ取得しておく

gr.deleteMultiple(); // 一括削除実行

gs.info(targetCount + '件削除しました。');