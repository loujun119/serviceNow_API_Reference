ServiceNowの**Service Portal（SP）**でウィジェットを作成するには、**sp-widget**の構造と機能を理解し、具体的な手順に従って開発を進める必要があります。ウィジェットは、Service Portal上で再利用可能なコンポーネントとして機能し、カスタムのUI要素やデータ表示、操作を提供します。以下は、`sp-widget`の作成手順および基本構造についての説明です。

---

## **1. sp-widgetの基本構造**

**sp-widget**は4つの主要コンポーネントで構成されています：

1. **HTML Template**: ウィジェットのHTMLテンプレート（UIのレイアウト）。
2. **Client Script**: クライアントサイドのロジック（AngularJSを使用）。
3. **Server Script**: サーバーサイドのロジック（ServiceNowのGlide APIを使用）。
4. **CSS**: ウィジェットのスタイル。

## **2. sp-widgetの作成手順**

### **A. 新しいウィジェットの作成**

1. **ServiceNowインスタンスにログイン**し、**ナビゲータ**で「**Service Portal > ウィジェット**」を検索し、選択します。
2. **「新規」**をクリックして、新しいウィジェットを作成します。
3. 以下の基本情報を入力します：
   - **名前**: ウィジェットの名前を入力（例: `サンプルウィジェット`）。
   - **ID**: 自動生成された一意の識別子を確認（必要に応じてカスタムIDを設定）。

4. **「保存」**をクリックします。

### **B. HTML Templateの編集**

1. **「HTML Template」**タブに移動します。
2. 必要なHTML構造を記述します。AngularJSのバインディングを使用して動的なデータを表示します。

#### 例: シンプルなリスト
```html
<div class="my-widget">
    <h2>{{ c.data.title }}</h2>
    <ul>
        <li ng-repeat="item in c.data.items">{{ item }}</li>
    </ul>
</div>
```

### **C. Client Scriptの編集**

1. **「Client Script」**タブに移動します。
2. クライアントサイドのロジックを記述します。`c`をコントローラとして使用し、`c.data`にデータを設定します。

#### 例: リストデータの設定
```javascript
(function() {
    var c = this;
    c.data = {
        title: 'ウィジェットのタイトル',
        items: ['アイテム1', 'アイテム2', 'アイテム3']
    };
})();
```

### **D. Server Scriptの編集**

1. **「Server Script」**タブに移動します。
2. サーバーサイドのロジックを記述します。`data`オブジェクトに設定した値はクライアントスクリプトに渡されます。

#### 例: データのフェッチ
```javascript
(function() {
    // デモデータの設定
    data.title = 'サーバーからのタイトル';
    data.items = ['サーバーアイテム1', 'サーバーアイテム2', 'サーバーアイテム3'];
})();
```

### **E. CSSの編集**

1. **「CSS」**タブに移動します。
2. ウィジェットのスタイルをカスタマイズします。

#### 例: シンプルなスタイル
```css
.my-widget {
    border: 1px solid #ccc;
    padding: 10px;
    background-color: #f9f9f9;
}
```

## **3. ウィジェットのプレビューとテスト**

### **A. ウィジェットのプレビュー**

1. **ウィジェットレコードの「プレビュー」**ボタンをクリックして、ウィジェットの表示を確認します。

### **B. ウィジェットのページでの使用**

1. **ナビゲータ**で「**Service Portal > ページ**」を検索し、選択。
2. 既存のページを編集するか、新しいページを作成します。
3. **「ページレイアウト」**に移動し、ウィジェットをページにドラッグアンドドロップします。
4. ウィジェットの設定で作成したウィジェットを選択します。
5. **「保存」**をクリックしてページを保存します。

### **C. ページの確認**

1. **Service Portalのページ**にアクセスし、ウィジェットが正しく表示され、期待通りに動作することを確認します。

## **4. ウィジェットオプションの設定**

ウィジェットにオプションを追加することで、動的なパラメータ設定や柔軟なウィジェットの再利用が可能になります。

### **A. オプションの追加**

1. **ウィジェットレコードの「オプション」**タブに移動します。
2. **「新規」**をクリックして、ウィジェットオプションを追加します。

#### 例
- **名前**: `backgroundColor`
- **デフォルト値**: `#ffffff`

### **B. オプションの使用**

ウィジェットのClient ScriptやHTMLテンプレートでオプションを使用します。

#### Client Scriptの例
```javascript
(function() {
    var c = this;
    c.data = {
        title: 'ウィジェットのタイトル',
        items: ['アイテム1', 'アイテム2', 'アイテム3'],
        backgroundColor: c.options.backgroundColor || '#f9f9f9'
    };
})();
```

#### HTML Templateの例
```html
<div class="my-widget" style="background-color: {{ c.data.backgroundColor }}">
    <h2>{{ c.data.title }}</h2>
    <ul>
        <li ng-repeat="item in c.data.items">{{ item }}</li>
    </ul>
</div>
```

## **5. 高度なウィジェットの開発**

### **A. AngularJSディレクティブの使用**

AngularJSのディレクティブを活用して、複雑なUIコンポーネントや動的なデータバインディングを実装します。

#### 例: ng-repeatを使用
```html
<ul>
    <li ng-repeat="item in c.data.items">{{ item }}</li>
</ul>
```

### **B. REST APIとの統合**

ウィジェットからREST APIを呼び出してデータを取得したり、更新することができます。

#### Server Scriptの例
```javascript
(function() {
    var request = new sn_ws.RESTMessageV2('Example API', 'GET');
    var response = request.execute();
    data.apiResponse = response.getBody();
})();
```

#### Client Scriptの例
```javascript
(function() {
    var c = this;
    c.data.apiResponse = JSON.parse(c.data.apiResponse);
})();
```

### **C. デバッグとログ**

#### クライアントログ
```javascript
console.log(c.data);
```

#### サーバーログ
```javascript
gs.info('Server data: ' + JSON.stringify(data));
```

## **6. 例: カスタムデータテーブルウィジェット**

### **A. HTML Template**
```html
<div class="table-responsive">
    <table class="table table-striped">
        <thead>
            <tr>
                <th>名前</th>
                <th>年齢</th>
                <th>住所</th>
            </tr>
        </thead>
        <tbody>
            <tr ng-repeat="person in c.data.people">
                <td>{{ person.name }}</td>
                <td>{{ person.age }}</td>
                <td>{{ person.address }}</td>
            </tr>
        </tbody>
    </table>
</div>
```

### **B. Client Script**
```javascript
(function() {
    var c = this;
    c.data.people = [
        { name: '山田 太郎', age: 30, address: '東京都' },
        { name: '佐藤 花子', age: 25, address: '大阪府' },
        { name: '鈴木 次郎', age: 35, address: '愛知県' }
    ];
})();
```

### **C. CSS**
```css
.table-responsive {
    margin: 20px 0;
}
.table {
    width: 100%;
    max-width: 100%;
    margin-bottom: 1rem;
    background-color: transparent;
}
.table th, .table td {
    padding: 0.75rem;
    vertical-align: top;
    border-top: 1px solid #dee2e6;
}
```

### **D. Server Script**
```javascript
(function() {
    data.people = [
        { name: '山田 太郎', age: 30, address: '東京都' },
        {

 name: '佐藤 花子', age: 25, address: '大阪府' },
        { name: '鈴木 次郎', age: 35, address: '愛知県' }
    ];
})();
```

## **まとめ**

Service Portalのウィジェットは、ServiceNow上でインタラクティブなUIコンポーネントを作成するための強力なツールです。ウィジェットの基本構造を理解し、具体的な手順に従って開発を行うことで、ユーザーにとって使いやすいポータルを構築できます。各コンポーネントを適切に設定し、ニーズに応じてカスタマイズしてください。

---

### 参考リンク

- [ServiceNow Service Portal Widget Documentation](https://docs.servicenow.com/bundle/utah-servicenow-application-development/page/build/service-portal/task/t-CreateServicePortalWidget.html)
- [ServiceNow Developer Program](https://developer.servicenow.com/)

このガイドに基づいてウィジェットを作成し、Service Portalでのカスタム機能を提供してください。