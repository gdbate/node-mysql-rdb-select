;(function(){

  var RDBSelect=function(table){
    this.options={table:table,fields:[],join:[],where:[],limit:false,offset:0,groupBy:[],having:[],orderBy:[],as:false};
    return this;
  }
  RDBSelect.prototype.option=function(name,value){
  	if(value){
  		this.options[name]=value;
  		return this;
  	}else return this.options[name];
  }
  RDBSelect.prototype.table=function(table){
    this.options.table=table;
    return this;
  }
  RDBSelect.prototype.fields=function(fields){
    if(typeof fields!='object')fields=[fields];
    this.options.fields=this.options.fields.concat(fields);
    return this;
  }
  RDBSelect.prototype.join=function(table,on,type){
    this.options.join.push({table:table,on:on,type:(type||'JOIN')});
    return this;
  }
  RDBSelect.prototype.where=function(one,operator,two){
    if(typeof one=='object'){
      if(arguments.length==1){
        this.options.where.push(arguments[0]);
      }else{
        if(typeof arguments.callee!='undefined')delete arguments.callee;
        this.options.where.push(arguments);
      }
    }else{
      this.options.where.push(this.cond(one,operator,two));
    }
    return this;
  }
  RDBSelect.prototype.groupBy=function(groupBy){
    this.options.groupBy.push(groupBy);
    return this;
  }
  RDBSelect.prototype.having=function(one,operator,two){
    if(typeof one=='object'){
      if(arguments.length==1){
        this.options.having.push(arguments[0]);
      }else{
        if(typeof arguments.callee!='undefined')delete arguments.callee;
        this.options.having.push(arguments);
      }
    }else{
      this.options.having.push(this.cond(one,operator,two));
    }
    return this;
  }
  RDBSelect.prototype.orderBy=function(field,sort,init){
    if(!sort)sort='ASC';
    if(init)this.options.orderBy=[];
    this.options.orderBy.push({field:field,sort:(sort.toUpperCase()=='ASC')?'ASC':'DESC'});
    return this;
  }
  RDBSelect.prototype.limit=function(limit){
    this.options.limit=limit;
    return this;
  }
  RDBSelect.prototype.offset=function(offset){
    this.options.offset=offset;
    return this;
  }
  RDBSelect.prototype.as=function(as){
    this.options.as=as;
    return this;
  }
  RDBSelect.prototype.build=function(){
    if(!this.options.table)return false;
    return this.options;
  }
  RDBSelect.prototype.cond=function(one,operator,two){
    return [one,operator,two];
  }
  RDBSelect.prototype.and=function(){return this.logOp('AND',arguments)}
  RDBSelect.prototype.or=function(){return this.logOp('OR',arguments)}
  RDBSelect.prototype.logOp=function(lo,args){
    data={};
    data[lo]=[];
    for(var i in args){
    	data[lo].push(args[i]);
    }
    if(typeof data[lo].callee!='undefined')delete data[lo].callee;
    return data;
  }

  //for compliance with browser if desired
	if(typeof exports!='undefined')module.exports=RDBSelect;
	else if(typeof window =='object')window.RDBSelect=RDBSelect;

}());