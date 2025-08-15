import { $ as VApp, g as genericComponent, a0 as VMain, a1 as __nuxt_component_0, p as propsFactory, j as useProxiedModel, t as useToggleScope, D as useSsrBoot, W as useLayoutItem, d as useRender, f as useLocale, Y as useTheme, v as useDimension, Z as pickWithRest, k as provideTheme, _ as useResizeObserver, o as convertToUnit, X as makeLayoutItemProps, A as clamp, l as useRtl, T as provideDefaults, C as makeTagProps, m as makeComponentProps, y as makeDimensionProps, e as makeThemeProps, I as IconValue } from './server.mjs';
import { ref, withCtx, createTextVNode, createVNode, computed, toRef, watchEffect, shallowRef, mergeProps, createElementVNode, withDirectives, vShow, normalizeStyle, normalizeClass, watch, useSSRContext } from 'vue';
import { ssrRenderComponent } from 'vue/server-renderer';
import { b as VExpandTransition } from './index-DGTrSeuw.mjs';
import { b as VBtn, k as VIcon, V as VCol, e as useBackgroundColor, d as useRounded, f as useTextColor, J as useLocation, M as MaybeTransition, G as useBorder, H as useElevation, a as VImg, g as VDefaultsProvider, j as makeTransitionProps, m as makeRoundedProps, y as makeLocationProps, P as makeElevationProps, Q as makeBorderProps } from './VCol-DYd6kilI.mjs';
import { V as VSpacer } from './VSpacer-CWY-doDI.mjs';
import '../_/nitro.mjs';
import 'node:http';
import 'node:https';
import 'node:events';
import 'node:buffer';
import 'node:fs';
import 'node:path';
import 'node:crypto';
import 'node:url';
import '../routes/renderer.mjs';
import 'vue-bundle-renderer/runtime';
import 'unhead/server';
import 'devalue';
import 'unhead/utils';
import 'vue-router';

const makeVToolbarTitleProps = propsFactory({
  text: String,
  ...makeComponentProps(),
  ...makeTagProps()
}, "VToolbarTitle");
const VToolbarTitle = genericComponent()({
  name: "VToolbarTitle",
  props: makeVToolbarTitleProps(),
  setup(props, _ref) {
    let {
      slots
    } = _ref;
    useRender(() => {
      const hasText = !!(slots.default || slots.text || props.text);
      return createVNode(props.tag, {
        "class": normalizeClass(["v-toolbar-title", props.class]),
        "style": normalizeStyle(props.style)
      }, {
        default: () => [hasText && createElementVNode("div", {
          "class": "v-toolbar-title__placeholder"
        }, [slots.text ? slots.text() : props.text, slots.default?.()])]
      });
    });
    return {};
  }
});
const allowedDensities = [null, "prominent", "default", "comfortable", "compact"];
const makeVToolbarProps = propsFactory({
  absolute: Boolean,
  collapse: Boolean,
  color: String,
  density: {
    type: String,
    default: "default",
    validator: (v) => allowedDensities.includes(v)
  },
  extended: {
    type: Boolean,
    default: null
  },
  extensionHeight: {
    type: [Number, String],
    default: 48
  },
  flat: Boolean,
  floating: Boolean,
  height: {
    type: [Number, String],
    default: 64
  },
  image: String,
  title: String,
  ...makeBorderProps(),
  ...makeComponentProps(),
  ...makeElevationProps(),
  ...makeRoundedProps(),
  ...makeTagProps({
    tag: "header"
  }),
  ...makeThemeProps()
}, "VToolbar");
const VToolbar = genericComponent()({
  name: "VToolbar",
  props: makeVToolbarProps(),
  setup(props, _ref) {
    let {
      slots
    } = _ref;
    const {
      backgroundColorClasses,
      backgroundColorStyles
    } = useBackgroundColor(() => props.color);
    const {
      borderClasses
    } = useBorder(props);
    const {
      elevationClasses
    } = useElevation(props);
    const {
      roundedClasses
    } = useRounded(props);
    const {
      themeClasses
    } = provideTheme(props);
    const {
      rtlClasses
    } = useRtl();
    const isExtended = shallowRef(props.extended === null ? !!slots.extension?.() : props.extended);
    const contentHeight = computed(() => parseInt(Number(props.height) + (props.density === "prominent" ? Number(props.height) : 0) - (props.density === "comfortable" ? 8 : 0) - (props.density === "compact" ? 16 : 0), 10));
    const extensionHeight = computed(() => isExtended.value ? parseInt(Number(props.extensionHeight) + (props.density === "prominent" ? Number(props.extensionHeight) : 0) - (props.density === "comfortable" ? 4 : 0) - (props.density === "compact" ? 8 : 0), 10) : 0);
    provideDefaults({
      VBtn: {
        variant: "text"
      }
    });
    useRender(() => {
      const hasTitle = !!(props.title || slots.title);
      const hasImage = !!(slots.image || props.image);
      const extension = slots.extension?.();
      isExtended.value = props.extended === null ? !!extension : props.extended;
      return createVNode(props.tag, {
        "class": normalizeClass(["v-toolbar", {
          "v-toolbar--absolute": props.absolute,
          "v-toolbar--collapse": props.collapse,
          "v-toolbar--flat": props.flat,
          "v-toolbar--floating": props.floating,
          [`v-toolbar--density-${props.density}`]: true
        }, backgroundColorClasses.value, borderClasses.value, elevationClasses.value, roundedClasses.value, themeClasses.value, rtlClasses.value, props.class]),
        "style": normalizeStyle([backgroundColorStyles.value, props.style])
      }, {
        default: () => [hasImage && createElementVNode("div", {
          "key": "image",
          "class": "v-toolbar__image"
        }, [!slots.image ? createVNode(VImg, {
          "key": "image-img",
          "cover": true,
          "src": props.image
        }, null) : createVNode(VDefaultsProvider, {
          "key": "image-defaults",
          "disabled": !props.image,
          "defaults": {
            VImg: {
              cover: true,
              src: props.image
            }
          }
        }, slots.image)]), createVNode(VDefaultsProvider, {
          "defaults": {
            VTabs: {
              height: convertToUnit(contentHeight.value)
            }
          }
        }, {
          default: () => [createElementVNode("div", {
            "class": "v-toolbar__content",
            "style": {
              height: convertToUnit(contentHeight.value)
            }
          }, [slots.prepend && createElementVNode("div", {
            "class": "v-toolbar__prepend"
          }, [slots.prepend?.()]), hasTitle && createVNode(VToolbarTitle, {
            "key": "title",
            "text": props.title
          }, {
            text: slots.title
          }), slots.default?.(), slots.append && createElementVNode("div", {
            "class": "v-toolbar__append"
          }, [slots.append?.()])])]
        }), createVNode(VDefaultsProvider, {
          "defaults": {
            VTabs: {
              height: convertToUnit(extensionHeight.value)
            }
          }
        }, {
          default: () => [createVNode(VExpandTransition, null, {
            default: () => [isExtended.value && createElementVNode("div", {
              "class": "v-toolbar__extension",
              "style": {
                height: convertToUnit(extensionHeight.value)
              }
            }, [extension])]
          })]
        })]
      });
    });
    return {
      contentHeight,
      extensionHeight
    };
  }
});
const makeScrollProps = propsFactory({
  scrollTarget: {
    type: String
  },
  scrollThreshold: {
    type: [String, Number],
    default: 300
  }
}, "scroll");
function useScroll(props) {
  let args = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : {};
  const {
    canScroll
  } = args;
  let previousScroll = 0;
  let previousScrollHeight = 0;
  const target = ref(null);
  const currentScroll = shallowRef(0);
  const savedScroll = shallowRef(0);
  const currentThreshold = shallowRef(0);
  const isScrollActive = shallowRef(false);
  const isScrollingUp = shallowRef(false);
  const scrollThreshold = computed(() => {
    return Number(props.scrollThreshold);
  });
  const scrollRatio = computed(() => {
    return clamp((scrollThreshold.value - currentScroll.value) / scrollThreshold.value || 0);
  });
  const onScroll = () => {
    const targetEl = target.value;
    if (!targetEl || canScroll && !canScroll.value) return;
    previousScroll = currentScroll.value;
    currentScroll.value = "window" in targetEl ? targetEl.pageYOffset : targetEl.scrollTop;
    const currentScrollHeight = targetEl instanceof Window ? (void 0).documentElement.scrollHeight : targetEl.scrollHeight;
    if (previousScrollHeight !== currentScrollHeight) {
      previousScrollHeight = currentScrollHeight;
      return;
    }
    isScrollingUp.value = currentScroll.value < previousScroll;
    currentThreshold.value = Math.abs(currentScroll.value - scrollThreshold.value);
  };
  watch(isScrollingUp, () => {
    savedScroll.value = savedScroll.value || currentScroll.value;
  });
  watch(isScrollActive, () => {
    savedScroll.value = 0;
  });
  canScroll && watch(canScroll, onScroll, {
    immediate: true
  });
  return {
    scrollThreshold,
    currentScroll,
    currentThreshold,
    isScrollActive,
    scrollRatio,
    // required only for testing
    // probably can be removed
    // later (2 chars chlng)
    isScrollingUp,
    savedScroll
  };
}
const makeVAppBarProps = propsFactory({
  scrollBehavior: String,
  modelValue: {
    type: Boolean,
    default: true
  },
  location: {
    type: String,
    default: "top",
    validator: (value) => ["top", "bottom"].includes(value)
  },
  ...makeVToolbarProps(),
  ...makeLayoutItemProps(),
  ...makeScrollProps(),
  height: {
    type: [Number, String],
    default: 64
  }
}, "VAppBar");
const VAppBar = genericComponent()({
  name: "VAppBar",
  props: makeVAppBarProps(),
  emits: {
    "update:modelValue": (value) => true
  },
  setup(props, _ref) {
    let {
      slots
    } = _ref;
    const vToolbarRef = ref();
    const isActive = useProxiedModel(props, "modelValue");
    const scrollBehavior = computed(() => {
      const behavior = new Set(props.scrollBehavior?.split(" ") ?? []);
      return {
        hide: behavior.has("hide"),
        fullyHide: behavior.has("fully-hide"),
        inverted: behavior.has("inverted"),
        collapse: behavior.has("collapse"),
        elevate: behavior.has("elevate"),
        fadeImage: behavior.has("fade-image")
        // shrink: behavior.has('shrink'),
      };
    });
    const canScroll = computed(() => {
      const behavior = scrollBehavior.value;
      return behavior.hide || behavior.fullyHide || behavior.inverted || behavior.collapse || behavior.elevate || behavior.fadeImage || // behavior.shrink ||
      !isActive.value;
    });
    const {
      currentScroll,
      scrollThreshold,
      isScrollingUp,
      scrollRatio
    } = useScroll(props, {
      canScroll
    });
    const canHide = toRef(() => scrollBehavior.value.hide || scrollBehavior.value.fullyHide);
    const isCollapsed = computed(() => props.collapse || scrollBehavior.value.collapse && (scrollBehavior.value.inverted ? scrollRatio.value > 0 : scrollRatio.value === 0));
    const isFlat = computed(() => props.flat || scrollBehavior.value.fullyHide && !isActive.value || scrollBehavior.value.elevate && (scrollBehavior.value.inverted ? currentScroll.value > 0 : currentScroll.value === 0));
    const opacity = computed(() => scrollBehavior.value.fadeImage ? scrollBehavior.value.inverted ? 1 - scrollRatio.value : scrollRatio.value : void 0);
    const height = computed(() => {
      if (scrollBehavior.value.hide && scrollBehavior.value.inverted) return 0;
      const height2 = vToolbarRef.value?.contentHeight ?? 0;
      const extensionHeight = vToolbarRef.value?.extensionHeight ?? 0;
      if (!canHide.value) return height2 + extensionHeight;
      return currentScroll.value < scrollThreshold.value || scrollBehavior.value.fullyHide ? height2 + extensionHeight : height2;
    });
    useToggleScope(() => !!props.scrollBehavior, () => {
      watchEffect(() => {
        if (canHide.value) {
          if (scrollBehavior.value.inverted) {
            isActive.value = currentScroll.value > scrollThreshold.value;
          } else {
            isActive.value = isScrollingUp.value || currentScroll.value < scrollThreshold.value;
          }
        } else {
          isActive.value = true;
        }
      });
    });
    const {
      ssrBootStyles
    } = useSsrBoot();
    const {
      layoutItemStyles
    } = useLayoutItem({
      id: props.name,
      order: computed(() => parseInt(props.order, 10)),
      position: toRef(() => props.location),
      layoutSize: height,
      elementSize: shallowRef(void 0),
      active: isActive,
      absolute: toRef(() => props.absolute)
    });
    useRender(() => {
      const toolbarProps = VToolbar.filterProps(props);
      return createVNode(VToolbar, mergeProps({
        "ref": vToolbarRef,
        "class": ["v-app-bar", {
          "v-app-bar--bottom": props.location === "bottom"
        }, props.class],
        "style": [{
          ...layoutItemStyles.value,
          "--v-toolbar-image-opacity": opacity.value,
          height: void 0,
          ...ssrBootStyles.value
        }, props.style]
      }, toolbarProps, {
        "collapse": isCollapsed.value,
        "flat": isFlat.value
      }), slots);
    });
    return {};
  }
});
const VAppBarTitle = genericComponent()({
  name: "VAppBarTitle",
  props: makeVToolbarTitleProps(),
  setup(props, _ref) {
    let {
      slots
    } = _ref;
    useRender(() => createVNode(VToolbarTitle, mergeProps(props, {
      "class": "v-app-bar-title"
    }), slots));
    return {};
  }
});
const makeVBadgeProps = propsFactory({
  bordered: Boolean,
  color: String,
  content: [Number, String],
  dot: Boolean,
  floating: Boolean,
  icon: IconValue,
  inline: Boolean,
  label: {
    type: String,
    default: "$vuetify.badge"
  },
  max: [Number, String],
  modelValue: {
    type: Boolean,
    default: true
  },
  offsetX: [Number, String],
  offsetY: [Number, String],
  textColor: String,
  ...makeComponentProps(),
  ...makeLocationProps({
    location: "top end"
  }),
  ...makeRoundedProps(),
  ...makeTagProps(),
  ...makeThemeProps(),
  ...makeTransitionProps({
    transition: "scale-rotate-transition"
  }),
  ...makeDimensionProps()
}, "VBadge");
const VBadge = genericComponent()({
  name: "VBadge",
  inheritAttrs: false,
  props: makeVBadgeProps(),
  setup(props, ctx) {
    const {
      backgroundColorClasses,
      backgroundColorStyles
    } = useBackgroundColor(() => props.color);
    const {
      roundedClasses
    } = useRounded(props);
    const {
      t
    } = useLocale();
    const {
      textColorClasses,
      textColorStyles
    } = useTextColor(() => props.textColor);
    const {
      themeClasses
    } = useTheme();
    const {
      locationStyles
    } = useLocation(props, true, (side) => {
      const base = props.floating ? props.dot ? 2 : 4 : props.dot ? 8 : 12;
      return base + (["top", "bottom"].includes(side) ? Number(props.offsetY ?? 0) : ["left", "right"].includes(side) ? Number(props.offsetX ?? 0) : 0);
    });
    const {
      dimensionStyles
    } = useDimension(props);
    useRender(() => {
      const value = Number(props.content);
      const content = !props.max || isNaN(value) ? props.content : value <= Number(props.max) ? value : `${props.max}+`;
      const [badgeAttrs, attrs] = pickWithRest(ctx.attrs, ["aria-atomic", "aria-label", "aria-live", "role", "title"]);
      return createVNode(props.tag, mergeProps({
        "class": ["v-badge", {
          "v-badge--bordered": props.bordered,
          "v-badge--dot": props.dot,
          "v-badge--floating": props.floating,
          "v-badge--inline": props.inline
        }, props.class]
      }, attrs, {
        "style": props.style
      }), {
        default: () => [createElementVNode("div", {
          "class": "v-badge__wrapper"
        }, [ctx.slots.default?.(), createVNode(MaybeTransition, {
          "transition": props.transition
        }, {
          default: () => [withDirectives(createElementVNode("span", mergeProps({
            "class": ["v-badge__badge", themeClasses.value, backgroundColorClasses.value, roundedClasses.value, textColorClasses.value],
            "style": [backgroundColorStyles.value, textColorStyles.value, dimensionStyles.value, props.inline ? {} : locationStyles.value],
            "aria-atomic": "true",
            "aria-label": t(props.label, value),
            "aria-live": "polite",
            "role": "status"
          }, badgeAttrs), [props.dot ? void 0 : ctx.slots.badge ? ctx.slots.badge?.() : props.icon ? createVNode(VIcon, {
            "icon": props.icon
          }, null) : content]), [[vShow, props.modelValue]])]
        })])]
      });
    });
    return {};
  }
});
const makeVFooterProps = propsFactory({
  app: Boolean,
  color: String,
  height: {
    type: [Number, String],
    default: "auto"
  },
  ...makeBorderProps(),
  ...makeComponentProps(),
  ...makeElevationProps(),
  ...makeLayoutItemProps(),
  ...makeRoundedProps(),
  ...makeTagProps({
    tag: "footer"
  }),
  ...makeThemeProps()
}, "VFooter");
const VFooter = genericComponent()({
  name: "VFooter",
  props: makeVFooterProps(),
  setup(props, _ref) {
    let {
      slots
    } = _ref;
    const layoutItemStyles = ref();
    const {
      themeClasses
    } = provideTheme(props);
    const {
      backgroundColorClasses,
      backgroundColorStyles
    } = useBackgroundColor(() => props.color);
    const {
      borderClasses
    } = useBorder(props);
    const {
      elevationClasses
    } = useElevation(props);
    const {
      roundedClasses
    } = useRounded(props);
    const autoHeight = shallowRef(32);
    const {
      resizeRef
    } = useResizeObserver();
    const height = computed(() => props.height === "auto" ? autoHeight.value : parseInt(props.height, 10));
    useToggleScope(() => props.app, () => {
      const layout = useLayoutItem({
        id: props.name,
        order: computed(() => parseInt(props.order, 10)),
        position: toRef(() => "bottom"),
        layoutSize: height,
        elementSize: computed(() => props.height === "auto" ? void 0 : height.value),
        active: toRef(() => props.app),
        absolute: toRef(() => props.absolute)
      });
      watchEffect(() => {
        layoutItemStyles.value = layout.layoutItemStyles.value;
      });
    });
    useRender(() => createVNode(props.tag, {
      "ref": resizeRef,
      "class": normalizeClass(["v-footer", themeClasses.value, backgroundColorClasses.value, borderClasses.value, elevationClasses.value, roundedClasses.value, props.class]),
      "style": normalizeStyle([backgroundColorStyles.value, props.app ? layoutItemStyles.value : {
        height: convertToUnit(props.height)
      }, props.style])
    }, slots));
    return {};
  }
});
const _sfc_main = {
  __name: "default",
  __ssrInlineRender: true,
  setup(__props) {
    const cartCount = ref(0);
    return (_ctx, _push, _parent, _attrs) => {
      const _component_NuxtPage = __nuxt_component_0;
      _push(ssrRenderComponent(VApp, _attrs, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(ssrRenderComponent(VAppBar, {
              color: "green-darken-2",
              dark: ""
            }, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(ssrRenderComponent(VAppBarTitle, null, {
                    default: withCtx((_3, _push4, _parent4, _scopeId3) => {
                      if (_push4) {
                        _push4(`YaDom Shop`);
                      } else {
                        return [
                          createTextVNode("YaDom Shop")
                        ];
                      }
                    }),
                    _: 1
                  }, _parent3, _scopeId2));
                  _push3(ssrRenderComponent(VSpacer, null, null, _parent3, _scopeId2));
                  _push3(ssrRenderComponent(VBtn, {
                    text: "",
                    to: "../"
                  }, {
                    default: withCtx((_3, _push4, _parent4, _scopeId3) => {
                      if (_push4) {
                        _push4(ssrRenderComponent(VIcon, { left: "" }, {
                          default: withCtx((_4, _push5, _parent5, _scopeId4) => {
                            if (_push5) {
                              _push5(`mdi-home`);
                            } else {
                              return [
                                createTextVNode("mdi-home")
                              ];
                            }
                          }),
                          _: 1
                        }, _parent4, _scopeId3));
                        _push4(` หน้าแรก `);
                      } else {
                        return [
                          createVNode(VIcon, { left: "" }, {
                            default: withCtx(() => [
                              createTextVNode("mdi-home")
                            ]),
                            _: 1
                          }),
                          createTextVNode(" หน้าแรก ")
                        ];
                      }
                    }),
                    _: 1
                  }, _parent3, _scopeId2));
                  _push3(ssrRenderComponent(VBtn, {
                    text: "",
                    to: "../review"
                  }, {
                    default: withCtx((_3, _push4, _parent4, _scopeId3) => {
                      if (_push4) {
                        _push4(ssrRenderComponent(VIcon, { left: "" }, {
                          default: withCtx((_4, _push5, _parent5, _scopeId4) => {
                            if (_push5) {
                              _push5(`mdi-eye`);
                            } else {
                              return [
                                createTextVNode("mdi-eye")
                              ];
                            }
                          }),
                          _: 1
                        }, _parent4, _scopeId3));
                        _push4(` วิสัยทัศน์ `);
                      } else {
                        return [
                          createVNode(VIcon, { left: "" }, {
                            default: withCtx(() => [
                              createTextVNode("mdi-eye")
                            ]),
                            _: 1
                          }),
                          createTextVNode(" วิสัยทัศน์ ")
                        ];
                      }
                    }),
                    _: 1
                  }, _parent3, _scopeId2));
                  _push3(ssrRenderComponent(VBtn, {
                    text: "",
                    to: "../review"
                  }, {
                    default: withCtx((_3, _push4, _parent4, _scopeId3) => {
                      if (_push4) {
                        _push4(ssrRenderComponent(VIcon, { left: "" }, {
                          default: withCtx((_4, _push5, _parent5, _scopeId4) => {
                            if (_push5) {
                              _push5(`mdi-account-group`);
                            } else {
                              return [
                                createTextVNode("mdi-account-group")
                              ];
                            }
                          }),
                          _: 1
                        }, _parent4, _scopeId3));
                        _push4(` บอร์ดบริหาร `);
                      } else {
                        return [
                          createVNode(VIcon, { left: "" }, {
                            default: withCtx(() => [
                              createTextVNode("mdi-account-group")
                            ]),
                            _: 1
                          }),
                          createTextVNode(" บอร์ดบริหาร ")
                        ];
                      }
                    }),
                    _: 1
                  }, _parent3, _scopeId2));
                  _push3(ssrRenderComponent(VBtn, {
                    text: "",
                    to: "../review"
                  }, {
                    default: withCtx((_3, _push4, _parent4, _scopeId3) => {
                      if (_push4) {
                        _push4(ssrRenderComponent(VIcon, { left: "" }, {
                          default: withCtx((_4, _push5, _parent5, _scopeId4) => {
                            if (_push5) {
                              _push5(`mdi-leaf`);
                            } else {
                              return [
                                createTextVNode("mdi-leaf")
                              ];
                            }
                          }),
                          _: 1
                        }, _parent4, _scopeId3));
                        _push4(` สรรพคุณ `);
                      } else {
                        return [
                          createVNode(VIcon, { left: "" }, {
                            default: withCtx(() => [
                              createTextVNode("mdi-leaf")
                            ]),
                            _: 1
                          }),
                          createTextVNode(" สรรพคุณ ")
                        ];
                      }
                    }),
                    _: 1
                  }, _parent3, _scopeId2));
                  _push3(ssrRenderComponent(VBtn, {
                    text: "",
                    to: "../about"
                  }, {
                    default: withCtx((_3, _push4, _parent4, _scopeId3) => {
                      if (_push4) {
                        _push4(ssrRenderComponent(VIcon, { left: "" }, {
                          default: withCtx((_4, _push5, _parent5, _scopeId4) => {
                            if (_push5) {
                              _push5(`mdi-cube`);
                            } else {
                              return [
                                createTextVNode("mdi-cube")
                              ];
                            }
                          }),
                          _: 1
                        }, _parent4, _scopeId3));
                        _push4(` สินค้า `);
                      } else {
                        return [
                          createVNode(VIcon, { left: "" }, {
                            default: withCtx(() => [
                              createTextVNode("mdi-cube")
                            ]),
                            _: 1
                          }),
                          createTextVNode(" สินค้า ")
                        ];
                      }
                    }),
                    _: 1
                  }, _parent3, _scopeId2));
                  _push3(ssrRenderComponent(VBtn, {
                    text: "",
                    to: "../review"
                  }, {
                    default: withCtx((_3, _push4, _parent4, _scopeId3) => {
                      if (_push4) {
                        _push4(ssrRenderComponent(VIcon, { left: "" }, {
                          default: withCtx((_4, _push5, _parent5, _scopeId4) => {
                            if (_push5) {
                              _push5(`mdi-star`);
                            } else {
                              return [
                                createTextVNode("mdi-star")
                              ];
                            }
                          }),
                          _: 1
                        }, _parent4, _scopeId3));
                        _push4(` รีวิว `);
                      } else {
                        return [
                          createVNode(VIcon, { left: "" }, {
                            default: withCtx(() => [
                              createTextVNode("mdi-star")
                            ]),
                            _: 1
                          }),
                          createTextVNode(" รีวิว ")
                        ];
                      }
                    }),
                    _: 1
                  }, _parent3, _scopeId2));
                  _push3(ssrRenderComponent(VBtn, { text: "" }, {
                    default: withCtx((_3, _push4, _parent4, _scopeId3) => {
                      if (_push4) {
                        _push4(ssrRenderComponent(VIcon, { left: "" }, {
                          default: withCtx((_4, _push5, _parent5, _scopeId4) => {
                            if (_push5) {
                              _push5(`mdi-phone`);
                            } else {
                              return [
                                createTextVNode("mdi-phone")
                              ];
                            }
                          }),
                          _: 1
                        }, _parent4, _scopeId3));
                        _push4(` ติดต่อ `);
                      } else {
                        return [
                          createVNode(VIcon, { left: "" }, {
                            default: withCtx(() => [
                              createTextVNode("mdi-phone")
                            ]),
                            _: 1
                          }),
                          createTextVNode(" ติดต่อ ")
                        ];
                      }
                    }),
                    _: 1
                  }, _parent3, _scopeId2));
                  _push3(ssrRenderComponent(VBtn, {
                    icon: "",
                    to: "../cart"
                  }, {
                    default: withCtx((_3, _push4, _parent4, _scopeId3) => {
                      if (_push4) {
                        _push4(ssrRenderComponent(VBadge, {
                          content: cartCount.value,
                          color: "red",
                          overlap: ""
                        }, {
                          default: withCtx((_4, _push5, _parent5, _scopeId4) => {
                            if (_push5) {
                              _push5(ssrRenderComponent(VIcon, null, {
                                default: withCtx((_5, _push6, _parent6, _scopeId5) => {
                                  if (_push6) {
                                    _push6(`mdi-cart`);
                                  } else {
                                    return [
                                      createTextVNode("mdi-cart")
                                    ];
                                  }
                                }),
                                _: 1
                              }, _parent5, _scopeId4));
                            } else {
                              return [
                                createVNode(VIcon, null, {
                                  default: withCtx(() => [
                                    createTextVNode("mdi-cart")
                                  ]),
                                  _: 1
                                })
                              ];
                            }
                          }),
                          _: 1
                        }, _parent4, _scopeId3));
                      } else {
                        return [
                          createVNode(VBadge, {
                            content: cartCount.value,
                            color: "red",
                            overlap: ""
                          }, {
                            default: withCtx(() => [
                              createVNode(VIcon, null, {
                                default: withCtx(() => [
                                  createTextVNode("mdi-cart")
                                ]),
                                _: 1
                              })
                            ]),
                            _: 1
                          }, 8, ["content"])
                        ];
                      }
                    }),
                    _: 1
                  }, _parent3, _scopeId2));
                } else {
                  return [
                    createVNode(VAppBarTitle, null, {
                      default: withCtx(() => [
                        createTextVNode("YaDom Shop")
                      ]),
                      _: 1
                    }),
                    createVNode(VSpacer),
                    createVNode(VBtn, {
                      text: "",
                      to: "../"
                    }, {
                      default: withCtx(() => [
                        createVNode(VIcon, { left: "" }, {
                          default: withCtx(() => [
                            createTextVNode("mdi-home")
                          ]),
                          _: 1
                        }),
                        createTextVNode(" หน้าแรก ")
                      ]),
                      _: 1
                    }),
                    createVNode(VBtn, {
                      text: "",
                      to: "../review"
                    }, {
                      default: withCtx(() => [
                        createVNode(VIcon, { left: "" }, {
                          default: withCtx(() => [
                            createTextVNode("mdi-eye")
                          ]),
                          _: 1
                        }),
                        createTextVNode(" วิสัยทัศน์ ")
                      ]),
                      _: 1
                    }),
                    createVNode(VBtn, {
                      text: "",
                      to: "../review"
                    }, {
                      default: withCtx(() => [
                        createVNode(VIcon, { left: "" }, {
                          default: withCtx(() => [
                            createTextVNode("mdi-account-group")
                          ]),
                          _: 1
                        }),
                        createTextVNode(" บอร์ดบริหาร ")
                      ]),
                      _: 1
                    }),
                    createVNode(VBtn, {
                      text: "",
                      to: "../review"
                    }, {
                      default: withCtx(() => [
                        createVNode(VIcon, { left: "" }, {
                          default: withCtx(() => [
                            createTextVNode("mdi-leaf")
                          ]),
                          _: 1
                        }),
                        createTextVNode(" สรรพคุณ ")
                      ]),
                      _: 1
                    }),
                    createVNode(VBtn, {
                      text: "",
                      to: "../about"
                    }, {
                      default: withCtx(() => [
                        createVNode(VIcon, { left: "" }, {
                          default: withCtx(() => [
                            createTextVNode("mdi-cube")
                          ]),
                          _: 1
                        }),
                        createTextVNode(" สินค้า ")
                      ]),
                      _: 1
                    }),
                    createVNode(VBtn, {
                      text: "",
                      to: "../review"
                    }, {
                      default: withCtx(() => [
                        createVNode(VIcon, { left: "" }, {
                          default: withCtx(() => [
                            createTextVNode("mdi-star")
                          ]),
                          _: 1
                        }),
                        createTextVNode(" รีวิว ")
                      ]),
                      _: 1
                    }),
                    createVNode(VBtn, { text: "" }, {
                      default: withCtx(() => [
                        createVNode(VIcon, { left: "" }, {
                          default: withCtx(() => [
                            createTextVNode("mdi-phone")
                          ]),
                          _: 1
                        }),
                        createTextVNode(" ติดต่อ ")
                      ]),
                      _: 1
                    }),
                    createVNode(VBtn, {
                      icon: "",
                      to: "../cart"
                    }, {
                      default: withCtx(() => [
                        createVNode(VBadge, {
                          content: cartCount.value,
                          color: "red",
                          overlap: ""
                        }, {
                          default: withCtx(() => [
                            createVNode(VIcon, null, {
                              default: withCtx(() => [
                                createTextVNode("mdi-cart")
                              ]),
                              _: 1
                            })
                          ]),
                          _: 1
                        }, 8, ["content"])
                      ]),
                      _: 1
                    })
                  ];
                }
              }),
              _: 1
            }, _parent2, _scopeId));
            _push2(ssrRenderComponent(VMain, null, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(ssrRenderComponent(_component_NuxtPage, null, null, _parent3, _scopeId2));
                } else {
                  return [
                    createVNode(_component_NuxtPage)
                  ];
                }
              }),
              _: 1
            }, _parent2, _scopeId));
            _push2(ssrRenderComponent(VFooter, {
              color: "green-darken-2",
              app: ""
            }, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(ssrRenderComponent(VCol, { class: "text-center white--text" }, {
                    default: withCtx((_3, _push4, _parent4, _scopeId3) => {
                      if (_push4) {
                        _push4(` © 2025 YaDom Shop | ติดต่อ: 086-386-2827 `);
                      } else {
                        return [
                          createTextVNode(" © 2025 YaDom Shop | ติดต่อ: 086-386-2827 ")
                        ];
                      }
                    }),
                    _: 1
                  }, _parent3, _scopeId2));
                } else {
                  return [
                    createVNode(VCol, { class: "text-center white--text" }, {
                      default: withCtx(() => [
                        createTextVNode(" © 2025 YaDom Shop | ติดต่อ: 086-386-2827 ")
                      ]),
                      _: 1
                    })
                  ];
                }
              }),
              _: 1
            }, _parent2, _scopeId));
          } else {
            return [
              createVNode(VAppBar, {
                color: "green-darken-2",
                dark: ""
              }, {
                default: withCtx(() => [
                  createVNode(VAppBarTitle, null, {
                    default: withCtx(() => [
                      createTextVNode("YaDom Shop")
                    ]),
                    _: 1
                  }),
                  createVNode(VSpacer),
                  createVNode(VBtn, {
                    text: "",
                    to: "../"
                  }, {
                    default: withCtx(() => [
                      createVNode(VIcon, { left: "" }, {
                        default: withCtx(() => [
                          createTextVNode("mdi-home")
                        ]),
                        _: 1
                      }),
                      createTextVNode(" หน้าแรก ")
                    ]),
                    _: 1
                  }),
                  createVNode(VBtn, {
                    text: "",
                    to: "../review"
                  }, {
                    default: withCtx(() => [
                      createVNode(VIcon, { left: "" }, {
                        default: withCtx(() => [
                          createTextVNode("mdi-eye")
                        ]),
                        _: 1
                      }),
                      createTextVNode(" วิสัยทัศน์ ")
                    ]),
                    _: 1
                  }),
                  createVNode(VBtn, {
                    text: "",
                    to: "../review"
                  }, {
                    default: withCtx(() => [
                      createVNode(VIcon, { left: "" }, {
                        default: withCtx(() => [
                          createTextVNode("mdi-account-group")
                        ]),
                        _: 1
                      }),
                      createTextVNode(" บอร์ดบริหาร ")
                    ]),
                    _: 1
                  }),
                  createVNode(VBtn, {
                    text: "",
                    to: "../review"
                  }, {
                    default: withCtx(() => [
                      createVNode(VIcon, { left: "" }, {
                        default: withCtx(() => [
                          createTextVNode("mdi-leaf")
                        ]),
                        _: 1
                      }),
                      createTextVNode(" สรรพคุณ ")
                    ]),
                    _: 1
                  }),
                  createVNode(VBtn, {
                    text: "",
                    to: "../about"
                  }, {
                    default: withCtx(() => [
                      createVNode(VIcon, { left: "" }, {
                        default: withCtx(() => [
                          createTextVNode("mdi-cube")
                        ]),
                        _: 1
                      }),
                      createTextVNode(" สินค้า ")
                    ]),
                    _: 1
                  }),
                  createVNode(VBtn, {
                    text: "",
                    to: "../review"
                  }, {
                    default: withCtx(() => [
                      createVNode(VIcon, { left: "" }, {
                        default: withCtx(() => [
                          createTextVNode("mdi-star")
                        ]),
                        _: 1
                      }),
                      createTextVNode(" รีวิว ")
                    ]),
                    _: 1
                  }),
                  createVNode(VBtn, { text: "" }, {
                    default: withCtx(() => [
                      createVNode(VIcon, { left: "" }, {
                        default: withCtx(() => [
                          createTextVNode("mdi-phone")
                        ]),
                        _: 1
                      }),
                      createTextVNode(" ติดต่อ ")
                    ]),
                    _: 1
                  }),
                  createVNode(VBtn, {
                    icon: "",
                    to: "../cart"
                  }, {
                    default: withCtx(() => [
                      createVNode(VBadge, {
                        content: cartCount.value,
                        color: "red",
                        overlap: ""
                      }, {
                        default: withCtx(() => [
                          createVNode(VIcon, null, {
                            default: withCtx(() => [
                              createTextVNode("mdi-cart")
                            ]),
                            _: 1
                          })
                        ]),
                        _: 1
                      }, 8, ["content"])
                    ]),
                    _: 1
                  })
                ]),
                _: 1
              }),
              createVNode(VMain, null, {
                default: withCtx(() => [
                  createVNode(_component_NuxtPage)
                ]),
                _: 1
              }),
              createVNode(VFooter, {
                color: "green-darken-2",
                app: ""
              }, {
                default: withCtx(() => [
                  createVNode(VCol, { class: "text-center white--text" }, {
                    default: withCtx(() => [
                      createTextVNode(" © 2025 YaDom Shop | ติดต่อ: 086-386-2827 ")
                    ]),
                    _: 1
                  })
                ]),
                _: 1
              })
            ];
          }
        }),
        _: 1
      }, _parent));
    };
  }
};
const _sfc_setup = _sfc_main.setup;
_sfc_main.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("layouts/default.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};

export { _sfc_main as default };
//# sourceMappingURL=default-D07xnW44.mjs.map
