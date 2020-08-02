let pgviewer = {
    current: 221267,
    last: 221267,
    diff: 221207, // The page before the first page of the text one wants to view
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
    }
};

(function($) {

    $(document).ready(function() {
        activateForm();
    });

    function activateForm() {
        getCurrent();
        $('#pgnumfield').change(function(e) {
            const v = $(this).val();
            const newpg = v * 1 + pgviewer.diff;
            changePage(newpg);
        });
        $('.next a').click(function() {
            changePage(pgviewer.next());
        });
        $('.prev a').click(function() {
            changePage(pgviewer.prev());
        });
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
        const pgnum = num * 1 - pgviewer.diff;
        $('#pgnumfield').val(pgnum);
        $('#pgnumber .num').text(num);
    }

    function getImage(num) {
        $('#pgimg').fadeOut();
        let url = pgviewer.pgbase.replace(pgviewer.repstr, num);
        $('#pgimg').attr('src', url).slideDown(500);
    }

    function msg(txt) {
        $('.msg').text(txt);
    }
}) (jQuery);