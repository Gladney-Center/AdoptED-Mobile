let answers = {
    baby_name: "Reya",
};

const baby_names = [
    "Reya",
    "Katie",
    "Mallorie",
    "Jennifer",
    "Amy",
    "Kerry",
    "Anna",
    "Nia",
    "Ashanti",
    "Olivia",
    "Sofia",
    "Amelia",
    "Emily",
    "Ava",
    "Mariana",
    "Zendaya",
    "Grace",
    "Lily",
    "Tanisha",
    "Mia",
    "Willow",
    "Sophia",
    "Ivy",
    "Ruby",
    "Isabelle",
    "Lois",
    "Camila",
    "Rachel",
    "Danielle",
    "Poppy",
    "Phoebe",
    "Molly",
    "Maya",
    "Mary",
    "Angelina",
    "Jane",
    "Kali",
    "Mariana",
    "Aria",
    "Haley",
    "Jade",
    "Isabella",
    "Elsie",
    "Alice",
    "Marilyn",
    "Christina",
    "Evelyn",
    "Aurora",
];


$(document).ready(function() {
    // are we running in native app or in a browser?

    window.isphone = document.URL.indexOf("http://") === -1
        && document.URL.indexOf("https://") === -1;

    if( window.isphone ) {
        document.addEventListener("deviceready", onDeviceReady, false);
    } else {
        onDeviceReady();
    }
});

function onDeviceReady() {
    loadLandingPage();
}

function loadLandingPage() {
    changePage({
        template_id: 'landing_page',
        on_click: {
		    'smsLink': function () {
                window.open('sms:18004523639', '_system');
		    },
            'webLink': function () {
                window.open('https://pregnancyhotline.org', '_system');
            },
            'toIntroVideo': loadIntroVideo,
        },
        delay: {
            2000: function() {
                $('.item-quote').visibilityToggle().hide().addClass('fade-in-right').fadeIn();
                $('#gabbyLandingPage').on('click', loadIntroVideo)
            }
        },
    });
}

function loadIntroVideo() {
    changePage({
        template_id: 'video',
        on_click: {
          'toNextSlide': function() {
              $('body').append($('#video_player').html());
              if (cordova && cordova.platformId === 'ios') {
                  $('video').prop('controls', 'controls');
              }
              $('video').on('ended',function(){
                  loadIntroSlide1();
                  if (cordova && cordova.platformId === 'android') {
                      StatusBar.show();
                  }
              });
              StatusBar.hide();
          },
        },
    });
}

let gabbyURL = "";
function loadIntroSlide1() {
    changePage({
        template_id: 'intro_slide1',
        overlay_id: 'confetti_explosion',
        on_load: function() {
            $('audio').prop('volume', 0.1);
        },
        on_click: {
            '.next-page': function() {
                switch ($(this).attr('id')) {
                    case 'overwhelmedImg':
                        answers.initial_feeling = "Overwhelmed";
                        gabbyURL = "assets/img/gabby-overwhelmed-nopreg.svg";
                        break;
                    case 'sadImg':
                        answers.initial_feeling = "Sad";
                        gabbyURL = "assets/img/gabby1.svg";
                        break;
                    case 'happyImg':
                        answers.initial_feeling = "Happy";
                        gabbyURL = "assets/img/gabby-happy-nopreg.svg";
                        break;
                }
                console.log(answers);
                loadIntroSlide2();
            },
        }
    });
}

function loadIntroSlide2() {
    let animate = new AnimationGroup([
        2000,
        function() {
            $('#fadeInText').fadeIn('slow');
        },
        2200,
        function() {
            $('#areYouSure').fadeIn('slow');
        },
        4000,
        function() {
            loadIntroSlide3();
        }
    ]);
    console.log(animate);
    changePage({
        template_id: 'intro_slide2',
        on_load: function() {
            $('#gabby1').attr('src', gabbyURL);
            animate.next.call(animate);
        },
        on_click: {
            '.bg-teal': function() {
                animate.next.call(animate);
            },
        },

    });
}

function loadIntroSlide3() {
    let animate = new AnimationGroup([
        4000,
        function() {
            $('.slider-container').fadeIn('slow');
        }
    ]);
    changePage({
        template_id: 'intro_slide3',
        on_load: function() {
            const elem = document.querySelector('input[type="range"]');
            const rangeValue = function(){
                const newValue = elem.value;
                const target = document.querySelector('.value');
                target.innerHTML = newValue+'%';
                $('#toIntroSlide4').fadeIn();
            };

            elem.addEventListener("input", rangeValue);
            animate.next.call(animate);
        },
        on_click: {
            'toIntroSlide4': function() {
                answers.percent_stay_together = $('.value').html();
                console.log(answers);
                loadIntroSlide4();
            },
            '.bg-teal': function() {
                animate.next.call(animate);
            }
        },
    });
}

function loadIntroSlide4() {
    let animate = new AnimationGroup([
        1000,
        function() {
            $('#introSlide4Text1').fadeIn('slow');
        },
        4000,
        function() {
            $('#introSlide4Text2').fadeIn(3000);
            $('#introSlide4Text3').fadeIn(3000);
            $('#toIntroSlide5').fadeIn(3000);
        }
    ]);
    changePage({
        template_id: 'intro_slide4',
        on_load: function() {
            animate.next.call(animate);
        },
        on_click: {
            'toIntroSlide5': loadIntroSlide5,
            '.bg-orange': function() {
                animate.next.call(animate);
            }
        },
    });
}

function loadIntroSlide5() {
    let animate = new AnimationGroup([
        1000,
        function() {
            $('#introSlide5Bubble1').show().addClass('fade-in-right');
        },
        2000,
        function() {
            $('#introSlide5Bubble4').show().addClass('fade-in');
        },
        3000,
        function() {
            $('#introSlide5Bubble4').hide();
            $('#introSlide5Bubble2').show().addClass('fade-in');
        },
        4000,
        function() {
            $('#introSlide5Bubble3').show().addClass('fade-in-right');
        },
        5000,
        function() {
            const elem = $('#introSlide5Bubble4');
            elem.css({ top: '42%' });
            elem.show().addClass('fade-in');
        },
        5000,
        function() {
            $('#introSlide5Bubble5').show().addClass('fade-in-right');
        },
        2000,
        function() {
            $('#introSlide5Bubble4').hide();
            $('#introSlide5Bubble5').animate({top: '42%'});
        },
        3000,
        function() {
            loadIntroSlide6();
        },
    ]);

    changePage({
        template_id: 'intro_slide5',
        on_load: function() {
            animate.next.call(animate);
        },
        on_click: {
            '.bg-orange': function() {
                animate.next.call(animate);
            },
        },
    });
}

function loadIntroSlide6() {
    //closure
    const loadIntroSlide7Once = (function() {
        let hasRun = false;
        return function() {
            if(!hasRun) {
                hasRun = true;
                loadIntroSlide7();
            }
        };
    })();

    changePage({
        template_id: 'intro_slide6',
        on_click: {
            '.bg-red': loadIntroSlide7Once,
        },
        delay: {
            5000: loadIntroSlide7Once,
        },
        transition: "none",
    });
}

function loadIntroSlide7() {
    changePage({
        template_id: 'intro_slide7',
        on_click: {
            'toIntroVideo2': loadIntroVideo2,
        }
    });
}

function loadIntroVideo2(){
    changePage({
        template_id: 'video',
        on_click: {
            'toNextSlide': function() {
                $('body').append($('#video_player2').html());
                if (cordova && cordova.platformId === 'ios') {
                    $('video').prop('controls', 'controls');
                }
                $('video').on('ended',function(){
                    loadIntroSlide8();
                    if (cordova && cordova.platformId === 'android') {
                        StatusBar.show();
                    }
                });
                StatusBar.hide();
            },
        },
    });
}

function loadIntroSlide8() {
    changePage({
        template_id: 'decision_slide',
        on_click: {
            'firstLearnMore': loadExplanationSlide,
            'secondLearnMore': loadExplanationSlide,
            'firstClickArea': function() {
                $('.signs').attr('src', 'assets/img/roadsigns-navy-adoption.svg');
            },
            'secondClickArea': function() {
                $('.signs').attr('src', 'assets/img/roadsigns-navy-parenting.svg');
            },
            'pathSubmit': function() {
                const signImg = $('.signs');
                if(signImg.attr('src') === 'assets/img/roadsigns-navy-adoption.svg') {
                    answers.path = "Adoption";
                    loadAdoptionSlide1();
                }
                else if(signImg.attr('src') === 'assets/img/roadsigns-navy-parenting.svg') {
                    answers.path = "Parenting";
                    loadParentingSlide1();
                }
            }
        }
    });
}

function loadExplanationSlide() {
    changePage({
        template_id: 'explanation_slide',
        on_click: {
            '.close-container': loadIntroSlide8,
        }
    });
}


/////////////////
//Adoption Path//
/////////////////

function loadAdoptionSlide1() {
    changePage({
        template_id: 'adoption_slide1',
        on_load: function() {
            pulse();
            answers.family_characteristics = {
                family_dynamic: '',
                interests: [],
                home_style: '',
                location: '',
            };
        },
        on_click: {
            '.next': loadAdoptionSlide2,
        },
        transition: 'none',
    });
}

function loadAdoptionSlide2() {
    changePage({
        template_id: 'adoption_slide2',
        on_click: {
            '.next': loadAdoptionSlide3,
        }
    });
}

function loadAdoptionSlide3() {
    changePage({
        template_id: 'adoption_slide3',
        on_click: {
            '.next': loadAdoptionSlide4,
        }
    });
}

function loadAdoptionSlide4() {
    changePage({
        template_id: 'adoption_slide4',
        on_click: {
            '.next': loadAdoptionSlide5,
        }
    });
}

function loadAdoptionSlide5() {
    changePage({
        template_id: 'adoption_slide5',
        on_load: function() {
            $('.text-pad').hide().fadeIn('slow');
        },
        on_click: {
            '.next': function(){
                let isOffline = 'onLine' in navigator && !navigator.onLine;
                (isOffline) ? loadAdoptionSlide7() : loadAdoptionSlide6();
            },
        },
        transition: 'none',
    });
}

function loadAdoptionSlide6() {
    changePage({
        template_id: 'adoption_slide6',
        on_click: {
            'toQuestionSlide': loadQuestionSlide,
        }
    });
}

function loadQuestionSlide() {
    changePage({
        template_id: 'question_slide',
        on_click: {
            '.next': function() {
                answers.question_for_caseworker = $('textarea').val();
                console.log(answers);
                loadAdoptionSlide7();
            },
        }
    });
}

function loadAdoptionSlide7() {
    changePage({
        template_id: 'adoption_slide7',
        on_click: {
            '.next': loadAdoptionSlide8,
        }
    });
}

function loadAdoptionSlide8() {
    changePage({
        template_id: 'adoption_slide8',
        on_load: function() {
            $('.text-pad').hide().fadeIn('slow');
        },
        on_click: {
            '.next': loadAdoptionSlide9,
        },
        transition: 'none',
    });
}

function loadAdoptionSlide9() {
    changePage({
        template_id: 'adoption_slide9',
        on_click: {
            'counseling': function() {
                loadTopicExplanations();
                window.location.hash = "#counselingExplanation";
            },
            'medicalCare': function() {
                loadTopicExplanations();
                window.location.hash = "#medicalCareExplanation";
            },
            'financialSupport': function() {
                loadTopicExplanations();
                window.location.hash = "#financialSupportExplanation";
            },
            'legalServices': function() {
                loadTopicExplanations();
                window.location.hash = "#legalServicesExplanation";
            },
            'livingAtHome': function() {
                loadTopicExplanations();
                window.location.hash = "#livingAtHomeExplanation";
            },
            'careerSupport': function() {
                loadTopicExplanations();
                window.location.hash = "#careerSupportExplanation";
            },
            'postAdoptionSupport': function() {
                loadTopicExplanations();
                window.location.hash = "#postAdoptionSupportExplanation";
            },
            '.next': loadAdoptionSlide10,
        },
    });
}

function loadTopicExplanations() {
    changePage({
        template_id: 'topic_explanations',
        on_click: {
            '.close-container': loadAdoptionSlide9,
        },
        transition: 'none',
    });
}

function loadAdoptionSlide10() {
    changePage({
        template_id: 'adoption_slide10',
        on_click: {
            '.next': loadAdoptionSlide11,
        }
    });
}

function loadAdoptionSlide11() {
    changePage({
        template_id: 'adoption_slide11',
        on_load: function() {
            $('.text-pad').hide().fadeIn('slow');
        },
        on_click: {
            'video3': loadVideo3,
        },
        transition: 'none',
    });
}

function loadVideo3() {
    changePage({
        template_id: 'video',
        on_click: {
            'toNextSlide': function() {
                $('body').append($('#video_player3').html());
                if (cordova && cordova.platformId === 'ios') {
                    $('video').prop('controls', 'controls');
                }
                $('video').on('ended',function(){
                    loadAdoptionSlide12();
                    if (cordova && cordova.platformId === 'android') {
                        StatusBar.show();
                    }
                });
                StatusBar.hide();
            },
        },
    });
}

function loadAdoptionSlide12() {
    changePage({
        template_id: 'adoption_slide12',
        on_click: {
            '.next': loadAdoptionSlide13,
        }
    });
}

function loadAdoptionSlide13() {
    changePage({
        template_id: 'adoption_slide13',
        on_click: {
            '.next': loadAdoptionSlide14,
        }
    });
}

function loadAdoptionSlide14() {
    changePage({
        template_id: 'adoption_slide14',
        on_click: {
            '.next': loadAdoptionSlide15,
        }
    });
}

function loadAdoptionSlide15() {
    changePage({
        template_id: 'adoption_slide15',
        on_load: function() {
            $('.text-pad').hide().fadeIn('slow');
        },
        on_click: {
            '.next': loadAdoptionSlide16,
        },
        transition: 'none',
    });
}

let familyCharacteristics = {
    family_dynamic: '',
    interests: [],
    home_style: '',
    location: '',
};

function loadAdoptionSlide16() {
    changePage({
        template_id: 'adoption_slide16',
        on_click: {
            '.grid-item': function() {
                const res = singleGridItemSelect(this);
                if(res) {
                    familyCharacteristics.family_dynamic = res[0];
                    answers.family_characteristics.family_dynamic = res[1];
                    $('.next').fadeIn('slow');
                }
            },
            '.next': loadAdoptionSlide17,
        }
    });
}

function loadAdoptionSlide17() {
    changePage({
        template_id: 'adoption_slide17',
        on_click: {
            '.grid-item': function() {
                const border = $(this).css('border');
                if(border.substring(border.indexOf('rgb')) === 'rgba(0, 0, 0, 0.2)') {
                    if (familyCharacteristics.interests.length < 9) {
                        $(this).css('border', '0.07em solid rgba(222, 98, 115, 1)');
                        familyCharacteristics.interests
                            .push($(this).children().attr('src'));
                        answers.family_characteristics.interests.push($(this).data('tag'));
                    }
                    $('.next').fadeIn('slow');
                }
                else {
                    $(this).css('border', '0.07em solid rgba(0, 0, 0, 0.2)');
                    familyCharacteristics.interests
                        .splice(familyCharacteristics.interests.indexOf($(this).children().attr('src')), 1);
                    answers.family_characteristics.interests
                        .splice(answers.family_characteristics.interests.indexOf($(this).data('tag')), 1);
                }
            },
            '.next': loadAdoptionSlide18,
        }
    });
}

function loadAdoptionSlide18() {
    changePage({
        template_id: 'adoption_slide18',
        on_click: {
            '.grid-item': function() {
                const res = singleGridItemSelect(this);
                if(res) {
                    familyCharacteristics.home_style = res[0];
                    answers.family_characteristics.home_style = res[1];
                    $('.next').fadeIn('slow');
                }
            },
            '.next': loadAdoptionSlide19,
        }
    });
}

function loadAdoptionSlide19() {
    changePage({
        template_id: 'adoption_slide19',
        on_click: {
            '.grid-item': function() {
                const res = singleGridItemSelect(this);
                if(res) {
                    familyCharacteristics.location = res[0];
                    answers.family_characteristics.location = res[1];
                    $('.next').fadeIn('slow');
                }
            },
            '.next': loadAdoptionSlide20,
        }
    });
}

function loadAdoptionSlide20() {
    changePage({
        template_id: 'adoption_slide20',
        on_load: function() {
            let cell_count = 0;
            if(familyCharacteristics.family_dynamic) {
                $('img').eq(cell_count).attr('src', familyCharacteristics.family_dynamic);
                $('.grid-item').first().addClass('base');
                cell_count++;
            }
            for(let src of familyCharacteristics.interests) {
                $('img').eq(cell_count).attr('src', src);
                cell_count++;
            }
            if(familyCharacteristics.home_style) {
                $('img').eq(cell_count).attr('src', familyCharacteristics.home_style);
                cell_count++;
            }
            if(familyCharacteristics.location) {
                $('img').eq(cell_count).attr('src', familyCharacteristics.location);
            }
            console.log(answers);
        },
        on_click: {
            '.next': loadAdoptionSlide21,
        }
    });
}

function loadAdoptionSlide21() {
    changePage({
        template_id: 'adoption_slide21',
        on_click: {
            'video4': loadVideo4,
        }
    });
}

function loadVideo4() {
    changePage({
        template_id: 'video',
        on_click: {
            'toNextSlide': function() {
                $('body').append($('#video_player4').html());
                if (cordova && cordova.platformId === 'ios') {
                    $('video').prop('controls', 'controls');
                }
                $('video').on('ended',function(){
                    loadAdoptionSlide22();
                    if (cordova && cordova.platformId === 'android') {
                        StatusBar.show();
                    }
                });
                StatusBar.hide();
            },
        },
    });
}

let adoptive_parents = "Abby and Will";
function loadAdoptionSlide22() {
    changePage({
        template_id: 'decision_slide',
        on_load: function() {
            $('#firstLearnMore, #secondLearnMore, #pathSubmit').hide();
            $('.signs').attr('src', 'assets/img/roadsigns-adoptiveparents-bothteal.svg');
        },
        on_click: {
            'firstClickArea': function() {
                $('.signs').attr('src', 'assets/img/roadsigns-adoptiveparents-will-navy.svg');
                $('#pathSubmit').fadeIn('slow');
            },
            'secondClickArea': function() {
                $('.signs').attr('src', 'assets/img/roadsigns-adoptiveparents-mike-navy.svg');
                $('#pathSubmit').fadeIn('slow');
            },
            'pathSubmit': function() {
                const signImg = $('.signs');
                if(signImg.attr('src') === 'assets/img/roadsigns-adoptiveparents-will-navy.svg') {
                    adoptive_parents = "Abby and Will";
                }
                else if(signImg.attr('src') === 'assets/img/roadsigns-adoptiveparents-mike-navy.svg') {
                    adoptive_parents = "Astra and Mike";
                }
                loadAdoptionSlide23();
                answers.adoptive_parents = adoptive_parents;
                console.log(answers);
            }
        }
    });
}

function loadAdoptionSlide23() {
    changePage({
        template_id: 'adoption_slide23',
        on_load: function() {
            $('.ap-names').html(adoptive_parents);
            const img = $('.bottom-center-person');
            img.css('height', '62%');
            if(adoptive_parents === "Abby and Will")
                img.attr('src', 'assets/img/adoptiveparents-will-and-abby.svg');
            else if (adoptive_parents === "Astra and Mike")
                img.attr('src', 'assets/img/adoptiveparents-mike-and-astra.svg');
        },
        on_click: {
            '.next': loadAdoptionSlide24,
        }
    });
}

function loadAdoptionSlide24() {
    changePage({
        template_id: 'adoption_slide24',
        on_click: {
            '.next': function() {
                $('#adoptionSlide24Text1').fadeOut('slow', function() {
                    $('#adoptionSlide24Text2').fadeIn('slow');
                });
                $(this).off('click');
                $(this).on('click', loadAdoptionSlide25);
            }
        }
    });
}

function loadAdoptionSlide25() {
    changePage({
        template_id: 'adoption_slide25',
        on_click: {
            'deliveryDecisionMedicated': function() {
                $(this).attr('src', 'assets/img/delivery-decision-medicated-withstroke.svg');
                $('#deliveryDecisionNatural').attr('src', 'assets/img/delivery-decision-natural-nostroke.svg');
                answers.delivery_decision = "Medicated delivery";
                console.log(answers);
                $('.next').fadeIn('slow');
            },
            'deliveryDecisionNatural': function() {
                $(this).attr('src', 'assets/img/delivery-decision-natural-withstroke.svg');
                $('#deliveryDecisionMedicated').attr('src', 'assets/img/delivery-decision-medicated-nostroke.svg');
                answers.delivery_decision = "Natural birth";
                console.log(answers);
                $('.next').fadeIn('slow');
            },
            '.next': function() {
                loadAdoptionSlide26();
            }
        }
    });
}

function loadAdoptionSlide26() {
    changePage({
        template_id: 'adoption_slide26',
        on_click: {
            '.next': loadAdoptionSlide27,
        }
    });
}

function loadAdoptionSlide27() {
    changePage({
        template_id: 'adoption_slide27',
        on_click: {
            'stuffedAnimal': function() {
                $(this).attr('src', 'assets/img/hospitalitem-stuffed-animal-withstroke.svg');
                $('#blanket').attr('src', 'assets/img/hospitalitem-blanket-nostroke.svg');
                $('#scrapbook').attr('src', 'assets/img/hospitalitem-scrapbook-nostroke.svg');
                answers.baby_gift = "Stuffed Animal";
                console.log(answers);
                $('.next').fadeIn('slow');
            },
            'blanket': function() {
                $(this).attr('src', 'assets/img/hospitalitem-blanket-withstroke.svg');
                $('#stuffedAnimal').attr('src', 'assets/img/hospitalitem-stuffed-animal-nostroke.svg');
                $('#scrapbook').attr('src', 'assets/img/hospitalitem-scrapbook-nostroke.svg');
                answers.baby_gift = "Blanket";
                console.log(answers);
                $('.next').fadeIn('slow');
            },
            'scrapbook': function() {
                $(this).attr('src', 'assets/img/hospitalitem-scrapbook-withstroke.svg');
                $('#stuffedAnimal').attr('src', 'assets/img/hospitalitem-stuffed-animal-nostroke.svg');
                $('#blanket').attr('src', 'assets/img/hospitalitem-blanket-nostroke.svg');
                answers.baby_gift = "Scrapbook";
                console.log(answers);
                $('.next').fadeIn('slow');
            },
            '.next': loadAdoptionSlide28,
        }
    });
}

function loadAdoptionSlide28() {
    changePage({
        template_id: 'adoption_slide28',
        on_click: {
            '.next': loadAdoptionSlide29,
        }
    });
}

function loadAdoptionSlide29() {
    changePage({
        template_id: 'adoption_slide29',
        on_click: {
            '.next': loadAdoptionSlide30,
        }
    });
}

function loadAdoptionSlide30() {
    changePage({
        template_id: 'adoption_slide30',
        overlay_id: 'confetti_explosion',
        on_load: function() {
            $('audio').prop('volume', 0.1);
        },
        on_click: {
            '.next': loadAdoptionSlide31,
        }
    });
}

function loadAdoptionSlide31() {
    changePage({
        template_id: 'adoption_slide31',
        on_click: {
            '.next': loadAdoptionSlide32,
        }
    });
}

function loadAdoptionSlide32() {
    changePage({
        template_id: 'adoption_slide32',
        on_load: function() {
            $('.ap-names').html(adoptive_parents);
        },
        on_click: {
            '.next': loadAdoptionSlide33,
        }
    });
}

function loadAdoptionSlide33() {
    changePage({
        template_id: 'adoption_slide33',
        on_load: function() {
            let options = "";
            for(let name of baby_names) {
                options += `<option>${ name }</option>`;
            }
            $('#babyNameDropdown').append(options);
        },
        on_click: {
            '.next': function() {
                const name = $('#babyNameDropdown').val();
                if(name) {
                    answers.baby_name = name;
                    console.log(answers);
                    loadAdoptionSlide34();
                }
            },
        }
    });
}

function loadAdoptionSlide34() {
    changePage({
        template_id: 'adoption_slide34',
        on_click: {
            'video5': loadVideo5,
        }
    });
}

function loadVideo5() {
    changePage({
        template_id: 'video',
        on_click: {
            'toNextSlide': function() {
                $('body').append($('#video_player5').html());
                if (cordova && cordova.platformId === 'ios') {
                    $('video').prop('controls', 'controls');
                }
                $('video').on('ended',function(){
                    loadAdoptionSlide35();
                    if (cordova && cordova.platformId === 'android') {
                        StatusBar.show();
                    }
                });
                StatusBar.hide();
            },
        },
    });
}

function loadAdoptionSlide35() {
    changePage({
        template_id: 'adoption_slide35',
        on_click: {
            '.next': loadAdoptionSlide36,
        }
    });
}

function loadAdoptionSlide36() {
    changePage({
        template_id: 'adoption_slide36',
        on_load: function() {
            $('.ap-names').html(adoptive_parents);
            if(adoptive_parents === "Abby and Will")  {
                $('#apPlacement').attr('src', 'assets/img/adoptiveparents-placement-abby-will-baby.svg');
            }
            else if (adoptive_parents === "Astra and Mike") {
                $('#apPlacement').attr('src', 'assets/img/adoptiveparents-placement-mike-astra-baby.svg');
            }
            $('.baby-name').html(answers.baby_name);
        },
        on_click: {
            '.next': loadAdoptionSlide37,
        }
    });
}

function loadAdoptionSlide37() {
    changePage({
        template_id: 'adoption_slide37',
        on_load: function() {
            $('.bg-teal').children().hide();
        },
        on_click: {
            '.next': loadAdoptionSlide38,
        },
        delay: {
            500: function() {
                $('.bg-teal').children().each(function() {
              		$(this).fadeIn(3000);
			    });
            },
        }
    });
}

function loadAdoptionSlide38() {
    changePage({
        template_id: 'adoption_slide38',
        on_click: {
            '.next': loadAdoptionSlide39,
        }
    });
}

function loadAdoptionSlide39() {
    changePage({
        template_id: 'adoption_slide39',
        on_click: {
            '.next': loadAdoptionSlide40,
        }
    });
}

function loadAdoptionSlide40() {
    changePage({
        template_id: 'adoption_slide40',
        on_click: {
            '.next': loadAdoptionSlide41,
        }
    });
}

function loadAdoptionSlide41() {
    changePage({
        template_id: 'adoption_slide41',
        on_load: function() {
            pulse();
        },
        on_click: {
            '.next': loadAdoptionSlide42,
        },
        transition: 'none',
    });
}

function loadAdoptionSlide42() {
    changePage({
        template_id: 'adoption_slide42',
        on_click: {
            'nextStepsProg': function() {
                loadSupportExplanations();
                window.location.hash = '#nextStepsProgExplanation';
            },
            'counselingServ': function() {
                loadSupportExplanations();
                window.location.hash = '#counselingServExplanation';
            },
            'supportGroups': function() {
                loadSupportExplanations();
                window.location.hash = '#supportGroupsExplanation';
            },
            '.next': loadAdoptionSlide43,
        }
    });
}

function loadSupportExplanations() {
    changePage({
        template_id: 'support_explanations',
        on_click: {
            '.close-container': loadAdoptionSlide42,
        }
    });
}

let support_choice = "";

function loadAdoptionSlide43() {
    changePage({
        template_id: 'adoption_slide43',
        on_click: {
            'nextStepsChoice': function() {
                $(this).attr('src', 'assets/img/option-support-nextsteps-withstroke.svg');
                $('#counselingChoice').attr('src', 'assets/img/option-support-counseling-nostroke.svg');
                $('#supportGroupChoice').attr('src', 'assets/img/option-support-supportgroup-nostroke.svg');
                support_choice = 'support_choice1';
                $('#toSupportChoice').fadeIn('slow');
            },
            'counselingChoice': function() {
                $(this).attr('src', 'assets/img/option-support-counseling-withstroke.svg');
                $('#nextStepsChoice').attr('src', 'assets/img/option-support-nextsteps-nostroke.svg');
                $('#supportGroupChoice').attr('src', 'assets/img/option-support-supportgroup-nostroke.svg');
                support_choice = 'support_choice2';
                $('#toSupportChoice').fadeIn('slow');
            },
            'supportGroupChoice': function() {
                $(this).attr('src', 'assets/img/option-support-supportgroup-withstroke.svg');
                $('#nextStepsChoice').attr('src', 'assets/img/option-support-nextsteps-nostroke.svg');
                $('#counselingChoice').attr('src', 'assets/img/option-support-counseling-nostroke.svg');
                support_choice = 'support_choice3';
                $('#toSupportChoice').fadeIn('slow');
            },
            'toSupportChoice': function() {
                switch (support_choice) {
                    case 'support_choice1':
                        answers.support_choice = "Next Steps Program";
                        break;
                    case 'support_choice2':
                        answers.support_choice = "Counseling Program";
                        break;
                    case 'support_choice3':
                        answers.support_choice = "Support Group";
                        break;
                }
                console.log(answers);
                loadSupportChoice(support_choice);
            },
        }
    });
}

function loadSupportChoice(template) {
    changePage({
        template_id: template,
        on_click: {
            '.next': loadAdoptionSlide44,
        }
    });
}

function loadAdoptionSlide44() {
    changePage({
        template_id: 'adoption_slide44',
        on_click: {
            '.next': loadAdoptionSlide45,
        }
    });
}

function loadAdoptionSlide45() {
    changePage({
        template_id: 'adoption_slide45',
        on_load: function() {
            $('#questionBubbleContainer').children().hide();
        },
        on_click: {
            'video6': loadQuestionSlide1,
        },
        delay: {
            300: function() {
                $('#bubble1').show().addClass('fade-in');
            },
            500: function() {
                $('#bubble2').show().addClass('fade-in-right');
            },
            700: function() {
                $('#bubble3').show().addClass('fade-in');
            },
            1000: function() {
                $('#bubble4').show().addClass('fade-in-right');
            },
            1300: function() {
                $('#bubble5').show().addClass('fade-in');
            },
            1600: function() {
                $('#bubble6').show().addClass('fade-in');
            },
            1700: function() {
                $('#bubble7').show().addClass('fade-in-right');
            },
            2100: function() {
                $('#bubble8').show().addClass('fade-in');
            },
            2500: function() {
                $('#bubble9').show().addClass('fade-in-right');
            },
            2700: function() {
                $('#bubble10').show().addClass('fade-in');
            },
        }
    });
}

function loadQuestionSlide1() {
    changePage({
        template_id: 'question_slide1',
        on_click: {
            '.question-bubble-1': function() {
                $(this).css('border', '0.2em solid #3F537C');
                $('.question-bubble-2, .question-bubble-3').css('border', 'none');
                answers.why_give_up_baby = $(this).children().first().html();
                console.log(answers);
                loadQuestionSlide2();
            },
            '.question-bubble-2': function() {
                $(this).css('border', '0.2em solid #3F537C');
                $('.question-bubble-1, .question-bubble-3').css('border', 'none');
                answers.why_give_up_baby = $(this).children().first().html();
                console.log(answers);
                loadQuestionSlide2();
            },
            '.question-bubble-3': function() {
                $(this).css('border', '0.2em solid #3F537C');
                $('.question-bubble-1, .question-bubble-2').css('border', 'none');
                answers.why_give_up_baby = $(this).children().first().html();
                console.log(answers);
                loadQuestionSlide2();
            },
        }
    });
}

function loadQuestionSlide2() {
    changePage({
        template_id: 'question_slide2',
        on_click: {
            '.question-bubble-1': function() {
                $(this).css('border', '0.2em solid #3F537C');
                $('.question-bubble-2, .question-bubble-3').css('border', 'none');
                answers.how_know_good_parents = $(this).children().first().html();
                console.log(answers);
                loadQuestionSlide3();
            },
            '.question-bubble-2': function() {
                $(this).css('border', '0.2em solid #3F537C');
                $('.question-bubble-1, .question-bubble-3').css('border', 'none');
                answers.how_know_good_parents = $(this).children().first().html();
                console.log(answers);
                loadQuestionSlide3();
            },
            '.question-bubble-3': function() {
                $(this).css('border', '0.2em solid #3F537C');
                $('.question-bubble-1, .question-bubble-2').css('border', 'none');
                answers.how_know_good_parents = $(this).children().first().html();
                console.log(answers);
                loadQuestionSlide3();;
            },
        }
    });
}

function loadQuestionSlide3() {
    changePage({
        template_id: 'question_slide3',
        on_click: {
            '.question-bubble-1': function() {
                $(this).css('border', '0.2em solid #3F537C');
                $('.question-bubble-2, .question-bubble-3').css('border', 'none');
                answers.sad_about_seeing_baby = $(this).children().first().html();
                console.log(answers);
                loadAdoptionSlide46();
            },
            '.question-bubble-2': function() {
                $(this).css('border', '0.2em solid #3F537C');
                $('.question-bubble-1, .question-bubble-3').css('border', 'none');
                answers.sad_about_seeing_baby = $(this).children().first().html();
                console.log(answers);
                loadAdoptionSlide46();
            },
            '.question-bubble-3': function() {
                $(this).css('border', '0.2em solid #3F537C');
                $('.question-bubble-1, .question-bubble-2').css('border', 'none');
                answers.sad_about_seeing_baby = $(this).children().first().html();
                console.log(answers);
                loadAdoptionSlide46();
            },
        }
    });
}

function loadVideo6() {
    changePage({
        template_id: 'video',
        on_click: {
            'toNextSlide': loadAdoptionSlide46,
        }
    });
}

function loadAdoptionSlide46() {
    changePage({
        template_id: 'adoption_slide46',
        on_click: {
            '.next': loadAdoptionSlide47,
        }
    });
}

function loadAdoptionSlide47() {
    changePage({
        template_id: 'adoption_slide47',
        on_load: function() {
            $('.baby-name').html(answers.baby_name);
        },
        on_click: {
            '.next': loadAdoptionSlide48,
        }
    });
}

function loadAdoptionSlide48() {
    changePage({
        template_id: 'adoption_slide48',
        on_load: function() {
            $('.baby-name').html(answers.baby_name+"'s");
        },
        on_click: {
            '.next': loadAdoptionSlide49,
        }
    });
}

function loadAdoptionSlide49() {
    changePage({
        template_id: 'adoption_slide49',
        on_load: function() {
            $('.baby-name').html(answers.baby_name);
        },
        on_click: {
            '.next': loadAdoptionSlide50,
        }
    });
}

function loadAdoptionSlide50() {
    changePage({
        template_id: 'adoption_slide50',
        on_load: function() {
            $('.baby-name').html(answers.baby_name+"'s");
        },
        on_click: {
            '.next': loadAdoptionSlide51,
        }
    });
}

function loadAdoptionSlide51() {
    changePage({
        template_id: 'adoption_slide51',
        on_load: function() {
            $('.baby-name').html(answers.baby_name);
        },
        on_click: {
            'video7': loadVideo7,
        }
    });
}

function loadVideo7() {
    changePage({
        template_id: 'video',
        on_click: {
            'toNextSlide': function() {
                if(adoptive_parents === "Abby and Will") {
                    $('body').append($('#video_player6').html());
                } else $('body').append($('#video_player7').html());

                if (cordova && cordova.platformId === 'ios') {
                    $('video').prop('controls', 'controls');
                }
                $('video').on('ended',function(){
                    loadAdoptionSlide52();
                    if (cordova && cordova.platformId === 'android') {
                        StatusBar.show();
                    }
                });
                StatusBar.hide();
            },
        },
    });
}

function loadAdoptionSlide52() {
    changePage({
        template_id: 'adoption_slide52',
        on_click: {
            '.next': loadAdoptionSlide53,
        }
    });
}

function loadAdoptionSlide53() {
    changePage({
        template_id: 'adoption_slide53',
        on_click: {
            'toEducationPaths': loadEducationPaths,
        }
    });
}

function loadEducationPaths() {
    changePage({
        template_id: 'decision_slide',
        on_load: function() {
            $('#firstLearnMore, #secondLearnMore, #pathSubmit').hide();
            $('.signs').attr('src', 'assets/img/decision-education-bothteal.svg');
        },
        on_click: {
            'firstClickArea': function() {
                $('.signs').attr('src', 'assets/img/decision-education-tradeschoolnavy.svg');
                answers.education_path = "Trade School";
                $('#pathSubmit').fadeIn('slow');
            },
            'secondClickArea': function() {
                $('.signs').attr('src', 'assets/img/decision-education-4yearnavy.svg');
                answers.education_path = "A 4 Year College";
                $('#pathSubmit').fadeIn('slow');
            },
            'pathSubmit': function() {
                loadAdoptionSlide54();
                console.log(answers);
            }
        }
    });
}

function loadAdoptionSlide54() {
    changePage({
        template_id: 'adoption_slide54',
        on_load: function() {
            $('#educationPath').html(answers.education_path);
        },
        on_click: {
            '.next': loadAdoptionSlide55,
        }
    });
}
let option_sources = {
    option1_name: "",
    option1_nostroke: "",
    option1_withstroke: "",
    option2_name: "",
    option2_nostroke: "",
    option2_withstroke: "",
    option3_name: "",
    option3_nostroke: "",
    option3_withstroke: "",
    option4_name: "",
    option4_nostroke: "",
    option4_withstroke: "",
};
function loadAdoptionSlide55() {
    changePage({
        template_id: 'adoption_slide55',
        on_load: function() {
            $('.next').hide();
            if(answers.education_path === "Trade School") {
                option_sources.option1_name = "Dental Hygienist";
                option_sources.option1_nostroke = "assets/img/option-dental-hygienist-nostroke.svg";
                option_sources.option1_withstroke = "assets/img/option-dental-hygienist-withstroke.svg";
                option_sources.option2_name = "Oil Field Technician";
                option_sources.option2_nostroke = "assets/img/option-oil-field-tech-nostroke.svg";
                option_sources.option2_withstroke = "assets/img/option-oil-field-tech-withstroke.svg";
                option_sources.option3_name = "Veterinarian Technician";
                option_sources.option3_nostroke = "assets/img/option-vet-tech-nostroke.svg";
                option_sources.option3_withstroke = "assets/img/option-vet-tech-withstroke.svg";
                option_sources.option4_name = "Preschool Teacher";
                option_sources.option4_nostroke = "assets/img/option-preschool-teacher-nostroke.svg";
                option_sources.option4_withstroke = "assets/img/option-preschool-teacher-withstroke.svg";
                $('#educationPath2').html('career');
            }
            else if(answers.education_path === "A 4 Year College") {
                option_sources.option1_name = "Nursing / Medical";
                option_sources.option1_nostroke = "assets/img/option-nursing-medical-blank.svg";
                option_sources.option1_withstroke = "assets/img/option-nursing-medical-outline.svg";
                option_sources.option2_name = "Education";
                option_sources.option2_nostroke = "assets/img/option-education-blank.svg";
                option_sources.option2_withstroke = "assets/img/option-education-outline.svg";
                option_sources.option3_name = "Engineering / Technology";
                option_sources.option3_nostroke = "assets/img/option-engineering-blank.svg";
                option_sources.option3_withstroke = "assets/img/option-engineering-outline.svg";
                option_sources.option4_name = "Social Worker / Counselor";
                option_sources.option4_nostroke = "assets/img/option-social-worker-blank.svg";
                option_sources.option4_withstroke = "assets/img/option-social-worker-outline.svg";
                $('#educationPath2').html('degree');
            }
            $('#option1').attr('src', option_sources.option1_nostroke);
            $('#option2').attr('src', option_sources.option2_nostroke);
            $('#option3').attr('src', option_sources.option3_nostroke);
            $('#option4').attr('src', option_sources.option4_nostroke);
        },
        on_click: {
            'option1': function() {
                $(this).attr('src', option_sources.option1_withstroke);
                $('#option2').attr('src', option_sources.option2_nostroke);
                $('#option3').attr('src', option_sources.option3_nostroke);
                $('#option4').attr('src', option_sources.option4_nostroke);
                answers.education_path_field = option_sources.option1_name;
                $('.next').fadeIn('slow');
                console.log(answers);
            },
            'option2': function() {
                $(this).attr('src', option_sources.option2_withstroke);
                $('#option1').attr('src', option_sources.option1_nostroke);
                $('#option3').attr('src', option_sources.option3_nostroke);
                $('#option4').attr('src', option_sources.option4_nostroke);
                answers.education_path_field = option_sources.option2_name;
                $('.next').fadeIn('slow');
                console.log(answers);
            },
            'option3': function() {
                $(this).attr('src', option_sources.option3_withstroke);
                $('#option1').attr('src', option_sources.option1_nostroke);
                $('#option2').attr('src', option_sources.option2_nostroke);
                $('#option4').attr('src', option_sources.option4_nostroke);
                answers.education_path_field = option_sources.option3_name;
                $('.next').fadeIn('slow');
                console.log(answers);
            },
            'option4': function() {
                $(this).attr('src', option_sources.option4_withstroke);
                $('#option1').attr('src', option_sources.option1_nostroke);
                $('#option2').attr('src', option_sources.option2_nostroke);
                $('#option3').attr('src', option_sources.option3_nostroke);
                answers.education_path_field = option_sources.option4_name;
                $('.next').fadeIn('slow');
                console.log(answers);
            },
            '.next': loadAdoptionSlide56,
        }
    });
}

function loadAdoptionSlide56() {
    changePage({
        template_id: 'adoption_slide56',
        on_click: {
            '.next': loadAdoptionSlide57,
        }
    });
}

function loadAdoptionSlide57() {
    changePage({
        template_id: 'adoption_slide57',
        on_click: {
            '.next': loadAdoptionSlide58,
        }
    });
}

function loadAdoptionSlide58() {
    changePage({
        template_id: 'adoption_slide58',
        on_click: {
            '.next': loadAdoptionSlide59,
        }
    });
}

function loadAdoptionSlide59() {
    changePage({
        template_id: 'adoption_slide59',
        on_click: {
            '.next': loadAdoptionSlide60,
        }
    });
}

function loadAdoptionSlide60() {
    changePage({
        template_id: 'adoption_slide60',
        on_click: {
            'video8': loadVideo8,
        }
    });
}

function loadVideo8() {
    changePage({
        template_id: 'video',
        on_click: {
            'toNextSlide': function() {
                if(answers.adoptive_parents === 'Astra and Mike') {
                    $('body').append($('#video_player8-ma').html());
                } else {
                    $('body').append($('#video_player8-ab').html());
                }

                if (cordova && cordova.platformId === 'ios') {
                    $('video').prop('controls', 'controls');
                }
                $('video').on('ended',function(){
                    loadAdoptionSlide61();
                    if (cordova && cordova.platformId === 'android') {
                        StatusBar.show();
                    }
                });
                StatusBar.hide();
            },
        },
    });
}

function loadAdoptionSlide61() {
    changePage({
        template_id: 'adoption_slide61',
        on_click: {
            '.next': function() {
                $('.next').off('click');
                loadAdoptionSlide62();
            },
        }
    });
}

function loadAdoptionSlide62() {
    changePage({
        template_id: 'adoption_slide62',
        on_load: function() {
            db.collection("user_answers").add(answers)
                .then(function(docRef) {
                    console.log("Document written with ID: ", docRef.id);
                })
                .catch(function(error) {
                    console.error("Error adding document: ", error);
                });
        },
        on_click: {
            'phoneLink2': function() {
                window.open('tel:18004523639', '_system')
            },
            'webLink2': function () {
                window.open('https://pregnancyhotline.org', '_system');
            },
            'smsLink2': function () {
                window.open('sms:18004523639', '_system');
            },
            'startOver': loadLandingPage,
        }
    });
}

//////////////////
//Parenting Path//
//////////////////

function loadParentingSlide1() {
    changePage({
        template_id: 'parenting_slide1',
        on_load: function() {
            pulse();
        },
        on_click: {
            '.next': loadParentingSlide2,
        },
        transition: 'none',
    });
}

function loadParentingSlide2() {
    changePage({
        template_id: 'parenting_slide2',
        on_click: {
            '.next': loadParentingSlide3,
        }
    });
}

function loadParentingSlide3() {
    changePage({
        template_id: 'parenting_slide3',
        on_click: {
            '.next': function() {
                answers.things_to_learn = $('textarea').val();
                console.log(answers);
                loadParentingSlide4();
            },
        }
    });
}

function loadParentingSlide4() {
    changePage({
        template_id: 'parenting_slide4',
        on_click: {
            '.next': loadParentingSlide5,
        },
        delay: {
            500: function() {
                $('.tiny-bubble1').fadeIn();
            },
            750: function() {
                $('.tiny-bubble2').fadeIn();
            },
            1000: function() {
                $('.tiny-bubble3').fadeIn();
            },
            1250: function() {
                $('.thought').fadeIn(1300);
            },
            2550: function() {
                $('.thought-portion1').show().addClass('bounce-in');
            },
            3050: function() {
                $('.thought-portion2').show().addClass('bounce-in');
            },
            3550: function() {
                $('.thought-portion3').show().addClass('bounce-in');
            },
            4050: function() {
                $('.thought-portion4').show().addClass('bounce-in');
            },
            4550: function() {
                $('.thought-portion5').show().addClass('bounce-in');
            },
            5050: function() {
                $('.thought-portion6').show().addClass('bounce-in');
                $('.next').fadeIn('slow');
            },
        }
    });
}

let itemsNeeded = [];

function loadParentingSlide5() {
    changePage({
        template_id: 'parenting_slide5',
        on_load: function() {
            answers.items_needed = [];
        },
        on_click: {
            '.grid-item': function() {
                const border = $(this).css('border');
                if(border.substring(border.indexOf('rgb')) === 'rgba(0, 0, 0, 0.2)') {
                    if (itemsNeeded.length < 12) {
                        $(this).css('border', '0.07em solid rgba(222, 98, 115, 1)');
                        itemsNeeded
                            .push($(this).children().attr('src'));
                        answers.items_needed.push($(this).data('tag'));
                    }
                    if (itemsNeeded.length === 3) {
                        $('.next').fadeIn('slow');
                    }
                }
                else {
                    $(this).css('border', '0.07em solid rgba(0, 0, 0, 0.2)');
                    itemsNeeded
                        .splice(itemsNeeded.indexOf($(this).children().attr('src')), 1);
                    answers.items_needed
                        .splice(answers.items_needed.indexOf($(this).data('tag')), 1);
                }
            },
            '.next': loadParentingSlide6,
        }
    });
}

function loadParentingSlide6() {
    changePage({
        template_id: 'parenting_slide6',
        on_load: function() {
            let cell_count = 0;
            for(let src of itemsNeeded) {
                $('img').eq(cell_count).attr('src', src);
                cell_count++;
            }
            console.log(answers);
        },
        on_click: {
            '.next': loadParentingSlide7,
        }
    });
}


function loadParentingSlide7() {
    changePage({
        template_id: 'adoption_slide45',
        on_load: function() {
            $('h3').html("Having a baby is expensive. Do you know the average cost of baby items?");
            $('p').html("Let's see how close you can get.");
            $('#questionBubbleContainer').children().hide();
        },
        on_click: {
            'video6': loadParentingSlide8,
        },
        delay: {
            300: function() {
                $('#bubble1').show().addClass('fade-in');
            },
            500: function() {
                $('#bubble2').show().addClass('fade-in-right');
            },
            700: function() {
                $('#bubble3').show().addClass('fade-in');
            },
            1000: function() {
                $('#bubble4').show().addClass('fade-in-right');
            },
            1300: function() {
                $('#bubble5').show().addClass('fade-in');
            },
            1600: function() {
                $('#bubble6').show().addClass('fade-in');
            },
            1700: function() {
                $('#bubble7').show().addClass('fade-in-right');
            },
            2100: function() {
                $('#bubble8').show().addClass('fade-in');
            },
            2500: function() {
                $('#bubble9').show().addClass('fade-in-right');
            },
            2700: function() {
                $('#bubble10').show().addClass('fade-in');
            },
        }
    });
}

function loadParentingSlide8() {
    changePage({
        template_id: 'parenting_slide8',
        on_load: function() {
            const pricetags = $('.tags > .grid-item');
            let origin = "";
            let correct_count = 0;
            pricetags.on('touchstart', function(e) {
                origin = $(this).offset();
            });
            pricetags.on('touchmove', function(e) {
                const offsetX = e.touches[0].pageX-$(this).width()/2;
                const offsetY = e.touches[0].pageY-$(this).height()/2;
                $(this).offset({
                    left: offsetX,
                    top: offsetY,
                });
            });
            pricetags.on('touchend', function(e) {
                const tag = this;
                const point = document.elementsFromPoint(e.changedTouches[0].pageX, e.changedTouches[0].pageY);
                $(point).each(function() {
                    if($(this).data('type') === 'item' && $(this).data('tag') === $(tag).data('tag')) {
                        $(tag).visibilityToggle();
                        $(this).find('.pricetag').show();
                        correct_count++;
                    }
                });
                $(this).animate({
                    top: '0px',
                    left: '0px',
                }, 350);
                if(correct_count === 6) {
                    $('.next').fadeIn();
                }
            });
        },
        on_click: {
            '.next': loadParentingSlide9,
        }
    });
}

function loadParentingSlide9() {
    changePage({
        template_id: 'parenting_slide9',
        on_click: {
            '.next': loadParentingSlide10,
        }
    });
}

function loadParentingSlide10() {
    changePage({
        template_id: 'parenting_slide10',
        on_load: function() {
            const elem = document.querySelector('input[type="range"]');

            const rangeValue = function(){
                const newValue = elem.value;
                const target = document.querySelector('.value');
                target.innerHTML = '$'+newValue.substring(0, newValue.length-3)+','+newValue.substring(newValue.length-3, newValue.length);
                $('#toIntroSlide4').fadeIn();
            };

            elem.addEventListener("input", rangeValue);
        },
        on_click: {
            '.next': function() {
                answers.average_yearly_cost = $('.value').html();
                console.log(answers);
                loadParentingSlide11();
            },
        }
    });
}

function loadParentingSlide11() {
    changePage({
        template_id: 'parenting_slide11',
        delay: {
            5000: function() {
                loadParentingSlide12();
            }
        }
    });
}

function loadParentingSlide12() {
    changePage({
        template_id: 'parenting_slide12',
        on_click: {
            '.next': loadParentingSlide13,
        },
        on_load: function() {
            $('audio').prop('volume', 0.1);
        },
        delay: {
            700: function() {
                $('.cost1').show().addClass('bounce-in');
            },
            1200: function() {
                $('.cost2').show().addClass('bounce-in');
            },
            1700: function() {
                $('.cost3').show().addClass('bounce-in');
            },
            2200: function() {
                $('.cost4').show().addClass('bounce-in');
            },
            2700: function() {
                $('.cost5').show().addClass('bounce-in');
            },
            3200: function() {
                $('.cost6').show().addClass('bounce-in');
            },
            3700: function() {
                $('.cost7').show().addClass('bounce-in');
                $('audio').trigger('play');
            },
            4200: function() {
                $('.cost8').show().addClass('bounce-in');
            },
            5200: function() {
                $('.next').fadeIn();
            }
        }
    });
}

function loadParentingSlide13() {
    changePage({
        template_id: 'parenting_slide13',
        on_click: {
            '.next': loadParentingSlide14,
        }
    });
}

function loadParentingSlide14() {
    changePage({
        template_id: 'parenting_slide14',
        on_click: {
            '.next': loadParentingSlide15,
            'childSupportThought, #parentalSupportThought, #getAJobThought': function() {
                const flipcontainer = $(this).find('.flip-container');
                if(flipcontainer.hasClass('flipped')) {
                    flipcontainer.removeClass('flipped');
                }
                else {
                    flipcontainer.addClass('flipped');
                }
            }
        }
    });
}

function loadParentingSlide15() {
    changePage({
        template_id: 'parenting_slide15',
        on_click: {
            '.next': loadParentingSlide16,
        }
    });
}

function loadParentingSlide16() {
    changePage({
        template_id: 'parenting_slide16',
        on_click: {
            '.next': loadParentingSlide17,
        }
    });
}

function loadParentingSlide17() {
    changePage({
        template_id: 'parenting_slide17',
        on_click: {
            '.next': loadParentingSlide18,
        }
    });
}

function loadParentingSlide18() {
    changePage({
        template_id: 'parenting_slide18',
        on_click: {
            'video9': loadParentingSlide19,
        }
    });
}

function loadVideo9() {
    changePage({
        template_id: 'video',
        on_click: {
            'toNextSlide': function() {
                $('body').append($('#video_player9').html());

                if (cordova && cordova.platformId === 'ios') {
                    $('video').prop('controls', 'controls');
                }
                $('video').on('ended',function(){
                    loadParentingSlide19();
                    if (cordova && cordova.platformId === 'android') {
                        StatusBar.show();
                    }
                });
                StatusBar.hide();
            },
        },
    });
}

function loadParentingSlide19() {
    changePage({
        template_id: 'parenting_slide19',
        on_click: {
            '.next': loadParentingSlide20,
        }
    });
}

function loadParentingSlide20() {
    changePage({
        template_id: 'parenting_slide20',
        on_load: initLocalClocks,
        on_click: {
            '.next': loadParentingSlide21,
        }
    });
}

function loadParentingSlide21() {
    changePage({
        template_id: 'parenting_slide21',
        overlay_id: 'confetti_explosion',
        on_load: function() {
            $('audio').prop('volume', 0.8);
        },
        on_click: {
            '.next': loadParentingSlide22,
        }
    });
}

function loadParentingSlide22() {
    changePage({
        template_id: 'parenting_slide22',
        on_click: {
            '.next': loadParentingSlide23,
        }
    });
}

function loadParentingSlide23() {
    changePage({
        template_id: 'parenting_slide23',
        on_click: {
            '.next': loadParentingSlide24,
        }
    });
}

function loadParentingSlide24() {
    changePage({
        template_id: 'adoption_slide33',
        on_load: function() {
            let options = "";
            for(const name of baby_names) {
                options += `<option>${ name }</option>`;
            }
            $('#babyNameDropdown').append(options);
        },
        on_click: {
            '.next': function() {
                const name = $('#babyNameDropdown').val();
                if(name) {
                    answers.baby_name = name;
                    console.log(answers);
                    loadParentingSlide25();
                }
            },
        }
    });
}

function loadParentingSlide25() {
    changePage({
        template_id: 'parenting_slide25',
        on_load: function() {
            $('.baby-name').html(answers.baby_name);
        },
        on_click: {
            '.next': loadParentingSlide26,
        }
    });
}

function loadParentingSlide26() {
    changePage({
        template_id: 'parenting_slide26',
        on_click: {
            '.next': loadParentingSlide27,
        }
    });
}

function loadParentingSlide27() {
    changePage({
        template_id: 'parenting_slide27',
        on_load: function() {
            $('.baby-name').html(answers.baby_name);
        },
        on_click: {
            '.next': loadParentingSlide28,
        }
    });
}

function loadParentingSlide28() {
    changePage({
        template_id: 'parenting_slide28',
        on_click: {
            '.next': loadParentingSlide29,
        }
    });
}

function loadParentingSlide29() {
    changePage({
        template_id: 'parenting_slide29',
        on_load: function() {
            const elem = document.querySelector('input[type="range"]');

            const rangeValue = function(){
                const newValue = elem.value;
                const target = document.querySelector('.value');
                const str = (newValue === '1') ? 'Hour' :  newValue + ' Hours';
                target.innerHTML = 'Every ' + str;
                $('#toIntroSlide4').fadeIn();
            };

            elem.addEventListener("input", rangeValue);
        },
        on_click: {
            '.next': function() {
                answers.how_often_babies_eat = $('.value').html();
                console.log(answers);
                loadParentingSlide30();
            },
        }
    });
}

function loadParentingSlide30() {
    changePage({
        template_id: 'parenting_slide30',
        on_load: initLocalClocks,
        on_click: {
            '.next': loadParentingSlide31,
        }
    });
}

function loadParentingSlide31() {
    changePage({
        template_id: 'parenting_slide31',
        on_click: {
            '.next': loadParentingSlide32,
        }
    });
}

function loadParentingSlide32() {
    changePage({
        template_id: 'parenting_slide32',
        on_click: {
            'shopping': function() {
                $(this).attr('src', 'assets/img/option-goshopping-withstroke.svg');
                $('#seeMovie').attr('src', 'assets/img/option-seeamovie-nostroke.svg');
                $('#friendsHouse').attr('src', 'assets/img/option-friendshouse-nostroke.svg');
                answers.fun_with_friends = "Go shopping";
                console.log(answers);
                $('.next').fadeIn('slow');
            },
            'seeMovie': function() {
                $(this).attr('src', 'assets/img/option-seeamovie-withstroke.svg');
                $('#shopping').attr('src', 'assets/img/option-goshopping-nostroke.svg');
                $('#friendsHouse').attr('src', 'assets/img/option-friendshouse-nostroke.svg');
                answers.fun_with_friends = "See a movie";
                console.log(answers);
                $('.next').fadeIn('slow');
            },
            'friendsHouse': function() {
                $(this).attr('src', 'assets/img/option-friendshouse-withstroke.svg');
                $('#shopping').attr('src', 'assets/img/option-goshopping-nostroke.svg');
                $('#seeMovie').attr('src', 'assets/img/option-seeamovie-nostroke.svg');
                answers.fun_with_friends = "Go to a friend's house";
                console.log(answers);
                $('.next').fadeIn('slow');
            },
            '.next': loadParentingSlide33,
        }
    });
}

function loadParentingSlide33() {
    changePage({
        template_id: 'parenting_slide33',
        on_click: {
            '.next': loadParentingSlide34,
        }
    });
}

function loadParentingSlide34() {
    changePage({
        template_id: 'parenting_slide34',
        on_click: {
            '.next': loadParentingSlide35,
        }
    });
}

function loadParentingSlide35() {
    changePage({
        template_id: 'decision_slide',
        on_load: function() {
            $('#pathSubmit').hide();
            $('.signs').attr('src', 'assets/img/decision-daycare-ged-bothteal.svg');
        },
        on_click: {
            'firstLearnMore': loadExplanationSlide2,
            'secondLearnMore': loadExplanationSlide2,
            'firstClickArea': function() {
                $('.signs').attr('src', 'assets/img/decision-daycare-navy.svg');
                $('#pathSubmit').fadeIn('slow');
            },
            'secondClickArea': function() {
                $('.signs').attr('src', 'assets/img/decision-ged-navy.svg');
                $('#pathSubmit').fadeIn('slow');
            },
            'pathSubmit': function() {
                const signImg = $('.signs');
                if(signImg.attr('src') === 'assets/img/decision-daycare-navy.svg') {
                    answers.hs_diploma_path = "Daycare and High School";
                    loadDaycare1();
                }
                else if(signImg.attr('src') === 'assets/img/decision-ged-navy.svg') {
                    answers.hs_dipolma_path = "Take the GED";
                    loadGED1();
                }
                console.log(answers);
            }
        }
    });
}

function loadExplanationSlide2() {
    changePage({
        template_id: 'explanation_slide2',
        on_load: function() {
            $('.baby-name').html(answers.baby_name);
        },
        on_click: {
            '.close-container': loadParentingSlide35,
        }
    });
}

function loadDaycare1() {
    changePage({
        template_id: 'daycare_1',
        on_load: function() {
            $('.baby-name').html(answers.baby_name);
        },
        on_click: {
            '.next': loadDaycare2,
        }
    });
}

function loadDaycare2() {
    changePage({
        template_id: 'daycare_2',
        on_click: {
            '.next': loadDaycare3,
        }
    });
}

function loadDaycare3() {
    changePage({
        template_id: 'daycare_3',
        on_load: function() {
            $('.baby-name').html(answers.baby_name);
        },
        on_click: {
            '.next': loadDaycare4,
        }
    });
}

function loadDaycare4() {
    changePage({
        template_id: 'daycare_4',
        on_click: {
            '.next': loadDaycare5,
        }
    });
}

function loadDaycare5() {
    changePage({
        template_id: 'daycare_5',
        on_click: {
            '.next': loadParentingSlide36,
        }
    });
}

function loadGED1() {
    changePage({
        template_id: 'ged_1',
        on_load: function() {
            $('.baby-name').html(answers.baby_name);
        },
        on_click: {
            '.next': loadGED2,
        }
    });
}

function loadGED2() {
    changePage({
        template_id: 'ged_2',
        on_click: {
            '.next': loadGED3,
        }
    });
}

function loadGED3() {
    changePage({
        template_id: 'ged_3',
        on_load: function() {
            $('.baby-name').html(answers.baby_name);
        },
        on_click: {
            '.next': loadGED4,
        }
    });
}

function loadGED4() {
    changePage({
        template_id: 'ged_4',
        on_click: {
            '.next': loadGED5,
        }
    });
}

function loadGED5() {
    changePage({
        template_id: 'ged_5',
        on_click: {
            '.next': loadParentingSlide36,
        }
    });
}

function loadParentingSlide36() {
    changePage({
        template_id: 'parenting_slide36',
        on_load: function() {
            $('.baby-name').html(answers.baby_name);
        },
        on_click: {
            '.next': loadParentingSlide37,
        }
    });
}

function loadParentingSlide37() {
    changePage({
        template_id: 'parenting_slide37',
        on_load: function() {
            $('.baby-name').html(answers.baby_name + "'s");
        },
        on_click: {
            '.next': loadParentingSlide38,
        }
    });
}

function loadVideo10() {
    changePage({
        template_id: 'video',
        on_click: {
            'toNextSlide': loadParentingSlide38,
        }
    });
}

function loadParentingSlide38() {
    changePage({
        template_id: 'parenting_slide38',
        on_click: {
            '.next': loadParentingSlide39,
        }
    });
}

function loadParentingSlide39() {
    changePage({
        template_id: 'parenting_slide39',
        on_click: {
            '.next': function() {
                answers.dreams_and_goals = $('textarea').val();
                console.log(answers);
                loadParentingSlide40();
            },
        }
    });
}

function loadParentingSlide40() {
    changePage({
        template_id: 'decision_slide',
        on_load: function() {
            $('#firstLearnMore, #secondLearnMore, #pathSubmit').hide();
            $('.signs').attr('src', 'assets/img/decision-fulltime-college-bothteal.svg');
        },
        on_click: {
            'firstClickArea': function() {
                $('.signs').attr('src', 'assets/img/decision-fulltime-navy.svg');
                $('#pathSubmit').fadeIn('slow');
            },
            'secondClickArea': function() {
                $('.signs').attr('src', 'assets/img/decision-college-navy.svg');
                $('#pathSubmit').fadeIn('slow');
            },
            'pathSubmit': function() {
                const signImg = $('.signs');
                if(signImg.attr('src') === 'assets/img/decision-fulltime-navy.svg') {
                    answers.future_path = "Full Time Job";
                    loadJobSlide1();
                }
                else if(signImg.attr('src') === 'assets/img/decision-college-navy.svg') {
                    answers.future_path = "College";
                    loadCollegeSlide1();
                }
                console.log(answers);
            }
        }
    });
}

function loadJobSlide1() {
    changePage({
        template_id: 'job_slide1',
        on_click: {
            '.next': loadJobSlide2,
        }
    });
}

function loadJobSlide2() {
    changePage({
        template_id: 'job_slide2',
        on_click: {
            '.next': loadJobSlide3,
        }
    });
}

function loadJobSlide3() {
    changePage({
        template_id: 'job_slide3',
        on_load: function() {
            $('.baby-name').html(answers.baby_name);
        },
        on_click: {
            '.next': loadParentingSlide41,
        }
    });
}

function loadCollegeSlide1() {
    changePage({
        template_id: 'college_slide1',
        on_click: {
            '.next': loadCollegeSlide2,
        }
    });
}

function loadCollegeSlide2() {
    changePage({
        template_id: 'college_slide2',
        on_load: function() {
            $('.baby-name').html(answers.baby_name);
        },
        on_click: {
            '.next': loadCollegeSlide3,
        }
    });
}

function loadCollegeSlide3() {
    changePage({
        template_id: 'college_slide3',
        on_load: function() {
            $('.baby-name').html(answers.baby_name);
        },
        on_click: {
            '.next': loadParentingSlide41,
        }
    });
}

function loadParentingSlide41() {
    changePage({
        template_id: 'parenting_slide41',
        on_click: {
            '.next': loadParentingSlide42,
        }
    });
}

function loadParentingSlide42() {
    changePage({
        template_id: 'parenting_slide42',
        on_click: {
            '.next': loadParentingSlide43,
        }
    });
}

function loadParentingSlide43() {
    changePage({
        template_id: 'parenting_slide43',
        on_click: {
            '.next': loadParentingSlide44,
        }
    });
}

function loadParentingSlide44() {
    changePage({
        template_id: 'parenting_slide44',
        on_click: {
            '.next': loadParentingSlide45,
        }
    });
}

function loadParentingSlide45() {
    changePage({
        template_id: 'parenting_slide45',
        on_click: {
            'moveOut': function() {
                $('#moveOut').attr('src', 'assets/img/option-moveout-outline.svg');
                $('#dayCare').attr('src', 'assets/img/option-betterdaycare-blank.svg');
                $('#shoppingSpree').attr('src', 'assets/img/option-shopping-blank.svg');
                $('#vacation').attr('src', 'assets/img/option-vacation-blank.svg');
                answers.extra_money = "Move out of her parent's house";
                console.log(answers);
                $('.next').fadeIn();
            },
            'dayCare': function() {
                $('#dayCare').attr('src', 'assets/img/option-betterdaycare-outline.svg');
                $('#moveOut').attr('src', 'assets/img/option-moveout-blank.svg');
                $('#shoppingSpree').attr('src', 'assets/img/option-shopping-blank.svg');
                $('#vacation').attr('src', 'assets/img/option-vacation-blank.svg');
                answers.extra_money = "Find a better day care";
                console.log(answers);
                $('.next').fadeIn();
            },
            'shoppingSpree': function() {
                $('#shoppingSpree').attr('src', 'assets/img/option-shopping-outline.svg');
                $('#moveOut').attr('src', 'assets/img/option-moveout-blank.svg');
                $('#dayCare').attr('src', 'assets/img/option-betterdaycare-blank.svg');
                $('#vacation').attr('src', 'assets/img/option-vacation-blank.svg');
                answers.extra_money = "Go on a shopping spree";
                console.log(answers);
                $('.next').fadeIn();
            },
            'vacation': function() {
                $('#vacation').attr('src', 'assets/img/option-vacation-outline.svg');
                $('#moveOut').attr('src', 'assets/img/option-moveout-blank.svg');
                $('#dayCare').attr('src', 'assets/img/option-betterdaycare-blank.svg');
                $('#shoppingSpree').attr('src', 'assets/img/option-shopping-blank.svg');
                answers.extra_money = "Go on a vacation";
                console.log(answers);
                $('.next').fadeIn();
            },
            '.next': loadParentingSlide46,
        }
    });
}

function loadParentingSlide46() {
    changePage({
        template_id: 'parenting_slide46',
        on_load: function() {
            $('.baby-name').html(answers.baby_name);
        },
        on_click: {
            '.next': loadParentingSlide47,
        }
    });
}

function loadParentingSlide47() {
    changePage({
        template_id: 'parenting_slide47',
        on_click: {
            '.next': loadParentingSlide48,
        }
    });
}

function loadParentingSlide48() {
    changePage({
        template_id: 'parenting_slide48',
        on_click: {
            '.next': loadParentingSlide49,
        }
    });
}

function loadParentingSlide49() {
    changePage({
        template_id: 'parenting_slide49',
        on_click: {
            '.next': loadParentingSlide50,
        }
    });
}

function loadParentingSlide50() {
    changePage({
        template_id: 'parenting_slide50',
        on_click: {
            'nursing': function() {
                $('#nursing').attr('src', 'assets/img/option-nursing-medical-outline.svg');
                $('#education').attr('src', 'assets/img/option-education-blank.svg');
                $('#engineering').attr('src', 'assets/img/option-engineering-blank.svg');
                $('#socialWorker').attr('src', 'assets/img/option-social-worker-blank.svg');
                answers.education_path = "Nursing/Medical";
                console.log(answers);
                $('.next').fadeIn();
            },
            'education': function() {
                $('#education').attr('src', 'assets/img/option-education-outline.svg');
                $('#nursing').attr('src', 'assets/img/option-nursing-medical-blank.svg');
                $('#engineering').attr('src', 'assets/img/option-engineering-blank.svg');
                $('#socialWorker').attr('src', 'assets/img/option-social-worker-blank.svg');
                answers.education_path = "Education";
                console.log(answers);
                $('.next').fadeIn();
            },
            'engineering': function() {
                $('#engineering').attr('src', 'assets/img/option-engineering-outline.svg');
                $('#nursing').attr('src', 'assets/img/option-nursing-medical-blank.svg');
                $('#education').attr('src', 'assets/img/option-education-blank.svg');
                $('#socialWorker').attr('src', 'assets/img/option-social-worker-blank.svg');
                answers.education_path = "Engineering/Technology";
                console.log(answers);
                $('.next').fadeIn();
            },
            'socialWorker': function() {
                $('#socialWorker').attr('src', 'assets/img/option-social-worker-outline.svg');
                $('#nursing').attr('src', 'assets/img/option-nursing-medical-blank.svg');
                $('#education').attr('src', 'assets/img/option-education-blank.svg');
                $('#engineering').attr('src', 'assets/img/option-engineering-blank.svg');
                answers.education_path = "Social Worker/Counselor";
                console.log(answers);
                $('.next').fadeIn();
            },
            '.next': loadParentingSlide51,
        }
    });
}

function loadParentingSlide51() {
    changePage({
        template_id: 'adoption_slide56',
        on_click: {
            '.next': loadParentingSlide52,
        }
    });
}

function loadParentingSlide52() {
    changePage({
        template_id: 'parenting_slide52',
        on_load: function() {
            $('.baby-name').html(answers.baby_name);
        },
        on_click: {
            '.next': loadParentingSlide53,
        }
    });
}

function loadParentingSlide53() {
    changePage({
        template_id: 'parenting_slide53',
        on_click: {
            '.next': loadParentingSlide54,
        }
    });
}

function loadParentingSlide54() {
    changePage({
        template_id: 'parenting_slide54',
        on_load: function() {
            $('.baby-name').html(answers.baby_name);
        },
        on_click: {
            '.next': loadParentingSlide55,
        }
    });
}

function loadParentingSlide55() {
    changePage({
        template_id: 'parenting_slide55',
        on_click: {
            '.next': loadParentingSlide56,
        }
    });
}

function loadParentingSlide56() {
    changePage({
        template_id: 'parenting_slide56',
        on_click: {
            '.next': loadParentingSlide57,
        },
        on_load: function() {
            $('audio').prop('volume', 0.8);
        },
        delay: {
            700: function() {
                $('.cost1').show().addClass('bounce-in');
            },
            1200: function() {
                $('.cost2').show().addClass('bounce-in');
            },
            1700: function() {
                $('.cost3').show().addClass('bounce-in');
            },
            2200: function() {
                $('.cost4').show().addClass('bounce-in');
            },
            2700: function() {
                $('.cost5').show().addClass('bounce-in');
            },
            3200: function() {
                $('.cost6').show().addClass('bounce-in');
                $('audio').trigger('play');
            },
            3700: function() {
                $('.cost7').show().addClass('bounce-in');
            },
            4700: function() {
                $('.next').fadeIn();
            }
        }
    });
}

function loadParentingSlide57() {
    changePage({
        template_id: 'adoption_slide59',
        on_click: {
            '.next': loadParentingSlide58,
        }
    });
}

function loadParentingSlide58() {
    changePage({
        template_id: 'adoption_slide60',
        on_load: function() {
            $('img').attr('src', 'assets/img/gabby-toddler-graduation-confetti.svg');
        },
        on_click: {
            '.next': loadVideo11,
        }
    });
}

function loadVideo11() {
    changePage({
        template_id: 'video',
        on_click: {
            'toNextSlide': function() {
                $('body').append($('#video_player9').html());

                if (cordova && cordova.platformId === 'ios') {
                    $('video').prop('controls', 'controls');
                }
                $('video').on('ended',function(){
                    loadAdoptionSlide61();
                    if (cordova && cordova.platformId === 'android') {
                        StatusBar.show();
                    }
                });
                StatusBar.hide();
            },
        },
    });
}



