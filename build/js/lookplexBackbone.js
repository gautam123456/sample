/**
 GLOBAL VARIABLES
 **/
$qo={};
$fixed = false;
$rate=0;
$searchby = 1;
var timeoutId = false;

$booking={
    servicetype:"",
    date:"",
    time:"",
    name:"",
    number:"",
    otp:"",
    lkey:"",
    storename:"",
    storeaddress:""
};

function resetGlobalVariables(){
    $qo={
        blockname:"",
        blockid:"",
        blockguid:"",
        catname:"",
        catid:"",
        sortby:"",
        brandname:"",
        brandid:1,
        storename:"",
        storeID:"",
        storeguid:"",
        gender:"",
        morefilters:"",
        aminities:[],
        isFiltered:0,
        latitude:"",
        longitude:"",
        cityname:"",
        cityid:"",
        cityguid:"",
        ratecards:"",
        storephotos:"",
        reviews:"",
        pagesize:10,
        numberofpages:"",
        currentpage:1,
        count:0
    };
};
resetGlobalVariables();

function showOverlay(s){
    $(".overlay").show();
    if(s==true){$(".circle-outer").show();}
    else{$(".circle-outer").hide();}
}

function writeallvariables(){
    /*console.log("block-name: "+$qo.blockname+"\n blockid: "+$qo.blockid+"\n blockguid: "+$qo.blockguid+"\n catid: "+$qo.catid+"\n gender: "+$qo.gender+"\n brandname: "+$qo.brandname+"\n morefilters: "+$qo.morefilters);*/
}

function showFilters(){

}

$('#nbooking').click(function(e){
    value = parseInt($(e.currentTarget).val());
    console.log("value-------------"+value);
    switch (value){
        case 1:
            console.log("inside case 1 ---------------------------------------");
            $booking.date = $('#datepickerr').val();
            $booking.time = $('#time').val();
            if($booking.date == "" || $booking.time == ""){
                console.log("inside case 1 -----------if----------------------------");
                $('#otpmsg').removeClass('hidden');
            }else {
                console.log("inside case 1 -----------else----------------------------");
                $('#otpmsg').addClass('hidden');
                new OTPDetails().render();
                $(e.currentTarget).val(parseInt(value)+1);
                $('.num'+ (parseInt(value)+1)).removeClass('inactivestep').addClass('activestep');
            }
            break;
        case 2:
            $booking.number = $('#mobile').val();
            if($booking.number.length != 10){
                $('#otpmsg').addClass("hidden");
                $('#mobilemsg').removeClass('hidden');
            }else{
                $datas = {storeguid: $qo.storeguid, storeid:$qo.storeID,mobile: $booking.number, offer:"25",datetime:$booking.date + " - " +$booking.time};
                $.ajax({
                    url:$ROOT_URL+"/sendBookingOtp",
                    type:'POST',
                    async:false,
                    contentType: 'application/x-www-form-urlencoded',
                    data:$datas,
                    xhrFields: {
                        withCredentials: true
                    },
                    dataType:'text',
                    success:function(response){
                        $booking.lkey = response;
                        $(e.currentTarget).val(parseInt(value)+1);
                        $('.num'+ (parseInt(value)+1)).removeClass('inactivestep').addClass('activestep');
                        $('#otpmsg').addClass('hidden');
                        new OTPConfirm().render();
                        $('#nbooking').empty().append('<span>Submit</span>');
                    },
                    error:function(msg){
                        $('#otpmsg').text("Something went wrong no OTP generated").removeClass('hidden');
                    }
                });
            }
            break;
        case 3:
            $('#otpmsg').addClass("hidden");
            $('#mobilemsg').addClass('hidden');
            $booking.otp = $('#otpp').val();
            if($booking.otp.length != 6){
                $('#otperror').removeClass('hidden');
            }else{
                $datas = { storeguid: $qo.storeguid, storeid:$qo.storeID,mobile: $booking.number,otp:$booking.otp,lkey:$booking.lkey};
                $.ajax({
                    url:$ROOT_URL+"/sendBookingAck",
                    type:'POST',
                    async:false,
                    contentType: 'application/x-www-form-urlencoded',
                    data:$datas,
                    dataType:'text',
                    xhrFields: {
                        withCredentials: true
                    },
                    success:function(response){
                        if(response.toString().toUpperCase() == "OTPVERIFIED"){
                            new OTPSuccess({booking:$booking}).render();
                            $(e.currentTarget).val(parseInt(value)+1);
                            $('.num'+ (parseInt(value)+1)).removeClass('inactivestep').addClass('activestep');
                            $('#otperror').addClass('hidden');
                            $('#otpmsg').addClass('hidden');
                            $('#nbooking').empty().append('<span>Close</span>');
                            $('#cbooking').empty().append('<span>Book again</span>');
                        }else{
                            $('#otpmsg').text("Wrong OTP enetered, please provide correct OTP").removeClass('hidden');
                        }

                    },
                    error:function(msg){
                        $('#otpmsg').text("Something went wrong,please provide correct OTP").removeClass('hidden');
                    }
                });
            }
            break;
        case 4:
            $("#otp").modal("toggle");
            $('#cbooking').empty().append('<span>Book again</span>');
            break;
        default:
            $("#otp").modal("toggle");
            $('#cbooking').empty().append('<span>Book again</span>');
    }
});

$('#cbooking').click(function(e){
    $('.num1').removeClass('inactivestep').addClass('activestep');
    $('.num2').removeClass('activestep').addClass('inactivestep');
    $('.num3').removeClass('activestep').addClass('inactivestep');
    $('.num4').removeClass('activestep').addClass('inactivestep');
    $('#nbooking').val(1);
    $('#nbooking').empty().append('<span>Next</span>');
    $booking.date = "";
    $booking.otp = "";
    $booking.time = "";
    $booking.number = "";
    $booking.servicetype = "";
    $booking.lkey = "";
    new OTPSlot().render();
    $('#cbooking').empty().append('<span>Clear</span>');
    $('#otpmsg').addClass('hidden');
    $('#datepickerr').click();
    $('#pickslot').click();
});

function uncheckFilters(){
    $(".f-menu[name=gender]").prop('checked', false);
    $(".f-menu[name=sort]").prop('checked', false);
    $(".f-menu[name=more-filters]").prop('checked', false);
    $(".weekdays label input[type=checkbox]").prop('checked', false);
}
//********SUGGESTION CLICK HANDLER*/

$(document).on("click",".location-item",function(e) {
    $qo.blockname=$(this).text();
    $qo.blockguid=$(this).attr("data-l-guid").split('-')[1];
    $qo.blockid=$(this).attr("data-l-guid").split('-')[0];
    $(document).find("input[name=location]").val($qo.blockname).attr("data-val",$qo.blockid+"-"+$qo.blockguid);
    $(document).find("input[name=service]").click();
    $(".location-list").slideUp();
    e.stopPropagation();
});

$(document).on("click",".categories-list>.list-group-item",function(e){
    $(".location-list").slideUp();
    $qo.catname=$(this).text();
    $qo.catid=$(this).attr("data-catid");
    $(document).find("input[name=service]").val($qo.catname).attr("data-val",$qo.catid);
    $(".categories-list").slideUp();
    $(".search-list").slideUp();
    e.stopPropagation();
});

$(document).on("click",".search-bar>a",function(e){
    e.preventDefault();
    if($qo.blockguid != "" && $qo.catid != ""){
        $(".search-bar").removeClass('attop');
        router.navigate("#/stores/"+$qo.blockname+"-"+$qo.blockid+"-"+$qo.blockguid+"-"+$qo.catname+"-"+$qo.catid+"-"+1,{trigger:true});
    }
    else if($qo.blockguid == "" && $searchby == 1){
        $(".location-suggestion").html("<div class=\"list-group-item text-danger\" >please select a location</div>").slideDown();
    }else{
        $(".location-suggestion").html("<div class=\"list-group-item text-danger\" style='width: 970px'>please select store, brand</div>").slideDown();
    }
});

$(document).on("click",".search-bar>div>div .list-group-item.service",function(e){
    e.preventDefault();
    // alert("asdas");
    $qo.isFiltered=0;
    if($qo.blockguid != "" && $qo.catid != ""){
        $(".search-bar").removeClass('attop');
        router.navigate("#/stores/"+$qo.blockname+"-"+$qo.blockid+"-"+$qo.blockguid+"-"+$qo.catname+"-"+$qo.catid+"-"+1,{trigger:true});
    }
    else{
        if($qo.blockguid == "" && $searchby == 1){$(".location-suggestion").html("<div class=\"list-group-item text-danger\" >please select a location</div>").slideDown();	}
        console.log("error");
    }
});
//All common AJAX calls here......
function renderstoreItemView(askedpage){
    var stores = new StoreCollection({isFiltered:$qo.isFiltered});
    stores.fetch({
        data:$datas,
        contentType: 'application/x-www-form-urlencoded',
        type:'POST',
        beforeSend: function(){showOverlay(true);},
        dataType:'json',
        xhrFields: {
            withCredentials: true
        },
        parse:function(response, options){
        },
        success:function(response){
            var stores = response ;
            if(stores.get('count') == null || stores.get('count')<=0){
                $(".overlay").fadeOut();
                $('.search-result').html("<div class='col-md-12 noresult'><center><h3><i class=\"fa fa-exclamation-triangle\"></i> No Result Found.</h3></center></div>");
            }else{
                $qo.numberofpages = Math.ceil(stores.get('count')/$qo.pagesize);
                var storeItemView = new StoreItemView({stores: stores,qo:$qo});
                storeItemView.render();
                $(".overlay").fadeOut();
                $(".page").removeClass('activepage');
                $('#page' + askedpage).addClass('activepage');
                if(askedpage <= 1){
                    $('#prev').addClass('hidden');
                    $('#next').removeClass('hidden');
                }else if(askedpage >= $qo.numberofpages){
                    $('#next').addClass('hidden');
                    $('#prev').removeClass('hidden');
                }else{
                    $('#next').removeClass('hidden');
                    $('#prev').removeClass('hidden');
                }
            }
            $(".overlay").fadeOut();

        },
        error:function(){
            $(".overlay").fadeOut();
            $('.search-result').html("<div class='col-md-12 noresult'><center><h3><i class=\"fa fa-exclamation-triangle\"></i> No Result Found.</h3></center></div>");
        }
    });
}

function getRateCard($datas){
    var data;
    $.ajax({
        url:$ROOT_URL + "/getratecard",
        type:'POST',
        async:false,
        contentType: 'application/x-www-form-urlencoded',
        data:$datas,
        dataType:'json',
        parse:function(response, options){
        },
        success:function(response){
            data = response;
        },
        error:function(msg){
            console.log("Error " + JSON.stringify(msg));
        }
    });
    return data;
}

function getStorePhoto($datas){
    var data;
    $.ajax({
        url:$ROOT_URL + "/getstorephotos",
        type:'POST',
        async:false,
        contentType: 'application/x-www-form-urlencoded',
        data:$datas,
        dataType:'json',
        parse:function(response, options){
        },
        success:function(response){
            data = response;
        },
        error:function(msg){
            console.log("Error "+JSON.stringify(msg));
        }
    });
    return data;
}

function getStoreReview($datas){
    var data;
    $.ajax({
        url:$ROOT_URL + "/getReviewForStore",
        type:'POST',
        async:false,
        contentType: 'application/x-www-form-urlencoded',
        data:{storeguid: $qo.storeguid, storeid: $qo.storeID, lkey:''},
        dataType:'json',
        parse:function(response, options){
        },
        success:function(response){
            data = response;
        },
        error:function(msg){
            console.log("Error "+JSON.stringify(msg));
        }
    });
    return data;
}

function getStoreTrust($datas){
    var data;
    $.ajax({
        url:$ROOT_URL + "/getstoredetails",
        type:'POST',
        async:false,
        contentType: 'application/x-www-form-urlencoded',
        data:{ guid: $qo.storeguid, storeid: $qo.storeID },
        dataType:'json',
        parse:function(response, options){
        },
        success:function(response){
            data = response;
        },
        error:function(msg){
            console.log("Error"+JSON.stringify(msg));
        }
    });
    return data;
}
//
function saveReview(data,flag) {
    return $.ajax({
        url:$ROOT_URL + "/saveReview",
        type:'POST',
        async:false,
        contentType: 'application/x-www-form-urlencoded',
        data:data,
        xhrFields: {withCredentials: true},
        dataType:'text',
        parse:function(response, options){
        },
        success:function(response){
            data = response;
            $('#reviewerror').empty();
            $('#rateerror').empty();
            if(flag == 1) {
                $('#reviewerror').append("<center><div class=\"successmsg col-md-12\">ThankYou !! Review submitted successfully</div></center>");
                var reviewsView = new ReviewsView({reviews:getStoreReview($datas)});
                $('#store-reviews').append(reviewsView.render());
            }else{
                $('#rateerror').append("<center><div class=\"successmsg col-md-12\">ThankYou !! Rating submitted successfully</div></center>");
            }
        },
        error:function(msg){
          // console.log(msg);
          if(msg.status!=401){
            $('#reviewerror').empty().append("<center><div class=\"errormsg col-md-12\">Oh !! something went wrong, we can't take reviews for some time</div></center>");
          }
          else{
            $('#reviewerror').empty().append("<center><div class=\"errormsg col-md-12\">You need to log in first!</div>");
          }
        }
    });

    return data;
}

function saveFavourite(data) {
  return  $.ajax({
        url:$ROOT_URL + "/saveBookmark",
        type:'POST',
        contentType: 'application/x-www-form-urlencoded',
        data:data,
        xhrFields: {withCredentials: true},
        dataType:'text',
        parse:function(response, options){
        },
        success:function(response){
            data = response;
          },
        error:function(msg){
            console.log("------------Error in favourite save------------");
        }
    });
}
function deleteFavourite(data) {
    return $.ajax({
        url:$ROOT_URL + "/deleteBookmark",
        type:'POST',
        contentType: 'application/x-www-form-urlencoded',
        data:data,
        xhrFields: {withCredentials: true},
        dataType:'text',
        parse:function(response, options){
        },
        success:function(response){
            data = response;

        },
        error:function(msg){
            console.log("------------Error in favourite save------------");
        }
    });
}

function saveCheckin(data) {
    return $.ajax({
        url:$ROOT_URL + "/saveCheckin",
        type:'POST',
        contentType: 'application/x-www-form-urlencoded',
        data:data,
        xhrFields: {withCredentials: true},
        dataType:'text',
        parse:function(response, options){
        },
        success:function(response){
            data = response;

        },
        error:function(msg){
            console.log("------------Error in Chekin save------------")
        }
    });
}
function deleteCheckin(data) {
  return  $.ajax({
        url:$ROOT_URL + "/deleteCheckin",
        type:'POST',
        contentType: 'application/x-www-form-urlencoded',
        data:data,
        xhrFields: {withCredentials: true},
        dataType:'text',
        parse:function(response, options){
        },
        success:function(response){
            data = response;

        },
        error:function(msg){
            console.log("------------Error in Chekin save------------")
        }
    });
}

function getLocationSuggestion($query_location){
  $query_location=escape($query_location);
  return $.ajax({
        type:"POST",
        url: $ROOT_URL + "/getLocation",
        cache:false,
        data:"location=" + $query_location,
        dataType:"json",
        xhrFields: {
            withCredentials: true
        },
        beforeSend: function(){
            $(".search-bar-spinner").css("display","inline-block");
        },
        success:function(data,status,jqXhr){
            $(".search-bar-spinner").fadeOut();
            $location_suggestion = "";
            if(data.length>0){$.each(data,function(index,element){
                $location_suggestion += "<div class=\"list-group-item location-item\" style=\"\" data-l-guid=\""+element.id+"-"+element.guid+"\">"+"<i class=\"fa mm marker fa-lg no-text-indent\"></i><span class=\"locationlabel\">"+element.locationName+"</span></div>";
            });
                $(".location-suggestion").html($location_suggestion).slideDown();
            }else{
                $(".location-suggestion").html("<div class=\"list-group-item text-danger\" >No suggesstions found.</div>").slideDown();
                $(".search-bar-spinner").fadeOut();
            }
        }
    }).fail(function(){
        $(".location-suggestion").html("<div class=\"list-group-item text-danger\" >No suggesstions found.</div>").slideDown();
        $(".search-bar-spinner").fadeOut();
        console.log('failed');
    })
}

function getStoreSuggestion($query_location,width){
    $query_location=escape($query_location);
    return $.ajax({
        type:"POST",
        url: $ROOT_URL + "/searchStoreLite",
        cache:false,
        data:"storehint=" + $query_location,
        dataType:"json",
        xhrFields: {
            withCredentials: true
        },
        beforeSend: function(){
            $(".search-bar-spinner2").css("display","inline-block");
        },
        success:function(data,status,jqXhr){
            $(".search-bar-spinner").fadeOut();
            $location_suggestion = "";
            $address="";
            if(data.length>0){$.each(data,function(index,element){
                $address=element.address.split(",");
                if(element.count>0){
                    $location_suggestion += "<div class=\"list-group-item brand-item store1\" value=\""+element.storename+"\" data-l-guid=\""+element.brandID+"\">"+"<i class=\"fa marker store ms fa-lg \"></i><span class=\"margin-left-5\" style='font-weight: bolder'> "+element.storename+"  &nbsp;</span><span style='font-size: 10px;border: 1px solid #f2f2f2;padding: 3px 5px;border-radius: 2px'>"+element.count+" &nbsp;Branches"+"</span></div>";
                }else{
                    $location_suggestion += "<div class=\"list-group-item store-item store1\" data-l-guid=\""+element.id+"-"+element.guid+"\">"+"<i class=\"fa marker store ms fa-lg \"></i><span class=\"margin-left-5\" style='font-weight: bolder'> "+element.storename+" , &nbsp;</span><span style='font-size: 10px'>"+$address[$address.length-2]+" , "+$address[$address.length-1]+"</span></div>";
                }

            });
                $(".location-suggestion").html($location_suggestion).slideDown();
            }else{
                $(".location-suggestion").html("<div class=\"list-group-item text-danger\">No suggesstions found.</div>").slideDown();
                $(".search-bar-spinner").fadeOut();
            }
            return data;
        }
    }).fail(function(){
        $(".location-suggestion").html("<div class=\"list-group-item text-danger\" >No suggesstions found.</div>").slideDown();
        $(".search-bar-spinner").fadeOut();
        console.log('failed');
    })
}

function logoutFromServer(){
   /* makeCorsRequest();*/
    //gautam

    return $.ajax({
        type:"GET",
        url: $ROOT_URL + "/custlogout",
        dataType:"text",
        xhrFields: {
            withCredentials: true
        },
        success:function(data){
            console.log("Logout" + JSON.stringify(data));
            location.reload();
        }
    }).fail(function(){
        console.log('failed');
    })
}

function template_loader(e,f,g,h){
    /*if(!$(document).find(f).length>0){*/
        $.ajax({
            url:e,
            type:'GET',
            dataType:'text',
            beforeSend: function(){
                showOverlay(true);
                var hsb = new HeaderSearchBar();
                hsb.render();
            },
            success:function(data){
                $temp = "<script type='text/template' id='"+f+"'>"+data+"</script>";
                $("body").append($temp);
                var template=_.template(data)({data:""});
                $(".main-container-top").html(template);
                $(".overlay").fadeOut();
                $('html, body').animate({scrollTop:0},1000);
                if(g != undefined){
                    this.postrender();
                }
                return true;
            },
            postrender:function(){
                $(document).find(g).append($(document).find(h).html());
            }
        });
} ;



/******
 MODELS
 ******/
var storesSet=Backbone.Model;
var defModel=Backbone.Model;
/*******
 COLLECTION
 *******/
var StoreCollection=Backbone.Model.extend({
    initialize:function(options){
        this.options = options;
    },
    url:function(){
        if(this.options.isFiltered==1){
            return $ROOT_URL+'/geftstores'
        }
        else{
            return $ROOT_URL+'/getstores'
        }
    },
    parse: function (response) {
        return response
    }
});

/*var StoreAttributeCollection=Backbone.Collection.extend({
    model:defModel,
    initialize:function(options){
        this.options = options;
    },
    url:function(){return this.options.href},
    parse:function(response){
        return response;
    }

});*/

/*var RateCardCollection = Backbone.Collection.extend({
    model:defModel,
    initialize:function(options){
        this.options = options;
    },
    url:function(){return this.options.href},
    parse:function(response){
        return response;
    }

})*/

var SponsoredCollection = Backbone.Model.extend({
    initialize:function(options){
        this.options = options;
    },
    url:function(){
        return $ROOT_URL+'/getsponsoredlistforAdvertisement'
    },
    parse: function (response) {
        return response
    }
});

var BrandStoreCollection = Backbone.Model.extend({
    initialize:function(options){
        this.options = options;
    },
    url:function(){
        return $ROOT_URL+'/getStoresForBrand'
    },
    parse: function (response) {
        return response
    }
});

/******
 VIEWS
 *******/
var ProfileView=Backbone.View.extend({
    el:'.main-container-top',
    events:{
        'click .user-profile-menu>label':'show_details'
    },
    initialize:function(){
        resetGlobalVariables();
    },
    render:function(){

        var temp;
        var that = this;
        if($("#user-profile-template").length>0){
            temp=_.template($("#user-profile-template").html());
            that.$el.html(temp).trigger("create");
        }
        else{
            $.ajax({
                url:" /templates/userprofile.html",
                type:'GET',
                processData:false,
                async:'false',
                success:function(data){
                    $("body").append(data);
                    temp=_.template($(document).find("#user-profile-template").html());
                    that.$el.html(temp).trigger("create");
                    $(document).scrollTop();
                    console.log("hello");
                }
            }).fail(function(data){
                console.log(data);
            });
        }
    },
    show_details:function(e){
        $(".overlay").fadeIn();
        var info;
        var data = {lkey:''};
        switch ($(e.currentTarget).attr("id")){
            case "user-menu-profile":{
                renderTemplate("user-profile-info",info);
                break;
            }
            case "user-menu-lookplex-journey":{
                info = getCustomerInfo("getCustomerTimeline",data);
                renderTemplate("user-journey",info);
                break;
            }
            case "user-menu-bookmarks":{
                info = getCustomerInfo("getCustomerBookmark",data);
                renderTemplate("user-bookmarks",info);
                break;
            }
            case "user-menu-ratings":{
                info = getCustomerInfo("getCustomerRecommend",data);
                renderTemplate("user-bookmarks",info);
                break;
            }
            case "user-menu-reviews":{
                info = getCustomerInfo("getCustomerReview",data);
                renderTemplate("user-reviews",info);
                break;
            }
            case "user-menu-checkins":{
                info = getCustomerInfo("getCustomerCheckin",data);
                renderTemplate("user-profile-info",info);
                break;
            }
        }
        $(".overlay").fadeOut();
    }
});

var UserProfileInfo = Backbone.View.extend({
    el:'.profile-content',
    initialize:function(options){
        this.options=options;
    },
    render:function(){
        var temp = _.template($("#"+this.options.template).html());
        var html = temp({data:this.options.data});
        this.$el.html(html).trigger("create");
    }
});
function renderTemplate(e,info){
    var temp;
    $.ajax({
            url:" /templates/"+e+".html",
            type:'GET',
            processData:false,
            success:function(data){
                $("body").append(data);
                new UserProfileInfo({template:e,data:info}).render();
            }
        }).fail(function(data){
            console.log(data);
        });
}
function getCustomerInfo(e,data){
    var info;
    $.ajax({
        url:$ROOT_URL+"/"+e,
        type:'POST',
        async:false,
        contentType: 'application/x-www-form-urlencoded',
        data:data,
        dataType:'json',
        xhrFields: {
            withCredentials: true
        },
        success:function(data){
           info = data;
        },
        error:function(msg){
            console.log(JSON.stringify(msg));
        }
    });
    return info;
}

function getSponsoredStores(sponsoredStores,currentPage){
    sponsoredStores.fetch({
        data:$datas,
        dataType:"json",
        type:'POST',
        beforeSend: function(){showOverlay(true);},
        success:function(sponsoredStores){
            $(".overlay").fadeOut();
            var sponsoredStoresView = new SponsoredStoreListView({sponsoredStores:sponsoredStores,qo:$qo,el:'.search-result'+currentPage});
            sponsoredStoresView.render();
            $qo.count = sponsoredStores.get('count');
            if(($qo.count/9) > currentPage){
                $('.loadmore').removeClass('hidden');
            }else{
                $('.loadmore').addClass('hidden');
            }
            // works only for Brand page...
            var urlImage;
            $.each(sponsoredStores.get('storeList'),function(index,data){
                urlImage = "url ("+data.coverUrl+") 0 0";
                return false;
            });
            $('#parlor-screen').css('background',urlImage);
        },
        error:function(model,e){
            console.log("Error : "+ e.responseText + e + JSON.stringify(e));
            $(".overlay").fadeOut();
        }
    });
}
var HomeView=Backbone.View.extend({
    el:'.main-container-top',
    events:{
        'mouseenter .buzzworthy':'expand',
        'mouseleave .buzzworthy':'shrink',
        'click #location':'location',
        'click #storename':'storename',
        'click .store-item':'storeselect',
        'click .brand-item':'brandselect',
        'focusin input[name=location]':'searchfocus',
        'keyup input[name=location]':'keyup',
        'click input[name=service]':'settabindex',
        'keyup input[name=service]':'keyupservice'
    },
    initialize:function(){
        resetGlobalVariables();
        _.bindAll(this, 'detect_scroll');
        $(window).scroll(this.detect_scroll);
        this.suggestionTimeout = null;
        this.queryOld = "hello";

        // console.log("asd");
    },
    settabindex:function(e) {
      this.tabindex=-1;
      // e.stopPropagation();
    },
    keyupservice:function(e) {
      var that=this;
      switch (e.which) {
        case 40://down
            $(".service").removeClass("hovered");
            if(this.tabindex<10 ){this.tabindex+=1;}
            else {   this.tabindex=0;    }
            $(".service:eq("+this.tabindex+")").toggleClass("hovered");
            console.log(this.tabindex);
          break;
      case 38://up

              $(".service").removeClass("hovered");
              if(this.tabindex>0){this.tabindex-=1;}
              else {   this.tabindex=10;    }
              $(".service:eq("+this.tabindex+")").toggleClass("hovered");
              console.log(this.tabindex);
          break;
        case 37:
          //left or right do nothing
          break;
        case 39:
        //left or right do nothing
          break;
      case 13://enter
            if(this.tabindex>-1){
              $(".service:eq("+this.tabindex+")").click(); this.tabindex=0;
            }
          break;
      default:
        break;

      }

    },
    render:function(){
        var temp;
        var that=this;
        if(!this.sponsorList){
          $.getJSON("/data/sponsors.json?v=1.0", function(data){
            that.sponsorList=data;

            if($("#home-template").length>0){
                temp=_.template($("#home-template").html());
                that.$el.html(temp({sponsors:that.sponsorList})).trigger("create");
            }
            else{
                $.ajax({
                    url:" /templates/homepage.html",
                    type:'GET',
                    processData:false,
                    success:function(data){
                        $("body").append(data);
                        temp=_.template($(document).find("#home-template").html());
                        that.$el.html(temp({sponsors:that.sponsorList})).trigger("create");
                        $(".page-header").removeClass("gray-bg");
                    }
                }).fail(function(data){
                    console.log(data);
                });
            }

          });



        }

        if($searchby == 2){
            $('#storename').click();
        }
    },
    expand:function(e){
        // $(e.currentTarget).animate({
        //     height: 170,
        //     margin: -5,
        //     width: 284
        // }, 300 );
    },
    shrink:function(e){
        // $(e.currentTarget).animate({
        //     height: 155,
        //     margin: 3,
        //     width: 268
        // }, 300 );
    },
    detect_scroll:function(){
        scroll = $(window).scrollTop();
        if(scroll >= 350 && scroll <= 450) {
            $('.close').click();
        }
    },
    location:function(){
        $searchby = 1;
        $('.list-group.location-suggestion').empty();
        $('input[name=location]').val('');
        $('input[name=location]').attr('placeholder','Enter area, landmark, colony')
        $('input[name=location]').parent().animate({ width: 511 }, 0);
        $('input[name=service]').parent().css('display','inline-block');
        $('.marker').removeClass('store');
        $("#location").blur();
    },
    storename:function(){
        $searchby = 2;
        $('.list-group.location-suggestion').empty();
        $('.list-group.categories-list').css('display','none');
        $('.list-group.search-list').css('display','none');
        $('input[name=location]').val('');
        $('input[name=location]').attr('placeholder','Enter store name, brand name');
        $('input[name=location]').parent().animate({
            width: 840
        }, 0);
        $('input[name=service]').parent().css('display','none');
        // $(".serviceicon").css('display','none');
        $('.marker').addClass('store');
        $("#storename").blur();

    },
    storeselect:function(e){
        showOverlay(true);
        $(".search-bar").removeClass('attop');
        $('.slider-min-content-new2').removeClass('attop');
        $('.list-group.location-suggestion').empty();
        router.navigate("#/stores/profile/"+$(e.currentTarget).attr('data-l-guid'));
    },
    brandselect:function(e){
        showOverlay(true);
        $(".search-bar").removeClass('attop');
        $('.slider-min-content-new2').removeClass('attop');
        $('.list-group.location-suggestion').empty();
        router.navigate("#/brands/profile/"+$(e.currentTarget).attr('data-l-guid')+"-"+$(e.currentTarget).attr('value').split(' ').join('_')+"-1");
    },
    searchfocus:function(){
        showOverlay(false);
        $(".categories-list").slideUp();
        $(".search-list").css('display','none');
        $(".how-it-works").slideUp();
        $queryNew = $("input[name=location]").val();
        $(".search-bar").addClass('attop');

        $('.slider-min-content-new2').addClass('attop');
    },
    keyup:function(e){
      switch (e.which) {
        case 40://down
              e.preventDefault();
              if($searchby==2){
                $(".store-item.store1").removeClass("hovered");
                if(this.tabindex<this.stores.length-1){this.tabindex+=1;}
                else {   this.tabindex=0;    }
                $(".store-item:eq("+this.tabindex+")").toggleClass("hovered");
                console.log(this.tabindex);
              }
              else{
                $(".location-item").removeClass("hovered");
                console.log(this.locations.length);
                if(this.tabindex<this.locations.length-1){this.tabindex+=1;}
                else {   this.tabindex=0;    }
                $(".location-item:eq("+this.tabindex+")").toggleClass("hovered");
                console.log(this.tabindex);
              }
          break;
      case 38://up
            e.preventDefault();
            if($searchby==2){
              $(".store-item.store1").removeClass("hovered");
              if(this.tabindex>0){this.tabindex-=1;}
              else {   this.tabindex=this.stores.length-1;    }
              $(".store-item:eq("+this.tabindex+")").toggleClass("hovered");
              console.log(this.tabindex);
            }
            else{
              $(".location-item").removeClass("hovered");
              console.log(this.locations.length);
              if(this.tabindex>0){this.tabindex-=1;}
              else {   this.tabindex=this.locations.length-1;    }
              $(".location-item:eq("+this.tabindex+")").toggleClass("hovered");
              console.log(this.tabindex);
            }
          break;
        case 37:
          //left or right do nothing
          break;
        case 39:
        //left or right do nothing
          break;
        case 9:
          //left or right do nothing
          break;
      case 13://enter
          if(this.tabindex>-1){
            if($searchby==2){
              $('.store-item.store1:eq('+this.tabindex+')').click();
            }
            else{
              $(".location-item:eq("+this.tabindex+")").click(); this.tabindex=-1;

                $("input[name=service]").click();
                $("input[name=service]").focus();
            }
          }
          break;
      // case 40:
      //     break;

      default:
      console.log(e.which);
          var that=this;

          this.suggestionTimeout = this.suggestionTimeout || null;
          // this.queryOld = this.queryOld || "";
          $queryNew = $("input[name=location]").val();
          if(this.suggestionTimeout){clearTimeout(this.suggestionTimeout);}
          this.suggestionTimeout = setTimeout(function(){
              if($queryNew != this.queryOld && $queryNew.length>2){
                this.queryOld=$queryNew;
                  if($searchby == 2){   getStoreSuggestion($queryNew,970).success(function(data) {that.stores=data;that.tabindex=-1;});}
                  else{ getLocationSuggestion($queryNew).success(function(data) {that.locations=data;that.tabindex=-1;}); }
              }
              else{ $(".location-suggestion").fadeOut();}
              }
              ,500);
          break;

      }
      // console.log(e.which);
    }
});

var HomeViewBottom=Backbone.View.extend({
    el:'.main-container-bottom',//page-header
    initialize:function(){
    },
    render:function(){
        var temp;
        var that=this;
        if($("#home-bot-template").length>0){
            temp=_.template($("#home-bot-template").html());
            that.$el.html(temp).trigger("create");
        }
        else{
            $.ajax({
                url:" /templates/homepagebot.html?v=1.1",
                type:'GET',
                /*cache : false,
                 */processData:false,
                success:function(data){
                    $("body").append(data);
                    temp=_.template($(document).find("#home-bot-template").html());
                    that.$el.html(temp).trigger("create");
                }
            }).fail(function(data){
                console.log(data);
            });
        }
    }
});

var HomeViewMidRibbon=Backbone.View.extend({
    el:'.full-width-container',//page-header
    initialize:function(){
    },
    render:function(){
        var temp;
        var that=this;
        if($("#home-ribbon").length>0){
            temp=_.template($("#home-ribbon").html());
            that.$el.html(temp).trigger("create");
        }
        else{
            $.ajax({
                url:" /templates/home-mid.html",
                type:'GET',
                /*cache : false,
                 */processData:false,
                success:function(data){
                    $("body").append(data);
                    temp=_.template($(document).find("#home-ribbon").html());
                    that.$el.html(temp).trigger("create");
                }
            }).fail(function(data){
                console.log(data);
            });
        }
    }
});
var LoginView=Backbone.View.extend({
    el:'.top-menu>a:last',
    render:function(){
        var temp=_.template($("#logint").html());
        var html=temp();
        this.$el.html(html).trigger("create");
        $(".top-menu>a:last").attr("data-target","#login");
    }
});
var TopAccMenu=Backbone.View.extend({
    el:'.top-menu>a:last',
    events:{
       'click #logout0':'logout',
       'click #profile0':'profile'
    },
    show_menu:function(){
        $(".top-menu>a:last>ul").toggleClass("hidden");
    },
    hide_menu:function(){
        $(".top-menu>a:last>ul").toggleClass("hidden");
    },
    logout:function(e){
        new LoginView().render();
        if($user.platform=="facebook"){
          FB.logout(function(){
              logoutFromServer().success(function() {    clearUser(); render_umenu();    })
          });
        }
        else {
          console.log(gapi.auth);
          $.ajax({
                    type: 'GET',
                    url: 'https://accounts.google.com/o/oauth2/revoke?token=' + gapi.auth.getToken().access_token,
                    async: false,
                    contentType: 'application/json',
                    dataType: 'jsonp',
                    success: function(result) {

                        logoutFromServer().success(function() {   clearUser(); render_umenu();    })
                    },
                    error: function(e) {
                        console.log(e);
                    }
                });


        }

        e.stopPropagation();

    },
    profile:function(e){
        e.preventDefault();
        router.navigate("/profile");
    },
    render:function(){
        var temp=_.template($("#p_img").html());
        var html=temp({i:  $user.image,j:  $user.displayName});
        this.$el.html(html).trigger('create');
        $(".top-menu>a:last").attr("data-target","#logout");
    }
});
//gautam
var HeaderSearchBar=Backbone.View.extend({
    el:'.page-header',
    events:{
        'focus input[name=location]':'aa',
        'click .search-list-group-item':'selectsearchtype',
        'click .store1':'storeselect',
        'click .brand-item':'brandselect',
        'keyup input[name=location]':'searching',
        'focus input[name=location]':'searchfocus',
        'click #searchit':'showsearchoptions',
        'click #servicesearch':'settabindex',
        'keyup input[name=service]':'keyupservice'//headr
    },
    aa:function(){
    },
    settabindex:function() {
      this.tabindex=-1;
      $("#categories-list").slideDown();
    },
    keyupservice:function(e) {

          switch (e.which) {
            case 40://down
                  $(".service").removeClass("hovered");
                  if(this.tabindex<9 ){this.tabindex+=1;}
                  else {   this.tabindex=0;    }
                  $(".service:eq("+this.tabindex+")").toggleClass("hovered");
                  console.log(this.tabindex);
              break;
          case 38://up
                  $(".service").removeClass("hovered");
                  if(this.tabindex>0){this.tabindex-=1;}
                  else {   this.tabindex=9;    }
                  $(".service:eq("+this.tabindex+")").toggleClass("hovered");
                  console.log(this.tabindex);
              break;
            case 37:
              //left or right do nothing
              break;
            case 39:
            //left or right do nothing
              break;
          case 13://enter
                if(this.tabindex>-1){
                  $qo.isFiltered=0;
                  $(".service:eq("+this.tabindex+")").click(); this.tabindex=0;
                }
              break;
          }
    },
    render:function(){
        var temp=_.template($("#header-search-bar").html());
        var html=temp();
        this.$el.html(html).trigger("create");
        $(".page-header").addClass("gray-bg");
        render_umenu();
        if($searchby == 2){
            $('#storename2').click();
        }
    },
    brandselect:function(e){
        showOverlay(true);
        $(".search-bar").removeClass('attop');
        $('.slider-min-content-new2').removeClass('attop');
        $('.list-group.location-suggestion').empty();
        router.navigate("#/brands/profile/"+$(e.currentTarget).attr('data-l-guid')+"-"+$(e.currentTarget).attr('value').split(' ').join('_')+"-"+1);
    },
    selectsearchtype:function(e){
      e.stopPropagation();
        showOverlay(false);
        $('input[name=location]').val('');
        $searchby = $(e.currentTarget).attr('value');
        $("label[id=searchtype]").text($(e.currentTarget).text());
        $('.search-list').css("display", "none");
        $('.categories-list').css("display", "none");
        $('.location-suggestion').css("display", "none");
        if($searchby == 2){
            $('input[name=location]').attr('placeholder','Search by store name, brand name');
            $('input[name=location]').parent().animate({  width: 554 ,marginRight: '1.5px'}, 0);
            $('input[name=service]').parent().hide();
            // $('.serviceicon').addClass('hidden');
            $('.marker').addClass('store');
        }else{
            $('input[name=location]').attr('placeholder','Search by city, landmark, colony');
            $('input[name=location]').parent().animate({  width: 340  }, 0);
            $('input[name=service]').parent().show();
            // $('.serviceicon').removeClass('hidden');
            $('.marker').removeClass('store');
        }
    },
    storeselect:function(e){
        showOverlay(true);
        router.navigate("#/stores/profile/"+$(e.currentTarget).attr('data-l-guid'), true);
    },
    searching:function(e){
      var that=this;
      switch (e.which) {
        case 40://down
              e.preventDefault();
              if($searchby==2){
                $(".store-item.store1").removeClass("hovered");
                if(this.tabindex > this.stores.length-1){  this.tabindex=0;  }
                $(".store-item:eq("+this.tabindex+")").toggleClass("hovered");
                this.tabindex++;
                console.log(this.tabindex+"---------------------22");
              }
              else{
                $(".location-item").removeClass("hovered");
                console.log(this.locations.length);
                if(this.tabindex > this.locations.length-1){this.tabindex=0;}
                $(".location-item:eq("+this.tabindex+")").toggleClass("hovered");
                // if(this.tabindex<this.locations.length-1){this.tabindex+=1;}
                // else {   this.tabindex=0;    }
                this.tabindex++;
                console.log(this.tabindex+"--------------------33");
              }
          break;
      case 38://up
            e.preventDefault();
            if($searchby==2){
              $(".store-item.store1").removeClass("hovered");
              if(this.tabindex>0){this.tabindex-=1;}
              else {   this.tabindex=this.stores.length-1;    }
              $(".store-item:eq("+this.tabindex+")").toggleClass("hovered");
              console.log(this.tabindex+"-------------------------44");
            }
            else{
              $(".location-item").removeClass("hovered");
              console.log(this.locations.length);
              if(this.tabindex>0){this.tabindex-=1;}
              else {   this.tabindex=this.locations.length-1;    }
              $(".location-item:eq("+this.tabindex+")").toggleClass("hovered");
              console.log(this.tabindex+"-------------------------55");
            }
          break;
        case 37:
          //left or right do nothing
          break;
        case 39:
        //left or right do nothing
          break;
      case 13://enter
            if(this.tabindex >- 1){
              if($searchby == 2){
                $(".store-item.store1:eq("+this.tabindex+")").click(); this.tabindex=0;
              }
              else{
                $(".location-item:eq("+this.tabindex+")").click(); this.tabindex=0;
              }
              $("input[name=service]").click();
              $("input[name=service]").focus();
              console.log(this.tabindex);
             }
          break;
      // case 40:
      //     break;

      default:
          this.suggestionTimeout = this.suggestionTimeout || null;
          this.queryOld = this.queryOld || "";
          $queryNew = $("input[name=location]").val();
          if(this.suggestionTimeout){clearTimeout(this.suggestionTimeout);}
          this.suggestionTimeout = setTimeout(function(){
              if($queryNew != this.queryOld && $queryNew.length>2){
                  if($searchby == 2){   getStoreSuggestion($queryNew,970).success(function(data) {that.stores=data;that.tabindex=0;});}
                  else{ getLocationSuggestion($queryNew).success(function(data) {that.locations=data;that.tabindex=0;}); }
              }
              else{ $(".location-suggestion").fadeOut();}
              }
              ,500);
          break;

      }
    },
    searchfocus:function(e){
        showOverlay(false);
        $(".search-bar").addClass('attop');
    },
    showsearchoptions:function(e){
        showOverlay(false);
        $('#typeoptions').css('display','block');
        e.stopPropagation();
    }
});
var HowItWorks=Backbone.View.extend({
    el:'#hiwdiv',
    render:function(){
        var temp=_.template($("#hiw").html());
        var html=temp();
        this.$el.html(html).trigger("create");
    }
});
var Share=Backbone.View.extend({
    el:'#ishare',
    initialize:function(){
        _.bindAll(this, 'detect_scroll');
        $(window).scroll(this.detect_scroll);
        this.status=0;
    },
    events:{
      // 'mouseenter #shareit':'expand',
      // 'mouseleave #ishared':'shrink'
      'click #shareit':'expandorshrink'
      // 'mouseclick #ishared':'shrink'
    },
    render:function(){
        var temp=_.template($("#share-template").html());
        var html=temp();
        this.$el.html(html).trigger("create");
    },
    expandorshrink:function() {
      if(this.status==0){this.expand();this.status=1;console.log('hula1');}
      else if(this.status==1){this.shrink();this.status=0;console.log('hula0');}
    },
    expand:function(){
        $( "#ishared" ).animate({
            height: 400,
            bottom:70
        }, 1000 );
        $flag=true;
    },
    shrink:function(){
        $( "#ishared" ).animate({
            height: 55,
            bottom:200
        }, 2000 );
        $flag=false;
    },
    detect_scroll:function(){
        if ($flag) {
            $( "#ishared" ).animate({
                height: 55,
                bottom:200
            }, 1000 );
        }
        $flag=false;
    }
});

var HeaderNoSearchBar=Backbone.View.extend({
    el:'.page-header',
    render:function(){
        var temp=_.template($("#header-no-search-bar").html());
        var html=temp();
        this.$el.html(html).trigger("create");
        $(".page-header").removeClass("gray-bg");
        render_umenu();
    }
});
var AboutView=Backbone.View.extend({
    el:'.main-container',//page-header
    initialize:function(options){ this.options=options;},
    render:function(){
        var temp=_.template($("#about").html());
        this.$el.html(temp);
    }
});

var SearchView=Backbone.View.extend({
    el:'.main-container-top',//page-header
    events:{
        'click .fi-menu':'filter',
        // 'click input[name=etype0]':'brandupdate',
        'click .f-menu':'brandupdate',
        'click .page':'pagewise',
        'focusin #brandsearch':'brandsearch',
        'click .showdays>u':'weekdaystoggle',
        'click #clearfilter':'clearfilter'
    },
    initialize:function(options){
        _.bindAll(this, 'detect_scroll');
        $(window).scroll(this.detect_scroll);
        this.options=options;
    },
    render:function(){
        var hsb=new HeaderSearchBar();
        hsb.render();
        var temp=_.template($("#searchtemplate").html());
        var html=temp({aid:this.options.aid,bid:this.options.bid,cid:this.options.cid,did:this.options.did});
        this.$el.html(html).trigger("create");
        renderstoreItemView(1);
        $.ajax({
            url:$ROOT_URL+"/getbrandaminityList",
            type:'POST',
            contentType: 'application/x-www-form-urlencoded',
            data:{catid: $qo.catid},
            dataType:'json',
            xhrFields: {
                withCredentials: true
            },
            crossDomain: true,
            parse:function(response, options){
            },
            success:function(data){
              // console.log(data);
                $.each(data.brandlist,function(index,item){
                    $(".sub-filter:eq(4)").append("<label class='tocontinue'><input class=\" fi-menu brandname\" type=\"checkbox\" multiple name=\"brand[]\" value=\""+item.id+"\">"+item.brandName+"</label>");
                });
                showFilters();
            },
            error:function(msg){
                console.log(JSON.stringify(msg));
            }

        });
        $('.weekdays').slideUp();
        return this;
    },
    weekdaystoggle:function(e){
        if($(e.currentTarget).text()=="edit"){
            $(".weekdays").slideDown(500);
            $(e.currentTarget).text("hide");
        }else {
            $(".weekdays").slideUp(500);
            $(e.currentTarget).text("edit");
        }
    },
    detect_scroll:function(){
        scroll = $(window).scrollTop();
        if (scroll >= 90 && scroll < 800 && !$fixed) {
            $('.parlor-screen2').addClass('fixed').addClass('psposition');
            $fixed = true;
        } else if(scroll < 90 && $fixed) {
            $('.parlor-screen2').removeClass('fixed').removeClass('psposition');
            /*$('#leftfilter').removeClass('fixed').removeClass('fiposition');*/
            $fixed = false;
        }else if(scroll > 800 && $fixed){
            /*$('#leftfilter').removeClass('fixed').removeClass('fiposition');*/
            $fixed = false;
        }
    },
    filter:function(e){
      e.stopPropagation();
      $(this.el).off('click', '.input[name=etype0]');

        $qo.currentpage = 1;
        $qo.aminities=[];
        $qo.brandname=$(".brandname:checked").map(function(){ return this.value; }).get().join(',');
        $qo.gender=$("input[name=gender]:checked").val();
        if($qo.brandname==undefined){
            $qo.brandName=null;
        }
        if($qo.gender==undefined){
            $qo.gender=null;
        }else{
            $qo.aminities.push($qo.gender);
        }
        $qo.catid=$("input[name=etype0]:checked").val().split("-")[1];
        if($qo.catid==2){
            $qo.catid="2,4,5";
        }else if($qo.catid==7){
            $qo.catid="6,7";
        }else if($qo.catid==14){
            $qo.catid="12,14";
        }
        $qo.sortby=$("input[name=sort]:checked").val();
        if(typeof $qo.sortby === 'undefined'){
            $qo.sortby = "none";
        };
        $qo.morefilters = $(".more-filters:checked").map(function(){ return this.value; }).get().join(',');
        if($qo.morefilters == undefined || $qo.morefilters == ""){
            $qo.morefilters = null;
        }
        else{
            $qo.aminities.push($qo.morefilters);
        }
        $aminities = $qo.aminities.join(",");
        $qo.isFiltered = 1;
        $datas = {blockid:$qo.blockid, blockguid: $qo.blockguid, aminities: $aminities, brandname:$qo.brandname,catid: $qo.catid, startindex:1, endindex:$qo.pagesize, sortby:$qo.sortby};

        renderstoreItemView($qo.currentpage);
        $('html, body').animate({scrollTop:90},500);
        $("input").blur();
    },
    brandupdate:function(e){
      e.preventDefault();
	  e.stopPropagation();
      var uri = $("input[name=etype0]:checked").val();
      $qo.isFiltered = 0;
      var zz=window.location.href.split("-");
      zz.splice(zz.length-3,3);
      // console.log(zz +"--");
      // zz.splice(zz.length-1,1);
      // console.log(zz +"--");
      window.location=zz.join("-")+"-"+uri+"-"+1;
      // alert(window.location);
    },
    pagewise:function(e){
        showOverlay(true);
        $qo.isFiltered = 1;
        /*$('html, body').animate({scrollTop:0},9);*/
        var ce = $(e.target);
        if(ce.attr('id') == 'prev'){
            $qo.currentpage = parseInt($('.activepage').attr('data-value')) - 1;
        }else if(ce.attr('id') == 'next'){
            $qo.currentpage = parseInt($('.activepage').attr('data-value')) + 1;
        }else{
            $qo.currentpage = parseInt(ce.attr('data-value'));
        }
        var startIndex = (($qo.currentpage - 1)*$qo.pagesize) + 1;
        $aminities=$qo.aminities.join(",");
        $datas={ blockid: $qo.blockid, blockguid: $qo.blockguid, catid: $qo.catid,brandname:$qo.brandname,aminities:$aminities,startindex:startIndex,endindex:startIndex+$qo.pagesize,sortby:$qo.sortby};
        renderstoreItemView($qo.currentpage);
        $('html, body').animate({scrollTop:90},500);
    },
    brandsearch:function(){
        $queryNew=$("#brandsearch").val();
        $("#brandsearch").on("keyup",function(e){
            $(".tocontinue").removeClass("hidden");
            $queryNew=$("#brandsearch").val();
                    if($queryNew.length>2){
                        $('.tocontinue').each(function(){
                            if($(this).text().toString().toLowerCase().search($queryNew.toString().toLowerCase())>-1){
                            }else{
                               $(this).addClass("hidden");
                            }
                        });
                    }
                    else{
                        $(".tocontinue").removeClass("hidden");
                    }
        });
    },
    clearfilter:function(){
            window.location.reload();
    }

});

var StoreItemView = Backbone.View.extend({
    el:'.search-result',
    initialize:function(options){
        this.options=options;
    },
    events:{
        'click #sharestorelist':'expand',
        'click #ratecarddrop':'ratecarddrop',
        'click #photodrop':'photodrop',
        'click #reviewdrop':'reviewdrop',
        'click #trustdrop':'trustdrop',
        'click #booknowp2':'booknowp2'
    },
    render:function(){
            var temp = _.template($('#result-item-template').html());
            var html = temp({stores: this.options.stores, qo: this.options.qo});
            this.$el.html(html).trigger("create");
            // $('[data-toggle="tooltip"]').tooltip();
            $('[data-toggle="popover"]').popover();

            /*$('[data-toggle="dropdown"]').dropdown();*/
    },
    expand:function(e){
        $(e.currentTarget).animate({
            width: 194
        }, 500 );
    },
    shrink:function(e){
                $(e.currentTarget).animate({
                    width: 35
                }, 1000 );

    },
    ratecarddrop:function(e){
        var storedetail = this.getKeys(e).attr('data-value').split('-');
        $qo.storeID = storedetail[0];
        $qo.storeguid = storedetail[1];
        if (!timeoutId) {
            timeoutId = true;
            window.setTimeout(function() {
                $datas = { gid: $qo.storeguid, id: $qo.storeID };
                var rateCardListView = new RateCardView({ratecards:getRateCard($datas),el:'#rate-'+$qo.storeID});
                $('#rate-'+$qo.storeID).append(rateCardListView.render());
                timeoutId = false;
            }, 500)
        }
    },
    booknowp2:function(e) {
      $qo.storeID=$(e.currentTarget).data('storeid');
      $qo.storeguid=$(e.currentTarget).data('storeguid');
      $booking.storename=$(e.currentTarget).data('storename');
      $booking.address=$(e.currentTarget).data('address');
      var sp=new StoreProfile();
      sp.booking();
    },
    photodrop:function(e){
        var storedetail = this.getKeys(e).attr('data-value').split('-');
        $qo.storeID = storedetail[0];
        $qo.storeguid = storedetail[1];
        if (!timeoutId) {
            timeoutId = true;
            window.setTimeout(function() {
                $datas = { gid: $qo.storeguid, id: $qo.storeID };
                var storePhotoView = new StorePhotoView({storephotos:getStorePhoto($datas),el:'#photo-'+$qo.storeID});
                $('#photo-'+$qo.storeID).append(storePhotoView.render());
                timeoutId = false;
            }, 500)
        }
    },
    reviewdrop:function(e){
        var storedetail = this.getKeys(e).attr('data-value').split('-');
        $qo.storeID = storedetail[0];
        $qo.storeguid = storedetail[1];
        if (!timeoutId) {
            timeoutId = true;
            window.setTimeout(function() {
                $datas = { gid: $qo.storeguid, id: $qo.storeID };
                var reviewsView = new ReviewsView({reviews:getStoreReview($datas),el:'#review-'+$qo.storeID});
                $('#review-'+$qo.storeID).append(reviewsView.render());
                timeoutId = false;
            }, 500)
        }
    },
    trustdrop:function(e){
        var storedetail = this.getKeys(e).attr('data-value').split('-');
        $qo.storeID = storedetail[0];
        $qo.storeguid = storedetail[1];
        if (!timeoutId) {
            timeoutId = true;
            window.setTimeout(function() {
                $datas = { gid: $qo.storeguid, id: $qo.storeID };
                var trustsView = new TrustsView({data:getStoreTrust($datas),el:'#trust-'+$qo.storeID});
                $('#trust-'+$qo.storeID).append(trustsView.render());
               timeoutId = false;
            }, 500)
        }
    },
    getKeys:function(e){
        return	$(e.currentTarget).parent();
    }
});

var BrandView = Backbone.View.extend({
    el:'.main-container-top',
    initialize:function(options){
        this.options=options;
    },
    events:{
        'click .loadmore':'loadmore'
    },
    render:function(){
        var hsb=new HeaderSearchBar();
        hsb.render();
        var temp=_.template($("#brand-stores").html());
        var html=temp({qo:this.options.qo});
        this.$el.html(html).trigger("create");
    },
    loadmore:function(){
        if($qo.count > $qo.currentpage * 9){
            $datas={brandid: $qo.brandid,startindex:(($qo.currentpage*9)+1),endindex:((($qo.currentpage+1)*9))};
            var sponsoredStores=new BrandStoreCollection();
            getSponsoredStores(sponsoredStores,$qo.currentpage+1);
        }else{
            $('.loadmore').addClass('hidden');
        }
        $qo.currentpage = $qo.currentpage + 1;
    }
});

var SponsoredStoreView = Backbone.View.extend({//for Service Wise Collection view
    el:'.main-container-top',
    initialize:function(options){
        this.options=options;
    },
    events:{
        'click .f-menu':'cityselect'
    },
    render:function(){
        var hsb=new HeaderSearchBar();
        hsb.render();
        var temp=_.template($("#services-collection").html());
        var html=temp({qo:this.options.qo});
        this.$el.html(html).trigger("create");
    },
    cityselect:function(e){
        $(this.el).off('click', '.f-menu');
        var uri=$("input[name=etype0]:checked").val();
        router.navigate("#/stores/services/"+uri+"-"+$qo.catname+"-"+$qo.cid+"-"+1, true);
        e.stopPropagation();
    }
});

var SponsoredCityStoreView=Backbone.View.extend({//for Service Wise Collection view
    el:'.main-container-top',
    initialize:function(options){
        this.options=options;
    },
    events:{
        'click .f-menu':'serviceselect'
    },
    render:function(){
        var hsb=new HeaderSearchBar();
        hsb.render();
        var temp=_.template($("#cities-collection").html());
        var html=temp({qo:this.options.qo});
        this.$el.html(html).trigger("create");

    },
    serviceselect:function(e){
        $(this.el).off('click', '.f-menu');
        var uri=$("input[name=etype0]:checked").val();
        router.navigate("#/stores/cities/"+$qo.cityname+"-"+$qo.cityguid+"-"+$qo.cityid+"-"+uri+"-"+1,true);
        e.stopPropagation();
     }
});

var SponsoredStoreListView=Backbone.View.extend({
    /*el:'.search-result',*/
    initialize:function(options){
        this.options=options;
    },
    events:{
        'click #ratecardsdrop':'ratecarddrop',
        'click #photosdrop':'photodrop',
        'click #reviewsdrop':'reviewdrop',
        'click #trustsdrop':'trustdrop'
    },
    render:function(){
        var temp=_.template($("#sponsored-store-list").html());
        var html=temp({sponsoredStores:this.options.sponsoredStores,qo:this.options.qo});
        this.$el.html(html).trigger("create");
    },
    ratecarddrop:function(e){
        var storedetail = this.getKeys(e).attr('data-value').split('-');
        $qo.storeID = storedetail[0];
        $qo.storeguid = storedetail[1];
        if (!timeoutId) {
            timeoutId = true;
            window.setTimeout(function() {
                $datas = { gid: $qo.storeguid, id: $qo.storeID };
                var rateCardListView = new RateCardView({ratecards:getRateCard($datas),el:'#rate-'+$qo.storeID});
                $('#rate-'+$qo.storeID).append(rateCardListView.render());
                timeoutId = false;
            }, 500)
        }
    },
    photodrop:function(e){
        var storedetail = this.getKeys(e).attr('data-value').split('-');
        $qo.storeID = storedetail[0];
        $qo.storeguid = storedetail[1];
        if (!timeoutId) {
            timeoutId = true;
            window.setTimeout(function() {
                $datas = { gid: $qo.storeguid, id: $qo.storeID };
                var storePhotoView = new StorePhotoView({storephotos:getStorePhoto($datas),el:'#photo-'+$qo.storeID});
                $('#photo-'+$qo.storeID).append(storePhotoView.render());
                timeoutId = false;
            }, 500)
        }
    },
    reviewdrop:function(e){
        var storedetail = this.getKeys(e).attr('data-value').split('-');
        $qo.storeID = storedetail[0];
        $qo.storeguid = storedetail[1];
        if (!timeoutId) {
            timeoutId = true;
            window.setTimeout(function() {
                $datas = { gid: $qo.storeguid, id: $qo.storeID };
                var reviewsView = new ReviewsView({reviews:getStoreReview($datas),el:'#review-'+$qo.storeID});
                $('#review-'+$qo.storeID).append(reviewsView.render());
                timeoutId = false;
            }, 500)
        }
    },
    trustdrop:function(e){
        var storedetail = this.getKeys(e).attr('data-value').split('-');
        $qo.storeID = storedetail[0];
        $qo.storeguid = storedetail[1];
        if (!timeoutId) {
            timeoutId = true;
            window.setTimeout(function() {
                $datas = { gid: $qo.storeguid, id: $qo.storeID };
                var trustsView = new TrustsView({data:getStoreTrust($datas),el:'#trust-'+$qo.storeID});
                $('#trust-'+$qo.storeID).append(trustsView.render());
                timeoutId = false;
            }, 500)
        }
    },
    getKeys:function(e){
        return	$(e.currentTarget).parent();
    }
});

var StoreAdminView=Backbone.View.extend({
    el:'.main-container',
    initialize:function(options){
        this.options=options;
    },
    render:function(){
        //template_loader().load("templates/advertise.html","#advertise").postrender(".hoo>tr>td.select","#timing-options");

    }
});

var StoreProfile=Backbone.View.extend({
    el:'.main-container-top',//page-header
    bl:'#otp .modal-content',
    elphotos:'.rate-card',
    initialize:function(options){
        this.options=options;
        $(window).scroll(this.detect_scroll);
    },
    events:{
        'mouseenter .shareicons':'showshareicons',
        'mouseleave .services-header':'hideshareicons',
        'click #rate-rev-top':'reviewmenue',
        'click #gomap':'gotomap',
        'click #favourite':'favourite',
        'click #checkin':'checkin',
        'click #rateus>span':'rateus',
        'click #publish':'publishReview',
        'click #salonia':'saloni',
        'click #pba':'pb',
        'click #naa':'na',
        'click #reqtobook':'booking'
    },
    render:function(){
        $('#ishare').empty();
        var that=this;
        var temp=_.template($("#parlor-profile-template").html());
        var html=temp({data:this.options.data,qo:this.options.qo});
        this.$el.html(html).trigger("create");
        $(".overlay").fadeOut();
        $('html, body').animate({scrollTop:0});
        $("title").html("LookPlex - "+this.options.data.storename);
        $('[data-toggle="popover"]').popover();
	    var trustsView = new TrustsView({data:this.options.data});
        $('#trust').append(trustsView.render());
        $datas = { gid: $qo.storeguid, id: $qo.storeID };

        var rateCardListView = new RateCardView({ratecards:getRateCard($datas)});
        $('#rate-card').append(rateCardListView.render());

        var storePhotoView = new StorePhotoView({storephotos:getStorePhoto($datas)});
        $('#store-photo').append(storePhotoView.render());

        var x  =_.find(this.options.data.custactList,function(ob) { return ob.activity=="Comment"; });
        var y  =_.find(this.options.data.custactList,function(ob) { return ob.activity=="Bookmark"; });
        var z  =_.find(this.options.data.custactList,function(ob) { return ob.activity=="Checkin"; });
        if(x){$("#rate-rev-top").addClass('marked');}
        if(y){$("#favourite").addClass('marked');}
        if(z){$("#checkin").addClass('marked');}
	    this.postRender();
    },
    booknext:function(e) {
      console.log(e);
    },
    detect_scroll:function(){
        scroll = $(window).scrollTop();
        if($reviewnotrenderd && scroll >= 1300){
            var reviewsView = new ReviewsView({reviews:getStoreReview($datas)});
            $('#store-reviews').append(reviewsView.render());
            $reviewnotrenderd = false;
        }else if($mapnotrenderd && scroll >= 1300){
            var mapProp = {
                center: new google.maps.LatLng($lat,$log),
                zoom:14,
                mapTypeControl: true,
                mapTypeControlOptions: {style: google.maps.MapTypeControlStyle.DROPDOWN_MENU},
                navigationControl: true,
                navigationControlOptions: {style: google.maps.NavigationControlStyle.SMALL},
                mapTypeId: google.maps.MapTypeId.ROADMAP
            };
            var map = new google.maps.Map(document.getElementById("googleMap"),mapProp);
            var companyPos = new google.maps.LatLng($lat, $log);
            var companyMarker = new google.maps.Marker({
                position: companyPos,
                map: map,
                title:"LookPlex Store"
            });
            $mapnotrenderd = false;
        }
    },
    postRender:function(){
        new OTPSlot().render();
	    $('[data-toggle="tooltip"]').tooltip();
    },
    booking:function(e){
      // console.log(cm.getCookie("access_token"));
            if(!$user.displayName){/////LLLLLLLLLLLLLLLL
                $('#login').modal("show");
            }else{
                $('#otp').modal("show");
                this.generateDates();
            }
    },

    generateDates:function() {
      var d=new Date();
      var weekday=["Sunday","Monday","Tuesday","Wednesday","Thursday", "Friday", "Saturday"];
      var month=["January", "February", "March","April", "May", "June", "July", "August", "September", "October", "November", "December"];
      var days=[31,28,31,30,31,30,31,31,30,31,30,31];
      if (d.getFullYear()%4==0) { days[1]=29; }
      var dates=[d.getDate()];
      var day=d.getDay();
      var cmonth=month[d.getMonth()];
      var dc=d.getMonth();
      var resultdates=["Today"+" -  "+this.ordinal_suffix_of(dates[0]) +" "+cmonth];
      var year=d.getFullYear();
      var resultvalues=[dc+"/"+dates[0]+"/"+year];
      for (var i = 1; i < 14; i++) {
        console.log(d.getMonth());
        if(dates[i-1]+1>days[dc]){
            dates[i]=1; //if date greater than its months date set current date to be 1
            dc=dc+1;
            if(dc>11){//if december
              cmonth=month[0];
              dc=0;
              year+=1;
            }
            else{
              cmonth=month[dc];
              // dc++;
            }
// year
          }
        else{dates[i]=dates[i-1]+1;}//else set previous date + 1
        if(day>5){day=-1};day++;
        resultdates[i]=((i==1)?"Tomorrow":weekday[day])+" - "+this.ordinal_suffix_of(dates[i]) +" "+cmonth;
        resultvalues[i]=(parseInt(dc)+1)+"/"+dates[i]+"/"+year;
      }
      var datehtml="";
      for (var i = 0; i < resultdates.length-7; i++) {
        datehtml+="<a class='list-group-item' onclick='clickedondate(\""+resultdates[i]+"\")' value='"+resultvalues[i]+"'>"+resultdates[i]+"</a>";
      }
      $("#dates").html(datehtml);
      datehtml="";
      for (var i = 7; i < resultdates.length; i++) {
        datehtml+="<a class='list-group-item' onclick='clickedondate(\""+resultdates[i]+"\")' value='"+resultvalues[i]+"'>"+resultdates[i]+"</a>";
      }
      $("#dates1").html(datehtml);
      $(".bookcontents").eq(0).addClass("showing");
      console.log(resultdates);
      // return resultdates;
    },

    ordinal_suffix_of :function(i){
        var j = i % 10,
            k = i % 100;
        if (j == 1 && k != 11) {
            return i + "st";
        }
        if (j == 2 && k != 12) {
            return i + "nd";
        }
        if (j == 3 && k != 13) {
            return i + "rd";
        }
        return i + "th";
    },
    saloni:function(e){
        e.preventDefault();
        $(".nav-tabs a").click(function(){
            $(this).tab('show');
        });
    },
    pb:function(e){
        e.preventDefault();
        $(".nav-tabs a").click(function(){
            $(this).tab('show');
        });
    },
    na:function(e){
        e.preventDefault();
        $(".nav-tabs a").click(function(){
            $(this).tab('show');
        });
    },
    publishReview:function(e){
      var datt=this.options.data;
        $('#reviewerror').empty();
        // if(cm.getCookie("access_token") == "" || cm.getCookie("access_token") == undefined){
        if(!$user.displayName){///////////////////LLLLLLLLLLLLLLLLLLLLLLLLLL
            $('#login').modal("show");
        }else {
            if($rate!=0){
                var text = $('textarea#comment').val();
                if(text.length>100){
                    $data = {storeguid:$qo.storeguid,storeid:$qo.storeID,rating:$rate,comment:text};
                    var response = saveReview($data,1);
                    response.success(function() {
                      $('textarea#comment').val("");
                      var z  =_.find(datt.custactList,function(ob) { return ob.activity=="Comment"; });
                      if(!z.stringComment){
                        $("#rev").html(parseInt($("#rev").html())+1);
                      }

                    });
                }else{
                    $('#reviewerror').append("<center><div class=\"errormsg col-md-12\">Review is too short. Please review in more than 100 characters</div></center>");
                }
            }else{
                $('#reviewerror').append("<center><div class=\"errormsg col-md-12\">You need to rate us :), before submitting the review</div></center>");
            }

        }
    },
    rateus:function(e){
      // if(cm.getCookie("access_token") == "" || cm.getCookie("access_token") == undefined){
      var datt=this.options.data;
        if(!$user.displayName){///////////////////LLLLLLLLLLLLLLLLLLLLLLLLLL
            $('#login').modal("show");
        }else {
            $rate= $(e.currentTarget).attr('data-value');
            for( var i = 5; i > 0 ; i-- ){
                if( $rate >= i ){
                    $('#star'+i).addClass('fa fa-star-o fa-star-active').removeClass('star');
                }else{
                    $('#star'+i).removeClass('fa fa-star-o fa-star-active').addClass('star');
                }
            }
            $data = {storeguid:$qo.storeguid,storeid:$qo.storeID,rating:$rate};
            var response = saveReview($data,2);
            response.success(function() {
              //var z  =_.find(datt.custactList,  function(ob) { return ob.activity=="Comment"; });
              //  if(z=undefined || (z && z.rating==null)){ $("#rat").html(parseInt($("#rat").html())+1); }
              if(!$(".screen-menu-rate.marked").length>0){     $("#rat").html(parseInt($("#rat").html())+1);     }
              //  console.log(z);
              //  console.log(datt.custactList[0].rating);

            });
        }
    },
    showshareicons:function(e){
        $('.shareicons>a').removeClass("hidden");
    },
    hideshareicons:function(){
        $('.shareicons>a').addClass("hidden");
    },
    reviewmenue:function(){
        $('html, body').animate({
            scrollTop:$('#store-reviews').offset().top - 90
        }, 700);
    },
    trustmenue:function(){
        $('html, body').animate({
            scrollTop:$('#trust').offset().top - 90
        }, 700);
    },
    gotomap:function(e){
        e.preventDefault();
        $('html, body').animate({
            scrollTop:$('#googleMap').offset().top -120
        }, 700);
    },
    encapsulate:function(e){
        $(".nav-list>h4.active").removeClass("active");
        $(".nav-contents>div.active").removeClass("active").fadeOut();
        $(e.currentTarget).addClass('active');
        return $(e.currentTarget).attr("data-to");
    },
    favourite:function(e){
      var z  =_.find(this.options.data.custactList,function(ob) { return ob.activity=="Bookmark"; });
      // console.log(z, cm.getCookie("displayName"));
        if($user.displayName) {///////////////////LLLLLLLLLLLLLLLLLLLLLLLLLL
          if(z){//boookmarked
            $("#favourite i").toggleClass("fa-bookmark fa-circle-o-notch fa-spin");
            deleteFavourite({ storeguid: $qo.storeguid, storeid: $qo.storeID})
            .success(function() {
              $("#favourite i").toggleClass("fa-bookmark fa-circle-o-notch fa-spin");
              $("#favourite").toggleClass('marked');
              if($("#fav").html()!=0){
                $("#fav").html(parseInt($("#fav").html())-1);
              }
              console.log($("#fav").html());
            })
            this.options.data.custactList.splice(this.options.data.custactList.indexOf(z),1);
          }
          else{//not bookmarked
            $("#favourite i").toggleClass("fa-bookmark fa-circle-o-notch fa-spin");
            saveFavourite({ storeguid: $qo.storeguid, storeid: $qo.storeID})
            .success(function() {
              $("#favourite i").toggleClass("fa-bookmark fa-circle-o-notch fa-spin");
              $("#favourite").toggleClass('marked');
              $("#fav").html(parseInt($("#fav").html())+1);
            })
            .error(function () {
              $("#favourite").html($text);
            })
            this.options.data.custactList.push({'activity':"Bookmark"});
          }

        }else{
            $('#login').modal("show");
        }
    },
    checkin:function(e){
      var z  =_.find(this.options.data.custactList,function(ob) { return ob.activity=="Checkin"; });

      if($user.displayName){///////////////////LLLLLLLLLLLLLLLLLLLLLLLLLL
        // if(cm.getCookie("access_token") != "" && cm.getCookie("access_token") != "undefined"){
        if(z){
          $("#checkin i").toggleClass("fa-check fa-circle-o-notch fa-spin");
          deleteCheckin({storeguid:$qo.storeguid,storeid:$qo.storeID})
          .success(function() {
            $("#checkin i").toggleClass("fa-check fa-circle-o-notch fa-spin");
            $("#checkin").toggleClass('marked');
          });
          this.options.data.custactList.splice(this.options.data.custactList.indexOf(z),1);
        }
        else{
          $("#checkin i").toggleClass("fa-check fa-circle-o-notch fa-spin");
          saveCheckin({storeguid:$qo.storeguid,storeid:$qo.storeID})
          .success(function() {
            $("#checkin i").toggleClass("fa-check fa-circle-o-notch fa-spin");
            $("#checkin").toggleClass('marked');
          })
          .error(function(msg) {
            console.log(msg);
          })
          this.options.data.custactList.push({'activity':"Checkin"});
        }

        }else{
            $('#login').modal("show");
        }

    }
});

var RateCardView = Backbone.View.extend({
    el:'#rate-card',
    initialize:function(options){
        this.options=options;
    },
    render:function(){
        var temp=_.template($("#pp-ratecards").html());
        var html=temp({ratecards:this.options.ratecards});
        this.$el.html(html).trigger("create");
    }
});

var StorePhotoView = Backbone.View.extend({
    el:'#store-photo',
    initialize:function(options){
        this.options=options;
    },
    render:function(){
        var temp=_.template($("#pp-photos").html());
        var html=temp({storephotos:this.options.storephotos});
        this.$el.html(html).trigger("create");
    }
});

/*var PageOneSponsoredView = Backbone.View.extend({
    el:'#page-1-sponsored',
    initialize:function(options){
        this.options=options;
    },
    render:function(){
        var temp=_.template($("#page-1-sponsored-temp").html());
        var html=temp({stores:this.options.stores});
        this.$el.html(html).trigger("create");
    }
});*/

var ReviewsView = Backbone.View.extend({
    el:'#store-reviews',
    events:{
        'click .tips':'show_tips',
        'click #tooltiprev':'tip'
    },
    initialize:function(options){
        this.options=options;
    },
    render:function(){
        var temp=_.template($("#pp-reviews").html());
        var html=temp({reviews:this.options.reviews});
        this.$el.html(html).trigger("create");
        $('.tooltiprev').tooltip();
    },
    tip:function(e){
        e.preventDefault();
    },
    show_tips:function(){
        //$('#tip').addClass("hoverpan").removeClass("hidden");
    }
});

var TrustsView = Backbone.View.extend({
    el:'#trust',
    initialize:function(options){
        this.options=options;
    },
    render:function(){
        var temp=_.template($("#trusts").html());
        var html=temp({data:this.options.data});
        this.$el.html(html).trigger("create");
    }
});

var ModalView=Backbone.View.extend({
    el:'.modal-container',
    initialize:function(options){
        this.options=options;
    }
});

var OTPService=Backbone.View.extend({
    el:'#otpview',
    render:function(){
        var temp=_.template($("#otpservice").html());
        var html=temp();
        this.$el.html(html).trigger("create");
    }
});
var OTPSlot=Backbone.View.extend({
    el:'#otpview',
    events:{
        'click #datepickerr':'date'
    },
    render:function(){
        var temp=_.template($("#otpslot").html());
        var html=temp();
        this.$el.html(html).trigger("create");
    },
    date:function(){
        $( "#datepickerr" ).datepicker();
    }
});
var OTPDetails=Backbone.View.extend({
    el:'#otpview',
    render:function(){
        var temp=_.template($("#otpdetails").html());
        var html=temp();
        this.$el.html(html).trigger("create");
    }
});
var OTPConfirm=Backbone.View.extend({
    el:'#otpview',
    render:function(){
        var temp=_.template($("#otpconfirm").html());
        var html=temp();
        this.$el.html(html).trigger("create");
    }
});
var OTPSuccess=Backbone.View.extend({
    el:'#otpview',
    render:function(){
        var temp=_.template($("#successbooking").html());
        var html=temp({booking:$booking});
        this.$el.html(html).trigger("create");
    }
});
//ROUTER
var Workspace = Backbone.Router.extend({
    initialize:function(){
        Backbone.history.start(/*{pushState: true}*/);
        // setup the ajax links for the html5 push navigation
      //  $("body").on("click","a:not(a[data-bypass])",function(e){
      //          // block the default link behavior
      //          e.preventDefault();
      //          // take the href of the link clicked
      //          var href = $(this).attr("href");
      //          // pass this link to Backbone
      //          Backbone.history.navigate(href,true);
      //  });
    },
    routes:{
        '': 'home',
        'stores/:aid-:bid-:bgid-:cid-:did-:pid':'home_stores',
        /*'stores/f/q=:aid&ids=:bid-:cid-:did-:eid':'stores_filtered',*/
        'stores/profile/:aid-:bid&:cid-:did&:eid-:sid-:guid':'store_profile',
        'stores/profile/:sid-:guid':'store_profile',
        'brands/profile/:bid-:bnm-:pid':'brand_profile',
        'stores/services/:cnm-:cgd-:cid-:snm-:sid-:pid':'stores_service_wise',
        'stores/cities/:cnm-:cgd-:cid-:snm-:sid-:pid':'stores_city_wise',
        'freelisting':'free_listing',
        'listing':'listing',
        'about':'about',
        'careers':'carreers',
        'contactus':'contact_us',
        'advertise':'advertise',
        'storeadmin':'storeadmin',
        'privacypolicy':'privacypolicy',
        'haircare':'haircare',
        'skincare':'skincare',
        'fitness':'fitness',
        'makeup':'makeup',
        'diet':'diet',
        'termsofservice':'termsofservice',
        'profile':'profile'
    },
    home:function(){
        new HomeView().render();
        new HeaderNoSearchBar().render();
        new HomeViewMidRibbon().render();
        new HomeViewBottom().render();
        // new Share().render();
        $('html, body').animate({scrollTop:0},500);
        $("title").html("Book beauty, wellness & fitness appointments online - Lookplex");
        this.resetMetas();
    },
    stores_service_wise:function(cnm,cgd,cid,snm,sid,pid){
        $('.full-width-container').empty();
        $('.main-container-bottom').empty();
        $qo.catname=snm;
        $qo.cid=sid;
        $qo.cityname=cnm;
        $qo.cityid=cid;
        $qo.cityguid=cgd;
        $qo.pageid=pid;

        if($qo.cid==2){
            $qo.cid="2,4,5";
        }else if($qo.cid==7){
            $qo.cid="6,7";
        }else if($qo.cid==14){
            $qo.cid="12,14";
        }
        //TODO Views needs to be added
        var sponsoredStoreView = new SponsoredStoreView({sid:$qo.cid,snm:$qo.catname});
        sponsoredStoreView.render();
        $datas={cityid:$qo.cityid,catids:$qo.cid,sortby:"none",cityguid:$qo.cityguid,startindex: 1 + ($qo.pageid-1)*10,endindex:($qo.pageid-1)*10+10};
        var sponsoredStores=new SponsoredCollection();
        getSponsoredStores(sponsoredStores,1);
    },
    stores_city_wise:function(cnm,cgd,cid,snm,sid,pid){
        $('.full-width-container').empty();
        $('.main-container-bottom').empty();
        $qo.cityname=cnm;
        $qo.catname=snm;
        $qo.cid=sid;
        $qo.cityid=cid;
        $qo.cityguid=cgd;
        $qo.pageid=pid;
        if($qo.cid==2){
            $qo.cid="2,4,5";
        }else if($qo.cid==7){
            $qo.cid="6,7";
        }else if($qo.cid==14){
            $qo.cid="12,14";
        }
        var sponsoredCityStoreView = new SponsoredCityStoreView({cnm:$qo.cityname,cid:$qo.cityid});
        sponsoredCityStoreView.render();
        $datas={cityid:$qo.cityid,catids:$qo.cid,sortby:"none",cityguid:$qo.cityguid,startindex: 1 + ($qo.pageid-1)*10,endindex:($qo.pageid-1)*10+10};
        var sponsoredStores=new SponsoredCollection();
        getSponsoredStores(sponsoredStores,1);
    },
    home_stores:function(aid,bid,bgid,cid,did,pid){ //,eid
        $('.full-width-container').empty();
        $('.main-container-bottom').empty();
        $qo.blockname=aid;
        $qo.blockid=bid;
        $qo.blockguid=bgid;
        $qo.catname=cid;
        $qo.catid=did;
        $qo.pageid=pid;
        // alert($qo.pageid);
        writeallvariables();
        // $morefilters=eid;
        $datas="";
        if($qo.catid==2){
            $qo.catid="2,4,5";
        }else if($qo.catid==7){
            $qo.catid="6,7";
        }else if($qo.catid==14){
            $qo.catid="12,14";
        }
        if($qo.isFiltered==1){
            $datas={ blockid: $qo.blockid, blockguid: $qo.blockguid, catid: $qo.catid,brandname:$qo.brandname,aminities:$qo.morefilters,startindex: 1 + ($qo.pageid-1)*10,endindex:($qo.pageid-1)*10+10,sortby: "none"};
        }
        else{
            $datas={ blockid: $qo.blockid, blockguid: $qo.blockguid, catid: $qo.catid, sortby: "none",startindex: 1 + ($qo.pageid-1)*10,endindex:($qo.pageid-1)*10+10};
        }
        var searchView=new SearchView({aid:$qo.blockname,bid:$qo.blockguid,cid:$qo.catname,did:$qo.catid});
        searchView.render();
        $('#ishare').empty();
        $('html, body').animate({scrollTop:90},0);
        $("title").html("Best "+$qo.catname+"s near "+$qo.blockname+" on Lookplex. Book appointments online, get discounts, latest offers, photos and rate cards");
        this.resetMetas();


    },//end
    brand_profile:function(bid,bnm,pid){
        $(".how-it-works").slideUp();
        $('.full-width-container').empty();
        $('.main-container-bottom').empty();
        $qo.pageid=pid;
        var hsb=new HeaderSearchBar();
        hsb.render();
        $qo.brandname = bnm.split('_').join(' ');
        $qo.brandid = bid;
        new BrandView({qo:$qo}).render();
        $datas={brandid:bid,startindex:1,endindex:9};
        var sponsoredStores=new BrandStoreCollection();
        getSponsoredStores(sponsoredStores,1);
        //background: url('') 0 0
    },
    store_profile:function(sid,guid){
      var that=this;
        $(".how-it-works").slideUp();
        $('.full-width-container').empty();
        $('.main-container-bottom').empty();
        $qo.storeguid=guid;
        $qo.storeID=sid;
        $data = {guid:guid,storeid:sid};
        // if(cm.getCookie("access_token") != "" && cm.getCookie("access_token") != undefined){///////////////////LLLLLLLLLLLLLLLLLLLLLLLLLL
        //     $data = {guid:guid,storeid:sid};
        // }else{
        //     $data = {guid:guid,storeid:sid};
        // }
        $.ajax({
            data:$data,
            type:'POST',
            cache : false,
            url:$ROOT_URL+"/getstoredetails",
            dataType:"json",
            xhrFields: {
                withCredentials: true
            },
            beforeSend: function(){
                $(".overlay").fadeIn();
                var hsb=new HeaderSearchBar();
                hsb.render();
            },
            success: function(data){
                var storeView=new StoreProfile({data:data,qo:$qo});
                storeView.render();

                that.storeMetas(data);//CHange meta of page

                $(".overlay").fadeOut();

                if(data.coordinate != null || data.coordinate != undefined) {
                    $lat = parseFloat(data.coordinate.toString().split(',')[0]);
                    $log = parseFloat(data.coordinate.toString().split(',')[1]);
                }

                $booking.storename = data.storename;
                $booking.storeaddress = data.address;
                $temp=data.address.split(",");
                $("title").html(data.storename+" in "+$temp[$temp.length-2]+", "+$temp[$temp.length-1]+" - Book appointment online on Lookplex");
            },
            error: function(msg){
                $(".overlay").fadeOut();
            }
        });
    },
    resetMetas:function() {
      $("meta[property='og:description']").attr("content", "Lookplex is a leading online platform to book beauty, fitness and wellness services with spas, salons, gyms, makeup artists, slimming centres, yoga studios, tattoo artists and more. Book now!.");
      $("meta[property='og:image']").attr("content", "https://static.lookplex.com/images/1.2/forshare.jpg");
      $("meta[property='og:title']").attr("content", "LET'S LOOK NEW TODAY!");
    },
    storeMetas:function(data) {
      $("meta[property='og:description']").attr("content", data.description);
      $("meta[property='og:image']").attr("content", data.coverUrl);
      $("meta[property='og:title']").attr("content", data.storename);
    },
    profile:function(){
    new HeaderSearchBar().render();
    if($user.displayName) {
        $(".overlay").fadeIn();
        $('.full-width-container').empty();
        $('.main-container-bottom').empty();
        new ProfileView().render();
        renderTemplate("user-profile-info",null);
        $(".overlay").fadeOut();
    }else{
        $('#login').modal("show");
    }
    },
    free_listing:function(){
        $('.main-container-top').empty();
        $('.full-width-container').empty();
        $('.main-container-bottom').empty();
        template_loader("templates/listing.html","#free-listing-template",".hoo>tbody>tr>td>select","#timing-options");
    },
    listing:function(){
        $('#hiwdiv').empty();
        $('.full-width-container').empty();
        $('.main-container-bottom').empty();
        template_loader("templates/freelisting.html","#listing-template",".hoo>tbody>tr>td>select","#timing-options");
    },
    carreers:function(){
        $('.full-width-container').empty();
        $('.main-container-bottom').empty();
        template_loader("templates/carreers.html","#carreers");
    },
    about:function(){
        $('.full-width-container').empty();
        $('.main-container-bottom').empty();
        template_loader("/templates/about.html","#about");
    },
    contact_us:function(){
        $('.full-width-container').empty();
        $('.main-container-bottom').empty();
        template_loader("templates/contactus.html","#contact_us");
    },
    advertise:function(){
        $('.full-width-container').empty();
        $('.main-container-bottom').empty();
        template_loader("templates/advertise.html","#advertise");
    },
    storeadmin:function(){
        $('.full-width-container').empty();
        $('.main-container-bottom').empty();
        var storeadminview=new StoreAdminView();
        storeadminview.render();
    },
    termsofservice:function(){
        $("#login").modal("hide");
        $('.full-width-container').empty();
        $('.main-container-bottom').empty();
        template_loader("templates/tos.html","#tos");
    },
    privacypolicy:function(){
        $("#login").modal("hide");
        $('.full-width-container').empty();
        $('.main-container-bottom').empty();
        template_loader("templates/privacypolicy.html","#privacypolicy");
    }

});

var router=new Workspace();
