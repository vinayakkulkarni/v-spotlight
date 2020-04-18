'use strict';

var script = {
  name: 'VSpotlight',
  props: {
    background: {
      type: String,
      required: true
    },
    position: {
      type: String,
      default: 'center',
      required: false
    }
  },

  data() {
    return {
      spotlight: null,
      spotlightSize: 'transparent 160px, rgba(0, 0, 0, 0.85) 200px)'
    };
  },

  mounted() {
    const t = this;
    t.spotlight = document.querySelector('.spotlight');
    window.addEventListener('mousemove', e => {
      t.updateSpotlight(e);
    });
    window.addEventListener('mousedown', e => {
      if (e.which === 1) {
        t.spotlightSize = 'transparent 130px, rgba(0, 0, 0, 0.95) 150px)';
        t.updateSpotlight(e);
      }
    });
    window.addEventListener('mouseup', e => {
      t.spotlightSize = 'transparent 160px, rgba(0, 0, 0, 0.85) 200px)';
      t.updateSpotlight(e);
    });
  },

  methods: {
    updateSpotlight(e) {
      const t = this;
      t.spotlight.style.backgroundImage = `radial-gradient(circle at ${e.pageX / window.innerWidth * 100}% ${e.pageY / window.innerHeight * 100}%, ${t.spotlightSize}`;
    }

  }
};

function normalizeComponent(template, style, script, scopeId, isFunctionalTemplate, moduleIdentifier /* server only */, shadowMode, createInjector, createInjectorSSR, createInjectorShadow) {
    if (typeof shadowMode !== 'boolean') {
        createInjectorSSR = createInjector;
        createInjector = shadowMode;
        shadowMode = false;
    }
    // Vue.extend constructor export interop.
    const options = typeof script === 'function' ? script.options : script;
    // render functions
    if (template && template.render) {
        options.render = template.render;
        options.staticRenderFns = template.staticRenderFns;
        options._compiled = true;
        // functional template
        if (isFunctionalTemplate) {
            options.functional = true;
        }
    }
    // scopedId
    if (scopeId) {
        options._scopeId = scopeId;
    }
    let hook;
    if (moduleIdentifier) {
        // server build
        hook = function (context) {
            // 2.3 injection
            context =
                context || // cached call
                    (this.$vnode && this.$vnode.ssrContext) || // stateful
                    (this.parent && this.parent.$vnode && this.parent.$vnode.ssrContext); // functional
            // 2.2 with runInNewContext: true
            if (!context && typeof __VUE_SSR_CONTEXT__ !== 'undefined') {
                context = __VUE_SSR_CONTEXT__;
            }
            // inject component styles
            if (style) {
                style.call(this, createInjectorSSR(context));
            }
            // register component module identifier for async chunk inference
            if (context && context._registeredComponents) {
                context._registeredComponents.add(moduleIdentifier);
            }
        };
        // used by ssr in case component is cached and beforeCreate
        // never gets called
        options._ssrRegister = hook;
    }
    else if (style) {
        hook = shadowMode
            ? function (context) {
                style.call(this, createInjectorShadow(context, this.$root.$options.shadowRoot));
            }
            : function (context) {
                style.call(this, createInjector(context));
            };
    }
    if (hook) {
        if (options.functional) {
            // register for functional component in vue file
            const originalRender = options.render;
            options.render = function renderWithStyleInjection(h, context) {
                hook.call(context);
                return originalRender(h, context);
            };
        }
        else {
            // inject component registration as beforeCreate hook
            const existing = options.beforeCreate;
            options.beforeCreate = existing ? [].concat(existing, hook) : [hook];
        }
    }
    return script;
}

const isOldIE = typeof navigator !== 'undefined' &&
    /msie [6-9]\\b/.test(navigator.userAgent.toLowerCase());
function createInjector(context) {
    return (id, style) => addStyle(id, style);
}
let HEAD;
const styles = {};
function addStyle(id, css) {
    const group = isOldIE ? css.media || 'default' : id;
    const style = styles[group] || (styles[group] = { ids: new Set(), styles: [] });
    if (!style.ids.has(id)) {
        style.ids.add(id);
        let code = css.source;
        if (css.map) {
            // https://developer.chrome.com/devtools/docs/javascript-debugging
            // this makes source maps inside style tags work properly in Chrome
            code += '\n/*# sourceURL=' + css.map.sources[0] + ' */';
            // http://stackoverflow.com/a/26603875
            code +=
                '\n/*# sourceMappingURL=data:application/json;base64,' +
                    btoa(unescape(encodeURIComponent(JSON.stringify(css.map)))) +
                    ' */';
        }
        if (!style.element) {
            style.element = document.createElement('style');
            style.element.type = 'text/css';
            if (css.media)
                style.element.setAttribute('media', css.media);
            if (HEAD === undefined) {
                HEAD = document.head || document.getElementsByTagName('head')[0];
            }
            HEAD.appendChild(style.element);
        }
        if ('styleSheet' in style.element) {
            style.styles.push(code);
            style.element.styleSheet.cssText = style.styles
                .filter(Boolean)
                .join('\n');
        }
        else {
            const index = style.ids.size - 1;
            const textNode = document.createTextNode(code);
            const nodes = style.element.childNodes;
            if (nodes[index])
                style.element.removeChild(nodes[index]);
            if (nodes.length)
                style.element.insertBefore(textNode, nodes[index]);
            else
                style.element.appendChild(textNode);
        }
    }
}

/* script */
const __vue_script__ = script;

/* template */
var __vue_render__ = function() {
  var _vm = this;
  var _h = _vm.$createElement;
  var _c = _vm._self._c || _h;
  return _c(
    "div",
    {
      staticClass: "bg-container",
      style: {
        background: "url(" + _vm.background + ") no-repeat " + _vm.position
      }
    },
    [_c("div", { staticClass: "spotlight" })]
  )
};
var __vue_staticRenderFns__ = [];
__vue_render__._withStripped = true;

  /* style */
  const __vue_inject_styles__ = function (inject) {
    if (!inject) return
    inject("data-v-788142a2_0", { source: "\n.bg-container[data-v-788142a2] {\n  background-size: cover;\n  height: 100vh;\n}\n.spotlight[data-v-788142a2] {\n  position: absolute;\n  height: 100vh;\n  width: 100vh;\n  background-image: radial-gradient(\n    circle,\n    transparent 160px,\n    rgba(0, 0, 0, 0.85) 200px\n  );\n}\n", map: {"version":3,"sources":["/Users/vinayak/Development/Personal/v-spotlight/src/VSpotlight.vue"],"names":[],"mappings":";AAwDA;EACA,sBAAA;EACA,aAAA;AACA;AACA;EACA,kBAAA;EACA,aAAA;EACA,YAAA;EACA;;;;GAIA;AACA","file":"VSpotlight.vue","sourcesContent":["<template>\n  <div\n    class=\"bg-container\"\n    :style=\"{ background: `url(${background}) no-repeat ${position}` }\"\n  >\n    <div class=\"spotlight\"></div>\n  </div>\n</template>\n<script>\n  export default {\n    name: 'VSpotlight',\n    props: {\n      background: {\n        type: String,\n        required: true,\n      },\n      position: {\n        type: String,\n        default: 'center',\n        required: false,\n      },\n    },\n    data() {\n      return {\n        spotlight: null,\n        spotlightSize: 'transparent 160px, rgba(0, 0, 0, 0.85) 200px)',\n      };\n    },\n    mounted() {\n      const t = this;\n      t.spotlight = document.querySelector('.spotlight');\n      window.addEventListener('mousemove', (e) => {\n        t.updateSpotlight(e);\n      });\n      window.addEventListener('mousedown', (e) => {\n        if (e.which === 1) {\n          t.spotlightSize = 'transparent 130px, rgba(0, 0, 0, 0.95) 150px)';\n          t.updateSpotlight(e);\n        }\n      });\n      window.addEventListener('mouseup', (e) => {\n        t.spotlightSize = 'transparent 160px, rgba(0, 0, 0, 0.85) 200px)';\n        t.updateSpotlight(e);\n      });\n    },\n    methods: {\n      updateSpotlight(e) {\n        const t = this;\n        t.spotlight.style.backgroundImage = `radial-gradient(circle at ${\n          (e.pageX / window.innerWidth) * 100\n        }% ${(e.pageY / window.innerHeight) * 100}%, ${t.spotlightSize}`;\n      },\n    },\n  };\n</script>\n<style scoped>\n  .bg-container {\n    background-size: cover;\n    height: 100vh;\n  }\n  .spotlight {\n    position: absolute;\n    height: 100vh;\n    width: 100vh;\n    background-image: radial-gradient(\n      circle,\n      transparent 160px,\n      rgba(0, 0, 0, 0.85) 200px\n    );\n  }\n</style>\n"]}, media: undefined });

  };
  /* scoped */
  const __vue_scope_id__ = "data-v-788142a2";
  /* module identifier */
  const __vue_module_identifier__ = undefined;
  /* functional template */
  const __vue_is_functional_template__ = false;
  /* style inject SSR */
  
  /* style inject shadow dom */
  

  
  const __vue_component__ = normalizeComponent(
    { render: __vue_render__, staticRenderFns: __vue_staticRenderFns__ },
    __vue_inject_styles__,
    __vue_script__,
    __vue_scope_id__,
    __vue_is_functional_template__,
    __vue_module_identifier__,
    false,
    createInjector,
    undefined,
    undefined
  );

module.exports = __vue_component__;
