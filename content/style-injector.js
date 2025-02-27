'use strict';

/** @type {function(opts):StyleInjector} */
window.StyleInjector = window.INJECTED === 1 ? window.StyleInjector : ({
  compare,
  onUpdate = () => {},
}) => {
  const PREFIX = 'stylus-';
  const PATCH_ID = 'transition-patch';
  // styles are out of order if any of these elements is injected between them
  const ORDERED_TAGS = new Set(['head', 'body', 'frameset', 'style', 'link']);
  const docRewriteObserver = RewriteObserver(_sort);
  const docRootObserver = RootObserver(_sortIfNeeded);
  const list = [];
  const table = new Map();
  let isEnabled = true;
  let isTransitionPatched;
  // will store the original method refs because the page can override them
  let creationDoc, createElement, createElementNS;

  return /** @namespace StyleInjector */ {

    list,

    async apply(styleMap) {
      const styles = _styleMapToArray(styleMap);
      const value = !styles.length
        ? []
        : await docRootObserver.evade(() => {
          if (!isTransitionPatched && isEnabled) {
            _applyTransitionPatch(styles);
          }
          return styles.map(_addUpdate);
        });
      _emitUpdate();
      return value;
    },

    clear() {
      _addRemoveElements(false);
      list.length = 0;
      table.clear();
      _emitUpdate();
    },

    clearOrphans() {
      for (const el of document.querySelectorAll(`style[id^="${PREFIX}"].stylus`)) {
        const id = el.id.slice(PREFIX.length);
        if (/^\d+$/.test(id) || id === PATCH_ID) {
          el.remove();
        }
      }
    },

    remove(id) {
      _remove(id);
      _emitUpdate();
    },

    replace(styleMap) {
      const styles = _styleMapToArray(styleMap);
      const added = new Set(styles.map(s => s.id));
      const removed = [];
      for (const style of list) {
        if (!added.has(style.id)) {
          removed.push(style.id);
        }
      }
      styles.forEach(_addUpdate);
      removed.forEach(_remove);
      _emitUpdate();
    },

    toggle(enable) {
      if (isEnabled === enable) return;
      isEnabled = enable;
      if (!enable) _toggleObservers(false);
      _addRemoveElements(enable);
      if (enable) _toggleObservers(true);
    },
  };

  function _add(style) {
    console.log('ADDING A CHILD STYLE');
    const el = style.el = _createStyle(style.id, style.code);
    const i = list.findIndex(item => compare(item, style) > 0);
    table.set(style.id, style);
    if (isEnabled) {
      document.documentElement.insertBefore(el, i < 0 ? null : list[i].el);
    }
    list.splice(i < 0 ? list.length : i, 0, style);
    return el;
  }

  function _addRemoveElements(add) {
    for (const {el} of list) {
      if (add) {
        document.documentElement.appendChild(el);
      } else {
        el.remove();
      }
    }
  }

  function _addUpdate(style) {
    return table.has(style.id) ? _update(style) : _add(style);
  }

  function _applyTransitionPatch(styles) {
    isTransitionPatched = true;
    // CSS transition bug workaround: since we insert styles asynchronously,
    // the browsers, especially Firefox, may apply all transitions on page load
    if (document.readyState === 'complete' ||
        document.visibilityState === 'hidden' ||
        !styles.some(s => s.code.includes('transition'))) {
      return;
    }
    const el = _createStyle(PATCH_ID, `
      :root:not(#\\0):not(#\\0) * {
        transition: none !important;
      }
    `);
    
    
    document.documentElement.appendChild(el);
    // wait for the next paint to complete
    // note: requestAnimationFrame won't fire in inactive tabs
    requestAnimationFrame(() => setTimeout(() => el.remove()));
  }

  function _createStyle(id, code = '') {
    if (!creationDoc) _initCreationDoc();
    let el;
    if (document.documentElement instanceof SVGSVGElement) {
      // SVG document style
      el = createElementNS.call(creationDoc, 'http://www.w3.org/2000/svg', 'style');
    } else if (document instanceof XMLDocument) {
      // XML document style
      el = createElementNS.call(creationDoc, 'http://www.w3.org/1999/xhtml', 'style');
    } else {
      // HTML document style; also works on HTML-embedded SVG
      el = createElement.call(creationDoc, 'style');
    }
    if (id) {
      el.id = `${PREFIX}${id}`;
      const oldEl = document.getElementById(el.id);
      if (oldEl) oldEl.id += '-superseded-by-Stylus';
    }
    el.type = 'text/css';
    // SVG className is not a string, but an instance of SVGAnimatedString
    el.classList.add('stylus');
    el.textContent = code;
    return el;
  }

  function _toggleObservers(shouldStart) {
    const onOff = shouldStart && isEnabled ? 'start' : 'stop';
    docRewriteObserver[onOff]();
    docRootObserver[onOff]();
  }

  function _emitUpdate() {
    _toggleObservers(list.length);
    onUpdate();
  }

  /*
  FF59+ workaround: allow the page to read our sheets, https://github.com/openstyles/stylus/issues/461
  First we're trying the page context document where inline styles may be forbidden by CSP
  https://bugzilla.mozilla.org/show_bug.cgi?id=1579345#c3
  and since userAgent.navigator can be spoofed via about:config or devtools,
  we're checking for getPreventDefault that was removed in FF59
  */
  function _initCreationDoc() {
    creationDoc = !Event.prototype.getPreventDefault && document.wrappedJSObject;
    if (creationDoc) {
      ({createElement, createElementNS} = creationDoc);
      const el = document.documentElement.appendChild(_createStyle());
      const isApplied = el.sheet;
      el.remove();
      if (isApplied) return;
    }
    creationDoc = document;
    ({createElement, createElementNS} = document);
  }

  function _remove(id) {
    const style = table.get(id);
    if (!style) return;
    table.delete(id);
    list.splice(list.indexOf(style), 1);
    style.el.remove();
  }

  function _sort() {
    docRootObserver.evade(() => {
      list.sort(compare);
      _addRemoveElements(true);
    });
  }

  function _sortIfNeeded() {
    let needsSort;
    let el = list.length && list[0].el;
    if (!el) {
      needsSort = false;
    } else if (el.parentNode !== creationDoc.documentElement) {
      needsSort = true;
    } else {
      let i = 0;
      while (el) {
        if (i < list.length && el === list[i].el) {
          i++;
        } else if (ORDERED_TAGS.has(el.localName)) {
          needsSort = true;
          break;
        }
        el = el.nextElementSibling;
      }
      // some styles are not injected to the document
      if (i < list.length) needsSort = true;
    }
    if (needsSort) _sort();
    return needsSort;
  }

  function _styleMapToArray(styleMap) {
    return Object.values(styleMap).map(s => ({
      id: s.id,
      code: s.code.join(''),
    }));
  }

  function _update({id, code}) {
    const style = table.get(id);
    if (style.code !== code) {
      style.code = code;
      style.el.textContent = code;
    }
  }

  function RewriteObserver(onChange) {
    // detect documentElement being rewritten from inside the script
    let root;
    let observing = false;
    let timer;
    const observer = new MutationObserver(_check);
    return {start, stop};

    function start() {
      if (observing) return;
      // detect dynamic iframes rewritten after creation by the embedder i.e. externally
      root = document.documentElement;
      timer = setTimeout(_check);
      observer.observe(document, {childList: true});
      observing = true;
    }

    function stop() {
      if (!observing) return;
      clearTimeout(timer);
      observer.disconnect();
      observing = false;
    }

    function _check() {
      if (root !== document.documentElement) {
        root = document.documentElement;
        onChange();
      }
    }
  }

  function RootObserver(onChange) {
    let digest = 0;
    let lastCalledTime = NaN;
    let observing = false;
    const observer = new MutationObserver(() => {
      if (digest) {
        if (performance.now() - lastCalledTime > 1000) {
          digest = 0;
        } else if (digest > 5) {
          throw new Error('The page keeps generating mutations. Skip the event.');
        }
      }
      if (onChange()) {
        digest++;
        lastCalledTime = performance.now();
      }
    });
    return {evade, start, stop};

    function evade(fn) {
      const restore = observing && start;
      stop();
      return new Promise(resolve => _run(fn, resolve, _waitForRoot))
        .then(restore);
    }

    function start() {
      if (observing) return;
      observer.observe(document.documentElement, {childList: true});
      observing = true;
    }

    function stop() {
      if (!observing) return;
      // FIXME: do we need this?
      observer.takeRecords();
      observer.disconnect();
      observing = false;
    }

    function _run(fn, resolve, wait) {
      if (document.documentElement) {
        resolve(fn());
        return true;
      }
      if (wait) wait(fn, resolve);
    }

    function _waitForRoot(...args) {
      new MutationObserver((_, observer) => _run(...args) && observer.disconnect())
        .observe(document, {childList: true});
    }
  }
};
