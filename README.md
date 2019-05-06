# wzskyline
var obj = AV.Object.extend('file');
var obj = new obj();  
obj.set('state', 0);
obj.save().then(function (obj) { 
    console.log('New object created with objectId: ' + obj.id); 
}, function (error) { 
    console.error('Failed to create new object, with error message: ' + error.message);
});
# wzskyline

  
const query = new AV.Query('file').descending('createdAt').equalTo('state', 1);
const size = 1;
query.limit(size); 
query.skip(this.data.page * size); 
query.find().then(function (list) {
    item = list[0]
    console.log(item.id,item.attributes.name)
})