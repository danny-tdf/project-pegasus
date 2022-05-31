var __EVAL = (s) => eval(`void (__EVAL = ${__EVAL}); ${s}`);

$(function () {
    var term = $('#cOutput').terminal({
        whoami: function () {
            this.echo(`Logged in as user: ${forums.username}.
            
            UID: ${forums.id}
            Total Posts: ${forums.posts}
            Reputation: ${forums.score}
            User license level: ${user.level}
            VIP: ${user.vip}
            Steam accounts: ${user.steam}
            `)
        },
        help: function () {
            this.echo(`This is a help command. All the commands and their descriptions will be listed here. For more information about a specific command, type: h [command-name]. 

            [[b;#664D03;#FFF3CD] help ] - Display this message.
            [[b;#664D03;#FFF3CD] ping ] - Test command. Returns 'Pong!'
            [[b;#664D03;#FFF3CD] whoami ] - Display the currently logged user.
            [[b;#664D03;#FFF3CD] h ] - Display detailed information about a certain command. Use without brackets '[]'.
            [[b;#664D03;#FFF3CD] clear ] - Clears the terminal.
            [[b;#664D03;#FFF3CD] cleardata ] - Clear Pegasus data stored inside localStorage.
            [[b;#664D03;#FFF3CD] get ] - Get information about scripts. Type h get for list of available arguments.
            [[b;#664D03;#FFF3CD] toggle ] - Toggles fantasy.cat scripts on or off.
            [[b;#664D03;#FFF3CD] launch ] - Launch your favourite games.
            [[b;#664D03;#FFF3CD] set ] - Customizes the menu!.

            `);
            term.echo('[[b;white;red] ALL COMMANDS  AND ARGUMENTS ARE CASE SENSITIVE! ]');
        },
        ping: function () {
            this.echo("Pong!")
        },
        h: function (cname) {
            switch (cname) {
                case('launch'):
                    this.echo('Use this command to launch your favourite games! It takes as arguments the following games: cs:go, csgo, css, tf2, dota2. It also takes appIDs. See steamdb.info for more information')
                case ('help'):
                    this.echo('Displays helpful information about the terminal and a short description about the available commands.\n\n It requires no arguments.');
                    break;
                case ('get'):
                    this.echo(`Available arguments:
                    
                    allscripts - Lists all the scripts inside the fantasy.cat database followed by their authors.
                    memberscripts - Lists all the active scripts and displays their information.
                    allsoftware - Lists information about all the fantasy.cat products
                    `)
                    break
                case('set'):
                    term.echo(`
                    The set command takes 2 arguments.

                    First arguments:
                        - color: changes the colors of the menu. It requires a [[;red;]HEXADECIMAL COLOR VALUE] as its second argument (for example: set color #RRGGBBAA). it also takes 3 digit hex values.
                        - background: changes the background to a given URL, the URL being the second argument. [[;red;]MAKE SURE THE URL IS DIRECTLY FROM THE IMAGE]. For example: https://i.imgur.com/[[;red;]2g6dMuY.jpg]
                    `)
            }
        },
        cleardata: function () {
            this.echo('Are you sure? This command will erase ALL Project Pegasus data stored inside localStorage. If you wish to proceed, type: clearAll');

        },
        clearall: function () {
            local.clear();
            this.echo('Succesfully cleared all localStorage data!');
            window.location = '../../main.html';
        },
        get: function (cname) {
            switch (cname) {
                case ('allscripts'):
                    $.get(url, {
                        key: local.get('key'),
                        software: software,
                        cmd: 'getAllScripts'
                    }, function (data) {
                        var nData = JSON.parse(data)
                        for (i = 0; i <= nData.length; i++) {
                            term.echo(nData[i].name + ' - ' + nData[i].author)
                        }
                    });
                    break
                case ('memberscripts'):
                    $.get(url, {
                        key: local.get('key'),
                        software: software,
                        cmd: 'getMemberScripts',
                        member: local.get('key')
                    }, function (data) {
                        term.echo(`1 = Is core script. 0 = Isn't core script`)
                        var nData = JSON.parse(data);
                        for (i = 1; i <= nData.length; i++) {
                            term.echo(`${nData[i].name} - ${nData[i].author} 
                            Script id: ${nData[i].id}
                            Core: ${nData[i].core}
                            Notes: ${nData[i].update_notes}
                            `)
                        }
                    });
                    break
                case ('allsoftware'):
                    $.get(url, {
                        key: local.get('key'),
                        software: software,
                        cmd: 'getAllSoftware'
                    }, function (data) {
                        var nData = JSON.parse(data)
                        for (i = 1; i <= nData.length; i++) {
                            term.echo(`${nData[i].name}
                            Type: ${nData[i].game}
                            Version: ${nData[i].version}
                            Update: ${nData[i].update}
                            VIP: ${nData[i].vip}
                            Availability: ${nData[i].availability}
                            Detection: ${nData[i].detection}
                            Protection: ${nData[i].protection}
                            `)
                        }
                    });
            }
        },
        toggle: function (script) {
            $.get(url, {
                key: local.get('key'),
                software: software,
                cmd: 'isScriptEnabled',
                name: script
            }, function (data) {
                if (data == 'true') {
                    $.get(url, {
                        key: local.get('key'),
                        software: software,
                        cmd: 'toggleScriptStatus',
                        name: script
                    }, function () {
                        term.echo(script + ' has been disabled.');
                    });
                } else {
                    $.get(url, {
                        key: local.get('key'),
                        software: software,
                        cmd: 'toggleScriptStatus',
                        name: script
                    }, function () {
                        term.echo(script + ' has been enabled.');
                    });
                }
            });
        },
        launch: function (gname) {
            if ($.isNumeric(gname)) {
                window.open(`steam://run/${gname}/`, '_blank')
                term.echo(`[[;yellow;]Launching custom game! ID: ${gname}]`)
            } else {
                var lgame = gname.toLowerCase();
                switch (lgame) {
                    case ('cs:go'):
                        window.open('steam://run/730/', '_blank');
                        term.echo('[[;yellow;]Launching Counter-Strike:Global Offensive!]')
                        break;
                    case ('csgo'):
                        window.open('steam://run/730/', '_blank');
                        term.echo('[[;yellow;]Launching Counter-Strike:Global Offensive!]')
                        break
                    case ('tf2'):
                        window.open('steam://run/440/', '_blank');
                        term.echo('[[;yellow;]Launching Team Fortress 2!]')
                        break
                    case ('dota2'):
                        window.open('steam://run/570/', '_blank');
                        term.echo('[[;yellow;]Launching Dota 2!]')
                        break
                    case ('css'):
                        window.open('steam://run/240/', '_blank');
                        term.echo('[[;yellow;]Launching Counter-Strike:Source!]')
                        break
                    default:
                        term.echo('[[;red;]Could not find the specified game!]')
                }
            }

        },
        lookup: function(steamid){
            $.get(`https://steamid.pro/lookup/${steamid}`, function(data){
                console.log(data);
            })
        },
        set: function(arg1, arg2){
            if (!arg1){
                term.echo('[[;red;]Expected at least 1 argument!]')
            }
            switch(arg1){
                case('color'):
                    if(!arg2){term.echo('[[;red;]Please specify a valid hex color!]')}
                    var reg=/^#([0-9a-f]{3}){1,2}$/i;
                    if (reg.test(arg2)){
                        $('.navbar').css('background-color', arg2)
                        $('.sidebar').css('background-color', arg2)
                        term.echo('[[;yellow;]Colors changed!]')
                    }
                    break;
                case('background'):
                    if(!arg2){term.echo('[[;red;]Please specify a valid URL!]');break;}

                    var pattern = /^https?:\/\/(?:[a-z\-]+\.)+[a-z]{2,6}(?:\/[^\/#?]+)+\.(?:jpe?g|gif|png)$/; 
                    if(pattern.test(arg2)){   
                        $('.content-wrapper').css('background-image', `url(${arg2})`);
                    }else{
                        term.echo('[[;red;]Invalid URL! Are you sure it is an image?]')
                    }
                    break;    
            }
        }
    }, {
        greetings: greetings.innerHTML+'\nType: help.\n',
        name: 'pegasus',
        height: 200,
        prompt: forums.username + ' - pegasus [[;red;]>>> ] ',
        checkArity: false
    });
});