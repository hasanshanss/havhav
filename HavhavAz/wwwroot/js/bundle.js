/*!
  * Bootstrap v4.1.3 (https://getbootstrap.com/)
  * Copyright 2011-2018 The Bootstrap Authors (https://github.com/twbs/bootstrap/graphs/contributors)
  * Licensed under MIT (https://github.com/twbs/bootstrap/blob/master/LICENSE)
  */
(function (global, factory) {
  typeof exports === 'object' && typeof module !== 'undefined' ? factory(exports, require('jquery'), require('popper.js')) :
  typeof define === 'function' && define.amd ? define(['exports', 'jquery', 'popper.js'], factory) :
  (factory((global.bootstrap = {}),global.jQuery,global.Popper));
}(this, (function (exports,$,Popper) { 'use strict';

  $ = $ && $.hasOwnProperty('default') ? $['default'] : $;
  Popper = Popper && Popper.hasOwnProperty('default') ? Popper['default'] : Popper;

  function _defineProperties(target, props) {
    for (var i = 0; i < props.length; i++) {
      var descriptor = props[i];
      descriptor.enumerable = descriptor.enumerable || false;
      descriptor.configurable = true;
      if ("value" in descriptor) descriptor.writable = true;
      Object.defineProperty(target, descriptor.key, descriptor);
    }
  }

  function _createClass(Constructor, protoProps, staticProps) {
    if (protoProps) _defineProperties(Constructor.prototype, protoProps);
    if (staticProps) _defineProperties(Constructor, staticProps);
    return Constructor;
  }

  function _defineProperty(obj, key, value) {
    if (key in obj) {
      Object.defineProperty(obj, key, {
        value: value,
        enumerable: true,
        configurable: true,
        writable: true
      });
    } else {
      obj[key] = value;
    }

    return obj;
  }

  function _objectSpread(target) {
    for (var i = 1; i < arguments.length; i++) {
      var source = arguments[i] != null ? arguments[i] : {};
      var ownKeys = Object.keys(source);

      if (typeof Object.getOwnPropertySymbols === 'function') {
        ownKeys = ownKeys.concat(Object.getOwnPropertySymbols(source).filter(function (sym) {
          return Object.getOwnPropertyDescriptor(source, sym).enumerable;
        }));
      }

      ownKeys.forEach(function (key) {
        _defineProperty(target, key, source[key]);
      });
    }

    return target;
  }

  function _inheritsLoose(subClass, superClass) {
    subClass.prototype = Object.create(superClass.prototype);
    subClass.prototype.constructor = subClass;
    subClass.__proto__ = superClass;
  }

  /**
   * --------------------------------------------------------------------------
   * Bootstrap (v4.1.3): util.js
   * Licensed under MIT (https://github.com/twbs/bootstrap/blob/master/LICENSE)
   * --------------------------------------------------------------------------
   */

  var Util = function ($$$1) {
    /**
     * ------------------------------------------------------------------------
     * Private TransitionEnd Helpers
     * ------------------------------------------------------------------------
     */
    var TRANSITION_END = 'transitionend';
    var MAX_UID = 1000000;
    var MILLISECONDS_MULTIPLIER = 1000; // Shoutout AngusCroll (https://goo.gl/pxwQGp)

    function toType(obj) {
      return {}.toString.call(obj).match(/\s([a-z]+)/i)[1].toLowerCase();
    }

    function getSpecialTransitionEndEvent() {
      return {
        bindType: TRANSITION_END,
        delegateType: TRANSITION_END,
        handle: function handle(event) {
          if ($$$1(event.target).is(this)) {
            return event.handleObj.handler.apply(this, arguments); // eslint-disable-line prefer-rest-params
          }

          return undefined; // eslint-disable-line no-undefined
        }
      };
    }

    function transitionEndEmulator(duration) {
      var _this = this;

      var called = false;
      $$$1(this).one(Util.TRANSITION_END, function () {
        called = true;
      });
      setTimeout(function () {
        if (!called) {
          Util.triggerTransitionEnd(_this);
        }
      }, duration);
      return this;
    }

    function setTransitionEndSupport() {
      $$$1.fn.emulateTransitionEnd = transitionEndEmulator;
      $$$1.event.special[Util.TRANSITION_END] = getSpecialTransitionEndEvent();
    }
    /**
     * --------------------------------------------------------------------------
     * Public Util Api
     * --------------------------------------------------------------------------
     */


    var Util = {
      TRANSITION_END: 'bsTransitionEnd',
      getUID: function getUID(prefix) {
        do {
          // eslint-disable-next-line no-bitwise
          prefix += ~~(Math.random() * MAX_UID); // "~~" acts like a faster Math.floor() here
        } while (document.getElementById(prefix));

        return prefix;
      },
      getSelectorFromElement: function getSelectorFromElement(element) {
        var selector = element.getAttribute('data-target');

        if (!selector || selector === '#') {
          selector = element.getAttribute('href') || '';
        }

        try {
          return document.querySelector(selector) ? selector : null;
        } catch (err) {
          return null;
        }
      },
      getTransitionDurationFromElement: function getTransitionDurationFromElement(element) {
        if (!element) {
          return 0;
        } // Get transition-duration of the element


        var transitionDuration = $$$1(element).css('transition-duration');
        var floatTransitionDuration = parseFloat(transitionDuration); // Return 0 if element or transition duration is not found

        if (!floatTransitionDuration) {
          return 0;
        } // If multiple durations are defined, take the first


        transitionDuration = transitionDuration.split(',')[0];
        return parseFloat(transitionDuration) * MILLISECONDS_MULTIPLIER;
      },
      reflow: function reflow(element) {
        return element.offsetHeight;
      },
      triggerTransitionEnd: function triggerTransitionEnd(element) {
        $$$1(element).trigger(TRANSITION_END);
      },
      // TODO: Remove in v5
      supportsTransitionEnd: function supportsTransitionEnd() {
        return Boolean(TRANSITION_END);
      },
      isElement: function isElement(obj) {
        return (obj[0] || obj).nodeType;
      },
      typeCheckConfig: function typeCheckConfig(componentName, config, configTypes) {
        for (var property in configTypes) {
          if (Object.prototype.hasOwnProperty.call(configTypes, property)) {
            var expectedTypes = configTypes[property];
            var value = config[property];
            var valueType = value && Util.isElement(value) ? 'element' : toType(value);

            if (!new RegExp(expectedTypes).test(valueType)) {
              throw new Error(componentName.toUpperCase() + ": " + ("Option \"" + property + "\" provided type \"" + valueType + "\" ") + ("but expected type \"" + expectedTypes + "\"."));
            }
          }
        }
      }
    };
    setTransitionEndSupport();
    return Util;
  }($);

  /**
   * --------------------------------------------------------------------------
   * Bootstrap (v4.1.3): alert.js
   * Licensed under MIT (https://github.com/twbs/bootstrap/blob/master/LICENSE)
   * --------------------------------------------------------------------------
   */

  var Alert = function ($$$1) {
    /**
     * ------------------------------------------------------------------------
     * Constants
     * ------------------------------------------------------------------------
     */
    var NAME = 'alert';
    var VERSION = '4.1.3';
    var DATA_KEY = 'bs.alert';
    var EVENT_KEY = "." + DATA_KEY;
    var DATA_API_KEY = '.data-api';
    var JQUERY_NO_CONFLICT = $$$1.fn[NAME];
    var Selector = {
      DISMISS: '[data-dismiss="alert"]'
    };
    var Event = {
      CLOSE: "close" + EVENT_KEY,
      CLOSED: "closed" + EVENT_KEY,
      CLICK_DATA_API: "click" + EVENT_KEY + DATA_API_KEY
    };
    var ClassName = {
      ALERT: 'alert',
      FADE: 'fade',
      SHOW: 'show'
      /**
       * ------------------------------------------------------------------------
       * Class Definition
       * ------------------------------------------------------------------------
       */

    };

    var Alert =
    /*#__PURE__*/
    function () {
      function Alert(element) {
        this._element = element;
      } // Getters


      var _proto = Alert.prototype;

      // Public
      _proto.close = function close(element) {
        var rootElement = this._element;

        if (element) {
          rootElement = this._getRootElement(element);
        }

        var customEvent = this._triggerCloseEvent(rootElement);

        if (customEvent.isDefaultPrevented()) {
          return;
        }

        this._removeElement(rootElement);
      };

      _proto.dispose = function dispose() {
        $$$1.removeData(this._element, DATA_KEY);
        this._element = null;
      }; // Private


      _proto._getRootElement = function _getRootElement(element) {
        var selector = Util.getSelectorFromElement(element);
        var parent = false;

        if (selector) {
          parent = document.querySelector(selector);
        }

        if (!parent) {
          parent = $$$1(element).closest("." + ClassName.ALERT)[0];
        }

        return parent;
      };

      _proto._triggerCloseEvent = function _triggerCloseEvent(element) {
        var closeEvent = $$$1.Event(Event.CLOSE);
        $$$1(element).trigger(closeEvent);
        return closeEvent;
      };

      _proto._removeElement = function _removeElement(element) {
        var _this = this;

        $$$1(element).removeClass(ClassName.SHOW);

        if (!$$$1(element).hasClass(ClassName.FADE)) {
          this._destroyElement(element);

          return;
        }

        var transitionDuration = Util.getTransitionDurationFromElement(element);
        $$$1(element).one(Util.TRANSITION_END, function (event) {
          return _this._destroyElement(element, event);
        }).emulateTransitionEnd(transitionDuration);
      };

      _proto._destroyElement = function _destroyElement(element) {
        $$$1(element).detach().trigger(Event.CLOSED).remove();
      }; // Static


      Alert._jQueryInterface = function _jQueryInterface(config) {
        return this.each(function () {
          var $element = $$$1(this);
          var data = $element.data(DATA_KEY);

          if (!data) {
            data = new Alert(this);
            $element.data(DATA_KEY, data);
          }

          if (config === 'close') {
            data[config](this);
          }
        });
      };

      Alert._handleDismiss = function _handleDismiss(alertInstance) {
        return function (event) {
          if (event) {
            event.preventDefault();
          }

          alertInstance.close(this);
        };
      };

      _createClass(Alert, null, [{
        key: "VERSION",
        get: function get() {
          return VERSION;
        }
      }]);

      return Alert;
    }();
    /**
     * ------------------------------------------------------------------------
     * Data Api implementation
     * ------------------------------------------------------------------------
     */


    $$$1(document).on(Event.CLICK_DATA_API, Selector.DISMISS, Alert._handleDismiss(new Alert()));
    /**
     * ------------------------------------------------------------------------
     * jQuery
     * ------------------------------------------------------------------------
     */

    $$$1.fn[NAME] = Alert._jQueryInterface;
    $$$1.fn[NAME].Constructor = Alert;

    $$$1.fn[NAME].noConflict = function () {
      $$$1.fn[NAME] = JQUERY_NO_CONFLICT;
      return Alert._jQueryInterface;
    };

    return Alert;
  }($);

  /**
   * --------------------------------------------------------------------------
   * Bootstrap (v4.1.3): button.js
   * Licensed under MIT (https://github.com/twbs/bootstrap/blob/master/LICENSE)
   * --------------------------------------------------------------------------
   */

  var Button = function ($$$1) {
    /**
     * ------------------------------------------------------------------------
     * Constants
     * ------------------------------------------------------------------------
     */
    var NAME = 'button';
    var VERSION = '4.1.3';
    var DATA_KEY = 'bs.button';
    var EVENT_KEY = "." + DATA_KEY;
    var DATA_API_KEY = '.data-api';
    var JQUERY_NO_CONFLICT = $$$1.fn[NAME];
    var ClassName = {
      ACTIVE: 'active',
      BUTTON: 'btn',
      FOCUS: 'focus'
    };
    var Selector = {
      DATA_TOGGLE_CARROT: '[data-toggle^="button"]',
      DATA_TOGGLE: '[data-toggle="buttons"]',
      INPUT: 'input',
      ACTIVE: '.active',
      BUTTON: '.btn'
    };
    var Event = {
      CLICK_DATA_API: "click" + EVENT_KEY + DATA_API_KEY,
      FOCUS_BLUR_DATA_API: "focus" + EVENT_KEY + DATA_API_KEY + " " + ("blur" + EVENT_KEY + DATA_API_KEY)
      /**
       * ------------------------------------------------------------------------
       * Class Definition
       * ------------------------------------------------------------------------
       */

    };

    var Button =
    /*#__PURE__*/
    function () {
      function Button(element) {
        this._element = element;
      } // Getters


      var _proto = Button.prototype;

      // Public
      _proto.toggle = function toggle() {
        var triggerChangeEvent = true;
        var addAriaPressed = true;
        var rootElement = $$$1(this._element).closest(Selector.DATA_TOGGLE)[0];

        if (rootElement) {
          var input = this._element.querySelector(Selector.INPUT);

          if (input) {
            if (input.type === 'radio') {
              if (input.checked && this._element.classList.contains(ClassName.ACTIVE)) {
                triggerChangeEvent = false;
              } else {
                var activeElement = rootElement.querySelector(Selector.ACTIVE);

                if (activeElement) {
                  $$$1(activeElement).removeClass(ClassName.ACTIVE);
                }
              }
            }

            if (triggerChangeEvent) {
              if (input.hasAttribute('disabled') || rootElement.hasAttribute('disabled') || input.classList.contains('disabled') || rootElement.classList.contains('disabled')) {
                return;
              }

              input.checked = !this._element.classList.contains(ClassName.ACTIVE);
              $$$1(input).trigger('change');
            }

            input.focus();
            addAriaPressed = false;
          }
        }

        if (addAriaPressed) {
          this._element.setAttribute('aria-pressed', !this._element.classList.contains(ClassName.ACTIVE));
        }

        if (triggerChangeEvent) {
          $$$1(this._element).toggleClass(ClassName.ACTIVE);
        }
      };

      _proto.dispose = function dispose() {
        $$$1.removeData(this._element, DATA_KEY);
        this._element = null;
      }; // Static


      Button._jQueryInterface = function _jQueryInterface(config) {
        return this.each(function () {
          var data = $$$1(this).data(DATA_KEY);

          if (!data) {
            data = new Button(this);
            $$$1(this).data(DATA_KEY, data);
          }

          if (config === 'toggle') {
            data[config]();
          }
        });
      };

      _createClass(Button, null, [{
        key: "VERSION",
        get: function get() {
          return VERSION;
        }
      }]);

      return Button;
    }();
    /**
     * ------------------------------------------------------------------------
     * Data Api implementation
     * ------------------------------------------------------------------------
     */


    $$$1(document).on(Event.CLICK_DATA_API, Selector.DATA_TOGGLE_CARROT, function (event) {
      event.preventDefault();
      var button = event.target;

      if (!$$$1(button).hasClass(ClassName.BUTTON)) {
        button = $$$1(button).closest(Selector.BUTTON);
      }

      Button._jQueryInterface.call($$$1(button), 'toggle');
    }).on(Event.FOCUS_BLUR_DATA_API, Selector.DATA_TOGGLE_CARROT, function (event) {
      var button = $$$1(event.target).closest(Selector.BUTTON)[0];
      $$$1(button).toggleClass(ClassName.FOCUS, /^focus(in)?$/.test(event.type));
    });
    /**
     * ------------------------------------------------------------------------
     * jQuery
     * ------------------------------------------------------------------------
     */

    $$$1.fn[NAME] = Button._jQueryInterface;
    $$$1.fn[NAME].Constructor = Button;

    $$$1.fn[NAME].noConflict = function () {
      $$$1.fn[NAME] = JQUERY_NO_CONFLICT;
      return Button._jQueryInterface;
    };

    return Button;
  }($);

  /**
   * --------------------------------------------------------------------------
   * Bootstrap (v4.1.3): carousel.js
   * Licensed under MIT (https://github.com/twbs/bootstrap/blob/master/LICENSE)
   * --------------------------------------------------------------------------
   */

  var Carousel = function ($$$1) {
    /**
     * ------------------------------------------------------------------------
     * Constants
     * ------------------------------------------------------------------------
     */
    var NAME = 'carousel';
    var VERSION = '4.1.3';
    var DATA_KEY = 'bs.carousel';
    var EVENT_KEY = "." + DATA_KEY;
    var DATA_API_KEY = '.data-api';
    var JQUERY_NO_CONFLICT = $$$1.fn[NAME];
    var ARROW_LEFT_KEYCODE = 37; // KeyboardEvent.which value for left arrow key

    var ARROW_RIGHT_KEYCODE = 39; // KeyboardEvent.which value for right arrow key

    var TOUCHEVENT_COMPAT_WAIT = 500; // Time for mouse compat events to fire after touch

    var Default = {
      interval: 5000,
      keyboard: true,
      slide: false,
      pause: 'hover',
      wrap: true
    };
    var DefaultType = {
      interval: '(number|boolean)',
      keyboard: 'boolean',
      slide: '(boolean|string)',
      pause: '(string|boolean)',
      wrap: 'boolean'
    };
    var Direction = {
      NEXT: 'next',
      PREV: 'prev',
      LEFT: 'left',
      RIGHT: 'right'
    };
    var Event = {
      SLIDE: "slide" + EVENT_KEY,
      SLID: "slid" + EVENT_KEY,
      KEYDOWN: "keydown" + EVENT_KEY,
      MOUSEENTER: "mouseenter" + EVENT_KEY,
      MOUSELEAVE: "mouseleave" + EVENT_KEY,
      TOUCHEND: "touchend" + EVENT_KEY,
      LOAD_DATA_API: "load" + EVENT_KEY + DATA_API_KEY,
      CLICK_DATA_API: "click" + EVENT_KEY + DATA_API_KEY
    };
    var ClassName = {
      CAROUSEL: 'carousel',
      ACTIVE: 'active',
      SLIDE: 'slide',
      RIGHT: 'carousel-item-right',
      LEFT: 'carousel-item-left',
      NEXT: 'carousel-item-next',
      PREV: 'carousel-item-prev',
      ITEM: 'carousel-item'
    };
    var Selector = {
      ACTIVE: '.active',
      ACTIVE_ITEM: '.active.carousel-item',
      ITEM: '.carousel-item',
      NEXT_PREV: '.carousel-item-next, .carousel-item-prev',
      INDICATORS: '.carousel-indicators',
      DATA_SLIDE: '[data-slide], [data-slide-to]',
      DATA_RIDE: '[data-ride="carousel"]'
      /**
       * ------------------------------------------------------------------------
       * Class Definition
       * ------------------------------------------------------------------------
       */

    };

    var Carousel =
    /*#__PURE__*/
    function () {
      function Carousel(element, config) {
        this._items = null;
        this._interval = null;
        this._activeElement = null;
        this._isPaused = false;
        this._isSliding = false;
        this.touchTimeout = null;
        this._config = this._getConfig(config);
        this._element = $$$1(element)[0];
        this._indicatorsElement = this._element.querySelector(Selector.INDICATORS);

        this._addEventListeners();
      } // Getters


      var _proto = Carousel.prototype;

      // Public
      _proto.next = function next() {
        if (!this._isSliding) {
          this._slide(Direction.NEXT);
        }
      };

      _proto.nextWhenVisible = function nextWhenVisible() {
        // Don't call next when the page isn't visible
        // or the carousel or its parent isn't visible
        if (!document.hidden && $$$1(this._element).is(':visible') && $$$1(this._element).css('visibility') !== 'hidden') {
          this.next();
        }
      };

      _proto.prev = function prev() {
        if (!this._isSliding) {
          this._slide(Direction.PREV);
        }
      };

      _proto.pause = function pause(event) {
        if (!event) {
          this._isPaused = true;
        }

        if (this._element.querySelector(Selector.NEXT_PREV)) {
          Util.triggerTransitionEnd(this._element);
          this.cycle(true);
        }

        clearInterval(this._interval);
        this._interval = null;
      };

      _proto.cycle = function cycle(event) {
        if (!event) {
          this._isPaused = false;
        }

        if (this._interval) {
          clearInterval(this._interval);
          this._interval = null;
        }

        if (this._config.interval && !this._isPaused) {
          this._interval = setInterval((document.visibilityState ? this.nextWhenVisible : this.next).bind(this), this._config.interval);
        }
      };

      _proto.to = function to(index) {
        var _this = this;

        this._activeElement = this._element.querySelector(Selector.ACTIVE_ITEM);

        var activeIndex = this._getItemIndex(this._activeElement);

        if (index > this._items.length - 1 || index < 0) {
          return;
        }

        if (this._isSliding) {
          $$$1(this._element).one(Event.SLID, function () {
            return _this.to(index);
          });
          return;
        }

        if (activeIndex === index) {
          this.pause();
          this.cycle();
          return;
        }

        var direction = index > activeIndex ? Direction.NEXT : Direction.PREV;

        this._slide(direction, this._items[index]);
      };

      _proto.dispose = function dispose() {
        $$$1(this._element).off(EVENT_KEY);
        $$$1.removeData(this._element, DATA_KEY);
        this._items = null;
        this._config = null;
        this._element = null;
        this._interval = null;
        this._isPaused = null;
        this._isSliding = null;
        this._activeElement = null;
        this._indicatorsElement = null;
      }; // Private


      _proto._getConfig = function _getConfig(config) {
        config = _objectSpread({}, Default, config);
        Util.typeCheckConfig(NAME, config, DefaultType);
        return config;
      };

      _proto._addEventListeners = function _addEventListeners() {
        var _this2 = this;

        if (this._config.keyboard) {
          $$$1(this._element).on(Event.KEYDOWN, function (event) {
            return _this2._keydown(event);
          });
        }

        if (this._config.pause === 'hover') {
          $$$1(this._element).on(Event.MOUSEENTER, function (event) {
            return _this2.pause(event);
          }).on(Event.MOUSELEAVE, function (event) {
            return _this2.cycle(event);
          });

          if ('ontouchstart' in document.documentElement) {
            // If it's a touch-enabled device, mouseenter/leave are fired as
            // part of the mouse compatibility events on first tap - the carousel
            // would stop cycling until user tapped out of it;
            // here, we listen for touchend, explicitly pause the carousel
            // (as if it's the second time we tap on it, mouseenter compat event
            // is NOT fired) and after a timeout (to allow for mouse compatibility
            // events to fire) we explicitly restart cycling
            $$$1(this._element).on(Event.TOUCHEND, function () {
              _this2.pause();

              if (_this2.touchTimeout) {
                clearTimeout(_this2.touchTimeout);
              }

              _this2.touchTimeout = setTimeout(function (event) {
                return _this2.cycle(event);
              }, TOUCHEVENT_COMPAT_WAIT + _this2._config.interval);
            });
          }
        }
      };

      _proto._keydown = function _keydown(event) {
        if (/input|textarea/i.test(event.target.tagName)) {
          return;
        }

        switch (event.which) {
          case ARROW_LEFT_KEYCODE:
            event.preventDefault();
            this.prev();
            break;

          case ARROW_RIGHT_KEYCODE:
            event.preventDefault();
            this.next();
            break;

          default:
        }
      };

      _proto._getItemIndex = function _getItemIndex(element) {
        this._items = element && element.parentNode ? [].slice.call(element.parentNode.querySelectorAll(Selector.ITEM)) : [];
        return this._items.indexOf(element);
      };

      _proto._getItemByDirection = function _getItemByDirection(direction, activeElement) {
        var isNextDirection = direction === Direction.NEXT;
        var isPrevDirection = direction === Direction.PREV;

        var activeIndex = this._getItemIndex(activeElement);

        var lastItemIndex = this._items.length - 1;
        var isGoingToWrap = isPrevDirection && activeIndex === 0 || isNextDirection && activeIndex === lastItemIndex;

        if (isGoingToWrap && !this._config.wrap) {
          return activeElement;
        }

        var delta = direction === Direction.PREV ? -1 : 1;
        var itemIndex = (activeIndex + delta) % this._items.length;
        return itemIndex === -1 ? this._items[this._items.length - 1] : this._items[itemIndex];
      };

      _proto._triggerSlideEvent = function _triggerSlideEvent(relatedTarget, eventDirectionName) {
        var targetIndex = this._getItemIndex(relatedTarget);

        var fromIndex = this._getItemIndex(this._element.querySelector(Selector.ACTIVE_ITEM));

        var slideEvent = $$$1.Event(Event.SLIDE, {
          relatedTarget: relatedTarget,
          direction: eventDirectionName,
          from: fromIndex,
          to: targetIndex
        });
        $$$1(this._element).trigger(slideEvent);
        return slideEvent;
      };

      _proto._setActiveIndicatorElement = function _setActiveIndicatorElement(element) {
        if (this._indicatorsElement) {
          var indicators = [].slice.call(this._indicatorsElement.querySelectorAll(Selector.ACTIVE));
          $$$1(indicators).removeClass(ClassName.ACTIVE);

          var nextIndicator = this._indicatorsElement.children[this._getItemIndex(element)];

          if (nextIndicator) {
            $$$1(nextIndicator).addClass(ClassName.ACTIVE);
          }
        }
      };

      _proto._slide = function _slide(direction, element) {
        var _this3 = this;

        var activeElement = this._element.querySelector(Selector.ACTIVE_ITEM);

        var activeElementIndex = this._getItemIndex(activeElement);

        var nextElement = element || activeElement && this._getItemByDirection(direction, activeElement);

        var nextElementIndex = this._getItemIndex(nextElement);

        var isCycling = Boolean(this._interval);
        var directionalClassName;
        var orderClassName;
        var eventDirectionName;

        if (direction === Direction.NEXT) {
          directionalClassName = ClassName.LEFT;
          orderClassName = ClassName.NEXT;
          eventDirectionName = Direction.LEFT;
        } else {
          directionalClassName = ClassName.RIGHT;
          orderClassName = ClassName.PREV;
          eventDirectionName = Direction.RIGHT;
        }

        if (nextElement && $$$1(nextElement).hasClass(ClassName.ACTIVE)) {
          this._isSliding = false;
          return;
        }

        var slideEvent = this._triggerSlideEvent(nextElement, eventDirectionName);

        if (slideEvent.isDefaultPrevented()) {
          return;
        }

        if (!activeElement || !nextElement) {
          // Some weirdness is happening, so we bail
          return;
        }

        this._isSliding = true;

        if (isCycling) {
          this.pause();
        }

        this._setActiveIndicatorElement(nextElement);

        var slidEvent = $$$1.Event(Event.SLID, {
          relatedTarget: nextElement,
          direction: eventDirectionName,
          from: activeElementIndex,
          to: nextElementIndex
        });

        if ($$$1(this._element).hasClass(ClassName.SLIDE)) {
          $$$1(nextElement).addClass(orderClassName);
          Util.reflow(nextElement);
          $$$1(activeElement).addClass(directionalClassName);
          $$$1(nextElement).addClass(directionalClassName);
          var transitionDuration = Util.getTransitionDurationFromElement(activeElement);
          $$$1(activeElement).one(Util.TRANSITION_END, function () {
            $$$1(nextElement).removeClass(directionalClassName + " " + orderClassName).addClass(ClassName.ACTIVE);
            $$$1(activeElement).removeClass(ClassName.ACTIVE + " " + orderClassName + " " + directionalClassName);
            _this3._isSliding = false;
            setTimeout(function () {
              return $$$1(_this3._element).trigger(slidEvent);
            }, 0);
          }).emulateTransitionEnd(transitionDuration);
        } else {
          $$$1(activeElement).removeClass(ClassName.ACTIVE);
          $$$1(nextElement).addClass(ClassName.ACTIVE);
          this._isSliding = false;
          $$$1(this._element).trigger(slidEvent);
        }

        if (isCycling) {
          this.cycle();
        }
      }; // Static


      Carousel._jQueryInterface = function _jQueryInterface(config) {
        return this.each(function () {
          var data = $$$1(this).data(DATA_KEY);

          var _config = _objectSpread({}, Default, $$$1(this).data());

          if (typeof config === 'object') {
            _config = _objectSpread({}, _config, config);
          }

          var action = typeof config === 'string' ? config : _config.slide;

          if (!data) {
            data = new Carousel(this, _config);
            $$$1(this).data(DATA_KEY, data);
          }

          if (typeof config === 'number') {
            data.to(config);
          } else if (typeof action === 'string') {
            if (typeof data[action] === 'undefined') {
              throw new TypeError("No method named \"" + action + "\"");
            }

            data[action]();
          } else if (_config.interval) {
            data.pause();
            data.cycle();
          }
        });
      };

      Carousel._dataApiClickHandler = function _dataApiClickHandler(event) {
        var selector = Util.getSelectorFromElement(this);

        if (!selector) {
          return;
        }

        var target = $$$1(selector)[0];

        if (!target || !$$$1(target).hasClass(ClassName.CAROUSEL)) {
          return;
        }

        var config = _objectSpread({}, $$$1(target).data(), $$$1(this).data());

        var slideIndex = this.getAttribute('data-slide-to');

        if (slideIndex) {
          config.interval = false;
        }

        Carousel._jQueryInterface.call($$$1(target), config);

        if (slideIndex) {
          $$$1(target).data(DATA_KEY).to(slideIndex);
        }

        event.preventDefault();
      };

      _createClass(Carousel, null, [{
        key: "VERSION",
        get: function get() {
          return VERSION;
        }
      }, {
        key: "Default",
        get: function get() {
          return Default;
        }
      }]);

      return Carousel;
    }();
    /**
     * ------------------------------------------------------------------------
     * Data Api implementation
     * ------------------------------------------------------------------------
     */


    $$$1(document).on(Event.CLICK_DATA_API, Selector.DATA_SLIDE, Carousel._dataApiClickHandler);
    $$$1(window).on(Event.LOAD_DATA_API, function () {
      var carousels = [].slice.call(document.querySelectorAll(Selector.DATA_RIDE));

      for (var i = 0, len = carousels.length; i < len; i++) {
        var $carousel = $$$1(carousels[i]);

        Carousel._jQueryInterface.call($carousel, $carousel.data());
      }
    });
    /**
     * ------------------------------------------------------------------------
     * jQuery
     * ------------------------------------------------------------------------
     */

    $$$1.fn[NAME] = Carousel._jQueryInterface;
    $$$1.fn[NAME].Constructor = Carousel;

    $$$1.fn[NAME].noConflict = function () {
      $$$1.fn[NAME] = JQUERY_NO_CONFLICT;
      return Carousel._jQueryInterface;
    };

    return Carousel;
  }($);

  /**
   * --------------------------------------------------------------------------
   * Bootstrap (v4.1.3): collapse.js
   * Licensed under MIT (https://github.com/twbs/bootstrap/blob/master/LICENSE)
   * --------------------------------------------------------------------------
   */

  var Collapse = function ($$$1) {
    /**
     * ------------------------------------------------------------------------
     * Constants
     * ------------------------------------------------------------------------
     */
    var NAME = 'collapse';
    var VERSION = '4.1.3';
    var DATA_KEY = 'bs.collapse';
    var EVENT_KEY = "." + DATA_KEY;
    var DATA_API_KEY = '.data-api';
    var JQUERY_NO_CONFLICT = $$$1.fn[NAME];
    var Default = {
      toggle: true,
      parent: ''
    };
    var DefaultType = {
      toggle: 'boolean',
      parent: '(string|element)'
    };
    var Event = {
      SHOW: "show" + EVENT_KEY,
      SHOWN: "shown" + EVENT_KEY,
      HIDE: "hide" + EVENT_KEY,
      HIDDEN: "hidden" + EVENT_KEY,
      CLICK_DATA_API: "click" + EVENT_KEY + DATA_API_KEY
    };
    var ClassName = {
      SHOW: 'show',
      COLLAPSE: 'collapse',
      COLLAPSING: 'collapsing',
      COLLAPSED: 'collapsed'
    };
    var Dimension = {
      WIDTH: 'width',
      HEIGHT: 'height'
    };
    var Selector = {
      ACTIVES: '.show, .collapsing',
      DATA_TOGGLE: '[data-toggle="collapse"]'
      /**
       * ------------------------------------------------------------------------
       * Class Definition
       * ------------------------------------------------------------------------
       */

    };

    var Collapse =
    /*#__PURE__*/
    function () {
      function Collapse(element, config) {
        this._isTransitioning = false;
        this._element = element;
        this._config = this._getConfig(config);
        this._triggerArray = $$$1.makeArray(document.querySelectorAll("[data-toggle=\"collapse\"][href=\"#" + element.id + "\"]," + ("[data-toggle=\"collapse\"][data-target=\"#" + element.id + "\"]")));
        var toggleList = [].slice.call(document.querySelectorAll(Selector.DATA_TOGGLE));

        for (var i = 0, len = toggleList.length; i < len; i++) {
          var elem = toggleList[i];
          var selector = Util.getSelectorFromElement(elem);
          var filterElement = [].slice.call(document.querySelectorAll(selector)).filter(function (foundElem) {
            return foundElem === element;
          });

          if (selector !== null && filterElement.length > 0) {
            this._selector = selector;

            this._triggerArray.push(elem);
          }
        }

        this._parent = this._config.parent ? this._getParent() : null;

        if (!this._config.parent) {
          this._addAriaAndCollapsedClass(this._element, this._triggerArray);
        }

        if (this._config.toggle) {
          this.toggle();
        }
      } // Getters


      var _proto = Collapse.prototype;

      // Public
      _proto.toggle = function toggle() {
        if ($$$1(this._element).hasClass(ClassName.SHOW)) {
          this.hide();
        } else {
          this.show();
        }
      };

      _proto.show = function show() {
        var _this = this;

        if (this._isTransitioning || $$$1(this._element).hasClass(ClassName.SHOW)) {
          return;
        }

        var actives;
        var activesData;

        if (this._parent) {
          actives = [].slice.call(this._parent.querySelectorAll(Selector.ACTIVES)).filter(function (elem) {
            return elem.getAttribute('data-parent') === _this._config.parent;
          });

          if (actives.length === 0) {
            actives = null;
          }
        }

        if (actives) {
          activesData = $$$1(actives).not(this._selector).data(DATA_KEY);

          if (activesData && activesData._isTransitioning) {
            return;
          }
        }

        var startEvent = $$$1.Event(Event.SHOW);
        $$$1(this._element).trigger(startEvent);

        if (startEvent.isDefaultPrevented()) {
          return;
        }

        if (actives) {
          Collapse._jQueryInterface.call($$$1(actives).not(this._selector), 'hide');

          if (!activesData) {
            $$$1(actives).data(DATA_KEY, null);
          }
        }

        var dimension = this._getDimension();

        $$$1(this._element).removeClass(ClassName.COLLAPSE).addClass(ClassName.COLLAPSING);
        this._element.style[dimension] = 0;

        if (this._triggerArray.length) {
          $$$1(this._triggerArray).removeClass(ClassName.COLLAPSED).attr('aria-expanded', true);
        }

        this.setTransitioning(true);

        var complete = function complete() {
          $$$1(_this._element).removeClass(ClassName.COLLAPSING).addClass(ClassName.COLLAPSE).addClass(ClassName.SHOW);
          _this._element.style[dimension] = '';

          _this.setTransitioning(false);

          $$$1(_this._element).trigger(Event.SHOWN);
        };

        var capitalizedDimension = dimension[0].toUpperCase() + dimension.slice(1);
        var scrollSize = "scroll" + capitalizedDimension;
        var transitionDuration = Util.getTransitionDurationFromElement(this._element);
        $$$1(this._element).one(Util.TRANSITION_END, complete).emulateTransitionEnd(transitionDuration);
        this._element.style[dimension] = this._element[scrollSize] + "px";
      };

      _proto.hide = function hide() {
        var _this2 = this;

        if (this._isTransitioning || !$$$1(this._element).hasClass(ClassName.SHOW)) {
          return;
        }

        var startEvent = $$$1.Event(Event.HIDE);
        $$$1(this._element).trigger(startEvent);

        if (startEvent.isDefaultPrevented()) {
          return;
        }

        var dimension = this._getDimension();

        this._element.style[dimension] = this._element.getBoundingClientRect()[dimension] + "px";
        Util.reflow(this._element);
        $$$1(this._element).addClass(ClassName.COLLAPSING).removeClass(ClassName.COLLAPSE).removeClass(ClassName.SHOW);
        var triggerArrayLength = this._triggerArray.length;

        if (triggerArrayLength > 0) {
          for (var i = 0; i < triggerArrayLength; i++) {
            var trigger = this._triggerArray[i];
            var selector = Util.getSelectorFromElement(trigger);

            if (selector !== null) {
              var $elem = $$$1([].slice.call(document.querySelectorAll(selector)));

              if (!$elem.hasClass(ClassName.SHOW)) {
                $$$1(trigger).addClass(ClassName.COLLAPSED).attr('aria-expanded', false);
              }
            }
          }
        }

        this.setTransitioning(true);

        var complete = function complete() {
          _this2.setTransitioning(false);

          $$$1(_this2._element).removeClass(ClassName.COLLAPSING).addClass(ClassName.COLLAPSE).trigger(Event.HIDDEN);
        };

        this._element.style[dimension] = '';
        var transitionDuration = Util.getTransitionDurationFromElement(this._element);
        $$$1(this._element).one(Util.TRANSITION_END, complete).emulateTransitionEnd(transitionDuration);
      };

      _proto.setTransitioning = function setTransitioning(isTransitioning) {
        this._isTransitioning = isTransitioning;
      };

      _proto.dispose = function dispose() {
        $$$1.removeData(this._element, DATA_KEY);
        this._config = null;
        this._parent = null;
        this._element = null;
        this._triggerArray = null;
        this._isTransitioning = null;
      }; // Private


      _proto._getConfig = function _getConfig(config) {
        config = _objectSpread({}, Default, config);
        config.toggle = Boolean(config.toggle); // Coerce string values

        Util.typeCheckConfig(NAME, config, DefaultType);
        return config;
      };

      _proto._getDimension = function _getDimension() {
        var hasWidth = $$$1(this._element).hasClass(Dimension.WIDTH);
        return hasWidth ? Dimension.WIDTH : Dimension.HEIGHT;
      };

      _proto._getParent = function _getParent() {
        var _this3 = this;

        var parent = null;

        if (Util.isElement(this._config.parent)) {
          parent = this._config.parent; // It's a jQuery object

          if (typeof this._config.parent.jquery !== 'undefined') {
            parent = this._config.parent[0];
          }
        } else {
          parent = document.querySelector(this._config.parent);
        }

        var selector = "[data-toggle=\"collapse\"][data-parent=\"" + this._config.parent + "\"]";
        var children = [].slice.call(parent.querySelectorAll(selector));
        $$$1(children).each(function (i, element) {
          _this3._addAriaAndCollapsedClass(Collapse._getTargetFromElement(element), [element]);
        });
        return parent;
      };

      _proto._addAriaAndCollapsedClass = function _addAriaAndCollapsedClass(element, triggerArray) {
        if (element) {
          var isOpen = $$$1(element).hasClass(ClassName.SHOW);

          if (triggerArray.length) {
            $$$1(triggerArray).toggleClass(ClassName.COLLAPSED, !isOpen).attr('aria-expanded', isOpen);
          }
        }
      }; // Static


      Collapse._getTargetFromElement = function _getTargetFromElement(element) {
        var selector = Util.getSelectorFromElement(element);
        return selector ? document.querySelector(selector) : null;
      };

      Collapse._jQueryInterface = function _jQueryInterface(config) {
        return this.each(function () {
          var $this = $$$1(this);
          var data = $this.data(DATA_KEY);

          var _config = _objectSpread({}, Default, $this.data(), typeof config === 'object' && config ? config : {});

          if (!data && _config.toggle && /show|hide/.test(config)) {
            _config.toggle = false;
          }

          if (!data) {
            data = new Collapse(this, _config);
            $this.data(DATA_KEY, data);
          }

          if (typeof config === 'string') {
            if (typeof data[config] === 'undefined') {
              throw new TypeError("No method named \"" + config + "\"");
            }

            data[config]();
          }
        });
      };

      _createClass(Collapse, null, [{
        key: "VERSION",
        get: function get() {
          return VERSION;
        }
      }, {
        key: "Default",
        get: function get() {
          return Default;
        }
      }]);

      return Collapse;
    }();
    /**
     * ------------------------------------------------------------------------
     * Data Api implementation
     * ------------------------------------------------------------------------
     */


    $$$1(document).on(Event.CLICK_DATA_API, Selector.DATA_TOGGLE, function (event) {
      // preventDefault only for <a> elements (which change the URL) not inside the collapsible element
      if (event.currentTarget.tagName === 'A') {
        event.preventDefault();
      }

      var $trigger = $$$1(this);
      var selector = Util.getSelectorFromElement(this);
      var selectors = [].slice.call(document.querySelectorAll(selector));
      $$$1(selectors).each(function () {
        var $target = $$$1(this);
        var data = $target.data(DATA_KEY);
        var config = data ? 'toggle' : $trigger.data();

        Collapse._jQueryInterface.call($target, config);
      });
    });
    /**
     * ------------------------------------------------------------------------
     * jQuery
     * ------------------------------------------------------------------------
     */

    $$$1.fn[NAME] = Collapse._jQueryInterface;
    $$$1.fn[NAME].Constructor = Collapse;

    $$$1.fn[NAME].noConflict = function () {
      $$$1.fn[NAME] = JQUERY_NO_CONFLICT;
      return Collapse._jQueryInterface;
    };

    return Collapse;
  }($);

  /**
   * --------------------------------------------------------------------------
   * Bootstrap (v4.1.3): dropdown.js
   * Licensed under MIT (https://github.com/twbs/bootstrap/blob/master/LICENSE)
   * --------------------------------------------------------------------------
   */

  var Dropdown = function ($$$1) {
    /**
     * ------------------------------------------------------------------------
     * Constants
     * ------------------------------------------------------------------------
     */
    var NAME = 'dropdown';
    var VERSION = '4.1.3';
    var DATA_KEY = 'bs.dropdown';
    var EVENT_KEY = "." + DATA_KEY;
    var DATA_API_KEY = '.data-api';
    var JQUERY_NO_CONFLICT = $$$1.fn[NAME];
    var ESCAPE_KEYCODE = 27; // KeyboardEvent.which value for Escape (Esc) key

    var SPACE_KEYCODE = 32; // KeyboardEvent.which value for space key

    var TAB_KEYCODE = 9; // KeyboardEvent.which value for tab key

    var ARROW_UP_KEYCODE = 38; // KeyboardEvent.which value for up arrow key

    var ARROW_DOWN_KEYCODE = 40; // KeyboardEvent.which value for down arrow key

    var RIGHT_MOUSE_BUTTON_WHICH = 3; // MouseEvent.which value for the right button (assuming a right-handed mouse)

    var REGEXP_KEYDOWN = new RegExp(ARROW_UP_KEYCODE + "|" + ARROW_DOWN_KEYCODE + "|" + ESCAPE_KEYCODE);
    var Event = {
      HIDE: "hide" + EVENT_KEY,
      HIDDEN: "hidden" + EVENT_KEY,
      SHOW: "show" + EVENT_KEY,
      SHOWN: "shown" + EVENT_KEY,
      CLICK: "click" + EVENT_KEY,
      CLICK_DATA_API: "click" + EVENT_KEY + DATA_API_KEY,
      KEYDOWN_DATA_API: "keydown" + EVENT_KEY + DATA_API_KEY,
      KEYUP_DATA_API: "keyup" + EVENT_KEY + DATA_API_KEY
    };
    var ClassName = {
      DISABLED: 'disabled',
      SHOW: 'show',
      DROPUP: 'dropup',
      DROPRIGHT: 'dropright',
      DROPLEFT: 'dropleft',
      MENURIGHT: 'dropdown-menu-right',
      MENULEFT: 'dropdown-menu-left',
      POSITION_STATIC: 'position-static'
    };
    var Selector = {
      DATA_TOGGLE: '[data-toggle="dropdown"]',
      FORM_CHILD: '.dropdown form',
      MENU: '.dropdown-menu',
      NAVBAR_NAV: '.navbar-nav',
      VISIBLE_ITEMS: '.dropdown-menu .dropdown-item:not(.disabled):not(:disabled)'
    };
    var AttachmentMap = {
      TOP: 'top-start',
      TOPEND: 'top-end',
      BOTTOM: 'bottom-start',
      BOTTOMEND: 'bottom-end',
      RIGHT: 'right-start',
      RIGHTEND: 'right-end',
      LEFT: 'left-start',
      LEFTEND: 'left-end'
    };
    var Default = {
      offset: 0,
      flip: true,
      boundary: 'scrollParent',
      reference: 'toggle',
      display: 'dynamic'
    };
    var DefaultType = {
      offset: '(number|string|function)',
      flip: 'boolean',
      boundary: '(string|element)',
      reference: '(string|element)',
      display: 'string'
      /**
       * ------------------------------------------------------------------------
       * Class Definition
       * ------------------------------------------------------------------------
       */

    };

    var Dropdown =
    /*#__PURE__*/
    function () {
      function Dropdown(element, config) {
        this._element = element;
        this._popper = null;
        this._config = this._getConfig(config);
        this._menu = this._getMenuElement();
        this._inNavbar = this._detectNavbar();

        this._addEventListeners();
      } // Getters


      var _proto = Dropdown.prototype;

      // Public
      _proto.toggle = function toggle() {
        if (this._element.disabled || $$$1(this._element).hasClass(ClassName.DISABLED)) {
          return;
        }

        var parent = Dropdown._getParentFromElement(this._element);

        var isActive = $$$1(this._menu).hasClass(ClassName.SHOW);

        Dropdown._clearMenus();

        if (isActive) {
          return;
        }

        var relatedTarget = {
          relatedTarget: this._element
        };
        var showEvent = $$$1.Event(Event.SHOW, relatedTarget);
        $$$1(parent).trigger(showEvent);

        if (showEvent.isDefaultPrevented()) {
          return;
        } // Disable totally Popper.js for Dropdown in Navbar


        if (!this._inNavbar) {
          /**
           * Check for Popper dependency
           * Popper - https://popper.js.org
           */
          if (typeof Popper === 'undefined') {
            throw new TypeError('Bootstrap dropdown require Popper.js (https://popper.js.org)');
          }

          var referenceElement = this._element;

          if (this._config.reference === 'parent') {
            referenceElement = parent;
          } else if (Util.isElement(this._config.reference)) {
            referenceElement = this._config.reference; // Check if it's jQuery element

            if (typeof this._config.reference.jquery !== 'undefined') {
              referenceElement = this._config.reference[0];
            }
          } // If boundary is not `scrollParent`, then set position to `static`
          // to allow the menu to "escape" the scroll parent's boundaries
          // https://github.com/twbs/bootstrap/issues/24251


          if (this._config.boundary !== 'scrollParent') {
            $$$1(parent).addClass(ClassName.POSITION_STATIC);
          }

          this._popper = new Popper(referenceElement, this._menu, this._getPopperConfig());
        } // If this is a touch-enabled device we add extra
        // empty mouseover listeners to the body's immediate children;
        // only needed because of broken event delegation on iOS
        // https://www.quirksmode.org/blog/archives/2014/02/mouse_event_bub.html


        if ('ontouchstart' in document.documentElement && $$$1(parent).closest(Selector.NAVBAR_NAV).length === 0) {
          $$$1(document.body).children().on('mouseover', null, $$$1.noop);
        }

        this._element.focus();

        this._element.setAttribute('aria-expanded', true);

        $$$1(this._menu).toggleClass(ClassName.SHOW);
        $$$1(parent).toggleClass(ClassName.SHOW).trigger($$$1.Event(Event.SHOWN, relatedTarget));
      };

      _proto.dispose = function dispose() {
        $$$1.removeData(this._element, DATA_KEY);
        $$$1(this._element).off(EVENT_KEY);
        this._element = null;
        this._menu = null;

        if (this._popper !== null) {
          this._popper.destroy();

          this._popper = null;
        }
      };

      _proto.update = function update() {
        this._inNavbar = this._detectNavbar();

        if (this._popper !== null) {
          this._popper.scheduleUpdate();
        }
      }; // Private


      _proto._addEventListeners = function _addEventListeners() {
        var _this = this;

        $$$1(this._element).on(Event.CLICK, function (event) {
          event.preventDefault();
          event.stopPropagation();

          _this.toggle();
        });
      };

      _proto._getConfig = function _getConfig(config) {
        config = _objectSpread({}, this.constructor.Default, $$$1(this._element).data(), config);
        Util.typeCheckConfig(NAME, config, this.constructor.DefaultType);
        return config;
      };

      _proto._getMenuElement = function _getMenuElement() {
        if (!this._menu) {
          var parent = Dropdown._getParentFromElement(this._element);

          if (parent) {
            this._menu = parent.querySelector(Selector.MENU);
          }
        }

        return this._menu;
      };

      _proto._getPlacement = function _getPlacement() {
        var $parentDropdown = $$$1(this._element.parentNode);
        var placement = AttachmentMap.BOTTOM; // Handle dropup

        if ($parentDropdown.hasClass(ClassName.DROPUP)) {
          placement = AttachmentMap.TOP;

          if ($$$1(this._menu).hasClass(ClassName.MENURIGHT)) {
            placement = AttachmentMap.TOPEND;
          }
        } else if ($parentDropdown.hasClass(ClassName.DROPRIGHT)) {
          placement = AttachmentMap.RIGHT;
        } else if ($parentDropdown.hasClass(ClassName.DROPLEFT)) {
          placement = AttachmentMap.LEFT;
        } else if ($$$1(this._menu).hasClass(ClassName.MENURIGHT)) {
          placement = AttachmentMap.BOTTOMEND;
        }

        return placement;
      };

      _proto._detectNavbar = function _detectNavbar() {
        return $$$1(this._element).closest('.navbar').length > 0;
      };

      _proto._getPopperConfig = function _getPopperConfig() {
        var _this2 = this;

        var offsetConf = {};

        if (typeof this._config.offset === 'function') {
          offsetConf.fn = function (data) {
            data.offsets = _objectSpread({}, data.offsets, _this2._config.offset(data.offsets) || {});
            return data;
          };
        } else {
          offsetConf.offset = this._config.offset;
        }

        var popperConfig = {
          placement: this._getPlacement(),
          modifiers: {
            offset: offsetConf,
            flip: {
              enabled: this._config.flip
            },
            preventOverflow: {
              boundariesElement: this._config.boundary
            }
          } // Disable Popper.js if we have a static display

        };

        if (this._config.display === 'static') {
          popperConfig.modifiers.applyStyle = {
            enabled: false
          };
        }

        return popperConfig;
      }; // Static


      Dropdown._jQueryInterface = function _jQueryInterface(config) {
        return this.each(function () {
          var data = $$$1(this).data(DATA_KEY);

          var _config = typeof config === 'object' ? config : null;

          if (!data) {
            data = new Dropdown(this, _config);
            $$$1(this).data(DATA_KEY, data);
          }

          if (typeof config === 'string') {
            if (typeof data[config] === 'undefined') {
              throw new TypeError("No method named \"" + config + "\"");
            }

            data[config]();
          }
        });
      };

      Dropdown._clearMenus = function _clearMenus(event) {
        if (event && (event.which === RIGHT_MOUSE_BUTTON_WHICH || event.type === 'keyup' && event.which !== TAB_KEYCODE)) {
          return;
        }

        var toggles = [].slice.call(document.querySelectorAll(Selector.DATA_TOGGLE));

        for (var i = 0, len = toggles.length; i < len; i++) {
          var parent = Dropdown._getParentFromElement(toggles[i]);

          var context = $$$1(toggles[i]).data(DATA_KEY);
          var relatedTarget = {
            relatedTarget: toggles[i]
          };

          if (event && event.type === 'click') {
            relatedTarget.clickEvent = event;
          }

          if (!context) {
            continue;
          }

          var dropdownMenu = context._menu;

          if (!$$$1(parent).hasClass(ClassName.SHOW)) {
            continue;
          }

          if (event && (event.type === 'click' && /input|textarea/i.test(event.target.tagName) || event.type === 'keyup' && event.which === TAB_KEYCODE) && $$$1.contains(parent, event.target)) {
            continue;
          }

          var hideEvent = $$$1.Event(Event.HIDE, relatedTarget);
          $$$1(parent).trigger(hideEvent);

          if (hideEvent.isDefaultPrevented()) {
            continue;
          } // If this is a touch-enabled device we remove the extra
          // empty mouseover listeners we added for iOS support


          if ('ontouchstart' in document.documentElement) {
            $$$1(document.body).children().off('mouseover', null, $$$1.noop);
          }

          toggles[i].setAttribute('aria-expanded', 'false');
          $$$1(dropdownMenu).removeClass(ClassName.SHOW);
          $$$1(parent).removeClass(ClassName.SHOW).trigger($$$1.Event(Event.HIDDEN, relatedTarget));
        }
      };

      Dropdown._getParentFromElement = function _getParentFromElement(element) {
        var parent;
        var selector = Util.getSelectorFromElement(element);

        if (selector) {
          parent = document.querySelector(selector);
        }

        return parent || element.parentNode;
      }; // eslint-disable-next-line complexity


      Dropdown._dataApiKeydownHandler = function _dataApiKeydownHandler(event) {
        // If not input/textarea:
        //  - And not a key in REGEXP_KEYDOWN => not a dropdown command
        // If input/textarea:
        //  - If space key => not a dropdown command
        //  - If key is other than escape
        //    - If key is not up or down => not a dropdown command
        //    - If trigger inside the menu => not a dropdown command
        if (/input|textarea/i.test(event.target.tagName) ? event.which === SPACE_KEYCODE || event.which !== ESCAPE_KEYCODE && (event.which !== ARROW_DOWN_KEYCODE && event.which !== ARROW_UP_KEYCODE || $$$1(event.target).closest(Selector.MENU).length) : !REGEXP_KEYDOWN.test(event.which)) {
          return;
        }

        event.preventDefault();
        event.stopPropagation();

        if (this.disabled || $$$1(this).hasClass(ClassName.DISABLED)) {
          return;
        }

        var parent = Dropdown._getParentFromElement(this);

        var isActive = $$$1(parent).hasClass(ClassName.SHOW);

        if (!isActive && (event.which !== ESCAPE_KEYCODE || event.which !== SPACE_KEYCODE) || isActive && (event.which === ESCAPE_KEYCODE || event.which === SPACE_KEYCODE)) {
          if (event.which === ESCAPE_KEYCODE) {
            var toggle = parent.querySelector(Selector.DATA_TOGGLE);
            $$$1(toggle).trigger('focus');
          }

          $$$1(this).trigger('click');
          return;
        }

        var items = [].slice.call(parent.querySelectorAll(Selector.VISIBLE_ITEMS));

        if (items.length === 0) {
          return;
        }

        var index = items.indexOf(event.target);

        if (event.which === ARROW_UP_KEYCODE && index > 0) {
          // Up
          index--;
        }

        if (event.which === ARROW_DOWN_KEYCODE && index < items.length - 1) {
          // Down
          index++;
        }

        if (index < 0) {
          index = 0;
        }

        items[index].focus();
      };

      _createClass(Dropdown, null, [{
        key: "VERSION",
        get: function get() {
          return VERSION;
        }
      }, {
        key: "Default",
        get: function get() {
          return Default;
        }
      }, {
        key: "DefaultType",
        get: function get() {
          return DefaultType;
        }
      }]);

      return Dropdown;
    }();
    /**
     * ------------------------------------------------------------------------
     * Data Api implementation
     * ------------------------------------------------------------------------
     */


    $$$1(document).on(Event.KEYDOWN_DATA_API, Selector.DATA_TOGGLE, Dropdown._dataApiKeydownHandler).on(Event.KEYDOWN_DATA_API, Selector.MENU, Dropdown._dataApiKeydownHandler).on(Event.CLICK_DATA_API + " " + Event.KEYUP_DATA_API, Dropdown._clearMenus).on(Event.CLICK_DATA_API, Selector.DATA_TOGGLE, function (event) {
      event.preventDefault();
      event.stopPropagation();

      Dropdown._jQueryInterface.call($$$1(this), 'toggle');
    }).on(Event.CLICK_DATA_API, Selector.FORM_CHILD, function (e) {
      e.stopPropagation();
    });
    /**
     * ------------------------------------------------------------------------
     * jQuery
     * ------------------------------------------------------------------------
     */

    $$$1.fn[NAME] = Dropdown._jQueryInterface;
    $$$1.fn[NAME].Constructor = Dropdown;

    $$$1.fn[NAME].noConflict = function () {
      $$$1.fn[NAME] = JQUERY_NO_CONFLICT;
      return Dropdown._jQueryInterface;
    };

    return Dropdown;
  }($, Popper);

  /**
   * --------------------------------------------------------------------------
   * Bootstrap (v4.1.3): modal.js
   * Licensed under MIT (https://github.com/twbs/bootstrap/blob/master/LICENSE)
   * --------------------------------------------------------------------------
   */

  var Modal = function ($$$1) {
    /**
     * ------------------------------------------------------------------------
     * Constants
     * ------------------------------------------------------------------------
     */
    var NAME = 'modal';
    var VERSION = '4.1.3';
    var DATA_KEY = 'bs.modal';
    var EVENT_KEY = "." + DATA_KEY;
    var DATA_API_KEY = '.data-api';
    var JQUERY_NO_CONFLICT = $$$1.fn[NAME];
    var ESCAPE_KEYCODE = 27; // KeyboardEvent.which value for Escape (Esc) key

    var Default = {
      backdrop: true,
      keyboard: true,
      focus: true,
      show: true
    };
    var DefaultType = {
      backdrop: '(boolean|string)',
      keyboard: 'boolean',
      focus: 'boolean',
      show: 'boolean'
    };
    var Event = {
      HIDE: "hide" + EVENT_KEY,
      HIDDEN: "hidden" + EVENT_KEY,
      SHOW: "show" + EVENT_KEY,
      SHOWN: "shown" + EVENT_KEY,
      FOCUSIN: "focusin" + EVENT_KEY,
      RESIZE: "resize" + EVENT_KEY,
      CLICK_DISMISS: "click.dismiss" + EVENT_KEY,
      KEYDOWN_DISMISS: "keydown.dismiss" + EVENT_KEY,
      MOUSEUP_DISMISS: "mouseup.dismiss" + EVENT_KEY,
      MOUSEDOWN_DISMISS: "mousedown.dismiss" + EVENT_KEY,
      CLICK_DATA_API: "click" + EVENT_KEY + DATA_API_KEY
    };
    var ClassName = {
      SCROLLBAR_MEASURER: 'modal-scrollbar-measure',
      BACKDROP: 'modal-backdrop',
      OPEN: 'modal-open',
      FADE: 'fade',
      SHOW: 'show'
    };
    var Selector = {
      DIALOG: '.modal-dialog',
      DATA_TOGGLE: '[data-toggle="modal"]',
      DATA_DISMISS: '[data-dismiss="modal"]',
      FIXED_CONTENT: '.fixed-top, .fixed-bottom, .is-fixed, .sticky-top',
      STICKY_CONTENT: '.sticky-top'
      /**
       * ------------------------------------------------------------------------
       * Class Definition
       * ------------------------------------------------------------------------
       */

    };

    var Modal =
    /*#__PURE__*/
    function () {
      function Modal(element, config) {
        this._config = this._getConfig(config);
        this._element = element;
        this._dialog = element.querySelector(Selector.DIALOG);
        this._backdrop = null;
        this._isShown = false;
        this._isBodyOverflowing = false;
        this._ignoreBackdropClick = false;
        this._scrollbarWidth = 0;
      } // Getters


      var _proto = Modal.prototype;

      // Public
      _proto.toggle = function toggle(relatedTarget) {
        return this._isShown ? this.hide() : this.show(relatedTarget);
      };

      _proto.show = function show(relatedTarget) {
        var _this = this;

        if (this._isTransitioning || this._isShown) {
          return;
        }

        if ($$$1(this._element).hasClass(ClassName.FADE)) {
          this._isTransitioning = true;
        }

        var showEvent = $$$1.Event(Event.SHOW, {
          relatedTarget: relatedTarget
        });
        $$$1(this._element).trigger(showEvent);

        if (this._isShown || showEvent.isDefaultPrevented()) {
          return;
        }

        this._isShown = true;

        this._checkScrollbar();

        this._setScrollbar();

        this._adjustDialog();

        $$$1(document.body).addClass(ClassName.OPEN);

        this._setEscapeEvent();

        this._setResizeEvent();

        $$$1(this._element).on(Event.CLICK_DISMISS, Selector.DATA_DISMISS, function (event) {
          return _this.hide(event);
        });
        $$$1(this._dialog).on(Event.MOUSEDOWN_DISMISS, function () {
          $$$1(_this._element).one(Event.MOUSEUP_DISMISS, function (event) {
            if ($$$1(event.target).is(_this._element)) {
              _this._ignoreBackdropClick = true;
            }
          });
        });

        this._showBackdrop(function () {
          return _this._showElement(relatedTarget);
        });
      };

      _proto.hide = function hide(event) {
        var _this2 = this;

        if (event) {
          event.preventDefault();
        }

        if (this._isTransitioning || !this._isShown) {
          return;
        }

        var hideEvent = $$$1.Event(Event.HIDE);
        $$$1(this._element).trigger(hideEvent);

        if (!this._isShown || hideEvent.isDefaultPrevented()) {
          return;
        }

        this._isShown = false;
        var transition = $$$1(this._element).hasClass(ClassName.FADE);

        if (transition) {
          this._isTransitioning = true;
        }

        this._setEscapeEvent();

        this._setResizeEvent();

        $$$1(document).off(Event.FOCUSIN);
        $$$1(this._element).removeClass(ClassName.SHOW);
        $$$1(this._element).off(Event.CLICK_DISMISS);
        $$$1(this._dialog).off(Event.MOUSEDOWN_DISMISS);

        if (transition) {
          var transitionDuration = Util.getTransitionDurationFromElement(this._element);
          $$$1(this._element).one(Util.TRANSITION_END, function (event) {
            return _this2._hideModal(event);
          }).emulateTransitionEnd(transitionDuration);
        } else {
          this._hideModal();
        }
      };

      _proto.dispose = function dispose() {
        $$$1.removeData(this._element, DATA_KEY);
        $$$1(window, document, this._element, this._backdrop).off(EVENT_KEY);
        this._config = null;
        this._element = null;
        this._dialog = null;
        this._backdrop = null;
        this._isShown = null;
        this._isBodyOverflowing = null;
        this._ignoreBackdropClick = null;
        this._scrollbarWidth = null;
      };

      _proto.handleUpdate = function handleUpdate() {
        this._adjustDialog();
      }; // Private


      _proto._getConfig = function _getConfig(config) {
        config = _objectSpread({}, Default, config);
        Util.typeCheckConfig(NAME, config, DefaultType);
        return config;
      };

      _proto._showElement = function _showElement(relatedTarget) {
        var _this3 = this;

        var transition = $$$1(this._element).hasClass(ClassName.FADE);

        if (!this._element.parentNode || this._element.parentNode.nodeType !== Node.ELEMENT_NODE) {
          // Don't move modal's DOM position
          document.body.appendChild(this._element);
        }

        this._element.style.display = 'block';

        this._element.removeAttribute('aria-hidden');

        this._element.scrollTop = 0;

        if (transition) {
          Util.reflow(this._element);
        }

        $$$1(this._element).addClass(ClassName.SHOW);

        if (this._config.focus) {
          this._enforceFocus();
        }

        var shownEvent = $$$1.Event(Event.SHOWN, {
          relatedTarget: relatedTarget
        });

        var transitionComplete = function transitionComplete() {
          if (_this3._config.focus) {
            _this3._element.focus();
          }

          _this3._isTransitioning = false;
          $$$1(_this3._element).trigger(shownEvent);
        };

        if (transition) {
          var transitionDuration = Util.getTransitionDurationFromElement(this._element);
          $$$1(this._dialog).one(Util.TRANSITION_END, transitionComplete).emulateTransitionEnd(transitionDuration);
        } else {
          transitionComplete();
        }
      };

      _proto._enforceFocus = function _enforceFocus() {
        var _this4 = this;

        $$$1(document).off(Event.FOCUSIN) // Guard against infinite focus loop
        .on(Event.FOCUSIN, function (event) {
          if (document !== event.target && _this4._element !== event.target && $$$1(_this4._element).has(event.target).length === 0) {
            _this4._element.focus();
          }
        });
      };

      _proto._setEscapeEvent = function _setEscapeEvent() {
        var _this5 = this;

        if (this._isShown && this._config.keyboard) {
          $$$1(this._element).on(Event.KEYDOWN_DISMISS, function (event) {
            if (event.which === ESCAPE_KEYCODE) {
              event.preventDefault();

              _this5.hide();
            }
          });
        } else if (!this._isShown) {
          $$$1(this._element).off(Event.KEYDOWN_DISMISS);
        }
      };

      _proto._setResizeEvent = function _setResizeEvent() {
        var _this6 = this;

        if (this._isShown) {
          $$$1(window).on(Event.RESIZE, function (event) {
            return _this6.handleUpdate(event);
          });
        } else {
          $$$1(window).off(Event.RESIZE);
        }
      };

      _proto._hideModal = function _hideModal() {
        var _this7 = this;

        this._element.style.display = 'none';

        this._element.setAttribute('aria-hidden', true);

        this._isTransitioning = false;

        this._showBackdrop(function () {
          $$$1(document.body).removeClass(ClassName.OPEN);

          _this7._resetAdjustments();

          _this7._resetScrollbar();

          $$$1(_this7._element).trigger(Event.HIDDEN);
        });
      };

      _proto._removeBackdrop = function _removeBackdrop() {
        if (this._backdrop) {
          $$$1(this._backdrop).remove();
          this._backdrop = null;
        }
      };

      _proto._showBackdrop = function _showBackdrop(callback) {
        var _this8 = this;

        var animate = $$$1(this._element).hasClass(ClassName.FADE) ? ClassName.FADE : '';

        if (this._isShown && this._config.backdrop) {
          this._backdrop = document.createElement('div');
          this._backdrop.className = ClassName.BACKDROP;

          if (animate) {
            this._backdrop.classList.add(animate);
          }

          $$$1(this._backdrop).appendTo(document.body);
          $$$1(this._element).on(Event.CLICK_DISMISS, function (event) {
            if (_this8._ignoreBackdropClick) {
              _this8._ignoreBackdropClick = false;
              return;
            }

            if (event.target !== event.currentTarget) {
              return;
            }

            if (_this8._config.backdrop === 'static') {
              _this8._element.focus();
            } else {
              _this8.hide();
            }
          });

          if (animate) {
            Util.reflow(this._backdrop);
          }

          $$$1(this._backdrop).addClass(ClassName.SHOW);

          if (!callback) {
            return;
          }

          if (!animate) {
            callback();
            return;
          }

          var backdropTransitionDuration = Util.getTransitionDurationFromElement(this._backdrop);
          $$$1(this._backdrop).one(Util.TRANSITION_END, callback).emulateTransitionEnd(backdropTransitionDuration);
        } else if (!this._isShown && this._backdrop) {
          $$$1(this._backdrop).removeClass(ClassName.SHOW);

          var callbackRemove = function callbackRemove() {
            _this8._removeBackdrop();

            if (callback) {
              callback();
            }
          };

          if ($$$1(this._element).hasClass(ClassName.FADE)) {
            var _backdropTransitionDuration = Util.getTransitionDurationFromElement(this._backdrop);

            $$$1(this._backdrop).one(Util.TRANSITION_END, callbackRemove).emulateTransitionEnd(_backdropTransitionDuration);
          } else {
            callbackRemove();
          }
        } else if (callback) {
          callback();
        }
      }; // ----------------------------------------------------------------------
      // the following methods are used to handle overflowing modals
      // todo (fat): these should probably be refactored out of modal.js
      // ----------------------------------------------------------------------


      _proto._adjustDialog = function _adjustDialog() {
        var isModalOverflowing = this._element.scrollHeight > document.documentElement.clientHeight;

        if (!this._isBodyOverflowing && isModalOverflowing) {
          this._element.style.paddingLeft = this._scrollbarWidth + "px";
        }

        if (this._isBodyOverflowing && !isModalOverflowing) {
          this._element.style.paddingRight = this._scrollbarWidth + "px";
        }
      };

      _proto._resetAdjustments = function _resetAdjustments() {
        this._element.style.paddingLeft = '';
        this._element.style.paddingRight = '';
      };

      _proto._checkScrollbar = function _checkScrollbar() {
        var rect = document.body.getBoundingClientRect();
        this._isBodyOverflowing = rect.left + rect.right < window.innerWidth;
        this._scrollbarWidth = this._getScrollbarWidth();
      };

      _proto._setScrollbar = function _setScrollbar() {
        var _this9 = this;

        if (this._isBodyOverflowing) {
          // Note: DOMNode.style.paddingRight returns the actual value or '' if not set
          //   while $(DOMNode).css('padding-right') returns the calculated value or 0 if not set
          var fixedContent = [].slice.call(document.querySelectorAll(Selector.FIXED_CONTENT));
          var stickyContent = [].slice.call(document.querySelectorAll(Selector.STICKY_CONTENT)); // Adjust fixed content padding

          $$$1(fixedContent).each(function (index, element) {
            var actualPadding = element.style.paddingRight;
            var calculatedPadding = $$$1(element).css('padding-right');
            $$$1(element).data('padding-right', actualPadding).css('padding-right', parseFloat(calculatedPadding) + _this9._scrollbarWidth + "px");
          }); // Adjust sticky content margin

          $$$1(stickyContent).each(function (index, element) {
            var actualMargin = element.style.marginRight;
            var calculatedMargin = $$$1(element).css('margin-right');
            $$$1(element).data('margin-right', actualMargin).css('margin-right', parseFloat(calculatedMargin) - _this9._scrollbarWidth + "px");
          }); // Adjust body padding

          var actualPadding = document.body.style.paddingRight;
          var calculatedPadding = $$$1(document.body).css('padding-right');
          $$$1(document.body).data('padding-right', actualPadding).css('padding-right', parseFloat(calculatedPadding) + this._scrollbarWidth + "px");
        }
      };

      _proto._resetScrollbar = function _resetScrollbar() {
        // Restore fixed content padding
        var fixedContent = [].slice.call(document.querySelectorAll(Selector.FIXED_CONTENT));
        $$$1(fixedContent).each(function (index, element) {
          var padding = $$$1(element).data('padding-right');
          $$$1(element).removeData('padding-right');
          element.style.paddingRight = padding ? padding : '';
        }); // Restore sticky content

        var elements = [].slice.call(document.querySelectorAll("" + Selector.STICKY_CONTENT));
        $$$1(elements).each(function (index, element) {
          var margin = $$$1(element).data('margin-right');

          if (typeof margin !== 'undefined') {
            $$$1(element).css('margin-right', margin).removeData('margin-right');
          }
        }); // Restore body padding

        var padding = $$$1(document.body).data('padding-right');
        $$$1(document.body).removeData('padding-right');
        document.body.style.paddingRight = padding ? padding : '';
      };

      _proto._getScrollbarWidth = function _getScrollbarWidth() {
        // thx d.walsh
        var scrollDiv = document.createElement('div');
        scrollDiv.className = ClassName.SCROLLBAR_MEASURER;
        document.body.appendChild(scrollDiv);
        var scrollbarWidth = scrollDiv.getBoundingClientRect().width - scrollDiv.clientWidth;
        document.body.removeChild(scrollDiv);
        return scrollbarWidth;
      }; // Static


      Modal._jQueryInterface = function _jQueryInterface(config, relatedTarget) {
        return this.each(function () {
          var data = $$$1(this).data(DATA_KEY);

          var _config = _objectSpread({}, Default, $$$1(this).data(), typeof config === 'object' && config ? config : {});

          if (!data) {
            data = new Modal(this, _config);
            $$$1(this).data(DATA_KEY, data);
          }

          if (typeof config === 'string') {
            if (typeof data[config] === 'undefined') {
              throw new TypeError("No method named \"" + config + "\"");
            }

            data[config](relatedTarget);
          } else if (_config.show) {
            data.show(relatedTarget);
          }
        });
      };

      _createClass(Modal, null, [{
        key: "VERSION",
        get: function get() {
          return VERSION;
        }
      }, {
        key: "Default",
        get: function get() {
          return Default;
        }
      }]);

      return Modal;
    }();
    /**
     * ------------------------------------------------------------------------
     * Data Api implementation
     * ------------------------------------------------------------------------
     */


    $$$1(document).on(Event.CLICK_DATA_API, Selector.DATA_TOGGLE, function (event) {
      var _this10 = this;

      var target;
      var selector = Util.getSelectorFromElement(this);

      if (selector) {
        target = document.querySelector(selector);
      }

      var config = $$$1(target).data(DATA_KEY) ? 'toggle' : _objectSpread({}, $$$1(target).data(), $$$1(this).data());

      if (this.tagName === 'A' || this.tagName === 'AREA') {
        event.preventDefault();
      }

      var $target = $$$1(target).one(Event.SHOW, function (showEvent) {
        if (showEvent.isDefaultPrevented()) {
          // Only register focus restorer if modal will actually get shown
          return;
        }

        $target.one(Event.HIDDEN, function () {
          if ($$$1(_this10).is(':visible')) {
            _this10.focus();
          }
        });
      });

      Modal._jQueryInterface.call($$$1(target), config, this);
    });
    /**
     * ------------------------------------------------------------------------
     * jQuery
     * ------------------------------------------------------------------------
     */

    $$$1.fn[NAME] = Modal._jQueryInterface;
    $$$1.fn[NAME].Constructor = Modal;

    $$$1.fn[NAME].noConflict = function () {
      $$$1.fn[NAME] = JQUERY_NO_CONFLICT;
      return Modal._jQueryInterface;
    };

    return Modal;
  }($);

  /**
   * --------------------------------------------------------------------------
   * Bootstrap (v4.1.3): tooltip.js
   * Licensed under MIT (https://github.com/twbs/bootstrap/blob/master/LICENSE)
   * --------------------------------------------------------------------------
   */

  var Tooltip = function ($$$1) {
    /**
     * ------------------------------------------------------------------------
     * Constants
     * ------------------------------------------------------------------------
     */
    var NAME = 'tooltip';
    var VERSION = '4.1.3';
    var DATA_KEY = 'bs.tooltip';
    var EVENT_KEY = "." + DATA_KEY;
    var JQUERY_NO_CONFLICT = $$$1.fn[NAME];
    var CLASS_PREFIX = 'bs-tooltip';
    var BSCLS_PREFIX_REGEX = new RegExp("(^|\\s)" + CLASS_PREFIX + "\\S+", 'g');
    var DefaultType = {
      animation: 'boolean',
      template: 'string',
      title: '(string|element|function)',
      trigger: 'string',
      delay: '(number|object)',
      html: 'boolean',
      selector: '(string|boolean)',
      placement: '(string|function)',
      offset: '(number|string)',
      container: '(string|element|boolean)',
      fallbackPlacement: '(string|array)',
      boundary: '(string|element)'
    };
    var AttachmentMap = {
      AUTO: 'auto',
      TOP: 'top',
      RIGHT: 'right',
      BOTTOM: 'bottom',
      LEFT: 'left'
    };
    var Default = {
      animation: true,
      template: '<div class="tooltip" role="tooltip">' + '<div class="arrow"></div>' + '<div class="tooltip-inner"></div></div>',
      trigger: 'hover focus',
      title: '',
      delay: 0,
      html: false,
      selector: false,
      placement: 'top',
      offset: 0,
      container: false,
      fallbackPlacement: 'flip',
      boundary: 'scrollParent'
    };
    var HoverState = {
      SHOW: 'show',
      OUT: 'out'
    };
    var Event = {
      HIDE: "hide" + EVENT_KEY,
      HIDDEN: "hidden" + EVENT_KEY,
      SHOW: "show" + EVENT_KEY,
      SHOWN: "shown" + EVENT_KEY,
      INSERTED: "inserted" + EVENT_KEY,
      CLICK: "click" + EVENT_KEY,
      FOCUSIN: "focusin" + EVENT_KEY,
      FOCUSOUT: "focusout" + EVENT_KEY,
      MOUSEENTER: "mouseenter" + EVENT_KEY,
      MOUSELEAVE: "mouseleave" + EVENT_KEY
    };
    var ClassName = {
      FADE: 'fade',
      SHOW: 'show'
    };
    var Selector = {
      TOOLTIP: '.tooltip',
      TOOLTIP_INNER: '.tooltip-inner',
      ARROW: '.arrow'
    };
    var Trigger = {
      HOVER: 'hover',
      FOCUS: 'focus',
      CLICK: 'click',
      MANUAL: 'manual'
      /**
       * ------------------------------------------------------------------------
       * Class Definition
       * ------------------------------------------------------------------------
       */

    };

    var Tooltip =
    /*#__PURE__*/
    function () {
      function Tooltip(element, config) {
        /**
         * Check for Popper dependency
         * Popper - https://popper.js.org
         */
        if (typeof Popper === 'undefined') {
          throw new TypeError('Bootstrap tooltips require Popper.js (https://popper.js.org)');
        } // private


        this._isEnabled = true;
        this._timeout = 0;
        this._hoverState = '';
        this._activeTrigger = {};
        this._popper = null; // Protected

        this.element = element;
        this.config = this._getConfig(config);
        this.tip = null;

        this._setListeners();
      } // Getters


      var _proto = Tooltip.prototype;

      // Public
      _proto.enable = function enable() {
        this._isEnabled = true;
      };

      _proto.disable = function disable() {
        this._isEnabled = false;
      };

      _proto.toggleEnabled = function toggleEnabled() {
        this._isEnabled = !this._isEnabled;
      };

      _proto.toggle = function toggle(event) {
        if (!this._isEnabled) {
          return;
        }

        if (event) {
          var dataKey = this.constructor.DATA_KEY;
          var context = $$$1(event.currentTarget).data(dataKey);

          if (!context) {
            context = new this.constructor(event.currentTarget, this._getDelegateConfig());
            $$$1(event.currentTarget).data(dataKey, context);
          }

          context._activeTrigger.click = !context._activeTrigger.click;

          if (context._isWithActiveTrigger()) {
            context._enter(null, context);
          } else {
            context._leave(null, context);
          }
        } else {
          if ($$$1(this.getTipElement()).hasClass(ClassName.SHOW)) {
            this._leave(null, this);

            return;
          }

          this._enter(null, this);
        }
      };

      _proto.dispose = function dispose() {
        clearTimeout(this._timeout);
        $$$1.removeData(this.element, this.constructor.DATA_KEY);
        $$$1(this.element).off(this.constructor.EVENT_KEY);
        $$$1(this.element).closest('.modal').off('hide.bs.modal');

        if (this.tip) {
          $$$1(this.tip).remove();
        }

        this._isEnabled = null;
        this._timeout = null;
        this._hoverState = null;
        this._activeTrigger = null;

        if (this._popper !== null) {
          this._popper.destroy();
        }

        this._popper = null;
        this.element = null;
        this.config = null;
        this.tip = null;
      };

      _proto.show = function show() {
        var _this = this;

        if ($$$1(this.element).css('display') === 'none') {
          throw new Error('Please use show on visible elements');
        }

        var showEvent = $$$1.Event(this.constructor.Event.SHOW);

        if (this.isWithContent() && this._isEnabled) {
          $$$1(this.element).trigger(showEvent);
          var isInTheDom = $$$1.contains(this.element.ownerDocument.documentElement, this.element);

          if (showEvent.isDefaultPrevented() || !isInTheDom) {
            return;
          }

          var tip = this.getTipElement();
          var tipId = Util.getUID(this.constructor.NAME);
          tip.setAttribute('id', tipId);
          this.element.setAttribute('aria-describedby', tipId);
          this.setContent();

          if (this.config.animation) {
            $$$1(tip).addClass(ClassName.FADE);
          }

          var placement = typeof this.config.placement === 'function' ? this.config.placement.call(this, tip, this.element) : this.config.placement;

          var attachment = this._getAttachment(placement);

          this.addAttachmentClass(attachment);
          var container = this.config.container === false ? document.body : $$$1(document).find(this.config.container);
          $$$1(tip).data(this.constructor.DATA_KEY, this);

          if (!$$$1.contains(this.element.ownerDocument.documentElement, this.tip)) {
            $$$1(tip).appendTo(container);
          }

          $$$1(this.element).trigger(this.constructor.Event.INSERTED);
          this._popper = new Popper(this.element, tip, {
            placement: attachment,
            modifiers: {
              offset: {
                offset: this.config.offset
              },
              flip: {
                behavior: this.config.fallbackPlacement
              },
              arrow: {
                element: Selector.ARROW
              },
              preventOverflow: {
                boundariesElement: this.config.boundary
              }
            },
            onCreate: function onCreate(data) {
              if (data.originalPlacement !== data.placement) {
                _this._handlePopperPlacementChange(data);
              }
            },
            onUpdate: function onUpdate(data) {
              _this._handlePopperPlacementChange(data);
            }
          });
          $$$1(tip).addClass(ClassName.SHOW); // If this is a touch-enabled device we add extra
          // empty mouseover listeners to the body's immediate children;
          // only needed because of broken event delegation on iOS
          // https://www.quirksmode.org/blog/archives/2014/02/mouse_event_bub.html

          if ('ontouchstart' in document.documentElement) {
            $$$1(document.body).children().on('mouseover', null, $$$1.noop);
          }

          var complete = function complete() {
            if (_this.config.animation) {
              _this._fixTransition();
            }

            var prevHoverState = _this._hoverState;
            _this._hoverState = null;
            $$$1(_this.element).trigger(_this.constructor.Event.SHOWN);

            if (prevHoverState === HoverState.OUT) {
              _this._leave(null, _this);
            }
          };

          if ($$$1(this.tip).hasClass(ClassName.FADE)) {
            var transitionDuration = Util.getTransitionDurationFromElement(this.tip);
            $$$1(this.tip).one(Util.TRANSITION_END, complete).emulateTransitionEnd(transitionDuration);
          } else {
            complete();
          }
        }
      };

      _proto.hide = function hide(callback) {
        var _this2 = this;

        var tip = this.getTipElement();
        var hideEvent = $$$1.Event(this.constructor.Event.HIDE);

        var complete = function complete() {
          if (_this2._hoverState !== HoverState.SHOW && tip.parentNode) {
            tip.parentNode.removeChild(tip);
          }

          _this2._cleanTipClass();

          _this2.element.removeAttribute('aria-describedby');

          $$$1(_this2.element).trigger(_this2.constructor.Event.HIDDEN);

          if (_this2._popper !== null) {
            _this2._popper.destroy();
          }

          if (callback) {
            callback();
          }
        };

        $$$1(this.element).trigger(hideEvent);

        if (hideEvent.isDefaultPrevented()) {
          return;
        }

        $$$1(tip).removeClass(ClassName.SHOW); // If this is a touch-enabled device we remove the extra
        // empty mouseover listeners we added for iOS support

        if ('ontouchstart' in document.documentElement) {
          $$$1(document.body).children().off('mouseover', null, $$$1.noop);
        }

        this._activeTrigger[Trigger.CLICK] = false;
        this._activeTrigger[Trigger.FOCUS] = false;
        this._activeTrigger[Trigger.HOVER] = false;

        if ($$$1(this.tip).hasClass(ClassName.FADE)) {
          var transitionDuration = Util.getTransitionDurationFromElement(tip);
          $$$1(tip).one(Util.TRANSITION_END, complete).emulateTransitionEnd(transitionDuration);
        } else {
          complete();
        }

        this._hoverState = '';
      };

      _proto.update = function update() {
        if (this._popper !== null) {
          this._popper.scheduleUpdate();
        }
      }; // Protected


      _proto.isWithContent = function isWithContent() {
        return Boolean(this.getTitle());
      };

      _proto.addAttachmentClass = function addAttachmentClass(attachment) {
        $$$1(this.getTipElement()).addClass(CLASS_PREFIX + "-" + attachment);
      };

      _proto.getTipElement = function getTipElement() {
        this.tip = this.tip || $$$1(this.config.template)[0];
        return this.tip;
      };

      _proto.setContent = function setContent() {
        var tip = this.getTipElement();
        this.setElementContent($$$1(tip.querySelectorAll(Selector.TOOLTIP_INNER)), this.getTitle());
        $$$1(tip).removeClass(ClassName.FADE + " " + ClassName.SHOW);
      };

      _proto.setElementContent = function setElementContent($element, content) {
        var html = this.config.html;

        if (typeof content === 'object' && (content.nodeType || content.jquery)) {
          // Content is a DOM node or a jQuery
          if (html) {
            if (!$$$1(content).parent().is($element)) {
              $element.empty().append(content);
            }
          } else {
            $element.text($$$1(content).text());
          }
        } else {
          $element[html ? 'html' : 'text'](content);
        }
      };

      _proto.getTitle = function getTitle() {
        var title = this.element.getAttribute('data-original-title');

        if (!title) {
          title = typeof this.config.title === 'function' ? this.config.title.call(this.element) : this.config.title;
        }

        return title;
      }; // Private


      _proto._getAttachment = function _getAttachment(placement) {
        return AttachmentMap[placement.toUpperCase()];
      };

      _proto._setListeners = function _setListeners() {
        var _this3 = this;

        var triggers = this.config.trigger.split(' ');
        triggers.forEach(function (trigger) {
          if (trigger === 'click') {
            $$$1(_this3.element).on(_this3.constructor.Event.CLICK, _this3.config.selector, function (event) {
              return _this3.toggle(event);
            });
          } else if (trigger !== Trigger.MANUAL) {
            var eventIn = trigger === Trigger.HOVER ? _this3.constructor.Event.MOUSEENTER : _this3.constructor.Event.FOCUSIN;
            var eventOut = trigger === Trigger.HOVER ? _this3.constructor.Event.MOUSELEAVE : _this3.constructor.Event.FOCUSOUT;
            $$$1(_this3.element).on(eventIn, _this3.config.selector, function (event) {
              return _this3._enter(event);
            }).on(eventOut, _this3.config.selector, function (event) {
              return _this3._leave(event);
            });
          }

          $$$1(_this3.element).closest('.modal').on('hide.bs.modal', function () {
            return _this3.hide();
          });
        });

        if (this.config.selector) {
          this.config = _objectSpread({}, this.config, {
            trigger: 'manual',
            selector: ''
          });
        } else {
          this._fixTitle();
        }
      };

      _proto._fixTitle = function _fixTitle() {
        var titleType = typeof this.element.getAttribute('data-original-title');

        if (this.element.getAttribute('title') || titleType !== 'string') {
          this.element.setAttribute('data-original-title', this.element.getAttribute('title') || '');
          this.element.setAttribute('title', '');
        }
      };

      _proto._enter = function _enter(event, context) {
        var dataKey = this.constructor.DATA_KEY;
        context = context || $$$1(event.currentTarget).data(dataKey);

        if (!context) {
          context = new this.constructor(event.currentTarget, this._getDelegateConfig());
          $$$1(event.currentTarget).data(dataKey, context);
        }

        if (event) {
          context._activeTrigger[event.type === 'focusin' ? Trigger.FOCUS : Trigger.HOVER] = true;
        }

        if ($$$1(context.getTipElement()).hasClass(ClassName.SHOW) || context._hoverState === HoverState.SHOW) {
          context._hoverState = HoverState.SHOW;
          return;
        }

        clearTimeout(context._timeout);
        context._hoverState = HoverState.SHOW;

        if (!context.config.delay || !context.config.delay.show) {
          context.show();
          return;
        }

        context._timeout = setTimeout(function () {
          if (context._hoverState === HoverState.SHOW) {
            context.show();
          }
        }, context.config.delay.show);
      };

      _proto._leave = function _leave(event, context) {
        var dataKey = this.constructor.DATA_KEY;
        context = context || $$$1(event.currentTarget).data(dataKey);

        if (!context) {
          context = new this.constructor(event.currentTarget, this._getDelegateConfig());
          $$$1(event.currentTarget).data(dataKey, context);
        }

        if (event) {
          context._activeTrigger[event.type === 'focusout' ? Trigger.FOCUS : Trigger.HOVER] = false;
        }

        if (context._isWithActiveTrigger()) {
          return;
        }

        clearTimeout(context._timeout);
        context._hoverState = HoverState.OUT;

        if (!context.config.delay || !context.config.delay.hide) {
          context.hide();
          return;
        }

        context._timeout = setTimeout(function () {
          if (context._hoverState === HoverState.OUT) {
            context.hide();
          }
        }, context.config.delay.hide);
      };

      _proto._isWithActiveTrigger = function _isWithActiveTrigger() {
        for (var trigger in this._activeTrigger) {
          if (this._activeTrigger[trigger]) {
            return true;
          }
        }

        return false;
      };

      _proto._getConfig = function _getConfig(config) {
        config = _objectSpread({}, this.constructor.Default, $$$1(this.element).data(), typeof config === 'object' && config ? config : {});

        if (typeof config.delay === 'number') {
          config.delay = {
            show: config.delay,
            hide: config.delay
          };
        }

        if (typeof config.title === 'number') {
          config.title = config.title.toString();
        }

        if (typeof config.content === 'number') {
          config.content = config.content.toString();
        }

        Util.typeCheckConfig(NAME, config, this.constructor.DefaultType);
        return config;
      };

      _proto._getDelegateConfig = function _getDelegateConfig() {
        var config = {};

        if (this.config) {
          for (var key in this.config) {
            if (this.constructor.Default[key] !== this.config[key]) {
              config[key] = this.config[key];
            }
          }
        }

        return config;
      };

      _proto._cleanTipClass = function _cleanTipClass() {
        var $tip = $$$1(this.getTipElement());
        var tabClass = $tip.attr('class').match(BSCLS_PREFIX_REGEX);

        if (tabClass !== null && tabClass.length) {
          $tip.removeClass(tabClass.join(''));
        }
      };

      _proto._handlePopperPlacementChange = function _handlePopperPlacementChange(popperData) {
        var popperInstance = popperData.instance;
        this.tip = popperInstance.popper;

        this._cleanTipClass();

        this.addAttachmentClass(this._getAttachment(popperData.placement));
      };

      _proto._fixTransition = function _fixTransition() {
        var tip = this.getTipElement();
        var initConfigAnimation = this.config.animation;

        if (tip.getAttribute('x-placement') !== null) {
          return;
        }

        $$$1(tip).removeClass(ClassName.FADE);
        this.config.animation = false;
        this.hide();
        this.show();
        this.config.animation = initConfigAnimation;
      }; // Static


      Tooltip._jQueryInterface = function _jQueryInterface(config) {
        return this.each(function () {
          var data = $$$1(this).data(DATA_KEY);

          var _config = typeof config === 'object' && config;

          if (!data && /dispose|hide/.test(config)) {
            return;
          }

          if (!data) {
            data = new Tooltip(this, _config);
            $$$1(this).data(DATA_KEY, data);
          }

          if (typeof config === 'string') {
            if (typeof data[config] === 'undefined') {
              throw new TypeError("No method named \"" + config + "\"");
            }

            data[config]();
          }
        });
      };

      _createClass(Tooltip, null, [{
        key: "VERSION",
        get: function get() {
          return VERSION;
        }
      }, {
        key: "Default",
        get: function get() {
          return Default;
        }
      }, {
        key: "NAME",
        get: function get() {
          return NAME;
        }
      }, {
        key: "DATA_KEY",
        get: function get() {
          return DATA_KEY;
        }
      }, {
        key: "Event",
        get: function get() {
          return Event;
        }
      }, {
        key: "EVENT_KEY",
        get: function get() {
          return EVENT_KEY;
        }
      }, {
        key: "DefaultType",
        get: function get() {
          return DefaultType;
        }
      }]);

      return Tooltip;
    }();
    /**
     * ------------------------------------------------------------------------
     * jQuery
     * ------------------------------------------------------------------------
     */


    $$$1.fn[NAME] = Tooltip._jQueryInterface;
    $$$1.fn[NAME].Constructor = Tooltip;

    $$$1.fn[NAME].noConflict = function () {
      $$$1.fn[NAME] = JQUERY_NO_CONFLICT;
      return Tooltip._jQueryInterface;
    };

    return Tooltip;
  }($, Popper);

  /**
   * --------------------------------------------------------------------------
   * Bootstrap (v4.1.3): popover.js
   * Licensed under MIT (https://github.com/twbs/bootstrap/blob/master/LICENSE)
   * --------------------------------------------------------------------------
   */

  var Popover = function ($$$1) {
    /**
     * ------------------------------------------------------------------------
     * Constants
     * ------------------------------------------------------------------------
     */
    var NAME = 'popover';
    var VERSION = '4.1.3';
    var DATA_KEY = 'bs.popover';
    var EVENT_KEY = "." + DATA_KEY;
    var JQUERY_NO_CONFLICT = $$$1.fn[NAME];
    var CLASS_PREFIX = 'bs-popover';
    var BSCLS_PREFIX_REGEX = new RegExp("(^|\\s)" + CLASS_PREFIX + "\\S+", 'g');

    var Default = _objectSpread({}, Tooltip.Default, {
      placement: 'right',
      trigger: 'click',
      content: '',
      template: '<div class="popover" role="tooltip">' + '<div class="arrow"></div>' + '<h3 class="popover-header"></h3>' + '<div class="popover-body"></div></div>'
    });

    var DefaultType = _objectSpread({}, Tooltip.DefaultType, {
      content: '(string|element|function)'
    });

    var ClassName = {
      FADE: 'fade',
      SHOW: 'show'
    };
    var Selector = {
      TITLE: '.popover-header',
      CONTENT: '.popover-body'
    };
    var Event = {
      HIDE: "hide" + EVENT_KEY,
      HIDDEN: "hidden" + EVENT_KEY,
      SHOW: "show" + EVENT_KEY,
      SHOWN: "shown" + EVENT_KEY,
      INSERTED: "inserted" + EVENT_KEY,
      CLICK: "click" + EVENT_KEY,
      FOCUSIN: "focusin" + EVENT_KEY,
      FOCUSOUT: "focusout" + EVENT_KEY,
      MOUSEENTER: "mouseenter" + EVENT_KEY,
      MOUSELEAVE: "mouseleave" + EVENT_KEY
      /**
       * ------------------------------------------------------------------------
       * Class Definition
       * ------------------------------------------------------------------------
       */

    };

    var Popover =
    /*#__PURE__*/
    function (_Tooltip) {
      _inheritsLoose(Popover, _Tooltip);

      function Popover() {
        return _Tooltip.apply(this, arguments) || this;
      }

      var _proto = Popover.prototype;

      // Overrides
      _proto.isWithContent = function isWithContent() {
        return this.getTitle() || this._getContent();
      };

      _proto.addAttachmentClass = function addAttachmentClass(attachment) {
        $$$1(this.getTipElement()).addClass(CLASS_PREFIX + "-" + attachment);
      };

      _proto.getTipElement = function getTipElement() {
        this.tip = this.tip || $$$1(this.config.template)[0];
        return this.tip;
      };

      _proto.setContent = function setContent() {
        var $tip = $$$1(this.getTipElement()); // We use append for html objects to maintain js events

        this.setElementContent($tip.find(Selector.TITLE), this.getTitle());

        var content = this._getContent();

        if (typeof content === 'function') {
          content = content.call(this.element);
        }

        this.setElementContent($tip.find(Selector.CONTENT), content);
        $tip.removeClass(ClassName.FADE + " " + ClassName.SHOW);
      }; // Private


      _proto._getContent = function _getContent() {
        return this.element.getAttribute('data-content') || this.config.content;
      };

      _proto._cleanTipClass = function _cleanTipClass() {
        var $tip = $$$1(this.getTipElement());
        var tabClass = $tip.attr('class').match(BSCLS_PREFIX_REGEX);

        if (tabClass !== null && tabClass.length > 0) {
          $tip.removeClass(tabClass.join(''));
        }
      }; // Static


      Popover._jQueryInterface = function _jQueryInterface(config) {
        return this.each(function () {
          var data = $$$1(this).data(DATA_KEY);

          var _config = typeof config === 'object' ? config : null;

          if (!data && /destroy|hide/.test(config)) {
            return;
          }

          if (!data) {
            data = new Popover(this, _config);
            $$$1(this).data(DATA_KEY, data);
          }

          if (typeof config === 'string') {
            if (typeof data[config] === 'undefined') {
              throw new TypeError("No method named \"" + config + "\"");
            }

            data[config]();
          }
        });
      };

      _createClass(Popover, null, [{
        key: "VERSION",
        // Getters
        get: function get() {
          return VERSION;
        }
      }, {
        key: "Default",
        get: function get() {
          return Default;
        }
      }, {
        key: "NAME",
        get: function get() {
          return NAME;
        }
      }, {
        key: "DATA_KEY",
        get: function get() {
          return DATA_KEY;
        }
      }, {
        key: "Event",
        get: function get() {
          return Event;
        }
      }, {
        key: "EVENT_KEY",
        get: function get() {
          return EVENT_KEY;
        }
      }, {
        key: "DefaultType",
        get: function get() {
          return DefaultType;
        }
      }]);

      return Popover;
    }(Tooltip);
    /**
     * ------------------------------------------------------------------------
     * jQuery
     * ------------------------------------------------------------------------
     */


    $$$1.fn[NAME] = Popover._jQueryInterface;
    $$$1.fn[NAME].Constructor = Popover;

    $$$1.fn[NAME].noConflict = function () {
      $$$1.fn[NAME] = JQUERY_NO_CONFLICT;
      return Popover._jQueryInterface;
    };

    return Popover;
  }($);

  /**
   * --------------------------------------------------------------------------
   * Bootstrap (v4.1.3): scrollspy.js
   * Licensed under MIT (https://github.com/twbs/bootstrap/blob/master/LICENSE)
   * --------------------------------------------------------------------------
   */

  var ScrollSpy = function ($$$1) {
    /**
     * ------------------------------------------------------------------------
     * Constants
     * ------------------------------------------------------------------------
     */
    var NAME = 'scrollspy';
    var VERSION = '4.1.3';
    var DATA_KEY = 'bs.scrollspy';
    var EVENT_KEY = "." + DATA_KEY;
    var DATA_API_KEY = '.data-api';
    var JQUERY_NO_CONFLICT = $$$1.fn[NAME];
    var Default = {
      offset: 10,
      method: 'auto',
      target: ''
    };
    var DefaultType = {
      offset: 'number',
      method: 'string',
      target: '(string|element)'
    };
    var Event = {
      ACTIVATE: "activate" + EVENT_KEY,
      SCROLL: "scroll" + EVENT_KEY,
      LOAD_DATA_API: "load" + EVENT_KEY + DATA_API_KEY
    };
    var ClassName = {
      DROPDOWN_ITEM: 'dropdown-item',
      DROPDOWN_MENU: 'dropdown-menu',
      ACTIVE: 'active'
    };
    var Selector = {
      DATA_SPY: '[data-spy="scroll"]',
      ACTIVE: '.active',
      NAV_LIST_GROUP: '.nav, .list-group',
      NAV_LINKS: '.nav-link',
      NAV_ITEMS: '.nav-item',
      LIST_ITEMS: '.list-group-item',
      DROPDOWN: '.dropdown',
      DROPDOWN_ITEMS: '.dropdown-item',
      DROPDOWN_TOGGLE: '.dropdown-toggle'
    };
    var OffsetMethod = {
      OFFSET: 'offset',
      POSITION: 'position'
      /**
       * ------------------------------------------------------------------------
       * Class Definition
       * ------------------------------------------------------------------------
       */

    };

    var ScrollSpy =
    /*#__PURE__*/
    function () {
      function ScrollSpy(element, config) {
        var _this = this;

        this._element = element;
        this._scrollElement = element.tagName === 'BODY' ? window : element;
        this._config = this._getConfig(config);
        this._selector = this._config.target + " " + Selector.NAV_LINKS + "," + (this._config.target + " " + Selector.LIST_ITEMS + ",") + (this._config.target + " " + Selector.DROPDOWN_ITEMS);
        this._offsets = [];
        this._targets = [];
        this._activeTarget = null;
        this._scrollHeight = 0;
        $$$1(this._scrollElement).on(Event.SCROLL, function (event) {
          return _this._process(event);
        });
        this.refresh();

        this._process();
      } // Getters


      var _proto = ScrollSpy.prototype;

      // Public
      _proto.refresh = function refresh() {
        var _this2 = this;

        var autoMethod = this._scrollElement === this._scrollElement.window ? OffsetMethod.OFFSET : OffsetMethod.POSITION;
        var offsetMethod = this._config.method === 'auto' ? autoMethod : this._config.method;
        var offsetBase = offsetMethod === OffsetMethod.POSITION ? this._getScrollTop() : 0;
        this._offsets = [];
        this._targets = [];
        this._scrollHeight = this._getScrollHeight();
        var targets = [].slice.call(document.querySelectorAll(this._selector));
        targets.map(function (element) {
          var target;
          var targetSelector = Util.getSelectorFromElement(element);

          if (targetSelector) {
            target = document.querySelector(targetSelector);
          }

          if (target) {
            var targetBCR = target.getBoundingClientRect();

            if (targetBCR.width || targetBCR.height) {
              // TODO (fat): remove sketch reliance on jQuery position/offset
              return [$$$1(target)[offsetMethod]().top + offsetBase, targetSelector];
            }
          }

          return null;
        }).filter(function (item) {
          return item;
        }).sort(function (a, b) {
          return a[0] - b[0];
        }).forEach(function (item) {
          _this2._offsets.push(item[0]);

          _this2._targets.push(item[1]);
        });
      };

      _proto.dispose = function dispose() {
        $$$1.removeData(this._element, DATA_KEY);
        $$$1(this._scrollElement).off(EVENT_KEY);
        this._element = null;
        this._scrollElement = null;
        this._config = null;
        this._selector = null;
        this._offsets = null;
        this._targets = null;
        this._activeTarget = null;
        this._scrollHeight = null;
      }; // Private


      _proto._getConfig = function _getConfig(config) {
        config = _objectSpread({}, Default, typeof config === 'object' && config ? config : {});

        if (typeof config.target !== 'string') {
          var id = $$$1(config.target).attr('id');

          if (!id) {
            id = Util.getUID(NAME);
            $$$1(config.target).attr('id', id);
          }

          config.target = "#" + id;
        }

        Util.typeCheckConfig(NAME, config, DefaultType);
        return config;
      };

      _proto._getScrollTop = function _getScrollTop() {
        return this._scrollElement === window ? this._scrollElement.pageYOffset : this._scrollElement.scrollTop;
      };

      _proto._getScrollHeight = function _getScrollHeight() {
        return this._scrollElement.scrollHeight || Math.max(document.body.scrollHeight, document.documentElement.scrollHeight);
      };

      _proto._getOffsetHeight = function _getOffsetHeight() {
        return this._scrollElement === window ? window.innerHeight : this._scrollElement.getBoundingClientRect().height;
      };

      _proto._process = function _process() {
        var scrollTop = this._getScrollTop() + this._config.offset;

        var scrollHeight = this._getScrollHeight();

        var maxScroll = this._config.offset + scrollHeight - this._getOffsetHeight();

        if (this._scrollHeight !== scrollHeight) {
          this.refresh();
        }

        if (scrollTop >= maxScroll) {
          var target = this._targets[this._targets.length - 1];

          if (this._activeTarget !== target) {
            this._activate(target);
          }

          return;
        }

        if (this._activeTarget && scrollTop < this._offsets[0] && this._offsets[0] > 0) {
          this._activeTarget = null;

          this._clear();

          return;
        }

        var offsetLength = this._offsets.length;

        for (var i = offsetLength; i--;) {
          var isActiveTarget = this._activeTarget !== this._targets[i] && scrollTop >= this._offsets[i] && (typeof this._offsets[i + 1] === 'undefined' || scrollTop < this._offsets[i + 1]);

          if (isActiveTarget) {
            this._activate(this._targets[i]);
          }
        }
      };

      _proto._activate = function _activate(target) {
        this._activeTarget = target;

        this._clear();

        var queries = this._selector.split(','); // eslint-disable-next-line arrow-body-style


        queries = queries.map(function (selector) {
          return selector + "[data-target=\"" + target + "\"]," + (selector + "[href=\"" + target + "\"]");
        });
        var $link = $$$1([].slice.call(document.querySelectorAll(queries.join(','))));

        if ($link.hasClass(ClassName.DROPDOWN_ITEM)) {
          $link.closest(Selector.DROPDOWN).find(Selector.DROPDOWN_TOGGLE).addClass(ClassName.ACTIVE);
          $link.addClass(ClassName.ACTIVE);
        } else {
          // Set triggered link as active
          $link.addClass(ClassName.ACTIVE); // Set triggered links parents as active
          // With both <ul> and <nav> markup a parent is the previous sibling of any nav ancestor

          $link.parents(Selector.NAV_LIST_GROUP).prev(Selector.NAV_LINKS + ", " + Selector.LIST_ITEMS).addClass(ClassName.ACTIVE); // Handle special case when .nav-link is inside .nav-item

          $link.parents(Selector.NAV_LIST_GROUP).prev(Selector.NAV_ITEMS).children(Selector.NAV_LINKS).addClass(ClassName.ACTIVE);
        }

        $$$1(this._scrollElement).trigger(Event.ACTIVATE, {
          relatedTarget: target
        });
      };

      _proto._clear = function _clear() {
        var nodes = [].slice.call(document.querySelectorAll(this._selector));
        $$$1(nodes).filter(Selector.ACTIVE).removeClass(ClassName.ACTIVE);
      }; // Static


      ScrollSpy._jQueryInterface = function _jQueryInterface(config) {
        return this.each(function () {
          var data = $$$1(this).data(DATA_KEY);

          var _config = typeof config === 'object' && config;

          if (!data) {
            data = new ScrollSpy(this, _config);
            $$$1(this).data(DATA_KEY, data);
          }

          if (typeof config === 'string') {
            if (typeof data[config] === 'undefined') {
              throw new TypeError("No method named \"" + config + "\"");
            }

            data[config]();
          }
        });
      };

      _createClass(ScrollSpy, null, [{
        key: "VERSION",
        get: function get() {
          return VERSION;
        }
      }, {
        key: "Default",
        get: function get() {
          return Default;
        }
      }]);

      return ScrollSpy;
    }();
    /**
     * ------------------------------------------------------------------------
     * Data Api implementation
     * ------------------------------------------------------------------------
     */


    $$$1(window).on(Event.LOAD_DATA_API, function () {
      var scrollSpys = [].slice.call(document.querySelectorAll(Selector.DATA_SPY));
      var scrollSpysLength = scrollSpys.length;

      for (var i = scrollSpysLength; i--;) {
        var $spy = $$$1(scrollSpys[i]);

        ScrollSpy._jQueryInterface.call($spy, $spy.data());
      }
    });
    /**
     * ------------------------------------------------------------------------
     * jQuery
     * ------------------------------------------------------------------------
     */

    $$$1.fn[NAME] = ScrollSpy._jQueryInterface;
    $$$1.fn[NAME].Constructor = ScrollSpy;

    $$$1.fn[NAME].noConflict = function () {
      $$$1.fn[NAME] = JQUERY_NO_CONFLICT;
      return ScrollSpy._jQueryInterface;
    };

    return ScrollSpy;
  }($);

  /**
   * --------------------------------------------------------------------------
   * Bootstrap (v4.1.3): tab.js
   * Licensed under MIT (https://github.com/twbs/bootstrap/blob/master/LICENSE)
   * --------------------------------------------------------------------------
   */

  var Tab = function ($$$1) {
    /**
     * ------------------------------------------------------------------------
     * Constants
     * ------------------------------------------------------------------------
     */
    var NAME = 'tab';
    var VERSION = '4.1.3';
    var DATA_KEY = 'bs.tab';
    var EVENT_KEY = "." + DATA_KEY;
    var DATA_API_KEY = '.data-api';
    var JQUERY_NO_CONFLICT = $$$1.fn[NAME];
    var Event = {
      HIDE: "hide" + EVENT_KEY,
      HIDDEN: "hidden" + EVENT_KEY,
      SHOW: "show" + EVENT_KEY,
      SHOWN: "shown" + EVENT_KEY,
      CLICK_DATA_API: "click" + EVENT_KEY + DATA_API_KEY
    };
    var ClassName = {
      DROPDOWN_MENU: 'dropdown-menu',
      ACTIVE: 'active',
      DISABLED: 'disabled',
      FADE: 'fade',
      SHOW: 'show'
    };
    var Selector = {
      DROPDOWN: '.dropdown',
      NAV_LIST_GROUP: '.nav, .list-group',
      ACTIVE: '.active',
      ACTIVE_UL: '> li > .active',
      DATA_TOGGLE: '[data-toggle="tab"], [data-toggle="pill"], [data-toggle="list"]',
      DROPDOWN_TOGGLE: '.dropdown-toggle',
      DROPDOWN_ACTIVE_CHILD: '> .dropdown-menu .active'
      /**
       * ------------------------------------------------------------------------
       * Class Definition
       * ------------------------------------------------------------------------
       */

    };

    var Tab =
    /*#__PURE__*/
    function () {
      function Tab(element) {
        this._element = element;
      } // Getters


      var _proto = Tab.prototype;

      // Public
      _proto.show = function show() {
        var _this = this;

        if (this._element.parentNode && this._element.parentNode.nodeType === Node.ELEMENT_NODE && $$$1(this._element).hasClass(ClassName.ACTIVE) || $$$1(this._element).hasClass(ClassName.DISABLED)) {
          return;
        }

        var target;
        var previous;
        var listElement = $$$1(this._element).closest(Selector.NAV_LIST_GROUP)[0];
        var selector = Util.getSelectorFromElement(this._element);

        if (listElement) {
          var itemSelector = listElement.nodeName === 'UL' ? Selector.ACTIVE_UL : Selector.ACTIVE;
          previous = $$$1.makeArray($$$1(listElement).find(itemSelector));
          previous = previous[previous.length - 1];
        }

        var hideEvent = $$$1.Event(Event.HIDE, {
          relatedTarget: this._element
        });
        var showEvent = $$$1.Event(Event.SHOW, {
          relatedTarget: previous
        });

        if (previous) {
          $$$1(previous).trigger(hideEvent);
        }

        $$$1(this._element).trigger(showEvent);

        if (showEvent.isDefaultPrevented() || hideEvent.isDefaultPrevented()) {
          return;
        }

        if (selector) {
          target = document.querySelector(selector);
        }

        this._activate(this._element, listElement);

        var complete = function complete() {
          var hiddenEvent = $$$1.Event(Event.HIDDEN, {
            relatedTarget: _this._element
          });
          var shownEvent = $$$1.Event(Event.SHOWN, {
            relatedTarget: previous
          });
          $$$1(previous).trigger(hiddenEvent);
          $$$1(_this._element).trigger(shownEvent);
        };

        if (target) {
          this._activate(target, target.parentNode, complete);
        } else {
          complete();
        }
      };

      _proto.dispose = function dispose() {
        $$$1.removeData(this._element, DATA_KEY);
        this._element = null;
      }; // Private


      _proto._activate = function _activate(element, container, callback) {
        var _this2 = this;

        var activeElements;

        if (container.nodeName === 'UL') {
          activeElements = $$$1(container).find(Selector.ACTIVE_UL);
        } else {
          activeElements = $$$1(container).children(Selector.ACTIVE);
        }

        var active = activeElements[0];
        var isTransitioning = callback && active && $$$1(active).hasClass(ClassName.FADE);

        var complete = function complete() {
          return _this2._transitionComplete(element, active, callback);
        };

        if (active && isTransitioning) {
          var transitionDuration = Util.getTransitionDurationFromElement(active);
          $$$1(active).one(Util.TRANSITION_END, complete).emulateTransitionEnd(transitionDuration);
        } else {
          complete();
        }
      };

      _proto._transitionComplete = function _transitionComplete(element, active, callback) {
        if (active) {
          $$$1(active).removeClass(ClassName.SHOW + " " + ClassName.ACTIVE);
          var dropdownChild = $$$1(active.parentNode).find(Selector.DROPDOWN_ACTIVE_CHILD)[0];

          if (dropdownChild) {
            $$$1(dropdownChild).removeClass(ClassName.ACTIVE);
          }

          if (active.getAttribute('role') === 'tab') {
            active.setAttribute('aria-selected', false);
          }
        }

        $$$1(element).addClass(ClassName.ACTIVE);

        if (element.getAttribute('role') === 'tab') {
          element.setAttribute('aria-selected', true);
        }

        Util.reflow(element);
        $$$1(element).addClass(ClassName.SHOW);

        if (element.parentNode && $$$1(element.parentNode).hasClass(ClassName.DROPDOWN_MENU)) {
          var dropdownElement = $$$1(element).closest(Selector.DROPDOWN)[0];

          if (dropdownElement) {
            var dropdownToggleList = [].slice.call(dropdownElement.querySelectorAll(Selector.DROPDOWN_TOGGLE));
            $$$1(dropdownToggleList).addClass(ClassName.ACTIVE);
          }

          element.setAttribute('aria-expanded', true);
        }

        if (callback) {
          callback();
        }
      }; // Static


      Tab._jQueryInterface = function _jQueryInterface(config) {
        return this.each(function () {
          var $this = $$$1(this);
          var data = $this.data(DATA_KEY);

          if (!data) {
            data = new Tab(this);
            $this.data(DATA_KEY, data);
          }

          if (typeof config === 'string') {
            if (typeof data[config] === 'undefined') {
              throw new TypeError("No method named \"" + config + "\"");
            }

            data[config]();
          }
        });
      };

      _createClass(Tab, null, [{
        key: "VERSION",
        get: function get() {
          return VERSION;
        }
      }]);

      return Tab;
    }();
    /**
     * ------------------------------------------------------------------------
     * Data Api implementation
     * ------------------------------------------------------------------------
     */


    $$$1(document).on(Event.CLICK_DATA_API, Selector.DATA_TOGGLE, function (event) {
      event.preventDefault();

      Tab._jQueryInterface.call($$$1(this), 'show');
    });
    /**
     * ------------------------------------------------------------------------
     * jQuery
     * ------------------------------------------------------------------------
     */

    $$$1.fn[NAME] = Tab._jQueryInterface;
    $$$1.fn[NAME].Constructor = Tab;

    $$$1.fn[NAME].noConflict = function () {
      $$$1.fn[NAME] = JQUERY_NO_CONFLICT;
      return Tab._jQueryInterface;
    };

    return Tab;
  }($);

  /**
   * --------------------------------------------------------------------------
   * Bootstrap (v4.1.3): index.js
   * Licensed under MIT (https://github.com/twbs/bootstrap/blob/master/LICENSE)
   * --------------------------------------------------------------------------
   */

  (function ($$$1) {
    if (typeof $$$1 === 'undefined') {
      throw new TypeError('Bootstrap\'s JavaScript requires jQuery. jQuery must be included before Bootstrap\'s JavaScript.');
    }

    var version = $$$1.fn.jquery.split(' ')[0].split('.');
    var minMajor = 1;
    var ltMajor = 2;
    var minMinor = 9;
    var minPatch = 1;
    var maxMajor = 4;

    if (version[0] < ltMajor && version[1] < minMinor || version[0] === minMajor && version[1] === minMinor && version[2] < minPatch || version[0] >= maxMajor) {
      throw new Error('Bootstrap\'s JavaScript requires at least jQuery v1.9.1 but less than v4.0.0');
    }
  })($);

  exports.Util = Util;
  exports.Alert = Alert;
  exports.Button = Button;
  exports.Carousel = Carousel;
  exports.Collapse = Collapse;
  exports.Dropdown = Dropdown;
  exports.Modal = Modal;
  exports.Popover = Popover;
  exports.Scrollspy = ScrollSpy;
  exports.Tab = Tab;
  exports.Tooltip = Tooltip;

  Object.defineProperty(exports, '__esModule', { value: true });

})));
//# sourceMappingURL=bootstrap.js.map

var af_token = $("input[name=__RequestVerificationToken]").val();
var isAuth, isAdmin, username;
var isMobile = /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent);
var isRedirect = false;

    
function toggler(divId) {
    $("#" + divId).toggle();
}


$(".open-modal").click(function (e) {
    $("#menu").modal({
        fadeDuration: 250
    });
});

$(".menu-box").each(function (index) {
    var menuBox = $(this);
    if (menuBox.attr('data-message').length > 10)
        menuBox.toggleClass('small-title');
});

let notificationHub = 'http://havhav.az/notification';
const notConnection = new signalR.HubConnectionBuilder()
    .withUrl(notificationHub)
    .configureLogging(signalR.LogLevel.Information)
    .build();

notConnection.start();

notConnection.on("Push", function (nvm) {
    
    if (nvm === null) {
        var warning_modal = $("#warning");
        warning_modal.find("h2").text("");

        warning_modal.modal({
            fadeDuration: 250
        });
    }

    const icons =
    {
        "comment": "far fa-comment",
        "message": "fas fa-envelope",
        "receipt": "fas fa-hand-holding-usd"
    };

    var count_box = document.getElementById((nvm.notificationType == "message" ? nvm.notificationType : "notification") + "-count");

    var count = parseInt(count_box.innerText) || 0;
    count++;
    count_box.innerText = count;

    var href = document.createElement("a");
    href.classList += "button orange clickable not-button";
    href.href = nvm.url;

    var li = document.createElement("li");
    var not_text = "<i class='" + icons[nvm.notificationType] + "'></i> <strong>" + nvm.username + "</strong> " + nvm.description;

    not_text += !isNullOrEmpty(nvm.subjectName) ? (":  <span class='text-preview' style='max-width:200px; color:white; position:relative; top:6px;'>" + nvm.subjectName) + "</span>" : "";

    href.innerHTML = not_text;
    li.appendChild(href);

    var not_list = document.getElementsByClassName("not-list")[0];
    not_list.appendChild(li);

    setTimeout(function () {
        $(li).fadeOut();
    }, 5000);
});


$("body").on("click", ".gallery-img", function (event) {
    $("#gallery-" + parseID($(this).attr('id'))).click();
});

$("body").on("change", "input[name$='FormImages.Gallery']", function () {
    if ($(this).val() !== "") {
        if (fileValidation(this, true)) {
            var id = parseID($(this).attr('id'));
            var new_id = id + 1;

            var div = $("#gallery-img-" + id);
            var img = div.find("img");
            var img_box;

            if (img.length < 1) {

                img_box = $('<div class="col-md-3 img-box-2 gallery-img clickable" id="gallery-img-' + id + '">' +
                    '<span class="img-remove-btn">&times;</span>' +
                    '<img alt="Azərbaycanda heyvansevərlər üçün ilk və tək sosial şəbəkə" class="cb-img-thumb">' +
                    '</div>');

                img_box.insertBefore(div);
                div.attr('id', 'gallery-img-' + new_id);

                $(".gallery-inputs").append('<input type="file" id="gallery-' + new_id + '" name="FormImages.Gallery" style="display:none">');

            } else {
                img_box = div;
            }
            readURL(this, img_box.find('img'));
        }

    }
});

$("body").on("click", ".img-remove-btn", function (e) {
    e.stopPropagation();
    e.preventDefault();

    var img_box = $(this).closest(".img-box-2");
    var filename = img_box.attr("id");

    img_box.remove();

    if (!filename.includes("gallery-img"))
        $(".deleted-imgs").append("<input type='hidden' name='FormImages.DeletedImages' value='" + filename + "'>");
    else {
        $("#gallery-" + parseID(filename)).remove();
    }

});

function changeStatus(e, state) {

    var target = $(e.currentTarget);
    var model_name = target.data("model-name");
    var model_id = target.data("model-id");
    var action = isNullOrEmpty(state) ? target.data("action") : state;

    var isAdmin = target.data("admin");
    var url = (isAdmin === "True" && action === "Deleted") ? "Delete" : "ChangeState";
    
    Confirmation(function () {

        var data = {
            id: model_id,
            state: action
        };

        AjaxCall(`/${model_name}/${url}`, af_token, data, true, action.toLowerCase(), function (result) {
            if (!isNullOrEmpty(result.redirect) && isRedirect) {
                window.location.replace(result.redirect);
            } else {
                target.closest(".box").remove();
            }
        });

    });
}

$("#approve-all").click(function (e) {
    var target = $(e.currentTarget);
    actionAll(target.data("model-name"), "ApproveAll");
});

$("#delete-all").click(function (e) {
    var target = $(e.currentTarget);
    actionAll(target.data("model-name"), "DeleteAll");
});

function actionAll(modelName, action) {

    var id_list = [];

    $(".box").each(function () {
        id_list.push(parseID($(this).attr("id")));
    });

    Confirmation(function () {
        AjaxCall(`/${modelName}/${action}`, af_token, { id_list: id_list }, false, "", function (result) {
            location.reload();
        })
    });
}

$(".search-icon").on("click", (e) => {

    var clicked_element = $(e.currentTarget);
    clicked_element.toggleClass("active");

    var isUserSearch = clicked_element.hasClass("fa-user");

    var id = isUserSearch ? "newspaper" : "user";
    var action = isUserSearch ? "/Post" : "/Account";

    $("#" + id + "-search").toggleClass("active");

    $("#search-form").attr("action", action);
});

function AjaxCall(url, af_token, data, is_swal, success_text, success_callback)
{
    $.ajax({
        url: url,
        type: 'POST',
        headers: {
            //"Accept": "application/json",
            'RequestVerificationToken': af_token
        },
        data: data,
        success: function (data) {
            
            if (is_swal) {
                Swal.fire({
                    title: messages["success"],
                    text: isNullOrEmpty(success_text) ? "" : messages[success_text].success,
                    type: 'success',
                    confirmButtonColor: '#3085d6'
                });
            }

            success_callback(data);
        },
        error: function (error) {
            
            Swal.fire({
                title: messages["error"],
                text: error.responseText || messages.error_handling.server_error,
                type: 'error',
                confirmButtonColor: '#3085d6'
            });

            $(".close-modal")[0].click();
        }
    });
}

function Confirmation(confirm_action) {
    Swal.fire({
        title: messages.confirmation,
        //text: action_message.confirmation,
        type: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        confirmButtonText: messages.accept,
        cancelButtonText: messages.cancel
    }).then((confirmation) => {
        if (confirmation.value) {
            confirm_action();
        } else {
            return false;
        }
    });
}

$("#logout").on("click", function () {
    $("#logout-form").submit();
});


$(".show-more").on("click", function () {
    var id = parseID($(this).attr('id'));
    $(this).hide();
    $(`#info-txt-${id}`).removeClass("with-dots");
});

const urlParams = new URLSearchParams(window.location.search);
const general_state = urlParams.get('state') || 1;
var locale;

$(function () {

    $('[data-toggle="tooltip"]').tooltip();

    $(".datePicker").datetimepicker({
        locale: locale,
        format: 'DD.MM.YYYY',
        useCurrent: false,
        maxDate: moment()
        
    });
});

function insertAfter(referenceNode, newNode) {
    referenceNode.parentNode.insertBefore(newNode, referenceNode.nextSibling);
}

function insertBefore(el, referenceNode) {
    referenceNode.parentNode.insertBefore(el, referenceNode);
}

function appendLeadingZeroes(n) {
    if (n <= 9) {
        return "0" + n;
    }
    return n;
}

function parseID(id) {
    id = id.split("-");
    return parseInt(id[id.length - 1]);
}

$(".switcher").on("click", function () {
    var radio = $(this)[0];
    $(radio).val(this.checked ? 'True' : 'False');
});

$(".img-autoload").click(function () {
    $("input[id='" + $(this).attr("id") + "-input']").click();
});

$(".img-autoload-input").change(function () {
    var img_id = $(this).attr('id').replace("-input", "");
    var img = $("#" + img_id);
    
    if (fileValidation(this)) {
        readURL(this, img);
        $("#" + img_id).removeClass();
    }
});


function escapeHtml(unsafe) {
    return unsafe
        .replace(/&/g, "&amp;")
        .replace(/</g, "&lt;")
        .replace(/>/g, "&gt;")
        .replace(/"/g, "&quot;")
        .replace(/'/g, "&#039;");
}



function readURL(input, img) {
    if (input.files && input.files[0]) {

        var reader = new FileReader();

        reader.onload = function (e) {
            var src = e.target.result;
            img.attr('src', src.includes("image") ? src : "/images/video_thumbnail.png");
        };

        reader.readAsDataURL(input.files[0]);
    }
}


function fileValidation(input, isGallery = false) {

    var file = null;

    var filePath = input.value;
    var extension = filePath.split('.').pop();
    var isVideo = extension === "mp4" ? true : false; 
    var limitSize = isVideo ? 2000 * 10000 : 2000 * 1000;

    if (isGallery) {
        var allowedExtensions = /(\.jpg|\.mp4|\.)$/i;
    } else {
        allowedExtensions = /(\.jpg|\.)$/i;
    }

    if (!window.FileReader) {
        Swal.fire({
            title: messages.warning,
            type: 'warning',
            text: messages.validation.media.not_supported,
            confirmButtonColor: '#3085d6',
            confirmButtonText: "OK"
        });
        
        return false;
    }
    if (!input) {
        Swal.fire({
            title: messages.error,
            type: 'error',
            text: messages.validation.media.not_found,
            confirmButtonColor: '#3085d6',
            confirmButtonText: "OK"
        });
        
        return false;
    }
    else if (!input.files) {

        Swal.fire({
            title: messages.error,
            type: 'error',
            text: messages.validation.media.not_supported,
            confirmButtonColor: '#3085d6',
            confirmButtonText: "OK"
        });
        return false;
    }
    //else if (!input.files[0]) {
    //    alert("Please select a file before clicking 'Load'");
    //}
    else {
        file = input.files[0];
    }

    if (file === null) {
        alert("file is null");
        return false;
    }
        

    if (file.size > limitSize) {

        if (!isGallery || !isVideo) {
            var subject = "image";
            var size = "2";
        } else {
            subject = "video";
            size = "20";
        }

        Swal.fire({
            title: messages.error,
            type: 'error',
            text: messages.validation.media.constraints.size.format(size),
            confirmButtonColor: '#3085d6',
            confirmButtonText: "OK"
        });

        
        return false;
    }
    if (!allowedExtensions.exec(filePath)) {

        Swal.fire({
            title: messages.error,
            type: 'error',
            text: messages.validation.media.constraints.extension.format((isGallery ? ".jpeg, .jpg, .mp4" : ".jpeg, .jpg")),
            confirmButtonColor: '#3085d6',
            confirmButtonText: "OK"
        });

        input.value = '';
        return false;
    }

    return true;
}

$("select[name='forum-topic']").on("change", function () {
    window.location.replace(updateQueryStringParameter(window.location.href, "fci", this.value));
});

//$("select[name='culture']").on("change", function () {
//    window.location.replace(updateQueryStringParameter(window.location.href, "culture", this.value));
//});

$("#culture-select-list").on("change", function () {
    window.location.replace(updateQueryStringParameter(window.location.href, "cultureKey", this.value));
});

$("select[name='state']").on("change", function () {
    window.location.replace(updateQueryStringParameter(window.location.href, "state", this.value));
});

$(".change-state").on("click", function (e) {
    changeStatus(e);
});

$("select[name='private-state']").on("change", function (e) {
    if (!changeStatus(e, this.value)) {
        $(this).prop('selectedIndex', general_state);
    }
});


function updateQueryStringParameter(uri, key, value) {
    var re = new RegExp("([?&])" + key + "=.*?(&|$)", "i");
    var separator = uri.indexOf('?') !== -1 ? "&" : "?";
    if (uri.match(re)) {
        return uri.replace(re, '$1' + key + "=" + value + '$2');
    }
    else {
        return uri + separator + key + "=" + value;
    }
}

function isNullOrEmpty(obj) {
    return obj === null || obj === "" || typeof obj === 'undefined';
}

if (!String.prototype.format) {
    String.prototype.format = function () {
        var args = arguments;
        return this.replace(/{(\d+)}/g, function (match, number) {
            return typeof args[number] !== 'undefined'
                ? args[number]
                : match
                ;
        });
    };
}

function isHtmlEmpty(el) {
    return !$.trim(el.html())
}

function countLines() {

    var x = document.getElementsByClassName("with-dots");

    for (i = 0; i < x.length; i++) {

        var info_div = x[i];

        var divHeight = info_div.offsetHeight;
        console.log(divHeight);

        var lineHeight = parseInt($(info_div).css('line-height'));
        console.log(lineHeight);

        var lines = divHeight / lineHeight;
        console.log(lines);

        if (lines > 7) {
            $(`#show-more-btn-${parseID(info_div.id)}`).show();
        }
    }
}


/** HTML5 LightBox - jQuery Image and Video LightBox Plugin
 * Copyright 2014 Magic Hills Pty Ltd All Rights Reserved
 * Website: http://html5box.com
 * Version 7.7 
 */
(function(){var scripts=document.getElementsByTagName("script");var jsFolder="";for(var i=0;i<scripts.length;i++)if(scripts[i].src&&scripts[i].src.match(/html5lightbox\.js/i))jsFolder=scripts[i].src.substr(0,scripts[i].src.lastIndexOf("/")+1);var loadjQuery=false;if(typeof jQuery=="undefined")loadjQuery=true;else{var jVersion=jQuery.fn.jquery.split(".");if(jVersion[0]<1||jVersion[0]==1&&jVersion[1]<6)loadjQuery=true}if(loadjQuery){var head=document.getElementsByTagName("head")[0];var script=document.createElement("script");
script.setAttribute("type","text/javascript");if(script.readyState)script.onreadystatechange=function(){if(script.readyState=="loaded"||script.readyState=="complete"){script.onreadystatechange=null;loadHtml5LightBox(jsFolder)}};else script.onload=function(){loadHtml5LightBox(jsFolder)};script.setAttribute("src",jsFolder+"jquery.js");head.appendChild(script)}else loadHtml5LightBox(jsFolder)})();
function loadHtml5LightBox(jsFolder){(function($){$.fn.html5lightbox=function(options){var inst=this;inst.options=$.extend({freelink:"http://html5box.com/",defaultvideovolume:1,autoclose:false,autoclosedelay:0,resizedelay:100,insideiframe:false,autoresizecontent:true,defaultwidth:960,defaultheight:540,usedefaultsizeforcontent:false,preload:true,preloadallonpageload:false,preloadalldelay:5E3,autoplay:true,loopvideo:false,html5player:true,responsive:true,nativehtml5controls:false,videohidecontrols:false,
nativecontrolsonfirefox:false,nativecontrolsonie:false,nativecontrolsoniphone:true,nativecontrolsonipad:true,nativecontrolsonandroid:true,nativecontrolsonfullscreen:true,nativecontrolsnodownload:true,noresizecallback:true,imagekeepratio:true,maxheight:false,elemautoheight:false,useflashonie9:true,useflashonie10:true,useflashonie11:false,useflashformp4onfirefox:false,transition:"none",transitionduration:400,enablepdfjs:true,pdfjsengine:"",openpdfinnewtaboniphone:false,openpdfinnewtabonipad:false,googleanalyticsaccount:"",
arrowloop:true,showall:false,userelforgroup:true,shownavigation:true,thumbwidth:96,thumbheight:72,thumbgap:4,thumbtopmargin:12,thumbbottommargin:12,thumbborder:1,thumbbordercolor:"transparent",thumbhighlightbordercolor:"#fff",thumbopacity:1,navbuttonwidth:32,navbgcolor:"rgba(0,0,0,0.2)",shownavcontrol:true,navcontrolimage:"lightbox-navcontrol.png",hidenavdefault:false,overlaybgcolor:"#000",overlayopacity:0.9,bgcolor:"#fff",bordersize:8,borderradius:0,bordermargin:16,bordertopmargin:48,barautoheight:true,
barheight:64,smallscreenheight:415,responsivebarheight:false,barheightonsmallheight:64,notkeepratioonsmallheight:false,bordertopmarginsmall:36,loadingwidth:64,loadingheight:64,resizespeed:400,fadespeed:0,jsfolder:jsFolder,skinsfoldername:"skins/default/",loadingimage:"lightbox-loading.gif",nextimage:"lightbox-next.png",previmage:"lightbox-prev.png",closeimage:"lightbox-close.png",playvideoimage:"lightbox-playvideo.png",titlebgimage:"lightbox-titlebg.png",navarrowsprevimage:"lightbox-navprev.png",
navarrowsnextimage:"lightbox-navnext.png",navarrowsalwaysshowontouch:true,navarrowsbottomscreenwidth:479,closeonoverlay:true,alwaysshownavarrows:false,showplaybutton:true,playimage:"lightbox-play.png",pauseimage:"lightbox-pause.png",fullscreenmode:false,fullscreencloseimage:"lightbox-close-fullscreen.png",fullscreennextimage:"lightbox-next-fullscreen.png",fullscreenprevimage:"lightbox-prev-fullscreen.png",fullscreennomargin:false,fullscreenmodeonsmallscreen:false,fullscreennomarginonsmallscreen:false,
fullscreensmallscreenwidth:800,fullscreenbgcolor:"rgba(0, 0, 0, 0.9)",fullscreenbordersize:0,fullscreentextinside:false,videobgcolor:"#000",html5videoposter:"",showtitle:true,titlestyle:"bottom",titleinsidecss:"color:#fff; font-size:16px; font-family:Arial,Helvetica,sans-serif; overflow:hidden; text-align:left; margin:4px 8px;",titlebottomcss:"color:#333; font-size:16px; font-family:Arial,Helvetica,sans-serif; overflow:hidden; text-align:left;",showonmouseoverinside:false,showinsidetitleforimageonly:true,
showdescription:true,descriptioninsidecss:"color:#fff; font-size:12px; font-family:Arial,Helvetica,sans-serif; overflow:hidden; text-align:left; margin:4px 0px 0px; padding: 0px;",descriptionbottomcss:"color:#333; font-size:12px; font-family:Arial,Helvetica,sans-serif; overflow:hidden; text-align:left; margin:4px 0px 0px; padding: 0px;",fullscreentitlebottomcss:"color:#fff; font-size:16px; font-family:Arial,Helvetica,sans-serif; overflow:hidden; text-align:left; margin:4px 8px 8px;",fullscreendescriptionbottomcss:"color:#fff; font-size:12px; font-family:Arial,Helvetica,sans-serif; overflow:hidden; text-align:left; margin:4px 0px 0px; padding: 0px;",
showsocialmedia:true,socialmediaposition:"position:absolute;top:8px;right:8px;",showtitleprefix:true,titleprefix:"%NUM / %TOTAL",autoslide:false,slideinterval:5E3,showtimer:true,timerposition:"bottom",timerheight:2,timercolor:"#dc572e",timeropacity:1,initvimeo:true,inityoutube:true,swipepreventdefaultonandroid:false,initsocial:true,showsocial:false,socialposition:"position:absolute;top:100%;right:0;",socialpositionsmallscreen:"position:absolute;top:100%;right:0;left:0;",socialdirection:"horizontal",
socialbuttonsize:32,socialbuttonfontsize:18,socialrotateeffect:true,showfacebook:true,showtwitter:true,showpinterest:true,showemail:false,imagepercentage:75,sidetobottomscreenwidth:479,errorwidth:280,errorheight:48,errorcss:"text-align:center; color:#ff0000; font-size:14px; font-family:Arial, sans-serif;",enabletouchswipe:true,mobileresizeevent:false,swipedistance:0,bodynoscroll:false,useabsolutepos:false,useabsoluteposonmobile:false,supportesckey:true,supportarrowkeys:true,version:"3.3",stamp:true,
freemark:"72,84,77,76,53,32,76,105,103,104,116,98,111,120,32,70,114,101,101,32,86,101,114,115,105,111,110",watermark:"",watermarklink:""},options);if(typeof html5lightbox_options!="undefined"&&html5lightbox_options)$.extend(inst.options,html5lightbox_options);if($("div.html5lightbox_options").length)$.each($("div.html5lightbox_options").data(),function(key,value){inst.options[key.toLowerCase()]=value});if($("div#html5lightbox_options").length)$.each($("div#html5lightbox_options").data(),function(key,
value){inst.options[key.toLowerCase()]=value});if($("div#html5lightbox_general_options").length)$.each($("div#html5lightbox_general_options").data(),function(key,value){inst.options[key.toLowerCase()]=value});var ELEM_TYPE=0,ELEM_HREF=1,ELEM_TITLE=2,ELEM_GROUP=3,ELEM_WIDTH=4,ELEM_HEIGHT=5,ELEM_HREF_WEBM=6,ELEM_HREF_OGG=7,ELEM_THUMBNAIL=8,ELEM_DESCRIPTION=9,ELEM_DIV=10,ELEM_ORIGINALWIDTH=11,ELEM_ORIGINALHEIGHT=12,ELEM_SOCIALMEDIA=13,ELEM_WEBLINK=14,ELEM_WEBLINKTARGET=15,ELEM_WEBLINKTEXT=16;inst.options.types=
["IMAGE","FLASH","VIDEO","YOUTUBE","VIMEO","PDF","MP3","WEB","FLV","DAILYMOTION","DIV","WISTIA","IFRAMEVIDEO"];inst.options.htmlfolder=window.location.href.substr(0,window.location.href.lastIndexOf("/")+1);inst.options.skinsfolder=inst.options.skinsfoldername;if(inst.options.skinsfolder.length>0&&inst.options.skinsfolder[inst.options.skinsfolder.length-1]!="/")inst.options.skinsfolder+="/";if(inst.options.skinsfolder.charAt(0)!="/"&&inst.options.skinsfolder.substring(0,5)!="http:"&&inst.options.skinsfolder.substring(0,
6)!="https:")inst.options.skinsfolder=inst.options.jsfolder+inst.options.skinsfolder;var image_list=["loadingimage","nextimage","previmage","closeimage","playvideoimage","titlebgimage","navarrowsprevimage","navarrowsnextimage","navcontrolimage","playimage","pauseimage","fullscreencloseimage","fullscreennextimage","fullscreenprevimage"];for(var i=0;i<image_list.length;i++)if(inst.options[image_list[i]])if(inst.options[image_list[i]].substring(0,7).toLowerCase()!="http://"&&inst.options[image_list[i]].substring(0,
8).toLowerCase()!="https://")inst.options[image_list[i]]=inst.options.skinsfolder+inst.options[image_list[i]];var i;var l;var mark="";var bytes=inst.options.freemark.split(",");for(i=0;i<bytes.length;i++)mark+=String.fromCharCode(bytes[i]);inst.options.freemark=mark;var d0="hmtamgli5cboxh.iclolms";for(i=1;i<=5;i++)d0=d0.slice(0,i)+d0.slice(i+1);l=d0.length;for(i=0;i<5;i++)d0=d0.slice(0,l-9+i)+d0.slice(l-8+i);if(inst.options.htmlfolder.indexOf(d0)!=-1)inst.options.stamp=false;inst.options.flashInstalled=
false;try{if(new ActiveXObject("ShockwaveFlash.ShockwaveFlash"))inst.options.flashInstalled=true}catch(e){if(navigator.mimeTypes["application/x-shockwave-flash"])inst.options.flashInstalled=true}inst.options.html5VideoSupported=!!document.createElement("video").canPlayType;inst.options.isChrome=navigator.userAgent.match(/Chrome/i)!=null;inst.options.isFirefox=navigator.userAgent.match(/Firefox/i)!=null;inst.options.isOpera=navigator.userAgent.match(/Opera/i)!=null||navigator.userAgent.match(/OPR\//i)!=
null;inst.options.isSafari=navigator.userAgent.match(/Safari/i)!=null;inst.options.isIE11=navigator.userAgent.match(/Trident\/7/)!=null&&navigator.userAgent.match(/rv:11/)!=null;inst.options.isIE=navigator.userAgent.match(/MSIE/i)!=null&&!inst.options.isOpera;inst.options.isIE10=navigator.userAgent.match(/MSIE 10/i)!=null&&!this.options.isOpera;inst.options.isIE9=navigator.userAgent.match(/MSIE 9/i)!=null&&!inst.options.isOpera;inst.options.isIE8=navigator.userAgent.match(/MSIE 8/i)!=null&&!inst.options.isOpera;
inst.options.isIE7=navigator.userAgent.match(/MSIE 7/i)!=null&&!inst.options.isOpera;inst.options.isIE6=navigator.userAgent.match(/MSIE 6/i)!=null&&!inst.options.isOpera;inst.options.isIE678=inst.options.isIE6||inst.options.isIE7||inst.options.isIE8;inst.options.isIE6789=inst.options.isIE6||inst.options.isIE7||inst.options.isIE8||inst.options.isIE9;inst.options.isAndroid=navigator.userAgent.match(/Android/i)!=null;inst.options.isIPad=navigator.userAgent.match(/iPad/i)!=null;inst.options.isIPhone=
navigator.userAgent.match(/iPod/i)!=null||navigator.userAgent.match(/iPhone/i)!=null;inst.options.isIOS=inst.options.isIPad||inst.options.isIPhone;inst.options.isMobile=inst.options.isAndroid||inst.options.isIPad||inst.options.isIPhone;inst.options.isIOSLess5=inst.options.isIPad&&inst.options.isIPhone&&(navigator.userAgent.match(/OS 4/i)!=null||navigator.userAgent.match(/OS 3/i)!=null);inst.options.supportCSSPositionFixed=!inst.options.isIE6&&!inst.options.isIOSLess5;inst.options.iequirksmode=inst.options.isIE6789&&
document.compatMode!="CSS1Compat";inst.options.isTouch="ontouchstart"in window;if(inst.options.isChrome){var match=navigator.userAgent.match(/Chrome\/([0-9]+)/);inst.options.chromeVersion=match&&match.length>=2?parseInt(match[1],10):0}if(inst.options.isAndroid){var match=navigator.userAgent.match(/Android\s([0-9\.]*)/i);inst.options.androidVersion=match&&match.length>=2?parseInt(match[1],10):-1}var v=document.createElement("video");inst.options.canplaymp4=v&&v.canPlayType&&v.canPlayType("video/mp4").replace(/no/,
"");if(inst.options.isFirefox&&inst.options.nativecontrolsonfirefox||(inst.options.isIE6789||inst.options.isIE10||inst.options.isIE11)&&inst.options.nativecontrolsonie||inst.options.isIPhone&&inst.options.nativecontrolsoniphone||inst.options.isIPad&&inst.options.nativecontrolsonipad||inst.options.isAndroid&&inst.options.nativecontrolsonandroid)inst.options.nativehtml5controls=true;if(inst.options.isIOS||inst.options.isAndroid)inst.options.nativecontrolsonfullscreen=true;inst.options.navheight=0;inst.options.thumbgap+=
2*inst.options.thumbborder;inst.options.resizeTimeout=-1;inst.slideTimeout=null;inst.autosliding=false;inst.existingElem=-1;inst.direction=-3;inst.elemArray=new Array;inst.options.curElem=-1;inst.defaultoptions=$.extend({},inst.options);if(inst.options.googleanalyticsaccount&&!window._gaq){window._gaq=window._gaq||[];window._gaq.push(["_setAccount",inst.options.googleanalyticsaccount]);window._gaq.push(["_trackPageview"]);$.getScript("https://ssl.google-analytics.com/ga.js")}if(inst.options.initvimeo){var tag=
document.createElement("script");tag.src=inst.options.jsfolder+"froogaloop2.min.js";var firstScriptTag=document.getElementsByTagName("script")[0];firstScriptTag.parentNode.insertBefore(tag,firstScriptTag)}if(inst.options.inityoutube){var tag=document.createElement("script");tag.src="https://www.youtube.com/iframe_api";var firstScriptTag=document.getElementsByTagName("script")[0];firstScriptTag.parentNode.insertBefore(tag,firstScriptTag)}if(inst.options.initsocial)$("head").append('<link rel="stylesheet" href="'+
inst.options.jsfolder+'icons/css/fontello.css" type="text/css" />');inst.showing=false;inst.navvisible=false;inst.disableEscKey=function(isFullscreen){if(isFullscreen)inst.disableesckeyinfullscreen=true;else setTimeout(function(){inst.disableesckeyinfullscreen=false},1E3)};inst.supportKeyboard=function(){inst.disableesckeyinfullscreen=false;$(document).keyup(function(e){if(!inst.showing)return;if(!inst.disableesckeyinfullscreen&&inst.options.supportesckey&&e.keyCode==27)inst.finish();else if(inst.options.supportarrowkeys)if(e.keyCode==
39)inst.gotoSlide(-1);else if(e.keyCode==37)inst.gotoSlide(-2)});if(inst.options.supportesckey){document.addEventListener("MSFullscreenChange",function(){inst.disableEscKey(document.msFullscreenElement!=null)},false);document.addEventListener("webkitfullscreenchange",function(){inst.disableEscKey(document.webkitIsFullScreen)},false)}};inst.supportKeyboard();inst.init=function(){inst.showing=false;inst.readData();inst.createMarkup();inst.initSlide()};inst.checkParentData=function(node,parentNode,attr){return node.data(attr)?
node.data(attr):parentNode&&parentNode.data(attr)?parentNode.data(attr):null};inst.readNodeData=function(node,parentNode){var fileType="mediatype"in node.data()?node.data("mediatype"):inst.checkType(node.attr("href"));if(fileType<0)return;var title=node.data("title")?node.data("title"):node.attr("title");var group=node.data("group")?node.data("group"):inst.options.userelforgroup?node.attr("rel"):null;if(!group&&parentNode)group=parentNode.data("group")?parentNode.data("group"):inst.options.userelforgroup?
parentNode.attr("rel"):null;for(var i=0;i<inst.elemArray.length;i++)if(node.attr("href")==inst.elemArray[i][ELEM_HREF]){inst.elemArray[i][ELEM_TITLE]=title;inst.elemArray[i][ELEM_GROUP]=group;return}inst.elemArray.push(new Array(fileType,node.attr("href"),title,group,inst.checkParentData(node,parentNode,"width"),inst.checkParentData(node,parentNode,"height"),inst.checkParentData(node,parentNode,"webm"),inst.checkParentData(node,parentNode,"ogg"),inst.checkParentData(node,parentNode,"thumbnail"),inst.checkParentData(node,
parentNode,"description"),null,null,null,inst.checkParentData(node,parentNode,"socialmedia"),inst.checkParentData(node,parentNode,"weblink"),inst.checkParentData(node,parentNode,"weblinktarget"),inst.checkParentData(node,parentNode,"weblinktext")))};inst.readData=function(){inst.each(function(){var self=$(this);if(this.nodeName.toLowerCase()=="a"||this.nodeName.toLowerCase()=="area")inst.readNodeData(self);else self.find("a,area").each(function(){inst.readNodeData($(this),self)})})};inst.createMarkup=
function(){if($(window).width()<=inst.options.fullscreensmallscreenwidth){if(inst.options.fullscreenmodeonsmallscreen){inst.options.fullscreenmode=true;if(inst.options.fullscreennomarginonsmallscreen)inst.options.fullscreennomargin=true}if(inst.options.fullscreenmode&&inst.options.fullscreennomarginonsmallscreen)inst.options.fullscreennomargin=true}if(inst.options.fullscreenmode){inst.options.bgcolor=inst.options.fullscreenbgcolor;inst.options.bordersize=inst.options.fullscreenbordersize;if(inst.options.fullscreennomargin){inst.options.bordersize=
0;inst.options.bordermargin=0;inst.options.bordertopmargin=0;inst.options.bordertopmarginsmall=0}if(inst.options.fullscreentextinside){inst.options.titlestyle="inside";inst.options.titlecss=inst.options.titleinsidecss;inst.options.descriptioncss=inst.options.descriptioninsidecss}else{inst.options.titlebottomcss=inst.options.fullscreentitlebottomcss;inst.options.descriptionbottomcss=inst.options.fullscreendescriptionbottomcss}}inst.options.barheightoriginal=inst.options.barheight;if(inst.options.responsivebarheight){var winH=
$(window).height();if(winH<=inst.options.smallscreenheight)inst.options.barheight=inst.options.barheightonsmallheight}if(!inst.options.titlecss)inst.options.titlecss=inst.options.titlestyle=="inside"?inst.options.titleinsidecss:inst.options.titlebottomcss;if(!inst.options.descriptioncss)inst.options.descriptioncss=inst.options.titlestyle=="inside"?inst.options.descriptioninsidecss:inst.options.descriptionbottomcss;inst.options.titlecss=$.trim(inst.options.titlecss);if(inst.options.titlecss.length>
1){if(inst.options.titlecss.charAt(0)=="{")inst.options.titlecss=inst.options.titlecss.substring(1);if(inst.options.titlecss.charAt(inst.options.titlecss.length-1)=="}")inst.options.titlecss=inst.options.titlecss.substring(0,inst.options.titlecss.length-1)}inst.options.descriptioncss=$.trim(inst.options.descriptioncss);if(inst.options.descriptioncss.length>1){if(inst.options.descriptioncss.charAt(0)=="{")inst.options.descriptioncss=inst.options.descriptioncss.substring(1);if(inst.options.descriptioncss.charAt(inst.options.descriptioncss.length-
1)=="}")inst.options.descriptioncss=inst.options.descriptioncss.substring(0,inst.options.descriptioncss.length-1)}inst.options.errorcss=$.trim(inst.options.errorcss);if(inst.options.errorcss.length>1){if(inst.options.errorcss.charAt(0)=="{")inst.options.errorcss=inst.options.errorcss.substring(1);if(inst.options.errorcss.charAt(inst.options.errorcss.length-1)=="}")inst.options.errorcss=inst.options.errorcss.substring(0,inst.options.errorcss.length-1)}var styleCss=".bodynoscroll {height:100%;overflow:hidden;}";
styleCss+=".html5-hide {display:none !important;} #html5box-html5-lightbox .html5-text {"+inst.options.titlecss+"}";styleCss+="#html5box-html5-lightbox .html5-description {"+inst.options.descriptioncss+"}";styleCss+="#html5box-html5-lightbox .html5-error {"+inst.options.errorcss+"}";if(inst.options.navarrowsalwaysshowontouch||inst.options.alwaysshownavarrows){styleCss+="#html5box-html5-lightbox .html5-prev-touch {left:0px;top:50%;margin-top:-16px;margin-left:-32px;} #html5box-html5-lightbox .html5-next-touch {right:0px;top:50%;margin-top:-16px;margin-right:-32px;}";
styleCss+="@media (max-width: "+inst.options.navarrowsbottomscreenwidth+"px) { #html5box-html5-lightbox .html5-prev-touch {top:100%;left:0;margin:0;} #html5box-html5-lightbox .html5-next-touch {top:100%;right:0;margin:0;} }"}styleCss+="#html5box-html5-lightbox .html5-prev-fullscreen {display:block;} #html5box-html5-lightbox .html5-next-fullscreen {display:block;} #html5box-html5-lightbox .html5-prev-bottom-fullscreen {display:none;} #html5box-html5-lightbox .html5-next-bottom-fullscreen {display:none;}";
styleCss+="@media (max-width: "+inst.options.navarrowsbottomscreenwidth+"px) {#html5box-html5-lightbox .html5-prev-fullscreen {display:none;} #html5box-html5-lightbox .html5-next-fullscreen {display:none;} #html5box-html5-lightbox .html5-prev-bottom-fullscreen {display:block;} #html5box-html5-lightbox .html5-next-bottom-fullscreen {display:block;} }";if(inst.options.titlestyle=="right"){styleCss+="#html5box-html5-lightbox .html5-elem-wrap {width:"+inst.options.imagepercentage+"%;height:100%;} #html5box-html5-lightbox .html5-elem-data-box {min-height:100%;}";
styleCss+="@media (max-width: "+inst.options.sidetobottomscreenwidth+"px) {#html5box-html5-lightbox .html5-elem-wrap {width:100%;height:auto;} #html5box-html5-lightbox .html5-elem-data-box {width:100%;height:auto;min-height:0;}}"}else if(inst.options.titlestyle=="left"){styleCss+="#html5box-html5-lightbox .html5-elem-wrap {height:100%;} #html5box-html5-lightbox .html5-elem-data-box {width:"+String(100-inst.options.imagepercentage)+"%;min-height:100%;}";styleCss+="@media (max-width: "+inst.options.sidetobottomscreenwidth+
"px) {#html5box-html5-lightbox .html5-elem-wrap {width:100%;height:auto;} #html5box-html5-lightbox .html5-elem-data-box {width:100%;height:auto;min-height:0;}}"}styleCss+=".html5-rotate { border-radius:50%; -webkit-transition:-webkit-transform .4s ease-in; transition: transform .4s ease-in; } .html5-rotate:hover { -webkit-transform: rotate(360deg); transform: rotate(360deg); }";styleCss+="@media (max-width: "+inst.options.navarrowsbottomscreenwidth+"px) {#html5-social {"+inst.options.socialpositionsmallscreen+
"}}";$("head").append("<style type='text/css' data-creator='html5box-html5-lightbox'>"+styleCss+"</style>");var elemheight=inst.options.elemautoheight?"auto":"100%";inst.$lightbox=$("<div id='html5box-html5-lightbox' style='display:none;top:0px;left:0px;width:100%;height:100%;z-index:9999998;text-align:center;'>"+"<div id='html5-lightbox-overlay' style='display:block;position:absolute;top:0px;left:0px;width:100%;min-height:100%;background-color:"+inst.options.overlaybgcolor+";opacity:"+inst.options.overlayopacity+
";filter:alpha(opacity="+Math.round(inst.options.overlayopacity*100)+");'></div>"+"<div id='html5-lightbox-box' style='display:block;position:relative;margin:0px auto;'>"+"<div class='html5-elem-box' style='display:block;position:relative;width:100%;overflow-x:hidden;overflow-y:auto;height:"+elemheight+";margin:0px auto;text-align:center;box-sizing:border-box;-moz-box-sizing:border-box;-webkit-box-sizing:border-box;'>"+"<div class='html5-elem-wrap' style='display:block;position:relative;margin:0px auto;text-align:center;box-sizing:border-box;-moz-box-sizing:border-box;-webkit-box-sizing:border-box;background-color:"+
inst.options.bgcolor+";'>"+"<div class='html5-loading' style='display:none;position:absolute;top:0px;left:0px;text-align:center;width:100%;height:100%;background:url(\""+inst.options.loadingimage+"\") no-repeat center center;'></div>"+"<div class='html5-error-box html5-error' style='display:none;position:absolute;padding:"+inst.options.bordersize+"px;text-align:center;width:"+inst.options.errorwidth+"px;height:"+inst.options.errorheight+"px;'>"+"The requested content cannot be loaded.<br />Please try again later."+
"</div>"+"<div class='html5-image' style='display:none;position:relative;top:0px;left:0px;width:100%;height:100%;"+(inst.options.iequirksmode?"margin":"padding")+":"+inst.options.bordersize+"px;text-align:center;box-sizing:border-box;-moz-box-sizing:border-box;-webkit-box-sizing:border-box;'></div>"+"</div>"+"</div>");
inst.options.positionFixed=inst.options.supportCSSPositionFixed&&inst.options.responsive&&!inst.options.iequirksmode;if(inst.options.useabsolutepos||inst.options.useabsoluteposonmobile&&inst.options.isMobile)inst.options.positionFixed=false;if(!inst.options.positionFixed)inst.options.bodynoscroll=true;inst.$lightbox.css({position:inst.options.positionFixed?"fixed":"absolute"});inst.$lightbox.appendTo("body");inst.$lightboxBox=$("#html5-lightbox-box",inst.$lightbox);inst.$elem=$(".html5-elem-box",
inst.$lightbox);inst.$elemWrap=$(".html5-elem-wrap",inst.$lightbox);inst.$loading=$(".html5-loading",inst.$lightbox);inst.$error=$(".html5-error-box",inst.$lightbox);inst.$image=$(".html5-image",inst.$lightbox);if(inst.options.fullscreenmode&&inst.options.fullscreennomargin)inst.$elem.css({overflow:"hidden"});var elemText="<div class='html5-elem-data-box' style='display:none;box-sizing:border-box;'><div class='html5-text' style='display:block;overflow:hidden;'></div></div>";if(inst.options.titlestyle==
"left")inst.$elem.prepend(elemText);else inst.$elem.append(elemText);inst.$elemData=$(".html5-elem-data-box",inst.$lightbox);inst.$text=$(".html5-text",inst.$lightbox);if(inst.options.borderradius>0){inst.$elem.css({"border-radius":inst.options.borderradius+"px","-moz-border-radius":inst.options.borderradius+"px","-webkit-border-radius":inst.options.borderradius+"px"});if(inst.options.titlestyle=="inside")inst.$elemWrap.css({"border-radius":inst.options.borderradius+"px","-moz-border-radius":inst.options.borderradius+
"px","-webkit-border-radius":inst.options.borderradius+"px"});else if(inst.options.titlestyle=="bottom"){inst.$elemWrap.css({"border-top-left-radius":inst.options.borderradius+"px","-moz-top-left-border-radius":inst.options.borderradius+"px","-webkit-top-left-border-radius":inst.options.borderradius+"px","border-top-right-radius":inst.options.borderradius+"px","-moz-top-right-border-radius":inst.options.borderradius+"px","-webkit-top-right-border-radius":inst.options.borderradius+"px"});inst.$elemData.css({"border-bottom-left-radius":inst.options.borderradius+
"px","-moz-top-bottom-border-radius":inst.options.borderradius+"px","-webkit-bottom-left-border-radius":inst.options.borderradius+"px","border-bottom-right-radius":inst.options.borderradius+"px","-moz-bottom-right-border-radius":inst.options.borderradius+"px","-webkit-bottom-right-border-radius":inst.options.borderradius+"px"})}}if(inst.options.titlestyle=="right"||inst.options.titlestyle=="left"){inst.$lightboxBox.css({"background-color":inst.options.bgcolor});if(inst.options.titlestyle=="right"){inst.$elemWrap.css({position:"relative",
"float":"left"});inst.$elemData.css({position:"relative",overflow:"hidden",padding:inst.options.bordersize+"px"})}else{inst.$elemWrap.css({position:"relative",overflow:"hidden"});inst.$elemData.css({position:"relative","float":"left",padding:inst.options.bordersize+"px"})}}else if(inst.options.titlestyle=="inside"){inst.$elemData.css({position:"absolute",margin:inst.options.bordersize+"px",bottom:0,left:0,"background-color":"#333","background-color":"rgba(51, 51, 51, 0.6)"});if(inst.options.showonmouseoverinside)inst.$elemData.css({opacity:0});
inst.$text.css({padding:inst.options.bordersize+"px "+2*inst.options.bordersize+"px"})}else{inst.$elemData.css({position:"relative",width:"100%",height:inst.options.barautoheight?"auto":inst.options.barheight+"px","padding":"0 0 "+inst.options.bordersize+"px"+" 0","background-color":inst.options.bgcolor,"text-align":"left"});if(!inst.options.fullscreenmode||!inst.options.fullscreennomargin)inst.$text.css({"margin":"0 "+inst.options.bordersize+"px"})}if(inst.options.showsocial){var socialCode='<div id="html5-social" style="display:none;'+
inst.options.socialposition+'">';var socialBtnCSS=(inst.options.socialdirection=="horizontal"?"display:inline-block;":"display:block;")+"margin:4px;";var socialCSS="display:table-cell;width:"+inst.options.socialbuttonsize+"px;height:"+inst.options.socialbuttonsize+"px;font-size:"+inst.options.socialbuttonfontsize+"px;border-radius:50%;color:#fff;vertical-align:middle;text-align:center;cursor:pointer;padding:0;";if(inst.options.showemail)socialCode+='<div class="html5-social-btn'+(inst.options.socialrotateeffect?
" html5-rotate":"")+' html5-social-email" style="'+socialBtnCSS+'"><div class="mh-icon-mail" style="'+socialCSS+'background-color:#4d83ff;"></div></div>';if(inst.options.showfacebook)socialCode+='<div class="html5-social-btn'+(inst.options.socialrotateeffect?" html5-rotate":"")+' html5-social-facebook" style="'+socialBtnCSS+'"><div class="mh-icon-facebook" style="'+socialCSS+'background-color:#3b5998;"></div></div>';if(inst.options.showtwitter)socialCode+='<div class="html5-social-btn'+(inst.options.socialrotateeffect?
" html5-rotate":"")+' html5-social-twitter" style="'+socialBtnCSS+'"><div class="mh-icon-twitter" style="'+socialCSS+'background-color:#03b3ee;"></div></div>';if(inst.options.showpinterest)socialCode+='<div class="html5-social-btn'+(inst.options.socialrotateeffect?" html5-rotate":"")+' html5-social-pinterest" style="'+socialBtnCSS+'"><div class="mh-icon-pinterest" style="'+socialCSS+'background-color:#c92228;"></div></div>';socialCode+='<div style="clear:both;"></div></div>';inst.$lightboxBox.append(socialCode);
$(".html5-social-btn",inst.$lightbox).click(function(){var shareUrl=window.location.href+(window.location.href.indexOf("?")<0?"?":"&")+"html5lightboxshare="+encodeURIComponent(inst.currentElem[ELEM_HREF]);var shareTitle=inst.currentElem[ELEM_TITLE];var shareMedia=inst.currentElem[ELEM_HREF];if(inst.currentElem[ELEM_TYPE]==0)shareMedia=inst.absoluteUrl(inst.currentElem[ELEM_HREF]);else if(inst.currentElem[ELEM_TYPE]==3)shareMedia="https://img.youtube.com/vi/"+inst.getYoutubeId(inst.currentElem[ELEM_HREF])+
"/0.jpg";else{var lightboxLink=$('.html5lightbox[href="'+inst.currentElem[ELEM_HREF]+'"]');if(lightboxLink.length>0)if(lightboxLink.data("shareimage")&&lightboxLink.data("shareimage").length>0)shareMedia=inst.absoluteUrl(lightboxLink.data("shareimage"));else if(lightboxLink.data("thumbnail")&&lightboxLink.data("thumbnail").length>0)shareMedia=inst.absoluteUrl(lightboxLink.data("thumbnail"));else{var lightboxImg=$("img",lightboxLink);if(lightboxImg.length>0)shareMedia=inst.absoluteUrl(lightboxImg.attr("src"))}}var isVideo=
inst.currentElem[ELEM_TYPE]==2||inst.currentElem[ELEM_TYPE]==3||inst.currentElem[ELEM_TYPE]==4||inst.currentElem[ELEM_TYPE]==8||inst.currentElem[ELEM_TYPE]==9||inst.currentElem[ELEM_TYPE]==11||inst.currentElem[ELEM_TYPE]==12;if(!shareTitle)shareTitle="";else shareTitle=inst.html2Text(shareTitle);if($(this).hasClass("html5-social-facebook"))window.open("https://www.facebook.com/sharer/sharer.php?u="+encodeURIComponent(shareUrl)+"&t="+encodeURIComponent(shareTitle),"_blank");else if($(this).hasClass("html5-social-twitter"))window.open("https://twitter.com/share?url="+
encodeURIComponent(shareUrl)+"&text="+encodeURIComponent(shareTitle),"_blank");else if($(this).hasClass("html5-social-pinterest"))window.open("https://pinterest.com/pin/create/bookmarklet/?media="+encodeURIComponent(shareMedia)+"&url="+encodeURIComponent(shareUrl)+"&description="+encodeURIComponent(shareTitle)+"&is_video="+(isVideo?"true":"false"),"_blank");else if($(this).hasClass("html5-social-email"))window.open("mailto:?subject="+encodeURIComponent(shareTitle)+"&body=Check out this: "+encodeURIComponent(shareUrl));
return false})}if(inst.options.fullscreenmode){inst.$lightbox.append("<div class='html5-next-fullscreen' style='cursor:pointer;position:absolute;right:"+inst.options.bordersize+"px;top:50%;margin-top:-16px;'><img  alt='' src='"+inst.options.fullscreennextimage+"'></div>"+"<div class='html5-prev-fullscreen' style='cursor:pointer;position:absolute;left:"+inst.options.bordersize+"px;top:50%;margin-top:-16px;'><img   alt='' src='"+inst.options.fullscreenprevimage+"'></div>");inst.$next=$(".html5-next-fullscreen",
inst.$lightbox);inst.$prev=$(".html5-prev-fullscreen",inst.$lightbox);inst.$lightboxBox.append("<div class='html5-next-bottom-fullscreen' style='cursor:pointer;position:absolute;top:100%;right:0;margin-top:8px;'><img  alt='' src='"+inst.options.fullscreennextimage+"'></div>"+"<div class='html5-prev-bottom-fullscreen' style='cursor:pointer;position:absolute;top:100%;left:0;margin-top:8px;'><img   alt='' src='"+inst.options.fullscreenprevimage+"'></div>");inst.$nextbottom=$(".html5-next-bottom-fullscreen",
inst.$lightbox);inst.$prevbottom=$(".html5-prev-bottom-fullscreen",inst.$lightbox);inst.$nextbottom.click(function(){inst.nextArrowClicked()});inst.$prevbottom.click(function(){inst.prevArrowClicked()});inst.$lightbox.append("<div id='html5-close-fullscreen' style='display:block;cursor:pointer;position:absolute;top:0;right:0;margin-top:0;margin-right:0;'><img   alt='' src='"+inst.options.fullscreencloseimage+"'></div>");inst.$close=$("#html5-close-fullscreen",inst.$lightbox)}else{inst.$lightboxBox.append("<div class='html5-next' style='display:none;cursor:pointer;position:absolute;right:"+
inst.options.bordersize+"px;top:50%;margin-top:-32px;'><img   alt='' src='"+inst.options.nextimage+"'></div>"+"<div class='html5-prev' style='display:none;cursor:pointer;position:absolute;left:"+inst.options.bordersize+"px;top:50%;margin-top:-32px;'><img   alt='' src='"+inst.options.previmage+"'></div>");inst.$next=$(".html5-next",inst.$lightbox);inst.$prev=$(".html5-prev",inst.$lightbox);if(inst.options.isTouch&&inst.options.navarrowsalwaysshowontouch||inst.options.alwaysshownavarrows){inst.$lightboxBox.append("<div class='html5-next-touch' style='display:block;cursor:pointer;position:absolute;'><img   alt='' src='"+
inst.options.nextimage+"'></div>"+"<div class='html5-prev-touch' style='display:block;cursor:pointer;position:absolute;'><img   alt='' src='"+inst.options.previmage+"'></div>");inst.$nexttouch=$(".html5-next-touch",inst.$lightbox);inst.$prevtouch=$(".html5-prev-touch",inst.$lightbox);inst.$nexttouch.click(function(){inst.nextArrowClicked()});inst.$prevtouch.click(function(){inst.prevArrowClicked()})}inst.$lightboxBox.append("<div id='html5-close' style='display:none;cursor:pointer;position:absolute;top:0;right:0;margin-top:-16px;margin-right:-16px;'><img   alt='' src='"+
inst.options.closeimage+"'></div>");inst.$close=$("#html5-close",inst.$lightbox)}if(inst.options.titlestyle=="inside"&&inst.options.showonmouseoverinside)inst.$lightboxBox.hover(function(){if(inst.currentElem[ELEM_TYPE]==0||!inst.options.showinsidetitleforimageonly)inst.$elemData.animate({opacity:1},400)},function(){inst.$elemData.animate({opacity:0},400)});inst.$watermark=$("#html5-watermark",inst.$lightbox);if(inst.options.stamp)inst.$watermark.html("<a href='"+inst.options.freelink+"' style='text-decoration:none;' title='jQuery Lightbox'><div style='display:block;width:170px;height:20px;text-align:center;border-radius:3px;-moz-border-radius:3px;-webkit-border-radius:3px;background-color:#fff;color:#333;font:12px Arial,sans-serif;'><div style='line-height:20px;'>"+
inst.options.freemark+"</div></div></a>");else if(inst.options.watermark){var html="<img   alt='' src='"+inst.options.watermark+"' style='border:none;' />";if(inst.options.watermarklink)html="<a href='"+inst.options.watermarklink+"' target='_blank'>"+html+"</a>";inst.$watermark.html(html)}if(inst.options.closeonoverlay)$("#html5-lightbox-overlay",inst.$lightbox).click(inst.finish);inst.$close.click(inst.finish);inst.$next.click(function(){inst.nextArrowClicked()});inst.$prev.click(function(){inst.prevArrowClicked()});
$(window).resize(function(){if(inst.options.isIOS&&!inst.options.mobileresizeevent)return;clearTimeout(inst.options.resizeTimeout);inst.options.resizeTimeout=setTimeout(function(){inst.resizeWindow()},inst.options.resizedelay)});$(window).scroll(function(){if(inst.options.isIOS&&!inst.options.mobileresizeevent)return;inst.scrollBox()});$(window).on("orientationchange",function(e){if(inst.options.isMobile)inst.resizeWindow()});if(inst.options.enabletouchswipe)inst.enableSwipe()};inst.html2Text=function(html){var tag=
document.createElement("div");tag.innerHTML=html;return tag.innerText};inst.slideTimer=function(interval,callback,updatecallback){var timerInstance=this;timerInstance.timeout=interval;var updateinterval=50;var updateTimerId=null;var runningTime=0;var paused=false;var started=false;var startedandpaused=false;this.pause=function(){if(started){paused=true;clearInterval(updateTimerId)}};this.resume=function(forceresume){if(startedandpaused&&!forceresume)return;startedandpaused=false;if(started&&paused){paused=
false;updateTimerId=setInterval(function(){runningTime+=updateinterval;if(runningTime>timerInstance.timeout){clearInterval(updateTimerId);if(callback)callback()}if(updatecallback)updatecallback(runningTime/timerInstance.timeout)},updateinterval)}};this.stop=function(){clearInterval(updateTimerId);if(updatecallback)updatecallback(-1);runningTime=0;paused=false;started=false};this.start=function(){runningTime=0;paused=false;started=true;updateTimerId=setInterval(function(){runningTime+=updateinterval;
if(runningTime>timerInstance.timeout){clearInterval(updateTimerId);if(callback)callback()}if(updatecallback)updatecallback(runningTime/timerInstance.timeout)},updateinterval)};this.startandpause=function(){runningTime=0;paused=true;started=true;startedandpaused=true};return this};inst.updateTimer=function(percent){var w=Math.round(percent*100);if(w>100)w=100;if(w<0)w=0;$(".html5-timer",inst.$lightbox).css({display:"block",width:w+"%"})};inst.initSlide=function(){inst.autosliding=false;inst.slideTimeout=
inst.slideTimer(inst.options.slideinterval,function(){inst.gotoSlide(-1)},inst.options.showtimer?function(percent){inst.updateTimer(percent)}:null);if(inst.options.autoslide){inst.slideTimeout.stop();inst.autosliding=true}};inst.nextArrowClicked=function(){if(inst.options.nextElem<=inst.options.curElem)if(inst.options.onlastarrowclicked&&window[inst.options.onlastarrowclicked]&&typeof window[inst.options.onlastarrowclicked]=="function")window[inst.options.onlastarrowclicked]();inst.gotoSlide(-1)};
inst.prevArrowClicked=function(){if(inst.options.prevElem>=inst.options.curElem)if(inst.options.onfirstarrowclicked&&window[inst.options.onfirstarrowclicked]&&typeof window[inst.options.onfirstarrowclicked]=="function")window[inst.options.onfirstarrowclicked]();inst.gotoSlide(-2)};inst.calcNextPrevElem=function(){inst.options.nextElem=-1;inst.options.prevElem=-1;inst.options.inGroup=false;inst.options.groupIndex=0;inst.options.groupCount=0;var group=inst.elemArray[inst.options.curElem][ELEM_GROUP];
for(var i=0;i<inst.elemArray.length;i++)if(inst.matchGroup(group,inst.elemArray[i][ELEM_GROUP])){if(i==inst.options.curElem)inst.options.groupIndex=inst.options.groupCount;inst.options.groupCount++}var j,curGroup=inst.elemArray[inst.options.curElem][ELEM_GROUP];if(curGroup!=undefined&&curGroup!=null){for(j=inst.options.curElem+1;j<inst.elemArray.length;j++)if(inst.matchGroup(curGroup,inst.elemArray[j][ELEM_GROUP])){inst.options.nextElem=j;break}if(inst.options.nextElem<0)for(j=0;j<inst.options.curElem;j++)if(inst.matchGroup(curGroup,
inst.elemArray[j][ELEM_GROUP])){inst.options.nextElem=j;break}if(inst.options.nextElem>=0){for(j=inst.options.curElem-1;j>=0;j--)if(inst.matchGroup(curGroup,inst.elemArray[j][ELEM_GROUP])){inst.options.prevElem=j;break}if(inst.options.prevElem<0)for(j=inst.elemArray.length-1;j>inst.options.curElem;j--)if(inst.matchGroup(curGroup,inst.elemArray[j][ELEM_GROUP])){inst.options.prevElem=j;break}}}if(inst.options.nextElem>=0||inst.options.prevElem>=0)inst.options.inGroup=true};inst.calcBoxPosition=function(initW,
initH){var boxW=initW+2*inst.options.bordersize;var boxH=initH+2*inst.options.bordersize;var navH=inst.options.shownavigation&&inst.navvisible?inst.options.navheight:0;var winH=$(window).height();var boxT=Math.round((winH-navH)/2-boxH/2);if(inst.options.titlestyle=="bottom")boxT-=Math.round(inst.options.barheight/2);var topmargin=$(window).height()<inst.options.smallscreenheight?inst.options.bordertopmarginsmall:inst.options.bordertopmargin;if(boxT<topmargin)boxT=topmargin;if(inst.options.insideiframe&&
window.self!=window.top)if(parent.window.jQuery&&parent.window.jQuery("#"+inst.options.iframeid).length){var iframetop=parent.window.jQuery("#"+inst.options.iframeid).offset().top;var parentscroll=parent.window.document.body.scrollTop;boxT=topmargin;boxT+=parentscroll>iframetop?parentscroll-iframetop:0}return[boxW,boxH,boxT]};inst.hideNavArrows=function(){var showPrev=false;var showNext=false;if(inst.options.inGroup){if(inst.options.arrowloop||!inst.options.arrowloop&&inst.options.prevElem<inst.options.curElem)showPrev=
true;if(inst.options.arrowloop||!inst.options.arrowloop&&inst.options.nextElem>inst.options.curElem)showNext=true}if(showPrev){inst.$prev.removeClass("html5-hide");if(inst.$prevbottom)inst.$prevbottom.removeClass("html5-hide");if(inst.$prevtouch)inst.$prevtouch.removeClass("html5-hide")}else{inst.$prev.addClass("html5-hide");if(inst.$prevbottom)inst.$prevbottom.addClass("html5-hide");if(inst.$prevtouch)inst.$prevtouch.addClass("html5-hide")}if(showNext){inst.$next.removeClass("html5-hide");if(inst.$nextbottom)inst.$nextbottom.removeClass("html5-hide");
if(inst.$nexttouch)inst.$nexttouch.removeClass("html5-hide")}else{inst.$next.addClass("html5-hide");if(inst.$nextbottom)inst.$nextbottom.addClass("html5-hide");if(inst.$nexttouch)inst.$nexttouch.addClass("html5-hide")}};inst.clickHandler=function(){var $this=$(this);var dataoptions={};$.each($this.data(),function(key,value){dataoptions[key.toLowerCase()]=value});inst.options=$.extend(inst.options,inst.defaultoptions,dataoptions);$(window).trigger("html5lightbox.lightboxshow");inst.init();if(inst.elemArray.length<=
0)return true;inst.hideObjects();for(var i=0;i<inst.elemArray.length;i++)if(inst.elemArray[i][ELEM_HREF]==$this.attr("href"))break;if(i==inst.elemArray.length)return true;inst.options.curElem=i;inst.calcNextPrevElem();inst.reset();inst.$lightbox.show();var boxPos=inst.calcBoxPosition(inst.options.loadingwidth,inst.options.loadingheight);var boxW=boxPos[0];var boxH=boxPos[1];var boxT=boxPos[2];if(inst.options.iequirksmode)inst.$lightboxBox.css({"top":boxT});else inst.$lightboxBox.css({"margin-top":boxT});
if(inst.options.titlestyle=="left"||inst.options.titlestyle=="right")inst.$lightboxBox.css({"width":boxW,"height":boxH});else{inst.$lightboxBox.css({"width":boxW,"height":"auto"});inst.$elemWrap.css({"width":boxW,"height":boxH})}inst.loadCurElem();return false};inst.loadThumbnail=function(src,index,title){var imgLoader=new Image;$(imgLoader).on("load",function(){var style;if(this.width/this.height<=inst.options.thumbwidth/inst.options.thumbheight)style="width:100%;";else style="height:100%;";$(".html5-nav-thumb").eq(index).html("<img   alt='"+
inst.html2Text(title)+"' style='"+style+"' src='"+src+"' />")});imgLoader.src=src};inst.matchGroup=function(curGroup,elemGroup){if(inst.options.showall)return true;if(!curGroup||!elemGroup)return false;var curs=curGroup.split(":");var elems=elemGroup.split(":");var result=false;for(var i in curs)if($.inArray(curs[i],elems)>-1){result=true;break}return result};inst.showNavigation=function(){if(!inst.options.shownavigation)return;if(!inst.currentElem||!inst.currentElem[ELEM_GROUP])return;var i;var showNav=
false;var group=inst.currentElem[ELEM_GROUP];for(i=0;i<inst.elemArray.length;i++)if(inst.matchGroup(group,inst.elemArray[i][ELEM_GROUP]))if(inst.elemArray[i][ELEM_THUMBNAIL]&&inst.elemArray[i][ELEM_THUMBNAIL].length>0){showNav=true;break}if(!showNav)return;inst.options.navheight=inst.options.thumbheight+inst.options.thumbtopmargin+inst.options.thumbbottommargin;if($(".html5-nav").length>0)return;var posCss=inst.options.hidenavdefault?"top:100%;bottom:auto;left:0;right:0;":"top:auto;bottom:0;left:0;right:0;";
var posType=inst.options.positionFixed?"fixed":"absolute";$("body").append("<div class='html5-nav' style='display:block;position:"+posType+";"+posCss+"width:100%;height:"+inst.options.navheight+"px;z-index:9999999;"+(inst.options.navbgcolor?"background-color:"+inst.options.navbgcolor+";":"")+"'>"+"<div class='html5-nav-container' style='position:relative;margin:"+inst.options.thumbtopmargin+"px auto "+inst.options.thumbbottommargin+"px;'>"+"<div class='html5-nav-prev' style='display:block;position:absolute;cursor:pointer;width:"+
inst.options.navbuttonwidth+'px;height:100%;left:0;top:0;background:url("'+inst.options.navarrowsprevimage+"\") no-repeat left center;'></div>"+"<div class='html5-nav-mask' style='display:block;position:relative;margin:0 auto;overflow:hidden;'>"+"<div class='html5-nav-list'></div>"+"</div>"+"<div class='html5-nav-next' style='display:block;position:absolute;cursor:pointer;width:"+inst.options.navbuttonwidth+'px;height:100%;right:0;top:0;background:url("'+inst.options.navarrowsnextimage+"\") no-repeat right center;'></div>"+
"</div>"+"</div>");inst.navvisible=inst.options.hidenavdefault?false:true;if(inst.options.shownavcontrol){$(".html5-nav").append('<div class="html5-nav-showcontrol" style="position:absolute;display:block;cursor:pointer;bottom:100%;right:12px;margin:0;padding:0;"><img   alt="" src="'+inst.options.navcontrolimage+'"></div>');$(".html5-nav-showcontrol").click(function(){var winH=$(window).height();var navH=$(".html5-nav").height();if(inst.navvisible){inst.navvisible=false;$(".html5-nav").css({top:winH-
navH+"px",bottom:"auto"}).animate({top:winH+"px"},function(){$(this).css({top:"100%",bottom:"auto"})})}else{inst.navvisible=true;var navH=$(".html5-nav").height();$(".html5-nav").css({top:winH+"px",bottom:"auto"}).animate({top:winH-navH+"px"},function(){$(this).css({top:"auto",bottom:0})})}inst.resizeWindow()})}var index=0;for(i=0;i<inst.elemArray.length;i++)if(inst.matchGroup(group,inst.elemArray[i][ELEM_GROUP]))if(inst.elemArray[i][ELEM_THUMBNAIL]&&inst.elemArray[i][ELEM_THUMBNAIL].length>0){$(".html5-nav-list").append("<div class='html5-nav-thumb' data-arrayindex='"+
i+"' style='float:left;overflow:hidden;cursor:pointer;opacity:"+inst.options.thumbopacity+";margin: 0 "+inst.options.thumbgap/2+"px;width:"+inst.options.thumbwidth+"px;height:"+inst.options.thumbheight+"px;border:"+inst.options.thumbborder+"px solid "+inst.options.thumbbordercolor+";'></div>");this.loadThumbnail(inst.elemArray[i][ELEM_THUMBNAIL],index,inst.elemArray[i][ELEM_TITLE]);index++}$(".html5-nav-thumb").hover(function(){$(this).css({opacity:1});$(this).css({border:inst.options.thumbborder+
"px solid "+inst.options.thumbhighlightbordercolor})},function(){$(this).css({opacity:inst.options.thumbopacity});$(this).css({border:inst.options.thumbborder+"px solid "+inst.options.thumbbordercolor})});$(".html5-nav-thumb").click(function(){var index=$(this).data("arrayindex");if(index>=0)inst.gotoSlide(index)});inst.options.totalwidth=index*(inst.options.thumbgap+inst.options.thumbwidth+2*inst.options.thumbborder);$(".html5-nav-list").css({display:"block",position:"relative","margin-left":0,width:inst.options.totalwidth+
"px"}).append("<div style='clear:both;'></div>");var $navMask=$(".html5-nav-mask");var $navPrev=$(".html5-nav-prev");var $navNext=$(".html5-nav-next");$navPrev.click(function(){var $navList=$(".html5-nav-list");var $navNext=$(".html5-nav-next");var winWidth=$(window).width();var maskWidth=winWidth-2*inst.options.navbuttonwidth;var marginLeft=parseInt($navList.css("margin-left"))+maskWidth;if(marginLeft>=0){marginLeft=0;$(this).css({"background-position":"center left"})}else $(this).css({"background-position":"center right"});
if(marginLeft<=maskWidth-inst.options.totalwidth)$navNext.css({"background-position":"center left"});else $navNext.css({"background-position":"center right"});$navList.animate({"margin-left":marginLeft})});$navNext.click(function(){var $navList=$(".html5-nav-list");var $navPrev=$(".html5-nav-prev");var winWidth=$(window).width();var maskWidth=winWidth-2*inst.options.navbuttonwidth;var marginLeft=parseInt($navList.css("margin-left"))-maskWidth;if(marginLeft<=maskWidth-inst.options.totalwidth){marginLeft=
maskWidth-inst.options.totalwidth;$(this).css({"background-position":"center left"})}else $(this).css({"background-position":"center right"});if(marginLeft>=0)$navPrev.css({"background-position":"center left"});else $navPrev.css({"background-position":"center right"});$navList.animate({"margin-left":marginLeft})});var winWidth=$(window).width();if(inst.options.totalwidth<=winWidth){$navMask.css({width:inst.options.totalwidth+"px"});$navPrev.hide();$navNext.hide()}else{$navMask.css({width:winWidth-
2*inst.options.navbuttonwidth+"px"});$navPrev.show();$navNext.show()}};inst.loadElem=function(elem){inst.currentElem=elem;inst.showing=true;if(inst.options.bodynoscroll)$("html,body").addClass("bodynoscroll");if(!(inst.options.showtitle&&inst.currentElem[ELEM_TITLE]&&inst.currentElem[ELEM_TITLE].length>0||inst.options.showdescription&&inst.currentElem[ELEM_DESCRIPTION]&&inst.currentElem[ELEM_DESCRIPTION].length>0||inst.options.inGroup&&(inst.options.showplaybutton||inst.options.showtitleprefix)))inst.options.barheight=
0;inst.showNavigation();inst.$elem.off("mouseenter").off("mouseleave").off("mousemove");inst.$loading.show();if(inst.options.onshowitem&&window[inst.options.onshowitem]&&typeof window[inst.options.onshowitem]=="function")window[inst.options.onshowitem](elem);if((inst.options.transition=="slide"||inst.options.transition=="crossfade")&&inst.existingElem>=0){$(".html5-elem-box-previous").remove();var newitem=inst.$elem.clone();newitem.insertAfter(inst.$elem);inst.$prevelem=inst.$elem;inst.$elem=newitem;
inst.$prevelem.addClass("html5-elem-box-previous");inst.$elem.addClass("html5-elem-box-current");inst.$elemWrap=$(".html5-elem-wrap",inst.$elem);inst.$loading=$(".html5-loading",inst.$elem);inst.$error=$(".html5-error-box",inst.$elem);inst.$image=$(".html5-image",inst.$elem);inst.$elemData=$(".html5-elem-data-box",inst.$elem);inst.$text=$(".html5-text",inst.$elem);inst.$elem.css({position:"absolute",top:0,left:inst.options.transition=="slide"?inst.direction==-1?"100%":"-100%":0,opacity:0,height:"auto"});
inst.$prevelem.css({width:inst.$prevelem.width()+"px",height:inst.$prevelem.height()+"px"})}switch(elem[ELEM_TYPE]){case 0:var imgLoader=new Image;$(imgLoader).on("load",function(){elem[ELEM_ORIGINALWIDTH]=imgLoader.width;elem[ELEM_ORIGINALHEIGHT]=imgLoader.height;inst.showImage(elem,imgLoader.width,imgLoader.height)});$(imgLoader).on("error",function(){inst.showError()});imgLoader.src=elem[ELEM_HREF];break;case 1:inst.showSWF(elem);break;case 2:case 8:inst.showVideo(elem);break;case 3:case 4:case 9:case 11:case 12:inst.showYoutubeVimeo(elem);
break;case 5:inst.showPDF(elem);break;case 6:inst.showMP3(elem);break;case 7:inst.showWeb(elem);break;case 10:inst.showDiv(elem);break}if(inst.options.googleanalyticsaccount&&window._gaq)window._gaq.push(["_trackEvent","Lightbox","Open",elem[ELEM_HREF]]);if(inst.options.preload){if(inst.options.nextElem>=0&&inst.elemArray[inst.options.nextElem][ELEM_TYPE]==0)(new Image).src=inst.elemArray[inst.options.nextElem][ELEM_HREF];if(inst.options.prevElem>=0&&inst.elemArray[inst.options.prevElem][ELEM_TYPE]==
0)(new Image).src=inst.elemArray[inst.options.prevElem][ELEM_HREF]}};inst.loadCurElem=function(){inst.loadElem(inst.elemArray[inst.options.curElem])};inst.showError=function(){inst.$loading.hide();inst.resizeLightbox(inst.options.errorwidth,inst.options.errorheight,true,function(){inst.$loading.hide();inst.$error.show();inst.$elem.fadeIn(inst.options.fadespeed,function(){inst.showData()})})};inst.calcTextWidth=function(objW){return objW-36};inst.showTitle=function(w,t,description){if(inst.options.titlestyle==
"inside")inst.$elemData.css({width:w+"px"});var text="";if(inst.options.showtitle)if(t&&t.length>0)text+=t;if(inst.options.inGroup){if(inst.options.showtitleprefix)text="<span class='html5-title-prefix'>"+inst.options.titleprefix.replace("%NUM",inst.options.groupIndex+1).replace("%TOTAL",inst.options.groupCount)+"</span> <span class='html5-title-caption'>"+text+"</span>";if(inst.options.showplaybutton)text="<div class='html5-playpause' style='display:inline-block;cursor:pointer;vertical-align:middle;'><div class='html5-play' style='display:block;'><img   alt='' src='"+
inst.options.playimage+"'></div><div class='html5-pause' style='display:none;'><img   alt='' src='"+inst.options.pauseimage+"'></div></div> "+text}if(text.length>0)text='<div class="html5-title">'+text+"</div>";if(inst.options.showdescription&&description&&description.length>0)text+='<div class="html5-description">'+description+"</div>";inst.$text.html(text);if(inst.options.inGroup&&inst.options.showplaybutton){if(inst.autosliding){$(".html5-play",inst.$lightbox).hide();$(".html5-pause",inst.$lightbox).show()}else{$(".html5-play",
inst.$lightbox).show();$(".html5-pause",inst.$lightbox).hide()}$(".html5-play",inst.$lightbox).click(function(){$(".html5-play",inst.$lightbox).hide();$(".html5-pause",inst.$lightbox).show();if(inst.slideTimeout){inst.slideTimeout.stop();inst.slideTimeout.start();inst.autosliding=true}});$(".html5-pause",inst.$lightbox).click(function(){$(".html5-play",inst.$lightbox).show();$(".html5-pause",inst.$lightbox).hide();if(inst.slideTimeout){inst.slideTimeout.stop();inst.autosliding=false}})}$("#html5-social",
inst.$lightbox).show();if(inst.options.showsocialmedia)if(inst.currentElem[ELEM_SOCIALMEDIA])if($("#html5-socialmedia",inst.$lightboxBox).length>0)$("#html5-socialmedia",inst.$lightboxBox).html(inst.currentElem[ELEM_SOCIALMEDIA]);else inst.$lightboxBox.append('<div id="html5-socialmedia" style="'+inst.options.socialmediaposition+'">'+inst.currentElem[ELEM_SOCIALMEDIA]+"</div>");else if($("#html5-socialmedia",inst.$lightboxBox).length>0)$("#html5-socialmedia",inst.$lightboxBox).remove()},inst.showImage=
function(elem,imgW,imgH){var elemW,elemH;if(elem[ELEM_WIDTH])elemW=elem[ELEM_WIDTH];else{elemW=imgW;elem[ELEM_WIDTH]=imgW}if(elem[ELEM_HEIGHT])elemH=elem[ELEM_HEIGHT];else{elemH=imgH;elem[ELEM_HEIGHT]=imgH}var sizeObj=inst.calcElemSize({w:elemW,h:elemH},inst.options.imagekeepratio);inst.resizeLightbox(sizeObj.w,sizeObj.h,true,function(){inst.$loading.hide();inst.showTitle(sizeObj.w,elem[ELEM_TITLE],elem[ELEM_DESCRIPTION]);var timercode=!inst.options.showtimer||!inst.options.inGroup?"":"<div class='html5-timer' style='display:none;position:absolute;"+
inst.options.timerposition+":0;left:0;width:0;height:"+inst.options.timerheight+"px;background-color:"+inst.options.timercolor+";opacity:"+inst.options.timeropacity+";'></div>";var titlecode=elem[ELEM_WEBLINKTEXT]&&elem[ELEM_WEBLINKTEXT].length>0?" title='"+elem[ELEM_WEBLINKTEXT].replace(/'/g,"&#39;")+"'":"";var targetcode=elem[ELEM_WEBLINKTARGET]&&elem[ELEM_WEBLINKTARGET].length>0?" target='"+elem[ELEM_WEBLINKTARGET]+"'":"";var linkcode=elem[ELEM_WEBLINK]&&elem[ELEM_WEBLINK].length>0?"<a href='"+
elem[ELEM_WEBLINK]+"'"+titlecode+targetcode+">":"";var linkcodeafter=elem[ELEM_WEBLINK]&&elem[ELEM_WEBLINK].length>0?"</a>":"";inst.$image.hide();inst.$image.html("<div class='html5-image-container' style='display:block;position:relative;width:100%;height:100%;"+(inst.options.imagekeepratio?"overflow:hidden;":"overflow:auto;")+"'>"+linkcode+"<img   class='html5-image-img' alt='"+inst.html2Text(elem[ELEM_TITLE])+"' src='"+elem[ELEM_HREF]+"' width='100%' height='"+(inst.options.imagekeepratio?"100%":
"auto")+"' />"+linkcodeafter+timercode+"</div>");inst.$image.fadeIn(inst.options.fadespeed);inst.showData();if(inst.autosliding){inst.slideTimeout.stop();inst.slideTimeout.start()}})};inst.showSWF=function(elem){var dataW=elem[ELEM_WIDTH]?elem[ELEM_WIDTH]:inst.options.defaultwidth;var dataH=elem[ELEM_HEIGHT]?elem[ELEM_HEIGHT]:inst.options.defaultheight;var sizeObj=inst.calcElemSize({w:dataW,h:dataH},true);dataW=sizeObj.w;dataH=sizeObj.h;inst.resizeLightbox(dataW,dataH,true,function(){inst.$loading.hide();
inst.showTitle(sizeObj.w,elem[ELEM_TITLE],elem[ELEM_DESCRIPTION]);inst.$image.html("<div class='html5lightbox-swf' style='display:block;width:100%;height:100%;'></div>").show();inst.embedFlash($(".html5lightbox-swf",inst.$image),elem[ELEM_HREF],"window",{width:dataW,height:dataH});inst.$elem.show();inst.showData();if(inst.autosliding){inst.slideTimeout.stop();inst.slideTimeout.start()}})};inst.showVideo=function(elem){inst.slideTimeout.stop();var dataW=elem[ELEM_WIDTH]?elem[ELEM_WIDTH]:inst.options.defaultwidth;
var dataH=elem[ELEM_HEIGHT]?elem[ELEM_HEIGHT]:inst.options.defaultheight;var sizeObj=inst.calcElemSize({w:dataW,h:dataH},true);dataW=sizeObj.w;dataH=sizeObj.h;inst.resizeLightbox(dataW,dataH,true,function(){inst.$loading.hide();inst.showTitle(sizeObj.w,elem[ELEM_TITLE],elem[ELEM_DESCRIPTION]);inst.$image.html("<div class='html5lightbox-video' style='display:block;width:100%;height:100%;overflow:hidden;background-color:"+inst.options.videobgcolor+";'></div>").show();var isHTML5=false;if(inst.options.isIE678||
elem[ELEM_TYPE]==8||inst.options.isIE9&&inst.options.useflashonie9||inst.options.isIE10&&inst.options.useflashonie10||inst.options.isIE11&&inst.options.useflashonie11)isHTML5=false;else if(inst.options.isMobile)isHTML5=true;else if((inst.options.html5player||!inst.options.flashInstalled)&&inst.options.html5VideoSupported){isHTML5=true;if(inst.options.isFirefox||inst.options.isOpera)if(!elem[ELEM_HREF_WEBM]&&!elem[ELEM_HREF_OGG]&&(!inst.options.canplaymp4||inst.options.useflashformp4onfirefox))isHTML5=
false}if(isHTML5){var videoSrc=elem[ELEM_HREF];if(inst.options.isFirefox||inst.options.isOpera)if(elem[ELEM_HREF_WEBM])videoSrc=elem[ELEM_HREF_WEBM];else if(elem[ELEM_HREF_OGG])videoSrc=elem[ELEM_HREF_OGG];inst.embedHTML5Video($(".html5lightbox-video",inst.$image),videoSrc,inst.options.autoplay,inst.options.loopvideo);if(elem[ELEM_WEBLINK]&&elem[ELEM_WEBLINK].length>0)$(".html5-lightbox-video",inst.$image).css({cursor:"pointer"}).click(function(){if(elem[ELEM_WEBLINKTARGET]&&elem[ELEM_WEBLINKTARGET].length>
0)window.open(elem[ELEM_WEBLINK],elem[ELEM_WEBLINKTARGET]);else window.open(elem[ELEM_WEBLINK])})}else{var videoFile=elem[ELEM_HREF];if(videoFile.charAt(0)!="/"&&videoFile.substring(0,5)!="http:"&&videoFile.substring(0,6)!="https:")videoFile=inst.options.htmlfolder+videoFile;inst.embedFlash($(".html5lightbox-video",inst.$image),inst.options.jsfolder+"html5boxplayer.swf","transparent",{width:dataW,height:dataH,jsobjectname:"html5Lightbox",hidecontrols:inst.options.videohidecontrols?"1":"0",hideplaybutton:"0",
videofile:videoFile,hdfile:"",ishd:"0",defaultvolume:inst.options.defaultvideovolume,autoplay:inst.options.autoplay?"1":"0",loop:inst.options.loopvideo?"1":"0",errorcss:".html5box-error"+inst.options.errorcss,id:0})}inst.$elem.show();inst.showData()})};inst.loadNext=function(){$(window).trigger("html5lightbox.videofinished");if(inst.autosliding)inst.gotoSlide(-1);else if(inst.options.autoclose)setTimeout(function(){inst.finish()},inst.options.autoclosedelay)};inst.getYoutubeParams=function(href){var result=
{};if(href.indexOf("?")<0)return result;var params=href.substring(href.indexOf("?")+1).split("&");for(var i=0;i<params.length;i++){var value=params[i].split("=");if(value&&value.length==2&&value[0].toLowerCase()!="v")result[value[0].toLowerCase()]=value[1]}return result};inst.getYoutubeId=function(href){var youtubeId="";var regExp=/^.*((youtu.be\/)|(v\/)|(\/u\/\w\/)|(embed\/)|(watch\??v?=?))([^#\&\?]*).*/;var match=href.match(regExp);if(match&&match[7]&&match[7].length==11)youtubeId=match[7];return youtubeId};
inst.prepareYoutubeHref=function(href){var youtubeId=inst.getYoutubeId(href);var protocol="https:";var result=protocol+"//www.youtube.com/embed/"+youtubeId;var params=this.getYoutubeParams(href);var first=true;for(var key in params){if(first){result+="?";first=false}else result+="&";result+=key+"="+params[key]}return result};inst.prepareDailymotionHref=function(href){if(href.match(/\:\/\/.*(dai\.ly)/i)){var protocol="https:";var id=href.match(/(dai\.ly\/)([a-zA-Z0-9\-\_]+)/)[2];href=protocol+"//www.dailymotion.com/embed/video/"+
id}return href};inst.showYoutubeVimeo=function(elem){inst.slideTimeout.stop();var dataW=elem[ELEM_WIDTH]?elem[ELEM_WIDTH]:inst.options.defaultwidth;var dataH=elem[ELEM_HEIGHT]?elem[ELEM_HEIGHT]:inst.options.defaultheight;var sizeObj=inst.calcElemSize({w:dataW,h:dataH},true);dataW=sizeObj.w;dataH=sizeObj.h;if(inst.options.noresizecallback){inst.resizeLightbox(dataW,dataH,true,function(){inst.showData()});inst.showYouTubeVimeoCallback(elem,sizeObj)}else inst.resizeLightbox(dataW,dataH,true,function(){inst.showYouTubeVimeoCallback(elem,
sizeObj);inst.showData()})};inst.showYouTubeVimeoCallback=function(elem,sizeObj){inst.$loading.hide();inst.showTitle(sizeObj.w,elem[ELEM_TITLE],elem[ELEM_DESCRIPTION]);inst.$image.html("<div class='html5lightbox-video' style='display:block;width:100%;height:100%;overflow:hidden;'></div>").show();var href=elem[ELEM_HREF];var youtubeid="";if(elem[ELEM_TYPE]==3){youtubeid=inst.getYoutubeId(href);href=inst.prepareYoutubeHref(href)}if(elem[ELEM_TYPE]==9)href=inst.prepareDailymotionHref(href);if(inst.options.autoplay){href+=
href.indexOf("?")<0?"?":"&";if(elem[ELEM_TYPE]==11)href+="autoPlay=true";else href+="autoplay=1"}if(inst.options.loopvideo){href+=href.indexOf("?")<0?"?":"&";switch(elem[ELEM_TYPE]){case 3:href+="loop=1&playlist="+youtubeid;break;case 4:case 9:href+="loop=1";break;case 11:href+="endVideoBehavior=loop";break}}if(elem[ELEM_TYPE]==3){if(href.indexOf("?")<0)href+="?wmode=transparent&rel=0";else href+="&wmode=transparent&rel=0";if(inst.options.videohidecontrols)href+="&controls=0&showinfo=0";href+="&enablejsapi=1&origin="+
document.location.protocol+"//"+document.location.hostname}else if(elem[ELEM_TYPE]==4){href+=href.indexOf("?")<0?"?":"&";href+="api=1&player_id=html5boxiframevideo"+inst.options.curElem}$(".html5lightbox-video",inst.$image).html("<iframe style='margin:0;padding:0;border:0;' class='html5boxiframevideo' id='html5boxiframevideo"+inst.options.curElem+"' width='100%' height='100%' src='"+href+"' frameborder='0' webkitAllowFullScreen mozallowfullscreen allowFullScreen></iframe>");inst.$elem.show();if(elem[ELEM_TYPE]==
3&&typeof YT==="object"&&typeof YT.Player==="function")inst.ytplayer=new YT.Player("html5boxiframevideo"+inst.options.curElem,{events:{"onStateChange":function(event){if(event.data==YT.PlayerState.ENDED){$(window).trigger("html5lightbox.videofinished");if(inst.autosliding)inst.gotoSlide(-1);else if(inst.options.autoclose)setTimeout(function(){inst.finish()},inst.options.autoclosedelay)}}}});else if(elem[ELEM_TYPE]==4&&typeof $f==="function"){var vimeoIframe=$("#html5boxiframevideo"+inst.options.curElem)[0];
inst.vimeoPlayer=$f(vimeoIframe);inst.vimeoPlayer.addEvent("ready",function(){inst.vimeoPlayer.addEvent("finish",function(id){$(window).trigger("html5lightbox.videofinished");if(inst.autosliding)inst.gotoSlide(-1);else if(inst.options.autoclose)setTimeout(function(){inst.finish()},inst.options.autoclosedelay)})})}};inst.showPDF=function(elem){if(inst.options.enablepdfjs){if(inst.options.isIPhone&&inst.options.openpdfinnewtaboniphone||inst.options.isIPad&&inst.options.openpdfinnewtabonipad){var win=
window.open(elem[ELEM_HREF],"_blank");win.focus();inst.finish();return}if(!inst.options.pdfjsengine)inst.options.pdfjsengine=inst.options.jsfolder+"pdfjs/web/viewer.html";var href=elem[ELEM_HREF];if(href.substring(0,5)!="http:"&&href.substring(0,6)!="https:")href=inst.absoluteUrl(href);var pdfelem=jQuery.extend(true,{},elem);pdfelem[ELEM_HREF]=inst.options.pdfjsengine+(inst.options.pdfjsengine.indexOf("?")<0?"?":"&")+"file="+encodeURIComponent(href);inst.showWeb(pdfelem)}else if(inst.options.isIPhone||
inst.options.isIPad||inst.options.isAndroid||inst.options.isIE||inst.options.isIE11){var win=window.open(elem[ELEM_HREF],"_blank");win.focus();inst.finish();return}else inst.showWeb(elem)};inst.showMP3=function(elem){};inst.showDiv=function(elem){var winWidth=$(window).width();var winH=$(window).height();var navH=inst.options.shownavigation&&inst.navvisible?inst.options.navheight:0;var dataW=elem[ELEM_WIDTH]?elem[ELEM_WIDTH]:inst.options.usedefaultsizeforcontent?inst.options.defaultwidth:winWidth;
var dataH=elem[ELEM_HEIGHT]?elem[ELEM_HEIGHT]:inst.options.usedefaultsizeforcontent?inst.options.defaultheight:winH-navH;var sizeObj=inst.calcElemSize({w:dataW,h:dataH},false);dataW=sizeObj.w;dataH=sizeObj.h;inst.resizeLightbox(dataW,dataH,true,function(){inst.$loading.hide();inst.showTitle(sizeObj.w,elem[ELEM_TITLE],elem[ELEM_DESCRIPTION]);inst.$image.html("<div class='html5lightbox-div' id='html5lightbox-div"+inst.options.curElem+"' style='display:block;width:100%;height:"+(inst.options.autoresizecontent?
"auto":"100%")+";"+(inst.options.isIOS?"-webkit-overflow-scrolling:touch;overflow-y:scroll;":"overflow:auto;")+"'></div>").show();var divID=elem[ELEM_HREF];if($(divID).length>0)$(divID).children().appendTo($("#html5lightbox-div"+inst.options.curElem,inst.$image));else $("#html5lightbox-div"+inst.options.curElem,inst.$image).html("<div class='html5-error'>The specified div ID does not exist.</div>");inst.$elem.show();inst.showData();if(inst.options.autoresizecontent)inst.resizeWindow();if(inst.autosliding){inst.slideTimeout.stop();
inst.slideTimeout.start()}})};inst.isSameDomain=function(href){if(href.substring(0,5)!="http:"&&href.substring(0,6)!="https:")return true;var link=document.createElement("a");link.setAttribute("href",href);var result=link.protocol==document.location.protocol&&link.host==document.location.host&&link.port==document.location.port;link=null;return result};inst.showWeb=function(elem){var winWidth=$(window).width();var winH=$(window).height();var navH=inst.options.shownavigation&&inst.navvisible?inst.options.navheight:
0;var dataW=elem[ELEM_WIDTH]?elem[ELEM_WIDTH]:inst.options.usedefaultsizeforcontent?inst.options.defaultwidth:winWidth;var dataH=elem[ELEM_HEIGHT]?elem[ELEM_HEIGHT]:inst.options.usedefaultsizeforcontent?inst.options.defaultheight:winH-navH;var sizeObj=inst.calcElemSize({w:dataW,h:dataH},false);dataW=sizeObj.w;dataH=sizeObj.h;inst.resizeLightbox(dataW,dataH,true,function(){inst.$loading.hide();inst.showTitle(sizeObj.w,elem[ELEM_TITLE],elem[ELEM_DESCRIPTION]);inst.$image.html("<div class='html5lightbox-web' style='display:block;width:100%;height:100%;"+
(inst.options.isIOS?"-webkit-overflow-scrolling:touch;overflow-y:scroll;":"")+"'></div>").show();$(".html5lightbox-web",inst.$image).html("<iframe style='margin:0;padding:0;border:0;' class='html5lightbox-web-iframe' width='100%' height='100%' src='"+elem[ELEM_HREF]+"' frameborder='0' webkitAllowFullScreen mozallowfullscreen allowFullScreen></iframe>");inst.$elem.show();inst.showData();if(inst.options.autoresizecontent&&inst.isSameDomain(elem[ELEM_HREF])){$(".html5lightbox-web-iframe",inst.$image).data("sameorigin",
true);$(".html5lightbox-web-iframe",inst.$image).on("load",function(){$(this).data("sameoriginloaded",true);inst.resizeWindow()})}if(inst.autosliding){inst.slideTimeout.stop();inst.slideTimeout.start()}})};inst.scrollBox=function(){};inst.resizeWindow=function(){if(!inst.currentElem)return;if(!inst.options.responsive)return;var winWidth=$(window).width();var winH=$(window).height();if(inst.options.responsivebarheight){if(winH<=inst.options.smallscreenheight)inst.options.barheight=inst.options.barheightonsmallheight;
else inst.options.barheight=inst.options.barheightoriginal;if(inst.options.titlestyle=="bottom"&&inst.options.barautoheight!="auto")inst.$elemData.css({height:inst.options.barheight+"px","max-height":inst.options.barheight+"px"})}if(!(inst.options.showtitle&&inst.currentElem[ELEM_TITLE]&&inst.currentElem[ELEM_TITLE].length>0||inst.options.showdescription&&inst.currentElem[ELEM_DESCRIPTION]&&inst.currentElem[ELEM_DESCRIPTION].length>0||inst.options.inGroup&&(inst.options.showplaybutton||inst.options.showtitleprefix)))inst.options.barheight=
0;var elemW,elemH,keepratio;if(inst.currentElem[ELEM_TYPE]==5||inst.currentElem[ELEM_TYPE]==7||inst.currentElem[ELEM_TYPE]==10){var navH=inst.options.shownavigation&&inst.navvisible?inst.options.navheight:0;elemW=inst.currentElem[ELEM_WIDTH]?inst.currentElem[ELEM_WIDTH]:inst.options.usedefaultsizeforcontent?inst.options.defaultwidth:winWidth;elemH=inst.currentElem[ELEM_HEIGHT]?inst.currentElem[ELEM_HEIGHT]:inst.options.usedefaultsizeforcontent?inst.options.defaultheight:winH-navH;keepratio=false}else{elemW=
inst.currentElem[ELEM_WIDTH]?inst.currentElem[ELEM_WIDTH]:inst.options.defaultwidth;elemH=inst.currentElem[ELEM_HEIGHT]?inst.currentElem[ELEM_HEIGHT]:inst.options.defaultheight;if(inst.currentElem[ELEM_TYPE]==0)keepratio=inst.options.imagekeepratio;else keepratio=true}var sizeObj=inst.calcElemSize({w:elemW,h:elemH},keepratio);var boxPos=inst.calcBoxPosition(sizeObj.w,sizeObj.h);var boxW=boxPos[0];var boxH=boxPos[1];var boxT=boxPos[2];inst.$lightboxBox.css({"margin-top":boxT});if(inst.options.titlestyle==
"left"||inst.options.titlestyle=="right")inst.$lightboxBox.css({"width":boxW,"height":boxH});else{inst.$lightboxBox.css({"width":boxW,"height":"auto"});inst.$elemWrap.css({"width":boxW,"height":boxH})}if(inst.options.titlestyle=="inside")inst.$elemData.css({width:sizeObj.w+"px"});if(inst.options.autoresizecontent&&(inst.currentElem[ELEM_TYPE]==5||inst.currentElem[ELEM_TYPE]==7||inst.currentElem[ELEM_TYPE]==10)){var resizeHeight=false;if(inst.currentElem[ELEM_TYPE]==7&&$(".html5lightbox-web-iframe",
inst.$lightbox).length>0&&$(".html5lightbox-web-iframe",inst.$lightbox).data("sameoriginloaded")){var iframe=$(".html5lightbox-web-iframe",inst.$lightbox)[0];if(iframe&&iframe.contentWindow&&iframe.contentWindow.document&&iframe.contentWindow.document.documentElement.offsetHeight)if(elemH>iframe.contentWindow.document.documentElement.offsetHeight){elemH=iframe.contentWindow.document.documentElement.offsetHeight;resizeHeight=true}}else if(inst.currentElem[ELEM_TYPE]==10&&$(".html5lightbox-div",inst.$lightbox).length>
0){var divH=$(".html5lightbox-div",inst.$lightbox).height();if(elemH>divH){elemH=divH;resizeHeight=true}}if(resizeHeight){sizeObj=inst.calcElemSize({w:elemW,h:elemH},keepratio);boxPos=inst.calcBoxPosition(sizeObj.w,sizeObj.h);boxW=boxPos[0];boxH=boxPos[1];boxT=boxPos[2];inst.$lightboxBox.css({"margin-top":boxT});if(inst.options.titlestyle=="left"||inst.options.titlestyle=="right")inst.$lightboxBox.css({"height":boxH});else{inst.$lightboxBox.css({"height":"auto"});inst.$elemWrap.css({"height":boxH})}}}if($(".html5-nav").length<=
0)return;$(".html5-nav-list").css({"margin-left":0});var $navMask=$(".html5-nav-mask");var $navPrev=$(".html5-nav-prev");var $navNext=$(".html5-nav-next");var winWidth=$(window).width();if(inst.options.totalwidth<=winWidth){$navMask.css({width:inst.options.totalwidth+"px"});$navPrev.hide();$navNext.hide()}else{$navMask.css({width:winWidth-2*inst.options.navbuttonwidth+"px"});$navPrev.show();$navNext.show()}};inst.calcElemSize=function(sizeObj,keepratio){if(!inst.options.responsive)return sizeObj;
var winWidth=$(window).width();winWidth=winWidth?winWidth:$(document).width();var winH=$(window).height();winH=winH?winH:$(document).height();if((inst.options.titlestyle=="left"||inst.options.titlestyle=="right")&&winWidth>inst.options.sidetobottomscreenwidth)sizeObj.w=sizeObj.w*100/inst.options.imagepercentage;var navH=inst.options.shownavigation&&inst.navvisible?inst.options.navheight:0;var topmargin=$(window).height()<inst.options.smallscreenheight?inst.options.bordertopmarginsmall:inst.options.bordertopmargin;
var h0=winH-navH-2*inst.options.bordersize-2*topmargin;if(inst.options.titlestyle=="bottom")h0-=inst.options.barheight;var w0=winWidth-2*inst.options.bordersize-2*inst.options.bordermargin;if(inst.options.fullscreenmode&&winWidth>inst.options.navarrowsbottomscreenwidth||(inst.options.isTouch&&inst.options.navarrowsalwaysshowontouch||inst.options.alwaysshownavarrows)&&winWidth>inst.options.navarrowsbottomscreenwidth)w0-=64;if((inst.options.titlestyle=="left"||inst.options.titlestyle=="right")&&winWidth<=
inst.options.sidetobottomscreenwidth||inst.options.notkeepratioonsmallheight&&winH<=inst.options.smallscreenheight)keepratio=false;if(inst.currentElem[ELEM_TYPE]==0&&keepratio){var ratio=inst.currentElem[ELEM_ORIGINALWIDTH]/inst.currentElem[ELEM_ORIGINALHEIGHT];sizeObj.h=Math.round(sizeObj.w/ratio);if(sizeObj.h>h0){sizeObj.w=Math.round(ratio*h0);sizeObj.h=h0}if(sizeObj.w>w0){sizeObj.h=Math.round(w0/ratio);sizeObj.w=w0}}else{if(sizeObj.h>h0){if(keepratio)sizeObj.w=Math.round(sizeObj.w*h0/sizeObj.h);
sizeObj.h=h0}else if(inst.options.maxheight)sizeObj.h=h0;if(sizeObj.w>w0){if(keepratio)sizeObj.h=Math.round(sizeObj.h*w0/sizeObj.w);sizeObj.w=w0}}return sizeObj};inst.showData=function(){if(inst.$text.text().length>0)inst.$elemData.show();if(inst.options.titlestyle=="bottom"||inst.options.titlestyle=="inside")inst.$lightboxBox.css({height:"auto"});if(inst.$text.text().length>0&&inst.options.titlestyle=="bottom")inst.$elemData.css({"max-height":inst.options.barheight+"px"});if(inst.options.positionFixed)$("#html5-lightbox-overlay",
inst.$lightbox).css({height:Math.max($(window).height(),$(document).height())});else $("#html5-lightbox-overlay",inst.$lightbox).css({height:"100%"});$(window).trigger("html5lightbox.lightboxopened")};inst.resizeLightbox=function(elemW,elemH,bAnimate,onFinish){inst.hideNavArrows();var boxPos=inst.calcBoxPosition(elemW,elemH);var boxW=boxPos[0];var boxH=boxPos[1];var boxT=boxPos[2];inst.$loading.hide();inst.$watermark.hide();if(inst.options.nextElem<=inst.options.curElem)if(inst.options.onlastitem&&
window[inst.options.onlastitem]&&typeof window[inst.options.onlastitem]=="function")window[inst.options.onlastitem](inst.currentElem);if(inst.options.prevElem>=inst.options.curElem)if(inst.options.onfirstitem&&window[inst.options.onfirstitem]&&typeof window[inst.options.onfirstitem]=="function")window[inst.options.onfirstitem](inst.currentElem);if(!inst.options.fullscreenmode&&(!inst.options.isTouch||!inst.options.navarrowsalwaysshowontouch)&&!inst.options.alwaysshownavarrows){inst.$lightboxBox.on("mouseenter mousemove",
function(){if(inst.options.arrowloop&&inst.options.prevElem>=0||!inst.options.arrowloop&&inst.options.prevElem>=0&&inst.options.prevElem<inst.options.curElem)inst.$prev.fadeIn();if(inst.options.arrowloop&&inst.options.nextElem>=0||!inst.options.arrowloop&&inst.options.nextElem>=0&&inst.options.nextElem>inst.options.curElem)inst.$next.fadeIn()});inst.$lightboxBox.on("mouseleave",function(){inst.$next.fadeOut();inst.$prev.fadeOut()})}var existingBoxT=parseInt(inst.$lightboxBox.css("margin-top"));inst.$lightboxBox.css({"margin-top":boxT});
var speed=bAnimate?inst.options.resizespeed:0;if(inst.options.fullscreenmode)speed=0;if((inst.options.transition=="slide"||inst.options.transition=="crossfade")&&inst.existingElem>=0)speed=0;if(inst.options.titlestyle=="left"||inst.options.titlestyle=="right"){if(boxW==inst.$lightboxBox.width()&&boxH==inst.$lightboxBox.height())speed=0;inst.$lightboxBox.animate({width:boxW},speed).animate({height:boxH},speed,function(){inst.onAnimateFinish(onFinish)})}else{if(boxW==inst.$elemWrap.width()&&boxH==inst.$elemWrap.height())speed=
0;inst.$lightboxBox.css({"width":boxW,"height":"auto"});if((inst.options.transition=="slide"||inst.options.transition=="crossfade")&&inst.existingElem>=0)if($(".html5-elem-box-previous",inst.$lightbox).length>0)$(".html5-elem-box-previous",inst.$lightbox).css({"margin-left":String(boxW/2-$(".html5-elem-box-previous",inst.$lightbox).width()/2)+"px",top:String(existingBoxT-boxT)+"px"});inst.$elemWrap.animate({width:boxW},speed).animate({height:boxH},speed,function(){inst.onAnimateFinish(onFinish)})}};
inst.onAnimateFinish=function(onFinish){inst.$loading.show();inst.$watermark.show();inst.$close.show();inst.$elem.css({"background-color":inst.options.bgcolor});onFinish();inst.finishCallback()};inst.finishCallback=function(){if((inst.options.transition=="slide"||inst.options.transition=="crossfade")&&inst.existingElem>=0)if(inst.options.transition=="slide"){inst.$prevelem.animate({left:inst.direction==-1?"-100%":"100%",opacity:0},{duration:inst.options.transitionduration});inst.$elem.animate({left:0,
opacity:1},{duration:inst.options.transitionduration,always:function(){inst.$prevelem.remove();inst.$elem.removeClass("html5-elem-box-current").css({position:"relative",height:"100%"})}})}else{inst.$prevelem.animate({opacity:0},{duration:inst.options.transitionduration});inst.$elem.animate({opacity:1},{duration:inst.options.transitionduration,always:function(){inst.$prevelem.remove();inst.$elem.removeClass("html5-elem-box-current").css({position:"relative",height:"100%"})}})}},inst.resetDiv=function(elemID){if(inst.elemArray.length>
0&&elemID>=0)if(inst.elemArray[elemID][ELEM_TYPE]==10){var divID=inst.elemArray[elemID][ELEM_HREF];if($(divID).length>0)$("#html5lightbox-div"+elemID).children().appendTo($(divID))}};inst.reset=function(){if(inst.options.stamp)inst.$watermark.hide();inst.showing=false;inst.$image.empty();inst.$text.empty();inst.$error.hide();inst.$loading.hide();inst.$image.hide();if(inst.options.titlestyle=="bottom"||inst.options.titlestyle=="inside")inst.$elemData.hide();if(!inst.options.fullscreenmode)inst.$close.hide();
inst.$elem.css({"background-color":""})};inst.resetNavigation=function(){inst.options.navheight=0;$(".html5-nav").remove();inst.navvisible=false};inst.finish=function(){inst.existingElem=-1;inst.resetDiv(inst.options.curElem);if($(".html5-lightbox-video",inst.$lightbox).length)$(".html5-lightbox-video",inst.$lightbox).attr("src","");$("head").find("style").each(function(){if($(this).data("creator")=="html5box-html5-lightbox")$(this).remove()});if(inst.options.bodynoscroll)$("html,body").removeClass("bodynoscroll");
inst.slideTimeout.stop();inst.reset();inst.resetNavigation();inst.$lightbox.remove();$("#html5box-html5-lightbox").remove();inst.showObjects();if(inst.options.oncloselightbox&&window[inst.options.oncloselightbox]&&typeof window[inst.options.oncloselightbox]=="function")window[inst.options.oncloselightbox](inst.currentElem);if(inst.onLightboxClosed&&typeof inst.onLightboxClosed=="function")inst.onLightboxClosed(inst.currentElem);$(window).trigger("html5lightbox.lightboxclosed")};inst.pauseSlide=function(){};
inst.playSlide=function(){};inst.gotoSlide=function(slide){inst.existingElem=inst.options.curElem;inst.direction=slide;inst.resetDiv(inst.options.curElem);if(slide==-1){if(inst.options.nextElem<0)return;inst.options.curElem=inst.options.nextElem}else if(slide==-2){if(inst.options.prevElem<0)return;inst.options.curElem=inst.options.prevElem}else if(slide>=0){inst.direction=slide>inst.options.curElem?-1:-2;inst.options.curElem=slide}if(inst.autosliding)inst.slideTimeout.stop();inst.calcNextPrevElem();
if(inst.options.transition!="slide"&&inst.options.transition!="crossfade")inst.reset();inst.loadCurElem();if(inst.options.titlestyle=="inside"&&inst.options.showonmouseoverinside&&inst.currentElem[ELEM_TYPE]!==0&&inst.options.showinsidetitleforimageonly)inst.$elemData.css({opacity:0})};inst.enableSwipe=function(){var preventDefault=inst.options.isAndroid&&(inst.options.swipepreventdefaultonandroid||inst.options.androidVersion>=0&&inst.options.androidVersion<=5)?true:false;inst.$lightboxBox.html5lightboxTouchSwipe({preventWebBrowser:preventDefault,
swipeDistance:inst.options.swipedistance,swipeLeft:function(){inst.gotoSlide(-1)},swipeRight:function(){inst.gotoSlide(-2)}})};inst.hideObjects=function(){$("select, embed, object").css({"visibility":"hidden"})};inst.showObjects=function(){$("select, embed, object").css({"visibility":"visible"})};inst.embedHTML5Video=function($container,src,autoplay,loopvideo){$container.html("<div style='display:block;width:100%;height:100%;position:relative;'><video class='html5-lightbox-video' width='100%' height='100%'"+
(inst.options.html5videoposter&&inst.options.html5videoposter.length>0?"poster='"+inst.options.html5videoposter+"'":"")+(autoplay?" autoplay":"")+(loopvideo?" loop":"")+(inst.options.nativehtml5controls&&!inst.options.videohidecontrols?" controls='controls'":"")+(inst.options.nativecontrolsnodownload?' controlsList="nodownload"':"")+" src='"+src+"'></div>");if(!inst.options.nativehtml5controls&&!inst.options.videohidecontrols){$("video",$container).data("src",src);$("video",$container).lightboxHTML5VideoControls(inst.options.skinsfolder,
inst,".html5-lightbox-video",inst.options.videohidecontrols,false,inst.options.defaultvideovolume,inst.options.nativecontrolsonfullscreen,inst.options.nativecontrolsnodownload,null)}$("video",$container).off("ended").on("ended",function(){$(window).trigger("html5lightbox.videofinished");if(inst.autosliding)inst.gotoSlide(-1);else if(inst.options.autoclose)setTimeout(function(){inst.finish()},inst.options.autoclosedelay)})};inst.embedFlash=function($container,src,wmode,flashVars){if(inst.options.flashInstalled){var htmlOptions=
{pluginspage:"http://www.adobe.com/go/getflashplayer",quality:"high",allowFullScreen:"true",allowScriptAccess:"always",type:"application/x-shockwave-flash"};htmlOptions.width="100%";htmlOptions.height="100%";htmlOptions.src=src;htmlOptions.flashVars=$.param(flashVars);htmlOptions.wmode=wmode;var htmlString="";for(var key in htmlOptions)htmlString+=key+"="+htmlOptions[key]+" ";$container.html("<embed "+htmlString+"/>")}else $container.html("<div class='html5lightbox-flash-error' style='display:block; position:relative;text-align:center; width:100%; left:0px; top:40%;'><div class='html5-error'><div>The required Adobe Flash Player plugin is not installed</div><br /><div style='display:block;position:relative;text-align:center;width:112px;height:33px;margin:0px auto;'><a href='http://www.adobe.com/go/getflashplayer'><img   src='http://www.adobe.com/images/shared/download_buttons/get_flash_player.gif' alt='Get Adobe Flash player' width='112' height='33'></img></a></div></div>")};
inst.checkType=function(href){if(!href)return-1;if(href.match(/\.(jpg|gif|png|bmp|jpeg)(.*)?$/i))return 0;if(href.match(/[^\.]\.(swf)\s*$/i))return 1;if(href.match(/\.(mp4|m4v|ogv|ogg|webm)(.*)?$/i))return 2;if(href.match(/\:\/\/.*(youtube\.com)/i)||href.match(/\:\/\/.*(youtu\.be)/i))return 3;if(href.match(/\:\/\/.*(vimeo\.com)/i))return 4;if(href.match(/\:\/\/.*(dailymotion\.com)/i)||href.match(/\:\/\/.*(dai\.ly)/i))return 9;if(href.match(/[^\.]\.(pdf)\s*$/i))return 5;if(href.match(/[^\.]\.(mp3)\s*$/i))return 6;
if(href.match(/[^\.]\.(flv)\s*$/i))return 8;if(href.match(/\#\w+/i))return 10;if(href.match(/\:\/\/.*(wistia)/i))return 11;return 7};inst.getURLParams=function(){var result={};var params=window.location.search.substring(1).split("&");for(var i=0;i<params.length;i++){var value=params[i].split("=");if(value&&value.length==2)result[value[0].toLowerCase()]=unescape(value[1])}return result};inst.absoluteUrl=function(href){var link=document.createElement("a");link.href=href;return link.protocol+"//"+link.host+
link.pathname+link.search+link.hash};inst.showLightboxObject=function(obj){if(obj)inst.showLightbox(obj.type,obj.href,obj.title,obj.width,obj.height,obj.webm,obj.ogg,obj.thumbnail,obj.description,obj.div,obj.originalwidth,obj.originalheight,obj.socialmedia,obj.weblink,obj.weblinktarget,obj.weblinktext,obj.group)};inst.showLightbox=function(type,href,title,width,height,webm,ogg,thumbnail,description,div,originalwidth,originalheight,socialmedia,weblink,weblinktarget,weblinktext,group){inst.options=
$.extend(inst.options,inst.defaultoptions);$(window).trigger("html5lightbox.lightboxshow");inst.init();inst.reset();inst.$lightbox.show();var boxPos=inst.calcBoxPosition(inst.options.loadingwidth,inst.options.loadingheight);var boxW=boxPos[0];var boxH=boxPos[1];var boxT=boxPos[2];inst.$lightboxBox.css({"margin-top":boxT});if(inst.options.titlestyle=="left"||inst.options.titlestyle=="right")inst.$lightboxBox.css({"width":boxW,"height":boxH});else{inst.$lightboxBox.css({"width":boxW,"height":"auto"});
inst.$elemWrap.css({"width":boxW,"height":boxH})}inst.loadElem(new Array(type,href,title,group,width,height,webm,ogg,thumbnail,description,div,originalwidth,originalheight,socialmedia,weblink,weblinktarget,weblinktext))};inst.addItem=function(href,title,group,width,height,webm,ogg,thumbnail,description,mediatype){type=mediatype&&mediatype>=0?mediatype:inst.checkType(href);inst.elemArray.push(new Array(type,href,title,group,width,height,webm,ogg,thumbnail,description))};inst.showItem=function(href){inst.options=
$.extend(inst.options,inst.defaultoptions);$(window).trigger("html5lightbox.lightboxshow");inst.init();if(inst.elemArray.length<=0)return true;inst.hideObjects();for(var i=0;i<inst.elemArray.length;i++)if(inst.elemArray[i][ELEM_HREF]==href)break;if(i==inst.elemArray.length)return true;inst.options.curElem=i;inst.calcNextPrevElem();inst.reset();inst.$lightbox.show();var boxPos=inst.calcBoxPosition(inst.options.loadingwidth,inst.options.loadingheight);var boxW=boxPos[0];var boxH=boxPos[1];var boxT=
boxPos[2];inst.$lightboxBox.css({"margin-top":boxT});if(inst.options.titlestyle=="left"||inst.options.titlestyle=="right")inst.$lightboxBox.css({"width":boxW,"height":boxH});else{inst.$lightboxBox.css({"width":boxW,"height":"auto"});inst.$elemWrap.css({"width":boxW,"height":boxH})}inst.loadCurElem();return false};inst.each(function(){var self=$(this);var nodeName=this.nodeName.toLowerCase();if(nodeName=="a"||nodeName=="area")self.off("click").click(inst.clickHandler);else self.find("a,area").each(function(){$(this).off("click").click(inst.clickHandler)});
var autoopen=false;var autoopendelay=0;if(typeof html5lightbox_options!="undefined"&&html5lightbox_options){if("autoopen"in html5lightbox_options)autoopen=html5lightbox_options.autoopen;if("autoopendelay"in html5lightbox_options)autoopendelay=html5lightbox_options.autoopendelay}autoopen=self.data("autoopen")?self.data("autoopen"):autoopen;autoopendelay=self.data("autoopendelay")?self.data("autoopendelay"):autoopendelay;if(autoopen){setTimeout(function(){self.click()},autoopendelay);return false}if(self.data("preloadonpageload")){var fileType=
"mediatype"in self.data()?self.data("mediatype"):inst.checkType(self.attr("href"));if(fileType==0){var preloaddelay=self.data("preloaddelay")?self.data("preloaddelay"):0;setTimeout(function(){(new Image).src=self.attr("href")},preloaddelay)}}});var urlParams=inst.getURLParams();if("html5lightboxshare"in urlParams){var shareUrl=decodeURIComponent(urlParams["html5lightboxshare"]);var shareLink=$('.html5lightbox[href="'+shareUrl+'"]');if(shareLink.length>0)shareLink.click()}if(inst.options.preloadallonpageload)setTimeout(function(){inst.each(function(){if(this.nodeName.toLowerCase()!=
"a"&&this.nodeName.toLowerCase()!="area")return;var fileType="mediatype"in $(this).data()?$(this).data("mediatype"):inst.checkType($(this).attr("href"));if(fileType!==0)return;(new Image).src=$(this).attr("href");if($(this).data("thumbnail"))(new Image).src=$(this).data("thumbnail")})},inst.options.preloadalldelay);return inst}})(jQuery);(function($){$.fn.html5lightboxTouchSwipe=function(options){var defaults={preventWebBrowser:false,swipeDistance:0,swipeLeft:null,swipeRight:null,swipeTop:null,swipeBottom:null};
if(options)$.extend(defaults,options);return this.each(function(){var startX=-1,startY=-1;var curX=-1,curY=-1;function touchStart(event){var e=event.originalEvent;if(e.targetTouches.length>=1){startX=e.targetTouches[0].pageX;startY=e.targetTouches[0].pageY}else touchCancel(event)}function touchMove(event){if(defaults.preventWebBrowser)event.preventDefault();var e=event.originalEvent;if(e.targetTouches.length>=1){curX=e.targetTouches[0].pageX;curY=e.targetTouches[0].pageY}else touchCancel(event)}function touchEnd(event){if(curX>
0||curY>0){triggerHandler();touchCancel(event)}else touchCancel(event)}function touchCancel(event){startX=-1;startY=-1;curX=-1;curY=-1}function triggerHandler(){if(Math.abs(curX-startX)>Math.abs(curY-startY)){if(Math.abs(curX-startX)>defaults.swipeDistance)if(curX>startX){if(defaults.swipeRight)defaults.swipeRight.call()}else if(defaults.swipeLeft)defaults.swipeLeft.call()}else if(Math.abs(curY-startY)>defaults.swipeDistance)if(curY>startY){if(defaults.swipeBottom)defaults.swipeBottom.call()}else if(defaults.swipeTop)defaults.swipeTop.call()}
try{$(this).on("touchstart",touchStart);$(this).on("touchmove",touchMove);$(this).on("touchend",touchEnd);$(this).on("touchcancel",touchCancel)}catch(e){}})}})(jQuery);(function($){$.fn.lightboxHTML5VideoControls=function(skinFolder,parentInst,videoElem,hideControls,hidePlayButton,defaultVolume,fullscreenNativeControls,html5VideoNoDownload,skinImages){var isTouch="ontouchstart"in window;var eStart=isTouch?"touchstart":"mousedown";var eMove=isTouch?"touchmove":"mousemove";var eCancel=isTouch?"touchcancel":
"mouseup";var eClick="click";var BUTTON_SIZE=32;var BAR_HEIGHT=isTouch?48:36;var hideControlsTimerId=null;var hideVolumeBarTimeoutId=null;var sliderDragging=false;var isFullscreen=false;var userActive=true;var isHd=$(this).data("ishd");var hd=$(this).data("hd");var src=$(this).data("src");var $videoObj=$(this);$videoObj.get(0).removeAttribute("controls");var $videoPlay=$("<div class='html5boxVideoPlay'></div>");$videoObj.after($videoPlay);var playbuttonImage=skinImages&&"playbutton"in skinImages&&
skinImages.playbutton.length>0?skinImages.playbutton:skinFolder+"html5boxplayer_playvideo.png";$videoPlay.css({position:"absolute",top:"50%",left:"50%",display:"block",cursor:"pointer",width:64,height:64,"margin-left":-32,"margin-top":-32,"background-image":"url('"+playbuttonImage+"')","background-position":"center center","background-repeat":"no-repeat"}).on(eClick,function(){$videoObj.get(0).play()});var $videoFullscreenBg=$("<div class='html5boxVideoFullscreenBg'></div>");var $videoControls=$("<div class='html5boxVideoControls'>"+
"<div class='html5boxVideoControlsBg'></div>"+"<div class='html5boxPlayPause'>"+"<div class='html5boxPlay'></div>"+"<div class='html5boxPause'></div>"+"</div>"+"<div class='html5boxTimeCurrent'>--:--</div>"+"<div class='html5boxFullscreen'></div>"+"<div class='html5boxHD'></div>"+"<div class='html5boxVolume'>"+"<div class='html5boxVolumeButton'></div>"+"<div class='html5boxVolumeBar'>"+"<div class='html5boxVolumeBarBg'>"+"<div class='html5boxVolumeBarActive'></div>"+"</div>"+"</div>"+"</div>"+"<div class='html5boxTimeTotal'>--:--</div>"+
"<div class='html5boxSeeker'>"+"<div class='html5boxSeekerBuffer'></div>"+"<div class='html5boxSeekerPlay'></div>"+"<div class='html5boxSeekerHandler'></div>"+"</div>"+"<div style='clear:both;'></div>"+"</div>");$videoObj.after($videoControls);$videoObj.after($videoFullscreenBg);$videoFullscreenBg.css({display:"none",position:"fixed",left:0,top:0,bottom:0,right:0});$videoControls.css({display:"block",position:"absolute",width:"100%",height:BAR_HEIGHT,left:0,bottom:0,right:0,margin:"0 auto"});var userActivate=
function(){userActive=true};$videoObj.on("touch click mousemove mouseenter",function(){userActive=true});if(!hideControls)setInterval(function(){if(userActive){$videoControls.show();userActive=false;clearTimeout(hideControlsTimerId);hideControlsTimerId=setTimeout(function(){if(!$videoObj.get(0).paused)$videoControls.fadeOut()},5E3)}},250);$(".html5boxVideoControlsBg",$videoControls).css({display:"block",position:"absolute",width:"100%",height:"100%",left:0,top:0,"background-color":"#000000",opacity:0.7,
filter:"alpha(opacity=70)"});$(".html5boxPlayPause",$videoControls).css({display:"block",position:"relative",width:BUTTON_SIZE+"px",height:BUTTON_SIZE+"px",margin:Math.floor((BAR_HEIGHT-BUTTON_SIZE)/2),"float":"left"});var $videoBtnPlay=$(".html5boxPlay",$videoControls);var $videoBtnPause=$(".html5boxPause",$videoControls);$videoBtnPlay.css({display:"block",position:"absolute",top:0,left:0,width:BUTTON_SIZE+"px",height:BUTTON_SIZE+"px",cursor:"pointer","background-image":"url('"+skinFolder+"html5boxplayer_playpause.png"+
"')","background-position":"top left"}).hover(function(){$(this).css({"background-position":"bottom left"})},function(){$(this).css({"background-position":"top left"})}).on(eClick,function(){$videoObj.get(0).play()});$videoBtnPause.css({display:"none",position:"absolute",top:0,left:0,width:BUTTON_SIZE+"px",height:BUTTON_SIZE+"px",cursor:"pointer","background-image":"url('"+skinFolder+"html5boxplayer_playpause.png"+"')","background-position":"top right"}).hover(function(){$(this).css({"background-position":"bottom right"})},
function(){$(this).css({"background-position":"top right"})}).on(eClick,function(){$videoObj.get(0).pause()});var $videoTimeCurrent=$(".html5boxTimeCurrent",$videoControls);var $videoTimeTotal=$(".html5boxTimeTotal",$videoControls);var $videoSeeker=$(".html5boxSeeker",$videoControls);var $videoSeekerPlay=$(".html5boxSeekerPlay",$videoControls);var $videoSeekerBuffer=$(".html5boxSeekerBuffer",$videoControls);var $videoSeekerHandler=$(".html5boxSeekerHandler",$videoControls);$videoTimeCurrent.css({display:"block",
position:"relative","float":"left","line-height":BAR_HEIGHT+"px","font-weight":"normal","font-size":"12px",margin:"0 8px","font-family":"Arial, Helvetica, sans-serif",color:"#fff"});$videoTimeTotal.css({display:"block",position:"relative","float":"right","line-height":BAR_HEIGHT+"px","font-weight":"normal","font-size":"12px",margin:"0 8px","font-family":"Arial, Helvetica, sans-serif",color:"#fff"});$videoSeeker.css({display:"block",cursor:"pointer",overflow:"hidden",position:"relative",height:"10px",
"background-color":"#222",margin:Math.floor((BAR_HEIGHT-10)/2)+"px 4px"}).on(eStart,function(e){var e0=isTouch?e.originalEvent.touches[0]:e;var pos=e0.pageX-$videoSeeker.offset().left;$videoSeekerPlay.css({width:pos});$videoObj.get(0).currentTime=pos*$videoObj.get(0).duration/$videoSeeker.width();$videoSeeker.on(eMove,function(e){var e0=isTouch?e.originalEvent.touches[0]:e;var pos=e0.pageX-$videoSeeker.offset().left;$videoSeekerPlay.css({width:pos});$videoObj.get(0).currentTime=pos*$videoObj.get(0).duration/
$videoSeeker.width()})}).on(eCancel,function(){$videoSeeker.off(eMove)});$videoSeekerBuffer.css({display:"block",position:"absolute",left:0,top:0,height:"100%","background-color":"#444"});$videoSeekerPlay.css({display:"block",position:"absolute",left:0,top:0,height:"100%","background-color":"#fcc500"});var $videoFSObj=fullscreenNativeControls?$videoObj:$videoObj.parent();if($videoFSObj.get(0).requestFullscreen||$videoFSObj.get(0).webkitRequestFullScreen||$videoFSObj.get(0).mozRequestFullScreen||$videoFSObj.get(0).webkitEnterFullScreen||
$videoFSObj.get(0).msRequestFullscreen){var switchScreen=function(fullscreen){if(fullscreen){if(fullscreenNativeControls){$videoObj.get(0).setAttribute("controls","controls");if(html5VideoNoDownload)$videoObj.get(0).setAttribute("controlsList","nodownload")}if($videoFSObj.get(0).requestFullscreen)$videoFSObj.get(0).requestFullscreen();else if($videoFSObj.get(0).webkitRequestFullScreen)$videoFSObj.get(0).webkitRequestFullScreen();else if($videoFSObj.get(0).mozRequestFullScreen)$videoFSObj.get(0).mozRequestFullScreen();
else if($videoFSObj.get(0).webkitEnterFullScreen)$videoFSObj.get(0).webkitEnterFullScreen();if($videoFSObj.get(0).msRequestFullscreen)$videoFSObj.get(0).msRequestFullscreen()}else if(document.cancelFullScreen)document.cancelFullScreen();else if(document.mozCancelFullScreen)document.mozCancelFullScreen();else if(document.webkitCancelFullScreen)document.webkitCancelFullScreen();else if(document.webkitExitFullscreen)document.webkitExitFullscreen();else if(document.msExitFullscreen)document.msExitFullscreen()};
var switchScreenCSS=function(fullscreen){if(fullscreenNativeControls)if(fullscreen){$videoObj.get(0).setAttribute("controls","controls");if(html5VideoNoDownload)$videoObj.get(0).setAttribute("controlsList","nodownload")}else $videoObj.get(0).removeAttribute("controls");else if(fullscreen){$(document).on("mousemove",userActivate);$videoControls.css({"z-index":2147483647,position:"fixed"});$videoFullscreenBg.css({"z-index":2147483647,display:"block"});$videoPlay.css({"z-index":2147483647})}else{$(document).off("mousemove",
userActivate);$videoControls.css({"z-index":"",position:"absolute"});$videoFullscreenBg.css({"z-index":"",display:"none"});$videoPlay.css({"z-index":""})}};document.addEventListener("MSFullscreenChange",function(){isFullscreen=document.msFullscreenElement!=null;switchScreenCSS(isFullscreen)},false);document.addEventListener("fullscreenchange",function(){isFullscreen=document.fullscreen;switchScreenCSS(isFullscreen)},false);document.addEventListener("mozfullscreenchange",function(){isFullscreen=document.mozFullScreen;
switchScreenCSS(isFullscreen)},false);document.addEventListener("webkitfullscreenchange",function(){isFullscreen=document.webkitIsFullScreen;switchScreenCSS(isFullscreen)},false);$videoFSObj.get(0).addEventListener("webkitbeginfullscreen",function(){isFullscreen=true;switchScreenCSS(isFullscreen)},false);$videoFSObj.get(0).addEventListener("webkitendfullscreen",function(){isFullscreen=false;switchScreenCSS(isFullscreen)},false);if(!fullscreenNativeControls)$("head").append("<style type='text/css'>video"+
videoElem+"::-webkit-media-controls { display:none !important; }</style>");var $videoFullscreen=$(".html5boxFullscreen",$videoControls);$videoFullscreen.css({display:"block",position:"relative","float":"right",width:BUTTON_SIZE+"px",height:BUTTON_SIZE+"px",margin:Math.floor((BAR_HEIGHT-BUTTON_SIZE)/2),cursor:"pointer","background-image":"url('"+skinFolder+"html5boxplayer_fullscreen.png"+"')","background-position":"left top"}).hover(function(){var backgroundPosX=$(this).css("background-position")?
$(this).css("background-position").split(" ")[0]:$(this).css("background-position-x");$(this).css({"background-position":backgroundPosX+" bottom"})},function(){var backgroundPosX=$(this).css("background-position")?$(this).css("background-position").split(" ")[0]:$(this).css("background-position-x");$(this).css({"background-position":backgroundPosX+" top"})}).on(eClick,function(){isFullscreen=!isFullscreen;switchScreen(isFullscreen)})}if(hd){var $videoHD=$(".html5boxHD",$videoControls);$videoHD.css({display:"block",
position:"relative","float":"right",width:BUTTON_SIZE+"px",height:BUTTON_SIZE+"px",margin:Math.floor((BAR_HEIGHT-BUTTON_SIZE)/2),cursor:"pointer","background-image":"url('"+skinFolder+"html5boxplayer_hd.png"+"')","background-position":(isHd?"right":"left")+" center"}).on(eClick,function(){isHd=!isHd;$(this).css({"background-position":(isHd?"right":"left")+" center"});parentInst.isHd=isHd;var isPaused=$videoObj.get(0).isPaused;$videoObj.get(0).setAttribute("src",(isHd?hd:src)+"#t="+$videoObj.get(0).currentTime);
if(!isPaused)$videoObj.get(0).play();else $videoObj.get(0).pause()})}$videoObj.get(0).volume=defaultVolume;var volumeSaved=defaultVolume==0?1:defaultVolume;var volume=$videoObj.get(0).volume;$videoObj.get(0).volume=volume/2+0.1;if($videoObj.get(0).volume===volume/2+0.1){$videoObj.get(0).volume=volume;var $videoVolume=$(".html5boxVolume",$videoControls);var $videoVolumeButton=$(".html5boxVolumeButton",$videoControls);var $videoVolumeBar=$(".html5boxVolumeBar",$videoControls);var $videoVolumeBarBg=
$(".html5boxVolumeBarBg",$videoControls);var $videoVolumeBarActive=$(".html5boxVolumeBarActive",$videoControls);$videoVolume.css({display:"block",position:"relative","float":"right",width:BUTTON_SIZE+"px",height:BUTTON_SIZE+"px",margin:Math.floor((BAR_HEIGHT-BUTTON_SIZE)/2)}).hover(function(){clearTimeout(hideVolumeBarTimeoutId);var volume=$videoObj.get(0).volume;$videoVolumeBarActive.css({height:Math.round(volume*100)+"%"});$videoVolumeBar.show()},function(){clearTimeout(hideVolumeBarTimeoutId);
hideVolumeBarTimeoutId=setTimeout(function(){$videoVolumeBar.hide()},1E3)});$videoVolumeButton.css({display:"block",position:"absolute",top:0,left:0,width:BUTTON_SIZE+"px",height:BUTTON_SIZE+"px",cursor:"pointer","background-image":"url('"+skinFolder+"html5boxplayer_volume.png"+"')","background-position":"top "+(volume>0?"left":"right")}).hover(function(){var backgroundPosX=$(this).css("background-position")?$(this).css("background-position").split(" ")[0]:$(this).css("background-position-x");$(this).css({"background-position":backgroundPosX+
" bottom"})},function(){var backgroundPosX=$(this).css("background-position")?$(this).css("background-position").split(" ")[0]:$(this).css("background-position-x");$(this).css({"background-position":backgroundPosX+" top"})}).on(eClick,function(){var volume=$videoObj.get(0).volume;if(volume>0){volumeSaved=volume;volume=0}else volume=volumeSaved;var backgroundPosY=$(this).css("background-position")?$(this).css("background-position").split(" ")[1]:$(this).css("background-position-y");$videoVolumeButton.css({"background-position":(volume>
0?"left":"right")+" "+backgroundPosY});$videoObj.get(0).volume=volume;$videoVolumeBarActive.css({height:Math.round(volume*100)+"%"})});$videoVolumeBar.css({display:"none",position:"absolute",left:4,bottom:"100%",width:24,height:80,"margin-bottom":Math.floor((BAR_HEIGHT-BUTTON_SIZE)/2),"background-color":"#000000",opacity:0.7,filter:"alpha(opacity=70)"});$videoVolumeBarBg.css({display:"block",position:"relative",width:10,height:68,margin:7,cursor:"pointer","background-color":"#222"});$videoVolumeBarActive.css({display:"block",
position:"absolute",bottom:0,left:0,width:"100%",height:"100%","background-color":"#fcc500"});$videoVolumeBarBg.on(eStart,function(e){var e0=isTouch?e.originalEvent.touches[0]:e;var vol=1-(e0.pageY-$videoVolumeBarBg.offset().top)/$videoVolumeBarBg.height();vol=vol>1?1:vol<0?0:vol;$videoVolumeBarActive.css({height:Math.round(vol*100)+"%"});$videoVolumeButton.css({"background-position":"left "+(vol>0?"top":"bottom")});$videoObj.get(0).volume=vol;$videoVolumeBarBg.on(eMove,function(e){var e0=isTouch?
e.originalEvent.touches[0]:e;var vol=1-(e0.pageY-$videoVolumeBarBg.offset().top)/$videoVolumeBarBg.height();vol=vol>1?1:vol<0?0:vol;$videoVolumeBarActive.css({height:Math.round(vol*100)+"%"});$videoVolumeButton.css({"background-position":"left "+(vol>0?"top":"bottom")});$videoObj.get(0).volume=vol})}).on(eCancel,function(){$videoVolumeBarBg.off(eMove)})}var calcTimeFormat=function(seconds){var h0=Math.floor(seconds/3600);var h=h0<10?"0"+h0:h0;var m0=Math.floor((seconds-h0*3600)/60);var m=m0<10?"0"+
m0:m0;var s0=Math.floor(seconds-(h0*3600+m0*60));var s=s0<10?"0"+s0:s0;var r=m+":"+s;if(h0>0)r=h+":"+r;return r};if(hidePlayButton)$videoPlay.hide();if(hideControls)$videoControls.hide();var onVideoPlay=function(){if(!hidePlayButton)$videoPlay.hide();if(!hideControls){$videoBtnPlay.hide();$videoBtnPause.show()}};var onVideoPause=function(){if(!hidePlayButton)$videoPlay.show();if(!hideControls){$videoControls.show();clearTimeout(hideControlsTimerId);$videoBtnPlay.show();$videoBtnPause.hide()}};var onVideoEnded=
function(){$(window).trigger("html5lightbox.videoended");if(!hidePlayButton)$videoPlay.show();if(!hideControls){$videoControls.show();clearTimeout(hideControlsTimerId);$videoBtnPlay.show();$videoBtnPause.hide()}};var onVideoUpdate=function(){var curTime=$videoObj.get(0).currentTime;if(curTime){$videoTimeCurrent.text(calcTimeFormat(curTime));var duration=$videoObj.get(0).duration;if(duration){$videoTimeTotal.text(calcTimeFormat(duration));if(!sliderDragging){var sliderW=$videoSeeker.width();var pos=
Math.round(sliderW*curTime/duration);$videoSeekerPlay.css({width:pos});$videoSeekerHandler.css({left:pos})}}}};var onVideoProgress=function(){if($videoObj.get(0).buffered&&$videoObj.get(0).buffered.length>0&&!isNaN($videoObj.get(0).buffered.end(0))&&!isNaN($videoObj.get(0).duration)){var sliderW=$videoSeeker.width();$videoSeekerBuffer.css({width:Math.round(sliderW*$videoObj.get(0).buffered.end(0)/$videoObj.get(0).duration)})}};try{$videoObj.on("play",onVideoPlay);$videoObj.on("pause",onVideoPause);
$videoObj.on("ended",onVideoEnded);$videoObj.on("timeupdate",onVideoUpdate);$videoObj.on("progress",onVideoProgress)}catch(e){}}})(jQuery);jQuery(document).ready(function(){if(typeof html5Lightbox==="undefined")html5Lightbox=jQuery(".html5lightbox").html5lightbox()})};

!function(t,e){"object"==typeof exports&&"undefined"!=typeof module?module.exports=e(require("jquery")):"function"==typeof define&&define.amd?define(["jquery"],e):t.parsley=e(t.jQuery)}(this,function(h){"use strict";function r(t){return(r="function"==typeof Symbol&&"symbol"==typeof Symbol.iterator?function(t){return typeof t}:function(t){return t&&"function"==typeof Symbol&&t.constructor===Symbol&&t!==Symbol.prototype?"symbol":typeof t})(t)}function o(){return(o=Object.assign||function(t){for(var e=1;e<arguments.length;e++){var i=arguments[e];for(var n in i)Object.prototype.hasOwnProperty.call(i,n)&&(t[n]=i[n])}return t}).apply(this,arguments)}function l(t,e){return function(t){if(Array.isArray(t))return t}(t)||function(t,e){var i=[],n=!0,r=!1,s=void 0;try{for(var a,o=t[Symbol.iterator]();!(n=(a=o.next()).done)&&(i.push(a.value),!e||i.length!==e);n=!0);}catch(t){r=!0,s=t}finally{try{n||null==o.return||o.return()}finally{if(r)throw s}}return i}(t,e)||function(){throw new TypeError("Invalid attempt to destructure non-iterable instance")}()}function u(t){return function(t){if(Array.isArray(t)){for(var e=0,i=new Array(t.length);e<t.length;e++)i[e]=t[e];return i}}(t)||function(t){if(Symbol.iterator in Object(t)||"[object Arguments]"===Object.prototype.toString.call(t))return Array.from(t)}(t)||function(){throw new TypeError("Invalid attempt to spread non-iterable instance")}()}var i,t=1,e={},d={attr:function(t,e,i){var n,r,s,a=new RegExp("^"+e,"i");if(void 0===i)i={};else for(n in i)i.hasOwnProperty(n)&&delete i[n];if(!t)return i;for(n=(s=t.attributes).length;n--;)(r=s[n])&&r.specified&&a.test(r.name)&&(i[this.camelize(r.name.slice(e.length))]=this.deserializeValue(r.value));return i},checkAttr:function(t,e,i){return t.hasAttribute(e+i)},setAttr:function(t,e,i,n){t.setAttribute(this.dasherize(e+i),String(n))},getType:function(t){return t.getAttribute("type")||"text"},generateID:function(){return""+t++},deserializeValue:function(e){var t;try{return e?"true"==e||"false"!=e&&("null"==e?null:isNaN(t=Number(e))?/^[\[\{]/.test(e)?JSON.parse(e):e:t):e}catch(t){return e}},camelize:function(t){return t.replace(/-+(.)?/g,function(t,e){return e?e.toUpperCase():""})},dasherize:function(t){return t.replace(/::/g,"/").replace(/([A-Z]+)([A-Z][a-z])/g,"$1_$2").replace(/([a-z\d])([A-Z])/g,"$1_$2").replace(/_/g,"-").toLowerCase()},warn:function(){var t;window.console&&"function"==typeof window.console.warn&&(t=window.console).warn.apply(t,arguments)},warnOnce:function(t){e[t]||(e[t]=!0,this.warn.apply(this,arguments))},_resetWarnings:function(){e={}},trimString:function(t){return t.replace(/^\s+|\s+$/g,"")},parse:{date:function(t){var e=t.match(/^(\d{4,})-(\d\d)-(\d\d)$/);if(!e)return null;var i=l(e.map(function(t){return parseInt(t,10)}),4),n=(i[0],i[1]),r=i[2],s=i[3],a=new Date(n,r-1,s);return a.getFullYear()!==n||a.getMonth()+1!==r||a.getDate()!==s?null:a},string:function(t){return t},integer:function(t){return isNaN(t)?null:parseInt(t,10)},number:function(t){if(isNaN(t))throw null;return parseFloat(t)},boolean:function(t){return!/^\s*false\s*$/i.test(t)},object:function(t){return d.deserializeValue(t)},regexp:function(t){var e="";return t=/^\/.*\/(?:[gimy]*)$/.test(t)?(e=t.replace(/.*\/([gimy]*)$/,"$1"),t.replace(new RegExp("^/(.*?)/"+e+"$"),"$1")):"^"+t+"$",new RegExp(t,e)}},parseRequirement:function(t,e){var i=this.parse[t||"string"];if(!i)throw'Unknown requirement specification: "'+t+'"';var n=i(e);if(null===n)throw"Requirement is not a ".concat(t,': "').concat(e,'"');return n},namespaceEvents:function(t,e){return(t=this.trimString(t||"").split(/\s+/))[0]?h.map(t,function(t){return"".concat(t,".").concat(e)}).join(" "):""},difference:function(t,i){var n=[];return h.each(t,function(t,e){-1==i.indexOf(e)&&n.push(e)}),n},all:function(t){return h.when.apply(h,u(t).concat([42,42]))},objectCreate:Object.create||(i=function(){},function(t){if(1<arguments.length)throw Error("Second argument not supported");if("object"!=r(t))throw TypeError("Argument must be an object");i.prototype=t;var e=new i;return i.prototype=null,e}),_SubmitSelector:'input[type="submit"], button:submit'},n={namespace:"data-parsley-",inputs:"input, textarea, select",excluded:"input[type=button], input[type=submit], input[type=reset], input[type=hidden]",priorityEnabled:!0,multiple:null,group:null,uiEnabled:!0,validationThreshold:3,focus:"first",trigger:!1,triggerAfterFailure:"input",errorClass:"parsley-error",successClass:"parsley-success",classHandler:function(t){},errorsContainer:function(t){},errorsWrapper:'<ul class="parsley-errors-list"></ul>',errorTemplate:"<li></li>"},s=function(){this.__id__=d.generateID()};s.prototype={asyncSupport:!0,_pipeAccordingToValidationResult:function(){var e=this,t=function(){var t=h.Deferred();return!0!==e.validationResult&&t.reject(),t.resolve().promise()};return[t,t]},actualizeOptions:function(){return d.attr(this.element,this.options.namespace,this.domOptions),this.parent&&this.parent.actualizeOptions&&this.parent.actualizeOptions(),this},_resetOptions:function(t){for(var e in this.domOptions=d.objectCreate(this.parent.options),this.options=d.objectCreate(this.domOptions),t)t.hasOwnProperty(e)&&(this.options[e]=t[e]);this.actualizeOptions()},_listeners:null,on:function(t,e){return this._listeners=this._listeners||{},(this._listeners[t]=this._listeners[t]||[]).push(e),this},subscribe:function(t,e){h.listenTo(this,t.toLowerCase(),e)},off:function(t,e){var i=this._listeners&&this._listeners[t];if(i)if(e)for(var n=i.length;n--;)i[n]===e&&i.splice(n,1);else delete this._listeners[t];return this},unsubscribe:function(t,e){h.unsubscribeTo(this,t.toLowerCase())},trigger:function(t,e,i){e=e||this;var n,r=this._listeners&&this._listeners[t];if(r)for(var s=r.length;s--;)if(!1===(n=r[s].call(e,e,i)))return n;return!this.parent||this.parent.trigger(t,e,i)},asyncIsValid:function(t,e){return d.warnOnce("asyncIsValid is deprecated; please use whenValid instead"),this.whenValid({group:t,force:e})},_findRelated:function(){return this.options.multiple?h(this.parent.element.querySelectorAll("[".concat(this.options.namespace,'multiple="').concat(this.options.multiple,'"]'))):this.$element}};var c=function(t){h.extend(!0,this,t)};c.prototype={validate:function(t,e){if(this.fn)return 3<arguments.length&&(e=[].slice.call(arguments,1,-1)),this.fn(t,e);if(Array.isArray(t)){if(!this.validateMultiple)throw"Validator `"+this.name+"` does not handle multiple values";return this.validateMultiple.apply(this,arguments)}var i=arguments[arguments.length-1];if(this.validateDate&&i._isDateInput())return null!==(t=d.parse.date(t))&&this.validateDate.apply(this,arguments);if(this.validateNumber)return!t||!isNaN(t)&&(t=parseFloat(t),this.validateNumber.apply(this,arguments));if(this.validateString)return this.validateString.apply(this,arguments);throw"Validator `"+this.name+"` only handles multiple values"},parseRequirements:function(t,e){if("string"!=typeof t)return Array.isArray(t)?t:[t];var i=this.requirementType;if(Array.isArray(i)){for(var n=function(t,e){var i=t.match(/^\s*\[(.*)\]\s*$/);if(!i)throw'Requirement is not an array: "'+t+'"';var n=i[1].split(",").map(d.trimString);if(n.length!==e)throw"Requirement has "+n.length+" values when "+e+" are needed";return n}(t,i.length),r=0;r<n.length;r++)n[r]=d.parseRequirement(i[r],n[r]);return n}return h.isPlainObject(i)?function(t,e,i){var n=null,r={};for(var s in t)if(s){var a=i(s);"string"==typeof a&&(a=d.parseRequirement(t[s],a)),r[s]=a}else n=d.parseRequirement(t[s],e);return[n,r]}(i,t,e):[d.parseRequirement(i,t)]},requirementType:"string",priority:2};var a=function(t,e){this.__class__="ValidatorRegistry",this.locale="en",this.init(t||{},e||{})},p={email:/^((([a-zA-Z]|\d|[!#\$%&'\*\+\-\/=\?\^_`{\|}~]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])+(\.([a-zA-Z]|\d|[!#\$%&'\*\+\-\/=\?\^_`{\|}~]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])+)*)|((\x22)((((\x20|\x09)*(\x0d\x0a))?(\x20|\x09)+)?(([\x01-\x08\x0b\x0c\x0e-\x1f\x7f]|\x21|[\x23-\x5b]|[\x5d-\x7e]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(\\([\x01-\x09\x0b\x0c\x0d-\x7f]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]))))*(((\x20|\x09)*(\x0d\x0a))?(\x20|\x09)+)?(\x22)))@((([a-zA-Z]|\d|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(([a-zA-Z]|\d|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])([a-zA-Z]|\d|-|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])*([a-zA-Z]|\d|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])))\.)+(([a-zA-Z]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(([a-zA-Z]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])([a-zA-Z]|\d|-|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])*([a-zA-Z]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])))$/,number:/^-?(\d*\.)?\d+(e[-+]?\d+)?$/i,integer:/^-?\d+$/,digits:/^\d+$/,alphanum:/^\w+$/i,date:{test:function(t){return null!==d.parse.date(t)}},url:new RegExp("^(?:(?:https?|ftp)://)?(?:\\S+(?::\\S*)?@)?(?:(?:[1-9]\\d?|1\\d\\d|2[01]\\d|22[0-3])(?:\\.(?:1?\\d{1,2}|2[0-4]\\d|25[0-5])){2}(?:\\.(?:[1-9]\\d?|1\\d\\d|2[0-4]\\d|25[0-4]))|(?:(?:[a-zA-Z\\u00a1-\\uffff0-9]-*)*[a-zA-Z\\u00a1-\\uffff0-9]+)(?:\\.(?:[a-zA-Z\\u00a1-\\uffff0-9]-*)*[a-zA-Z\\u00a1-\\uffff0-9]+)*(?:\\.(?:[a-zA-Z\\u00a1-\\uffff]{2,})))(?::\\d{2,5})?(?:/\\S*)?$")};p.range=p.number;var f=function(t){var e=(""+t).match(/(?:\.(\d+))?(?:[eE]([+-]?\d+))?$/);return e?Math.max(0,(e[1]?e[1].length:0)-(e[2]?+e[2]:0)):0},m=function(s,a){return function(t){for(var e=arguments.length,i=new Array(1<e?e-1:0),n=1;n<e;n++)i[n-1]=arguments[n];return i.pop(),a.apply(void 0,[t].concat(u((r=s,i.map(d.parse[r])))));var r}},g=function(t){return{validateDate:m("date",t),validateNumber:m("number",t),requirementType:t.length<=2?"string":["string","string"],priority:30}};a.prototype={init:function(t,e){for(var i in this.catalog=e,this.validators=o({},this.validators),t)this.addValidator(i,t[i].fn,t[i].priority);window.Parsley.trigger("parsley:validator:init")},setLocale:function(t){if(void 0===this.catalog[t])throw new Error(t+" is not available in the catalog");return this.locale=t,this},addCatalog:function(t,e,i){return"object"===r(e)&&(this.catalog[t]=e),!0===i?this.setLocale(t):this},addMessage:function(t,e,i){return void 0===this.catalog[t]&&(this.catalog[t]={}),this.catalog[t][e]=i,this},addMessages:function(t,e){for(var i in e)this.addMessage(t,i,e[i]);return this},addValidator:function(t,e,i){if(this.validators[t])d.warn('Validator "'+t+'" is already defined.');else if(n.hasOwnProperty(t))return void d.warn('"'+t+'" is a restricted keyword and is not a valid validator name.');return this._setValidator.apply(this,arguments)},hasValidator:function(t){return!!this.validators[t]},updateValidator:function(t,e,i){return this.validators[t]?this._setValidator.apply(this,arguments):(d.warn('Validator "'+t+'" is not already defined.'),this.addValidator.apply(this,arguments))},removeValidator:function(t){return this.validators[t]||d.warn('Validator "'+t+'" is not defined.'),delete this.validators[t],this},_setValidator:function(t,e,i){for(var n in"object"!==r(e)&&(e={fn:e,priority:i}),e.validate||(e=new c(e)),(this.validators[t]=e).messages||{})this.addMessage(n,t,e.messages[n]);return this},getErrorMessage:function(t){var e;"type"===t.name?e=(this.catalog[this.locale][t.name]||{})[t.requirements]:e=this.formatMessage(this.catalog[this.locale][t.name],t.requirements);return e||this.catalog[this.locale].defaultMessage||this.catalog.en.defaultMessage},formatMessage:function(t,e){if("object"!==r(e))return"string"==typeof t?t.replace(/%s/i,e):"";for(var i in e)t=this.formatMessage(t,e[i]);return t},validators:{notblank:{validateString:function(t){return/\S/.test(t)},priority:2},required:{validateMultiple:function(t){return 0<t.length},validateString:function(t){return/\S/.test(t)},priority:512},type:{validateString:function(t,e){var i=2<arguments.length&&void 0!==arguments[2]?arguments[2]:{},n=i.step,r=void 0===n?"any":n,s=i.base,a=void 0===s?0:s,o=p[e];if(!o)throw new Error("validator type `"+e+"` is not supported");if(!t)return!0;if(!o.test(t))return!1;if("number"===e&&!/^any$/i.test(r||"")){var l=Number(t),u=Math.max(f(r),f(a));if(f(l)>u)return!1;var d=function(t){return Math.round(t*Math.pow(10,u))};if((d(l)-d(a))%d(r)!=0)return!1}return!0},requirementType:{"":"string",step:"string",base:"number"},priority:256},pattern:{validateString:function(t,e){return!t||e.test(t)},requirementType:"regexp",priority:64},minlength:{validateString:function(t,e){return!t||t.length>=e},requirementType:"integer",priority:30},maxlength:{validateString:function(t,e){return t.length<=e},requirementType:"integer",priority:30},length:{validateString:function(t,e,i){return!t||t.length>=e&&t.length<=i},requirementType:["integer","integer"],priority:30},mincheck:{validateMultiple:function(t,e){return t.length>=e},requirementType:"integer",priority:30},maxcheck:{validateMultiple:function(t,e){return t.length<=e},requirementType:"integer",priority:30},check:{validateMultiple:function(t,e,i){return t.length>=e&&t.length<=i},requirementType:["integer","integer"],priority:30},min:g(function(t,e){return e<=t}),max:g(function(t,e){return t<=e}),range:g(function(t,e,i){return e<=t&&t<=i}),equalto:{validateString:function(t,e){if(!t)return!0;var i=h(e);return i.length?t===i.val():t===e},priority:256},euvatin:{validateString:function(t,e){if(!t)return!0;return/^[A-Z][A-Z][A-Za-z0-9 -]{2,}$/.test(t)},priority:30}}};var v={};v.Form={_actualizeTriggers:function(){var e=this;this.$element.on("submit.Parsley",function(t){e.onSubmitValidate(t)}),this.$element.on("click.Parsley",d._SubmitSelector,function(t){e.onSubmitButton(t)}),!1!==this.options.uiEnabled&&this.element.setAttribute("novalidate","")},focus:function(){if(!(this._focusedField=null)===this.validationResult||"none"===this.options.focus)return null;for(var t=0;t<this.fields.length;t++){var e=this.fields[t];if(!0!==e.validationResult&&0<e.validationResult.length&&void 0===e.options.noFocus&&(this._focusedField=e.$element,"first"===this.options.focus))break}return null===this._focusedField?null:this._focusedField.focus()},_destroyUI:function(){this.$element.off(".Parsley")}},v.Field={_reflowUI:function(){if(this._buildUI(),this._ui){var t=function t(e,i,n){for(var r=[],s=[],a=0;a<e.length;a++){for(var o=!1,l=0;l<i.length;l++)if(e[a].assert.name===i[l].assert.name){o=!0;break}o?s.push(e[a]):r.push(e[a])}return{kept:s,added:r,removed:n?[]:t(i,e,!0).added}}(this.validationResult,this._ui.lastValidationResult);this._ui.lastValidationResult=this.validationResult,this._manageStatusClass(),this._manageErrorsMessages(t),this._actualizeTriggers(),!t.kept.length&&!t.added.length||this._failedOnce||(this._failedOnce=!0,this._actualizeTriggers())}},getErrorsMessages:function(){if(!0===this.validationResult)return[];for(var t=[],e=0;e<this.validationResult.length;e++)t.push(this.validationResult[e].errorMessage||this._getErrorMessage(this.validationResult[e].assert));return t},addError:function(t){var e=1<arguments.length&&void 0!==arguments[1]?arguments[1]:{},i=e.message,n=e.assert,r=e.updateClass,s=void 0===r||r;this._buildUI(),this._addError(t,{message:i,assert:n}),s&&this._errorClass()},updateError:function(t){var e=1<arguments.length&&void 0!==arguments[1]?arguments[1]:{},i=e.message,n=e.assert,r=e.updateClass,s=void 0===r||r;this._buildUI(),this._updateError(t,{message:i,assert:n}),s&&this._errorClass()},removeError:function(t){var e=(1<arguments.length&&void 0!==arguments[1]?arguments[1]:{}).updateClass,i=void 0===e||e;this._buildUI(),this._removeError(t),i&&this._manageStatusClass()},_manageStatusClass:function(){this.hasConstraints()&&this.needsValidation()&&!0===this.validationResult?this._successClass():0<this.validationResult.length?this._errorClass():this._resetClass()},_manageErrorsMessages:function(t){if(void 0===this.options.errorsMessagesDisabled){if(void 0!==this.options.errorMessage)return t.added.length||t.kept.length?(this._insertErrorWrapper(),0===this._ui.$errorsWrapper.find(".parsley-custom-error-message").length&&this._ui.$errorsWrapper.append(h(this.options.errorTemplate).addClass("parsley-custom-error-message")),this._ui.$errorsWrapper.addClass("filled").find(".parsley-custom-error-message").html(this.options.errorMessage)):this._ui.$errorsWrapper.removeClass("filled").find(".parsley-custom-error-message").remove();for(var e=0;e<t.removed.length;e++)this._removeError(t.removed[e].assert.name);for(e=0;e<t.added.length;e++)this._addError(t.added[e].assert.name,{message:t.added[e].errorMessage,assert:t.added[e].assert});for(e=0;e<t.kept.length;e++)this._updateError(t.kept[e].assert.name,{message:t.kept[e].errorMessage,assert:t.kept[e].assert})}},_addError:function(t,e){var i=e.message,n=e.assert;this._insertErrorWrapper(),this._ui.$errorClassHandler.attr("aria-describedby",this._ui.errorsWrapperId),this._ui.$errorsWrapper.addClass("filled").append(h(this.options.errorTemplate).addClass("parsley-"+t).html(i||this._getErrorMessage(n)))},_updateError:function(t,e){var i=e.message,n=e.assert;this._ui.$errorsWrapper.addClass("filled").find(".parsley-"+t).html(i||this._getErrorMessage(n))},_removeError:function(t){this._ui.$errorClassHandler.removeAttr("aria-describedby"),this._ui.$errorsWrapper.removeClass("filled").find(".parsley-"+t).remove()},_getErrorMessage:function(t){var e=t.name+"Message";return void 0!==this.options[e]?window.Parsley.formatMessage(this.options[e],t.requirements):window.Parsley.getErrorMessage(t)},_buildUI:function(){if(!this._ui&&!1!==this.options.uiEnabled){var t={};this.element.setAttribute(this.options.namespace+"id",this.__id__),t.$errorClassHandler=this._manageClassHandler(),t.errorsWrapperId="parsley-id-"+(this.options.multiple?"multiple-"+this.options.multiple:this.__id__),t.$errorsWrapper=h(this.options.errorsWrapper).attr("id",t.errorsWrapperId),t.lastValidationResult=[],t.validationInformationVisible=!1,this._ui=t}},_manageClassHandler:function(){if("string"==typeof this.options.classHandler&&h(this.options.classHandler).length)return h(this.options.classHandler);var t=this.options.classHandler;if("string"==typeof this.options.classHandler&&"function"==typeof window[this.options.classHandler]&&(t=window[this.options.classHandler]),"function"==typeof t){var e=t.call(this,this);if(void 0!==e&&e.length)return e}else{if("object"===r(t)&&t instanceof jQuery&&t.length)return t;t&&d.warn("The class handler `"+t+"` does not exist in DOM nor as a global JS function")}return this._inputHolder()},_inputHolder:function(){return this.options.multiple&&"SELECT"!==this.element.nodeName?this.$element.parent():this.$element},_insertErrorWrapper:function(){var t=this.options.errorsContainer;if(0!==this._ui.$errorsWrapper.parent().length)return this._ui.$errorsWrapper.parent();if("string"==typeof t){if(h(t).length)return h(t).append(this._ui.$errorsWrapper);"function"==typeof window[t]?t=window[t]:d.warn("The errors container `"+t+"` does not exist in DOM nor as a global JS function")}return"function"==typeof t&&(t=t.call(this,this)),"object"===r(t)&&t.length?t.append(this._ui.$errorsWrapper):this._inputHolder().after(this._ui.$errorsWrapper)},_actualizeTriggers:function(){var t,e=this,i=this._findRelated();i.off(".Parsley"),this._failedOnce?i.on(d.namespaceEvents(this.options.triggerAfterFailure,"Parsley"),function(){e._validateIfNeeded()}):(t=d.namespaceEvents(this.options.trigger,"Parsley"))&&i.on(t,function(t){e._validateIfNeeded(t)})},_validateIfNeeded:function(t){var e=this;t&&/key|input/.test(t.type)&&(!this._ui||!this._ui.validationInformationVisible)&&this.getValue().length<=this.options.validationThreshold||(this.options.debounce?(window.clearTimeout(this._debounced),this._debounced=window.setTimeout(function(){return e.validate()},this.options.debounce)):this.validate())},_resetUI:function(){this._failedOnce=!1,this._actualizeTriggers(),void 0!==this._ui&&(this._ui.$errorsWrapper.removeClass("filled").children().remove(),this._resetClass(),this._ui.lastValidationResult=[],this._ui.validationInformationVisible=!1)},_destroyUI:function(){this._resetUI(),void 0!==this._ui&&this._ui.$errorsWrapper.remove(),delete this._ui},_successClass:function(){this._ui.validationInformationVisible=!0,this._ui.$errorClassHandler.removeClass(this.options.errorClass).addClass(this.options.successClass)},_errorClass:function(){this._ui.validationInformationVisible=!0,this._ui.$errorClassHandler.removeClass(this.options.successClass).addClass(this.options.errorClass)},_resetClass:function(){this._ui.$errorClassHandler.removeClass(this.options.successClass).removeClass(this.options.errorClass)}};var y=function(t,e,i){this.__class__="Form",this.element=t,this.$element=h(t),this.domOptions=e,this.options=i,this.parent=window.Parsley,this.fields=[],this.validationResult=null},_={pending:null,resolved:!0,rejected:!1};y.prototype={onSubmitValidate:function(t){var e=this;if(!0!==t.parsley){var i=this._submitSource||this.$element.find(d._SubmitSelector)[0];if(this._submitSource=null,this.$element.find(".parsley-synthetic-submit-button").prop("disabled",!0),!i||null===i.getAttribute("formnovalidate")){window.Parsley._remoteCache={};var n=this.whenValidate({event:t});"resolved"===n.state()&&!1!==this._trigger("submit")||(t.stopImmediatePropagation(),t.preventDefault(),"pending"===n.state()&&n.done(function(){e._submit(i)}))}}},onSubmitButton:function(t){this._submitSource=t.currentTarget},_submit:function(t){if(!1!==this._trigger("submit")){if(t){var e=this.$element.find(".parsley-synthetic-submit-button").prop("disabled",!1);0===e.length&&(e=h('<input class="parsley-synthetic-submit-button" type="hidden">').appendTo(this.$element)),e.attr({name:t.getAttribute("name"),value:t.getAttribute("value")})}this.$element.trigger(o(h.Event("submit"),{parsley:!0}))}},validate:function(t){if(1<=arguments.length&&!h.isPlainObject(t)){d.warnOnce("Calling validate on a parsley form without passing arguments as an object is deprecated.");var e=Array.prototype.slice.call(arguments);t={group:e[0],force:e[1],event:e[2]}}return _[this.whenValidate(t).state()]},whenValidate:function(){var t,e=this,i=0<arguments.length&&void 0!==arguments[0]?arguments[0]:{},n=i.group,r=i.force,s=i.event;(this.submitEvent=s)&&(this.submitEvent=o({},s,{preventDefault:function(){d.warnOnce("Using `this.submitEvent.preventDefault()` is deprecated; instead, call `this.validationResult = false`"),e.validationResult=!1}})),this.validationResult=!0,this._trigger("validate"),this._refreshFields();var a=this._withoutReactualizingFormOptions(function(){return h.map(e.fields,function(t){return t.whenValidate({force:r,group:n})})});return(t=d.all(a).done(function(){e._trigger("success")}).fail(function(){e.validationResult=!1,e.focus(),e._trigger("error")}).always(function(){e._trigger("validated")})).pipe.apply(t,u(this._pipeAccordingToValidationResult()))},isValid:function(t){if(1<=arguments.length&&!h.isPlainObject(t)){d.warnOnce("Calling isValid on a parsley form without passing arguments as an object is deprecated.");var e=Array.prototype.slice.call(arguments);t={group:e[0],force:e[1]}}return _[this.whenValid(t).state()]},whenValid:function(){var t=this,e=0<arguments.length&&void 0!==arguments[0]?arguments[0]:{},i=e.group,n=e.force;this._refreshFields();var r=this._withoutReactualizingFormOptions(function(){return h.map(t.fields,function(t){return t.whenValid({group:i,force:n})})});return d.all(r)},refresh:function(){return this._refreshFields(),this},reset:function(){for(var t=0;t<this.fields.length;t++)this.fields[t].reset();this._trigger("reset")},destroy:function(){this._destroyUI();for(var t=0;t<this.fields.length;t++)this.fields[t].destroy();this.$element.removeData("Parsley"),this._trigger("destroy")},_refreshFields:function(){return this.actualizeOptions()._bindFields()},_bindFields:function(){var r=this,t=this.fields;return this.fields=[],this.fieldsMappedById={},this._withoutReactualizingFormOptions(function(){r.$element.find(r.options.inputs).not(r.options.excluded).not("[".concat(r.options.namespace,"excluded=true]")).each(function(t,e){var i=new window.Parsley.Factory(e,{},r);if("Field"===i.__class__||"FieldMultiple"===i.__class__){var n=i.__class__+"-"+i.__id__;void 0===r.fieldsMappedById[n]&&(r.fieldsMappedById[n]=i,r.fields.push(i))}}),h.each(d.difference(t,r.fields),function(t,e){e.reset()})}),this},_withoutReactualizingFormOptions:function(t){var e=this.actualizeOptions;this.actualizeOptions=function(){return this};var i=t();return this.actualizeOptions=e,i},_trigger:function(t){return this.trigger("form:"+t)}};var w=function(t,e,i,n,r){var s=window.Parsley._validatorRegistry.validators[e],a=new c(s);o(this,{validator:a,name:e,requirements:i,priority:n=n||t.options[e+"Priority"]||a.priority,isDomConstraint:r=!0===r}),this._parseRequirements(t.options)},b=function(t,e,i,n){this.__class__="Field",this.element=t,this.$element=h(t),void 0!==n&&(this.parent=n),this.options=i,this.domOptions=e,this.constraints=[],this.constraintsByName={},this.validationResult=!0,this._bindConstraints()},F={pending:null,resolved:!0,rejected:!(w.prototype={validate:function(t,e){var i;return(i=this.validator).validate.apply(i,[t].concat(u(this.requirementList),[e]))},_parseRequirements:function(i){var n=this;this.requirementList=this.validator.parseRequirements(this.requirements,function(t){return i[n.name+(e=t,e[0].toUpperCase()+e.slice(1))];var e})}})};b.prototype={validate:function(t){1<=arguments.length&&!h.isPlainObject(t)&&(d.warnOnce("Calling validate on a parsley field without passing arguments as an object is deprecated."),t={options:t});var e=this.whenValidate(t);if(!e)return!0;switch(e.state()){case"pending":return null;case"resolved":return!0;case"rejected":return this.validationResult}},whenValidate:function(){var t,e=this,i=0<arguments.length&&void 0!==arguments[0]?arguments[0]:{},n=i.force,r=i.group;if(this.refresh(),!r||this._isInGroup(r))return this.value=this.getValue(),this._trigger("validate"),(t=this.whenValid({force:n,value:this.value,_refreshed:!0}).always(function(){e._reflowUI()}).done(function(){e._trigger("success")}).fail(function(){e._trigger("error")}).always(function(){e._trigger("validated")})).pipe.apply(t,u(this._pipeAccordingToValidationResult()))},hasConstraints:function(){return 0!==this.constraints.length},needsValidation:function(t){return void 0===t&&(t=this.getValue()),!(!t.length&&!this._isRequired()&&void 0===this.options.validateIfEmpty)},_isInGroup:function(t){return Array.isArray(this.options.group)?-1!==h.inArray(t,this.options.group):this.options.group===t},isValid:function(t){if(1<=arguments.length&&!h.isPlainObject(t)){d.warnOnce("Calling isValid on a parsley field without passing arguments as an object is deprecated.");var e=Array.prototype.slice.call(arguments);t={force:e[0],value:e[1]}}var i=this.whenValid(t);return!i||F[i.state()]},whenValid:function(){var n=this,t=0<arguments.length&&void 0!==arguments[0]?arguments[0]:{},e=t.force,i=void 0!==e&&e,r=t.value,s=t.group;if(t._refreshed||this.refresh(),!s||this._isInGroup(s)){if(this.validationResult=!0,!this.hasConstraints())return h.when();if(null==r&&(r=this.getValue()),!this.needsValidation(r)&&!0!==i)return h.when();var a=this._getGroupedConstraints(),o=[];return h.each(a,function(t,e){var i=d.all(h.map(e,function(t){return n._validateConstraint(r,t)}));if(o.push(i),"rejected"===i.state())return!1}),d.all(o)}},_validateConstraint:function(t,e){var i=this,n=e.validate(t,this);return!1===n&&(n=h.Deferred().reject()),d.all([n]).fail(function(t){i.validationResult instanceof Array||(i.validationResult=[]),i.validationResult.push({assert:e,errorMessage:"string"==typeof t&&t})})},getValue:function(){var t;return null==(t="function"==typeof this.options.value?this.options.value(this):void 0!==this.options.value?this.options.value:this.$element.val())?"":this._handleWhitespace(t)},reset:function(){return this._resetUI(),this._trigger("reset")},destroy:function(){this._destroyUI(),this.$element.removeData("Parsley"),this.$element.removeData("FieldMultiple"),this._trigger("destroy")},refresh:function(){return this._refreshConstraints(),this},_refreshConstraints:function(){return this.actualizeOptions()._bindConstraints()},refreshConstraints:function(){return d.warnOnce("Parsley's refreshConstraints is deprecated. Please use refresh"),this.refresh()},addConstraint:function(t,e,i,n){if(window.Parsley._validatorRegistry.validators[t]){var r=new w(this,t,e,i,n);"undefined"!==this.constraintsByName[r.name]&&this.removeConstraint(r.name),this.constraints.push(r),this.constraintsByName[r.name]=r}return this},removeConstraint:function(t){for(var e=0;e<this.constraints.length;e++)if(t===this.constraints[e].name){this.constraints.splice(e,1);break}return delete this.constraintsByName[t],this},updateConstraint:function(t,e,i){return this.removeConstraint(t).addConstraint(t,e,i)},_bindConstraints:function(){for(var t=[],e={},i=0;i<this.constraints.length;i++)!1===this.constraints[i].isDomConstraint&&(t.push(this.constraints[i]),e[this.constraints[i].name]=this.constraints[i]);for(var n in this.constraints=t,this.constraintsByName=e,this.options)this.addConstraint(n,this.options[n],void 0,!0);return this._bindHtml5Constraints()},_bindHtml5Constraints:function(){null!==this.element.getAttribute("required")&&this.addConstraint("required",!0,void 0,!0),null!==this.element.getAttribute("pattern")&&this.addConstraint("pattern",this.element.getAttribute("pattern"),void 0,!0);var t=this.element.getAttribute("min"),e=this.element.getAttribute("max");null!==t&&null!==e?this.addConstraint("range",[t,e],void 0,!0):null!==t?this.addConstraint("min",t,void 0,!0):null!==e&&this.addConstraint("max",e,void 0,!0),null!==this.element.getAttribute("minlength")&&null!==this.element.getAttribute("maxlength")?this.addConstraint("length",[this.element.getAttribute("minlength"),this.element.getAttribute("maxlength")],void 0,!0):null!==this.element.getAttribute("minlength")?this.addConstraint("minlength",this.element.getAttribute("minlength"),void 0,!0):null!==this.element.getAttribute("maxlength")&&this.addConstraint("maxlength",this.element.getAttribute("maxlength"),void 0,!0);var i=d.getType(this.element);return"number"===i?this.addConstraint("type",["number",{step:this.element.getAttribute("step")||"1",base:t||this.element.getAttribute("value")}],void 0,!0):/^(email|url|range|date)$/i.test(i)?this.addConstraint("type",i,void 0,!0):this},_isRequired:function(){return void 0!==this.constraintsByName.required&&!1!==this.constraintsByName.required.requirements},_trigger:function(t){return this.trigger("field:"+t)},_handleWhitespace:function(t){return!0===this.options.trimValue&&d.warnOnce('data-parsley-trim-value="true" is deprecated, please use data-parsley-whitespace="trim"'),"squish"===this.options.whitespace&&(t=t.replace(/\s{2,}/g," ")),"trim"!==this.options.whitespace&&"squish"!==this.options.whitespace&&!0!==this.options.trimValue||(t=d.trimString(t)),t},_isDateInput:function(){var t=this.constraintsByName.type;return t&&"date"===t.requirements},_getGroupedConstraints:function(){if(!1===this.options.priorityEnabled)return[this.constraints];for(var t=[],e={},i=0;i<this.constraints.length;i++){var n=this.constraints[i].priority;e[n]||t.push(e[n]=[]),e[n].push(this.constraints[i])}return t.sort(function(t,e){return e[0].priority-t[0].priority}),t}};var C=function(){this.__class__="FieldMultiple"};C.prototype={addElement:function(t){return this.$elements.push(t),this},_refreshConstraints:function(){var t;if(this.constraints=[],"SELECT"===this.element.nodeName)return this.actualizeOptions()._bindConstraints(),this;for(var e=0;e<this.$elements.length;e++)if(h("html").has(this.$elements[e]).length){t=this.$elements[e].data("FieldMultiple")._refreshConstraints().constraints;for(var i=0;i<t.length;i++)this.addConstraint(t[i].name,t[i].requirements,t[i].priority,t[i].isDomConstraint)}else this.$elements.splice(e,1);return this},getValue:function(){if("function"==typeof this.options.value)return this.options.value(this);if(void 0!==this.options.value)return this.options.value;if("INPUT"===this.element.nodeName){var t=d.getType(this.element);if("radio"===t)return this._findRelated().filter(":checked").val()||"";if("checkbox"===t){var e=[];return this._findRelated().filter(":checked").each(function(){e.push(h(this).val())}),e}}return"SELECT"===this.element.nodeName&&null===this.$element.val()?[]:this.$element.val()},_init:function(){return this.$elements=[this.$element],this}};var A=function(t,e,i){this.element=t,this.$element=h(t);var n=this.$element.data("Parsley");if(n)return void 0!==i&&n.parent===window.Parsley&&(n.parent=i,n._resetOptions(n.options)),"object"===r(e)&&o(n.options,e),n;if(!this.$element.length)throw new Error("You must bind Parsley on an existing element.");if(void 0!==i&&"Form"!==i.__class__)throw new Error("Parent instance must be a Form instance");return this.parent=i||window.Parsley,this.init(e)};A.prototype={init:function(t){return this.__class__="Parsley",this.__version__="2.9.1",this.__id__=d.generateID(),this._resetOptions(t),"FORM"===this.element.nodeName||d.checkAttr(this.element,this.options.namespace,"validate")&&!this.$element.is(this.options.inputs)?this.bind("parsleyForm"):this.isMultiple()?this.handleMultiple():this.bind("parsleyField")},isMultiple:function(){var t=d.getType(this.element);return"radio"===t||"checkbox"===t||"SELECT"===this.element.nodeName&&null!==this.element.getAttribute("multiple")},handleMultiple:function(){var t,e,n=this;if(this.options.multiple=this.options.multiple||(t=this.element.getAttribute("name"))||this.element.getAttribute("id"),"SELECT"===this.element.nodeName&&null!==this.element.getAttribute("multiple"))return this.options.multiple=this.options.multiple||this.__id__,this.bind("parsleyFieldMultiple");if(!this.options.multiple)return d.warn("To be bound by Parsley, a radio, a checkbox and a multiple select input must have either a name or a multiple option.",this.$element),this;this.options.multiple=this.options.multiple.replace(/(:|\.|\[|\]|\{|\}|\$)/g,""),t&&h('input[name="'+t+'"]').each(function(t,e){var i=d.getType(e);"radio"!==i&&"checkbox"!==i||e.setAttribute(n.options.namespace+"multiple",n.options.multiple)});for(var i=this._findRelated(),r=0;r<i.length;r++)if(void 0!==(e=h(i.get(r)).data("Parsley"))){this.$element.data("FieldMultiple")||e.addElement(this.$element);break}return this.bind("parsleyField",!0),e||this.bind("parsleyFieldMultiple")},bind:function(t,e){var i;switch(t){case"parsleyForm":i=h.extend(new y(this.element,this.domOptions,this.options),new s,window.ParsleyExtend)._bindFields();break;case"parsleyField":i=h.extend(new b(this.element,this.domOptions,this.options,this.parent),new s,window.ParsleyExtend);break;case"parsleyFieldMultiple":i=h.extend(new b(this.element,this.domOptions,this.options,this.parent),new C,new s,window.ParsleyExtend)._init();break;default:throw new Error(t+"is not a supported Parsley type")}return this.options.multiple&&d.setAttr(this.element,this.options.namespace,"multiple",this.options.multiple),void 0!==e?this.$element.data("FieldMultiple",i):(this.$element.data("Parsley",i),i._actualizeTriggers(),i._trigger("init")),i}};var E=h.fn.jquery.split(".");if(parseInt(E[0])<=1&&parseInt(E[1])<8)throw"The loaded version of jQuery is too old. Please upgrade to 1.8.x or better.";E.forEach||d.warn("Parsley requires ES5 to run properly. Please include https://github.com/es-shims/es5-shim");var x=o(new s,{element:document,$element:h(document),actualizeOptions:null,_resetOptions:null,Factory:A,version:"2.9.1"});o(b.prototype,v.Field,s.prototype),o(y.prototype,v.Form,s.prototype),o(A.prototype,s.prototype),h.fn.parsley=h.fn.psly=function(t){if(1<this.length){var e=[];return this.each(function(){e.push(h(this).parsley(t))}),e}if(0!=this.length)return new A(this[0],t)},void 0===window.ParsleyExtend&&(window.ParsleyExtend={}),x.options=o(d.objectCreate(n),window.ParsleyConfig),window.ParsleyConfig=x.options,window.Parsley=window.psly=x,x.Utils=d,window.ParsleyUtils={},h.each(d,function(t,e){"function"==typeof e&&(window.ParsleyUtils[t]=function(){return d.warnOnce("Accessing `window.ParsleyUtils` is deprecated. Use `window.Parsley.Utils` instead."),d[t].apply(d,arguments)})});var $=window.Parsley._validatorRegistry=new a(window.ParsleyConfig.validators,window.ParsleyConfig.i18n);window.ParsleyValidator={},h.each("setLocale addCatalog addMessage addMessages getErrorMessage formatMessage addValidator updateValidator removeValidator hasValidator".split(" "),function(t,e){window.Parsley[e]=function(){return $[e].apply($,arguments)},window.ParsleyValidator[e]=function(){var t;return d.warnOnce("Accessing the method '".concat(e,"' through Validator is deprecated. Simply call 'window.Parsley.").concat(e,"(...)'")),(t=window.Parsley)[e].apply(t,arguments)}}),window.Parsley.UI=v,window.ParsleyUI={removeError:function(t,e,i){var n=!0!==i;return d.warnOnce("Accessing UI is deprecated. Call 'removeError' on the instance directly. Please comment in issue 1073 as to your need to call this method."),t.removeError(e,{updateClass:n})},getErrorsMessages:function(t){return d.warnOnce("Accessing UI is deprecated. Call 'getErrorsMessages' on the instance directly."),t.getErrorsMessages()}},h.each("addError updateError".split(" "),function(t,a){window.ParsleyUI[a]=function(t,e,i,n,r){var s=!0!==r;return d.warnOnce("Accessing UI is deprecated. Call '".concat(a,"' on the instance directly. Please comment in issue 1073 as to your need to call this method.")),t[a](e,{message:i,assert:n,updateClass:s})}}),!1!==window.ParsleyConfig.autoBind&&h(function(){h("[data-parsley-validate]").length&&h("[data-parsley-validate]").parsley()});var V=h({}),P=function(){d.warnOnce("Parsley's pubsub module is deprecated; use the 'on' and 'off' methods on parsley instances or window.Parsley")};function O(e,i){return e.parsleyAdaptedCallback||(e.parsleyAdaptedCallback=function(){var t=Array.prototype.slice.call(arguments,0);t.unshift(this),e.apply(i||V,t)}),e.parsleyAdaptedCallback}var T="parsley:";function M(t){return 0===t.lastIndexOf(T,0)?t.substr(T.length):t}return h.listen=function(t,e){var i;if(P(),"object"===r(arguments[1])&&"function"==typeof arguments[2]&&(i=arguments[1],e=arguments[2]),"function"!=typeof e)throw new Error("Wrong parameters");window.Parsley.on(M(t),O(e,i))},h.listenTo=function(t,e,i){if(P(),!(t instanceof b||t instanceof y))throw new Error("Must give Parsley instance");if("string"!=typeof e||"function"!=typeof i)throw new Error("Wrong parameters");t.on(M(e),O(i))},h.unsubscribe=function(t,e){if(P(),"string"!=typeof t||"function"!=typeof e)throw new Error("Wrong arguments");window.Parsley.off(M(t),e.parsleyAdaptedCallback)},h.unsubscribeTo=function(t,e){if(P(),!(t instanceof b||t instanceof y))throw new Error("Must give Parsley instance");t.off(M(e))},h.unsubscribeAll=function(e){P(),window.Parsley.off(M(e)),h("form,input,textarea,select").each(function(){var t=h(this).data("Parsley");t&&t.off(M(e))})},h.emit=function(t,e){var i;P();var n=e instanceof b||e instanceof y,r=Array.prototype.slice.call(arguments,n?2:1);r.unshift(M(t)),n||(e=window.Parsley),(i=e).trigger.apply(i,u(r))},h.extend(!0,x,{asyncValidators:{default:{fn:function(t){return 200<=t.status&&t.status<300},url:!1},reverse:{fn:function(t){return t.status<200||300<=t.status},url:!1}},addAsyncValidator:function(t,e,i,n){return x.asyncValidators[t]={fn:e,url:i||!1,options:n||{}},this}}),x.addValidator("remote",{requirementType:{"":"string",validator:"string",reverse:"boolean",options:"object"},validateString:function(t,e,i,n){var r,s,a={},o=i.validator||(!0===i.reverse?"reverse":"default");if(void 0===x.asyncValidators[o])throw new Error("Calling an undefined async validator: `"+o+"`");-1<(e=x.asyncValidators[o].url||e).indexOf("{value}")?e=e.replace("{value}",encodeURIComponent(t)):a[n.element.getAttribute("name")||n.element.getAttribute("id")]=t;var l=h.extend(!0,i.options||{},x.asyncValidators[o].options);r=h.extend(!0,{},{url:e,data:a,type:"GET"},l),n.trigger("field:ajaxoptions",n,r),s=h.param(r),void 0===x._remoteCache&&(x._remoteCache={});var u=x._remoteCache[s]=x._remoteCache[s]||h.ajax(r),d=function(){var t=x.asyncValidators[o].fn.call(n,u,e,i);return t||(t=h.Deferred().reject()),h.when(t)};return u.then(d,d)},priority:-1}),x.on("form:submit",function(){x._remoteCache={}}),s.prototype.addAsyncValidator=function(){return d.warnOnce("Accessing the method `addAsyncValidator` through an instance is deprecated. Simply call `Parsley.addAsyncValidator(...)`"),x.addAsyncValidator.apply(x,arguments)},x.addMessages("en",{defaultMessage:"This value seems to be invalid.",type:{email:"This value should be a valid email.",url:"This value should be a valid url.",number:"This value should be a valid number.",integer:"This value should be a valid integer.",digits:"This value should be digits.",alphanum:"This value should be alphanumeric."},notblank:"This value should not be blank.",required:"This value is required.",pattern:"This value seems to be invalid.",min:"This value should be greater than or equal to %s.",max:"This value should be lower than or equal to %s.",range:"This value should be between %s and %s.",minlength:"This value is too short. It should have %s characters or more.",maxlength:"This value is too long. It should have %s characters or fewer.",length:"This value length is invalid. It should be between %s and %s characters long.",mincheck:"You must select at least %s choices.",maxcheck:"You must select %s choices or fewer.",check:"You must select between %s and %s choices.",equalto:"This value should be the same.",euvatin:"It's not a valid VAT Identification Number."}),x.setLocale("en"),(new function(){var n=this,r=window||global;o(this,{isNativeEvent:function(t){return t.originalEvent&&!1!==t.originalEvent.isTrusted},fakeInputEvent:function(t){n.isNativeEvent(t)&&h(t.target).trigger("input")},misbehaves:function(t){n.isNativeEvent(t)&&(n.behavesOk(t),h(document).on("change.inputevent",t.data.selector,n.fakeInputEvent),n.fakeInputEvent(t))},behavesOk:function(t){n.isNativeEvent(t)&&h(document).off("input.inputevent",t.data.selector,n.behavesOk).off("change.inputevent",t.data.selector,n.misbehaves)},install:function(){if(!r.inputEventPatched){r.inputEventPatched="0.0.3";for(var t=["select",'input[type="checkbox"]','input[type="radio"]','input[type="file"]'],e=0;e<t.length;e++){var i=t[e];h(document).on("input.inputevent",i,{selector:i},n.behavesOk).on("change.inputevent",i,{selector:i},n.misbehaves)}}},uninstall:function(){delete r.inputEventPatched,h(document).off(".inputevent")}})}).install(),x});
//# sourceMappingURL=parsley.min.js.map

var $TABLE = $('#table');
var $BTN = $('#export-btn');
var $EXPORT = $('#export');

$('#table-add-btn').click(function () {
  var $clone = $TABLE.find('tr.hide').clone(true).removeClass('hide table-line');
  $TABLE.find('table').append($clone);
});

$('.table-remove').click(function () {
  $(this).parents('tr').detach();
});

$('.table-up').click(function () {
  var $row = $(this).parents('tr');
  if ($row.index() === 1) return; // Don't go above the header
  $row.prev().before($row.get(0));
});

$('.table-down').click(function () {
  var $row = $(this).parents('tr');
  $row.next().after($row.get(0));
});

// A few jQuery helpers for exporting only
jQuery.fn.pop = [].pop;
jQuery.fn.shift = [].shift;

$BTN.click(function () {
  var $rows = $TABLE.find('tr:not(:hidden)');
  var headers = [];
  var data = [];
  
  // Get the headers (add special header logic here)
  $($rows.shift()).find('th:not(:empty)').each(function () {
    headers.push($(this).text().toLowerCase());
  });
  
  // Turn all existing rows into a loopable array
  $rows.each(function () {
    var $td = $(this).find('td');
    var h = {};
    
    // Use the headers from earlier to name our hash keys
    headers.forEach(function (header, i) {
      h[header] = $td.eq(i).text();   
    });
    
    data.push(h);
  });
  
  // Output the result
  $EXPORT.text(JSON.stringify(data));
});
/*
    A simple jQuery modal (http://github.com/kylefox/jquery-modal)
    Version 0.9.1
*/
!function(o){"object"==typeof module&&"object"==typeof module.exports?o(require("jquery"),window,document):o(jQuery,window,document)}(function(o,t,i,e){var s=[],l=function(){return s.length?s[s.length-1]:null},n=function(){var o,t=!1;for(o=s.length-1;o>=0;o--)s[o].$blocker&&(s[o].$blocker.toggleClass("current",!t).toggleClass("behind",t),t=!0)};o.modal=function(t,i){var e,n;if(this.$body=o("body"),this.options=o.extend({},o.modal.defaults,i),this.options.doFade=!isNaN(parseInt(this.options.fadeDuration,10)),this.$blocker=null,this.options.closeExisting)for(;o.modal.isActive();)o.modal.close();if(s.push(this),t.is("a"))if(n=t.attr("href"),this.anchor=t,/^#/.test(n)){if(this.$elm=o(n),1!==this.$elm.length)return null;this.$body.append(this.$elm),this.open()}else this.$elm=o("<div>"),this.$body.append(this.$elm),e=function(o,t){t.elm.remove()},this.showSpinner(),t.trigger(o.modal.AJAX_SEND),o.get(n).done(function(i){if(o.modal.isActive()){t.trigger(o.modal.AJAX_SUCCESS);var s=l();s.$elm.empty().append(i).on(o.modal.CLOSE,e),s.hideSpinner(),s.open(),t.trigger(o.modal.AJAX_COMPLETE)}}).fail(function(){t.trigger(o.modal.AJAX_FAIL);var i=l();i.hideSpinner(),s.pop(),t.trigger(o.modal.AJAX_COMPLETE)});else this.$elm=t,this.anchor=t,this.$body.append(this.$elm),this.open()},o.modal.prototype={constructor:o.modal,open:function(){var t=this;this.block(),this.anchor.blur(),this.options.doFade?setTimeout(function(){t.show()},this.options.fadeDuration*this.options.fadeDelay):this.show(),o(i).off("keydown.modal").on("keydown.modal",function(o){var t=l();27===o.which&&t.options.escapeClose&&t.close()}),this.options.clickClose&&this.$blocker.click(function(t){t.target===this&&o.modal.close()})},close:function(){s.pop(),this.unblock(),this.hide(),o.modal.isActive()||o(i).off("keydown.modal")},block:function(){this.$elm.trigger(o.modal.BEFORE_BLOCK,[this._ctx()]),this.$body.css("overflow","hidden"),this.$blocker=o('<div class="'+this.options.blockerClass+' blocker current"></div>').appendTo(this.$body),n(),this.options.doFade&&this.$blocker.css("opacity",0).animate({opacity:1},this.options.fadeDuration),this.$elm.trigger(o.modal.BLOCK,[this._ctx()])},unblock:function(t){!t&&this.options.doFade?this.$blocker.fadeOut(this.options.fadeDuration,this.unblock.bind(this,!0)):(this.$blocker.children().appendTo(this.$body),this.$blocker.remove(),this.$blocker=null,n(),o.modal.isActive()||this.$body.css("overflow",""))},show:function(){this.$elm.trigger(o.modal.BEFORE_OPEN,[this._ctx()]),this.options.showClose&&(this.closeButton=o('<a href="#close-modal" rel="modal:close" class="close-modal '+this.options.closeClass+'">'+this.options.closeText+"</a>"),this.$elm.append(this.closeButton)),this.$elm.addClass(this.options.modalClass).appendTo(this.$blocker),this.options.doFade?this.$elm.css({opacity:0,display:"inline-block"}).animate({opacity:1},this.options.fadeDuration):this.$elm.css("display","inline-block"),this.$elm.trigger(o.modal.OPEN,[this._ctx()])},hide:function(){this.$elm.trigger(o.modal.BEFORE_CLOSE,[this._ctx()]),this.closeButton&&this.closeButton.remove();var t=this;this.options.doFade?this.$elm.fadeOut(this.options.fadeDuration,function(){t.$elm.trigger(o.modal.AFTER_CLOSE,[t._ctx()])}):this.$elm.hide(0,function(){t.$elm.trigger(o.modal.AFTER_CLOSE,[t._ctx()])}),this.$elm.trigger(o.modal.CLOSE,[this._ctx()])},showSpinner:function(){this.options.showSpinner&&(this.spinner=this.spinner||o('<div class="'+this.options.modalClass+'-spinner"></div>').append(this.options.spinnerHtml),this.$body.append(this.spinner),this.spinner.show())},hideSpinner:function(){this.spinner&&this.spinner.remove()},_ctx:function(){return{elm:this.$elm,$elm:this.$elm,$blocker:this.$blocker,options:this.options}}},o.modal.close=function(t){if(o.modal.isActive()){t&&t.preventDefault();var i=l();return i.close(),i.$elm}},o.modal.isActive=function(){return s.length>0},o.modal.getCurrent=l,o.modal.defaults={closeExisting:!0,escapeClose:!0,clickClose:!0,closeText:"Close",closeClass:"",modalClass:"modal",blockerClass:"jquery-modal",spinnerHtml:'<div class="rect1"></div><div class="rect2"></div><div class="rect3"></div><div class="rect4"></div>',showSpinner:!0,showClose:!0,fadeDuration:null,fadeDelay:1},o.modal.BEFORE_BLOCK="modal:before-block",o.modal.BLOCK="modal:block",o.modal.BEFORE_OPEN="modal:before-open",o.modal.OPEN="modal:open",o.modal.BEFORE_CLOSE="modal:before-close",o.modal.CLOSE="modal:close",o.modal.AFTER_CLOSE="modal:after-close",o.modal.AJAX_SEND="modal:ajax:send",o.modal.AJAX_SUCCESS="modal:ajax:success",o.modal.AJAX_FAIL="modal:ajax:fail",o.modal.AJAX_COMPLETE="modal:ajax:complete",o.fn.modal=function(t){return 1===this.length&&new o.modal(this,t),this},o(i).on("click.modal",'a[rel~="modal:close"]',o.modal.close),o(i).on("click.modal",'a[rel~="modal:open"]',function(t){t.preventDefault(),o(this).modal()})});
!function(t,e){"object"==typeof exports&&"undefined"!=typeof module?module.exports=e():"function"==typeof define&&define.amd?define(e):t.Sweetalert2=e()}(this,function(){"use strict";function r(t){return(r="function"==typeof Symbol&&"symbol"==typeof Symbol.iterator?function(t){return typeof t}:function(t){return t&&"function"==typeof Symbol&&t.constructor===Symbol&&t!==Symbol.prototype?"symbol":typeof t})(t)}function o(t,e){if(!(t instanceof e))throw new TypeError("Cannot call a class as a function")}function i(t,e){for(var n=0;n<e.length;n++){var o=e[n];o.enumerable=o.enumerable||!1,o.configurable=!0,"value"in o&&(o.writable=!0),Object.defineProperty(t,o.key,o)}}function a(t,e,n){return e&&i(t.prototype,e),n&&i(t,n),t}function s(){return(s=Object.assign||function(t){for(var e=1;e<arguments.length;e++){var n=arguments[e];for(var o in n)Object.prototype.hasOwnProperty.call(n,o)&&(t[o]=n[o])}return t}).apply(this,arguments)}function u(t){return(u=Object.setPrototypeOf?Object.getPrototypeOf:function(t){return t.__proto__||Object.getPrototypeOf(t)})(t)}function c(t,e){return(c=Object.setPrototypeOf||function(t,e){return t.__proto__=e,t})(t,e)}function l(t,e,n){return(l=function(){if("undefined"==typeof Reflect||!Reflect.construct)return!1;if(Reflect.construct.sham)return!1;if("function"==typeof Proxy)return!0;try{return Date.prototype.toString.call(Reflect.construct(Date,[],function(){})),!0}catch(t){return!1}}()?Reflect.construct:function(t,e,n){var o=[null];o.push.apply(o,e);var i=new(Function.bind.apply(t,o));return n&&c(i,n.prototype),i}).apply(null,arguments)}function d(t,e){return!e||"object"!=typeof e&&"function"!=typeof e?function(t){if(void 0===t)throw new ReferenceError("this hasn't been initialised - super() hasn't been called");return t}(t):e}function p(t,e,n){return(p="undefined"!=typeof Reflect&&Reflect.get?Reflect.get:function(t,e,n){var o=function(t,e){for(;!Object.prototype.hasOwnProperty.call(t,e)&&null!==(t=u(t)););return t}(t,e);if(o){var i=Object.getOwnPropertyDescriptor(o,e);return i.get?i.get.call(n):i.value}})(t,e,n||t)}function f(e){return Object.keys(e).map(function(t){return e[t]})}function m(t){return Array.prototype.slice.call(t)}function g(t){console.error("".concat(e," ").concat(t))}function h(t,e){!function(t){-1===n.indexOf(t)&&(n.push(t),w(t))}('"'.concat(t,'" is deprecated and will be removed in the next major release. Please use "').concat(e,'" instead.'))}function v(t){return t&&Promise.resolve(t)===t}function t(t){var e={};for(var n in t)e[t[n]]="swal2-"+t[n];return e}function b(t,e){return t.classList.contains(e)}function y(e,t,n){m(e.classList).forEach(function(t){-1===f(x).indexOf(t)&&-1===f(S).indexOf(t)&&e.classList.remove(t)}),t&&t[n]&&rt(e,t[n])}var e="SweetAlert2:",w=function(t){console.warn("".concat(e," ").concat(t))},n=[],C=function(t){return"function"==typeof t?t():t},k=Object.freeze({cancel:"cancel",backdrop:"backdrop",close:"close",esc:"esc",timer:"timer"}),x=t(["container","shown","height-auto","iosfix","popup","modal","no-backdrop","toast","toast-shown","toast-column","fade","show","hide","noanimation","close","title","header","content","actions","confirm","cancel","footer","icon","image","input","file","range","select","radio","checkbox","label","textarea","inputerror","validation-message","progress-steps","active-progress-step","progress-step","progress-step-line","loading","styled","top","top-start","top-end","top-left","top-right","center","center-start","center-end","center-left","center-right","bottom","bottom-start","bottom-end","bottom-left","bottom-right","grow-row","grow-column","grow-fullscreen","rtl"]),S=t(["success","warning","info","question","error"]),P={previousBodyPadding:null};function B(t,e){if(!e)return null;switch(e){case"select":case"textarea":case"file":return st(t,x[e]);case"checkbox":return t.querySelector(".".concat(x.checkbox," input"));case"radio":return t.querySelector(".".concat(x.radio," input:checked"))||t.querySelector(".".concat(x.radio," input:first-child"));case"range":return t.querySelector(".".concat(x.range," input"));default:return st(t,x.input)}}function A(t){if(t.focus(),"file"!==t.type){var e=t.value;t.value="",t.value=e}}function E(t,e,n){t&&e&&("string"==typeof e&&(e=e.split(/\s+/).filter(Boolean)),e.forEach(function(e){t.forEach?t.forEach(function(t){n?t.classList.add(e):t.classList.remove(e)}):n?t.classList.add(e):t.classList.remove(e)}))}function T(t,e,n){n||0===parseInt(n)?t.style[e]="number"==typeof n?n+"px":n:t.style.removeProperty(e)}function L(t,e){var n=1<arguments.length&&void 0!==e?e:"flex";t.style.opacity="",t.style.display=n}function O(t){t.style.opacity="",t.style.display="none"}function M(t,e,n){e?L(t,n):O(t)}function V(t){return!(!t||!(t.offsetWidth||t.offsetHeight||t.getClientRects().length))}function H(t){var e=window.getComputedStyle(t),n=parseFloat(e.getPropertyValue("animation-duration")||"0"),o=parseFloat(e.getPropertyValue("transition-duration")||"0");return 0<n||0<o}function j(){return document.body.querySelector("."+x.container)}function I(t){var e=j();return e?e.querySelector(t):null}function q(t){return I("."+t)}function R(){return q(x.popup)}function D(){var t=R();return m(t.querySelectorAll("."+x.icon))}function N(){var t=D().filter(function(t){return V(t)});return t.length?t[0]:null}function U(){return q(x.title)}function F(){return q(x.content)}function _(){return q(x.image)}function z(){return q(x["progress-steps"])}function W(){return q(x["validation-message"])}function K(){return I("."+x.actions+" ."+x.confirm)}function Z(){return I("."+x.actions+" ."+x.cancel)}function Q(){return q(x.actions)}function Y(){return q(x.header)}function $(){return q(x.footer)}function J(){return q(x.close)}function X(){var t=m(R().querySelectorAll('[tabindex]:not([tabindex="-1"]):not([tabindex="0"])')).sort(function(t,e){return t=parseInt(t.getAttribute("tabindex")),(e=parseInt(e.getAttribute("tabindex")))<t?1:t<e?-1:0}),e=m(R().querySelectorAll('\n  a[href],\n  area[href],\n  input:not([disabled]),\n  select:not([disabled]),\n  textarea:not([disabled]),\n  button:not([disabled]),\n  iframe,\n  object,\n  embed,\n  [tabindex="0"],\n  [contenteditable],\n  audio[controls],\n  video[controls],\n  summary\n')).filter(function(t){return"-1"!==t.getAttribute("tabindex")});return function(t){for(var e=[],n=0;n<t.length;n++)-1===e.indexOf(t[n])&&e.push(t[n]);return e}(t.concat(e)).filter(function(t){return V(t)})}function G(){return!ut()&&!document.body.classList.contains(x["no-backdrop"])}function tt(){return"undefined"==typeof window||"undefined"==typeof document}function et(t){Fe.isVisible()&&it!==t.target.value&&Fe.resetValidationMessage(),it=t.target.value}function nt(t,e){t instanceof HTMLElement?e.appendChild(t):"object"===r(t)?dt(e,t):t&&(e.innerHTML=t)}function ot(t,e){var n=Q(),o=K(),i=Z();e.showConfirmButton||e.showCancelButton||O(n),y(n,e.customClass,"actions"),ft(o,"confirm",e),ft(i,"cancel",e),e.buttonsStyling?function(t,e,n){rt([t,e],x.styled),n.confirmButtonColor&&(t.style.backgroundColor=n.confirmButtonColor);n.cancelButtonColor&&(e.style.backgroundColor=n.cancelButtonColor);var o=window.getComputedStyle(t).getPropertyValue("background-color");t.style.borderLeftColor=o,t.style.borderRightColor=o}(o,i,e):(at([o,i],x.styled),o.style.backgroundColor=o.style.borderLeftColor=o.style.borderRightColor="",i.style.backgroundColor=i.style.borderLeftColor=i.style.borderRightColor=""),e.reverseButtons&&o.parentNode.insertBefore(i,o)}var it,rt=function(t,e){E(t,e,!0)},at=function(t,e){E(t,e,!1)},st=function(t,e){for(var n=0;n<t.childNodes.length;n++)if(b(t.childNodes[n],e))return t.childNodes[n]},ut=function(){return document.body.classList.contains(x["toast-shown"])},ct='\n <div aria-labelledby="'.concat(x.title,'" aria-describedby="').concat(x.content,'" class="').concat(x.popup,'" tabindex="-1">\n   <div class="').concat(x.header,'">\n     <ul class="').concat(x["progress-steps"],'"></ul>\n     <div class="').concat(x.icon," ").concat(S.error,'">\n       <span class="swal2-x-mark"><span class="swal2-x-mark-line-left"></span><span class="swal2-x-mark-line-right"></span></span>\n     </div>\n     <div class="').concat(x.icon," ").concat(S.question,'"></div>\n     <div class="').concat(x.icon," ").concat(S.warning,'"></div>\n     <div class="').concat(x.icon," ").concat(S.info,'"></div>\n     <div class="').concat(x.icon," ").concat(S.success,'">\n       <div class="swal2-success-circular-line-left"></div>\n       <span class="swal2-success-line-tip"></span> <span class="swal2-success-line-long"></span>\n       <div class="swal2-success-ring"></div> <div class="swal2-success-fix"></div>\n       <div class="swal2-success-circular-line-right"></div>\n     </div>\n     <img alt="Az?rbaycanda heyvansev?rl?r ���n ilk v? t?k sosial s?b?k?" class="').concat(x.image,'" />\n     <h2 class="').concat(x.title,'" id="').concat(x.title,'"></h2>\n     <button type="button" class="').concat(x.close,'"></button>\n   </div>\n   <div class="').concat(x.content,'">\n     <div id="').concat(x.content,'"></div>\n     <input class="').concat(x.input,'" />\n     <input type="file" class="').concat(x.file,'" />\n     <div class="').concat(x.range,'">\n       <input type="range" />\n       <output></output>\n     </div>\n     <select class="').concat(x.select,'"></select>\n     <div class="').concat(x.radio,'"></div>\n     <label for="').concat(x.checkbox,'" class="').concat(x.checkbox,'">\n       <input type="checkbox" />\n       <span class="').concat(x.label,'"></span>\n     </label>\n     <textarea class="').concat(x.textarea,'"></textarea>\n     <div class="').concat(x["validation-message"],'" id="').concat(x["validation-message"],'"></div>\n   </div>\n   <div class="').concat(x.actions,'">\n     <button type="button" class="').concat(x.confirm,'">OK</button>\n     <button type="button" class="').concat(x.cancel,'">Cancel</button>\n   </div>\n   <div class="').concat(x.footer,'">\n   </div>\n </div>\n').replace(/(^|\n)\s*/g,""),lt=function(t){if(function(){var t=j();t&&(t.parentNode.removeChild(t),at([document.documentElement,document.body],[x["no-backdrop"],x["toast-shown"],x["has-column"]]))}(),tt())g("SweetAlert2 requires document to initialize");else{var e=document.createElement("div");e.className=x.container,e.innerHTML=ct;var n=function(t){return"string"==typeof t?document.querySelector(t):t}(t.target);n.appendChild(e),function(t){var e=R();e.setAttribute("role",t.toast?"alert":"dialog"),e.setAttribute("aria-live",t.toast?"polite":"assertive"),t.toast||e.setAttribute("aria-modal","true")}(t),function(t){"rtl"===window.getComputedStyle(t).direction&&rt(j(),x.rtl)}(n),function(){var t=F(),e=st(t,x.input),n=st(t,x.file),o=t.querySelector(".".concat(x.range," input")),i=t.querySelector(".".concat(x.range," output")),r=st(t,x.select),a=t.querySelector(".".concat(x.checkbox," input")),s=st(t,x.textarea);e.oninput=et,n.onchange=et,r.onchange=et,a.onchange=et,s.oninput=et,o.oninput=function(t){et(t),i.value=o.value},o.onchange=function(t){et(t),o.nextSibling.value=o.value}}()}},dt=function(t,e){if(t.innerHTML="",0 in e)for(var n=0;n in e;n++)t.appendChild(e[n].cloneNode(!0));else t.appendChild(e.cloneNode(!0))},pt=function(){if(tt())return!1;var t=document.createElement("div"),e={WebkitAnimation:"webkitAnimationEnd",OAnimation:"oAnimationEnd oanimationend",animation:"animationend"};for(var n in e)if(Object.prototype.hasOwnProperty.call(e,n)&&void 0!==t.style[n])return e[n];return!1}();function ft(t,e,n){M(t,n["showC"+e.substring(1)+"Button"],"inline-block"),t.innerHTML=n[e+"ButtonText"],t.setAttribute("aria-label",n[e+"ButtonAriaLabel"]),t.className=x[e],y(t,n.customClass,e+"Button"),rt(t,n[e+"ButtonClass"])}function mt(t,e){var n=j();n&&(function(t,e){"string"==typeof e?t.style.background=e:e||rt([document.documentElement,document.body],x["no-backdrop"])}(n,e.backdrop),!e.backdrop&&e.allowOutsideClick&&w('"allowOutsideClick" parameter requires `backdrop` parameter to be set to `true`'),function(t,e){e in x?rt(t,x[e]):(w('The "position" parameter is not valid, defaulting to "center"'),rt(t,x.center))}(n,e.position),function(t,e){if(e&&"string"==typeof e){var n="grow-"+e;n in x&&rt(t,x[n])}}(n,e.grow),y(n,e.customClass,"container"),e.customContainerClass&&rt(n,e.customContainerClass))}function gt(t,e){t.placeholder&&!e.inputPlaceholder||(t.placeholder=e.inputPlaceholder)}var ht={promise:new WeakMap,innerParams:new WeakMap,domCache:new WeakMap},vt=["input","file","range","select","radio","checkbox","textarea"],bt=function(t){if(!Ct[t.input])return g('Unexpected type of input! Expected "text", "email", "password", "number", "tel", "select", "radio", "checkbox", "textarea", "file" or "url", got "'.concat(t.input,'"'));var e=Ct[t.input](t);L(e),setTimeout(function(){A(e)})},yt=function(t,e){var n=B(F(),t);if(n)for(var o in function(t){for(var e=0;e<t.attributes.length;e++){var n=t.attributes[e].name;-1===["type","value","style"].indexOf(n)&&t.removeAttribute(n)}}(n),e)"range"===t&&"placeholder"===o||n.setAttribute(o,e[o])},wt=function(t,e,n){t.className=e,n.inputClass&&rt(t,n.inputClass),n.customClass&&rt(t,n.customClass.input)},Ct={};Ct.text=Ct.email=Ct.password=Ct.number=Ct.tel=Ct.url=function(t){var e=st(F(),x.input);return"string"==typeof t.inputValue||"number"==typeof t.inputValue?e.value=t.inputValue:v(t.inputValue)||w('Unexpected type of inputValue! Expected "string", "number" or "Promise", got "'.concat(r(t.inputValue),'"')),gt(e,t),e.type=t.input,e},Ct.file=function(t){var e=st(F(),x.file);return gt(e,t),e.type=t.input,e},Ct.range=function(t){var e=st(F(),x.range),n=e.querySelector("input"),o=e.querySelector("output");return n.value=t.inputValue,n.type=t.input,o.value=t.inputValue,e},Ct.select=function(t){var e=st(F(),x.select);if(e.innerHTML="",t.inputPlaceholder){var n=document.createElement("option");n.innerHTML=t.inputPlaceholder,n.value="",n.disabled=!0,n.selected=!0,e.appendChild(n)}return e},Ct.radio=function(){var t=st(F(),x.radio);return t.innerHTML="",t},Ct.checkbox=function(t){var e=st(F(),x.checkbox),n=B(F(),"checkbox");return n.type="checkbox",n.value=1,n.id=x.checkbox,n.checked=Boolean(t.inputValue),e.querySelector("span").innerHTML=t.inputPlaceholder,e},Ct.textarea=function(t){var e=st(F(),x.textarea);if(e.value=t.inputValue,gt(e,t),"MutationObserver"in window){var n=parseInt(window.getComputedStyle(R()).width),o=parseInt(window.getComputedStyle(R()).paddingLeft)+parseInt(window.getComputedStyle(R()).paddingRight);new MutationObserver(function(){var t=e.offsetWidth+o;R().style.width=n<t?t+"px":null}).observe(e,{attributes:!0,attributeFilter:["style"]})}return e};function kt(t,e){var n=F().querySelector("#"+x.content);e.html?(nt(e.html,n),L(n,"block")):e.text?(n.textContent=e.text,L(n,"block")):O(n),function(t,o){var i=F(),e=ht.innerParams.get(t),r=!e||o.input!==e.input;vt.forEach(function(t){var e=x[t],n=st(i,e);yt(t,o.inputAttributes),wt(n,e,o),r&&O(n)}),o.input&&r&&bt(o)}(t,e),y(F(),e.customClass,"content")}function xt(t,i){var r=z();if(!i.progressSteps||0===i.progressSteps.length)return O(r);L(r),r.innerHTML="";var a=parseInt(null===i.currentProgressStep?Fe.getQueueStep():i.currentProgressStep);a>=i.progressSteps.length&&w("Invalid currentProgressStep parameter, it should be less than progressSteps.length (currentProgressStep like JS arrays starts from 0)"),i.progressSteps.forEach(function(t,e){var n=function(t){var e=document.createElement("li");return rt(e,x["progress-step"]),e.innerHTML=t,e}(t);if(r.appendChild(n),e===a&&rt(n,x["active-progress-step"]),e!==i.progressSteps.length-1){var o=function(t){var e=document.createElement("li");return rt(e,x["progress-step-line"]),t.progressStepsDistance&&(e.style.width=t.progressStepsDistance),e}(t);r.appendChild(o)}})}function St(t,e){var n=Y();y(n,e.customClass,"header"),xt(0,e),function(t,e){var n=ht.innerParams.get(t);if(n&&e.type===n.type&&N())y(N(),e.customClass,"icon");else if(At(),e.type)if(Et(),-1!==Object.keys(S).indexOf(e.type)){var o=I(".".concat(x.icon,".").concat(S[e.type]));L(o),y(o,e.customClass,"icon"),E(o,"swal2-animate-".concat(e.type,"-icon"),e.animation)}else g('Unknown type! Expected "success", "error", "warning", "info" or "question", got "'.concat(e.type,'"'))}(t,e),function(t,e){var n=_();if(!e.imageUrl)return O(n);L(n),n.setAttribute("src",e.imageUrl),n.setAttribute("alt",e.imageAlt),T(n,"width",e.imageWidth),T(n,"height",e.imageHeight),n.className=x.image,y(n,e.customClass,"image"),e.imageClass&&rt(n,e.imageClass)}(0,e),function(t,e){var n=U();M(n,e.title||e.titleText),e.title&&nt(e.title,n),e.titleText&&(n.innerText=e.titleText),y(n,e.customClass,"title")}(0,e),function(t,e){var n=J();n.innerHTML=e.closeButtonHtml,y(n,e.customClass,"closeButton"),M(n,e.showCloseButton),n.setAttribute("aria-label",e.closeButtonAriaLabel)}(0,e)}function Pt(t,e){!function(t,e){var n=R();T(n,"width",e.width),T(n,"padding",e.padding),e.background&&(n.style.background=e.background),n.className=x.popup,e.toast?(rt([document.documentElement,document.body],x["toast-shown"]),rt(n,x.toast)):rt(n,x.modal),y(n,e.customClass,"popup"),"string"==typeof e.customClass&&rt(n,e.customClass),E(n,x.noanimation,!e.animation)}(0,e),mt(0,e),St(t,e),kt(t,e),ot(0,e),function(t,e){var n=$();M(n,e.footer),e.footer&&nt(e.footer,n),y(n,e.customClass,"footer")}(0,e),"function"==typeof e.onRender&&e.onRender(R())}function Bt(){return K()&&K().click()}var At=function(){for(var t=D(),e=0;e<t.length;e++)O(t[e])},Et=function(){for(var t=R(),e=window.getComputedStyle(t).getPropertyValue("background-color"),n=t.querySelectorAll("[class^=swal2-success-circular-line], .swal2-success-fix"),o=0;o<n.length;o++)n[o].style.backgroundColor=e};function Tt(){var t=R();t||Fe.fire(""),t=R();var e=Q(),n=K(),o=Z();L(e),L(n),rt([t,e],x.loading),n.disabled=!0,o.disabled=!0,t.setAttribute("data-loading",!0),t.setAttribute("aria-busy",!0),t.focus()}function Lt(){return new Promise(function(t){var e=window.scrollX,n=window.scrollY;Ht.restoreFocusTimeout=setTimeout(function(){Ht.previousActiveElement&&Ht.previousActiveElement.focus?(Ht.previousActiveElement.focus(),Ht.previousActiveElement=null):document.body&&document.body.focus(),t()},100),void 0!==e&&void 0!==n&&window.scrollTo(e,n)})}function Ot(t){return Object.prototype.hasOwnProperty.call(jt,t)}function Mt(t){return qt[t]}var Vt=[],Ht={},jt={title:"",titleText:"",text:"",html:"",footer:"",type:null,toast:!1,customClass:"",customContainerClass:"",target:"body",backdrop:!0,animation:!0,heightAuto:!0,allowOutsideClick:!0,allowEscapeKey:!0,allowEnterKey:!0,stopKeydownPropagation:!0,keydownListenerCapture:!1,showConfirmButton:!0,showCancelButton:!1,preConfirm:null,confirmButtonText:"OK",confirmButtonAriaLabel:"",confirmButtonColor:null,confirmButtonClass:"",cancelButtonText:"Cancel",cancelButtonAriaLabel:"",cancelButtonColor:null,cancelButtonClass:"",buttonsStyling:!0,reverseButtons:!1,focusConfirm:!0,focusCancel:!1,showCloseButton:!1,closeButtonHtml:"&times;",closeButtonAriaLabel:"Close this dialog",showLoaderOnConfirm:!1,imageUrl:null,imageWidth:null,imageHeight:null,imageAlt:"",imageClass:"",timer:null,width:null,padding:null,background:null,input:null,inputPlaceholder:"",inputValue:"",inputOptions:{},inputAutoTrim:!0,inputClass:"",inputAttributes:{},inputValidator:null,validationMessage:null,grow:!1,position:"center",progressSteps:[],currentProgressStep:null,progressStepsDistance:null,onBeforeOpen:null,onOpen:null,onRender:null,onClose:null,onAfterClose:null,scrollbarPadding:!0},It=["title","titleText","text","html","type","customClass","showConfirmButton","showCancelButton","confirmButtonText","confirmButtonAriaLabel","confirmButtonColor","confirmButtonClass","cancelButtonText","cancelButtonAriaLabel","cancelButtonColor","cancelButtonClass","buttonsStyling","reverseButtons","imageUrl","imageWidth","imageHeigth","imageAlt","imageClass","progressSteps","currentProgressStep"],qt={customContainerClass:"customClass",confirmButtonClass:"customClass",cancelButtonClass:"customClass",imageClass:"customClass",inputClass:"customClass"},Rt=["allowOutsideClick","allowEnterKey","backdrop","focusConfirm","focusCancel","heightAuto","keydownListenerCapture"],Dt=Object.freeze({isValidParameter:Ot,isUpdatableParameter:function(t){return-1!==It.indexOf(t)},isDeprecatedParameter:Mt,argsToParams:function(n){var o={};switch(r(n[0])){case"object":s(o,n[0]);break;default:["title","html","type"].forEach(function(t,e){switch(r(n[e])){case"string":o[t]=n[e];break;case"undefined":break;default:g("Unexpected type of ".concat(t,'! Expected "string", got ').concat(r(n[e])))}})}return o},isVisible:function(){return V(R())},clickConfirm:Bt,clickCancel:function(){return Z()&&Z().click()},getContainer:j,getPopup:R,getTitle:U,getContent:F,getImage:_,getIcon:N,getIcons:D,getCloseButton:J,getActions:Q,getConfirmButton:K,getCancelButton:Z,getHeader:Y,getFooter:$,getFocusableElements:X,getValidationMessage:W,isLoading:function(){return R().hasAttribute("data-loading")},fire:function(){for(var t=arguments.length,e=new Array(t),n=0;n<t;n++)e[n]=arguments[n];return l(this,e)},mixin:function(n){return function(t){function e(){return o(this,e),d(this,u(e).apply(this,arguments))}return function(t,e){if("function"!=typeof e&&null!==e)throw new TypeError("Super expression must either be null or a function");t.prototype=Object.create(e&&e.prototype,{constructor:{value:t,writable:!0,configurable:!0}}),e&&c(t,e)}(e,t),a(e,[{key:"_main",value:function(t){return p(u(e.prototype),"_main",this).call(this,s({},n,t))}}]),e}(this)},queue:function(t){var r=this;Vt=t;function a(t,e){Vt=[],document.body.removeAttribute("data-swal2-queue-step"),t(e)}var s=[];return new Promise(function(i){!function e(n,o){n<Vt.length?(document.body.setAttribute("data-swal2-queue-step",n),r.fire(Vt[n]).then(function(t){void 0!==t.value?(s.push(t.value),e(n+1,o)):a(i,{dismiss:t.dismiss})})):a(i,{value:s})}(0)})},getQueueStep:function(){return document.body.getAttribute("data-swal2-queue-step")},insertQueueStep:function(t,e){return e&&e<Vt.length?Vt.splice(e,0,t):Vt.push(t)},deleteQueueStep:function(t){void 0!==Vt[t]&&Vt.splice(t,1)},showLoading:Tt,enableLoading:Tt,getTimerLeft:function(){return Ht.timeout&&Ht.timeout.getTimerLeft()},stopTimer:function(){return Ht.timeout&&Ht.timeout.stop()},resumeTimer:function(){return Ht.timeout&&Ht.timeout.start()},toggleTimer:function(){var t=Ht.timeout;return t&&(t.running?t.stop():t.start())},increaseTimer:function(t){return Ht.timeout&&Ht.timeout.increase(t)},isTimerRunning:function(){return Ht.timeout&&Ht.timeout.isRunning()}});function Nt(){var t=ht.innerParams.get(this),e=ht.domCache.get(this);t.showConfirmButton||(O(e.confirmButton),t.showCancelButton||O(e.actions)),at([e.popup,e.actions],x.loading),e.popup.removeAttribute("aria-busy"),e.popup.removeAttribute("data-loading"),e.confirmButton.disabled=!1,e.cancelButton.disabled=!1}function Ut(){null===P.previousBodyPadding&&document.body.scrollHeight>window.innerHeight&&(P.previousBodyPadding=parseInt(window.getComputedStyle(document.body).getPropertyValue("padding-right")),document.body.style.paddingRight=P.previousBodyPadding+function(){if("ontouchstart"in window||navigator.msMaxTouchPoints)return 0;var t=document.createElement("div");t.style.width="50px",t.style.height="50px",t.style.overflow="scroll",document.body.appendChild(t);var e=t.offsetWidth-t.clientWidth;return document.body.removeChild(t),e}()+"px")}function Ft(){return!!window.MSInputMethodContext&&!!document.documentMode}function _t(){var t=j(),e=R();t.style.removeProperty("align-items"),e.offsetTop<0&&(t.style.alignItems="flex-start")}var zt=function(){var e,n=j();n.ontouchstart=function(t){e=t.target===n||!function(t){return!!(t.scrollHeight>t.clientHeight)}(n)&&"INPUT"!==t.target.tagName},n.ontouchmove=function(t){e&&(t.preventDefault(),t.stopPropagation())}},Wt={swalPromiseResolve:new WeakMap};function Kt(t,e,n,o){n?$t(t,o):(Lt().then(function(){return $t(t,o)}),Ht.keydownTarget.removeEventListener("keydown",Ht.keydownHandler,{capture:Ht.keydownListenerCapture}),Ht.keydownHandlerAdded=!1),e.parentNode&&e.parentNode.removeChild(e),G()&&(null!==P.previousBodyPadding&&(document.body.style.paddingRight=P.previousBodyPadding+"px",P.previousBodyPadding=null),function(){if(b(document.body,x.iosfix)){var t=parseInt(document.body.style.top,10);at(document.body,x.iosfix),document.body.style.top="",document.body.scrollTop=-1*t}}(),"undefined"!=typeof window&&Ft()&&window.removeEventListener("resize",_t),m(document.body.children).forEach(function(t){t.hasAttribute("data-previous-aria-hidden")?(t.setAttribute("aria-hidden",t.getAttribute("data-previous-aria-hidden")),t.removeAttribute("data-previous-aria-hidden")):t.removeAttribute("aria-hidden")})),at([document.documentElement,document.body],[x.shown,x["height-auto"],x["no-backdrop"],x["toast-shown"],x["toast-column"]])}function Zt(t){var e=R();if(e&&!b(e,x.hide)){var n=ht.innerParams.get(this);if(n){var o=Wt.swalPromiseResolve.get(this);at(e,x.show),rt(e,x.hide),function(t,e,n){var o=j(),i=pt&&H(e),r=n.onClose,a=n.onAfterClose;if(r!==null&&typeof r==="function"){r(e)}if(i){Yt(t,e,o,a)}else{Kt(t,o,ut(),a)}}(this,e,n),o(t||{})}}}function Qt(t){for(var e in t)t[e]=new WeakMap}var Yt=function(t,e,n,o){Ht.swalCloseEventFinishedCallback=Kt.bind(null,t,n,ut(),o),e.addEventListener(pt,function(t){t.target===e&&(Ht.swalCloseEventFinishedCallback(),delete Ht.swalCloseEventFinishedCallback)})},$t=function(t,e){setTimeout(function(){null!==e&&"function"==typeof e&&e(),R()||function(t){delete t.params,delete Ht.keydownHandler,delete Ht.keydownTarget,Qt(ht),Qt(Wt)}(t)})};function Jt(t,e,n){var o=ht.domCache.get(t);e.forEach(function(t){o[t].disabled=n})}function Xt(t,e){if(!t)return!1;if("radio"===t.type)for(var n=t.parentNode.parentNode.querySelectorAll("input"),o=0;o<n.length;o++)n[o].disabled=e;else t.disabled=e}var Gt=function(){function n(t,e){o(this,n),this.callback=t,this.remaining=e,this.running=!1,this.start()}return a(n,[{key:"start",value:function(){return this.running||(this.running=!0,this.started=new Date,this.id=setTimeout(this.callback,this.remaining)),this.remaining}},{key:"stop",value:function(){return this.running&&(this.running=!1,clearTimeout(this.id),this.remaining-=new Date-this.started),this.remaining}},{key:"increase",value:function(t){var e=this.running;return e&&this.stop(),this.remaining+=t,e&&this.start(),this.remaining}},{key:"getTimerLeft",value:function(){return this.running&&(this.stop(),this.start()),this.remaining}},{key:"isRunning",value:function(){return this.running}}]),n}(),te={email:function(t,e){return/^[a-zA-Z0-9.+_-]+@[a-zA-Z0-9.-]+\.[a-zA-Z0-9-]{2,24}$/.test(t)?Promise.resolve():Promise.resolve(e||"Invalid email address")},url:function(t,e){return/^https?:\/\/(www\.)?[-a-zA-Z0-9@:%._+~#=]{2,256}\.[a-z]{2,63}\b([-a-zA-Z0-9@:%_+.~#?&/=]*)$/.test(t)?Promise.resolve():Promise.resolve(e||"Invalid URL")}};function ee(t){!function(e){e.inputValidator||Object.keys(te).forEach(function(t){e.input===t&&(e.inputValidator=te[t])})}(t),t.showLoaderOnConfirm&&!t.preConfirm&&w("showLoaderOnConfirm is set to true, but preConfirm is not defined.\nshowLoaderOnConfirm should be used together with preConfirm, see usage example:\nhttps://sweetalert2.github.io/#ajax-request"),t.animation=C(t.animation),function(t){t.target&&("string"!=typeof t.target||document.querySelector(t.target))&&("string"==typeof t.target||t.target.appendChild)||(w('Target parameter is not valid, defaulting to "body"'),t.target="body")}(t),"string"==typeof t.title&&(t.title=t.title.split("\n").join("<br />")),lt(t)}function ne(t,e){t.removeEventListener(pt,ne),e.style.overflowY="auto"}function oe(t){var e=j(),n=R();"function"==typeof t.onBeforeOpen&&t.onBeforeOpen(n),fe(e,n,t),de(e,n),G()&&pe(e,t.scrollbarPadding),ut()||Ht.previousActiveElement||(Ht.previousActiveElement=document.activeElement),"function"==typeof t.onOpen&&setTimeout(function(){return t.onOpen(n)})}function ie(t,e){"select"===e.input||"radio"===e.input?me(t,e):-1!==["text","email","number","tel","textarea"].indexOf(e.input)&&v(e.inputValue)&&ge(t,e)}function re(t,e){t.disableButtons(),e.input?be(t,e):ye(t,e,!0)}function ae(t,e){t.disableButtons(),e(k.cancel)}function se(t,e){t.closePopup({value:e})}function ue(e,t,n,o){t.keydownTarget&&t.keydownHandlerAdded&&(t.keydownTarget.removeEventListener("keydown",t.keydownHandler,{capture:t.keydownListenerCapture}),t.keydownHandlerAdded=!1),n.toast||(t.keydownHandler=function(t){return Be(e,t,n,o)},t.keydownTarget=n.keydownListenerCapture?window:R(),t.keydownListenerCapture=n.keydownListenerCapture,t.keydownTarget.addEventListener("keydown",t.keydownHandler,{capture:t.keydownListenerCapture}),t.keydownHandlerAdded=!0)}function ce(t,e,n){for(var o=X(t.focusCancel),i=0;i<o.length;i++)return(e+=n)===o.length?e=0:-1===e&&(e=o.length-1),o[e].focus();R().focus()}function le(t,e,n){e.toast?Oe(t,e,n):(Ve(t),He(t),je(t,e,n))}var de=function(t,e){pt&&H(e)?(t.style.overflowY="hidden",e.addEventListener(pt,ne.bind(null,e,t))):t.style.overflowY="auto"},pe=function(t,e){!function(){if(/iPad|iPhone|iPod/.test(navigator.userAgent)&&!window.MSStream&&!b(document.body,x.iosfix)){var t=document.body.scrollTop;document.body.style.top=-1*t+"px",rt(document.body,x.iosfix),zt()}}(),"undefined"!=typeof window&&Ft()&&(_t(),window.addEventListener("resize",_t)),m(document.body.children).forEach(function(t){t===j()||function(t,e){if("function"==typeof t.contains)return t.contains(e)}(t,j())||(t.hasAttribute("aria-hidden")&&t.setAttribute("data-previous-aria-hidden",t.getAttribute("aria-hidden")),t.setAttribute("aria-hidden","true"))}),e&&Ut(),setTimeout(function(){t.scrollTop=0})},fe=function(t,e,n){n.animation&&(rt(e,x.show),rt(t,x.fade)),L(e),rt([document.documentElement,document.body,t],x.shown),n.heightAuto&&n.backdrop&&!n.toast&&rt([document.documentElement,document.body],x["height-auto"])},me=function(e,n){function o(t){return he[n.input](i,ve(t),n)}var i=F();v(n.inputOptions)?(Tt(),n.inputOptions.then(function(t){e.hideLoading(),o(t)})):"object"===r(n.inputOptions)?o(n.inputOptions):g("Unexpected type of inputOptions! Expected object, Map or Promise, got ".concat(r(n.inputOptions)))},ge=function(e,n){var o=e.getInput();O(o),n.inputValue.then(function(t){o.value="number"===n.input?parseFloat(t)||0:t+"",L(o),o.focus(),e.hideLoading()}).catch(function(t){g("Error in inputValue promise: "+t),o.value="",L(o),o.focus(),e.hideLoading()})},he={select:function(t,e,i){var r=st(t,x.select);e.forEach(function(t){var e=t[0],n=t[1],o=document.createElement("option");o.value=e,o.innerHTML=n,i.inputValue.toString()===e.toString()&&(o.selected=!0),r.appendChild(o)}),r.focus()},radio:function(t,e,a){var s=st(t,x.radio);e.forEach(function(t){var e=t[0],n=t[1],o=document.createElement("input"),i=document.createElement("label");o.type="radio",o.name=x.radio,o.value=e,a.inputValue.toString()===e.toString()&&(o.checked=!0);var r=document.createElement("span");r.innerHTML=n,r.className=x.label,i.appendChild(o),i.appendChild(r),s.appendChild(i)});var n=s.querySelectorAll("input");n.length&&n[0].focus()}},ve=function(e){var n=[];return"undefined"!=typeof Map&&e instanceof Map?e.forEach(function(t,e){n.push([e,t])}):Object.keys(e).forEach(function(t){n.push([t,e[t]])}),n},be=function(e,n){var o=we(e,n);n.inputValidator?(e.disableInput(),Promise.resolve().then(function(){return n.inputValidator(o,n.validationMessage)}).then(function(t){e.enableButtons(),e.enableInput(),t?e.showValidationMessage(t):ye(e,n,o)})):e.getInput().checkValidity()?ye(e,n,o):(e.enableButtons(),e.showValidationMessage(n.validationMessage))},ye=function(e,t,n){(t.showLoaderOnConfirm&&Tt(),t.preConfirm)?(e.resetValidationMessage(),Promise.resolve().then(function(){return t.preConfirm(n,t.validationMessage)}).then(function(t){V(W())||!1===t?e.hideLoading():se(e,void 0===t?n:t)})):se(e,n)},we=function(t,e){var n=t.getInput();if(!n)return null;switch(e.input){case"checkbox":return Ce(n);case"radio":return ke(n);case"file":return xe(n);default:return e.inputAutoTrim?n.value.trim():n.value}},Ce=function(t){return t.checked?1:0},ke=function(t){return t.checked?t.value:null},xe=function(t){return t.files.length?t.files[0]:null},Se=["ArrowLeft","ArrowRight","ArrowUp","ArrowDown","Left","Right","Up","Down"],Pe=["Escape","Esc"],Be=function(t,e,n,o){n.stopKeydownPropagation&&e.stopPropagation(),"Enter"===e.key?Ae(t,e,n):"Tab"===e.key?Ee(e,n):-1!==Se.indexOf(e.key)?Te():-1!==Pe.indexOf(e.key)&&Le(e,n,o)},Ae=function(t,e,n){if(!e.isComposing&&e.target&&t.getInput()&&e.target.outerHTML===t.getInput().outerHTML){if(-1!==["textarea","file"].indexOf(n.input))return;Bt(),e.preventDefault()}},Ee=function(t,e){for(var n=t.target,o=X(e.focusCancel),i=-1,r=0;r<o.length;r++)if(n===o[r]){i=r;break}t.shiftKey?ce(e,i,-1):ce(e,i,1),t.stopPropagation(),t.preventDefault()},Te=function(){var t=K(),e=Z();document.activeElement===t&&V(e)?e.focus():document.activeElement===e&&V(t)&&t.focus()},Le=function(t,e,n){C(e.allowEscapeKey)&&(t.preventDefault(),n(k.esc))},Oe=function(t,e,n){t.popup.onclick=function(){e.showConfirmButton||e.showCancelButton||e.showCloseButton||e.input||n(k.close)}},Me=!1,Ve=function(e){e.popup.onmousedown=function(){e.container.onmouseup=function(t){e.container.onmouseup=void 0,t.target===e.container&&(Me=!0)}}},He=function(e){e.container.onmousedown=function(){e.popup.onmouseup=function(t){e.popup.onmouseup=void 0,t.target!==e.popup&&!e.popup.contains(t.target)||(Me=!0)}}},je=function(e,n,o){e.container.onclick=function(t){Me?Me=!1:t.target===e.container&&C(n.allowOutsideClick)&&o(k.backdrop)}};var Ie=function(t,e,n){e.timer&&(t.timeout=new Gt(function(){n("timer"),delete t.timeout},e.timer))},qe=function(t,e){if(!e.toast)return C(e.allowEnterKey)?e.focusCancel&&V(t.cancelButton)?t.cancelButton.focus():e.focusConfirm&&V(t.confirmButton)?t.confirmButton.focus():void ce(e,-1,1):Re()},Re=function(){document.activeElement&&"function"==typeof document.activeElement.blur&&document.activeElement.blur()};var De,Ne=Object.freeze({hideLoading:Nt,disableLoading:Nt,getInput:function(t){var e=ht.innerParams.get(t||this),n=ht.domCache.get(t||this);return n?B(n.content,e.input):null},close:Zt,closePopup:Zt,closeModal:Zt,closeToast:Zt,enableButtons:function(){Jt(this,["confirmButton","cancelButton"],!1)},disableButtons:function(){Jt(this,["confirmButton","cancelButton"],!0)},enableConfirmButton:function(){h("Swal.enableConfirmButton()","Swal.getConfirmButton().removeAttribute('disabled')"),Jt(this,["confirmButton"],!1)},disableConfirmButton:function(){h("Swal.disableConfirmButton()","Swal.getConfirmButton().setAttribute('disabled', '')"),Jt(this,["confirmButton"],!0)},enableInput:function(){return Xt(this.getInput(),!1)},disableInput:function(){return Xt(this.getInput(),!0)},showValidationMessage:function(t){var e=ht.domCache.get(this);e.validationMessage.innerHTML=t;var n=window.getComputedStyle(e.popup);e.validationMessage.style.marginLeft="-".concat(n.getPropertyValue("padding-left")),e.validationMessage.style.marginRight="-".concat(n.getPropertyValue("padding-right")),L(e.validationMessage);var o=this.getInput();o&&(o.setAttribute("aria-invalid",!0),o.setAttribute("aria-describedBy",x["validation-message"]),A(o),rt(o,x.inputerror))},resetValidationMessage:function(){var t=ht.domCache.get(this);t.validationMessage&&O(t.validationMessage);var e=this.getInput();e&&(e.removeAttribute("aria-invalid"),e.removeAttribute("aria-describedBy"),at(e,x.inputerror))},getProgressSteps:function(){return h("Swal.getProgressSteps()","const swalInstance = Swal.fire({progressSteps: ['1', '2', '3']}); const progressSteps = swalInstance.params.progressSteps"),ht.innerParams.get(this).progressSteps},setProgressSteps:function(t){h("Swal.setProgressSteps()","Swal.update()");var e=s({},ht.innerParams.get(this),{progressSteps:t});xt(0,e),ht.innerParams.set(this,e)},showProgressSteps:function(){var t=ht.domCache.get(this);L(t.progressSteps)},hideProgressSteps:function(){var t=ht.domCache.get(this);O(t.progressSteps)},_main:function(t){!function(t){for(var e in t)Ot(i=e)||w('Unknown parameter "'.concat(i,'"')),t.toast&&(o=e,-1!==Rt.indexOf(o)&&w('The parameter "'.concat(o,'" is incompatible with toasts'))),Mt(n=void 0)&&h(n,Mt(n));var n,o,i}(t),R()&&Ht.swalCloseEventFinishedCallback&&(Ht.swalCloseEventFinishedCallback(),delete Ht.swalCloseEventFinishedCallback),Ht.deferDisposalTimer&&(clearTimeout(Ht.deferDisposalTimer),delete Ht.deferDisposalTimer);var e=s({},jt,t);ee(e),Object.freeze(e),Ht.timeout&&(Ht.timeout.stop(),delete Ht.timeout),clearTimeout(Ht.restoreFocusTimeout);var n=function(t){var e={popup:R(),container:j(),content:F(),actions:Q(),confirmButton:K(),cancelButton:Z(),closeButton:J(),validationMessage:W(),progressSteps:z()};return ht.domCache.set(t,e),e}(this);return Pt(this,e),ht.innerParams.set(this,e),function(n,o,i){return new Promise(function(t){var e=function t(e){n.closePopup({dismiss:e})};Wt.swalPromiseResolve.set(n,t);Ie(Ht,i,e);o.confirmButton.onclick=function(){return re(n,i)};o.cancelButton.onclick=function(){return ae(n,e)};o.closeButton.onclick=function(){return e(k.close)};le(o,i,e);ue(n,Ht,i,e);if(i.toast&&(i.input||i.footer||i.showCloseButton)){rt(document.body,x["toast-column"])}else{at(document.body,x["toast-column"])}ie(n,i);oe(i);qe(o,i);o.container.scrollTop=0})}(this,n,e)},update:function(e){var n={};Object.keys(e).forEach(function(t){Fe.isUpdatableParameter(t)?n[t]=e[t]:w('Invalid parameter to update: "'.concat(t,'". Updatable params are listed here: https://github.com/sweetalert2/sweetalert2/blob/master/src/utils/params.js'))});var t=s({},ht.innerParams.get(this),n);Pt(this,t),ht.innerParams.set(this,t),Object.defineProperties(this,{params:{value:s({},this.params,e),writable:!1,enumerable:!0}})}});function Ue(){if("undefined"!=typeof window){"undefined"==typeof Promise&&g("This package requires a Promise library, please include a shim to enable it in this browser (See: https://github.com/sweetalert2/sweetalert2/wiki/Migration-from-SweetAlert-to-SweetAlert2#1-ie-support)"),De=this;for(var t=arguments.length,e=new Array(t),n=0;n<t;n++)e[n]=arguments[n];var o=Object.freeze(this.constructor.argsToParams(e));Object.defineProperties(this,{params:{value:o,writable:!1,enumerable:!0,configurable:!0}});var i=this._main(this.params);ht.promise.set(this,i)}}Ue.prototype.then=function(t){return ht.promise.get(this).then(t)},Ue.prototype.finally=function(t){return ht.promise.get(this).finally(t)},s(Ue.prototype,Ne),s(Ue,Dt),Object.keys(Ne).forEach(function(e){Ue[e]=function(){var t;if(De)return(t=De)[e].apply(t,arguments)}}),Ue.DismissReason=k,Ue.version="8.17.1";var Fe=Ue;return Fe.default=Fe}),void 0!==this&&this.Sweetalert2&&(this.swal=this.sweetAlert=this.Swal=this.SweetAlert=this.Sweetalert2);