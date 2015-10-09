var ADMIN_POST_TYPE_WORK = {
    init: function()
    {
        // work related checkboxes
        jQuery('input[name="producers[]"], input[name="directors[]"]')
            .on('click', ADMIN_POST_TYPE_WORK.updateHasWorkedOn);
    },
    updateHasWorkedOn: function(event)
    {
        var c = jQuery(event.currentTarget);
        var name = c.attr('name')
                    .split('[').join('')
                    .split(']').join('');
        var data = {
            work_id: c.parents('[data-work_id]').attr('data-work_id'),
            worker_id: c.val(),
            worker_type: name,
            worked_on: c.is(':checked')
        };
        console.log(data);
    }
};

jQuery(document).ready(function(){
    ADMIN_POST_TYPE_WORK.init();
});