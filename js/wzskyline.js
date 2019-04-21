var page = [];
var cur_page = parseInt(localStorage.getItem('cur_page')) >0 ? parseInt(localStorage.getItem('cur_page'))  : 0;
var last_page = 0;
var { Query, User } = AV; AV.init("MW9UfmNmX0phVCcw2YCPQmye-MdYXbMMI","XslNotJgRdIcWVdNlTTWtCAv"); 
u = null
user ={
    img :"images/ico/7.jpg",
    name:"游客",
    id:null, 
    tip:"欢迎光临 ~~",
} 
user_tmp ={
    img :"images/ico/7.jpg",
    name:"游客",
    id:null, 
    tip:"欢迎光临 ~~",
}  
colors = ["LightPink","Pink","Crimson","LavenderBlush","PaleVioletRed","HotPink","DeepPink","MediumVioletRed","Orchid","Thistle","plum","Violet","Magenta","Fuchsia","MediumOrchid","DarkVoilet","DarkOrchid","MediumPurple","MediumSlateBlue","SlateBlue","Lavender","GhostWhite","RoyalBlue","CornflowerBlue","LightSteelBlue","DoderBlue","AliceBlue","SteelBlue","LightSkyBlue","SkyBlue","DeepSkyBlue","LightBLue","PowDerBlue","CadetBlue","Azure","LightCyan","PaleTurquoise","Cyan","Aqua","Teal","MediumTurquoise","LightSeaGreen","Turquoise","MediumAquamarine","MediumSpringGreen","MintCream","SpringGreen","Honeydew","LightGreen","PaleGreen","DarkSeaGreen","LimeGreen","Lime","Chartreuse","LawnGreen","GreenYellow","Beige","LightGoldenrodYellow","Ivory","LightYellow","DarkKhaki","LemonChiffon","Khaki","FloralWhite","OldLace","Wheat","Moccasin","Orange","PapayaWhip","BlanchedAlmond","NavajoWhite","AntiqueWhite","Tan","Linen","LightSalmon","Coral","OrangeRed","DarkSalmon","Tomato","MistyRose","Salmon","Snow","LightCoral","RosyBrown","IndianRed","White","WhiteSmoke","Gainsboro","LightGrey","Silver"]
wzskyline = {
    save_user:function(){
        if(1==1){
        var obj = AV.Object.extend('visitor');
        var obj = new obj();
        obj.set('ip', user.ip);
        obj.set('address', user.address.replace('省',''));
        obj.set('time', formatDate()); 
        obj.save().then(function (obj) {
          // 成功保存之后，执行其他逻辑.
          console.log('New visitor created with objectId: ' + obj.id);
        }, function (error) {
          // 异常处理
          console.error('Failed to create new visitor, with error message: ' + error.message);
        });
        }
    }
}

 // 指定排序的比较函数
 function compare(property){
  return function(obj1,obj2){
      var value1 = obj1[property];
      var value2 = obj2[property];
      return value1 - value2;     // 升序
  }
}
function formatDate(date){
    date = date? date: new Date() 
    m = date.getMonth()+1
    d = date.getDate()
    h = date.getHours()
    min = date.getMinutes()
    s = date.getSeconds()
    if(m < 10) {
        m ='0' + m
    }
    if(d < 10) {
        d ='0' + d
    }
    if(h < 10) {
        h ='0' + h
    }
    if(min<10) {
        min ='0' + min
    }
    if(s < 10) {
        s ='0' + s
    }
    return  date.getFullYear() + '-' + m + '-' +d +' ' +h + ':' + min + ':' +  s
}
function limitTextarea(self,nowleng){
    $(self).on('input propertychange', function(event) {
        var _val = $(self).val();
        _val = _val < 150 ? _val : _val.substr(0,150);
        $(self).val(_val);
        $(nowleng).text(_val.length)
    });
    $(self).blur(function(){
        $(self).off('input propertychange');
    });
  } 
function departure(){ 
    message = $('.user_send_message').val().trim()
    if(message.length>0){
        $(".send_message_btn").attr("disabled", false); 
    }else{
        $(".send_message_btn").attr("disabled", true); 
    }
}
  
function user_ui(){
    user =  localStorage.getItem('user')?JSON.parse(localStorage.getItem('user')):user;

    if( u && typeof(u) =='object'   ){
      $('.dropdown-usermenu').html('<li><a onclick="login_out()"> <i class="fa fa-sign-out pull-right"></i> 登出 </a></li>')
      
    } else{
      $('.dropdown-usermenu').html(  '<li><a onclick="change_menu(1)"> <i class="fa fa-sign-out pull-right"></i> 登陆</a></li>')
      user = user_tmp
    }
    $(".profile_pic").html('<img src="'+user.img+'"  alt="..." class="img-circle profile_img">')
    $(".profile_info").html('<span>'+user.tip+' </span><h2>'+user.name+'</h2> </div> ')
    $(".user-profile").html('<img  src="'+user.img+'"  alt=""> '+user.name+' <span class=" fa fa-angle-down"></span>')
    

}
user_ui()
function change_menu(index, is_Check) {
    $(".sonpage").hide() 
    $(".page").parent().find(".mainpage").hide()
    if (is_Check && typeof(u) =='string') { 
      $(".page").parent().find(".mainpage").eq(1).show()
    } else { 
       $(".page").parent().find(".mainpage").eq(index).show()
    }
    last_page = cur_page
    cur_page = index;
    if( !page[index].is_init ){  
      page[index].init()
    }     
    page[index].flush()
    localStorage.setItem('cur_page',index)
  }
  function login_out(){
      //操作 登出
    console.log("login_out OK")
    u = null
    user = user_tmp
    localStorage.setItem('user',JSON.stringify(user))
    change_menu(0)
    user_ui()
  }
  ////整合 聊天页面js
  var appId = 'MW9UfmNmX0phVCcw2YCPQmye-MdYXbMMI';
  var appKey = 'XslNotJgRdIcWVdNlTTWtCAv';
  
   /*
  
  AV.initialize("MW9UfmNmX0phVCcw2YCPQmye-MdYXbMMI", "XslNotJgRdIcWVdNlTTWtCAv");
   */
  
   
  // 请换成你自己的一个房间的 conversation id（这是服务器端生成的）
  var roomId = '5cbbdc2ac1fa97000833935e';
  
  // 每个客户端自定义的 id
  var clientId = 'LeanCloud';
  
  // 创建实时通信实例
  var realtime = new AV.Realtime({
    appId: appId,
    appKey: appKey,
    plugins: AV.TypedMessagesPlugin,
  });
  var client;
  var messageIterator;
  
  // 用来存储创建好的 roomObject
  var room;
  
  // 监听是否服务器连接成功
  var firstFlag = true;
  
  // 用来标记历史消息获取状态
  var logFlag = false;
   
  var sendBtn = document.getElementById('send-btn'); 
  var inputSend = document.getElementById('input-send');
  var printWall = document.getElementById('print-wall');
  
  // 拉取历史相关
  // 最早一条消息的时间戳
  var msgTime;
   
  bindEvent(sendBtn, 'click', sendMsg); 
  
  bindEvent(document.body, 'keydown', function(e) {
    if (e.keyCode === 13) {
      if (firstFlag) {
        login();
      } else {
        sendMsg();
      }
    }
  });
   
   
   
  function login() {
    // showLog('正在登录');
    var val = user.name;
    if (val) {
      clientId = val;
    }
    if (!firstFlag) {
      client.close();
    }
  
    // 创建聊天客户端
    console.log(user)
    var b = new Base64()
    return AV.User.logIn(clientId, b.decode(user.w))
      .then(function(user) {
        console.log(user)
        return realtime.createIMClient(user);
      })
      .then(function(c) {
        // showLog('连接成功');
        firstFlag = false;
        client = c;
        client.on('disconnect', function() {
          showLog('[disconnect] 服务器连接已断开');
        });
        client.on('offline', function() {
          showLog('[offline] 离线（网络连接已断开）');
        });
        client.on('online', function() {
          showLog('[online] 已恢复在线');
        });
        client.on('schedule', function(attempt, time) {
          showLog(
            '[schedule] ' +
              time / 1000 +
              's 后进行第 ' +
              (attempt + 1) +
              ' 次重连'
          );
        });
        client.on('retry', function(attempt) {
          showLog('[retry] 正在进行第 ' + (attempt + 1) + ' 次重连');
        });
        client.on('reconnect', function() {
          showLog('[reconnect] 重连成功');
        });
        client.on('reconnecterror', function() {
          showLog('[reconnecterror] 重连失败');
        });
        // 获取对话
        return c.getConversation(roomId);
      })
      .then(function(conversation) {
        if (conversation) {
          return conversation;
        } else {
          // 如果服务器端不存在这个 conversation
          showLog('不存在这个 conversation，创建一个。');
          return client
            .createConversation({
              name: 'LeanCloud-Conversation',
              // 创建暂态的聊天室（暂态聊天室支持无限人员聊天）
              transient: true,
            })
            .then(function(conversation) {
              showLog('创建新 Room 成功，id 是：', roomId);
              roomId = conversation.id;
              return conversation;
            });
        }
      })
      .then(function(conversation) {
        return conversation.join();
      })
      .then(function(conversation) {
        // 获取聊天历史
        room = conversation;
        messageIterator = conversation.createMessagesIterator();
        getLog(function() {
          printWall.scrollTop = printWall.scrollHeight;
          // showLog('已经加入，可以开始聊天。');
        });
        // 房间接受消息
        conversation.on('message', function(message) {
          if (!msgTime) {
            // 存储下最早的一个消息时间戳
            msgTime = message.timestamp;
          }
          showMsg(message);
        });
      })
      .catch(function(err) {
        console.error(err);
        showLog('错误：' + err.message);
        change_menu(0)
      });
  }
  
  function sendMsg() {
    var val = inputSend.value;
  
    // 不让发送空字符
    if ( !String(val).replace(/^\s+/, '').replace(/\s+$/, '')) {
       return;
    }
      msg = {
          img:user.img,
          val:val
      }
     val = JSON.stringify(msg)
    // 向这个房间发送消息，这段代码是兼容多终端格式的，包括 iOS、Android、Window Phone
    room.send(new AV.TextMessage(val)).then(function(message) {
      // 发送成功之后的回调
             inputSend.value = '';
             msg =  JSON.parse(message.text)
             img = user.img ? user.img :"images/ico/2.jpg"
             showMyLog( img, msg.val, formatTime(message.timestamp)
           );
            
      printWall.scrollTop = printWall.scrollHeight;
    });
  }
  
   
  
  Usernames = {
    _cache: {},
    get: function(id) {
      if (!this._cache[id]) {
        this._cache[id] = new AV.Query(AV.User)
          .get(id)
          .then(
            function(user) {
              var username = user.getUsername();
              this._cache[id] = username;
              return username;
            }.bind(this)
          )
          .catch(
            function() {
              this._cache[id] = id;
              return id;
            }.bind(this)
          );
      } 
      return this._cache[id];
    },
  };
  
  // 显示接收到的信息

  function showMsg(message, isBefore) {
    console.log("  showMsg   showMsg()")
    console.log(message)
    var text = message.text;
    AV.Promise.resolve()
     .then(function() { 
         return Usernames.get(message.from);
      })
      .then(function(from) {
        if (message instanceof AV.TextMessage) {  }
        console.log("  Promise   showMsg()")
        console.log(message)
        if ( String(text).replace(/^\s+/, '').replace(/\s+$/, '') ) {
          msg = JSON.parse(message.text) 
          img = msg.img ? msg.img :"images/ico/2.jpg" 
          if (from === user.name) { 
             showMyLog( img, msg.val, formatTime(message.timestamp))
           }else{
             showOtherLog( img,   encodeHTML(from) ,msg.val, formatTime(message.timestamp))
           }
       }
      });
  }
  
  // 拉取历史
  bindEvent(printWall, 'scroll', function(e) {
    if (printWall.scrollTop < 20) {
      getLog();
    }
  });
  
  // 获取消息历史
  function getLog(callback) {
    var height = printWall.scrollHeight;
    if (logFlag) {
      return;
    } else {
      // 标记正在拉取
      logFlag = true;
    }

   
     
    messageIterator
      .next()
      .then(function(result) {
        var data = result.value;
        logFlag = false;
        // 存储下最早一条的消息时间戳
        var l = data.length;
        if (l) {
          msgTime = data[0].timestamp;
        }
        
        var data = data.sort(compare("_timestamp"));
        console.log("XXXXXXXXXXXXXXXXXXXXXX")
        console.log(data)
        let promises = [];
        let myData = [];

        data.forEach(item => {
          promises.push(
           Usernames.get(item.from).then(from => { 
              item.from = from
              myData.push(item);
              console.log(myData)
            })
          );
        });
        Promise.all(promises).then(() => {
          console.log(myData)
          myData = myData.sort(compare("_timestamp"));
          console.log(myData)
          for (var i in myData){
            message = myData[i]
            msg = JSON.parse(message.text) 
            img = msg.img ? msg.img :"images/ico/2.jpg" 
            if (message.from === user.name) { 
               showMyLog( img, msg.val, formatTime(message.timestamp))
             }else{
               showOtherLog( img,   encodeHTML(message.from) ,msg.val, formatTime(message.timestamp))
             }


          }

        });
         
          


        if (l) {
          printWall.scrollTop = printWall.scrollHeight - height;
        }
        if (callback) {
          callback();
        }
      })
      .catch(function(err) {
        console.error(err);
      });
  }
   
  function showLog(msg, data, isBefore,time) {
    if (data) { msg = msg + '<span class="strong" title="'+time+'" style="margin-left:100px">' + data + '</span>';}
    var p = document.createElement('p');
    p.innerHTML = msg;
    if (isBefore) {
      printWall.insertBefore(p, printWall.childNodes[0]);
    } else {
      printWall.appendChild(p);
    }
  }
  function showOtherLog(img,from, msg,time,before) {
    
    html = '<div class="message-item message-item--left">'
    html += '<img class="avatar" src="'+ img +'"  >' + '<span class="chat_name" > '+from +"</span>"
    html += '<div  title="'+time+'" class="message-bubble">'+msg+'</div>'
    html += '</div>'

    var p = document.createElement('p');
    p.innerHTML = html; 
    if(before){
        printWall.insertBefore(p, printWall.childNodes[0]);
    }else{
        printWall.appendChild(p);
    }
  }
  function showMyLog(img, msg,time,before) { 
    html = '<div class="message-item message-item--right">'
    html += '<img class="avatar" src="'+ img +'"  >'  
    html += '<div  title="'+time+'" class="message-bubble">'+msg+'</div>'
    html += '</div>'

    var p = document.createElement('p');
    p.innerHTML = html;
    if(before){
        printWall.insertBefore(p, printWall.childNodes[0]);
    }else{
        printWall.appendChild(p);
    }
  }
  function encodeHTML(source) {
    return String(source)
      .replace(/&/g, '&amp;')
      .replace(/</g, '&lt;')
      .replace(/>/g, '&gt;')
      .replace(/\\/g, '&#92;')
      .replace(/"/g, '&quot;')
      .replace(/'/g, '&#39;');
  }
  
  function formatTime(time) {
    var date = new Date(time);
    var month =
      date.getMonth() + 1 < 10
        ? '0' + (date.getMonth() + 1)
        : date.getMonth() + 1;
    var currentDate = date.getDate() < 10 ? '0' + date.getDate() : date.getDate();
    var hh = date.getHours() < 10 ? '0' + date.getHours() : date.getHours();
    var mm = date.getMinutes() < 10 ? '0' + date.getMinutes() : date.getMinutes();
    var ss = date.getSeconds() < 10 ? '0' + date.getSeconds() : date.getSeconds();
    return (
      // date.getFullYear() +'-' +month +'-' + currentDate + ' ' +
      hh +
      ':' +
      mm +
      ':' +
      ss
    );
  }
  
  function createLink(url) {
    return (
      '<a target="_blank" href="' +
      encodeHTML(url) +
      '">' +
      encodeHTML(url) +
      '</a>'
    );
  }
  
  function bindEvent(dom, eventName, fun) {
    if (window.addEventListener) {
      dom.addEventListener(eventName, fun);
    } else {
      dom.attachEvent('on' + eventName, fun);
    }
  } 




  ///聊天js 整合结束

page[0] = {
    name: "首頁",
    cur_son_page:null,
    is_init: false,
    init: function () {
        
    },
    onresize:function () {


    },
    flush: function () {
         

    },
} 

  //login
  page[1] = {
    name: "登陆页面",
    cur_son_page:null,
    is_init: false,
   
    init: function () {
         

    },
    login:function () {

        AV.User.logIn($(".user_login_name").val().trim() ,  $(".user_login_password").val().trim()).then(function (loggedInUser) {
             console.log(loggedInUser,loggedInUser.attributes.emailVerified,loggedInUser.id);
             if(loggedInUser.attributes.emailVerified){
                u = loggedInUser
                console.log(loggedInUser.attributes.emailVerified,loggedInUser.id);
                user.id = loggedInUser.id
                user.img = loggedInUser.attributes.img
                user.name = loggedInUser.attributes.username
                var b = new Base64()
				user.w =  b.encode( $(".user_login_password").val().trim());
                console.log(user);
                localStorage.setItem('user',JSON.stringify(user))
                change_menu(0)
                user_ui()
             } else{
                BootstrapDialog.show({
                    title: '错误提示',
                    message: '邮箱还未验证',
                })     
             }
             
          }, function (error) {
            BootstrapDialog.show({
                title: '错误提示',
                message: '用户名或密码错误',
            })
          });
 

    },
    flush: function () {
        

    },
}
//regist
page[2] = {
    name: "注册页面",
    cur_son_page:null,
    is_init: false,
    init: function () {
        
    },
    regist:function () {

        var username = $(".user_regist_name").val().trim(); // 202
        var password = $(".user_regist_password").val().trim();
        var email = $(".user_regist_email").val().trim();// 125 203
      
        // LeanCloud - 注册
        // https://leancloud.cn/docs/leanstorage_guide-js.html#注册
        var user = new AV.User();
        user.setUsername(username);
        user.setPassword(password);
        user.setEmail(email);
        user.set('img', 'images/ico/1.jpg');
        user.signUp().then(function (loginedUser) {
            BootstrapDialog.show({
                title: '注冊成功',
                message: '已发生邮件,请查收,验证邮箱后可登陆',
            })
          console.log('New object created with objectId: ' + obj.id);
        }, (function (error) {
            // alert(JSON.stringify(error));
            if(error.code == 125){
                BootstrapDialog.show({
                    title: '错误提示',
                    message: '邮箱格式错误',
                })
            }
            if(error.code == 202){
                BootstrapDialog.show({
                    title: '错误提示',
                    message: '该用户名已被使用',
                })
            }
            if(error.code == 203){
                BootstrapDialog.show({
                    title: '错误提示',
                    message: '该邮箱已被使用',
                })
            }

        }));
      
    },
    flush: function () {
         

    },
} 
page[3] = {
    name: "忘记密码页面",
    cur_son_page:null,
    is_init: false,
    init: function () {
        
    },
    onresize:function () {


    },
    flush: function () {
         

    },
} 

page[4] = {
    name: "資料",
    cur_son_page:null,
    is_init: false,
    init: function () {
        $(".user_ico").click(function(){
            $(".user_ico").css('padding',0)
            $(this).css('padding',1)
            $('.modify_new_ico').val($(this).attr('src'))
        })
    },
    modify:function () {
      user = JSON.parse(localStorage.getItem('user'))
      if(user.id){
        AV.User.logIn(user.name, $('.modify_old_password').val( )).then(function (loggedInUser) {
            loggedInUser.set('password',  $('.modify_new_password').val( ));
            if($('.modify_new_ico').val( ).length>1){
                loggedInUser.set('img',  $('.modify_new_ico').val( ));
                user.img =  $('.modify_new_ico').val( );
            }
            loggedInUser.save();
            login_out()
            change_menu(0)
          }, function (error) {
             
            console.error(error);
            BootstrapDialog.show({
                title: '错误提示',
                message: '用户密码不对',
            })
          });


      }
    },
    flush: function () {
         

    },
}

// 大廳
page[5] = {
    name: "大廳",
    cur_son_page:null,
    is_init: false,
    init: function () {
        this.is_init = true
        // 进行登录
        if(user.id){
            login()	  
          }
          var OwO_demo = new OwO({
            logo: 'OωO表情',
            container: document.getElementsByClassName('OwO')[0],
            target: document.getElementsByClassName('OwO-textarea')[0],
            api: 'https://easy-mock.com/mock/5c6fb6a5cb69676f2246b2ba/example/OwO',
            position: 'down',
            width: '100%',
            maxHeight: '250px'
        });

    },
    onresize:function () {


    },
    flush: function () {
         
      this.init()
    },
}
// 留言
page[6] = {
    name: "留言",
    cur_son_page:null,
    is_init: false,
    cur_message_page:0,
    init: function () {
         //加載信息
      var query = new AV.Query('message');
      //query.equalTo('state', 1);
      query.find().then(function (results) {
      console.log(results)
      
       message_list = results
       

       let promises = [];
       let myData = [];
       results.forEach(item => {
         promises.push(
          Usernames.get(item.attributes.userid).then(data => { 
             myData.push(data);
           })
         );
       });
       Promise.all(promises).then(() => {
        for(var i in results){ 
           
          var color = colors[Math.floor(Math.random()*colors.length)]; 
          
          html = ""  
          html +='<div class="col-md-6 col-sm-6 col-xs-12">'
          html +='<div class="x_panel" style="BACKGROUND:'+color+'">'
          html +='<div class="x_title">'
          html +='<h2>' + myData[i]+ '</h2>'
          html +='<div class="clearfix"></div>' 
          html +='<h5>' + results[i].attributes.time + '<h5>'
          html +='<div class="clearfix"></div>'
          html +='</div>'
          html +='<div class="x_content">'
          html +='<div class="">'
          html +=  results[i].attributes.message  
          html +='</div>'
          html +='</div>'
          html +='</div>'
          html +='</div> '
          $("#webSite_message").append(html)
        } 

       }); 
         
      }, function (error) {
      });
      $(".send_message_btn").attr("disabled", true); 
      $(".user_send_message").blur(function(){
        message = $('.user_send_message').val().trim()
        if(message.length>1){
            $(".send_message_btn").attr("disabled", false); 
        }
    });
      function limitTextarea(self,nowleng){
        $(self).on('input propertychange', function(event) {
            var _val = $(self).val();
           
            _val = _val < 140 ? _val : _val.substr(0,140);
            $(self).val(_val);
            $(nowleng).text(_val.length)
            if(_val>1){
                $(".send_message_btn").attr("disabled", false); 
            }
        });
        $(self).blur(function(){
            $(self).off('input propertychange');
             
        });
      } 
    },
    send_message:function () {
      
        message = $(".user_send_message").eq(0).val()
        if(message.length>0){
            var obj = AV.Object.extend('message');
            var obj = new obj();
            obj.set('userid', user.id);
            obj.set('message', message);
            obj.set('time', formatDate());
            obj.set('state', 0);
            obj.save().then(function (obj) {
              // 成功保存之后，执行其他逻辑.
              $(".user_send_message").val("")
              console.log('New object created with objectId: ' + obj.id);
              // 彈框提示
              BootstrapDialog.show({
                title: '留言成功',
                message: '待核实后即可显示.',
              })

            }, function (error) {
              // 异常处理
              console.error('Failed to create new object, with error message: ' + error.message);
            });
            
        }

    },
    flush: function () {
         

    },
}
page[7] = {
    name: "说明",
    cur_son_page:null,
    is_init: false,
    init: function () {
        
    },
    onresize:function () {


    },
    flush: function () {
         

    },
}


page[8] = {
    name: "简历",
    cur_son_page:null,
    is_init: false,
    init: function () {
        
    },
    onresize:function () {


    },
    flush: function () {
         

    },
} 
page[9] = {
    name: "联系",
    cur_son_page:null,
    is_init: false,
    init: function () {
         
    },
    onresize:function () {


    },
    flush: function () {
         

    },
} 

page[10] = {
    name: "統計",
    cur_son_page:null,
    is_init: false,
    init: function () {
        this.is_init = true; 
         //初始化一个Echart对象
      var visitMap = echarts.init(document.getElementById('visit-map')); 
      //显示chart加载动画 
      visitMap.showLoading();
      //get GeoJSON数据
      $.get('https://easy-mock.com/mock/5c6fb6a5cb69676f2246b2ba/example/china').done(function(mapData){
         //注册China地图对象
         echarts.registerMap('china', mapData);

        data = {
            "series": [{
              "name": "ip分佈",
              "type": "map",
              "mapType": "china",
              "data": [ ]
            }],
            "max": 999,
            "legend": [
              "ip分佈",
            ]
          }

          var query = new AV.Query('visitor');
          var summaryJson = {}
              query.find().then(function (results) {
              console.log(results) 
              
              
               html = ""   
              $.each(results,function(i,o){
                 
                item = o.attributes
                if(summaryJson[item.address]){
                summaryJson[item.address] += 1
                }else{
                summaryJson[item.address] = 1
                }
                html +='<tr>'
                html +='<td>' + item.ip + '</td>'
                html +='<td>' + item.address + '</td>'
                html +='<td>' + item.time + '</td>'
                html +='</tr>'
                         
              })
              $("#vistorTable").html(html)
              for(e in summaryJson){ 
                data.series[0].data.push({
                    "name": e,
                    "value": summaryJson[e]
                  })
              }
              var mapOption = {
                title: {
                  text: '访客统计图',
                  subtext: '中国区域访问本站统计',
                  left: 'center'
                },
                //设置提示工具样式，formatter中构造提示的数据类型以及样式
                tooltip: {
                  trigger: 'item',
                  formatter: function(mapData){
                    var city = mapData.data.name;
                    var totleNum = 0;
                    var res = "";
                    $.each(data.series,function(key,value){
                       $.each(value.data,function(key,cityValue){
                          if(cityValue.name == mapData.data.name){
                             res+=value.name+" : "+cityValue.value+"<br/>";
                             totleNum+=cityValue.value;
                          }
                       });
                    });
                    res = '<div style="border-bottom: 1px solid rgba(255,255,255,.3); font-size: 18px;padding-bottom: 7px;margin-bottom: 7px">'
                       +mapData.data.name+":"+totleNum+"</div>" +res;
                    return res;
                  } 
               },
               legend: {
                  orient: 'vertical',
                  left: 'left',
                  data:data.legend
               },
               visualMap: {
                  max:data.max,
                  min: 0,
                  left: 'left',
                  top: 'bottom',
                  text: ['高','低'],
                  calculable: true,
                  color: ['orangered','yellow','lightskyblue']
               },
               toolbox: {
                  show: true,
                  orient: 'vertical',
                  left: 'right',
                  top: 'center',
                  feature: {
                     dataView: {readOnly: false},
                     restore: {},
                     saveAsImage: {}
                  }
               },
               series: data.series
            }; 
            visitMap.hideLoading(); 
            visitMap.setOption(mapOption,true);
           }); 
      });
    },
    onresize:function () {


    },
    flush: function () {
         

    },
} 

///////////////////////////// END
function Base64() {

    // private property
    _keyStr = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/=";

    // public method for encoding
    this.encode = function(input) {
        var output = "";
        var chr1, chr2, chr3, enc1, enc2, enc3, enc4;
        var i = 0;
        input = _utf8_encode(input);
        while(i < input.length) {
            chr1 = input.charCodeAt(i++);
            chr2 = input.charCodeAt(i++);
            chr3 = input.charCodeAt(i++);
            enc1 = chr1 >> 2;
            enc2 = ((chr1 & 3) << 4) | (chr2 >> 4);
            enc3 = ((chr2 & 15) << 2) | (chr3 >> 6);
            enc4 = chr3 & 63;
            if(isNaN(chr2)) {
                enc3 = enc4 = 64;
            } else if(isNaN(chr3)) {
                enc4 = 64;
            }
            output = output +
                _keyStr.charAt(enc1) + _keyStr.charAt(enc2) +
                _keyStr.charAt(enc3) + _keyStr.charAt(enc4);
        }
        return output;
    }

    // public method for decoding
    this.decode = function(input) {
        var output = "";
        var chr1, chr2, chr3;
        var enc1, enc2, enc3, enc4;
        var i = 0;
        input = input.replace(/[^A-Za-z0-9\+\/\=]/g, "");
        while(i < input.length) {
            enc1 = _keyStr.indexOf(input.charAt(i++));
            enc2 = _keyStr.indexOf(input.charAt(i++));
            enc3 = _keyStr.indexOf(input.charAt(i++));
            enc4 = _keyStr.indexOf(input.charAt(i++));
            chr1 = (enc1 << 2) | (enc2 >> 4);
            chr2 = ((enc2 & 15) << 4) | (enc3 >> 2);
            chr3 = ((enc3 & 3) << 6) | enc4;
            output = output + String.fromCharCode(chr1);
            if(enc3 != 64) {
                output = output + String.fromCharCode(chr2);
            }
            if(enc4 != 64) {
                output = output + String.fromCharCode(chr3);
            }
        }
        output = _utf8_decode(output);
        return output;
    }

    // private method for UTF-8 encoding
    _utf8_encode = function(string) {
        string = string.replace(/\r\n/g, "\n");
        var utftext = "";
        for(var n = 0; n < string.length; n++) {
            var c = string.charCodeAt(n);
            if(c < 128) {
                utftext += String.fromCharCode(c);
            } else if((c > 127) && (c < 2048)) {
                utftext += String.fromCharCode((c >> 6) | 192);
                utftext += String.fromCharCode((c & 63) | 128);
            } else {
                utftext += String.fromCharCode((c >> 12) | 224);
                utftext += String.fromCharCode(((c >> 6) & 63) | 128);
                utftext += String.fromCharCode((c & 63) | 128);
            }

        }
        return utftext;
    }

    // private method for UTF-8 decoding
    _utf8_decode = function(utftext) {
        var string = "";
        var i = 0;
        var c = c1 = c2 = 0;
        while(i < utftext.length) {
            c = utftext.charCodeAt(i);
            if(c < 128) {
                string += String.fromCharCode(c);
                i++;
            } else if((c > 191) && (c < 224)) {
                c2 = utftext.charCodeAt(i + 1);
                string += String.fromCharCode(((c & 31) << 6) | (c2 & 63));
                i += 2;
            } else {
                c2 = utftext.charCodeAt(i + 1);
                c3 = utftext.charCodeAt(i + 2);
                string += String.fromCharCode(((c & 15) << 12) | ((c2 & 63) << 6) | (c3 & 63));
                i += 3;
            }
        }
        return string;
    }
}