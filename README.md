# RDB-Select

Relational database query builder for javascript.

See two implementations:

### Browser implementation (WebSQL) ###
[https://github.com/gdbate/rdb-websql](https://github.com/gdbate/rdb-websql "https://github.com/gdbate/rdb-websql")

### Node MySQL implementation ###
[https://github.com/gdbate/rdb-node-mysql](https://github.com/gdbate/rdb-node-mysql "https://github.com/gdbate/rdb-node-mysql")

#Example Usage#

```javascript
  var select=new RDBSelect('table1');
  var query=select.fields([
  		'`id` AS `id`',
  		'`title` AS `title`'
    ])
  	.join('table2',['table2.iDtable1','=','table1.id'],'LEFT JOIN')
	  .groupBy('table2.id')
	  .orderBy('`title`')
    .build();
```

#Notes:#

fields must be declared in two ways:

*field using the base table:*
```
`fieldname`
```

*field specified by table:*
```
tablename.fieldname
```
