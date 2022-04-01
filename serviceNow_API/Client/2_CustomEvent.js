/*
You can use CustomEvent API to show qualified embedded help in the right sidebar.
您可以使用 CustomEvent API 在右侧边栏中显示合格的嵌入式帮助。
See Use embedded help qualifiers for more information.
有关详细信息，请参阅使用嵌入式帮助限定符。
*/

//########################################### 1.fireAll(String event, String qualifier) ###################################################################//
/*
Show the embedded-help content specified by the qualifier parameter in the right sidebar.
在右侧栏中显示由 qualifier 参数指定的嵌入式帮助内容。
Before using the fireAll() method, you must have created the Embedded Help qualifier and help content.
在使用 fireAll() 方法之前，您必须已经创建了嵌入式帮助限定符和帮助内容。

Note: To write to the debug log, make a call to the global function jslog().
注意：要写入调试日志，请调用全局函数 jslog()。

Parameters
event:　The event to send. Must be the string "embedded_help:load_embedded_help"
qualifier: The qualifier name created in the Embedded Help application.
*/
// Example
var qualifier = 'your-EH-qualifier';
		CustomEvent.fireAll("embedded_help:load_embedded_help", qualifier);