


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
