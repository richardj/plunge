(function() {
  var assignHandlers = function() {
    document.querySelector('body').addEventListener('click', modal.open, false);
  };

  var findAncestor = function(el, cls) {
    if (el.classList.contains(cls)) {
      return el;
    }
    while ((el = el.parentElement) && !el.classList.contains(cls));
    return el;
  };
  
  var modal = {
    open: function(event) {
      var clicked = findAncestor(event.target, 'modal');

      if (event.target.classList.contains('button')) {
        modal.closeAll();
        document.body.classList.add('modal-active');
        modal.content(event);
      }
      else if (document.body.classList.contains('modal-active') && clicked === null) {
        modal.closeAll();
      }
      else {
        return;
      }
    },
    content: function(event) {
      var posLeft = event.target.offsetLeft;
      var posTop = event.target.offsetTop + event.target.clientHeight + 10;

      var el = document.createElement('div');
      el.classList.add('modal');
      el.innerHTML = '<h3>lorem ipsum</h3>';
      el.style.top = posTop + "px";
      el.style.left = posLeft + "px";
    
      document.body.insertBefore(el, document.body.childNodes[0]); 
    },
    close: function(element) {
      element.parentNode.removeChild(element);  
    },
    closeAll: function() {
      var elements = document.getElementsByClassName('modal');
    
      for (var i = 0; i < elements.length; i++) {
        modal.close(elements[i]);
      }
      document.body.classList.remove('modal-active');
    }
  };
  
  assignHandlers();
})();
