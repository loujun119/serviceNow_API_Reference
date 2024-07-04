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


在 ServiceNow 中，您可以通过创建和使用自定义 Widget 来从数据库中获取数据并将其显示在 Widget 的 HTML 中。以下是一个完整的步骤指南，帮助您实现这一目标：

### 1. 创建新 Widget

1. **导航到 Widget 配置**：
   - 在 ServiceNow 实例中，搜索 "Widgets" 或 "Service Portal Widgets"。
   - 点击 "Service Portal Widgets"。

2. **创建新 Widget**：
   - 点击 "New" 按钮创建一个新的 Widget。
   - 填写 `Name` 和 `ID`。例如，`Name` 为 `My Custom Widget`，`ID` 为 `my_custom_widget`。

### 2. 编写 Widget Client Controller 脚本

Client Controller 用于处理数据逻辑并传递给视图。以下是一个示例脚本：

```javascript
(function() {
  var c = this;

  // Call the server-side script
  c.dataLoaded = false;
  c.server.get({
    action: 'getData'
  }).then(function(response) {
    c.data = response.data;
    c.dataLoaded = true;
  });
})();
```

### 3. 编写 Widget Server Script

Server Script 用于从数据库中提取数据，并将其返回给 Client Controller。以下是一个示例脚本：

```javascript
(function() {
  // Function to fetch data
  function getData() {
    var gr = new GlideRecord('table_name'); // 使用实际表名
    gr.query();
    var data = [];
    while (gr.next()) {
      data.push({
        sys_id: gr.getValue('sys_id'),
        name: gr.getValue('name_field') // 使用实际字段
      });
    }
    return data;
  }

  // Handling actions from client
  if (input && input.action === 'getData') {
    data.data = getData();
  }
})();
```

### 4. 编写 Widget HTML

Widget HTML 用于显示数据。以下是一个示例 HTML：

```html
<div ng-if="c.dataLoaded">
  <ul>
    <li ng-repeat="item in c.data">
      {{item.name}}
    </li>
  </ul>
</div>
<div ng-if="!c.dataLoaded">
  Loading...
</div>
```

### 5. 编写 Widget CSS（可选）

如果需要样式化您的 Widget，可以在 CSS 部分中添加自定义样式。例如：

```css
ul {
  list-style-type: none;
}

li {
  padding: 5px 0;
}
```

### 6. 添加 Widget 到页面

1. **导航到 Page Designer**：
   - 搜索 "Pages" 或 "Service Portal Pages"。
   - 选择您希望添加 Widget 的页面，或创建一个新的页面。

2. **添加 Widget**：
   - 使用 Page Designer 工具，将您的 Widget 拖放到页面中的适当位置。

### 示例：在 Widget 中显示用户列表

假设我们想显示用户表（`sys_user`）中的用户列表：

#### Server Script

```javascript
(function() {
  function getUsers() {
    var gr = new GlideRecord('sys_user');
    gr.query();
    var users = [];
    while (gr.next()) {
      users.push({
        sys_id: gr.getValue('sys_id'),
        name: gr.getValue('name')
      });
    }
    return users;
  }

  if (input && input.action === 'getUsers') {
    data.users = getUsers();
  }
})();
```

#### Client Controller

```javascript
(function() {
  var c = this;
  c.dataLoaded = false;

  c.server.get({
    action: 'getUsers'
  }).then(function(response) {
    c.users = response.users;
    c.dataLoaded = true;
  });
})();
```

#### HTML

```html
<div ng-if="c.dataLoaded">
  <ul>
    <li ng-repeat="user in c.users">
      {{user.name}}
    </li>
  </ul>
</div>
<div ng-if="!c.dataLoaded">
  Loading users...
</div>
```

### 提示

- **调试**：使用浏览器的开发者工具（如 Chrome DevTools）调试 JavaScript，并查看网络请求。
- **性能**：如果数据量大，考虑分页或使用异步数据加载策略。

这个示例应该可以帮助您在 ServiceNow 的 Widget 中成功显示数据库数据。如果您有特定的需求或遇到问题，请提供更多详细信息。

在 ServiceNow 的 Service Portal 中，`controllerAs` 语法用于给 AngularJS 控制器实例一个别名，以便在 HTML 模板中更清晰地引用和使用它的属性和方法。理解 `controllerAs` 语法可以帮助您在编写和组织代码时提高可读性和可维护性。

### `controllerAs` 的定义和用法

`controllerAs` 是一种 AngularJS 语法，用于将控制器实例分配给一个指定的别名（通常用 `this`）。在 ServiceNow 的 Service Portal Widgets 中，`controllerAs` 允许您在 HTML 中更直观地引用控制器的属性和方法，而无需直接使用 `$scope`。

#### 用法示例

1. **创建 Widget**：

   我们假设您创建了一个 Widget，并命名为 `My Example Widget`，ID 为 `my_example_widget`。

2. **Client Controller**：

   编写 Widget 的 Client Controller 脚本：

   ```javascript
   (function() {
     var c = this; // 'c' 是 controllerAs 别名
     c.title = "Hello, ServiceNow!";
     c.getData = function() {
       return "Data from Controller";
     };
   })();
   ```

3. **Widget HTML**：

   在 HTML 中，您可以通过 `c` 访问 Client Controller 的属性和方法：

   ```html
   <div>
     <h1>{{c.title}}</h1>
     <p>{{c.getData()}}</p>
   </div>
   ```

   这里 `{{c.title}}` 和 `{{c.getData()}}` 使用 `controllerAs` 别名 `c` 来访问控制器的数据和方法。

### 使用 `controllerAs` 的优势

1. **避免作用域冲突**：使用 `controllerAs` 可以避免 `$scope` 的作用域冲突问题，特别是在复杂的视图中。

2. **提高可读性**：在 HTML 中通过别名引用控制器的属性和方法，使代码更直观，更易于理解。

3. **提升代码结构**：鼓励使用控制器实例的 `this`，而不是直接使用 `$scope`，这更符合面向对象的编程风格。

### `controllerAs` 的详细示例

以下是一个更复杂的例子，展示如何在 Widget 中使用 `controllerAs`：

#### 1. Server Script

```javascript
(function() {
  function getIncidents() {
    var gr = new GlideRecord('incident');
    gr.query();
    var incidents = [];
    while (gr.next()) {
      incidents.push({
        sys_id: gr.getValue('sys_id'),
        number: gr.getValue('number'),
        short_description: gr.getValue('short_description')
      });
    }
    return incidents;
  }

  if (input && input.action === 'getIncidents') {
    data.incidents = getIncidents();
  }
})();
```

#### 2. Client Controller

```javascript
(function() {
  var c = this;
  c.dataLoaded = false;

  c.server.get({
    action: 'getIncidents'
  }).then(function(response) {
    c.incidents = response.incidents;
    c.dataLoaded = true;
  });
})();
```

#### 3. Widget HTML

```html
<div ng-if="c.dataLoaded">
  <ul>
    <li ng-repeat="incident in c.incidents">
      <strong>{{incident.number}}</strong>: {{incident.short_description}}
    </li>
  </ul>
</div>
<div ng-if="!c.dataLoaded">
  Loading incidents...
</div>
```

在这个示例中：

- **`controllerAs` 别名**：使用 `c` 作为 Client Controller 的别名。
- **数据绑定**：通过 `c.incidents` 访问 Server Script 中返回的事件数据。

### `controllerAs` 和 `scope` 的对比

| 特性                      | `controllerAs`        | `$scope`                   |
|---------------------------|-----------------------|----------------------------|
| 访问控制器属性和方法        | 使用控制器别名 (`this`) | 直接在 `$scope` 上定义      |
| 作用域冲突                | 不易发生              | 可能发生                   |
| 面向对象支持              | 更容易支持            | 需要更多手动管理           |
| 模板中的引用              | `controllerAs.alias`  | `$scope.property`          |

### 如何选择别名

`controllerAs` 别名是任意的，通常选择简短易记的单词，例如：

- `c` 或 `ctrl`：用于简短的引用。
- `vm`：常用于表示 "ViewModel"（视图模型）。

### 总结

- `controllerAs` 是一种简洁的方式，将控制器实例别名化，以便在 HTML 模板中访问控制器的属性和方法。
- 它提高了代码的可读性，避免了 `$scope` 作用域冲突，使代码更加模块化和可维护。

如果您有特定的需求或进一步的疑问，请提供更多详细信息，我可以更有针对性地帮助您。


在 ServiceNow 的 Service Portal Widget 中，`link` 函数用于提供 Widget 的链接信息。这个函数的主要作用是将页面导航或 URL 传递给前端组件，通常用于在点击 Widget 中的链接或按钮时导航到其他页面或资源。

`link` 函数通常在 Widget 的 Client Controller 中定义，并在 Widget 的 HTML 中调用，以动态生成 URL 或页面链接。

### `link` 方法的基本用法

`link` 函数可以返回一个 URL 字符串，或者返回一个对象，包含导航所需的信息。例如，它可以用于生成指向 ServiceNow 表单或页面的链接。

#### 1. 创建 Widget 的基础设置

- **Widget Client Controller**：

```javascript
(function() {
  var c = this;

  // 示例数据
  c.itemId = '12345'; // 示例sys_id
  c.tableName = 'incident'; // 示例表名

  // 示例 link 方法
  c.link = function() {
    return {
      // 根据 sys_id 生成 ServiceNow 表单的 URL
      url: '/nav_to.do?uri=' + c.tableName + '.do?sys_id=' + c.itemId
    };
  };
})();
```

- **Widget HTML**：

```html
<div>
  <a ng-href="{{c.link().url}}" target="_blank">Open Incident</a>
</div>
```

在这个示例中，`link` 函数返回一个包含 URL 的对象，`ng-href` 指令用于绑定这个 URL 到 HTML 链接标签。点击链接会在新标签页中打开指定的 ServiceNow 表单。

### `link` 方法的详细用法

以下是如何在不同场景中使用 `link` 方法的示例：

#### 1. 动态生成表单链接

您可能希望动态生成指向 ServiceNow 表单的链接，具体表单由某个 ID（如 `sys_id`）决定：

- **Client Controller**：

```javascript
(function() {
  var c = this;

  c.linkToForm = function(tableName, sysId) {
    return '/nav_to.do?uri=' + tableName + '.do?sys_id=' + sysId;
  };
})();
```

- **HTML**：

```html
<div>
  <a ng-href="{{c.linkToForm('incident', '12345')}}">Open Incident</a>
</div>
```

#### 2. 动态生成 Service Portal 页面链接

如果需要导航到 Service Portal 的特定页面，可以使用 `spUtil.getURL`：

- **Client Controller**：

```javascript
(function() {
  var c = this;

  c.linkToPage = function(pageId) {
    return spUtil.getURL(pageId);
  };
})();
```

- **HTML**：

```html
<div>
  <a ng-href="{{c.linkToPage('incident_page')}}">Go to Incident Page</a>
</div>
```

#### 3. 基于条件生成链接

在某些情况下，您可能需要根据特定条件生成不同的链接：

- **Client Controller**：

```javascript
(function() {
  var c = this;

  c.link = function() {
    if (c.condition) {
      return '/nav_to.do?uri=incident.do';
    } else {
      return '/nav_to.do?uri=task.do';
    }
  };
})();
```

- **HTML**：

```html
<div>
  <a ng-href="{{c.link()}}">Navigate</a>
</div>
```

#### 4. 使用 `link` 返回完整对象

如果需要返回更多信息，比如标题或图标，可以返回一个对象：

- **Client Controller**：

```javascript
(function() {
  var c = this;

  c.link = function() {
    return {
      url: '/nav_to.do?uri=incident.do',
      title: 'View Incident',
      icon: 'fa fa-incident'
    };
  };
})();
```

- **HTML**：

```html
<div>
  <a ng-href="{{c.link().url}}" title="{{c.link().title}}">
    <i class="{{c.link().icon}}"></i> {{c.link().title}}
  </a>
</div>
```

#### 综合示例：基于数据生成多个链接

假设您有一组数据，并希望根据这些数据生成多个链接：

- **Client Controller**：

```javascript
(function() {
  var c = this;

  c.items = [
    { id: '12345', table: 'incident', label: 'Incident 12345' },
    { id: '67890', table: 'change_request', label: 'Change 67890' }
  ];

  c.getLink = function(item) {
    return '/nav_to.do?uri=' + item.table + '.do?sys_id=' + item.id;
  };
})();
```

- **HTML**：

```html
<div>
  <ul>
    <li ng-repeat="item in c.items">
      <a ng-href="{{c.getLink(item)}}">{{item.label}}</a>
    </li>
  </ul>
</div>
```

在这个示例中，`c.getLink` 方法根据每个项目的数据生成相应的链接。

### 总结

- **`link` 方法**：用于生成导航链接或 URL。
- **返回值**：可以是字符串形式的 URL，也可以是包含更多信息的对象。
- **结合 HTML**：使用 AngularJS 指令（如 `ng-href`）将链接绑定到 HTML 元素。

理解 `link` 方法并灵活应用它可以使您的 Widget 更加动态和交互，提升用户体验。如果有特定的用例或疑问，请告诉我，我可以提供更详细的帮助。


要在ServiceNow中实现当`catalog item`中的`"asset_no"`发生变化时，自动更新`widget`中的表格内容，你可以按照以下步骤操作：

1. **Catalog Client Script**: 创建一个Client Script监听`catalog item`的变化。
2. **Server-Side Script**: 在Server Script中添加一个API来获取最新的资产数据。
3. **Widget Controller**: 更新Widget Controller以调用Server Script，并刷新表格。

以下是每个步骤的详细实现方式：

### 1. 创建Catalog Client Script

在`Service Catalog`中为`"asset_no"`创建一个Client Script，监听值的变化并调用`widget`的刷新功能。

**步骤**:
- 导航到 **Service Catalog > Catalog Definitions > Maintain Items**，找到相关的Catalog Item。
- 在 **Catalog Item** 中，转到 **Catalog Client Scripts** 选项卡。
- 创建一个新的`Catalog Client Script`。

**Script**:
```javascript
function onChange(control, oldValue, newValue, isLoading) {
    if (isLoading || newValue === '') {
        return;
    }

    // 调用函数更新Widget
    g_form.getGlideUIActions().getAction('update_widget').submit();
}
```

### 2. Server-Side Script - 添加API获取最新数据

创建一个新的Server Script，添加一个API来根据`asset_no`获取最新的资产数据。

**步骤**:
- 导航到 **System Definition > Script Includes**，创建一个新的Script Include。

**Script Include**:
```javascript
var AssetData = Class.create();
AssetData.prototype = Object.extendsObject(AbstractAjaxProcessor, {
    getAssetListByNo: function(assetNo) {
        var assetList = new GlideRecord('u_asset_number_management_table');
        assetList.addQuery('u_asset_no', assetNo);
        assetList.query();
        var resultList = [];
        while (assetList.next()) {
            resultList.push({
                u_asset_no: assetList.getValue('u_asset_no'),
                u_asset_type: assetList.getValue('u_asset_type'),
                u_managing_section: assetList.getValue('u_managing_section'),
                u_isexpired: assetList.getValue('u_isexpired')
            });
        }
        return new JSON().encode(resultList);
    }
});
```

- 确保勾选`Client Callable`。

### 3. 更新Widget Controller

在Widget Controller中监听事件并调用Server Script来获取最新数据。

**Widget Controller**:
```javascript
api.controller = function($scope, $http) {
    var c = this;

    c.assetTableList = {
        header: {
            asset_no: 'Asset No',
            asset_type: 'Asset Type',
            managing_section: 'Managing Section',
            isexpired: 'Is Expired'
        },
        body: []
    };

    // 监听事件
    $scope.$on('asset_no_changed', function(event, asset_no) {
        refreshTableData(asset_no);
    });

    function refreshTableData(asset_no) {
        $http.get('/api/now/table/u_asset_number_management_table', {
            params: {
                asset_no: asset_no
            }
        }).then(function(response) {
            var assetList = response.data.result;
            c.assetTableList.body = assetList.map(function(asset) {
                return {
                    asset_no: asset.u_asset_no,
                    asset_type: asset.u_asset_type,
                    managing_section: asset.u_managing_section,
                    isexpired: asset.u_isexpired ? 'Expired' : 'Active'
                };
            });
        });
    }
};
```

**HTML**:
```html
<div>
    <h3>示例表单</h3>

    <div class="table_aera">
        <table>
            <thead>
                <tr>
                    <th>{{c.assetTableList.header.asset_no}}</th>
                    <th>{{c.assetTableList.header.asset_type}}</th>
                    <th>{{c.assetTableList.header.managing_section}}</th>
                    <th>{{c.assetTableList.header.isexpired}}</th>
                </tr>
            </thead>
            <tbody>
                <tr ng-repeat="list in c.assetTableList.body">
                    <td>{{list.asset_no}}</td>
                    <td>{{list.asset_type}}</td>
                    <td>{{list.managing_section}}</td>
                    <td>{{list.isexpired}}</td>
                </tr>
            </tbody>
        </table>
    </div>
</div>
```

### 4. 更新 Catalog Item

更新`Catalog Item`的表单，使得`asset_no`的值变化时触发事件。

**步骤**:
- 在`Catalog Item`中，设置`onChange`事件来触发一个通知，向`widget`传递`asset_no`的值。

**Catalog Client Script**:
```javascript
function onChange(control, oldValue, newValue, isLoading) {
    if (isLoading || newValue === '') {
        return;
    }

    var $rootScope = angular.element(document.body).injector().get('$rootScope');
    $rootScope.$broadcast('asset_no_changed', newValue);
}
```

### 流程概述

1. 用户在`Catalog Item`中改变了`asset_no`的值。
2. `Catalog Client Script`监听到这个变化并触发事件。
3. 事件被`Widget Controller`中的`$scope.$on`捕获。
4. `Widget Controller`调用Server Script获取最新的数据。
5. 表格根据最新数据进行更新。

通过这个流程，可以确保当`catalog item`中的`asset_no`变化时，`widget`中的表格内容自动更新。


在ServiceNow中，如果你希望在`widget`的`controller`中监视`Catalog Item`中的`"asset_no"`值，并在变化时调用`widget`的`server script`来更新数据，可以利用AngularJS的双向绑定和ServiceNow提供的事件机制。下面是一个详细的实现方案：

### 1. 配置Catalog Item

首先，确保你的`Catalog Item`中的`"asset_no"`有唯一的字段名，例如`variables.asset_no`。接下来，添加Client Script以便在`"asset_no"`变化时触发自定义事件。

**Catalog Client Script**:
```javascript
function onChange(control, oldValue, newValue, isLoading) {
    if (isLoading || newValue === '') {
        return;
    }

    // 触发自定义事件
    var $rootScope = angular.element(document.body).injector().get('$rootScope');
    $rootScope.$broadcast('asset_no_changed', newValue);
}
```

### 2. 更新Widget Controller

在`widget`的`controller`中，监听`$rootScope`上的事件。当`"asset_no"`变化时，调用`server script`来获取新的数据，并更新表格内容。

**Widget Controller**:
```javascript
api.controller = function($scope, $rootScope) {
    var c = this;

    c.assetTableList = {
        header: {
            asset_no: 'Asset No',
            asset_type: 'Asset Type',
            managing_section: 'Managing Section',
            isexpired: 'Is Expired'
        },
        body: []
    };

    // 监听'asset_no_changed'事件
    $rootScope.$on('asset_no_changed', function(event, asset_no) {
        refreshTableData(asset_no);
    });

    // 获取初始数据
    if (c.options.initialAssetNo) {
        refreshTableData(c.options.initialAssetNo);
    }

    function refreshTableData(asset_no) {
        c.server.get({action: 'getAssetListByNo', asset_no: asset_no}).then(function(response) {
            var assetList = response.resultList;
            c.assetTableList.body = assetList.map(function(asset) {
                return {
                    asset_no: asset.u_asset_no,
                    asset_type: asset.u_asset_type,
                    managing_section: asset.u_managing_section,
                    isexpired: asset.u_isexpired ? 'Expired' : 'Active'
                };
            });
        });
    }
};
```

### 3. 更新Server Script

在`widget`的`server script`中添加一个API，接收`asset_no`参数并返回相应的资产数据。

**Server Script**:
```javascript
(function() {
    function getAssetListByNo(asset_no) {
        var assetList = new GlideRecord('u_asset_number_management_table');
        assetList.addQuery('u_asset_no', asset_no);
        assetList.query();
        var resultList = [];
        while (assetList.next()) {
            resultList.push({
                u_asset_no: assetList.getValue('u_asset_no'),
                u_asset_type: assetList.getValue('u_asset_type'),
                u_managing_section: assetList.getValue('u_managing_section'),
                u_isexpired: assetList.getValue('u_isexpired')
            });
        }
        return {
            resultList: resultList
        };
    }

    // Expose the function to be callable from the client
    data.getAssetListByNo = getAssetListByNo;
})();
```

### 4. 更新Widget HTML

确保`widget`的HTML中有用于展示数据的表格部分。

**Widget HTML**:
```html
<div>
    <h3>示例表单</h3>
    <div class="table_aera">
        <table>
            <thead>
                <tr>
                    <th>{{c.assetTableList.header.asset_no}}</th>
                    <th>{{c.assetTableList.header.asset_type}}</th>
                    <th>{{c.assetTableList.header.managing_section}}</th>
                    <th>{{c.assetTableList.header.isexpired}}</th>
                </tr>
            </thead>
            <tbody>
                <tr ng-repeat="list in c.assetTableList.body">
                    <td>{{list.asset_no}}</td>
                    <td>{{list.asset_type}}</td>
                    <td>{{list.managing_section}}</td>
                    <td>{{list.isexpired}}</td>
                </tr>
            </tbody>
        </table>
    </div>
</div>
```

### 5. 实现流程概述

1. **Catalog Client Script**: 监听`"asset_no"`值的变化，并触发自定义事件`asset_no_changed`。
2. **Widget Controller**: 监听`asset_no_changed`事件，当事件被触发时，调用`server script`获取最新数据并更新表格。
3. **Server Script**: 提供API来根据`"asset_no"`返回相关资产数据。
4. **HTML**: 渲染表格并绑定`controller`的数据。

### 示例

假设`Catalog Item`中的`"asset_no"`字段名是`variables.asset_no`。用户在`Service Catalog`中选择或修改`"asset_no"`，Client Script监听到变化并触发`asset_no_changed`事件。`widget`的`controller`监听到这个事件，调用`server script`获取数据，最后更新表格内容。

这样做的好处是利用AngularJS的事件机制和ServiceNow的API，保持`Catalog Item`与`widget`的数据同步，实现实时更新。