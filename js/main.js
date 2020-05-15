(function(){
    'use strict';

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
}());