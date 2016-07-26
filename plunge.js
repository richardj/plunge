/*
 * Plunge.js
 * v0.2.6
 */

;(function() {
  'use strict';

  var assignHandlers = function() {
    if (!document.querySelector('[data-pl-trigger]')) {
      return; 
    }
    document.querySelector('body').addEventListener('click', dropdown.open, false);
  };

  var findAncestor = function(el, cls) {
    if (el.classList.contains(cls)) {
      return el;
    }
    while ((el = el.parentElement) && !el.classList.contains(cls));
    return el;
  };

  var findDropElement = function(el) {
    var element = document.querySelectorAll('[data-pl-id="' + el + '"]');
    element[0].classList.add('pl-active');
  };

  var escapeExit = function(event) {
    if (event.which == '27') {
      dropdown.closeAll();
    }
  };
  
  var dropdown = {
    open: function(event) {
      var root = document.documentElement;
      var clicked = findAncestor(event.target, 'dropdown');
      var dropdownEl = document.querySelector('[data-pl-id=' + event.target.dataset.plTrigger + ']');
      var pos = event.target.dataset.plPosition || 'auto';

      if (event.target.dataset.plTrigger && !event.target.classList.contains('pl-trigger-active')) {
        event.stopPropagation();
        // close all the dropdowns that might be open still
        dropdown.closeAll();
        // add the keyup event listener for the escape key
        document.querySelector('body').addEventListener('keyup', escapeExit, false);
        // add the classes to the html element
        root.classList.add('pl-active');
        // add an active class to the trigger
        event.target.classList.add('pl-trigger-active');
        // find the element that needs to plunge based on the indentifier in the data-pl-trigger attribute
        findDropElement(event.target.dataset.plTrigger);
        // set the position

        /*
         * arguments:
         * - Target Element
         * - Dimensions of the trigger
         * - Dimensions of the dropdown Element
         * - event
         */

        dropdown.position[pos](dropdownEl, event.target.getBoundingClientRect(), dropdownEl.getBoundingClientRect(), event);
      }
      else if (root.classList.contains('pl-active') && clicked === null) {
        dropdown.closeAll();
      }
      else {
        return;
      }
    },
    position: {
      'auto': function(dropdownEl, triggerRect, dropdownRect, event) {
        var spaceBelow = window.innerHeight - (event.target.offsetTop + triggerRect.height);

        if (spaceBelow >= dropdownRect.height) {
          dropdown.position.bottom(dropdownEl, event.target.getBoundingClientRect(), dropdownEl.getBoundingClientRect());
        }
        else {
          dropdown.position.top(dropdownEl, event.target.getBoundingClientRect(), dropdownEl.getBoundingClientRect());
        }
      },
      'top': function(dropdownEl, triggerRect, dropdownRect, event) {
        dropdownEl.style.top = (triggerRect.top - dropdownRect.height) + 'px';
        dropdownEl.style.left = (triggerRect.left) + 'px';
        //dropdownEl.style.width = triggerRect.width + 'px';
      },
      'right': function(dropdownEl,triggerRect, dropdownRect, event) {
        dropdownEl.style.top = (triggerRect.top - (dropdownRect.height / 2) + (triggerRect.height / 2)) + 'px';
        dropdownEl.style.left = (triggerRect.left + triggerRect.width) + 'px';
      },
      'bottom': function(dropdownEl, triggerRect, dropdownRect, event) {
        dropdownEl.style.top = (triggerRect.top + triggerRect.height) + 'px';
        dropdownEl.style.left = (triggerRect.left) + 'px';
        //dropdownEl.style.width = triggerRect.width + 'px';
      },
      'left': function(dropdownEl, triggerRect, dropdownRect, event) {
        dropdownEl.style.top = (triggerRect.top - (dropdownRect.height / 2) + (triggerRect.height / 2)) + 'px';
        dropdownEl.style.left = (triggerRect.left - dropdownRect.width) + 'px';
      }
    },
    close: function(element) {
      element.parentNode.removeChild(element);  
    },

    hide: function(element) {
      element.classList.remove('pl-active');
      element.classList.remove('pl-trigger-active');
      element.blur();
    },

    closeAll: function() {
      [].forEach.call(document.querySelectorAll('.dropdown, .pl-trigger-active'), dropdown.hide);

      document.documentElement.classList.remove('pl-active');
      document.querySelector('body').removeEventListener('keyup', escapeExit, false);
    }
  };
  
  assignHandlers();
})();
