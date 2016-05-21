(function() {
  var assignHandlers = function() {
    document.querySelector('body').addEventListener('click', dropdown.open, false);
  };

  var findAncestor = function(el, cls) {
    if (el.classList.contains(cls)) {
      return el;
    }
    while ((el = el.parentElement) && !el.classList.contains(cls));
    return el;
  };
  
  var dropdown = {
    open: function(event) {
      var root = document.documentElement;
      var clicked = findAncestor(event.target, 'dropdown');
      var dropElement = event.target.nextElementSibling;

      if (event.target.dataset.swTrigger && !event.target.classList.contains('sw-trigger-active')) {
        dropdown.closeAll();

        root.classList.add('sw-active');
        event.target.classList.add('sw-trigger-active');
        dropElement.classList.add('sw-active');
        dropdown.position(dropElement);
      }
      else if (root.classList.contains('sw-active') && clicked === null) {
        dropdown.closeAll();
      }
      else {
        return;
      }
    },
    position: function(el) {
      var posLeft = event.target.offsetLeft;
      var posTop = event.target.offsetTop + event.target.clientHeight + 10;

      el.style.top = posTop + "px";
      el.style.left = posLeft + "px";
    },
    content: function(event) {
      var posLeft = event.target.offsetLeft;
      var posTop = event.target.offsetTop + event.target.clientHeight + 10;

      var el = document.createElement('div');
      el.classList.add('dropdown');
      el.innerHTML = '<h3>lorem ipsum</h3>';
      el.style.top = posTop + "px";
      el.style.left = posLeft + "px";
    
      document.body.insertBefore(el, document.body.childNodes[0]); 
    },

    close: function(element) {
      element.parentNode.removeChild(element);  
    },

    hide: function(element) {
      element.classList.remove('sw-active');
      element.classList.remove('sw-trigger-active');
    },

    closeAll: function() {
      var elements = document.querySelectorAll('.dropdown, .sw-trigger-active');
    
      for (var i = 0; i < elements.length; i++) {
        dropdown.hide(elements[i]);
      }
      document.documentElement.classList.remove('sw-active');
    }
  };
  
  assignHandlers();
})();
