import { defineComponent, reactive, mergeProps, withCtx, createTextVNode, createVNode, toDisplayString, createBlock, openBlock, Fragment, renderList, computed, shallowRef, useId, normalizeStyle, normalizeClass, createElementVNode, useSSRContext } from 'vue';
import { ssrRenderComponent, ssrRenderList, ssrInterpolate, ssrRenderStyle } from 'vue/server-renderer';
import { V as VContainer, a as VRow, b as VCard, g as VAvatar } from './VRow-BvYQNWX6.mjs';
import { b as VBtn, V as VCol, a as VImg, E as makeSizeProps, i as makeDensityProps } from './VCol-DYd6kilI.mjs';
import { g as genericComponent, p as propsFactory, f as useLocale, k as provideTheme, j as useProxiedModel, A as clamp, S as createRange, d as useRender, e as makeThemeProps, C as makeTagProps, m as makeComponentProps, I as IconValue } from './server.mjs';
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

const makeVRatingProps = propsFactory({
  name: String,
  itemAriaLabel: {
    type: String,
    default: "$vuetify.rating.ariaLabel.item"
  },
  activeColor: String,
  color: String,
  clearable: Boolean,
  disabled: Boolean,
  emptyIcon: {
    type: IconValue,
    default: "$ratingEmpty"
  },
  fullIcon: {
    type: IconValue,
    default: "$ratingFull"
  },
  halfIncrements: Boolean,
  hover: Boolean,
  length: {
    type: [Number, String],
    default: 5
  },
  readonly: Boolean,
  modelValue: {
    type: [Number, String],
    default: 0
  },
  itemLabels: Array,
  itemLabelPosition: {
    type: String,
    default: "top",
    validator: (v) => ["top", "bottom"].includes(v)
  },
  ripple: Boolean,
  ...makeComponentProps(),
  ...makeDensityProps(),
  ...makeSizeProps(),
  ...makeTagProps(),
  ...makeThemeProps()
}, "VRating");
const VRating = genericComponent()({
  name: "VRating",
  props: makeVRatingProps(),
  emits: {
    "update:modelValue": (value) => true
  },
  setup(props, _ref) {
    let {
      slots
    } = _ref;
    const {
      t
    } = useLocale();
    const {
      themeClasses
    } = provideTheme(props);
    const rating = useProxiedModel(props, "modelValue");
    const normalizedValue = computed(() => clamp(parseFloat(rating.value), 0, Number(props.length)));
    const range = computed(() => createRange(Number(props.length), 1));
    const increments = computed(() => range.value.flatMap((v) => props.halfIncrements ? [v - 0.5, v] : [v]));
    const hoverIndex = shallowRef(-1);
    const itemState = computed(() => increments.value.map((value) => {
      const isHovering = props.hover && hoverIndex.value > -1;
      const isFilled = normalizedValue.value >= value;
      const isHovered = hoverIndex.value >= value;
      const isFullIcon = isHovering ? isHovered : isFilled;
      const icon = isFullIcon ? props.fullIcon : props.emptyIcon;
      const activeColor = props.activeColor ?? props.color;
      const color = isFilled || isHovered ? activeColor : props.color;
      return {
        isFilled,
        isHovered,
        icon,
        color
      };
    }));
    const eventState = computed(() => [0, ...increments.value].map((value) => {
      function onMouseenter() {
        hoverIndex.value = value;
      }
      function onMouseleave() {
        hoverIndex.value = -1;
      }
      function onClick() {
        if (props.disabled || props.readonly) return;
        rating.value = normalizedValue.value === value && props.clearable ? 0 : value;
      }
      return {
        onMouseenter: props.hover ? onMouseenter : void 0,
        onMouseleave: props.hover ? onMouseleave : void 0,
        onClick
      };
    }));
    const uid = useId();
    const name = computed(() => props.name ?? `v-rating-${uid}`);
    function VRatingItem(_ref2) {
      let {
        value,
        index,
        showStar = true
      } = _ref2;
      const {
        onMouseenter,
        onMouseleave,
        onClick
      } = eventState.value[index + 1];
      const id = `${name.value}-${String(value).replace(".", "-")}`;
      const btnProps = {
        color: itemState.value[index]?.color,
        density: props.density,
        disabled: props.disabled,
        icon: itemState.value[index]?.icon,
        ripple: props.ripple,
        size: props.size,
        variant: "plain"
      };
      return createElementVNode(Fragment, null, [createElementVNode("label", {
        "for": id,
        "class": normalizeClass({
          "v-rating__item--half": props.halfIncrements && value % 1 > 0,
          "v-rating__item--full": props.halfIncrements && value % 1 === 0
        }),
        "onMouseenter": onMouseenter,
        "onMouseleave": onMouseleave,
        "onClick": onClick
      }, [createElementVNode("span", {
        "class": "v-rating__hidden"
      }, [t(props.itemAriaLabel, value, props.length)]), !showStar ? void 0 : slots.item ? slots.item({
        ...itemState.value[index],
        props: btnProps,
        value,
        index,
        rating: normalizedValue.value
      }) : createVNode(VBtn, mergeProps({
        "aria-label": t(props.itemAriaLabel, value, props.length)
      }, btnProps), null)]), createElementVNode("input", {
        "class": "v-rating__hidden",
        "name": name.value,
        "id": id,
        "type": "radio",
        "value": value,
        "checked": normalizedValue.value === value,
        "tabindex": -1,
        "readonly": props.readonly,
        "disabled": props.disabled
      }, null)]);
    }
    function createLabel(labelProps) {
      if (slots["item-label"]) return slots["item-label"](labelProps);
      if (labelProps.label) return createElementVNode("span", null, [labelProps.label]);
      return createElementVNode("span", null, [createTextVNode(" ")]);
    }
    useRender(() => {
      const hasLabels = !!props.itemLabels?.length || slots["item-label"];
      return createVNode(props.tag, {
        "class": normalizeClass(["v-rating", {
          "v-rating--hover": props.hover,
          "v-rating--readonly": props.readonly
        }, themeClasses.value, props.class]),
        "style": normalizeStyle(props.style)
      }, {
        default: () => [createVNode(VRatingItem, {
          "value": 0,
          "index": -1,
          "showStar": false
        }, null), range.value.map((value, i) => createElementVNode("div", {
          "class": "v-rating__wrapper"
        }, [hasLabels && props.itemLabelPosition === "top" ? createLabel({
          value,
          index: i,
          label: props.itemLabels?.[i]
        }) : void 0, createElementVNode("div", {
          "class": "v-rating__item"
        }, [props.halfIncrements ? createElementVNode(Fragment, null, [createVNode(VRatingItem, {
          "value": value - 0.5,
          "index": i * 2
        }, null), createVNode(VRatingItem, {
          "value": value,
          "index": i * 2 + 1
        }, null)]) : createVNode(VRatingItem, {
          "value": value,
          "index": i
        }, null)]), hasLabels && props.itemLabelPosition === "bottom" ? createLabel({
          value,
          index: i,
          label: props.itemLabels?.[i]
        }) : void 0]))]
      });
    });
    return {};
  }
});
const _sfc_main = /* @__PURE__ */ defineComponent({
  __name: "review",
  __ssrInlineRender: true,
  setup(__props) {
    const reviews = reactive([
      { name: "สมชาย", avatar: "/avatar1.png", rating: 5, comment: "ยาดมหอมสดชื่นมาก พกง่ายสุด!", product: "ยาดมสมุนไพรแท้", date: "12 ส.ค. 2025", likes: 12, location: "กรุงเทพฯ" },
      { name: "สมหญิง", avatar: "/avatar2.png", rating: 4, comment: "ชอบกลิ่นมิ้นท์ สดชื่นดีค่ะ", product: "ยาดมมิ้นท์", date: "10 ส.ค. 2025", likes: 8, location: "ชลบุรี" },
      { name: "มานพ", avatar: "/avatar3.png", rating: 5, comment: "ตลับทองพรีเมียม คุณภาพดีมาก!", product: "ยาดมตลับทอง", date: "8 ส.ค. 2025", likes: 15, location: "เชียงใหม่" },
      { name: "ธนกร", avatar: "/avatar4.png", rating: 4, comment: "ราคาสมเหตุสมผล ใช้งานดี", product: "ยาดมสมุนไพรแท้", date: "7 ส.ค. 2025", likes: 5, location: "นครราชสีมา" },
      { name: "ปวีณา", avatar: "/avatar5.png", rating: 5, comment: "กลิ่นสดชื่นมาก ชอบสุดๆ", product: "ยาดมมิ้นท์", date: "5 ส.ค. 2025", likes: 9, location: "ภูเก็ต" },
      { name: "เอกชัย", avatar: "/avatar6.png", rating: 3, comment: "โอเค แต่หวังว่าจะมีกลิ่นใหม่ๆ", product: "ยาดมตลับทอง", date: "3 ส.ค. 2025", likes: 3, location: "สงขลา" },
      { name: "จุฑามาศ", avatar: "/avatar7.png", rating: 4, comment: "กลิ่นหอม แต่ขนาดพกพาเล็กไปนิด", product: "ยาดมสมุนไพรแท้", date: "2 ส.ค. 2025", likes: 7, location: "นนทบุรี" },
      { name: "วรพล", avatar: "/avatar8.png", rating: 5, comment: "คุณภาพดี ใช้งานง่าย", product: "ยาดมมิ้นท์", date: "1 ส.ค. 2025", likes: 10, location: "เชียงราย" },
      { name: "สุมิตรา", avatar: "/avatar9.png", rating: 4, comment: "ชอบมากค่ะ ซื้อซ้ำแน่นอน", product: "ยาดมตลับทอง", date: "31 ก.ค. 2025", likes: 6, location: "ขอนแก่น" }
    ]);
    return (_ctx, _push, _parent, _attrs) => {
      _push(ssrRenderComponent(VContainer, mergeProps({
        fluid: "",
        class: "pa-0",
        style: { "background": "linear-gradient(135deg, #d4edda, #c8f7c5)", "min-height": "100vh" }
      }, _attrs), {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(ssrRenderComponent(VContainer, { class: "text-center py-12" }, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(`<h1 class="text-h2 font-bold mb-3"${_scopeId2}>รีวิวจากลูกค้า YaDom</h1><p class="text-subtitle-1 mb-6"${_scopeId2}>ลูกค้าของเราพูดถึงความสดชื่นและคุณภาพของยาดม</p>`);
                  _push3(ssrRenderComponent(VBtn, {
                    color: "green-darken-2",
                    dark: "",
                    class: "mx-2",
                    to: "/"
                  }, {
                    default: withCtx((_3, _push4, _parent4, _scopeId3) => {
                      if (_push4) {
                        _push4(`กลับหน้าหลัก`);
                      } else {
                        return [
                          createTextVNode("กลับหน้าหลัก")
                        ];
                      }
                    }),
                    _: 1
                  }, _parent3, _scopeId2));
                  _push3(ssrRenderComponent(VBtn, {
                    color: "teal-lighten-2",
                    dark: "",
                    class: "mx-2",
                    to: "/products"
                  }, {
                    default: withCtx((_3, _push4, _parent4, _scopeId3) => {
                      if (_push4) {
                        _push4(`ไปหน้าสินค้า`);
                      } else {
                        return [
                          createTextVNode("ไปหน้าสินค้า")
                        ];
                      }
                    }),
                    _: 1
                  }, _parent3, _scopeId2));
                } else {
                  return [
                    createVNode("h1", { class: "text-h2 font-bold mb-3" }, "รีวิวจากลูกค้า YaDom"),
                    createVNode("p", { class: "text-subtitle-1 mb-6" }, "ลูกค้าของเราพูดถึงความสดชื่นและคุณภาพของยาดม"),
                    createVNode(VBtn, {
                      color: "green-darken-2",
                      dark: "",
                      class: "mx-2",
                      to: "/"
                    }, {
                      default: withCtx(() => [
                        createTextVNode("กลับหน้าหลัก")
                      ]),
                      _: 1
                    }),
                    createVNode(VBtn, {
                      color: "teal-lighten-2",
                      dark: "",
                      class: "mx-2",
                      to: "/products"
                    }, {
                      default: withCtx(() => [
                        createTextVNode("ไปหน้าสินค้า")
                      ]),
                      _: 1
                    })
                  ];
                }
              }),
              _: 1
            }, _parent2, _scopeId));
            _push2(ssrRenderComponent(VContainer, { class: "pb-12" }, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(ssrRenderComponent(VRow, { dense: "" }, {
                    default: withCtx((_3, _push4, _parent4, _scopeId3) => {
                      if (_push4) {
                        _push4(`<!--[-->`);
                        ssrRenderList(reviews, (review, index) => {
                          _push4(ssrRenderComponent(VCol, {
                            key: index,
                            cols: "12",
                            sm: "6",
                            md: "4"
                          }, {
                            default: withCtx((_4, _push5, _parent5, _scopeId4) => {
                              if (_push5) {
                                _push5(ssrRenderComponent(VCard, {
                                  class: "pa-4 elevation-6",
                                  style: { "border-radius": "16px", "background": "rgba(255,255,255,0.9)" }
                                }, {
                                  default: withCtx((_5, _push6, _parent6, _scopeId5) => {
                                    if (_push6) {
                                      _push6(ssrRenderComponent(VRow, {
                                        align: "center",
                                        class: "mb-3"
                                      }, {
                                        default: withCtx((_6, _push7, _parent7, _scopeId6) => {
                                          if (_push7) {
                                            _push7(ssrRenderComponent(VAvatar, {
                                              size: "56",
                                              class: "mr-3"
                                            }, {
                                              default: withCtx((_7, _push8, _parent8, _scopeId7) => {
                                                if (_push8) {
                                                  _push8(ssrRenderComponent(VImg, {
                                                    src: review.avatar
                                                  }, null, _parent8, _scopeId7));
                                                } else {
                                                  return [
                                                    createVNode(VImg, {
                                                      src: review.avatar
                                                    }, null, 8, ["src"])
                                                  ];
                                                }
                                              }),
                                              _: 2
                                            }, _parent7, _scopeId6));
                                            _push7(`<div${_scopeId6}><div class="text-subtitle-1 font-medium"${_scopeId6}>${ssrInterpolate(review.name)} <span class="text-caption grey--text"${_scopeId6}>(${ssrInterpolate(review.location)})</span></div>`);
                                            _push7(ssrRenderComponent(VRating, {
                                              modelValue: review.rating,
                                              "onUpdate:modelValue": ($event) => review.rating = $event,
                                              dense: "",
                                              color: "amber",
                                              readonly: "",
                                              "background-color": "grey lighten-2",
                                              size: "18"
                                            }, null, _parent7, _scopeId6));
                                            _push7(`<div class="text-caption grey--text"${_scopeId6}>${ssrInterpolate(review.date)}</div></div>`);
                                          } else {
                                            return [
                                              createVNode(VAvatar, {
                                                size: "56",
                                                class: "mr-3"
                                              }, {
                                                default: withCtx(() => [
                                                  createVNode(VImg, {
                                                    src: review.avatar
                                                  }, null, 8, ["src"])
                                                ]),
                                                _: 2
                                              }, 1024),
                                              createVNode("div", null, [
                                                createVNode("div", { class: "text-subtitle-1 font-medium" }, [
                                                  createTextVNode(toDisplayString(review.name) + " ", 1),
                                                  createVNode("span", { class: "text-caption grey--text" }, "(" + toDisplayString(review.location) + ")", 1)
                                                ]),
                                                createVNode(VRating, {
                                                  modelValue: review.rating,
                                                  "onUpdate:modelValue": ($event) => review.rating = $event,
                                                  dense: "",
                                                  color: "amber",
                                                  readonly: "",
                                                  "background-color": "grey lighten-2",
                                                  size: "18"
                                                }, null, 8, ["modelValue", "onUpdate:modelValue"]),
                                                createVNode("div", { class: "text-caption grey--text" }, toDisplayString(review.date), 1)
                                              ])
                                            ];
                                          }
                                        }),
                                        _: 2
                                      }, _parent6, _scopeId5));
                                      _push6(`<p class="text-body-2 mb-2" style="${ssrRenderStyle({ "font-style": "italic" })}"${_scopeId5}>&quot;${ssrInterpolate(review.comment)}&quot;</p><div class="text-caption mb-2 font-medium"${_scopeId5}>สินค้าที่รีวิว: ${ssrInterpolate(review.product)}</div>`);
                                    } else {
                                      return [
                                        createVNode(VRow, {
                                          align: "center",
                                          class: "mb-3"
                                        }, {
                                          default: withCtx(() => [
                                            createVNode(VAvatar, {
                                              size: "56",
                                              class: "mr-3"
                                            }, {
                                              default: withCtx(() => [
                                                createVNode(VImg, {
                                                  src: review.avatar
                                                }, null, 8, ["src"])
                                              ]),
                                              _: 2
                                            }, 1024),
                                            createVNode("div", null, [
                                              createVNode("div", { class: "text-subtitle-1 font-medium" }, [
                                                createTextVNode(toDisplayString(review.name) + " ", 1),
                                                createVNode("span", { class: "text-caption grey--text" }, "(" + toDisplayString(review.location) + ")", 1)
                                              ]),
                                              createVNode(VRating, {
                                                modelValue: review.rating,
                                                "onUpdate:modelValue": ($event) => review.rating = $event,
                                                dense: "",
                                                color: "amber",
                                                readonly: "",
                                                "background-color": "grey lighten-2",
                                                size: "18"
                                              }, null, 8, ["modelValue", "onUpdate:modelValue"]),
                                              createVNode("div", { class: "text-caption grey--text" }, toDisplayString(review.date), 1)
                                            ])
                                          ]),
                                          _: 2
                                        }, 1024),
                                        createVNode("p", {
                                          class: "text-body-2 mb-2",
                                          style: { "font-style": "italic" }
                                        }, '"' + toDisplayString(review.comment) + '"', 1),
                                        createVNode("div", { class: "text-caption mb-2 font-medium" }, "สินค้าที่รีวิว: " + toDisplayString(review.product), 1)
                                      ];
                                    }
                                  }),
                                  _: 2
                                }, _parent5, _scopeId4));
                              } else {
                                return [
                                  createVNode(VCard, {
                                    class: "pa-4 elevation-6",
                                    style: { "border-radius": "16px", "background": "rgba(255,255,255,0.9)" }
                                  }, {
                                    default: withCtx(() => [
                                      createVNode(VRow, {
                                        align: "center",
                                        class: "mb-3"
                                      }, {
                                        default: withCtx(() => [
                                          createVNode(VAvatar, {
                                            size: "56",
                                            class: "mr-3"
                                          }, {
                                            default: withCtx(() => [
                                              createVNode(VImg, {
                                                src: review.avatar
                                              }, null, 8, ["src"])
                                            ]),
                                            _: 2
                                          }, 1024),
                                          createVNode("div", null, [
                                            createVNode("div", { class: "text-subtitle-1 font-medium" }, [
                                              createTextVNode(toDisplayString(review.name) + " ", 1),
                                              createVNode("span", { class: "text-caption grey--text" }, "(" + toDisplayString(review.location) + ")", 1)
                                            ]),
                                            createVNode(VRating, {
                                              modelValue: review.rating,
                                              "onUpdate:modelValue": ($event) => review.rating = $event,
                                              dense: "",
                                              color: "amber",
                                              readonly: "",
                                              "background-color": "grey lighten-2",
                                              size: "18"
                                            }, null, 8, ["modelValue", "onUpdate:modelValue"]),
                                            createVNode("div", { class: "text-caption grey--text" }, toDisplayString(review.date), 1)
                                          ])
                                        ]),
                                        _: 2
                                      }, 1024),
                                      createVNode("p", {
                                        class: "text-body-2 mb-2",
                                        style: { "font-style": "italic" }
                                      }, '"' + toDisplayString(review.comment) + '"', 1),
                                      createVNode("div", { class: "text-caption mb-2 font-medium" }, "สินค้าที่รีวิว: " + toDisplayString(review.product), 1)
                                    ]),
                                    _: 2
                                  }, 1024)
                                ];
                              }
                            }),
                            _: 2
                          }, _parent4, _scopeId3));
                        });
                        _push4(`<!--]-->`);
                      } else {
                        return [
                          (openBlock(true), createBlock(Fragment, null, renderList(reviews, (review, index) => {
                            return openBlock(), createBlock(VCol, {
                              key: index,
                              cols: "12",
                              sm: "6",
                              md: "4"
                            }, {
                              default: withCtx(() => [
                                createVNode(VCard, {
                                  class: "pa-4 elevation-6",
                                  style: { "border-radius": "16px", "background": "rgba(255,255,255,0.9)" }
                                }, {
                                  default: withCtx(() => [
                                    createVNode(VRow, {
                                      align: "center",
                                      class: "mb-3"
                                    }, {
                                      default: withCtx(() => [
                                        createVNode(VAvatar, {
                                          size: "56",
                                          class: "mr-3"
                                        }, {
                                          default: withCtx(() => [
                                            createVNode(VImg, {
                                              src: review.avatar
                                            }, null, 8, ["src"])
                                          ]),
                                          _: 2
                                        }, 1024),
                                        createVNode("div", null, [
                                          createVNode("div", { class: "text-subtitle-1 font-medium" }, [
                                            createTextVNode(toDisplayString(review.name) + " ", 1),
                                            createVNode("span", { class: "text-caption grey--text" }, "(" + toDisplayString(review.location) + ")", 1)
                                          ]),
                                          createVNode(VRating, {
                                            modelValue: review.rating,
                                            "onUpdate:modelValue": ($event) => review.rating = $event,
                                            dense: "",
                                            color: "amber",
                                            readonly: "",
                                            "background-color": "grey lighten-2",
                                            size: "18"
                                          }, null, 8, ["modelValue", "onUpdate:modelValue"]),
                                          createVNode("div", { class: "text-caption grey--text" }, toDisplayString(review.date), 1)
                                        ])
                                      ]),
                                      _: 2
                                    }, 1024),
                                    createVNode("p", {
                                      class: "text-body-2 mb-2",
                                      style: { "font-style": "italic" }
                                    }, '"' + toDisplayString(review.comment) + '"', 1),
                                    createVNode("div", { class: "text-caption mb-2 font-medium" }, "สินค้าที่รีวิว: " + toDisplayString(review.product), 1)
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
                  }, _parent3, _scopeId2));
                } else {
                  return [
                    createVNode(VRow, { dense: "" }, {
                      default: withCtx(() => [
                        (openBlock(true), createBlock(Fragment, null, renderList(reviews, (review, index) => {
                          return openBlock(), createBlock(VCol, {
                            key: index,
                            cols: "12",
                            sm: "6",
                            md: "4"
                          }, {
                            default: withCtx(() => [
                              createVNode(VCard, {
                                class: "pa-4 elevation-6",
                                style: { "border-radius": "16px", "background": "rgba(255,255,255,0.9)" }
                              }, {
                                default: withCtx(() => [
                                  createVNode(VRow, {
                                    align: "center",
                                    class: "mb-3"
                                  }, {
                                    default: withCtx(() => [
                                      createVNode(VAvatar, {
                                        size: "56",
                                        class: "mr-3"
                                      }, {
                                        default: withCtx(() => [
                                          createVNode(VImg, {
                                            src: review.avatar
                                          }, null, 8, ["src"])
                                        ]),
                                        _: 2
                                      }, 1024),
                                      createVNode("div", null, [
                                        createVNode("div", { class: "text-subtitle-1 font-medium" }, [
                                          createTextVNode(toDisplayString(review.name) + " ", 1),
                                          createVNode("span", { class: "text-caption grey--text" }, "(" + toDisplayString(review.location) + ")", 1)
                                        ]),
                                        createVNode(VRating, {
                                          modelValue: review.rating,
                                          "onUpdate:modelValue": ($event) => review.rating = $event,
                                          dense: "",
                                          color: "amber",
                                          readonly: "",
                                          "background-color": "grey lighten-2",
                                          size: "18"
                                        }, null, 8, ["modelValue", "onUpdate:modelValue"]),
                                        createVNode("div", { class: "text-caption grey--text" }, toDisplayString(review.date), 1)
                                      ])
                                    ]),
                                    _: 2
                                  }, 1024),
                                  createVNode("p", {
                                    class: "text-body-2 mb-2",
                                    style: { "font-style": "italic" }
                                  }, '"' + toDisplayString(review.comment) + '"', 1),
                                  createVNode("div", { class: "text-caption mb-2 font-medium" }, "สินค้าที่รีวิว: " + toDisplayString(review.product), 1)
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
            }, _parent2, _scopeId));
          } else {
            return [
              createVNode(VContainer, { class: "text-center py-12" }, {
                default: withCtx(() => [
                  createVNode("h1", { class: "text-h2 font-bold mb-3" }, "รีวิวจากลูกค้า YaDom"),
                  createVNode("p", { class: "text-subtitle-1 mb-6" }, "ลูกค้าของเราพูดถึงความสดชื่นและคุณภาพของยาดม"),
                  createVNode(VBtn, {
                    color: "green-darken-2",
                    dark: "",
                    class: "mx-2",
                    to: "/"
                  }, {
                    default: withCtx(() => [
                      createTextVNode("กลับหน้าหลัก")
                    ]),
                    _: 1
                  }),
                  createVNode(VBtn, {
                    color: "teal-lighten-2",
                    dark: "",
                    class: "mx-2",
                    to: "/products"
                  }, {
                    default: withCtx(() => [
                      createTextVNode("ไปหน้าสินค้า")
                    ]),
                    _: 1
                  })
                ]),
                _: 1
              }),
              createVNode(VContainer, { class: "pb-12" }, {
                default: withCtx(() => [
                  createVNode(VRow, { dense: "" }, {
                    default: withCtx(() => [
                      (openBlock(true), createBlock(Fragment, null, renderList(reviews, (review, index) => {
                        return openBlock(), createBlock(VCol, {
                          key: index,
                          cols: "12",
                          sm: "6",
                          md: "4"
                        }, {
                          default: withCtx(() => [
                            createVNode(VCard, {
                              class: "pa-4 elevation-6",
                              style: { "border-radius": "16px", "background": "rgba(255,255,255,0.9)" }
                            }, {
                              default: withCtx(() => [
                                createVNode(VRow, {
                                  align: "center",
                                  class: "mb-3"
                                }, {
                                  default: withCtx(() => [
                                    createVNode(VAvatar, {
                                      size: "56",
                                      class: "mr-3"
                                    }, {
                                      default: withCtx(() => [
                                        createVNode(VImg, {
                                          src: review.avatar
                                        }, null, 8, ["src"])
                                      ]),
                                      _: 2
                                    }, 1024),
                                    createVNode("div", null, [
                                      createVNode("div", { class: "text-subtitle-1 font-medium" }, [
                                        createTextVNode(toDisplayString(review.name) + " ", 1),
                                        createVNode("span", { class: "text-caption grey--text" }, "(" + toDisplayString(review.location) + ")", 1)
                                      ]),
                                      createVNode(VRating, {
                                        modelValue: review.rating,
                                        "onUpdate:modelValue": ($event) => review.rating = $event,
                                        dense: "",
                                        color: "amber",
                                        readonly: "",
                                        "background-color": "grey lighten-2",
                                        size: "18"
                                      }, null, 8, ["modelValue", "onUpdate:modelValue"]),
                                      createVNode("div", { class: "text-caption grey--text" }, toDisplayString(review.date), 1)
                                    ])
                                  ]),
                                  _: 2
                                }, 1024),
                                createVNode("p", {
                                  class: "text-body-2 mb-2",
                                  style: { "font-style": "italic" }
                                }, '"' + toDisplayString(review.comment) + '"', 1),
                                createVNode("div", { class: "text-caption mb-2 font-medium" }, "สินค้าที่รีวิว: " + toDisplayString(review.product), 1)
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
});
const _sfc_setup = _sfc_main.setup;
_sfc_main.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("pages/review.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};

export { _sfc_main as default };
//# sourceMappingURL=review-XaCCh6hb.mjs.map
