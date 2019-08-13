var imgpath = window.document.location.href + "/Krpano/vtour/";

//0:小行星开场,1:特效,2:自动旋转,
//var datastring = "@ViewBag.Data";

$(function () {
    initPano();
});

var initPano = function () {
    //ajax异步后台获取数据
    var settings = {};
    //#region 待确认方法
    //感觉这两个不是自定义的效果
    settings["events[skin_events].onloadcomplete"] = "skin_showloading(false);";
    settings["onstart"] = '';
    //#endregion

    //#region 根据数据动态设置是否开始时弹出场景选择(后台Switch按钮)
    //if (data.scenechoose=='1') {
    //    settings["events[skin_events].onloadcomplete"] += "open_show_scene_thumb();";
    //}
    settings["events[skin_events].onloadcomplete"] += "open_show_scene_thumb();";
    //#endregion

    //#region 根据数据动态设置自动旋转和小行星开场(后台Switch按钮)
    //settings['skin_settings.littleplanetintro'] = data.littleplanet=="1" ? true : false;
    //settings['autorotate.enabled'] = data.autorotate == "1" ? true : false;

    settings['skin_settings.littleplanetintro'] = true;
    settings['autorotate.enabled'] = true;
    //#endregion

    //#region 根据数据动态设置是否显示多场景(后台Switch按钮)
    //if (data.scene_group.sceneGroups.length>0) {
    //     $(".vrshow_container_3_min .img_desc_container_min:eq(0) img").attr('src',data.scene_group.sceneGroups[0].imgPath);
    //}
    $(".vrshow_container_3_min .img_desc_container_min:eq(0) img").attr('src', '/Krpano/vtour/panos/IMG_1191-HDR_Panorama.tiles/thumb.jpg');
    //#endregion
    embedpano({
        swf: "/Krpano/vtour/tour.swf",
        xml: "/Krpano/vtour/tour.xml",
        target: "pano",
        html5: "auto",
        mobilescale: 1.0,
        passQueryParameters: true,
        vars: settings
    });
};


//Krpan调用初始化高级设置(包括特效设置、沙盘图、视角设置)
function initAdvancedSetting(scenename) {
    initeffect();
};

var initlittleplanet = function (scenename) {
    var krpano = document.getElementById('krpanoSWFObject');
    var little = datastring.split(",")[0];
    if (little === "true") {
        krpano.call('skin_setup_littleplanetintro(5,-90,90,"0.0");');
    }
};
var initeffect = function () {
    var krpano = document.getElementById('krpanoSWFObject');
    if (datastring === "") {
        alert("初始化没有设置效果!!!");
    } else {
        alert("加载效果...");
        //var effectstr = datastring.split(",")[1];
        var effectstr = "money";
        krpano.call('addEffect("' + effectstr + '","' + imgpath + '")');
    }
};
//热点初始化
var initHotspotSetting = function () {

};
//沙盘图初始化
var initSandTableSetting = function () {

};
//Krpan调用判断场景数量显示场景选择按钮
var showPanoBtns = function (sceneCount) {
    //    if (sceneCount > 1) {
    //    $(".vrshow_container_3_min .img_desc_container_min:eq(0)").show();
    //} else {
    //    $(".vrshow_container_3_min .img_desc_container_min:eq(0)").hide();
    //}
    $(".vrshow_container_3_min .img_desc_container_min:eq(0)").show();
    $("#panoBtns").show();
};
var save = function () {
    var formData = $("#test").serializeArray();
    $.ajax({
        type: "POST",
        dataType: 'json',
        url: "/Home/Save",
        data: formData,
        success: function (result) {
            window.location.reload();
        }
    });
};

//#region 页面点击操作方法:是否进入VR、是否全屏、背景音乐控制、背景解说
//#region 是否进入VR
function showWebVR() {
    var krpano = document.getElementById('krpanoSWFObject');
    var webvr = krpano.get("webvr");
    webvr.entervr();
};
//#endregion

//#region 屏幕设置
function fullscreen(el) {
    if ($(el).hasClass('btn_fullscreen')) {
        launchFullScreen(document.getElementById('fullscreenid'));
        var krpano = document.getElementById('krpanoSWFObject');
        krpano.call("skin_showthumbs(false);");
    } else {
        exitFullscreen();
    }
    toggleFullscreenBtn(el);
};

function launchFullScreen(element) {
    if (element.requestFullscreen) {
        element.requestFullscreen();
    } else if (element.mozRequestFullScreen) {
        element.mozRequestFullScreen();
    } else if (element.webkitRequestFullscreen) {
        element.webkitRequestFullscreen();
    } else if (element.msRequestFullscreen) {
        element.msRequestFullscreen();
    }
};

function exitFullscreen() {
    if (document.exitFullscreen) {
        document.exitFullscreen();
    } else if (document.mozCancelFullScreen) {
        document.mozCancelFullScreen();
    } else if (document.webkitCancelFullScreen) {
        document.webkitCancelFullScreen();
    } else if (document.msExitFullscreen) {
        document.msExitFullscreen();
    }
};

function toggleFullscreenBtn(el) {
    if ($(el).hasClass("btn_fullscreen")) {
        $(el).removeClass("btn_fullscreen");
        $(el).addClass("btn_fullscreen_off");
    } else {
        $(el).removeClass("btn_fullscreen_off");
        $(el).addClass("btn_fullscreen");
    }
};


//#endregion
function showthumbs() {
    var krpano = document.getElementById('krpanoSWFObject');
    krpano.call("skin_showthumbs();");
};
//#endregion