const url = 'https://fantasy.cat/api.php';
const software = 'constellation';


function Local () {
  return {
      set : function (key, obj) {
          localStorage.setItem(key, JSON.stringify(obj));
          return obj;
      },
      get : function (key) {
          var obj = {};
          if (localStorage.getItem(key) !== 'undefined') {
              obj = JSON.parse(localStorage.getItem(key));
          }
          return obj;
      },
      clear : function () {
          localStorage.clear();
          return this;
      },
      remove : function (key) {
          localStorage.removeItem(key);
          return this;
      }
  };
}
var local  = Local();







if (!local.get('key')=='') {window.location='src/pages/menu.html';}

$(document).ready(function(){
    console.warn('Login page loaded!')
    $('#inputID').keyup(function() {                
        var foo = $(this).val().split("-").join(""); 
        if (foo.length > 0) {
        foo = foo.match(new RegExp('.{1,4}', 'g')).join("-");
        }
        $(this).val(foo);
    });
    
    $('#submit').click(function(){
        let id=$('#inputID').val();
        if (!id){
          alert("Please input your Fantasy.cat License Key.")
        }else{
          local.set('key', id);
          $.get(url,
            {
              key: id,
              software: software,
              cmd: 'getMember',
              member: id
            }, function(data){
              if (data == 'fantasy.cat license key invalid.'){alert('Invalid license key. Please try again.'); console.error(data)}
              else{
                let userData = JSON.parse(data)
                local.set('userData', userData);
                $.get(url,
                  {
                    key: id,
                    software: software,
                    cmd: 'getMemberForum',
                    name: local.get('userData').name
                  }, function(data){
                      let forumData = JSON.parse(data)
                      local.set('forumData', forumData);
                      console.warn('Logged in as: '+local.get('forumData').username)
                      window.location = "src/pages/menu.html"
                    });
              }

            })
        }
    });
});
