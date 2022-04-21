/*
https://www.youtube.com/watch?v=-GPjps0r0KI&t=87s
1.GlideRecord
  1.1.GlideRecord is used for database operations
    1.1.GlideRecord用于数据库操作
  1.2.Query records from a table, Create record,Update Record, delete record
    1.2.从表中查询记录，创建记录，更新记录，删除记录
  1.3.A GlideRecord contains both record and fields
    1.3.一个 GlideRecord 包含记录和字段
  1.4.Always test queries in lower instances before running them in production
    1.4. 在生产环境中运行查询之前，始终在较低的实例中测试查询
  1.5.Mostly used API by ServiceNow Developers
    1.5.ServiceNow开发者最常用的API
*/

/*
2.Where you Can write GlideRecord
  2.1.Business Rules
    2.1.业务规则
  2.2.Script Includes
    2.2.脚本包含
  2.3.UI Actions
    2.3.UI动作
  2.4.Mail Scripts
    2.4.邮件脚本
  2.5.Scripted Scheduled Jobs
    2.5. 脚本化的计划作业
*/

/*
3.GlideRecord syntax
  var gr = new GlideRecord('table name');
*/
  var gr = new GlideRecord('incident');

/*
4.GlideRecord Methods
  4.1.query()
    Queries the table and look for the records
    查询表并查找记录
  4.2.next()
    Moves to the next record in the table mentioned in the glideRecord
    移动到 glideRecord 中提到的表中的下一条记录
  4.3.addQuery(<Flied Name>, Object operator, <Value of field>)
    Provide ability to filter the records you want to query form the table
    提供过滤要从表中查询的记录的能力
    operator: =, !=, >, >=, <, <=,
              IN,
              NOT IN,
              STARTSWITH,
              ENDSWITH,
              CONTAINS,
              DOES NOT CONTAINS,
              INSTANCEOF
  4.4.addActiveQuery()
    Apply the filter to return active records where active field is true
    应用过滤器以返回活动字段为 true 的活动记录
  4.5.addInactiveQuery()
    Apply the filter to return inactive records where active field is false
    应用过滤器以返回活动字段为 false 的活动记录
  4.6.addEncodedQuery(String query)
    Filter the records as per query mentioned in the parameter
    根据参数中提到的查询过滤记录
  4.7.addJoinQuery('table_name')
    Apply filter to return records based on a relationship in a related table
    应用过滤器以根据相关表中的关系返回记录
  4.8.addNotNullQuery('field name')
    Apply the filter to return records where mentioned field in the parameter is not empty
    应用过滤器返回参数中提到的字段不为空的记录
  4.9.addNullQuery('field name')
    Apply the filter to return records where mentioned field in the parameter is empty
    应用过滤器返回参数中提到的字段为空的记录
  4.10.setLimit('number')
    Limit the number of records returned from a table
    限制从表返回的记录数
  4.11.setWorkflow(true/false)
    Does not run any other business rule if set to false
    如果设置为 false，则不运行任何其他业务规则 flow designのtriggerが無効になる
  4.12.orderBy('<field name>');
    Sort the records as per the field mentioned in the parameter
    按升序排列
  4.13.orderByDesc('<field name>')
    Sort the records as per the field mentioned in the parameter in descending order
    按降序排列
  4.14.update()
    Update the records
  4.15.autoSysFields(true/false)
    if false disables updates to sys_updated_by,sys_updated_on,sys_mod_count,sys_created_by, and sys_created_on.
    如果为 false，则禁用对 sys_updated_by、sys_updated_on、sys_mod_count、sys_created_by 和 sys_created_on 的更新。
  4.16.initialize()
    Creates an empty record before record is created as per the table mentioned in glideRecord object
    在根据 glideRecord 对象中提到的表创建记录之前创建一个空记录
  4.17.insert()
    inserts a new record using the field values that have been set for the current record
    使用为当前记录设置的字段值插入新记录
  4.18.applyTemplate(<Template name>)
    Used to apply template while creating a record
    用于在创建记录时应用模板
    应用模板:输入内容模板
  4.19.get(Object name, Object value);
    returns the specified record in an instantiated GlideRecord object
    返回实例化的 GlideRecord 对象中的指定记录
  4.20.getDisplayValue()
    Retrieves the display value
    检索显示值
  4.21.getRowCount()
    Retrieves the number of rows in the GlideRecord object
  4.22.hasNext()
    Check if there are records in the table with mentioned filter
    检查表中是否有提及过滤器的记录
  4.23.deleteRecord()
    Delete a single record in a table
    删除表中的单个记录
  4.23.deleteMultiple()
    delete multiple records from a table
    从表中删除多条记录
*/
  var gr = new GlideRecord('incident');
  // 検索条件追加 like SQL's "where priority = '1'";
  gr.addQuery('priority', '=', '1');
  gr.addActiveQuery();
  gr.addInactiveQuery();
  gr.addEncodedQuery('parent_incident!=NULL^priority!=1^ORpriority=NULL');
  gr.setLimit('3');
  gr.setWorkflow(false);
  gr.orderBy();
  gr.orderByDesc();
  gr.query();// 検索を行う
  while(gr.next()){ // ループ処理
    gr.short_description = 'Update(): ' + gr.short_description;
    gr.update();
    gs.print(gr.number); // numberの値を出力
  }
  // 4.7.addJoinQuery('table_name')
  var proGlide = new GlideRecord('problem');
  var a = proGlide.addJoinQuery('incident');
  a.addCondition('priority', '1');
  proGlide.query();
  while (proGlide.next()) {
    gs.print('The problem number:' + proGlide.number)
  }
  // 4.17.insert()
  var demoCreat = new GlideRecord('rm_stroy');
  demoCreat.initialize();
  demoCreat.short_description = "insert new record"
  demoCreat.insert();
  // 4.23.deleteRecord()
  var demoCreat1 = new GlideRecord('rm_stroy');
  demoCreat1.addEncodedQuery('number=SRY000001');
  demoCreat1.query();
  demoCreat1.next();
  demoCreat1.deleteRecord();
  // 4.23.deleteMultiple()
  var demoCreat2 = new GlideRecord('rm_stroy');
  demoCreat2.addQuery('priority', '>', '1');
  demoCreat2.query();
  demoCreat2.next();
  demoCreat2.deleteMultiple();
