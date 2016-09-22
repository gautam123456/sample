
;//PRODUCTION
$ROOT_URL = "https://storeapi.lookplex.com/ws/masnepservice";
$SER_URL = "https://storeapi.lookplex.com/ws/service";
$uploadPoint = "https://storeapi.lookplex.com/ws/server/uploads/";
$domain = "lookplex.com";
$ratecardnotrenderd = true;
$storephotodnotrenderd = true;
$reviewnotrenderd = true;
$mapnotrenderd = true;
$lat = 28.60659;
$log = 77.29368;
$flag = true;
var AuthStates = {
    google: null,
    facebook: null
};
$user =  {
    displayName:null,
    image:null,
    platform:null,
    token:"",
    fbid:"",
    gpid:"",
    loginName:null
};


$(document).ready(function(){
    $('[data-toggle="tooltip"]').tooltip();
    $(this).scrollTop(0);
    $('#otp').on('hidden.bs.modal', function () {
        $progress=0;
        $("#dd").val("");
        $("#tt").val("");
        $(".cm1").val("");
        $("#mn").val("");
        $(".bookcontents").removeClass("showing");
        $("#backbook").hide();
        $("#bd").addClass("hidden");
    })
    $.ajax({
        url:$ROOT_URL+"/isloggedinnew",
        type:"GET",
        dataType:'json',
        cache:false,
        xhrFields: {
            withCredentials: true
        },
        success:function(data){
            $user.loginName= data.name;
            render_umenu();
        },
        error:function(data){
            console.log("error "+data);
            $user.loginName = null;
        }
    });
});
function facebookLogin(){
    $("#login").modal("hide");
    FB.login(function(response) {
        if (response.authResponse) {
            var access_token =   FB.getAuthResponse()['accessToken'];
            console.log('Welcome!  Fetching your information.... ');
            FB.api('/me?fields=id,name,picture,gender,email', function(response) {
                $user.fbidRequest=response.id;
                $user.token=access_token;
                $user.platform="facebook";
                $user.displayName=response.name;
                saveCust();
            });
        } else {
            console.log('User cancelled login or did not fully authorize.');
        }
    },{scope: 'email'});

}
$(document).ready(function(e) {
    $(document).keydown(function(e) {
        if(e.which==13){//enter
            if(($("#otp").data('bs.modal') || {}).isShown){
                $("#nextbook").click();
            }
        }
    })

    $(document).on('click',"#headersearch", function() {
        $(".categories-list").slideUp();
        if($(".location-suggestion").text() && $("#headersearch").length>2){
            $(".location-suggestion").slideDown();
        }
    });

    $(document).on('click', "button.login-btn",function(){
        if($(this).attr('id') == "facebook"){
            facebookLogin();
        }
    });
    /******** TOP-MENU NAVIGATION ***********************/
    $(document).on("click",".top-menu>a",function(e) {
        e.preventDefault();
        if($(this).attr("data-target") == "#login"){
            showModal("#login");
        }
        else if($(this).attr("data-target") == "#hiw"){
            if($('.how-it-works').is(':visible')) {
                $(".how-it-works").slideUp();
            }else{
                new HowItWorks().render();
                $(".how-it-works").slideDown();
            }
        }
        else if($(this).attr("data-target") == "#faq"){
            showModal("#faq");
        }else if($(this).attr("data-target") == "#freelisting"){
            window.location = "#/listing";
            return true;
        }else if($(this).attr("data-target") == "#logout"){
            new TopAccMenu().show_menu();
        }
    });


    function showModal(e){
        if(!$(e).length>0){
            $.get("templates/login-signup-modal.txt",
                function(data,status,jqXhr){$("body").prepend(data);$(e).modal("show");}
            );
        }
        else{
            $(e).modal("show");
        }
    }

    $(document).on("click",".close",function(){
        $(".how-it-works").slideUp();
    });



    $(".faq-menu>li").click(function(e) {
        $(".faq-menu>li").removeClass("active");
        $(this).addClass("active");
        //alert($(this).html());
    });

    /****
     MODAL

     ***/
    $(".modal-inner-link").click(function(e) {
        $to = $(this).attr("data-target")

        if($to == "#signup"){
            $($to).modal("toggle");
            $("#login").modal("toggle");
        }
        else{
            $($to).modal("toggle");
            $("#signup").modal("toggle");
        }
    });
    /******
     PARLOR
     ******/
    $(".nav-list>h4").click(function(e) {
        $(".nav-list>h4.active").removeClass("active");
        $(".nav-contents>div.active").removeClass("active").fadeOut();

        $(this).addClass("active");
        $to = $(this).attr("data-to");
        if($to == "rate-card"){
            $(".nav-contents>div.rate-card").addClass("active").fadeIn();
        }
        else if($to == "photos"){
            $(".nav-contents>div.photos").addClass("active").fadeIn();
        }
        else if($to == "reviews"){
            $(".nav-contents>div.comments").addClass("active").fadeIn();
        }
        else{
            $(".nav-contents>div.professionals").addClass("active").fadeIn();
        }
    });

    $(document).on('hover',".stars>i",function(e) {

            $data_value = $(this).attr("data-value");
            $stars = $(this).parent().find("i");
            $i = 0 ;
            while($data_value>0){
                $stars.eq($i).addClass("fa-star-hover");
                $data_value--;
                $i++;
            }
        },
        function(e){
            $(this).parent().find("i").removeClass("fa-star-hover");
        }
    );
    $(".screen-menu-rate").click(function(e) {
        $(".nav-list>h4").eq(3).click();
    });

    $(document).on("click","#imagebelt",function(e){
        $(e.currentTarget).empty();
        if($flag){
            $(e.currentTarget).append("Show imagery &nbsp;&nbsp;<i class=\"fa fa-angle-double-up fa-lg\" style=\"color: #fff\"></i>");
            $('#indicator').slideUp();
            $(e.currentTarget).animate({bottom: '15px'});

            $flag=false;
        }else{
            $(e.currentTarget).append("Hide imagery &nbsp;&nbsp;<i class=\"fa fa-angle-double-down fa-lg\" style=\"color: #fff\"></i>");
            $('#indicator').slideDown();
            $(e.currentTarget).animate({bottom: '108px'});
            $flag=true;
        }
    });
    $(document).on({
        click : function(e){
            showOverlay(false);
            $(".location-suggestion").fadeOut();
            $(".categories-list").slideDown();
            $(".search-bar").addClass('attop');
            e.stopPropagation();

        },
        focusin : function(e){
            showOverlay(false);
            $(".location-suggestion").fadeOut();
            $(".categories-list").slideDown();
            $(".search-bar").addClass('attop');
            e.stopPropagation();

        }
    },"input[name=service]");

    $(document).on({
        click : function(){
            showOverlay(false);
            $(".search-suggestion").fadeOut();
            $(".search-list").slideDown();
            $(".search-bar").addClass('attop');
            e.stopPropagation();

        }
        ,
        focusin : function(){
            showOverlay(false);
            $(".search-suggestion").fadeOut();
            $(".search-list").slideDown();
            $(".search-bar").addClass('attop');
            e.stopPropagation();
        }
    },"button[name=searchtype]");

    $(document).on({
        focusin : function(){
            $('html, body').animate({scrollTop:300},500);
        }
    },".search-bar:not(.search-bar-top)");


    /******************
     FORM HANDLER
     ********************/

    $(document).on('click','.checkbox-btn',function(){
        $(this).toggleClass('btn-default').toggleClass('btn-primary');
        $y = $(this).text();
        $z = $(this).find('input[type=hidden]');
        if($z.attr('name') == 'et'|| $z.attr('name') == 'hl' ){$z.toggleClass('checked');}
        if($z.attr('name') == 'brand'){$('input[name=brand]').removeClass('checked');$z.toggleClass('checked');}
    });

    $(document).on('click','.overlay',
        function(){
            $(".location-suggestion").fadeOut();
            $(".categories-list").fadeOut();
            $(".search-list").fadeOut();
            $(this).fadeOut(function(){
                $(".search-bar").removeClass('attop');
            });
            $(".a_dropdown").addClass('hidden');
        }
    );

    $.ajaxSetup({ cache: true });
    $.getScript('https://connect.facebook.net/en_US/sdk.js', function(){
        // console.log("----------------------------------Inside Login Status-----");
        FB.init({
            appId: '793762427404557',
            version: 'v2.3',
            cookie:true,
            xfbml:true
        });
        FB.getLoginStatus(function(response) {
            AuthStates.facebook = response;
            chooseAuthProvider();
        });
    });



});
function clearUser(){
    $user.displayName = null;
    $user.image = null;
    $user.platform = null;
    $user.token = null;
    $user.gpid = null;
    $user.fbid = null;
}
function onSignInCallback(authResult) {
    if(!$user.displayName){
        console.log($user.displayName);
        console.log(authResult);
        delete authResult['g-oauth-window'];
        AuthStates.google = authResult;
        console.log(authResult);
        $user.token = authResult.access_token;
        chooseAuthProvider();
    }

}
function chooseAuthProvider() {
    console.log(AuthStates);
    if (AuthStates.google || AuthStates.facebook) {
        if (AuthStates.google['access_token']) {
            console.log( AuthStates.google['access_token']);
            gapi.client.load('plus', 'v1', apiClientLoaded);
        } else if (AuthStates.facebook) {
            if (AuthStates.facebook.status === 'connected') {
                FB.api('/me?fields=id,name,picture,gender,email', function(authResponse) {
                    $user.displayName = authResponse.name;
                    $user.image = authResponse.picture.data.url;
                    $user.platform = "facebook";
                    render_umenu();
                    $('#discard').click();
                });
            }
        } else {
            // Not signed in with anyone, wait until the user chooses a social provider.
            //console.log("not signed in");
        }
        $(document).find("button.close")[0].click();
    }
}
function apiClientLoaded() {
    gapi.client.plus.people.get({userId: 'me'}).execute(handleResponse);

}
function handleResponse(resp) {
    $user.displayName = resp.displayName;
    $user.image = resp.image.url;
    $user.platform = "gplus";
    $user.token = AuthStates.google['access_token'];
    $user.gpid=resp.result.id;
    delete $user.fbid;
    console.log($user);
    saveCust();
    $user.displayName=resp.displayName;
    render_umenu();
    $('#discard').click();
}
function render_umenu(){
    if($user.displayName){
        var a_top=new TopAccMenu();
        a_top.render();
    }
    else{
        $(".top-menu>a[data-target=#logout]").attr({"data-target":"#login"}).html("Log In");
    }
}

// GLOBAL FUNCTIONS
var categoryParser=function(categoryList){
    switch (categoryList){
        case "sp": return "Spa-1";
        case "sa": return "Salon-2";
        case "gy": return "Gym-3";
        case "bp": return "Beauty Parlor-4";
        case "bph": return "Beauty Parlor at Home-5";
        case "skc": return "Skin Care-6";
        case "slc": return "Slimming Center-7";
        case "pbm": return "Party & Bridal Makeup-8";
        case "dt": return "Dietician-9";
        case "ya": return "Yoga & Aerobics-10";
        case "mp": return "Beauty Parlor-11";
        case "na": return "Nail Art-12";
        case "bpp": return "Body Piercing-13";
        case "md": return "Mehendi-13";
        case "ot": return "Others-14";
    }
}
var timeParser=function(t){
    var removePreZero = function(e){
        return e.substring(1);
    };
    var addColon = function(e){
        return e.substring(0,2)+":"+e.substring(2);
    };
    if(t.indexOf('am')>0 || t.indexOf('pm')>0){
        var a = t.split("-")[0];
        var b = t.split("-")[1];
        return removePreZero(addColon(a))+"-"+removePreZero(addColon(b));
    }
    else{
        return t;
    }
}
String.prototype.cFL = function() {
    return this.charAt(0).toUpperCase() + this.slice(1);
}
function rcp(str){
    var n = str.split(',').length;
    while(n>1){
        str = str.replace(',',' &#8226; ');
        n--;
    }
    return str.replace("sp","Spa").replace("sa","Salon").replace("gy","Gym").replace("bpp","Body piercing").replace("bp","Beauty Parlour").replace("bph","Beauty Parlour At Home")
        .replace("skc","Skin Care").replace("slc","Slimming Center").replace("pbm","Party & Bridal Makeup").replace("dt","Dietician")
        .replace("ya","Yoga & Aerobics").replace("na","Nail Art").replace("md","Mehendi").replace("tt","Tattoo").replace("ot","Others");
}
function highlight(target){
    return "<strong>"+target+"</strong>";
}
function rt(str){
    if(str == undefined || str =="" || str == "null to null" || str == null || str.indexOf("OFF")!=-1 ){
        return "Closed";
    }
    $time=str.replace("am"," AM").replace("pm"," PM").replace("-","  to  ").split("");
    $time[15]=':'+$time[15];
    $time[2]=":"+$time[2];
    return $time.join("");
}

function saveCust(){
    return $.ajax({
        url:$ROOT_URL+"/saveCust",
        type:'POST',
        contentType: 'application/x-www-form-urlencoded',
        data:$user,
        xhrFields: {
            withCredentials: true
        },
        parse:function(response, options){
        },
        success:function(response,textStatus,xhr){
            render_umenu();

            location.reload();
        }
    }).fail(function(data){
        console.log(data);
    });


}
function notifications(time){
    var date = new Date();
    var notification = '';
    var times = time + '';
    var closingHour = 0;
    if(!(times.indexOf('OFF')>=0)){
        var opentime = new Date();
        opentime.setHours(time.substr(0,2));
        opentime.setMinutes(time.substr(2,2));
        var closetime = new Date();
        var closinghour = parseInt(time.substr(7,2))+12;
        closetime.setHours(closinghour);
        closetime.setMinutes(time.substr(9,2));
        closingHour = closetime.getHours();
        if(time.substr(11,2).toLowerCase() == 'am'){
            console.log(time.substr(9,2)+"time.substr(9,2)")
            if(time.substr(7,2) == '12'){
                closetime.setHours(23);
                closetime.setMinutes(59);
                closingHour = 23;
                closetime.setDate(date.getDate());
            }else{
                closetime.setHours(closetime.getHours() + 12);
                closingHour = closinghour + 24;
            }
        }
        if(date < opentime){
            notification = "Opening in &nbsp; <b>" + parseInt((opentime - date)/1000/60/60) + " Hours " + parseInt(((opentime - date)/1000/60)%60) + " Mins</b>";
        }else if(date >= opentime){
            if(date > closetime){
                console.log("date > closetime");
                notification = "Closed for Today";
            }else if(date <= closetime){
                console.log("date <= closetime");
                if((closingHour - date.getHours())<1){
                    if(closetime.getMinutes()>date.getMinutes()){
                        notification = "Closing in next &nbsp;<b>" + parseInt((closetime - date)/1000/60/60)+ " Hours " + parseInt(((closetime - date)/1000/60)%60) + " Mins</b>" ;
                    }else{
                        notification = "Closed for Today";
                    }
                }else{
                    notification = "Open for next &nbsp;<b>" + parseInt((closetime - date)/1000/60/60) + " Hours " + parseInt(((closetime - date)/1000/60)%60) + " Mins</b>";
                }
            }
        }else if(date.getHours() == opentime.getHours()){
            notification = "Open Now";
        }
    }else{
        notification = "Closed Today";
    }
    return notification;
}
$(document).on('click', '#dd' ,function(e) {
    $("#datelist").show();
    e.stopPropagation();
});
$(document).on('click', '#tt' ,function(e) {
    $("#time").show();
    e.stopPropagation();
});
// $(document).on('click', '', function() {
//   $(".popover").hide();
// });

$(window).click(function(e) {
    $("#datelist").hide();
    $("#time").hide();
    $(".categories-list").hide();
    $(".location-suggestion").hide();
    $("#typeoptions").hide();
    // console.log(e.target.id);
    // if(e.target.id!="tooltipreview"){ $(".popover").hide(); }
    $(".popover").hide();
    $("#time").hide();
    // alert("hide time");
});
$(document).on("click", "#tooltipreview",function(e) {
    e.preventDefault();
    e.stopPropagation();
});
$progress=0;
$booking={
    phone:"",
    storename:"",
    address:''
};
$bdatas={};
function clickedondate(e) {
    console.log(e);
    $booking.date=e;//$(e.currentTarget).html();
    $("#dd").val($booking.date);
    $("#datelist").hide();
}
$(document).on('click',"#time a",function (e) { $booking.time=$(this).html(); $("#tt").val($booking.time);   e.preventDefault();})
$(document).on('click',"#nextbook",function () {
    if($progress<3){
        $progress++;
        console.log($progress);
        if($("#dd").val()=="" || $("#tt").val()==""){//check if entered booking date and time
            alert("Please enter both mobile number and appointment time!");
            $progress--;
            return false;
        }
        if($progress==2 ){//check if entered mobile number
            $booking.phone=$("#mn").val();
            if($booking.phone=="" ){
                $progress--;
                alert("Please enter a valid phone number!");
                return false;
            }
            else{
                $("#mn2").val($booking.phone);
            }
            //if OTP success
            //show lastpage
            $bdatas = {storeguid: $qo.storeguid, storeid:$qo.storeID,mobile: $booking.phone, datetime:$booking.date + " - " +$booking.time};
            console.log($bdatas);
            getOTP($bdatas);

        }
        if($progress==3 ){
            this.otpver=false;
            if(collectNVerifyOTP()){
                console.log($bdatas);
                $(".header-title>h3").eq(3).html("Please wait, confirming your request..");
                $.ajax({
                    data:$bdatas,
                    type:'POST',
                    cache : false,
                    url:$ROOT_URL+"/sendBookingAck",
                    xhrFields: {
                        withCredentials: true
                    },
                    beforeSend:function () {
                        $("#booked-storename").html("<center><i class='fa fa-refresh fa-spin fa-2x fa-fw'></i></center>");
                    },
                    success:function(e) {
                        if(e=="OTPNOTVERIFIED"){
                            alert("WRONG OTP");
                            $progress--; afterProgress($progress);
                        }
                        else{
                            $booking.storename=$booking.storename?$booking.storename:$("#storename div:first-child").html();
                            $booking.address=$booking.address?$booking.address:$("#storeaddress").html();
                            $("#booked-storename").html($booking.storename);
                            $("#booked-address").html($booking.address);
                            $("#booked-date").html("Date : "+$booking.date);
                            $("#booked-time").html("Time : "+$booking.time);
                            $("#booked-address").find("#gomap").remove();
                            $("#backbook").hide();
                            $(".header-title>h3").eq(3).html("Booking Details");
                            $("#bd").removeClass("hidden");
                        }

                    },
                    error:function() {
                        alert("WRONG OTP");
                        return $progress--;
                    }
                });
            }
            else{
                alert("WRONG OTP");
                return $progress--;
            }



        }
        afterProgress($progress);
    }


    $("#en").click(function(e) {
        $progress=1; afterProgress($progress);
    })
    $(".cm1").on('keyup', function() {
        $(this).next().focus();
    })
    function getOTP() {
        $res=false;
        $.ajax({
            data:$bdatas,
            type:'POST',
            cache : false,
            url:$ROOT_URL+"/sendBookingOtp",
            xhrFields: {
                withCredentials: true
            },
            success:function(r) {
                $bdatas.lkey=r;
                console.log($bdatas);
                $res=false;
            },
            error:function () {
                console.log("error");
                $res=false;
            }
        });
        return $res;

    }
    function collectNVerifyOTP() {
        var inputs=$(".cm1");
        var otp="";
        for (var i = 0; i < inputs.length; i++) {
            otp+=""+inputs.eq(i).val();
        }
        if(otp.length==6){ $bdatas.otp=otp; return true;  }
        else {return false;}
    }
});
$(document).on('click',"#backbook",function () {
    console.log($progress);
    if($progress>0){ $progress--; afterProgress($progress); }
});

function afterProgress($progress) {

    console.log($progress);

    $(".bookcontents").removeClass("showing");
    $(".bookcontents").eq($progress).addClass("showing");
    $(".header-title h3").hide();
    $(".header-title h3").eq($progress).show();
    $("#bar").animate({width:($progress+1)*25+"%"},500);

    $("#footerbtn>div").hide();
    $("#footerbtn>div").eq($progress).show();

    if($progress>0){$("#backbook").show();}
    else{$("#backbook").hide();}
}

$(document).on('click','#closebook',function() {
    $(".header-title h3").hide();
    $(".bookcontents").removeClass("showing");
    $("#backbook").hide();
    $("#footerbtn>div").hide();
    $("#footerbtn>div").eq(0).show();
    $(".header-title h3").eq(0).show();
    $progress=0;
    $("#bar").animate({width:'25%'});

});
$(document).on('click','#closebook2',function() {
    $(".header-title h3").hide();
    $(".bookcontents").removeClass("showing");
    $("#backbook").hide();
    $("#footerbtn>div").hide();
    $("#footerbtn>div").eq(0).show();
    $(".header-title h3").eq(0).show();
    $progress=0;
    $("#bar").animate({width:'25%'});
});


$('#datelist').click(function(event){    event.stopPropagation(); });

$(document).on('click',".imask", function() {
    $(this).remove();
    $("#googleMap").css('z-index',1);
});
