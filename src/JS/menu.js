//Getter-setter
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

function logout(){
    local.set('key','');
    window.location='../main.html';
}

let forums = local.get('forumData')

/* 
forum groups
6 - normal user
28 - SDK Contributor
31 - Veteran

*/

$(document).ready(function(){
    if(local.get('key')==''){window.location='../main.html'}else {console.log('%c Logged in as ' + forums.username, 'background: #444; color: #bada55; padding: 100px 300px; border-radius:2px; font-size: 40px');
}

    $('#forumUsername').html(forums.username);

    var fg = forums.groups.split(',');
    for (let i=0; i < fg.length; i++){
        if(fg[i] == 28){
            $('#forumUsername').addClass('username--style28');
            $('#forumGroup').html('SDK Contributor');
        } else if (fg[i] == 31){
            $('#forumUsername').addClass('username--style31');
            $('#forumGroup').html('Veteran');
        } else {
            $('#forumUsername').addClass('username--style6');
            $('#forumGroup').html('Member');
        }
    }

    if (local.get('userData').vip == 1){$('#forumGroup').html('VIP');}














    $('.draggable').each(function(index){
        if (local.get(`div${index}`)){
            $(this).css(local.get(`div${index}`));
        }        
    })
    var save = document.getElementById("save_config")

    $('.draggable').draggable();

    save.addEventListener('click', function () { 
        var $drag = $('.draggable');

        $drag.each(function(index){
            offset = $(this).offset();
            local.set(`div${index}`, offset);
        })
    });

});



