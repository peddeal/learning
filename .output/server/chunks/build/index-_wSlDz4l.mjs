import { ref, withCtx, createTextVNode, createVNode, createBlock, openBlock, Fragment, renderList, toDisplayString, watch, mergeProps, createElementVNode, computed, shallowRef, provide, toRef, withDirectives, normalizeStyle, normalizeClass, inject, vShow, nextTick, useSSRContext } from 'vue';
import { ssrRenderComponent, ssrRenderList, ssrInterpolate } from 'vue/server-renderer';
import { V as VContainer, a as VRow, b as VCard, c as VCardTitle, f as VCardSubtitle, e as VCardActions, d as VCardText } from './VRow-BvYQNWX6.mjs';
import { a as VImg, b as VBtn, V as VCol, g as VDefaultsProvider, l as VProgressLinear, n as useGroup, o as makeVImgProps, p as useGroupItem, M as MaybeTransition, q as makeGroupItemProps } from './VCol-DYd6kilI.mjs';
import { g as genericComponent, p as propsFactory, j as useProxiedModel, f as useLocale, d as useRender, o as convertToUnit, I as IconValue, k as provideTheme, l as useRtl, D as useSsrBoot, e as makeThemeProps, C as makeTagProps, m as makeComponentProps, B as keys } from './server.mjs';
import { V as VDialog, a as VSnackbar, u as useLazy, m as makeLazyProps } from './VSnackbar-B-HLRO2L.mjs';
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

const handleGesture = (wrapper) => {
  const {
    touchstartX,
    touchendX,
    touchstartY,
    touchendY
  } = wrapper;
  const dirRatio = 0.5;
  const minDistance = 16;
  wrapper.offsetX = touchendX - touchstartX;
  wrapper.offsetY = touchendY - touchstartY;
  if (Math.abs(wrapper.offsetY) < dirRatio * Math.abs(wrapper.offsetX)) {
    wrapper.left && touchendX < touchstartX - minDistance && wrapper.left(wrapper);
    wrapper.right && touchendX > touchstartX + minDistance && wrapper.right(wrapper);
  }
  if (Math.abs(wrapper.offsetX) < dirRatio * Math.abs(wrapper.offsetY)) {
    wrapper.up && touchendY < touchstartY - minDistance && wrapper.up(wrapper);
    wrapper.down && touchendY > touchstartY + minDistance && wrapper.down(wrapper);
  }
};
function touchstart(event, wrapper) {
  const touch = event.changedTouches[0];
  wrapper.touchstartX = touch.clientX;
  wrapper.touchstartY = touch.clientY;
  wrapper.start?.({
    originalEvent: event,
    ...wrapper
  });
}
function touchend(event, wrapper) {
  const touch = event.changedTouches[0];
  wrapper.touchendX = touch.clientX;
  wrapper.touchendY = touch.clientY;
  wrapper.end?.({
    originalEvent: event,
    ...wrapper
  });
  handleGesture(wrapper);
}
function touchmove(event, wrapper) {
  const touch = event.changedTouches[0];
  wrapper.touchmoveX = touch.clientX;
  wrapper.touchmoveY = touch.clientY;
  wrapper.move?.({
    originalEvent: event,
    ...wrapper
  });
}
function createHandlers() {
  let value = arguments.length > 0 && arguments[0] !== void 0 ? arguments[0] : {};
  const wrapper = {
    touchstartX: 0,
    touchstartY: 0,
    touchendX: 0,
    touchendY: 0,
    touchmoveX: 0,
    touchmoveY: 0,
    offsetX: 0,
    offsetY: 0,
    left: value.left,
    right: value.right,
    up: value.up,
    down: value.down,
    start: value.start,
    move: value.move,
    end: value.end
  };
  return {
    touchstart: (e) => touchstart(e, wrapper),
    touchend: (e) => touchend(e, wrapper),
    touchmove: (e) => touchmove(e, wrapper)
  };
}
function mounted(el, binding) {
  const value = binding.value;
  const target = value?.parent ? el.parentElement : el;
  const options = value?.options ?? {
    passive: true
  };
  const uid = binding.instance?.$.uid;
  if (!target || !uid) return;
  const handlers = createHandlers(binding.value);
  target._touchHandlers = target._touchHandlers ?? /* @__PURE__ */ Object.create(null);
  target._touchHandlers[uid] = handlers;
  keys(handlers).forEach((eventName) => {
    target.addEventListener(eventName, handlers[eventName], options);
  });
}
function unmounted(el, binding) {
  const target = binding.value?.parent ? el.parentElement : el;
  const uid = binding.instance?.$.uid;
  if (!target?._touchHandlers || !uid) return;
  const handlers = target._touchHandlers[uid];
  keys(handlers).forEach((eventName) => {
    target.removeEventListener(eventName, handlers[eventName]);
  });
  delete target._touchHandlers[uid];
}
const Touch = {
  mounted,
  unmounted
};
const VWindowSymbol = Symbol.for("vuetify:v-window");
const VWindowGroupSymbol = Symbol.for("vuetify:v-window-group");
const makeVWindowProps = propsFactory({
  continuous: Boolean,
  nextIcon: {
    type: [Boolean, String, Function, Object],
    default: "$next"
  },
  prevIcon: {
    type: [Boolean, String, Function, Object],
    default: "$prev"
  },
  reverse: Boolean,
  showArrows: {
    type: [Boolean, String],
    validator: (v) => typeof v === "boolean" || v === "hover"
  },
  verticalArrows: [Boolean, String],
  touch: {
    type: [Object, Boolean],
    default: void 0
  },
  direction: {
    type: String,
    default: "horizontal"
  },
  modelValue: null,
  disabled: Boolean,
  selectedClass: {
    type: String,
    default: "v-window-item--active"
  },
  // TODO: mandatory should probably not be exposed but do this for now
  mandatory: {
    type: [Boolean, String],
    default: "force"
  },
  ...makeComponentProps(),
  ...makeTagProps(),
  ...makeThemeProps()
}, "VWindow");
const VWindow = genericComponent()({
  name: "VWindow",
  directives: {
    vTouch: Touch
  },
  props: makeVWindowProps(),
  emits: {
    "update:modelValue": (value) => true
  },
  setup(props, _ref) {
    let {
      slots
    } = _ref;
    const {
      themeClasses
    } = provideTheme(props);
    const {
      isRtl
    } = useRtl();
    const {
      t
    } = useLocale();
    const group = useGroup(props, VWindowGroupSymbol);
    const rootRef = ref();
    const isRtlReverse = computed(() => isRtl.value ? !props.reverse : props.reverse);
    const isReversed = shallowRef(false);
    const transition = computed(() => {
      const axis = props.direction === "vertical" ? "y" : "x";
      const reverse = isRtlReverse.value ? !isReversed.value : isReversed.value;
      const direction = reverse ? "-reverse" : "";
      return `v-window-${axis}${direction}-transition`;
    });
    const transitionCount = shallowRef(0);
    const transitionHeight = ref(void 0);
    const activeIndex = computed(() => {
      return group.items.value.findIndex((item) => group.selected.value.includes(item.id));
    });
    watch(activeIndex, (newVal, oldVal) => {
      const itemsLength = group.items.value.length;
      const lastIndex = itemsLength - 1;
      if (itemsLength <= 2) {
        isReversed.value = newVal < oldVal;
      } else if (newVal === lastIndex && oldVal === 0) {
        isReversed.value = true;
      } else if (newVal === 0 && oldVal === lastIndex) {
        isReversed.value = false;
      } else {
        isReversed.value = newVal < oldVal;
      }
    });
    provide(VWindowSymbol, {
      transition,
      isReversed,
      transitionCount,
      transitionHeight,
      rootRef
    });
    const canMoveBack = toRef(() => props.continuous || activeIndex.value !== 0);
    const canMoveForward = toRef(() => props.continuous || activeIndex.value !== group.items.value.length - 1);
    function prev() {
      canMoveBack.value && group.prev();
    }
    function next() {
      canMoveForward.value && group.next();
    }
    const arrows = computed(() => {
      const arrows2 = [];
      const prevProps = {
        icon: isRtl.value ? props.nextIcon : props.prevIcon,
        class: `v-window__${isRtlReverse.value ? "right" : "left"}`,
        onClick: group.prev,
        "aria-label": t("$vuetify.carousel.prev")
      };
      arrows2.push(canMoveBack.value ? slots.prev ? slots.prev({
        props: prevProps
      }) : createVNode(VBtn, prevProps, null) : createElementVNode("div", null, null));
      const nextProps = {
        icon: isRtl.value ? props.prevIcon : props.nextIcon,
        class: `v-window__${isRtlReverse.value ? "left" : "right"}`,
        onClick: group.next,
        "aria-label": t("$vuetify.carousel.next")
      };
      arrows2.push(canMoveForward.value ? slots.next ? slots.next({
        props: nextProps
      }) : createVNode(VBtn, nextProps, null) : createElementVNode("div", null, null));
      return arrows2;
    });
    const touchOptions = computed(() => {
      if (props.touch === false) return props.touch;
      const options = {
        left: () => {
          isRtlReverse.value ? prev() : next();
        },
        right: () => {
          isRtlReverse.value ? next() : prev();
        },
        start: (_ref2) => {
          let {
            originalEvent
          } = _ref2;
          originalEvent.stopPropagation();
        }
      };
      return {
        ...options,
        ...props.touch === true ? {} : props.touch
      };
    });
    useRender(() => withDirectives(createVNode(props.tag, {
      "ref": rootRef,
      "class": normalizeClass(["v-window", {
        "v-window--show-arrows-on-hover": props.showArrows === "hover",
        "v-window--vertical-arrows": !!props.verticalArrows
      }, themeClasses.value, props.class]),
      "style": normalizeStyle(props.style)
    }, {
      default: () => [createElementVNode("div", {
        "class": "v-window__container",
        "style": {
          height: transitionHeight.value
        }
      }, [slots.default?.({
        group
      }), props.showArrows !== false && createElementVNode("div", {
        "class": normalizeClass(["v-window__controls", {
          "v-window__controls--left": props.verticalArrows === "left" || props.verticalArrows === true
        }, {
          "v-window__controls--right": props.verticalArrows === "right"
        }])
      }, [arrows.value])]), slots.additional?.({
        group
      })]
    }), [[Touch, touchOptions.value]]));
    return {
      group
    };
  }
});
const makeVCarouselProps = propsFactory({
  color: String,
  cycle: Boolean,
  delimiterIcon: {
    type: IconValue,
    default: "$delimiter"
  },
  height: {
    type: [Number, String],
    default: 500
  },
  hideDelimiters: Boolean,
  hideDelimiterBackground: Boolean,
  interval: {
    type: [Number, String],
    default: 6e3,
    validator: (value) => Number(value) > 0
  },
  progress: [Boolean, String],
  verticalDelimiters: [Boolean, String],
  ...makeVWindowProps({
    continuous: true,
    mandatory: "force",
    showArrows: true
  })
}, "VCarousel");
const VCarousel = genericComponent()({
  name: "VCarousel",
  props: makeVCarouselProps(),
  emits: {
    "update:modelValue": (value) => true
  },
  setup(props, _ref) {
    let {
      slots
    } = _ref;
    const model = useProxiedModel(props, "modelValue");
    const {
      t
    } = useLocale();
    const windowRef = ref();
    let slideTimeout = -1;
    watch(model, restartTimeout);
    watch(() => props.interval, restartTimeout);
    watch(() => props.cycle, (val) => {
      if (val) restartTimeout();
      else (void 0).clearTimeout(slideTimeout);
    });
    function startTimeout() {
      if (!props.cycle || !windowRef.value) return;
      slideTimeout = (void 0).setTimeout(windowRef.value.group.next, Number(props.interval) > 0 ? Number(props.interval) : 6e3);
    }
    function restartTimeout() {
      (void 0).clearTimeout(slideTimeout);
      (void 0).requestAnimationFrame(startTimeout);
    }
    useRender(() => {
      const windowProps = VWindow.filterProps(props);
      return createVNode(VWindow, mergeProps({
        "ref": windowRef
      }, windowProps, {
        "modelValue": model.value,
        "onUpdate:modelValue": ($event) => model.value = $event,
        "class": ["v-carousel", {
          "v-carousel--hide-delimiter-background": props.hideDelimiterBackground,
          "v-carousel--vertical-delimiters": props.verticalDelimiters
        }, props.class],
        "style": [{
          height: convertToUnit(props.height)
        }, props.style]
      }), {
        default: slots.default,
        additional: (_ref2) => {
          let {
            group
          } = _ref2;
          return createElementVNode(Fragment, null, [!props.hideDelimiters && createElementVNode("div", {
            "class": "v-carousel__controls",
            "style": {
              left: props.verticalDelimiters === "left" && props.verticalDelimiters ? 0 : "auto",
              right: props.verticalDelimiters === "right" ? 0 : "auto"
            }
          }, [group.items.value.length > 0 && createVNode(VDefaultsProvider, {
            "defaults": {
              VBtn: {
                color: props.color,
                icon: props.delimiterIcon,
                size: "x-small",
                variant: "text"
              }
            },
            "scoped": true
          }, {
            default: () => [group.items.value.map((item, index) => {
              const props2 = {
                id: `carousel-item-${item.id}`,
                "aria-label": t("$vuetify.carousel.ariaLabel.delimiter", index + 1, group.items.value.length),
                class: ["v-carousel__controls__item", group.isSelected(item.id) && "v-btn--active"],
                onClick: () => group.select(item.id, true)
              };
              return slots.item ? slots.item({
                props: props2,
                item
              }) : createVNode(VBtn, mergeProps(item, props2), null);
            })]
          })]), props.progress && createVNode(VProgressLinear, {
            "absolute": true,
            "class": "v-carousel__progress",
            "color": typeof props.progress === "string" ? props.progress : void 0,
            "modelValue": (group.getItemIndex(model.value) + 1) / group.items.value.length * 100
          }, null)]);
        },
        prev: slots.prev,
        next: slots.next
      });
    });
    return {};
  }
});
const makeVWindowItemProps = propsFactory({
  reverseTransition: {
    type: [Boolean, String],
    default: void 0
  },
  transition: {
    type: [Boolean, String],
    default: void 0
  },
  ...makeComponentProps(),
  ...makeGroupItemProps(),
  ...makeLazyProps()
}, "VWindowItem");
const VWindowItem = genericComponent()({
  name: "VWindowItem",
  directives: {
    vTouch: Touch
  },
  props: makeVWindowItemProps(),
  emits: {
    "group:selected": (val) => true
  },
  setup(props, _ref) {
    let {
      slots
    } = _ref;
    const window = inject(VWindowSymbol);
    const groupItem = useGroupItem(props, VWindowGroupSymbol);
    const {
      isBooted
    } = useSsrBoot();
    if (!window || !groupItem) throw new Error("[Vuetify] VWindowItem must be used inside VWindow");
    const isTransitioning = shallowRef(false);
    const hasTransition = computed(() => isBooted.value && (window.isReversed.value ? props.reverseTransition !== false : props.transition !== false));
    function onAfterTransition() {
      if (!isTransitioning.value || !window) {
        return;
      }
      isTransitioning.value = false;
      if (window.transitionCount.value > 0) {
        window.transitionCount.value -= 1;
        if (window.transitionCount.value === 0) {
          window.transitionHeight.value = void 0;
        }
      }
    }
    function onBeforeTransition() {
      if (isTransitioning.value || !window) {
        return;
      }
      isTransitioning.value = true;
      if (window.transitionCount.value === 0) {
        window.transitionHeight.value = convertToUnit(window.rootRef.value?.clientHeight);
      }
      window.transitionCount.value += 1;
    }
    function onTransitionCancelled() {
      onAfterTransition();
    }
    function onEnterTransition(el) {
      if (!isTransitioning.value) {
        return;
      }
      nextTick(() => {
        if (!hasTransition.value || !isTransitioning.value || !window) {
          return;
        }
        window.transitionHeight.value = convertToUnit(el.clientHeight);
      });
    }
    const transition = computed(() => {
      const name = window.isReversed.value ? props.reverseTransition : props.transition;
      return !hasTransition.value ? false : {
        name: typeof name !== "string" ? window.transition.value : name,
        onBeforeEnter: onBeforeTransition,
        onAfterEnter: onAfterTransition,
        onEnterCancelled: onTransitionCancelled,
        onBeforeLeave: onBeforeTransition,
        onAfterLeave: onAfterTransition,
        onLeaveCancelled: onTransitionCancelled,
        onEnter: onEnterTransition
      };
    });
    const {
      hasContent
    } = useLazy(props, groupItem.isSelected);
    useRender(() => createVNode(MaybeTransition, {
      "transition": transition.value,
      "disabled": !isBooted.value
    }, {
      default: () => [withDirectives(createElementVNode("div", {
        "class": normalizeClass(["v-window-item", groupItem.selectedClass.value, props.class]),
        "style": normalizeStyle(props.style)
      }, [hasContent.value && slots.default?.()]), [[vShow, groupItem.isSelected.value]])]
    }));
    return {
      groupItem
    };
  }
});
const makeVCarouselItemProps = propsFactory({
  ...makeVImgProps(),
  ...makeVWindowItemProps()
}, "VCarouselItem");
const VCarouselItem = genericComponent()({
  name: "VCarouselItem",
  inheritAttrs: false,
  props: makeVCarouselItemProps(),
  setup(props, _ref) {
    let {
      slots,
      attrs
    } = _ref;
    useRender(() => {
      const imgProps = VImg.filterProps(props);
      const windowItemProps = VWindowItem.filterProps(props);
      return createVNode(VWindowItem, mergeProps({
        "class": ["v-carousel-item", props.class]
      }, windowItemProps), {
        default: () => [createVNode(VImg, mergeProps(attrs, imgProps), slots)]
      });
    });
  }
});
const _sfc_main = {
  __name: "index",
  __ssrInlineRender: true,
  setup(__props) {
    const snackbar = ref(false);
    const snackbarMessage = ref("");
    const detailDialog = ref(false);
    const selectedProduct = ref({});
    const openDetail = (product) => {
      selectedProduct.value = product;
      detailDialog.value = true;
    };
    const products = ref([
      {
        priceId: "price_1Rw0ALDN579DoqMWalh5iYnZ",
        id: 1,
        name: "ยาดมสมุนไพรแท้",
        price: 30,
        image: "/yadom1.png",
        description: `เป็นยาดมสมุนไพรสกัดจากธรรมชาติ 100%
กลิ่นหอมสดชื่น ช่วยให้รู้สึกกระปรี้กระเปร่าเมื่อต้องการความสดชื่นทันที
พกพาง่าย ใช้ได้ทุกที่ ทุกเวลา
เหมาะสำหรับผู้ที่ต้องการผ่อนคลาย หรือต้องการลดความง่วงระหว่างวัน`
      },
      {
        priceId: "price_1Rw0DQDN579DoqMWq04Y5niI",
        id: 2,
        name: "ยาดมมิ้นท์",
        price: 25,
        image: "/yadom2.png",
        description: "กลิ่นมิ้นท์เย็นสดชื่น ใช้ง่าย พกพาสะดวก"
      },
      {
        priceId: "price_1Rw0DkDN579DoqMWsRCa1Zwq",
        id: 3,
        name: "ยาดมตลับทอง",
        price: 35,
        image: "/yadom3.png",
        description: "ยาดมตลับทอง กลิ่นหอมเข้มข้น ใช้ได้ทุกเวลา"
      },
      {
        priceId: "price_1RwNM3DN579DoqMWxzQ3eZAa",
        id: 4,
        name: "ยาดมสมุนไพรแท้2",
        price: 30,
        image: "/yadom1.png",
        description: "ยาดมสมุนไพรสกัด 100% กลิ่นสดชื่น"
      },
      {
        priceId: "price_1RwNN5DN579DoqMWyrrdFbE6",
        id: 5,
        name: "ยาดมมิ้นท์2",
        price: 25,
        image: "/yadom2.png",
        description: "กลิ่นมิ้นท์เย็นสดชื่น"
      },
      {
        priceId: "price_1RwNODDN579DoqMWyKM4RDJ5",
        id: 6,
        name: "ยาดมตลับทอง2",
        price: 35,
        image: "/yadom3.png",
        description: "ยาดมตลับทอง กลิ่นหอมเข้มข้น"
      }
    ]);
    const slide = ref(0);
    const images = [
      "/slideshow1.png",
      "/slideshow2.png",
      "/slideshow3.png"
    ];
    const addToCart = (product) => {
      let cart = JSON.parse(localStorage.getItem("cart") || "[]");
      const index = cart.findIndex((item) => item.id === product.id);
      if (index !== -1) {
        cart[index].qty += 1;
      } else {
        cart.push({
          ...product,
          qty: 1,
          price: Number(product.price)
        });
      }
      localStorage.setItem("cart", JSON.stringify(cart));
      (void 0).dispatchEvent(new Event("cart-updated"));
      snackbarMessage.value = `✅ เพิ่ม ${product.name} ลงตะกร้าเรียบร้อย!`;
      snackbar.value = true;
    };
    return (_ctx, _push, _parent, _attrs) => {
      _push(`<!--[-->`);
      _push(ssrRenderComponent(VContainer, { class: "text-center mt-10" }, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(ssrRenderComponent(VImg, {
              src: "",
              "max-width": "200",
              class: "mx-auto"
            }, null, _parent2, _scopeId));
            _push2(`<h2 class="mt-4"${_scopeId}>ยาดมหอมสดชื่น พกง่าย สดชื่นได้ทุกที่!</h2>`);
            _push2(ssrRenderComponent(VBtn, {
              color: "green-darken-2",
              dark: "",
              class: "ma-2"
            }, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(`สั่งซื้อทันที`);
                } else {
                  return [
                    createTextVNode("สั่งซื้อทันที")
                  ];
                }
              }),
              _: 1
            }, _parent2, _scopeId));
            _push2(ssrRenderComponent(VBtn, {
              color: "teal-lighten-2",
              dark: "",
              class: "ma-2"
            }, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(`Customize`);
                } else {
                  return [
                    createTextVNode("Customize")
                  ];
                }
              }),
              _: 1
            }, _parent2, _scopeId));
            _push2(ssrRenderComponent(VBtn, {
              variant: "outlined",
              color: "green-darken-2",
              class: "ma-2"
            }, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(`ดูรายละเอียด`);
                } else {
                  return [
                    createTextVNode("ดูรายละเอียด")
                  ];
                }
              }),
              _: 1
            }, _parent2, _scopeId));
          } else {
            return [
              createVNode(VImg, {
                src: "",
                "max-width": "200",
                class: "mx-auto"
              }),
              createVNode("h2", { class: "mt-4" }, "ยาดมหอมสดชื่น พกง่าย สดชื่นได้ทุกที่!"),
              createVNode(VBtn, {
                color: "green-darken-2",
                dark: "",
                class: "ma-2"
              }, {
                default: withCtx(() => [
                  createTextVNode("สั่งซื้อทันที")
                ]),
                _: 1
              }),
              createVNode(VBtn, {
                color: "teal-lighten-2",
                dark: "",
                class: "ma-2"
              }, {
                default: withCtx(() => [
                  createTextVNode("Customize")
                ]),
                _: 1
              }),
              createVNode(VBtn, {
                variant: "outlined",
                color: "green-darken-2",
                class: "ma-2"
              }, {
                default: withCtx(() => [
                  createTextVNode("ดูรายละเอียด")
                ]),
                _: 1
              })
            ];
          }
        }),
        _: 1
      }, _parent));
      _push(ssrRenderComponent(VContainer, { class: "pa-4 mb-8" }, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(ssrRenderComponent(VCarousel, {
              modelValue: slide.value,
              "onUpdate:modelValue": ($event) => slide.value = $event,
              cycle: "",
              height: "300",
              "show-arrows": "",
              "show-arrows-on-hover": ""
            }, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(`<!--[-->`);
                  ssrRenderList(images, (item, i) => {
                    _push3(ssrRenderComponent(VCarouselItem, {
                      key: i,
                      value: i
                    }, {
                      default: withCtx((_3, _push4, _parent4, _scopeId3) => {
                        if (_push4) {
                          _push4(ssrRenderComponent(VImg, {
                            src: item,
                            class: "fill-height"
                          }, null, _parent4, _scopeId3));
                        } else {
                          return [
                            createVNode(VImg, {
                              src: item,
                              class: "fill-height"
                            }, null, 8, ["src"])
                          ];
                        }
                      }),
                      _: 2
                    }, _parent3, _scopeId2));
                  });
                  _push3(`<!--]-->`);
                } else {
                  return [
                    (openBlock(), createBlock(Fragment, null, renderList(images, (item, i) => {
                      return createVNode(VCarouselItem, {
                        key: i,
                        value: i
                      }, {
                        default: withCtx(() => [
                          createVNode(VImg, {
                            src: item,
                            class: "fill-height"
                          }, null, 8, ["src"])
                        ]),
                        _: 2
                      }, 1032, ["value"]);
                    }), 64))
                  ];
                }
              }),
              _: 1
            }, _parent2, _scopeId));
          } else {
            return [
              createVNode(VCarousel, {
                modelValue: slide.value,
                "onUpdate:modelValue": ($event) => slide.value = $event,
                cycle: "",
                height: "300",
                "show-arrows": "",
                "show-arrows-on-hover": ""
              }, {
                default: withCtx(() => [
                  (openBlock(), createBlock(Fragment, null, renderList(images, (item, i) => {
                    return createVNode(VCarouselItem, {
                      key: i,
                      value: i
                    }, {
                      default: withCtx(() => [
                        createVNode(VImg, {
                          src: item,
                          class: "fill-height"
                        }, null, 8, ["src"])
                      ]),
                      _: 2
                    }, 1032, ["value"]);
                  }), 64))
                ]),
                _: 1
              }, 8, ["modelValue", "onUpdate:modelValue"])
            ];
          }
        }),
        _: 1
      }, _parent));
      _push(ssrRenderComponent(VContainer, { class: "mt-8" }, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(ssrRenderComponent(VRow, null, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(`<!--[-->`);
                  ssrRenderList(products.value, (p, index) => {
                    _push3(ssrRenderComponent(VCol, {
                      key: index,
                      cols: "12",
                      sm: "4"
                    }, {
                      default: withCtx((_3, _push4, _parent4, _scopeId3) => {
                        if (_push4) {
                          _push4(ssrRenderComponent(VCard, null, {
                            default: withCtx((_4, _push5, _parent5, _scopeId4) => {
                              if (_push5) {
                                _push5(ssrRenderComponent(VImg, {
                                  src: p.image,
                                  height: "200px"
                                }, null, _parent5, _scopeId4));
                                _push5(ssrRenderComponent(VCardTitle, null, {
                                  default: withCtx((_5, _push6, _parent6, _scopeId5) => {
                                    if (_push6) {
                                      _push6(`${ssrInterpolate(p.name)}`);
                                    } else {
                                      return [
                                        createTextVNode(toDisplayString(p.name), 1)
                                      ];
                                    }
                                  }),
                                  _: 2
                                }, _parent5, _scopeId4));
                                _push5(ssrRenderComponent(VCardSubtitle, null, {
                                  default: withCtx((_5, _push6, _parent6, _scopeId5) => {
                                    if (_push6) {
                                      _push6(`฿${ssrInterpolate(p.price)}`);
                                    } else {
                                      return [
                                        createTextVNode("฿" + toDisplayString(p.price), 1)
                                      ];
                                    }
                                  }),
                                  _: 2
                                }, _parent5, _scopeId4));
                                _push5(ssrRenderComponent(VCardActions, null, {
                                  default: withCtx((_5, _push6, _parent6, _scopeId5) => {
                                    if (_push6) {
                                      _push6(ssrRenderComponent(VBtn, {
                                        color: "green-darken-2",
                                        dark: "",
                                        onClick: ($event) => addToCart(p)
                                      }, {
                                        default: withCtx((_6, _push7, _parent7, _scopeId6) => {
                                          if (_push7) {
                                            _push7(` ใส่ตะกร้า `);
                                          } else {
                                            return [
                                              createTextVNode(" ใส่ตะกร้า ")
                                            ];
                                          }
                                        }),
                                        _: 2
                                      }, _parent6, _scopeId5));
                                      _push6(ssrRenderComponent(VBtn, {
                                        color: "orange darken-2",
                                        dark: "",
                                        onClick: ($event) => openDetail(p)
                                      }, {
                                        default: withCtx((_6, _push7, _parent7, _scopeId6) => {
                                          if (_push7) {
                                            _push7(` รายละเอียด `);
                                          } else {
                                            return [
                                              createTextVNode(" รายละเอียด ")
                                            ];
                                          }
                                        }),
                                        _: 2
                                      }, _parent6, _scopeId5));
                                      _push6(ssrRenderComponent(VBtn, {
                                        color: "blue darken-2",
                                        dark: "",
                                        to: "/cart"
                                      }, {
                                        default: withCtx((_6, _push7, _parent7, _scopeId6) => {
                                          if (_push7) {
                                            _push7(` ไปที่ตะกร้า `);
                                          } else {
                                            return [
                                              createTextVNode(" ไปที่ตะกร้า ")
                                            ];
                                          }
                                        }),
                                        _: 2
                                      }, _parent6, _scopeId5));
                                    } else {
                                      return [
                                        createVNode(VBtn, {
                                          color: "green-darken-2",
                                          dark: "",
                                          onClick: ($event) => addToCart(p)
                                        }, {
                                          default: withCtx(() => [
                                            createTextVNode(" ใส่ตะกร้า ")
                                          ]),
                                          _: 2
                                        }, 1032, ["onClick"]),
                                        createVNode(VBtn, {
                                          color: "orange darken-2",
                                          dark: "",
                                          onClick: ($event) => openDetail(p)
                                        }, {
                                          default: withCtx(() => [
                                            createTextVNode(" รายละเอียด ")
                                          ]),
                                          _: 2
                                        }, 1032, ["onClick"]),
                                        createVNode(VBtn, {
                                          color: "blue darken-2",
                                          dark: "",
                                          to: "/cart"
                                        }, {
                                          default: withCtx(() => [
                                            createTextVNode(" ไปที่ตะกร้า ")
                                          ]),
                                          _: 1
                                        })
                                      ];
                                    }
                                  }),
                                  _: 2
                                }, _parent5, _scopeId4));
                              } else {
                                return [
                                  createVNode(VImg, {
                                    src: p.image,
                                    height: "200px"
                                  }, null, 8, ["src"]),
                                  createVNode(VCardTitle, null, {
                                    default: withCtx(() => [
                                      createTextVNode(toDisplayString(p.name), 1)
                                    ]),
                                    _: 2
                                  }, 1024),
                                  createVNode(VCardSubtitle, null, {
                                    default: withCtx(() => [
                                      createTextVNode("฿" + toDisplayString(p.price), 1)
                                    ]),
                                    _: 2
                                  }, 1024),
                                  createVNode(VCardActions, null, {
                                    default: withCtx(() => [
                                      createVNode(VBtn, {
                                        color: "green-darken-2",
                                        dark: "",
                                        onClick: ($event) => addToCart(p)
                                      }, {
                                        default: withCtx(() => [
                                          createTextVNode(" ใส่ตะกร้า ")
                                        ]),
                                        _: 2
                                      }, 1032, ["onClick"]),
                                      createVNode(VBtn, {
                                        color: "orange darken-2",
                                        dark: "",
                                        onClick: ($event) => openDetail(p)
                                      }, {
                                        default: withCtx(() => [
                                          createTextVNode(" รายละเอียด ")
                                        ]),
                                        _: 2
                                      }, 1032, ["onClick"]),
                                      createVNode(VBtn, {
                                        color: "blue darken-2",
                                        dark: "",
                                        to: "/cart"
                                      }, {
                                        default: withCtx(() => [
                                          createTextVNode(" ไปที่ตะกร้า ")
                                        ]),
                                        _: 1
                                      })
                                    ]),
                                    _: 2
                                  }, 1024)
                                ];
                              }
                            }),
                            _: 2
                          }, _parent4, _scopeId3));
                        } else {
                          return [
                            createVNode(VCard, null, {
                              default: withCtx(() => [
                                createVNode(VImg, {
                                  src: p.image,
                                  height: "200px"
                                }, null, 8, ["src"]),
                                createVNode(VCardTitle, null, {
                                  default: withCtx(() => [
                                    createTextVNode(toDisplayString(p.name), 1)
                                  ]),
                                  _: 2
                                }, 1024),
                                createVNode(VCardSubtitle, null, {
                                  default: withCtx(() => [
                                    createTextVNode("฿" + toDisplayString(p.price), 1)
                                  ]),
                                  _: 2
                                }, 1024),
                                createVNode(VCardActions, null, {
                                  default: withCtx(() => [
                                    createVNode(VBtn, {
                                      color: "green-darken-2",
                                      dark: "",
                                      onClick: ($event) => addToCart(p)
                                    }, {
                                      default: withCtx(() => [
                                        createTextVNode(" ใส่ตะกร้า ")
                                      ]),
                                      _: 2
                                    }, 1032, ["onClick"]),
                                    createVNode(VBtn, {
                                      color: "orange darken-2",
                                      dark: "",
                                      onClick: ($event) => openDetail(p)
                                    }, {
                                      default: withCtx(() => [
                                        createTextVNode(" รายละเอียด ")
                                      ]),
                                      _: 2
                                    }, 1032, ["onClick"]),
                                    createVNode(VBtn, {
                                      color: "blue darken-2",
                                      dark: "",
                                      to: "/cart"
                                    }, {
                                      default: withCtx(() => [
                                        createTextVNode(" ไปที่ตะกร้า ")
                                      ]),
                                      _: 1
                                    })
                                  ]),
                                  _: 2
                                }, 1024)
                              ]),
                              _: 2
                            }, 1024)
                          ];
                        }
                      }),
                      _: 2
                    }, _parent3, _scopeId2));
                  });
                  _push3(`<!--]-->`);
                } else {
                  return [
                    (openBlock(true), createBlock(Fragment, null, renderList(products.value, (p, index) => {
                      return openBlock(), createBlock(VCol, {
                        key: index,
                        cols: "12",
                        sm: "4"
                      }, {
                        default: withCtx(() => [
                          createVNode(VCard, null, {
                            default: withCtx(() => [
                              createVNode(VImg, {
                                src: p.image,
                                height: "200px"
                              }, null, 8, ["src"]),
                              createVNode(VCardTitle, null, {
                                default: withCtx(() => [
                                  createTextVNode(toDisplayString(p.name), 1)
                                ]),
                                _: 2
                              }, 1024),
                              createVNode(VCardSubtitle, null, {
                                default: withCtx(() => [
                                  createTextVNode("฿" + toDisplayString(p.price), 1)
                                ]),
                                _: 2
                              }, 1024),
                              createVNode(VCardActions, null, {
                                default: withCtx(() => [
                                  createVNode(VBtn, {
                                    color: "green-darken-2",
                                    dark: "",
                                    onClick: ($event) => addToCart(p)
                                  }, {
                                    default: withCtx(() => [
                                      createTextVNode(" ใส่ตะกร้า ")
                                    ]),
                                    _: 2
                                  }, 1032, ["onClick"]),
                                  createVNode(VBtn, {
                                    color: "orange darken-2",
                                    dark: "",
                                    onClick: ($event) => openDetail(p)
                                  }, {
                                    default: withCtx(() => [
                                      createTextVNode(" รายละเอียด ")
                                    ]),
                                    _: 2
                                  }, 1032, ["onClick"]),
                                  createVNode(VBtn, {
                                    color: "blue darken-2",
                                    dark: "",
                                    to: "/cart"
                                  }, {
                                    default: withCtx(() => [
                                      createTextVNode(" ไปที่ตะกร้า ")
                                    ]),
                                    _: 1
                                  })
                                ]),
                                _: 2
                              }, 1024)
                            ]),
                            _: 2
                          }, 1024)
                        ]),
                        _: 2
                      }, 1024);
                    }), 128))
                  ];
                }
              }),
              _: 1
            }, _parent2, _scopeId));
          } else {
            return [
              createVNode(VRow, null, {
                default: withCtx(() => [
                  (openBlock(true), createBlock(Fragment, null, renderList(products.value, (p, index) => {
                    return openBlock(), createBlock(VCol, {
                      key: index,
                      cols: "12",
                      sm: "4"
                    }, {
                      default: withCtx(() => [
                        createVNode(VCard, null, {
                          default: withCtx(() => [
                            createVNode(VImg, {
                              src: p.image,
                              height: "200px"
                            }, null, 8, ["src"]),
                            createVNode(VCardTitle, null, {
                              default: withCtx(() => [
                                createTextVNode(toDisplayString(p.name), 1)
                              ]),
                              _: 2
                            }, 1024),
                            createVNode(VCardSubtitle, null, {
                              default: withCtx(() => [
                                createTextVNode("฿" + toDisplayString(p.price), 1)
                              ]),
                              _: 2
                            }, 1024),
                            createVNode(VCardActions, null, {
                              default: withCtx(() => [
                                createVNode(VBtn, {
                                  color: "green-darken-2",
                                  dark: "",
                                  onClick: ($event) => addToCart(p)
                                }, {
                                  default: withCtx(() => [
                                    createTextVNode(" ใส่ตะกร้า ")
                                  ]),
                                  _: 2
                                }, 1032, ["onClick"]),
                                createVNode(VBtn, {
                                  color: "orange darken-2",
                                  dark: "",
                                  onClick: ($event) => openDetail(p)
                                }, {
                                  default: withCtx(() => [
                                    createTextVNode(" รายละเอียด ")
                                  ]),
                                  _: 2
                                }, 1032, ["onClick"]),
                                createVNode(VBtn, {
                                  color: "blue darken-2",
                                  dark: "",
                                  to: "/cart"
                                }, {
                                  default: withCtx(() => [
                                    createTextVNode(" ไปที่ตะกร้า ")
                                  ]),
                                  _: 1
                                })
                              ]),
                              _: 2
                            }, 1024)
                          ]),
                          _: 2
                        }, 1024)
                      ]),
                      _: 2
                    }, 1024);
                  }), 128))
                ]),
                _: 1
              })
            ];
          }
        }),
        _: 1
      }, _parent));
      _push(ssrRenderComponent(VDialog, {
        modelValue: detailDialog.value,
        "onUpdate:modelValue": ($event) => detailDialog.value = $event,
        "max-width": "500"
      }, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(ssrRenderComponent(VCard, null, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(ssrRenderComponent(VCardTitle, { class: "text-h6" }, {
                    default: withCtx((_3, _push4, _parent4, _scopeId3) => {
                      if (_push4) {
                        _push4(`${ssrInterpolate(selectedProduct.value.name)}`);
                      } else {
                        return [
                          createTextVNode(toDisplayString(selectedProduct.value.name), 1)
                        ];
                      }
                    }),
                    _: 1
                  }, _parent3, _scopeId2));
                  _push3(ssrRenderComponent(VCardText, null, {
                    default: withCtx((_3, _push4, _parent4, _scopeId3) => {
                      if (_push4) {
                        _push4(ssrRenderComponent(VImg, {
                          src: selectedProduct.value.image,
                          "max-height": "200",
                          class: "mb-3"
                        }, null, _parent4, _scopeId3));
                        _push4(`<div${_scopeId3}>${ssrInterpolate(selectedProduct.value.description)}</div>`);
                      } else {
                        return [
                          createVNode(VImg, {
                            src: selectedProduct.value.image,
                            "max-height": "200",
                            class: "mb-3"
                          }, null, 8, ["src"]),
                          createVNode("div", null, toDisplayString(selectedProduct.value.description), 1)
                        ];
                      }
                    }),
                    _: 1
                  }, _parent3, _scopeId2));
                  _push3(ssrRenderComponent(VCardActions, null, {
                    default: withCtx((_3, _push4, _parent4, _scopeId3) => {
                      if (_push4) {
                        _push4(ssrRenderComponent(VSpacer, null, null, _parent4, _scopeId3));
                        _push4(ssrRenderComponent(VBtn, {
                          color: "green darken-2",
                          text: "",
                          onClick: ($event) => detailDialog.value = false
                        }, {
                          default: withCtx((_4, _push5, _parent5, _scopeId4) => {
                            if (_push5) {
                              _push5(`ปิด`);
                            } else {
                              return [
                                createTextVNode("ปิด")
                              ];
                            }
                          }),
                          _: 1
                        }, _parent4, _scopeId3));
                      } else {
                        return [
                          createVNode(VSpacer),
                          createVNode(VBtn, {
                            color: "green darken-2",
                            text: "",
                            onClick: ($event) => detailDialog.value = false
                          }, {
                            default: withCtx(() => [
                              createTextVNode("ปิด")
                            ]),
                            _: 1
                          }, 8, ["onClick"])
                        ];
                      }
                    }),
                    _: 1
                  }, _parent3, _scopeId2));
                } else {
                  return [
                    createVNode(VCardTitle, { class: "text-h6" }, {
                      default: withCtx(() => [
                        createTextVNode(toDisplayString(selectedProduct.value.name), 1)
                      ]),
                      _: 1
                    }),
                    createVNode(VCardText, null, {
                      default: withCtx(() => [
                        createVNode(VImg, {
                          src: selectedProduct.value.image,
                          "max-height": "200",
                          class: "mb-3"
                        }, null, 8, ["src"]),
                        createVNode("div", null, toDisplayString(selectedProduct.value.description), 1)
                      ]),
                      _: 1
                    }),
                    createVNode(VCardActions, null, {
                      default: withCtx(() => [
                        createVNode(VSpacer),
                        createVNode(VBtn, {
                          color: "green darken-2",
                          text: "",
                          onClick: ($event) => detailDialog.value = false
                        }, {
                          default: withCtx(() => [
                            createTextVNode("ปิด")
                          ]),
                          _: 1
                        }, 8, ["onClick"])
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
              createVNode(VCard, null, {
                default: withCtx(() => [
                  createVNode(VCardTitle, { class: "text-h6" }, {
                    default: withCtx(() => [
                      createTextVNode(toDisplayString(selectedProduct.value.name), 1)
                    ]),
                    _: 1
                  }),
                  createVNode(VCardText, null, {
                    default: withCtx(() => [
                      createVNode(VImg, {
                        src: selectedProduct.value.image,
                        "max-height": "200",
                        class: "mb-3"
                      }, null, 8, ["src"]),
                      createVNode("div", null, toDisplayString(selectedProduct.value.description), 1)
                    ]),
                    _: 1
                  }),
                  createVNode(VCardActions, null, {
                    default: withCtx(() => [
                      createVNode(VSpacer),
                      createVNode(VBtn, {
                        color: "green darken-2",
                        text: "",
                        onClick: ($event) => detailDialog.value = false
                      }, {
                        default: withCtx(() => [
                          createTextVNode("ปิด")
                        ]),
                        _: 1
                      }, 8, ["onClick"])
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
      _push(ssrRenderComponent(VSnackbar, {
        modelValue: snackbar.value,
        "onUpdate:modelValue": ($event) => snackbar.value = $event,
        timeout: "2500",
        color: "green darken-2",
        top: "",
        elevation: "8",
        shaped: "",
        "multi-line": ""
      }, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(`<span class="text-h6 white--text font-weight-bold"${_scopeId}>${ssrInterpolate(snackbarMessage.value)}</span>`);
          } else {
            return [
              createVNode("span", { class: "text-h6 white--text font-weight-bold" }, toDisplayString(snackbarMessage.value), 1)
            ];
          }
        }),
        _: 1
      }, _parent));
      _push(`<!--]-->`);
    };
  }
};
const _sfc_setup = _sfc_main.setup;
_sfc_main.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("pages/index.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};

export { _sfc_main as default };
//# sourceMappingURL=index-_wSlDz4l.mjs.map
