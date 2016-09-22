/**
 GLOBAL VARIABLES
 **/

window.booking={};
$subTotal = 0;
window.booking.amount = 0;
$promocode1="look40";
$promocode2="look30";
$discount = 0;
$minBookinAmount = 800;
$convenienceCharge  = 100;
$bookingCart = new Set();
$data = {
    "services":
    {"facial":{
        "category":{
            "basic":
                [{
                    "name":"whitening facial",
                    "time":"60 min",
                    "cost":"750"
                },
                    {
                        "name":"Anti Tan Facial",
                        "time":"60 min",
                        "cost":"750"
                    },{
                    "name":"Fruit Facial",
                    "time":"60 min",
                    "cost":"750"
                },{
                    "name":"Aloe Vera Facial",
                    "time":"60 min",
                    "cost":"750"
                },{
                    "name":"Herbal Facial",
                    "time":"60 min",
                    "cost":"750"
                }],
            "standard":[{
                "name":"Silver Sheen Facial",
                "time":"60 min",
                "cost":"1100"
            },{
                "name":"Gold Radiance Facial",
                "time":"60 min",
                "cost":"1100"
            },{
                "name":"Skin Lightening Facial",
                "time":"60 min",
                "cost":"1100"
            },{
                "name":"Tan Removal Facial",
                "time":"60 min",
                "cost":"1100"
            },{
                "name":"Purifying Facial",
                "time":"60 min",
                "cost":"1100"
            }],
            "premium":[{
                "name":"Illuminating Facial",
                "time":"60 min",
                "cost":"2000"
            },{
                "name":"O2 Whitening Facial",
                "time":"60 min",
                "cost":"2000"
            },{
                "name":"Gold Sheen Facial",
                "time":"60 min",
                "cost":"2000"
            },{
                "name":"Pearl Glow Facial",
                "time":"60 min",
                "cost":"2000"
            },{
                "name":"Anti Acne Facial",
                "time":"60 min",
                "cost":"2000"
            }]

        }
    },
        "cleanup":{
            "category":{
                "basic":[{
                    "name":"whitening cleanup",
                    "time":"30 min",
                    "cost":"350"
                },
                    {
                        "name":"Anti Tan cleanup",
                        "time":"30 min",
                        "cost":"350"
                    },
                    {
                        "name":"Fruit cleanup",
                        "time":"30 min",
                        "cost":"350"
                    },
                    {
                        "name":"Aloe Vera cleanup",
                        "time":"30 min",
                        "cost":"350"
                    },
                    {
                        "name":"Herbal cleanup",
                        "time":"30 min",
                        "cost":"350"
                    }]
                ,
                "standard":[{
                    "name":"Silver Sheen cleanup",
                    "time":"30 min",
                    "cost":"550"
                },
                    {
                        "name":"Gold Radiance cleanup",
                        "time":"30 min",
                        "cost":"550"
                    },
                    {
                        "name":"Skin Lightening cleanup",
                        "time":"30 min",
                        "cost":"550"
                    },
                    {
                        "name":"Tan Removal cleanup",
                        "time":"30 min",
                        "cost":"550"
                    },
                    {
                        "name":"Purifying cleanup",
                        "time":"30 min",
                        "cost":"550"
                    }]

                ,
                "premium":[{
                    "name":"Illuminating cleanup",
                    "time":"30 min",
                    "cost":"1000"
                },
                    {
                        "name":"O2 Whitening cleanup",
                        "time":"30 min",
                        "cost":"1000"
                    },
                    {
                        "name":"Gold Sheen cleanup",
                        "time":"30 min",
                        "cost":"1000"
                    },
                    {
                        "name":"Pearl Glow cleanup",
                        "time":"30 min",
                        "cost":"1000"
                    },
                    {
                        "name":"Anti Acne cleanup",
                        "time":"30 min",
                        "cost":"1000"
                    }]


            }
        },
        "threading":{
            "category":{
                "basic":[{
                    "name":"Eyebrows",
                    "time":"05 min",
                    "cost":"25"
                },
                    {
                        "name":"upperlips",
                        "time":"05 min",
                        "cost":"25"
                    },
                    {
                        "name":"forehead",
                        "time":"05 min",
                        "cost":"25"
                    },
                    {
                        "name":"sidelocks",
                        "time":"05 min",
                        "cost":"25"
                    },
                    {
                        "name":"chin",
                        "time":"05 min",
                        "cost":"25"
                    }]


            }
        },
        "bleach":{
            "category":{
                "basic:fruit or equal":[{
                    "name":"face",
                    "time":"15 min",
                    "cost":"250"
                },
                    {
                        "name":"under arms",
                        "time":"15 min",
                        "cost":"60"
                    },
                    {
                        "name":"full arms",
                        "time":"15 min",
                        "cost":"250"
                    },
                    {
                        "name":"half legs",
                        "time":"15 min",
                        "cost":"300"
                    },
                    {
                        "name":"full legs",
                        "time":"20 min",
                        "cost":"550"
                    },
                    {
                        "name":"back",
                        "time":"20 min",
                        "cost":"500"
                    },
                    {
                        "name":"front",
                        "time":"20 min",
                        "cost":"500"
                    },
                    {
                        "name":"full body",
                        "time":"60 min",
                        "cost":"1400"
                    }]

                ,
                "standard:oxy or equal":[{
                    "name":"face",
                    "time":"15 min",
                    "cost":"400"
                },
                    {
                        "name":"under arms",
                        "time":"15 min",
                        "cost":"90"
                    },
                    {
                        "name":"full arms",
                        "time":"15 min",
                        "cost":"400"
                    },
                    {
                        "name":"half legs",
                        "time":"15 min",
                        "cost":"450"
                    },
                    {
                        "name":"full legs",
                        "time":"20 min",
                        "cost":"700"
                    },
                    {
                        "name":"back",
                        "time":"20 min",
                        "cost":"650"
                    },
                    {
                        "name":"front",
                        "time":"20 min",
                        "cost":"650"
                    },
                    {
                        "name":"full body",
                        "time":"60 min",
                        "cost":"2000"
                    }]

                ,
                "premium:gold/de tan or equal":[{
                    "name":"face",
                    "time":"15 min",
                    "cost":"550"
                },
                    {
                        "name":"under arms",
                        "time":"15 min",
                        "cost":"120"
                    },
                    {
                        "name":"full arms",
                        "time":"15 min",
                        "cost":"550"
                    },
                    {
                        "name":"half legs",
                        "time":"15 min",
                        "cost":"600"
                    },
                    {
                        "name":"full legs",
                        "time":"20 min",
                        "cost":"800"
                    },
                    {
                        "name":"back",
                        "time":"20 min",
                        "cost":"750"
                    },
                    {
                        "name":"front",
                        "time":"20 min",
                        "cost":"750"
                    },
                    {
                        "name":"full body",
                        "time":"60 min",
                        "cost":"2400"
                    }]


            }
        },
        "hair style":{
            "category":{
                "hair cut":[{
                    "name":"trimming",
                    "time":"15 min",
                    "cost":"350"
                },
                    {
                        "name":"staright",
                        "time":"15 min",
                        "cost":"350"
                    },
                    {
                        "name":"u shape",
                        "time":"15 min",
                        "cost":"350"
                    },
                    {
                        "name":"v shape",
                        "time":"15 min",
                        "cost":"350"
                    },
                    {
                        "name":"steps & razor",
                        "time":"20 min",
                        "cost":"450"
                    },
                    {
                        "name":"any haircut of choice",
                        "time":"20 min",
                        "cost":"600"
                    }]

                ,
                "Shampoo and Blowdry":[{
                    "name":"Shoulder Length",
                    "time":"30 min",
                    "cost":"300"
                },
                    {
                        "name":"Mid Back Length",
                        "time":"45 min",
                        "cost":"350"
                    },
                    {
                        "name":"Waist Length",
                        "time":"45 min",
                        "cost":"420"
                    }]

                ,
                "curling":[{
                    "name":"Shoulder Length",
                    "time":"30 min",
                    "cost":"500"
                },
                    {
                        "name":"Mid Back Length",
                        "time":"40 min",
                        "cost":"600"
                    },
                    {
                        "name":"Waist Length",
                        "time":"45 min",
                        "cost":"700"
                    }]

                ,
                "Straightening":[{
                    "name":"Shoulder Length",
                    "time":"30 min",
                    "cost":"500"
                },
                    {
                        "name":"Mid Back Length",
                        "time":"40 min",
                        "cost":"600"
                    },
                    {
                        "name":"Waist Length",
                        "time":"45 min",
                        "cost":"700"
                    }]

                ,
                "Hair Styling":[{
                    "name":"Shoulder Length",
                    "time":"30 min",
                    "cost":"500"
                },
                    {
                        "name":"Mid Back Length",
                        "time":"40 min",
                        "cost":"600"
                    },
                    {
                        "name":"Waist Length",
                        "time":"45 min",
                        "cost":"700"
                    }]

                ,
                "Head Massage":[{
                    "name":"Coconut Oil/Almond Oil",
                    "time":"30 min",
                    "cost":"180"
                },
                    {
                        "name":"Olive Oil",
                        "time":"30 min",
                        "cost":"250"
                    },
                    {
                        "name":"Essential Oils",
                        "time":"30 min",
                        "cost":"300"
                    }]


            }
        },"hair care":{
        "category":{
            "Hair Spa (Hot Towel)":[{
                "name":"Shoulder Length",
                "time":"25 min",
                "cost":"850"
            },
                {
                    "name":"Mid Back Length",
                    "time":"35 min",
                    "cost":"1100"
                },
                {
                    "name":"Waist Length",
                    "time":"40 min",
                    "cost":"1450"
                }]

            ,
            "Nourishment Hair Spa":[{
                "name":"Shoulder Length",
                "time":"25 min",
                "cost":"1100"
            },
                {
                    "name":"Mid Back Length",
                    "time":"35 min",
                    "cost":"1450"
                },
                {
                    "name":"Waist Length",
                    "time":"40 min",
                    "cost":"1800"
                }]

            ,
            "Treatment Hair Spa (Anti-Dandruff/Anti Hairfall/Mythic Oil)":[
                {
                    "name":"Shoulder Length",
                    "time":"30 min",
                    "cost":"1800"
                },
                {
                    "name":"Mid Back Length",
                    "time":"40 min",
                    "cost":"2400"
                },
                {
                    "name":"Waist Length",
                    "time":"45 min",
                    "cost":"3000"
                }
            ],
            "Henna Application":[
                {
                    "name":"Shoulder Length",
                    "time":"30 min",
                    "cost":"350"
                },
                {
                    "name":"Mid Back Length",
                    "time":"40 min",
                    "cost":"420"
                },
                {
                    "name":"Waist Length",
                    "time":"60 min",
                    "cost":"480"
                }
            ],
            "Colour Henna Application":[
                {
                    "name":"Shoulder Length",
                    "time":"30 min",
                    "cost":"550"
                },
                {
                    "name":"Mid Back Length",
                    "time":"40 min",
                    "cost":"600"
                },
                {
                    "name":"Waist Length",
                    "time":"60 min",
                    "cost":"650"
                }
            ]
        }
    },"hair color":{
        "category":{
            "Global Color (Grey Coverage) - Matrix or Equal":[
                {
                    "name":"Shoulder Length",
                    "time":"60 min",
                    "cost":"1800"
                },
                {
                    "name":"Mid Back Length",
                    "time":"90 min",
                    "cost":"3000"
                },
                {
                    "name":"Waist Length",
                    "time":"105 min",
                    "cost":"4800"
                }
            ],
            "Global Color (Grey Coverage) - Majirel or Equal":[
                {
                    "name":"Shoulder Length",
                    "time":"60 min",
                    "cost":"2400"
                },
                {
                    "name":"Mid Back Length",
                    "time":"90 min",
                    "cost":"3600"
                },
                {
                    "name":"Waist Length",
                    "time":"105 min",
                    "cost":"6000"
                }
            ],
            "Global Color (Grey Coverage) - Inoa or Equal":[
                {
                    "name":"Shoulder Length",
                    "time":"60 min",
                    "cost":"3000"
                },
                {
                    "name":"Mid Back Length",
                    "time":"90 min",
                    "cost":"4200"
                },
                {
                    "name":"Waist Length",
                    "time":"105 min",
                    "cost":"6500"
                }
            ],
            "Fashion Color - Matrix or Equal":[
                {
                    "name":"Shoulder Length",
                    "time":"60 min",
                    "cost":"2400"
                },
                {
                    "name":"Mid Back Length",
                    "time":"90 min",
                    "cost":"3600"
                },
                {
                    "name":"Waist Length",
                    "time":"105 min",
                    "cost":"5400"
                }
            ],
            "Fashion Color - Majirel or Equal":[
                {
                    "name":"Shoulder Length",
                    "time":"60 min",
                    "cost":"3000"
                },
                {
                    "name":"Mid Back Length",
                    "time":"90 min",
                    "cost":"4200"
                },
                {
                    "name":"Waist Length",
                    "time":"105 min",
                    "cost":"6500"
                }
            ],
            "Fashion Color - Inoa or Equal":[
                {
                    "name":"Shoulder Length",
                    "time":"60 min",
                    "cost":"3500"
                },
                {
                    "name":"Mid Back Length",
                    "time":"90 min",
                    "cost":"4800"
                },
                {
                    "name":"Waist Length",
                    "time":"105 min",
                    "cost":"7200"
                }
            ],
            "Global Fashion Color with Pre-Lightnening - Matrix or Equal":[
                {
                    "name":"Shoulder Length",
                    "time":"90 min",
                    "cost":"3000"
                },
                {
                    "name":"Mid Back Length",
                    "time":"120 min",
                    "cost":"4200"
                },
                {
                    "name":"Waist Length",
                    "time":"150 min",
                    "cost":"6000"
                }
            ],
            "Global Fashion Color with Pre-Lightnening - Majirel or Equal":[
                {
                    "name":"Shoulder Length",
                    "time":"90 min",
                    "cost":"3600"
                },
                {
                    "name":"Mid Back Length",
                    "time":"120 min",
                    "cost":"4800"
                },
                {
                    "name":"Waist Length",
                    "time":"150 min",
                    "cost":"7200"
                }
            ],
            "Global Fashion Color with Pre-Lightnening - Inoa or Equal":[
                {
                    "name":"Shoulder Length",
                    "time":"90 min",
                    "cost":"4200"
                },
                {
                    "name":"Mid Back Length",
                    "time":"120 min",
                    "cost":"5400"
                },
                {
                    "name":"Waist Length",
                    "time":"150 min",
                    "cost":"7800"
                }
            ],
            "Streaks - Matrix or Equal":[
                {
                    "name":"Shoulder Length",
                    "time":"60 min for 2 Streaks",
                    "cost":"250"
                },
                {
                    "name":"Mid Back Length",
                    "time":"60 min for 2 Streaks",
                    "cost":"300"
                },
                {
                    "name":"Waist Length",
                    "time":"60 min for 2 Streaks",
                    "cost":"375"
                }
            ],
            "Streaks - Majirel or Equal":[
                {
                    "name":"Shoulder Length",
                    "time":"60 min for 2 Streaks",
                    "cost":"300"
                },
                {
                    "name":"Mid Back Length",
                    "time":"60 min for 2 Streaks",
                    "cost":"375"
                },
                {
                    "name":"Waist Length",
                    "time":"60 min for 2 Streaks",
                    "cost":"450"
                }
            ],
            "Streaks - Inoa or Equal":[
                {
                    "name":"Shoulder Length",
                    "time":"60 min for 2 Streaks",
                    "cost":"375"
                },
                {
                    "name":"Mid Back Length",
                    "time":"60 min for 2 Streaks",
                    "cost":"450"
                },
                {
                    "name":"Waist Length",
                    "time":"60 min for 2 Streaks",
                    "cost":"500"
                }
            ],
            "Root Touch-Ups":[
                {
                    "name":"Matrix or Equal",
                    "time":"60 min",
                    "cost":"720"
                },
                {
                    "name":"Majirel or Equal",
                    "time":"60 min",
                    "cost":"850"
                },
                {
                    "name":"Inoa or Equal",
                    "time":"60 min",
                    "cost":"1000"
                },
                {
                    "name":"Schwarzkopf or Equal",
                    "time":"60 min",
                    "cost":"1000"
                }
            ]
        }
    },
        "waxing":{
            "category":{
                "Basic:Normal Wax":[
                    {
                        "name":"upper lips",
                        "time":"05 min",
                        "cost":"50"
                    },
                    {
                        "name":"chin",
                        "time":"05 min",
                        "cost":"60"
                    },
                    {
                        "name":"side locks",
                        "time":"10 min",
                        "cost":"70"
                    },
                    {
                        "name":"under arms",
                        "time":"10 min",
                        "cost":"60"
                    },
                    {
                        "name":"full arms",
                        "time":"15 min",
                        "cost":"240"
                    },
                    {
                        "name":"half legs",
                        "time":"15 min",
                        "cost":"240"
                    },
                    {
                        "name":"full legs",
                        "time":"20 min",
                        "cost":"360"
                    },
                    {
                        "name":"half back",
                        "time":"10 min",
                        "cost":"240"
                    },
                    {
                        "name":"full back",
                        "time":"10 min",
                        "cost":"350"
                    },
                    {
                        "name":"half front",
                        "time":"10 min",
                        "cost":"240"
                    },
                    {
                        "name":"full front",
                        "time":"15 min",
                        "cost":"360"
                    },
                    {
                        "name":"Bikini Wax",
                        "time":"45 min",
                        "cost":"850"
                    },
                    {
                        "name":"full body wax",
                        "time":"60 min",
                        "cost":"1800"
                    }
                ],
                "Standard:Gold/Chocolate Wax":[
                    {
                        "name":"upper lips",
                        "time":"05 min",
                        "cost":"60"
                    },
                    {
                        "name":"chin",
                        "time":"05 min",
                        "cost":"70"
                    },
                    {
                        "name":"side locks",
                        "time":"10 min",
                        "cost":"150"
                    },
                    {
                        "name":"under arms",
                        "time":"10 min",
                        "cost":"85"
                    },
                    {
                        "name":"full arms",
                        "time":"15 min",
                        "cost":"360"
                    },
                    {
                        "name":"half legs",
                        "time":"15 min",
                        "cost":"360"
                    },
                    {
                        "name":"full legs",
                        "time":"20 min",
                        "cost":"420"
                    },
                    {
                        "name":"half back",
                        "time":"10 min",
                        "cost":"360"
                    },
                    {
                        "name":"full back",
                        "time":"10 min",
                        "cost":"550"
                    },
                    {
                        "name":"half front",
                        "time":"10 min",
                        "cost":"360"
                    },
                    {
                        "name":"full front",
                        "time":"15 min",
                        "cost":"540"
                    },
                    {
                        "name":"Bikini Wax",
                        "time":"45 min",
                        "cost":"950"
                    },
                    {
                        "name":"full body wax",
                        "time":"60 min",
                        "cost":"2200"
                    }
                ],
                "Premium:Rica Wax/De Tan/Brazilian Wax":[
                    {
                        "name":"upper lips",
                        "time":"05 min",
                        "cost":"70"
                    },
                    {
                        "name":"chin",
                        "time":"05 min",
                        "cost":"85"
                    },
                    {
                        "name":"side locks",
                        "time":"10 min",
                        "cost":"200"
                    },
                    {
                        "name":"under arms",
                        "time":"10 min",
                        "cost":"120"
                    },
                    {
                        "name":"full arms",
                        "time":"15 min",
                        "cost":"480"
                    },
                    {
                        "name":"half legs",
                        "time":"15 min",
                        "cost":"480"
                    },
                    {
                        "name":"full legs",
                        "time":"20 min",
                        "cost":"600"
                    },
                    {
                        "name":"half back",
                        "time":"10 min",
                        "cost":"550"
                    },
                    {
                        "name":"full back",
                        "time":"10 min",
                        "cost":"960"
                    },
                    {
                        "name":"half front",
                        "time":"10 min",
                        "cost":"480"
                    },
                    {
                        "name":"full front",
                        "time":"15 min",
                        "cost":"960"
                    },
                    {
                        "name":"Bikini Wax",
                        "time":"45 min",
                        "cost":"1300"
                    },
                    {
                        "name":"full body wax",
                        "time":"60 min",
                        "cost":"3000"
                    }
                ]
            }
        },
        "body pampering":{
            "category":{
                "Back & Shoulder massage":[
                    {
                        "name":"Fruit Cream/Oil",
                        "time":"15 min",
                        "cost":"350"
                    },
                    {
                        "name":"Spa Oils + Pack",
                        "time":"20 min",
                        "cost":"480"
                    },
                    {
                        "name":"Spa Oils + Scrubbing + Pack",
                        "time":"20 min",
                        "cost":"600"
                    }
                ],
                "Foot Massage":[
                    {
                        "name":"Fruit Cream/Oil",
                        "time":"20 min",
                        "cost":"300"
                    },
                    {
                        "name":"Spa Oils + Pack",
                        "time":"20 min",
                        "cost":"420"
                    },
                    {
                        "name":"Spa Oils + Scrubbing + Pack",
                        "time":"20 min",
                        "cost":"550"
                    }
                ],
                "Full Body Massage/Polishing":[
                    {
                        "name":"Fruit Cream/Oil",
                        "time":"90 min",
                        "cost":"1000"
                    },
                    {
                        "name":"Spa Oils + Pack",
                        "time":"90 min",
                        "cost":"1500"
                    },
                    {
                        "name":"Spa Oils + Scrubbing + Pack",
                        "time":"90 min",
                        "cost":"2000"
                    }
                ]
            }
        },
        "make up":{
            "category":{
                "Light party make-up":[
                    {
                        "name":"Basic: Hairdo, Draping and Lakem/Lotus Makeup or Equal",
                        "time":"30 min",
                        "cost":"1199"
                    },
                    {
                        "name":"Standard: Hairdo, Draping and Kryolan Makeup or Equal",
                        "time":"45 min",
                        "cost":"1559"
                    },
                    {
                        "name":"Premium: Hairdo, Draping and MAC Makeup or Equal",
                        "time":"60 min",
                        "cost":"1799"
                    }
                ],
                "Night Party makeup":[
                    {
                        "name":"Basic: Hairdo, Draping and Lakem/Lotus Makeup or Equal",
                        "time":"30 min",
                        "cost":"1599"
                    },
                    {
                        "name":"Standard: Hairdo, Draping and Kryolan Makeup or Equal",
                        "time":"45 min",
                        "cost":"2199"
                    },
                    {
                        "name":"Premium: Hairdo, Draping and MAC Makeup or Equal",
                        "time":"60 min",
                        "cost":"2499"
                    }
                ]
            }
        }
    }
}


/*function CookieManager(){
 this.setCookie= function (cname, cvalue, exdays) {
 var d = new Date();
 d.setTime(d.getTime() + (exdays*24*60*60*1000));
 var expires = "expires="+d.toUTCString();
 document.cookie = cname + "=" + cvalue + "; " + expires+"; "+"path=/; domain=lookplex.com";
 };

 this.getCookie= function (cname) {
 var name = cname + "=";
 var ca = document.cookie.split(';');
 for(var i=0; i<ca.length; i++) {
 var c = ca[i];
 while (c.charAt(0) ==' ') c = c.substring(1);
 if (c.indexOf(name) == 0) return c.substring(name.length, c.length);
 }
 return "";
 };
 this.deleteCookie = function(cname){
 document.cookie = cname + "=" + "; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/; domain=lookplex.com";
 };
 this.displayAllCookie = function(){
 console.log(document.cookie);
 }

 };
 var cm = new CookieManager();
 function updateCart(e) {
 if($(e.target).is(':checked')){
 $bookingCart.add($(e.target).attr('id'));
 }else{
 $bookingCart.delete($(e.target).attr('id'));
 }
 var sum = 0
 $bookingCart.forEach(function(data){
 var arr = data.split('_');
 sum = sum + parseInt(arr[arr.length-1]);
 })
 $subTotal = sum;
 if($promocodeApplied){
 sum = sum - (sum * 40/100);
 }
 window.booking.amount = sum;
 new CartListView({cart:$bookingCart,coupon:$promocodeApplied,amount:window.booking.amount}).render();
 updateLocalStorage($bookingCart);
 };
 */
$(document).ready(function(){
    if(localStorage.getItem('cart') != null){
        var itemNames = JSON.parse(localStorage.getItem("cart"));
        $.each(itemNames,function(index,data){
            $bookingCart.add(data);
        })
        var sum = 0
        $bookingCart.forEach(function(data){
            var arr = data.split('_');
            sum = sum + parseInt(arr[arr.length-1]);
        })
        $subTotal = sum;
        $discount = localStorage.getItem('discount');
        new CartListView({cart:$bookingCart,discount:getDiscount(),amount:getAmount()}).render();
        updateCheckBoxes();
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
function render_umenu(){
    if($user.displayName != null){
        var a_top=new TopAccMenu();
        a_top.render();
    }
    else{
        $(".top-menu>a[data-target=#logout]").attr({"data-target":"#login"}).html("Log In");
    }
}
var TopAccMenu=Backbone.View.extend({
    el:'.top-menu>a:last',
    events:{
        'click #logout0':'logout'
    },
    show_menu:function(){
        $(".top-menu>a:last>ul").toggleClass("hidden");
    },
    hide_menu:function(){
        $(".top-menu>a:last>ul").toggleClass("hidden");
    },
    logout:function(e){
        $user.displayName = null;
        if($user.platform=="facebook"){
            FB.logout(function(){
                logoutFromServer().success(function() {    clearUser(); render_umenu();    })
            });
        }
        else {
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
    render:function(){
        var temp=_.template($("#p_img").html());
        var html=temp({i:  $user.image,j:  $user.displayName});
        this.$el.html(html).trigger('create');
        $(".top-menu>a:last").attr("data-target","#logout");
    }
});
var FacialListView = Backbone.View.extend({
    el:'.servicelist',
    events: {
        'click [type="checkbox"]': 'checkBoxClicked'
    },
    initialize:function(options){
        this.options=options;
    },
    render:function(){
        var temp = _.template($("#facial-list").html());
        var html = temp({data:this.options.data});
        this.$el.html(html).trigger("create");
    },
    checkBoxClicked: function (e) {
        updateCart(e);
    }
});
var CleanUpListView = Backbone.View.extend({
    el:'.servicelist',
    events: {
        'click [type="checkbox"]': 'checkBoxClicked'
    },
    initialize:function(options){
        this.options=options;
    },
    render:function(){
        var temp = _.template($("#cleanUp-list").html());
        var html = temp({data:this.options.data});
        this.$el.html(html).trigger("create");
        //updateCheckBoxes();
    },
    checkBoxClicked: function (e) {
        updateCart(e);
    }
});
var ThreadingListView = Backbone.View.extend({
    el:'.servicelist',
    events: {
        'click [type="checkbox"]': 'checkBoxClicked'
    },
    initialize:function(options){
        this.options=options;
    },
    render:function(){
        var temp = _.template($("#threading-list").html());
        var html = temp({data:this.options.data});
        this.$el.html(html).trigger("create");
        //updateCheckBoxes();
    },
    checkBoxClicked: function (e) {
        updateCart(e);
    }
});
var BleachListView = Backbone.View.extend({
    el:'.servicelist',
    events: {
        'click [type="checkbox"]': 'checkBoxClicked'
    },
    initialize:function(options){
        this.options=options;
    },
    render:function(){
        var temp = _.template($("#bleach-list").html());
        var html = temp({data:this.options.data});
        this.$el.html(html).trigger("create");
        //updateCheckBoxes();
    },
    checkBoxClicked: function (e) {
        updateCart(e);
    }
});
var HairStyleListView = Backbone.View.extend({
    el:'.servicelist',
    events: {
        'click [type="checkbox"]': 'checkBoxClicked'
    },
    initialize:function(options){
        this.options=options;
    },
    render:function(){
        var temp = _.template($("#hairStyle-list").html());
        var html = temp({data:this.options.data});
        this.$el.html(html).trigger("create");
        //updateCheckBoxes();
    },
    checkBoxClicked: function (e) {
        updateCart(e);
    }
});
var HairCareListView = Backbone.View.extend({
    el:'.servicelist',
    events: {
        'click [type="checkbox"]': 'checkBoxClicked'
    },
    initialize:function(options){
        this.options=options;
    },
    render:function(){
        var temp = _.template($("#hairCare-list").html());
        var html = temp({data:this.options.data});
        this.$el.html(html).trigger("create");
        //updateCheckBoxes();
    },
    checkBoxClicked: function (e) {
        updateCart(e);
    }
});
var HairColorListView = Backbone.View.extend({
    el:'.servicelist',
    events: {
        'click [type="checkbox"]': 'checkBoxClicked'
    },
    initialize:function(options){
        this.options=options;
    },
    render:function(){
        var temp = _.template($("#hairColor-list").html());
        var html = temp({data:this.options.data});
        this.$el.html(html).trigger("create");
        //updateCheckBoxes();
    },
    checkBoxClicked: function (e) {
        updateCart(e);
    }
});
var WaxingListView = Backbone.View.extend({
    el:'.servicelist',
    events: {
        'click [type="checkbox"]': 'checkBoxClicked'
    },
    initialize:function(options){
        this.options=options;
    },
    render:function(){
        var temp = _.template($("#waxing-list").html());
        var html = temp({data:this.options.data});
        this.$el.html(html).trigger("create");
        //updateCheckBoxes();
    },
    checkBoxClicked: function (e) {
        updateCart(e);
    }
});
var BodyPamperingListView = Backbone.View.extend({
    el:'.servicelist',
    events: {
        'click [type="checkbox"]': 'checkBoxClicked'
    },
    initialize:function(options){
        this.options=options;
    },
    render:function(){
        var temp = _.template($("#bodyPampering-list").html());
        var html = temp({data:this.options.data});
        this.$el.html(html).trigger("create");
        //updateCheckBoxes();
    },
    checkBoxClicked: function (e) {
        updateCart(e);
    }
});
var MakeUpListView = Backbone.View.extend({
    el:'.servicelist',
    events: {
        'click [type="checkbox"]': 'checkBoxClicked'
    },
    initialize:function(options){
        this.options=options;
    },
    render:function(){
        var temp = _.template($("#makeup-list").html());
        var html = temp({data:this.options.data});
        this.$el.html(html).trigger("create");
        //updateCheckBoxes();
    },
    checkBoxClicked: function (e) {
        updateCart(e);
    }
});

var BookingModal=Backbone.View.extend({
    el:'#otp .modal-content',
    events:{
        'click #nextbook':'next',
        'change input':'changedata',
        'change #city':'changecity',
        'click #backbook':'back',
        'focus #dd':'showdates',
        'click #datelist a.list-group-item':'clickedondate',
        'focus #tt':'showtime',
        'click #time a.list-group-item':'clickontime',
        'keyup .cm1':'otpadd'
    },
    initialize:function(options){
        this.options=options;
        if(window.bs==1){
            this.dates= this.generateDates();
        }
    },
    render:function(){
        var temp=_.template($("#booking_modal_template").html());
        this.$el.html(temp({stat:window.bs||0,data:this.options,dates:this.dates||[]})).trigger('create');
    },
    otpadd:function(e) {
        e.stopImmediatePropagation();
        var t=$(e.currentTarget);
        if(Number.isInteger(parseInt(t.val()))){
            t.next().focus();
        }
        else{
            t.val("");
        }

    },
    clickontime:function(e){
        e.stopImmediatePropagation();
        var item=$(e.currentTarget);
        window.booking.time=item.attr('value');
        $("#time").slideUp();
        $("#tt").val(window.booking.time);
    },
    clickedondate:function(e){
        e.stopImmediatePropagation();
        var item=$(e.currentTarget);
        window.booking.date=item.attr('value');
        $("#dd").val(window.booking.date);
        $("#datelist").slideUp();
    },
    showdates:function(){
        $("#datelist").slideDown();
    },
    showtime:function(){
        $("#time").slideDown();
    },
    next:function(e) {
        e.stopImmediatePropagation();
        if(this.isValid()){
            window.bs++;
            if(window.bs==3){
                window.booking.datetime=window.booking.date+"__"+window.booking.time;
                window.booking.address=window.booking.city+"__"+window.booking.locality+"__"+window.booking.hofno+"__"+window.booking.landmark;
                console.log(window.booking);
                $.ajax({
                    url:$ROOT_URL+"/sendBookingOtp",
                    type:"POST",
                    cache:false,
                    data:window.booking,
                    xhrFields: {
                        withCredentials: true
                    },
                    success:function(data){
                        window.booking.lkey=data;
                        new BookingModal(window.booking).render();
                    },
                    error:function(data){
                        window.bs--;
                        new BookingModal(window.booking).render();
                        alert("Error sending OTP. Please check your internet connection!");
                    }
                });
            }
            else if(window.bs==4){
                    $.ajax({
                    url:$ROOT_URL+"/sendbookingacknew",
                    type:"POST",
                    cache:false,
                    data:window.booking,
                    dataType:'json',
                    xhrFields: {
                        withCredentials: true
                    },
                    success:function(data){
                        if(data.status=="OTPVERIFIED"){
                            window.booking.service = Array.from($bookingCart);
                            new BookingModal(window.booking).render();
                            $('#subtotal').text($subTotal);
                            $('#totalamount').text(window.booking.amount);
                            $('#discount').text($subTotal*$discount/100);
                        }
                        else{
                            window.bs--;
                            new BookingModal(window.booking).render();
                            alert("Wrong OTP. Please try again with correct OTP!");
                        }
                        $bookingCart.clear();
                        new CartListView({cart:$bookingCart,coupon:false}).render();
                        $(':checkbox').prop('checked', false);
                        localStorage.clear();
                    },
                    error:function(data){
                        window.bs--;
                        new BookingModal(window.booking).render();
                        alert("Wrong OTP. Please try again with correct OTP!");
                    }
                })
            }
            else{
                new BookingModal(window.booking).render();
            }
        }
        else{
            alert("Please input all the fields!");
        }
    },
    back:function(e){
        e.stopImmediatePropagation();
        if(window.bs>0){window.bs--;}
        new BookingModal(window.booking).render();
    },
    changedata:function(e){
        if($(e.currentTarget).attr('id')=="add"){
            window.booking.locality=$(e.currentTarget).val();
        }
        else if($(e.currentTarget).attr('id')=="hofno"){
            window.booking.hofno=$(e.currentTarget).val();
        }
        else if($(e.currentTarget).attr('id')=="landmark"){
            window.booking.landmark=$(e.currentTarget).val();
        }
        else if($(e.currentTarget).attr('id')=="mn"){
            window.booking.mobile=$(e.currentTarget).val();
        }
        window.booking.couponcode="LOOK40";
    },
    changecity:function() {
        window.booking.city=$("#city").val();
    },
    isValid:function(){
        if(!window.bs){window.bs=0;}
        if(window.bs==0){
            if(!window.booking.city || !window.booking.locality || !window.booking.landmark || !window.booking.hofno){    return false;     }
        }
        else if(window.bs==1){
            if(!window.booking.date || !window.booking.time){return false;}
        }
        else if(window.bs==2){
            if(!window.booking.mobile || window.booking.mobile.length!=10){return false;}
        }
        else if (window.bs==3) {
            var z=$(".cm1");
            var y="";
            for (var i = 0; i < z.length; i++) {
                y+=z.eq(i).val();
            }
            if(y.length!=6){   return false; window.booking.otp=""; }
            else{
                window.booking.otp=y;
            }
        }
        return true;
    },
    generateDates:function() {
        var out=[];
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
        var resultvalues=[(parseInt(dc)+1)+"/"+dates[0]+"/"+year];
        for (var i = 1; i < 14; i++) {
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

            }
            else{dates[i] = dates[i-1]+1;}//else set previous date + 1
            if(day>5){day=-1};day++;
            resultdates[i] = ((i==1)?"Tomorrow":weekday[day])+" - "+this.ordinal_suffix_of(dates[i]) +" "+cmonth;
            resultvalues[i] = (parseInt(dc)+1)+"/"+dates[i]+"/"+year;
        }
        var datehtml="";
        for (var i = 0; i < resultdates.length-7; i++) {
            datehtml+="<a class='list-group-item'  value='"+resultvalues[i]+"'>"+resultdates[i]+"</a>";
            //onclick='clickedondate(\""+resultdates[i]+"\")'
        }
        out[0]=datehtml;
        // $("#dates").html(datehtml);
        datehtml="";
        for (var i = 7; i < resultdates.length; i++) {
            datehtml+="<a class='list-group-item'  value='"+resultvalues[i]+"'>"+resultdates[i]+"</a>";
            //onclick='clickedondate(\""+resultdates[i]+"\")'
        }
        out[1]=datehtml;
        // $("#dates1").html(datehtml);
        $(".bookcontents").eq(0).addClass("showing");
        return out;
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
    }
})
var CartListView = Backbone.View.extend({
    el:'.cart-holder',
    events: {
        'click .fa-times': 'remove',
        'click #reqtobook':'booking',
        'click #promocode':'havepromocode',
        'click .apply':'applypromocode',
        'click #revert':'revertcode'
    },
    initialize:function(options){
        this.options=options;
    },
    render:function(){
        var temp = _.template($("#cart-list").html());
        var html = temp({cart:this.options.cart,discount:this.options.coupon,amount:this.options.amount});
        this.$el.html(html).trigger("create");
    },
    havepromocode:function(e){
        $('#promocode2').removeClass('hidden');
    },
    applypromocode:function(e){
        //gautam
        e.stopImmediatePropagation();
        var promo = $('#promoinput').val().toString().toLowerCase();
        if(promo == $promocode1){
            $discount = 40;
            new CartListView({cart:$bookingCart,discount:getDiscount(),amount:getAmount()}).render();
            localStorage.setItem('discount',$discount);
        }else if(promo == $promocode2){
            $discount = 30;
            new CartListView({cart:$bookingCart,discount:getDiscount(),amount:getAmount()}).render();
            localStorage.setItem('discount',$discount);
        }else{
            $('#prmoInvalid').removeClass('hidden');
        }
    },
    revertcode:function(){
        $discount = 0;
        //window.booking.amount = $subTotal + 100;
        new CartListView({cart:$bookingCart,discount:getDiscount(),amount:getAmount()}).render();
        localStorage.setItem('discount',0);

    },
    remove: function (e) {
        e.stopImmediatePropagation();
        updateCart(e);
        $('#'+ e.target.id).prop('checked', false);
        new CartListView({cart:$bookingCart,discount:getDiscount(),amount:getAmount()}).render();
    },
    booking:function(){
        if($subTotal>=$minBookinAmount){
            window.booking.amount = getAmount();
            window.booking.services = JSON.stringify(Array.from($bookingCart));
            if($user.displayName == null || $user.displayName == "" || $user.displayName == undefined){
                $('#login').modal("show");
            }else{
                $('#otp').modal("show");
                new BookingModal(window.booking).render();
            }
        }else{
            $(".alert").removeClass('hidden').alert();
        }

    },

});
var HomeView = Backbone.View.extend({
    el: '.main-container-top',//page-header
    events: {
        'click .f-menu': 'filter',
        'click #clearcart':'clearcart'
    },
    initialize: function (options) {
        this.options=options;
    },
    render: function () {
        var temp = _.template($("#searchtemplate").html());
        var html = temp();
        this.$el.html(html).trigger("create");
    },
    clearcart:function(e){
        e.stopImmediatePropagation()
        $(':checkbox').prop('checked', false);
        $bookingCart.clear();
        new CartListView({cart:$bookingCart,discount:getDiscount(),amount:getAmount()}).render();
        localStorage.removeItem('cart');
    },
    filter: function(e){
        var category = $(e.currentTarget).val();
        $('.servicelist').empty();
        switch(parseInt(category)){
            case 1:
                new FacialListView($data).render()
                break;
            case 2:
                new CleanUpListView($data).render()
                break;
            case 3:
                new ThreadingListView($data).render()
                break;
            case 4:
                new BleachListView($data).render()
                break;
            case 5:
                new HairStyleListView($data).render()
                break;
            case 6:
                new HairCareListView($data).render()
                break;
            case 7:
                new HairColorListView($data).render()
                break;
            case 8:
                new WaxingListView($data).render()
                break;
            case 9:
                new BodyPamperingListView($data).render()
                break;
            case 10:
                new MakeUpListView($data).render()
                break;
            default :
                new FacialListView($data).render()
                break;
        }
        updateCheckBoxes();
    }
});
//ROUTER
var Workspace = Backbone.Router.extend({
    initialize:function() {
        Backbone.history.start(/*{pushState: true}*/);
    },
    routes:{
        '': 'home'
    },
    home:function(){
        new HeaderNoSearchBar().render();
        new HomeView($data).render();
        new FacialListView($data).render();
        new CartListView({cart:$bookingCart,discount:getDiscount(),amount:getAmount()}).render();
    }
});
var router=new Workspace();

$(document).ready(function(){
    $('#otp').on('hidden.bs.modal', function () {
        window.bs=0;
        window.booking={};
    })
})

function updateCart(e) {
    if($(e.target).is(':checked')){
        $bookingCart.add($(e.target).attr('id'));
    }else{
        $bookingCart.delete($(e.target).attr('id'));
    }
    var sum = 0
    $bookingCart.forEach(function(data){
        var arr = data.split('_');
        sum = sum + parseInt(arr[arr.length-1]);
    })
    $subTotal = sum;
    // window.booking.amount = sum + 100;
    new CartListView({cart:$bookingCart,discount:getDiscount(),amount:getAmount()}).render();
    updateLocalStorage($bookingCart);
};
function updateLocalStorage(bookingCart){
    var arrayCart = new Array();
    bookingCart.forEach(function(data){
        arrayCart.push(data);
    });
    localStorage.removeItem('cart');
    localStorage.setItem("cart", JSON.stringify(arrayCart));
}
function logoutFromServer(){
    return $.ajax({
        type:"GET",
        url: $ROOT_URL + "/custlogout",
        dataType:"text",
        xhrFields: {
            withCredentials: true
        },
        success:function(data){
            location.reload();
        }
    }).fail(function(){
        console.log('failed');
    })
}
function updateCheckBoxes(){

    $bookingCart.forEach(function(data){
        $('#'+data).prop('checked', true);
    })
}
function getAmount(){
    return $subTotal - ($subTotal * $discount/100) +100;
}
function getDiscount(){
    /*if(($discount * $subTotal/100) == 0){
        return "0";
    }*/
    return $discount * $subTotal/100;
}
