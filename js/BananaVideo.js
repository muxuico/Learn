/******************************
 脚本功能：香蕉视频解锁无限次数
 软件版本：1.1.0
 下载地址：https://shrtm.nu/xjsp
 脚本作者：Muxui
 更新时间：2022-11-21
 使用声明：⚠️此脚本仅供学习与交流，
 请勿转载与贩卖！⚠️⚠️⚠️
 *******************************
 [rewrite_local]
 # > 会员
 https:\/\/.*\.*isw520.com url request-header X-Cookie-Auth:.+ request-header X-Cookie-Auth: 6162343563633037633463656162303034656636313732653537633262353337
 # > 去广告
 ^https?:\/\/.+\/(index|ucp\/index|vod\/(show|reqplay\/)|getGlobalData).+ url script-response-body https://raw.githubusercontent.com/muxuico/Learn/main/js/BananaVideo.js
 [mitm]
 hostname = *.isw520.com
 *******************************/

var body = $response.body;
var urlq = $request.url;
var objc = JSON.parse(body);

const config = '/getGloba';
const slider = 'com/index';
const ssuper = '/ucp/index';
const reshow = '/vod/show';
const replay = '/vod/reqp';

if (urlq.indexOf(config) != -1) {
    delete objc.data.adrows;
    delete objc.data.adgroups;
    delete objc.data.popuptext;
    delete objc.data.popuptext_v2;
    delete objc.data.iOS_adgroups;
    delete objc.data.popuptext_iOS;
    delete objc.data.Android_adgroups;
    delete objc.data.popuptext_Android;
    delete objc.data.app_launch_type_adshow;
    objc.data.app_launch_times_adshow = 0;
    body = JSON.stringify(objc);
}

if (urlq.indexOf(slider) != -1) {
    objc.data.v2sliderows = [
        {
            "title" : "WatchAss",
            "scene" : "web.url",
            "url" : "https:\/\/t.me\/",
            "pic" : "https:\/\/tva1.sinaimg.cn\/large\/4e4adffaly8gcy0w8p7gnj20n00n0q4k.jpg"
        }
    ];
    delete objc.data.sliderows;
    delete objc.data.pcsliderows;
    delete objc.data.mbsliderows;
    body = JSON.stringify(objc);
}

if (urlq.indexOf(ssuper) != -1) {
    objc.data.user = {
        "dueday" : "999999天后过期",
        "sysgid" : "101",
        "newmsg" : "1",
        "nickname" : "Muxui",
        "duetime" : "2999-09-28 09:09:09",
        "gids" : null,
        "mobi" : "86.18812011099",
        "gicon" : "V5",
        "avatar_url" : "https:\/\/muxui.com\/usr\/themes\/handsome\/assets\/img\/avatar.png",
        "goldcoin" : 1e6,
        "exampass" : 1,
        "gender" : 1,
        "uid" : "666666",
        "uniqkey" : "666666",
        "email" : "~1236868666",
        "isvip" : 1,
        "gid" : "17",
        "avatar" : "",
        "regtime" : "2021-11-09 09:18:00",
        "username" : "~1236868666"
    }
    objc.data.uinfo = {
        "goldcoin" : "1000000",
        "down_daily_remainders" : 1e6,
        "curr_group" : {
            "minup" : "1000000",
            "gicon" : "V101",
            "gid" : "101",
            "gname" : "尊贵VIP"
        },
        "minivod_play_daily_remainders" : 1e6,
        "minivod_down_daily_remainders" : 1e6,
        "next_upgrade_need" : 0,
        "play_daily_remainders" : 1e6,
        "next_group" : {
            "minup" : "2000000",
            "gicon" : "V102",
            "gid" : "102",
            "gname" : "禁止发言"
        }
    };
    body = JSON.stringify(objc);
}

if (urlq.indexOf(reshow) != -1) {
    objc.data.vodrow.isvip = 0;
    objc.data.vodrow.islimit = 0;
    objc.data.vodrow.islimitv3 = 0;
    body = JSON.stringify(objc);
}

if (urlq.indexOf(replay) != -1) {
    objc.retcode = 0;
    objc.errmsg = "";
    if (objc.data.hasOwnProperty('httpurl_preview')) {
        var httpurl = objc.data['httpurl_preview']['replace'](/m3u8\?300/g,'m3u8');
        objc.data['httpurl'] = httpurl;
        delete objc.data.httpurl_preview;
    }
    body = JSON.stringify(objc);
}

$done({
    body
});