# serviceNow_API_Reference

2) Scripts-BackgroundはServer Side Scriptのコードを実行できます。   
 https://qiita.com/EconUC/items/0bf885b50757912048a7#scripts-background     
3) Scripts-Backgroundで下記ソースを実行する   
 var gr = new GlideRecordSecure('alm_asset');   
 gr.addQuery('assigned_to', gs.getUserID());   
 //Queryのsql：select*from alm_asset where assigned_to= [UserID]   
     gr.setLimit(20);   
 //Queryのsql：select*from alm_asset where assigned_to= [UserID] limit 20;   
     gr.orderByDesc("display_name")   
 "//Queryのsql：select*from alm_asset where assigned_to= [UserID] order by displayname  limit 20; "   
   gr.query();   
 while(gr.next()){   
 gs.info("資産テーブルのasset_tag: "+gr.asset_tag);   
 gs.info("資産テーブルのdisplay_name: "+gr.display_name);   
 gs.info("資産テーブルのcost: "+gr.cost);   
 }   
 32)ServiceNowでお手軽にテストデータの追加と削除を行う   
 https://qiita.com/sukkyxp/items/b09e3dcaefcebe1ab9d5   
 資産テーブルに100個データ追加して当分ログイン中ユーザの1000円以上資産の各項目を表示する   
   
4)GlideRecordの説明資料   
   https://developer.servicenow.com/dev.do#!/reference/api/sandiego/server_legacy/c_GlideRecordAPI#r_GlideRecord-GlideRecord_S
 GlideRecord | ServiceNow Developers   
 var gr = new GlideRecord('alm_asset');   
 gr.addQuery('cost','>',1000);   
 gr.addQuery('assigned_to', gs.getUserID());   
 gr.query();   
 while(gr.next()){   
 gs.info(gr.display_name);   
 gs.info(gr.assigned_to);   
 gs.info(gs.getUserDisplayName());   
 }   
    
 gs.info('自分の資産表テストデータ作成');   
 var gr = new GlideRecord('alm_asset');   
 for (var i = 0; i < 100; i++) {   
     gr.setValue('display_name', 'Apple Macbook ');   
     gr.setValue('cost', 1000);   
    gr.setValue('assigned_to',  gs.getUserID());   
     gr.insert(); // レコード追加   
 }   
5)    
 57）実践ServiceNow ー 自分が管理している資産をポータルに表示させる   
 https://qiita.com/htshozawa/items/60d28ff5cb68c19557d7   
          ①   
   　　//資産テーブルから最大10件データを取得 
    var max = 10;
    var t = data;
    data.count = 0;
    var items = data.items = [];
    //ログイン中のユーザーIDを取得する
    var user = gs.getUser().getID();
    items.record_watchers = [];
    //資産テーブル（alm_asset）
    //下記SQL文を組み立てる
    //sele