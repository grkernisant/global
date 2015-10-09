var ADMIN_POST_TYPE_WILFILMER = {
    init: function()
    {
        // work sortable
        var work = jQuery('.wilfilmer-work');
        if(work.length) {
            work.sortable({

            });
        }
    }
};

jQuery(document).ready(function(){
    ADMIN_POST_TYPE_WILFILMER.init();
});