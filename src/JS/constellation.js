/* 
    @title
        Project Pegasus
    @author
        d4nny - https://fantasy.cat/forums/index.php?members/d4nny.8927/
    @notes
        Be aware that some of these settings are be hardcoded. Unlike previous projects, this menu is quite complex. Therefore, do not change the code unless you know what you are doing.
*/

console.log('%c Welcome to Constellation! ', 'background: #444; color: #bada55; padding: 100px 300px; border-radius:2px; font-size: 30px');
window.setInterval(check_status, 2000);

function check_status(){
    game = constellation.game();
    $("#gameMenu").prop("hidden", true);
    if(game==null){
        console.warn('Constellation is not running!')
        $("#settings").hide();
        $("#gameMenu").prop("hidden", true);
        $("#gameMenu").prop("hidden", false);

    }else {
        $("#controlBtns").prop("hidden", false);
        $("#gameMenu").prop("hidden", true);
        $("#settings").show();
    }

}