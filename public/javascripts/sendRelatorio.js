$(document).ready(function() {
    
    var $submit = $("#sendRelatorio").hide(),
        $cbs = $('input[name="urgente"]').click(function() {
            $submit.toggle( $cbs.is(":checked") );
        });

});