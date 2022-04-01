/*
api - UI Builder

The api API provides methods that you can use when developing client scripts in the UI Builder.
This API is exposed to client scripts, also known as page scripts. Client scripts are executed in response to something happening on a page, such as:
    User interaction events/actions, such as a button click.
    Lifecycle events, such as a data broker execution started.
These scripts do not have to return anything to the framework and can be written as an asynchronous function.

This API is also exposed to scripted property values. These scripts are executed whenever the framework-runtime needs to calculate a value, such as:
    Passing to a component property.
    Determining component visibility.
    Emitting an event with a payload.
These scripts cannot be written as an asynchronous function. They also cannot invoke side-effect methods on the api object, such as, api.emit(), 
api.setState(), and api.data.<data_resource_id>.*().

The api object contains both configuration dependent and configuration independent properties that you can access within the context of the associated page 
or component. You cannot directly modify the properties within this object. Modification can only be made through the available methods.

api - 用户界面生成器

api API 提供了在 UI Builder 中开发客户端脚本时可以使用的方法。
此 API 向客户端脚本公开，也称为页面脚本。客户端脚本是为了响应页面上发生的事情而执行的，例如：
    用户交互事件/动作，例如按钮点击。
    生命周期事件，例如数据代理执行开始。
这些脚本不必向框架返回任何内容，并且可以编写为异步函数。

这个 API 也暴露给脚本化的属性值。每当框架运行时需要计算一个值时，就会执行这些脚本，例如：
    传递给组件属性。
    确定组件可见性。
    使用有效负载发出事件。
这些脚本不能写成异步函数。它们也不能在 api 对象上调用副作用方法，例如 api.emit()、api.setState() 和 api.data.<data_resource_id>.*()。

api 对象包含配置相关和配置无关的属性，您可以在相关页面或组件的上下文中访问它们。您不能直接修改此对象中的属性。只能通过可用的方法进行修改。

api-UIビルダー

api APIは、UIビルダーでクライアントスクリプトを開発するときに使用できるメソッドを提供します。
このAPIは、ページスクリプトとも呼ばれるクライアントスクリプトに公開されます。クライアントスクリプトは、次のようなページで発生した何かに応答して実行されます。
    ボタンクリックなどのユーザーインタラクションイベント/アクション。
    データブローカーの実行などのライフサイクルイベントが開始されました。
これらのスクリプトはフレームワークに何も返す必要はなく、非同期関数として記述できます。

このAPIは、スクリプト化されたプロパティ値にも公開されます。これらのスクリプトは、framework-runtimeが次のような値を計算する必要があるときはいつでも実行されます。
    コンポーネントプロパティに渡す。
    コンポーネントの可視性の決定。
    ペイロードを使用してイベントを発行します。
これらのスクリプトは、非同期関数として作成することはできません。また、api.emit（）、api.setState（）、api.data。<data_resource_id>。*（）などのapiオブジェクトの
副作用メソッドを呼び出すこともできません。

apiオブジェクトには、関連付けられたページまたはコンポーネントのコンテキスト内でアクセスできる構成依存プロパティと構成非依存プロパティの両方が含まれています。
このオブジェクト内のプロパティを直接変更することはできません。変更は、利用可能な方法でのみ行うことができます。
*/

// ------------------------------1. api.context.props.<page_property_name>---------------------------------------------------------------//
/*
    Page properties can be configured within UI Builder. The configuration values depend on the context in which the page is used.
    页面属性可以在 UI Builder 中配置。 配置值取决于使用页面的上下文。
    ページのプロパティは、UIビルダー内で構成できます。 構成値は、ページが使用されるコンテキストによって異なります。

    Field
    Name	Type	Description
            any     Available values are dependant on the client script implementation.
                    To access these properties, use the following: api.context.props.<page_property_name>.
                    可用值取决于客户端脚本实现。
                     要访问这些属性，请使用以下命令：api.context.props.<page_property_name>。
*/
// For example:
    // A record page with property table could be accessed with 可以访问带有属性表的记录页
    function isActivityStreamVisible({api}) {
        return api.context.props.table === 'incident';
    } 
// Note: These property values are read-only. Mutating nested object values from scripts is not supported.
//       这些属性值是只读的。 不支持从脚本中更改嵌套对象值。

// ------------------------------2. api.context.session.<session_property>---------------------------------------------------------------//
/*
    Context session properties associated with the current user.
    与当前用户关联的上下文会话属性。
    
*/

// ------------------------------3. api.data.<data_resource_id>.lifecycle.lastFetchSucceeded---------------------------------------------------------------//
/*
    Boolean flag that indicates whether the last fetch attempt for the specified data resource instance finished successfully.
    指示对指定数据资源实例的最后一次获取尝试是否成功完成的布尔标志。
    If the value is true, the last fetch attempt for the data resource instance finished successfully; otherwise, false.
    如果值为 true，则数据资源实例的最后一次获取尝试成功完成； 否则为假。
    
*/

// ------------------------------4. api.state.<client_state_parameter_name>---------------------------------------------------------------//
/*
    Current value of the specified client state parameter.
    指定客户端状态参数的当前值。
*/

// ------------------------------5. api.data.<data_resource_id>.addErrorMessage(Object payload)---------------------------------------------------------------//
/*
    Displays the specified error message at the top of the current form.
    指在当前表单的顶部显示指定的错误消息。
*/
//Example
api.data.gform.addErrorMessage({message: 'Error message'});

// ------------------------------6. api.data.<data_resource_id>.addInfoMessage(Object payload)---------------------------------------------------------------//
/*
Displays the specified informational message at the top of the current form.
在当前表单的顶部显示指定的信息性消息。
*/
//Example
api.data.gform.addInfoMessage({message: 'Test message'});

// ------------------------------7. api.data.<data_resource_id>.addOption(Object payload)---------------------------------------------------------------//
/*
Adds an option to the specified choice type field.
将选项添加到指定的选项类型字段。
"payload": {
    "choiceIndex": "String",
    "choiceLabel": "String",
    "choiceValue": "String",
    "fieldName": "String"
}

payload.choiceIndex: Optional. Index into the choice list at which to insert the option.    可选。 索引到插入选项的选择列表。
Default: End of the choice list.   默认值：选择列表的结尾。
payload.choiceLabel: Label of the option to add to the specified field. 添加到指定字段的选项标签。
payload.choiceValue: Value of the option to add to the specified field. 要添加到指定字段的选项的值。
payload.fieldName: Name of the choice type form field to add the specified option to.   要添加指定选项的选择类型表单字段的名称。
*/
//Example
api.data.gform.addOption({fieldName: 'priority', choiceLabel: 'Extremely High', choiceValue: '10'});


// ------------------------------8. api.data.<data_resource_id>.addWarningMessage(Object payload)---------------------------------------------------------------//
/*
Displays the specified warning message at the top of the current form.
在当前表单的顶部显示指定的警告消息。
*/
//Example
api.data.gform.addWarningMessage({message: 'Test message'});


// ------------------------------9. api.data.<data_resource_id>.clearMessage()---------------------------------------------------------------//
/*
Removes all informational and error messages from the top of the current form.
从当前表单的顶部删除所有信息和错误消息。
*/
//Example
api.data.gform.clearMessage();


// ------------------------------10. api.data.<data_resource_id>.clearOptions(Object payload)---------------------------------------------------------------//
/*
Clears all options from the specified choice type field.
清除指定选项类型字段中的所有选项。
*/
//Example
api.data.gform.clearOptions({fieldName: 'priority'});


// ------------------------------11. api.data.<data_resource_id>.execute(Object inputValues)---------------------------------------------------------------//
/*
Triggers an execute operation on the specified data resource.
This method is only available if the data resource is one of the following types:

Composite
GraphQL
REST
Scriptlet
Transform
Note: This method is only exposed if the mutates_server_data field is set to true on the corresponding data resource (sys_ux_data_broker_* table) record. 
    It is accessible under api.data.<data_resource_Id>.refresh()

触发对指定数据资源的执行操作。
仅当数据资源为以下类型之一时，此方法才可用：

合成的
GraphQL
休息
小脚本
转变
注意：仅当相应数据资源（sys_ux_data_broker_* 表）记录上的 mutates_server_data 字段设置为 true 时，才会公开此方法。 
它可以在 api.data.<data_resource_Id>.refresh() 下访问
*/
/*
Example
This code shows a page script that is invoked when the Submit button on the page is clicked. 
The page is configured wit a Server Data Resource tat creates a new record.
*/
function handler({api}) {
    if (api.state.movieYear === 2020) {
      // The data resource used in this case specifies two input parameters: name and year
      api.data.create_movie_record.execute({
        name: api.state.movieName,
        year: api.state.movieYear
      });
    }
};
// ------------------------------12. api.data.<data_resource_id>.executeUiAction(Object payload)---------------------------------------------------------------//
/*
Executes the specified UI action.
执行指定的 UI 操作。
"payload": {
  "actionSysId": "String"
}
payload.actionSysId: Sys_id of the UI action to execute. Located in the UI Action [sys_ui_action] table.
                     要执行的 UI 操作的 Sys_id。 位于 UI 操作 [sys_ui_action] 表中。
*/
//Example
api.data.gform.executeUiAction({actionSysId: '60615ff90f730010ac7de6f8c4767e9a'});


// ------------------------------13. api.data.<data_resource_id>.hideFieldMessage(Object payload)---------------------------------------------------------------//
/*
Hides the oldest message next to the specified field or clears all messages associated with the field.
隐藏指定字段旁边最旧的消息或清除与该字段关联的所有消息。
"payload": {
  "clearAll": Boolean,
  "fieldName": "String"
}
payload.clearAll: Optional. Flag that indicates whether to clear all messages associated with the specified form field.
                  可选。 指示是否清除与指定表单域关联的所有消息的标志。
Valid values:有效值
    true: Clear all messages associated with the specified field. 清除与指定字段关联的所有消息。
    false: Do not clear all messages associated with the specified field. 不清除与指定字段关联的所有消息。
    Default: false
*/
//Example
api.data.gform.hideFieldMessage({fieldName: 'short_description'});


// ------------------------------14. api.data.<data_resource_id>.hideRelatedList(Object payload)---------------------------------------------------------------//
/*
Hides the specified related list on the current form.
在当前表单上隐藏指定的相关列表。
"payload": {
  "listTableName ": "String"
}
payload.listTableName: Name of the related list to hide. Located in the Related List [sys_ui_related_list] table. If the list to hide is through a relationship, 
                        provide the sys_id of the list instead of the name.
                    要隐藏的相关列表的名称。 位于相关列表 [sys_ui_related_list] 表中。 如果要隐藏的列表是通过关系进行的，请提供列表的 sys_id 而不是名称。 
*/
//Example
api.data.gform.hideRelatedList({listTableName:'incident.parent_incident'});


// ------------------------------15. api.data.<data_resource_id>.hideRelatedLists()---------------------------------------------------------------//
/*
Hides all related lists on the current form.
隐藏当前表单上的所有相关列表。
"payload": {
  "listTableName ": "String"
}
payload.listTableName: Name of the related list to hide. Located in the Related List [sys_ui_related_list] table. If the list to hide is through a relationship, 
                        provide the sys_id of the list instead of the name.
                    要隐藏的相关列表的名称。 位于相关列表 [sys_ui_related_list] 表中。 如果要隐藏的列表是通过关系进行的，请提供列表的 sys_id 而不是名称。 
*/
//Example
api.data.gform.hideRelatedLists();


// ------------------------------16. api.data.<data_resource_id>.refresh()---------------------------------------------------------------//
/*
Triggers a refresh operation for the specified non-mutating data resource instance.
Call this method if the underlying data being fetched by the data resource changes. A data resource is considered non-mutating if the mutates_server_data 
field on the record is set to false.
触发指定非变异数据资源实例的刷新操作。
如果数据资源获取的底层数据发生变化，则调用此方法。 如果记录上的 mutates_server_data 字段设置为 false，则认为数据资源是非变异的。

This method is asynchronous and emits an internal event to trigger the refresh of the specified data resource instance. The UI Builder allows you to trigger 
client scripts in response to data resource lifecycle events, such as DATA_FETCH_SUCCEEDED and DATA_FETCH_FAILED. For additional information on these events, 
see Event mapping.
该方法是异步的，会发出一个内部事件来触发指定数据资源实例的刷新。 UI Builder 允许您触发客户端脚本以响应数据资源生命周期事件，例如 DATA_FETCH_SUCCEEDED 和 DATA_FETCH_FAILED。 
有关这些事件的更多信息，请参阅事件映射。

This method is only available if the data resource is one of the following types:
仅当数据资源为以下类型之一时，此方法才可用：

Composite
GraphQL
REST
Scriptlet
Transform
Note: This method is only exposed if the mutates_server_data field is set to false on the corresponding data resource (sys_ux_data_broker_* table) record.
注意：仅当相应数据资源（sys_ux_data_broker_* 表）记录上的 mutates_server_data 字段设置为 false 时，才会公开此方法。

*/
/*
Example
This code shows a page script that is invoked when a dropdown item is selected in a page. 
The page is configured with two Server Data Resources that query problem and incident tables.
此代码显示了在页面中选择下拉项时调用的页面脚本。 该页面配置有两个用于查询问题和事件表的服务器数据资源。
*/
function handler({api, event}) {
    const value = event.payload.value[0];
    if (value === 'problem')
      api.data.problem_list_1.refresh();
    else if(value === 'incident')
      api.data.incident_list_1.refresh();
}


// ------------------------------17. api.data.<data_resource_id>.reload()---------------------------------------------------------------//
/*
Reloads the current form using the same table and sys_id.
使用相同的表和 sys_id 重新加载当前表单。
*/
//Example
api.data.gform.reload();


// ------------------------------18. api.data.<data_resource_id>.removeOption(Object payload)---------------------------------------------------------------//
/*
Removes an option from the specified choice type field.
从指定的选项类型字段中删除选项。
"payload": {
    "choiceValue": "String",
  "fieldName": "String"
}
payload.choiceValue: Value of the option to remove from the specified choice type field. 要从指定的选项类型字段中删除的选项的值。
payload.fieldName: Name of the choice type form field from which to remove the specified value. 要从中删除指定值的选项类型表单字段的名称。
*/
//Example
api.data.gform.removeOption({fieldName: 'priority', choiceValue: '1'});


// ------------------------------19. api.data.<data_resource_id>.save()---------------------------------------------------------------//
/*
Triggers form submission using the Save UI action.
使用保存 UI 操作触发表单提交。
*/
//Example
api.data.gform.save();


// ------------------------------20. api.data.<data_resource_id>.setMandatory(Object payload)---------------------------------------------------------------//
/*
Sets whether the specified form field is mandatory.
设置指定的表单域是否为必填项。
"payload": {
  "fieldName": "String",
  "mandatory": Boolean
}
payload.fieldName: Name of the form field whose mandatory value is to be set. 要设置其强制值的表单字段的名称。
payload.mandatory: Flag that indicates the specified form field is mandatory, meaning the form cannot be saved without this field containing a valid value.
                   表示指定表单字段为必填的标志，表示如果该字段不包含有效值，则无法保存表单。
    true: Field is mandatory. 字段为必填项。
    false: Field is optional. 字段是可选的。
*/
//Example
api.data.gform.setMandatory({fieldName: 'short_description', mandatory: false});


// ------------------------------21. api.data.<data_resource_id>.setReadOnly(Object payload)---------------------------------------------------------------//
/*
Sets the read/write capabilities of the specified form field.
设置指定表单域的读/写能力。
"payload": {
  "fieldName": "String",
  "readonly": Boolean
}
payload.fieldName: Name of the form field whose readability is to be set. 要设置其可读性的表单域的名称。
payload.mandatory: Flag that indicates the read/write capabilities of the specified form field.
                   指示指定表单域的读/写能力的标志。

    true: Field is read only. 字段是只读的 
    false: Field is read/write. 字段是读/写的
*/
//Example
api.data.gform.setReadOnly({fieldName: 'short_description', readonly: false});


// ------------------------------22. api.data.<data_resource_id>.setvalue(Object payload)---------------------------------------------------------------//
/*
Updates a specified GlideForm field with the specified value. Optionally, you can also update the display value with the same specified value.
用指定的值更新指定的 GlideForm 字段。 或者，您还可以使用相同的指定值更新显示值。
Only the value on the form is updated. The value is not saved in the database
仅更新表单上的值。 该值未保存在数据库中
"payload": {
  "displayValue": "String",
  "fieldName": "String",
  "value": "String"
}
payload.displayValue: Optional. Name of the display value to update. If left blank, the display value is not modified.
                      可选。 要更新的显示值的名称。 如果留空，则不修改显示值。
payload.fieldName: Name of the form field to update. 更新的表单字段的名称。
payload.value: Value to update the field with. 更新字段的值。
*/
//Example
api.data.gform.setValue({fieldName: 'short_description', value: 'short description'});


// ------------------------------23. api.data.<data_resource_id>.setVisible(Object payload)---------------------------------------------------------------//
/*
Sets the visibility of the specified form field.
设置指定表单域的可见性。
"payload": {
  "fieldName": "String",
  "visibility": Boolean
}
payload.fieldName: Name of the form field whose visibility is to be set. 要设置其可见性的表单字段的名称。
payload.visibility: Flag that indicates whether the associated field is visible on the current form. 指示关联字段在当前表单上是否可见的标志。
                    true: Field will display on the form. 字段将显示在表单上。
                    false: Field will not display on the form. 字段不会显示在表单上。
*/
//Example
api.data.gform.setVisible({fieldName: 'short_description', visibility: false});


// ------------------------------24. api.data.<data_resource_id>.showFieldMessage(Object payload)---------------------------------------------------------------//
/*
Displays the specified message next to the specified field.
在指定字段旁边显示指定消息。
"payload": {
  "fieldName": "String",
  "message": "String",
  "type": "String"
}
payload.fieldName: Name of the field next to which the message should appear. 应该出现消息的字段的名称。
payload.message: Message to display.要显示的消息。
payload.type: Optional. Type of message to display. 可选。 要显示的消息类型。
                Valid values:
                    error
                    info
                    warning
                    Default: info
*/
//Example
api.data.gform.showFieldMessage({fieldName: 'short_description', message: 'Error message', type: 'error'});


// ------------------------------25. api.data.<data_resource_id>.showRelatedList(Object payload)---------------------------------------------------------------//
/*
Displays the specified related list on the current form.
在当前表单上显示指定的相关列表。
"payload": {
  "listTableName ": "String"
}
payload.listTableName: Name of the related list to display. Located in the Related List [sys_ui_related_list] table. If the list to display is through a relationship, 
provide the sys_id of the list instead of the name.
要显示的相关列表的名称。 位于相关列表 [sys_ui_related_list] 表中。 如果要显示的列表是通过关系显示的，请提供列表的 sys_id 而不是名称。
*/
//Example
api.data.gform.showRelatedList({listTableName:'incident.parent_incident'});


// ------------------------------26. api.data.<data_resource_id>.showRelatedLists()---------------------------------------------------------------//
/*
Displays all related lists associated with the current form.
显示与当前表单关联的所有相关列表。
*/
//Example
api.data.gform.showRelatedLists();


// ------------------------------27. api.data.<data_resource_id>.submit()---------------------------------------------------------------//
/*
Triggers form submission using the specified UI action.
使用指定的 UI 操作触发表单提交。
"payload": {
  "submitActionName": "String"
}
payload.submitActionName: Name of the UI action to execute to submit the current form. 要执行以提交当前表单的 UI 操作的名称。
*/
//Example
api.data.gform.submit({submitActionName:'sysverb_ws_save'});


// ------------------------------28. api.emit(String eventName, Object payload)---------------------------------------------------------------//
/*
Emits an event with the specified name and payload.
发出具有指定名称和有效负载的事件。
The event name being emitted must be part of the associated page definition’s dispatched events list, which is stored in the UX Macroponent Definition [sys_ux_macroponent] table. Any api.emit call that dispatches events not declared in this table are ignored.
发出的事件名称必须是关联页面定义的已调度事件列表的一部分，该列表存储在 UX Macroponent 定义 [sys_ux_macroponent] 表中。 调度未在此表中声明的事件的任何 api.emit 调用都将被忽略。

For additional information on events, see Work with events.
有关事件的更多信息，请参阅使用事件。

*/
//Example The following code shows emitting an event called NOW_UXF_PAGE#ADD_NOTIFICATIONS with an associated items payload.
// 以下代码显示了发出一个名为 NOW_UXF_PAGE#ADD_NOTIFICATIONS 的事件以及相关的项目负载。
function handler({api}) { 
    api.emit('NOW_UXF_PAGE#ADD_NOTIFICATIONS', { 
      items: [
        { 
            id: 'alert1', 
            status: 'positive', 
            icon: 'check-circle-outline', 
          content: 'Here is some information!', 
          textLinkProps: { 
            label: 'More info',
            href: 'https://www.servicenow.com' 
        }, 
        action: {type: 'acknowledge'} 
        } 
      ] 
    }); 
} 


// ------------------------------29. setState(String stateParam, Any value)---------------------------------------------------------------//
/*
Sets the value of the specified client state parameter.
设置指定客户端状态参数的值。
Use client state parameters to maintain a shared state on a page. The shared state can then be passed as values to properties of components used on the page. 
You can also access and update client states in multiple page scripts. A common use case is to keep track of values input by users in multiple form controls on a page. 
When the form is submitted, a client script could then use all of the values stored in client state parameters to create a new record with a data broker. 
A page can have one or more client state parameters, which you can declare for a page through the UI Builder. You can then bind a client state parameter to 
one or more components to share or act on the client state parameter.
使用客户端状态参数来维护页面上的共享状态。然后可以将共享状态作为值传递给页面上使用的组件的属性。您还可以在多个页面脚本中访问和更新客户端状态。
一个常见的用例是跟踪用户在页面上的多个表单控件中输入的值。提交表单后，客户端脚本可以使用存储在客户端状态参数中的所有值与数据代理创建新记录。
一个页面可以有一个或多个客户端状态参数，您可以通过 UI Builder 为页面声明这些参数。然后，您可以将客户端状态参数绑定到一个或多个组件以共享或作用于客户端状态参数。

api.setState() calls are executed asynchronously and do not necessarily update the UI immediately. If the value to set depends on the currentValue of the 
client state parameter, or any of the properties provided in the api object, you should use this variant of the api.setState() method to avoid using outdated values.
api.setState() 调用是异步执行的，不一定会立即更新 UI。如果要设置的值取决于客户端状态参数的 currentValue 或 api 对象中提供的任何属性，
则应使用 api.setState() 方法的此变体以避免使用过时的值。

*/
//This shows a script that could be executed to update the email client state parameter when an input value is set on a now-input component.
// 这显示了一个脚本，当在 now-input 组件上设置输入值时，可以执行该脚本来更新电子邮件客户端状态参数。
function handler({api, event}) {
    api.setState('email', event.payload.value);
}
    
    
// ------------------------------30. setState(String stateParam, Function callbackFn)---------------------------------------------------------------//
/*
Sets the value of the specified client state parameter to the value returned by the specified callback function.
将指定客户端状态参数的值设置为指定回调函数返回的值。
The callback function is invoked with an object that has two properties: currentValue and api. The function should never mutate the currentValue property or 
the api object directly.
使用具有两个属性的对象调用回调函数：currentValue 和 api。该函数不应该直接改变 currentValue 属性或 api 对象。

Use client state parameters to maintain a shared state on a page. The shared state can then be passed as values to properties of components used on the page. 
You can also access and update client states in multiple page scripts. A common use case is to keep track of values input by users in multiple form controls on a page. 
When the form is submitted, a client script could then use all of the values stored in client state parameters to create a new record with a data broker. 
A page can have one or more client state parameters, which you can declare for a page through the UI Builder. You can then bind a client state parameter to one or 
more components to share or act on the client state parameter.
使用客户端状态参数来维护页面上的共享状态。然后可以将共享状态作为值传递给页面上使用的组件的属性。您还可以在多个页面脚本中访问和更新客户端状态。一个常见的用例是跟踪用户在页面上的
多个表单控件中输入的值。提交表单后，客户端脚本可以使用存储在客户端状态参数中的所有值与数据代理创建新记录。一个页面可以有一个或多个客户端状态参数，您可以通过 UI Builder 
为页面声明这些参数。然后，您可以将客户端状态参数绑定到一个或多个组件以共享或作用于客户端状态参数。

api.setState() calls are executed asynchronously and do not necessarily update the UI immediately. If the value to set depends on the currentValue of the 
client state parameter, or any of the properties provided in the api object, you should use this variant of the api.setState() method to avoid using outdated values.
api.setState() 调用是异步执行的，不一定会立即更新 UI。如果要设置的值取决于客户端状态参数的 currentValue 或 api 对象中提供的任何属性，则应使用 api.setState() 方法的
此变体以避免使用过时的值。

*/
//This shows how to use api.setState to log users into a page.
// 这显示了如何使用 api.setState 将用户登录到页面。
function handler({api, event}) {
    const {name, value} = event.payload;
    if (name === 'username' || name === 'password') {
      // Update the loginParameters state object with the username/password value
      api.setState('loginParameters', ({currentValue}) => {
        return {
          ...currentValue,
          [name]: value
        };
      });
    }
}