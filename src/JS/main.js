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
    window.location='../../main.html';
}

let forums = local.get('forumData')
let user = local.get('userData')
const url = 'https://fantasy.cat/api.php';
const software = 'constellation';

$(document).ready(function(){
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
            offset = $(this).position();
            local.set(`div${index}`, offset);
        })
    });










    $('#forumGroupVIP').hide()
    if(local.get('key')==''){
        window.location='../main.html'
    }else {
        console.log('%c Logged in as ' + forums.username, 'background: #444; color: #bada55; padding: 100px 300px; border-radius:2px; font-size: 40px');
    }

    $('#forumUsername').html(forums.username);

    if (forums.id < 1000){
        $('#userAvatar').attr('src', `https://fantasy.cat/forums/data/avatars/l/0/${forums.id}.jpg`)
    } else {
        let f = forums.id.toString().charAt(0)
        $('#userAvatar').attr('src', `https://fantasy.cat/forums/data/avatars/l/${f}/${forums.id}.jpg`)
    }

    var fg = forums.groups.split(',');
    console.log(fg);
    for (let i=0; i < fg.length; i++){
        if (user.vip == 1){ 
            $('#forumUsername').removeClass();
            $('#forumGroup').hide(); 
            $('#forumGroupVIP').show();
            $('#forumUsername').addClass('username--style25');
            break
        }else if(fg[i] == 3){
            $('#forumUsername').removeClass();
            $('#forumUsername').addClass('username--style3');
            $('#forumGroup').html('Administrator');
            if(fg[i]==28){
                $('#forumSubGroup').html('SDK Contributor');
            }
            if(fg[i]==31){
                $('#forumSubGroup').html('Veteran');
            }
            break
        } else if(fg[i] == 18){
            $('#forumUsername').removeClass();
            $('#forumUsername').addClass('username--style18');
            $('#forumGroup').html('Media');
            if(fg.includes('31')){
                $('#forumSubGroup').html('Veteran, Member');
            } else if(fg.includes('28')){
                $('#forumSubGroup').html('SDK Contributor, Member');
            }else if(fg.includes('28'&&'31')){
                $('#forumSubGroup').html('SDK Contributor, Veteran,\n Member');
            }
            break
        } else if(fg[i] == 28){
            $('#forumUsername').removeClass();
            $('#forumUsername').addClass('username--style28');
            $('#forumGroup').html('SDK Contributor');
            if(fg.includes('31')){
                $('#forumSubGroup').html('Veteran, Member');
            }
            break
        } else if (fg[i] == 31){
            $('#forumUsername').removeClass();
            $('#forumUsername').addClass('username--style31');
            $('#forumGroup').html('Veteran');
            break
         
        } else {
            $('#forumUsername').removeClass();
            $('#forumUsername').addClass('username--style6');
            $('#forumGroup').html('Member');
            $('#forumSubGroup').html('Member');
        }
    }


    












});



