ServiceNowで使用される **Client Script**、**Script Include**、**UI Script** にはそれぞれ異なる用途と特性があります。以下に各スクリプトの違いと使用例を詳しく説明します。

## 1. **Client Script**
### 特徴
- **実行場所**: クライアント側（ユーザーのブラウザ上）。
- **目的**: ユーザーインターフェースの動作を制御し、フォームやフィールドの動的な動作を実現する。
- **タイミング**: フォームのロード時、変更時、提出時などに実行。

### 用途
- フィールドの値の検証
- フィールドの表示/非表示、読み取り専用/編集可能の切り替え
- ユーザーインターフェースの動的更新（例: ドロップダウンリストのフィルタリング）

### 使用例
#### 例1: フィールドの動的表示制御

フィールドAの値に応じて、フィールドBを表示/非表示にするClient Script：

```javascript
function onChange(control, oldValue, newValue, isLoading) {
    if (isLoading || newValue === '') {
        return;
    }

    if (newValue == '特定の値') {
        g_form.showFieldMsg('field_b', 'フィールドBを表示');
    } else {
        g_form.hideFieldMsg('field_b', 'フィールドBを非表示');
    }
}
```

## 2. **Script Include**
### 特徴
- **実行場所**: サーバー側。
- **目的**: サーバー側の共通ロジックや関数を定義して、再利用可能にする。
- **呼び出し方法**: サーバーサイドのスクリプト（ビジネスルール、UIアクション、UIポリシーなど）から、またはクライアント側からAJAX経由で呼び出す。

### 用途
- サーバー側のロジックのモジュール化
- データベース操作の共通処理
- 複数のスクリプトから再利用可能な関数の定義

### 使用例
#### 例1: 単純な関数の定義

ユーザーのフルネームを取得する関数：

```javascript
var UserUtils = Class.create();
UserUtils.prototype = {
    initialize: function() {},

    getFullName: function(userSysId) {
        var userGR = new GlideRecord('sys_user');
        if (userGR.get(userSysId)) {
            return userGR.first_name + ' ' + userGR.last_name;
        }
        return '';
    },

    type: 'UserUtils'
};
```

#### 例2: クライアントからAJAX経由での呼び出し

```javascript
var ga = new GlideAjax('UserUtils');
ga.addParam('sys_id', 'userSysId');
ga.getXMLAnswer(function(response) {
    var fullName = response.responseText;
    alert('ユーザーのフルネーム: ' + fullName);
});
```

## 3. **UI Script**
### 特徴
- **実行場所**: クライアント側。
- **目的**: クライアントサイドで再利用可能なJavaScriptコードを定義。
- **呼び出し方法**: 任意のクライアントスクリプト（Client Script、UI Action、UI Pageなど）からインクルードして使用。

### 用途
- 複数のクライアントスクリプトで共通の関数やロジックを定義
- クライアントサイドのライブラリやヘルパー関数を格納

### 使用例
#### 例1: 共通ヘルパー関数の定義

```javascript
var uiHelper = {
    showAlert: function(message) {
        alert(message);
    },
    
    setFieldReadOnly: function(fieldName) {
        g_form.setReadOnly(fieldName, true);
    }
};
```

#### 例2: Client Scriptでの呼び出し

```javascript
function onLoad() {
    uiHelper.showAlert('ページがロードされました');
    uiHelper.setFieldReadOnly('field_name');
}
```

### まとめ

- **Client Script** はユーザーインターフェースの動作を制御し、動的なフォームの操作に利用されます。
- **Script Include** はサーバーサイドで共通ロジックを定義し、再利用可能な関数やプロセスを提供します。
- **UI Script** はクライアントサイドで再利用可能なスクリプトを定義し、他のクライアントスクリプトから利用します。

それぞれのスクリプトの役割を理解し、適切なシナリオで使用することで、ServiceNowの開発効率とコードの再利用性を高めることができます。