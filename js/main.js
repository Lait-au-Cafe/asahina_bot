jQuery(document).ready(function(){
    'use strict';

    const voice_list = {
        "voices": [
            { "dispname": "自己紹介", "filename": "intro.wav", "type": "0" },
            { "dispname": "こんばんみゃー!", "filename": "greeting.wav", "type": "0" },
            { "dispname": "ナイスですっ!!", "filename": "nice.wav", "type": "0" },
            { "dispname": "GG!!", "filename": "gg.wav", "type": "0" },
            { "dispname": "あらあら", "filename": "arar4.wav", "type": "0" },
            { "dispname": "あらあら2", "filename": "arar.wav", "type": "0" },
            { "dispname": "お可愛いこと", "filename": "so_cute.wav", "type": "0" },
            { "dispname": "でたわね", "filename": "detawane.wav", "type": "0" },
            { "dispname": "はい!", "filename": "yes.wav", "type": "1" },
            { "dispname": "了解です", "filename": "roger.wav", "type": "1" },
            { "dispname": "わかる", "filename": "agree.wav", "type": "1" },
            { "dispname": "ちょっと\nわかるんだよなぁ…", "filename": "agreeabit.wav", "type": "1" },
            { "dispname": "なるほどぉ!", "filename": "igotit.wav", "type": "1" },
            { "dispname": "やったー!", "filename": "ididit.wav", "type": "1" },
            { "dispname": "ごめんなさい!", "filename": "sorry.wav", "type": "1" },
            { "dispname": "ふん!", "filename": "hun.wav", "type": "1" },
            { "dispname": "やだ!", "filename": "yada.wav", "type": "1" },
            { "dispname": "はぁ?", "filename": "what.wav", "type": "1" },
            { "dispname": "ｱﾊｰw", "filename": "aha.wav", "type": "1" },
            { "dispname": "ｱﾊﾊﾊw", "filename": "laugh.wav", "type": "1" },
            { "dispname": "ひょえ～", "filename": "hyoe.wav", "type": "1" },
            { "dispname": "ああいいっすね", "filename": "fine.wav", "type": "1" },
            { "dispname": "ふ～ん、なるほどね", "filename": "isee.wav", "type": "1" },
            { "dispname": "まじぃ～？", "filename": "really.wav", "type": "1" },
            { "dispname": "でしょ？", "filename": "right.wav", "type": "1" },
            { "dispname": "どした～？", "filename": "whatswrong.wav", "type": "1" },
            { "dispname": "なんですかぁ～？", "filename": "whatsup.wav", "type": "1" },
            { "dispname": "えっ", "filename": "e.wav", "type": "1" },
            { "dispname": "えええ", "filename": "eee.wav", "type": "1" },
            { "dispname": "ねえ", "filename": "nee2.wav", "type": "1" },
            { "dispname": "なんて？", "filename": "pardon.wav", "type": "1" },
            { "dispname": "いいんですか？", "filename": "isthatok.wav", "type": "1" },
            { "dispname": "それでいいの？", "filename": "isthatok-001.wav", "type": "1" },
            { "dispname": "投げキッス\n（舌打ち）", "filename": "kiss.wav", "type": "1" },
            { "dispname": "ふぁっきゅー!", "filename": "fk.wav", "type": "1" },
            { "dispname": "なーに?", "filename": "na-ni.wav", "type": "2" },
            { "dispname": "普通だよ", "filename": "itsnormal.wav", "type": "2" },
            { "dispname": "かしこい!", "filename": "smart.wav", "type": "2" },
            { "dispname": "大丈夫か？", "filename": "areyouok.wav", "type": "2" },
            { "dispname": "ドンマイです!", "filename": "nevermind.wav", "type": "2" },
            { "dispname": "大丈夫ですって", "filename": "np.wav", "type": "2" },
            { "dispname": "私がいるんで", "filename": "imonyou.wav", "type": "2" },
            { "dispname": "…ダメすかね", "filename": "somethingwrongwiththat.wav", "type": "2" },
            { "dispname": "許される?", "filename": "forgiven.wav", "type": "2" },
            { "dispname": "忘れないで", "filename": "dont_forget.wav", "type": "2" },
            { "dispname": "こわーい", "filename": "fear.wav", "type": "2" },
            { "dispname": "うぇ～いww", "filename": "wei-001.wav", "type": "2" },
            { "dispname": "あぶね～w", "filename": "danger.wav", "type": "2" },
            { "dispname": "やったな…w", "filename": "yattana.wav", "type": "2" },
            { "dispname": "うるさいです！", "filename": "shutup.wav", "type": "2" },
            { "dispname": "うるせえなぁ", "filename": "noisy.wav", "type": "2" },
            { "dispname": "最悪w", "filename": "so_bad.wav", "type": "2" },
            { "dispname": "いやきっ…m", "filename": "gross.wav", "type": "2" },
            { "dispname": "ホントにゴミね", "filename": "reallytrash.wav", "type": "2" },
            { "dispname": "いや？思ってねえわ", "filename": "noidontthinkso.wav", "type": "2" },
            { "dispname": "空気変えていこう？", "filename": "changeatom.wav", "type": "2" },
            { "dispname": "ママ～?", "filename": "mama.wav", "type": "2" },
            { "dispname": "パパ!", "filename": "papa3.wav", "type": "2" },
            { "dispname": "おじいちゃん…", "filename": "granpa.wav", "type": "2" },
            { "dispname": "グランパ", "filename": "granpa-001.wav", "type": "2" },
            { "dispname": "はらへった", "filename": "hungry.wav", "type": "2" },
            { "dispname": "任せてくださいよ", "filename": "leave_it_to_me.wav", "type": "2" },
            { "dispname": "面白いこと言いますね", "filename": "interesting.wav", "type": "2" },
            { "dispname": "フォローありがとうございます!", "filename": "thx_for_following.wav", "type": "3" },
            { "dispname": "感謝します!", "filename": "appreciate.wav", "type": "3" },
            { "dispname": "せんきゅ!", "filename": "thx.wav", "type": "3" },
            { "dispname": "死んでる～w", "filename": "dying.wav", "type": "3" },
            { "dispname": "死んできます!!", "filename": "gonna_die.wav", "type": "3" },
            { "dispname": "死んでもろてええかぁ!?", "filename": "wouldyoudie.wav", "type": "3" },
            { "dispname": "痛いってだから!!", "filename": "ithurts.wav", "type": "3" },
            { "dispname": "やめなさいって言ってるでしょうがぁ!", "filename": "isaystopit.wav", "type": "3" },
            { "dispname": "火葬される!", "filename": "gannaburn.wav", "type": "3" },
            { "dispname": "殴り殺すぞ\nマジでお前", "filename": "slaughter.wav", "type": "3" },
            { "dispname": "開けてよぉ", "filename": "plzopen.wav", "type": "3" },
            { "dispname": "でっけぇ虫いんな", "filename": "big_bug.wav", "type": "3" },
            { "dispname": "いらっしゃいませ～", "filename": "welcome.wav", "type": "3" },
            { "dispname": "認知してぇ!", "filename": "accept.wav", "type": "3" },
            { "dispname": "育て方が良かったんかなやっぱ", "filename": "igrew.wav", "type": "3" },
            { "dispname": "男の子として生きていけばいい?", "filename": "liveasboy.wav", "type": "3" },
            { "dispname": "何も失うものが\nねぇんだ", "filename": "nothingtolose.wav", "type": "3" },
            { "dispname": "はぁ!?ナメてんのぉ??", "filename": "nameteru.wav", "type": "3" },
            { "dispname": "自分の言葉は\n自分で責任取りな？", "filename": "beresponsible.wav", "type": "3" },
            { "dispname": "それ情けなくない？\n流石に", "filename": "shouldbeashamed.wav", "type": "3" },
            { "dispname": "死人に口なし\n言うたやろ", "filename": "deadmancanttalk.wav", "type": "3" },
            { "dispname": "ごめんね、このゲーム３人用なんだ", "filename": "thisgameisforthree.wav", "type": "3" },
            { "dispname": "botです!!", "filename": "imbot.wav", "type": "3" },
            { "dispname": "啼け\n(なかひろ)チーズ", "filename": "cheese_sum2.wav", "type": "4" },
        ]
    };

    function parseURL(url) {
        let params_str = location.search.substring(1).split('&');
        let params = {};
        params_str.forEach((p) => {
            let key_and_val = p.split('=');
            params[key_and_val[0]] = key_and_val[1];
        });
        return params;
    }
    const url_params = parseURL();

    // var _0x3bc2=['href','sapoten','https://lait-au-cafe.github.io/asahina_bot/closed.html'];(function(_0xc85c8,_0x3bc2ee){var _0x572da9=function(_0x38a9c2){while(--_0x38a9c2){_0xc85c8['push'](_0xc85c8['shift']());}};_0x572da9(++_0x3bc2ee);}(_0x3bc2,0x67));var _0x572d=function(_0xc85c8,_0x3bc2ee){_0xc85c8=_0xc85c8-0x0;var _0x572da9=_0x3bc2[_0xc85c8];return _0x572da9;};if(url_params[_0x572d('0x0')]!=='false'){location[_0x572d('0x2')]=_0x572d('0x1');return;}

    //=====================================================
    // Deploy buttons. 
    //=====================================================
    for(let i in voice_list['voices']) {
        // create btn element
        const prop = voice_list['voices'][i];
        let template = document.createElement('template');
        template.innerHTML = `
            <div class="button">
                <audio src="audio/${prop["filename"]}" preload="none"></audio>
            </div>
        `.trim();
        const btn = template.content.firstChild;

        // set display name
        prop['dispname'].split('\n').forEach((line) => {
            $(btn).append(`<p>${line}</p>`);
        });

        // set voice type
        let classname = "";
        switch(prop['type']) {
            case '0': 
                classname = "basic";
                break;
            case '1': 
                classname = "reply";
                break;
            case '2': 
                classname = "";
                break;
            case '3': 
                classname = "longer";
                break;
            case '4': 
                classname = "special";
                break;
        }
        $(btn).addClass(classname);

        // twitter share button
        if(!url_params['twitter_share_btn']) {
            let page_name = `${prop['filename'].split('.')[0]}`;
            template = document.createElement('template');
            template.innerHTML = `
                <div class="mini_twitter_btn">
                    <a href="https://twitter.com/share?text=「${prop['dispname']}」&url=https://lait-au-cafe.github.io/asahina_bot/btn_pages/${page_name}.html&hashtags=美夜ボタン" target="_blank"><img src="icons/twitter.png"></a>
                </div>
            `.trim();
            const mini_twitter_btn = template.content.firstChild;
            $(mini_twitter_btn).on('click', (e) => {
                e.stopPropagation();
            });
            $(btn).append(mini_twitter_btn)
        }

        $('.button_area').append(btn);
    }

    //=====================================================
    // Set click event and drag event to each button. 
    //=====================================================
    $('.button_area .button').each((i, elem) => {
        // set click event (audio play)
        $(elem).on('click', () => {
            let audio = $(elem).find('audio').get(0);
            audio.onended = () => {
                $(elem).removeClass('target');
            }
            $(elem).addClass('target');
            // console.log(`[${ $(elem).find('audio').attr('src')}] State: ${audio.readyState}`)
            audio.play();
        });

        // set drag event
        elem.setAttribute('draggable', true);
        $(elem).on('dragstart', (e) => {
            e.originalEvent.dataTransfer.setData('text/html', elem.outerHTML);
        });
    });

    //=====================================================
    // Set reaction when button is dropped to playlist area. 
    //=====================================================
    $('#playlist').on('dragenter', (e) => {
        if(!is_locked) {
            $('#playlist').addClass('mark');
        }
    });
    $('#playlist').on('dragleave', (e) => {
        $('#playlist').removeClass('mark');
    });
    $('#playlist').on('dragover', (e) => {
        e.originalEvent.preventDefault();
    });
    
    /*=== Drop Event ===*/
    let is_locked = false; // I wish this variable doesn't cause race condition. 
    $('#playlist').on('drop', (e) => {
        $('#playlist').removeClass('mark');
        if(!is_locked) {
            let template = document.createElement('template');
            template.innerHTML = e.originalEvent.dataTransfer.getData('text/html');
            let btn_body = template.content.firstChild;
            btn_body.setAttribute('draggable', false);

            $(btn_body).find('.mini_twitter_btn').remove()

            template = document.createElement('template');
            template.innerHTML = '<div class="remove_btn"><i class="far fa-trash-alt"></i></div>';
            let remove_btn = template.content.firstChild;
            $(remove_btn).on('click', () => {
                if(!is_locked) {
                    $(btn_body).remove();
                }
            });

            btn_body.appendChild(remove_btn);
            $('#playlist').append(btn_body);
        }
    });

    /*=== Click Event ===*/
    $('#play_all_btn').on('click', () => {
        // lock edit
        is_locked = true;
        $('#playlist').addClass('playing');

        // collect audios
        let audios = [];
        $('#playlist .button').each((i, elem) => {
            audios.push($(elem).find('audio').get(0));
        });

        let num_of_audios = audios.length;
        if(num_of_audios <= 0) {
            // unlock and exit
            is_locked = false;
            $('#playlist').removeClass('playing');
            return;
        }

        for(let i = 0; i < num_of_audios; i++) {
            audios[i].onended = () => {
                $($('#playlist .button')[i]).removeClass('target');
                if(i+1 < num_of_audios) {
                    // click next elem
                    $($('#playlist .button')[i+1]).addClass('target');
                    audios[i+1].play();
                }
                else {
                    // unlock and exit
                    is_locked = false;
                    $('#playlist').removeClass('playing');
                }
            }
        }

        $($('#playlist .button')[0]).addClass('target');
        audios[0].play();
    });
    $('#remove_all_btn').on('click', () => {
        if(!is_locked){
            $('#playlist .button').remove();
        }
    });

    // $('.button_area').on('dragover', (e) => {
    //     e.originalEvent.preventDefault();
    // });

    //=====================================================
    // Filter
    //=====================================================
    const filter_input_area = $('#filter_input_area');
    filter_input_area.on('input', (e) => {
        // reset
        $('.button_area .button.hidden').each((i, elem) => {
            $(elem).removeClass('hidden');
        });

        // add class those who don't contain keyword. 
        const filter_word = filter_input_area.val();
        let hit_cnt = 0;
        $('.button_area .button').each((i, elem) => {
            const voice_name = $(elem).find('p').html();
            if(!voice_name.includes(filter_word)) {
                $(elem).addClass('hidden');
            }
            else {
                hit_cnt++;
            }
        });
        $('.search .hit_cnt').html(hit_cnt);
    });
    $('.search .hit_cnt').html($('.button_area .button').length);

    // setInterval(() => {
    //     $('.container .loading').addClass('done');
    // }, 1000);
    // $('.container .loading').addClass('done');
});