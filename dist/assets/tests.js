'use strict';

define('dummy/tests/app.lint-test', [], function () {
  'use strict';

  QUnit.module('ESLint | app');

  QUnit.test('app.js', function (assert) {
    assert.expect(1);
    assert.ok(true, 'app.js should pass ESLint\n\n');
  });

  QUnit.test('controllers/application.js', function (assert) {
    assert.expect(1);
    assert.ok(true, 'controllers/application.js should pass ESLint\n\n');
  });

  QUnit.test('resolver.js', function (assert) {
    assert.expect(1);
    assert.ok(true, 'resolver.js should pass ESLint\n\n');
  });

  QUnit.test('router.js', function (assert) {
    assert.expect(1);
    assert.ok(true, 'router.js should pass ESLint\n\n');
  });
});
define('dummy/tests/helpers/destroy-app', ['exports', 'ember'], function (exports, _ember) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.default = destroyApp;
  var run = _ember.default.run;
  function destroyApp(application) {
    run(application, 'destroy');
  }
});
define('dummy/tests/helpers/ember-basic-dropdown', ['exports', 'ember', 'ember-runloop', 'ember-native-dom-helpers', 'ember-test-helpers/wait'], function (exports, _ember, _emberRunloop, _emberNativeDomHelpers, _wait) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.nativeClick = undefined;
  exports.nativeTap = nativeTap;
  exports.clickTrigger = clickTrigger;
  exports.tapTrigger = tapTrigger;
  exports.fireKeydown = fireKeydown;

  exports.default = function () {
    _ember.default.Test.registerAsyncHelper('clickDropdown', function (app, cssPath) {
      var options = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : {};

      clickTrigger(cssPath, options);
    });

    _ember.default.Test.registerAsyncHelper('tapDropdown', function (app, cssPath) {
      var options = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : {};

      tapTrigger(cssPath, options);
    });
  };

  var nativeClick = exports.nativeClick = _emberNativeDomHelpers.click;
  var merge = _ember.default.merge;
  function nativeTap(selector) {
    var options = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};

    var touchStartEvent = new window.Event('touchstart', { bubbles: true, cancelable: true, view: window });
    Object.keys(options).forEach(function (key) {
      return touchStartEvent[key] = options[key];
    });
    (0, _emberRunloop.default)(function () {
      return document.querySelector(selector).dispatchEvent(touchStartEvent);
    });
    var touchEndEvent = new window.Event('touchend', { bubbles: true, cancelable: true, view: window });
    Object.keys(options).forEach(function (key) {
      return touchEndEvent[key] = options[key];
    });
    (0, _emberRunloop.default)(function () {
      return document.querySelector(selector).dispatchEvent(touchEndEvent);
    });
  }

  function clickTrigger(scope) {
    var options = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};

    var selector = '.ember-basic-dropdown-trigger';
    if (scope) {
      var element = document.querySelector(scope);
      if (element.classList.contains('ember-basic-dropdown-trigger')) {
        selector = scope;
      } else {
        selector = scope + ' ' + selector;
      }
    }
    (0, _emberNativeDomHelpers.click)(selector, options);
    return (0, _wait.default)();
  }

  function tapTrigger(scope) {
    var options = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};

    var selector = '.ember-basic-dropdown-trigger';
    if (scope) {
      selector = scope + ' ' + selector;
    }
    nativeTap(selector, options);
  }

  function fireKeydown(selector, k) {
    var oEvent = document.createEvent('Events');
    oEvent.initEvent('keydown', true, true);
    merge(oEvent, {
      view: window,
      ctrlKey: false,
      altKey: false,
      shiftKey: false,
      metaKey: false,
      keyCode: k,
      charCode: k
    });
    (0, _emberRunloop.default)(function () {
      return document.querySelector(selector).dispatchEvent(oEvent);
    });
  }

  // acceptance helpers
});
define('dummy/tests/helpers/ember-power-select', ['exports', 'ember', 'ember-test', 'ember-test-helpers/wait', 'ember-native-dom-helpers'], function (exports, _ember, _emberTest, _wait, _emberNativeDomHelpers) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.selectChoose = undefined;
  exports.findContains = findContains;
  exports.nativeMouseDown = nativeMouseDown;
  exports.nativeMouseUp = nativeMouseUp;
  exports.triggerKeydown = triggerKeydown;
  exports.typeInSearch = typeInSearch;
  exports.clickTrigger = clickTrigger;
  exports.nativeTouch = nativeTouch;
  exports.touchTrigger = touchTrigger;

  exports.default = function () {
    _emberTest.default.registerAsyncHelper('selectChoose', function (_, cssPathOrTrigger, valueOrSelector, optionIndex) {
      return selectChoose(cssPathOrTrigger, valueOrSelector, optionIndex);
    });

    _emberTest.default.registerAsyncHelper('selectSearch', function () {
      var _ref2 = _asyncToGenerator(regeneratorRuntime.mark(function _callee2(app, cssPathOrTrigger, value) {
        var trigger, triggerPath, contentId, isMultipleSelect, content, dropdownIsClosed, isDefaultSingleSelect, inputIsInTrigger;
        return regeneratorRuntime.wrap(function _callee2$(_context2) {
          while (1) {
            switch (_context2.prev = _context2.next) {
              case 0:
                trigger = void 0;

                if (!(cssPathOrTrigger instanceof HTMLElement)) {
                  _context2.next = 5;
                  break;
                }

                trigger = cssPathOrTrigger;
                _context2.next = 10;
                break;

              case 5:
                triggerPath = cssPathOrTrigger + ' .ember-power-select-trigger';

                trigger = (0, _emberNativeDomHelpers.find)(triggerPath);
                if (!trigger) {
                  triggerPath = cssPathOrTrigger;
                  trigger = (0, _emberNativeDomHelpers.find)(triggerPath);
                }

                if (trigger) {
                  _context2.next = 10;
                  break;
                }

                throw new Error('You called "selectSearch(\'' + cssPathOrTrigger + '\', \'' + value + '\')" but no select was found using selector "' + cssPathOrTrigger + '"');

              case 10:
                contentId = '' + trigger.attributes['aria-owns'].value;
                isMultipleSelect = !!(0, _emberNativeDomHelpers.find)('.ember-power-select-trigger-multiple-input', trigger);
                content = (0, _emberNativeDomHelpers.find)('#' + contentId);
                dropdownIsClosed = !content || content.classList.contains('ember-basic-dropdown-content-placeholder');

                if (!dropdownIsClosed) {
                  _context2.next = 19;
                  break;
                }

                _context2.next = 17;
                return (0, _emberNativeDomHelpers.click)(trigger);

              case 17:
                _context2.next = 19;
                return (0, _wait.default)();

              case 19:
                isDefaultSingleSelect = !!(0, _emberNativeDomHelpers.find)('.ember-power-select-search-input');

                if (!isMultipleSelect) {
                  _context2.next = 25;
                  break;
                }

                _context2.next = 23;
                return (0, _emberNativeDomHelpers.fillIn)((0, _emberNativeDomHelpers.find)('.ember-power-select-trigger-multiple-input', trigger), value);

              case 23:
                _context2.next = 38;
                break;

              case 25:
                if (!isDefaultSingleSelect) {
                  _context2.next = 30;
                  break;
                }

                _context2.next = 28;
                return (0, _emberNativeDomHelpers.fillIn)('.ember-power-select-search-input', value);

              case 28:
                _context2.next = 38;
                break;

              case 30:
                // It's probably a customized version
                inputIsInTrigger = !!(0, _emberNativeDomHelpers.find)('.ember-power-select-trigger input[type=search]', trigger);

                if (!inputIsInTrigger) {
                  _context2.next = 36;
                  break;
                }

                _context2.next = 34;
                return (0, _emberNativeDomHelpers.fillIn)((0, _emberNativeDomHelpers.find)('input[type=search]', trigger), value);

              case 34:
                _context2.next = 38;
                break;

              case 36:
                _context2.next = 38;
                return (0, _emberNativeDomHelpers.fillIn)('#' + contentId + ' .ember-power-select-search-input[type=search]', 'input');

              case 38:
                return _context2.abrupt('return', (0, _wait.default)());

              case 39:
              case 'end':
                return _context2.stop();
            }
          }
        }, _callee2, this);
      }));

      return function (_x5, _x6, _x7) {
        return _ref2.apply(this, arguments);
      };
    }());

    _emberTest.default.registerAsyncHelper('removeMultipleOption', function () {
      var _ref3 = _asyncToGenerator(regeneratorRuntime.mark(function _callee3(app, cssPath, value) {
        var elem, items, item;
        return regeneratorRuntime.wrap(function _callee3$(_context3) {
          while (1) {
            switch (_context3.prev = _context3.next) {
              case 0:
                elem = void 0;
                items = [].slice.apply((0, _emberNativeDomHelpers.findAll)(cssPath + ' .ember-power-select-multiple-options > li'));
                item = items.find(function (el) {
                  return el.textContent.indexOf(value) > -1;
                });

                if (item) {
                  elem = (0, _emberNativeDomHelpers.find)('.ember-power-select-multiple-remove-btn', item);
                }
                _context3.prev = 4;
                _context3.next = 7;
                return (0, _emberNativeDomHelpers.click)(elem);

              case 7:
                return _context3.abrupt('return', (0, _wait.default)());

              case 10:
                _context3.prev = 10;
                _context3.t0 = _context3['catch'](4);

                console.warn('css path to remove btn not found');
                throw _context3.t0;

              case 14:
              case 'end':
                return _context3.stop();
            }
          }
        }, _callee3, this, [[4, 10]]);
      }));

      return function (_x8, _x9, _x10) {
        return _ref3.apply(this, arguments);
      };
    }());

    _emberTest.default.registerAsyncHelper('clearSelected', function () {
      var _ref4 = _asyncToGenerator(regeneratorRuntime.mark(function _callee4(app, cssPath) {
        var elem;
        return regeneratorRuntime.wrap(function _callee4$(_context4) {
          while (1) {
            switch (_context4.prev = _context4.next) {
              case 0:
                elem = (0, _emberNativeDomHelpers.find)(cssPath + ' .ember-power-select-clear-btn');
                _context4.prev = 1;
                _context4.next = 4;
                return (0, _emberNativeDomHelpers.click)(elem);

              case 4:
                return _context4.abrupt('return', (0, _wait.default)());

              case 7:
                _context4.prev = 7;
                _context4.t0 = _context4['catch'](1);

                console.warn('css path to clear btn not found');
                throw _context4.t0;

              case 11:
              case 'end':
                return _context4.stop();
            }
          }
        }, _callee4, this, [[1, 7]]);
      }));

      return function (_x11, _x12) {
        return _ref4.apply(this, arguments);
      };
    }());
  };

  function _asyncToGenerator(fn) {
    return function () {
      var gen = fn.apply(this, arguments);
      return new Promise(function (resolve, reject) {
        function step(key, arg) {
          try {
            var info = gen[key](arg);
            var value = info.value;
          } catch (error) {
            reject(error);
            return;
          }

          if (info.done) {
            resolve(value);
          } else {
            return Promise.resolve(value).then(function (value) {
              step("next", value);
            }, function (err) {
              step("throw", err);
            });
          }
        }

        return step("next");
      });
    };
  }

  /**
   * @private
   * @param {String} selector CSS3 selector of the elements to check the content
   * @param {String} text Substring that the selected element must contain
   * @returns HTMLElement The first element that maches the given selector and contains the
   *                      given text
   */
  function findContains(selector, text) {
    return [].slice.apply((0, _emberNativeDomHelpers.findAll)(selector)).filter(function (e) {
      return e.textContent.trim().indexOf(text) > -1;
    })[0];
  }

  function nativeMouseDown(selectorOrDomElement, options) {
    (0, _emberNativeDomHelpers.triggerEvent)(selectorOrDomElement, 'mousedown', options);
  }

  function nativeMouseUp(selectorOrDomElement, options) {
    (0, _emberNativeDomHelpers.triggerEvent)(selectorOrDomElement, 'mouseup', options);
  }

  function triggerKeydown(domElement, k) {
    (0, _emberNativeDomHelpers.keyEvent)(domElement, 'keydown', k);
  }

  function typeInSearch(scopeOrText, text) {
    var scope = '';

    if (typeof text === 'undefined') {
      text = scopeOrText;
    } else {
      scope = scopeOrText;
    }

    var selectors = ['.ember-power-select-search-input', '.ember-power-select-search input', '.ember-power-select-trigger-multiple-input', 'input[type="search"]'].map(function (selector) {
      return scope + ' ' + selector;
    }).join(', ');

    return (0, _emberNativeDomHelpers.fillIn)(selectors, text);
  }

  function clickTrigger(scope) {
    var options = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};

    var selector = '.ember-power-select-trigger';
    if (scope) {
      selector = scope + ' ' + selector;
    }
    return (0, _emberNativeDomHelpers.click)(selector, options);
  }

  function nativeTouch(selectorOrDomElement) {
    (0, _emberNativeDomHelpers.triggerEvent)(selectorOrDomElement, 'touchstart');
    (0, _emberNativeDomHelpers.triggerEvent)(selectorOrDomElement, 'touchend');
  }

  function touchTrigger() {
    nativeTouch('.ember-power-select-trigger');
  }

  var selectChoose = exports.selectChoose = function () {
    var _ref = _asyncToGenerator(regeneratorRuntime.mark(function _callee(cssPathOrTrigger, valueOrSelector, optionIndex) {
      var trigger, target, contentId, content, options, potentialTargets, matchEq, index, option, filteredTargets;
      return regeneratorRuntime.wrap(function _callee$(_context) {
        while (1) {
          switch (_context.prev = _context.next) {
            case 0:
              trigger = void 0, target = void 0;

              if (!(cssPathOrTrigger instanceof HTMLElement)) {
                _context.next = 5;
                break;
              }

              if (cssPathOrTrigger.classList.contains('ember-power-select-trigger')) {
                trigger = cssPathOrTrigger;
              } else {
                trigger = (0, _emberNativeDomHelpers.find)('.ember-power-select-trigger', cssPathOrTrigger);
              }
              _context.next = 9;
              break;

            case 5:
              trigger = (0, _emberNativeDomHelpers.find)(cssPathOrTrigger + ' .ember-power-select-trigger');

              if (!trigger) {
                trigger = (0, _emberNativeDomHelpers.find)(cssPathOrTrigger);
              }

              if (trigger) {
                _context.next = 9;
                break;
              }

              throw new Error('You called "selectChoose(\'' + cssPathOrTrigger + '\', \'' + valueOrSelector + '\')" but no select was found using selector "' + cssPathOrTrigger + '"');

            case 9:
              contentId = '' + trigger.attributes['aria-owns'].value;
              content = (0, _emberNativeDomHelpers.find)('#' + contentId);
              // If the dropdown is closed, open it

              if (!(!content || content.classList.contains('ember-basic-dropdown-content-placeholder'))) {
                _context.next = 16;
                break;
              }

              _context.next = 14;
              return (0, _emberNativeDomHelpers.click)(trigger);

            case 14:
              _context.next = 16;
              return (0, _wait.default)();

            case 16:

              // Select the option with the given text
              options = [].slice.apply((0, _emberNativeDomHelpers.findAll)('#' + contentId + ' .ember-power-select-option'));
              potentialTargets = options.filter(function (opt) {
                return opt.textContent.indexOf(valueOrSelector) > -1;
              });

              if (potentialTargets.length === 0) {
                // If treating the value as text doesn't gave use any result, let's try if it's a css selector
                matchEq = valueOrSelector.slice(-6).match(/:eq\((\d+)\)/);

                if (matchEq) {
                  index = parseInt(matchEq[1], 10);
                  option = (0, _emberNativeDomHelpers.findAll)('#' + contentId + ' ' + valueOrSelector.slice(0, -6))[index];

                  _ember.default.deprecate('Passing selectors with the `:eq()` pseudoselector is deprecated. If you want to select the nth option, pass a number as a third argument. E.g `selectChoose(".language-select", ".ember-power-select-option", 3)`', true, {
                    id: 'select-choose-no-eq-pseudoselector',
                    until: '1.8.0'
                  });
                  if (option) {
                    potentialTargets = [option];
                  }
                } else {
                  potentialTargets = (0, _emberNativeDomHelpers.findAll)('#' + contentId + ' ' + valueOrSelector);
                }
              }
              if (potentialTargets.length > 1) {
                filteredTargets = [].slice.apply(potentialTargets).filter(function (t) {
                  return t.textContent.trim() === valueOrSelector;
                });

                if (optionIndex === undefined) {
                  target = filteredTargets[0] || potentialTargets[0];
                } else {
                  target = filteredTargets[optionIndex] || potentialTargets[optionIndex];
                }
              } else {
                target = potentialTargets[0];
              }

              if (target) {
                _context.next = 22;
                break;
              }

              throw new Error('You called "selectChoose(\'' + cssPathOrTrigger + '\', \'' + valueOrSelector + '\')" but "' + valueOrSelector + '" didn\'t match any option');

            case 22:
              _context.next = 24;
              return (0, _emberNativeDomHelpers.click)(target);

            case 24:
              return _context.abrupt('return', (0, _wait.default)());

            case 25:
            case 'end':
              return _context.stop();
          }
        }
      }, _callee, this);
    }));

    return function selectChoose(_x2, _x3, _x4) {
      return _ref.apply(this, arguments);
    };
  }();
});
define('dummy/tests/helpers/module-for-acceptance', ['exports', 'qunit', 'ember', 'dummy/tests/helpers/start-app', 'dummy/tests/helpers/destroy-app'], function (exports, _qunit, _ember, _startApp, _destroyApp) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });

  exports.default = function (name) {
    var options = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};

    (0, _qunit.module)(name, {
      beforeEach: function beforeEach() {
        this.application = (0, _startApp.default)();

        if (options.beforeEach) {
          return options.beforeEach.apply(this, arguments);
        }
      },
      afterEach: function afterEach() {
        var _this = this;

        var afterEach = options.afterEach && options.afterEach.apply(this, arguments);
        return resolve(afterEach).then(function () {
          return (0, _destroyApp.default)(_this.application);
        });
      }
    });
  };

  var resolve = _ember.default.RSVP.resolve;
});
define('dummy/tests/helpers/resolver', ['exports', 'dummy/resolver', 'dummy/config/environment'], function (exports, _resolver, _environment) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });


  var resolver = _resolver.default.create();

  resolver.namespace = {
    modulePrefix: _environment.default.modulePrefix,
    podModulePrefix: _environment.default.podModulePrefix
  };

  exports.default = resolver;
});
define('dummy/tests/helpers/start-app', ['exports', 'ember', 'dummy/app', 'dummy/config/environment'], function (exports, _ember, _app, _environment) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.default = startApp;
  var merge = _ember.default.merge,
      run = _ember.default.run;
  function startApp(attrs) {
    var attributes = merge({}, _environment.default.APP);
    attributes = merge(attributes, attrs); // use defaults, but you can override;

    return run(function () {
      var application = _app.default.create(attributes);
      application.setupForTesting();
      application.injectTestHelpers();
      return application;
    });
  }
});
define('dummy/tests/integration/components/ember-flatpickr-test', ['ember', 'ember-qunit'], function (_ember, _emberQunit) {
  'use strict';

  var $ = _ember.default.$,
      run = _ember.default.run;


  (0, _emberQunit.moduleForComponent)('ember-flatpickr', 'Integration | Component | ember flatpickr', {
    integration: true
  });

  function clickDay(index) {
    simulate('mousedown', $('.flatpickr-days .flatpickr-day').get(index), { which: 1 }, MouseEvent);
  }

  function closeFlatpickr() {
    simulate('mousedown', document, { which: 1 }, MouseEvent);
  }

  /*
   * Copied from flatpickr
   */
  function simulate(eventType, onElement, options, type) {
    var eventOptions = Object.assign(options || {}, { bubbles: true });
    var evt = new (type || CustomEvent)(eventType, eventOptions);
    try {
      Object.assign(evt, eventOptions);
    } catch (e) {
      // This was empty in flatpickr
    }

    onElement.dispatchEvent(evt);
  }

  (0, _emberQunit.test)('value updates when set externally', function (assert) {
    assert.expect(2);

    this.on('onChange', function () {});

    this.set('dateValue', '2080-12-01T16:16:22.585Z');
    this.set('maxDate', '2080-12-31T16:16:22.585Z');
    this.set('minDate', '2080-12-01T16:16:22.585Z');

    this.render(_ember.default.HTMLBars.template({
      "id": "aN2y29fG",
      "block": "{\"statements\":[[1,[33,[\"ember-flatpickr\"],null,[[\"maxDate\",\"minDate\",\"onChange\",\"placeholder\",\"value\"],[[28,[\"maxDate\"]],[28,[\"minDate\"]],\"onChange\",\"Pick date\",[33,[\"readonly\"],[[28,[\"dateValue\"]]],null]]]],false]],\"locals\":[],\"named\":[],\"yields\":[],\"hasPartials\":false}",
      "meta": {}
    }));

    assert.equal($('.flatpickr-days .flatpickr-day.selected').text(), '1', 'initial selected date text');

    this.set('dateValue', '2080-12-04T16:16:22.585Z');
    assert.equal($('.flatpickr-days .flatpickr-day.selected').text(), '4', 'selected changes with dateValue');
  });

  (0, _emberQunit.test)('setting value to null clears flatpickr', function (assert) {
    assert.expect(2);

    this.on('onChange', function () {});

    this.set('dateValue', '2080-12-01T16:16:22.585Z');
    this.set('maxDate', '2080-12-31T16:16:22.585Z');
    this.set('minDate', '2080-12-01T16:16:22.585Z');

    this.render(_ember.default.HTMLBars.template({
      "id": "aN2y29fG",
      "block": "{\"statements\":[[1,[33,[\"ember-flatpickr\"],null,[[\"maxDate\",\"minDate\",\"onChange\",\"placeholder\",\"value\"],[[28,[\"maxDate\"]],[28,[\"minDate\"]],\"onChange\",\"Pick date\",[33,[\"readonly\"],[[28,[\"dateValue\"]]],null]]]],false]],\"locals\":[],\"named\":[],\"yields\":[],\"hasPartials\":false}",
      "meta": {}
    }));

    assert.equal($('.flatpickr-input[type=text]').val(), '2080-12-01', 'initial selected date text');

    this.set('dateValue', null);
    assert.equal($('.flatpickr-input[type=text]').val(), '', 'null clears value');
  });

  (0, _emberQunit.test)('onChange action fired', function (assert) {
    assert.expect(1);

    var done = assert.async();

    this.on('onChange', function (selectedDates) {
      setTimeout(function () {
        assert.equal(selectedDates[0].toISOString().substring(0, 10), '2080-12-06', 'onChange action was executed');
        done();
      }, 100);
    });

    this.set('maxDate', '2080-12-31T16:16:22.585Z');
    this.set('minDate', '2080-12-01T16:16:22.585Z');

    this.render(_ember.default.HTMLBars.template({
      "id": "Z5h8z6Ff",
      "block": "{\"statements\":[[1,[33,[\"ember-flatpickr\"],null,[[\"appendDataInput\",\"defaultDate\",\"enableTime\",\"maxDate\",\"minDate\",\"onChange\",\"placeholder\",\"value\"],[true,\"2080-12-27T16:16:22.585Z\",true,[28,[\"maxDate\"]],[28,[\"minDate\"]],\"onChange\",\"Pick date\",[33,[\"readonly\"],[[28,[\"dateValue\"]]],null]]]],false]],\"locals\":[],\"named\":[],\"yields\":[],\"hasPartials\":false}",
      "meta": {}
    }));

    run(function () {
      $('.flatpickr-input')[0].dispatchEvent(new Event('focus'));
      clickDay(5);
    });
  });

  (0, _emberQunit.test)('onClose action fired', function (assert) {
    assert.expect(1);

    this.on('onClose', function () {
      assert.ok(true, 'onClose action was executed');
    });

    this.set('maxDate', '2080-12-31T16:16:22.585Z');
    this.set('minDate', '2080-12-01T16:16:22.585Z');

    this.render(_ember.default.HTMLBars.template({
      "id": "jx3bnla1",
      "block": "{\"statements\":[[1,[33,[\"ember-flatpickr\"],null,[[\"appendDataInput\",\"defaultDate\",\"enableTime\",\"maxDate\",\"minDate\",\"onChange\",\"onClose\",\"placeholder\",\"value\"],[true,\"2080-12-27T16:16:22.585Z\",true,[28,[\"maxDate\"]],[28,[\"minDate\"]],null,\"onClose\",\"Pick date\",[33,[\"readonly\"],[[28,[\"dateValue\"]]],null]]]],false]],\"locals\":[],\"named\":[],\"yields\":[],\"hasPartials\":false}",
      "meta": {}
    }));

    run(function () {
      $('.flatpickr-input')[0].dispatchEvent(new Event('focus'));
      closeFlatpickr();
    });
  });

  (0, _emberQunit.test)('maxDateUpdated and minDateUpdated fired', function (assert) {
    var _this = this;

    assert.expect(2);

    this.render(_ember.default.HTMLBars.template({
      "id": "jx3bnla1",
      "block": "{\"statements\":[[1,[33,[\"ember-flatpickr\"],null,[[\"appendDataInput\",\"defaultDate\",\"enableTime\",\"maxDate\",\"minDate\",\"onChange\",\"onClose\",\"placeholder\",\"value\"],[true,\"2080-12-27T16:16:22.585Z\",true,[28,[\"maxDate\"]],[28,[\"minDate\"]],null,\"onClose\",\"Pick date\",[33,[\"readonly\"],[[28,[\"dateValue\"]]],null]]]],false]],\"locals\":[],\"named\":[],\"yields\":[],\"hasPartials\":false}",
      "meta": {}
    }));

    this.set('maxDate', '2080-12-25T16:16:22.585Z');
    this.set('minDate', '2080-12-24T16:16:22.585Z');

    run(function () {
      $('.flatpickr-input')[0].dispatchEvent(new Event('focus'));
      run.scheduleOnce('afterRender', _this, function () {
        var enabledDays = $('.flatpickr-days .flatpickr-day:not(.disabled)');
        assert.equal(enabledDays.length, 2);
        assert.equal(enabledDays.text(), '2425');
      });
    });
  });

  (0, _emberQunit.test)('locale works correctly', function (assert) {
    assert.expect(1);

    this.on('onChange', function () {});

    this.set('dateValue', '2080-12-01T16:16:22.585Z');
    this.set('maxDate', '2080-12-31T16:16:22.585Z');
    this.set('minDate', '2080-12-01T16:16:22.585Z');

    this.render(_ember.default.HTMLBars.template({
      "id": "9A2DwEmP",
      "block": "{\"statements\":[[1,[33,[\"ember-flatpickr\"],null,[[\"locale\",\"maxDate\",\"minDate\",\"onChange\",\"placeholder\",\"value\"],[\"fr\",[28,[\"maxDate\"]],[28,[\"minDate\"]],\"onChange\",\"Pick date\",[33,[\"readonly\"],[[28,[\"dateValue\"]]],null]]]],false]],\"locals\":[],\"named\":[],\"yields\":[],\"hasPartials\":false}",
      "meta": {}
    }));

    assert.equal($('.flatpickr-current-month .cur-month').text().trim(), 'Décembre', 'French locale applied successfully');
  });

  (0, _emberQunit.test)('onChange triggers value change only once', function (assert) {
    var _this2 = this;

    assert.expect(3);

    var originalPosition = '1';
    var originalDate = '2080-12-01T20:00:00.000Z';
    var newPosition = '5';

    this.on('onChange', function (selectedDates) {
      assert.ok(selectedDates[0].toISOString(), 'onChange action was executed');

      _this2.set('dateValue', selectedDates[0]);
    });

    this.set('dateValue', originalDate);

    this.render(_ember.default.HTMLBars.template({
      "id": "c2Od83Jx",
      "block": "{\"statements\":[[1,[33,[\"ember-flatpickr\"],null,[[\"onChange\",\"placeholder\",\"value\"],[\"onChange\",\"Pick date\",[33,[\"readonly\"],[[28,[\"dateValue\"]]],null]]]],false]],\"locals\":[],\"named\":[],\"yields\":[],\"hasPartials\":false}",
      "meta": {}
    }));

    run(function () {
      assert.equal($('.flatpickr-days .flatpickr-day.selected').text(), originalPosition, 'initial selected date text');

      $('.flatpickr-input')[0].dispatchEvent(new Event('focus'));
      clickDay(newPosition - 1);

      assert.equal($('.flatpickr-days .flatpickr-day.selected').text(), newPosition, 'selected changes with dateValue');
    });
  });

  (0, _emberQunit.test)('onChange gets called with the correct parameters', function (assert) {
    var originalPosition = '1';
    var originalDate = '2080-12-01T20:00:00.000Z';
    var newPosition = '5';
    var dateFormat = 'Y-m-d';
    var newFormattedDate = '2080-12-05';

    this.on('onChange', function (selectedDates, dateStr, instance) {
      assert.ok(selectedDates instanceof Array, 'selectedDates is an array');
      assert.equal(selectedDates.length, 1, 'selectedDates contains a single entry');

      assert.ok(selectedDates[0] instanceof Date, 'selectedDates contains DateObjects');

      assert.equal(selectedDates[0].toDateString(), 'Thu Dec 05 2080', 'selectedDates contains the correct Date');

      assert.equal(dateStr, newFormattedDate, 'dateStr is formatted correctly');

      assert.ok(instance instanceof FlatpickrInstance, 'instance is a FlatpickrInstance object');
    });

    this.set('dateValue', originalDate);
    this.set('dateFormat', dateFormat);

    this.render(_ember.default.HTMLBars.template({
      "id": "OAYZ4M2s",
      "block": "{\"statements\":[[1,[33,[\"ember-flatpickr\"],null,[[\"onChange\",\"placeholder\",\"value\",\"dateFormat\"],[\"onChange\",\"Pick date\",[33,[\"readonly\"],[[28,[\"dateValue\"]]],null],[28,[\"dateFormat\"]]]]],false]],\"locals\":[],\"named\":[],\"yields\":[],\"hasPartials\":false}",
      "meta": {}
    }));

    run(function () {
      assert.equal($('.flatpickr-days .flatpickr-day.selected').text(), originalPosition, 'initial selected date text');

      $('.flatpickr-input')[0].dispatchEvent(new Event('focus'));
      clickDay(newPosition - 1);

      assert.equal($('.flatpickr-days .flatpickr-day.selected').text(), newPosition, 'selected changes with dateValue');

      $('.flatpickr-input')[0].dispatchEvent(new Event('focus'));
      clickDay(newPosition - 1);

      assert.equal($('.flatpickr-days .flatpickr-day.selected').text(), newPosition, 'selected changes with dateValue');
    });
  });

  (0, _emberQunit.test)('onChange action mut helper returns date Array', function (assert) {
    var _this3 = this;

    assert.expect(5);

    var originalPosition = '1';
    var originalDate = '2080-12-01T20:00:00.000Z';
    var newPosition = '5';

    this.set('dateValue', originalDate);

    this.render(_ember.default.HTMLBars.template({
      "id": "HQYF1ca+",
      "block": "{\"statements\":[[1,[33,[\"ember-flatpickr\"],null,[[\"onChange\",\"placeholder\",\"value\"],[[33,[\"action\"],[[28,[null]],[33,[\"mut\"],[[28,[\"dateValue\"]]],null]],null],\"Pick date\",[33,[\"readonly\"],[[28,[\"dateValue\"]]],null]]]],false]],\"locals\":[],\"named\":[],\"yields\":[],\"hasPartials\":false}",
      "meta": {}
    }));

    run(function () {
      assert.equal($('.flatpickr-days .flatpickr-day.selected').text(), originalPosition, 'initial selected date text');

      $('.flatpickr-input')[0].dispatchEvent(new Event('focus'));
      clickDay(newPosition - 1);

      assert.equal($('.flatpickr-days .flatpickr-day.selected').text(), newPosition, 'selected changes with dateValue');

      assert.ok(_this3.get('dateValue') instanceof Array, 'dateValue is instanceof Array');
      assert.ok(_this3.get('dateValue').length, 1, 'dateValue has 1 item');
      assert.ok(_this3.get('dateValue')[0] instanceof Date, 'dateValue is an array of DateObjects');
    });
  });

  (0, _emberQunit.test)('value accepts string', function (assert) {
    var _this4 = this;

    assert.expect(2);

    var originalDate = '2080-12-05T20:00:00.000Z';

    this.set('dateValue', originalDate);

    this.render(_ember.default.HTMLBars.template({
      "id": "/+keRzRW",
      "block": "{\"statements\":[[1,[33,[\"ember-flatpickr\"],null,[[\"onChange\",\"placeholder\",\"value\",\"flatpickrRef\"],[[33,[\"action\"],[[28,[null]],[33,[\"mut\"],[[28,[\"dateValue\"]]],null]],null],\"Pick date\",[33,[\"readonly\"],[[28,[\"dateValue\"]]],null],[28,[\"flatpickrRef\"]]]]],false]],\"locals\":[],\"named\":[],\"yields\":[],\"hasPartials\":false}",
      "meta": {}
    }));

    run(function () {
      assert.equal(_this4.get('flatpickrRef').selectedDates.length, 1, '1 date is selected');
      assert.equal(_this4.get('flatpickrRef').selectedDates[0].valueOf(), new Date(originalDate).valueOf(), 'selected date is correct');
    });
  });

  (0, _emberQunit.test)('value accepts date object', function (assert) {
    var _this5 = this;

    assert.expect(2);

    var originalDate = '2080-12-05T20:00:00.000Z';

    this.set('dateValue', new Date(originalDate));

    this.render(_ember.default.HTMLBars.template({
      "id": "/+keRzRW",
      "block": "{\"statements\":[[1,[33,[\"ember-flatpickr\"],null,[[\"onChange\",\"placeholder\",\"value\",\"flatpickrRef\"],[[33,[\"action\"],[[28,[null]],[33,[\"mut\"],[[28,[\"dateValue\"]]],null]],null],\"Pick date\",[33,[\"readonly\"],[[28,[\"dateValue\"]]],null],[28,[\"flatpickrRef\"]]]]],false]],\"locals\":[],\"named\":[],\"yields\":[],\"hasPartials\":false}",
      "meta": {}
    }));

    run(function () {
      assert.equal(_this5.get('flatpickrRef').selectedDates.length, 1, '1 date is selected');
      assert.equal(_this5.get('flatpickrRef').selectedDates[0].valueOf(), new Date(originalDate).valueOf(), 'selected date is correct');
    });
  });

  (0, _emberQunit.test)('value accepts array of string', function (assert) {
    var _this6 = this;

    assert.expect(2);

    var originalDate = '2080-12-05T20:00:00.000Z';

    this.set('dateValue', [originalDate]);

    this.render(_ember.default.HTMLBars.template({
      "id": "/+keRzRW",
      "block": "{\"statements\":[[1,[33,[\"ember-flatpickr\"],null,[[\"onChange\",\"placeholder\",\"value\",\"flatpickrRef\"],[[33,[\"action\"],[[28,[null]],[33,[\"mut\"],[[28,[\"dateValue\"]]],null]],null],\"Pick date\",[33,[\"readonly\"],[[28,[\"dateValue\"]]],null],[28,[\"flatpickrRef\"]]]]],false]],\"locals\":[],\"named\":[],\"yields\":[],\"hasPartials\":false}",
      "meta": {}
    }));

    run(function () {
      assert.equal(_this6.get('flatpickrRef').selectedDates.length, 1, '1 date is selected');
      assert.equal(_this6.get('flatpickrRef').selectedDates[0].valueOf(), new Date(originalDate).valueOf(), 'selected date is correct');
    });
  });

  (0, _emberQunit.test)('value accepts array of date objects', function (assert) {
    var _this7 = this;

    assert.expect(2);

    var originalDate = '2080-12-05T20:00:00.000Z';
    this.set('dateValue', [new Date(originalDate)]);

    this.render(_ember.default.HTMLBars.template({
      "id": "/+keRzRW",
      "block": "{\"statements\":[[1,[33,[\"ember-flatpickr\"],null,[[\"onChange\",\"placeholder\",\"value\",\"flatpickrRef\"],[[33,[\"action\"],[[28,[null]],[33,[\"mut\"],[[28,[\"dateValue\"]]],null]],null],\"Pick date\",[33,[\"readonly\"],[[28,[\"dateValue\"]]],null],[28,[\"flatpickrRef\"]]]]],false]],\"locals\":[],\"named\":[],\"yields\":[],\"hasPartials\":false}",
      "meta": {}
    }));

    run(function () {
      assert.equal(_this7.get('flatpickrRef').selectedDates.length, 1, '1 date is selected');
      assert.equal(_this7.get('flatpickrRef').selectedDates[0].valueOf(), new Date(originalDate).valueOf(), 'selected date is correct');
    });
  });
});
define('dummy/tests/test-helper', ['dummy/tests/helpers/resolver', 'ember-qunit', 'ember-cli-qunit'], function (_resolver, _emberQunit, _emberCliQunit) {
  'use strict';

  (0, _emberQunit.setResolver)(_resolver.default);
  (0, _emberCliQunit.start)();
});
define('dummy/tests/tests.lint-test', [], function () {
  'use strict';

  QUnit.module('ESLint | tests');

  QUnit.test('helpers/destroy-app.js', function (assert) {
    assert.expect(1);
    assert.ok(true, 'helpers/destroy-app.js should pass ESLint\n\n');
  });

  QUnit.test('helpers/module-for-acceptance.js', function (assert) {
    assert.expect(1);
    assert.ok(true, 'helpers/module-for-acceptance.js should pass ESLint\n\n');
  });

  QUnit.test('helpers/resolver.js', function (assert) {
    assert.expect(1);
    assert.ok(true, 'helpers/resolver.js should pass ESLint\n\n');
  });

  QUnit.test('helpers/start-app.js', function (assert) {
    assert.expect(1);
    assert.ok(true, 'helpers/start-app.js should pass ESLint\n\n');
  });

  QUnit.test('integration/components/ember-flatpickr-test.js', function (assert) {
    assert.expect(1);
    assert.ok(true, 'integration/components/ember-flatpickr-test.js should pass ESLint\n\n');
  });

  QUnit.test('test-helper.js', function (assert) {
    assert.expect(1);
    assert.ok(true, 'test-helper.js should pass ESLint\n\n');
  });
});
require('dummy/tests/test-helper');
EmberENV.TESTS_FILE_LOADED = true;
//# sourceMappingURL=tests.map
