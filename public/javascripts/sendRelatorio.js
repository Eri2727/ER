$(document).ready(function() {
    
    var $submit = $("#sendRelatorio").hide(),
        $cbs = $('input[name="urgente"]').click(function() {
            $submit.toggle( $cbs.is(":checked") );
        });

});

(function() {
    const headings = document.querySelectorAll('h2');
    
    Array.prototype.forEach.call(headings, h => {
      let btn = h.querySelector('button');
      let target = h.nextElementSibling;
      
      btn.onclick = () => {
        let expanded = btn.getAttribute('aria-expanded') === 'true';
        
        btn.setAttribute('aria-expanded', !expanded);
        target.hidden = expanded;  
      }
    });
  })()