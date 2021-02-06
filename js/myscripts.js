let pgviewer = {
    current: 221267,
    last: 221267,
    diff: 221207, // The page before the first page of the text one wants to view for Pelliot 116
    p116end: 221333,
    p116on: true,
    dhpbase: 'http://idp.bl.uk/image_IDP.a4d?type=loadRotatedMainImage;recnum=__NUM__;rotate=0;imageType=_M',
    pgbase: 'http://idp.bl.uk/image_IDP.a4d?type=loadRotatedMainImage;recnum=__NUM__;rotate=0;imageType=_M',
    repstr: '__NUM__',
    next: function() {
        this.last = this.current;
        this.current += 1;
        return this.current;
    },
    prev: function() {
        this.last = this.current;
        this.current -= 1;
        if (this.current < 1) { this.current = 1; }
        return this.current;
    },
    setCurrent(num) {
        this.last = this.current;
        this.current = parseInt(num);
    },
    setProxy(proxyUrl) {
        this.pgbase = proxyUrl;
    }
};

(function($) {

    $(document).ready(function() {
        activateForm();
    });

    function activateForm() {
        getCurrent();
        // Page Controls
        $('#pgnumfield').change(function(e) {
            doChange($(this));
        });
        $('.prev a').click(function() {
            if ($(this).parent().hasClass('disabled')) { return; }
            changePage(pgviewer.prev());
        });
        $('.next a').click(function() {
            if ($(this).parent().hasClass('disabled')) { return; }
            changePage(pgviewer.next());
        });
        // Pelliot 116 toggle
        $('#cb116').change(function(e) {
            pgviewer.p116on = $('#cb116').is(':checked');
            if (!pgviewer.p116on) {
                $(this).popover('show');
                $('#pgcontrols .prev, #pgcontrols .next').removeClass('disabled');
                $('#pgnumfield').val(pgviewer.current);
            } else {
                $('#pgnumfield').val(pgviewer.current - pgviewer.diff);
            }
            doChange($('#pgnumfield'));

        });
        if (window.location.host !== '') {
            $('#cb116').popover({
                trigger: 'hover',
                title: 'Alert',
                content: "Online an image proxy needs to be set if using this outside of P116 texts 5 and 6"
            });
        }

        // Https Proxy
        $('#useproxy').change(function(e) {
            $('#proxyfield').toggleClass('show', $('#useproxy').is(':checked'));
            if (!$('#useproxy').is(':checked')) {
                pgviewer.pgbase = pgviewer.dhpbase;
                $('.label.proxy').attr('title', 'Not using proxy');
                $('#cb116').popover('enable');
            }
        });

        $('#setproxy').click(function(e) {
            pgviewer.pgbase = $('#proxyurl').val();
            if (pgviewer.pgbase == '') {
                pgviewer.pgbase = pgviewer.dhpbase;
                $('.label.proxy').attr('title', 'Not using proxy');
                $('#cb116').popover('enable');
            } else {
                $('.label.proxy').attr('title', 'Using proxy: ' + pgviewer.pgbase);
                $('#cb116').popover('disable');
            }
            $('#proxyfield').removeClass('show');
        });

        $('#page img').on('load', function(e) {
            $('#pgimg').fadeIn(500);
            $('#page .loadmsg').hide();
        });

    }

    function doChange(el) {
        const v = $(el).val();
        let newpg = v;
        if (pgviewer.p116on) {
            newpg = v * 1 + pgviewer.diff;
        }
        changePage(newpg);
    }

    function getCurrent() {
        $('#pgnumfield').val(pgviewer.current);
        changePage(pgviewer.current)
    }

    function changePage(num) {
        if (isNaN(num)) {
            msg("Not a number!");
            $(this).val(pgviewer.current);
            return;
        }
        getImage(num);
        pgviewer.setCurrent(num);
        let pgnum = num * 1;
        if (pgviewer.p116on) {
            $('#pgcontrols .next').toggleClass('disabled', (pgnum == pgviewer.p116end));
            pgnum = pgnum - pgviewer.diff;
            $('#pgcontrols .prev').toggleClass('disabled', (pgnum == 1));
        } else {
            $('#pgcontrols .prev, #pgcontrols .next').removeClass('disabled');
        }
        $('#pgnumfield').val(pgnum);
        $('#pgnumber .num').text(num);
    }

    function getImage(num) {
        $('#pgimg').hide();
        $('#page .loadmsg').show();
        let url = pgviewer.pgbase.replace(pgviewer.repstr, num);
        if (window.location.host !== '') {
            url = 'https://raw.githubusercontent.com/ThanGrove/DunhuangReader/master/images/pelliot-116-' +
                    num + '.jpg';
        }
        $('#pgimg').attr('src', url);
    }

    function msg(txt) {
        $('.msg').text(txt);
    }
}) (jQuery);