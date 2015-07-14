var ElasticDocFlatParse = require('../../../lib/elastic/elastic-docparseclean-trans');
var eventStream = require('event-stream');

describe('this is a test for elastic-docflat-parse', function() {
  it('should be add doc_timestamp and remove timestamp', function(done) {
    var message1 = {
      "_index":"sevenga.ironcommander@2015-06-25",
      "_type":"研发科技",
      "_id":"a349b20f-5850-4bc4-860f-61816ebd1de3",
      "_score":0,
      "_source":{
        "sys_timestamp":"2015-06-26T01:56:33.808+08:00",
        "date_timestamp":"2015-06-26T00:00:00.000+08:00",
        "timestamp":"2015-06-26T00:00:00.000+08.5:00",
        "剩余时间":"0d:0h:9m:51s",
        "#科技等级":1,
        "用户ID":"1061637",
        "hour_timestamp":"2015-06-26T01:00:00.000+08:00",
        "date":"2015-06-26",
        "message":"日志类型[研发科技],时间[2015-06-25T19:57:59+02:00],用户ID[1061637],科技名称[军情>侦查],科技等级[1],剩余时间[0d:0h:9m:51s]",
        "科技名称":"军情侦查",
        "log_type":"研发科技",
        "#hour":1,
        "科技等级":"1"
      }
    };

    var message2 = {
      "_index":"sevenga.ironcommander@2015-06-25",
      "_type":"免费加速",
      "_id":"bbe4fef5-119b-4b88-876e-2f459082d289",
      "_score":0,
      "_source":{
        "sys_timestamp":"2015-06-26T01:56:53.456+08:00",
        "date_timestamp":"2015-06-26T00:00:00.000+08:00",
        "timestamp":"2015-06-26T00:00:00.000+08:00",
        "免费加速":"1",
        "建筑名称":"军校",
        "#建筑等级":1,
        "建筑等级":"1",
        "用户ID":"1061637",
        "#用户ID":1061637,
        "hour_timestamp":"2015-06-26T02:00:00.000+08:00",
        "date":"2015-06-26",
        "message":"日志类型[免费加速],时间[2015-06-25T20:05:33+02:00],用户ID[1061637],建筑名称[军校],建筑等级[1],免费加速[1]",
        "log_type":"免费加速",
        "#hour":2
      }
    };

    var message3 = {
      "_index":"sevenga.ironcommander@2015-06-25",
      "_type":"免费加速",
      "_id":"bbe4fef5-119b-4b88-876e-2f459082d289",
      "_score":0,
      "_source":{
        "sys_timestamp":"2015-06-26T01:56:53.456+08:00",
        "date_timestamp":"2015-06-26T00:00:00.000+08:00",
        "timestamp":"2015-dddddd+08:00",
        "免费加速":"1",
        "建筑名称":"军校",
        "#建筑等级":1,
        "建筑等级":"1",
        "用户ID":"1061637",
        "#用户ID":1061637,
        "hour_timestamp":"2015-06-26T02:00:00.000+08:00",
        "date":"2015-06-26",
        "message":"日志类型[免费加速],时间[2015-06-25T20:05:33+02:00],用户ID[1061637],建筑名称[军校],建筑等级[1],免费加速[1]",
        "log_type":"免费加速",
        "#hour":2
      }
    };

    var sourceArray = [message1, message2, message3];
    var myResult = ['{"_index":"sevenga.ironcommander@2015-06-25","_type":"研发科技","_id":"a349b20f-5850-4bc4-860f-61816ebd1de3","_score":0,"_source":{"sys_timestamp":"2015-06-26T01:56:33.808+08:00","date_timestamp":"2015-06-26T00:00:00.000+08:00","剩余时间":"0d:0h:9m:51s","#科技等级":1,"用户ID":"1061637","hour_timestamp":"2015-06-26T01:00:00.000+08:00","date":"2015-06-26","message":"日志类型[研发科技],时间[2015-06-25T19:57:59+02:00],用户ID[1061637],科技名称[军情>侦查],科技等级[1],剩余时间[0d:0h:9m:51s]","科技名称":"军情侦查","log_type":"研发科技","#hour":1,"科技等级":"1","#用户ID":1061637,"doc_timestamp":"2015-06-26T00:00:00.000+08:30"}}\n',
      '{"_index":"sevenga.ironcommander@2015-06-25","_type":"免费加速","_id":"bbe4fef5-119b-4b88-876e-2f459082d289","_score":0,"_source":{"sys_timestamp":"2015-06-26T01:56:53.456+08:00","date_timestamp":"2015-06-26T00:00:00.000+08:00","免费加速":"1","建筑名称":"军校","#建筑等级":1,"建筑等级":"1","用户ID":"1061637","#用户ID":1061637,"hour_timestamp":"2015-06-26T02:00:00.000+08:00","date":"2015-06-26","message":"日志类型[免费加速],时间[2015-06-25T20:05:33+02:00],用户ID[1061637],建筑名称[军校],建筑等级[1],免费加速[1]","log_type":"免费加速","#hour":2,"#免费加速":1,"doc_timestamp":"2015-06-26T00:00:00.000+08:00"}}\n',
      '{"_index":"sevenga.ironcommander@2015-06-25","_type":"免费加速","_id":"bbe4fef5-119b-4b88-876e-2f459082d289","_score":0,"_source":{"sys_timestamp":"2015-06-26T01:56:53.456+08:00","date_timestamp":"2015-06-26T00:00:00.000+08:00","免费加速":"1","建筑名称":"军校","#建筑等级":1,"建筑等级":"1","用户ID":"1061637","#用户ID":1061637,"hour_timestamp":"2015-06-26T02:00:00.000+08:00","date":"2015-06-26","message":"日志类型[免费加速],时间[2015-06-25T20:05:33+02:00],用户ID[1061637],建筑名称[军校],建筑等级[1],免费加速[1]","log_type":"免费加速","#hour":2,"#免费加速":1}}\n'
    ]

    assertArraysTrans(sourceArray, myResult, done);
  })
});

function assertArraysTrans(input, expect, done) {
  var elasticDocFlatParse = new ElasticDocFlatParse();
  var reader = eventStream.readArray(input);
  var writer = eventStream.writeArray(function (err, array) {
    array.should.eql(expect);
    done();
  });

  reader.pipe(elasticDocFlatParse).pipe(writer);
}