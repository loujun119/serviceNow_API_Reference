// 2) Scripts-BackgroundはServer Side Scriptのコードを実行できます。
// https://qiita.com/EconUC/items/0bf885b50757912048a7#scripts-background
// 3) Scripts-Backgroundで下記ソースを実行する
 var gr = new GlideRecordSecure("alm_asset");
 gr.addQuery('assigned_to', gs.getUserID());
 // Queryのsql：select*from alm_asset where assigned_to= [UserID]
 gr.setLimit(20);
 // Queryのsql：select*from alm_asset where assigned_to= [UserID] limit 20;
 gr.orderByDesc("display_name");
 // Queryのsql:select*from alm_asset where assigned_to= [UserID] order by displayname  limit 20;
 gr.query();
 while(gr.next()){
 gs.info("資産テーブルのasset_tag: "+gr.asset_tag);
 gs.info("資産テーブルのdisplay_name: "+gr.display_name);
 gs.info("資産テーブルのcost: "+gr.cost);
 }
// 32)ServiceNowでお手軽にテストデータの追加と削除を行う
// https://qiita.com/sukkyxp/items/b09e3dcaefcebe1ab9d5
// 資産テーブルに100個データ追加して当分ログイン中ユーザの1000円以上資産の各項目を表示する

//4)GlideRecordの説明資料
// https://developer.servicenow.com/dev.do#!/reference/api/sandiego/server_legacy/c_GlideRecordAPI#r_GlideRecord-GlideRecord_S
// GlideRecord | ServiceNow Developers
 var gr = new GlideRecord('alm_asset')
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
// 5)
// 57）実践ServiceNow ー 自分が管理している資産をポータルに表示させる
// https://qiita.com/htshozawa/items/60d28ff5cb68c19557d7
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




   function onChange(control, oldValue, newValue, isLoading, isTemplate) {
      if (isLoading || newValue === '') {
         return;
      }

      try {
         // var newProName = g_form.getValue('pro_name');
         var newProName = newValue;
         var newAutoProNumber = '';
         var autoNumberList = [];
         var proNumberList = new GlideRecord("x_720653_loujun_sn_production_number");
         proNumberList.addQuery('pro_name', newProName);
         proNumberList.orderByDesc("pro_number");
         proNumberList.query(recResponse);
         alert(proNumberList);

         if (!proNumberList.hasNext()) {
            newAutoProNumber = newProName + ' - 00000001';
            g_form.setValue('auto_number', newAutoProNumber);
         } else {
            while(proNumberList.next()){
               autoNumberList.push(proNumberList.pro_number);
            }
            var lastNumber = autoNumberList[autoNumberList.length - 1];
            var autoNumber = Number(lastNumber) + 1;
            newAutoProNumber = newProName + autoNumber.toString();
            g_form.setValue('auto_number', newAutoProNumber);
         }
         proNumberList.setValue('auto_number', autoNumber.toString());
         proNumberList.setValue('pro_number', newProName);
         proNumberList.insert(); // レコード追加
      } catch (error) {
         alert(error);
      }
   }


   var getMaxAutoNumber = Class.create();
getMaxAutoNumber.prototype = Object.extendsObject(global.AbstractAjaxProcessor, {
	
    getMaxNumber: function() {
        var proName = this.getParameter('pro_name');
		global.AbstractAjaxProcessor.get;
        var autoNumberList = [];
        var proNumberList = new GlideRecord("x_720653_loujun_sn_production_number");
        proNumberList.addQuery('pro_name', proName);
        proNumberList.orderBy("pro_number");
        proNumberList.query();

        if (!proNumberList.next()) {
            return '00001';
        } else {
            while (proNumberList.next()) {
                autoNumberList.push(proNumberList.pro_number);
            }
            var lastNumber = autoNumberList[autoNumberList.length - 1];//0000007
            var autoNumber = Number(lastNumber) + 1;//7 + 1 = 8
            autoNumber.toString();// 128:
            var strNum = '00000';
            strNum.substring(0, strNum.length - autoNumber.length);
            return strNum + autoNumber;// 00128
        }
    },

    type: 'getMaxAutoNumber'
});
var SAS_PRODUCT_NAME = 'NEC-SAS';


function onSubmit() {
   //Type appropriate comment here, and begin script below
	var proName = g_form.getValue('product');

	var proNameCode = g_form.getValue('auto_number'); // SAS-NE00005
	var proNumber = proNameCode.substring(proNameCode.length - 5, proNameCode.length);

   	// ajax
	var maxNumberAjax = new GlideAjax('insert_to_autoNumber_table');
   maxNumberAjax.addParam('sysparm_name', 'insertAutoNumber');
   maxNumberAjax.addParam('pro_name', proName);
   maxNumberAjax.addParam('pro_number', proNumber);
   maxNumberAjax.getXML(callBackFunction);
  
   function callBackFunction(response){
     var answer = response.responseXML.documentElement.getAttribute('answer');
     return answer === 'OK' ? true : false;
   }
}

var insert_to_autoNumber_table = Class.create();
insert_to_autoNumber_table.prototype = Object.extendsObject(global.AbstractAjaxProcessor, {

   insertAutoNumber: function() {
      try {
         var proName = this.getParameter('pro_name');
         var proNumber = this.getParameter('pro_number');
  
         var autoNumberTable = new GlideRecord("x_720653_loujun_sn_production_number");
         autoNumberTable.setValue('pro_name', proName);
         autoNumberTable.setValue('pro_number', proNumber);
         alert('製品名:' + proName);
         alert('番号:' + proNumber);
         autoNumberTable.insert(); //
         
         return 'OK';
      } catch (error) {
         gs.log('自動番号管理表に追加が失敗しました。');
         return 'False';
      }
   },

    type: 'insert_to_autoNumber_table'
});