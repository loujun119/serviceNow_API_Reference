/*
The DynamicTranslation API provides methods that translate text, in real time, into multiple languages using translation service providers. 
This API is available for both standard clients and Angular-based Service Portal clients.
DynamicTranslation API 提供使用翻译服务提供商将文本实时翻译成多种语言的方法。此 API 可用于标准客户端和基于 Angular 的服务门户客户端。

In addition, you can use this API to detect the language of a specific string and check whether the DynamicTranslation methods are enabled for a translation service. 
Use this API to create a seamless localization experience for your user interface, enabling one interface to service multiple countries.
此外，您可以使用此 API 来检测特定字符串的语言，并检查是否为翻译服务启用了 DynamicTranslation 方法。使用此 API 为您的用户界面创建无缝的本地化体验，
使一个界面能够为多个国家/地区提供服务。

Currently this API supports three translation service providers: Microsoft Azure Translator Service, IBM Watson Translator Service, and Google Cloud Translator Service. 
You can also configure other translation services within your instance and then use the DynamicTranslation API to translate your text.
目前该 API 支持三种翻译服务提供商：Microsoft Azure Translator Service、IBM Watson Translator Service 和 Google Cloud Translator Service。您还可以在您的实例中配置其他翻译服务，
然后使用 DynamicTranslation API 翻译您的文本。

To use this API you must activate the Dynamic Translation plugin. For information on this plugin and additional information on Dynamic Translation, 
refer to Dynamic translation overview. Also, to use this API in a Service Portal widget, you must inject the dynamicTranslation service into the widget client 
script function.
要使用此 API，您必须激活动态翻译插件。有关此插件的信息和有关动态翻译的其他信息，请参阅动态翻译概述。此外，要在服务门户小部件中使用此 API，
您必须将 dynamicTranslation 服务注入小部件客户端脚本函数。

Note: The name of the class to use in Service Portal clients is dynamicTranslation, while the name of the class to use in standard clients is DynamicTranslation.
注意：要在服务门户客户端中使用的类的名称是 dynamicTranslation，而要在标准客户端中使用的类的名称是 DynamicTranslation。
*/


//########################################### 1.getDetectedLanguage(String text, Object parms) ###################################################################//
/*
Detects the language of the passed in text.
检测传入文本的语言。
If you pass in a translator, the method uses that translation service to detect the source language. Otherwise, the detection is performed by the default 
translation service. Ensure that the text strings that you provide contain enough verbiage to enable proper language detection.
如果您传入翻译器，该方法将使用该翻译服务来检测源语言。 否则，检测由默认翻译服务执行。 确保您提供的文本字符串包含足够的措辞以启用正确的语言检测。

In addition to the detected language, the response contains a confidence level of the detection, along with other possible language alternatives. If a translator 
is not passed in, the method also returns the default translation service used to detect the language.
除了检测到的语言之外，响应还包含检测的置信度以及其他可能的语言替代方案。 如果没有传入翻译器，该方法还返回用于检测语言的默认翻译服务。

Parameters
text: Text to use to detect the language.
parms: Optional. JSON object that contains additional translation parameters.
    "parms": {
    "translator": "String"
    }
parms.translator: 

*/

