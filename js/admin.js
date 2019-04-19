var page = [];
var cur_page = parseInt(localStorage.getItem('cur_page')) >0 ? parseInt(localStorage.getItem('cur_page'))  : 0;
var { Query, User } = AV; AV.init("MW9UfmNmX0phVCcw2YCPQmye-MdYXbMMI","XslNotJgRdIcWVdNlTTWtCAv"); 
chat_list = null
message_list = null
user ={
    img :"images/ico/7.jpg",
    name:"admin",
    id:0, 
    tip:"欢迎光临 ~~",
} 
user_tmp ={
    img :"images/ico/7.jpg",
 name:"admin",
 id:0, 
 tip:"欢迎光临 ~~",
}  

function user_ui(){
    user =  localStorage.getItem('user')?JSON.parse(localStorage.getItem('user')):user;

    $(".profile_pic").html('<img src="'+user.img+'"  alt="..." class="img-circle profile_img">')
    $(".profile_info").html('<span>'+user.tip+' </span><h2>'+user.name+'</h2> </div> ')
    $(".user-profile").html('<img  src="'+user.img+'"  alt=""> '+user.name+' <span class=" fa fa-angle-down"></span>')
    if(user.id > 0 ){
      $('.dropdown-usermenu').html('<li><a onclick="login_out()"> <i class="fa fa-sign-out pull-right"></i> 登出 </a></li>')
    } else{
      $('.dropdown-usermenu').html(  '<li><a onclick="change_menu(0)"> <i class="fa fa-sign-out pull-right"></i> 登陆</a></li>')
    }
}
user_ui()
function change_menu(index, is_Check) {
    $(".sonpage").hide()
    console.log("change_menu()", index, is_Check)
    $(".page").parent().find(".mainpage").hide()
    if (is_Check && u == null) {
      console.log("  检测 并且用户为空 ")
      $(".page").parent().find(".mainpage").eq(0).show()
    } else {
      console.log("  不需要检测 或者用户存在 ")
       $(".page").parent().find(".mainpage").eq(index).show()
    }
    cur_page = index;
    if( !page[index].is_init ){ 
      page[index].init()
    }   
    page[index].flush(index)
    //show_son_page(page[index].cur_son_page)
    localStorage.setItem('cur_page',index)
  }

 

  //留言表信息
  page[0] = {
    name: "留言表信息",
    cur_son_page:null,
    is_init: false,
  
    init: function () { 
      //加載信息
      var query = new AV.Query('message');
      query.equalTo('state', 0);
      query.find().then(function (results) {
      console.log(results)
      html = ""
       message_list = results
      $.each(results,function(i,o){
         
        item = o.attributes
        html +='<tr>'
        html +='<td> <input type="checkbox"  class="message_check_box" value="'+o.id+'"> </td>'
        html +='<td>' + item.userid + '</td>'
        html +='<td>' + item.message + '</td>'
        html +='<td>' + item.time + '</td>'
        if(item.state==1){
          html +='<td>通過</td>'
        }else{
          html +='<td>未通過</td>'
        }
        html +='</tr>'
      })
      $("#messageTable").html(html)
      }, function (error) {
      });

      $('.message_check_box').iCheck({checkboxClass: 'icheckbox_square-green',radioClass: 'iradio_square-green'});
    },
    flush: function () {
        

    },
} 

  //大廳信息
  page[1] = {
    name: "大廳信息",
    cur_son_page:null,
    is_init: false,
  
    init: function (state) { 
      //加載信息
      state = state?state:0;
      var query = new AV.Query('chat');
      query.equalTo('state', state);
      query.find().then(function (results) {
      console.log(results)
      html = ""
       chat_list = results
      $.each(results,function(i,o){
         
        item = o.attributes
        html +='<tr>'
        html +='<td> <input type="checkbox"  class="chat_check_box" value="'+o.id+'"> </td>'
        html +='<td>' + item.userid + '</td>'
        html +='<td>' + item.message + '</td>'
        html +='<td>' + item.time + '</td>'
        if(item.state==1){
          html +='<td>通過</td>'
        }else{
          html +='<td>未通過</td>'
        }
        html +='</tr>'
      })
      $("#chatTable").html(html)
      }, function (error) {
      });

      $('.chat_check_box').iCheck({checkboxClass: 'icheckbox_square-green',radioClass: 'iradio_square-green'});
    },
    flush: function () {
        

    },
} 

function admin_update_message(){
    // 獲取列表
  $.each($('.message_check_box'),function(i,o){
    if($(this).is(':checked')){
      id = $(this).val()
      console.log(id)
      AV.Query.doCloudQuery('update message set state=1 where objectId="'+id+'"').then(function (data) { 
          page[0].init()
        }, function (error) {
          console.error(error);
        });
    }
  })
}

function admin_verify_clear(){
  page[1].init(1)
  $.each(chat_list,function(i,o){
      if(new Date(o.attributes.time)< new Date(Date.now() - parseInt($('.clear_time').val())*60*1000))
      console.log(id)
      AV.Query.doCloudQuery('update chat set state = 0 where objectId="'+o.id+'"').then(function (data) { 
          page[1].init()
        }, function (error) {
          console.error(error);
        });
   
  })
   
}
function admin_verify_chat(){
  // 獲取列表
  $.each($('.chat_check_box'),function(i,o){
    if($(this).is(':checked')){
      id = $(this).val()
      console.log(id)
      AV.Query.doCloudQuery('update chat set state=1 where objectId="'+id+'"').then(function (data) { 
          page[1].init()
        }, function (error) {
          console.error(error);
        });
    }
  })
}