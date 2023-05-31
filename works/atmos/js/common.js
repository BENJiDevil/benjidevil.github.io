(function(){function r(e,n,t){function o(i,f){if(!n[i]){if(!e[i]){var c="function"==typeof require&&require;if(!f&&c)return c(i,!0);if(u)return u(i,!0);var a=new Error("Cannot find module '"+i+"'");throw a.code="MODULE_NOT_FOUND",a}var p=n[i]={exports:{}};e[i][0].call(p.exports,function(r){var n=e[i][1][r];return o(n||r)},p,p.exports,r,e,n,t)}return n[i].exports}for(var u="function"==typeof require&&require,i=0;i<t.length;i++)o(t[i]);return o}return r})()({1:[function(require,module,exports){
"use strict";

function _typeof(obj) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (obj) { return typeof obj; } : function (obj) { return obj && "function" == typeof Symbol && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }, _typeof(obj); }
/* jQuery Form Styler v2.0.2 | (c) Dimox | https://github.com/Dimox/jQueryFormStyler */
!function (e) {
  "function" == typeof define && define.amd ? define(["jquery"], e) : "object" == (typeof exports === "undefined" ? "undefined" : _typeof(exports)) ? module.exports = e($ || require("jquery")) : e(jQuery);
}(function (e) {
  "use strict";

  function t(t, s) {
    this.element = t, this.options = e.extend({}, l, s);
    var i = this.options.locale;
    void 0 !== this.options.locales[i] && e.extend(this.options, this.options.locales[i]), this.init();
  }
  function s(t) {
    if (!e(t.target).parents().hasClass("jq-selectbox") && "OPTION" != t.target.nodeName && e("div.jq-selectbox.opened").length) {
      var s = e("div.jq-selectbox.opened"),
        l = e("div.jq-selectbox__search input", s),
        o = e("div.jq-selectbox__dropdown", s);
      s.find("select").data("_" + i).options.onSelectClosed.call(s), l.length && l.val("").keyup(), o.hide().find("li.sel").addClass("selected"), s.removeClass("focused opened dropup dropdown");
    }
  }
  var i = "styler",
    l = {
      idSuffix: "-styler",
      filePlaceholder: "Файл не выбран",
      fileBrowse: "Обзор...",
      fileNumber: "Выбрано файлов: %s",
      selectPlaceholder: "Выберите...",
      selectSearch: !1,
      selectSearchLimit: 10,
      selectSearchNotFound: "Совпадений не найдено",
      selectSearchPlaceholder: "Поиск...",
      selectVisibleOptions: 0,
      selectSmartPositioning: !0,
      locale: "ru",
      locales: {
        en: {
          filePlaceholder: "No file selected",
          fileBrowse: "Browse...",
          fileNumber: "Selected files: %s",
          selectPlaceholder: "Select...",
          selectSearchNotFound: "No matches found",
          selectSearchPlaceholder: "Search..."
        }
      },
      onSelectOpened: function onSelectOpened() {},
      onSelectClosed: function onSelectClosed() {},
      onFormStyled: function onFormStyled() {}
    };
  t.prototype = {
    init: function init() {
      function t() {
        void 0 !== i.attr("id") && "" !== i.attr("id") && (this.id = i.attr("id") + l.idSuffix), this.title = i.attr("title"), this.classes = i.attr("class"), this.data = i.data();
      }
      var i = e(this.element),
        l = this.options,
        o = !(!navigator.userAgent.match(/(iPad|iPhone|iPod)/i) || navigator.userAgent.match(/(Windows\sPhone)/i)),
        a = !(!navigator.userAgent.match(/Android/i) || navigator.userAgent.match(/(Windows\sPhone)/i));
      if (i.is(":checkbox")) {
        var d = function d() {
          var s = new t(),
            l = e('<div class="jq-checkbox"><div class="jq-checkbox__div"></div></div>').attr({
              id: s.id,
              title: s.title
            }).addClass(s.classes).data(s.data);
          i.after(l).prependTo(l), i.is(":checked") && l.addClass("checked"), i.is(":disabled") && l.addClass("disabled"), l.click(function (e) {
            e.preventDefault(), i.triggerHandler("click"), l.is(".disabled") || (i.is(":checked") ? (i.prop("checked", !1), l.removeClass("checked")) : (i.prop("checked", !0), l.addClass("checked")), i.focus().change());
          }), i.closest("label").add('label[for="' + i.attr("id") + '"]').on("click.styler", function (t) {
            e(t.target).is("a") || e(t.target).closest(l).length || (l.triggerHandler("click"), t.preventDefault());
          }), i.on("change.styler", function () {
            i.is(":checked") ? l.addClass("checked") : l.removeClass("checked");
          }).on("keydown.styler", function (e) {
            32 == e.which && l.click();
          }).on("focus.styler", function () {
            l.is(".disabled") || l.addClass("focused");
          }).on("blur.styler", function () {
            l.removeClass("focused");
          });
        };
        d(), i.on("refresh", function () {
          i.closest("label").add('label[for="' + i.attr("id") + '"]').off(".styler"), i.off(".styler").parent().before(i).remove(), d();
        });
      } else if (i.is(":radio")) {
        var r = function r() {
          var s = new t(),
            l = e('<div class="jq-radio"><div class="jq-radio__div"></div></div>').attr({
              id: s.id,
              title: s.title
            }).addClass(s.classes).data(s.data);
          i.after(l).prependTo(l), i.is(":checked") && l.addClass("checked"), i.is(":disabled") && l.addClass("disabled"), e.fn.commonParents = function () {
            var t = this;
            return t.first().parents().filter(function () {
              return e(this).find(t).length === t.length;
            });
          }, e.fn.commonParent = function () {
            return e(this).commonParents().first();
          }, l.click(function (t) {
            if (t.preventDefault(), i.triggerHandler("click"), !l.is(".disabled")) {
              var s = e('input[name="' + i.attr("name") + '"]');
              s.commonParent().find(s).prop("checked", !1).parent().removeClass("checked"), i.prop("checked", !0).parent().addClass("checked"), i.focus().change();
            }
          }), i.closest("label").add('label[for="' + i.attr("id") + '"]').on("click.styler", function (t) {
            e(t.target).is("a") || e(t.target).closest(l).length || (l.triggerHandler("click"), t.preventDefault());
          }), i.on("change.styler", function () {
            i.parent().addClass("checked");
          }).on("focus.styler", function () {
            l.is(".disabled") || l.addClass("focused");
          }).on("blur.styler", function () {
            l.removeClass("focused");
          });
        };
        r(), i.on("refresh", function () {
          i.closest("label").add('label[for="' + i.attr("id") + '"]').off(".styler"), i.off(".styler").parent().before(i).remove(), r();
        });
      } else if (i.is(":file")) {
        var c = function c() {
          var s = new t(),
            o = i.data("placeholder");
          void 0 === o && (o = l.filePlaceholder);
          var a = i.data("browse");
          void 0 !== a && "" !== a || (a = l.fileBrowse);
          var d = e('<div class="jq-file"><div class="jq-file__name">' + o + '</div><div class="jq-file__browse">' + a + "</div></div>").attr({
            id: s.id,
            title: s.title
          }).addClass(s.classes).data(s.data);
          i.after(d).appendTo(d), i.is(":disabled") && d.addClass("disabled");
          var r = i.val(),
            c = e("div.jq-file__name", d);
          r && c.text(r.replace(/.+[\\\/]/, "")), i.on("change.styler", function () {
            var e = i.val();
            if (i.is("[multiple]")) {
              e = "";
              var t = i[0].files.length;
              if (t > 0) {
                var s = i.data("number");
                void 0 === s && (s = l.fileNumber), s = s.replace("%s", t), e = s;
              }
            }
            c.text(e.replace(/.+[\\\/]/, "")), "" === e ? (c.text(o), d.removeClass("changed")) : d.addClass("changed");
          }).on("focus.styler", function () {
            d.addClass("focused");
          }).on("blur.styler", function () {
            d.removeClass("focused");
          }).on("click.styler", function () {
            d.removeClass("focused");
          });
        };
        c(), i.on("refresh", function () {
          i.off(".styler").parent().before(i).remove(), c();
        });
      } else if (i.is('input[type="number"]')) {
        var n = function n() {
          var s = new t(),
            l = e('<div class="jq-number"><div class="jq-number__spin minus"></div><div class="jq-number__spin plus"></div></div>').attr({
              id: s.id,
              title: s.title
            }).addClass(s.classes).data(s.data);
          i.after(l).prependTo(l).wrap('<div class="jq-number__field"></div>'), i.is(":disabled") && l.addClass("disabled");
          var o,
            a,
            d,
            r = null,
            c = null;
          void 0 !== i.attr("min") && (o = i.attr("min")), void 0 !== i.attr("max") && (a = i.attr("max")), d = void 0 !== i.attr("step") && e.isNumeric(i.attr("step")) ? Number(i.attr("step")) : Number(1);
          var n = function n(t) {
            var s,
              l = i.val();
            e.isNumeric(l) || (l = 0, i.val("0")), t.is(".minus") ? s = Number(l) - d : t.is(".plus") && (s = Number(l) + d);
            var r = (d.toString().split(".")[1] || []).length;
            if (r > 0) {
              for (var c = "1"; c.length <= r;) c += "0";
              s = Math.round(s * c) / c;
            }
            e.isNumeric(o) && e.isNumeric(a) ? s >= o && s <= a && i.val(s) : e.isNumeric(o) && !e.isNumeric(a) ? s >= o && i.val(s) : !e.isNumeric(o) && e.isNumeric(a) ? s <= a && i.val(s) : i.val(s);
          };
          l.is(".disabled") || (l.on("mousedown", "div.jq-number__spin", function () {
            var t = e(this);
            n(t), r = setTimeout(function () {
              c = setInterval(function () {
                n(t);
              }, 40);
            }, 350);
          }).on("mouseup mouseout", "div.jq-number__spin", function () {
            clearTimeout(r), clearInterval(c);
          }).on("mouseup", "div.jq-number__spin", function () {
            i.change().trigger("input");
          }), i.on("focus.styler", function () {
            l.addClass("focused");
          }).on("blur.styler", function () {
            l.removeClass("focused");
          }));
        };
        n(), i.on("refresh", function () {
          i.off(".styler").closest(".jq-number").before(i).remove(), n();
        });
      } else if (i.is("select")) {
        var f = function f() {
          function d(e) {
            var t = e.prop("scrollHeight") - e.outerHeight(),
              s = null,
              i = null;
            e.off("mousewheel DOMMouseScroll").on("mousewheel DOMMouseScroll", function (l) {
              s = l.originalEvent.detail < 0 || l.originalEvent.wheelDelta > 0 ? 1 : -1, ((i = e.scrollTop()) >= t && s < 0 || i <= 0 && s > 0) && (l.stopPropagation(), l.preventDefault());
            });
          }
          function r() {
            for (var e = 0; e < c.length; e++) {
              var t = c.eq(e),
                s = "",
                i = "",
                o = "",
                a = "",
                d = "",
                r = "",
                f = "",
                h = "",
                u = "";
              t.prop("selected") && (i = "selected sel"), t.is(":disabled") && (i = "disabled"), t.is(":selected:disabled") && (i = "selected sel disabled"), void 0 !== t.attr("id") && "" !== t.attr("id") && (a = ' id="' + t.attr("id") + l.idSuffix + '"'), void 0 !== t.attr("title") && "" !== c.attr("title") && (d = ' title="' + t.attr("title") + '"'), void 0 !== t.attr("class") && (f = " " + t.attr("class"), u = ' data-jqfs-class="' + t.attr("class") + '"');
              var p = t.data();
              for (var v in p) "" !== p[v] && (r += " data-" + v + '="' + p[v] + '"');
              i + f !== "" && (o = ' class="' + i + f + '"'), s = "<li" + u + r + o + d + a + ">" + t.html() + "</li>", t.parent().is("optgroup") && (void 0 !== t.parent().attr("class") && (h = " " + t.parent().attr("class")), s = "<li" + u + r + ' class="' + i + f + " option" + h + '"' + d + a + ">" + t.html() + "</li>", t.is(":first-child") && (s = '<li class="optgroup' + h + '">' + t.parent().attr("label") + "</li>" + s)), n += s;
            }
          }
          var c = e("option", i),
            n = "";
          if (i.is("[multiple]")) {
            if (a || o) return;
            !function () {
              var s = new t(),
                l = e('<div class="jq-select-multiple jqselect"></div>').attr({
                  id: s.id,
                  title: s.title
                }).addClass(s.classes).data(s.data);
              i.after(l), r(), l.append("<ul>" + n + "</ul>");
              var o = e("ul", l),
                a = e("li", l),
                f = i.attr("size"),
                h = o.outerHeight(),
                u = a.outerHeight();
              void 0 !== f && f > 0 ? o.css({
                height: u * f
              }) : o.css({
                height: 4 * u
              }), h > l.height() && (o.css("overflowY", "scroll"), d(o), a.filter(".selected").length && o.scrollTop(o.scrollTop() + a.filter(".selected").position().top)), i.prependTo(l), i.is(":disabled") ? (l.addClass("disabled"), c.each(function () {
                e(this).is(":selected") && a.eq(e(this).index()).addClass("selected");
              })) : (a.filter(":not(.disabled):not(.optgroup)").click(function (t) {
                i.focus();
                var s = e(this);
                if (t.ctrlKey || t.metaKey || s.addClass("selected"), t.shiftKey || s.addClass("first"), t.ctrlKey || t.metaKey || t.shiftKey || s.siblings().removeClass("selected first"), (t.ctrlKey || t.metaKey) && (s.is(".selected") ? s.removeClass("selected first") : s.addClass("selected first"), s.siblings().removeClass("first")), t.shiftKey) {
                  var l = !1,
                    o = !1;
                  s.siblings().removeClass("selected").siblings(".first").addClass("selected"), s.prevAll().each(function () {
                    e(this).is(".first") && (l = !0);
                  }), s.nextAll().each(function () {
                    e(this).is(".first") && (o = !0);
                  }), l && s.prevAll().each(function () {
                    if (e(this).is(".selected")) return !1;
                    e(this).not(".disabled, .optgroup").addClass("selected");
                  }), o && s.nextAll().each(function () {
                    if (e(this).is(".selected")) return !1;
                    e(this).not(".disabled, .optgroup").addClass("selected");
                  }), 1 == a.filter(".selected").length && s.addClass("first");
                }
                c.prop("selected", !1), a.filter(".selected").each(function () {
                  var t = e(this),
                    s = t.index();
                  t.is(".option") && (s -= t.prevAll(".optgroup").length), c.eq(s).prop("selected", !0);
                }), i.change();
              }), c.each(function (t) {
                e(this).data("optionIndex", t);
              }), i.on("change.styler", function () {
                a.removeClass("selected");
                var t = [];
                c.filter(":selected").each(function () {
                  t.push(e(this).data("optionIndex"));
                }), a.not(".optgroup").filter(function (s) {
                  return e.inArray(s, t) > -1;
                }).addClass("selected");
              }).on("focus.styler", function () {
                l.addClass("focused");
              }).on("blur.styler", function () {
                l.removeClass("focused");
              }), h > l.height() && i.on("keydown.styler", function (e) {
                38 != e.which && 37 != e.which && 33 != e.which || o.scrollTop(o.scrollTop() + a.filter(".selected").position().top - u), 40 != e.which && 39 != e.which && 34 != e.which || o.scrollTop(o.scrollTop() + a.filter(".selected:last").position().top - o.innerHeight() + 2 * u);
              }));
            }();
          } else !function () {
            var a = new t(),
              f = "",
              h = i.data("placeholder"),
              u = i.data("search"),
              p = i.data("search-limit"),
              v = i.data("search-not-found"),
              m = i.data("search-placeholder"),
              g = i.data("smart-positioning");
            void 0 === h && (h = l.selectPlaceholder), void 0 !== u && "" !== u || (u = l.selectSearch), void 0 !== p && "" !== p || (p = l.selectSearchLimit), void 0 !== v && "" !== v || (v = l.selectSearchNotFound), void 0 === m && (m = l.selectSearchPlaceholder), void 0 !== g && "" !== g || (g = l.selectSmartPositioning);
            var b = e('<div class="jq-selectbox jqselect"><div class="jq-selectbox__select"><div class="jq-selectbox__select-text"></div><div class="jq-selectbox__trigger"><div class="jq-selectbox__trigger-arrow"></div></div></div></div>').attr({
              id: a.id,
              title: a.title
            }).addClass(a.classes).data(a.data);
            i.after(b).prependTo(b);
            var C = b.css("z-index");
            C = C > 0 ? C : 1;
            var x = e("div.jq-selectbox__select", b),
              y = e("div.jq-selectbox__select-text", b),
              w = c.filter(":selected");
            r(), u && (f = '<div class="jq-selectbox__search"><input type="search" autocomplete="off" placeholder="' + m + '"></div><div class="jq-selectbox__not-found">' + v + "</div>");
            var q = e('<div class="jq-selectbox__dropdown">' + f + "<ul>" + n + "</ul></div>");
            b.append(q);
            var _ = e("ul", q),
              j = e("li", q),
              k = e("input", q),
              S = e("div.jq-selectbox__not-found", q).hide();
            j.length < p && k.parent().hide(), "" === c.first().text() && c.first().is(":selected") && !1 !== h ? y.text(h).addClass("placeholder") : y.text(w.text());
            var T = 0,
              N = 0;
            if (j.css({
              display: "inline-block"
            }), j.each(function () {
              var t = e(this);
              t.innerWidth() > T && (T = t.innerWidth(), N = t.width());
            }), j.css({
              display: ""
            }), y.is(".placeholder") && y.width() > T) y.width(y.width());else {
              var P = b.clone().appendTo("body").width("auto"),
                H = P.outerWidth();
              P.remove(), H == b.outerWidth() && y.width(N);
            }
            T > b.width() && q.width(T), "" === c.first().text() && "" !== i.data("placeholder") && j.first().hide();
            var A = b.outerHeight(!0),
              D = k.parent().outerHeight(!0) || 0,
              I = _.css("max-height"),
              K = j.filter(".selected");
            if (K.length < 1 && j.first().addClass("selected sel"), void 0 === j.data("li-height")) {
              var O = j.outerHeight();
              !1 !== h && (O = j.eq(1).outerHeight()), j.data("li-height", O);
            }
            var M = q.css("top");
            if ("auto" == q.css("left") && q.css({
              left: 0
            }), "auto" == q.css("top") && (q.css({
              top: A
            }), M = A), q.hide(), K.length && (c.first().text() != w.text() && b.addClass("changed"), b.data("jqfs-class", K.data("jqfs-class")), b.addClass(K.data("jqfs-class"))), i.is(":disabled")) return b.addClass("disabled"), !1;
            x.click(function () {
              if (e("div.jq-selectbox").filter(".opened").length && l.onSelectClosed.call(e("div.jq-selectbox").filter(".opened")), i.focus(), !o) {
                var t = e(window),
                  s = j.data("li-height"),
                  a = b.offset().top,
                  r = t.height() - A - (a - t.scrollTop()),
                  n = i.data("visible-options");
                void 0 !== n && "" !== n || (n = l.selectVisibleOptions);
                var f = 5 * s,
                  h = s * n;
                n > 0 && n < 6 && (f = h), 0 === n && (h = "auto");
                var u = function u() {
                  q.height("auto").css({
                    bottom: "auto",
                    top: M
                  });
                  var e = function e() {
                    _.css("max-height", Math.floor((r - 20 - D) / s) * s);
                  };
                  e(), _.css("max-height", h), "none" != I && _.css("max-height", I), r < q.outerHeight() + 20 && e();
                };
                !0 === g || 1 === g ? r > f + D + 20 ? (u(), b.removeClass("dropup").addClass("dropdown")) : (function () {
                  q.height("auto").css({
                    top: "auto",
                    bottom: M
                  });
                  var e = function e() {
                    _.css("max-height", Math.floor((a - t.scrollTop() - 20 - D) / s) * s);
                  };
                  e(), _.css("max-height", h), "none" != I && _.css("max-height", I), a - t.scrollTop() - 20 < q.outerHeight() + 20 && e();
                }(), b.removeClass("dropdown").addClass("dropup")) : !1 === g || 0 === g ? r > f + D + 20 && (u(), b.removeClass("dropup").addClass("dropdown")) : (q.height("auto").css({
                  bottom: "auto",
                  top: M
                }), _.css("max-height", h), "none" != I && _.css("max-height", I)), b.offset().left + q.outerWidth() > t.width() && q.css({
                  left: "auto",
                  right: 0
                }), e("div.jqselect").css({
                  zIndex: C - 1
                }).removeClass("opened"), b.css({
                  zIndex: C
                }), q.is(":hidden") ? (e("div.jq-selectbox__dropdown:visible").hide(), q.show(), b.addClass("opened focused"), l.onSelectOpened.call(b)) : (q.hide(), b.removeClass("opened dropup dropdown"), e("div.jq-selectbox").filter(".opened").length && l.onSelectClosed.call(b)), k.length && (k.val("").keyup(), S.hide(), k.keyup(function () {
                  var t = e(this).val();
                  j.each(function () {
                    e(this).html().match(new RegExp(".*?" + t + ".*?", "i")) ? e(this).show() : e(this).hide();
                  }), "" === c.first().text() && "" !== i.data("placeholder") && j.first().hide(), j.filter(":visible").length < 1 ? S.show() : S.hide();
                })), j.filter(".selected").length && ("" === i.val() ? _.scrollTop(0) : (_.innerHeight() / s % 2 != 0 && (s /= 2), _.scrollTop(_.scrollTop() + j.filter(".selected").position().top - _.innerHeight() / 2 + s))), d(_);
              }
            }), j.hover(function () {
              e(this).siblings().removeClass("selected");
            });
            var W = j.filter(".selected").text();
            j.filter(":not(.disabled):not(.optgroup)").click(function () {
              i.focus();
              var t = e(this),
                s = t.text();
              if (!t.is(".selected")) {
                var o = t.index();
                o -= t.prevAll(".optgroup").length, t.addClass("selected sel").siblings().removeClass("selected sel"), c.prop("selected", !1).eq(o).prop("selected", !0), W = s, y.text(s), b.data("jqfs-class") && b.removeClass(b.data("jqfs-class")), b.data("jqfs-class", t.data("jqfs-class")), b.addClass(t.data("jqfs-class")), i.change();
              }
              q.hide(), b.removeClass("opened dropup dropdown"), l.onSelectClosed.call(b);
            }), q.mouseout(function () {
              e("li.sel", q).addClass("selected");
            }), i.on("change.styler", function () {
              y.text(c.filter(":selected").text()).removeClass("placeholder"), j.removeClass("selected sel").not(".optgroup").eq(i[0].selectedIndex).addClass("selected sel"), c.first().text() != j.filter(".selected").text() ? b.addClass("changed") : b.removeClass("changed");
            }).on("focus.styler", function () {
              b.addClass("focused"), e("div.jqselect").not(".focused").removeClass("opened dropup dropdown").find("div.jq-selectbox__dropdown").hide();
            }).on("blur.styler", function () {
              b.removeClass("focused");
            }).on("keydown.styler keyup.styler", function (e) {
              var t = j.data("li-height");
              "" === i.val() ? y.text(h).addClass("placeholder") : y.text(c.filter(":selected").text()), j.removeClass("selected sel").not(".optgroup").eq(i[0].selectedIndex).addClass("selected sel"), 38 != e.which && 37 != e.which && 33 != e.which && 36 != e.which || ("" === i.val() ? _.scrollTop(0) : _.scrollTop(_.scrollTop() + j.filter(".selected").position().top)), 40 != e.which && 39 != e.which && 34 != e.which && 35 != e.which || _.scrollTop(_.scrollTop() + j.filter(".selected").position().top - _.innerHeight() + t), 13 == e.which && (e.preventDefault(), q.hide(), b.removeClass("opened dropup dropdown"), l.onSelectClosed.call(b));
            }).on("keydown.styler", function (e) {
              32 == e.which && (e.preventDefault(), x.click());
            }), s.registered || (e(document).on("click", s), s.registered = !0);
          }();
        };
        f(), i.on("refresh", function () {
          i.off(".styler").parent().before(i).remove(), f();
        });
      } else i.is(":reset") && i.on("click", function () {
        setTimeout(function () {
          i.closest("form").find("input, select").trigger("refresh");
        }, 1);
      });
    },
    destroy: function destroy() {
      var t = e(this.element);
      t.is(":checkbox") || t.is(":radio") ? (t.removeData("_" + i).off(".styler refresh").removeAttr("style").parent().before(t).remove(), t.closest("label").add('label[for="' + t.attr("id") + '"]').off(".styler")) : t.is('input[type="number"]') ? t.removeData("_" + i).off(".styler refresh").closest(".jq-number").before(t).remove() : (t.is(":file") || t.is("select")) && t.removeData("_" + i).off(".styler refresh").removeAttr("style").parent().before(t).remove();
    }
  }, e.fn[i] = function (s) {
    var l = arguments;
    if (void 0 === s || "object" == _typeof(s)) return this.each(function () {
      e.data(this, "_" + i) || e.data(this, "_" + i, new t(this, s));
    }).promise().done(function () {
      var t = e(this[0]).data("_" + i);
      t && t.options.onFormStyled.call();
    }), this;
    if ("string" == typeof s && "_" !== s[0] && "init" !== s) {
      var o;
      return this.each(function () {
        var a = e.data(this, "_" + i);
        a instanceof t && "function" == typeof a[s] && (o = a[s].apply(a, Array.prototype.slice.call(l, 1)));
      }), void 0 !== o ? o : this;
    }
  }, s.registered = !1;
});

},{"jquery":2}],2:[function(require,module,exports){
"use strict";

function _typeof(obj) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (obj) { return typeof obj; } : function (obj) { return obj && "function" == typeof Symbol && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }, _typeof(obj); }
/*!
 * jQuery JavaScript Library v1.12.4
 * http://jquery.com/
 *
 * Includes Sizzle.js
 * http://sizzlejs.com/
 *
 * Copyright jQuery Foundation and other contributors
 * Released under the MIT license
 * http://jquery.org/license
 *
 * Date: 2016-05-20T17:17Z
 */

(function (global, factory) {
  if ((typeof module === "undefined" ? "undefined" : _typeof(module)) === "object" && _typeof(module.exports) === "object") {
    // For CommonJS and CommonJS-like environments where a proper `window`
    // is present, execute the factory and get jQuery.
    // For environments that do not have a `window` with a `document`
    // (such as Node.js), expose a factory as module.exports.
    // This accentuates the need for the creation of a real `window`.
    // e.g. var jQuery = require("jquery")(window);
    // See ticket #14549 for more info.
    module.exports = global.document ? factory(global, true) : function (w) {
      if (!w.document) {
        throw new Error("jQuery requires a window with a document");
      }
      return factory(w);
    };
  } else {
    factory(global);
  }

  // Pass this if window is not defined yet
})(typeof window !== "undefined" ? window : void 0, function (window, noGlobal) {
  // Support: Firefox 18+
  // Can't be in strict mode, several libs including ASP.NET trace
  // the stack via arguments.caller.callee and Firefox dies if
  // you try to trace through "use strict" call chains. (#13335)
  //"use strict";
  var deletedIds = [];
  var document = window.document;
  var _slice = deletedIds.slice;
  var concat = deletedIds.concat;
  var push = deletedIds.push;
  var indexOf = deletedIds.indexOf;
  var class2type = {};
  var toString = class2type.toString;
  var hasOwn = class2type.hasOwnProperty;
  var support = {};
  var version = "1.12.4",
    // Define a local copy of jQuery
    jQuery = function jQuery(selector, context) {
      // The jQuery object is actually just the init constructor 'enhanced'
      // Need init if jQuery is called (just allow error to be thrown if not included)
      return new jQuery.fn.init(selector, context);
    },
    // Support: Android<4.1, IE<9
    // Make sure we trim BOM and NBSP
    rtrim = /^[\s\uFEFF\xA0]+|[\s\uFEFF\xA0]+$/g,
    // Matches dashed string for camelizing
    rmsPrefix = /^-ms-/,
    rdashAlpha = /-([\da-z])/gi,
    // Used by jQuery.camelCase as callback to replace()
    fcamelCase = function fcamelCase(all, letter) {
      return letter.toUpperCase();
    };
  jQuery.fn = jQuery.prototype = {
    // The current version of jQuery being used
    jquery: version,
    constructor: jQuery,
    // Start with an empty selector
    selector: "",
    // The default length of a jQuery object is 0
    length: 0,
    toArray: function toArray() {
      return _slice.call(this);
    },
    // Get the Nth element in the matched element set OR
    // Get the whole matched element set as a clean array
    get: function get(num) {
      return num != null ?
      // Return just the one element from the set
      num < 0 ? this[num + this.length] : this[num] :
      // Return all the elements in a clean array
      _slice.call(this);
    },
    // Take an array of elements and push it onto the stack
    // (returning the new matched element set)
    pushStack: function pushStack(elems) {
      // Build a new jQuery matched element set
      var ret = jQuery.merge(this.constructor(), elems);

      // Add the old object onto the stack (as a reference)
      ret.prevObject = this;
      ret.context = this.context;

      // Return the newly-formed element set
      return ret;
    },
    // Execute a callback for every element in the matched set.
    each: function each(callback) {
      return jQuery.each(this, callback);
    },
    map: function map(callback) {
      return this.pushStack(jQuery.map(this, function (elem, i) {
        return callback.call(elem, i, elem);
      }));
    },
    slice: function slice() {
      return this.pushStack(_slice.apply(this, arguments));
    },
    first: function first() {
      return this.eq(0);
    },
    last: function last() {
      return this.eq(-1);
    },
    eq: function eq(i) {
      var len = this.length,
        j = +i + (i < 0 ? len : 0);
      return this.pushStack(j >= 0 && j < len ? [this[j]] : []);
    },
    end: function end() {
      return this.prevObject || this.constructor();
    },
    // For internal use only.
    // Behaves like an Array's method, not like a jQuery method.
    push: push,
    sort: deletedIds.sort,
    splice: deletedIds.splice
  };
  jQuery.extend = jQuery.fn.extend = function () {
    var src,
      copyIsArray,
      copy,
      name,
      options,
      clone,
      target = arguments[0] || {},
      i = 1,
      length = arguments.length,
      deep = false;

    // Handle a deep copy situation
    if (typeof target === "boolean") {
      deep = target;

      // skip the boolean and the target
      target = arguments[i] || {};
      i++;
    }

    // Handle case when target is a string or something (possible in deep copy)
    if (_typeof(target) !== "object" && !jQuery.isFunction(target)) {
      target = {};
    }

    // extend jQuery itself if only one argument is passed
    if (i === length) {
      target = this;
      i--;
    }
    for (; i < length; i++) {
      // Only deal with non-null/undefined values
      if ((options = arguments[i]) != null) {
        // Extend the base object
        for (name in options) {
          src = target[name];
          copy = options[name];

          // Prevent never-ending loop
          if (target === copy) {
            continue;
          }

          // Recurse if we're merging plain objects or arrays
          if (deep && copy && (jQuery.isPlainObject(copy) || (copyIsArray = jQuery.isArray(copy)))) {
            if (copyIsArray) {
              copyIsArray = false;
              clone = src && jQuery.isArray(src) ? src : [];
            } else {
              clone = src && jQuery.isPlainObject(src) ? src : {};
            }

            // Never move original objects, clone them
            target[name] = jQuery.extend(deep, clone, copy);

            // Don't bring in undefined values
          } else if (copy !== undefined) {
            target[name] = copy;
          }
        }
      }
    }

    // Return the modified object
    return target;
  };
  jQuery.extend({
    // Unique for each copy of jQuery on the page
    expando: "jQuery" + (version + Math.random()).replace(/\D/g, ""),
    // Assume jQuery is ready without the ready module
    isReady: true,
    error: function error(msg) {
      throw new Error(msg);
    },
    noop: function noop() {},
    // See test/unit/core.js for details concerning isFunction.
    // Since version 1.3, DOM methods and functions like alert
    // aren't supported. They return false on IE (#2968).
    isFunction: function isFunction(obj) {
      return jQuery.type(obj) === "function";
    },
    isArray: Array.isArray || function (obj) {
      return jQuery.type(obj) === "array";
    },
    isWindow: function isWindow(obj) {
      /* jshint eqeqeq: false */
      return obj != null && obj == obj.window;
    },
    isNumeric: function isNumeric(obj) {
      // parseFloat NaNs numeric-cast false positives (null|true|false|"")
      // ...but misinterprets leading-number strings, particularly hex literals ("0x...")
      // subtraction forces infinities to NaN
      // adding 1 corrects loss of precision from parseFloat (#15100)
      var realStringObj = obj && obj.toString();
      return !jQuery.isArray(obj) && realStringObj - parseFloat(realStringObj) + 1 >= 0;
    },
    isEmptyObject: function isEmptyObject(obj) {
      var name;
      for (name in obj) {
        return false;
      }
      return true;
    },
    isPlainObject: function isPlainObject(obj) {
      var key;

      // Must be an Object.
      // Because of IE, we also have to check the presence of the constructor property.
      // Make sure that DOM nodes and window objects don't pass through, as well
      if (!obj || jQuery.type(obj) !== "object" || obj.nodeType || jQuery.isWindow(obj)) {
        return false;
      }
      try {
        // Not own constructor property must be Object
        if (obj.constructor && !hasOwn.call(obj, "constructor") && !hasOwn.call(obj.constructor.prototype, "isPrototypeOf")) {
          return false;
        }
      } catch (e) {
        // IE8,9 Will throw exceptions on certain host objects #9897
        return false;
      }

      // Support: IE<9
      // Handle iteration over inherited properties before own properties.
      if (!support.ownFirst) {
        for (key in obj) {
          return hasOwn.call(obj, key);
        }
      }

      // Own properties are enumerated firstly, so to speed up,
      // if last one is own, then all properties are own.
      for (key in obj) {}
      return key === undefined || hasOwn.call(obj, key);
    },
    type: function type(obj) {
      if (obj == null) {
        return obj + "";
      }
      return _typeof(obj) === "object" || typeof obj === "function" ? class2type[toString.call(obj)] || "object" : _typeof(obj);
    },
    // Workarounds based on findings by Jim Driscoll
    // http://weblogs.java.net/blog/driscoll/archive/2009/09/08/eval-javascript-global-context
    globalEval: function globalEval(data) {
      if (data && jQuery.trim(data)) {
        // We use execScript on Internet Explorer
        // We use an anonymous function so that context is window
        // rather than jQuery in Firefox
        (window.execScript || function (data) {
          window["eval"].call(window, data); // jscs:ignore requireDotNotation
        })(data);
      }
    },
    // Convert dashed to camelCase; used by the css and data modules
    // Microsoft forgot to hump their vendor prefix (#9572)
    camelCase: function camelCase(string) {
      return string.replace(rmsPrefix, "ms-").replace(rdashAlpha, fcamelCase);
    },
    nodeName: function nodeName(elem, name) {
      return elem.nodeName && elem.nodeName.toLowerCase() === name.toLowerCase();
    },
    each: function each(obj, callback) {
      var length,
        i = 0;
      if (isArrayLike(obj)) {
        length = obj.length;
        for (; i < length; i++) {
          if (callback.call(obj[i], i, obj[i]) === false) {
            break;
          }
        }
      } else {
        for (i in obj) {
          if (callback.call(obj[i], i, obj[i]) === false) {
            break;
          }
        }
      }
      return obj;
    },
    // Support: Android<4.1, IE<9
    trim: function trim(text) {
      return text == null ? "" : (text + "").replace(rtrim, "");
    },
    // results is for internal usage only
    makeArray: function makeArray(arr, results) {
      var ret = results || [];
      if (arr != null) {
        if (isArrayLike(Object(arr))) {
          jQuery.merge(ret, typeof arr === "string" ? [arr] : arr);
        } else {
          push.call(ret, arr);
        }
      }
      return ret;
    },
    inArray: function inArray(elem, arr, i) {
      var len;
      if (arr) {
        if (indexOf) {
          return indexOf.call(arr, elem, i);
        }
        len = arr.length;
        i = i ? i < 0 ? Math.max(0, len + i) : i : 0;
        for (; i < len; i++) {
          // Skip accessing in sparse arrays
          if (i in arr && arr[i] === elem) {
            return i;
          }
        }
      }
      return -1;
    },
    merge: function merge(first, second) {
      var len = +second.length,
        j = 0,
        i = first.length;
      while (j < len) {
        first[i++] = second[j++];
      }

      // Support: IE<9
      // Workaround casting of .length to NaN on otherwise arraylike objects (e.g., NodeLists)
      if (len !== len) {
        while (second[j] !== undefined) {
          first[i++] = second[j++];
        }
      }
      first.length = i;
      return first;
    },
    grep: function grep(elems, callback, invert) {
      var callbackInverse,
        matches = [],
        i = 0,
        length = elems.length,
        callbackExpect = !invert;

      // Go through the array, only saving the items
      // that pass the validator function
      for (; i < length; i++) {
        callbackInverse = !callback(elems[i], i);
        if (callbackInverse !== callbackExpect) {
          matches.push(elems[i]);
        }
      }
      return matches;
    },
    // arg is for internal usage only
    map: function map(elems, callback, arg) {
      var length,
        value,
        i = 0,
        ret = [];

      // Go through the array, translating each of the items to their new values
      if (isArrayLike(elems)) {
        length = elems.length;
        for (; i < length; i++) {
          value = callback(elems[i], i, arg);
          if (value != null) {
            ret.push(value);
          }
        }

        // Go through every key on the object,
      } else {
        for (i in elems) {
          value = callback(elems[i], i, arg);
          if (value != null) {
            ret.push(value);
          }
        }
      }

      // Flatten any nested arrays
      return concat.apply([], ret);
    },
    // A global GUID counter for objects
    guid: 1,
    // Bind a function to a context, optionally partially applying any
    // arguments.
    proxy: function proxy(fn, context) {
      var args, proxy, tmp;
      if (typeof context === "string") {
        tmp = fn[context];
        context = fn;
        fn = tmp;
      }

      // Quick check to determine if target is callable, in the spec
      // this throws a TypeError, but we will just return undefined.
      if (!jQuery.isFunction(fn)) {
        return undefined;
      }

      // Simulated bind
      args = _slice.call(arguments, 2);
      proxy = function proxy() {
        return fn.apply(context || this, args.concat(_slice.call(arguments)));
      };

      // Set the guid of unique handler to the same of original handler, so it can be removed
      proxy.guid = fn.guid = fn.guid || jQuery.guid++;
      return proxy;
    },
    now: function now() {
      return +new Date();
    },
    // jQuery.support is not used in Core but other projects attach their
    // properties to it so it needs to exist.
    support: support
  });

  // JSHint would error on this code due to the Symbol not being defined in ES5.
  // Defining this global in .jshintrc would create a danger of using the global
  // unguarded in another place, it seems safer to just disable JSHint for these
  // three lines.
  /* jshint ignore: start */
  if (typeof Symbol === "function") {
    jQuery.fn[Symbol.iterator] = deletedIds[Symbol.iterator];
  }
  /* jshint ignore: end */

  // Populate the class2type map
  jQuery.each("Boolean Number String Function Array Date RegExp Object Error Symbol".split(" "), function (i, name) {
    class2type["[object " + name + "]"] = name.toLowerCase();
  });
  function isArrayLike(obj) {
    // Support: iOS 8.2 (not reproducible in simulator)
    // `in` check used to prevent JIT error (gh-2145)
    // hasOwn isn't used here due to false negatives
    // regarding Nodelist length in IE
    var length = !!obj && "length" in obj && obj.length,
      type = jQuery.type(obj);
    if (type === "function" || jQuery.isWindow(obj)) {
      return false;
    }
    return type === "array" || length === 0 || typeof length === "number" && length > 0 && length - 1 in obj;
  }
  var Sizzle =
  /*!
   * Sizzle CSS Selector Engine v2.2.1
   * http://sizzlejs.com/
   *
   * Copyright jQuery Foundation and other contributors
   * Released under the MIT license
   * http://jquery.org/license
   *
   * Date: 2015-10-17
   */
  function (window) {
    var i,
      support,
      Expr,
      getText,
      isXML,
      tokenize,
      compile,
      select,
      outermostContext,
      sortInput,
      hasDuplicate,
      // Local document vars
      setDocument,
      document,
      docElem,
      documentIsHTML,
      rbuggyQSA,
      rbuggyMatches,
      matches,
      contains,
      // Instance-specific data
      expando = "sizzle" + 1 * new Date(),
      preferredDoc = window.document,
      dirruns = 0,
      done = 0,
      classCache = createCache(),
      tokenCache = createCache(),
      compilerCache = createCache(),
      sortOrder = function sortOrder(a, b) {
        if (a === b) {
          hasDuplicate = true;
        }
        return 0;
      },
      // General-purpose constants
      MAX_NEGATIVE = 1 << 31,
      // Instance methods
      hasOwn = {}.hasOwnProperty,
      arr = [],
      pop = arr.pop,
      push_native = arr.push,
      push = arr.push,
      slice = arr.slice,
      // Use a stripped-down indexOf as it's faster than native
      // http://jsperf.com/thor-indexof-vs-for/5
      indexOf = function indexOf(list, elem) {
        var i = 0,
          len = list.length;
        for (; i < len; i++) {
          if (list[i] === elem) {
            return i;
          }
        }
        return -1;
      },
      booleans = "checked|selected|async|autofocus|autoplay|controls|defer|disabled|hidden|ismap|loop|multiple|open|readonly|required|scoped",
      // Regular expressions

      // http://www.w3.org/TR/css3-selectors/#whitespace
      whitespace = "[\\x20\\t\\r\\n\\f]",
      // http://www.w3.org/TR/CSS21/syndata.html#value-def-identifier
      identifier = "(?:\\\\.|[\\w-]|[^\\x00-\\xa0])+",
      // Attribute selectors: http://www.w3.org/TR/selectors/#attribute-selectors
      attributes = "\\[" + whitespace + "*(" + identifier + ")(?:" + whitespace +
      // Operator (capture 2)
      "*([*^$|!~]?=)" + whitespace +
      // "Attribute values must be CSS identifiers [capture 5] or strings [capture 3 or capture 4]"
      "*(?:'((?:\\\\.|[^\\\\'])*)'|\"((?:\\\\.|[^\\\\\"])*)\"|(" + identifier + "))|)" + whitespace + "*\\]",
      pseudos = ":(" + identifier + ")(?:\\((" +
      // To reduce the number of selectors needing tokenize in the preFilter, prefer arguments:
      // 1. quoted (capture 3; capture 4 or capture 5)
      "('((?:\\\\.|[^\\\\'])*)'|\"((?:\\\\.|[^\\\\\"])*)\")|" +
      // 2. simple (capture 6)
      "((?:\\\\.|[^\\\\()[\\]]|" + attributes + ")*)|" +
      // 3. anything else (capture 2)
      ".*" + ")\\)|)",
      // Leading and non-escaped trailing whitespace, capturing some non-whitespace characters preceding the latter
      rwhitespace = new RegExp(whitespace + "+", "g"),
      rtrim = new RegExp("^" + whitespace + "+|((?:^|[^\\\\])(?:\\\\.)*)" + whitespace + "+$", "g"),
      rcomma = new RegExp("^" + whitespace + "*," + whitespace + "*"),
      rcombinators = new RegExp("^" + whitespace + "*([>+~]|" + whitespace + ")" + whitespace + "*"),
      rattributeQuotes = new RegExp("=" + whitespace + "*([^\\]'\"]*?)" + whitespace + "*\\]", "g"),
      rpseudo = new RegExp(pseudos),
      ridentifier = new RegExp("^" + identifier + "$"),
      matchExpr = {
        "ID": new RegExp("^#(" + identifier + ")"),
        "CLASS": new RegExp("^\\.(" + identifier + ")"),
        "TAG": new RegExp("^(" + identifier + "|[*])"),
        "ATTR": new RegExp("^" + attributes),
        "PSEUDO": new RegExp("^" + pseudos),
        "CHILD": new RegExp("^:(only|first|last|nth|nth-last)-(child|of-type)(?:\\(" + whitespace + "*(even|odd|(([+-]|)(\\d*)n|)" + whitespace + "*(?:([+-]|)" + whitespace + "*(\\d+)|))" + whitespace + "*\\)|)", "i"),
        "bool": new RegExp("^(?:" + booleans + ")$", "i"),
        // For use in libraries implementing .is()
        // We use this for POS matching in `select`
        "needsContext": new RegExp("^" + whitespace + "*[>+~]|:(even|odd|eq|gt|lt|nth|first|last)(?:\\(" + whitespace + "*((?:-\\d)?\\d*)" + whitespace + "*\\)|)(?=[^-]|$)", "i")
      },
      rinputs = /^(?:input|select|textarea|button)$/i,
      rheader = /^h\d$/i,
      rnative = /^[^{]+\{\s*\[native \w/,
      // Easily-parseable/retrievable ID or TAG or CLASS selectors
      rquickExpr = /^(?:#([\w-]+)|(\w+)|\.([\w-]+))$/,
      rsibling = /[+~]/,
      rescape = /'|\\/g,
      // CSS escapes http://www.w3.org/TR/CSS21/syndata.html#escaped-characters
      runescape = new RegExp("\\\\([\\da-f]{1,6}" + whitespace + "?|(" + whitespace + ")|.)", "ig"),
      funescape = function funescape(_, escaped, escapedWhitespace) {
        var high = "0x" + escaped - 0x10000;
        // NaN means non-codepoint
        // Support: Firefox<24
        // Workaround erroneous numeric interpretation of +"0x"
        return high !== high || escapedWhitespace ? escaped : high < 0 ?
        // BMP codepoint
        String.fromCharCode(high + 0x10000) :
        // Supplemental Plane codepoint (surrogate pair)
        String.fromCharCode(high >> 10 | 0xD800, high & 0x3FF | 0xDC00);
      },
      // Used for iframes
      // See setDocument()
      // Removing the function wrapper causes a "Permission Denied"
      // error in IE
      unloadHandler = function unloadHandler() {
        setDocument();
      };

    // Optimize for push.apply( _, NodeList )
    try {
      push.apply(arr = slice.call(preferredDoc.childNodes), preferredDoc.childNodes);
      // Support: Android<4.0
      // Detect silently failing push.apply
      arr[preferredDoc.childNodes.length].nodeType;
    } catch (e) {
      push = {
        apply: arr.length ?
        // Leverage slice if possible
        function (target, els) {
          push_native.apply(target, slice.call(els));
        } :
        // Support: IE<9
        // Otherwise append directly
        function (target, els) {
          var j = target.length,
            i = 0;
          // Can't trust NodeList.length
          while (target[j++] = els[i++]) {}
          target.length = j - 1;
        }
      };
    }
    function Sizzle(selector, context, results, seed) {
      var m,
        i,
        elem,
        nid,
        nidselect,
        match,
        groups,
        newSelector,
        newContext = context && context.ownerDocument,
        // nodeType defaults to 9, since context defaults to document
        nodeType = context ? context.nodeType : 9;
      results = results || [];

      // Return early from calls with invalid selector or context
      if (typeof selector !== "string" || !selector || nodeType !== 1 && nodeType !== 9 && nodeType !== 11) {
        return results;
      }

      // Try to shortcut find operations (as opposed to filters) in HTML documents
      if (!seed) {
        if ((context ? context.ownerDocument || context : preferredDoc) !== document) {
          setDocument(context);
        }
        context = context || document;
        if (documentIsHTML) {
          // If the selector is sufficiently simple, try using a "get*By*" DOM method
          // (excepting DocumentFragment context, where the methods don't exist)
          if (nodeType !== 11 && (match = rquickExpr.exec(selector))) {
            // ID selector
            if (m = match[1]) {
              // Document context
              if (nodeType === 9) {
                if (elem = context.getElementById(m)) {
                  // Support: IE, Opera, Webkit
                  // TODO: identify versions
                  // getElementById can match elements by name instead of ID
                  if (elem.id === m) {
                    results.push(elem);
                    return results;
                  }
                } else {
                  return results;
                }

                // Element context
              } else {
                // Support: IE, Opera, Webkit
                // TODO: identify versions
                // getElementById can match elements by name instead of ID
                if (newContext && (elem = newContext.getElementById(m)) && contains(context, elem) && elem.id === m) {
                  results.push(elem);
                  return results;
                }
              }

              // Type selector
            } else if (match[2]) {
              push.apply(results, context.getElementsByTagName(selector));
              return results;

              // Class selector
            } else if ((m = match[3]) && support.getElementsByClassName && context.getElementsByClassName) {
              push.apply(results, context.getElementsByClassName(m));
              return results;
            }
          }

          // Take advantage of querySelectorAll
          if (support.qsa && !compilerCache[selector + " "] && (!rbuggyQSA || !rbuggyQSA.test(selector))) {
            if (nodeType !== 1) {
              newContext = context;
              newSelector = selector;

              // qSA looks outside Element context, which is not what we want
              // Thanks to Andrew Dupont for this workaround technique
              // Support: IE <=8
              // Exclude object elements
            } else if (context.nodeName.toLowerCase() !== "object") {
              // Capture the context ID, setting it first if necessary
              if (nid = context.getAttribute("id")) {
                nid = nid.replace(rescape, "\\$&");
              } else {
                context.setAttribute("id", nid = expando);
              }

              // Prefix every selector in the list
              groups = tokenize(selector);
              i = groups.length;
              nidselect = ridentifier.test(nid) ? "#" + nid : "[id='" + nid + "']";
              while (i--) {
                groups[i] = nidselect + " " + toSelector(groups[i]);
              }
              newSelector = groups.join(",");

              // Expand context for sibling selectors
              newContext = rsibling.test(selector) && testContext(context.parentNode) || context;
            }
            if (newSelector) {
              try {
                push.apply(results, newContext.querySelectorAll(newSelector));
                return results;
              } catch (qsaError) {} finally {
                if (nid === expando) {
                  context.removeAttribute("id");
                }
              }
            }
          }
        }
      }

      // All others
      return select(selector.replace(rtrim, "$1"), context, results, seed);
    }

    /**
     * Create key-value caches of limited size
     * @returns {function(string, object)} Returns the Object data after storing it on itself with
     *	property name the (space-suffixed) string and (if the cache is larger than Expr.cacheLength)
     *	deleting the oldest entry
     */
    function createCache() {
      var keys = [];
      function cache(key, value) {
        // Use (key + " ") to avoid collision with native prototype properties (see Issue #157)
        if (keys.push(key + " ") > Expr.cacheLength) {
          // Only keep the most recent entries
          delete cache[keys.shift()];
        }
        return cache[key + " "] = value;
      }
      return cache;
    }

    /**
     * Mark a function for special use by Sizzle
     * @param {Function} fn The function to mark
     */
    function markFunction(fn) {
      fn[expando] = true;
      return fn;
    }

    /**
     * Support testing using an element
     * @param {Function} fn Passed the created div and expects a boolean result
     */
    function assert(fn) {
      var div = document.createElement("div");
      try {
        return !!fn(div);
      } catch (e) {
        return false;
      } finally {
        // Remove from its parent by default
        if (div.parentNode) {
          div.parentNode.removeChild(div);
        }
        // release memory in IE
        div = null;
      }
    }

    /**
     * Adds the same handler for all of the specified attrs
     * @param {String} attrs Pipe-separated list of attributes
     * @param {Function} handler The method that will be applied
     */
    function addHandle(attrs, handler) {
      var arr = attrs.split("|"),
        i = arr.length;
      while (i--) {
        Expr.attrHandle[arr[i]] = handler;
      }
    }

    /**
     * Checks document order of two siblings
     * @param {Element} a
     * @param {Element} b
     * @returns {Number} Returns less than 0 if a precedes b, greater than 0 if a follows b
     */
    function siblingCheck(a, b) {
      var cur = b && a,
        diff = cur && a.nodeType === 1 && b.nodeType === 1 && (~b.sourceIndex || MAX_NEGATIVE) - (~a.sourceIndex || MAX_NEGATIVE);

      // Use IE sourceIndex if available on both nodes
      if (diff) {
        return diff;
      }

      // Check if b follows a
      if (cur) {
        while (cur = cur.nextSibling) {
          if (cur === b) {
            return -1;
          }
        }
      }
      return a ? 1 : -1;
    }

    /**
     * Returns a function to use in pseudos for input types
     * @param {String} type
     */
    function createInputPseudo(type) {
      return function (elem) {
        var name = elem.nodeName.toLowerCase();
        return name === "input" && elem.type === type;
      };
    }

    /**
     * Returns a function to use in pseudos for buttons
     * @param {String} type
     */
    function createButtonPseudo(type) {
      return function (elem) {
        var name = elem.nodeName.toLowerCase();
        return (name === "input" || name === "button") && elem.type === type;
      };
    }

    /**
     * Returns a function to use in pseudos for positionals
     * @param {Function} fn
     */
    function createPositionalPseudo(fn) {
      return markFunction(function (argument) {
        argument = +argument;
        return markFunction(function (seed, matches) {
          var j,
            matchIndexes = fn([], seed.length, argument),
            i = matchIndexes.length;

          // Match elements found at the specified indexes
          while (i--) {
            if (seed[j = matchIndexes[i]]) {
              seed[j] = !(matches[j] = seed[j]);
            }
          }
        });
      });
    }

    /**
     * Checks a node for validity as a Sizzle context
     * @param {Element|Object=} context
     * @returns {Element|Object|Boolean} The input node if acceptable, otherwise a falsy value
     */
    function testContext(context) {
      return context && typeof context.getElementsByTagName !== "undefined" && context;
    }

    // Expose support vars for convenience
    support = Sizzle.support = {};

    /**
     * Detects XML nodes
     * @param {Element|Object} elem An element or a document
     * @returns {Boolean} True iff elem is a non-HTML XML node
     */
    isXML = Sizzle.isXML = function (elem) {
      // documentElement is verified for cases where it doesn't yet exist
      // (such as loading iframes in IE - #4833)
      var documentElement = elem && (elem.ownerDocument || elem).documentElement;
      return documentElement ? documentElement.nodeName !== "HTML" : false;
    };

    /**
     * Sets document-related variables once based on the current document
     * @param {Element|Object} [doc] An element or document object to use to set the document
     * @returns {Object} Returns the current document
     */
    setDocument = Sizzle.setDocument = function (node) {
      var hasCompare,
        parent,
        doc = node ? node.ownerDocument || node : preferredDoc;

      // Return early if doc is invalid or already selected
      if (doc === document || doc.nodeType !== 9 || !doc.documentElement) {
        return document;
      }

      // Update global variables
      document = doc;
      docElem = document.documentElement;
      documentIsHTML = !isXML(document);

      // Support: IE 9-11, Edge
      // Accessing iframe documents after unload throws "permission denied" errors (jQuery #13936)
      if ((parent = document.defaultView) && parent.top !== parent) {
        // Support: IE 11
        if (parent.addEventListener) {
          parent.addEventListener("unload", unloadHandler, false);

          // Support: IE 9 - 10 only
        } else if (parent.attachEvent) {
          parent.attachEvent("onunload", unloadHandler);
        }
      }

      /* Attributes
      ---------------------------------------------------------------------- */

      // Support: IE<8
      // Verify that getAttribute really returns attributes and not properties
      // (excepting IE8 booleans)
      support.attributes = assert(function (div) {
        div.className = "i";
        return !div.getAttribute("className");
      });

      /* getElement(s)By*
      ---------------------------------------------------------------------- */

      // Check if getElementsByTagName("*") returns only elements
      support.getElementsByTagName = assert(function (div) {
        div.appendChild(document.createComment(""));
        return !div.getElementsByTagName("*").length;
      });

      // Support: IE<9
      support.getElementsByClassName = rnative.test(document.getElementsByClassName);

      // Support: IE<10
      // Check if getElementById returns elements by name
      // The broken getElementById methods don't pick up programatically-set names,
      // so use a roundabout getElementsByName test
      support.getById = assert(function (div) {
        docElem.appendChild(div).id = expando;
        return !document.getElementsByName || !document.getElementsByName(expando).length;
      });

      // ID find and filter
      if (support.getById) {
        Expr.find["ID"] = function (id, context) {
          if (typeof context.getElementById !== "undefined" && documentIsHTML) {
            var m = context.getElementById(id);
            return m ? [m] : [];
          }
        };
        Expr.filter["ID"] = function (id) {
          var attrId = id.replace(runescape, funescape);
          return function (elem) {
            return elem.getAttribute("id") === attrId;
          };
        };
      } else {
        // Support: IE6/7
        // getElementById is not reliable as a find shortcut
        delete Expr.find["ID"];
        Expr.filter["ID"] = function (id) {
          var attrId = id.replace(runescape, funescape);
          return function (elem) {
            var node = typeof elem.getAttributeNode !== "undefined" && elem.getAttributeNode("id");
            return node && node.value === attrId;
          };
        };
      }

      // Tag
      Expr.find["TAG"] = support.getElementsByTagName ? function (tag, context) {
        if (typeof context.getElementsByTagName !== "undefined") {
          return context.getElementsByTagName(tag);

          // DocumentFragment nodes don't have gEBTN
        } else if (support.qsa) {
          return context.querySelectorAll(tag);
        }
      } : function (tag, context) {
        var elem,
          tmp = [],
          i = 0,
          // By happy coincidence, a (broken) gEBTN appears on DocumentFragment nodes too
          results = context.getElementsByTagName(tag);

        // Filter out possible comments
        if (tag === "*") {
          while (elem = results[i++]) {
            if (elem.nodeType === 1) {
              tmp.push(elem);
            }
          }
          return tmp;
        }
        return results;
      };

      // Class
      Expr.find["CLASS"] = support.getElementsByClassName && function (className, context) {
        if (typeof context.getElementsByClassName !== "undefined" && documentIsHTML) {
          return context.getElementsByClassName(className);
        }
      };

      /* QSA/matchesSelector
      ---------------------------------------------------------------------- */

      // QSA and matchesSelector support

      // matchesSelector(:active) reports false when true (IE9/Opera 11.5)
      rbuggyMatches = [];

      // qSa(:focus) reports false when true (Chrome 21)
      // We allow this because of a bug in IE8/9 that throws an error
      // whenever `document.activeElement` is accessed on an iframe
      // So, we allow :focus to pass through QSA all the time to avoid the IE error
      // See http://bugs.jquery.com/ticket/13378
      rbuggyQSA = [];
      if (support.qsa = rnative.test(document.querySelectorAll)) {
        // Build QSA regex
        // Regex strategy adopted from Diego Perini
        assert(function (div) {
          // Select is set to empty string on purpose
          // This is to test IE's treatment of not explicitly
          // setting a boolean content attribute,
          // since its presence should be enough
          // http://bugs.jquery.com/ticket/12359
          docElem.appendChild(div).innerHTML = "<a id='" + expando + "'></a>" + "<select id='" + expando + "-\r\\' msallowcapture=''>" + "<option selected=''></option></select>";

          // Support: IE8, Opera 11-12.16
          // Nothing should be selected when empty strings follow ^= or $= or *=
          // The test attribute must be unknown in Opera but "safe" for WinRT
          // http://msdn.microsoft.com/en-us/library/ie/hh465388.aspx#attribute_section
          if (div.querySelectorAll("[msallowcapture^='']").length) {
            rbuggyQSA.push("[*^$]=" + whitespace + "*(?:''|\"\")");
          }

          // Support: IE8
          // Boolean attributes and "value" are not treated correctly
          if (!div.querySelectorAll("[selected]").length) {
            rbuggyQSA.push("\\[" + whitespace + "*(?:value|" + booleans + ")");
          }

          // Support: Chrome<29, Android<4.4, Safari<7.0+, iOS<7.0+, PhantomJS<1.9.8+
          if (!div.querySelectorAll("[id~=" + expando + "-]").length) {
            rbuggyQSA.push("~=");
          }

          // Webkit/Opera - :checked should return selected option elements
          // http://www.w3.org/TR/2011/REC-css3-selectors-20110929/#checked
          // IE8 throws error here and will not see later tests
          if (!div.querySelectorAll(":checked").length) {
            rbuggyQSA.push(":checked");
          }

          // Support: Safari 8+, iOS 8+
          // https://bugs.webkit.org/show_bug.cgi?id=136851
          // In-page `selector#id sibing-combinator selector` fails
          if (!div.querySelectorAll("a#" + expando + "+*").length) {
            rbuggyQSA.push(".#.+[+~]");
          }
        });
        assert(function (div) {
          // Support: Windows 8 Native Apps
          // The type and name attributes are restricted during .innerHTML assignment
          var input = document.createElement("input");
          input.setAttribute("type", "hidden");
          div.appendChild(input).setAttribute("name", "D");

          // Support: IE8
          // Enforce case-sensitivity of name attribute
          if (div.querySelectorAll("[name=d]").length) {
            rbuggyQSA.push("name" + whitespace + "*[*^$|!~]?=");
          }

          // FF 3.5 - :enabled/:disabled and hidden elements (hidden elements are still enabled)
          // IE8 throws error here and will not see later tests
          if (!div.querySelectorAll(":enabled").length) {
            rbuggyQSA.push(":enabled", ":disabled");
          }

          // Opera 10-11 does not throw on post-comma invalid pseudos
          div.querySelectorAll("*,:x");
          rbuggyQSA.push(",.*:");
        });
      }
      if (support.matchesSelector = rnative.test(matches = docElem.matches || docElem.webkitMatchesSelector || docElem.mozMatchesSelector || docElem.oMatchesSelector || docElem.msMatchesSelector)) {
        assert(function (div) {
          // Check to see if it's possible to do matchesSelector
          // on a disconnected node (IE 9)
          support.disconnectedMatch = matches.call(div, "div");

          // This should fail with an exception
          // Gecko does not error, returns false instead
          matches.call(div, "[s!='']:x");
          rbuggyMatches.push("!=", pseudos);
        });
      }
      rbuggyQSA = rbuggyQSA.length && new RegExp(rbuggyQSA.join("|"));
      rbuggyMatches = rbuggyMatches.length && new RegExp(rbuggyMatches.join("|"));

      /* Contains
      ---------------------------------------------------------------------- */
      hasCompare = rnative.test(docElem.compareDocumentPosition);

      // Element contains another
      // Purposefully self-exclusive
      // As in, an element does not contain itself
      contains = hasCompare || rnative.test(docElem.contains) ? function (a, b) {
        var adown = a.nodeType === 9 ? a.documentElement : a,
          bup = b && b.parentNode;
        return a === bup || !!(bup && bup.nodeType === 1 && (adown.contains ? adown.contains(bup) : a.compareDocumentPosition && a.compareDocumentPosition(bup) & 16));
      } : function (a, b) {
        if (b) {
          while (b = b.parentNode) {
            if (b === a) {
              return true;
            }
          }
        }
        return false;
      };

      /* Sorting
      ---------------------------------------------------------------------- */

      // Document order sorting
      sortOrder = hasCompare ? function (a, b) {
        // Flag for duplicate removal
        if (a === b) {
          hasDuplicate = true;
          return 0;
        }

        // Sort on method existence if only one input has compareDocumentPosition
        var compare = !a.compareDocumentPosition - !b.compareDocumentPosition;
        if (compare) {
          return compare;
        }

        // Calculate position if both inputs belong to the same document
        compare = (a.ownerDocument || a) === (b.ownerDocument || b) ? a.compareDocumentPosition(b) :
        // Otherwise we know they are disconnected
        1;

        // Disconnected nodes
        if (compare & 1 || !support.sortDetached && b.compareDocumentPosition(a) === compare) {
          // Choose the first element that is related to our preferred document
          if (a === document || a.ownerDocument === preferredDoc && contains(preferredDoc, a)) {
            return -1;
          }
          if (b === document || b.ownerDocument === preferredDoc && contains(preferredDoc, b)) {
            return 1;
          }

          // Maintain original order
          return sortInput ? indexOf(sortInput, a) - indexOf(sortInput, b) : 0;
        }
        return compare & 4 ? -1 : 1;
      } : function (a, b) {
        // Exit early if the nodes are identical
        if (a === b) {
          hasDuplicate = true;
          return 0;
        }
        var cur,
          i = 0,
          aup = a.parentNode,
          bup = b.parentNode,
          ap = [a],
          bp = [b];

        // Parentless nodes are either documents or disconnected
        if (!aup || !bup) {
          return a === document ? -1 : b === document ? 1 : aup ? -1 : bup ? 1 : sortInput ? indexOf(sortInput, a) - indexOf(sortInput, b) : 0;

          // If the nodes are siblings, we can do a quick check
        } else if (aup === bup) {
          return siblingCheck(a, b);
        }

        // Otherwise we need full lists of their ancestors for comparison
        cur = a;
        while (cur = cur.parentNode) {
          ap.unshift(cur);
        }
        cur = b;
        while (cur = cur.parentNode) {
          bp.unshift(cur);
        }

        // Walk down the tree looking for a discrepancy
        while (ap[i] === bp[i]) {
          i++;
        }
        return i ?
        // Do a sibling check if the nodes have a common ancestor
        siblingCheck(ap[i], bp[i]) :
        // Otherwise nodes in our document sort first
        ap[i] === preferredDoc ? -1 : bp[i] === preferredDoc ? 1 : 0;
      };
      return document;
    };
    Sizzle.matches = function (expr, elements) {
      return Sizzle(expr, null, null, elements);
    };
    Sizzle.matchesSelector = function (elem, expr) {
      // Set document vars if needed
      if ((elem.ownerDocument || elem) !== document) {
        setDocument(elem);
      }

      // Make sure that attribute selectors are quoted
      expr = expr.replace(rattributeQuotes, "='$1']");
      if (support.matchesSelector && documentIsHTML && !compilerCache[expr + " "] && (!rbuggyMatches || !rbuggyMatches.test(expr)) && (!rbuggyQSA || !rbuggyQSA.test(expr))) {
        try {
          var ret = matches.call(elem, expr);

          // IE 9's matchesSelector returns false on disconnected nodes
          if (ret || support.disconnectedMatch ||
          // As well, disconnected nodes are said to be in a document
          // fragment in IE 9
          elem.document && elem.document.nodeType !== 11) {
            return ret;
          }
        } catch (e) {}
      }
      return Sizzle(expr, document, null, [elem]).length > 0;
    };
    Sizzle.contains = function (context, elem) {
      // Set document vars if needed
      if ((context.ownerDocument || context) !== document) {
        setDocument(context);
      }
      return contains(context, elem);
    };
    Sizzle.attr = function (elem, name) {
      // Set document vars if needed
      if ((elem.ownerDocument || elem) !== document) {
        setDocument(elem);
      }
      var fn = Expr.attrHandle[name.toLowerCase()],
        // Don't get fooled by Object.prototype properties (jQuery #13807)
        val = fn && hasOwn.call(Expr.attrHandle, name.toLowerCase()) ? fn(elem, name, !documentIsHTML) : undefined;
      return val !== undefined ? val : support.attributes || !documentIsHTML ? elem.getAttribute(name) : (val = elem.getAttributeNode(name)) && val.specified ? val.value : null;
    };
    Sizzle.error = function (msg) {
      throw new Error("Syntax error, unrecognized expression: " + msg);
    };

    /**
     * Document sorting and removing duplicates
     * @param {ArrayLike} results
     */
    Sizzle.uniqueSort = function (results) {
      var elem,
        duplicates = [],
        j = 0,
        i = 0;

      // Unless we *know* we can detect duplicates, assume their presence
      hasDuplicate = !support.detectDuplicates;
      sortInput = !support.sortStable && results.slice(0);
      results.sort(sortOrder);
      if (hasDuplicate) {
        while (elem = results[i++]) {
          if (elem === results[i]) {
            j = duplicates.push(i);
          }
        }
        while (j--) {
          results.splice(duplicates[j], 1);
        }
      }

      // Clear input after sorting to release objects
      // See https://github.com/jquery/sizzle/pull/225
      sortInput = null;
      return results;
    };

    /**
     * Utility function for retrieving the text value of an array of DOM nodes
     * @param {Array|Element} elem
     */
    getText = Sizzle.getText = function (elem) {
      var node,
        ret = "",
        i = 0,
        nodeType = elem.nodeType;
      if (!nodeType) {
        // If no nodeType, this is expected to be an array
        while (node = elem[i++]) {
          // Do not traverse comment nodes
          ret += getText(node);
        }
      } else if (nodeType === 1 || nodeType === 9 || nodeType === 11) {
        // Use textContent for elements
        // innerText usage removed for consistency of new lines (jQuery #11153)
        if (typeof elem.textContent === "string") {
          return elem.textContent;
        } else {
          // Traverse its children
          for (elem = elem.firstChild; elem; elem = elem.nextSibling) {
            ret += getText(elem);
          }
        }
      } else if (nodeType === 3 || nodeType === 4) {
        return elem.nodeValue;
      }
      // Do not include comment or processing instruction nodes

      return ret;
    };
    Expr = Sizzle.selectors = {
      // Can be adjusted by the user
      cacheLength: 50,
      createPseudo: markFunction,
      match: matchExpr,
      attrHandle: {},
      find: {},
      relative: {
        ">": {
          dir: "parentNode",
          first: true
        },
        " ": {
          dir: "parentNode"
        },
        "+": {
          dir: "previousSibling",
          first: true
        },
        "~": {
          dir: "previousSibling"
        }
      },
      preFilter: {
        "ATTR": function ATTR(match) {
          match[1] = match[1].replace(runescape, funescape);

          // Move the given value to match[3] whether quoted or unquoted
          match[3] = (match[3] || match[4] || match[5] || "").replace(runescape, funescape);
          if (match[2] === "~=") {
            match[3] = " " + match[3] + " ";
          }
          return match.slice(0, 4);
        },
        "CHILD": function CHILD(match) {
          /* matches from matchExpr["CHILD"]
          	1 type (only|nth|...)
          	2 what (child|of-type)
          	3 argument (even|odd|\d*|\d*n([+-]\d+)?|...)
          	4 xn-component of xn+y argument ([+-]?\d*n|)
          	5 sign of xn-component
          	6 x of xn-component
          	7 sign of y-component
          	8 y of y-component
          */
          match[1] = match[1].toLowerCase();
          if (match[1].slice(0, 3) === "nth") {
            // nth-* requires argument
            if (!match[3]) {
              Sizzle.error(match[0]);
            }

            // numeric x and y parameters for Expr.filter.CHILD
            // remember that false/true cast respectively to 0/1
            match[4] = +(match[4] ? match[5] + (match[6] || 1) : 2 * (match[3] === "even" || match[3] === "odd"));
            match[5] = +(match[7] + match[8] || match[3] === "odd");

            // other types prohibit arguments
          } else if (match[3]) {
            Sizzle.error(match[0]);
          }
          return match;
        },
        "PSEUDO": function PSEUDO(match) {
          var excess,
            unquoted = !match[6] && match[2];
          if (matchExpr["CHILD"].test(match[0])) {
            return null;
          }

          // Accept quoted arguments as-is
          if (match[3]) {
            match[2] = match[4] || match[5] || "";

            // Strip excess characters from unquoted arguments
          } else if (unquoted && rpseudo.test(unquoted) && (
          // Get excess from tokenize (recursively)
          excess = tokenize(unquoted, true)) && (
          // advance to the next closing parenthesis
          excess = unquoted.indexOf(")", unquoted.length - excess) - unquoted.length)) {
            // excess is a negative index
            match[0] = match[0].slice(0, excess);
            match[2] = unquoted.slice(0, excess);
          }

          // Return only captures needed by the pseudo filter method (type and argument)
          return match.slice(0, 3);
        }
      },
      filter: {
        "TAG": function TAG(nodeNameSelector) {
          var nodeName = nodeNameSelector.replace(runescape, funescape).toLowerCase();
          return nodeNameSelector === "*" ? function () {
            return true;
          } : function (elem) {
            return elem.nodeName && elem.nodeName.toLowerCase() === nodeName;
          };
        },
        "CLASS": function CLASS(className) {
          var pattern = classCache[className + " "];
          return pattern || (pattern = new RegExp("(^|" + whitespace + ")" + className + "(" + whitespace + "|$)")) && classCache(className, function (elem) {
            return pattern.test(typeof elem.className === "string" && elem.className || typeof elem.getAttribute !== "undefined" && elem.getAttribute("class") || "");
          });
        },
        "ATTR": function ATTR(name, operator, check) {
          return function (elem) {
            var result = Sizzle.attr(elem, name);
            if (result == null) {
              return operator === "!=";
            }
            if (!operator) {
              return true;
            }
            result += "";
            return operator === "=" ? result === check : operator === "!=" ? result !== check : operator === "^=" ? check && result.indexOf(check) === 0 : operator === "*=" ? check && result.indexOf(check) > -1 : operator === "$=" ? check && result.slice(-check.length) === check : operator === "~=" ? (" " + result.replace(rwhitespace, " ") + " ").indexOf(check) > -1 : operator === "|=" ? result === check || result.slice(0, check.length + 1) === check + "-" : false;
          };
        },
        "CHILD": function CHILD(type, what, argument, first, last) {
          var simple = type.slice(0, 3) !== "nth",
            forward = type.slice(-4) !== "last",
            ofType = what === "of-type";
          return first === 1 && last === 0 ?
          // Shortcut for :nth-*(n)
          function (elem) {
            return !!elem.parentNode;
          } : function (elem, context, xml) {
            var cache,
              uniqueCache,
              outerCache,
              node,
              nodeIndex,
              start,
              dir = simple !== forward ? "nextSibling" : "previousSibling",
              parent = elem.parentNode,
              name = ofType && elem.nodeName.toLowerCase(),
              useCache = !xml && !ofType,
              diff = false;
            if (parent) {
              // :(first|last|only)-(child|of-type)
              if (simple) {
                while (dir) {
                  node = elem;
                  while (node = node[dir]) {
                    if (ofType ? node.nodeName.toLowerCase() === name : node.nodeType === 1) {
                      return false;
                    }
                  }
                  // Reverse direction for :only-* (if we haven't yet done so)
                  start = dir = type === "only" && !start && "nextSibling";
                }
                return true;
              }
              start = [forward ? parent.firstChild : parent.lastChild];

              // non-xml :nth-child(...) stores cache data on `parent`
              if (forward && useCache) {
                // Seek `elem` from a previously-cached index

                // ...in a gzip-friendly way
                node = parent;
                outerCache = node[expando] || (node[expando] = {});

                // Support: IE <9 only
                // Defend against cloned attroperties (jQuery gh-1709)
                uniqueCache = outerCache[node.uniqueID] || (outerCache[node.uniqueID] = {});
                cache = uniqueCache[type] || [];
                nodeIndex = cache[0] === dirruns && cache[1];
                diff = nodeIndex && cache[2];
                node = nodeIndex && parent.childNodes[nodeIndex];
                while (node = ++nodeIndex && node && node[dir] || (
                // Fallback to seeking `elem` from the start
                diff = nodeIndex = 0) || start.pop()) {
                  // When found, cache indexes on `parent` and break
                  if (node.nodeType === 1 && ++diff && node === elem) {
                    uniqueCache[type] = [dirruns, nodeIndex, diff];
                    break;
                  }
                }
              } else {
                // Use previously-cached element index if available
                if (useCache) {
                  // ...in a gzip-friendly way
                  node = elem;
                  outerCache = node[expando] || (node[expando] = {});

                  // Support: IE <9 only
                  // Defend against cloned attroperties (jQuery gh-1709)
                  uniqueCache = outerCache[node.uniqueID] || (outerCache[node.uniqueID] = {});
                  cache = uniqueCache[type] || [];
                  nodeIndex = cache[0] === dirruns && cache[1];
                  diff = nodeIndex;
                }

                // xml :nth-child(...)
                // or :nth-last-child(...) or :nth(-last)?-of-type(...)
                if (diff === false) {
                  // Use the same loop as above to seek `elem` from the start
                  while (node = ++nodeIndex && node && node[dir] || (diff = nodeIndex = 0) || start.pop()) {
                    if ((ofType ? node.nodeName.toLowerCase() === name : node.nodeType === 1) && ++diff) {
                      // Cache the index of each encountered element
                      if (useCache) {
                        outerCache = node[expando] || (node[expando] = {});

                        // Support: IE <9 only
                        // Defend against cloned attroperties (jQuery gh-1709)
                        uniqueCache = outerCache[node.uniqueID] || (outerCache[node.uniqueID] = {});
                        uniqueCache[type] = [dirruns, diff];
                      }
                      if (node === elem) {
                        break;
                      }
                    }
                  }
                }
              }

              // Incorporate the offset, then check against cycle size
              diff -= last;
              return diff === first || diff % first === 0 && diff / first >= 0;
            }
          };
        },
        "PSEUDO": function PSEUDO(pseudo, argument) {
          // pseudo-class names are case-insensitive
          // http://www.w3.org/TR/selectors/#pseudo-classes
          // Prioritize by case sensitivity in case custom pseudos are added with uppercase letters
          // Remember that setFilters inherits from pseudos
          var args,
            fn = Expr.pseudos[pseudo] || Expr.setFilters[pseudo.toLowerCase()] || Sizzle.error("unsupported pseudo: " + pseudo);

          // The user may use createPseudo to indicate that
          // arguments are needed to create the filter function
          // just as Sizzle does
          if (fn[expando]) {
            return fn(argument);
          }

          // But maintain support for old signatures
          if (fn.length > 1) {
            args = [pseudo, pseudo, "", argument];
            return Expr.setFilters.hasOwnProperty(pseudo.toLowerCase()) ? markFunction(function (seed, matches) {
              var idx,
                matched = fn(seed, argument),
                i = matched.length;
              while (i--) {
                idx = indexOf(seed, matched[i]);
                seed[idx] = !(matches[idx] = matched[i]);
              }
            }) : function (elem) {
              return fn(elem, 0, args);
            };
          }
          return fn;
        }
      },
      pseudos: {
        // Potentially complex pseudos
        "not": markFunction(function (selector) {
          // Trim the selector passed to compile
          // to avoid treating leading and trailing
          // spaces as combinators
          var input = [],
            results = [],
            matcher = compile(selector.replace(rtrim, "$1"));
          return matcher[expando] ? markFunction(function (seed, matches, context, xml) {
            var elem,
              unmatched = matcher(seed, null, xml, []),
              i = seed.length;

            // Match elements unmatched by `matcher`
            while (i--) {
              if (elem = unmatched[i]) {
                seed[i] = !(matches[i] = elem);
              }
            }
          }) : function (elem, context, xml) {
            input[0] = elem;
            matcher(input, null, xml, results);
            // Don't keep the element (issue #299)
            input[0] = null;
            return !results.pop();
          };
        }),
        "has": markFunction(function (selector) {
          return function (elem) {
            return Sizzle(selector, elem).length > 0;
          };
        }),
        "contains": markFunction(function (text) {
          text = text.replace(runescape, funescape);
          return function (elem) {
            return (elem.textContent || elem.innerText || getText(elem)).indexOf(text) > -1;
          };
        }),
        // "Whether an element is represented by a :lang() selector
        // is based solely on the element's language value
        // being equal to the identifier C,
        // or beginning with the identifier C immediately followed by "-".
        // The matching of C against the element's language value is performed case-insensitively.
        // The identifier C does not have to be a valid language name."
        // http://www.w3.org/TR/selectors/#lang-pseudo
        "lang": markFunction(function (lang) {
          // lang value must be a valid identifier
          if (!ridentifier.test(lang || "")) {
            Sizzle.error("unsupported lang: " + lang);
          }
          lang = lang.replace(runescape, funescape).toLowerCase();
          return function (elem) {
            var elemLang;
            do {
              if (elemLang = documentIsHTML ? elem.lang : elem.getAttribute("xml:lang") || elem.getAttribute("lang")) {
                elemLang = elemLang.toLowerCase();
                return elemLang === lang || elemLang.indexOf(lang + "-") === 0;
              }
            } while ((elem = elem.parentNode) && elem.nodeType === 1);
            return false;
          };
        }),
        // Miscellaneous
        "target": function target(elem) {
          var hash = window.location && window.location.hash;
          return hash && hash.slice(1) === elem.id;
        },
        "root": function root(elem) {
          return elem === docElem;
        },
        "focus": function focus(elem) {
          return elem === document.activeElement && (!document.hasFocus || document.hasFocus()) && !!(elem.type || elem.href || ~elem.tabIndex);
        },
        // Boolean properties
        "enabled": function enabled(elem) {
          return elem.disabled === false;
        },
        "disabled": function disabled(elem) {
          return elem.disabled === true;
        },
        "checked": function checked(elem) {
          // In CSS3, :checked should return both checked and selected elements
          // http://www.w3.org/TR/2011/REC-css3-selectors-20110929/#checked
          var nodeName = elem.nodeName.toLowerCase();
          return nodeName === "input" && !!elem.checked || nodeName === "option" && !!elem.selected;
        },
        "selected": function selected(elem) {
          // Accessing this property makes selected-by-default
          // options in Safari work properly
          if (elem.parentNode) {
            elem.parentNode.selectedIndex;
          }
          return elem.selected === true;
        },
        // Contents
        "empty": function empty(elem) {
          // http://www.w3.org/TR/selectors/#empty-pseudo
          // :empty is negated by element (1) or content nodes (text: 3; cdata: 4; entity ref: 5),
          //   but not by others (comment: 8; processing instruction: 7; etc.)
          // nodeType < 6 works because attributes (2) do not appear as children
          for (elem = elem.firstChild; elem; elem = elem.nextSibling) {
            if (elem.nodeType < 6) {
              return false;
            }
          }
          return true;
        },
        "parent": function parent(elem) {
          return !Expr.pseudos["empty"](elem);
        },
        // Element/input types
        "header": function header(elem) {
          return rheader.test(elem.nodeName);
        },
        "input": function input(elem) {
          return rinputs.test(elem.nodeName);
        },
        "button": function button(elem) {
          var name = elem.nodeName.toLowerCase();
          return name === "input" && elem.type === "button" || name === "button";
        },
        "text": function text(elem) {
          var attr;
          return elem.nodeName.toLowerCase() === "input" && elem.type === "text" && (
          // Support: IE<8
          // New HTML5 attribute values (e.g., "search") appear with elem.type === "text"
          (attr = elem.getAttribute("type")) == null || attr.toLowerCase() === "text");
        },
        // Position-in-collection
        "first": createPositionalPseudo(function () {
          return [0];
        }),
        "last": createPositionalPseudo(function (matchIndexes, length) {
          return [length - 1];
        }),
        "eq": createPositionalPseudo(function (matchIndexes, length, argument) {
          return [argument < 0 ? argument + length : argument];
        }),
        "even": createPositionalPseudo(function (matchIndexes, length) {
          var i = 0;
          for (; i < length; i += 2) {
            matchIndexes.push(i);
          }
          return matchIndexes;
        }),
        "odd": createPositionalPseudo(function (matchIndexes, length) {
          var i = 1;
          for (; i < length; i += 2) {
            matchIndexes.push(i);
          }
          return matchIndexes;
        }),
        "lt": createPositionalPseudo(function (matchIndexes, length, argument) {
          var i = argument < 0 ? argument + length : argument;
          for (; --i >= 0;) {
            matchIndexes.push(i);
          }
          return matchIndexes;
        }),
        "gt": createPositionalPseudo(function (matchIndexes, length, argument) {
          var i = argument < 0 ? argument + length : argument;
          for (; ++i < length;) {
            matchIndexes.push(i);
          }
          return matchIndexes;
        })
      }
    };
    Expr.pseudos["nth"] = Expr.pseudos["eq"];

    // Add button/input type pseudos
    for (i in {
      radio: true,
      checkbox: true,
      file: true,
      password: true,
      image: true
    }) {
      Expr.pseudos[i] = createInputPseudo(i);
    }
    for (i in {
      submit: true,
      reset: true
    }) {
      Expr.pseudos[i] = createButtonPseudo(i);
    }

    // Easy API for creating new setFilters
    function setFilters() {}
    setFilters.prototype = Expr.filters = Expr.pseudos;
    Expr.setFilters = new setFilters();
    tokenize = Sizzle.tokenize = function (selector, parseOnly) {
      var matched,
        match,
        tokens,
        type,
        soFar,
        groups,
        preFilters,
        cached = tokenCache[selector + " "];
      if (cached) {
        return parseOnly ? 0 : cached.slice(0);
      }
      soFar = selector;
      groups = [];
      preFilters = Expr.preFilter;
      while (soFar) {
        // Comma and first run
        if (!matched || (match = rcomma.exec(soFar))) {
          if (match) {
            // Don't consume trailing commas as valid
            soFar = soFar.slice(match[0].length) || soFar;
          }
          groups.push(tokens = []);
        }
        matched = false;

        // Combinators
        if (match = rcombinators.exec(soFar)) {
          matched = match.shift();
          tokens.push({
            value: matched,
            // Cast descendant combinators to space
            type: match[0].replace(rtrim, " ")
          });
          soFar = soFar.slice(matched.length);
        }

        // Filters
        for (type in Expr.filter) {
          if ((match = matchExpr[type].exec(soFar)) && (!preFilters[type] || (match = preFilters[type](match)))) {
            matched = match.shift();
            tokens.push({
              value: matched,
              type: type,
              matches: match
            });
            soFar = soFar.slice(matched.length);
          }
        }
        if (!matched) {
          break;
        }
      }

      // Return the length of the invalid excess
      // if we're just parsing
      // Otherwise, throw an error or return tokens
      return parseOnly ? soFar.length : soFar ? Sizzle.error(selector) :
      // Cache the tokens
      tokenCache(selector, groups).slice(0);
    };
    function toSelector(tokens) {
      var i = 0,
        len = tokens.length,
        selector = "";
      for (; i < len; i++) {
        selector += tokens[i].value;
      }
      return selector;
    }
    function addCombinator(matcher, combinator, base) {
      var dir = combinator.dir,
        checkNonElements = base && dir === "parentNode",
        doneName = done++;
      return combinator.first ?
      // Check against closest ancestor/preceding element
      function (elem, context, xml) {
        while (elem = elem[dir]) {
          if (elem.nodeType === 1 || checkNonElements) {
            return matcher(elem, context, xml);
          }
        }
      } :
      // Check against all ancestor/preceding elements
      function (elem, context, xml) {
        var oldCache,
          uniqueCache,
          outerCache,
          newCache = [dirruns, doneName];

        // We can't set arbitrary data on XML nodes, so they don't benefit from combinator caching
        if (xml) {
          while (elem = elem[dir]) {
            if (elem.nodeType === 1 || checkNonElements) {
              if (matcher(elem, context, xml)) {
                return true;
              }
            }
          }
        } else {
          while (elem = elem[dir]) {
            if (elem.nodeType === 1 || checkNonElements) {
              outerCache = elem[expando] || (elem[expando] = {});

              // Support: IE <9 only
              // Defend against cloned attroperties (jQuery gh-1709)
              uniqueCache = outerCache[elem.uniqueID] || (outerCache[elem.uniqueID] = {});
              if ((oldCache = uniqueCache[dir]) && oldCache[0] === dirruns && oldCache[1] === doneName) {
                // Assign to newCache so results back-propagate to previous elements
                return newCache[2] = oldCache[2];
              } else {
                // Reuse newcache so results back-propagate to previous elements
                uniqueCache[dir] = newCache;

                // A match means we're done; a fail means we have to keep checking
                if (newCache[2] = matcher(elem, context, xml)) {
                  return true;
                }
              }
            }
          }
        }
      };
    }
    function elementMatcher(matchers) {
      return matchers.length > 1 ? function (elem, context, xml) {
        var i = matchers.length;
        while (i--) {
          if (!matchers[i](elem, context, xml)) {
            return false;
          }
        }
        return true;
      } : matchers[0];
    }
    function multipleContexts(selector, contexts, results) {
      var i = 0,
        len = contexts.length;
      for (; i < len; i++) {
        Sizzle(selector, contexts[i], results);
      }
      return results;
    }
    function condense(unmatched, map, filter, context, xml) {
      var elem,
        newUnmatched = [],
        i = 0,
        len = unmatched.length,
        mapped = map != null;
      for (; i < len; i++) {
        if (elem = unmatched[i]) {
          if (!filter || filter(elem, context, xml)) {
            newUnmatched.push(elem);
            if (mapped) {
              map.push(i);
            }
          }
        }
      }
      return newUnmatched;
    }
    function setMatcher(preFilter, selector, matcher, postFilter, postFinder, postSelector) {
      if (postFilter && !postFilter[expando]) {
        postFilter = setMatcher(postFilter);
      }
      if (postFinder && !postFinder[expando]) {
        postFinder = setMatcher(postFinder, postSelector);
      }
      return markFunction(function (seed, results, context, xml) {
        var temp,
          i,
          elem,
          preMap = [],
          postMap = [],
          preexisting = results.length,
          // Get initial elements from seed or context
          elems = seed || multipleContexts(selector || "*", context.nodeType ? [context] : context, []),
          // Prefilter to get matcher input, preserving a map for seed-results synchronization
          matcherIn = preFilter && (seed || !selector) ? condense(elems, preMap, preFilter, context, xml) : elems,
          matcherOut = matcher ?
          // If we have a postFinder, or filtered seed, or non-seed postFilter or preexisting results,
          postFinder || (seed ? preFilter : preexisting || postFilter) ?
          // ...intermediate processing is necessary
          [] :
          // ...otherwise use results directly
          results : matcherIn;

        // Find primary matches
        if (matcher) {
          matcher(matcherIn, matcherOut, context, xml);
        }

        // Apply postFilter
        if (postFilter) {
          temp = condense(matcherOut, postMap);
          postFilter(temp, [], context, xml);

          // Un-match failing elements by moving them back to matcherIn
          i = temp.length;
          while (i--) {
            if (elem = temp[i]) {
              matcherOut[postMap[i]] = !(matcherIn[postMap[i]] = elem);
            }
          }
        }
        if (seed) {
          if (postFinder || preFilter) {
            if (postFinder) {
              // Get the final matcherOut by condensing this intermediate into postFinder contexts
              temp = [];
              i = matcherOut.length;
              while (i--) {
                if (elem = matcherOut[i]) {
                  // Restore matcherIn since elem is not yet a final match
                  temp.push(matcherIn[i] = elem);
                }
              }
              postFinder(null, matcherOut = [], temp, xml);
            }

            // Move matched elements from seed to results to keep them synchronized
            i = matcherOut.length;
            while (i--) {
              if ((elem = matcherOut[i]) && (temp = postFinder ? indexOf(seed, elem) : preMap[i]) > -1) {
                seed[temp] = !(results[temp] = elem);
              }
            }
          }

          // Add elements to results, through postFinder if defined
        } else {
          matcherOut = condense(matcherOut === results ? matcherOut.splice(preexisting, matcherOut.length) : matcherOut);
          if (postFinder) {
            postFinder(null, results, matcherOut, xml);
          } else {
            push.apply(results, matcherOut);
          }
        }
      });
    }
    function matcherFromTokens(tokens) {
      var checkContext,
        matcher,
        j,
        len = tokens.length,
        leadingRelative = Expr.relative[tokens[0].type],
        implicitRelative = leadingRelative || Expr.relative[" "],
        i = leadingRelative ? 1 : 0,
        // The foundational matcher ensures that elements are reachable from top-level context(s)
        matchContext = addCombinator(function (elem) {
          return elem === checkContext;
        }, implicitRelative, true),
        matchAnyContext = addCombinator(function (elem) {
          return indexOf(checkContext, elem) > -1;
        }, implicitRelative, true),
        matchers = [function (elem, context, xml) {
          var ret = !leadingRelative && (xml || context !== outermostContext) || ((checkContext = context).nodeType ? matchContext(elem, context, xml) : matchAnyContext(elem, context, xml));
          // Avoid hanging onto element (issue #299)
          checkContext = null;
          return ret;
        }];
      for (; i < len; i++) {
        if (matcher = Expr.relative[tokens[i].type]) {
          matchers = [addCombinator(elementMatcher(matchers), matcher)];
        } else {
          matcher = Expr.filter[tokens[i].type].apply(null, tokens[i].matches);

          // Return special upon seeing a positional matcher
          if (matcher[expando]) {
            // Find the next relative operator (if any) for proper handling
            j = ++i;
            for (; j < len; j++) {
              if (Expr.relative[tokens[j].type]) {
                break;
              }
            }
            return setMatcher(i > 1 && elementMatcher(matchers), i > 1 && toSelector(
            // If the preceding token was a descendant combinator, insert an implicit any-element `*`
            tokens.slice(0, i - 1).concat({
              value: tokens[i - 2].type === " " ? "*" : ""
            })).replace(rtrim, "$1"), matcher, i < j && matcherFromTokens(tokens.slice(i, j)), j < len && matcherFromTokens(tokens = tokens.slice(j)), j < len && toSelector(tokens));
          }
          matchers.push(matcher);
        }
      }
      return elementMatcher(matchers);
    }
    function matcherFromGroupMatchers(elementMatchers, setMatchers) {
      var bySet = setMatchers.length > 0,
        byElement = elementMatchers.length > 0,
        superMatcher = function superMatcher(seed, context, xml, results, outermost) {
          var elem,
            j,
            matcher,
            matchedCount = 0,
            i = "0",
            unmatched = seed && [],
            setMatched = [],
            contextBackup = outermostContext,
            // We must always have either seed elements or outermost context
            elems = seed || byElement && Expr.find["TAG"]("*", outermost),
            // Use integer dirruns iff this is the outermost matcher
            dirrunsUnique = dirruns += contextBackup == null ? 1 : Math.random() || 0.1,
            len = elems.length;
          if (outermost) {
            outermostContext = context === document || context || outermost;
          }

          // Add elements passing elementMatchers directly to results
          // Support: IE<9, Safari
          // Tolerate NodeList properties (IE: "length"; Safari: <number>) matching elements by id
          for (; i !== len && (elem = elems[i]) != null; i++) {
            if (byElement && elem) {
              j = 0;
              if (!context && elem.ownerDocument !== document) {
                setDocument(elem);
                xml = !documentIsHTML;
              }
              while (matcher = elementMatchers[j++]) {
                if (matcher(elem, context || document, xml)) {
                  results.push(elem);
                  break;
                }
              }
              if (outermost) {
                dirruns = dirrunsUnique;
              }
            }

            // Track unmatched elements for set filters
            if (bySet) {
              // They will have gone through all possible matchers
              if (elem = !matcher && elem) {
                matchedCount--;
              }

              // Lengthen the array for every element, matched or not
              if (seed) {
                unmatched.push(elem);
              }
            }
          }

          // `i` is now the count of elements visited above, and adding it to `matchedCount`
          // makes the latter nonnegative.
          matchedCount += i;

          // Apply set filters to unmatched elements
          // NOTE: This can be skipped if there are no unmatched elements (i.e., `matchedCount`
          // equals `i`), unless we didn't visit _any_ elements in the above loop because we have
          // no element matchers and no seed.
          // Incrementing an initially-string "0" `i` allows `i` to remain a string only in that
          // case, which will result in a "00" `matchedCount` that differs from `i` but is also
          // numerically zero.
          if (bySet && i !== matchedCount) {
            j = 0;
            while (matcher = setMatchers[j++]) {
              matcher(unmatched, setMatched, context, xml);
            }
            if (seed) {
              // Reintegrate element matches to eliminate the need for sorting
              if (matchedCount > 0) {
                while (i--) {
                  if (!(unmatched[i] || setMatched[i])) {
                    setMatched[i] = pop.call(results);
                  }
                }
              }

              // Discard index placeholder values to get only actual matches
              setMatched = condense(setMatched);
            }

            // Add matches to results
            push.apply(results, setMatched);

            // Seedless set matches succeeding multiple successful matchers stipulate sorting
            if (outermost && !seed && setMatched.length > 0 && matchedCount + setMatchers.length > 1) {
              Sizzle.uniqueSort(results);
            }
          }

          // Override manipulation of globals by nested matchers
          if (outermost) {
            dirruns = dirrunsUnique;
            outermostContext = contextBackup;
          }
          return unmatched;
        };
      return bySet ? markFunction(superMatcher) : superMatcher;
    }
    compile = Sizzle.compile = function (selector, match /* Internal Use Only */) {
      var i,
        setMatchers = [],
        elementMatchers = [],
        cached = compilerCache[selector + " "];
      if (!cached) {
        // Generate a function of recursive functions that can be used to check each element
        if (!match) {
          match = tokenize(selector);
        }
        i = match.length;
        while (i--) {
          cached = matcherFromTokens(match[i]);
          if (cached[expando]) {
            setMatchers.push(cached);
          } else {
            elementMatchers.push(cached);
          }
        }

        // Cache the compiled function
        cached = compilerCache(selector, matcherFromGroupMatchers(elementMatchers, setMatchers));

        // Save selector and tokenization
        cached.selector = selector;
      }
      return cached;
    };

    /**
     * A low-level selection function that works with Sizzle's compiled
     *  selector functions
     * @param {String|Function} selector A selector or a pre-compiled
     *  selector function built with Sizzle.compile
     * @param {Element} context
     * @param {Array} [results]
     * @param {Array} [seed] A set of elements to match against
     */
    select = Sizzle.select = function (selector, context, results, seed) {
      var i,
        tokens,
        token,
        type,
        find,
        compiled = typeof selector === "function" && selector,
        match = !seed && tokenize(selector = compiled.selector || selector);
      results = results || [];

      // Try to minimize operations if there is only one selector in the list and no seed
      // (the latter of which guarantees us context)
      if (match.length === 1) {
        // Reduce context if the leading compound selector is an ID
        tokens = match[0] = match[0].slice(0);
        if (tokens.length > 2 && (token = tokens[0]).type === "ID" && support.getById && context.nodeType === 9 && documentIsHTML && Expr.relative[tokens[1].type]) {
          context = (Expr.find["ID"](token.matches[0].replace(runescape, funescape), context) || [])[0];
          if (!context) {
            return results;

            // Precompiled matchers will still verify ancestry, so step up a level
          } else if (compiled) {
            context = context.parentNode;
          }
          selector = selector.slice(tokens.shift().value.length);
        }

        // Fetch a seed set for right-to-left matching
        i = matchExpr["needsContext"].test(selector) ? 0 : tokens.length;
        while (i--) {
          token = tokens[i];

          // Abort if we hit a combinator
          if (Expr.relative[type = token.type]) {
            break;
          }
          if (find = Expr.find[type]) {
            // Search, expanding context for leading sibling combinators
            if (seed = find(token.matches[0].replace(runescape, funescape), rsibling.test(tokens[0].type) && testContext(context.parentNode) || context)) {
              // If seed is empty or no tokens remain, we can return early
              tokens.splice(i, 1);
              selector = seed.length && toSelector(tokens);
              if (!selector) {
                push.apply(results, seed);
                return results;
              }
              break;
            }
          }
        }
      }

      // Compile and execute a filtering function if one is not provided
      // Provide `match` to avoid retokenization if we modified the selector above
      (compiled || compile(selector, match))(seed, context, !documentIsHTML, results, !context || rsibling.test(selector) && testContext(context.parentNode) || context);
      return results;
    };

    // One-time assignments

    // Sort stability
    support.sortStable = expando.split("").sort(sortOrder).join("") === expando;

    // Support: Chrome 14-35+
    // Always assume duplicates if they aren't passed to the comparison function
    support.detectDuplicates = !!hasDuplicate;

    // Initialize against the default document
    setDocument();

    // Support: Webkit<537.32 - Safari 6.0.3/Chrome 25 (fixed in Chrome 27)
    // Detached nodes confoundingly follow *each other*
    support.sortDetached = assert(function (div1) {
      // Should return 1, but returns 4 (following)
      return div1.compareDocumentPosition(document.createElement("div")) & 1;
    });

    // Support: IE<8
    // Prevent attribute/property "interpolation"
    // http://msdn.microsoft.com/en-us/library/ms536429%28VS.85%29.aspx
    if (!assert(function (div) {
      div.innerHTML = "<a href='#'></a>";
      return div.firstChild.getAttribute("href") === "#";
    })) {
      addHandle("type|href|height|width", function (elem, name, isXML) {
        if (!isXML) {
          return elem.getAttribute(name, name.toLowerCase() === "type" ? 1 : 2);
        }
      });
    }

    // Support: IE<9
    // Use defaultValue in place of getAttribute("value")
    if (!support.attributes || !assert(function (div) {
      div.innerHTML = "<input/>";
      div.firstChild.setAttribute("value", "");
      return div.firstChild.getAttribute("value") === "";
    })) {
      addHandle("value", function (elem, name, isXML) {
        if (!isXML && elem.nodeName.toLowerCase() === "input") {
          return elem.defaultValue;
        }
      });
    }

    // Support: IE<9
    // Use getAttributeNode to fetch booleans when getAttribute lies
    if (!assert(function (div) {
      return div.getAttribute("disabled") == null;
    })) {
      addHandle(booleans, function (elem, name, isXML) {
        var val;
        if (!isXML) {
          return elem[name] === true ? name.toLowerCase() : (val = elem.getAttributeNode(name)) && val.specified ? val.value : null;
        }
      });
    }
    return Sizzle;
  }(window);
  jQuery.find = Sizzle;
  jQuery.expr = Sizzle.selectors;
  jQuery.expr[":"] = jQuery.expr.pseudos;
  jQuery.uniqueSort = jQuery.unique = Sizzle.uniqueSort;
  jQuery.text = Sizzle.getText;
  jQuery.isXMLDoc = Sizzle.isXML;
  jQuery.contains = Sizzle.contains;
  var dir = function dir(elem, _dir, until) {
    var matched = [],
      truncate = until !== undefined;
    while ((elem = elem[_dir]) && elem.nodeType !== 9) {
      if (elem.nodeType === 1) {
        if (truncate && jQuery(elem).is(until)) {
          break;
        }
        matched.push(elem);
      }
    }
    return matched;
  };
  var _siblings = function siblings(n, elem) {
    var matched = [];
    for (; n; n = n.nextSibling) {
      if (n.nodeType === 1 && n !== elem) {
        matched.push(n);
      }
    }
    return matched;
  };
  var rneedsContext = jQuery.expr.match.needsContext;
  var rsingleTag = /^<([\w-]+)\s*\/?>(?:<\/\1>|)$/;
  var risSimple = /^.[^:#\[\.,]*$/;

  // Implement the identical functionality for filter and not
  function winnow(elements, qualifier, not) {
    if (jQuery.isFunction(qualifier)) {
      return jQuery.grep(elements, function (elem, i) {
        /* jshint -W018 */
        return !!qualifier.call(elem, i, elem) !== not;
      });
    }
    if (qualifier.nodeType) {
      return jQuery.grep(elements, function (elem) {
        return elem === qualifier !== not;
      });
    }
    if (typeof qualifier === "string") {
      if (risSimple.test(qualifier)) {
        return jQuery.filter(qualifier, elements, not);
      }
      qualifier = jQuery.filter(qualifier, elements);
    }
    return jQuery.grep(elements, function (elem) {
      return jQuery.inArray(elem, qualifier) > -1 !== not;
    });
  }
  jQuery.filter = function (expr, elems, not) {
    var elem = elems[0];
    if (not) {
      expr = ":not(" + expr + ")";
    }
    return elems.length === 1 && elem.nodeType === 1 ? jQuery.find.matchesSelector(elem, expr) ? [elem] : [] : jQuery.find.matches(expr, jQuery.grep(elems, function (elem) {
      return elem.nodeType === 1;
    }));
  };
  jQuery.fn.extend({
    find: function find(selector) {
      var i,
        ret = [],
        self = this,
        len = self.length;
      if (typeof selector !== "string") {
        return this.pushStack(jQuery(selector).filter(function () {
          for (i = 0; i < len; i++) {
            if (jQuery.contains(self[i], this)) {
              return true;
            }
          }
        }));
      }
      for (i = 0; i < len; i++) {
        jQuery.find(selector, self[i], ret);
      }

      // Needed because $( selector, context ) becomes $( context ).find( selector )
      ret = this.pushStack(len > 1 ? jQuery.unique(ret) : ret);
      ret.selector = this.selector ? this.selector + " " + selector : selector;
      return ret;
    },
    filter: function filter(selector) {
      return this.pushStack(winnow(this, selector || [], false));
    },
    not: function not(selector) {
      return this.pushStack(winnow(this, selector || [], true));
    },
    is: function is(selector) {
      return !!winnow(this,
      // If this is a positional/relative selector, check membership in the returned set
      // so $("p:first").is("p:last") won't return true for a doc with two "p".
      typeof selector === "string" && rneedsContext.test(selector) ? jQuery(selector) : selector || [], false).length;
    }
  });

  // Initialize a jQuery object

  // A central reference to the root jQuery(document)
  var rootjQuery,
    // A simple way to check for HTML strings
    // Prioritize #id over <tag> to avoid XSS via location.hash (#9521)
    // Strict HTML recognition (#11290: must start with <)
    rquickExpr = /^(?:\s*(<[\w\W]+>)[^>]*|#([\w-]*))$/,
    init = jQuery.fn.init = function (selector, context, root) {
      var match, elem;

      // HANDLE: $(""), $(null), $(undefined), $(false)
      if (!selector) {
        return this;
      }

      // init accepts an alternate rootjQuery
      // so migrate can support jQuery.sub (gh-2101)
      root = root || rootjQuery;

      // Handle HTML strings
      if (typeof selector === "string") {
        if (selector.charAt(0) === "<" && selector.charAt(selector.length - 1) === ">" && selector.length >= 3) {
          // Assume that strings that start and end with <> are HTML and skip the regex check
          match = [null, selector, null];
        } else {
          match = rquickExpr.exec(selector);
        }

        // Match html or make sure no context is specified for #id
        if (match && (match[1] || !context)) {
          // HANDLE: $(html) -> $(array)
          if (match[1]) {
            context = context instanceof jQuery ? context[0] : context;

            // scripts is true for back-compat
            // Intentionally let the error be thrown if parseHTML is not present
            jQuery.merge(this, jQuery.parseHTML(match[1], context && context.nodeType ? context.ownerDocument || context : document, true));

            // HANDLE: $(html, props)
            if (rsingleTag.test(match[1]) && jQuery.isPlainObject(context)) {
              for (match in context) {
                // Properties of context are called as methods if possible
                if (jQuery.isFunction(this[match])) {
                  this[match](context[match]);

                  // ...and otherwise set as attributes
                } else {
                  this.attr(match, context[match]);
                }
              }
            }
            return this;

            // HANDLE: $(#id)
          } else {
            elem = document.getElementById(match[2]);

            // Check parentNode to catch when Blackberry 4.6 returns
            // nodes that are no longer in the document #6963
            if (elem && elem.parentNode) {
              // Handle the case where IE and Opera return items
              // by name instead of ID
              if (elem.id !== match[2]) {
                return rootjQuery.find(selector);
              }

              // Otherwise, we inject the element directly into the jQuery object
              this.length = 1;
              this[0] = elem;
            }
            this.context = document;
            this.selector = selector;
            return this;
          }

          // HANDLE: $(expr, $(...))
        } else if (!context || context.jquery) {
          return (context || root).find(selector);

          // HANDLE: $(expr, context)
          // (which is just equivalent to: $(context).find(expr)
        } else {
          return this.constructor(context).find(selector);
        }

        // HANDLE: $(DOMElement)
      } else if (selector.nodeType) {
        this.context = this[0] = selector;
        this.length = 1;
        return this;

        // HANDLE: $(function)
        // Shortcut for document ready
      } else if (jQuery.isFunction(selector)) {
        return typeof root.ready !== "undefined" ? root.ready(selector) :
        // Execute immediately if ready is not present
        selector(jQuery);
      }
      if (selector.selector !== undefined) {
        this.selector = selector.selector;
        this.context = selector.context;
      }
      return jQuery.makeArray(selector, this);
    };

  // Give the init function the jQuery prototype for later instantiation
  init.prototype = jQuery.fn;

  // Initialize central reference
  rootjQuery = jQuery(document);
  var rparentsprev = /^(?:parents|prev(?:Until|All))/,
    // methods guaranteed to produce a unique set when starting from a unique set
    guaranteedUnique = {
      children: true,
      contents: true,
      next: true,
      prev: true
    };
  jQuery.fn.extend({
    has: function has(target) {
      var i,
        targets = jQuery(target, this),
        len = targets.length;
      return this.filter(function () {
        for (i = 0; i < len; i++) {
          if (jQuery.contains(this, targets[i])) {
            return true;
          }
        }
      });
    },
    closest: function closest(selectors, context) {
      var cur,
        i = 0,
        l = this.length,
        matched = [],
        pos = rneedsContext.test(selectors) || typeof selectors !== "string" ? jQuery(selectors, context || this.context) : 0;
      for (; i < l; i++) {
        for (cur = this[i]; cur && cur !== context; cur = cur.parentNode) {
          // Always skip document fragments
          if (cur.nodeType < 11 && (pos ? pos.index(cur) > -1 :
          // Don't pass non-elements to Sizzle
          cur.nodeType === 1 && jQuery.find.matchesSelector(cur, selectors))) {
            matched.push(cur);
            break;
          }
        }
      }
      return this.pushStack(matched.length > 1 ? jQuery.uniqueSort(matched) : matched);
    },
    // Determine the position of an element within
    // the matched set of elements
    index: function index(elem) {
      // No argument, return index in parent
      if (!elem) {
        return this[0] && this[0].parentNode ? this.first().prevAll().length : -1;
      }

      // index in selector
      if (typeof elem === "string") {
        return jQuery.inArray(this[0], jQuery(elem));
      }

      // Locate the position of the desired element
      return jQuery.inArray(
      // If it receives a jQuery object, the first element is used
      elem.jquery ? elem[0] : elem, this);
    },
    add: function add(selector, context) {
      return this.pushStack(jQuery.uniqueSort(jQuery.merge(this.get(), jQuery(selector, context))));
    },
    addBack: function addBack(selector) {
      return this.add(selector == null ? this.prevObject : this.prevObject.filter(selector));
    }
  });
  function sibling(cur, dir) {
    do {
      cur = cur[dir];
    } while (cur && cur.nodeType !== 1);
    return cur;
  }
  jQuery.each({
    parent: function parent(elem) {
      var parent = elem.parentNode;
      return parent && parent.nodeType !== 11 ? parent : null;
    },
    parents: function parents(elem) {
      return dir(elem, "parentNode");
    },
    parentsUntil: function parentsUntil(elem, i, until) {
      return dir(elem, "parentNode", until);
    },
    next: function next(elem) {
      return sibling(elem, "nextSibling");
    },
    prev: function prev(elem) {
      return sibling(elem, "previousSibling");
    },
    nextAll: function nextAll(elem) {
      return dir(elem, "nextSibling");
    },
    prevAll: function prevAll(elem) {
      return dir(elem, "previousSibling");
    },
    nextUntil: function nextUntil(elem, i, until) {
      return dir(elem, "nextSibling", until);
    },
    prevUntil: function prevUntil(elem, i, until) {
      return dir(elem, "previousSibling", until);
    },
    siblings: function siblings(elem) {
      return _siblings((elem.parentNode || {}).firstChild, elem);
    },
    children: function children(elem) {
      return _siblings(elem.firstChild);
    },
    contents: function contents(elem) {
      return jQuery.nodeName(elem, "iframe") ? elem.contentDocument || elem.contentWindow.document : jQuery.merge([], elem.childNodes);
    }
  }, function (name, fn) {
    jQuery.fn[name] = function (until, selector) {
      var ret = jQuery.map(this, fn, until);
      if (name.slice(-5) !== "Until") {
        selector = until;
      }
      if (selector && typeof selector === "string") {
        ret = jQuery.filter(selector, ret);
      }
      if (this.length > 1) {
        // Remove duplicates
        if (!guaranteedUnique[name]) {
          ret = jQuery.uniqueSort(ret);
        }

        // Reverse order for parents* and prev-derivatives
        if (rparentsprev.test(name)) {
          ret = ret.reverse();
        }
      }
      return this.pushStack(ret);
    };
  });
  var rnotwhite = /\S+/g;

  // Convert String-formatted options into Object-formatted ones
  function createOptions(options) {
    var object = {};
    jQuery.each(options.match(rnotwhite) || [], function (_, flag) {
      object[flag] = true;
    });
    return object;
  }

  /*
   * Create a callback list using the following parameters:
   *
   *	options: an optional list of space-separated options that will change how
   *			the callback list behaves or a more traditional option object
   *
   * By default a callback list will act like an event callback list and can be
   * "fired" multiple times.
   *
   * Possible options:
   *
   *	once:			will ensure the callback list can only be fired once (like a Deferred)
   *
   *	memory:			will keep track of previous values and will call any callback added
   *					after the list has been fired right away with the latest "memorized"
   *					values (like a Deferred)
   *
   *	unique:			will ensure a callback can only be added once (no duplicate in the list)
   *
   *	stopOnFalse:	interrupt callings when a callback returns false
   *
   */
  jQuery.Callbacks = function (options) {
    // Convert options from String-formatted to Object-formatted if needed
    // (we check in cache first)
    options = typeof options === "string" ? createOptions(options) : jQuery.extend({}, options);
    var
      // Flag to know if list is currently firing
      firing,
      // Last fire value for non-forgettable lists
      memory,
      // Flag to know if list was already fired
      _fired,
      // Flag to prevent firing
      _locked,
      // Actual callback list
      list = [],
      // Queue of execution data for repeatable lists
      queue = [],
      // Index of currently firing callback (modified by add/remove as needed)
      firingIndex = -1,
      // Fire callbacks
      fire = function fire() {
        // Enforce single-firing
        _locked = options.once;

        // Execute callbacks for all pending executions,
        // respecting firingIndex overrides and runtime changes
        _fired = firing = true;
        for (; queue.length; firingIndex = -1) {
          memory = queue.shift();
          while (++firingIndex < list.length) {
            // Run callback and check for early termination
            if (list[firingIndex].apply(memory[0], memory[1]) === false && options.stopOnFalse) {
              // Jump to end and forget the data so .add doesn't re-fire
              firingIndex = list.length;
              memory = false;
            }
          }
        }

        // Forget the data if we're done with it
        if (!options.memory) {
          memory = false;
        }
        firing = false;

        // Clean up if we're done firing for good
        if (_locked) {
          // Keep an empty list if we have data for future add calls
          if (memory) {
            list = [];

            // Otherwise, this object is spent
          } else {
            list = "";
          }
        }
      },
      // Actual Callbacks object
      self = {
        // Add a callback or a collection of callbacks to the list
        add: function add() {
          if (list) {
            // If we have memory from a past run, we should fire after adding
            if (memory && !firing) {
              firingIndex = list.length - 1;
              queue.push(memory);
            }
            (function add(args) {
              jQuery.each(args, function (_, arg) {
                if (jQuery.isFunction(arg)) {
                  if (!options.unique || !self.has(arg)) {
                    list.push(arg);
                  }
                } else if (arg && arg.length && jQuery.type(arg) !== "string") {
                  // Inspect recursively
                  add(arg);
                }
              });
            })(arguments);
            if (memory && !firing) {
              fire();
            }
          }
          return this;
        },
        // Remove a callback from the list
        remove: function remove() {
          jQuery.each(arguments, function (_, arg) {
            var index;
            while ((index = jQuery.inArray(arg, list, index)) > -1) {
              list.splice(index, 1);

              // Handle firing indexes
              if (index <= firingIndex) {
                firingIndex--;
              }
            }
          });
          return this;
        },
        // Check if a given callback is in the list.
        // If no argument is given, return whether or not list has callbacks attached.
        has: function has(fn) {
          return fn ? jQuery.inArray(fn, list) > -1 : list.length > 0;
        },
        // Remove all callbacks from the list
        empty: function empty() {
          if (list) {
            list = [];
          }
          return this;
        },
        // Disable .fire and .add
        // Abort any current/pending executions
        // Clear all callbacks and values
        disable: function disable() {
          _locked = queue = [];
          list = memory = "";
          return this;
        },
        disabled: function disabled() {
          return !list;
        },
        // Disable .fire
        // Also disable .add unless we have memory (since it would have no effect)
        // Abort any pending executions
        lock: function lock() {
          _locked = true;
          if (!memory) {
            self.disable();
          }
          return this;
        },
        locked: function locked() {
          return !!_locked;
        },
        // Call all callbacks with the given context and arguments
        fireWith: function fireWith(context, args) {
          if (!_locked) {
            args = args || [];
            args = [context, args.slice ? args.slice() : args];
            queue.push(args);
            if (!firing) {
              fire();
            }
          }
          return this;
        },
        // Call all the callbacks with the given arguments
        fire: function fire() {
          self.fireWith(this, arguments);
          return this;
        },
        // To know if the callbacks have already been called at least once
        fired: function fired() {
          return !!_fired;
        }
      };
    return self;
  };
  jQuery.extend({
    Deferred: function Deferred(func) {
      var tuples = [
        // action, add listener, listener list, final state
        ["resolve", "done", jQuery.Callbacks("once memory"), "resolved"], ["reject", "fail", jQuery.Callbacks("once memory"), "rejected"], ["notify", "progress", jQuery.Callbacks("memory")]],
        _state = "pending",
        _promise = {
          state: function state() {
            return _state;
          },
          always: function always() {
            deferred.done(arguments).fail(arguments);
            return this;
          },
          then: function then( /* fnDone, fnFail, fnProgress */
          ) {
            var fns = arguments;
            return jQuery.Deferred(function (newDefer) {
              jQuery.each(tuples, function (i, tuple) {
                var fn = jQuery.isFunction(fns[i]) && fns[i];

                // deferred[ done | fail | progress ] for forwarding actions to newDefer
                deferred[tuple[1]](function () {
                  var returned = fn && fn.apply(this, arguments);
                  if (returned && jQuery.isFunction(returned.promise)) {
                    returned.promise().progress(newDefer.notify).done(newDefer.resolve).fail(newDefer.reject);
                  } else {
                    newDefer[tuple[0] + "With"](this === _promise ? newDefer.promise() : this, fn ? [returned] : arguments);
                  }
                });
              });
              fns = null;
            }).promise();
          },
          // Get a promise for this deferred
          // If obj is provided, the promise aspect is added to the object
          promise: function promise(obj) {
            return obj != null ? jQuery.extend(obj, _promise) : _promise;
          }
        },
        deferred = {};

      // Keep pipe for back-compat
      _promise.pipe = _promise.then;

      // Add list-specific methods
      jQuery.each(tuples, function (i, tuple) {
        var list = tuple[2],
          stateString = tuple[3];

        // promise[ done | fail | progress ] = list.add
        _promise[tuple[1]] = list.add;

        // Handle state
        if (stateString) {
          list.add(function () {
            // state = [ resolved | rejected ]
            _state = stateString;

            // [ reject_list | resolve_list ].disable; progress_list.lock
          }, tuples[i ^ 1][2].disable, tuples[2][2].lock);
        }

        // deferred[ resolve | reject | notify ]
        deferred[tuple[0]] = function () {
          deferred[tuple[0] + "With"](this === deferred ? _promise : this, arguments);
          return this;
        };
        deferred[tuple[0] + "With"] = list.fireWith;
      });

      // Make the deferred a promise
      _promise.promise(deferred);

      // Call given func if any
      if (func) {
        func.call(deferred, deferred);
      }

      // All done!
      return deferred;
    },
    // Deferred helper
    when: function when(subordinate /* , ..., subordinateN */) {
      var i = 0,
        resolveValues = _slice.call(arguments),
        length = resolveValues.length,
        // the count of uncompleted subordinates
        remaining = length !== 1 || subordinate && jQuery.isFunction(subordinate.promise) ? length : 0,
        // the master Deferred.
        // If resolveValues consist of only a single Deferred, just use that.
        deferred = remaining === 1 ? subordinate : jQuery.Deferred(),
        // Update function for both resolve and progress values
        updateFunc = function updateFunc(i, contexts, values) {
          return function (value) {
            contexts[i] = this;
            values[i] = arguments.length > 1 ? _slice.call(arguments) : value;
            if (values === progressValues) {
              deferred.notifyWith(contexts, values);
            } else if (! --remaining) {
              deferred.resolveWith(contexts, values);
            }
          };
        },
        progressValues,
        progressContexts,
        resolveContexts;

      // add listeners to Deferred subordinates; treat others as resolved
      if (length > 1) {
        progressValues = new Array(length);
        progressContexts = new Array(length);
        resolveContexts = new Array(length);
        for (; i < length; i++) {
          if (resolveValues[i] && jQuery.isFunction(resolveValues[i].promise)) {
            resolveValues[i].promise().progress(updateFunc(i, progressContexts, progressValues)).done(updateFunc(i, resolveContexts, resolveValues)).fail(deferred.reject);
          } else {
            --remaining;
          }
        }
      }

      // if we're not waiting on anything, resolve the master
      if (!remaining) {
        deferred.resolveWith(resolveContexts, resolveValues);
      }
      return deferred.promise();
    }
  });

  // The deferred used on DOM ready
  var readyList;
  jQuery.fn.ready = function (fn) {
    // Add the callback
    jQuery.ready.promise().done(fn);
    return this;
  };
  jQuery.extend({
    // Is the DOM ready to be used? Set to true once it occurs.
    isReady: false,
    // A counter to track how many items to wait for before
    // the ready event fires. See #6781
    readyWait: 1,
    // Hold (or release) the ready event
    holdReady: function holdReady(hold) {
      if (hold) {
        jQuery.readyWait++;
      } else {
        jQuery.ready(true);
      }
    },
    // Handle when the DOM is ready
    ready: function ready(wait) {
      // Abort if there are pending holds or we're already ready
      if (wait === true ? --jQuery.readyWait : jQuery.isReady) {
        return;
      }

      // Remember that the DOM is ready
      jQuery.isReady = true;

      // If a normal DOM Ready event fired, decrement, and wait if need be
      if (wait !== true && --jQuery.readyWait > 0) {
        return;
      }

      // If there are functions bound, to execute
      readyList.resolveWith(document, [jQuery]);

      // Trigger any bound ready events
      if (jQuery.fn.triggerHandler) {
        jQuery(document).triggerHandler("ready");
        jQuery(document).off("ready");
      }
    }
  });

  /**
   * Clean-up method for dom ready events
   */
  function detach() {
    if (document.addEventListener) {
      document.removeEventListener("DOMContentLoaded", completed);
      window.removeEventListener("load", completed);
    } else {
      document.detachEvent("onreadystatechange", completed);
      window.detachEvent("onload", completed);
    }
  }

  /**
   * The ready event handler and self cleanup method
   */
  function completed() {
    // readyState === "complete" is good enough for us to call the dom ready in oldIE
    if (document.addEventListener || window.event.type === "load" || document.readyState === "complete") {
      detach();
      jQuery.ready();
    }
  }
  jQuery.ready.promise = function (obj) {
    if (!readyList) {
      readyList = jQuery.Deferred();

      // Catch cases where $(document).ready() is called
      // after the browser event has already occurred.
      // Support: IE6-10
      // Older IE sometimes signals "interactive" too soon
      if (document.readyState === "complete" || document.readyState !== "loading" && !document.documentElement.doScroll) {
        // Handle it asynchronously to allow scripts the opportunity to delay ready
        window.setTimeout(jQuery.ready);

        // Standards-based browsers support DOMContentLoaded
      } else if (document.addEventListener) {
        // Use the handy event callback
        document.addEventListener("DOMContentLoaded", completed);

        // A fallback to window.onload, that will always work
        window.addEventListener("load", completed);

        // If IE event model is used
      } else {
        // Ensure firing before onload, maybe late but safe also for iframes
        document.attachEvent("onreadystatechange", completed);

        // A fallback to window.onload, that will always work
        window.attachEvent("onload", completed);

        // If IE and not a frame
        // continually check to see if the document is ready
        var top = false;
        try {
          top = window.frameElement == null && document.documentElement;
        } catch (e) {}
        if (top && top.doScroll) {
          (function doScrollCheck() {
            if (!jQuery.isReady) {
              try {
                // Use the trick by Diego Perini
                // http://javascript.nwbox.com/IEContentLoaded/
                top.doScroll("left");
              } catch (e) {
                return window.setTimeout(doScrollCheck, 50);
              }

              // detach all dom ready events
              detach();

              // and execute any waiting functions
              jQuery.ready();
            }
          })();
        }
      }
    }
    return readyList.promise(obj);
  };

  // Kick off the DOM ready check even if the user does not
  jQuery.ready.promise();

  // Support: IE<9
  // Iteration over object's inherited properties before its own
  var i;
  for (i in jQuery(support)) {
    break;
  }
  support.ownFirst = i === "0";

  // Note: most support tests are defined in their respective modules.
  // false until the test is run
  support.inlineBlockNeedsLayout = false;

  // Execute ASAP in case we need to set body.style.zoom
  jQuery(function () {
    // Minified: var a,b,c,d
    var val, div, body, container;
    body = document.getElementsByTagName("body")[0];
    if (!body || !body.style) {
      // Return for frameset docs that don't have a body
      return;
    }

    // Setup
    div = document.createElement("div");
    container = document.createElement("div");
    container.style.cssText = "position:absolute;border:0;width:0;height:0;top:0;left:-9999px";
    body.appendChild(container).appendChild(div);
    if (typeof div.style.zoom !== "undefined") {
      // Support: IE<8
      // Check if natively block-level elements act like inline-block
      // elements when setting their display to 'inline' and giving
      // them layout
      div.style.cssText = "display:inline;margin:0;border:0;padding:1px;width:1px;zoom:1";
      support.inlineBlockNeedsLayout = val = div.offsetWidth === 3;
      if (val) {
        // Prevent IE 6 from affecting layout for positioned elements #11048
        // Prevent IE from shrinking the body in IE 7 mode #12869
        // Support: IE<8
        body.style.zoom = 1;
      }
    }
    body.removeChild(container);
  });
  (function () {
    var div = document.createElement("div");

    // Support: IE<9
    support.deleteExpando = true;
    try {
      delete div.test;
    } catch (e) {
      support.deleteExpando = false;
    }

    // Null elements to avoid leaks in IE.
    div = null;
  })();
  var acceptData = function acceptData(elem) {
    var noData = jQuery.noData[(elem.nodeName + " ").toLowerCase()],
      nodeType = +elem.nodeType || 1;

    // Do not set data on non-element DOM nodes because it will not be cleared (#8335).
    return nodeType !== 1 && nodeType !== 9 ? false :
    // Nodes accept data unless otherwise specified; rejection can be conditional
    !noData || noData !== true && elem.getAttribute("classid") === noData;
  };
  var rbrace = /^(?:\{[\w\W]*\}|\[[\w\W]*\])$/,
    rmultiDash = /([A-Z])/g;
  function dataAttr(elem, key, data) {
    // If nothing was found internally, try to fetch any
    // data from the HTML5 data-* attribute
    if (data === undefined && elem.nodeType === 1) {
      var name = "data-" + key.replace(rmultiDash, "-$1").toLowerCase();
      data = elem.getAttribute(name);
      if (typeof data === "string") {
        try {
          data = data === "true" ? true : data === "false" ? false : data === "null" ? null :
          // Only convert to a number if it doesn't change the string
          +data + "" === data ? +data : rbrace.test(data) ? jQuery.parseJSON(data) : data;
        } catch (e) {}

        // Make sure we set the data so it isn't changed later
        jQuery.data(elem, key, data);
      } else {
        data = undefined;
      }
    }
    return data;
  }

  // checks a cache object for emptiness
  function isEmptyDataObject(obj) {
    var name;
    for (name in obj) {
      // if the public data object is empty, the private is still empty
      if (name === "data" && jQuery.isEmptyObject(obj[name])) {
        continue;
      }
      if (name !== "toJSON") {
        return false;
      }
    }
    return true;
  }
  function internalData(elem, name, data, pvt /* Internal Use Only */) {
    if (!acceptData(elem)) {
      return;
    }
    var ret,
      thisCache,
      internalKey = jQuery.expando,
      // We have to handle DOM nodes and JS objects differently because IE6-7
      // can't GC object references properly across the DOM-JS boundary
      isNode = elem.nodeType,
      // Only DOM nodes need the global jQuery cache; JS object data is
      // attached directly to the object so GC can occur automatically
      cache = isNode ? jQuery.cache : elem,
      // Only defining an ID for JS objects if its cache already exists allows
      // the code to shortcut on the same path as a DOM node with no cache
      id = isNode ? elem[internalKey] : elem[internalKey] && internalKey;

    // Avoid doing any more work than we need to when trying to get data on an
    // object that has no data at all
    if ((!id || !cache[id] || !pvt && !cache[id].data) && data === undefined && typeof name === "string") {
      return;
    }
    if (!id) {
      // Only DOM nodes need a new unique ID for each element since their data
      // ends up in the global cache
      if (isNode) {
        id = elem[internalKey] = deletedIds.pop() || jQuery.guid++;
      } else {
        id = internalKey;
      }
    }
    if (!cache[id]) {
      // Avoid exposing jQuery metadata on plain JS objects when the object
      // is serialized using JSON.stringify
      cache[id] = isNode ? {} : {
        toJSON: jQuery.noop
      };
    }

    // An object can be passed to jQuery.data instead of a key/value pair; this gets
    // shallow copied over onto the existing cache
    if (_typeof(name) === "object" || typeof name === "function") {
      if (pvt) {
        cache[id] = jQuery.extend(cache[id], name);
      } else {
        cache[id].data = jQuery.extend(cache[id].data, name);
      }
    }
    thisCache = cache[id];

    // jQuery data() is stored in a separate object inside the object's internal data
    // cache in order to avoid key collisions between internal data and user-defined
    // data.
    if (!pvt) {
      if (!thisCache.data) {
        thisCache.data = {};
      }
      thisCache = thisCache.data;
    }
    if (data !== undefined) {
      thisCache[jQuery.camelCase(name)] = data;
    }

    // Check for both converted-to-camel and non-converted data property names
    // If a data property was specified
    if (typeof name === "string") {
      // First Try to find as-is property data
      ret = thisCache[name];

      // Test for null|undefined property data
      if (ret == null) {
        // Try to find the camelCased property
        ret = thisCache[jQuery.camelCase(name)];
      }
    } else {
      ret = thisCache;
    }
    return ret;
  }
  function internalRemoveData(elem, name, pvt) {
    if (!acceptData(elem)) {
      return;
    }
    var thisCache,
      i,
      isNode = elem.nodeType,
      // See jQuery.data for more information
      cache = isNode ? jQuery.cache : elem,
      id = isNode ? elem[jQuery.expando] : jQuery.expando;

    // If there is already no cache entry for this object, there is no
    // purpose in continuing
    if (!cache[id]) {
      return;
    }
    if (name) {
      thisCache = pvt ? cache[id] : cache[id].data;
      if (thisCache) {
        // Support array or space separated string names for data keys
        if (!jQuery.isArray(name)) {
          // try the string as a key before any manipulation
          if (name in thisCache) {
            name = [name];
          } else {
            // split the camel cased version by spaces unless a key with the spaces exists
            name = jQuery.camelCase(name);
            if (name in thisCache) {
              name = [name];
            } else {
              name = name.split(" ");
            }
          }
        } else {
          // If "name" is an array of keys...
          // When data is initially created, via ("key", "val") signature,
          // keys will be converted to camelCase.
          // Since there is no way to tell _how_ a key was added, remove
          // both plain key and camelCase key. #12786
          // This will only penalize the array argument path.
          name = name.concat(jQuery.map(name, jQuery.camelCase));
        }
        i = name.length;
        while (i--) {
          delete thisCache[name[i]];
        }

        // If there is no data left in the cache, we want to continue
        // and let the cache object itself get destroyed
        if (pvt ? !isEmptyDataObject(thisCache) : !jQuery.isEmptyObject(thisCache)) {
          return;
        }
      }
    }

    // See jQuery.data for more information
    if (!pvt) {
      delete cache[id].data;

      // Don't destroy the parent cache unless the internal data object
      // had been the only thing left in it
      if (!isEmptyDataObject(cache[id])) {
        return;
      }
    }

    // Destroy the cache
    if (isNode) {
      jQuery.cleanData([elem], true);

      // Use delete when supported for expandos or `cache` is not a window per isWindow (#10080)
      /* jshint eqeqeq: false */
    } else if (support.deleteExpando || cache != cache.window) {
      /* jshint eqeqeq: true */
      delete cache[id];

      // When all else fails, undefined
    } else {
      cache[id] = undefined;
    }
  }
  jQuery.extend({
    cache: {},
    // The following elements (space-suffixed to avoid Object.prototype collisions)
    // throw uncatchable exceptions if you attempt to set expando properties
    noData: {
      "applet ": true,
      "embed ": true,
      // ...but Flash objects (which have this classid) *can* handle expandos
      "object ": "clsid:D27CDB6E-AE6D-11cf-96B8-444553540000"
    },
    hasData: function hasData(elem) {
      elem = elem.nodeType ? jQuery.cache[elem[jQuery.expando]] : elem[jQuery.expando];
      return !!elem && !isEmptyDataObject(elem);
    },
    data: function data(elem, name, _data) {
      return internalData(elem, name, _data);
    },
    removeData: function removeData(elem, name) {
      return internalRemoveData(elem, name);
    },
    // For internal use only.
    _data: function _data(elem, name, data) {
      return internalData(elem, name, data, true);
    },
    _removeData: function _removeData(elem, name) {
      return internalRemoveData(elem, name, true);
    }
  });
  jQuery.fn.extend({
    data: function data(key, value) {
      var i,
        name,
        data,
        elem = this[0],
        attrs = elem && elem.attributes;

      // Special expections of .data basically thwart jQuery.access,
      // so implement the relevant behavior ourselves

      // Gets all values
      if (key === undefined) {
        if (this.length) {
          data = jQuery.data(elem);
          if (elem.nodeType === 1 && !jQuery._data(elem, "parsedAttrs")) {
            i = attrs.length;
            while (i--) {
              // Support: IE11+
              // The attrs elements can be null (#14894)
              if (attrs[i]) {
                name = attrs[i].name;
                if (name.indexOf("data-") === 0) {
                  name = jQuery.camelCase(name.slice(5));
                  dataAttr(elem, name, data[name]);
                }
              }
            }
            jQuery._data(elem, "parsedAttrs", true);
          }
        }
        return data;
      }

      // Sets multiple values
      if (_typeof(key) === "object") {
        return this.each(function () {
          jQuery.data(this, key);
        });
      }
      return arguments.length > 1 ?
      // Sets one value
      this.each(function () {
        jQuery.data(this, key, value);
      }) :
      // Gets one value
      // Try to fetch any internally stored data first
      elem ? dataAttr(elem, key, jQuery.data(elem, key)) : undefined;
    },
    removeData: function removeData(key) {
      return this.each(function () {
        jQuery.removeData(this, key);
      });
    }
  });
  jQuery.extend({
    queue: function queue(elem, type, data) {
      var queue;
      if (elem) {
        type = (type || "fx") + "queue";
        queue = jQuery._data(elem, type);

        // Speed up dequeue by getting out quickly if this is just a lookup
        if (data) {
          if (!queue || jQuery.isArray(data)) {
            queue = jQuery._data(elem, type, jQuery.makeArray(data));
          } else {
            queue.push(data);
          }
        }
        return queue || [];
      }
    },
    dequeue: function dequeue(elem, type) {
      type = type || "fx";
      var queue = jQuery.queue(elem, type),
        startLength = queue.length,
        fn = queue.shift(),
        hooks = jQuery._queueHooks(elem, type),
        next = function next() {
          jQuery.dequeue(elem, type);
        };

      // If the fx queue is dequeued, always remove the progress sentinel
      if (fn === "inprogress") {
        fn = queue.shift();
        startLength--;
      }
      if (fn) {
        // Add a progress sentinel to prevent the fx queue from being
        // automatically dequeued
        if (type === "fx") {
          queue.unshift("inprogress");
        }

        // clear up the last queue stop function
        delete hooks.stop;
        fn.call(elem, next, hooks);
      }
      if (!startLength && hooks) {
        hooks.empty.fire();
      }
    },
    // not intended for public consumption - generates a queueHooks object,
    // or returns the current one
    _queueHooks: function _queueHooks(elem, type) {
      var key = type + "queueHooks";
      return jQuery._data(elem, key) || jQuery._data(elem, key, {
        empty: jQuery.Callbacks("once memory").add(function () {
          jQuery._removeData(elem, type + "queue");
          jQuery._removeData(elem, key);
        })
      });
    }
  });
  jQuery.fn.extend({
    queue: function queue(type, data) {
      var setter = 2;
      if (typeof type !== "string") {
        data = type;
        type = "fx";
        setter--;
      }
      if (arguments.length < setter) {
        return jQuery.queue(this[0], type);
      }
      return data === undefined ? this : this.each(function () {
        var queue = jQuery.queue(this, type, data);

        // ensure a hooks for this queue
        jQuery._queueHooks(this, type);
        if (type === "fx" && queue[0] !== "inprogress") {
          jQuery.dequeue(this, type);
        }
      });
    },
    dequeue: function dequeue(type) {
      return this.each(function () {
        jQuery.dequeue(this, type);
      });
    },
    clearQueue: function clearQueue(type) {
      return this.queue(type || "fx", []);
    },
    // Get a promise resolved when queues of a certain type
    // are emptied (fx is the type by default)
    promise: function promise(type, obj) {
      var tmp,
        count = 1,
        defer = jQuery.Deferred(),
        elements = this,
        i = this.length,
        resolve = function resolve() {
          if (! --count) {
            defer.resolveWith(elements, [elements]);
          }
        };
      if (typeof type !== "string") {
        obj = type;
        type = undefined;
      }
      type = type || "fx";
      while (i--) {
        tmp = jQuery._data(elements[i], type + "queueHooks");
        if (tmp && tmp.empty) {
          count++;
          tmp.empty.add(resolve);
        }
      }
      resolve();
      return defer.promise(obj);
    }
  });
  (function () {
    var shrinkWrapBlocksVal;
    support.shrinkWrapBlocks = function () {
      if (shrinkWrapBlocksVal != null) {
        return shrinkWrapBlocksVal;
      }

      // Will be changed later if needed.
      shrinkWrapBlocksVal = false;

      // Minified: var b,c,d
      var div, body, container;
      body = document.getElementsByTagName("body")[0];
      if (!body || !body.style) {
        // Test fired too early or in an unsupported environment, exit.
        return;
      }

      // Setup
      div = document.createElement("div");
      container = document.createElement("div");
      container.style.cssText = "position:absolute;border:0;width:0;height:0;top:0;left:-9999px";
      body.appendChild(container).appendChild(div);

      // Support: IE6
      // Check if elements with layout shrink-wrap their children
      if (typeof div.style.zoom !== "undefined") {
        // Reset CSS: box-sizing; display; margin; border
        div.style.cssText =
        // Support: Firefox<29, Android 2.3
        // Vendor-prefix box-sizing
        "-webkit-box-sizing:content-box;-moz-box-sizing:content-box;" + "box-sizing:content-box;display:block;margin:0;border:0;" + "padding:1px;width:1px;zoom:1";
        div.appendChild(document.createElement("div")).style.width = "5px";
        shrinkWrapBlocksVal = div.offsetWidth !== 3;
      }
      body.removeChild(container);
      return shrinkWrapBlocksVal;
    };
  })();
  var pnum = /[+-]?(?:\d*\.|)\d+(?:[eE][+-]?\d+|)/.source;
  var rcssNum = new RegExp("^(?:([+-])=|)(" + pnum + ")([a-z%]*)$", "i");
  var cssExpand = ["Top", "Right", "Bottom", "Left"];
  var isHidden = function isHidden(elem, el) {
    // isHidden might be called from jQuery#filter function;
    // in that case, element will be second argument
    elem = el || elem;
    return jQuery.css(elem, "display") === "none" || !jQuery.contains(elem.ownerDocument, elem);
  };
  function adjustCSS(elem, prop, valueParts, tween) {
    var adjusted,
      scale = 1,
      maxIterations = 20,
      currentValue = tween ? function () {
        return tween.cur();
      } : function () {
        return jQuery.css(elem, prop, "");
      },
      initial = currentValue(),
      unit = valueParts && valueParts[3] || (jQuery.cssNumber[prop] ? "" : "px"),
      // Starting value computation is required for potential unit mismatches
      initialInUnit = (jQuery.cssNumber[prop] || unit !== "px" && +initial) && rcssNum.exec(jQuery.css(elem, prop));
    if (initialInUnit && initialInUnit[3] !== unit) {
      // Trust units reported by jQuery.css
      unit = unit || initialInUnit[3];

      // Make sure we update the tween properties later on
      valueParts = valueParts || [];

      // Iteratively approximate from a nonzero starting point
      initialInUnit = +initial || 1;
      do {
        // If previous iteration zeroed out, double until we get *something*.
        // Use string for doubling so we don't accidentally see scale as unchanged below
        scale = scale || ".5";

        // Adjust and apply
        initialInUnit = initialInUnit / scale;
        jQuery.style(elem, prop, initialInUnit + unit);

        // Update scale, tolerating zero or NaN from tween.cur()
        // Break the loop if scale is unchanged or perfect, or if we've just had enough.
      } while (scale !== (scale = currentValue() / initial) && scale !== 1 && --maxIterations);
    }
    if (valueParts) {
      initialInUnit = +initialInUnit || +initial || 0;

      // Apply relative offset (+=/-=) if specified
      adjusted = valueParts[1] ? initialInUnit + (valueParts[1] + 1) * valueParts[2] : +valueParts[2];
      if (tween) {
        tween.unit = unit;
        tween.start = initialInUnit;
        tween.end = adjusted;
      }
    }
    return adjusted;
  }

  // Multifunctional method to get and set values of a collection
  // The value/s can optionally be executed if it's a function
  var access = function access(elems, fn, key, value, chainable, emptyGet, raw) {
    var i = 0,
      length = elems.length,
      bulk = key == null;

    // Sets many values
    if (jQuery.type(key) === "object") {
      chainable = true;
      for (i in key) {
        access(elems, fn, i, key[i], true, emptyGet, raw);
      }

      // Sets one value
    } else if (value !== undefined) {
      chainable = true;
      if (!jQuery.isFunction(value)) {
        raw = true;
      }
      if (bulk) {
        // Bulk operations run against the entire set
        if (raw) {
          fn.call(elems, value);
          fn = null;

          // ...except when executing function values
        } else {
          bulk = fn;
          fn = function fn(elem, key, value) {
            return bulk.call(jQuery(elem), value);
          };
        }
      }
      if (fn) {
        for (; i < length; i++) {
          fn(elems[i], key, raw ? value : value.call(elems[i], i, fn(elems[i], key)));
        }
      }
    }
    return chainable ? elems :
    // Gets
    bulk ? fn.call(elems) : length ? fn(elems[0], key) : emptyGet;
  };
  var rcheckableType = /^(?:checkbox|radio)$/i;
  var rtagName = /<([\w:-]+)/;
  var rscriptType = /^$|\/(?:java|ecma)script/i;
  var rleadingWhitespace = /^\s+/;
  var nodeNames = "abbr|article|aside|audio|bdi|canvas|data|datalist|" + "details|dialog|figcaption|figure|footer|header|hgroup|main|" + "mark|meter|nav|output|picture|progress|section|summary|template|time|video";
  function createSafeFragment(document) {
    var list = nodeNames.split("|"),
      safeFrag = document.createDocumentFragment();
    if (safeFrag.createElement) {
      while (list.length) {
        safeFrag.createElement(list.pop());
      }
    }
    return safeFrag;
  }
  (function () {
    var div = document.createElement("div"),
      fragment = document.createDocumentFragment(),
      input = document.createElement("input");

    // Setup
    div.innerHTML = "  <link/><table></table><a href='/a'>a</a><input type='checkbox'/>";

    // IE strips leading whitespace when .innerHTML is used
    support.leadingWhitespace = div.firstChild.nodeType === 3;

    // Make sure that tbody elements aren't automatically inserted
    // IE will insert them into empty tables
    support.tbody = !div.getElementsByTagName("tbody").length;

    // Make sure that link elements get serialized correctly by innerHTML
    // This requires a wrapper element in IE
    support.htmlSerialize = !!div.getElementsByTagName("link").length;

    // Makes sure cloning an html5 element does not cause problems
    // Where outerHTML is undefined, this still works
    support.html5Clone = document.createElement("nav").cloneNode(true).outerHTML !== "<:nav></:nav>";

    // Check if a disconnected checkbox will retain its checked
    // value of true after appended to the DOM (IE6/7)
    input.type = "checkbox";
    input.checked = true;
    fragment.appendChild(input);
    support.appendChecked = input.checked;

    // Make sure textarea (and checkbox) defaultValue is properly cloned
    // Support: IE6-IE11+
    div.innerHTML = "<textarea>x</textarea>";
    support.noCloneChecked = !!div.cloneNode(true).lastChild.defaultValue;

    // #11217 - WebKit loses check when the name is after the checked attribute
    fragment.appendChild(div);

    // Support: Windows Web Apps (WWA)
    // `name` and `type` must use .setAttribute for WWA (#14901)
    input = document.createElement("input");
    input.setAttribute("type", "radio");
    input.setAttribute("checked", "checked");
    input.setAttribute("name", "t");
    div.appendChild(input);

    // Support: Safari 5.1, iOS 5.1, Android 4.x, Android 2.3
    // old WebKit doesn't clone checked state correctly in fragments
    support.checkClone = div.cloneNode(true).cloneNode(true).lastChild.checked;

    // Support: IE<9
    // Cloned elements keep attachEvent handlers, we use addEventListener on IE9+
    support.noCloneEvent = !!div.addEventListener;

    // Support: IE<9
    // Since attributes and properties are the same in IE,
    // cleanData must set properties to undefined rather than use removeAttribute
    div[jQuery.expando] = 1;
    support.attributes = !div.getAttribute(jQuery.expando);
  })();

  // We have to close these tags to support XHTML (#13200)
  var wrapMap = {
    option: [1, "<select multiple='multiple'>", "</select>"],
    legend: [1, "<fieldset>", "</fieldset>"],
    area: [1, "<map>", "</map>"],
    // Support: IE8
    param: [1, "<object>", "</object>"],
    thead: [1, "<table>", "</table>"],
    tr: [2, "<table><tbody>", "</tbody></table>"],
    col: [2, "<table><tbody></tbody><colgroup>", "</colgroup></table>"],
    td: [3, "<table><tbody><tr>", "</tr></tbody></table>"],
    // IE6-8 can't serialize link, script, style, or any html5 (NoScope) tags,
    // unless wrapped in a div with non-breaking characters in front of it.
    _default: support.htmlSerialize ? [0, "", ""] : [1, "X<div>", "</div>"]
  };

  // Support: IE8-IE9
  wrapMap.optgroup = wrapMap.option;
  wrapMap.tbody = wrapMap.tfoot = wrapMap.colgroup = wrapMap.caption = wrapMap.thead;
  wrapMap.th = wrapMap.td;
  function getAll(context, tag) {
    var elems,
      elem,
      i = 0,
      found = typeof context.getElementsByTagName !== "undefined" ? context.getElementsByTagName(tag || "*") : typeof context.querySelectorAll !== "undefined" ? context.querySelectorAll(tag || "*") : undefined;
    if (!found) {
      for (found = [], elems = context.childNodes || context; (elem = elems[i]) != null; i++) {
        if (!tag || jQuery.nodeName(elem, tag)) {
          found.push(elem);
        } else {
          jQuery.merge(found, getAll(elem, tag));
        }
      }
    }
    return tag === undefined || tag && jQuery.nodeName(context, tag) ? jQuery.merge([context], found) : found;
  }

  // Mark scripts as having already been evaluated
  function setGlobalEval(elems, refElements) {
    var elem,
      i = 0;
    for (; (elem = elems[i]) != null; i++) {
      jQuery._data(elem, "globalEval", !refElements || jQuery._data(refElements[i], "globalEval"));
    }
  }
  var rhtml = /<|&#?\w+;/,
    rtbody = /<tbody/i;
  function fixDefaultChecked(elem) {
    if (rcheckableType.test(elem.type)) {
      elem.defaultChecked = elem.checked;
    }
  }
  function buildFragment(elems, context, scripts, selection, ignored) {
    var j,
      elem,
      contains,
      tmp,
      tag,
      tbody,
      wrap,
      l = elems.length,
      // Ensure a safe fragment
      safe = createSafeFragment(context),
      nodes = [],
      i = 0;
    for (; i < l; i++) {
      elem = elems[i];
      if (elem || elem === 0) {
        // Add nodes directly
        if (jQuery.type(elem) === "object") {
          jQuery.merge(nodes, elem.nodeType ? [elem] : elem);

          // Convert non-html into a text node
        } else if (!rhtml.test(elem)) {
          nodes.push(context.createTextNode(elem));

          // Convert html into DOM nodes
        } else {
          tmp = tmp || safe.appendChild(context.createElement("div"));

          // Deserialize a standard representation
          tag = (rtagName.exec(elem) || ["", ""])[1].toLowerCase();
          wrap = wrapMap[tag] || wrapMap._default;
          tmp.innerHTML = wrap[1] + jQuery.htmlPrefilter(elem) + wrap[2];

          // Descend through wrappers to the right content
          j = wrap[0];
          while (j--) {
            tmp = tmp.lastChild;
          }

          // Manually add leading whitespace removed by IE
          if (!support.leadingWhitespace && rleadingWhitespace.test(elem)) {
            nodes.push(context.createTextNode(rleadingWhitespace.exec(elem)[0]));
          }

          // Remove IE's autoinserted <tbody> from table fragments
          if (!support.tbody) {
            // String was a <table>, *may* have spurious <tbody>
            elem = tag === "table" && !rtbody.test(elem) ? tmp.firstChild :
            // String was a bare <thead> or <tfoot>
            wrap[1] === "<table>" && !rtbody.test(elem) ? tmp : 0;
            j = elem && elem.childNodes.length;
            while (j--) {
              if (jQuery.nodeName(tbody = elem.childNodes[j], "tbody") && !tbody.childNodes.length) {
                elem.removeChild(tbody);
              }
            }
          }
          jQuery.merge(nodes, tmp.childNodes);

          // Fix #12392 for WebKit and IE > 9
          tmp.textContent = "";

          // Fix #12392 for oldIE
          while (tmp.firstChild) {
            tmp.removeChild(tmp.firstChild);
          }

          // Remember the top-level container for proper cleanup
          tmp = safe.lastChild;
        }
      }
    }

    // Fix #11356: Clear elements from fragment
    if (tmp) {
      safe.removeChild(tmp);
    }

    // Reset defaultChecked for any radios and checkboxes
    // about to be appended to the DOM in IE 6/7 (#8060)
    if (!support.appendChecked) {
      jQuery.grep(getAll(nodes, "input"), fixDefaultChecked);
    }
    i = 0;
    while (elem = nodes[i++]) {
      // Skip elements already in the context collection (trac-4087)
      if (selection && jQuery.inArray(elem, selection) > -1) {
        if (ignored) {
          ignored.push(elem);
        }
        continue;
      }
      contains = jQuery.contains(elem.ownerDocument, elem);

      // Append to fragment
      tmp = getAll(safe.appendChild(elem), "script");

      // Preserve script evaluation history
      if (contains) {
        setGlobalEval(tmp);
      }

      // Capture executables
      if (scripts) {
        j = 0;
        while (elem = tmp[j++]) {
          if (rscriptType.test(elem.type || "")) {
            scripts.push(elem);
          }
        }
      }
    }
    tmp = null;
    return safe;
  }
  (function () {
    var i,
      eventName,
      div = document.createElement("div");

    // Support: IE<9 (lack submit/change bubble), Firefox (lack focus(in | out) events)
    for (i in {
      submit: true,
      change: true,
      focusin: true
    }) {
      eventName = "on" + i;
      if (!(support[i] = eventName in window)) {
        // Beware of CSP restrictions (https://developer.mozilla.org/en/Security/CSP)
        div.setAttribute(eventName, "t");
        support[i] = div.attributes[eventName].expando === false;
      }
    }

    // Null elements to avoid leaks in IE.
    div = null;
  })();
  var rformElems = /^(?:input|select|textarea)$/i,
    rkeyEvent = /^key/,
    rmouseEvent = /^(?:mouse|pointer|contextmenu|drag|drop)|click/,
    rfocusMorph = /^(?:focusinfocus|focusoutblur)$/,
    rtypenamespace = /^([^.]*)(?:\.(.+)|)/;
  function returnTrue() {
    return true;
  }
  function returnFalse() {
    return false;
  }

  // Support: IE9
  // See #13393 for more info
  function safeActiveElement() {
    try {
      return document.activeElement;
    } catch (err) {}
  }
  function _on(elem, types, selector, data, fn, one) {
    var origFn, type;

    // Types can be a map of types/handlers
    if (_typeof(types) === "object") {
      // ( types-Object, selector, data )
      if (typeof selector !== "string") {
        // ( types-Object, data )
        data = data || selector;
        selector = undefined;
      }
      for (type in types) {
        _on(elem, type, selector, data, types[type], one);
      }
      return elem;
    }
    if (data == null && fn == null) {
      // ( types, fn )
      fn = selector;
      data = selector = undefined;
    } else if (fn == null) {
      if (typeof selector === "string") {
        // ( types, selector, fn )
        fn = data;
        data = undefined;
      } else {
        // ( types, data, fn )
        fn = data;
        data = selector;
        selector = undefined;
      }
    }
    if (fn === false) {
      fn = returnFalse;
    } else if (!fn) {
      return elem;
    }
    if (one === 1) {
      origFn = fn;
      fn = function fn(event) {
        // Can use an empty set, since event contains the info
        jQuery().off(event);
        return origFn.apply(this, arguments);
      };

      // Use same guid so caller can remove using origFn
      fn.guid = origFn.guid || (origFn.guid = jQuery.guid++);
    }
    return elem.each(function () {
      jQuery.event.add(this, types, fn, data, selector);
    });
  }

  /*
   * Helper functions for managing events -- not part of the public interface.
   * Props to Dean Edwards' addEvent library for many of the ideas.
   */
  jQuery.event = {
    global: {},
    add: function add(elem, types, handler, data, selector) {
      var tmp,
        events,
        t,
        handleObjIn,
        special,
        eventHandle,
        handleObj,
        handlers,
        type,
        namespaces,
        origType,
        elemData = jQuery._data(elem);

      // Don't attach events to noData or text/comment nodes (but allow plain objects)
      if (!elemData) {
        return;
      }

      // Caller can pass in an object of custom data in lieu of the handler
      if (handler.handler) {
        handleObjIn = handler;
        handler = handleObjIn.handler;
        selector = handleObjIn.selector;
      }

      // Make sure that the handler has a unique ID, used to find/remove it later
      if (!handler.guid) {
        handler.guid = jQuery.guid++;
      }

      // Init the element's event structure and main handler, if this is the first
      if (!(events = elemData.events)) {
        events = elemData.events = {};
      }
      if (!(eventHandle = elemData.handle)) {
        eventHandle = elemData.handle = function (e) {
          // Discard the second event of a jQuery.event.trigger() and
          // when an event is called after a page has unloaded
          return typeof jQuery !== "undefined" && (!e || jQuery.event.triggered !== e.type) ? jQuery.event.dispatch.apply(eventHandle.elem, arguments) : undefined;
        };

        // Add elem as a property of the handle fn to prevent a memory leak
        // with IE non-native events
        eventHandle.elem = elem;
      }

      // Handle multiple events separated by a space
      types = (types || "").match(rnotwhite) || [""];
      t = types.length;
      while (t--) {
        tmp = rtypenamespace.exec(types[t]) || [];
        type = origType = tmp[1];
        namespaces = (tmp[2] || "").split(".").sort();

        // There *must* be a type, no attaching namespace-only handlers
        if (!type) {
          continue;
        }

        // If event changes its type, use the special event handlers for the changed type
        special = jQuery.event.special[type] || {};

        // If selector defined, determine special event api type, otherwise given type
        type = (selector ? special.delegateType : special.bindType) || type;

        // Update special based on newly reset type
        special = jQuery.event.special[type] || {};

        // handleObj is passed to all event handlers
        handleObj = jQuery.extend({
          type: type,
          origType: origType,
          data: data,
          handler: handler,
          guid: handler.guid,
          selector: selector,
          needsContext: selector && jQuery.expr.match.needsContext.test(selector),
          namespace: namespaces.join(".")
        }, handleObjIn);

        // Init the event handler queue if we're the first
        if (!(handlers = events[type])) {
          handlers = events[type] = [];
          handlers.delegateCount = 0;

          // Only use addEventListener/attachEvent if the special events handler returns false
          if (!special.setup || special.setup.call(elem, data, namespaces, eventHandle) === false) {
            // Bind the global event handler to the element
            if (elem.addEventListener) {
              elem.addEventListener(type, eventHandle, false);
            } else if (elem.attachEvent) {
              elem.attachEvent("on" + type, eventHandle);
            }
          }
        }
        if (special.add) {
          special.add.call(elem, handleObj);
          if (!handleObj.handler.guid) {
            handleObj.handler.guid = handler.guid;
          }
        }

        // Add to the element's handler list, delegates in front
        if (selector) {
          handlers.splice(handlers.delegateCount++, 0, handleObj);
        } else {
          handlers.push(handleObj);
        }

        // Keep track of which events have ever been used, for event optimization
        jQuery.event.global[type] = true;
      }

      // Nullify elem to prevent memory leaks in IE
      elem = null;
    },
    // Detach an event or set of events from an element
    remove: function remove(elem, types, handler, selector, mappedTypes) {
      var j,
        handleObj,
        tmp,
        origCount,
        t,
        events,
        special,
        handlers,
        type,
        namespaces,
        origType,
        elemData = jQuery.hasData(elem) && jQuery._data(elem);
      if (!elemData || !(events = elemData.events)) {
        return;
      }

      // Once for each type.namespace in types; type may be omitted
      types = (types || "").match(rnotwhite) || [""];
      t = types.length;
      while (t--) {
        tmp = rtypenamespace.exec(types[t]) || [];
        type = origType = tmp[1];
        namespaces = (tmp[2] || "").split(".").sort();

        // Unbind all events (on this namespace, if provided) for the element
        if (!type) {
          for (type in events) {
            jQuery.event.remove(elem, type + types[t], handler, selector, true);
          }
          continue;
        }
        special = jQuery.event.special[type] || {};
        type = (selector ? special.delegateType : special.bindType) || type;
        handlers = events[type] || [];
        tmp = tmp[2] && new RegExp("(^|\\.)" + namespaces.join("\\.(?:.*\\.|)") + "(\\.|$)");

        // Remove matching events
        origCount = j = handlers.length;
        while (j--) {
          handleObj = handlers[j];
          if ((mappedTypes || origType === handleObj.origType) && (!handler || handler.guid === handleObj.guid) && (!tmp || tmp.test(handleObj.namespace)) && (!selector || selector === handleObj.selector || selector === "**" && handleObj.selector)) {
            handlers.splice(j, 1);
            if (handleObj.selector) {
              handlers.delegateCount--;
            }
            if (special.remove) {
              special.remove.call(elem, handleObj);
            }
          }
        }

        // Remove generic event handler if we removed something and no more handlers exist
        // (avoids potential for endless recursion during removal of special event handlers)
        if (origCount && !handlers.length) {
          if (!special.teardown || special.teardown.call(elem, namespaces, elemData.handle) === false) {
            jQuery.removeEvent(elem, type, elemData.handle);
          }
          delete events[type];
        }
      }

      // Remove the expando if it's no longer used
      if (jQuery.isEmptyObject(events)) {
        delete elemData.handle;

        // removeData also checks for emptiness and clears the expando if empty
        // so use it instead of delete
        jQuery._removeData(elem, "events");
      }
    },
    trigger: function trigger(event, data, elem, onlyHandlers) {
      var handle,
        ontype,
        cur,
        bubbleType,
        special,
        tmp,
        i,
        eventPath = [elem || document],
        type = hasOwn.call(event, "type") ? event.type : event,
        namespaces = hasOwn.call(event, "namespace") ? event.namespace.split(".") : [];
      cur = tmp = elem = elem || document;

      // Don't do events on text and comment nodes
      if (elem.nodeType === 3 || elem.nodeType === 8) {
        return;
      }

      // focus/blur morphs to focusin/out; ensure we're not firing them right now
      if (rfocusMorph.test(type + jQuery.event.triggered)) {
        return;
      }
      if (type.indexOf(".") > -1) {
        // Namespaced trigger; create a regexp to match event type in handle()
        namespaces = type.split(".");
        type = namespaces.shift();
        namespaces.sort();
      }
      ontype = type.indexOf(":") < 0 && "on" + type;

      // Caller can pass in a jQuery.Event object, Object, or just an event type string
      event = event[jQuery.expando] ? event : new jQuery.Event(type, _typeof(event) === "object" && event);

      // Trigger bitmask: & 1 for native handlers; & 2 for jQuery (always true)
      event.isTrigger = onlyHandlers ? 2 : 3;
      event.namespace = namespaces.join(".");
      event.rnamespace = event.namespace ? new RegExp("(^|\\.)" + namespaces.join("\\.(?:.*\\.|)") + "(\\.|$)") : null;

      // Clean up the event in case it is being reused
      event.result = undefined;
      if (!event.target) {
        event.target = elem;
      }

      // Clone any incoming data and prepend the event, creating the handler arg list
      data = data == null ? [event] : jQuery.makeArray(data, [event]);

      // Allow special events to draw outside the lines
      special = jQuery.event.special[type] || {};
      if (!onlyHandlers && special.trigger && special.trigger.apply(elem, data) === false) {
        return;
      }

      // Determine event propagation path in advance, per W3C events spec (#9951)
      // Bubble up to document, then to window; watch for a global ownerDocument var (#9724)
      if (!onlyHandlers && !special.noBubble && !jQuery.isWindow(elem)) {
        bubbleType = special.delegateType || type;
        if (!rfocusMorph.test(bubbleType + type)) {
          cur = cur.parentNode;
        }
        for (; cur; cur = cur.parentNode) {
          eventPath.push(cur);
          tmp = cur;
        }

        // Only add window if we got to document (e.g., not plain obj or detached DOM)
        if (tmp === (elem.ownerDocument || document)) {
          eventPath.push(tmp.defaultView || tmp.parentWindow || window);
        }
      }

      // Fire handlers on the event path
      i = 0;
      while ((cur = eventPath[i++]) && !event.isPropagationStopped()) {
        event.type = i > 1 ? bubbleType : special.bindType || type;

        // jQuery handler
        handle = (jQuery._data(cur, "events") || {})[event.type] && jQuery._data(cur, "handle");
        if (handle) {
          handle.apply(cur, data);
        }

        // Native handler
        handle = ontype && cur[ontype];
        if (handle && handle.apply && acceptData(cur)) {
          event.result = handle.apply(cur, data);
          if (event.result === false) {
            event.preventDefault();
          }
        }
      }
      event.type = type;

      // If nobody prevented the default action, do it now
      if (!onlyHandlers && !event.isDefaultPrevented()) {
        if ((!special._default || special._default.apply(eventPath.pop(), data) === false) && acceptData(elem)) {
          // Call a native DOM method on the target with the same name name as the event.
          // Can't use an .isFunction() check here because IE6/7 fails that test.
          // Don't do default actions on window, that's where global variables be (#6170)
          if (ontype && elem[type] && !jQuery.isWindow(elem)) {
            // Don't re-trigger an onFOO event when we call its FOO() method
            tmp = elem[ontype];
            if (tmp) {
              elem[ontype] = null;
            }

            // Prevent re-triggering of the same event, since we already bubbled it above
            jQuery.event.triggered = type;
            try {
              elem[type]();
            } catch (e) {

              // IE<9 dies on focus/blur to hidden element (#1486,#12518)
              // only reproducible on winXP IE8 native, not IE9 in IE8 mode
            }
            jQuery.event.triggered = undefined;
            if (tmp) {
              elem[ontype] = tmp;
            }
          }
        }
      }
      return event.result;
    },
    dispatch: function dispatch(event) {
      // Make a writable jQuery.Event from the native event object
      event = jQuery.event.fix(event);
      var i,
        j,
        ret,
        matched,
        handleObj,
        handlerQueue = [],
        args = _slice.call(arguments),
        handlers = (jQuery._data(this, "events") || {})[event.type] || [],
        special = jQuery.event.special[event.type] || {};

      // Use the fix-ed jQuery.Event rather than the (read-only) native event
      args[0] = event;
      event.delegateTarget = this;

      // Call the preDispatch hook for the mapped type, and let it bail if desired
      if (special.preDispatch && special.preDispatch.call(this, event) === false) {
        return;
      }

      // Determine handlers
      handlerQueue = jQuery.event.handlers.call(this, event, handlers);

      // Run delegates first; they may want to stop propagation beneath us
      i = 0;
      while ((matched = handlerQueue[i++]) && !event.isPropagationStopped()) {
        event.currentTarget = matched.elem;
        j = 0;
        while ((handleObj = matched.handlers[j++]) && !event.isImmediatePropagationStopped()) {
          // Triggered event must either 1) have no namespace, or 2) have namespace(s)
          // a subset or equal to those in the bound event (both can have no namespace).
          if (!event.rnamespace || event.rnamespace.test(handleObj.namespace)) {
            event.handleObj = handleObj;
            event.data = handleObj.data;
            ret = ((jQuery.event.special[handleObj.origType] || {}).handle || handleObj.handler).apply(matched.elem, args);
            if (ret !== undefined) {
              if ((event.result = ret) === false) {
                event.preventDefault();
                event.stopPropagation();
              }
            }
          }
        }
      }

      // Call the postDispatch hook for the mapped type
      if (special.postDispatch) {
        special.postDispatch.call(this, event);
      }
      return event.result;
    },
    handlers: function handlers(event, _handlers) {
      var i,
        matches,
        sel,
        handleObj,
        handlerQueue = [],
        delegateCount = _handlers.delegateCount,
        cur = event.target;

      // Support (at least): Chrome, IE9
      // Find delegate handlers
      // Black-hole SVG <use> instance trees (#13180)
      //
      // Support: Firefox<=42+
      // Avoid non-left-click in FF but don't block IE radio events (#3861, gh-2343)
      if (delegateCount && cur.nodeType && (event.type !== "click" || isNaN(event.button) || event.button < 1)) {
        /* jshint eqeqeq: false */
        for (; cur != this; cur = cur.parentNode || this) {
          /* jshint eqeqeq: true */

          // Don't check non-elements (#13208)
          // Don't process clicks on disabled elements (#6911, #8165, #11382, #11764)
          if (cur.nodeType === 1 && (cur.disabled !== true || event.type !== "click")) {
            matches = [];
            for (i = 0; i < delegateCount; i++) {
              handleObj = _handlers[i];

              // Don't conflict with Object.prototype properties (#13203)
              sel = handleObj.selector + " ";
              if (matches[sel] === undefined) {
                matches[sel] = handleObj.needsContext ? jQuery(sel, this).index(cur) > -1 : jQuery.find(sel, this, null, [cur]).length;
              }
              if (matches[sel]) {
                matches.push(handleObj);
              }
            }
            if (matches.length) {
              handlerQueue.push({
                elem: cur,
                handlers: matches
              });
            }
          }
        }
      }

      // Add the remaining (directly-bound) handlers
      if (delegateCount < _handlers.length) {
        handlerQueue.push({
          elem: this,
          handlers: _handlers.slice(delegateCount)
        });
      }
      return handlerQueue;
    },
    fix: function fix(event) {
      if (event[jQuery.expando]) {
        return event;
      }

      // Create a writable copy of the event object and normalize some properties
      var i,
        prop,
        copy,
        type = event.type,
        originalEvent = event,
        fixHook = this.fixHooks[type];
      if (!fixHook) {
        this.fixHooks[type] = fixHook = rmouseEvent.test(type) ? this.mouseHooks : rkeyEvent.test(type) ? this.keyHooks : {};
      }
      copy = fixHook.props ? this.props.concat(fixHook.props) : this.props;
      event = new jQuery.Event(originalEvent);
      i = copy.length;
      while (i--) {
        prop = copy[i];
        event[prop] = originalEvent[prop];
      }

      // Support: IE<9
      // Fix target property (#1925)
      if (!event.target) {
        event.target = originalEvent.srcElement || document;
      }

      // Support: Safari 6-8+
      // Target should not be a text node (#504, #13143)
      if (event.target.nodeType === 3) {
        event.target = event.target.parentNode;
      }

      // Support: IE<9
      // For mouse/key events, metaKey==false if it's undefined (#3368, #11328)
      event.metaKey = !!event.metaKey;
      return fixHook.filter ? fixHook.filter(event, originalEvent) : event;
    },
    // Includes some event props shared by KeyEvent and MouseEvent
    props: ("altKey bubbles cancelable ctrlKey currentTarget detail eventPhase " + "metaKey relatedTarget shiftKey target timeStamp view which").split(" "),
    fixHooks: {},
    keyHooks: {
      props: "char charCode key keyCode".split(" "),
      filter: function filter(event, original) {
        // Add which for key events
        if (event.which == null) {
          event.which = original.charCode != null ? original.charCode : original.keyCode;
        }
        return event;
      }
    },
    mouseHooks: {
      props: ("button buttons clientX clientY fromElement offsetX offsetY " + "pageX pageY screenX screenY toElement").split(" "),
      filter: function filter(event, original) {
        var body,
          eventDoc,
          doc,
          button = original.button,
          fromElement = original.fromElement;

        // Calculate pageX/Y if missing and clientX/Y available
        if (event.pageX == null && original.clientX != null) {
          eventDoc = event.target.ownerDocument || document;
          doc = eventDoc.documentElement;
          body = eventDoc.body;
          event.pageX = original.clientX + (doc && doc.scrollLeft || body && body.scrollLeft || 0) - (doc && doc.clientLeft || body && body.clientLeft || 0);
          event.pageY = original.clientY + (doc && doc.scrollTop || body && body.scrollTop || 0) - (doc && doc.clientTop || body && body.clientTop || 0);
        }

        // Add relatedTarget, if necessary
        if (!event.relatedTarget && fromElement) {
          event.relatedTarget = fromElement === event.target ? original.toElement : fromElement;
        }

        // Add which for click: 1 === left; 2 === middle; 3 === right
        // Note: button is not normalized, so don't use it
        if (!event.which && button !== undefined) {
          event.which = button & 1 ? 1 : button & 2 ? 3 : button & 4 ? 2 : 0;
        }
        return event;
      }
    },
    special: {
      load: {
        // Prevent triggered image.load events from bubbling to window.load
        noBubble: true
      },
      focus: {
        // Fire native event if possible so blur/focus sequence is correct
        trigger: function trigger() {
          if (this !== safeActiveElement() && this.focus) {
            try {
              this.focus();
              return false;
            } catch (e) {

              // Support: IE<9
              // If we error on focus to hidden element (#1486, #12518),
              // let .trigger() run the handlers
            }
          }
        },
        delegateType: "focusin"
      },
      blur: {
        trigger: function trigger() {
          if (this === safeActiveElement() && this.blur) {
            this.blur();
            return false;
          }
        },
        delegateType: "focusout"
      },
      click: {
        // For checkbox, fire native event so checked state will be right
        trigger: function trigger() {
          if (jQuery.nodeName(this, "input") && this.type === "checkbox" && this.click) {
            this.click();
            return false;
          }
        },
        // For cross-browser consistency, don't fire native .click() on links
        _default: function _default(event) {
          return jQuery.nodeName(event.target, "a");
        }
      },
      beforeunload: {
        postDispatch: function postDispatch(event) {
          // Support: Firefox 20+
          // Firefox doesn't alert if the returnValue field is not set.
          if (event.result !== undefined && event.originalEvent) {
            event.originalEvent.returnValue = event.result;
          }
        }
      }
    },
    // Piggyback on a donor event to simulate a different one
    simulate: function simulate(type, elem, event) {
      var e = jQuery.extend(new jQuery.Event(), event, {
        type: type,
        isSimulated: true

        // Previously, `originalEvent: {}` was set here, so stopPropagation call
        // would not be triggered on donor event, since in our own
        // jQuery.event.stopPropagation function we had a check for existence of
        // originalEvent.stopPropagation method, so, consequently it would be a noop.
        //
        // Guard for simulated events was moved to jQuery.event.stopPropagation function
        // since `originalEvent` should point to the original event for the
        // constancy with other events and for more focused logic
      });

      jQuery.event.trigger(e, null, elem);
      if (e.isDefaultPrevented()) {
        event.preventDefault();
      }
    }
  };
  jQuery.removeEvent = document.removeEventListener ? function (elem, type, handle) {
    // This "if" is needed for plain objects
    if (elem.removeEventListener) {
      elem.removeEventListener(type, handle);
    }
  } : function (elem, type, handle) {
    var name = "on" + type;
    if (elem.detachEvent) {
      // #8545, #7054, preventing memory leaks for custom events in IE6-8
      // detachEvent needed property on element, by name of that event,
      // to properly expose it to GC
      if (typeof elem[name] === "undefined") {
        elem[name] = null;
      }
      elem.detachEvent(name, handle);
    }
  };
  jQuery.Event = function (src, props) {
    // Allow instantiation without the 'new' keyword
    if (!(this instanceof jQuery.Event)) {
      return new jQuery.Event(src, props);
    }

    // Event object
    if (src && src.type) {
      this.originalEvent = src;
      this.type = src.type;

      // Events bubbling up the document may have been marked as prevented
      // by a handler lower down the tree; reflect the correct value.
      this.isDefaultPrevented = src.defaultPrevented || src.defaultPrevented === undefined &&
      // Support: IE < 9, Android < 4.0
      src.returnValue === false ? returnTrue : returnFalse;

      // Event type
    } else {
      this.type = src;
    }

    // Put explicitly provided properties onto the event object
    if (props) {
      jQuery.extend(this, props);
    }

    // Create a timestamp if incoming event doesn't have one
    this.timeStamp = src && src.timeStamp || jQuery.now();

    // Mark it as fixed
    this[jQuery.expando] = true;
  };

  // jQuery.Event is based on DOM3 Events as specified by the ECMAScript Language Binding
  // http://www.w3.org/TR/2003/WD-DOM-Level-3-Events-20030331/ecma-script-binding.html
  jQuery.Event.prototype = {
    constructor: jQuery.Event,
    isDefaultPrevented: returnFalse,
    isPropagationStopped: returnFalse,
    isImmediatePropagationStopped: returnFalse,
    preventDefault: function preventDefault() {
      var e = this.originalEvent;
      this.isDefaultPrevented = returnTrue;
      if (!e) {
        return;
      }

      // If preventDefault exists, run it on the original event
      if (e.preventDefault) {
        e.preventDefault();

        // Support: IE
        // Otherwise set the returnValue property of the original event to false
      } else {
        e.returnValue = false;
      }
    },
    stopPropagation: function stopPropagation() {
      var e = this.originalEvent;
      this.isPropagationStopped = returnTrue;
      if (!e || this.isSimulated) {
        return;
      }

      // If stopPropagation exists, run it on the original event
      if (e.stopPropagation) {
        e.stopPropagation();
      }

      // Support: IE
      // Set the cancelBubble property of the original event to true
      e.cancelBubble = true;
    },
    stopImmediatePropagation: function stopImmediatePropagation() {
      var e = this.originalEvent;
      this.isImmediatePropagationStopped = returnTrue;
      if (e && e.stopImmediatePropagation) {
        e.stopImmediatePropagation();
      }
      this.stopPropagation();
    }
  };

  // Create mouseenter/leave events using mouseover/out and event-time checks
  // so that event delegation works in jQuery.
  // Do the same for pointerenter/pointerleave and pointerover/pointerout
  //
  // Support: Safari 7 only
  // Safari sends mouseenter too often; see:
  // https://code.google.com/p/chromium/issues/detail?id=470258
  // for the description of the bug (it existed in older Chrome versions as well).
  jQuery.each({
    mouseenter: "mouseover",
    mouseleave: "mouseout",
    pointerenter: "pointerover",
    pointerleave: "pointerout"
  }, function (orig, fix) {
    jQuery.event.special[orig] = {
      delegateType: fix,
      bindType: fix,
      handle: function handle(event) {
        var ret,
          target = this,
          related = event.relatedTarget,
          handleObj = event.handleObj;

        // For mouseenter/leave call the handler if related is outside the target.
        // NB: No relatedTarget if the mouse left/entered the browser window
        if (!related || related !== target && !jQuery.contains(target, related)) {
          event.type = handleObj.origType;
          ret = handleObj.handler.apply(this, arguments);
          event.type = fix;
        }
        return ret;
      }
    };
  });

  // IE submit delegation
  if (!support.submit) {
    jQuery.event.special.submit = {
      setup: function setup() {
        // Only need this for delegated form submit events
        if (jQuery.nodeName(this, "form")) {
          return false;
        }

        // Lazy-add a submit handler when a descendant form may potentially be submitted
        jQuery.event.add(this, "click._submit keypress._submit", function (e) {
          // Node name check avoids a VML-related crash in IE (#9807)
          var elem = e.target,
            form = jQuery.nodeName(elem, "input") || jQuery.nodeName(elem, "button") ?
            // Support: IE <=8
            // We use jQuery.prop instead of elem.form
            // to allow fixing the IE8 delegated submit issue (gh-2332)
            // by 3rd party polyfills/workarounds.
            jQuery.prop(elem, "form") : undefined;
          if (form && !jQuery._data(form, "submit")) {
            jQuery.event.add(form, "submit._submit", function (event) {
              event._submitBubble = true;
            });
            jQuery._data(form, "submit", true);
          }
        });

        // return undefined since we don't need an event listener
      },

      postDispatch: function postDispatch(event) {
        // If form was submitted by the user, bubble the event up the tree
        if (event._submitBubble) {
          delete event._submitBubble;
          if (this.parentNode && !event.isTrigger) {
            jQuery.event.simulate("submit", this.parentNode, event);
          }
        }
      },
      teardown: function teardown() {
        // Only need this for delegated form submit events
        if (jQuery.nodeName(this, "form")) {
          return false;
        }

        // Remove delegated handlers; cleanData eventually reaps submit handlers attached above
        jQuery.event.remove(this, "._submit");
      }
    };
  }

  // IE change delegation and checkbox/radio fix
  if (!support.change) {
    jQuery.event.special.change = {
      setup: function setup() {
        if (rformElems.test(this.nodeName)) {
          // IE doesn't fire change on a check/radio until blur; trigger it on click
          // after a propertychange. Eat the blur-change in special.change.handle.
          // This still fires onchange a second time for check/radio after blur.
          if (this.type === "checkbox" || this.type === "radio") {
            jQuery.event.add(this, "propertychange._change", function (event) {
              if (event.originalEvent.propertyName === "checked") {
                this._justChanged = true;
              }
            });
            jQuery.event.add(this, "click._change", function (event) {
              if (this._justChanged && !event.isTrigger) {
                this._justChanged = false;
              }

              // Allow triggered, simulated change events (#11500)
              jQuery.event.simulate("change", this, event);
            });
          }
          return false;
        }

        // Delegated event; lazy-add a change handler on descendant inputs
        jQuery.event.add(this, "beforeactivate._change", function (e) {
          var elem = e.target;
          if (rformElems.test(elem.nodeName) && !jQuery._data(elem, "change")) {
            jQuery.event.add(elem, "change._change", function (event) {
              if (this.parentNode && !event.isSimulated && !event.isTrigger) {
                jQuery.event.simulate("change", this.parentNode, event);
              }
            });
            jQuery._data(elem, "change", true);
          }
        });
      },
      handle: function handle(event) {
        var elem = event.target;

        // Swallow native change events from checkbox/radio, we already triggered them above
        if (this !== elem || event.isSimulated || event.isTrigger || elem.type !== "radio" && elem.type !== "checkbox") {
          return event.handleObj.handler.apply(this, arguments);
        }
      },
      teardown: function teardown() {
        jQuery.event.remove(this, "._change");
        return !rformElems.test(this.nodeName);
      }
    };
  }

  // Support: Firefox
  // Firefox doesn't have focus(in | out) events
  // Related ticket - https://bugzilla.mozilla.org/show_bug.cgi?id=687787
  //
  // Support: Chrome, Safari
  // focus(in | out) events fire after focus & blur events,
  // which is spec violation - http://www.w3.org/TR/DOM-Level-3-Events/#events-focusevent-event-order
  // Related ticket - https://code.google.com/p/chromium/issues/detail?id=449857
  if (!support.focusin) {
    jQuery.each({
      focus: "focusin",
      blur: "focusout"
    }, function (orig, fix) {
      // Attach a single capturing handler on the document while someone wants focusin/focusout
      var handler = function handler(event) {
        jQuery.event.simulate(fix, event.target, jQuery.event.fix(event));
      };
      jQuery.event.special[fix] = {
        setup: function setup() {
          var doc = this.ownerDocument || this,
            attaches = jQuery._data(doc, fix);
          if (!attaches) {
            doc.addEventListener(orig, handler, true);
          }
          jQuery._data(doc, fix, (attaches || 0) + 1);
        },
        teardown: function teardown() {
          var doc = this.ownerDocument || this,
            attaches = jQuery._data(doc, fix) - 1;
          if (!attaches) {
            doc.removeEventListener(orig, handler, true);
            jQuery._removeData(doc, fix);
          } else {
            jQuery._data(doc, fix, attaches);
          }
        }
      };
    });
  }
  jQuery.fn.extend({
    on: function on(types, selector, data, fn) {
      return _on(this, types, selector, data, fn);
    },
    one: function one(types, selector, data, fn) {
      return _on(this, types, selector, data, fn, 1);
    },
    off: function off(types, selector, fn) {
      var handleObj, type;
      if (types && types.preventDefault && types.handleObj) {
        // ( event )  dispatched jQuery.Event
        handleObj = types.handleObj;
        jQuery(types.delegateTarget).off(handleObj.namespace ? handleObj.origType + "." + handleObj.namespace : handleObj.origType, handleObj.selector, handleObj.handler);
        return this;
      }
      if (_typeof(types) === "object") {
        // ( types-object [, selector] )
        for (type in types) {
          this.off(type, selector, types[type]);
        }
        return this;
      }
      if (selector === false || typeof selector === "function") {
        // ( types [, fn] )
        fn = selector;
        selector = undefined;
      }
      if (fn === false) {
        fn = returnFalse;
      }
      return this.each(function () {
        jQuery.event.remove(this, types, fn, selector);
      });
    },
    trigger: function trigger(type, data) {
      return this.each(function () {
        jQuery.event.trigger(type, data, this);
      });
    },
    triggerHandler: function triggerHandler(type, data) {
      var elem = this[0];
      if (elem) {
        return jQuery.event.trigger(type, data, elem, true);
      }
    }
  });
  var rinlinejQuery = / jQuery\d+="(?:null|\d+)"/g,
    rnoshimcache = new RegExp("<(?:" + nodeNames + ")[\\s/>]", "i"),
    rxhtmlTag = /<(?!area|br|col|embed|hr|img|input|link|meta|param)(([\w:-]+)[^>]*)\/>/gi,
    // Support: IE 10-11, Edge 10240+
    // In IE/Edge using regex groups here causes severe slowdowns.
    // See https://connect.microsoft.com/IE/feedback/details/1736512/
    rnoInnerhtml = /<script|<style|<link/i,
    // checked="checked" or checked
    rchecked = /checked\s*(?:[^=]|=\s*.checked.)/i,
    rscriptTypeMasked = /^true\/(.*)/,
    rcleanScript = /^\s*<!(?:\[CDATA\[|--)|(?:\]\]|--)>\s*$/g,
    safeFragment = createSafeFragment(document),
    fragmentDiv = safeFragment.appendChild(document.createElement("div"));

  // Support: IE<8
  // Manipulating tables requires a tbody
  function manipulationTarget(elem, content) {
    return jQuery.nodeName(elem, "table") && jQuery.nodeName(content.nodeType !== 11 ? content : content.firstChild, "tr") ? elem.getElementsByTagName("tbody")[0] || elem.appendChild(elem.ownerDocument.createElement("tbody")) : elem;
  }

  // Replace/restore the type attribute of script elements for safe DOM manipulation
  function disableScript(elem) {
    elem.type = (jQuery.find.attr(elem, "type") !== null) + "/" + elem.type;
    return elem;
  }
  function restoreScript(elem) {
    var match = rscriptTypeMasked.exec(elem.type);
    if (match) {
      elem.type = match[1];
    } else {
      elem.removeAttribute("type");
    }
    return elem;
  }
  function cloneCopyEvent(src, dest) {
    if (dest.nodeType !== 1 || !jQuery.hasData(src)) {
      return;
    }
    var type,
      i,
      l,
      oldData = jQuery._data(src),
      curData = jQuery._data(dest, oldData),
      events = oldData.events;
    if (events) {
      delete curData.handle;
      curData.events = {};
      for (type in events) {
        for (i = 0, l = events[type].length; i < l; i++) {
          jQuery.event.add(dest, type, events[type][i]);
        }
      }
    }

    // make the cloned public data object a copy from the original
    if (curData.data) {
      curData.data = jQuery.extend({}, curData.data);
    }
  }
  function fixCloneNodeIssues(src, dest) {
    var nodeName, e, data;

    // We do not need to do anything for non-Elements
    if (dest.nodeType !== 1) {
      return;
    }
    nodeName = dest.nodeName.toLowerCase();

    // IE6-8 copies events bound via attachEvent when using cloneNode.
    if (!support.noCloneEvent && dest[jQuery.expando]) {
      data = jQuery._data(dest);
      for (e in data.events) {
        jQuery.removeEvent(dest, e, data.handle);
      }

      // Event data gets referenced instead of copied if the expando gets copied too
      dest.removeAttribute(jQuery.expando);
    }

    // IE blanks contents when cloning scripts, and tries to evaluate newly-set text
    if (nodeName === "script" && dest.text !== src.text) {
      disableScript(dest).text = src.text;
      restoreScript(dest);

      // IE6-10 improperly clones children of object elements using classid.
      // IE10 throws NoModificationAllowedError if parent is null, #12132.
    } else if (nodeName === "object") {
      if (dest.parentNode) {
        dest.outerHTML = src.outerHTML;
      }

      // This path appears unavoidable for IE9. When cloning an object
      // element in IE9, the outerHTML strategy above is not sufficient.
      // If the src has innerHTML and the destination does not,
      // copy the src.innerHTML into the dest.innerHTML. #10324
      if (support.html5Clone && src.innerHTML && !jQuery.trim(dest.innerHTML)) {
        dest.innerHTML = src.innerHTML;
      }
    } else if (nodeName === "input" && rcheckableType.test(src.type)) {
      // IE6-8 fails to persist the checked state of a cloned checkbox
      // or radio button. Worse, IE6-7 fail to give the cloned element
      // a checked appearance if the defaultChecked value isn't also set

      dest.defaultChecked = dest.checked = src.checked;

      // IE6-7 get confused and end up setting the value of a cloned
      // checkbox/radio button to an empty string instead of "on"
      if (dest.value !== src.value) {
        dest.value = src.value;
      }

      // IE6-8 fails to return the selected option to the default selected
      // state when cloning options
    } else if (nodeName === "option") {
      dest.defaultSelected = dest.selected = src.defaultSelected;

      // IE6-8 fails to set the defaultValue to the correct value when
      // cloning other types of input fields
    } else if (nodeName === "input" || nodeName === "textarea") {
      dest.defaultValue = src.defaultValue;
    }
  }
  function domManip(collection, args, callback, ignored) {
    // Flatten any nested arrays
    args = concat.apply([], args);
    var first,
      node,
      hasScripts,
      scripts,
      doc,
      fragment,
      i = 0,
      l = collection.length,
      iNoClone = l - 1,
      value = args[0],
      isFunction = jQuery.isFunction(value);

    // We can't cloneNode fragments that contain checked, in WebKit
    if (isFunction || l > 1 && typeof value === "string" && !support.checkClone && rchecked.test(value)) {
      return collection.each(function (index) {
        var self = collection.eq(index);
        if (isFunction) {
          args[0] = value.call(this, index, self.html());
        }
        domManip(self, args, callback, ignored);
      });
    }
    if (l) {
      fragment = buildFragment(args, collection[0].ownerDocument, false, collection, ignored);
      first = fragment.firstChild;
      if (fragment.childNodes.length === 1) {
        fragment = first;
      }

      // Require either new content or an interest in ignored elements to invoke the callback
      if (first || ignored) {
        scripts = jQuery.map(getAll(fragment, "script"), disableScript);
        hasScripts = scripts.length;

        // Use the original fragment for the last item
        // instead of the first because it can end up
        // being emptied incorrectly in certain situations (#8070).
        for (; i < l; i++) {
          node = fragment;
          if (i !== iNoClone) {
            node = jQuery.clone(node, true, true);

            // Keep references to cloned scripts for later restoration
            if (hasScripts) {
              // Support: Android<4.1, PhantomJS<2
              // push.apply(_, arraylike) throws on ancient WebKit
              jQuery.merge(scripts, getAll(node, "script"));
            }
          }
          callback.call(collection[i], node, i);
        }
        if (hasScripts) {
          doc = scripts[scripts.length - 1].ownerDocument;

          // Reenable scripts
          jQuery.map(scripts, restoreScript);

          // Evaluate executable scripts on first document insertion
          for (i = 0; i < hasScripts; i++) {
            node = scripts[i];
            if (rscriptType.test(node.type || "") && !jQuery._data(node, "globalEval") && jQuery.contains(doc, node)) {
              if (node.src) {
                // Optional AJAX dependency, but won't run scripts if not present
                if (jQuery._evalUrl) {
                  jQuery._evalUrl(node.src);
                }
              } else {
                jQuery.globalEval((node.text || node.textContent || node.innerHTML || "").replace(rcleanScript, ""));
              }
            }
          }
        }

        // Fix #11809: Avoid leaking memory
        fragment = first = null;
      }
    }
    return collection;
  }
  function _remove(elem, selector, keepData) {
    var node,
      elems = selector ? jQuery.filter(selector, elem) : elem,
      i = 0;
    for (; (node = elems[i]) != null; i++) {
      if (!keepData && node.nodeType === 1) {
        jQuery.cleanData(getAll(node));
      }
      if (node.parentNode) {
        if (keepData && jQuery.contains(node.ownerDocument, node)) {
          setGlobalEval(getAll(node, "script"));
        }
        node.parentNode.removeChild(node);
      }
    }
    return elem;
  }
  jQuery.extend({
    htmlPrefilter: function htmlPrefilter(html) {
      return html.replace(rxhtmlTag, "<$1></$2>");
    },
    clone: function clone(elem, dataAndEvents, deepDataAndEvents) {
      var destElements,
        node,
        clone,
        i,
        srcElements,
        inPage = jQuery.contains(elem.ownerDocument, elem);
      if (support.html5Clone || jQuery.isXMLDoc(elem) || !rnoshimcache.test("<" + elem.nodeName + ">")) {
        clone = elem.cloneNode(true);

        // IE<=8 does not properly clone detached, unknown element nodes
      } else {
        fragmentDiv.innerHTML = elem.outerHTML;
        fragmentDiv.removeChild(clone = fragmentDiv.firstChild);
      }
      if ((!support.noCloneEvent || !support.noCloneChecked) && (elem.nodeType === 1 || elem.nodeType === 11) && !jQuery.isXMLDoc(elem)) {
        // We eschew Sizzle here for performance reasons: http://jsperf.com/getall-vs-sizzle/2
        destElements = getAll(clone);
        srcElements = getAll(elem);

        // Fix all IE cloning issues
        for (i = 0; (node = srcElements[i]) != null; ++i) {
          // Ensure that the destination node is not null; Fixes #9587
          if (destElements[i]) {
            fixCloneNodeIssues(node, destElements[i]);
          }
        }
      }

      // Copy the events from the original to the clone
      if (dataAndEvents) {
        if (deepDataAndEvents) {
          srcElements = srcElements || getAll(elem);
          destElements = destElements || getAll(clone);
          for (i = 0; (node = srcElements[i]) != null; i++) {
            cloneCopyEvent(node, destElements[i]);
          }
        } else {
          cloneCopyEvent(elem, clone);
        }
      }

      // Preserve script evaluation history
      destElements = getAll(clone, "script");
      if (destElements.length > 0) {
        setGlobalEval(destElements, !inPage && getAll(elem, "script"));
      }
      destElements = srcElements = node = null;

      // Return the cloned set
      return clone;
    },
    cleanData: function cleanData(elems, /* internal */forceAcceptData) {
      var elem,
        type,
        id,
        data,
        i = 0,
        internalKey = jQuery.expando,
        cache = jQuery.cache,
        attributes = support.attributes,
        special = jQuery.event.special;
      for (; (elem = elems[i]) != null; i++) {
        if (forceAcceptData || acceptData(elem)) {
          id = elem[internalKey];
          data = id && cache[id];
          if (data) {
            if (data.events) {
              for (type in data.events) {
                if (special[type]) {
                  jQuery.event.remove(elem, type);

                  // This is a shortcut to avoid jQuery.event.remove's overhead
                } else {
                  jQuery.removeEvent(elem, type, data.handle);
                }
              }
            }

            // Remove cache only if it was not already removed by jQuery.event.remove
            if (cache[id]) {
              delete cache[id];

              // Support: IE<9
              // IE does not allow us to delete expando properties from nodes
              // IE creates expando attributes along with the property
              // IE does not have a removeAttribute function on Document nodes
              if (!attributes && typeof elem.removeAttribute !== "undefined") {
                elem.removeAttribute(internalKey);

                // Webkit & Blink performance suffers when deleting properties
                // from DOM nodes, so set to undefined instead
                // https://code.google.com/p/chromium/issues/detail?id=378607
              } else {
                elem[internalKey] = undefined;
              }
              deletedIds.push(id);
            }
          }
        }
      }
    }
  });
  jQuery.fn.extend({
    // Keep domManip exposed until 3.0 (gh-2225)
    domManip: domManip,
    detach: function detach(selector) {
      return _remove(this, selector, true);
    },
    remove: function remove(selector) {
      return _remove(this, selector);
    },
    text: function text(value) {
      return access(this, function (value) {
        return value === undefined ? jQuery.text(this) : this.empty().append((this[0] && this[0].ownerDocument || document).createTextNode(value));
      }, null, value, arguments.length);
    },
    append: function append() {
      return domManip(this, arguments, function (elem) {
        if (this.nodeType === 1 || this.nodeType === 11 || this.nodeType === 9) {
          var target = manipulationTarget(this, elem);
          target.appendChild(elem);
        }
      });
    },
    prepend: function prepend() {
      return domManip(this, arguments, function (elem) {
        if (this.nodeType === 1 || this.nodeType === 11 || this.nodeType === 9) {
          var target = manipulationTarget(this, elem);
          target.insertBefore(elem, target.firstChild);
        }
      });
    },
    before: function before() {
      return domManip(this, arguments, function (elem) {
        if (this.parentNode) {
          this.parentNode.insertBefore(elem, this);
        }
      });
    },
    after: function after() {
      return domManip(this, arguments, function (elem) {
        if (this.parentNode) {
          this.parentNode.insertBefore(elem, this.nextSibling);
        }
      });
    },
    empty: function empty() {
      var elem,
        i = 0;
      for (; (elem = this[i]) != null; i++) {
        // Remove element nodes and prevent memory leaks
        if (elem.nodeType === 1) {
          jQuery.cleanData(getAll(elem, false));
        }

        // Remove any remaining nodes
        while (elem.firstChild) {
          elem.removeChild(elem.firstChild);
        }

        // If this is a select, ensure that it displays empty (#12336)
        // Support: IE<9
        if (elem.options && jQuery.nodeName(elem, "select")) {
          elem.options.length = 0;
        }
      }
      return this;
    },
    clone: function clone(dataAndEvents, deepDataAndEvents) {
      dataAndEvents = dataAndEvents == null ? false : dataAndEvents;
      deepDataAndEvents = deepDataAndEvents == null ? dataAndEvents : deepDataAndEvents;
      return this.map(function () {
        return jQuery.clone(this, dataAndEvents, deepDataAndEvents);
      });
    },
    html: function html(value) {
      return access(this, function (value) {
        var elem = this[0] || {},
          i = 0,
          l = this.length;
        if (value === undefined) {
          return elem.nodeType === 1 ? elem.innerHTML.replace(rinlinejQuery, "") : undefined;
        }

        // See if we can take a shortcut and just use innerHTML
        if (typeof value === "string" && !rnoInnerhtml.test(value) && (support.htmlSerialize || !rnoshimcache.test(value)) && (support.leadingWhitespace || !rleadingWhitespace.test(value)) && !wrapMap[(rtagName.exec(value) || ["", ""])[1].toLowerCase()]) {
          value = jQuery.htmlPrefilter(value);
          try {
            for (; i < l; i++) {
              // Remove element nodes and prevent memory leaks
              elem = this[i] || {};
              if (elem.nodeType === 1) {
                jQuery.cleanData(getAll(elem, false));
                elem.innerHTML = value;
              }
            }
            elem = 0;

            // If using innerHTML throws an exception, use the fallback method
          } catch (e) {}
        }
        if (elem) {
          this.empty().append(value);
        }
      }, null, value, arguments.length);
    },
    replaceWith: function replaceWith() {
      var ignored = [];

      // Make the changes, replacing each non-ignored context element with the new content
      return domManip(this, arguments, function (elem) {
        var parent = this.parentNode;
        if (jQuery.inArray(this, ignored) < 0) {
          jQuery.cleanData(getAll(this));
          if (parent) {
            parent.replaceChild(elem, this);
          }
        }

        // Force callback invocation
      }, ignored);
    }
  });
  jQuery.each({
    appendTo: "append",
    prependTo: "prepend",
    insertBefore: "before",
    insertAfter: "after",
    replaceAll: "replaceWith"
  }, function (name, original) {
    jQuery.fn[name] = function (selector) {
      var elems,
        i = 0,
        ret = [],
        insert = jQuery(selector),
        last = insert.length - 1;
      for (; i <= last; i++) {
        elems = i === last ? this : this.clone(true);
        jQuery(insert[i])[original](elems);

        // Modern browsers can apply jQuery collections as arrays, but oldIE needs a .get()
        push.apply(ret, elems.get());
      }
      return this.pushStack(ret);
    };
  });
  var iframe,
    elemdisplay = {
      // Support: Firefox
      // We have to pre-define these values for FF (#10227)
      HTML: "block",
      BODY: "block"
    };

  /**
   * Retrieve the actual display of a element
   * @param {String} name nodeName of the element
   * @param {Object} doc Document object
   */

  // Called only from within defaultDisplay
  function actualDisplay(name, doc) {
    var elem = jQuery(doc.createElement(name)).appendTo(doc.body),
      display = jQuery.css(elem[0], "display");

    // We don't have any data stored on the element,
    // so use "detach" method as fast way to get rid of the element
    elem.detach();
    return display;
  }

  /**
   * Try to determine the default display value of an element
   * @param {String} nodeName
   */
  function defaultDisplay(nodeName) {
    var doc = document,
      display = elemdisplay[nodeName];
    if (!display) {
      display = actualDisplay(nodeName, doc);

      // If the simple way fails, read from inside an iframe
      if (display === "none" || !display) {
        // Use the already-created iframe if possible
        iframe = (iframe || jQuery("<iframe frameborder='0' width='0' height='0'/>")).appendTo(doc.documentElement);

        // Always write a new HTML skeleton so Webkit and Firefox don't choke on reuse
        doc = (iframe[0].contentWindow || iframe[0].contentDocument).document;

        // Support: IE
        doc.write();
        doc.close();
        display = actualDisplay(nodeName, doc);
        iframe.detach();
      }

      // Store the correct default display
      elemdisplay[nodeName] = display;
    }
    return display;
  }
  var rmargin = /^margin/;
  var rnumnonpx = new RegExp("^(" + pnum + ")(?!px)[a-z%]+$", "i");
  var swap = function swap(elem, options, callback, args) {
    var ret,
      name,
      old = {};

    // Remember the old values, and insert the new ones
    for (name in options) {
      old[name] = elem.style[name];
      elem.style[name] = options[name];
    }
    ret = callback.apply(elem, args || []);

    // Revert the old values
    for (name in options) {
      elem.style[name] = old[name];
    }
    return ret;
  };
  var documentElement = document.documentElement;
  (function () {
    var pixelPositionVal,
      pixelMarginRightVal,
      boxSizingReliableVal,
      reliableHiddenOffsetsVal,
      reliableMarginRightVal,
      reliableMarginLeftVal,
      container = document.createElement("div"),
      div = document.createElement("div");

    // Finish early in limited (non-browser) environments
    if (!div.style) {
      return;
    }
    div.style.cssText = "float:left;opacity:.5";

    // Support: IE<9
    // Make sure that element opacity exists (as opposed to filter)
    support.opacity = div.style.opacity === "0.5";

    // Verify style float existence
    // (IE uses styleFloat instead of cssFloat)
    support.cssFloat = !!div.style.cssFloat;
    div.style.backgroundClip = "content-box";
    div.cloneNode(true).style.backgroundClip = "";
    support.clearCloneStyle = div.style.backgroundClip === "content-box";
    container = document.createElement("div");
    container.style.cssText = "border:0;width:8px;height:0;top:0;left:-9999px;" + "padding:0;margin-top:1px;position:absolute";
    div.innerHTML = "";
    container.appendChild(div);

    // Support: Firefox<29, Android 2.3
    // Vendor-prefix box-sizing
    support.boxSizing = div.style.boxSizing === "" || div.style.MozBoxSizing === "" || div.style.WebkitBoxSizing === "";
    jQuery.extend(support, {
      reliableHiddenOffsets: function reliableHiddenOffsets() {
        if (pixelPositionVal == null) {
          computeStyleTests();
        }
        return reliableHiddenOffsetsVal;
      },
      boxSizingReliable: function boxSizingReliable() {
        // We're checking for pixelPositionVal here instead of boxSizingReliableVal
        // since that compresses better and they're computed together anyway.
        if (pixelPositionVal == null) {
          computeStyleTests();
        }
        return boxSizingReliableVal;
      },
      pixelMarginRight: function pixelMarginRight() {
        // Support: Android 4.0-4.3
        if (pixelPositionVal == null) {
          computeStyleTests();
        }
        return pixelMarginRightVal;
      },
      pixelPosition: function pixelPosition() {
        if (pixelPositionVal == null) {
          computeStyleTests();
        }
        return pixelPositionVal;
      },
      reliableMarginRight: function reliableMarginRight() {
        // Support: Android 2.3
        if (pixelPositionVal == null) {
          computeStyleTests();
        }
        return reliableMarginRightVal;
      },
      reliableMarginLeft: function reliableMarginLeft() {
        // Support: IE <=8 only, Android 4.0 - 4.3 only, Firefox <=3 - 37
        if (pixelPositionVal == null) {
          computeStyleTests();
        }
        return reliableMarginLeftVal;
      }
    });
    function computeStyleTests() {
      var contents,
        divStyle,
        documentElement = document.documentElement;

      // Setup
      documentElement.appendChild(container);
      div.style.cssText =
      // Support: Android 2.3
      // Vendor-prefix box-sizing
      "-webkit-box-sizing:border-box;box-sizing:border-box;" + "position:relative;display:block;" + "margin:auto;border:1px;padding:1px;" + "top:1%;width:50%";

      // Support: IE<9
      // Assume reasonable values in the absence of getComputedStyle
      pixelPositionVal = boxSizingReliableVal = reliableMarginLeftVal = false;
      pixelMarginRightVal = reliableMarginRightVal = true;

      // Check for getComputedStyle so that this code is not run in IE<9.
      if (window.getComputedStyle) {
        divStyle = window.getComputedStyle(div);
        pixelPositionVal = (divStyle || {}).top !== "1%";
        reliableMarginLeftVal = (divStyle || {}).marginLeft === "2px";
        boxSizingReliableVal = (divStyle || {
          width: "4px"
        }).width === "4px";

        // Support: Android 4.0 - 4.3 only
        // Some styles come back with percentage values, even though they shouldn't
        div.style.marginRight = "50%";
        pixelMarginRightVal = (divStyle || {
          marginRight: "4px"
        }).marginRight === "4px";

        // Support: Android 2.3 only
        // Div with explicit width and no margin-right incorrectly
        // gets computed margin-right based on width of container (#3333)
        // WebKit Bug 13343 - getComputedStyle returns wrong value for margin-right
        contents = div.appendChild(document.createElement("div"));

        // Reset CSS: box-sizing; display; margin; border; padding
        contents.style.cssText = div.style.cssText =
        // Support: Android 2.3
        // Vendor-prefix box-sizing
        "-webkit-box-sizing:content-box;-moz-box-sizing:content-box;" + "box-sizing:content-box;display:block;margin:0;border:0;padding:0";
        contents.style.marginRight = contents.style.width = "0";
        div.style.width = "1px";
        reliableMarginRightVal = !parseFloat((window.getComputedStyle(contents) || {}).marginRight);
        div.removeChild(contents);
      }

      // Support: IE6-8
      // First check that getClientRects works as expected
      // Check if table cells still have offsetWidth/Height when they are set
      // to display:none and there are still other visible table cells in a
      // table row; if so, offsetWidth/Height are not reliable for use when
      // determining if an element has been hidden directly using
      // display:none (it is still safe to use offsets if a parent element is
      // hidden; don safety goggles and see bug #4512 for more information).
      div.style.display = "none";
      reliableHiddenOffsetsVal = div.getClientRects().length === 0;
      if (reliableHiddenOffsetsVal) {
        div.style.display = "";
        div.innerHTML = "<table><tr><td></td><td>t</td></tr></table>";
        div.childNodes[0].style.borderCollapse = "separate";
        contents = div.getElementsByTagName("td");
        contents[0].style.cssText = "margin:0;border:0;padding:0;display:none";
        reliableHiddenOffsetsVal = contents[0].offsetHeight === 0;
        if (reliableHiddenOffsetsVal) {
          contents[0].style.display = "";
          contents[1].style.display = "none";
          reliableHiddenOffsetsVal = contents[0].offsetHeight === 0;
        }
      }

      // Teardown
      documentElement.removeChild(container);
    }
  })();
  var getStyles,
    curCSS,
    rposition = /^(top|right|bottom|left)$/;
  if (window.getComputedStyle) {
    getStyles = function getStyles(elem) {
      // Support: IE<=11+, Firefox<=30+ (#15098, #14150)
      // IE throws on elements created in popups
      // FF meanwhile throws on frame elements through "defaultView.getComputedStyle"
      var view = elem.ownerDocument.defaultView;
      if (!view || !view.opener) {
        view = window;
      }
      return view.getComputedStyle(elem);
    };
    curCSS = function curCSS(elem, name, computed) {
      var width,
        minWidth,
        maxWidth,
        ret,
        style = elem.style;
      computed = computed || getStyles(elem);

      // getPropertyValue is only needed for .css('filter') in IE9, see #12537
      ret = computed ? computed.getPropertyValue(name) || computed[name] : undefined;

      // Support: Opera 12.1x only
      // Fall back to style even without computed
      // computed is undefined for elems on document fragments
      if ((ret === "" || ret === undefined) && !jQuery.contains(elem.ownerDocument, elem)) {
        ret = jQuery.style(elem, name);
      }
      if (computed) {
        // A tribute to the "awesome hack by Dean Edwards"
        // Chrome < 17 and Safari 5.0 uses "computed value"
        // instead of "used value" for margin-right
        // Safari 5.1.7 (at least) returns percentage for a larger set of values,
        // but width seems to be reliably pixels
        // this is against the CSSOM draft spec:
        // http://dev.w3.org/csswg/cssom/#resolved-values
        if (!support.pixelMarginRight() && rnumnonpx.test(ret) && rmargin.test(name)) {
          // Remember the original values
          width = style.width;
          minWidth = style.minWidth;
          maxWidth = style.maxWidth;

          // Put in the new values to get a computed value out
          style.minWidth = style.maxWidth = style.width = ret;
          ret = computed.width;

          // Revert the changed values
          style.width = width;
          style.minWidth = minWidth;
          style.maxWidth = maxWidth;
        }
      }

      // Support: IE
      // IE returns zIndex value as an integer.
      return ret === undefined ? ret : ret + "";
    };
  } else if (documentElement.currentStyle) {
    getStyles = function getStyles(elem) {
      return elem.currentStyle;
    };
    curCSS = function curCSS(elem, name, computed) {
      var left,
        rs,
        rsLeft,
        ret,
        style = elem.style;
      computed = computed || getStyles(elem);
      ret = computed ? computed[name] : undefined;

      // Avoid setting ret to empty string here
      // so we don't default to auto
      if (ret == null && style && style[name]) {
        ret = style[name];
      }

      // From the awesome hack by Dean Edwards
      // http://erik.eae.net/archives/2007/07/27/18.54.15/#comment-102291

      // If we're not dealing with a regular pixel number
      // but a number that has a weird ending, we need to convert it to pixels
      // but not position css attributes, as those are
      // proportional to the parent element instead
      // and we can't measure the parent instead because it
      // might trigger a "stacking dolls" problem
      if (rnumnonpx.test(ret) && !rposition.test(name)) {
        // Remember the original values
        left = style.left;
        rs = elem.runtimeStyle;
        rsLeft = rs && rs.left;

        // Put in the new values to get a computed value out
        if (rsLeft) {
          rs.left = elem.currentStyle.left;
        }
        style.left = name === "fontSize" ? "1em" : ret;
        ret = style.pixelLeft + "px";

        // Revert the changed values
        style.left = left;
        if (rsLeft) {
          rs.left = rsLeft;
        }
      }

      // Support: IE
      // IE returns zIndex value as an integer.
      return ret === undefined ? ret : ret + "" || "auto";
    };
  }
  function addGetHookIf(conditionFn, hookFn) {
    // Define the hook, we'll check on the first run if it's really needed.
    return {
      get: function get() {
        if (conditionFn()) {
          // Hook not needed (or it's not possible to use it due
          // to missing dependency), remove it.
          delete this.get;
          return;
        }

        // Hook needed; redefine it so that the support test is not executed again.
        return (this.get = hookFn).apply(this, arguments);
      }
    };
  }
  var ralpha = /alpha\([^)]*\)/i,
    ropacity = /opacity\s*=\s*([^)]*)/i,
    // swappable if display is none or starts with table except
    // "table", "table-cell", or "table-caption"
    // see here for display values:
    // https://developer.mozilla.org/en-US/docs/CSS/display
    rdisplayswap = /^(none|table(?!-c[ea]).+)/,
    rnumsplit = new RegExp("^(" + pnum + ")(.*)$", "i"),
    cssShow = {
      position: "absolute",
      visibility: "hidden",
      display: "block"
    },
    cssNormalTransform = {
      letterSpacing: "0",
      fontWeight: "400"
    },
    cssPrefixes = ["Webkit", "O", "Moz", "ms"],
    emptyStyle = document.createElement("div").style;

  // return a css property mapped to a potentially vendor prefixed property
  function vendorPropName(name) {
    // shortcut for names that are not vendor prefixed
    if (name in emptyStyle) {
      return name;
    }

    // check for vendor prefixed names
    var capName = name.charAt(0).toUpperCase() + name.slice(1),
      i = cssPrefixes.length;
    while (i--) {
      name = cssPrefixes[i] + capName;
      if (name in emptyStyle) {
        return name;
      }
    }
  }
  function showHide(elements, show) {
    var display,
      elem,
      hidden,
      values = [],
      index = 0,
      length = elements.length;
    for (; index < length; index++) {
      elem = elements[index];
      if (!elem.style) {
        continue;
      }
      values[index] = jQuery._data(elem, "olddisplay");
      display = elem.style.display;
      if (show) {
        // Reset the inline display of this element to learn if it is
        // being hidden by cascaded rules or not
        if (!values[index] && display === "none") {
          elem.style.display = "";
        }

        // Set elements which have been overridden with display: none
        // in a stylesheet to whatever the default browser style is
        // for such an element
        if (elem.style.display === "" && isHidden(elem)) {
          values[index] = jQuery._data(elem, "olddisplay", defaultDisplay(elem.nodeName));
        }
      } else {
        hidden = isHidden(elem);
        if (display && display !== "none" || !hidden) {
          jQuery._data(elem, "olddisplay", hidden ? display : jQuery.css(elem, "display"));
        }
      }
    }

    // Set the display of most of the elements in a second loop
    // to avoid the constant reflow
    for (index = 0; index < length; index++) {
      elem = elements[index];
      if (!elem.style) {
        continue;
      }
      if (!show || elem.style.display === "none" || elem.style.display === "") {
        elem.style.display = show ? values[index] || "" : "none";
      }
    }
    return elements;
  }
  function setPositiveNumber(elem, value, subtract) {
    var matches = rnumsplit.exec(value);
    return matches ?
    // Guard against undefined "subtract", e.g., when used as in cssHooks
    Math.max(0, matches[1] - (subtract || 0)) + (matches[2] || "px") : value;
  }
  function augmentWidthOrHeight(elem, name, extra, isBorderBox, styles) {
    var i = extra === (isBorderBox ? "border" : "content") ?
      // If we already have the right measurement, avoid augmentation
      4 :
      // Otherwise initialize for horizontal or vertical properties
      name === "width" ? 1 : 0,
      val = 0;
    for (; i < 4; i += 2) {
      // both box models exclude margin, so add it if we want it
      if (extra === "margin") {
        val += jQuery.css(elem, extra + cssExpand[i], true, styles);
      }
      if (isBorderBox) {
        // border-box includes padding, so remove it if we want content
        if (extra === "content") {
          val -= jQuery.css(elem, "padding" + cssExpand[i], true, styles);
        }

        // at this point, extra isn't border nor margin, so remove border
        if (extra !== "margin") {
          val -= jQuery.css(elem, "border" + cssExpand[i] + "Width", true, styles);
        }
      } else {
        // at this point, extra isn't content, so add padding
        val += jQuery.css(elem, "padding" + cssExpand[i], true, styles);

        // at this point, extra isn't content nor padding, so add border
        if (extra !== "padding") {
          val += jQuery.css(elem, "border" + cssExpand[i] + "Width", true, styles);
        }
      }
    }
    return val;
  }
  function getWidthOrHeight(elem, name, extra) {
    // Start with offset property, which is equivalent to the border-box value
    var valueIsBorderBox = true,
      val = name === "width" ? elem.offsetWidth : elem.offsetHeight,
      styles = getStyles(elem),
      isBorderBox = support.boxSizing && jQuery.css(elem, "boxSizing", false, styles) === "border-box";

    // some non-html elements return undefined for offsetWidth, so check for null/undefined
    // svg - https://bugzilla.mozilla.org/show_bug.cgi?id=649285
    // MathML - https://bugzilla.mozilla.org/show_bug.cgi?id=491668
    if (val <= 0 || val == null) {
      // Fall back to computed then uncomputed css if necessary
      val = curCSS(elem, name, styles);
      if (val < 0 || val == null) {
        val = elem.style[name];
      }

      // Computed unit is not pixels. Stop here and return.
      if (rnumnonpx.test(val)) {
        return val;
      }

      // we need the check for style in case a browser which returns unreliable values
      // for getComputedStyle silently falls back to the reliable elem.style
      valueIsBorderBox = isBorderBox && (support.boxSizingReliable() || val === elem.style[name]);

      // Normalize "", auto, and prepare for extra
      val = parseFloat(val) || 0;
    }

    // use the active box-sizing model to add/subtract irrelevant styles
    return val + augmentWidthOrHeight(elem, name, extra || (isBorderBox ? "border" : "content"), valueIsBorderBox, styles) + "px";
  }
  jQuery.extend({
    // Add in style property hooks for overriding the default
    // behavior of getting and setting a style property
    cssHooks: {
      opacity: {
        get: function get(elem, computed) {
          if (computed) {
            // We should always get a number back from opacity
            var ret = curCSS(elem, "opacity");
            return ret === "" ? "1" : ret;
          }
        }
      }
    },
    // Don't automatically add "px" to these possibly-unitless properties
    cssNumber: {
      "animationIterationCount": true,
      "columnCount": true,
      "fillOpacity": true,
      "flexGrow": true,
      "flexShrink": true,
      "fontWeight": true,
      "lineHeight": true,
      "opacity": true,
      "order": true,
      "orphans": true,
      "widows": true,
      "zIndex": true,
      "zoom": true
    },
    // Add in properties whose names you wish to fix before
    // setting or getting the value
    cssProps: {
      // normalize float css property
      "float": support.cssFloat ? "cssFloat" : "styleFloat"
    },
    // Get and set the style property on a DOM Node
    style: function style(elem, name, value, extra) {
      // Don't set styles on text and comment nodes
      if (!elem || elem.nodeType === 3 || elem.nodeType === 8 || !elem.style) {
        return;
      }

      // Make sure that we're working with the right name
      var ret,
        type,
        hooks,
        origName = jQuery.camelCase(name),
        style = elem.style;
      name = jQuery.cssProps[origName] || (jQuery.cssProps[origName] = vendorPropName(origName) || origName);

      // gets hook for the prefixed version
      // followed by the unprefixed version
      hooks = jQuery.cssHooks[name] || jQuery.cssHooks[origName];

      // Check if we're setting a value
      if (value !== undefined) {
        type = _typeof(value);

        // Convert "+=" or "-=" to relative numbers (#7345)
        if (type === "string" && (ret = rcssNum.exec(value)) && ret[1]) {
          value = adjustCSS(elem, name, ret);

          // Fixes bug #9237
          type = "number";
        }

        // Make sure that null and NaN values aren't set. See: #7116
        if (value == null || value !== value) {
          return;
        }

        // If a number was passed in, add the unit (except for certain CSS properties)
        if (type === "number") {
          value += ret && ret[3] || (jQuery.cssNumber[origName] ? "" : "px");
        }

        // Fixes #8908, it can be done more correctly by specifing setters in cssHooks,
        // but it would mean to define eight
        // (for every problematic property) identical functions
        if (!support.clearCloneStyle && value === "" && name.indexOf("background") === 0) {
          style[name] = "inherit";
        }

        // If a hook was provided, use that value, otherwise just set the specified value
        if (!hooks || !("set" in hooks) || (value = hooks.set(elem, value, extra)) !== undefined) {
          // Support: IE
          // Swallow errors from 'invalid' CSS values (#5509)
          try {
            style[name] = value;
          } catch (e) {}
        }
      } else {
        // If a hook was provided get the non-computed value from there
        if (hooks && "get" in hooks && (ret = hooks.get(elem, false, extra)) !== undefined) {
          return ret;
        }

        // Otherwise just get the value from the style object
        return style[name];
      }
    },
    css: function css(elem, name, extra, styles) {
      var num,
        val,
        hooks,
        origName = jQuery.camelCase(name);

      // Make sure that we're working with the right name
      name = jQuery.cssProps[origName] || (jQuery.cssProps[origName] = vendorPropName(origName) || origName);

      // gets hook for the prefixed version
      // followed by the unprefixed version
      hooks = jQuery.cssHooks[name] || jQuery.cssHooks[origName];

      // If a hook was provided get the computed value from there
      if (hooks && "get" in hooks) {
        val = hooks.get(elem, true, extra);
      }

      // Otherwise, if a way to get the computed value exists, use that
      if (val === undefined) {
        val = curCSS(elem, name, styles);
      }

      //convert "normal" to computed value
      if (val === "normal" && name in cssNormalTransform) {
        val = cssNormalTransform[name];
      }

      // Return, converting to number if forced or a qualifier was provided and val looks numeric
      if (extra === "" || extra) {
        num = parseFloat(val);
        return extra === true || isFinite(num) ? num || 0 : val;
      }
      return val;
    }
  });
  jQuery.each(["height", "width"], function (i, name) {
    jQuery.cssHooks[name] = {
      get: function get(elem, computed, extra) {
        if (computed) {
          // certain elements can have dimension info if we invisibly show them
          // however, it must have a current display style that would benefit from this
          return rdisplayswap.test(jQuery.css(elem, "display")) && elem.offsetWidth === 0 ? swap(elem, cssShow, function () {
            return getWidthOrHeight(elem, name, extra);
          }) : getWidthOrHeight(elem, name, extra);
        }
      },
      set: function set(elem, value, extra) {
        var styles = extra && getStyles(elem);
        return setPositiveNumber(elem, value, extra ? augmentWidthOrHeight(elem, name, extra, support.boxSizing && jQuery.css(elem, "boxSizing", false, styles) === "border-box", styles) : 0);
      }
    };
  });
  if (!support.opacity) {
    jQuery.cssHooks.opacity = {
      get: function get(elem, computed) {
        // IE uses filters for opacity
        return ropacity.test((computed && elem.currentStyle ? elem.currentStyle.filter : elem.style.filter) || "") ? 0.01 * parseFloat(RegExp.$1) + "" : computed ? "1" : "";
      },
      set: function set(elem, value) {
        var style = elem.style,
          currentStyle = elem.currentStyle,
          opacity = jQuery.isNumeric(value) ? "alpha(opacity=" + value * 100 + ")" : "",
          filter = currentStyle && currentStyle.filter || style.filter || "";

        // IE has trouble with opacity if it does not have layout
        // Force it by setting the zoom level
        style.zoom = 1;

        // if setting opacity to 1, and no other filters exist -
        // attempt to remove filter attribute #6652
        // if value === "", then remove inline opacity #12685
        if ((value >= 1 || value === "") && jQuery.trim(filter.replace(ralpha, "")) === "" && style.removeAttribute) {
          // Setting style.filter to null, "" & " " still leave "filter:" in the cssText
          // if "filter:" is present at all, clearType is disabled, we want to avoid this
          // style.removeAttribute is IE Only, but so apparently is this code path...
          style.removeAttribute("filter");

          // if there is no filter style applied in a css rule
          // or unset inline opacity, we are done
          if (value === "" || currentStyle && !currentStyle.filter) {
            return;
          }
        }

        // otherwise, set new filter values
        style.filter = ralpha.test(filter) ? filter.replace(ralpha, opacity) : filter + " " + opacity;
      }
    };
  }
  jQuery.cssHooks.marginRight = addGetHookIf(support.reliableMarginRight, function (elem, computed) {
    if (computed) {
      return swap(elem, {
        "display": "inline-block"
      }, curCSS, [elem, "marginRight"]);
    }
  });
  jQuery.cssHooks.marginLeft = addGetHookIf(support.reliableMarginLeft, function (elem, computed) {
    if (computed) {
      return (parseFloat(curCSS(elem, "marginLeft")) || (
      // Support: IE<=11+
      // Running getBoundingClientRect on a disconnected node in IE throws an error
      // Support: IE8 only
      // getClientRects() errors on disconnected elems
      jQuery.contains(elem.ownerDocument, elem) ? elem.getBoundingClientRect().left - swap(elem, {
        marginLeft: 0
      }, function () {
        return elem.getBoundingClientRect().left;
      }) : 0)) + "px";
    }
  });

  // These hooks are used by animate to expand properties
  jQuery.each({
    margin: "",
    padding: "",
    border: "Width"
  }, function (prefix, suffix) {
    jQuery.cssHooks[prefix + suffix] = {
      expand: function expand(value) {
        var i = 0,
          expanded = {},
          // assumes a single number if not a string
          parts = typeof value === "string" ? value.split(" ") : [value];
        for (; i < 4; i++) {
          expanded[prefix + cssExpand[i] + suffix] = parts[i] || parts[i - 2] || parts[0];
        }
        return expanded;
      }
    };
    if (!rmargin.test(prefix)) {
      jQuery.cssHooks[prefix + suffix].set = setPositiveNumber;
    }
  });
  jQuery.fn.extend({
    css: function css(name, value) {
      return access(this, function (elem, name, value) {
        var styles,
          len,
          map = {},
          i = 0;
        if (jQuery.isArray(name)) {
          styles = getStyles(elem);
          len = name.length;
          for (; i < len; i++) {
            map[name[i]] = jQuery.css(elem, name[i], false, styles);
          }
          return map;
        }
        return value !== undefined ? jQuery.style(elem, name, value) : jQuery.css(elem, name);
      }, name, value, arguments.length > 1);
    },
    show: function show() {
      return showHide(this, true);
    },
    hide: function hide() {
      return showHide(this);
    },
    toggle: function toggle(state) {
      if (typeof state === "boolean") {
        return state ? this.show() : this.hide();
      }
      return this.each(function () {
        if (isHidden(this)) {
          jQuery(this).show();
        } else {
          jQuery(this).hide();
        }
      });
    }
  });
  function Tween(elem, options, prop, end, easing) {
    return new Tween.prototype.init(elem, options, prop, end, easing);
  }
  jQuery.Tween = Tween;
  Tween.prototype = {
    constructor: Tween,
    init: function init(elem, options, prop, end, easing, unit) {
      this.elem = elem;
      this.prop = prop;
      this.easing = easing || jQuery.easing._default;
      this.options = options;
      this.start = this.now = this.cur();
      this.end = end;
      this.unit = unit || (jQuery.cssNumber[prop] ? "" : "px");
    },
    cur: function cur() {
      var hooks = Tween.propHooks[this.prop];
      return hooks && hooks.get ? hooks.get(this) : Tween.propHooks._default.get(this);
    },
    run: function run(percent) {
      var eased,
        hooks = Tween.propHooks[this.prop];
      if (this.options.duration) {
        this.pos = eased = jQuery.easing[this.easing](percent, this.options.duration * percent, 0, 1, this.options.duration);
      } else {
        this.pos = eased = percent;
      }
      this.now = (this.end - this.start) * eased + this.start;
      if (this.options.step) {
        this.options.step.call(this.elem, this.now, this);
      }
      if (hooks && hooks.set) {
        hooks.set(this);
      } else {
        Tween.propHooks._default.set(this);
      }
      return this;
    }
  };
  Tween.prototype.init.prototype = Tween.prototype;
  Tween.propHooks = {
    _default: {
      get: function get(tween) {
        var result;

        // Use a property on the element directly when it is not a DOM element,
        // or when there is no matching style property that exists.
        if (tween.elem.nodeType !== 1 || tween.elem[tween.prop] != null && tween.elem.style[tween.prop] == null) {
          return tween.elem[tween.prop];
        }

        // passing an empty string as a 3rd parameter to .css will automatically
        // attempt a parseFloat and fallback to a string if the parse fails
        // so, simple values such as "10px" are parsed to Float.
        // complex values such as "rotate(1rad)" are returned as is.
        result = jQuery.css(tween.elem, tween.prop, "");

        // Empty strings, null, undefined and "auto" are converted to 0.
        return !result || result === "auto" ? 0 : result;
      },
      set: function set(tween) {
        // use step hook for back compat - use cssHook if its there - use .style if its
        // available and use plain properties where available
        if (jQuery.fx.step[tween.prop]) {
          jQuery.fx.step[tween.prop](tween);
        } else if (tween.elem.nodeType === 1 && (tween.elem.style[jQuery.cssProps[tween.prop]] != null || jQuery.cssHooks[tween.prop])) {
          jQuery.style(tween.elem, tween.prop, tween.now + tween.unit);
        } else {
          tween.elem[tween.prop] = tween.now;
        }
      }
    }
  };

  // Support: IE <=9
  // Panic based approach to setting things on disconnected nodes

  Tween.propHooks.scrollTop = Tween.propHooks.scrollLeft = {
    set: function set(tween) {
      if (tween.elem.nodeType && tween.elem.parentNode) {
        tween.elem[tween.prop] = tween.now;
      }
    }
  };
  jQuery.easing = {
    linear: function linear(p) {
      return p;
    },
    swing: function swing(p) {
      return 0.5 - Math.cos(p * Math.PI) / 2;
    },
    _default: "swing"
  };
  jQuery.fx = Tween.prototype.init;

  // Back Compat <1.8 extension point
  jQuery.fx.step = {};
  var fxNow,
    timerId,
    rfxtypes = /^(?:toggle|show|hide)$/,
    rrun = /queueHooks$/;

  // Animations created synchronously will run synchronously
  function createFxNow() {
    window.setTimeout(function () {
      fxNow = undefined;
    });
    return fxNow = jQuery.now();
  }

  // Generate parameters to create a standard animation
  function genFx(type, includeWidth) {
    var which,
      attrs = {
        height: type
      },
      i = 0;

    // if we include width, step value is 1 to do all cssExpand values,
    // if we don't include width, step value is 2 to skip over Left and Right
    includeWidth = includeWidth ? 1 : 0;
    for (; i < 4; i += 2 - includeWidth) {
      which = cssExpand[i];
      attrs["margin" + which] = attrs["padding" + which] = type;
    }
    if (includeWidth) {
      attrs.opacity = attrs.width = type;
    }
    return attrs;
  }
  function createTween(value, prop, animation) {
    var tween,
      collection = (Animation.tweeners[prop] || []).concat(Animation.tweeners["*"]),
      index = 0,
      length = collection.length;
    for (; index < length; index++) {
      if (tween = collection[index].call(animation, prop, value)) {
        // we're done with this property
        return tween;
      }
    }
  }
  function defaultPrefilter(elem, props, opts) {
    /* jshint validthis: true */
    var prop,
      value,
      toggle,
      tween,
      hooks,
      oldfire,
      display,
      checkDisplay,
      anim = this,
      orig = {},
      style = elem.style,
      hidden = elem.nodeType && isHidden(elem),
      dataShow = jQuery._data(elem, "fxshow");

    // handle queue: false promises
    if (!opts.queue) {
      hooks = jQuery._queueHooks(elem, "fx");
      if (hooks.unqueued == null) {
        hooks.unqueued = 0;
        oldfire = hooks.empty.fire;
        hooks.empty.fire = function () {
          if (!hooks.unqueued) {
            oldfire();
          }
        };
      }
      hooks.unqueued++;
      anim.always(function () {
        // doing this makes sure that the complete handler will be called
        // before this completes
        anim.always(function () {
          hooks.unqueued--;
          if (!jQuery.queue(elem, "fx").length) {
            hooks.empty.fire();
          }
        });
      });
    }

    // height/width overflow pass
    if (elem.nodeType === 1 && ("height" in props || "width" in props)) {
      // Make sure that nothing sneaks out
      // Record all 3 overflow attributes because IE does not
      // change the overflow attribute when overflowX and
      // overflowY are set to the same value
      opts.overflow = [style.overflow, style.overflowX, style.overflowY];

      // Set display property to inline-block for height/width
      // animations on inline elements that are having width/height animated
      display = jQuery.css(elem, "display");

      // Test default display if display is currently "none"
      checkDisplay = display === "none" ? jQuery._data(elem, "olddisplay") || defaultDisplay(elem.nodeName) : display;
      if (checkDisplay === "inline" && jQuery.css(elem, "float") === "none") {
        // inline-level elements accept inline-block;
        // block-level elements need to be inline with layout
        if (!support.inlineBlockNeedsLayout || defaultDisplay(elem.nodeName) === "inline") {
          style.display = "inline-block";
        } else {
          style.zoom = 1;
        }
      }
    }
    if (opts.overflow) {
      style.overflow = "hidden";
      if (!support.shrinkWrapBlocks()) {
        anim.always(function () {
          style.overflow = opts.overflow[0];
          style.overflowX = opts.overflow[1];
          style.overflowY = opts.overflow[2];
        });
      }
    }

    // show/hide pass
    for (prop in props) {
      value = props[prop];
      if (rfxtypes.exec(value)) {
        delete props[prop];
        toggle = toggle || value === "toggle";
        if (value === (hidden ? "hide" : "show")) {
          // If there is dataShow left over from a stopped hide or show
          // and we are going to proceed with show, we should pretend to be hidden
          if (value === "show" && dataShow && dataShow[prop] !== undefined) {
            hidden = true;
          } else {
            continue;
          }
        }
        orig[prop] = dataShow && dataShow[prop] || jQuery.style(elem, prop);

        // Any non-fx value stops us from restoring the original display value
      } else {
        display = undefined;
      }
    }
    if (!jQuery.isEmptyObject(orig)) {
      if (dataShow) {
        if ("hidden" in dataShow) {
          hidden = dataShow.hidden;
        }
      } else {
        dataShow = jQuery._data(elem, "fxshow", {});
      }

      // store state if its toggle - enables .stop().toggle() to "reverse"
      if (toggle) {
        dataShow.hidden = !hidden;
      }
      if (hidden) {
        jQuery(elem).show();
      } else {
        anim.done(function () {
          jQuery(elem).hide();
        });
      }
      anim.done(function () {
        var prop;
        jQuery._removeData(elem, "fxshow");
        for (prop in orig) {
          jQuery.style(elem, prop, orig[prop]);
        }
      });
      for (prop in orig) {
        tween = createTween(hidden ? dataShow[prop] : 0, prop, anim);
        if (!(prop in dataShow)) {
          dataShow[prop] = tween.start;
          if (hidden) {
            tween.end = tween.start;
            tween.start = prop === "width" || prop === "height" ? 1 : 0;
          }
        }
      }

      // If this is a noop like .hide().hide(), restore an overwritten display value
    } else if ((display === "none" ? defaultDisplay(elem.nodeName) : display) === "inline") {
      style.display = display;
    }
  }
  function propFilter(props, specialEasing) {
    var index, name, easing, value, hooks;

    // camelCase, specialEasing and expand cssHook pass
    for (index in props) {
      name = jQuery.camelCase(index);
      easing = specialEasing[name];
      value = props[index];
      if (jQuery.isArray(value)) {
        easing = value[1];
        value = props[index] = value[0];
      }
      if (index !== name) {
        props[name] = value;
        delete props[index];
      }
      hooks = jQuery.cssHooks[name];
      if (hooks && "expand" in hooks) {
        value = hooks.expand(value);
        delete props[name];

        // not quite $.extend, this wont overwrite keys already present.
        // also - reusing 'index' from above because we have the correct "name"
        for (index in value) {
          if (!(index in props)) {
            props[index] = value[index];
            specialEasing[index] = easing;
          }
        }
      } else {
        specialEasing[name] = easing;
      }
    }
  }
  function Animation(elem, properties, options) {
    var result,
      stopped,
      index = 0,
      length = Animation.prefilters.length,
      deferred = jQuery.Deferred().always(function () {
        // don't match elem in the :animated selector
        delete tick.elem;
      }),
      tick = function tick() {
        if (stopped) {
          return false;
        }
        var currentTime = fxNow || createFxNow(),
          remaining = Math.max(0, animation.startTime + animation.duration - currentTime),
          // Support: Android 2.3
          // Archaic crash bug won't allow us to use `1 - ( 0.5 || 0 )` (#12497)
          temp = remaining / animation.duration || 0,
          percent = 1 - temp,
          index = 0,
          length = animation.tweens.length;
        for (; index < length; index++) {
          animation.tweens[index].run(percent);
        }
        deferred.notifyWith(elem, [animation, percent, remaining]);
        if (percent < 1 && length) {
          return remaining;
        } else {
          deferred.resolveWith(elem, [animation]);
          return false;
        }
      },
      animation = deferred.promise({
        elem: elem,
        props: jQuery.extend({}, properties),
        opts: jQuery.extend(true, {
          specialEasing: {},
          easing: jQuery.easing._default
        }, options),
        originalProperties: properties,
        originalOptions: options,
        startTime: fxNow || createFxNow(),
        duration: options.duration,
        tweens: [],
        createTween: function createTween(prop, end) {
          var tween = jQuery.Tween(elem, animation.opts, prop, end, animation.opts.specialEasing[prop] || animation.opts.easing);
          animation.tweens.push(tween);
          return tween;
        },
        stop: function stop(gotoEnd) {
          var index = 0,
            // if we are going to the end, we want to run all the tweens
            // otherwise we skip this part
            length = gotoEnd ? animation.tweens.length : 0;
          if (stopped) {
            return this;
          }
          stopped = true;
          for (; index < length; index++) {
            animation.tweens[index].run(1);
          }

          // resolve when we played the last frame
          // otherwise, reject
          if (gotoEnd) {
            deferred.notifyWith(elem, [animation, 1, 0]);
            deferred.resolveWith(elem, [animation, gotoEnd]);
          } else {
            deferred.rejectWith(elem, [animation, gotoEnd]);
          }
          return this;
        }
      }),
      props = animation.props;
    propFilter(props, animation.opts.specialEasing);
    for (; index < length; index++) {
      result = Animation.prefilters[index].call(animation, elem, props, animation.opts);
      if (result) {
        if (jQuery.isFunction(result.stop)) {
          jQuery._queueHooks(animation.elem, animation.opts.queue).stop = jQuery.proxy(result.stop, result);
        }
        return result;
      }
    }
    jQuery.map(props, createTween, animation);
    if (jQuery.isFunction(animation.opts.start)) {
      animation.opts.start.call(elem, animation);
    }
    jQuery.fx.timer(jQuery.extend(tick, {
      elem: elem,
      anim: animation,
      queue: animation.opts.queue
    }));

    // attach callbacks from options
    return animation.progress(animation.opts.progress).done(animation.opts.done, animation.opts.complete).fail(animation.opts.fail).always(animation.opts.always);
  }
  jQuery.Animation = jQuery.extend(Animation, {
    tweeners: {
      "*": [function (prop, value) {
        var tween = this.createTween(prop, value);
        adjustCSS(tween.elem, prop, rcssNum.exec(value), tween);
        return tween;
      }]
    },
    tweener: function tweener(props, callback) {
      if (jQuery.isFunction(props)) {
        callback = props;
        props = ["*"];
      } else {
        props = props.match(rnotwhite);
      }
      var prop,
        index = 0,
        length = props.length;
      for (; index < length; index++) {
        prop = props[index];
        Animation.tweeners[prop] = Animation.tweeners[prop] || [];
        Animation.tweeners[prop].unshift(callback);
      }
    },
    prefilters: [defaultPrefilter],
    prefilter: function prefilter(callback, prepend) {
      if (prepend) {
        Animation.prefilters.unshift(callback);
      } else {
        Animation.prefilters.push(callback);
      }
    }
  });
  jQuery.speed = function (speed, easing, fn) {
    var opt = speed && _typeof(speed) === "object" ? jQuery.extend({}, speed) : {
      complete: fn || !fn && easing || jQuery.isFunction(speed) && speed,
      duration: speed,
      easing: fn && easing || easing && !jQuery.isFunction(easing) && easing
    };
    opt.duration = jQuery.fx.off ? 0 : typeof opt.duration === "number" ? opt.duration : opt.duration in jQuery.fx.speeds ? jQuery.fx.speeds[opt.duration] : jQuery.fx.speeds._default;

    // normalize opt.queue - true/undefined/null -> "fx"
    if (opt.queue == null || opt.queue === true) {
      opt.queue = "fx";
    }

    // Queueing
    opt.old = opt.complete;
    opt.complete = function () {
      if (jQuery.isFunction(opt.old)) {
        opt.old.call(this);
      }
      if (opt.queue) {
        jQuery.dequeue(this, opt.queue);
      }
    };
    return opt;
  };
  jQuery.fn.extend({
    fadeTo: function fadeTo(speed, to, easing, callback) {
      // show any hidden elements after setting opacity to 0
      return this.filter(isHidden).css("opacity", 0).show()

      // animate to the value specified
      .end().animate({
        opacity: to
      }, speed, easing, callback);
    },
    animate: function animate(prop, speed, easing, callback) {
      var empty = jQuery.isEmptyObject(prop),
        optall = jQuery.speed(speed, easing, callback),
        doAnimation = function doAnimation() {
          // Operate on a copy of prop so per-property easing won't be lost
          var anim = Animation(this, jQuery.extend({}, prop), optall);

          // Empty animations, or finishing resolves immediately
          if (empty || jQuery._data(this, "finish")) {
            anim.stop(true);
          }
        };
      doAnimation.finish = doAnimation;
      return empty || optall.queue === false ? this.each(doAnimation) : this.queue(optall.queue, doAnimation);
    },
    stop: function stop(type, clearQueue, gotoEnd) {
      var stopQueue = function stopQueue(hooks) {
        var stop = hooks.stop;
        delete hooks.stop;
        stop(gotoEnd);
      };
      if (typeof type !== "string") {
        gotoEnd = clearQueue;
        clearQueue = type;
        type = undefined;
      }
      if (clearQueue && type !== false) {
        this.queue(type || "fx", []);
      }
      return this.each(function () {
        var dequeue = true,
          index = type != null && type + "queueHooks",
          timers = jQuery.timers,
          data = jQuery._data(this);
        if (index) {
          if (data[index] && data[index].stop) {
            stopQueue(data[index]);
          }
        } else {
          for (index in data) {
            if (data[index] && data[index].stop && rrun.test(index)) {
              stopQueue(data[index]);
            }
          }
        }
        for (index = timers.length; index--;) {
          if (timers[index].elem === this && (type == null || timers[index].queue === type)) {
            timers[index].anim.stop(gotoEnd);
            dequeue = false;
            timers.splice(index, 1);
          }
        }

        // start the next in the queue if the last step wasn't forced
        // timers currently will call their complete callbacks, which will dequeue
        // but only if they were gotoEnd
        if (dequeue || !gotoEnd) {
          jQuery.dequeue(this, type);
        }
      });
    },
    finish: function finish(type) {
      if (type !== false) {
        type = type || "fx";
      }
      return this.each(function () {
        var index,
          data = jQuery._data(this),
          queue = data[type + "queue"],
          hooks = data[type + "queueHooks"],
          timers = jQuery.timers,
          length = queue ? queue.length : 0;

        // enable finishing flag on private data
        data.finish = true;

        // empty the queue first
        jQuery.queue(this, type, []);
        if (hooks && hooks.stop) {
          hooks.stop.call(this, true);
        }

        // look for any active animations, and finish them
        for (index = timers.length; index--;) {
          if (timers[index].elem === this && timers[index].queue === type) {
            timers[index].anim.stop(true);
            timers.splice(index, 1);
          }
        }

        // look for any animations in the old queue and finish them
        for (index = 0; index < length; index++) {
          if (queue[index] && queue[index].finish) {
            queue[index].finish.call(this);
          }
        }

        // turn off finishing flag
        delete data.finish;
      });
    }
  });
  jQuery.each(["toggle", "show", "hide"], function (i, name) {
    var cssFn = jQuery.fn[name];
    jQuery.fn[name] = function (speed, easing, callback) {
      return speed == null || typeof speed === "boolean" ? cssFn.apply(this, arguments) : this.animate(genFx(name, true), speed, easing, callback);
    };
  });

  // Generate shortcuts for custom animations
  jQuery.each({
    slideDown: genFx("show"),
    slideUp: genFx("hide"),
    slideToggle: genFx("toggle"),
    fadeIn: {
      opacity: "show"
    },
    fadeOut: {
      opacity: "hide"
    },
    fadeToggle: {
      opacity: "toggle"
    }
  }, function (name, props) {
    jQuery.fn[name] = function (speed, easing, callback) {
      return this.animate(props, speed, easing, callback);
    };
  });
  jQuery.timers = [];
  jQuery.fx.tick = function () {
    var timer,
      timers = jQuery.timers,
      i = 0;
    fxNow = jQuery.now();
    for (; i < timers.length; i++) {
      timer = timers[i];

      // Checks the timer has not already been removed
      if (!timer() && timers[i] === timer) {
        timers.splice(i--, 1);
      }
    }
    if (!timers.length) {
      jQuery.fx.stop();
    }
    fxNow = undefined;
  };
  jQuery.fx.timer = function (timer) {
    jQuery.timers.push(timer);
    if (timer()) {
      jQuery.fx.start();
    } else {
      jQuery.timers.pop();
    }
  };
  jQuery.fx.interval = 13;
  jQuery.fx.start = function () {
    if (!timerId) {
      timerId = window.setInterval(jQuery.fx.tick, jQuery.fx.interval);
    }
  };
  jQuery.fx.stop = function () {
    window.clearInterval(timerId);
    timerId = null;
  };
  jQuery.fx.speeds = {
    slow: 600,
    fast: 200,
    // Default speed
    _default: 400
  };

  // Based off of the plugin by Clint Helfers, with permission.
  // http://web.archive.org/web/20100324014747/http://blindsignals.com/index.php/2009/07/jquery-delay/
  jQuery.fn.delay = function (time, type) {
    time = jQuery.fx ? jQuery.fx.speeds[time] || time : time;
    type = type || "fx";
    return this.queue(type, function (next, hooks) {
      var timeout = window.setTimeout(next, time);
      hooks.stop = function () {
        window.clearTimeout(timeout);
      };
    });
  };
  (function () {
    var a,
      input = document.createElement("input"),
      div = document.createElement("div"),
      select = document.createElement("select"),
      opt = select.appendChild(document.createElement("option"));

    // Setup
    div = document.createElement("div");
    div.setAttribute("className", "t");
    div.innerHTML = "  <link/><table></table><a href='/a'>a</a><input type='checkbox'/>";
    a = div.getElementsByTagName("a")[0];

    // Support: Windows Web Apps (WWA)
    // `type` must use .setAttribute for WWA (#14901)
    input.setAttribute("type", "checkbox");
    div.appendChild(input);
    a = div.getElementsByTagName("a")[0];

    // First batch of tests.
    a.style.cssText = "top:1px";

    // Test setAttribute on camelCase class.
    // If it works, we need attrFixes when doing get/setAttribute (ie6/7)
    support.getSetAttribute = div.className !== "t";

    // Get the style information from getAttribute
    // (IE uses .cssText instead)
    support.style = /top/.test(a.getAttribute("style"));

    // Make sure that URLs aren't manipulated
    // (IE normalizes it by default)
    support.hrefNormalized = a.getAttribute("href") === "/a";

    // Check the default checkbox/radio value ("" on WebKit; "on" elsewhere)
    support.checkOn = !!input.value;

    // Make sure that a selected-by-default option has a working selected property.
    // (WebKit defaults to false instead of true, IE too, if it's in an optgroup)
    support.optSelected = opt.selected;

    // Tests for enctype support on a form (#6743)
    support.enctype = !!document.createElement("form").enctype;

    // Make sure that the options inside disabled selects aren't marked as disabled
    // (WebKit marks them as disabled)
    select.disabled = true;
    support.optDisabled = !opt.disabled;

    // Support: IE8 only
    // Check if we can trust getAttribute("value")
    input = document.createElement("input");
    input.setAttribute("value", "");
    support.input = input.getAttribute("value") === "";

    // Check if an input maintains its value after becoming a radio
    input.value = "t";
    input.setAttribute("type", "radio");
    support.radioValue = input.value === "t";
  })();
  var rreturn = /\r/g,
    rspaces = /[\x20\t\r\n\f]+/g;
  jQuery.fn.extend({
    val: function val(value) {
      var hooks,
        ret,
        isFunction,
        elem = this[0];
      if (!arguments.length) {
        if (elem) {
          hooks = jQuery.valHooks[elem.type] || jQuery.valHooks[elem.nodeName.toLowerCase()];
          if (hooks && "get" in hooks && (ret = hooks.get(elem, "value")) !== undefined) {
            return ret;
          }
          ret = elem.value;
          return typeof ret === "string" ?
          // handle most common string cases
          ret.replace(rreturn, "") :
          // handle cases where value is null/undef or number
          ret == null ? "" : ret;
        }
        return;
      }
      isFunction = jQuery.isFunction(value);
      return this.each(function (i) {
        var val;
        if (this.nodeType !== 1) {
          return;
        }
        if (isFunction) {
          val = value.call(this, i, jQuery(this).val());
        } else {
          val = value;
        }

        // Treat null/undefined as ""; convert numbers to string
        if (val == null) {
          val = "";
        } else if (typeof val === "number") {
          val += "";
        } else if (jQuery.isArray(val)) {
          val = jQuery.map(val, function (value) {
            return value == null ? "" : value + "";
          });
        }
        hooks = jQuery.valHooks[this.type] || jQuery.valHooks[this.nodeName.toLowerCase()];

        // If set returns undefined, fall back to normal setting
        if (!hooks || !("set" in hooks) || hooks.set(this, val, "value") === undefined) {
          this.value = val;
        }
      });
    }
  });
  jQuery.extend({
    valHooks: {
      option: {
        get: function get(elem) {
          var val = jQuery.find.attr(elem, "value");
          return val != null ? val :
          // Support: IE10-11+
          // option.text throws exceptions (#14686, #14858)
          // Strip and collapse whitespace
          // https://html.spec.whatwg.org/#strip-and-collapse-whitespace
          jQuery.trim(jQuery.text(elem)).replace(rspaces, " ");
        }
      },
      select: {
        get: function get(elem) {
          var value,
            option,
            options = elem.options,
            index = elem.selectedIndex,
            one = elem.type === "select-one" || index < 0,
            values = one ? null : [],
            max = one ? index + 1 : options.length,
            i = index < 0 ? max : one ? index : 0;

          // Loop through all the selected options
          for (; i < max; i++) {
            option = options[i];

            // oldIE doesn't update selected after form reset (#2551)
            if ((option.selected || i === index) && (
            // Don't return options that are disabled or in a disabled optgroup
            support.optDisabled ? !option.disabled : option.getAttribute("disabled") === null) && (!option.parentNode.disabled || !jQuery.nodeName(option.parentNode, "optgroup"))) {
              // Get the specific value for the option
              value = jQuery(option).val();

              // We don't need an array for one selects
              if (one) {
                return value;
              }

              // Multi-Selects return an array
              values.push(value);
            }
          }
          return values;
        },
        set: function set(elem, value) {
          var optionSet,
            option,
            options = elem.options,
            values = jQuery.makeArray(value),
            i = options.length;
          while (i--) {
            option = options[i];
            if (jQuery.inArray(jQuery.valHooks.option.get(option), values) > -1) {
              // Support: IE6
              // When new option element is added to select box we need to
              // force reflow of newly added node in order to workaround delay
              // of initialization properties
              try {
                option.selected = optionSet = true;
              } catch (_) {
                // Will be executed only in IE6
                option.scrollHeight;
              }
            } else {
              option.selected = false;
            }
          }

          // Force browsers to behave consistently when non-matching value is set
          if (!optionSet) {
            elem.selectedIndex = -1;
          }
          return options;
        }
      }
    }
  });

  // Radios and checkboxes getter/setter
  jQuery.each(["radio", "checkbox"], function () {
    jQuery.valHooks[this] = {
      set: function set(elem, value) {
        if (jQuery.isArray(value)) {
          return elem.checked = jQuery.inArray(jQuery(elem).val(), value) > -1;
        }
      }
    };
    if (!support.checkOn) {
      jQuery.valHooks[this].get = function (elem) {
        return elem.getAttribute("value") === null ? "on" : elem.value;
      };
    }
  });
  var nodeHook,
    boolHook,
    attrHandle = jQuery.expr.attrHandle,
    ruseDefault = /^(?:checked|selected)$/i,
    getSetAttribute = support.getSetAttribute,
    getSetInput = support.input;
  jQuery.fn.extend({
    attr: function attr(name, value) {
      return access(this, jQuery.attr, name, value, arguments.length > 1);
    },
    removeAttr: function removeAttr(name) {
      return this.each(function () {
        jQuery.removeAttr(this, name);
      });
    }
  });
  jQuery.extend({
    attr: function attr(elem, name, value) {
      var ret,
        hooks,
        nType = elem.nodeType;

      // Don't get/set attributes on text, comment and attribute nodes
      if (nType === 3 || nType === 8 || nType === 2) {
        return;
      }

      // Fallback to prop when attributes are not supported
      if (typeof elem.getAttribute === "undefined") {
        return jQuery.prop(elem, name, value);
      }

      // All attributes are lowercase
      // Grab necessary hook if one is defined
      if (nType !== 1 || !jQuery.isXMLDoc(elem)) {
        name = name.toLowerCase();
        hooks = jQuery.attrHooks[name] || (jQuery.expr.match.bool.test(name) ? boolHook : nodeHook);
      }
      if (value !== undefined) {
        if (value === null) {
          jQuery.removeAttr(elem, name);
          return;
        }
        if (hooks && "set" in hooks && (ret = hooks.set(elem, value, name)) !== undefined) {
          return ret;
        }
        elem.setAttribute(name, value + "");
        return value;
      }
      if (hooks && "get" in hooks && (ret = hooks.get(elem, name)) !== null) {
        return ret;
      }
      ret = jQuery.find.attr(elem, name);

      // Non-existent attributes return null, we normalize to undefined
      return ret == null ? undefined : ret;
    },
    attrHooks: {
      type: {
        set: function set(elem, value) {
          if (!support.radioValue && value === "radio" && jQuery.nodeName(elem, "input")) {
            // Setting the type on a radio button after the value resets the value in IE8-9
            // Reset value to default in case type is set after value during creation
            var val = elem.value;
            elem.setAttribute("type", value);
            if (val) {
              elem.value = val;
            }
            return value;
          }
        }
      }
    },
    removeAttr: function removeAttr(elem, value) {
      var name,
        propName,
        i = 0,
        attrNames = value && value.match(rnotwhite);
      if (attrNames && elem.nodeType === 1) {
        while (name = attrNames[i++]) {
          propName = jQuery.propFix[name] || name;

          // Boolean attributes get special treatment (#10870)
          if (jQuery.expr.match.bool.test(name)) {
            // Set corresponding property to false
            if (getSetInput && getSetAttribute || !ruseDefault.test(name)) {
              elem[propName] = false;

              // Support: IE<9
              // Also clear defaultChecked/defaultSelected (if appropriate)
            } else {
              elem[jQuery.camelCase("default-" + name)] = elem[propName] = false;
            }

            // See #9699 for explanation of this approach (setting first, then removal)
          } else {
            jQuery.attr(elem, name, "");
          }
          elem.removeAttribute(getSetAttribute ? name : propName);
        }
      }
    }
  });

  // Hooks for boolean attributes
  boolHook = {
    set: function set(elem, value, name) {
      if (value === false) {
        // Remove boolean attributes when set to false
        jQuery.removeAttr(elem, name);
      } else if (getSetInput && getSetAttribute || !ruseDefault.test(name)) {
        // IE<8 needs the *property* name
        elem.setAttribute(!getSetAttribute && jQuery.propFix[name] || name, name);
      } else {
        // Support: IE<9
        // Use defaultChecked and defaultSelected for oldIE
        elem[jQuery.camelCase("default-" + name)] = elem[name] = true;
      }
      return name;
    }
  };
  jQuery.each(jQuery.expr.match.bool.source.match(/\w+/g), function (i, name) {
    var getter = attrHandle[name] || jQuery.find.attr;
    if (getSetInput && getSetAttribute || !ruseDefault.test(name)) {
      attrHandle[name] = function (elem, name, isXML) {
        var ret, handle;
        if (!isXML) {
          // Avoid an infinite loop by temporarily removing this function from the getter
          handle = attrHandle[name];
          attrHandle[name] = ret;
          ret = getter(elem, name, isXML) != null ? name.toLowerCase() : null;
          attrHandle[name] = handle;
        }
        return ret;
      };
    } else {
      attrHandle[name] = function (elem, name, isXML) {
        if (!isXML) {
          return elem[jQuery.camelCase("default-" + name)] ? name.toLowerCase() : null;
        }
      };
    }
  });

  // fix oldIE attroperties
  if (!getSetInput || !getSetAttribute) {
    jQuery.attrHooks.value = {
      set: function set(elem, value, name) {
        if (jQuery.nodeName(elem, "input")) {
          // Does not return so that setAttribute is also used
          elem.defaultValue = value;
        } else {
          // Use nodeHook if defined (#1954); otherwise setAttribute is fine
          return nodeHook && nodeHook.set(elem, value, name);
        }
      }
    };
  }

  // IE6/7 do not support getting/setting some attributes with get/setAttribute
  if (!getSetAttribute) {
    // Use this for any attribute in IE6/7
    // This fixes almost every IE6/7 issue
    nodeHook = {
      set: function set(elem, value, name) {
        // Set the existing or create a new attribute node
        var ret = elem.getAttributeNode(name);
        if (!ret) {
          elem.setAttributeNode(ret = elem.ownerDocument.createAttribute(name));
        }
        ret.value = value += "";

        // Break association with cloned elements by also using setAttribute (#9646)
        if (name === "value" || value === elem.getAttribute(name)) {
          return value;
        }
      }
    };

    // Some attributes are constructed with empty-string values when not defined
    attrHandle.id = attrHandle.name = attrHandle.coords = function (elem, name, isXML) {
      var ret;
      if (!isXML) {
        return (ret = elem.getAttributeNode(name)) && ret.value !== "" ? ret.value : null;
      }
    };

    // Fixing value retrieval on a button requires this module
    jQuery.valHooks.button = {
      get: function get(elem, name) {
        var ret = elem.getAttributeNode(name);
        if (ret && ret.specified) {
          return ret.value;
        }
      },
      set: nodeHook.set
    };

    // Set contenteditable to false on removals(#10429)
    // Setting to empty string throws an error as an invalid value
    jQuery.attrHooks.contenteditable = {
      set: function set(elem, value, name) {
        nodeHook.set(elem, value === "" ? false : value, name);
      }
    };

    // Set width and height to auto instead of 0 on empty string( Bug #8150 )
    // This is for removals
    jQuery.each(["width", "height"], function (i, name) {
      jQuery.attrHooks[name] = {
        set: function set(elem, value) {
          if (value === "") {
            elem.setAttribute(name, "auto");
            return value;
          }
        }
      };
    });
  }
  if (!support.style) {
    jQuery.attrHooks.style = {
      get: function get(elem) {
        // Return undefined in the case of empty string
        // Note: IE uppercases css property names, but if we were to .toLowerCase()
        // .cssText, that would destroy case sensitivity in URL's, like in "background"
        return elem.style.cssText || undefined;
      },
      set: function set(elem, value) {
        return elem.style.cssText = value + "";
      }
    };
  }
  var rfocusable = /^(?:input|select|textarea|button|object)$/i,
    rclickable = /^(?:a|area)$/i;
  jQuery.fn.extend({
    prop: function prop(name, value) {
      return access(this, jQuery.prop, name, value, arguments.length > 1);
    },
    removeProp: function removeProp(name) {
      name = jQuery.propFix[name] || name;
      return this.each(function () {
        // try/catch handles cases where IE balks (such as removing a property on window)
        try {
          this[name] = undefined;
          delete this[name];
        } catch (e) {}
      });
    }
  });
  jQuery.extend({
    prop: function prop(elem, name, value) {
      var ret,
        hooks,
        nType = elem.nodeType;

      // Don't get/set properties on text, comment and attribute nodes
      if (nType === 3 || nType === 8 || nType === 2) {
        return;
      }
      if (nType !== 1 || !jQuery.isXMLDoc(elem)) {
        // Fix name and attach hooks
        name = jQuery.propFix[name] || name;
        hooks = jQuery.propHooks[name];
      }
      if (value !== undefined) {
        if (hooks && "set" in hooks && (ret = hooks.set(elem, value, name)) !== undefined) {
          return ret;
        }
        return elem[name] = value;
      }
      if (hooks && "get" in hooks && (ret = hooks.get(elem, name)) !== null) {
        return ret;
      }
      return elem[name];
    },
    propHooks: {
      tabIndex: {
        get: function get(elem) {
          // elem.tabIndex doesn't always return the
          // correct value when it hasn't been explicitly set
          // http://fluidproject.org/blog/2008/01/09/getting-setting-and-removing-tabindex-values-with-javascript/
          // Use proper attribute retrieval(#12072)
          var tabindex = jQuery.find.attr(elem, "tabindex");
          return tabindex ? parseInt(tabindex, 10) : rfocusable.test(elem.nodeName) || rclickable.test(elem.nodeName) && elem.href ? 0 : -1;
        }
      }
    },
    propFix: {
      "for": "htmlFor",
      "class": "className"
    }
  });

  // Some attributes require a special call on IE
  // http://msdn.microsoft.com/en-us/library/ms536429%28VS.85%29.aspx
  if (!support.hrefNormalized) {
    // href/src property should get the full normalized URL (#10299/#12915)
    jQuery.each(["href", "src"], function (i, name) {
      jQuery.propHooks[name] = {
        get: function get(elem) {
          return elem.getAttribute(name, 4);
        }
      };
    });
  }

  // Support: Safari, IE9+
  // Accessing the selectedIndex property
  // forces the browser to respect setting selected
  // on the option
  // The getter ensures a default option is selected
  // when in an optgroup
  if (!support.optSelected) {
    jQuery.propHooks.selected = {
      get: function get(elem) {
        var parent = elem.parentNode;
        if (parent) {
          parent.selectedIndex;

          // Make sure that it also works with optgroups, see #5701
          if (parent.parentNode) {
            parent.parentNode.selectedIndex;
          }
        }
        return null;
      },
      set: function set(elem) {
        var parent = elem.parentNode;
        if (parent) {
          parent.selectedIndex;
          if (parent.parentNode) {
            parent.parentNode.selectedIndex;
          }
        }
      }
    };
  }
  jQuery.each(["tabIndex", "readOnly", "maxLength", "cellSpacing", "cellPadding", "rowSpan", "colSpan", "useMap", "frameBorder", "contentEditable"], function () {
    jQuery.propFix[this.toLowerCase()] = this;
  });

  // IE6/7 call enctype encoding
  if (!support.enctype) {
    jQuery.propFix.enctype = "encoding";
  }
  var rclass = /[\t\r\n\f]/g;
  function getClass(elem) {
    return jQuery.attr(elem, "class") || "";
  }
  jQuery.fn.extend({
    addClass: function addClass(value) {
      var classes,
        elem,
        cur,
        curValue,
        clazz,
        j,
        finalValue,
        i = 0;
      if (jQuery.isFunction(value)) {
        return this.each(function (j) {
          jQuery(this).addClass(value.call(this, j, getClass(this)));
        });
      }
      if (typeof value === "string" && value) {
        classes = value.match(rnotwhite) || [];
        while (elem = this[i++]) {
          curValue = getClass(elem);
          cur = elem.nodeType === 1 && (" " + curValue + " ").replace(rclass, " ");
          if (cur) {
            j = 0;
            while (clazz = classes[j++]) {
              if (cur.indexOf(" " + clazz + " ") < 0) {
                cur += clazz + " ";
              }
            }

            // only assign if different to avoid unneeded rendering.
            finalValue = jQuery.trim(cur);
            if (curValue !== finalValue) {
              jQuery.attr(elem, "class", finalValue);
            }
          }
        }
      }
      return this;
    },
    removeClass: function removeClass(value) {
      var classes,
        elem,
        cur,
        curValue,
        clazz,
        j,
        finalValue,
        i = 0;
      if (jQuery.isFunction(value)) {
        return this.each(function (j) {
          jQuery(this).removeClass(value.call(this, j, getClass(this)));
        });
      }
      if (!arguments.length) {
        return this.attr("class", "");
      }
      if (typeof value === "string" && value) {
        classes = value.match(rnotwhite) || [];
        while (elem = this[i++]) {
          curValue = getClass(elem);

          // This expression is here for better compressibility (see addClass)
          cur = elem.nodeType === 1 && (" " + curValue + " ").replace(rclass, " ");
          if (cur) {
            j = 0;
            while (clazz = classes[j++]) {
              // Remove *all* instances
              while (cur.indexOf(" " + clazz + " ") > -1) {
                cur = cur.replace(" " + clazz + " ", " ");
              }
            }

            // Only assign if different to avoid unneeded rendering.
            finalValue = jQuery.trim(cur);
            if (curValue !== finalValue) {
              jQuery.attr(elem, "class", finalValue);
            }
          }
        }
      }
      return this;
    },
    toggleClass: function toggleClass(value, stateVal) {
      var type = _typeof(value);
      if (typeof stateVal === "boolean" && type === "string") {
        return stateVal ? this.addClass(value) : this.removeClass(value);
      }
      if (jQuery.isFunction(value)) {
        return this.each(function (i) {
          jQuery(this).toggleClass(value.call(this, i, getClass(this), stateVal), stateVal);
        });
      }
      return this.each(function () {
        var className, i, self, classNames;
        if (type === "string") {
          // Toggle individual class names
          i = 0;
          self = jQuery(this);
          classNames = value.match(rnotwhite) || [];
          while (className = classNames[i++]) {
            // Check each className given, space separated list
            if (self.hasClass(className)) {
              self.removeClass(className);
            } else {
              self.addClass(className);
            }
          }

          // Toggle whole class name
        } else if (value === undefined || type === "boolean") {
          className = getClass(this);
          if (className) {
            // store className if set
            jQuery._data(this, "__className__", className);
          }

          // If the element has a class name or if we're passed "false",
          // then remove the whole classname (if there was one, the above saved it).
          // Otherwise bring back whatever was previously saved (if anything),
          // falling back to the empty string if nothing was stored.
          jQuery.attr(this, "class", className || value === false ? "" : jQuery._data(this, "__className__") || "");
        }
      });
    },
    hasClass: function hasClass(selector) {
      var className,
        elem,
        i = 0;
      className = " " + selector + " ";
      while (elem = this[i++]) {
        if (elem.nodeType === 1 && (" " + getClass(elem) + " ").replace(rclass, " ").indexOf(className) > -1) {
          return true;
        }
      }
      return false;
    }
  });

  // Return jQuery for attributes-only inclusion

  jQuery.each(("blur focus focusin focusout load resize scroll unload click dblclick " + "mousedown mouseup mousemove mouseover mouseout mouseenter mouseleave " + "change select submit keydown keypress keyup error contextmenu").split(" "), function (i, name) {
    // Handle event binding
    jQuery.fn[name] = function (data, fn) {
      return arguments.length > 0 ? this.on(name, null, data, fn) : this.trigger(name);
    };
  });
  jQuery.fn.extend({
    hover: function hover(fnOver, fnOut) {
      return this.mouseenter(fnOver).mouseleave(fnOut || fnOver);
    }
  });
  var location = window.location;
  var nonce = jQuery.now();
  var rquery = /\?/;
  var rvalidtokens = /(,)|(\[|{)|(}|])|"(?:[^"\\\r\n]|\\["\\\/bfnrt]|\\u[\da-fA-F]{4})*"\s*:?|true|false|null|-?(?!0\d)\d+(?:\.\d+|)(?:[eE][+-]?\d+|)/g;
  jQuery.parseJSON = function (data) {
    // Attempt to parse using the native JSON parser first
    if (window.JSON && window.JSON.parse) {
      // Support: Android 2.3
      // Workaround failure to string-cast null input
      return window.JSON.parse(data + "");
    }
    var requireNonComma,
      depth = null,
      str = jQuery.trim(data + "");

    // Guard against invalid (and possibly dangerous) input by ensuring that nothing remains
    // after removing valid tokens
    return str && !jQuery.trim(str.replace(rvalidtokens, function (token, comma, open, close) {
      // Force termination if we see a misplaced comma
      if (requireNonComma && comma) {
        depth = 0;
      }

      // Perform no more replacements after returning to outermost depth
      if (depth === 0) {
        return token;
      }

      // Commas must not follow "[", "{", or ","
      requireNonComma = open || comma;

      // Determine new depth
      // array/object open ("[" or "{"): depth += true - false (increment)
      // array/object close ("]" or "}"): depth += false - true (decrement)
      // other cases ("," or primitive): depth += true - true (numeric cast)
      depth += !close - !open;

      // Remove this token
      return "";
    })) ? Function("return " + str)() : jQuery.error("Invalid JSON: " + data);
  };

  // Cross-browser xml parsing
  jQuery.parseXML = function (data) {
    var xml, tmp;
    if (!data || typeof data !== "string") {
      return null;
    }
    try {
      if (window.DOMParser) {
        // Standard
        tmp = new window.DOMParser();
        xml = tmp.parseFromString(data, "text/xml");
      } else {
        // IE
        xml = new window.ActiveXObject("Microsoft.XMLDOM");
        xml.async = "false";
        xml.loadXML(data);
      }
    } catch (e) {
      xml = undefined;
    }
    if (!xml || !xml.documentElement || xml.getElementsByTagName("parsererror").length) {
      jQuery.error("Invalid XML: " + data);
    }
    return xml;
  };
  var rhash = /#.*$/,
    rts = /([?&])_=[^&]*/,
    // IE leaves an \r character at EOL
    rheaders = /^(.*?):[ \t]*([^\r\n]*)\r?$/mg,
    // #7653, #8125, #8152: local protocol detection
    rlocalProtocol = /^(?:about|app|app-storage|.+-extension|file|res|widget):$/,
    rnoContent = /^(?:GET|HEAD)$/,
    rprotocol = /^\/\//,
    rurl = /^([\w.+-]+:)(?:\/\/(?:[^\/?#]*@|)([^\/?#:]*)(?::(\d+)|)|)/,
    /* Prefilters
     * 1) They are useful to introduce custom dataTypes (see ajax/jsonp.js for an example)
     * 2) These are called:
     *    - BEFORE asking for a transport
     *    - AFTER param serialization (s.data is a string if s.processData is true)
     * 3) key is the dataType
     * 4) the catchall symbol "*" can be used
     * 5) execution will start with transport dataType and THEN continue down to "*" if needed
     */
    prefilters = {},
    /* Transports bindings
     * 1) key is the dataType
     * 2) the catchall symbol "*" can be used
     * 3) selection will start with transport dataType and THEN go to "*" if needed
     */
    transports = {},
    // Avoid comment-prolog char sequence (#10098); must appease lint and evade compression
    allTypes = "*/".concat("*"),
    // Document location
    ajaxLocation = location.href,
    // Segment location into parts
    ajaxLocParts = rurl.exec(ajaxLocation.toLowerCase()) || [];

  // Base "constructor" for jQuery.ajaxPrefilter and jQuery.ajaxTransport
  function addToPrefiltersOrTransports(structure) {
    // dataTypeExpression is optional and defaults to "*"
    return function (dataTypeExpression, func) {
      if (typeof dataTypeExpression !== "string") {
        func = dataTypeExpression;
        dataTypeExpression = "*";
      }
      var dataType,
        i = 0,
        dataTypes = dataTypeExpression.toLowerCase().match(rnotwhite) || [];
      if (jQuery.isFunction(func)) {
        // For each dataType in the dataTypeExpression
        while (dataType = dataTypes[i++]) {
          // Prepend if requested
          if (dataType.charAt(0) === "+") {
            dataType = dataType.slice(1) || "*";
            (structure[dataType] = structure[dataType] || []).unshift(func);

            // Otherwise append
          } else {
            (structure[dataType] = structure[dataType] || []).push(func);
          }
        }
      }
    };
  }

  // Base inspection function for prefilters and transports
  function inspectPrefiltersOrTransports(structure, options, originalOptions, jqXHR) {
    var inspected = {},
      seekingTransport = structure === transports;
    function inspect(dataType) {
      var selected;
      inspected[dataType] = true;
      jQuery.each(structure[dataType] || [], function (_, prefilterOrFactory) {
        var dataTypeOrTransport = prefilterOrFactory(options, originalOptions, jqXHR);
        if (typeof dataTypeOrTransport === "string" && !seekingTransport && !inspected[dataTypeOrTransport]) {
          options.dataTypes.unshift(dataTypeOrTransport);
          inspect(dataTypeOrTransport);
          return false;
        } else if (seekingTransport) {
          return !(selected = dataTypeOrTransport);
        }
      });
      return selected;
    }
    return inspect(options.dataTypes[0]) || !inspected["*"] && inspect("*");
  }

  // A special extend for ajax options
  // that takes "flat" options (not to be deep extended)
  // Fixes #9887
  function ajaxExtend(target, src) {
    var deep,
      key,
      flatOptions = jQuery.ajaxSettings.flatOptions || {};
    for (key in src) {
      if (src[key] !== undefined) {
        (flatOptions[key] ? target : deep || (deep = {}))[key] = src[key];
      }
    }
    if (deep) {
      jQuery.extend(true, target, deep);
    }
    return target;
  }

  /* Handles responses to an ajax request:
   * - finds the right dataType (mediates between content-type and expected dataType)
   * - returns the corresponding response
   */
  function ajaxHandleResponses(s, jqXHR, responses) {
    var firstDataType,
      ct,
      finalDataType,
      type,
      contents = s.contents,
      dataTypes = s.dataTypes;

    // Remove auto dataType and get content-type in the process
    while (dataTypes[0] === "*") {
      dataTypes.shift();
      if (ct === undefined) {
        ct = s.mimeType || jqXHR.getResponseHeader("Content-Type");
      }
    }

    // Check if we're dealing with a known content-type
    if (ct) {
      for (type in contents) {
        if (contents[type] && contents[type].test(ct)) {
          dataTypes.unshift(type);
          break;
        }
      }
    }

    // Check to see if we have a response for the expected dataType
    if (dataTypes[0] in responses) {
      finalDataType = dataTypes[0];
    } else {
      // Try convertible dataTypes
      for (type in responses) {
        if (!dataTypes[0] || s.converters[type + " " + dataTypes[0]]) {
          finalDataType = type;
          break;
        }
        if (!firstDataType) {
          firstDataType = type;
        }
      }

      // Or just use first one
      finalDataType = finalDataType || firstDataType;
    }

    // If we found a dataType
    // We add the dataType to the list if needed
    // and return the corresponding response
    if (finalDataType) {
      if (finalDataType !== dataTypes[0]) {
        dataTypes.unshift(finalDataType);
      }
      return responses[finalDataType];
    }
  }

  /* Chain conversions given the request and the original response
   * Also sets the responseXXX fields on the jqXHR instance
   */
  function ajaxConvert(s, response, jqXHR, isSuccess) {
    var conv2,
      current,
      conv,
      tmp,
      prev,
      converters = {},
      // Work with a copy of dataTypes in case we need to modify it for conversion
      dataTypes = s.dataTypes.slice();

    // Create converters map with lowercased keys
    if (dataTypes[1]) {
      for (conv in s.converters) {
        converters[conv.toLowerCase()] = s.converters[conv];
      }
    }
    current = dataTypes.shift();

    // Convert to each sequential dataType
    while (current) {
      if (s.responseFields[current]) {
        jqXHR[s.responseFields[current]] = response;
      }

      // Apply the dataFilter if provided
      if (!prev && isSuccess && s.dataFilter) {
        response = s.dataFilter(response, s.dataType);
      }
      prev = current;
      current = dataTypes.shift();
      if (current) {
        // There's only work to do if current dataType is non-auto
        if (current === "*") {
          current = prev;

          // Convert response if prev dataType is non-auto and differs from current
        } else if (prev !== "*" && prev !== current) {
          // Seek a direct converter
          conv = converters[prev + " " + current] || converters["* " + current];

          // If none found, seek a pair
          if (!conv) {
            for (conv2 in converters) {
              // If conv2 outputs current
              tmp = conv2.split(" ");
              if (tmp[1] === current) {
                // If prev can be converted to accepted input
                conv = converters[prev + " " + tmp[0]] || converters["* " + tmp[0]];
                if (conv) {
                  // Condense equivalence converters
                  if (conv === true) {
                    conv = converters[conv2];

                    // Otherwise, insert the intermediate dataType
                  } else if (converters[conv2] !== true) {
                    current = tmp[0];
                    dataTypes.unshift(tmp[1]);
                  }
                  break;
                }
              }
            }
          }

          // Apply converter (if not an equivalence)
          if (conv !== true) {
            // Unless errors are allowed to bubble, catch and return them
            if (conv && s["throws"]) {
              // jscs:ignore requireDotNotation
              response = conv(response);
            } else {
              try {
                response = conv(response);
              } catch (e) {
                return {
                  state: "parsererror",
                  error: conv ? e : "No conversion from " + prev + " to " + current
                };
              }
            }
          }
        }
      }
    }
    return {
      state: "success",
      data: response
    };
  }
  jQuery.extend({
    // Counter for holding the number of active queries
    active: 0,
    // Last-Modified header cache for next request
    lastModified: {},
    etag: {},
    ajaxSettings: {
      url: ajaxLocation,
      type: "GET",
      isLocal: rlocalProtocol.test(ajaxLocParts[1]),
      global: true,
      processData: true,
      async: true,
      contentType: "application/x-www-form-urlencoded; charset=UTF-8",
      /*
      timeout: 0,
      data: null,
      dataType: null,
      username: null,
      password: null,
      cache: null,
      throws: false,
      traditional: false,
      headers: {},
      */

      accepts: {
        "*": allTypes,
        text: "text/plain",
        html: "text/html",
        xml: "application/xml, text/xml",
        json: "application/json, text/javascript"
      },
      contents: {
        xml: /\bxml\b/,
        html: /\bhtml/,
        json: /\bjson\b/
      },
      responseFields: {
        xml: "responseXML",
        text: "responseText",
        json: "responseJSON"
      },
      // Data converters
      // Keys separate source (or catchall "*") and destination types with a single space
      converters: {
        // Convert anything to text
        "* text": String,
        // Text to html (true = no transformation)
        "text html": true,
        // Evaluate text as a json expression
        "text json": jQuery.parseJSON,
        // Parse text as xml
        "text xml": jQuery.parseXML
      },
      // For options that shouldn't be deep extended:
      // you can add your own custom options here if
      // and when you create one that shouldn't be
      // deep extended (see ajaxExtend)
      flatOptions: {
        url: true,
        context: true
      }
    },
    // Creates a full fledged settings object into target
    // with both ajaxSettings and settings fields.
    // If target is omitted, writes into ajaxSettings.
    ajaxSetup: function ajaxSetup(target, settings) {
      return settings ?
      // Building a settings object
      ajaxExtend(ajaxExtend(target, jQuery.ajaxSettings), settings) :
      // Extending ajaxSettings
      ajaxExtend(jQuery.ajaxSettings, target);
    },
    ajaxPrefilter: addToPrefiltersOrTransports(prefilters),
    ajaxTransport: addToPrefiltersOrTransports(transports),
    // Main method
    ajax: function ajax(url, options) {
      // If url is an object, simulate pre-1.5 signature
      if (_typeof(url) === "object") {
        options = url;
        url = undefined;
      }

      // Force options to be an object
      options = options || {};
      var
        // Cross-domain detection vars
        parts,
        // Loop variable
        i,
        // URL without anti-cache param
        cacheURL,
        // Response headers as string
        responseHeadersString,
        // timeout handle
        timeoutTimer,
        // To know if global events are to be dispatched
        fireGlobals,
        transport,
        // Response headers
        responseHeaders,
        // Create the final options object
        s = jQuery.ajaxSetup({}, options),
        // Callbacks context
        callbackContext = s.context || s,
        // Context for global events is callbackContext if it is a DOM node or jQuery collection
        globalEventContext = s.context && (callbackContext.nodeType || callbackContext.jquery) ? jQuery(callbackContext) : jQuery.event,
        // Deferreds
        deferred = jQuery.Deferred(),
        completeDeferred = jQuery.Callbacks("once memory"),
        // Status-dependent callbacks
        _statusCode = s.statusCode || {},
        // Headers (they are sent all at once)
        requestHeaders = {},
        requestHeadersNames = {},
        // The jqXHR state
        state = 0,
        // Default abort message
        strAbort = "canceled",
        // Fake xhr
        jqXHR = {
          readyState: 0,
          // Builds headers hashtable if needed
          getResponseHeader: function getResponseHeader(key) {
            var match;
            if (state === 2) {
              if (!responseHeaders) {
                responseHeaders = {};
                while (match = rheaders.exec(responseHeadersString)) {
                  responseHeaders[match[1].toLowerCase()] = match[2];
                }
              }
              match = responseHeaders[key.toLowerCase()];
            }
            return match == null ? null : match;
          },
          // Raw string
          getAllResponseHeaders: function getAllResponseHeaders() {
            return state === 2 ? responseHeadersString : null;
          },
          // Caches the header
          setRequestHeader: function setRequestHeader(name, value) {
            var lname = name.toLowerCase();
            if (!state) {
              name = requestHeadersNames[lname] = requestHeadersNames[lname] || name;
              requestHeaders[name] = value;
            }
            return this;
          },
          // Overrides response content-type header
          overrideMimeType: function overrideMimeType(type) {
            if (!state) {
              s.mimeType = type;
            }
            return this;
          },
          // Status-dependent callbacks
          statusCode: function statusCode(map) {
            var code;
            if (map) {
              if (state < 2) {
                for (code in map) {
                  // Lazy-add the new callback in a way that preserves old ones
                  _statusCode[code] = [_statusCode[code], map[code]];
                }
              } else {
                // Execute the appropriate callbacks
                jqXHR.always(map[jqXHR.status]);
              }
            }
            return this;
          },
          // Cancel the request
          abort: function abort(statusText) {
            var finalText = statusText || strAbort;
            if (transport) {
              transport.abort(finalText);
            }
            done(0, finalText);
            return this;
          }
        };

      // Attach deferreds
      deferred.promise(jqXHR).complete = completeDeferred.add;
      jqXHR.success = jqXHR.done;
      jqXHR.error = jqXHR.fail;

      // Remove hash character (#7531: and string promotion)
      // Add protocol if not provided (#5866: IE7 issue with protocol-less urls)
      // Handle falsy url in the settings object (#10093: consistency with old signature)
      // We also use the url parameter if available
      s.url = ((url || s.url || ajaxLocation) + "").replace(rhash, "").replace(rprotocol, ajaxLocParts[1] + "//");

      // Alias method option to type as per ticket #12004
      s.type = options.method || options.type || s.method || s.type;

      // Extract dataTypes list
      s.dataTypes = jQuery.trim(s.dataType || "*").toLowerCase().match(rnotwhite) || [""];

      // A cross-domain request is in order when we have a protocol:host:port mismatch
      if (s.crossDomain == null) {
        parts = rurl.exec(s.url.toLowerCase());
        s.crossDomain = !!(parts && (parts[1] !== ajaxLocParts[1] || parts[2] !== ajaxLocParts[2] || (parts[3] || (parts[1] === "http:" ? "80" : "443")) !== (ajaxLocParts[3] || (ajaxLocParts[1] === "http:" ? "80" : "443"))));
      }

      // Convert data if not already a string
      if (s.data && s.processData && typeof s.data !== "string") {
        s.data = jQuery.param(s.data, s.traditional);
      }

      // Apply prefilters
      inspectPrefiltersOrTransports(prefilters, s, options, jqXHR);

      // If request was aborted inside a prefilter, stop there
      if (state === 2) {
        return jqXHR;
      }

      // We can fire global events as of now if asked to
      // Don't fire events if jQuery.event is undefined in an AMD-usage scenario (#15118)
      fireGlobals = jQuery.event && s.global;

      // Watch for a new set of requests
      if (fireGlobals && jQuery.active++ === 0) {
        jQuery.event.trigger("ajaxStart");
      }

      // Uppercase the type
      s.type = s.type.toUpperCase();

      // Determine if request has content
      s.hasContent = !rnoContent.test(s.type);

      // Save the URL in case we're toying with the If-Modified-Since
      // and/or If-None-Match header later on
      cacheURL = s.url;

      // More options handling for requests with no content
      if (!s.hasContent) {
        // If data is available, append data to url
        if (s.data) {
          cacheURL = s.url += (rquery.test(cacheURL) ? "&" : "?") + s.data;

          // #9682: remove data so that it's not used in an eventual retry
          delete s.data;
        }

        // Add anti-cache in url if needed
        if (s.cache === false) {
          s.url = rts.test(cacheURL) ?
          // If there is already a '_' parameter, set its value
          cacheURL.replace(rts, "$1_=" + nonce++) :
          // Otherwise add one to the end
          cacheURL + (rquery.test(cacheURL) ? "&" : "?") + "_=" + nonce++;
        }
      }

      // Set the If-Modified-Since and/or If-None-Match header, if in ifModified mode.
      if (s.ifModified) {
        if (jQuery.lastModified[cacheURL]) {
          jqXHR.setRequestHeader("If-Modified-Since", jQuery.lastModified[cacheURL]);
        }
        if (jQuery.etag[cacheURL]) {
          jqXHR.setRequestHeader("If-None-Match", jQuery.etag[cacheURL]);
        }
      }

      // Set the correct header, if data is being sent
      if (s.data && s.hasContent && s.contentType !== false || options.contentType) {
        jqXHR.setRequestHeader("Content-Type", s.contentType);
      }

      // Set the Accepts header for the server, depending on the dataType
      jqXHR.setRequestHeader("Accept", s.dataTypes[0] && s.accepts[s.dataTypes[0]] ? s.accepts[s.dataTypes[0]] + (s.dataTypes[0] !== "*" ? ", " + allTypes + "; q=0.01" : "") : s.accepts["*"]);

      // Check for headers option
      for (i in s.headers) {
        jqXHR.setRequestHeader(i, s.headers[i]);
      }

      // Allow custom headers/mimetypes and early abort
      if (s.beforeSend && (s.beforeSend.call(callbackContext, jqXHR, s) === false || state === 2)) {
        // Abort if not done already and return
        return jqXHR.abort();
      }

      // aborting is no longer a cancellation
      strAbort = "abort";

      // Install callbacks on deferreds
      for (i in {
        success: 1,
        error: 1,
        complete: 1
      }) {
        jqXHR[i](s[i]);
      }

      // Get transport
      transport = inspectPrefiltersOrTransports(transports, s, options, jqXHR);

      // If no transport, we auto-abort
      if (!transport) {
        done(-1, "No Transport");
      } else {
        jqXHR.readyState = 1;

        // Send global event
        if (fireGlobals) {
          globalEventContext.trigger("ajaxSend", [jqXHR, s]);
        }

        // If request was aborted inside ajaxSend, stop there
        if (state === 2) {
          return jqXHR;
        }

        // Timeout
        if (s.async && s.timeout > 0) {
          timeoutTimer = window.setTimeout(function () {
            jqXHR.abort("timeout");
          }, s.timeout);
        }
        try {
          state = 1;
          transport.send(requestHeaders, done);
        } catch (e) {
          // Propagate exception as error if not done
          if (state < 2) {
            done(-1, e);

            // Simply rethrow otherwise
          } else {
            throw e;
          }
        }
      }

      // Callback for when everything is done
      function done(status, nativeStatusText, responses, headers) {
        var isSuccess,
          success,
          error,
          response,
          modified,
          statusText = nativeStatusText;

        // Called once
        if (state === 2) {
          return;
        }

        // State is "done" now
        state = 2;

        // Clear timeout if it exists
        if (timeoutTimer) {
          window.clearTimeout(timeoutTimer);
        }

        // Dereference transport for early garbage collection
        // (no matter how long the jqXHR object will be used)
        transport = undefined;

        // Cache response headers
        responseHeadersString = headers || "";

        // Set readyState
        jqXHR.readyState = status > 0 ? 4 : 0;

        // Determine if successful
        isSuccess = status >= 200 && status < 300 || status === 304;

        // Get response data
        if (responses) {
          response = ajaxHandleResponses(s, jqXHR, responses);
        }

        // Convert no matter what (that way responseXXX fields are always set)
        response = ajaxConvert(s, response, jqXHR, isSuccess);

        // If successful, handle type chaining
        if (isSuccess) {
          // Set the If-Modified-Since and/or If-None-Match header, if in ifModified mode.
          if (s.ifModified) {
            modified = jqXHR.getResponseHeader("Last-Modified");
            if (modified) {
              jQuery.lastModified[cacheURL] = modified;
            }
            modified = jqXHR.getResponseHeader("etag");
            if (modified) {
              jQuery.etag[cacheURL] = modified;
            }
          }

          // if no content
          if (status === 204 || s.type === "HEAD") {
            statusText = "nocontent";

            // if not modified
          } else if (status === 304) {
            statusText = "notmodified";

            // If we have data, let's convert it
          } else {
            statusText = response.state;
            success = response.data;
            error = response.error;
            isSuccess = !error;
          }
        } else {
          // We extract error from statusText
          // then normalize statusText and status for non-aborts
          error = statusText;
          if (status || !statusText) {
            statusText = "error";
            if (status < 0) {
              status = 0;
            }
          }
        }

        // Set data for the fake xhr object
        jqXHR.status = status;
        jqXHR.statusText = (nativeStatusText || statusText) + "";

        // Success/Error
        if (isSuccess) {
          deferred.resolveWith(callbackContext, [success, statusText, jqXHR]);
        } else {
          deferred.rejectWith(callbackContext, [jqXHR, statusText, error]);
        }

        // Status-dependent callbacks
        jqXHR.statusCode(_statusCode);
        _statusCode = undefined;
        if (fireGlobals) {
          globalEventContext.trigger(isSuccess ? "ajaxSuccess" : "ajaxError", [jqXHR, s, isSuccess ? success : error]);
        }

        // Complete
        completeDeferred.fireWith(callbackContext, [jqXHR, statusText]);
        if (fireGlobals) {
          globalEventContext.trigger("ajaxComplete", [jqXHR, s]);

          // Handle the global AJAX counter
          if (! --jQuery.active) {
            jQuery.event.trigger("ajaxStop");
          }
        }
      }
      return jqXHR;
    },
    getJSON: function getJSON(url, data, callback) {
      return jQuery.get(url, data, callback, "json");
    },
    getScript: function getScript(url, callback) {
      return jQuery.get(url, undefined, callback, "script");
    }
  });
  jQuery.each(["get", "post"], function (i, method) {
    jQuery[method] = function (url, data, callback, type) {
      // shift arguments if data argument was omitted
      if (jQuery.isFunction(data)) {
        type = type || callback;
        callback = data;
        data = undefined;
      }

      // The url can be an options object (which then must have .url)
      return jQuery.ajax(jQuery.extend({
        url: url,
        type: method,
        dataType: type,
        data: data,
        success: callback
      }, jQuery.isPlainObject(url) && url));
    };
  });
  jQuery._evalUrl = function (url) {
    return jQuery.ajax({
      url: url,
      // Make this explicit, since user can override this through ajaxSetup (#11264)
      type: "GET",
      dataType: "script",
      cache: true,
      async: false,
      global: false,
      "throws": true
    });
  };
  jQuery.fn.extend({
    wrapAll: function wrapAll(html) {
      if (jQuery.isFunction(html)) {
        return this.each(function (i) {
          jQuery(this).wrapAll(html.call(this, i));
        });
      }
      if (this[0]) {
        // The elements to wrap the target around
        var wrap = jQuery(html, this[0].ownerDocument).eq(0).clone(true);
        if (this[0].parentNode) {
          wrap.insertBefore(this[0]);
        }
        wrap.map(function () {
          var elem = this;
          while (elem.firstChild && elem.firstChild.nodeType === 1) {
            elem = elem.firstChild;
          }
          return elem;
        }).append(this);
      }
      return this;
    },
    wrapInner: function wrapInner(html) {
      if (jQuery.isFunction(html)) {
        return this.each(function (i) {
          jQuery(this).wrapInner(html.call(this, i));
        });
      }
      return this.each(function () {
        var self = jQuery(this),
          contents = self.contents();
        if (contents.length) {
          contents.wrapAll(html);
        } else {
          self.append(html);
        }
      });
    },
    wrap: function wrap(html) {
      var isFunction = jQuery.isFunction(html);
      return this.each(function (i) {
        jQuery(this).wrapAll(isFunction ? html.call(this, i) : html);
      });
    },
    unwrap: function unwrap() {
      return this.parent().each(function () {
        if (!jQuery.nodeName(this, "body")) {
          jQuery(this).replaceWith(this.childNodes);
        }
      }).end();
    }
  });
  function getDisplay(elem) {
    return elem.style && elem.style.display || jQuery.css(elem, "display");
  }
  function filterHidden(elem) {
    // Disconnected elements are considered hidden
    if (!jQuery.contains(elem.ownerDocument || document, elem)) {
      return true;
    }
    while (elem && elem.nodeType === 1) {
      if (getDisplay(elem) === "none" || elem.type === "hidden") {
        return true;
      }
      elem = elem.parentNode;
    }
    return false;
  }
  jQuery.expr.filters.hidden = function (elem) {
    // Support: Opera <= 12.12
    // Opera reports offsetWidths and offsetHeights less than zero on some elements
    return support.reliableHiddenOffsets() ? elem.offsetWidth <= 0 && elem.offsetHeight <= 0 && !elem.getClientRects().length : filterHidden(elem);
  };
  jQuery.expr.filters.visible = function (elem) {
    return !jQuery.expr.filters.hidden(elem);
  };
  var r20 = /%20/g,
    rbracket = /\[\]$/,
    rCRLF = /\r?\n/g,
    rsubmitterTypes = /^(?:submit|button|image|reset|file)$/i,
    rsubmittable = /^(?:input|select|textarea|keygen)/i;
  function buildParams(prefix, obj, traditional, add) {
    var name;
    if (jQuery.isArray(obj)) {
      // Serialize array item.
      jQuery.each(obj, function (i, v) {
        if (traditional || rbracket.test(prefix)) {
          // Treat each array item as a scalar.
          add(prefix, v);
        } else {
          // Item is non-scalar (array or object), encode its numeric index.
          buildParams(prefix + "[" + (_typeof(v) === "object" && v != null ? i : "") + "]", v, traditional, add);
        }
      });
    } else if (!traditional && jQuery.type(obj) === "object") {
      // Serialize object item.
      for (name in obj) {
        buildParams(prefix + "[" + name + "]", obj[name], traditional, add);
      }
    } else {
      // Serialize scalar item.
      add(prefix, obj);
    }
  }

  // Serialize an array of form elements or a set of
  // key/values into a query string
  jQuery.param = function (a, traditional) {
    var prefix,
      s = [],
      add = function add(key, value) {
        // If value is a function, invoke it and return its value
        value = jQuery.isFunction(value) ? value() : value == null ? "" : value;
        s[s.length] = encodeURIComponent(key) + "=" + encodeURIComponent(value);
      };

    // Set traditional to true for jQuery <= 1.3.2 behavior.
    if (traditional === undefined) {
      traditional = jQuery.ajaxSettings && jQuery.ajaxSettings.traditional;
    }

    // If an array was passed in, assume that it is an array of form elements.
    if (jQuery.isArray(a) || a.jquery && !jQuery.isPlainObject(a)) {
      // Serialize the form elements
      jQuery.each(a, function () {
        add(this.name, this.value);
      });
    } else {
      // If traditional, encode the "old" way (the way 1.3.2 or older
      // did it), otherwise encode params recursively.
      for (prefix in a) {
        buildParams(prefix, a[prefix], traditional, add);
      }
    }

    // Return the resulting serialization
    return s.join("&").replace(r20, "+");
  };
  jQuery.fn.extend({
    serialize: function serialize() {
      return jQuery.param(this.serializeArray());
    },
    serializeArray: function serializeArray() {
      return this.map(function () {
        // Can add propHook for "elements" to filter or add form elements
        var elements = jQuery.prop(this, "elements");
        return elements ? jQuery.makeArray(elements) : this;
      }).filter(function () {
        var type = this.type;

        // Use .is(":disabled") so that fieldset[disabled] works
        return this.name && !jQuery(this).is(":disabled") && rsubmittable.test(this.nodeName) && !rsubmitterTypes.test(type) && (this.checked || !rcheckableType.test(type));
      }).map(function (i, elem) {
        var val = jQuery(this).val();
        return val == null ? null : jQuery.isArray(val) ? jQuery.map(val, function (val) {
          return {
            name: elem.name,
            value: val.replace(rCRLF, "\r\n")
          };
        }) : {
          name: elem.name,
          value: val.replace(rCRLF, "\r\n")
        };
      }).get();
    }
  });

  // Create the request object
  // (This is still attached to ajaxSettings for backward compatibility)
  jQuery.ajaxSettings.xhr = window.ActiveXObject !== undefined ?
  // Support: IE6-IE8
  function () {
    // XHR cannot access local files, always use ActiveX for that case
    if (this.isLocal) {
      return createActiveXHR();
    }

    // Support: IE 9-11
    // IE seems to error on cross-domain PATCH requests when ActiveX XHR
    // is used. In IE 9+ always use the native XHR.
    // Note: this condition won't catch Edge as it doesn't define
    // document.documentMode but it also doesn't support ActiveX so it won't
    // reach this code.
    if (document.documentMode > 8) {
      return createStandardXHR();
    }

    // Support: IE<9
    // oldIE XHR does not support non-RFC2616 methods (#13240)
    // See http://msdn.microsoft.com/en-us/library/ie/ms536648(v=vs.85).aspx
    // and http://www.w3.org/Protocols/rfc2616/rfc2616-sec9.html#sec9
    // Although this check for six methods instead of eight
    // since IE also does not support "trace" and "connect"
    return /^(get|post|head|put|delete|options)$/i.test(this.type) && createStandardXHR() || createActiveXHR();
  } :
  // For all other browsers, use the standard XMLHttpRequest object
  createStandardXHR;
  var xhrId = 0,
    xhrCallbacks = {},
    xhrSupported = jQuery.ajaxSettings.xhr();

  // Support: IE<10
  // Open requests must be manually aborted on unload (#5280)
  // See https://support.microsoft.com/kb/2856746 for more info
  if (window.attachEvent) {
    window.attachEvent("onunload", function () {
      for (var key in xhrCallbacks) {
        xhrCallbacks[key](undefined, true);
      }
    });
  }

  // Determine support properties
  support.cors = !!xhrSupported && "withCredentials" in xhrSupported;
  xhrSupported = support.ajax = !!xhrSupported;

  // Create transport if the browser can provide an xhr
  if (xhrSupported) {
    jQuery.ajaxTransport(function (options) {
      // Cross domain only allowed if supported through XMLHttpRequest
      if (!options.crossDomain || support.cors) {
        var _callback;
        return {
          send: function send(headers, complete) {
            var i,
              xhr = options.xhr(),
              id = ++xhrId;

            // Open the socket
            xhr.open(options.type, options.url, options.async, options.username, options.password);

            // Apply custom fields if provided
            if (options.xhrFields) {
              for (i in options.xhrFields) {
                xhr[i] = options.xhrFields[i];
              }
            }

            // Override mime type if needed
            if (options.mimeType && xhr.overrideMimeType) {
              xhr.overrideMimeType(options.mimeType);
            }

            // X-Requested-With header
            // For cross-domain requests, seeing as conditions for a preflight are
            // akin to a jigsaw puzzle, we simply never set it to be sure.
            // (it can always be set on a per-request basis or even using ajaxSetup)
            // For same-domain requests, won't change header if already provided.
            if (!options.crossDomain && !headers["X-Requested-With"]) {
              headers["X-Requested-With"] = "XMLHttpRequest";
            }

            // Set headers
            for (i in headers) {
              // Support: IE<9
              // IE's ActiveXObject throws a 'Type Mismatch' exception when setting
              // request header to a null-value.
              //
              // To keep consistent with other XHR implementations, cast the value
              // to string and ignore `undefined`.
              if (headers[i] !== undefined) {
                xhr.setRequestHeader(i, headers[i] + "");
              }
            }

            // Do send the request
            // This may raise an exception which is actually
            // handled in jQuery.ajax (so no try/catch here)
            xhr.send(options.hasContent && options.data || null);

            // Listener
            _callback = function callback(_, isAbort) {
              var status, statusText, responses;

              // Was never called and is aborted or complete
              if (_callback && (isAbort || xhr.readyState === 4)) {
                // Clean up
                delete xhrCallbacks[id];
                _callback = undefined;
                xhr.onreadystatechange = jQuery.noop;

                // Abort manually if needed
                if (isAbort) {
                  if (xhr.readyState !== 4) {
                    xhr.abort();
                  }
                } else {
                  responses = {};
                  status = xhr.status;

                  // Support: IE<10
                  // Accessing binary-data responseText throws an exception
                  // (#11426)
                  if (typeof xhr.responseText === "string") {
                    responses.text = xhr.responseText;
                  }

                  // Firefox throws an exception when accessing
                  // statusText for faulty cross-domain requests
                  try {
                    statusText = xhr.statusText;
                  } catch (e) {
                    // We normalize with Webkit giving an empty statusText
                    statusText = "";
                  }

                  // Filter status for non standard behaviors

                  // If the request is local and we have data: assume a success
                  // (success with no data won't get notified, that's the best we
                  // can do given current implementations)
                  if (!status && options.isLocal && !options.crossDomain) {
                    status = responses.text ? 200 : 404;

                    // IE - #1450: sometimes returns 1223 when it should be 204
                  } else if (status === 1223) {
                    status = 204;
                  }
                }
              }

              // Call complete if needed
              if (responses) {
                complete(status, statusText, responses, xhr.getAllResponseHeaders());
              }
            };

            // Do send the request
            // `xhr.send` may raise an exception, but it will be
            // handled in jQuery.ajax (so no try/catch here)
            if (!options.async) {
              // If we're in sync mode we fire the callback
              _callback();
            } else if (xhr.readyState === 4) {
              // (IE6 & IE7) if it's in cache and has been
              // retrieved directly we need to fire the callback
              window.setTimeout(_callback);
            } else {
              // Register the callback, but delay it in case `xhr.send` throws
              // Add to the list of active xhr callbacks
              xhr.onreadystatechange = xhrCallbacks[id] = _callback;
            }
          },
          abort: function abort() {
            if (_callback) {
              _callback(undefined, true);
            }
          }
        };
      }
    });
  }

  // Functions to create xhrs
  function createStandardXHR() {
    try {
      return new window.XMLHttpRequest();
    } catch (e) {}
  }
  function createActiveXHR() {
    try {
      return new window.ActiveXObject("Microsoft.XMLHTTP");
    } catch (e) {}
  }

  // Install script dataType
  jQuery.ajaxSetup({
    accepts: {
      script: "text/javascript, application/javascript, " + "application/ecmascript, application/x-ecmascript"
    },
    contents: {
      script: /\b(?:java|ecma)script\b/
    },
    converters: {
      "text script": function textScript(text) {
        jQuery.globalEval(text);
        return text;
      }
    }
  });

  // Handle cache's special case and global
  jQuery.ajaxPrefilter("script", function (s) {
    if (s.cache === undefined) {
      s.cache = false;
    }
    if (s.crossDomain) {
      s.type = "GET";
      s.global = false;
    }
  });

  // Bind script tag hack transport
  jQuery.ajaxTransport("script", function (s) {
    // This transport only deals with cross domain requests
    if (s.crossDomain) {
      var script,
        head = document.head || jQuery("head")[0] || document.documentElement;
      return {
        send: function send(_, callback) {
          script = document.createElement("script");
          script.async = true;
          if (s.scriptCharset) {
            script.charset = s.scriptCharset;
          }
          script.src = s.url;

          // Attach handlers for all browsers
          script.onload = script.onreadystatechange = function (_, isAbort) {
            if (isAbort || !script.readyState || /loaded|complete/.test(script.readyState)) {
              // Handle memory leak in IE
              script.onload = script.onreadystatechange = null;

              // Remove the script
              if (script.parentNode) {
                script.parentNode.removeChild(script);
              }

              // Dereference the script
              script = null;

              // Callback if not abort
              if (!isAbort) {
                callback(200, "success");
              }
            }
          };

          // Circumvent IE6 bugs with base elements (#2709 and #4378) by prepending
          // Use native DOM manipulation to avoid our domManip AJAX trickery
          head.insertBefore(script, head.firstChild);
        },
        abort: function abort() {
          if (script) {
            script.onload(undefined, true);
          }
        }
      };
    }
  });
  var oldCallbacks = [],
    rjsonp = /(=)\?(?=&|$)|\?\?/;

  // Default jsonp settings
  jQuery.ajaxSetup({
    jsonp: "callback",
    jsonpCallback: function jsonpCallback() {
      var callback = oldCallbacks.pop() || jQuery.expando + "_" + nonce++;
      this[callback] = true;
      return callback;
    }
  });

  // Detect, normalize options and install callbacks for jsonp requests
  jQuery.ajaxPrefilter("json jsonp", function (s, originalSettings, jqXHR) {
    var callbackName,
      overwritten,
      responseContainer,
      jsonProp = s.jsonp !== false && (rjsonp.test(s.url) ? "url" : typeof s.data === "string" && (s.contentType || "").indexOf("application/x-www-form-urlencoded") === 0 && rjsonp.test(s.data) && "data");

    // Handle iff the expected data type is "jsonp" or we have a parameter to set
    if (jsonProp || s.dataTypes[0] === "jsonp") {
      // Get callback name, remembering preexisting value associated with it
      callbackName = s.jsonpCallback = jQuery.isFunction(s.jsonpCallback) ? s.jsonpCallback() : s.jsonpCallback;

      // Insert callback into url or form data
      if (jsonProp) {
        s[jsonProp] = s[jsonProp].replace(rjsonp, "$1" + callbackName);
      } else if (s.jsonp !== false) {
        s.url += (rquery.test(s.url) ? "&" : "?") + s.jsonp + "=" + callbackName;
      }

      // Use data converter to retrieve json after script execution
      s.converters["script json"] = function () {
        if (!responseContainer) {
          jQuery.error(callbackName + " was not called");
        }
        return responseContainer[0];
      };

      // force json dataType
      s.dataTypes[0] = "json";

      // Install callback
      overwritten = window[callbackName];
      window[callbackName] = function () {
        responseContainer = arguments;
      };

      // Clean-up function (fires after converters)
      jqXHR.always(function () {
        // If previous value didn't exist - remove it
        if (overwritten === undefined) {
          jQuery(window).removeProp(callbackName);

          // Otherwise restore preexisting value
        } else {
          window[callbackName] = overwritten;
        }

        // Save back as free
        if (s[callbackName]) {
          // make sure that re-using the options doesn't screw things around
          s.jsonpCallback = originalSettings.jsonpCallback;

          // save the callback name for future use
          oldCallbacks.push(callbackName);
        }

        // Call if it was a function and we have a response
        if (responseContainer && jQuery.isFunction(overwritten)) {
          overwritten(responseContainer[0]);
        }
        responseContainer = overwritten = undefined;
      });

      // Delegate to script
      return "script";
    }
  });

  // data: string of html
  // context (optional): If specified, the fragment will be created in this context,
  // defaults to document
  // keepScripts (optional): If true, will include scripts passed in the html string
  jQuery.parseHTML = function (data, context, keepScripts) {
    if (!data || typeof data !== "string") {
      return null;
    }
    if (typeof context === "boolean") {
      keepScripts = context;
      context = false;
    }
    context = context || document;
    var parsed = rsingleTag.exec(data),
      scripts = !keepScripts && [];

    // Single tag
    if (parsed) {
      return [context.createElement(parsed[1])];
    }
    parsed = buildFragment([data], context, scripts);
    if (scripts && scripts.length) {
      jQuery(scripts).remove();
    }
    return jQuery.merge([], parsed.childNodes);
  };

  // Keep a copy of the old load method
  var _load = jQuery.fn.load;

  /**
   * Load a url into a page
   */
  jQuery.fn.load = function (url, params, callback) {
    if (typeof url !== "string" && _load) {
      return _load.apply(this, arguments);
    }
    var selector,
      type,
      response,
      self = this,
      off = url.indexOf(" ");
    if (off > -1) {
      selector = jQuery.trim(url.slice(off, url.length));
      url = url.slice(0, off);
    }

    // If it's a function
    if (jQuery.isFunction(params)) {
      // We assume that it's the callback
      callback = params;
      params = undefined;

      // Otherwise, build a param string
    } else if (params && _typeof(params) === "object") {
      type = "POST";
    }

    // If we have elements to modify, make the request
    if (self.length > 0) {
      jQuery.ajax({
        url: url,
        // If "type" variable is undefined, then "GET" method will be used.
        // Make value of this field explicit since
        // user can override it through ajaxSetup method
        type: type || "GET",
        dataType: "html",
        data: params
      }).done(function (responseText) {
        // Save response for use in complete callback
        response = arguments;
        self.html(selector ?
        // If a selector was specified, locate the right elements in a dummy div
        // Exclude scripts to avoid IE 'Permission Denied' errors
        jQuery("<div>").append(jQuery.parseHTML(responseText)).find(selector) :
        // Otherwise use the full result
        responseText);

        // If the request succeeds, this function gets "data", "status", "jqXHR"
        // but they are ignored because response was set above.
        // If it fails, this function gets "jqXHR", "status", "error"
      }).always(callback && function (jqXHR, status) {
        self.each(function () {
          callback.apply(this, response || [jqXHR.responseText, status, jqXHR]);
        });
      });
    }
    return this;
  };

  // Attach a bunch of functions for handling common AJAX events
  jQuery.each(["ajaxStart", "ajaxStop", "ajaxComplete", "ajaxError", "ajaxSuccess", "ajaxSend"], function (i, type) {
    jQuery.fn[type] = function (fn) {
      return this.on(type, fn);
    };
  });
  jQuery.expr.filters.animated = function (elem) {
    return jQuery.grep(jQuery.timers, function (fn) {
      return elem === fn.elem;
    }).length;
  };

  /**
   * Gets a window from an element
   */
  function getWindow(elem) {
    return jQuery.isWindow(elem) ? elem : elem.nodeType === 9 ? elem.defaultView || elem.parentWindow : false;
  }
  jQuery.offset = {
    setOffset: function setOffset(elem, options, i) {
      var curPosition,
        curLeft,
        curCSSTop,
        curTop,
        curOffset,
        curCSSLeft,
        calculatePosition,
        position = jQuery.css(elem, "position"),
        curElem = jQuery(elem),
        props = {};

      // set position first, in-case top/left are set even on static elem
      if (position === "static") {
        elem.style.position = "relative";
      }
      curOffset = curElem.offset();
      curCSSTop = jQuery.css(elem, "top");
      curCSSLeft = jQuery.css(elem, "left");
      calculatePosition = (position === "absolute" || position === "fixed") && jQuery.inArray("auto", [curCSSTop, curCSSLeft]) > -1;

      // need to be able to calculate position if either top or left
      // is auto and position is either absolute or fixed
      if (calculatePosition) {
        curPosition = curElem.position();
        curTop = curPosition.top;
        curLeft = curPosition.left;
      } else {
        curTop = parseFloat(curCSSTop) || 0;
        curLeft = parseFloat(curCSSLeft) || 0;
      }
      if (jQuery.isFunction(options)) {
        // Use jQuery.extend here to allow modification of coordinates argument (gh-1848)
        options = options.call(elem, i, jQuery.extend({}, curOffset));
      }
      if (options.top != null) {
        props.top = options.top - curOffset.top + curTop;
      }
      if (options.left != null) {
        props.left = options.left - curOffset.left + curLeft;
      }
      if ("using" in options) {
        options.using.call(elem, props);
      } else {
        curElem.css(props);
      }
    }
  };
  jQuery.fn.extend({
    offset: function offset(options) {
      if (arguments.length) {
        return options === undefined ? this : this.each(function (i) {
          jQuery.offset.setOffset(this, options, i);
        });
      }
      var docElem,
        win,
        box = {
          top: 0,
          left: 0
        },
        elem = this[0],
        doc = elem && elem.ownerDocument;
      if (!doc) {
        return;
      }
      docElem = doc.documentElement;

      // Make sure it's not a disconnected DOM node
      if (!jQuery.contains(docElem, elem)) {
        return box;
      }

      // If we don't have gBCR, just use 0,0 rather than error
      // BlackBerry 5, iOS 3 (original iPhone)
      if (typeof elem.getBoundingClientRect !== "undefined") {
        box = elem.getBoundingClientRect();
      }
      win = getWindow(doc);
      return {
        top: box.top + (win.pageYOffset || docElem.scrollTop) - (docElem.clientTop || 0),
        left: box.left + (win.pageXOffset || docElem.scrollLeft) - (docElem.clientLeft || 0)
      };
    },
    position: function position() {
      if (!this[0]) {
        return;
      }
      var offsetParent,
        offset,
        parentOffset = {
          top: 0,
          left: 0
        },
        elem = this[0];

      // Fixed elements are offset from window (parentOffset = {top:0, left: 0},
      // because it is its only offset parent
      if (jQuery.css(elem, "position") === "fixed") {
        // we assume that getBoundingClientRect is available when computed position is fixed
        offset = elem.getBoundingClientRect();
      } else {
        // Get *real* offsetParent
        offsetParent = this.offsetParent();

        // Get correct offsets
        offset = this.offset();
        if (!jQuery.nodeName(offsetParent[0], "html")) {
          parentOffset = offsetParent.offset();
        }

        // Add offsetParent borders
        parentOffset.top += jQuery.css(offsetParent[0], "borderTopWidth", true);
        parentOffset.left += jQuery.css(offsetParent[0], "borderLeftWidth", true);
      }

      // Subtract parent offsets and element margins
      // note: when an element has margin: auto the offsetLeft and marginLeft
      // are the same in Safari causing offset.left to incorrectly be 0
      return {
        top: offset.top - parentOffset.top - jQuery.css(elem, "marginTop", true),
        left: offset.left - parentOffset.left - jQuery.css(elem, "marginLeft", true)
      };
    },
    offsetParent: function offsetParent() {
      return this.map(function () {
        var offsetParent = this.offsetParent;
        while (offsetParent && !jQuery.nodeName(offsetParent, "html") && jQuery.css(offsetParent, "position") === "static") {
          offsetParent = offsetParent.offsetParent;
        }
        return offsetParent || documentElement;
      });
    }
  });

  // Create scrollLeft and scrollTop methods
  jQuery.each({
    scrollLeft: "pageXOffset",
    scrollTop: "pageYOffset"
  }, function (method, prop) {
    var top = /Y/.test(prop);
    jQuery.fn[method] = function (val) {
      return access(this, function (elem, method, val) {
        var win = getWindow(elem);
        if (val === undefined) {
          return win ? prop in win ? win[prop] : win.document.documentElement[method] : elem[method];
        }
        if (win) {
          win.scrollTo(!top ? val : jQuery(win).scrollLeft(), top ? val : jQuery(win).scrollTop());
        } else {
          elem[method] = val;
        }
      }, method, val, arguments.length, null);
    };
  });

  // Support: Safari<7-8+, Chrome<37-44+
  // Add the top/left cssHooks using jQuery.fn.position
  // Webkit bug: https://bugs.webkit.org/show_bug.cgi?id=29084
  // getComputedStyle returns percent when specified for top/left/bottom/right
  // rather than make the css module depend on the offset module, we just check for it here
  jQuery.each(["top", "left"], function (i, prop) {
    jQuery.cssHooks[prop] = addGetHookIf(support.pixelPosition, function (elem, computed) {
      if (computed) {
        computed = curCSS(elem, prop);

        // if curCSS returns percentage, fallback to offset
        return rnumnonpx.test(computed) ? jQuery(elem).position()[prop] + "px" : computed;
      }
    });
  });

  // Create innerHeight, innerWidth, height, width, outerHeight and outerWidth methods
  jQuery.each({
    Height: "height",
    Width: "width"
  }, function (name, type) {
    jQuery.each({
      padding: "inner" + name,
      content: type,
      "": "outer" + name
    }, function (defaultExtra, funcName) {
      // margin is only for outerHeight, outerWidth
      jQuery.fn[funcName] = function (margin, value) {
        var chainable = arguments.length && (defaultExtra || typeof margin !== "boolean"),
          extra = defaultExtra || (margin === true || value === true ? "margin" : "border");
        return access(this, function (elem, type, value) {
          var doc;
          if (jQuery.isWindow(elem)) {
            // As of 5/8/2012 this will yield incorrect results for Mobile Safari, but there
            // isn't a whole lot we can do. See pull request at this URL for discussion:
            // https://github.com/jquery/jquery/pull/764
            return elem.document.documentElement["client" + name];
          }

          // Get document width or height
          if (elem.nodeType === 9) {
            doc = elem.documentElement;

            // Either scroll[Width/Height] or offset[Width/Height] or client[Width/Height],
            // whichever is greatest
            // unfortunately, this causes bug #3838 in IE6/8 only,
            // but there is currently no good, small way to fix it.
            return Math.max(elem.body["scroll" + name], doc["scroll" + name], elem.body["offset" + name], doc["offset" + name], doc["client" + name]);
          }
          return value === undefined ?
          // Get width or height on the element, requesting but not forcing parseFloat
          jQuery.css(elem, type, extra) :
          // Set width or height on the element
          jQuery.style(elem, type, value, extra);
        }, type, chainable ? margin : undefined, chainable, null);
      };
    });
  });
  jQuery.fn.extend({
    bind: function bind(types, data, fn) {
      return this.on(types, null, data, fn);
    },
    unbind: function unbind(types, fn) {
      return this.off(types, null, fn);
    },
    delegate: function delegate(selector, types, data, fn) {
      return this.on(types, selector, data, fn);
    },
    undelegate: function undelegate(selector, types, fn) {
      // ( namespace ) or ( selector, types [, fn] )
      return arguments.length === 1 ? this.off(selector, "**") : this.off(types, selector || "**", fn);
    }
  });

  // The number of elements contained in the matched element set
  jQuery.fn.size = function () {
    return this.length;
  };
  jQuery.fn.andSelf = jQuery.fn.addBack;

  // Register as a named AMD module, since jQuery can be concatenated with other
  // files that may use define, but not via a proper concatenation script that
  // understands anonymous AMD modules. A named AMD is safest and most robust
  // way to register. Lowercase jquery is used because AMD module names are
  // derived from file names, and jQuery is normally delivered in a lowercase
  // file name. Do this after creating the global so that if an AMD module wants
  // to call noConflict to hide this version of jQuery, it will work.

  // Note that for maximum portability, libraries that are not jQuery should
  // declare themselves as anonymous modules, and avoid setting a global if an
  // AMD loader is present. jQuery is a special case. For more information, see
  // https://github.com/jrburke/requirejs/wiki/Updating-existing-libraries#wiki-anon

  if (typeof define === "function" && define.amd) {
    define("jquery", [], function () {
      return jQuery;
    });
  }
  var
    // Map over jQuery in case of overwrite
    _jQuery = window.jQuery,
    // Map over the $ in case of overwrite
    _$ = window.$;
  jQuery.noConflict = function (deep) {
    if (window.$ === jQuery) {
      window.$ = _$;
    }
    if (deep && window.jQuery === jQuery) {
      window.jQuery = _jQuery;
    }
    return jQuery;
  };

  // Expose jQuery and $ identifiers, even in
  // AMD (#7102#comment:10, https://github.com/jquery/jquery/pull/557)
  // and CommonJS for browser emulators (#13566)
  if (!noGlobal) {
    window.jQuery = window.$ = jQuery;
  }
  return jQuery;
});

},{}],3:[function(require,module,exports){
"use strict";

function _typeof(obj) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (obj) { return typeof obj; } : function (obj) { return obj && "function" == typeof Symbol && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }, _typeof(obj); }
(function (window, factory) {
  var lazySizes = factory(window, window.document, Date);
  window.lazySizes = lazySizes;
  if ((typeof module === "undefined" ? "undefined" : _typeof(module)) == 'object' && module.exports) {
    module.exports = lazySizes;
  }
})(typeof window != 'undefined' ? window : {},
/**
 * import("./types/global")
 * @typedef { import("./types/lazysizes-config").LazySizesConfigPartial } LazySizesConfigPartial
 */
function l(window, document, Date) {
  // Pass in the window Date function also for SSR because the Date class can be lost
  'use strict';

  /*jshint eqnull:true */
  var lazysizes,
    /**
     * @type { LazySizesConfigPartial }
     */
    lazySizesCfg;
  (function () {
    var prop;
    var lazySizesDefaults = {
      lazyClass: 'lazyload',
      loadedClass: 'lazyloaded',
      loadingClass: 'lazyloading',
      preloadClass: 'lazypreload',
      errorClass: 'lazyerror',
      //strictClass: 'lazystrict',
      autosizesClass: 'lazyautosizes',
      fastLoadedClass: 'ls-is-cached',
      iframeLoadMode: 0,
      srcAttr: 'data-src',
      srcsetAttr: 'data-srcset',
      sizesAttr: 'data-sizes',
      //preloadAfterLoad: false,
      minSize: 40,
      customMedia: {},
      init: true,
      expFactor: 1.5,
      hFac: 0.8,
      loadMode: 2,
      loadHidden: true,
      ricTimeout: 0,
      throttleDelay: 125
    };
    lazySizesCfg = window.lazySizesConfig || window.lazysizesConfig || {};
    for (prop in lazySizesDefaults) {
      if (!(prop in lazySizesCfg)) {
        lazySizesCfg[prop] = lazySizesDefaults[prop];
      }
    }
  })();
  if (!document || !document.getElementsByClassName) {
    return {
      init: function init() {},
      /**
       * @type { LazySizesConfigPartial }
       */
      cfg: lazySizesCfg,
      /**
       * @type { true }
       */
      noSupport: true
    };
  }
  var docElem = document.documentElement;
  var supportPicture = window.HTMLPictureElement;
  var _addEventListener = 'addEventListener';
  var _getAttribute = 'getAttribute';

  /**
   * Update to bind to window because 'this' becomes null during SSR
   * builds.
   */
  var addEventListener = window[_addEventListener].bind(window);
  var setTimeout = window.setTimeout;
  var requestAnimationFrame = window.requestAnimationFrame || setTimeout;
  var requestIdleCallback = window.requestIdleCallback;
  var regPicture = /^picture$/i;
  var loadEvents = ['load', 'error', 'lazyincluded', '_lazyloaded'];
  var regClassCache = {};
  var forEach = Array.prototype.forEach;

  /**
   * @param ele {Element}
   * @param cls {string}
   */
  var hasClass = function hasClass(ele, cls) {
    if (!regClassCache[cls]) {
      regClassCache[cls] = new RegExp('(\\s|^)' + cls + '(\\s|$)');
    }
    return regClassCache[cls].test(ele[_getAttribute]('class') || '') && regClassCache[cls];
  };

  /**
   * @param ele {Element}
   * @param cls {string}
   */
  var addClass = function addClass(ele, cls) {
    if (!hasClass(ele, cls)) {
      ele.setAttribute('class', (ele[_getAttribute]('class') || '').trim() + ' ' + cls);
    }
  };

  /**
   * @param ele {Element}
   * @param cls {string}
   */
  var removeClass = function removeClass(ele, cls) {
    var reg;
    if (reg = hasClass(ele, cls)) {
      ele.setAttribute('class', (ele[_getAttribute]('class') || '').replace(reg, ' '));
    }
  };
  var addRemoveLoadEvents = function addRemoveLoadEvents(dom, fn, add) {
    var action = add ? _addEventListener : 'removeEventListener';
    if (add) {
      addRemoveLoadEvents(dom, fn);
    }
    loadEvents.forEach(function (evt) {
      dom[action](evt, fn);
    });
  };

  /**
   * @param elem { Element }
   * @param name { string }
   * @param detail { any }
   * @param noBubbles { boolean }
   * @param noCancelable { boolean }
   * @returns { CustomEvent }
   */
  var triggerEvent = function triggerEvent(elem, name, detail, noBubbles, noCancelable) {
    var event = document.createEvent('Event');
    if (!detail) {
      detail = {};
    }
    detail.instance = lazysizes;
    event.initEvent(name, !noBubbles, !noCancelable);
    event.detail = detail;
    elem.dispatchEvent(event);
    return event;
  };
  var updatePolyfill = function updatePolyfill(el, full) {
    var polyfill;
    if (!supportPicture && (polyfill = window.picturefill || lazySizesCfg.pf)) {
      if (full && full.src && !el[_getAttribute]('srcset')) {
        el.setAttribute('srcset', full.src);
      }
      polyfill({
        reevaluate: true,
        elements: [el]
      });
    } else if (full && full.src) {
      el.src = full.src;
    }
  };
  var getCSS = function getCSS(elem, style) {
    return (getComputedStyle(elem, null) || {})[style];
  };

  /**
   *
   * @param elem { Element }
   * @param parent { Element }
   * @param [width] {number}
   * @returns {number}
   */
  var getWidth = function getWidth(elem, parent, width) {
    width = width || elem.offsetWidth;
    while (width < lazySizesCfg.minSize && parent && !elem._lazysizesWidth) {
      width = parent.offsetWidth;
      parent = parent.parentNode;
    }
    return width;
  };
  var rAF = function () {
    var running, waiting;
    var firstFns = [];
    var secondFns = [];
    var fns = firstFns;
    var run = function run() {
      var runFns = fns;
      fns = firstFns.length ? secondFns : firstFns;
      running = true;
      waiting = false;
      while (runFns.length) {
        runFns.shift()();
      }
      running = false;
    };
    var rafBatch = function rafBatch(fn, queue) {
      if (running && !queue) {
        fn.apply(this, arguments);
      } else {
        fns.push(fn);
        if (!waiting) {
          waiting = true;
          (document.hidden ? setTimeout : requestAnimationFrame)(run);
        }
      }
    };
    rafBatch._lsFlush = run;
    return rafBatch;
  }();
  var rAFIt = function rAFIt(fn, simple) {
    return simple ? function () {
      rAF(fn);
    } : function () {
      var that = this;
      var args = arguments;
      rAF(function () {
        fn.apply(that, args);
      });
    };
  };
  var throttle = function throttle(fn) {
    var running;
    var lastTime = 0;
    var gDelay = lazySizesCfg.throttleDelay;
    var rICTimeout = lazySizesCfg.ricTimeout;
    var run = function run() {
      running = false;
      lastTime = Date.now();
      fn();
    };
    var idleCallback = requestIdleCallback && rICTimeout > 49 ? function () {
      requestIdleCallback(run, {
        timeout: rICTimeout
      });
      if (rICTimeout !== lazySizesCfg.ricTimeout) {
        rICTimeout = lazySizesCfg.ricTimeout;
      }
    } : rAFIt(function () {
      setTimeout(run);
    }, true);
    return function (isPriority) {
      var delay;
      if (isPriority = isPriority === true) {
        rICTimeout = 33;
      }
      if (running) {
        return;
      }
      running = true;
      delay = gDelay - (Date.now() - lastTime);
      if (delay < 0) {
        delay = 0;
      }
      if (isPriority || delay < 9) {
        idleCallback();
      } else {
        setTimeout(idleCallback, delay);
      }
    };
  };

  //based on http://modernjavascript.blogspot.de/2013/08/building-better-debounce.html
  var debounce = function debounce(func) {
    var timeout, timestamp;
    var wait = 99;
    var run = function run() {
      timeout = null;
      func();
    };
    var later = function later() {
      var last = Date.now() - timestamp;
      if (last < wait) {
        setTimeout(later, wait - last);
      } else {
        (requestIdleCallback || run)(run);
      }
    };
    return function () {
      timestamp = Date.now();
      if (!timeout) {
        timeout = setTimeout(later, wait);
      }
    };
  };
  var loader = function () {
    var preloadElems, isCompleted, resetPreloadingTimer, loadMode, started;
    var eLvW, elvH, eLtop, eLleft, eLright, eLbottom, isBodyHidden;
    var regImg = /^img$/i;
    var regIframe = /^iframe$/i;
    var supportScroll = 'onscroll' in window && !/(gle|ing)bot/.test(navigator.userAgent);
    var shrinkExpand = 0;
    var currentExpand = 0;
    var isLoading = 0;
    var lowRuns = -1;
    var resetPreloading = function resetPreloading(e) {
      isLoading--;
      if (!e || isLoading < 0 || !e.target) {
        isLoading = 0;
      }
    };
    var isVisible = function isVisible(elem) {
      if (isBodyHidden == null) {
        isBodyHidden = getCSS(document.body, 'visibility') == 'hidden';
      }
      return isBodyHidden || !(getCSS(elem.parentNode, 'visibility') == 'hidden' && getCSS(elem, 'visibility') == 'hidden');
    };
    var isNestedVisible = function isNestedVisible(elem, elemExpand) {
      var outerRect;
      var parent = elem;
      var visible = isVisible(elem);
      eLtop -= elemExpand;
      eLbottom += elemExpand;
      eLleft -= elemExpand;
      eLright += elemExpand;
      while (visible && (parent = parent.offsetParent) && parent != document.body && parent != docElem) {
        visible = (getCSS(parent, 'opacity') || 1) > 0;
        if (visible && getCSS(parent, 'overflow') != 'visible') {
          outerRect = parent.getBoundingClientRect();
          visible = eLright > outerRect.left && eLleft < outerRect.right && eLbottom > outerRect.top - 1 && eLtop < outerRect.bottom + 1;
        }
      }
      return visible;
    };
    var checkElements = function checkElements() {
      var eLlen, i, rect, autoLoadElem, loadedSomething, elemExpand, elemNegativeExpand, elemExpandVal, beforeExpandVal, defaultExpand, preloadExpand, hFac;
      var lazyloadElems = lazysizes.elements;
      if ((loadMode = lazySizesCfg.loadMode) && isLoading < 8 && (eLlen = lazyloadElems.length)) {
        i = 0;
        lowRuns++;
        for (; i < eLlen; i++) {
          if (!lazyloadElems[i] || lazyloadElems[i]._lazyRace) {
            continue;
          }
          if (!supportScroll || lazysizes.prematureUnveil && lazysizes.prematureUnveil(lazyloadElems[i])) {
            unveilElement(lazyloadElems[i]);
            continue;
          }
          if (!(elemExpandVal = lazyloadElems[i][_getAttribute]('data-expand')) || !(elemExpand = elemExpandVal * 1)) {
            elemExpand = currentExpand;
          }
          if (!defaultExpand) {
            defaultExpand = !lazySizesCfg.expand || lazySizesCfg.expand < 1 ? docElem.clientHeight > 500 && docElem.clientWidth > 500 ? 500 : 370 : lazySizesCfg.expand;
            lazysizes._defEx = defaultExpand;
            preloadExpand = defaultExpand * lazySizesCfg.expFactor;
            hFac = lazySizesCfg.hFac;
            isBodyHidden = null;
            if (currentExpand < preloadExpand && isLoading < 1 && lowRuns > 2 && loadMode > 2 && !document.hidden) {
              currentExpand = preloadExpand;
              lowRuns = 0;
            } else if (loadMode > 1 && lowRuns > 1 && isLoading < 6) {
              currentExpand = defaultExpand;
            } else {
              currentExpand = shrinkExpand;
            }
          }
          if (beforeExpandVal !== elemExpand) {
            eLvW = innerWidth + elemExpand * hFac;
            elvH = innerHeight + elemExpand;
            elemNegativeExpand = elemExpand * -1;
            beforeExpandVal = elemExpand;
          }
          rect = lazyloadElems[i].getBoundingClientRect();
          if ((eLbottom = rect.bottom) >= elemNegativeExpand && (eLtop = rect.top) <= elvH && (eLright = rect.right) >= elemNegativeExpand * hFac && (eLleft = rect.left) <= eLvW && (eLbottom || eLright || eLleft || eLtop) && (lazySizesCfg.loadHidden || isVisible(lazyloadElems[i])) && (isCompleted && isLoading < 3 && !elemExpandVal && (loadMode < 3 || lowRuns < 4) || isNestedVisible(lazyloadElems[i], elemExpand))) {
            unveilElement(lazyloadElems[i]);
            loadedSomething = true;
            if (isLoading > 9) {
              break;
            }
          } else if (!loadedSomething && isCompleted && !autoLoadElem && isLoading < 4 && lowRuns < 4 && loadMode > 2 && (preloadElems[0] || lazySizesCfg.preloadAfterLoad) && (preloadElems[0] || !elemExpandVal && (eLbottom || eLright || eLleft || eLtop || lazyloadElems[i][_getAttribute](lazySizesCfg.sizesAttr) != 'auto'))) {
            autoLoadElem = preloadElems[0] || lazyloadElems[i];
          }
        }
        if (autoLoadElem && !loadedSomething) {
          unveilElement(autoLoadElem);
        }
      }
    };
    var throttledCheckElements = throttle(checkElements);
    var switchLoadingClass = function switchLoadingClass(e) {
      var elem = e.target;
      if (elem._lazyCache) {
        delete elem._lazyCache;
        return;
      }
      resetPreloading(e);
      addClass(elem, lazySizesCfg.loadedClass);
      removeClass(elem, lazySizesCfg.loadingClass);
      addRemoveLoadEvents(elem, rafSwitchLoadingClass);
      triggerEvent(elem, 'lazyloaded');
    };
    var rafedSwitchLoadingClass = rAFIt(switchLoadingClass);
    var rafSwitchLoadingClass = function rafSwitchLoadingClass(e) {
      rafedSwitchLoadingClass({
        target: e.target
      });
    };
    var changeIframeSrc = function changeIframeSrc(elem, src) {
      var loadMode = elem.getAttribute('data-load-mode') || lazySizesCfg.iframeLoadMode;

      // loadMode can be also a string!
      if (loadMode == 0) {
        elem.contentWindow.location.replace(src);
      } else if (loadMode == 1) {
        elem.src = src;
      }
    };
    var handleSources = function handleSources(source) {
      var customMedia;
      var sourceSrcset = source[_getAttribute](lazySizesCfg.srcsetAttr);
      if (customMedia = lazySizesCfg.customMedia[source[_getAttribute]('data-media') || source[_getAttribute]('media')]) {
        source.setAttribute('media', customMedia);
      }
      if (sourceSrcset) {
        source.setAttribute('srcset', sourceSrcset);
      }
    };
    var lazyUnveil = rAFIt(function (elem, detail, isAuto, sizes, isImg) {
      var src, srcset, parent, isPicture, event, firesLoad;
      if (!(event = triggerEvent(elem, 'lazybeforeunveil', detail)).defaultPrevented) {
        if (sizes) {
          if (isAuto) {
            addClass(elem, lazySizesCfg.autosizesClass);
          } else {
            elem.setAttribute('sizes', sizes);
          }
        }
        srcset = elem[_getAttribute](lazySizesCfg.srcsetAttr);
        src = elem[_getAttribute](lazySizesCfg.srcAttr);
        if (isImg) {
          parent = elem.parentNode;
          isPicture = parent && regPicture.test(parent.nodeName || '');
        }
        firesLoad = detail.firesLoad || 'src' in elem && (srcset || src || isPicture);
        event = {
          target: elem
        };
        addClass(elem, lazySizesCfg.loadingClass);
        if (firesLoad) {
          clearTimeout(resetPreloadingTimer);
          resetPreloadingTimer = setTimeout(resetPreloading, 2500);
          addRemoveLoadEvents(elem, rafSwitchLoadingClass, true);
        }
        if (isPicture) {
          forEach.call(parent.getElementsByTagName('source'), handleSources);
        }
        if (srcset) {
          elem.setAttribute('srcset', srcset);
        } else if (src && !isPicture) {
          if (regIframe.test(elem.nodeName)) {
            changeIframeSrc(elem, src);
          } else {
            elem.src = src;
          }
        }
        if (isImg && (srcset || isPicture)) {
          updatePolyfill(elem, {
            src: src
          });
        }
      }
      if (elem._lazyRace) {
        delete elem._lazyRace;
      }
      removeClass(elem, lazySizesCfg.lazyClass);
      rAF(function () {
        // Part of this can be removed as soon as this fix is older: https://bugs.chromium.org/p/chromium/issues/detail?id=7731 (2015)
        var isLoaded = elem.complete && elem.naturalWidth > 1;
        if (!firesLoad || isLoaded) {
          if (isLoaded) {
            addClass(elem, lazySizesCfg.fastLoadedClass);
          }
          switchLoadingClass(event);
          elem._lazyCache = true;
          setTimeout(function () {
            if ('_lazyCache' in elem) {
              delete elem._lazyCache;
            }
          }, 9);
        }
        if (elem.loading == 'lazy') {
          isLoading--;
        }
      }, true);
    });

    /**
     *
     * @param elem { Element }
     */
    var unveilElement = function unveilElement(elem) {
      if (elem._lazyRace) {
        return;
      }
      var detail;
      var isImg = regImg.test(elem.nodeName);

      //allow using sizes="auto", but don't use. it's invalid. Use data-sizes="auto" or a valid value for sizes instead (i.e.: sizes="80vw")
      var sizes = isImg && (elem[_getAttribute](lazySizesCfg.sizesAttr) || elem[_getAttribute]('sizes'));
      var isAuto = sizes == 'auto';
      if ((isAuto || !isCompleted) && isImg && (elem[_getAttribute]('src') || elem.srcset) && !elem.complete && !hasClass(elem, lazySizesCfg.errorClass) && hasClass(elem, lazySizesCfg.lazyClass)) {
        return;
      }
      detail = triggerEvent(elem, 'lazyunveilread').detail;
      if (isAuto) {
        autoSizer.updateElem(elem, true, elem.offsetWidth);
      }
      elem._lazyRace = true;
      isLoading++;
      lazyUnveil(elem, detail, isAuto, sizes, isImg);
    };
    var afterScroll = debounce(function () {
      lazySizesCfg.loadMode = 3;
      throttledCheckElements();
    });
    var altLoadmodeScrollListner = function altLoadmodeScrollListner() {
      if (lazySizesCfg.loadMode == 3) {
        lazySizesCfg.loadMode = 2;
      }
      afterScroll();
    };
    var onload = function onload() {
      if (isCompleted) {
        return;
      }
      if (Date.now() - started < 999) {
        setTimeout(onload, 999);
        return;
      }
      isCompleted = true;
      lazySizesCfg.loadMode = 3;
      throttledCheckElements();
      addEventListener('scroll', altLoadmodeScrollListner, true);
    };
    return {
      _: function _() {
        started = Date.now();
        lazysizes.elements = document.getElementsByClassName(lazySizesCfg.lazyClass);
        preloadElems = document.getElementsByClassName(lazySizesCfg.lazyClass + ' ' + lazySizesCfg.preloadClass);
        addEventListener('scroll', throttledCheckElements, true);
        addEventListener('resize', throttledCheckElements, true);
        addEventListener('pageshow', function (e) {
          if (e.persisted) {
            var loadingElements = document.querySelectorAll('.' + lazySizesCfg.loadingClass);
            if (loadingElements.length && loadingElements.forEach) {
              requestAnimationFrame(function () {
                loadingElements.forEach(function (img) {
                  if (img.complete) {
                    unveilElement(img);
                  }
                });
              });
            }
          }
        });
        if (window.MutationObserver) {
          new MutationObserver(throttledCheckElements).observe(docElem, {
            childList: true,
            subtree: true,
            attributes: true
          });
        } else {
          docElem[_addEventListener]('DOMNodeInserted', throttledCheckElements, true);
          docElem[_addEventListener]('DOMAttrModified', throttledCheckElements, true);
          setInterval(throttledCheckElements, 999);
        }
        addEventListener('hashchange', throttledCheckElements, true);

        //, 'fullscreenchange'
        ['focus', 'mouseover', 'click', 'load', 'transitionend', 'animationend'].forEach(function (name) {
          document[_addEventListener](name, throttledCheckElements, true);
        });
        if (/d$|^c/.test(document.readyState)) {
          onload();
        } else {
          addEventListener('load', onload);
          document[_addEventListener]('DOMContentLoaded', throttledCheckElements);
          setTimeout(onload, 20000);
        }
        if (lazysizes.elements.length) {
          checkElements();
          rAF._lsFlush();
        } else {
          throttledCheckElements();
        }
      },
      checkElems: throttledCheckElements,
      unveil: unveilElement,
      _aLSL: altLoadmodeScrollListner
    };
  }();
  var autoSizer = function () {
    var autosizesElems;
    var sizeElement = rAFIt(function (elem, parent, event, width) {
      var sources, i, len;
      elem._lazysizesWidth = width;
      width += 'px';
      elem.setAttribute('sizes', width);
      if (regPicture.test(parent.nodeName || '')) {
        sources = parent.getElementsByTagName('source');
        for (i = 0, len = sources.length; i < len; i++) {
          sources[i].setAttribute('sizes', width);
        }
      }
      if (!event.detail.dataAttr) {
        updatePolyfill(elem, event.detail);
      }
    });
    /**
     *
     * @param elem {Element}
     * @param dataAttr
     * @param [width] { number }
     */
    var getSizeElement = function getSizeElement(elem, dataAttr, width) {
      var event;
      var parent = elem.parentNode;
      if (parent) {
        width = getWidth(elem, parent, width);
        event = triggerEvent(elem, 'lazybeforesizes', {
          width: width,
          dataAttr: !!dataAttr
        });
        if (!event.defaultPrevented) {
          width = event.detail.width;
          if (width && width !== elem._lazysizesWidth) {
            sizeElement(elem, parent, event, width);
          }
        }
      }
    };
    var updateElementsSizes = function updateElementsSizes() {
      var i;
      var len = autosizesElems.length;
      if (len) {
        i = 0;
        for (; i < len; i++) {
          getSizeElement(autosizesElems[i]);
        }
      }
    };
    var debouncedUpdateElementsSizes = debounce(updateElementsSizes);
    return {
      _: function _() {
        autosizesElems = document.getElementsByClassName(lazySizesCfg.autosizesClass);
        addEventListener('resize', debouncedUpdateElementsSizes);
      },
      checkElems: debouncedUpdateElementsSizes,
      updateElem: getSizeElement
    };
  }();
  var init = function init() {
    if (!init.i && document.getElementsByClassName) {
      init.i = true;
      autoSizer._();
      loader._();
    }
  };
  setTimeout(function () {
    if (lazySizesCfg.init) {
      init();
    }
  });
  lazysizes = {
    /**
     * @type { LazySizesConfigPartial }
     */
    cfg: lazySizesCfg,
    autoSizer: autoSizer,
    loader: loader,
    init: init,
    uP: updatePolyfill,
    aC: addClass,
    rC: removeClass,
    hC: hasClass,
    fire: triggerEvent,
    gW: getWidth,
    rAF: rAF
  };
  return lazysizes;
});

},{}],4:[function(require,module,exports){
"use strict";

function _typeof(obj) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (obj) { return typeof obj; } : function (obj) { return obj && "function" == typeof Symbol && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }, _typeof(obj); }
(function (window, factory) {
  var globalInstall = function globalInstall() {
    factory(window.lazySizes);
    window.removeEventListener('lazyunveilread', globalInstall, true);
  };
  factory = factory.bind(null, window, window.document);
  if ((typeof module === "undefined" ? "undefined" : _typeof(module)) == 'object' && module.exports) {
    factory(require('lazysizes'));
  } else if (typeof define == 'function' && define.amd) {
    define(['lazysizes'], factory);
  } else if (window.lazySizes) {
    globalInstall();
  } else {
    window.addEventListener('lazyunveilread', globalInstall, true);
  }
})(window, function (window, document, lazySizes) {
  'use strict';

  if (!window.addEventListener) {
    return;
  }
  var lazySizesCfg = lazySizes.cfg;
  var regWhite = /\s+/g;
  var regSplitSet = /\s*\|\s+|\s+\|\s*/g;
  var regSource = /^(.+?)(?:\s+\[\s*(.+?)\s*\])(?:\s+\[\s*(.+?)\s*\])?$/;
  var regType = /^\s*\(*\s*type\s*:\s*(.+?)\s*\)*\s*$/;
  var regBgUrlEscape = /\(|\)|'/;
  var allowedBackgroundSize = {
    contain: 1,
    cover: 1
  };
  var proxyWidth = function proxyWidth(elem) {
    var width = lazySizes.gW(elem, elem.parentNode);
    if (!elem._lazysizesWidth || width > elem._lazysizesWidth) {
      elem._lazysizesWidth = width;
    }
    return elem._lazysizesWidth;
  };
  var getBgSize = function getBgSize(elem) {
    var bgSize;
    bgSize = (getComputedStyle(elem) || {
      getPropertyValue: function getPropertyValue() {}
    }).getPropertyValue('background-size');
    if (!allowedBackgroundSize[bgSize] && allowedBackgroundSize[elem.style.backgroundSize]) {
      bgSize = elem.style.backgroundSize;
    }
    return bgSize;
  };
  var setTypeOrMedia = function setTypeOrMedia(source, match) {
    if (match) {
      var typeMatch = match.match(regType);
      if (typeMatch && typeMatch[1]) {
        source.setAttribute('type', typeMatch[1]);
      } else {
        source.setAttribute('media', lazySizesCfg.customMedia[match] || match);
      }
    }
  };
  var createPicture = function createPicture(sets, elem, img) {
    var picture = document.createElement('picture');
    var sizes = elem.getAttribute(lazySizesCfg.sizesAttr);
    var ratio = elem.getAttribute('data-ratio');
    var optimumx = elem.getAttribute('data-optimumx');
    if (elem._lazybgset && elem._lazybgset.parentNode == elem) {
      elem.removeChild(elem._lazybgset);
    }
    Object.defineProperty(img, '_lazybgset', {
      value: elem,
      writable: true
    });
    Object.defineProperty(elem, '_lazybgset', {
      value: picture,
      writable: true
    });
    sets = sets.replace(regWhite, ' ').split(regSplitSet);
    picture.style.display = 'none';
    img.className = lazySizesCfg.lazyClass;
    if (sets.length == 1 && !sizes) {
      sizes = 'auto';
    }
    sets.forEach(function (set) {
      var match;
      var source = document.createElement('source');
      if (sizes && sizes != 'auto') {
        source.setAttribute('sizes', sizes);
      }
      if (match = set.match(regSource)) {
        source.setAttribute(lazySizesCfg.srcsetAttr, match[1]);
        setTypeOrMedia(source, match[2]);
        setTypeOrMedia(source, match[3]);
      } else {
        source.setAttribute(lazySizesCfg.srcsetAttr, set);
      }
      picture.appendChild(source);
    });
    if (sizes) {
      img.setAttribute(lazySizesCfg.sizesAttr, sizes);
      elem.removeAttribute(lazySizesCfg.sizesAttr);
      elem.removeAttribute('sizes');
    }
    if (optimumx) {
      img.setAttribute('data-optimumx', optimumx);
    }
    if (ratio) {
      img.setAttribute('data-ratio', ratio);
    }
    picture.appendChild(img);
    elem.appendChild(picture);
  };
  var proxyLoad = function proxyLoad(e) {
    if (!e.target._lazybgset) {
      return;
    }
    var image = e.target;
    var elem = image._lazybgset;
    var bg = image.currentSrc || image.src;
    if (bg) {
      var useSrc = regBgUrlEscape.test(bg) ? JSON.stringify(bg) : bg;
      var event = lazySizes.fire(elem, 'bgsetproxy', {
        src: bg,
        useSrc: useSrc,
        fullSrc: null
      });
      if (!event.defaultPrevented) {
        elem.style.backgroundImage = event.detail.fullSrc || 'url(' + event.detail.useSrc + ')';
      }
    }
    if (image._lazybgsetLoading) {
      lazySizes.fire(elem, '_lazyloaded', {}, false, true);
      delete image._lazybgsetLoading;
    }
  };
  addEventListener('lazybeforeunveil', function (e) {
    var set, image, elem;
    if (e.defaultPrevented || !(set = e.target.getAttribute('data-bgset'))) {
      return;
    }
    elem = e.target;
    image = document.createElement('img');
    image.alt = '';
    image._lazybgsetLoading = true;
    e.detail.firesLoad = true;
    createPicture(set, elem, image);
    setTimeout(function () {
      lazySizes.loader.unveil(image);
      lazySizes.rAF(function () {
        lazySizes.fire(image, '_lazyloaded', {}, true, true);
        if (image.complete) {
          proxyLoad({
            target: image
          });
        }
      });
    });
  });
  document.addEventListener('load', proxyLoad, true);
  window.addEventListener('lazybeforesizes', function (e) {
    if (e.detail.instance != lazySizes) {
      return;
    }
    if (e.target._lazybgset && e.detail.dataAttr) {
      var elem = e.target._lazybgset;
      var bgSize = getBgSize(elem);
      if (allowedBackgroundSize[bgSize]) {
        e.target._lazysizesParentFit = bgSize;
        lazySizes.rAF(function () {
          e.target.setAttribute('data-parent-fit', bgSize);
          if (e.target._lazysizesParentFit) {
            delete e.target._lazysizesParentFit;
          }
        });
      }
    }
  }, true);
  document.documentElement.addEventListener('lazybeforesizes', function (e) {
    if (e.defaultPrevented || !e.target._lazybgset || e.detail.instance != lazySizes) {
      return;
    }
    e.detail.width = proxyWidth(e.target._lazybgset);
  });
});

},{"lazysizes":3}],5:[function(require,module,exports){
"use strict";

function _typeof(obj) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (obj) { return typeof obj; } : function (obj) { return obj && "function" == typeof Symbol && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }, _typeof(obj); }
(function (window, factory) {
  if (!window) {
    return;
  }
  var globalInstall = function globalInstall() {
    factory(window.lazySizes);
    window.removeEventListener('lazyunveilread', globalInstall, true);
  };
  factory = factory.bind(null, window, window.document);
  if ((typeof module === "undefined" ? "undefined" : _typeof(module)) == 'object' && module.exports) {
    factory(require('lazysizes'));
  } else if (typeof define == 'function' && define.amd) {
    define(['lazysizes'], factory);
  } else if (window.lazySizes) {
    globalInstall();
  } else {
    window.addEventListener('lazyunveilread', globalInstall, true);
  }
})(typeof window != 'undefined' ? window : 0, function (window, document, lazySizes) {
  'use strict';

  if (!window.addEventListener) {
    return;
  }
  var regDescriptors = /\s+(\d+)(w|h)\s+(\d+)(w|h)/;
  var regCssFit = /parent-fit["']*\s*:\s*["']*(contain|cover|width)/;
  var regCssObject = /parent-container["']*\s*:\s*["']*(.+?)(?=(\s|$|,|'|"|;))/;
  var regPicture = /^picture$/i;
  var cfg = lazySizes.cfg;
  var getCSS = function getCSS(elem) {
    return getComputedStyle(elem, null) || {};
  };
  var parentFit = {
    getParent: function getParent(element, parentSel) {
      var parent = element;
      var parentNode = element.parentNode;
      if ((!parentSel || parentSel == 'prev') && parentNode && regPicture.test(parentNode.nodeName || '')) {
        parentNode = parentNode.parentNode;
      }
      if (parentSel != 'self') {
        if (parentSel == 'prev') {
          parent = element.previousElementSibling;
        } else if (parentSel && (parentNode.closest || window.jQuery)) {
          parent = (parentNode.closest ? parentNode.closest(parentSel) : jQuery(parentNode).closest(parentSel)[0]) || parentNode;
        } else {
          parent = parentNode;
        }
      }
      return parent;
    },
    getFit: function getFit(element) {
      var tmpMatch, parentObj;
      var css = getCSS(element);
      var content = css.content || css.fontFamily;
      var obj = {
        fit: element._lazysizesParentFit || element.getAttribute('data-parent-fit')
      };
      if (!obj.fit && content && (tmpMatch = content.match(regCssFit))) {
        obj.fit = tmpMatch[1];
      }
      if (obj.fit) {
        parentObj = element._lazysizesParentContainer || element.getAttribute('data-parent-container');
        if (!parentObj && content && (tmpMatch = content.match(regCssObject))) {
          parentObj = tmpMatch[1];
        }
        obj.parent = parentFit.getParent(element, parentObj);
      } else {
        obj.fit = css.objectFit;
      }
      return obj;
    },
    getImageRatio: function getImageRatio(element) {
      var i, srcset, media, ratio, match, width, height;
      var parent = element.parentNode;
      var elements = parent && regPicture.test(parent.nodeName || '') ? parent.querySelectorAll('source, img') : [element];
      for (i = 0; i < elements.length; i++) {
        element = elements[i];
        srcset = element.getAttribute(cfg.srcsetAttr) || element.getAttribute('srcset') || element.getAttribute('data-pfsrcset') || element.getAttribute('data-risrcset') || '';
        media = element._lsMedia || element.getAttribute('media');
        media = cfg.customMedia[element.getAttribute('data-media') || media] || media;
        if (srcset && (!media || (window.matchMedia && matchMedia(media) || {}).matches)) {
          ratio = parseFloat(element.getAttribute('data-aspectratio'));
          if (!ratio) {
            match = srcset.match(regDescriptors);
            if (match) {
              if (match[2] == 'w') {
                width = match[1];
                height = match[3];
              } else {
                width = match[3];
                height = match[1];
              }
            } else {
              width = element.getAttribute('width');
              height = element.getAttribute('height');
            }
            ratio = width / height;
          }
          break;
        }
      }
      return ratio;
    },
    calculateSize: function calculateSize(element, width) {
      var displayRatio, height, imageRatio, retWidth;
      var fitObj = this.getFit(element);
      var fit = fitObj.fit;
      var fitElem = fitObj.parent;
      if (fit != 'width' && (fit != 'contain' && fit != 'cover' || !(imageRatio = this.getImageRatio(element)))) {
        return width;
      }
      if (fitElem) {
        width = fitElem.clientWidth;
      } else {
        fitElem = element;
      }
      retWidth = width;
      if (fit == 'width') {
        retWidth = width;
      } else {
        height = fitElem.clientHeight;
        if ((displayRatio = width / height) && (fit == 'cover' && displayRatio < imageRatio || fit == 'contain' && displayRatio > imageRatio)) {
          retWidth = width * (imageRatio / displayRatio);
        }
      }
      return retWidth;
    }
  };
  lazySizes.parentFit = parentFit;
  document.addEventListener('lazybeforesizes', function (e) {
    if (e.defaultPrevented || e.detail.instance != lazySizes) {
      return;
    }
    var element = e.target;
    e.detail.width = parentFit.calculateSize(element, e.detail.width);
  });
});

},{"lazysizes":3}],6:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.extend = extend;
exports.getDocument = getDocument;
exports.getWindow = getWindow;
exports.ssrWindow = exports.ssrDocument = void 0;
function _typeof(obj) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (obj) { return typeof obj; } : function (obj) { return obj && "function" == typeof Symbol && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }, _typeof(obj); }
/**
 * SSR Window 4.0.2
 * Better handling for window object in SSR environment
 * https://github.com/nolimits4web/ssr-window
 *
 * Copyright 2021, Vladimir Kharlampidi
 *
 * Licensed under MIT
 *
 * Released on: December 13, 2021
 */
/* eslint-disable no-param-reassign */
function isObject(obj) {
  return obj !== null && _typeof(obj) === 'object' && 'constructor' in obj && obj.constructor === Object;
}
function extend() {
  var target = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
  var src = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};
  Object.keys(src).forEach(function (key) {
    if (typeof target[key] === 'undefined') target[key] = src[key];else if (isObject(src[key]) && isObject(target[key]) && Object.keys(src[key]).length > 0) {
      extend(target[key], src[key]);
    }
  });
}
var ssrDocument = {
  body: {},
  addEventListener: function addEventListener() {},
  removeEventListener: function removeEventListener() {},
  activeElement: {
    blur: function blur() {},
    nodeName: ''
  },
  querySelector: function querySelector() {
    return null;
  },
  querySelectorAll: function querySelectorAll() {
    return [];
  },
  getElementById: function getElementById() {
    return null;
  },
  createEvent: function createEvent() {
    return {
      initEvent: function initEvent() {}
    };
  },
  createElement: function createElement() {
    return {
      children: [],
      childNodes: [],
      style: {},
      setAttribute: function setAttribute() {},
      getElementsByTagName: function getElementsByTagName() {
        return [];
      }
    };
  },
  createElementNS: function createElementNS() {
    return {};
  },
  importNode: function importNode() {
    return null;
  },
  location: {
    hash: '',
    host: '',
    hostname: '',
    href: '',
    origin: '',
    pathname: '',
    protocol: '',
    search: ''
  }
};
exports.ssrDocument = ssrDocument;
function getDocument() {
  var doc = typeof document !== 'undefined' ? document : {};
  extend(doc, ssrDocument);
  return doc;
}
var ssrWindow = {
  document: ssrDocument,
  navigator: {
    userAgent: ''
  },
  location: {
    hash: '',
    host: '',
    hostname: '',
    href: '',
    origin: '',
    pathname: '',
    protocol: '',
    search: ''
  },
  history: {
    replaceState: function replaceState() {},
    pushState: function pushState() {},
    go: function go() {},
    back: function back() {}
  },
  CustomEvent: function CustomEvent() {
    return this;
  },
  addEventListener: function addEventListener() {},
  removeEventListener: function removeEventListener() {},
  getComputedStyle: function getComputedStyle() {
    return {
      getPropertyValue: function getPropertyValue() {
        return '';
      }
    };
  },
  Image: function Image() {},
  Date: function Date() {},
  screen: {},
  setTimeout: function setTimeout() {},
  clearTimeout: function clearTimeout() {},
  matchMedia: function matchMedia() {
    return {};
  },
  requestAnimationFrame: function requestAnimationFrame(callback) {
    if (typeof setTimeout === 'undefined') {
      callback();
      return null;
    }
    return setTimeout(callback, 0);
  },
  cancelAnimationFrame: function cancelAnimationFrame(id) {
    if (typeof setTimeout === 'undefined') {
      return;
    }
    clearTimeout(id);
  }
};
exports.ssrWindow = ssrWindow;
function getWindow() {
  var win = typeof window !== 'undefined' ? window : {};
  extend(win, ssrWindow);
  return win;
}

},{}],7:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = getBreakpoint;
var _ssrWindow = require("ssr-window");
function getBreakpoint(breakpoints) {
  var base = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 'window';
  var containerEl = arguments.length > 2 ? arguments[2] : undefined;
  if (!breakpoints || base === 'container' && !containerEl) return undefined;
  var breakpoint = false;
  var window = (0, _ssrWindow.getWindow)();
  var currentHeight = base === 'window' ? window.innerHeight : containerEl.clientHeight;
  var points = Object.keys(breakpoints).map(function (point) {
    if (typeof point === 'string' && point.indexOf('@') === 0) {
      var minRatio = parseFloat(point.substr(1));
      var value = currentHeight * minRatio;
      return {
        value: value,
        point: point
      };
    }
    return {
      value: point,
      point: point
    };
  });
  points.sort(function (a, b) {
    return parseInt(a.value, 10) - parseInt(b.value, 10);
  });
  for (var i = 0; i < points.length; i += 1) {
    var _points$i = points[i],
      point = _points$i.point,
      value = _points$i.value;
    if (base === 'window') {
      if (window.matchMedia("(min-width: ".concat(value, "px)")).matches) {
        breakpoint = point;
      }
    } else if (value <= containerEl.clientWidth) {
      breakpoint = point;
    }
  }
  return breakpoint || 'max';
}

},{"ssr-window":6}],8:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;
var _setBreakpoint = _interopRequireDefault(require("./setBreakpoint.js"));
var _getBreakpoint = _interopRequireDefault(require("./getBreakpoint.js"));
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }
var _default = {
  setBreakpoint: _setBreakpoint["default"],
  getBreakpoint: _getBreakpoint["default"]
};
exports["default"] = _default;

},{"./getBreakpoint.js":7,"./setBreakpoint.js":9}],9:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = setBreakpoint;
var _utils = require("../../shared/utils.js");
var isGridEnabled = function isGridEnabled(swiper, params) {
  return swiper.grid && params.grid && params.grid.rows > 1;
};
function setBreakpoint() {
  var swiper = this;
  var realIndex = swiper.realIndex,
    initialized = swiper.initialized,
    params = swiper.params,
    el = swiper.el;
  var breakpoints = params.breakpoints;
  if (!breakpoints || breakpoints && Object.keys(breakpoints).length === 0) return;

  // Get breakpoint for window width and update parameters
  var breakpoint = swiper.getBreakpoint(breakpoints, swiper.params.breakpointsBase, swiper.el);
  if (!breakpoint || swiper.currentBreakpoint === breakpoint) return;
  var breakpointOnlyParams = breakpoint in breakpoints ? breakpoints[breakpoint] : undefined;
  var breakpointParams = breakpointOnlyParams || swiper.originalParams;
  var wasMultiRow = isGridEnabled(swiper, params);
  var isMultiRow = isGridEnabled(swiper, breakpointParams);
  var wasEnabled = params.enabled;
  if (wasMultiRow && !isMultiRow) {
    el.classList.remove("".concat(params.containerModifierClass, "grid"), "".concat(params.containerModifierClass, "grid-column"));
    swiper.emitContainerClasses();
  } else if (!wasMultiRow && isMultiRow) {
    el.classList.add("".concat(params.containerModifierClass, "grid"));
    if (breakpointParams.grid.fill && breakpointParams.grid.fill === 'column' || !breakpointParams.grid.fill && params.grid.fill === 'column') {
      el.classList.add("".concat(params.containerModifierClass, "grid-column"));
    }
    swiper.emitContainerClasses();
  }

  // Toggle navigation, pagination, scrollbar
  ['navigation', 'pagination', 'scrollbar'].forEach(function (prop) {
    var wasModuleEnabled = params[prop] && params[prop].enabled;
    var isModuleEnabled = breakpointParams[prop] && breakpointParams[prop].enabled;
    if (wasModuleEnabled && !isModuleEnabled) {
      swiper[prop].disable();
    }
    if (!wasModuleEnabled && isModuleEnabled) {
      swiper[prop].enable();
    }
  });
  var directionChanged = breakpointParams.direction && breakpointParams.direction !== params.direction;
  var needsReLoop = params.loop && (breakpointParams.slidesPerView !== params.slidesPerView || directionChanged);
  if (directionChanged && initialized) {
    swiper.changeDirection();
  }
  (0, _utils.extend)(swiper.params, breakpointParams);
  var isEnabled = swiper.params.enabled;
  Object.assign(swiper, {
    allowTouchMove: swiper.params.allowTouchMove,
    allowSlideNext: swiper.params.allowSlideNext,
    allowSlidePrev: swiper.params.allowSlidePrev
  });
  if (wasEnabled && !isEnabled) {
    swiper.disable();
  } else if (!wasEnabled && isEnabled) {
    swiper.enable();
  }
  swiper.currentBreakpoint = breakpoint;
  swiper.emit('_beforeBreakpoint', breakpointParams);
  if (needsReLoop && initialized) {
    swiper.loopDestroy();
    swiper.loopCreate(realIndex);
    swiper.updateSlides();
  }
  swiper.emit('breakpoint', breakpointParams);
}

},{"../../shared/utils.js":102}],10:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;
function checkOverflow() {
  var swiper = this;
  var wasLocked = swiper.isLocked,
    params = swiper.params;
  var slidesOffsetBefore = params.slidesOffsetBefore;
  if (slidesOffsetBefore) {
    var lastSlideIndex = swiper.slides.length - 1;
    var lastSlideRightEdge = swiper.slidesGrid[lastSlideIndex] + swiper.slidesSizesGrid[lastSlideIndex] + slidesOffsetBefore * 2;
    swiper.isLocked = swiper.size > lastSlideRightEdge;
  } else {
    swiper.isLocked = swiper.snapGrid.length === 1;
  }
  if (params.allowSlideNext === true) {
    swiper.allowSlideNext = !swiper.isLocked;
  }
  if (params.allowSlidePrev === true) {
    swiper.allowSlidePrev = !swiper.isLocked;
  }
  if (wasLocked && wasLocked !== swiper.isLocked) {
    swiper.isEnd = false;
  }
  if (wasLocked !== swiper.isLocked) {
    swiper.emit(swiper.isLocked ? 'lock' : 'unlock');
  }
}
var _default = {
  checkOverflow: checkOverflow
};
exports["default"] = _default;

},{}],11:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = addClasses;
function _toConsumableArray(arr) { return _arrayWithoutHoles(arr) || _iterableToArray(arr) || _unsupportedIterableToArray(arr) || _nonIterableSpread(); }
function _nonIterableSpread() { throw new TypeError("Invalid attempt to spread non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }
function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }
function _iterableToArray(iter) { if (typeof Symbol !== "undefined" && iter[Symbol.iterator] != null || iter["@@iterator"] != null) return Array.from(iter); }
function _arrayWithoutHoles(arr) { if (Array.isArray(arr)) return _arrayLikeToArray(arr); }
function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) arr2[i] = arr[i]; return arr2; }
function _typeof(obj) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (obj) { return typeof obj; } : function (obj) { return obj && "function" == typeof Symbol && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }, _typeof(obj); }
function prepareClasses(entries, prefix) {
  var resultClasses = [];
  entries.forEach(function (item) {
    if (_typeof(item) === 'object') {
      Object.keys(item).forEach(function (classNames) {
        if (item[classNames]) {
          resultClasses.push(prefix + classNames);
        }
      });
    } else if (typeof item === 'string') {
      resultClasses.push(prefix + item);
    }
  });
  return resultClasses;
}
function addClasses() {
  var _el$classList;
  var swiper = this;
  var classNames = swiper.classNames,
    params = swiper.params,
    rtl = swiper.rtl,
    el = swiper.el,
    device = swiper.device;
  // prettier-ignore
  var suffixes = prepareClasses(['initialized', params.direction, {
    'free-mode': swiper.params.freeMode && params.freeMode.enabled
  }, {
    'autoheight': params.autoHeight
  }, {
    'rtl': rtl
  }, {
    'grid': params.grid && params.grid.rows > 1
  }, {
    'grid-column': params.grid && params.grid.rows > 1 && params.grid.fill === 'column'
  }, {
    'android': device.android
  }, {
    'ios': device.ios
  }, {
    'css-mode': params.cssMode
  }, {
    'centered': params.cssMode && params.centeredSlides
  }, {
    'watch-progress': params.watchSlidesProgress
  }], params.containerModifierClass);
  classNames.push.apply(classNames, _toConsumableArray(suffixes));
  (_el$classList = el.classList).add.apply(_el$classList, _toConsumableArray(classNames));
  swiper.emitContainerClasses();
}

},{}],12:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;
var _addClasses = _interopRequireDefault(require("./addClasses.js"));
var _removeClasses = _interopRequireDefault(require("./removeClasses.js"));
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }
var _default = {
  addClasses: _addClasses["default"],
  removeClasses: _removeClasses["default"]
};
exports["default"] = _default;

},{"./addClasses.js":11,"./removeClasses.js":13}],13:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = removeClasses;
function _toConsumableArray(arr) { return _arrayWithoutHoles(arr) || _iterableToArray(arr) || _unsupportedIterableToArray(arr) || _nonIterableSpread(); }
function _nonIterableSpread() { throw new TypeError("Invalid attempt to spread non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }
function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }
function _iterableToArray(iter) { if (typeof Symbol !== "undefined" && iter[Symbol.iterator] != null || iter["@@iterator"] != null) return Array.from(iter); }
function _arrayWithoutHoles(arr) { if (Array.isArray(arr)) return _arrayLikeToArray(arr); }
function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) arr2[i] = arr[i]; return arr2; }
function removeClasses() {
  var _el$classList;
  var swiper = this;
  var el = swiper.el,
    classNames = swiper.classNames;
  (_el$classList = el.classList).remove.apply(_el$classList, _toConsumableArray(classNames));
  swiper.emitContainerClasses();
}

},{}],14:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;
var _ssrWindow = require("ssr-window");
var _utils = require("../shared/utils.js");
var _getSupport = require("../shared/get-support.js");
var _getDevice = require("../shared/get-device.js");
var _getBrowser = require("../shared/get-browser.js");
var _resize = _interopRequireDefault(require("./modules/resize/resize.js"));
var _observer = _interopRequireDefault(require("./modules/observer/observer.js"));
var _eventsEmitter = _interopRequireDefault(require("./events-emitter.js"));
var _index = _interopRequireDefault(require("./update/index.js"));
var _index2 = _interopRequireDefault(require("./translate/index.js"));
var _index3 = _interopRequireDefault(require("./transition/index.js"));
var _index4 = _interopRequireDefault(require("./slide/index.js"));
var _index5 = _interopRequireDefault(require("./loop/index.js"));
var _index6 = _interopRequireDefault(require("./grab-cursor/index.js"));
var _index7 = _interopRequireDefault(require("./events/index.js"));
var _index8 = _interopRequireDefault(require("./breakpoints/index.js"));
var _index9 = _interopRequireDefault(require("./classes/index.js"));
var _index10 = _interopRequireDefault(require("./check-overflow/index.js"));
var _defaults = _interopRequireDefault(require("./defaults.js"));
var _moduleExtendParams = _interopRequireDefault(require("./moduleExtendParams.js"));
var _processLazyPreloader = require("../shared/process-lazy-preloader.js");
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }
function _typeof(obj) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (obj) { return typeof obj; } : function (obj) { return obj && "function" == typeof Symbol && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }, _typeof(obj); }
function _toConsumableArray(arr) { return _arrayWithoutHoles(arr) || _iterableToArray(arr) || _unsupportedIterableToArray(arr) || _nonIterableSpread(); }
function _nonIterableSpread() { throw new TypeError("Invalid attempt to spread non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }
function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }
function _iterableToArray(iter) { if (typeof Symbol !== "undefined" && iter[Symbol.iterator] != null || iter["@@iterator"] != null) return Array.from(iter); }
function _arrayWithoutHoles(arr) { if (Array.isArray(arr)) return _arrayLikeToArray(arr); }
function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) arr2[i] = arr[i]; return arr2; }
function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }
function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, _toPropertyKey(descriptor.key), descriptor); } }
function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); Object.defineProperty(Constructor, "prototype", { writable: false }); return Constructor; }
function _toPropertyKey(arg) { var key = _toPrimitive(arg, "string"); return _typeof(key) === "symbol" ? key : String(key); }
function _toPrimitive(input, hint) { if (_typeof(input) !== "object" || input === null) return input; var prim = input[Symbol.toPrimitive]; if (prim !== undefined) { var res = prim.call(input, hint || "default"); if (_typeof(res) !== "object") return res; throw new TypeError("@@toPrimitive must return a primitive value."); } return (hint === "string" ? String : Number)(input); } /* eslint no-param-reassign: "off" */
var prototypes = {
  eventsEmitter: _eventsEmitter["default"],
  update: _index["default"],
  translate: _index2["default"],
  transition: _index3["default"],
  slide: _index4["default"],
  loop: _index5["default"],
  grabCursor: _index6["default"],
  events: _index7["default"],
  breakpoints: _index8["default"],
  checkOverflow: _index10["default"],
  classes: _index9["default"]
};
var extendedDefaults = {};
var Swiper = /*#__PURE__*/function () {
  function Swiper() {
    _classCallCheck(this, Swiper);
    var el;
    var params;
    for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }
    if (args.length === 1 && args[0].constructor && Object.prototype.toString.call(args[0]).slice(8, -1) === 'Object') {
      params = args[0];
    } else {
      el = args[0];
      params = args[1];
    }
    if (!params) params = {};
    params = (0, _utils.extend)({}, params);
    if (el && !params.el) params.el = el;
    var document = (0, _ssrWindow.getDocument)();
    if (params.el && typeof params.el === 'string' && document.querySelectorAll(params.el).length > 1) {
      var swipers = [];
      document.querySelectorAll(params.el).forEach(function (containerEl) {
        var newParams = (0, _utils.extend)({}, params, {
          el: containerEl
        });
        swipers.push(new Swiper(newParams));
      });
      // eslint-disable-next-line no-constructor-return
      return swipers;
    }

    // Swiper Instance
    var swiper = this;
    swiper.__swiper__ = true;
    swiper.support = (0, _getSupport.getSupport)();
    swiper.device = (0, _getDevice.getDevice)({
      userAgent: params.userAgent
    });
    swiper.browser = (0, _getBrowser.getBrowser)();
    swiper.eventsListeners = {};
    swiper.eventsAnyListeners = [];
    swiper.modules = _toConsumableArray(swiper.__modules__);
    if (params.modules && Array.isArray(params.modules)) {
      var _swiper$modules;
      (_swiper$modules = swiper.modules).push.apply(_swiper$modules, _toConsumableArray(params.modules));
    }
    var allModulesParams = {};
    swiper.modules.forEach(function (mod) {
      mod({
        params: params,
        swiper: swiper,
        extendParams: (0, _moduleExtendParams["default"])(params, allModulesParams),
        on: swiper.on.bind(swiper),
        once: swiper.once.bind(swiper),
        off: swiper.off.bind(swiper),
        emit: swiper.emit.bind(swiper)
      });
    });

    // Extend defaults with modules params
    var swiperParams = (0, _utils.extend)({}, _defaults["default"], allModulesParams);

    // Extend defaults with passed params
    swiper.params = (0, _utils.extend)({}, swiperParams, extendedDefaults, params);
    swiper.originalParams = (0, _utils.extend)({}, swiper.params);
    swiper.passedParams = (0, _utils.extend)({}, params);

    // add event listeners
    if (swiper.params && swiper.params.on) {
      Object.keys(swiper.params.on).forEach(function (eventName) {
        swiper.on(eventName, swiper.params.on[eventName]);
      });
    }
    if (swiper.params && swiper.params.onAny) {
      swiper.onAny(swiper.params.onAny);
    }

    // Extend Swiper
    Object.assign(swiper, {
      enabled: swiper.params.enabled,
      el: el,
      // Classes
      classNames: [],
      // Slides
      slides: [],
      slidesGrid: [],
      snapGrid: [],
      slidesSizesGrid: [],
      // isDirection
      isHorizontal: function isHorizontal() {
        return swiper.params.direction === 'horizontal';
      },
      isVertical: function isVertical() {
        return swiper.params.direction === 'vertical';
      },
      // Indexes
      activeIndex: 0,
      realIndex: 0,
      //
      isBeginning: true,
      isEnd: false,
      // Props
      translate: 0,
      previousTranslate: 0,
      progress: 0,
      velocity: 0,
      animating: false,
      cssOverflowAdjustment: function cssOverflowAdjustment() {
        // Returns 0 unless `translate` is > 2**23
        // Should be subtracted from css values to prevent overflow
        return Math.trunc(this.translate / Math.pow(2, 23)) * Math.pow(2, 23);
      },
      // Locks
      allowSlideNext: swiper.params.allowSlideNext,
      allowSlidePrev: swiper.params.allowSlidePrev,
      // Touch Events
      touchEventsData: {
        isTouched: undefined,
        isMoved: undefined,
        allowTouchCallbacks: undefined,
        touchStartTime: undefined,
        isScrolling: undefined,
        currentTranslate: undefined,
        startTranslate: undefined,
        allowThresholdMove: undefined,
        // Form elements to match
        focusableElements: swiper.params.focusableElements,
        // Last click time
        lastClickTime: 0,
        clickTimeout: undefined,
        // Velocities
        velocities: [],
        allowMomentumBounce: undefined,
        startMoving: undefined,
        evCache: []
      },
      // Clicks
      allowClick: true,
      // Touches
      allowTouchMove: swiper.params.allowTouchMove,
      touches: {
        startX: 0,
        startY: 0,
        currentX: 0,
        currentY: 0,
        diff: 0
      },
      // Images
      imagesToLoad: [],
      imagesLoaded: 0
    });
    swiper.emit('_swiper');

    // Init
    if (swiper.params.init) {
      swiper.init();
    }

    // Return app instance
    // eslint-disable-next-line no-constructor-return
    return swiper;
  }
  _createClass(Swiper, [{
    key: "getSlideIndex",
    value: function getSlideIndex(slideEl) {
      var slidesEl = this.slidesEl,
        params = this.params;
      var slides = (0, _utils.elementChildren)(slidesEl, ".".concat(params.slideClass, ", swiper-slide"));
      var firstSlideIndex = (0, _utils.elementIndex)(slides[0]);
      return (0, _utils.elementIndex)(slideEl) - firstSlideIndex;
    }
  }, {
    key: "getSlideIndexByData",
    value: function getSlideIndexByData(index) {
      return this.getSlideIndex(this.slides.filter(function (slideEl) {
        return slideEl.getAttribute('data-swiper-slide-index') * 1 === index;
      })[0]);
    }
  }, {
    key: "recalcSlides",
    value: function recalcSlides() {
      var swiper = this;
      var slidesEl = swiper.slidesEl,
        params = swiper.params;
      swiper.slides = (0, _utils.elementChildren)(slidesEl, ".".concat(params.slideClass, ", swiper-slide"));
    }
  }, {
    key: "enable",
    value: function enable() {
      var swiper = this;
      if (swiper.enabled) return;
      swiper.enabled = true;
      if (swiper.params.grabCursor) {
        swiper.setGrabCursor();
      }
      swiper.emit('enable');
    }
  }, {
    key: "disable",
    value: function disable() {
      var swiper = this;
      if (!swiper.enabled) return;
      swiper.enabled = false;
      if (swiper.params.grabCursor) {
        swiper.unsetGrabCursor();
      }
      swiper.emit('disable');
    }
  }, {
    key: "setProgress",
    value: function setProgress(progress, speed) {
      var swiper = this;
      progress = Math.min(Math.max(progress, 0), 1);
      var min = swiper.minTranslate();
      var max = swiper.maxTranslate();
      var current = (max - min) * progress + min;
      swiper.translateTo(current, typeof speed === 'undefined' ? 0 : speed);
      swiper.updateActiveIndex();
      swiper.updateSlidesClasses();
    }
  }, {
    key: "emitContainerClasses",
    value: function emitContainerClasses() {
      var swiper = this;
      if (!swiper.params._emitClasses || !swiper.el) return;
      var cls = swiper.el.className.split(' ').filter(function (className) {
        return className.indexOf('swiper') === 0 || className.indexOf(swiper.params.containerModifierClass) === 0;
      });
      swiper.emit('_containerClasses', cls.join(' '));
    }
  }, {
    key: "getSlideClasses",
    value: function getSlideClasses(slideEl) {
      var swiper = this;
      if (swiper.destroyed) return '';
      return slideEl.className.split(' ').filter(function (className) {
        return className.indexOf('swiper-slide') === 0 || className.indexOf(swiper.params.slideClass) === 0;
      }).join(' ');
    }
  }, {
    key: "emitSlidesClasses",
    value: function emitSlidesClasses() {
      var swiper = this;
      if (!swiper.params._emitClasses || !swiper.el) return;
      var updates = [];
      swiper.slides.forEach(function (slideEl) {
        var classNames = swiper.getSlideClasses(slideEl);
        updates.push({
          slideEl: slideEl,
          classNames: classNames
        });
        swiper.emit('_slideClass', slideEl, classNames);
      });
      swiper.emit('_slideClasses', updates);
    }
  }, {
    key: "slidesPerViewDynamic",
    value: function slidesPerViewDynamic() {
      var view = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : 'current';
      var exact = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : false;
      var swiper = this;
      var params = swiper.params,
        slides = swiper.slides,
        slidesGrid = swiper.slidesGrid,
        slidesSizesGrid = swiper.slidesSizesGrid,
        swiperSize = swiper.size,
        activeIndex = swiper.activeIndex;
      var spv = 1;
      if (params.centeredSlides) {
        var slideSize = slides[activeIndex].swiperSlideSize;
        var breakLoop;
        for (var i = activeIndex + 1; i < slides.length; i += 1) {
          if (slides[i] && !breakLoop) {
            slideSize += slides[i].swiperSlideSize;
            spv += 1;
            if (slideSize > swiperSize) breakLoop = true;
          }
        }
        for (var _i = activeIndex - 1; _i >= 0; _i -= 1) {
          if (slides[_i] && !breakLoop) {
            slideSize += slides[_i].swiperSlideSize;
            spv += 1;
            if (slideSize > swiperSize) breakLoop = true;
          }
        }
      } else {
        // eslint-disable-next-line
        if (view === 'current') {
          for (var _i2 = activeIndex + 1; _i2 < slides.length; _i2 += 1) {
            var slideInView = exact ? slidesGrid[_i2] + slidesSizesGrid[_i2] - slidesGrid[activeIndex] < swiperSize : slidesGrid[_i2] - slidesGrid[activeIndex] < swiperSize;
            if (slideInView) {
              spv += 1;
            }
          }
        } else {
          // previous
          for (var _i3 = activeIndex - 1; _i3 >= 0; _i3 -= 1) {
            var _slideInView = slidesGrid[activeIndex] - slidesGrid[_i3] < swiperSize;
            if (_slideInView) {
              spv += 1;
            }
          }
        }
      }
      return spv;
    }
  }, {
    key: "update",
    value: function update() {
      var swiper = this;
      if (!swiper || swiper.destroyed) return;
      var snapGrid = swiper.snapGrid,
        params = swiper.params;
      // Breakpoints
      if (params.breakpoints) {
        swiper.setBreakpoint();
      }
      _toConsumableArray(swiper.el.querySelectorAll('[loading="lazy"]')).forEach(function (imageEl) {
        if (imageEl.complete) {
          (0, _processLazyPreloader.processLazyPreloader)(swiper, imageEl);
        }
      });
      swiper.updateSize();
      swiper.updateSlides();
      swiper.updateProgress();
      swiper.updateSlidesClasses();
      function setTranslate() {
        var translateValue = swiper.rtlTranslate ? swiper.translate * -1 : swiper.translate;
        var newTranslate = Math.min(Math.max(translateValue, swiper.maxTranslate()), swiper.minTranslate());
        swiper.setTranslate(newTranslate);
        swiper.updateActiveIndex();
        swiper.updateSlidesClasses();
      }
      var translated;
      if (swiper.params.freeMode && swiper.params.freeMode.enabled) {
        setTranslate();
        if (swiper.params.autoHeight) {
          swiper.updateAutoHeight();
        }
      } else {
        if ((swiper.params.slidesPerView === 'auto' || swiper.params.slidesPerView > 1) && swiper.isEnd && !swiper.params.centeredSlides) {
          var slides = swiper.virtual && swiper.params.virtual.enabled ? swiper.virtual.slides : swiper.slides;
          translated = swiper.slideTo(slides.length - 1, 0, false, true);
        } else {
          translated = swiper.slideTo(swiper.activeIndex, 0, false, true);
        }
        if (!translated) {
          setTranslate();
        }
      }
      if (params.watchOverflow && snapGrid !== swiper.snapGrid) {
        swiper.checkOverflow();
      }
      swiper.emit('update');
    }
  }, {
    key: "changeDirection",
    value: function changeDirection(newDirection) {
      var needUpdate = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : true;
      var swiper = this;
      var currentDirection = swiper.params.direction;
      if (!newDirection) {
        // eslint-disable-next-line
        newDirection = currentDirection === 'horizontal' ? 'vertical' : 'horizontal';
      }
      if (newDirection === currentDirection || newDirection !== 'horizontal' && newDirection !== 'vertical') {
        return swiper;
      }
      swiper.el.classList.remove("".concat(swiper.params.containerModifierClass).concat(currentDirection));
      swiper.el.classList.add("".concat(swiper.params.containerModifierClass).concat(newDirection));
      swiper.emitContainerClasses();
      swiper.params.direction = newDirection;
      swiper.slides.forEach(function (slideEl) {
        if (newDirection === 'vertical') {
          slideEl.style.width = '';
        } else {
          slideEl.style.height = '';
        }
      });
      swiper.emit('changeDirection');
      if (needUpdate) swiper.update();
      return swiper;
    }
  }, {
    key: "changeLanguageDirection",
    value: function changeLanguageDirection(direction) {
      var swiper = this;
      if (swiper.rtl && direction === 'rtl' || !swiper.rtl && direction === 'ltr') return;
      swiper.rtl = direction === 'rtl';
      swiper.rtlTranslate = swiper.params.direction === 'horizontal' && swiper.rtl;
      if (swiper.rtl) {
        swiper.el.classList.add("".concat(swiper.params.containerModifierClass, "rtl"));
        swiper.el.dir = 'rtl';
      } else {
        swiper.el.classList.remove("".concat(swiper.params.containerModifierClass, "rtl"));
        swiper.el.dir = 'ltr';
      }
      swiper.update();
    }
  }, {
    key: "mount",
    value: function mount(element) {
      var swiper = this;
      if (swiper.mounted) return true;

      // Find el
      var el = element || swiper.params.el;
      if (typeof el === 'string') {
        el = document.querySelector(el);
      }
      if (!el) {
        return false;
      }
      el.swiper = swiper;
      if (el.shadowEl) {
        swiper.isElement = true;
      }
      var getWrapperSelector = function getWrapperSelector() {
        return ".".concat((swiper.params.wrapperClass || '').trim().split(' ').join('.'));
      };
      var getWrapper = function getWrapper() {
        if (el && el.shadowRoot && el.shadowRoot.querySelector) {
          var res = el.shadowRoot.querySelector(getWrapperSelector());
          // Children needs to return slot items
          return res;
        }
        return (0, _utils.elementChildren)(el, getWrapperSelector())[0];
      };
      // Find Wrapper
      var wrapperEl = getWrapper();
      if (!wrapperEl && swiper.params.createElements) {
        wrapperEl = (0, _utils.createElement)('div', swiper.params.wrapperClass);
        el.append(wrapperEl);
        (0, _utils.elementChildren)(el, ".".concat(swiper.params.slideClass)).forEach(function (slideEl) {
          wrapperEl.append(slideEl);
        });
      }
      Object.assign(swiper, {
        el: el,
        wrapperEl: wrapperEl,
        slidesEl: swiper.isElement ? el : wrapperEl,
        mounted: true,
        // RTL
        rtl: el.dir.toLowerCase() === 'rtl' || (0, _utils.elementStyle)(el, 'direction') === 'rtl',
        rtlTranslate: swiper.params.direction === 'horizontal' && (el.dir.toLowerCase() === 'rtl' || (0, _utils.elementStyle)(el, 'direction') === 'rtl'),
        wrongRTL: (0, _utils.elementStyle)(wrapperEl, 'display') === '-webkit-box'
      });
      return true;
    }
  }, {
    key: "init",
    value: function init(el) {
      var swiper = this;
      if (swiper.initialized) return swiper;
      var mounted = swiper.mount(el);
      if (mounted === false) return swiper;
      swiper.emit('beforeInit');

      // Set breakpoint
      if (swiper.params.breakpoints) {
        swiper.setBreakpoint();
      }

      // Add Classes
      swiper.addClasses();

      // Update size
      swiper.updateSize();

      // Update slides
      swiper.updateSlides();
      if (swiper.params.watchOverflow) {
        swiper.checkOverflow();
      }

      // Set Grab Cursor
      if (swiper.params.grabCursor && swiper.enabled) {
        swiper.setGrabCursor();
      }

      // Slide To Initial Slide
      if (swiper.params.loop && swiper.virtual && swiper.params.virtual.enabled) {
        swiper.slideTo(swiper.params.initialSlide + swiper.virtual.slidesBefore, 0, swiper.params.runCallbacksOnInit, false, true);
      } else {
        swiper.slideTo(swiper.params.initialSlide, 0, swiper.params.runCallbacksOnInit, false, true);
      }

      // Create loop
      if (swiper.params.loop) {
        swiper.loopCreate();
      }

      // Attach events
      swiper.attachEvents();
      _toConsumableArray(swiper.el.querySelectorAll('[loading="lazy"]')).forEach(function (imageEl) {
        if (imageEl.complete) {
          (0, _processLazyPreloader.processLazyPreloader)(swiper, imageEl);
        } else {
          imageEl.addEventListener('load', function (e) {
            (0, _processLazyPreloader.processLazyPreloader)(swiper, e.target);
          });
        }
      });
      (0, _processLazyPreloader.preload)(swiper);

      // Init Flag
      swiper.initialized = true;
      (0, _processLazyPreloader.preload)(swiper);

      // Emit
      swiper.emit('init');
      swiper.emit('afterInit');
      return swiper;
    }
  }, {
    key: "destroy",
    value: function destroy() {
      var deleteInstance = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : true;
      var cleanStyles = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : true;
      var swiper = this;
      var params = swiper.params,
        el = swiper.el,
        wrapperEl = swiper.wrapperEl,
        slides = swiper.slides;
      if (typeof swiper.params === 'undefined' || swiper.destroyed) {
        return null;
      }
      swiper.emit('beforeDestroy');

      // Init Flag
      swiper.initialized = false;

      // Detach events
      swiper.detachEvents();

      // Destroy loop
      if (params.loop) {
        swiper.loopDestroy();
      }

      // Cleanup styles
      if (cleanStyles) {
        swiper.removeClasses();
        el.removeAttribute('style');
        wrapperEl.removeAttribute('style');
        if (slides && slides.length) {
          slides.forEach(function (slideEl) {
            slideEl.classList.remove(params.slideVisibleClass, params.slideActiveClass, params.slideNextClass, params.slidePrevClass);
            slideEl.removeAttribute('style');
            slideEl.removeAttribute('data-swiper-slide-index');
          });
        }
      }
      swiper.emit('destroy');

      // Detach emitter events
      Object.keys(swiper.eventsListeners).forEach(function (eventName) {
        swiper.off(eventName);
      });
      if (deleteInstance !== false) {
        swiper.el.swiper = null;
        (0, _utils.deleteProps)(swiper);
      }
      swiper.destroyed = true;
      return null;
    }
  }], [{
    key: "extendDefaults",
    value: function extendDefaults(newDefaults) {
      (0, _utils.extend)(extendedDefaults, newDefaults);
    }
  }, {
    key: "extendedDefaults",
    get: function get() {
      return extendedDefaults;
    }
  }, {
    key: "defaults",
    get: function get() {
      return _defaults["default"];
    }
  }, {
    key: "installModule",
    value: function installModule(mod) {
      if (!Swiper.prototype.__modules__) Swiper.prototype.__modules__ = [];
      var modules = Swiper.prototype.__modules__;
      if (typeof mod === 'function' && modules.indexOf(mod) < 0) {
        modules.push(mod);
      }
    }
  }, {
    key: "use",
    value: function use(module) {
      if (Array.isArray(module)) {
        module.forEach(function (m) {
          return Swiper.installModule(m);
        });
        return Swiper;
      }
      Swiper.installModule(module);
      return Swiper;
    }
  }]);
  return Swiper;
}();
Object.keys(prototypes).forEach(function (prototypeGroup) {
  Object.keys(prototypes[prototypeGroup]).forEach(function (protoMethod) {
    Swiper.prototype[protoMethod] = prototypes[prototypeGroup][protoMethod];
  });
});
Swiper.use([_resize["default"], _observer["default"]]);
var _default = Swiper;
exports["default"] = _default;

},{"../shared/get-browser.js":98,"../shared/get-device.js":99,"../shared/get-support.js":100,"../shared/process-lazy-preloader.js":101,"../shared/utils.js":102,"./breakpoints/index.js":8,"./check-overflow/index.js":10,"./classes/index.js":12,"./defaults.js":15,"./events-emitter.js":16,"./events/index.js":17,"./grab-cursor/index.js":25,"./loop/index.js":28,"./moduleExtendParams.js":32,"./modules/observer/observer.js":33,"./modules/resize/resize.js":34,"./slide/index.js":35,"./transition/index.js":43,"./translate/index.js":49,"./update/index.js":54,"ssr-window":6}],15:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;
var _default = {
  init: true,
  direction: 'horizontal',
  oneWayMovement: false,
  touchEventsTarget: 'wrapper',
  initialSlide: 0,
  speed: 300,
  cssMode: false,
  updateOnWindowResize: true,
  resizeObserver: true,
  nested: false,
  createElements: false,
  enabled: true,
  focusableElements: 'input, select, option, textarea, button, video, label',
  // Overrides
  width: null,
  height: null,
  //
  preventInteractionOnTransition: false,
  // ssr
  userAgent: null,
  url: null,
  // To support iOS's swipe-to-go-back gesture (when being used in-app).
  edgeSwipeDetection: false,
  edgeSwipeThreshold: 20,
  // Autoheight
  autoHeight: false,
  // Set wrapper width
  setWrapperSize: false,
  // Virtual Translate
  virtualTranslate: false,
  // Effects
  effect: 'slide',
  // 'slide' or 'fade' or 'cube' or 'coverflow' or 'flip'

  // Breakpoints
  breakpoints: undefined,
  breakpointsBase: 'window',
  // Slides grid
  spaceBetween: 0,
  slidesPerView: 1,
  slidesPerGroup: 1,
  slidesPerGroupSkip: 0,
  slidesPerGroupAuto: false,
  centeredSlides: false,
  centeredSlidesBounds: false,
  slidesOffsetBefore: 0,
  // in px
  slidesOffsetAfter: 0,
  // in px
  normalizeSlideIndex: true,
  centerInsufficientSlides: false,
  // Disable swiper and hide navigation when container not overflow
  watchOverflow: true,
  // Round length
  roundLengths: false,
  // Touches
  touchRatio: 1,
  touchAngle: 45,
  simulateTouch: true,
  shortSwipes: true,
  longSwipes: true,
  longSwipesRatio: 0.5,
  longSwipesMs: 300,
  followFinger: true,
  allowTouchMove: true,
  threshold: 5,
  touchMoveStopPropagation: false,
  touchStartPreventDefault: true,
  touchStartForcePreventDefault: false,
  touchReleaseOnEdges: false,
  // Unique Navigation Elements
  uniqueNavElements: true,
  // Resistance
  resistance: true,
  resistanceRatio: 0.85,
  // Progress
  watchSlidesProgress: false,
  // Cursor
  grabCursor: false,
  // Clicks
  preventClicks: true,
  preventClicksPropagation: true,
  slideToClickedSlide: false,
  // loop
  loop: false,
  loopedSlides: null,
  loopPreventsSliding: true,
  // rewind
  rewind: false,
  // Swiping/no swiping
  allowSlidePrev: true,
  allowSlideNext: true,
  swipeHandler: null,
  // '.swipe-handler',
  noSwiping: true,
  noSwipingClass: 'swiper-no-swiping',
  noSwipingSelector: null,
  // Passive Listeners
  passiveListeners: true,
  maxBackfaceHiddenSlides: 10,
  // NS
  containerModifierClass: 'swiper-',
  // NEW
  slideClass: 'swiper-slide',
  slideActiveClass: 'swiper-slide-active',
  slideVisibleClass: 'swiper-slide-visible',
  slideNextClass: 'swiper-slide-next',
  slidePrevClass: 'swiper-slide-prev',
  wrapperClass: 'swiper-wrapper',
  lazyPreloaderClass: 'swiper-lazy-preloader',
  lazyPreloadPrevNext: 0,
  // Callbacks
  runCallbacksOnInit: true,
  // Internals
  _emitClasses: false
};
exports["default"] = _default;

},{}],16:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;
function _toConsumableArray(arr) { return _arrayWithoutHoles(arr) || _iterableToArray(arr) || _unsupportedIterableToArray(arr) || _nonIterableSpread(); }
function _nonIterableSpread() { throw new TypeError("Invalid attempt to spread non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }
function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }
function _iterableToArray(iter) { if (typeof Symbol !== "undefined" && iter[Symbol.iterator] != null || iter["@@iterator"] != null) return Array.from(iter); }
function _arrayWithoutHoles(arr) { if (Array.isArray(arr)) return _arrayLikeToArray(arr); }
function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) arr2[i] = arr[i]; return arr2; }
/* eslint-disable no-underscore-dangle */
var _default = {
  on: function on(events, handler, priority) {
    var self = this;
    if (!self.eventsListeners || self.destroyed) return self;
    if (typeof handler !== 'function') return self;
    var method = priority ? 'unshift' : 'push';
    events.split(' ').forEach(function (event) {
      if (!self.eventsListeners[event]) self.eventsListeners[event] = [];
      self.eventsListeners[event][method](handler);
    });
    return self;
  },
  once: function once(events, handler, priority) {
    var self = this;
    if (!self.eventsListeners || self.destroyed) return self;
    if (typeof handler !== 'function') return self;
    function onceHandler() {
      self.off(events, onceHandler);
      if (onceHandler.__emitterProxy) {
        delete onceHandler.__emitterProxy;
      }
      for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
        args[_key] = arguments[_key];
      }
      handler.apply(self, args);
    }
    onceHandler.__emitterProxy = handler;
    return self.on(events, onceHandler, priority);
  },
  onAny: function onAny(handler, priority) {
    var self = this;
    if (!self.eventsListeners || self.destroyed) return self;
    if (typeof handler !== 'function') return self;
    var method = priority ? 'unshift' : 'push';
    if (self.eventsAnyListeners.indexOf(handler) < 0) {
      self.eventsAnyListeners[method](handler);
    }
    return self;
  },
  offAny: function offAny(handler) {
    var self = this;
    if (!self.eventsListeners || self.destroyed) return self;
    if (!self.eventsAnyListeners) return self;
    var index = self.eventsAnyListeners.indexOf(handler);
    if (index >= 0) {
      self.eventsAnyListeners.splice(index, 1);
    }
    return self;
  },
  off: function off(events, handler) {
    var self = this;
    if (!self.eventsListeners || self.destroyed) return self;
    if (!self.eventsListeners) return self;
    events.split(' ').forEach(function (event) {
      if (typeof handler === 'undefined') {
        self.eventsListeners[event] = [];
      } else if (self.eventsListeners[event]) {
        self.eventsListeners[event].forEach(function (eventHandler, index) {
          if (eventHandler === handler || eventHandler.__emitterProxy && eventHandler.__emitterProxy === handler) {
            self.eventsListeners[event].splice(index, 1);
          }
        });
      }
    });
    return self;
  },
  emit: function emit() {
    var self = this;
    if (!self.eventsListeners || self.destroyed) return self;
    if (!self.eventsListeners) return self;
    var events;
    var data;
    var context;
    for (var _len2 = arguments.length, args = new Array(_len2), _key2 = 0; _key2 < _len2; _key2++) {
      args[_key2] = arguments[_key2];
    }
    if (typeof args[0] === 'string' || Array.isArray(args[0])) {
      events = args[0];
      data = args.slice(1, args.length);
      context = self;
    } else {
      events = args[0].events;
      data = args[0].data;
      context = args[0].context || self;
    }
    data.unshift(context);
    var eventsArray = Array.isArray(events) ? events : events.split(' ');
    eventsArray.forEach(function (event) {
      if (self.eventsAnyListeners && self.eventsAnyListeners.length) {
        self.eventsAnyListeners.forEach(function (eventHandler) {
          eventHandler.apply(context, [event].concat(_toConsumableArray(data)));
        });
      }
      if (self.eventsListeners && self.eventsListeners[event]) {
        self.eventsListeners[event].forEach(function (eventHandler) {
          eventHandler.apply(context, data);
        });
      }
    });
    return self;
  }
};
exports["default"] = _default;

},{}],17:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;
var _ssrWindow = require("ssr-window");
var _onTouchStart = _interopRequireDefault(require("./onTouchStart.js"));
var _onTouchMove = _interopRequireDefault(require("./onTouchMove.js"));
var _onTouchEnd = _interopRequireDefault(require("./onTouchEnd.js"));
var _onResize = _interopRequireDefault(require("./onResize.js"));
var _onClick = _interopRequireDefault(require("./onClick.js"));
var _onScroll = _interopRequireDefault(require("./onScroll.js"));
var _onLoad = _interopRequireDefault(require("./onLoad.js"));
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }
var dummyEventAttached = false;
function dummyEventListener() {}
var events = function events(swiper, method) {
  var document = (0, _ssrWindow.getDocument)();
  var params = swiper.params,
    el = swiper.el,
    wrapperEl = swiper.wrapperEl,
    device = swiper.device;
  var capture = !!params.nested;
  var domMethod = method === 'on' ? 'addEventListener' : 'removeEventListener';
  var swiperMethod = method;

  // Touch Events
  el[domMethod]('pointerdown', swiper.onTouchStart, {
    passive: false
  });
  document[domMethod]('pointermove', swiper.onTouchMove, {
    passive: false,
    capture: capture
  });
  document[domMethod]('pointerup', swiper.onTouchEnd, {
    passive: true
  });
  document[domMethod]('pointercancel', swiper.onTouchEnd, {
    passive: true
  });
  document[domMethod]('pointerout', swiper.onTouchEnd, {
    passive: true
  });
  document[domMethod]('pointerleave', swiper.onTouchEnd, {
    passive: true
  });

  // Prevent Links Clicks
  if (params.preventClicks || params.preventClicksPropagation) {
    el[domMethod]('click', swiper.onClick, true);
  }
  if (params.cssMode) {
    wrapperEl[domMethod]('scroll', swiper.onScroll);
  }

  // Resize handler
  if (params.updateOnWindowResize) {
    swiper[swiperMethod](device.ios || device.android ? 'resize orientationchange observerUpdate' : 'resize observerUpdate', _onResize["default"], true);
  } else {
    swiper[swiperMethod]('observerUpdate', _onResize["default"], true);
  }

  // Images loader
  el[domMethod]('load', swiper.onLoad, {
    capture: true
  });
};
function attachEvents() {
  var swiper = this;
  var document = (0, _ssrWindow.getDocument)();
  var params = swiper.params;
  swiper.onTouchStart = _onTouchStart["default"].bind(swiper);
  swiper.onTouchMove = _onTouchMove["default"].bind(swiper);
  swiper.onTouchEnd = _onTouchEnd["default"].bind(swiper);
  if (params.cssMode) {
    swiper.onScroll = _onScroll["default"].bind(swiper);
  }
  swiper.onClick = _onClick["default"].bind(swiper);
  swiper.onLoad = _onLoad["default"].bind(swiper);
  if (!dummyEventAttached) {
    document.addEventListener('touchstart', dummyEventListener);
    dummyEventAttached = true;
  }
  events(swiper, 'on');
}
function detachEvents() {
  var swiper = this;
  events(swiper, 'off');
}
var _default = {
  attachEvents: attachEvents,
  detachEvents: detachEvents
};
exports["default"] = _default;

},{"./onClick.js":18,"./onLoad.js":19,"./onResize.js":20,"./onScroll.js":21,"./onTouchEnd.js":22,"./onTouchMove.js":23,"./onTouchStart.js":24,"ssr-window":6}],18:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = onClick;
function onClick(e) {
  var swiper = this;
  if (!swiper.enabled) return;
  if (!swiper.allowClick) {
    if (swiper.params.preventClicks) e.preventDefault();
    if (swiper.params.preventClicksPropagation && swiper.animating) {
      e.stopPropagation();
      e.stopImmediatePropagation();
    }
  }
}

},{}],19:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = onLoad;
var _processLazyPreloader = require("../../shared/process-lazy-preloader.js");
function onLoad(e) {
  var swiper = this;
  (0, _processLazyPreloader.processLazyPreloader)(swiper, e.target);
  swiper.update();
}

},{"../../shared/process-lazy-preloader.js":101}],20:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = onResize;
function onResize() {
  var swiper = this;
  var params = swiper.params,
    el = swiper.el;
  if (el && el.offsetWidth === 0) return;

  // Breakpoints
  if (params.breakpoints) {
    swiper.setBreakpoint();
  }

  // Save locks
  var allowSlideNext = swiper.allowSlideNext,
    allowSlidePrev = swiper.allowSlidePrev,
    snapGrid = swiper.snapGrid;
  var isVirtual = swiper.virtual && swiper.params.virtual.enabled;

  // Disable locks on resize
  swiper.allowSlideNext = true;
  swiper.allowSlidePrev = true;
  swiper.updateSize();
  swiper.updateSlides();
  swiper.updateSlidesClasses();
  var isVirtualLoop = isVirtual && params.loop;
  if ((params.slidesPerView === 'auto' || params.slidesPerView > 1) && swiper.isEnd && !swiper.isBeginning && !swiper.params.centeredSlides && !isVirtualLoop) {
    swiper.slideTo(swiper.slides.length - 1, 0, false, true);
  } else {
    if (swiper.params.loop && !isVirtual) {
      swiper.slideToLoop(swiper.realIndex, 0, false, true);
    } else {
      swiper.slideTo(swiper.activeIndex, 0, false, true);
    }
  }
  if (swiper.autoplay && swiper.autoplay.running && swiper.autoplay.paused) {
    clearTimeout(swiper.autoplay.resizeTimeout);
    swiper.autoplay.resizeTimeout = setTimeout(function () {
      if (swiper.autoplay && swiper.autoplay.running && swiper.autoplay.paused) {
        swiper.autoplay.resume();
      }
    }, 500);
  }
  // Return locks after resize
  swiper.allowSlidePrev = allowSlidePrev;
  swiper.allowSlideNext = allowSlideNext;
  if (swiper.params.watchOverflow && snapGrid !== swiper.snapGrid) {
    swiper.checkOverflow();
  }
}

},{}],21:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = onScroll;
function onScroll() {
  var swiper = this;
  var wrapperEl = swiper.wrapperEl,
    rtlTranslate = swiper.rtlTranslate,
    enabled = swiper.enabled;
  if (!enabled) return;
  swiper.previousTranslate = swiper.translate;
  if (swiper.isHorizontal()) {
    swiper.translate = -wrapperEl.scrollLeft;
  } else {
    swiper.translate = -wrapperEl.scrollTop;
  }
  // eslint-disable-next-line
  if (swiper.translate === 0) swiper.translate = 0;
  swiper.updateActiveIndex();
  swiper.updateSlidesClasses();
  var newProgress;
  var translatesDiff = swiper.maxTranslate() - swiper.minTranslate();
  if (translatesDiff === 0) {
    newProgress = 0;
  } else {
    newProgress = (swiper.translate - swiper.minTranslate()) / translatesDiff;
  }
  if (newProgress !== swiper.progress) {
    swiper.updateProgress(rtlTranslate ? -swiper.translate : swiper.translate);
  }
  swiper.emit('setTranslate', swiper.translate, false);
}

},{}],22:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = onTouchEnd;
var _utils = require("../../shared/utils.js");
function onTouchEnd(event) {
  var swiper = this;
  var data = swiper.touchEventsData;
  var pointerIndex = data.evCache.findIndex(function (cachedEv) {
    return cachedEv.pointerId === event.pointerId;
  });
  if (pointerIndex >= 0) {
    data.evCache.splice(pointerIndex, 1);
  }
  if (['pointercancel', 'pointerout', 'pointerleave'].includes(event.type)) {
    var proceed = event.type === 'pointercancel' && (swiper.browser.isSafari || swiper.browser.isWebView);
    if (!proceed) {
      return;
    }
  }
  var params = swiper.params,
    touches = swiper.touches,
    rtl = swiper.rtlTranslate,
    slidesGrid = swiper.slidesGrid,
    enabled = swiper.enabled;
  if (!enabled) return;
  if (!params.simulateTouch && event.pointerType === 'mouse') return;
  var e = event;
  if (e.originalEvent) e = e.originalEvent;
  if (data.allowTouchCallbacks) {
    swiper.emit('touchEnd', e);
  }
  data.allowTouchCallbacks = false;
  if (!data.isTouched) {
    if (data.isMoved && params.grabCursor) {
      swiper.setGrabCursor(false);
    }
    data.isMoved = false;
    data.startMoving = false;
    return;
  }
  // Return Grab Cursor
  if (params.grabCursor && data.isMoved && data.isTouched && (swiper.allowSlideNext === true || swiper.allowSlidePrev === true)) {
    swiper.setGrabCursor(false);
  }

  // Time diff
  var touchEndTime = (0, _utils.now)();
  var timeDiff = touchEndTime - data.touchStartTime;

  // Tap, doubleTap, Click
  if (swiper.allowClick) {
    var pathTree = e.path || e.composedPath && e.composedPath();
    swiper.updateClickedSlide(pathTree && pathTree[0] || e.target);
    swiper.emit('tap click', e);
    if (timeDiff < 300 && touchEndTime - data.lastClickTime < 300) {
      swiper.emit('doubleTap doubleClick', e);
    }
  }
  data.lastClickTime = (0, _utils.now)();
  (0, _utils.nextTick)(function () {
    if (!swiper.destroyed) swiper.allowClick = true;
  });
  if (!data.isTouched || !data.isMoved || !swiper.swipeDirection || touches.diff === 0 || data.currentTranslate === data.startTranslate) {
    data.isTouched = false;
    data.isMoved = false;
    data.startMoving = false;
    return;
  }
  data.isTouched = false;
  data.isMoved = false;
  data.startMoving = false;
  var currentPos;
  if (params.followFinger) {
    currentPos = rtl ? swiper.translate : -swiper.translate;
  } else {
    currentPos = -data.currentTranslate;
  }
  if (params.cssMode) {
    return;
  }
  if (swiper.params.freeMode && params.freeMode.enabled) {
    swiper.freeMode.onTouchEnd({
      currentPos: currentPos
    });
    return;
  }

  // Find current slide
  var stopIndex = 0;
  var groupSize = swiper.slidesSizesGrid[0];
  for (var i = 0; i < slidesGrid.length; i += i < params.slidesPerGroupSkip ? 1 : params.slidesPerGroup) {
    var _increment = i < params.slidesPerGroupSkip - 1 ? 1 : params.slidesPerGroup;
    if (typeof slidesGrid[i + _increment] !== 'undefined') {
      if (currentPos >= slidesGrid[i] && currentPos < slidesGrid[i + _increment]) {
        stopIndex = i;
        groupSize = slidesGrid[i + _increment] - slidesGrid[i];
      }
    } else if (currentPos >= slidesGrid[i]) {
      stopIndex = i;
      groupSize = slidesGrid[slidesGrid.length - 1] - slidesGrid[slidesGrid.length - 2];
    }
  }
  var rewindFirstIndex = null;
  var rewindLastIndex = null;
  if (params.rewind) {
    if (swiper.isBeginning) {
      rewindLastIndex = swiper.params.virtual && swiper.params.virtual.enabled && swiper.virtual ? swiper.virtual.slides.length - 1 : swiper.slides.length - 1;
    } else if (swiper.isEnd) {
      rewindFirstIndex = 0;
    }
  }
  // Find current slide size
  var ratio = (currentPos - slidesGrid[stopIndex]) / groupSize;
  var increment = stopIndex < params.slidesPerGroupSkip - 1 ? 1 : params.slidesPerGroup;
  if (timeDiff > params.longSwipesMs) {
    // Long touches
    if (!params.longSwipes) {
      swiper.slideTo(swiper.activeIndex);
      return;
    }
    if (swiper.swipeDirection === 'next') {
      if (ratio >= params.longSwipesRatio) swiper.slideTo(params.rewind && swiper.isEnd ? rewindFirstIndex : stopIndex + increment);else swiper.slideTo(stopIndex);
    }
    if (swiper.swipeDirection === 'prev') {
      if (ratio > 1 - params.longSwipesRatio) {
        swiper.slideTo(stopIndex + increment);
      } else if (rewindLastIndex !== null && ratio < 0 && Math.abs(ratio) > params.longSwipesRatio) {
        swiper.slideTo(rewindLastIndex);
      } else {
        swiper.slideTo(stopIndex);
      }
    }
  } else {
    // Short swipes
    if (!params.shortSwipes) {
      swiper.slideTo(swiper.activeIndex);
      return;
    }
    var isNavButtonTarget = swiper.navigation && (e.target === swiper.navigation.nextEl || e.target === swiper.navigation.prevEl);
    if (!isNavButtonTarget) {
      if (swiper.swipeDirection === 'next') {
        swiper.slideTo(rewindFirstIndex !== null ? rewindFirstIndex : stopIndex + increment);
      }
      if (swiper.swipeDirection === 'prev') {
        swiper.slideTo(rewindLastIndex !== null ? rewindLastIndex : stopIndex);
      }
    } else if (e.target === swiper.navigation.nextEl) {
      swiper.slideTo(stopIndex + increment);
    } else {
      swiper.slideTo(stopIndex);
    }
  }
}

},{"../../shared/utils.js":102}],23:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = onTouchMove;
var _ssrWindow = require("ssr-window");
var _utils = require("../../shared/utils.js");
function onTouchMove(event) {
  var document = (0, _ssrWindow.getDocument)();
  var swiper = this;
  var data = swiper.touchEventsData;
  var params = swiper.params,
    touches = swiper.touches,
    rtl = swiper.rtlTranslate,
    enabled = swiper.enabled;
  if (!enabled) return;
  if (!params.simulateTouch && event.pointerType === 'mouse') return;
  var e = event;
  if (e.originalEvent) e = e.originalEvent;
  if (!data.isTouched) {
    if (data.startMoving && data.isScrolling) {
      swiper.emit('touchMoveOpposite', e);
    }
    return;
  }
  var pointerIndex = data.evCache.findIndex(function (cachedEv) {
    return cachedEv.pointerId === e.pointerId;
  });
  if (pointerIndex >= 0) data.evCache[pointerIndex] = e;
  var targetTouch = data.evCache.length > 1 ? data.evCache[0] : e;
  var pageX = targetTouch.pageX;
  var pageY = targetTouch.pageY;
  if (e.preventedByNestedSwiper) {
    touches.startX = pageX;
    touches.startY = pageY;
    return;
  }
  if (!swiper.allowTouchMove) {
    if (!e.target.matches(data.focusableElements)) {
      swiper.allowClick = false;
    }
    if (data.isTouched) {
      Object.assign(touches, {
        startX: pageX,
        startY: pageY,
        prevX: swiper.touches.currentX,
        prevY: swiper.touches.currentY,
        currentX: pageX,
        currentY: pageY
      });
      data.touchStartTime = (0, _utils.now)();
    }
    return;
  }
  if (params.touchReleaseOnEdges && !params.loop) {
    if (swiper.isVertical()) {
      // Vertical
      if (pageY < touches.startY && swiper.translate <= swiper.maxTranslate() || pageY > touches.startY && swiper.translate >= swiper.minTranslate()) {
        data.isTouched = false;
        data.isMoved = false;
        return;
      }
    } else if (pageX < touches.startX && swiper.translate <= swiper.maxTranslate() || pageX > touches.startX && swiper.translate >= swiper.minTranslate()) {
      return;
    }
  }
  if (document.activeElement) {
    if (e.target === document.activeElement && e.target.matches(data.focusableElements)) {
      data.isMoved = true;
      swiper.allowClick = false;
      return;
    }
  }
  if (data.allowTouchCallbacks) {
    swiper.emit('touchMove', e);
  }
  if (e.targetTouches && e.targetTouches.length > 1) return;
  touches.currentX = pageX;
  touches.currentY = pageY;
  var diffX = touches.currentX - touches.startX;
  var diffY = touches.currentY - touches.startY;
  if (swiper.params.threshold && Math.sqrt(Math.pow(diffX, 2) + Math.pow(diffY, 2)) < swiper.params.threshold) return;
  if (typeof data.isScrolling === 'undefined') {
    var touchAngle;
    if (swiper.isHorizontal() && touches.currentY === touches.startY || swiper.isVertical() && touches.currentX === touches.startX) {
      data.isScrolling = false;
    } else {
      // eslint-disable-next-line
      if (diffX * diffX + diffY * diffY >= 25) {
        touchAngle = Math.atan2(Math.abs(diffY), Math.abs(diffX)) * 180 / Math.PI;
        data.isScrolling = swiper.isHorizontal() ? touchAngle > params.touchAngle : 90 - touchAngle > params.touchAngle;
      }
    }
  }
  if (data.isScrolling) {
    swiper.emit('touchMoveOpposite', e);
  }
  if (typeof data.startMoving === 'undefined') {
    if (touches.currentX !== touches.startX || touches.currentY !== touches.startY) {
      data.startMoving = true;
    }
  }
  if (data.isScrolling || swiper.zoom && swiper.params.zoom && swiper.params.zoom.enabled && data.evCache.length > 1) {
    data.isTouched = false;
    return;
  }
  if (!data.startMoving) {
    return;
  }
  swiper.allowClick = false;
  if (!params.cssMode && e.cancelable) {
    e.preventDefault();
  }
  if (params.touchMoveStopPropagation && !params.nested) {
    e.stopPropagation();
  }
  var diff = swiper.isHorizontal() ? diffX : diffY;
  var touchesDiff = swiper.isHorizontal() ? touches.currentX - touches.previousX : touches.currentY - touches.previousY;
  if (params.oneWayMovement) {
    diff = Math.abs(diff) * (rtl ? 1 : -1);
    touchesDiff = Math.abs(touchesDiff) * (rtl ? 1 : -1);
  }
  touches.diff = diff;
  diff *= params.touchRatio;
  if (rtl) {
    diff = -diff;
    touchesDiff = -touchesDiff;
  }
  var prevTouchesDirection = swiper.touchesDirection;
  swiper.swipeDirection = diff > 0 ? 'prev' : 'next';
  swiper.touchesDirection = touchesDiff > 0 ? 'prev' : 'next';
  var isLoop = swiper.params.loop && !params.cssMode;
  if (!data.isMoved) {
    if (isLoop) {
      swiper.loopFix({
        direction: swiper.swipeDirection
      });
    }
    data.startTranslate = swiper.getTranslate();
    swiper.setTransition(0);
    if (swiper.animating) {
      var evt = new window.CustomEvent('transitionend', {
        bubbles: true,
        cancelable: true
      });
      swiper.wrapperEl.dispatchEvent(evt);
    }
    data.allowMomentumBounce = false;
    // Grab Cursor
    if (params.grabCursor && (swiper.allowSlideNext === true || swiper.allowSlidePrev === true)) {
      swiper.setGrabCursor(true);
    }
    swiper.emit('sliderFirstMove', e);
  }
  var loopFixed;
  if (data.isMoved && prevTouchesDirection !== swiper.touchesDirection && isLoop && Math.abs(diff) >= 1) {
    // need another loop fix
    swiper.loopFix({
      direction: swiper.swipeDirection,
      setTranslate: true
    });
    loopFixed = true;
  }
  swiper.emit('sliderMove', e);
  data.isMoved = true;
  data.currentTranslate = diff + data.startTranslate;
  var disableParentSwiper = true;
  var resistanceRatio = params.resistanceRatio;
  if (params.touchReleaseOnEdges) {
    resistanceRatio = 0;
  }
  if (diff > 0) {
    if (isLoop && !loopFixed && data.currentTranslate > (params.centeredSlides ? swiper.minTranslate() - swiper.size / 2 : swiper.minTranslate())) {
      swiper.loopFix({
        direction: 'prev',
        setTranslate: true,
        activeSlideIndex: 0
      });
    }
    if (data.currentTranslate > swiper.minTranslate()) {
      disableParentSwiper = false;
      if (params.resistance) {
        data.currentTranslate = swiper.minTranslate() - 1 + Math.pow(-swiper.minTranslate() + data.startTranslate + diff, resistanceRatio);
      }
    }
  } else if (diff < 0) {
    if (isLoop && !loopFixed && data.currentTranslate < (params.centeredSlides ? swiper.maxTranslate() + swiper.size / 2 : swiper.maxTranslate())) {
      swiper.loopFix({
        direction: 'next',
        setTranslate: true,
        activeSlideIndex: swiper.slides.length - (params.slidesPerView === 'auto' ? swiper.slidesPerViewDynamic() : Math.ceil(parseFloat(params.slidesPerView, 10)))
      });
    }
    if (data.currentTranslate < swiper.maxTranslate()) {
      disableParentSwiper = false;
      if (params.resistance) {
        data.currentTranslate = swiper.maxTranslate() + 1 - Math.pow(swiper.maxTranslate() - data.startTranslate - diff, resistanceRatio);
      }
    }
  }
  if (disableParentSwiper) {
    e.preventedByNestedSwiper = true;
  }

  // Directions locks
  if (!swiper.allowSlideNext && swiper.swipeDirection === 'next' && data.currentTranslate < data.startTranslate) {
    data.currentTranslate = data.startTranslate;
  }
  if (!swiper.allowSlidePrev && swiper.swipeDirection === 'prev' && data.currentTranslate > data.startTranslate) {
    data.currentTranslate = data.startTranslate;
  }
  if (!swiper.allowSlidePrev && !swiper.allowSlideNext) {
    data.currentTranslate = data.startTranslate;
  }

  // Threshold
  if (params.threshold > 0) {
    if (Math.abs(diff) > params.threshold || data.allowThresholdMove) {
      if (!data.allowThresholdMove) {
        data.allowThresholdMove = true;
        touches.startX = touches.currentX;
        touches.startY = touches.currentY;
        data.currentTranslate = data.startTranslate;
        touches.diff = swiper.isHorizontal() ? touches.currentX - touches.startX : touches.currentY - touches.startY;
        return;
      }
    } else {
      data.currentTranslate = data.startTranslate;
      return;
    }
  }
  if (!params.followFinger || params.cssMode) return;

  // Update active index in free mode
  if (params.freeMode && params.freeMode.enabled && swiper.freeMode || params.watchSlidesProgress) {
    swiper.updateActiveIndex();
    swiper.updateSlidesClasses();
  }
  if (swiper.params.freeMode && params.freeMode.enabled && swiper.freeMode) {
    swiper.freeMode.onTouchMove();
  }
  // Update progress
  swiper.updateProgress(data.currentTranslate);
  // Update translate
  swiper.setTranslate(data.currentTranslate);
}

},{"../../shared/utils.js":102,"ssr-window":6}],24:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = onTouchStart;
var _ssrWindow = require("ssr-window");
var _utils = require("../../shared/utils.js");
// Modified from https://stackoverflow.com/questions/54520554/custom-element-getrootnode-closest-function-crossing-multiple-parent-shadowd
function closestElement(selector) {
  var base = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : this;
  function __closestFrom(el) {
    if (!el || el === (0, _ssrWindow.getDocument)() || el === (0, _ssrWindow.getWindow)()) return null;
    if (el.assignedSlot) el = el.assignedSlot;
    var found = el.closest(selector);
    if (!found && !el.getRootNode) {
      return null;
    }
    return found || __closestFrom(el.getRootNode().host);
  }
  return __closestFrom(base);
}
function onTouchStart(event) {
  var swiper = this;
  var document = (0, _ssrWindow.getDocument)();
  var window = (0, _ssrWindow.getWindow)();
  var data = swiper.touchEventsData;
  data.evCache.push(event);
  var params = swiper.params,
    touches = swiper.touches,
    enabled = swiper.enabled;
  if (!enabled) return;
  if (!params.simulateTouch && event.pointerType === 'mouse') return;
  if (swiper.animating && params.preventInteractionOnTransition) {
    return;
  }
  if (!swiper.animating && params.cssMode && params.loop) {
    swiper.loopFix();
  }
  var e = event;
  if (e.originalEvent) e = e.originalEvent;
  var targetEl = e.target;
  if (params.touchEventsTarget === 'wrapper') {
    if (!swiper.wrapperEl.contains(targetEl)) return;
  }
  if ('which' in e && e.which === 3) return;
  if ('button' in e && e.button > 0) return;
  if (data.isTouched && data.isMoved) return;

  // change target el for shadow root component
  var swipingClassHasValue = !!params.noSwipingClass && params.noSwipingClass !== '';
  // eslint-disable-next-line
  var eventPath = event.composedPath ? event.composedPath() : event.path;
  if (swipingClassHasValue && e.target && e.target.shadowRoot && eventPath) {
    targetEl = eventPath[0];
  }
  var noSwipingSelector = params.noSwipingSelector ? params.noSwipingSelector : ".".concat(params.noSwipingClass);
  var isTargetShadow = !!(e.target && e.target.shadowRoot);

  // use closestElement for shadow root element to get the actual closest for nested shadow root element
  if (params.noSwiping && (isTargetShadow ? closestElement(noSwipingSelector, targetEl) : targetEl.closest(noSwipingSelector))) {
    swiper.allowClick = true;
    return;
  }
  if (params.swipeHandler) {
    if (!targetEl.closest(params.swipeHandler)) return;
  }
  touches.currentX = e.pageX;
  touches.currentY = e.pageY;
  var startX = touches.currentX;
  var startY = touches.currentY;

  // Do NOT start if iOS edge swipe is detected. Otherwise iOS app cannot swipe-to-go-back anymore

  var edgeSwipeDetection = params.edgeSwipeDetection || params.iOSEdgeSwipeDetection;
  var edgeSwipeThreshold = params.edgeSwipeThreshold || params.iOSEdgeSwipeThreshold;
  if (edgeSwipeDetection && (startX <= edgeSwipeThreshold || startX >= window.innerWidth - edgeSwipeThreshold)) {
    if (edgeSwipeDetection === 'prevent') {
      event.preventDefault();
    } else {
      return;
    }
  }
  Object.assign(data, {
    isTouched: true,
    isMoved: false,
    allowTouchCallbacks: true,
    isScrolling: undefined,
    startMoving: undefined
  });
  touches.startX = startX;
  touches.startY = startY;
  data.touchStartTime = (0, _utils.now)();
  swiper.allowClick = true;
  swiper.updateSize();
  swiper.swipeDirection = undefined;
  if (params.threshold > 0) data.allowThresholdMove = false;
  var preventDefault = true;
  if (targetEl.matches(data.focusableElements)) {
    preventDefault = false;
    if (targetEl.nodeName === 'SELECT') {
      data.isTouched = false;
    }
  }
  if (document.activeElement && document.activeElement.matches(data.focusableElements) && document.activeElement !== targetEl) {
    document.activeElement.blur();
  }
  var shouldPreventDefault = preventDefault && swiper.allowTouchMove && params.touchStartPreventDefault;
  if ((params.touchStartForcePreventDefault || shouldPreventDefault) && !targetEl.isContentEditable) {
    e.preventDefault();
  }
  if (swiper.params.freeMode && swiper.params.freeMode.enabled && swiper.freeMode && swiper.animating && !params.cssMode) {
    swiper.freeMode.onTouchStart();
  }
  swiper.emit('touchStart', e);
}

},{"../../shared/utils.js":102,"ssr-window":6}],25:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;
var _setGrabCursor = _interopRequireDefault(require("./setGrabCursor.js"));
var _unsetGrabCursor = _interopRequireDefault(require("./unsetGrabCursor.js"));
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }
var _default = {
  setGrabCursor: _setGrabCursor["default"],
  unsetGrabCursor: _unsetGrabCursor["default"]
};
exports["default"] = _default;

},{"./setGrabCursor.js":26,"./unsetGrabCursor.js":27}],26:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = setGrabCursor;
function setGrabCursor(moving) {
  var swiper = this;
  if (!swiper.params.simulateTouch || swiper.params.watchOverflow && swiper.isLocked || swiper.params.cssMode) return;
  var el = swiper.params.touchEventsTarget === 'container' ? swiper.el : swiper.wrapperEl;
  if (swiper.isElement) {
    swiper.__preventObserver__ = true;
  }
  el.style.cursor = 'move';
  el.style.cursor = moving ? 'grabbing' : 'grab';
  if (swiper.isElement) {
    requestAnimationFrame(function () {
      swiper.__preventObserver__ = false;
    });
  }
}

},{}],27:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = unsetGrabCursor;
function unsetGrabCursor() {
  var swiper = this;
  if (swiper.params.watchOverflow && swiper.isLocked || swiper.params.cssMode) {
    return;
  }
  if (swiper.isElement) {
    swiper.__preventObserver__ = true;
  }
  swiper[swiper.params.touchEventsTarget === 'container' ? 'el' : 'wrapperEl'].style.cursor = '';
  if (swiper.isElement) {
    requestAnimationFrame(function () {
      swiper.__preventObserver__ = false;
    });
  }
}

},{}],28:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;
var _loopCreate = _interopRequireDefault(require("./loopCreate.js"));
var _loopFix = _interopRequireDefault(require("./loopFix.js"));
var _loopDestroy = _interopRequireDefault(require("./loopDestroy.js"));
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }
var _default = {
  loopCreate: _loopCreate["default"],
  loopFix: _loopFix["default"],
  loopDestroy: _loopDestroy["default"]
};
exports["default"] = _default;

},{"./loopCreate.js":29,"./loopDestroy.js":30,"./loopFix.js":31}],29:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = loopCreate;
var _utils = require("../../shared/utils.js");
function loopCreate(slideRealIndex) {
  var swiper = this;
  var params = swiper.params,
    slidesEl = swiper.slidesEl;
  if (!params.loop || swiper.virtual && swiper.params.virtual.enabled) return;
  var slides = (0, _utils.elementChildren)(slidesEl, ".".concat(params.slideClass, ", swiper-slide"));
  slides.forEach(function (el, index) {
    el.setAttribute('data-swiper-slide-index', index);
  });
  swiper.loopFix({
    slideRealIndex: slideRealIndex,
    direction: params.centeredSlides ? undefined : 'next'
  });
}

},{"../../shared/utils.js":102}],30:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = loopDestroy;
function loopDestroy() {
  var swiper = this;
  var params = swiper.params,
    slidesEl = swiper.slidesEl;
  if (!params.loop || swiper.virtual && swiper.params.virtual.enabled) return;
  swiper.recalcSlides();
  var newSlidesOrder = [];
  swiper.slides.forEach(function (slideEl) {
    var index = typeof slideEl.swiperSlideIndex === 'undefined' ? slideEl.getAttribute('data-swiper-slide-index') * 1 : slideEl.swiperSlideIndex;
    newSlidesOrder[index] = slideEl;
  });
  swiper.slides.forEach(function (slideEl) {
    slideEl.removeAttribute('data-swiper-slide-index');
  });
  newSlidesOrder.forEach(function (slideEl) {
    slidesEl.append(slideEl);
  });
  swiper.recalcSlides();
  swiper.slideTo(swiper.realIndex, 0);
}

},{}],31:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = loopFix;
function loopFix() {
  var _ref = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {},
    slideRealIndex = _ref.slideRealIndex,
    _ref$slideTo = _ref.slideTo,
    slideTo = _ref$slideTo === void 0 ? true : _ref$slideTo,
    direction = _ref.direction,
    setTranslate = _ref.setTranslate,
    activeSlideIndex = _ref.activeSlideIndex,
    byController = _ref.byController,
    byMousewheel = _ref.byMousewheel;
  var swiper = this;
  if (!swiper.params.loop) return;
  swiper.emit('beforeLoopFix');
  var slides = swiper.slides,
    allowSlidePrev = swiper.allowSlidePrev,
    allowSlideNext = swiper.allowSlideNext,
    slidesEl = swiper.slidesEl,
    params = swiper.params;
  swiper.allowSlidePrev = true;
  swiper.allowSlideNext = true;
  if (swiper.virtual && params.virtual.enabled) {
    if (slideTo) {
      if (!params.centeredSlides && swiper.snapIndex === 0) {
        swiper.slideTo(swiper.virtual.slides.length, 0, false, true);
      } else if (params.centeredSlides && swiper.snapIndex < params.slidesPerView) {
        swiper.slideTo(swiper.virtual.slides.length + swiper.snapIndex, 0, false, true);
      } else if (swiper.snapIndex === swiper.snapGrid.length - 1) {
        swiper.slideTo(swiper.virtual.slidesBefore, 0, false, true);
      }
    }
    swiper.allowSlidePrev = allowSlidePrev;
    swiper.allowSlideNext = allowSlideNext;
    swiper.emit('loopFix');
    return;
  }
  var slidesPerView = params.slidesPerView === 'auto' ? swiper.slidesPerViewDynamic() : Math.ceil(parseFloat(params.slidesPerView, 10));
  var loopedSlides = params.loopedSlides || slidesPerView;
  if (loopedSlides % params.slidesPerGroup !== 0) {
    loopedSlides += params.slidesPerGroup - loopedSlides % params.slidesPerGroup;
  }
  swiper.loopedSlides = loopedSlides;
  var prependSlidesIndexes = [];
  var appendSlidesIndexes = [];
  var activeIndex = swiper.activeIndex;
  if (typeof activeSlideIndex === 'undefined') {
    activeSlideIndex = swiper.getSlideIndex(swiper.slides.filter(function (el) {
      return el.classList.contains(params.slideActiveClass);
    })[0]);
  } else {
    activeIndex = activeSlideIndex;
  }
  var isNext = direction === 'next' || !direction;
  var isPrev = direction === 'prev' || !direction;
  var slidesPrepended = 0;
  var slidesAppended = 0;
  // prepend last slides before start
  if (activeSlideIndex < loopedSlides) {
    slidesPrepended = Math.max(loopedSlides - activeSlideIndex, params.slidesPerGroup);
    for (var i = 0; i < loopedSlides - activeSlideIndex; i += 1) {
      var index = i - Math.floor(i / slides.length) * slides.length;
      prependSlidesIndexes.push(slides.length - index - 1);
    }
  } else if (activeSlideIndex /* + slidesPerView */ > swiper.slides.length - loopedSlides * 2) {
    slidesAppended = Math.max(activeSlideIndex - (swiper.slides.length - loopedSlides * 2), params.slidesPerGroup);
    for (var _i = 0; _i < slidesAppended; _i += 1) {
      var _index = _i - Math.floor(_i / slides.length) * slides.length;
      appendSlidesIndexes.push(_index);
    }
  }
  if (isPrev) {
    prependSlidesIndexes.forEach(function (index) {
      slidesEl.prepend(swiper.slides[index]);
    });
  }
  if (isNext) {
    appendSlidesIndexes.forEach(function (index) {
      slidesEl.append(swiper.slides[index]);
    });
  }
  swiper.recalcSlides();
  if (params.slidesPerView === 'auto') {
    swiper.updateSlides();
  }
  if (params.watchSlidesProgress) {
    swiper.updateSlidesOffset();
  }
  if (slideTo) {
    if (prependSlidesIndexes.length > 0 && isPrev) {
      if (typeof slideRealIndex === 'undefined') {
        var currentSlideTranslate = swiper.slidesGrid[activeIndex];
        var newSlideTranslate = swiper.slidesGrid[activeIndex + slidesPrepended];
        var diff = newSlideTranslate - currentSlideTranslate;
        if (byMousewheel) {
          swiper.setTranslate(swiper.translate - diff);
        } else {
          swiper.slideTo(activeIndex + slidesPrepended, 0, false, true);
          if (setTranslate) {
            swiper.touches[swiper.isHorizontal() ? 'startX' : 'startY'] += diff;
          }
        }
      } else {
        if (setTranslate) {
          swiper.slideToLoop(slideRealIndex, 0, false, true);
        }
      }
    } else if (appendSlidesIndexes.length > 0 && isNext) {
      if (typeof slideRealIndex === 'undefined') {
        var _currentSlideTranslate = swiper.slidesGrid[activeIndex];
        var _newSlideTranslate = swiper.slidesGrid[activeIndex - slidesAppended];
        var _diff = _newSlideTranslate - _currentSlideTranslate;
        if (byMousewheel) {
          swiper.setTranslate(swiper.translate - _diff);
        } else {
          swiper.slideTo(activeIndex - slidesAppended, 0, false, true);
          if (setTranslate) {
            swiper.touches[swiper.isHorizontal() ? 'startX' : 'startY'] += _diff;
          }
        }
      } else {
        swiper.slideToLoop(slideRealIndex, 0, false, true);
      }
    }
  }
  swiper.allowSlidePrev = allowSlidePrev;
  swiper.allowSlideNext = allowSlideNext;
  if (swiper.controller && swiper.controller.control && !byController) {
    var loopParams = {
      slideRealIndex: slideRealIndex,
      slideTo: false,
      direction: direction,
      setTranslate: setTranslate,
      activeSlideIndex: activeSlideIndex,
      byController: true
    };
    if (Array.isArray(swiper.controller.control)) {
      swiper.controller.control.forEach(function (c) {
        if (!c.destroyed && c.params.loop) c.loopFix(loopParams);
      });
    } else if (swiper.controller.control instanceof swiper.constructor && swiper.controller.control.params.loop) {
      swiper.controller.control.loopFix(loopParams);
    }
  }
  swiper.emit('loopFix');
}

},{}],32:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = moduleExtendParams;
var _utils = require("../shared/utils.js");
function _typeof(obj) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (obj) { return typeof obj; } : function (obj) { return obj && "function" == typeof Symbol && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }, _typeof(obj); }
function moduleExtendParams(params, allModulesParams) {
  return function extendParams() {
    var obj = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
    var moduleParamName = Object.keys(obj)[0];
    var moduleParams = obj[moduleParamName];
    if (_typeof(moduleParams) !== 'object' || moduleParams === null) {
      (0, _utils.extend)(allModulesParams, obj);
      return;
    }
    if (['navigation', 'pagination', 'scrollbar'].indexOf(moduleParamName) >= 0 && params[moduleParamName] === true) {
      params[moduleParamName] = {
        auto: true
      };
    }
    if (!(moduleParamName in params && 'enabled' in moduleParams)) {
      (0, _utils.extend)(allModulesParams, obj);
      return;
    }
    if (params[moduleParamName] === true) {
      params[moduleParamName] = {
        enabled: true
      };
    }
    if (_typeof(params[moduleParamName]) === 'object' && !('enabled' in params[moduleParamName])) {
      params[moduleParamName].enabled = true;
    }
    if (!params[moduleParamName]) params[moduleParamName] = {
      enabled: false
    };
    (0, _utils.extend)(allModulesParams, obj);
  };
}

},{"../shared/utils.js":102}],33:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = Observer;
var _ssrWindow = require("ssr-window");
var _utils = require("../../../shared/utils.js");
function Observer(_ref) {
  var swiper = _ref.swiper,
    extendParams = _ref.extendParams,
    on = _ref.on,
    emit = _ref.emit;
  var observers = [];
  var window = (0, _ssrWindow.getWindow)();
  var attach = function attach(target) {
    var options = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};
    var ObserverFunc = window.MutationObserver || window.WebkitMutationObserver;
    var observer = new ObserverFunc(function (mutations) {
      // The observerUpdate event should only be triggered
      // once despite the number of mutations.  Additional
      // triggers are redundant and are very costly
      if (swiper.__preventObserver__) return;
      if (mutations.length === 1) {
        emit('observerUpdate', mutations[0]);
        return;
      }
      var observerUpdate = function observerUpdate() {
        emit('observerUpdate', mutations[0]);
      };
      if (window.requestAnimationFrame) {
        window.requestAnimationFrame(observerUpdate);
      } else {
        window.setTimeout(observerUpdate, 0);
      }
    });
    observer.observe(target, {
      attributes: typeof options.attributes === 'undefined' ? true : options.attributes,
      childList: typeof options.childList === 'undefined' ? true : options.childList,
      characterData: typeof options.characterData === 'undefined' ? true : options.characterData
    });
    observers.push(observer);
  };
  var init = function init() {
    if (!swiper.params.observer) return;
    if (swiper.params.observeParents) {
      var containerParents = (0, _utils.elementParents)(swiper.el);
      for (var i = 0; i < containerParents.length; i += 1) {
        attach(containerParents[i]);
      }
    }
    // Observe container
    attach(swiper.el, {
      childList: swiper.params.observeSlideChildren
    });

    // Observe wrapper
    attach(swiper.wrapperEl, {
      attributes: false
    });
  };
  var destroy = function destroy() {
    observers.forEach(function (observer) {
      observer.disconnect();
    });
    observers.splice(0, observers.length);
  };
  extendParams({
    observer: false,
    observeParents: false,
    observeSlideChildren: false
  });
  on('init', init);
  on('destroy', destroy);
}

},{"../../../shared/utils.js":102,"ssr-window":6}],34:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = Resize;
var _ssrWindow = require("ssr-window");
function Resize(_ref) {
  var swiper = _ref.swiper,
    on = _ref.on,
    emit = _ref.emit;
  var window = (0, _ssrWindow.getWindow)();
  var observer = null;
  var animationFrame = null;
  var resizeHandler = function resizeHandler() {
    if (!swiper || swiper.destroyed || !swiper.initialized) return;
    emit('beforeResize');
    emit('resize');
  };
  var createObserver = function createObserver() {
    if (!swiper || swiper.destroyed || !swiper.initialized) return;
    observer = new ResizeObserver(function (entries) {
      animationFrame = window.requestAnimationFrame(function () {
        var width = swiper.width,
          height = swiper.height;
        var newWidth = width;
        var newHeight = height;
        entries.forEach(function (_ref2) {
          var contentBoxSize = _ref2.contentBoxSize,
            contentRect = _ref2.contentRect,
            target = _ref2.target;
          if (target && target !== swiper.el) return;
          newWidth = contentRect ? contentRect.width : (contentBoxSize[0] || contentBoxSize).inlineSize;
          newHeight = contentRect ? contentRect.height : (contentBoxSize[0] || contentBoxSize).blockSize;
        });
        if (newWidth !== width || newHeight !== height) {
          resizeHandler();
        }
      });
    });
    observer.observe(swiper.el);
  };
  var removeObserver = function removeObserver() {
    if (animationFrame) {
      window.cancelAnimationFrame(animationFrame);
    }
    if (observer && observer.unobserve && swiper.el) {
      observer.unobserve(swiper.el);
      observer = null;
    }
  };
  var orientationChangeHandler = function orientationChangeHandler() {
    if (!swiper || swiper.destroyed || !swiper.initialized) return;
    emit('orientationchange');
  };
  on('init', function () {
    if (swiper.params.resizeObserver && typeof window.ResizeObserver !== 'undefined') {
      createObserver();
      return;
    }
    window.addEventListener('resize', resizeHandler);
    window.addEventListener('orientationchange', orientationChangeHandler);
  });
  on('destroy', function () {
    removeObserver();
    window.removeEventListener('resize', resizeHandler);
    window.removeEventListener('orientationchange', orientationChangeHandler);
  });
}

},{"ssr-window":6}],35:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;
var _slideTo = _interopRequireDefault(require("./slideTo.js"));
var _slideToLoop = _interopRequireDefault(require("./slideToLoop.js"));
var _slideNext = _interopRequireDefault(require("./slideNext.js"));
var _slidePrev = _interopRequireDefault(require("./slidePrev.js"));
var _slideReset = _interopRequireDefault(require("./slideReset.js"));
var _slideToClosest = _interopRequireDefault(require("./slideToClosest.js"));
var _slideToClickedSlide = _interopRequireDefault(require("./slideToClickedSlide.js"));
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }
var _default = {
  slideTo: _slideTo["default"],
  slideToLoop: _slideToLoop["default"],
  slideNext: _slideNext["default"],
  slidePrev: _slidePrev["default"],
  slideReset: _slideReset["default"],
  slideToClosest: _slideToClosest["default"],
  slideToClickedSlide: _slideToClickedSlide["default"]
};
exports["default"] = _default;

},{"./slideNext.js":36,"./slidePrev.js":37,"./slideReset.js":38,"./slideTo.js":39,"./slideToClickedSlide.js":40,"./slideToClosest.js":41,"./slideToLoop.js":42}],36:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = slideNext;
/* eslint no-unused-vars: "off" */
function slideNext() {
  var speed = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : this.params.speed;
  var runCallbacks = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : true;
  var internal = arguments.length > 2 ? arguments[2] : undefined;
  var swiper = this;
  var enabled = swiper.enabled,
    params = swiper.params,
    animating = swiper.animating;
  if (!enabled) return swiper;
  var perGroup = params.slidesPerGroup;
  if (params.slidesPerView === 'auto' && params.slidesPerGroup === 1 && params.slidesPerGroupAuto) {
    perGroup = Math.max(swiper.slidesPerViewDynamic('current', true), 1);
  }
  var increment = swiper.activeIndex < params.slidesPerGroupSkip ? 1 : perGroup;
  var isVirtual = swiper.virtual && params.virtual.enabled;
  if (params.loop) {
    if (animating && !isVirtual && params.loopPreventsSliding) return false;
    swiper.loopFix({
      direction: 'next'
    });
    // eslint-disable-next-line
    swiper._clientLeft = swiper.wrapperEl.clientLeft;
  }
  if (params.rewind && swiper.isEnd) {
    return swiper.slideTo(0, speed, runCallbacks, internal);
  }
  return swiper.slideTo(swiper.activeIndex + increment, speed, runCallbacks, internal);
}

},{}],37:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = slidePrev;
/* eslint no-unused-vars: "off" */
function slidePrev() {
  var speed = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : this.params.speed;
  var runCallbacks = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : true;
  var internal = arguments.length > 2 ? arguments[2] : undefined;
  var swiper = this;
  var params = swiper.params,
    snapGrid = swiper.snapGrid,
    slidesGrid = swiper.slidesGrid,
    rtlTranslate = swiper.rtlTranslate,
    enabled = swiper.enabled,
    animating = swiper.animating;
  if (!enabled) return swiper;
  var isVirtual = swiper.virtual && params.virtual.enabled;
  if (params.loop) {
    if (animating && !isVirtual && params.loopPreventsSliding) return false;
    swiper.loopFix({
      direction: 'prev'
    });
    // eslint-disable-next-line
    swiper._clientLeft = swiper.wrapperEl.clientLeft;
  }
  var translate = rtlTranslate ? swiper.translate : -swiper.translate;
  function normalize(val) {
    if (val < 0) return -Math.floor(Math.abs(val));
    return Math.floor(val);
  }
  var normalizedTranslate = normalize(translate);
  var normalizedSnapGrid = snapGrid.map(function (val) {
    return normalize(val);
  });
  var prevSnap = snapGrid[normalizedSnapGrid.indexOf(normalizedTranslate) - 1];
  if (typeof prevSnap === 'undefined' && params.cssMode) {
    var prevSnapIndex;
    snapGrid.forEach(function (snap, snapIndex) {
      if (normalizedTranslate >= snap) {
        // prevSnap = snap;
        prevSnapIndex = snapIndex;
      }
    });
    if (typeof prevSnapIndex !== 'undefined') {
      prevSnap = snapGrid[prevSnapIndex > 0 ? prevSnapIndex - 1 : prevSnapIndex];
    }
  }
  var prevIndex = 0;
  if (typeof prevSnap !== 'undefined') {
    prevIndex = slidesGrid.indexOf(prevSnap);
    if (prevIndex < 0) prevIndex = swiper.activeIndex - 1;
    if (params.slidesPerView === 'auto' && params.slidesPerGroup === 1 && params.slidesPerGroupAuto) {
      prevIndex = prevIndex - swiper.slidesPerViewDynamic('previous', true) + 1;
      prevIndex = Math.max(prevIndex, 0);
    }
  }
  if (params.rewind && swiper.isBeginning) {
    var lastIndex = swiper.params.virtual && swiper.params.virtual.enabled && swiper.virtual ? swiper.virtual.slides.length - 1 : swiper.slides.length - 1;
    return swiper.slideTo(lastIndex, speed, runCallbacks, internal);
  }
  return swiper.slideTo(prevIndex, speed, runCallbacks, internal);
}

},{}],38:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = slideReset;
/* eslint no-unused-vars: "off" */
function slideReset() {
  var speed = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : this.params.speed;
  var runCallbacks = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : true;
  var internal = arguments.length > 2 ? arguments[2] : undefined;
  var swiper = this;
  return swiper.slideTo(swiper.activeIndex, speed, runCallbacks, internal);
}

},{}],39:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = slideTo;
var _utils = require("../../shared/utils.js");
function _typeof(obj) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (obj) { return typeof obj; } : function (obj) { return obj && "function" == typeof Symbol && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }, _typeof(obj); }
function _defineProperty(obj, key, value) { key = _toPropertyKey(key); if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }
function _toPropertyKey(arg) { var key = _toPrimitive(arg, "string"); return _typeof(key) === "symbol" ? key : String(key); }
function _toPrimitive(input, hint) { if (_typeof(input) !== "object" || input === null) return input; var prim = input[Symbol.toPrimitive]; if (prim !== undefined) { var res = prim.call(input, hint || "default"); if (_typeof(res) !== "object") return res; throw new TypeError("@@toPrimitive must return a primitive value."); } return (hint === "string" ? String : Number)(input); }
function slideTo() {
  var index = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : 0;
  var speed = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : this.params.speed;
  var runCallbacks = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : true;
  var internal = arguments.length > 3 ? arguments[3] : undefined;
  var initial = arguments.length > 4 ? arguments[4] : undefined;
  if (typeof index === 'string') {
    index = parseInt(index, 10);
  }
  var swiper = this;
  var slideIndex = index;
  if (slideIndex < 0) slideIndex = 0;
  var params = swiper.params,
    snapGrid = swiper.snapGrid,
    slidesGrid = swiper.slidesGrid,
    previousIndex = swiper.previousIndex,
    activeIndex = swiper.activeIndex,
    rtl = swiper.rtlTranslate,
    wrapperEl = swiper.wrapperEl,
    enabled = swiper.enabled;
  if (swiper.animating && params.preventInteractionOnTransition || !enabled && !internal && !initial) {
    return false;
  }
  var skip = Math.min(swiper.params.slidesPerGroupSkip, slideIndex);
  var snapIndex = skip + Math.floor((slideIndex - skip) / swiper.params.slidesPerGroup);
  if (snapIndex >= snapGrid.length) snapIndex = snapGrid.length - 1;
  var translate = -snapGrid[snapIndex];
  // Normalize slideIndex
  if (params.normalizeSlideIndex) {
    for (var i = 0; i < slidesGrid.length; i += 1) {
      var normalizedTranslate = -Math.floor(translate * 100);
      var normalizedGrid = Math.floor(slidesGrid[i] * 100);
      var normalizedGridNext = Math.floor(slidesGrid[i + 1] * 100);
      if (typeof slidesGrid[i + 1] !== 'undefined') {
        if (normalizedTranslate >= normalizedGrid && normalizedTranslate < normalizedGridNext - (normalizedGridNext - normalizedGrid) / 2) {
          slideIndex = i;
        } else if (normalizedTranslate >= normalizedGrid && normalizedTranslate < normalizedGridNext) {
          slideIndex = i + 1;
        }
      } else if (normalizedTranslate >= normalizedGrid) {
        slideIndex = i;
      }
    }
  }
  // Directions locks
  if (swiper.initialized && slideIndex !== activeIndex) {
    if (!swiper.allowSlideNext && translate < swiper.translate && translate < swiper.minTranslate()) {
      return false;
    }
    if (!swiper.allowSlidePrev && translate > swiper.translate && translate > swiper.maxTranslate()) {
      if ((activeIndex || 0) !== slideIndex) {
        return false;
      }
    }
  }
  if (slideIndex !== (previousIndex || 0) && runCallbacks) {
    swiper.emit('beforeSlideChangeStart');
  }

  // Update progress
  swiper.updateProgress(translate);
  var direction;
  if (slideIndex > activeIndex) direction = 'next';else if (slideIndex < activeIndex) direction = 'prev';else direction = 'reset';

  // Update Index
  if (rtl && -translate === swiper.translate || !rtl && translate === swiper.translate) {
    swiper.updateActiveIndex(slideIndex);
    // Update Height
    if (params.autoHeight) {
      swiper.updateAutoHeight();
    }
    swiper.updateSlidesClasses();
    if (params.effect !== 'slide') {
      swiper.setTranslate(translate);
    }
    if (direction !== 'reset') {
      swiper.transitionStart(runCallbacks, direction);
      swiper.transitionEnd(runCallbacks, direction);
    }
    return false;
  }
  if (params.cssMode) {
    var isH = swiper.isHorizontal();
    var t = rtl ? translate : -translate;
    if (speed === 0) {
      var isVirtual = swiper.virtual && swiper.params.virtual.enabled;
      if (isVirtual) {
        swiper.wrapperEl.style.scrollSnapType = 'none';
        swiper._immediateVirtual = true;
      }
      if (isVirtual && !swiper._cssModeVirtualInitialSet && swiper.params.initialSlide > 0) {
        swiper._cssModeVirtualInitialSet = true;
        requestAnimationFrame(function () {
          wrapperEl[isH ? 'scrollLeft' : 'scrollTop'] = t;
        });
      } else {
        wrapperEl[isH ? 'scrollLeft' : 'scrollTop'] = t;
      }
      if (isVirtual) {
        requestAnimationFrame(function () {
          swiper.wrapperEl.style.scrollSnapType = '';
          swiper._immediateVirtual = false;
        });
      }
    } else {
      var _wrapperEl$scrollTo;
      if (!swiper.support.smoothScroll) {
        (0, _utils.animateCSSModeScroll)({
          swiper: swiper,
          targetPosition: t,
          side: isH ? 'left' : 'top'
        });
        return true;
      }
      wrapperEl.scrollTo((_wrapperEl$scrollTo = {}, _defineProperty(_wrapperEl$scrollTo, isH ? 'left' : 'top', t), _defineProperty(_wrapperEl$scrollTo, "behavior", 'smooth'), _wrapperEl$scrollTo));
    }
    return true;
  }
  swiper.setTransition(speed);
  swiper.setTranslate(translate);
  swiper.updateActiveIndex(slideIndex);
  swiper.updateSlidesClasses();
  swiper.emit('beforeTransitionStart', speed, internal);
  swiper.transitionStart(runCallbacks, direction);
  if (speed === 0) {
    swiper.transitionEnd(runCallbacks, direction);
  } else if (!swiper.animating) {
    swiper.animating = true;
    if (!swiper.onSlideToWrapperTransitionEnd) {
      swiper.onSlideToWrapperTransitionEnd = function transitionEnd(e) {
        if (!swiper || swiper.destroyed) return;
        if (e.target !== this) return;
        swiper.wrapperEl.removeEventListener('transitionend', swiper.onSlideToWrapperTransitionEnd);
        swiper.onSlideToWrapperTransitionEnd = null;
        delete swiper.onSlideToWrapperTransitionEnd;
        swiper.transitionEnd(runCallbacks, direction);
      };
    }
    swiper.wrapperEl.addEventListener('transitionend', swiper.onSlideToWrapperTransitionEnd);
  }
  return true;
}

},{"../../shared/utils.js":102}],40:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = slideToClickedSlide;
var _utils = require("../../shared/utils.js");
function slideToClickedSlide() {
  var swiper = this;
  var params = swiper.params,
    slidesEl = swiper.slidesEl;
  var slidesPerView = params.slidesPerView === 'auto' ? swiper.slidesPerViewDynamic() : params.slidesPerView;
  var slideToIndex = swiper.clickedIndex;
  var realIndex;
  var slideSelector = swiper.isElement ? "swiper-slide" : ".".concat(params.slideClass);
  if (params.loop) {
    if (swiper.animating) return;
    realIndex = parseInt(swiper.clickedSlide.getAttribute('data-swiper-slide-index'), 10);
    if (params.centeredSlides) {
      if (slideToIndex < swiper.loopedSlides - slidesPerView / 2 || slideToIndex > swiper.slides.length - swiper.loopedSlides + slidesPerView / 2) {
        swiper.loopFix();
        slideToIndex = swiper.getSlideIndex((0, _utils.elementChildren)(slidesEl, "".concat(slideSelector, "[data-swiper-slide-index=\"").concat(realIndex, "\"]"))[0]);
        (0, _utils.nextTick)(function () {
          swiper.slideTo(slideToIndex);
        });
      } else {
        swiper.slideTo(slideToIndex);
      }
    } else if (slideToIndex > swiper.slides.length - slidesPerView) {
      swiper.loopFix();
      slideToIndex = swiper.getSlideIndex((0, _utils.elementChildren)(slidesEl, "".concat(slideSelector, "[data-swiper-slide-index=\"").concat(realIndex, "\"]"))[0]);
      (0, _utils.nextTick)(function () {
        swiper.slideTo(slideToIndex);
      });
    } else {
      swiper.slideTo(slideToIndex);
    }
  } else {
    swiper.slideTo(slideToIndex);
  }
}

},{"../../shared/utils.js":102}],41:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = slideToClosest;
/* eslint no-unused-vars: "off" */
function slideToClosest() {
  var speed = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : this.params.speed;
  var runCallbacks = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : true;
  var internal = arguments.length > 2 ? arguments[2] : undefined;
  var threshold = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : 0.5;
  var swiper = this;
  var index = swiper.activeIndex;
  var skip = Math.min(swiper.params.slidesPerGroupSkip, index);
  var snapIndex = skip + Math.floor((index - skip) / swiper.params.slidesPerGroup);
  var translate = swiper.rtlTranslate ? swiper.translate : -swiper.translate;
  if (translate >= swiper.snapGrid[snapIndex]) {
    // The current translate is on or after the current snap index, so the choice
    // is between the current index and the one after it.
    var currentSnap = swiper.snapGrid[snapIndex];
    var nextSnap = swiper.snapGrid[snapIndex + 1];
    if (translate - currentSnap > (nextSnap - currentSnap) * threshold) {
      index += swiper.params.slidesPerGroup;
    }
  } else {
    // The current translate is before the current snap index, so the choice
    // is between the current index and the one before it.
    var prevSnap = swiper.snapGrid[snapIndex - 1];
    var _currentSnap = swiper.snapGrid[snapIndex];
    if (translate - prevSnap <= (_currentSnap - prevSnap) * threshold) {
      index -= swiper.params.slidesPerGroup;
    }
  }
  index = Math.max(index, 0);
  index = Math.min(index, swiper.slidesGrid.length - 1);
  return swiper.slideTo(index, speed, runCallbacks, internal);
}

},{}],42:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = slideToLoop;
function slideToLoop() {
  var index = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : 0;
  var speed = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : this.params.speed;
  var runCallbacks = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : true;
  var internal = arguments.length > 3 ? arguments[3] : undefined;
  if (typeof index === 'string') {
    var indexAsNumber = parseInt(index, 10);
    index = indexAsNumber;
  }
  var swiper = this;
  var newIndex = index;
  if (swiper.params.loop) {
    if (swiper.virtual && swiper.params.virtual.enabled) {
      // eslint-disable-next-line
      newIndex = newIndex + swiper.virtual.slidesBefore;
    } else {
      newIndex = swiper.getSlideIndexByData(newIndex);
    }
  }
  return swiper.slideTo(newIndex, speed, runCallbacks, internal);
}

},{}],43:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;
var _setTransition = _interopRequireDefault(require("./setTransition.js"));
var _transitionStart = _interopRequireDefault(require("./transitionStart.js"));
var _transitionEnd = _interopRequireDefault(require("./transitionEnd.js"));
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }
var _default = {
  setTransition: _setTransition["default"],
  transitionStart: _transitionStart["default"],
  transitionEnd: _transitionEnd["default"]
};
exports["default"] = _default;

},{"./setTransition.js":44,"./transitionEnd.js":46,"./transitionStart.js":47}],44:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = setTransition;
function setTransition(duration, byController) {
  var swiper = this;
  if (!swiper.params.cssMode) {
    swiper.wrapperEl.style.transitionDuration = "".concat(duration, "ms");
  }
  swiper.emit('setTransition', duration, byController);
}

},{}],45:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = transitionEmit;
function transitionEmit(_ref) {
  var swiper = _ref.swiper,
    runCallbacks = _ref.runCallbacks,
    direction = _ref.direction,
    step = _ref.step;
  var activeIndex = swiper.activeIndex,
    previousIndex = swiper.previousIndex;
  var dir = direction;
  if (!dir) {
    if (activeIndex > previousIndex) dir = 'next';else if (activeIndex < previousIndex) dir = 'prev';else dir = 'reset';
  }
  swiper.emit("transition".concat(step));
  if (runCallbacks && activeIndex !== previousIndex) {
    if (dir === 'reset') {
      swiper.emit("slideResetTransition".concat(step));
      return;
    }
    swiper.emit("slideChangeTransition".concat(step));
    if (dir === 'next') {
      swiper.emit("slideNextTransition".concat(step));
    } else {
      swiper.emit("slidePrevTransition".concat(step));
    }
  }
}

},{}],46:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = transitionEnd;
var _transitionEmit = _interopRequireDefault(require("./transitionEmit.js"));
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }
function transitionEnd() {
  var runCallbacks = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : true;
  var direction = arguments.length > 1 ? arguments[1] : undefined;
  var swiper = this;
  var params = swiper.params;
  swiper.animating = false;
  if (params.cssMode) return;
  swiper.setTransition(0);
  (0, _transitionEmit["default"])({
    swiper: swiper,
    runCallbacks: runCallbacks,
    direction: direction,
    step: 'End'
  });
}

},{"./transitionEmit.js":45}],47:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = transitionStart;
var _transitionEmit = _interopRequireDefault(require("./transitionEmit.js"));
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }
function transitionStart() {
  var runCallbacks = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : true;
  var direction = arguments.length > 1 ? arguments[1] : undefined;
  var swiper = this;
  var params = swiper.params;
  if (params.cssMode) return;
  if (params.autoHeight) {
    swiper.updateAutoHeight();
  }
  (0, _transitionEmit["default"])({
    swiper: swiper,
    runCallbacks: runCallbacks,
    direction: direction,
    step: 'Start'
  });
}

},{"./transitionEmit.js":45}],48:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = getSwiperTranslate;
var _utils = require("../../shared/utils.js");
function getSwiperTranslate() {
  var axis = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : this.isHorizontal() ? 'x' : 'y';
  var swiper = this;
  var params = swiper.params,
    rtl = swiper.rtlTranslate,
    translate = swiper.translate,
    wrapperEl = swiper.wrapperEl;
  if (params.virtualTranslate) {
    return rtl ? -translate : translate;
  }
  if (params.cssMode) {
    return translate;
  }
  var currentTranslate = (0, _utils.getTranslate)(wrapperEl, axis);
  currentTranslate += swiper.cssOverflowAdjustment();
  if (rtl) currentTranslate = -currentTranslate;
  return currentTranslate || 0;
}

},{"../../shared/utils.js":102}],49:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;
var _getTranslate = _interopRequireDefault(require("./getTranslate.js"));
var _setTranslate = _interopRequireDefault(require("./setTranslate.js"));
var _minTranslate = _interopRequireDefault(require("./minTranslate.js"));
var _maxTranslate = _interopRequireDefault(require("./maxTranslate.js"));
var _translateTo = _interopRequireDefault(require("./translateTo.js"));
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }
var _default = {
  getTranslate: _getTranslate["default"],
  setTranslate: _setTranslate["default"],
  minTranslate: _minTranslate["default"],
  maxTranslate: _maxTranslate["default"],
  translateTo: _translateTo["default"]
};
exports["default"] = _default;

},{"./getTranslate.js":48,"./maxTranslate.js":50,"./minTranslate.js":51,"./setTranslate.js":52,"./translateTo.js":53}],50:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = maxTranslate;
function maxTranslate() {
  return -this.snapGrid[this.snapGrid.length - 1];
}

},{}],51:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = minTranslate;
function minTranslate() {
  return -this.snapGrid[0];
}

},{}],52:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = setTranslate;
function setTranslate(translate, byController) {
  var swiper = this;
  var rtl = swiper.rtlTranslate,
    params = swiper.params,
    wrapperEl = swiper.wrapperEl,
    progress = swiper.progress;
  var x = 0;
  var y = 0;
  var z = 0;
  if (swiper.isHorizontal()) {
    x = rtl ? -translate : translate;
  } else {
    y = translate;
  }
  if (params.roundLengths) {
    x = Math.floor(x);
    y = Math.floor(y);
  }
  swiper.previousTranslate = swiper.translate;
  swiper.translate = swiper.isHorizontal() ? x : y;
  if (params.cssMode) {
    wrapperEl[swiper.isHorizontal() ? 'scrollLeft' : 'scrollTop'] = swiper.isHorizontal() ? -x : -y;
  } else if (!params.virtualTranslate) {
    if (swiper.isHorizontal()) {
      x -= swiper.cssOverflowAdjustment();
    } else {
      y -= swiper.cssOverflowAdjustment();
    }
    wrapperEl.style.transform = "translate3d(".concat(x, "px, ").concat(y, "px, ").concat(z, "px)");
  }

  // Check if we need to update progress
  var newProgress;
  var translatesDiff = swiper.maxTranslate() - swiper.minTranslate();
  if (translatesDiff === 0) {
    newProgress = 0;
  } else {
    newProgress = (translate - swiper.minTranslate()) / translatesDiff;
  }
  if (newProgress !== progress) {
    swiper.updateProgress(translate);
  }
  swiper.emit('setTranslate', swiper.translate, byController);
}

},{}],53:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = translateTo;
var _utils = require("../../shared/utils.js");
function _typeof(obj) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (obj) { return typeof obj; } : function (obj) { return obj && "function" == typeof Symbol && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }, _typeof(obj); }
function _defineProperty(obj, key, value) { key = _toPropertyKey(key); if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }
function _toPropertyKey(arg) { var key = _toPrimitive(arg, "string"); return _typeof(key) === "symbol" ? key : String(key); }
function _toPrimitive(input, hint) { if (_typeof(input) !== "object" || input === null) return input; var prim = input[Symbol.toPrimitive]; if (prim !== undefined) { var res = prim.call(input, hint || "default"); if (_typeof(res) !== "object") return res; throw new TypeError("@@toPrimitive must return a primitive value."); } return (hint === "string" ? String : Number)(input); }
function translateTo() {
  var translate = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : 0;
  var speed = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : this.params.speed;
  var runCallbacks = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : true;
  var translateBounds = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : true;
  var internal = arguments.length > 4 ? arguments[4] : undefined;
  var swiper = this;
  var params = swiper.params,
    wrapperEl = swiper.wrapperEl;
  if (swiper.animating && params.preventInteractionOnTransition) {
    return false;
  }
  var minTranslate = swiper.minTranslate();
  var maxTranslate = swiper.maxTranslate();
  var newTranslate;
  if (translateBounds && translate > minTranslate) newTranslate = minTranslate;else if (translateBounds && translate < maxTranslate) newTranslate = maxTranslate;else newTranslate = translate;

  // Update progress
  swiper.updateProgress(newTranslate);
  if (params.cssMode) {
    var isH = swiper.isHorizontal();
    if (speed === 0) {
      wrapperEl[isH ? 'scrollLeft' : 'scrollTop'] = -newTranslate;
    } else {
      var _wrapperEl$scrollTo;
      if (!swiper.support.smoothScroll) {
        (0, _utils.animateCSSModeScroll)({
          swiper: swiper,
          targetPosition: -newTranslate,
          side: isH ? 'left' : 'top'
        });
        return true;
      }
      wrapperEl.scrollTo((_wrapperEl$scrollTo = {}, _defineProperty(_wrapperEl$scrollTo, isH ? 'left' : 'top', -newTranslate), _defineProperty(_wrapperEl$scrollTo, "behavior", 'smooth'), _wrapperEl$scrollTo));
    }
    return true;
  }
  if (speed === 0) {
    swiper.setTransition(0);
    swiper.setTranslate(newTranslate);
    if (runCallbacks) {
      swiper.emit('beforeTransitionStart', speed, internal);
      swiper.emit('transitionEnd');
    }
  } else {
    swiper.setTransition(speed);
    swiper.setTranslate(newTranslate);
    if (runCallbacks) {
      swiper.emit('beforeTransitionStart', speed, internal);
      swiper.emit('transitionStart');
    }
    if (!swiper.animating) {
      swiper.animating = true;
      if (!swiper.onTranslateToWrapperTransitionEnd) {
        swiper.onTranslateToWrapperTransitionEnd = function transitionEnd(e) {
          if (!swiper || swiper.destroyed) return;
          if (e.target !== this) return;
          swiper.wrapperEl.removeEventListener('transitionend', swiper.onTranslateToWrapperTransitionEnd);
          swiper.onTranslateToWrapperTransitionEnd = null;
          delete swiper.onTranslateToWrapperTransitionEnd;
          if (runCallbacks) {
            swiper.emit('transitionEnd');
          }
        };
      }
      swiper.wrapperEl.addEventListener('transitionend', swiper.onTranslateToWrapperTransitionEnd);
    }
  }
  return true;
}

},{"../../shared/utils.js":102}],54:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;
var _updateSize = _interopRequireDefault(require("./updateSize.js"));
var _updateSlides = _interopRequireDefault(require("./updateSlides.js"));
var _updateAutoHeight = _interopRequireDefault(require("./updateAutoHeight.js"));
var _updateSlidesOffset = _interopRequireDefault(require("./updateSlidesOffset.js"));
var _updateSlidesProgress = _interopRequireDefault(require("./updateSlidesProgress.js"));
var _updateProgress = _interopRequireDefault(require("./updateProgress.js"));
var _updateSlidesClasses = _interopRequireDefault(require("./updateSlidesClasses.js"));
var _updateActiveIndex = _interopRequireDefault(require("./updateActiveIndex.js"));
var _updateClickedSlide = _interopRequireDefault(require("./updateClickedSlide.js"));
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }
var _default = {
  updateSize: _updateSize["default"],
  updateSlides: _updateSlides["default"],
  updateAutoHeight: _updateAutoHeight["default"],
  updateSlidesOffset: _updateSlidesOffset["default"],
  updateSlidesProgress: _updateSlidesProgress["default"],
  updateProgress: _updateProgress["default"],
  updateSlidesClasses: _updateSlidesClasses["default"],
  updateActiveIndex: _updateActiveIndex["default"],
  updateClickedSlide: _updateClickedSlide["default"]
};
exports["default"] = _default;

},{"./updateActiveIndex.js":55,"./updateAutoHeight.js":56,"./updateClickedSlide.js":57,"./updateProgress.js":58,"./updateSize.js":59,"./updateSlides.js":60,"./updateSlidesClasses.js":61,"./updateSlidesOffset.js":62,"./updateSlidesProgress.js":63}],55:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = updateActiveIndex;
exports.getActiveIndexByTranslate = getActiveIndexByTranslate;
var _processLazyPreloader = require("../../shared/process-lazy-preloader.js");
function getActiveIndexByTranslate(swiper) {
  var slidesGrid = swiper.slidesGrid,
    params = swiper.params;
  var translate = swiper.rtlTranslate ? swiper.translate : -swiper.translate;
  var activeIndex;
  for (var i = 0; i < slidesGrid.length; i += 1) {
    if (typeof slidesGrid[i + 1] !== 'undefined') {
      if (translate >= slidesGrid[i] && translate < slidesGrid[i + 1] - (slidesGrid[i + 1] - slidesGrid[i]) / 2) {
        activeIndex = i;
      } else if (translate >= slidesGrid[i] && translate < slidesGrid[i + 1]) {
        activeIndex = i + 1;
      }
    } else if (translate >= slidesGrid[i]) {
      activeIndex = i;
    }
  }
  // Normalize slideIndex
  if (params.normalizeSlideIndex) {
    if (activeIndex < 0 || typeof activeIndex === 'undefined') activeIndex = 0;
  }
  return activeIndex;
}
function updateActiveIndex(newActiveIndex) {
  var swiper = this;
  var translate = swiper.rtlTranslate ? swiper.translate : -swiper.translate;
  var snapGrid = swiper.snapGrid,
    params = swiper.params,
    previousIndex = swiper.activeIndex,
    previousRealIndex = swiper.realIndex,
    previousSnapIndex = swiper.snapIndex;
  var activeIndex = newActiveIndex;
  var snapIndex;
  var getVirtualRealIndex = function getVirtualRealIndex(aIndex) {
    var realIndex = aIndex - swiper.virtual.slidesBefore;
    if (realIndex < 0) {
      realIndex = swiper.virtual.slides.length + realIndex;
    }
    if (realIndex >= swiper.virtual.slides.length) {
      realIndex -= swiper.virtual.slides.length;
    }
    return realIndex;
  };
  if (typeof activeIndex === 'undefined') {
    activeIndex = getActiveIndexByTranslate(swiper);
  }
  if (snapGrid.indexOf(translate) >= 0) {
    snapIndex = snapGrid.indexOf(translate);
  } else {
    var skip = Math.min(params.slidesPerGroupSkip, activeIndex);
    snapIndex = skip + Math.floor((activeIndex - skip) / params.slidesPerGroup);
  }
  if (snapIndex >= snapGrid.length) snapIndex = snapGrid.length - 1;
  if (activeIndex === previousIndex) {
    if (snapIndex !== previousSnapIndex) {
      swiper.snapIndex = snapIndex;
      swiper.emit('snapIndexChange');
    }
    if (swiper.params.loop && swiper.virtual && swiper.params.virtual.enabled) {
      swiper.realIndex = getVirtualRealIndex(activeIndex);
    }
    return;
  }
  // Get real index
  var realIndex;
  if (swiper.virtual && params.virtual.enabled && params.loop) {
    realIndex = getVirtualRealIndex(activeIndex);
  } else if (swiper.slides[activeIndex]) {
    realIndex = parseInt(swiper.slides[activeIndex].getAttribute('data-swiper-slide-index') || activeIndex, 10);
  } else {
    realIndex = activeIndex;
  }
  Object.assign(swiper, {
    previousSnapIndex: previousSnapIndex,
    snapIndex: snapIndex,
    previousRealIndex: previousRealIndex,
    realIndex: realIndex,
    previousIndex: previousIndex,
    activeIndex: activeIndex
  });
  if (swiper.initialized) {
    (0, _processLazyPreloader.preload)(swiper);
  }
  swiper.emit('activeIndexChange');
  swiper.emit('snapIndexChange');
  if (previousRealIndex !== realIndex) {
    swiper.emit('realIndexChange');
  }
  if (swiper.initialized || swiper.params.runCallbacksOnInit) {
    swiper.emit('slideChange');
  }
}

},{"../../shared/process-lazy-preloader.js":101}],56:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = updateAutoHeight;
function updateAutoHeight(speed) {
  var swiper = this;
  var activeSlides = [];
  var isVirtual = swiper.virtual && swiper.params.virtual.enabled;
  var newHeight = 0;
  var i;
  if (typeof speed === 'number') {
    swiper.setTransition(speed);
  } else if (speed === true) {
    swiper.setTransition(swiper.params.speed);
  }
  var getSlideByIndex = function getSlideByIndex(index) {
    if (isVirtual) {
      return swiper.slides[swiper.getSlideIndexByData(index)];
    }
    return swiper.slides[index];
  };
  // Find slides currently in view
  if (swiper.params.slidesPerView !== 'auto' && swiper.params.slidesPerView > 1) {
    if (swiper.params.centeredSlides) {
      (swiper.visibleSlides || []).forEach(function (slide) {
        activeSlides.push(slide);
      });
    } else {
      for (i = 0; i < Math.ceil(swiper.params.slidesPerView); i += 1) {
        var index = swiper.activeIndex + i;
        if (index > swiper.slides.length && !isVirtual) break;
        activeSlides.push(getSlideByIndex(index));
      }
    }
  } else {
    activeSlides.push(getSlideByIndex(swiper.activeIndex));
  }

  // Find new height from highest slide in view
  for (i = 0; i < activeSlides.length; i += 1) {
    if (typeof activeSlides[i] !== 'undefined') {
      var height = activeSlides[i].offsetHeight;
      newHeight = height > newHeight ? height : newHeight;
    }
  }

  // Update Height
  if (newHeight || newHeight === 0) swiper.wrapperEl.style.height = "".concat(newHeight, "px");
}

},{}],57:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = updateClickedSlide;
function updateClickedSlide(e) {
  var swiper = this;
  var params = swiper.params;
  var slide = e.closest(".".concat(params.slideClass, ", swiper-slide"));
  var slideFound = false;
  var slideIndex;
  if (slide) {
    for (var i = 0; i < swiper.slides.length; i += 1) {
      if (swiper.slides[i] === slide) {
        slideFound = true;
        slideIndex = i;
        break;
      }
    }
  }
  if (slide && slideFound) {
    swiper.clickedSlide = slide;
    if (swiper.virtual && swiper.params.virtual.enabled) {
      swiper.clickedIndex = parseInt(slide.getAttribute('data-swiper-slide-index'), 10);
    } else {
      swiper.clickedIndex = slideIndex;
    }
  } else {
    swiper.clickedSlide = undefined;
    swiper.clickedIndex = undefined;
    return;
  }
  if (params.slideToClickedSlide && swiper.clickedIndex !== undefined && swiper.clickedIndex !== swiper.activeIndex) {
    swiper.slideToClickedSlide();
  }
}

},{}],58:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = updateProgress;
function updateProgress(translate) {
  var swiper = this;
  if (typeof translate === 'undefined') {
    var multiplier = swiper.rtlTranslate ? -1 : 1;
    // eslint-disable-next-line
    translate = swiper && swiper.translate && swiper.translate * multiplier || 0;
  }
  var params = swiper.params;
  var translatesDiff = swiper.maxTranslate() - swiper.minTranslate();
  var progress = swiper.progress,
    isBeginning = swiper.isBeginning,
    isEnd = swiper.isEnd,
    progressLoop = swiper.progressLoop;
  var wasBeginning = isBeginning;
  var wasEnd = isEnd;
  if (translatesDiff === 0) {
    progress = 0;
    isBeginning = true;
    isEnd = true;
  } else {
    progress = (translate - swiper.minTranslate()) / translatesDiff;
    var isBeginningRounded = Math.abs(translate - swiper.minTranslate()) < 1;
    var isEndRounded = Math.abs(translate - swiper.maxTranslate()) < 1;
    isBeginning = isBeginningRounded || progress <= 0;
    isEnd = isEndRounded || progress >= 1;
    if (isBeginningRounded) progress = 0;
    if (isEndRounded) progress = 1;
  }
  if (params.loop) {
    var firstSlideIndex = swiper.getSlideIndexByData(0);
    var lastSlideIndex = swiper.getSlideIndexByData(swiper.slides.length - 1);
    var firstSlideTranslate = swiper.slidesGrid[firstSlideIndex];
    var lastSlideTranslate = swiper.slidesGrid[lastSlideIndex];
    var translateMax = swiper.slidesGrid[swiper.slidesGrid.length - 1];
    var translateAbs = Math.abs(translate);
    if (translateAbs >= firstSlideTranslate) {
      progressLoop = (translateAbs - firstSlideTranslate) / translateMax;
    } else {
      progressLoop = (translateAbs + translateMax - lastSlideTranslate) / translateMax;
    }
    if (progressLoop > 1) progressLoop -= 1;
  }
  Object.assign(swiper, {
    progress: progress,
    progressLoop: progressLoop,
    isBeginning: isBeginning,
    isEnd: isEnd
  });
  if (params.watchSlidesProgress || params.centeredSlides && params.autoHeight) swiper.updateSlidesProgress(translate);
  if (isBeginning && !wasBeginning) {
    swiper.emit('reachBeginning toEdge');
  }
  if (isEnd && !wasEnd) {
    swiper.emit('reachEnd toEdge');
  }
  if (wasBeginning && !isBeginning || wasEnd && !isEnd) {
    swiper.emit('fromEdge');
  }
  swiper.emit('progress', progress);
}

},{}],59:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = updateSize;
var _utils = require("../../shared/utils.js");
function updateSize() {
  var swiper = this;
  var width;
  var height;
  var el = swiper.el;
  if (typeof swiper.params.width !== 'undefined' && swiper.params.width !== null) {
    width = swiper.params.width;
  } else {
    width = el.clientWidth;
  }
  if (typeof swiper.params.height !== 'undefined' && swiper.params.height !== null) {
    height = swiper.params.height;
  } else {
    height = el.clientHeight;
  }
  if (width === 0 && swiper.isHorizontal() || height === 0 && swiper.isVertical()) {
    return;
  }

  // Subtract paddings
  width = width - parseInt((0, _utils.elementStyle)(el, 'padding-left') || 0, 10) - parseInt((0, _utils.elementStyle)(el, 'padding-right') || 0, 10);
  height = height - parseInt((0, _utils.elementStyle)(el, 'padding-top') || 0, 10) - parseInt((0, _utils.elementStyle)(el, 'padding-bottom') || 0, 10);
  if (Number.isNaN(width)) width = 0;
  if (Number.isNaN(height)) height = 0;
  Object.assign(swiper, {
    width: width,
    height: height,
    size: swiper.isHorizontal() ? width : height
  });
}

},{"../../shared/utils.js":102}],60:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = updateSlides;
var _utils = require("../../shared/utils.js");
function updateSlides() {
  var swiper = this;
  function getDirectionLabel(property) {
    if (swiper.isHorizontal()) {
      return property;
    }
    // prettier-ignore
    return {
      'width': 'height',
      'margin-top': 'margin-left',
      'margin-bottom ': 'margin-right',
      'margin-left': 'margin-top',
      'margin-right': 'margin-bottom',
      'padding-left': 'padding-top',
      'padding-right': 'padding-bottom',
      'marginRight': 'marginBottom'
    }[property];
  }
  function getDirectionPropertyValue(node, label) {
    return parseFloat(node.getPropertyValue(getDirectionLabel(label)) || 0);
  }
  var params = swiper.params;
  var wrapperEl = swiper.wrapperEl,
    slidesEl = swiper.slidesEl,
    swiperSize = swiper.size,
    rtl = swiper.rtlTranslate,
    wrongRTL = swiper.wrongRTL;
  var isVirtual = swiper.virtual && params.virtual.enabled;
  var previousSlidesLength = isVirtual ? swiper.virtual.slides.length : swiper.slides.length;
  var slides = (0, _utils.elementChildren)(slidesEl, ".".concat(swiper.params.slideClass, ", swiper-slide"));
  var slidesLength = isVirtual ? swiper.virtual.slides.length : slides.length;
  var snapGrid = [];
  var slidesGrid = [];
  var slidesSizesGrid = [];
  var offsetBefore = params.slidesOffsetBefore;
  if (typeof offsetBefore === 'function') {
    offsetBefore = params.slidesOffsetBefore.call(swiper);
  }
  var offsetAfter = params.slidesOffsetAfter;
  if (typeof offsetAfter === 'function') {
    offsetAfter = params.slidesOffsetAfter.call(swiper);
  }
  var previousSnapGridLength = swiper.snapGrid.length;
  var previousSlidesGridLength = swiper.slidesGrid.length;
  var spaceBetween = params.spaceBetween;
  var slidePosition = -offsetBefore;
  var prevSlideSize = 0;
  var index = 0;
  if (typeof swiperSize === 'undefined') {
    return;
  }
  if (typeof spaceBetween === 'string' && spaceBetween.indexOf('%') >= 0) {
    spaceBetween = parseFloat(spaceBetween.replace('%', '')) / 100 * swiperSize;
  }
  swiper.virtualSize = -spaceBetween;

  // reset margins
  slides.forEach(function (slideEl) {
    if (rtl) {
      slideEl.style.marginLeft = '';
    } else {
      slideEl.style.marginRight = '';
    }
    slideEl.style.marginBottom = '';
    slideEl.style.marginTop = '';
  });

  // reset cssMode offsets
  if (params.centeredSlides && params.cssMode) {
    (0, _utils.setCSSProperty)(wrapperEl, '--swiper-centered-offset-before', '');
    (0, _utils.setCSSProperty)(wrapperEl, '--swiper-centered-offset-after', '');
  }
  var gridEnabled = params.grid && params.grid.rows > 1 && swiper.grid;
  if (gridEnabled) {
    swiper.grid.initSlides(slidesLength);
  }

  // Calc slides
  var slideSize;
  var shouldResetSlideSize = params.slidesPerView === 'auto' && params.breakpoints && Object.keys(params.breakpoints).filter(function (key) {
    return typeof params.breakpoints[key].slidesPerView !== 'undefined';
  }).length > 0;
  for (var i = 0; i < slidesLength; i += 1) {
    slideSize = 0;
    var slide = void 0;
    if (slides[i]) slide = slides[i];
    if (gridEnabled) {
      swiper.grid.updateSlide(i, slide, slidesLength, getDirectionLabel);
    }
    if (slides[i] && (0, _utils.elementStyle)(slide, 'display') === 'none') continue; // eslint-disable-line

    if (params.slidesPerView === 'auto') {
      if (shouldResetSlideSize) {
        slides[i].style[getDirectionLabel('width')] = "";
      }
      var slideStyles = getComputedStyle(slide);
      var currentTransform = slide.style.transform;
      var currentWebKitTransform = slide.style.webkitTransform;
      if (currentTransform) {
        slide.style.transform = 'none';
      }
      if (currentWebKitTransform) {
        slide.style.webkitTransform = 'none';
      }
      if (params.roundLengths) {
        slideSize = swiper.isHorizontal() ? (0, _utils.elementOuterSize)(slide, 'width', true) : (0, _utils.elementOuterSize)(slide, 'height', true);
      } else {
        // eslint-disable-next-line
        var width = getDirectionPropertyValue(slideStyles, 'width');
        var paddingLeft = getDirectionPropertyValue(slideStyles, 'padding-left');
        var paddingRight = getDirectionPropertyValue(slideStyles, 'padding-right');
        var marginLeft = getDirectionPropertyValue(slideStyles, 'margin-left');
        var marginRight = getDirectionPropertyValue(slideStyles, 'margin-right');
        var boxSizing = slideStyles.getPropertyValue('box-sizing');
        if (boxSizing && boxSizing === 'border-box') {
          slideSize = width + marginLeft + marginRight;
        } else {
          var _slide = slide,
            clientWidth = _slide.clientWidth,
            offsetWidth = _slide.offsetWidth;
          slideSize = width + paddingLeft + paddingRight + marginLeft + marginRight + (offsetWidth - clientWidth);
        }
      }
      if (currentTransform) {
        slide.style.transform = currentTransform;
      }
      if (currentWebKitTransform) {
        slide.style.webkitTransform = currentWebKitTransform;
      }
      if (params.roundLengths) slideSize = Math.floor(slideSize);
    } else {
      slideSize = (swiperSize - (params.slidesPerView - 1) * spaceBetween) / params.slidesPerView;
      if (params.roundLengths) slideSize = Math.floor(slideSize);
      if (slides[i]) {
        slides[i].style[getDirectionLabel('width')] = "".concat(slideSize, "px");
      }
    }
    if (slides[i]) {
      slides[i].swiperSlideSize = slideSize;
    }
    slidesSizesGrid.push(slideSize);
    if (params.centeredSlides) {
      slidePosition = slidePosition + slideSize / 2 + prevSlideSize / 2 + spaceBetween;
      if (prevSlideSize === 0 && i !== 0) slidePosition = slidePosition - swiperSize / 2 - spaceBetween;
      if (i === 0) slidePosition = slidePosition - swiperSize / 2 - spaceBetween;
      if (Math.abs(slidePosition) < 1 / 1000) slidePosition = 0;
      if (params.roundLengths) slidePosition = Math.floor(slidePosition);
      if (index % params.slidesPerGroup === 0) snapGrid.push(slidePosition);
      slidesGrid.push(slidePosition);
    } else {
      if (params.roundLengths) slidePosition = Math.floor(slidePosition);
      if ((index - Math.min(swiper.params.slidesPerGroupSkip, index)) % swiper.params.slidesPerGroup === 0) snapGrid.push(slidePosition);
      slidesGrid.push(slidePosition);
      slidePosition = slidePosition + slideSize + spaceBetween;
    }
    swiper.virtualSize += slideSize + spaceBetween;
    prevSlideSize = slideSize;
    index += 1;
  }
  swiper.virtualSize = Math.max(swiper.virtualSize, swiperSize) + offsetAfter;
  if (rtl && wrongRTL && (params.effect === 'slide' || params.effect === 'coverflow')) {
    wrapperEl.style.width = "".concat(swiper.virtualSize + params.spaceBetween, "px");
  }
  if (params.setWrapperSize) {
    wrapperEl.style[getDirectionLabel('width')] = "".concat(swiper.virtualSize + params.spaceBetween, "px");
  }
  if (gridEnabled) {
    swiper.grid.updateWrapperSize(slideSize, snapGrid, getDirectionLabel);
  }

  // Remove last grid elements depending on width
  if (!params.centeredSlides) {
    var newSlidesGrid = [];
    for (var _i = 0; _i < snapGrid.length; _i += 1) {
      var slidesGridItem = snapGrid[_i];
      if (params.roundLengths) slidesGridItem = Math.floor(slidesGridItem);
      if (snapGrid[_i] <= swiper.virtualSize - swiperSize) {
        newSlidesGrid.push(slidesGridItem);
      }
    }
    snapGrid = newSlidesGrid;
    if (Math.floor(swiper.virtualSize - swiperSize) - Math.floor(snapGrid[snapGrid.length - 1]) > 1) {
      snapGrid.push(swiper.virtualSize - swiperSize);
    }
  }
  if (isVirtual && params.loop) {
    var size = slidesSizesGrid[0] + spaceBetween;
    if (params.slidesPerGroup > 1) {
      var groups = Math.ceil((swiper.virtual.slidesBefore + swiper.virtual.slidesAfter) / params.slidesPerGroup);
      var groupSize = size * params.slidesPerGroup;
      for (var _i2 = 0; _i2 < groups; _i2 += 1) {
        snapGrid.push(snapGrid[snapGrid.length - 1] + groupSize);
      }
    }
    for (var _i3 = 0; _i3 < swiper.virtual.slidesBefore + swiper.virtual.slidesAfter; _i3 += 1) {
      if (params.slidesPerGroup === 1) {
        snapGrid.push(snapGrid[snapGrid.length - 1] + size);
      }
      slidesGrid.push(slidesGrid[slidesGrid.length - 1] + size);
      swiper.virtualSize += size;
    }
  }
  if (snapGrid.length === 0) snapGrid = [0];
  if (params.spaceBetween !== 0) {
    var key = swiper.isHorizontal() && rtl ? 'marginLeft' : getDirectionLabel('marginRight');
    slides.filter(function (_, slideIndex) {
      if (!params.cssMode || params.loop) return true;
      if (slideIndex === slides.length - 1) {
        return false;
      }
      return true;
    }).forEach(function (slideEl) {
      slideEl.style[key] = "".concat(spaceBetween, "px");
    });
  }
  if (params.centeredSlides && params.centeredSlidesBounds) {
    var allSlidesSize = 0;
    slidesSizesGrid.forEach(function (slideSizeValue) {
      allSlidesSize += slideSizeValue + (params.spaceBetween ? params.spaceBetween : 0);
    });
    allSlidesSize -= params.spaceBetween;
    var maxSnap = allSlidesSize - swiperSize;
    snapGrid = snapGrid.map(function (snap) {
      if (snap < 0) return -offsetBefore;
      if (snap > maxSnap) return maxSnap + offsetAfter;
      return snap;
    });
  }
  if (params.centerInsufficientSlides) {
    var _allSlidesSize = 0;
    slidesSizesGrid.forEach(function (slideSizeValue) {
      _allSlidesSize += slideSizeValue + (params.spaceBetween ? params.spaceBetween : 0);
    });
    _allSlidesSize -= params.spaceBetween;
    if (_allSlidesSize < swiperSize) {
      var allSlidesOffset = (swiperSize - _allSlidesSize) / 2;
      snapGrid.forEach(function (snap, snapIndex) {
        snapGrid[snapIndex] = snap - allSlidesOffset;
      });
      slidesGrid.forEach(function (snap, snapIndex) {
        slidesGrid[snapIndex] = snap + allSlidesOffset;
      });
    }
  }
  Object.assign(swiper, {
    slides: slides,
    snapGrid: snapGrid,
    slidesGrid: slidesGrid,
    slidesSizesGrid: slidesSizesGrid
  });
  if (params.centeredSlides && params.cssMode && !params.centeredSlidesBounds) {
    (0, _utils.setCSSProperty)(wrapperEl, '--swiper-centered-offset-before', "".concat(-snapGrid[0], "px"));
    (0, _utils.setCSSProperty)(wrapperEl, '--swiper-centered-offset-after', "".concat(swiper.size / 2 - slidesSizesGrid[slidesSizesGrid.length - 1] / 2, "px"));
    var addToSnapGrid = -swiper.snapGrid[0];
    var addToSlidesGrid = -swiper.slidesGrid[0];
    swiper.snapGrid = swiper.snapGrid.map(function (v) {
      return v + addToSnapGrid;
    });
    swiper.slidesGrid = swiper.slidesGrid.map(function (v) {
      return v + addToSlidesGrid;
    });
  }
  if (slidesLength !== previousSlidesLength) {
    swiper.emit('slidesLengthChange');
  }
  if (snapGrid.length !== previousSnapGridLength) {
    if (swiper.params.watchOverflow) swiper.checkOverflow();
    swiper.emit('snapGridLengthChange');
  }
  if (slidesGrid.length !== previousSlidesGridLength) {
    swiper.emit('slidesGridLengthChange');
  }
  if (params.watchSlidesProgress) {
    swiper.updateSlidesOffset();
  }
  if (!isVirtual && !params.cssMode && (params.effect === 'slide' || params.effect === 'fade')) {
    var backFaceHiddenClass = "".concat(params.containerModifierClass, "backface-hidden");
    var hasClassBackfaceClassAdded = swiper.el.classList.contains(backFaceHiddenClass);
    if (slidesLength <= params.maxBackfaceHiddenSlides) {
      if (!hasClassBackfaceClassAdded) swiper.el.classList.add(backFaceHiddenClass);
    } else if (hasClassBackfaceClassAdded) {
      swiper.el.classList.remove(backFaceHiddenClass);
    }
  }
}

},{"../../shared/utils.js":102}],61:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = updateSlidesClasses;
var _utils = require("../../shared/utils.js");
function updateSlidesClasses() {
  var swiper = this;
  var slides = swiper.slides,
    params = swiper.params,
    slidesEl = swiper.slidesEl,
    activeIndex = swiper.activeIndex;
  var isVirtual = swiper.virtual && params.virtual.enabled;
  var getFilteredSlide = function getFilteredSlide(selector) {
    return (0, _utils.elementChildren)(slidesEl, ".".concat(params.slideClass).concat(selector, ", swiper-slide").concat(selector))[0];
  };
  slides.forEach(function (slideEl) {
    slideEl.classList.remove(params.slideActiveClass, params.slideNextClass, params.slidePrevClass);
  });
  var activeSlide;
  if (isVirtual) {
    if (params.loop) {
      var slideIndex = activeIndex - swiper.virtual.slidesBefore;
      if (slideIndex < 0) slideIndex = swiper.virtual.slides.length + slideIndex;
      if (slideIndex >= swiper.virtual.slides.length) slideIndex -= swiper.virtual.slides.length;
      activeSlide = getFilteredSlide("[data-swiper-slide-index=\"".concat(slideIndex, "\"]"));
    } else {
      activeSlide = getFilteredSlide("[data-swiper-slide-index=\"".concat(activeIndex, "\"]"));
    }
  } else {
    activeSlide = slides[activeIndex];
  }
  if (activeSlide) {
    // Active classes
    activeSlide.classList.add(params.slideActiveClass);

    // Next Slide
    var nextSlide = (0, _utils.elementNextAll)(activeSlide, ".".concat(params.slideClass, ", swiper-slide"))[0];
    if (params.loop && !nextSlide) {
      nextSlide = slides[0];
    }
    if (nextSlide) {
      nextSlide.classList.add(params.slideNextClass);
    }
    // Prev Slide
    var prevSlide = (0, _utils.elementPrevAll)(activeSlide, ".".concat(params.slideClass, ", swiper-slide"))[0];
    if (params.loop && !prevSlide === 0) {
      prevSlide = slides[slides.length - 1];
    }
    if (prevSlide) {
      prevSlide.classList.add(params.slidePrevClass);
    }
  }
  swiper.emitSlidesClasses();
}

},{"../../shared/utils.js":102}],62:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = updateSlidesOffset;
function updateSlidesOffset() {
  var swiper = this;
  var slides = swiper.slides;
  // eslint-disable-next-line
  var minusOffset = swiper.isElement ? swiper.isHorizontal() ? swiper.wrapperEl.offsetLeft : swiper.wrapperEl.offsetTop : 0;
  for (var i = 0; i < slides.length; i += 1) {
    slides[i].swiperSlideOffset = (swiper.isHorizontal() ? slides[i].offsetLeft : slides[i].offsetTop) - minusOffset - swiper.cssOverflowAdjustment();
  }
}

},{}],63:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = updateSlidesProgress;
function updateSlidesProgress() {
  var translate = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : this && this.translate || 0;
  var swiper = this;
  var params = swiper.params;
  var slides = swiper.slides,
    rtl = swiper.rtlTranslate,
    snapGrid = swiper.snapGrid;
  if (slides.length === 0) return;
  if (typeof slides[0].swiperSlideOffset === 'undefined') swiper.updateSlidesOffset();
  var offsetCenter = -translate;
  if (rtl) offsetCenter = translate;

  // Visible Slides
  slides.forEach(function (slideEl) {
    slideEl.classList.remove(params.slideVisibleClass);
  });
  swiper.visibleSlidesIndexes = [];
  swiper.visibleSlides = [];
  for (var i = 0; i < slides.length; i += 1) {
    var slide = slides[i];
    var slideOffset = slide.swiperSlideOffset;
    if (params.cssMode && params.centeredSlides) {
      slideOffset -= slides[0].swiperSlideOffset;
    }
    var slideProgress = (offsetCenter + (params.centeredSlides ? swiper.minTranslate() : 0) - slideOffset) / (slide.swiperSlideSize + params.spaceBetween);
    var originalSlideProgress = (offsetCenter - snapGrid[0] + (params.centeredSlides ? swiper.minTranslate() : 0) - slideOffset) / (slide.swiperSlideSize + params.spaceBetween);
    var slideBefore = -(offsetCenter - slideOffset);
    var slideAfter = slideBefore + swiper.slidesSizesGrid[i];
    var isVisible = slideBefore >= 0 && slideBefore < swiper.size - 1 || slideAfter > 1 && slideAfter <= swiper.size || slideBefore <= 0 && slideAfter >= swiper.size;
    if (isVisible) {
      swiper.visibleSlides.push(slide);
      swiper.visibleSlidesIndexes.push(i);
      slides[i].classList.add(params.slideVisibleClass);
    }
    slide.progress = rtl ? -slideProgress : slideProgress;
    slide.originalProgress = rtl ? -originalSlideProgress : originalSlideProgress;
  }
}

},{}],64:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = A11y;
var _classesToSelector = _interopRequireDefault(require("../../shared/classes-to-selector.js"));
var _utils = require("../../shared/utils.js");
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }
function A11y(_ref) {
  var swiper = _ref.swiper,
    extendParams = _ref.extendParams,
    on = _ref.on;
  extendParams({
    a11y: {
      enabled: true,
      notificationClass: 'swiper-notification',
      prevSlideMessage: 'Previous slide',
      nextSlideMessage: 'Next slide',
      firstSlideMessage: 'This is the first slide',
      lastSlideMessage: 'This is the last slide',
      paginationBulletMessage: 'Go to slide {{index}}',
      slideLabelMessage: '{{index}} / {{slidesLength}}',
      containerMessage: null,
      containerRoleDescriptionMessage: null,
      itemRoleDescriptionMessage: null,
      slideRole: 'group',
      id: null
    }
  });
  swiper.a11y = {
    clicked: false
  };
  var liveRegion = null;
  function notify(message) {
    var notification = liveRegion;
    if (notification.length === 0) return;
    notification.innerHTML = '';
    notification.innerHTML = message;
  }
  var makeElementsArray = function makeElementsArray(el) {
    if (!Array.isArray(el)) el = [el].filter(function (e) {
      return !!e;
    });
    return el;
  };
  function getRandomNumber() {
    var size = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : 16;
    var randomChar = function randomChar() {
      return Math.round(16 * Math.random()).toString(16);
    };
    return 'x'.repeat(size).replace(/x/g, randomChar);
  }
  function makeElFocusable(el) {
    el = makeElementsArray(el);
    el.forEach(function (subEl) {
      subEl.setAttribute('tabIndex', '0');
    });
  }
  function makeElNotFocusable(el) {
    el = makeElementsArray(el);
    el.forEach(function (subEl) {
      subEl.setAttribute('tabIndex', '-1');
    });
  }
  function addElRole(el, role) {
    el = makeElementsArray(el);
    el.forEach(function (subEl) {
      subEl.setAttribute('role', role);
    });
  }
  function addElRoleDescription(el, description) {
    el = makeElementsArray(el);
    el.forEach(function (subEl) {
      subEl.setAttribute('aria-roledescription', description);
    });
  }
  function addElControls(el, controls) {
    el = makeElementsArray(el);
    el.forEach(function (subEl) {
      subEl.setAttribute('aria-controls', controls);
    });
  }
  function addElLabel(el, label) {
    el = makeElementsArray(el);
    el.forEach(function (subEl) {
      subEl.setAttribute('aria-label', label);
    });
  }
  function addElId(el, id) {
    el = makeElementsArray(el);
    el.forEach(function (subEl) {
      subEl.setAttribute('id', id);
    });
  }
  function addElLive(el, live) {
    el = makeElementsArray(el);
    el.forEach(function (subEl) {
      subEl.setAttribute('aria-live', live);
    });
  }
  function disableEl(el) {
    el = makeElementsArray(el);
    el.forEach(function (subEl) {
      subEl.setAttribute('aria-disabled', true);
    });
  }
  function enableEl(el) {
    el = makeElementsArray(el);
    el.forEach(function (subEl) {
      subEl.setAttribute('aria-disabled', false);
    });
  }
  function onEnterOrSpaceKey(e) {
    if (e.keyCode !== 13 && e.keyCode !== 32) return;
    var params = swiper.params.a11y;
    var targetEl = e.target;
    if (swiper.pagination && swiper.pagination.el && (targetEl === swiper.pagination.el || swiper.pagination.el.contains(e.target))) {
      if (!e.target.matches((0, _classesToSelector["default"])(swiper.params.pagination.bulletClass))) return;
    }
    if (swiper.navigation && swiper.navigation.nextEl && targetEl === swiper.navigation.nextEl) {
      if (!(swiper.isEnd && !swiper.params.loop)) {
        swiper.slideNext();
      }
      if (swiper.isEnd) {
        notify(params.lastSlideMessage);
      } else {
        notify(params.nextSlideMessage);
      }
    }
    if (swiper.navigation && swiper.navigation.prevEl && targetEl === swiper.navigation.prevEl) {
      if (!(swiper.isBeginning && !swiper.params.loop)) {
        swiper.slidePrev();
      }
      if (swiper.isBeginning) {
        notify(params.firstSlideMessage);
      } else {
        notify(params.prevSlideMessage);
      }
    }
    if (swiper.pagination && targetEl.matches((0, _classesToSelector["default"])(swiper.params.pagination.bulletClass))) {
      targetEl.click();
    }
  }
  function updateNavigation() {
    if (swiper.params.loop || swiper.params.rewind || !swiper.navigation) return;
    var _swiper$navigation = swiper.navigation,
      nextEl = _swiper$navigation.nextEl,
      prevEl = _swiper$navigation.prevEl;
    if (prevEl) {
      if (swiper.isBeginning) {
        disableEl(prevEl);
        makeElNotFocusable(prevEl);
      } else {
        enableEl(prevEl);
        makeElFocusable(prevEl);
      }
    }
    if (nextEl) {
      if (swiper.isEnd) {
        disableEl(nextEl);
        makeElNotFocusable(nextEl);
      } else {
        enableEl(nextEl);
        makeElFocusable(nextEl);
      }
    }
  }
  function hasPagination() {
    return swiper.pagination && swiper.pagination.bullets && swiper.pagination.bullets.length;
  }
  function hasClickablePagination() {
    return hasPagination() && swiper.params.pagination.clickable;
  }
  function updatePagination() {
    var params = swiper.params.a11y;
    if (!hasPagination()) return;
    swiper.pagination.bullets.forEach(function (bulletEl) {
      if (swiper.params.pagination.clickable) {
        makeElFocusable(bulletEl);
        if (!swiper.params.pagination.renderBullet) {
          addElRole(bulletEl, 'button');
          addElLabel(bulletEl, params.paginationBulletMessage.replace(/\{\{index\}\}/, (0, _utils.elementIndex)(bulletEl) + 1));
        }
      }
      if (bulletEl.matches((0, _classesToSelector["default"])(swiper.params.pagination.bulletActiveClass))) {
        bulletEl.setAttribute('aria-current', 'true');
      } else {
        bulletEl.removeAttribute('aria-current');
      }
    });
  }
  var initNavEl = function initNavEl(el, wrapperId, message) {
    makeElFocusable(el);
    if (el.tagName !== 'BUTTON') {
      addElRole(el, 'button');
      el.addEventListener('keydown', onEnterOrSpaceKey);
    }
    addElLabel(el, message);
    addElControls(el, wrapperId);
  };
  var handlePointerDown = function handlePointerDown() {
    swiper.a11y.clicked = true;
  };
  var handlePointerUp = function handlePointerUp() {
    requestAnimationFrame(function () {
      requestAnimationFrame(function () {
        if (!swiper.destroyed) {
          swiper.a11y.clicked = false;
        }
      });
    });
  };
  var handleFocus = function handleFocus(e) {
    if (swiper.a11y.clicked) return;
    var slideEl = e.target.closest(".".concat(swiper.params.slideClass, ", swiper-slide"));
    if (!slideEl || !swiper.slides.includes(slideEl)) return;
    var isActive = swiper.slides.indexOf(slideEl) === swiper.activeIndex;
    var isVisible = swiper.params.watchSlidesProgress && swiper.visibleSlides && swiper.visibleSlides.includes(slideEl);
    if (isActive || isVisible) return;
    if (e.sourceCapabilities && e.sourceCapabilities.firesTouchEvents) return;
    if (swiper.isHorizontal()) {
      swiper.el.scrollLeft = 0;
    } else {
      swiper.el.scrollTop = 0;
    }
    swiper.slideTo(swiper.slides.indexOf(slideEl), 0);
  };
  var initSlides = function initSlides() {
    var params = swiper.params.a11y;
    if (params.itemRoleDescriptionMessage) {
      addElRoleDescription(swiper.slides, params.itemRoleDescriptionMessage);
    }
    if (params.slideRole) {
      addElRole(swiper.slides, params.slideRole);
    }
    var slidesLength = swiper.slides.length;
    if (params.slideLabelMessage) {
      swiper.slides.forEach(function (slideEl, index) {
        var slideIndex = swiper.params.loop ? parseInt(slideEl.getAttribute('data-swiper-slide-index'), 10) : index;
        var ariaLabelMessage = params.slideLabelMessage.replace(/\{\{index\}\}/, slideIndex + 1).replace(/\{\{slidesLength\}\}/, slidesLength);
        addElLabel(slideEl, ariaLabelMessage);
      });
    }
  };
  var init = function init() {
    var params = swiper.params.a11y;
    swiper.el.append(liveRegion);

    // Container
    var containerEl = swiper.el;
    if (params.containerRoleDescriptionMessage) {
      addElRoleDescription(containerEl, params.containerRoleDescriptionMessage);
    }
    if (params.containerMessage) {
      addElLabel(containerEl, params.containerMessage);
    }

    // Wrapper
    var wrapperEl = swiper.wrapperEl;
    var wrapperId = params.id || wrapperEl.getAttribute('id') || "swiper-wrapper-".concat(getRandomNumber(16));
    var live = swiper.params.autoplay && swiper.params.autoplay.enabled ? 'off' : 'polite';
    addElId(wrapperEl, wrapperId);
    addElLive(wrapperEl, live);

    // Slide
    initSlides();

    // Navigation
    var _ref2 = swiper.navigation ? swiper.navigation : {},
      nextEl = _ref2.nextEl,
      prevEl = _ref2.prevEl;
    nextEl = makeElementsArray(nextEl);
    prevEl = makeElementsArray(prevEl);
    if (nextEl) {
      nextEl.forEach(function (el) {
        return initNavEl(el, wrapperId, params.nextSlideMessage);
      });
    }
    if (prevEl) {
      prevEl.forEach(function (el) {
        return initNavEl(el, wrapperId, params.prevSlideMessage);
      });
    }

    // Pagination
    if (hasClickablePagination()) {
      var paginationEl = Array.isArray(swiper.pagination.el) ? swiper.pagination.el : [swiper.pagination.el];
      paginationEl.forEach(function (el) {
        el.addEventListener('keydown', onEnterOrSpaceKey);
      });
    }

    // Tab focus
    swiper.el.addEventListener('focus', handleFocus, true);
    swiper.el.addEventListener('pointerdown', handlePointerDown, true);
    swiper.el.addEventListener('pointerup', handlePointerUp, true);
  };
  function destroy() {
    if (liveRegion && liveRegion.length > 0) liveRegion.remove();
    var _ref3 = swiper.navigation ? swiper.navigation : {},
      nextEl = _ref3.nextEl,
      prevEl = _ref3.prevEl;
    nextEl = makeElementsArray(nextEl);
    prevEl = makeElementsArray(prevEl);
    if (nextEl) {
      nextEl.forEach(function (el) {
        return el.removeEventListener('keydown', onEnterOrSpaceKey);
      });
    }
    if (prevEl) {
      prevEl.forEach(function (el) {
        return el.removeEventListener('keydown', onEnterOrSpaceKey);
      });
    }

    // Pagination
    if (hasClickablePagination()) {
      var paginationEl = Array.isArray(swiper.pagination.el) ? swiper.pagination.el : [swiper.pagination.el];
      paginationEl.forEach(function (el) {
        el.removeEventListener('keydown', onEnterOrSpaceKey);
      });
    }

    // Tab focus
    swiper.el.removeEventListener('focus', handleFocus, true);
    swiper.el.removeEventListener('pointerdown', handlePointerDown, true);
    swiper.el.removeEventListener('pointerup', handlePointerUp, true);
  }
  on('beforeInit', function () {
    liveRegion = (0, _utils.createElement)('span', swiper.params.a11y.notificationClass);
    liveRegion.setAttribute('aria-live', 'assertive');
    liveRegion.setAttribute('aria-atomic', 'true');
    if (swiper.isElement) {
      liveRegion.setAttribute('slot', 'container-end');
    }
  });
  on('afterInit', function () {
    if (!swiper.params.a11y.enabled) return;
    init();
  });
  on('slidesLengthChange snapGridLengthChange slidesGridLengthChange', function () {
    if (!swiper.params.a11y.enabled) return;
    initSlides();
  });
  on('fromEdge toEdge afterInit lock unlock', function () {
    if (!swiper.params.a11y.enabled) return;
    updateNavigation();
  });
  on('paginationUpdate', function () {
    if (!swiper.params.a11y.enabled) return;
    updatePagination();
  });
  on('destroy', function () {
    if (!swiper.params.a11y.enabled) return;
    destroy();
  });
}

},{"../../shared/classes-to-selector.js":92,"../../shared/utils.js":102}],65:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = Autoplay;
var _ssrWindow = require("ssr-window");
/* eslint no-underscore-dangle: "off" */
/* eslint no-use-before-define: "off" */

function Autoplay(_ref) {
  var swiper = _ref.swiper,
    extendParams = _ref.extendParams,
    on = _ref.on,
    emit = _ref.emit,
    params = _ref.params;
  swiper.autoplay = {
    running: false,
    paused: false,
    timeLeft: 0
  };
  extendParams({
    autoplay: {
      enabled: false,
      delay: 3000,
      waitForTransition: true,
      disableOnInteraction: true,
      stopOnLastSlide: false,
      reverseDirection: false,
      pauseOnMouseEnter: false
    }
  });
  var timeout;
  var raf;
  var autoplayDelayTotal = params && params.autoplay ? params.autoplay.delay : 3000;
  var autoplayDelayCurrent = params && params.autoplay ? params.autoplay.delay : 3000;
  var autoplayTimeLeft;
  var autoplayStartTime = new Date().getTime;
  var wasPaused;
  var isTouched;
  var pausedByTouch;
  var touchStartTimeout;
  var slideChanged;
  var pausedByInteraction;
  function onTransitionEnd(e) {
    if (!swiper || swiper.destroyed || !swiper.wrapperEl) return;
    if (e.target !== swiper.wrapperEl) return;
    swiper.wrapperEl.removeEventListener('transitionend', onTransitionEnd);
    resume();
  }
  var calcTimeLeft = function calcTimeLeft() {
    if (swiper.destroyed || !swiper.autoplay.running) return;
    if (swiper.autoplay.paused) {
      wasPaused = true;
    } else if (wasPaused) {
      autoplayDelayCurrent = autoplayTimeLeft;
      wasPaused = false;
    }
    var timeLeft = swiper.autoplay.paused ? autoplayTimeLeft : autoplayStartTime + autoplayDelayCurrent - new Date().getTime();
    swiper.autoplay.timeLeft = timeLeft;
    emit('autoplayTimeLeft', timeLeft, timeLeft / autoplayDelayTotal);
    raf = requestAnimationFrame(function () {
      calcTimeLeft();
    });
  };
  var getSlideDelay = function getSlideDelay() {
    var activeSlideEl;
    if (swiper.virtual && swiper.params.virtual.enabled) {
      activeSlideEl = swiper.slides.filter(function (slideEl) {
        return slideEl.classList.contains('swiper-slide-active');
      })[0];
    } else {
      activeSlideEl = swiper.slides[swiper.activeIndex];
    }
    if (!activeSlideEl) return undefined;
    var currentSlideDelay = parseInt(activeSlideEl.getAttribute('data-swiper-autoplay'), 10);
    return currentSlideDelay;
  };
  var run = function run(delayForce) {
    if (swiper.destroyed || !swiper.autoplay.running) return;
    cancelAnimationFrame(raf);
    calcTimeLeft();
    var delay = typeof delayForce === 'undefined' ? swiper.params.autoplay.delay : delayForce;
    autoplayDelayTotal = swiper.params.autoplay.delay;
    autoplayDelayCurrent = swiper.params.autoplay.delay;
    var currentSlideDelay = getSlideDelay();
    if (!Number.isNaN(currentSlideDelay) && currentSlideDelay > 0 && typeof delayForce === 'undefined') {
      delay = currentSlideDelay;
      autoplayDelayTotal = currentSlideDelay;
      autoplayDelayCurrent = currentSlideDelay;
    }
    autoplayTimeLeft = delay;
    var speed = swiper.params.speed;
    var proceed = function proceed() {
      if (!swiper || swiper.destroyed) return;
      if (swiper.params.autoplay.reverseDirection) {
        if (!swiper.isBeginning || swiper.params.loop || swiper.params.rewind) {
          swiper.slidePrev(speed, true, true);
          emit('autoplay');
        } else if (!swiper.params.autoplay.stopOnLastSlide) {
          swiper.slideTo(swiper.slides.length - 1, speed, true, true);
          emit('autoplay');
        }
      } else {
        if (!swiper.isEnd || swiper.params.loop || swiper.params.rewind) {
          swiper.slideNext(speed, true, true);
          emit('autoplay');
        } else if (!swiper.params.autoplay.stopOnLastSlide) {
          swiper.slideTo(0, speed, true, true);
          emit('autoplay');
        }
      }
      if (swiper.params.cssMode) {
        autoplayStartTime = new Date().getTime();
        requestAnimationFrame(function () {
          run();
        });
      }
    };
    if (delay > 0) {
      clearTimeout(timeout);
      timeout = setTimeout(function () {
        proceed();
      }, delay);
    } else {
      requestAnimationFrame(function () {
        proceed();
      });
    }

    // eslint-disable-next-line
    return delay;
  };
  var start = function start() {
    swiper.autoplay.running = true;
    run();
    emit('autoplayStart');
  };
  var stop = function stop() {
    swiper.autoplay.running = false;
    clearTimeout(timeout);
    cancelAnimationFrame(raf);
    emit('autoplayStop');
  };
  var pause = function pause(internal, reset) {
    if (swiper.destroyed || !swiper.autoplay.running) return;
    clearTimeout(timeout);
    if (!internal) {
      pausedByInteraction = true;
    }
    var proceed = function proceed() {
      emit('autoplayPause');
      if (swiper.params.autoplay.waitForTransition) {
        swiper.wrapperEl.addEventListener('transitionend', onTransitionEnd);
      } else {
        resume();
      }
    };
    swiper.autoplay.paused = true;
    if (reset) {
      if (slideChanged) {
        autoplayTimeLeft = swiper.params.autoplay.delay;
      }
      slideChanged = false;
      proceed();
      return;
    }
    var delay = autoplayTimeLeft || swiper.params.autoplay.delay;
    autoplayTimeLeft = delay - (new Date().getTime() - autoplayStartTime);
    if (swiper.isEnd && autoplayTimeLeft < 0 && !swiper.params.loop) return;
    if (autoplayTimeLeft < 0) autoplayTimeLeft = 0;
    proceed();
  };
  var resume = function resume() {
    if (swiper.isEnd && autoplayTimeLeft < 0 && !swiper.params.loop || swiper.destroyed || !swiper.autoplay.running) return;
    autoplayStartTime = new Date().getTime();
    if (pausedByInteraction) {
      pausedByInteraction = false;
      run(autoplayTimeLeft);
    } else {
      run();
    }
    swiper.autoplay.paused = false;
    emit('autoplayResume');
  };
  var onVisibilityChange = function onVisibilityChange() {
    if (swiper.destroyed || !swiper.autoplay.running) return;
    var document = (0, _ssrWindow.getDocument)();
    if (document.visibilityState === 'hidden') {
      pausedByInteraction = true;
      pause(true);
    }
    if (document.visibilityState === 'visible') {
      resume();
    }
  };
  var onPointerEnter = function onPointerEnter(e) {
    if (e.pointerType !== 'mouse') return;
    pausedByInteraction = true;
    pause(true);
  };
  var onPointerLeave = function onPointerLeave(e) {
    if (e.pointerType !== 'mouse') return;
    if (swiper.autoplay.paused) {
      resume();
    }
  };
  var attachMouseEvents = function attachMouseEvents() {
    if (swiper.params.autoplay.pauseOnMouseEnter) {
      swiper.el.addEventListener('pointerenter', onPointerEnter);
      swiper.el.addEventListener('pointerleave', onPointerLeave);
    }
  };
  var detachMouseEvents = function detachMouseEvents() {
    swiper.el.removeEventListener('pointerenter', onPointerEnter);
    swiper.el.removeEventListener('pointerleave', onPointerLeave);
  };
  var attachDocumentEvents = function attachDocumentEvents() {
    var document = (0, _ssrWindow.getDocument)();
    document.addEventListener('visibilitychange', onVisibilityChange);
  };
  var detachDocumentEvents = function detachDocumentEvents() {
    var document = (0, _ssrWindow.getDocument)();
    document.removeEventListener('visibilitychange', onVisibilityChange);
  };
  on('init', function () {
    if (swiper.params.autoplay.enabled) {
      attachMouseEvents();
      attachDocumentEvents();
      autoplayStartTime = new Date().getTime();
      start();
    }
  });
  on('destroy', function () {
    detachMouseEvents();
    detachDocumentEvents();
    if (swiper.autoplay.running) {
      stop();
    }
  });
  on('beforeTransitionStart', function (_s, speed, internal) {
    if (swiper.destroyed || !swiper.autoplay.running) return;
    if (internal || !swiper.params.autoplay.disableOnInteraction) {
      pause(true, true);
    } else {
      stop();
    }
  });
  on('sliderFirstMove', function () {
    if (swiper.destroyed || !swiper.autoplay.running) return;
    if (swiper.params.autoplay.disableOnInteraction) {
      stop();
      return;
    }
    isTouched = true;
    pausedByTouch = false;
    pausedByInteraction = false;
    touchStartTimeout = setTimeout(function () {
      pausedByInteraction = true;
      pausedByTouch = true;
      pause(true);
    }, 200);
  });
  on('touchEnd', function () {
    if (swiper.destroyed || !swiper.autoplay.running || !isTouched) return;
    clearTimeout(touchStartTimeout);
    clearTimeout(timeout);
    if (swiper.params.autoplay.disableOnInteraction) {
      pausedByTouch = false;
      isTouched = false;
      return;
    }
    if (pausedByTouch && swiper.params.cssMode) resume();
    pausedByTouch = false;
    isTouched = false;
  });
  on('slideChange', function () {
    if (swiper.destroyed || !swiper.autoplay.running) return;
    slideChanged = true;
  });
  Object.assign(swiper.autoplay, {
    start: start,
    stop: stop,
    pause: pause,
    resume: resume
  });
}

},{"ssr-window":6}],66:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = Controller;
var _utils = require("../../shared/utils.js");
/* eslint no-bitwise: ["error", { "allow": [">>"] }] */

function Controller(_ref) {
  var swiper = _ref.swiper,
    extendParams = _ref.extendParams,
    on = _ref.on;
  extendParams({
    controller: {
      control: undefined,
      inverse: false,
      by: 'slide' // or 'container'
    }
  });

  swiper.controller = {
    control: undefined
  };
  function LinearSpline(x, y) {
    var binarySearch = function search() {
      var maxIndex;
      var minIndex;
      var guess;
      return function (array, val) {
        minIndex = -1;
        maxIndex = array.length;
        while (maxIndex - minIndex > 1) {
          guess = maxIndex + minIndex >> 1;
          if (array[guess] <= val) {
            minIndex = guess;
          } else {
            maxIndex = guess;
          }
        }
        return maxIndex;
      };
    }();
    this.x = x;
    this.y = y;
    this.lastIndex = x.length - 1;
    // Given an x value (x2), return the expected y2 value:
    // (x1,y1) is the known point before given value,
    // (x3,y3) is the known point after given value.
    var i1;
    var i3;
    this.interpolate = function interpolate(x2) {
      if (!x2) return 0;

      // Get the indexes of x1 and x3 (the array indexes before and after given x2):
      i3 = binarySearch(this.x, x2);
      i1 = i3 - 1;

      // We have our indexes i1 & i3, so we can calculate already:
      // y2 := ((x2−x1) × (y3−y1)) ÷ (x3−x1) + y1
      return (x2 - this.x[i1]) * (this.y[i3] - this.y[i1]) / (this.x[i3] - this.x[i1]) + this.y[i1];
    };
    return this;
  }
  function getInterpolateFunction(c) {
    swiper.controller.spline = swiper.params.loop ? new LinearSpline(swiper.slidesGrid, c.slidesGrid) : new LinearSpline(swiper.snapGrid, c.snapGrid);
  }
  function setTranslate(_t, byController) {
    var controlled = swiper.controller.control;
    var multiplier;
    var controlledTranslate;
    var Swiper = swiper.constructor;
    function setControlledTranslate(c) {
      if (c.destroyed) return;

      // this will create an Interpolate function based on the snapGrids
      // x is the Grid of the scrolled scroller and y will be the controlled scroller
      // it makes sense to create this only once and recall it for the interpolation
      // the function does a lot of value caching for performance
      var translate = swiper.rtlTranslate ? -swiper.translate : swiper.translate;
      if (swiper.params.controller.by === 'slide') {
        getInterpolateFunction(c);
        // i am not sure why the values have to be multiplicated this way, tried to invert the snapGrid
        // but it did not work out
        controlledTranslate = -swiper.controller.spline.interpolate(-translate);
      }
      if (!controlledTranslate || swiper.params.controller.by === 'container') {
        multiplier = (c.maxTranslate() - c.minTranslate()) / (swiper.maxTranslate() - swiper.minTranslate());
        if (Number.isNaN(multiplier) || !Number.isFinite(multiplier)) {
          multiplier = 1;
        }
        controlledTranslate = (translate - swiper.minTranslate()) * multiplier + c.minTranslate();
      }
      if (swiper.params.controller.inverse) {
        controlledTranslate = c.maxTranslate() - controlledTranslate;
      }
      c.updateProgress(controlledTranslate);
      c.setTranslate(controlledTranslate, swiper);
      c.updateActiveIndex();
      c.updateSlidesClasses();
    }
    if (Array.isArray(controlled)) {
      for (var i = 0; i < controlled.length; i += 1) {
        if (controlled[i] !== byController && controlled[i] instanceof Swiper) {
          setControlledTranslate(controlled[i]);
        }
      }
    } else if (controlled instanceof Swiper && byController !== controlled) {
      setControlledTranslate(controlled);
    }
  }
  function setTransition(duration, byController) {
    var Swiper = swiper.constructor;
    var controlled = swiper.controller.control;
    var i;
    function setControlledTransition(c) {
      if (c.destroyed) return;
      c.setTransition(duration, swiper);
      if (duration !== 0) {
        c.transitionStart();
        if (c.params.autoHeight) {
          (0, _utils.nextTick)(function () {
            c.updateAutoHeight();
          });
        }
        (0, _utils.elementTransitionEnd)(c.wrapperEl, function () {
          if (!controlled) return;
          c.transitionEnd();
        });
      }
    }
    if (Array.isArray(controlled)) {
      for (i = 0; i < controlled.length; i += 1) {
        if (controlled[i] !== byController && controlled[i] instanceof Swiper) {
          setControlledTransition(controlled[i]);
        }
      }
    } else if (controlled instanceof Swiper && byController !== controlled) {
      setControlledTransition(controlled);
    }
  }
  function removeSpline() {
    if (!swiper.controller.control) return;
    if (swiper.controller.spline) {
      swiper.controller.spline = undefined;
      delete swiper.controller.spline;
    }
  }
  on('beforeInit', function () {
    if (typeof window !== 'undefined' && (
    // eslint-disable-line
    typeof swiper.params.controller.control === 'string' || swiper.params.controller.control instanceof HTMLElement)) {
      var controlElement = document.querySelector(swiper.params.controller.control);
      if (controlElement && controlElement.swiper) {
        swiper.controller.control = controlElement.swiper;
      } else if (controlElement) {
        var onControllerSwiper = function onControllerSwiper(e) {
          swiper.controller.control = e.detail[0];
          swiper.update();
          controlElement.removeEventListener('init', onControllerSwiper);
        };
        controlElement.addEventListener('init', onControllerSwiper);
      }
      return;
    }
    swiper.controller.control = swiper.params.controller.control;
  });
  on('update', function () {
    removeSpline();
  });
  on('resize', function () {
    removeSpline();
  });
  on('observerUpdate', function () {
    removeSpline();
  });
  on('setTranslate', function (_s, translate, byController) {
    if (!swiper.controller.control || swiper.controller.control.destroyed) return;
    swiper.controller.setTranslate(translate, byController);
  });
  on('setTransition', function (_s, duration, byController) {
    if (!swiper.controller.control || swiper.controller.control.destroyed) return;
    swiper.controller.setTransition(duration, byController);
  });
  Object.assign(swiper.controller, {
    setTranslate: setTranslate,
    setTransition: setTransition
  });
}

},{"../../shared/utils.js":102}],67:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = EffectCards;
var _createShadow = _interopRequireDefault(require("../../shared/create-shadow.js"));
var _effectInit = _interopRequireDefault(require("../../shared/effect-init.js"));
var _effectTarget = _interopRequireDefault(require("../../shared/effect-target.js"));
var _effectVirtualTransitionEnd = _interopRequireDefault(require("../../shared/effect-virtual-transition-end.js"));
var _utils = require("../../shared/utils.js");
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }
function EffectCards(_ref) {
  var swiper = _ref.swiper,
    extendParams = _ref.extendParams,
    on = _ref.on;
  extendParams({
    cardsEffect: {
      slideShadows: true,
      rotate: true,
      perSlideRotate: 2,
      perSlideOffset: 8
    }
  });
  var setTranslate = function setTranslate() {
    var slides = swiper.slides,
      activeIndex = swiper.activeIndex;
    var params = swiper.params.cardsEffect;
    var _swiper$touchEventsDa = swiper.touchEventsData,
      startTranslate = _swiper$touchEventsDa.startTranslate,
      isTouched = _swiper$touchEventsDa.isTouched;
    var currentTranslate = swiper.translate;
    for (var i = 0; i < slides.length; i += 1) {
      var slideEl = slides[i];
      var slideProgress = slideEl.progress;
      var progress = Math.min(Math.max(slideProgress, -4), 4);
      var offset = slideEl.swiperSlideOffset;
      if (swiper.params.centeredSlides && !swiper.params.cssMode) {
        swiper.wrapperEl.style.transform = "translateX(".concat(swiper.minTranslate(), "px)");
      }
      if (swiper.params.centeredSlides && swiper.params.cssMode) {
        offset -= slides[0].swiperSlideOffset;
      }
      var tX = swiper.params.cssMode ? -offset - swiper.translate : -offset;
      var tY = 0;
      var tZ = -100 * Math.abs(progress);
      var scale = 1;
      var rotate = -params.perSlideRotate * progress;
      var tXAdd = params.perSlideOffset - Math.abs(progress) * 0.75;
      var slideIndex = swiper.virtual && swiper.params.virtual.enabled ? swiper.virtual.from + i : i;
      var isSwipeToNext = (slideIndex === activeIndex || slideIndex === activeIndex - 1) && progress > 0 && progress < 1 && (isTouched || swiper.params.cssMode) && currentTranslate < startTranslate;
      var isSwipeToPrev = (slideIndex === activeIndex || slideIndex === activeIndex + 1) && progress < 0 && progress > -1 && (isTouched || swiper.params.cssMode) && currentTranslate > startTranslate;
      if (isSwipeToNext || isSwipeToPrev) {
        var subProgress = Math.pow(1 - Math.abs((Math.abs(progress) - 0.5) / 0.5), 0.5);
        rotate += -28 * progress * subProgress;
        scale += -0.5 * subProgress;
        tXAdd += 96 * subProgress;
        tY = "".concat(-25 * subProgress * Math.abs(progress), "%");
      }
      if (progress < 0) {
        // next
        tX = "calc(".concat(tX, "px + (").concat(tXAdd * Math.abs(progress), "%))");
      } else if (progress > 0) {
        // prev
        tX = "calc(".concat(tX, "px + (-").concat(tXAdd * Math.abs(progress), "%))");
      } else {
        tX = "".concat(tX, "px");
      }
      if (!swiper.isHorizontal()) {
        var prevY = tY;
        tY = tX;
        tX = prevY;
      }
      var scaleString = progress < 0 ? "".concat(1 + (1 - scale) * progress) : "".concat(1 - (1 - scale) * progress);
      var transform = "\n        translate3d(".concat(tX, ", ").concat(tY, ", ").concat(tZ, "px)\n        rotateZ(").concat(params.rotate ? rotate : 0, "deg)\n        scale(").concat(scaleString, ")\n      ");
      if (params.slideShadows) {
        // Set shadows
        var shadowEl = slideEl.querySelector('.swiper-slide-shadow');
        if (!shadowEl) {
          shadowEl = (0, _createShadow["default"])(params, slideEl);
        }
        if (shadowEl) shadowEl.style.opacity = Math.min(Math.max((Math.abs(progress) - 0.5) / 0.5, 0), 1);
      }
      slideEl.style.zIndex = -Math.abs(Math.round(slideProgress)) + slides.length;
      var targetEl = (0, _effectTarget["default"])(params, slideEl);
      targetEl.style.transform = transform;
    }
  };
  var setTransition = function setTransition(duration) {
    var transformElements = swiper.slides.map(function (slideEl) {
      return (0, _utils.getSlideTransformEl)(slideEl);
    });
    transformElements.forEach(function (el) {
      el.style.transitionDuration = "".concat(duration, "ms");
      el.querySelectorAll('.swiper-slide-shadow').forEach(function (shadowEl) {
        shadowEl.style.transitionDuration = "".concat(duration, "ms");
      });
    });
    (0, _effectVirtualTransitionEnd["default"])({
      swiper: swiper,
      duration: duration,
      transformElements: transformElements
    });
  };
  (0, _effectInit["default"])({
    effect: 'cards',
    swiper: swiper,
    on: on,
    setTranslate: setTranslate,
    setTransition: setTransition,
    perspective: function perspective() {
      return true;
    },
    overwriteParams: function overwriteParams() {
      return {
        watchSlidesProgress: true,
        virtualTranslate: !swiper.params.cssMode
      };
    }
  });
}

},{"../../shared/create-shadow.js":94,"../../shared/effect-init.js":95,"../../shared/effect-target.js":96,"../../shared/effect-virtual-transition-end.js":97,"../../shared/utils.js":102}],68:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = EffectCoverflow;
var _createShadow = _interopRequireDefault(require("../../shared/create-shadow.js"));
var _effectInit = _interopRequireDefault(require("../../shared/effect-init.js"));
var _effectTarget = _interopRequireDefault(require("../../shared/effect-target.js"));
var _utils = require("../../shared/utils.js");
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }
function EffectCoverflow(_ref) {
  var swiper = _ref.swiper,
    extendParams = _ref.extendParams,
    on = _ref.on;
  extendParams({
    coverflowEffect: {
      rotate: 50,
      stretch: 0,
      depth: 100,
      scale: 1,
      modifier: 1,
      slideShadows: true
    }
  });
  var setTranslate = function setTranslate() {
    var swiperWidth = swiper.width,
      swiperHeight = swiper.height,
      slides = swiper.slides,
      slidesSizesGrid = swiper.slidesSizesGrid;
    var params = swiper.params.coverflowEffect;
    var isHorizontal = swiper.isHorizontal();
    var transform = swiper.translate;
    var center = isHorizontal ? -transform + swiperWidth / 2 : -transform + swiperHeight / 2;
    var rotate = isHorizontal ? params.rotate : -params.rotate;
    var translate = params.depth;
    // Each slide offset from center
    for (var i = 0, length = slides.length; i < length; i += 1) {
      var slideEl = slides[i];
      var slideSize = slidesSizesGrid[i];
      var slideOffset = slideEl.swiperSlideOffset;
      var centerOffset = (center - slideOffset - slideSize / 2) / slideSize;
      var offsetMultiplier = typeof params.modifier === 'function' ? params.modifier(centerOffset) : centerOffset * params.modifier;
      var rotateY = isHorizontal ? rotate * offsetMultiplier : 0;
      var rotateX = isHorizontal ? 0 : rotate * offsetMultiplier;
      // var rotateZ = 0
      var translateZ = -translate * Math.abs(offsetMultiplier);
      var stretch = params.stretch;
      // Allow percentage to make a relative stretch for responsive sliders
      if (typeof stretch === 'string' && stretch.indexOf('%') !== -1) {
        stretch = parseFloat(params.stretch) / 100 * slideSize;
      }
      var translateY = isHorizontal ? 0 : stretch * offsetMultiplier;
      var translateX = isHorizontal ? stretch * offsetMultiplier : 0;
      var scale = 1 - (1 - params.scale) * Math.abs(offsetMultiplier);

      // Fix for ultra small values
      if (Math.abs(translateX) < 0.001) translateX = 0;
      if (Math.abs(translateY) < 0.001) translateY = 0;
      if (Math.abs(translateZ) < 0.001) translateZ = 0;
      if (Math.abs(rotateY) < 0.001) rotateY = 0;
      if (Math.abs(rotateX) < 0.001) rotateX = 0;
      if (Math.abs(scale) < 0.001) scale = 0;
      var slideTransform = "translate3d(".concat(translateX, "px,").concat(translateY, "px,").concat(translateZ, "px)  rotateX(").concat(rotateX, "deg) rotateY(").concat(rotateY, "deg) scale(").concat(scale, ")");
      var targetEl = (0, _effectTarget["default"])(params, slideEl);
      targetEl.style.transform = slideTransform;
      slideEl.style.zIndex = -Math.abs(Math.round(offsetMultiplier)) + 1;
      if (params.slideShadows) {
        // Set shadows
        var shadowBeforeEl = isHorizontal ? slideEl.querySelector('.swiper-slide-shadow-left') : slideEl.querySelector('.swiper-slide-shadow-top');
        var shadowAfterEl = isHorizontal ? slideEl.querySelector('.swiper-slide-shadow-right') : slideEl.querySelector('.swiper-slide-shadow-bottom');
        if (!shadowBeforeEl) {
          shadowBeforeEl = (0, _createShadow["default"])(params, slideEl, isHorizontal ? 'left' : 'top');
        }
        if (!shadowAfterEl) {
          shadowAfterEl = (0, _createShadow["default"])(params, slideEl, isHorizontal ? 'right' : 'bottom');
        }
        if (shadowBeforeEl) shadowBeforeEl.style.opacity = offsetMultiplier > 0 ? offsetMultiplier : 0;
        if (shadowAfterEl) shadowAfterEl.style.opacity = -offsetMultiplier > 0 ? -offsetMultiplier : 0;
      }
    }
  };
  var setTransition = function setTransition(duration) {
    var transformElements = swiper.slides.map(function (slideEl) {
      return (0, _utils.getSlideTransformEl)(slideEl);
    });
    transformElements.forEach(function (el) {
      el.style.transitionDuration = "".concat(duration, "ms");
      el.querySelectorAll('.swiper-slide-shadow-top, .swiper-slide-shadow-right, .swiper-slide-shadow-bottom, .swiper-slide-shadow-left').forEach(function (shadowEl) {
        shadowEl.style.transitionDuration = "".concat(duration, "ms");
      });
    });
  };
  (0, _effectInit["default"])({
    effect: 'coverflow',
    swiper: swiper,
    on: on,
    setTranslate: setTranslate,
    setTransition: setTransition,
    perspective: function perspective() {
      return true;
    },
    overwriteParams: function overwriteParams() {
      return {
        watchSlidesProgress: true
      };
    }
  });
}

},{"../../shared/create-shadow.js":94,"../../shared/effect-init.js":95,"../../shared/effect-target.js":96,"../../shared/utils.js":102}],69:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = EffectCreative;
var _createShadow = _interopRequireDefault(require("../../shared/create-shadow.js"));
var _effectInit = _interopRequireDefault(require("../../shared/effect-init.js"));
var _effectTarget = _interopRequireDefault(require("../../shared/effect-target.js"));
var _effectVirtualTransitionEnd = _interopRequireDefault(require("../../shared/effect-virtual-transition-end.js"));
var _utils = require("../../shared/utils.js");
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }
function EffectCreative(_ref) {
  var swiper = _ref.swiper,
    extendParams = _ref.extendParams,
    on = _ref.on;
  extendParams({
    creativeEffect: {
      limitProgress: 1,
      shadowPerProgress: false,
      progressMultiplier: 1,
      perspective: true,
      prev: {
        translate: [0, 0, 0],
        rotate: [0, 0, 0],
        opacity: 1,
        scale: 1
      },
      next: {
        translate: [0, 0, 0],
        rotate: [0, 0, 0],
        opacity: 1,
        scale: 1
      }
    }
  });
  var getTranslateValue = function getTranslateValue(value) {
    if (typeof value === 'string') return value;
    return "".concat(value, "px");
  };
  var setTranslate = function setTranslate() {
    var slides = swiper.slides,
      wrapperEl = swiper.wrapperEl,
      slidesSizesGrid = swiper.slidesSizesGrid;
    var params = swiper.params.creativeEffect;
    var multiplier = params.progressMultiplier;
    var isCenteredSlides = swiper.params.centeredSlides;
    if (isCenteredSlides) {
      var margin = slidesSizesGrid[0] / 2 - swiper.params.slidesOffsetBefore || 0;
      wrapperEl.style.transform = "translateX(calc(50% - ".concat(margin, "px))");
    }
    var _loop = function _loop() {
      var slideEl = slides[i];
      var slideProgress = slideEl.progress;
      var progress = Math.min(Math.max(slideEl.progress, -params.limitProgress), params.limitProgress);
      var originalProgress = progress;
      if (!isCenteredSlides) {
        originalProgress = Math.min(Math.max(slideEl.originalProgress, -params.limitProgress), params.limitProgress);
      }
      var offset = slideEl.swiperSlideOffset;
      var t = [swiper.params.cssMode ? -offset - swiper.translate : -offset, 0, 0];
      var r = [0, 0, 0];
      var custom = false;
      if (!swiper.isHorizontal()) {
        t[1] = t[0];
        t[0] = 0;
      }
      var data = {
        translate: [0, 0, 0],
        rotate: [0, 0, 0],
        scale: 1,
        opacity: 1
      };
      if (progress < 0) {
        data = params.next;
        custom = true;
      } else if (progress > 0) {
        data = params.prev;
        custom = true;
      }
      // set translate
      t.forEach(function (value, index) {
        t[index] = "calc(".concat(value, "px + (").concat(getTranslateValue(data.translate[index]), " * ").concat(Math.abs(progress * multiplier), "))");
      });
      // set rotates
      r.forEach(function (value, index) {
        r[index] = data.rotate[index] * Math.abs(progress * multiplier);
      });
      slideEl.style.zIndex = -Math.abs(Math.round(slideProgress)) + slides.length;
      var translateString = t.join(', ');
      var rotateString = "rotateX(".concat(r[0], "deg) rotateY(").concat(r[1], "deg) rotateZ(").concat(r[2], "deg)");
      var scaleString = originalProgress < 0 ? "scale(".concat(1 + (1 - data.scale) * originalProgress * multiplier, ")") : "scale(".concat(1 - (1 - data.scale) * originalProgress * multiplier, ")");
      var opacityString = originalProgress < 0 ? 1 + (1 - data.opacity) * originalProgress * multiplier : 1 - (1 - data.opacity) * originalProgress * multiplier;
      var transform = "translate3d(".concat(translateString, ") ").concat(rotateString, " ").concat(scaleString);

      // Set shadows
      if (custom && data.shadow || !custom) {
        var shadowEl = slideEl.querySelector('.swiper-slide-shadow');
        if (!shadowEl && data.shadow) {
          shadowEl = (0, _createShadow["default"])(params, slideEl);
        }
        if (shadowEl) {
          var shadowOpacity = params.shadowPerProgress ? progress * (1 / params.limitProgress) : progress;
          shadowEl.style.opacity = Math.min(Math.max(Math.abs(shadowOpacity), 0), 1);
        }
      }
      var targetEl = (0, _effectTarget["default"])(params, slideEl);
      targetEl.style.transform = transform;
      targetEl.style.opacity = opacityString;
      if (data.origin) {
        targetEl.style.transformOrigin = data.origin;
      }
    };
    for (var i = 0; i < slides.length; i += 1) {
      _loop();
    }
  };
  var setTransition = function setTransition(duration) {
    var transformElements = swiper.slides.map(function (slideEl) {
      return (0, _utils.getSlideTransformEl)(slideEl);
    });
    transformElements.forEach(function (el) {
      el.style.transitionDuration = "".concat(duration, "ms");
      el.querySelectorAll('.swiper-slide-shadow').forEach(function (shadowEl) {
        shadowEl.style.transitionDuration = "".concat(duration, "ms");
      });
    });
    (0, _effectVirtualTransitionEnd["default"])({
      swiper: swiper,
      duration: duration,
      transformElements: transformElements,
      allSlides: true
    });
  };
  (0, _effectInit["default"])({
    effect: 'creative',
    swiper: swiper,
    on: on,
    setTranslate: setTranslate,
    setTransition: setTransition,
    perspective: function perspective() {
      return swiper.params.creativeEffect.perspective;
    },
    overwriteParams: function overwriteParams() {
      return {
        watchSlidesProgress: true,
        virtualTranslate: !swiper.params.cssMode
      };
    }
  });
}

},{"../../shared/create-shadow.js":94,"../../shared/effect-init.js":95,"../../shared/effect-target.js":96,"../../shared/effect-virtual-transition-end.js":97,"../../shared/utils.js":102}],70:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = EffectCube;
var _effectInit = _interopRequireDefault(require("../../shared/effect-init.js"));
var _utils = require("../../shared/utils.js");
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }
function EffectCube(_ref) {
  var swiper = _ref.swiper,
    extendParams = _ref.extendParams,
    on = _ref.on;
  extendParams({
    cubeEffect: {
      slideShadows: true,
      shadow: true,
      shadowOffset: 20,
      shadowScale: 0.94
    }
  });
  var createSlideShadows = function createSlideShadows(slideEl, progress, isHorizontal) {
    var shadowBefore = isHorizontal ? slideEl.querySelector('.swiper-slide-shadow-left') : slideEl.querySelector('.swiper-slide-shadow-top');
    var shadowAfter = isHorizontal ? slideEl.querySelector('.swiper-slide-shadow-right') : slideEl.querySelector('.swiper-slide-shadow-bottom');
    if (!shadowBefore) {
      shadowBefore = (0, _utils.createElement)('div', "swiper-slide-shadow-".concat(isHorizontal ? 'left' : 'top'));
      slideEl.append(shadowBefore);
    }
    if (!shadowAfter) {
      shadowAfter = (0, _utils.createElement)('div', "swiper-slide-shadow-".concat(isHorizontal ? 'right' : 'bottom'));
      slideEl.append(shadowAfter);
    }
    if (shadowBefore) shadowBefore.style.opacity = Math.max(-progress, 0);
    if (shadowAfter) shadowAfter.style.opacity = Math.max(progress, 0);
  };
  var recreateShadows = function recreateShadows() {
    // create new ones
    var isHorizontal = swiper.isHorizontal();
    swiper.slides.forEach(function (slideEl) {
      var progress = Math.max(Math.min(slideEl.progress, 1), -1);
      createSlideShadows(slideEl, progress, isHorizontal);
    });
  };
  var setTranslate = function setTranslate() {
    var el = swiper.el,
      wrapperEl = swiper.wrapperEl,
      slides = swiper.slides,
      swiperWidth = swiper.width,
      swiperHeight = swiper.height,
      rtl = swiper.rtlTranslate,
      swiperSize = swiper.size,
      browser = swiper.browser;
    var params = swiper.params.cubeEffect;
    var isHorizontal = swiper.isHorizontal();
    var isVirtual = swiper.virtual && swiper.params.virtual.enabled;
    var wrapperRotate = 0;
    var cubeShadowEl;
    if (params.shadow) {
      if (isHorizontal) {
        cubeShadowEl = swiper.slidesEl.querySelector('.swiper-cube-shadow');
        if (!cubeShadowEl) {
          cubeShadowEl = (0, _utils.createElement)('div', 'swiper-cube-shadow');
          swiper.slidesEl.append(cubeShadowEl);
        }
        cubeShadowEl.style.height = "".concat(swiperWidth, "px");
      } else {
        cubeShadowEl = el.querySelector('.swiper-cube-shadow');
        if (!cubeShadowEl) {
          cubeShadowEl = (0, _utils.createElement)('div', 'swiper-cube-shadow');
          el.append(cubeShadowEl);
        }
      }
    }
    for (var i = 0; i < slides.length; i += 1) {
      var slideEl = slides[i];
      var slideIndex = i;
      if (isVirtual) {
        slideIndex = parseInt(slideEl.getAttribute('data-swiper-slide-index'), 10);
      }
      var slideAngle = slideIndex * 90;
      var round = Math.floor(slideAngle / 360);
      if (rtl) {
        slideAngle = -slideAngle;
        round = Math.floor(-slideAngle / 360);
      }
      var progress = Math.max(Math.min(slideEl.progress, 1), -1);
      var tx = 0;
      var ty = 0;
      var tz = 0;
      if (slideIndex % 4 === 0) {
        tx = -round * 4 * swiperSize;
        tz = 0;
      } else if ((slideIndex - 1) % 4 === 0) {
        tx = 0;
        tz = -round * 4 * swiperSize;
      } else if ((slideIndex - 2) % 4 === 0) {
        tx = swiperSize + round * 4 * swiperSize;
        tz = swiperSize;
      } else if ((slideIndex - 3) % 4 === 0) {
        tx = -swiperSize;
        tz = 3 * swiperSize + swiperSize * 4 * round;
      }
      if (rtl) {
        tx = -tx;
      }
      if (!isHorizontal) {
        ty = tx;
        tx = 0;
      }
      var transform = "rotateX(".concat(isHorizontal ? 0 : -slideAngle, "deg) rotateY(").concat(isHorizontal ? slideAngle : 0, "deg) translate3d(").concat(tx, "px, ").concat(ty, "px, ").concat(tz, "px)");
      if (progress <= 1 && progress > -1) {
        wrapperRotate = slideIndex * 90 + progress * 90;
        if (rtl) wrapperRotate = -slideIndex * 90 - progress * 90;
      }
      slideEl.style.transform = transform;
      if (params.slideShadows) {
        createSlideShadows(slideEl, progress, isHorizontal);
      }
    }
    wrapperEl.style.transformOrigin = "50% 50% -".concat(swiperSize / 2, "px");
    wrapperEl.style['-webkit-transform-origin'] = "50% 50% -".concat(swiperSize / 2, "px");
    if (params.shadow) {
      if (isHorizontal) {
        cubeShadowEl.style.transform = "translate3d(0px, ".concat(swiperWidth / 2 + params.shadowOffset, "px, ").concat(-swiperWidth / 2, "px) rotateX(90deg) rotateZ(0deg) scale(").concat(params.shadowScale, ")");
      } else {
        var shadowAngle = Math.abs(wrapperRotate) - Math.floor(Math.abs(wrapperRotate) / 90) * 90;
        var multiplier = 1.5 - (Math.sin(shadowAngle * 2 * Math.PI / 360) / 2 + Math.cos(shadowAngle * 2 * Math.PI / 360) / 2);
        var scale1 = params.shadowScale;
        var scale2 = params.shadowScale / multiplier;
        var offset = params.shadowOffset;
        cubeShadowEl.style.transform = "scale3d(".concat(scale1, ", 1, ").concat(scale2, ") translate3d(0px, ").concat(swiperHeight / 2 + offset, "px, ").concat(-swiperHeight / 2 / scale2, "px) rotateX(-90deg)");
      }
    }
    var zFactor = (browser.isSafari || browser.isWebView) && browser.needPerspectiveFix ? -swiperSize / 2 : 0;
    wrapperEl.style.transform = "translate3d(0px,0,".concat(zFactor, "px) rotateX(").concat(swiper.isHorizontal() ? 0 : wrapperRotate, "deg) rotateY(").concat(swiper.isHorizontal() ? -wrapperRotate : 0, "deg)");
    wrapperEl.style.setProperty('--swiper-cube-translate-z', "".concat(zFactor, "px"));
  };
  var setTransition = function setTransition(duration) {
    var el = swiper.el,
      slides = swiper.slides;
    slides.forEach(function (slideEl) {
      slideEl.style.transitionDuration = "".concat(duration, "ms");
      slideEl.querySelectorAll('.swiper-slide-shadow-top, .swiper-slide-shadow-right, .swiper-slide-shadow-bottom, .swiper-slide-shadow-left').forEach(function (subEl) {
        subEl.style.transitionDuration = "".concat(duration, "ms");
      });
    });
    if (swiper.params.cubeEffect.shadow && !swiper.isHorizontal()) {
      var shadowEl = el.querySelector('.swiper-cube-shadow');
      if (shadowEl) shadowEl.style.transitionDuration = "".concat(duration, "ms");
    }
  };
  (0, _effectInit["default"])({
    effect: 'cube',
    swiper: swiper,
    on: on,
    setTranslate: setTranslate,
    setTransition: setTransition,
    recreateShadows: recreateShadows,
    getEffectParams: function getEffectParams() {
      return swiper.params.cubeEffect;
    },
    perspective: function perspective() {
      return true;
    },
    overwriteParams: function overwriteParams() {
      return {
        slidesPerView: 1,
        slidesPerGroup: 1,
        watchSlidesProgress: true,
        resistanceRatio: 0,
        spaceBetween: 0,
        centeredSlides: false,
        virtualTranslate: true
      };
    }
  });
}

},{"../../shared/effect-init.js":95,"../../shared/utils.js":102}],71:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = EffectFade;
var _effectInit = _interopRequireDefault(require("../../shared/effect-init.js"));
var _effectTarget = _interopRequireDefault(require("../../shared/effect-target.js"));
var _effectVirtualTransitionEnd = _interopRequireDefault(require("../../shared/effect-virtual-transition-end.js"));
var _utils = require("../../shared/utils.js");
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }
function EffectFade(_ref) {
  var swiper = _ref.swiper,
    extendParams = _ref.extendParams,
    on = _ref.on;
  extendParams({
    fadeEffect: {
      crossFade: false
    }
  });
  var setTranslate = function setTranslate() {
    var slides = swiper.slides;
    var params = swiper.params.fadeEffect;
    for (var i = 0; i < slides.length; i += 1) {
      var slideEl = swiper.slides[i];
      var offset = slideEl.swiperSlideOffset;
      var tx = -offset;
      if (!swiper.params.virtualTranslate) tx -= swiper.translate;
      var ty = 0;
      if (!swiper.isHorizontal()) {
        ty = tx;
        tx = 0;
      }
      var slideOpacity = swiper.params.fadeEffect.crossFade ? Math.max(1 - Math.abs(slideEl.progress), 0) : 1 + Math.min(Math.max(slideEl.progress, -1), 0);
      var targetEl = (0, _effectTarget["default"])(params, slideEl);
      targetEl.style.opacity = slideOpacity;
      targetEl.style.transform = "translate3d(".concat(tx, "px, ").concat(ty, "px, 0px)");
    }
  };
  var setTransition = function setTransition(duration) {
    var transformElements = swiper.slides.map(function (slideEl) {
      return (0, _utils.getSlideTransformEl)(slideEl);
    });
    transformElements.forEach(function (el) {
      el.style.transitionDuration = "".concat(duration, "ms");
    });
    (0, _effectVirtualTransitionEnd["default"])({
      swiper: swiper,
      duration: duration,
      transformElements: transformElements,
      allSlides: true
    });
  };
  (0, _effectInit["default"])({
    effect: 'fade',
    swiper: swiper,
    on: on,
    setTranslate: setTranslate,
    setTransition: setTransition,
    overwriteParams: function overwriteParams() {
      return {
        slidesPerView: 1,
        slidesPerGroup: 1,
        watchSlidesProgress: true,
        spaceBetween: 0,
        virtualTranslate: !swiper.params.cssMode
      };
    }
  });
}

},{"../../shared/effect-init.js":95,"../../shared/effect-target.js":96,"../../shared/effect-virtual-transition-end.js":97,"../../shared/utils.js":102}],72:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = EffectFlip;
var _createShadow = _interopRequireDefault(require("../../shared/create-shadow.js"));
var _effectInit = _interopRequireDefault(require("../../shared/effect-init.js"));
var _effectTarget = _interopRequireDefault(require("../../shared/effect-target.js"));
var _effectVirtualTransitionEnd = _interopRequireDefault(require("../../shared/effect-virtual-transition-end.js"));
var _utils = require("../../shared/utils.js");
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }
function EffectFlip(_ref) {
  var swiper = _ref.swiper,
    extendParams = _ref.extendParams,
    on = _ref.on;
  extendParams({
    flipEffect: {
      slideShadows: true,
      limitRotation: true
    }
  });
  var createSlideShadows = function createSlideShadows(slideEl, progress, params) {
    var shadowBefore = swiper.isHorizontal() ? slideEl.querySelector('.swiper-slide-shadow-left') : slideEl.querySelector('.swiper-slide-shadow-top');
    var shadowAfter = swiper.isHorizontal() ? slideEl.querySelector('.swiper-slide-shadow-right') : slideEl.querySelector('.swiper-slide-shadow-bottom');
    if (!shadowBefore) {
      shadowBefore = (0, _createShadow["default"])(params, slideEl, swiper.isHorizontal() ? 'left' : 'top');
    }
    if (!shadowAfter) {
      shadowAfter = (0, _createShadow["default"])(params, slideEl, swiper.isHorizontal() ? 'right' : 'bottom');
    }
    if (shadowBefore) shadowBefore.style.opacity = Math.max(-progress, 0);
    if (shadowAfter) shadowAfter.style.opacity = Math.max(progress, 0);
  };
  var recreateShadows = function recreateShadows() {
    // Set shadows
    var params = swiper.params.flipEffect;
    swiper.slides.forEach(function (slideEl) {
      var progress = slideEl.progress;
      if (swiper.params.flipEffect.limitRotation) {
        progress = Math.max(Math.min(slideEl.progress, 1), -1);
      }
      createSlideShadows(slideEl, progress, params);
    });
  };
  var setTranslate = function setTranslate() {
    var slides = swiper.slides,
      rtl = swiper.rtlTranslate;
    var params = swiper.params.flipEffect;
    for (var i = 0; i < slides.length; i += 1) {
      var slideEl = slides[i];
      var progress = slideEl.progress;
      if (swiper.params.flipEffect.limitRotation) {
        progress = Math.max(Math.min(slideEl.progress, 1), -1);
      }
      var offset = slideEl.swiperSlideOffset;
      var rotate = -180 * progress;
      var rotateY = rotate;
      var rotateX = 0;
      var tx = swiper.params.cssMode ? -offset - swiper.translate : -offset;
      var ty = 0;
      if (!swiper.isHorizontal()) {
        ty = tx;
        tx = 0;
        rotateX = -rotateY;
        rotateY = 0;
      } else if (rtl) {
        rotateY = -rotateY;
      }
      slideEl.style.zIndex = -Math.abs(Math.round(progress)) + slides.length;
      if (params.slideShadows) {
        createSlideShadows(slideEl, progress, params);
      }
      var transform = "translate3d(".concat(tx, "px, ").concat(ty, "px, 0px) rotateX(").concat(rotateX, "deg) rotateY(").concat(rotateY, "deg)");
      var targetEl = (0, _effectTarget["default"])(params, slideEl);
      targetEl.style.transform = transform;
    }
  };
  var setTransition = function setTransition(duration) {
    var transformElements = swiper.slides.map(function (slideEl) {
      return (0, _utils.getSlideTransformEl)(slideEl);
    });
    transformElements.forEach(function (el) {
      el.style.transitionDuration = "".concat(duration, "ms");
      el.querySelectorAll('.swiper-slide-shadow-top, .swiper-slide-shadow-right, .swiper-slide-shadow-bottom, .swiper-slide-shadow-left').forEach(function (shadowEl) {
        shadowEl.style.transitionDuration = "".concat(duration, "ms");
      });
    });
    (0, _effectVirtualTransitionEnd["default"])({
      swiper: swiper,
      duration: duration,
      transformElements: transformElements
    });
  };
  (0, _effectInit["default"])({
    effect: 'flip',
    swiper: swiper,
    on: on,
    setTranslate: setTranslate,
    setTransition: setTransition,
    recreateShadows: recreateShadows,
    getEffectParams: function getEffectParams() {
      return swiper.params.flipEffect;
    },
    perspective: function perspective() {
      return true;
    },
    overwriteParams: function overwriteParams() {
      return {
        slidesPerView: 1,
        slidesPerGroup: 1,
        watchSlidesProgress: true,
        spaceBetween: 0,
        virtualTranslate: !swiper.params.cssMode
      };
    }
  });
}

},{"../../shared/create-shadow.js":94,"../../shared/effect-init.js":95,"../../shared/effect-target.js":96,"../../shared/effect-virtual-transition-end.js":97,"../../shared/utils.js":102}],73:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = freeMode;
var _utils = require("../../shared/utils.js");
function freeMode(_ref) {
  var swiper = _ref.swiper,
    extendParams = _ref.extendParams,
    emit = _ref.emit,
    once = _ref.once;
  extendParams({
    freeMode: {
      enabled: false,
      momentum: true,
      momentumRatio: 1,
      momentumBounce: true,
      momentumBounceRatio: 1,
      momentumVelocityRatio: 1,
      sticky: false,
      minimumVelocity: 0.02
    }
  });
  function onTouchStart() {
    var translate = swiper.getTranslate();
    swiper.setTranslate(translate);
    swiper.setTransition(0);
    swiper.touchEventsData.velocities.length = 0;
    swiper.freeMode.onTouchEnd({
      currentPos: swiper.rtl ? swiper.translate : -swiper.translate
    });
  }
  function onTouchMove() {
    var data = swiper.touchEventsData,
      touches = swiper.touches;
    // Velocity
    if (data.velocities.length === 0) {
      data.velocities.push({
        position: touches[swiper.isHorizontal() ? 'startX' : 'startY'],
        time: data.touchStartTime
      });
    }
    data.velocities.push({
      position: touches[swiper.isHorizontal() ? 'currentX' : 'currentY'],
      time: (0, _utils.now)()
    });
  }
  function onTouchEnd(_ref2) {
    var currentPos = _ref2.currentPos;
    var params = swiper.params,
      wrapperEl = swiper.wrapperEl,
      rtl = swiper.rtlTranslate,
      snapGrid = swiper.snapGrid,
      data = swiper.touchEventsData;
    // Time diff
    var touchEndTime = (0, _utils.now)();
    var timeDiff = touchEndTime - data.touchStartTime;
    if (currentPos < -swiper.minTranslate()) {
      swiper.slideTo(swiper.activeIndex);
      return;
    }
    if (currentPos > -swiper.maxTranslate()) {
      if (swiper.slides.length < snapGrid.length) {
        swiper.slideTo(snapGrid.length - 1);
      } else {
        swiper.slideTo(swiper.slides.length - 1);
      }
      return;
    }
    if (params.freeMode.momentum) {
      if (data.velocities.length > 1) {
        var lastMoveEvent = data.velocities.pop();
        var velocityEvent = data.velocities.pop();
        var distance = lastMoveEvent.position - velocityEvent.position;
        var time = lastMoveEvent.time - velocityEvent.time;
        swiper.velocity = distance / time;
        swiper.velocity /= 2;
        if (Math.abs(swiper.velocity) < params.freeMode.minimumVelocity) {
          swiper.velocity = 0;
        }
        // this implies that the user stopped moving a finger then released.
        // There would be no events with distance zero, so the last event is stale.
        if (time > 150 || (0, _utils.now)() - lastMoveEvent.time > 300) {
          swiper.velocity = 0;
        }
      } else {
        swiper.velocity = 0;
      }
      swiper.velocity *= params.freeMode.momentumVelocityRatio;
      data.velocities.length = 0;
      var momentumDuration = 1000 * params.freeMode.momentumRatio;
      var momentumDistance = swiper.velocity * momentumDuration;
      var newPosition = swiper.translate + momentumDistance;
      if (rtl) newPosition = -newPosition;
      var doBounce = false;
      var afterBouncePosition;
      var bounceAmount = Math.abs(swiper.velocity) * 20 * params.freeMode.momentumBounceRatio;
      var needsLoopFix;
      if (newPosition < swiper.maxTranslate()) {
        if (params.freeMode.momentumBounce) {
          if (newPosition + swiper.maxTranslate() < -bounceAmount) {
            newPosition = swiper.maxTranslate() - bounceAmount;
          }
          afterBouncePosition = swiper.maxTranslate();
          doBounce = true;
          data.allowMomentumBounce = true;
        } else {
          newPosition = swiper.maxTranslate();
        }
        if (params.loop && params.centeredSlides) needsLoopFix = true;
      } else if (newPosition > swiper.minTranslate()) {
        if (params.freeMode.momentumBounce) {
          if (newPosition - swiper.minTranslate() > bounceAmount) {
            newPosition = swiper.minTranslate() + bounceAmount;
          }
          afterBouncePosition = swiper.minTranslate();
          doBounce = true;
          data.allowMomentumBounce = true;
        } else {
          newPosition = swiper.minTranslate();
        }
        if (params.loop && params.centeredSlides) needsLoopFix = true;
      } else if (params.freeMode.sticky) {
        var nextSlide;
        for (var j = 0; j < snapGrid.length; j += 1) {
          if (snapGrid[j] > -newPosition) {
            nextSlide = j;
            break;
          }
        }
        if (Math.abs(snapGrid[nextSlide] - newPosition) < Math.abs(snapGrid[nextSlide - 1] - newPosition) || swiper.swipeDirection === 'next') {
          newPosition = snapGrid[nextSlide];
        } else {
          newPosition = snapGrid[nextSlide - 1];
        }
        newPosition = -newPosition;
      }
      if (needsLoopFix) {
        once('transitionEnd', function () {
          swiper.loopFix();
        });
      }
      // Fix duration
      if (swiper.velocity !== 0) {
        if (rtl) {
          momentumDuration = Math.abs((-newPosition - swiper.translate) / swiper.velocity);
        } else {
          momentumDuration = Math.abs((newPosition - swiper.translate) / swiper.velocity);
        }
        if (params.freeMode.sticky) {
          // If freeMode.sticky is active and the user ends a swipe with a slow-velocity
          // event, then durations can be 20+ seconds to slide one (or zero!) slides.
          // It's easy to see this when simulating touch with mouse events. To fix this,
          // limit single-slide swipes to the default slide duration. This also has the
          // nice side effect of matching slide speed if the user stopped moving before
          // lifting finger or mouse vs. moving slowly before lifting the finger/mouse.
          // For faster swipes, also apply limits (albeit higher ones).
          var moveDistance = Math.abs((rtl ? -newPosition : newPosition) - swiper.translate);
          var currentSlideSize = swiper.slidesSizesGrid[swiper.activeIndex];
          if (moveDistance < currentSlideSize) {
            momentumDuration = params.speed;
          } else if (moveDistance < 2 * currentSlideSize) {
            momentumDuration = params.speed * 1.5;
          } else {
            momentumDuration = params.speed * 2.5;
          }
        }
      } else if (params.freeMode.sticky) {
        swiper.slideToClosest();
        return;
      }
      if (params.freeMode.momentumBounce && doBounce) {
        swiper.updateProgress(afterBouncePosition);
        swiper.setTransition(momentumDuration);
        swiper.setTranslate(newPosition);
        swiper.transitionStart(true, swiper.swipeDirection);
        swiper.animating = true;
        (0, _utils.elementTransitionEnd)(wrapperEl, function () {
          if (!swiper || swiper.destroyed || !data.allowMomentumBounce) return;
          emit('momentumBounce');
          swiper.setTransition(params.speed);
          setTimeout(function () {
            swiper.setTranslate(afterBouncePosition);
            (0, _utils.elementTransitionEnd)(wrapperEl, function () {
              if (!swiper || swiper.destroyed) return;
              swiper.transitionEnd();
            });
          }, 0);
        });
      } else if (swiper.velocity) {
        emit('_freeModeNoMomentumRelease');
        swiper.updateProgress(newPosition);
        swiper.setTransition(momentumDuration);
        swiper.setTranslate(newPosition);
        swiper.transitionStart(true, swiper.swipeDirection);
        if (!swiper.animating) {
          swiper.animating = true;
          (0, _utils.elementTransitionEnd)(wrapperEl, function () {
            if (!swiper || swiper.destroyed) return;
            swiper.transitionEnd();
          });
        }
      } else {
        swiper.updateProgress(newPosition);
      }
      swiper.updateActiveIndex();
      swiper.updateSlidesClasses();
    } else if (params.freeMode.sticky) {
      swiper.slideToClosest();
      return;
    } else if (params.freeMode) {
      emit('_freeModeNoMomentumRelease');
    }
    if (!params.freeMode.momentum || timeDiff >= params.longSwipesMs) {
      swiper.updateProgress();
      swiper.updateActiveIndex();
      swiper.updateSlidesClasses();
    }
  }
  Object.assign(swiper, {
    freeMode: {
      onTouchStart: onTouchStart,
      onTouchMove: onTouchMove,
      onTouchEnd: onTouchEnd
    }
  });
}

},{"../../shared/utils.js":102}],74:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = Grid;
function Grid(_ref) {
  var swiper = _ref.swiper,
    extendParams = _ref.extendParams;
  extendParams({
    grid: {
      rows: 1,
      fill: 'column'
    }
  });
  var slidesNumberEvenToRows;
  var slidesPerRow;
  var numFullColumns;
  var initSlides = function initSlides(slidesLength) {
    var slidesPerView = swiper.params.slidesPerView;
    var _swiper$params$grid = swiper.params.grid,
      rows = _swiper$params$grid.rows,
      fill = _swiper$params$grid.fill;
    slidesPerRow = slidesNumberEvenToRows / rows;
    numFullColumns = Math.floor(slidesLength / rows);
    if (Math.floor(slidesLength / rows) === slidesLength / rows) {
      slidesNumberEvenToRows = slidesLength;
    } else {
      slidesNumberEvenToRows = Math.ceil(slidesLength / rows) * rows;
    }
    if (slidesPerView !== 'auto' && fill === 'row') {
      slidesNumberEvenToRows = Math.max(slidesNumberEvenToRows, slidesPerView * rows);
    }
  };
  var updateSlide = function updateSlide(i, slide, slidesLength, getDirectionLabel) {
    var _swiper$params = swiper.params,
      slidesPerGroup = _swiper$params.slidesPerGroup,
      spaceBetween = _swiper$params.spaceBetween;
    var _swiper$params$grid2 = swiper.params.grid,
      rows = _swiper$params$grid2.rows,
      fill = _swiper$params$grid2.fill;
    // Set slides order
    var newSlideOrderIndex;
    var column;
    var row;
    if (fill === 'row' && slidesPerGroup > 1) {
      var groupIndex = Math.floor(i / (slidesPerGroup * rows));
      var slideIndexInGroup = i - rows * slidesPerGroup * groupIndex;
      var columnsInGroup = groupIndex === 0 ? slidesPerGroup : Math.min(Math.ceil((slidesLength - groupIndex * rows * slidesPerGroup) / rows), slidesPerGroup);
      row = Math.floor(slideIndexInGroup / columnsInGroup);
      column = slideIndexInGroup - row * columnsInGroup + groupIndex * slidesPerGroup;
      newSlideOrderIndex = column + row * slidesNumberEvenToRows / rows;
      slide.style.order = newSlideOrderIndex;
    } else if (fill === 'column') {
      column = Math.floor(i / rows);
      row = i - column * rows;
      if (column > numFullColumns || column === numFullColumns && row === rows - 1) {
        row += 1;
        if (row >= rows) {
          row = 0;
          column += 1;
        }
      }
    } else {
      row = Math.floor(i / slidesPerRow);
      column = i - row * slidesPerRow;
    }
    slide.style[getDirectionLabel('margin-top')] = row !== 0 ? spaceBetween && "".concat(spaceBetween, "px") : '';
  };
  var updateWrapperSize = function updateWrapperSize(slideSize, snapGrid, getDirectionLabel) {
    var _swiper$params2 = swiper.params,
      spaceBetween = _swiper$params2.spaceBetween,
      centeredSlides = _swiper$params2.centeredSlides,
      roundLengths = _swiper$params2.roundLengths;
    var rows = swiper.params.grid.rows;
    swiper.virtualSize = (slideSize + spaceBetween) * slidesNumberEvenToRows;
    swiper.virtualSize = Math.ceil(swiper.virtualSize / rows) - spaceBetween;
    swiper.wrapperEl.style[getDirectionLabel('width')] = "".concat(swiper.virtualSize + spaceBetween, "px");
    if (centeredSlides) {
      var newSlidesGrid = [];
      for (var i = 0; i < snapGrid.length; i += 1) {
        var slidesGridItem = snapGrid[i];
        if (roundLengths) slidesGridItem = Math.floor(slidesGridItem);
        if (snapGrid[i] < swiper.virtualSize + snapGrid[0]) newSlidesGrid.push(slidesGridItem);
      }
      snapGrid.splice(0, snapGrid.length);
      snapGrid.push.apply(snapGrid, newSlidesGrid);
    }
  };
  swiper.grid = {
    initSlides: initSlides,
    updateSlide: updateSlide,
    updateWrapperSize: updateWrapperSize
  };
}

},{}],75:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = HashNavigation;
var _ssrWindow = require("ssr-window");
var _utils = require("../../shared/utils.js");
function HashNavigation(_ref) {
  var swiper = _ref.swiper,
    extendParams = _ref.extendParams,
    emit = _ref.emit,
    on = _ref.on;
  var initialized = false;
  var document = (0, _ssrWindow.getDocument)();
  var window = (0, _ssrWindow.getWindow)();
  extendParams({
    hashNavigation: {
      enabled: false,
      replaceState: false,
      watchState: false,
      getSlideIndex: function getSlideIndex(_s, hash) {
        if (swiper.virtual && swiper.params.virtual.enabled) {
          var slideWithHash = swiper.slides.filter(function (slideEl) {
            return slideEl.getAttribute('data-hash') === hash;
          })[0];
          if (!slideWithHash) return 0;
          var index = parseInt(slideWithHash.getAttribute('data-swiper-slide-index'), 10);
          return index;
        }
        return swiper.getSlideIndex((0, _utils.elementChildren)(swiper.slidesEl, ".".concat(swiper.params.slideClass, "[data-hash=\"").concat(hash, "\"], swiper-slide[data-hash=\"").concat(hash, "\"]"))[0]);
      }
    }
  });
  var onHashChange = function onHashChange() {
    emit('hashChange');
    var newHash = document.location.hash.replace('#', '');
    var activeSlideEl = swiper.slidesEl.querySelector("[data-swiper-slide-index=\"".concat(swiper.activeIndex, "\"]"));
    var activeSlideHash = activeSlideEl ? activeSlideEl.getAttribute('data-hash') : '';
    if (newHash !== activeSlideHash) {
      var newIndex = swiper.params.hashNavigation.getSlideIndex(swiper, newHash);
      console.log(newIndex);
      if (typeof newIndex === 'undefined') return;
      swiper.slideTo(newIndex);
    }
  };
  var setHash = function setHash() {
    if (!initialized || !swiper.params.hashNavigation.enabled) return;
    var activeSlideEl = swiper.slidesEl.querySelector("[data-swiper-slide-index=\"".concat(swiper.activeIndex, "\"]"));
    var activeSlideHash = activeSlideEl ? activeSlideEl.getAttribute('data-hash') || activeSlideEl.getAttribute('data-history') : '';
    if (swiper.params.hashNavigation.replaceState && window.history && window.history.replaceState) {
      window.history.replaceState(null, null, "#".concat(activeSlideHash) || '');
      emit('hashSet');
    } else {
      document.location.hash = activeSlideHash || '';
      emit('hashSet');
    }
  };
  var init = function init() {
    if (!swiper.params.hashNavigation.enabled || swiper.params.history && swiper.params.history.enabled) return;
    initialized = true;
    var hash = document.location.hash.replace('#', '');
    if (hash) {
      var speed = 0;
      var index = swiper.params.hashNavigation.getSlideIndex(swiper, hash);
      swiper.slideTo(index || 0, speed, swiper.params.runCallbacksOnInit, true);
    }
    if (swiper.params.hashNavigation.watchState) {
      window.addEventListener('hashchange', onHashChange);
    }
  };
  var destroy = function destroy() {
    if (swiper.params.hashNavigation.watchState) {
      window.removeEventListener('hashchange', onHashChange);
    }
  };
  on('init', function () {
    if (swiper.params.hashNavigation.enabled) {
      init();
    }
  });
  on('destroy', function () {
    if (swiper.params.hashNavigation.enabled) {
      destroy();
    }
  });
  on('transitionEnd _freeModeNoMomentumRelease', function () {
    if (initialized) {
      setHash();
    }
  });
  on('slideChange', function () {
    if (initialized && swiper.params.cssMode) {
      setHash();
    }
  });
}

},{"../../shared/utils.js":102,"ssr-window":6}],76:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = History;
var _ssrWindow = require("ssr-window");
function History(_ref) {
  var swiper = _ref.swiper,
    extendParams = _ref.extendParams,
    on = _ref.on;
  extendParams({
    history: {
      enabled: false,
      root: '',
      replaceState: false,
      key: 'slides',
      keepQuery: false
    }
  });
  var initialized = false;
  var paths = {};
  var slugify = function slugify(text) {
    return text.toString().replace(/\s+/g, '-').replace(/[^\w-]+/g, '').replace(/--+/g, '-').replace(/^-+/, '').replace(/-+$/, '');
  };
  var getPathValues = function getPathValues(urlOverride) {
    var window = (0, _ssrWindow.getWindow)();
    var location;
    if (urlOverride) {
      location = new URL(urlOverride);
    } else {
      location = window.location;
    }
    var pathArray = location.pathname.slice(1).split('/').filter(function (part) {
      return part !== '';
    });
    var total = pathArray.length;
    var key = pathArray[total - 2];
    var value = pathArray[total - 1];
    return {
      key: key,
      value: value
    };
  };
  var setHistory = function setHistory(key, index) {
    var window = (0, _ssrWindow.getWindow)();
    if (!initialized || !swiper.params.history.enabled) return;
    var location;
    if (swiper.params.url) {
      location = new URL(swiper.params.url);
    } else {
      location = window.location;
    }
    var slide = swiper.slides[index];
    var value = slugify(slide.getAttribute('data-history'));
    if (swiper.params.history.root.length > 0) {
      var root = swiper.params.history.root;
      if (root[root.length - 1] === '/') root = root.slice(0, root.length - 1);
      value = "".concat(root, "/").concat(key ? "".concat(key, "/") : '').concat(value);
    } else if (!location.pathname.includes(key)) {
      value = "".concat(key ? "".concat(key, "/") : '').concat(value);
    }
    if (swiper.params.history.keepQuery) {
      value += location.search;
    }
    var currentState = window.history.state;
    if (currentState && currentState.value === value) {
      return;
    }
    if (swiper.params.history.replaceState) {
      window.history.replaceState({
        value: value
      }, null, value);
    } else {
      window.history.pushState({
        value: value
      }, null, value);
    }
  };
  var scrollToSlide = function scrollToSlide(speed, value, runCallbacks) {
    if (value) {
      for (var i = 0, length = swiper.slides.length; i < length; i += 1) {
        var slide = swiper.slides[i];
        var slideHistory = slugify(slide.getAttribute('data-history'));
        if (slideHistory === value) {
          var index = swiper.getSlideIndex(slide);
          swiper.slideTo(index, speed, runCallbacks);
        }
      }
    } else {
      swiper.slideTo(0, speed, runCallbacks);
    }
  };
  var setHistoryPopState = function setHistoryPopState() {
    paths = getPathValues(swiper.params.url);
    scrollToSlide(swiper.params.speed, paths.value, false);
  };
  var init = function init() {
    var window = (0, _ssrWindow.getWindow)();
    if (!swiper.params.history) return;
    if (!window.history || !window.history.pushState) {
      swiper.params.history.enabled = false;
      swiper.params.hashNavigation.enabled = true;
      return;
    }
    initialized = true;
    paths = getPathValues(swiper.params.url);
    if (!paths.key && !paths.value) {
      if (!swiper.params.history.replaceState) {
        window.addEventListener('popstate', setHistoryPopState);
      }
      return;
    }
    scrollToSlide(0, paths.value, swiper.params.runCallbacksOnInit);
    if (!swiper.params.history.replaceState) {
      window.addEventListener('popstate', setHistoryPopState);
    }
  };
  var destroy = function destroy() {
    var window = (0, _ssrWindow.getWindow)();
    if (!swiper.params.history.replaceState) {
      window.removeEventListener('popstate', setHistoryPopState);
    }
  };
  on('init', function () {
    if (swiper.params.history.enabled) {
      init();
    }
  });
  on('destroy', function () {
    if (swiper.params.history.enabled) {
      destroy();
    }
  });
  on('transitionEnd _freeModeNoMomentumRelease', function () {
    if (initialized) {
      setHistory(swiper.params.history.key, swiper.activeIndex);
    }
  });
  on('slideChange', function () {
    if (initialized && swiper.params.cssMode) {
      setHistory(swiper.params.history.key, swiper.activeIndex);
    }
  });
}

},{"ssr-window":6}],77:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = Keyboard;
var _ssrWindow = require("ssr-window");
var _utils = require("../../shared/utils.js");
/* eslint-disable consistent-return */

function Keyboard(_ref) {
  var swiper = _ref.swiper,
    extendParams = _ref.extendParams,
    on = _ref.on,
    emit = _ref.emit;
  var document = (0, _ssrWindow.getDocument)();
  var window = (0, _ssrWindow.getWindow)();
  swiper.keyboard = {
    enabled: false
  };
  extendParams({
    keyboard: {
      enabled: false,
      onlyInViewport: true,
      pageUpDown: true
    }
  });
  function handle(event) {
    if (!swiper.enabled) return;
    var rtl = swiper.rtlTranslate;
    var e = event;
    if (e.originalEvent) e = e.originalEvent; // jquery fix
    var kc = e.keyCode || e.charCode;
    var pageUpDown = swiper.params.keyboard.pageUpDown;
    var isPageUp = pageUpDown && kc === 33;
    var isPageDown = pageUpDown && kc === 34;
    var isArrowLeft = kc === 37;
    var isArrowRight = kc === 39;
    var isArrowUp = kc === 38;
    var isArrowDown = kc === 40;
    // Directions locks
    if (!swiper.allowSlideNext && (swiper.isHorizontal() && isArrowRight || swiper.isVertical() && isArrowDown || isPageDown)) {
      return false;
    }
    if (!swiper.allowSlidePrev && (swiper.isHorizontal() && isArrowLeft || swiper.isVertical() && isArrowUp || isPageUp)) {
      return false;
    }
    if (e.shiftKey || e.altKey || e.ctrlKey || e.metaKey) {
      return undefined;
    }
    if (document.activeElement && document.activeElement.nodeName && (document.activeElement.nodeName.toLowerCase() === 'input' || document.activeElement.nodeName.toLowerCase() === 'textarea')) {
      return undefined;
    }
    if (swiper.params.keyboard.onlyInViewport && (isPageUp || isPageDown || isArrowLeft || isArrowRight || isArrowUp || isArrowDown)) {
      var inView = false;
      // Check that swiper should be inside of visible area of window
      if ((0, _utils.elementParents)(swiper.el, ".".concat(swiper.params.slideClass, ", swiper-slide")).length > 0 && (0, _utils.elementParents)(swiper.el, ".".concat(swiper.params.slideActiveClass)).length === 0) {
        return undefined;
      }
      var el = swiper.el;
      var swiperWidth = el.clientWidth;
      var swiperHeight = el.clientHeight;
      var windowWidth = window.innerWidth;
      var windowHeight = window.innerHeight;
      var swiperOffset = (0, _utils.elementOffset)(el);
      if (rtl) swiperOffset.left -= el.scrollLeft;
      var swiperCoord = [[swiperOffset.left, swiperOffset.top], [swiperOffset.left + swiperWidth, swiperOffset.top], [swiperOffset.left, swiperOffset.top + swiperHeight], [swiperOffset.left + swiperWidth, swiperOffset.top + swiperHeight]];
      for (var i = 0; i < swiperCoord.length; i += 1) {
        var point = swiperCoord[i];
        if (point[0] >= 0 && point[0] <= windowWidth && point[1] >= 0 && point[1] <= windowHeight) {
          if (point[0] === 0 && point[1] === 0) continue; // eslint-disable-line
          inView = true;
        }
      }
      if (!inView) return undefined;
    }
    if (swiper.isHorizontal()) {
      if (isPageUp || isPageDown || isArrowLeft || isArrowRight) {
        if (e.preventDefault) e.preventDefault();else e.returnValue = false;
      }
      if ((isPageDown || isArrowRight) && !rtl || (isPageUp || isArrowLeft) && rtl) swiper.slideNext();
      if ((isPageUp || isArrowLeft) && !rtl || (isPageDown || isArrowRight) && rtl) swiper.slidePrev();
    } else {
      if (isPageUp || isPageDown || isArrowUp || isArrowDown) {
        if (e.preventDefault) e.preventDefault();else e.returnValue = false;
      }
      if (isPageDown || isArrowDown) swiper.slideNext();
      if (isPageUp || isArrowUp) swiper.slidePrev();
    }
    emit('keyPress', kc);
    return undefined;
  }
  function enable() {
    if (swiper.keyboard.enabled) return;
    document.addEventListener('keydown', handle);
    swiper.keyboard.enabled = true;
  }
  function disable() {
    if (!swiper.keyboard.enabled) return;
    document.removeEventListener('keydown', handle);
    swiper.keyboard.enabled = false;
  }
  on('init', function () {
    if (swiper.params.keyboard.enabled) {
      enable();
    }
  });
  on('destroy', function () {
    if (swiper.keyboard.enabled) {
      disable();
    }
  });
  Object.assign(swiper.keyboard, {
    enable: enable,
    disable: disable
  });
}

},{"../../shared/utils.js":102,"ssr-window":6}],78:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = Manipulation;
var _appendSlide = _interopRequireDefault(require("./methods/appendSlide.js"));
var _prependSlide = _interopRequireDefault(require("./methods/prependSlide.js"));
var _addSlide = _interopRequireDefault(require("./methods/addSlide.js"));
var _removeSlide = _interopRequireDefault(require("./methods/removeSlide.js"));
var _removeAllSlides = _interopRequireDefault(require("./methods/removeAllSlides.js"));
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }
function Manipulation(_ref) {
  var swiper = _ref.swiper;
  Object.assign(swiper, {
    appendSlide: _appendSlide["default"].bind(swiper),
    prependSlide: _prependSlide["default"].bind(swiper),
    addSlide: _addSlide["default"].bind(swiper),
    removeSlide: _removeSlide["default"].bind(swiper),
    removeAllSlides: _removeAllSlides["default"].bind(swiper)
  });
}

},{"./methods/addSlide.js":79,"./methods/appendSlide.js":80,"./methods/prependSlide.js":81,"./methods/removeAllSlides.js":82,"./methods/removeSlide.js":83}],79:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = addSlide;
function _typeof(obj) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (obj) { return typeof obj; } : function (obj) { return obj && "function" == typeof Symbol && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }, _typeof(obj); }
function addSlide(index, slides) {
  var swiper = this;
  var params = swiper.params,
    activeIndex = swiper.activeIndex,
    slidesEl = swiper.slidesEl;
  var activeIndexBuffer = activeIndex;
  if (params.loop) {
    activeIndexBuffer -= swiper.loopedSlides;
    swiper.loopDestroy();
    swiper.recalcSlides();
  }
  var baseLength = swiper.slides.length;
  if (index <= 0) {
    swiper.prependSlide(slides);
    return;
  }
  if (index >= baseLength) {
    swiper.appendSlide(slides);
    return;
  }
  var newActiveIndex = activeIndexBuffer > index ? activeIndexBuffer + 1 : activeIndexBuffer;
  var slidesBuffer = [];
  for (var i = baseLength - 1; i >= index; i -= 1) {
    var currentSlide = swiper.slides[i];
    currentSlide.remove();
    slidesBuffer.unshift(currentSlide);
  }
  if (_typeof(slides) === 'object' && 'length' in slides) {
    for (var _i = 0; _i < slides.length; _i += 1) {
      if (slides[_i]) slidesEl.append(slides[_i]);
    }
    newActiveIndex = activeIndexBuffer > index ? activeIndexBuffer + slides.length : activeIndexBuffer;
  } else {
    slidesEl.append(slides);
  }
  for (var _i2 = 0; _i2 < slidesBuffer.length; _i2 += 1) {
    slidesEl.append(slidesBuffer[_i2]);
  }
  swiper.recalcSlides();
  if (params.loop) {
    swiper.loopCreate();
  }
  if (!params.observer || swiper.isElement) {
    swiper.update();
  }
  if (params.loop) {
    swiper.slideTo(newActiveIndex + swiper.loopedSlides, 0, false);
  } else {
    swiper.slideTo(newActiveIndex, 0, false);
  }
}

},{}],80:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = appendSlide;
function _typeof(obj) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (obj) { return typeof obj; } : function (obj) { return obj && "function" == typeof Symbol && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }, _typeof(obj); }
function appendSlide(slides) {
  var swiper = this;
  var params = swiper.params,
    slidesEl = swiper.slidesEl;
  if (params.loop) {
    swiper.loopDestroy();
  }
  var appendElement = function appendElement(slideEl) {
    if (typeof slideEl === 'string') {
      var tempDOM = document.createElement('div');
      tempDOM.innerHTML = slideEl;
      slidesEl.append(tempDOM.children[0]);
      tempDOM.innerHTML = '';
    } else {
      slidesEl.append(slideEl);
    }
  };
  if (_typeof(slides) === 'object' && 'length' in slides) {
    for (var i = 0; i < slides.length; i += 1) {
      if (slides[i]) appendElement(slides[i]);
    }
  } else {
    appendElement(slides);
  }
  swiper.recalcSlides();
  if (params.loop) {
    swiper.loopCreate();
  }
  if (!params.observer || swiper.isElement) {
    swiper.update();
  }
}

},{}],81:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = prependSlide;
function _typeof(obj) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (obj) { return typeof obj; } : function (obj) { return obj && "function" == typeof Symbol && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }, _typeof(obj); }
function prependSlide(slides) {
  var swiper = this;
  var params = swiper.params,
    activeIndex = swiper.activeIndex,
    slidesEl = swiper.slidesEl;
  if (params.loop) {
    swiper.loopDestroy();
  }
  var newActiveIndex = activeIndex + 1;
  var prependElement = function prependElement(slideEl) {
    if (typeof slideEl === 'string') {
      var tempDOM = document.createElement('div');
      tempDOM.innerHTML = slideEl;
      slidesEl.prepend(tempDOM.children[0]);
      tempDOM.innerHTML = '';
    } else {
      slidesEl.prepend(slideEl);
    }
  };
  if (_typeof(slides) === 'object' && 'length' in slides) {
    for (var i = 0; i < slides.length; i += 1) {
      if (slides[i]) prependElement(slides[i]);
    }
    newActiveIndex = activeIndex + slides.length;
  } else {
    prependElement(slides);
  }
  swiper.recalcSlides();
  if (params.loop) {
    swiper.loopCreate();
  }
  if (!params.observer || swiper.isElement) {
    swiper.update();
  }
  swiper.slideTo(newActiveIndex, 0, false);
}

},{}],82:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = removeAllSlides;
function removeAllSlides() {
  var swiper = this;
  var slidesIndexes = [];
  for (var i = 0; i < swiper.slides.length; i += 1) {
    slidesIndexes.push(i);
  }
  swiper.removeSlide(slidesIndexes);
}

},{}],83:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = removeSlide;
function _typeof(obj) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (obj) { return typeof obj; } : function (obj) { return obj && "function" == typeof Symbol && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }, _typeof(obj); }
function removeSlide(slidesIndexes) {
  var swiper = this;
  var params = swiper.params,
    activeIndex = swiper.activeIndex;
  var activeIndexBuffer = activeIndex;
  if (params.loop) {
    activeIndexBuffer -= swiper.loopedSlides;
    swiper.loopDestroy();
  }
  var newActiveIndex = activeIndexBuffer;
  var indexToRemove;
  if (_typeof(slidesIndexes) === 'object' && 'length' in slidesIndexes) {
    for (var i = 0; i < slidesIndexes.length; i += 1) {
      indexToRemove = slidesIndexes[i];
      if (swiper.slides[indexToRemove]) swiper.slides[indexToRemove].remove();
      if (indexToRemove < newActiveIndex) newActiveIndex -= 1;
    }
    newActiveIndex = Math.max(newActiveIndex, 0);
  } else {
    indexToRemove = slidesIndexes;
    if (swiper.slides[indexToRemove]) swiper.slides[indexToRemove].remove();
    if (indexToRemove < newActiveIndex) newActiveIndex -= 1;
    newActiveIndex = Math.max(newActiveIndex, 0);
  }
  swiper.recalcSlides();
  if (params.loop) {
    swiper.loopCreate();
  }
  if (!params.observer || swiper.isElement) {
    swiper.update();
  }
  if (params.loop) {
    swiper.slideTo(newActiveIndex + swiper.loopedSlides, 0, false);
  } else {
    swiper.slideTo(newActiveIndex, 0, false);
  }
}

},{}],84:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = Mousewheel;
var _ssrWindow = require("ssr-window");
var _utils = require("../../shared/utils.js");
/* eslint-disable consistent-return */

function Mousewheel(_ref) {
  var swiper = _ref.swiper,
    extendParams = _ref.extendParams,
    on = _ref.on,
    emit = _ref.emit;
  var window = (0, _ssrWindow.getWindow)();
  extendParams({
    mousewheel: {
      enabled: false,
      releaseOnEdges: false,
      invert: false,
      forceToAxis: false,
      sensitivity: 1,
      eventsTarget: 'container',
      thresholdDelta: null,
      thresholdTime: null
    }
  });
  swiper.mousewheel = {
    enabled: false
  };
  var timeout;
  var lastScrollTime = (0, _utils.now)();
  var lastEventBeforeSnap;
  var recentWheelEvents = [];
  function normalize(e) {
    // Reasonable defaults
    var PIXEL_STEP = 10;
    var LINE_HEIGHT = 40;
    var PAGE_HEIGHT = 800;
    var sX = 0;
    var sY = 0; // spinX, spinY
    var pX = 0;
    var pY = 0; // pixelX, pixelY

    // Legacy
    if ('detail' in e) {
      sY = e.detail;
    }
    if ('wheelDelta' in e) {
      sY = -e.wheelDelta / 120;
    }
    if ('wheelDeltaY' in e) {
      sY = -e.wheelDeltaY / 120;
    }
    if ('wheelDeltaX' in e) {
      sX = -e.wheelDeltaX / 120;
    }

    // side scrolling on FF with DOMMouseScroll
    if ('axis' in e && e.axis === e.HORIZONTAL_AXIS) {
      sX = sY;
      sY = 0;
    }
    pX = sX * PIXEL_STEP;
    pY = sY * PIXEL_STEP;
    if ('deltaY' in e) {
      pY = e.deltaY;
    }
    if ('deltaX' in e) {
      pX = e.deltaX;
    }
    if (e.shiftKey && !pX) {
      // if user scrolls with shift he wants horizontal scroll
      pX = pY;
      pY = 0;
    }
    if ((pX || pY) && e.deltaMode) {
      if (e.deltaMode === 1) {
        // delta in LINE units
        pX *= LINE_HEIGHT;
        pY *= LINE_HEIGHT;
      } else {
        // delta in PAGE units
        pX *= PAGE_HEIGHT;
        pY *= PAGE_HEIGHT;
      }
    }

    // Fall-back if spin cannot be determined
    if (pX && !sX) {
      sX = pX < 1 ? -1 : 1;
    }
    if (pY && !sY) {
      sY = pY < 1 ? -1 : 1;
    }
    return {
      spinX: sX,
      spinY: sY,
      pixelX: pX,
      pixelY: pY
    };
  }
  function handleMouseEnter() {
    if (!swiper.enabled) return;
    swiper.mouseEntered = true;
  }
  function handleMouseLeave() {
    if (!swiper.enabled) return;
    swiper.mouseEntered = false;
  }
  function animateSlider(newEvent) {
    if (swiper.params.mousewheel.thresholdDelta && newEvent.delta < swiper.params.mousewheel.thresholdDelta) {
      // Prevent if delta of wheel scroll delta is below configured threshold
      return false;
    }
    if (swiper.params.mousewheel.thresholdTime && (0, _utils.now)() - lastScrollTime < swiper.params.mousewheel.thresholdTime) {
      // Prevent if time between scrolls is below configured threshold
      return false;
    }

    // If the movement is NOT big enough and
    // if the last time the user scrolled was too close to the current one (avoid continuously triggering the slider):
    //   Don't go any further (avoid insignificant scroll movement).
    if (newEvent.delta >= 6 && (0, _utils.now)() - lastScrollTime < 60) {
      // Return false as a default
      return true;
    }
    // If user is scrolling towards the end:
    //   If the slider hasn't hit the latest slide or
    //   if the slider is a loop and
    //   if the slider isn't moving right now:
    //     Go to next slide and
    //     emit a scroll event.
    // Else (the user is scrolling towards the beginning) and
    // if the slider hasn't hit the first slide or
    // if the slider is a loop and
    // if the slider isn't moving right now:
    //   Go to prev slide and
    //   emit a scroll event.
    if (newEvent.direction < 0) {
      if ((!swiper.isEnd || swiper.params.loop) && !swiper.animating) {
        swiper.slideNext();
        emit('scroll', newEvent.raw);
      }
    } else if ((!swiper.isBeginning || swiper.params.loop) && !swiper.animating) {
      swiper.slidePrev();
      emit('scroll', newEvent.raw);
    }
    // If you got here is because an animation has been triggered so store the current time
    lastScrollTime = new window.Date().getTime();
    // Return false as a default
    return false;
  }
  function releaseScroll(newEvent) {
    var params = swiper.params.mousewheel;
    if (newEvent.direction < 0) {
      if (swiper.isEnd && !swiper.params.loop && params.releaseOnEdges) {
        // Return true to animate scroll on edges
        return true;
      }
    } else if (swiper.isBeginning && !swiper.params.loop && params.releaseOnEdges) {
      // Return true to animate scroll on edges
      return true;
    }
    return false;
  }
  function handle(event) {
    var e = event;
    var disableParentSwiper = true;
    if (!swiper.enabled) return;
    var params = swiper.params.mousewheel;
    if (swiper.params.cssMode) {
      e.preventDefault();
    }
    var targetEl = swiper.el;
    if (swiper.params.mousewheel.eventsTarget !== 'container') {
      targetEl = document.querySelector(swiper.params.mousewheel.eventsTarget);
    }
    var targetElContainsTarget = targetEl && targetEl.contains(e.target);
    if (!swiper.mouseEntered && !targetElContainsTarget && !params.releaseOnEdges) return true;
    if (e.originalEvent) e = e.originalEvent; // jquery fix
    var delta = 0;
    var rtlFactor = swiper.rtlTranslate ? -1 : 1;
    var data = normalize(e);
    if (params.forceToAxis) {
      if (swiper.isHorizontal()) {
        if (Math.abs(data.pixelX) > Math.abs(data.pixelY)) delta = -data.pixelX * rtlFactor;else return true;
      } else if (Math.abs(data.pixelY) > Math.abs(data.pixelX)) delta = -data.pixelY;else return true;
    } else {
      delta = Math.abs(data.pixelX) > Math.abs(data.pixelY) ? -data.pixelX * rtlFactor : -data.pixelY;
    }
    if (delta === 0) return true;
    if (params.invert) delta = -delta;

    // Get the scroll positions
    var positions = swiper.getTranslate() + delta * params.sensitivity;
    if (positions >= swiper.minTranslate()) positions = swiper.minTranslate();
    if (positions <= swiper.maxTranslate()) positions = swiper.maxTranslate();

    // When loop is true:
    //     the disableParentSwiper will be true.
    // When loop is false:
    //     if the scroll positions is not on edge,
    //     then the disableParentSwiper will be true.
    //     if the scroll on edge positions,
    //     then the disableParentSwiper will be false.
    disableParentSwiper = swiper.params.loop ? true : !(positions === swiper.minTranslate() || positions === swiper.maxTranslate());
    if (disableParentSwiper && swiper.params.nested) e.stopPropagation();
    if (!swiper.params.freeMode || !swiper.params.freeMode.enabled) {
      // Register the new event in a variable which stores the relevant data
      var newEvent = {
        time: (0, _utils.now)(),
        delta: Math.abs(delta),
        direction: Math.sign(delta),
        raw: event
      };

      // Keep the most recent events
      if (recentWheelEvents.length >= 2) {
        recentWheelEvents.shift(); // only store the last N events
      }

      var prevEvent = recentWheelEvents.length ? recentWheelEvents[recentWheelEvents.length - 1] : undefined;
      recentWheelEvents.push(newEvent);

      // If there is at least one previous recorded event:
      //   If direction has changed or
      //   if the scroll is quicker than the previous one:
      //     Animate the slider.
      // Else (this is the first time the wheel is moved):
      //     Animate the slider.
      if (prevEvent) {
        if (newEvent.direction !== prevEvent.direction || newEvent.delta > prevEvent.delta || newEvent.time > prevEvent.time + 150) {
          animateSlider(newEvent);
        }
      } else {
        animateSlider(newEvent);
      }

      // If it's time to release the scroll:
      //   Return now so you don't hit the preventDefault.
      if (releaseScroll(newEvent)) {
        return true;
      }
    } else {
      // Freemode or scrollContainer:

      // If we recently snapped after a momentum scroll, then ignore wheel events
      // to give time for the deceleration to finish. Stop ignoring after 500 msecs
      // or if it's a new scroll (larger delta or inverse sign as last event before
      // an end-of-momentum snap).
      var _newEvent = {
        time: (0, _utils.now)(),
        delta: Math.abs(delta),
        direction: Math.sign(delta)
      };
      var ignoreWheelEvents = lastEventBeforeSnap && _newEvent.time < lastEventBeforeSnap.time + 500 && _newEvent.delta <= lastEventBeforeSnap.delta && _newEvent.direction === lastEventBeforeSnap.direction;
      if (!ignoreWheelEvents) {
        lastEventBeforeSnap = undefined;
        var position = swiper.getTranslate() + delta * params.sensitivity;
        var wasBeginning = swiper.isBeginning;
        var wasEnd = swiper.isEnd;
        if (position >= swiper.minTranslate()) position = swiper.minTranslate();
        if (position <= swiper.maxTranslate()) position = swiper.maxTranslate();
        swiper.setTransition(0);
        swiper.setTranslate(position);
        swiper.updateProgress();
        swiper.updateActiveIndex();
        swiper.updateSlidesClasses();
        if (!wasBeginning && swiper.isBeginning || !wasEnd && swiper.isEnd) {
          swiper.updateSlidesClasses();
        }
        if (swiper.params.loop) {
          swiper.loopFix({
            direction: _newEvent.direction < 0 ? 'next' : 'prev',
            byMousewheel: true
          });
        }
        if (swiper.params.freeMode.sticky) {
          // When wheel scrolling starts with sticky (aka snap) enabled, then detect
          // the end of a momentum scroll by storing recent (N=15?) wheel events.
          // 1. do all N events have decreasing or same (absolute value) delta?
          // 2. did all N events arrive in the last M (M=500?) msecs?
          // 3. does the earliest event have an (absolute value) delta that's
          //    at least P (P=1?) larger than the most recent event's delta?
          // 4. does the latest event have a delta that's smaller than Q (Q=6?) pixels?
          // If 1-4 are "yes" then we're near the end of a momentum scroll deceleration.
          // Snap immediately and ignore remaining wheel events in this scroll.
          // See comment above for "remaining wheel events in this scroll" determination.
          // If 1-4 aren't satisfied, then wait to snap until 500ms after the last event.
          clearTimeout(timeout);
          timeout = undefined;
          if (recentWheelEvents.length >= 15) {
            recentWheelEvents.shift(); // only store the last N events
          }

          var _prevEvent = recentWheelEvents.length ? recentWheelEvents[recentWheelEvents.length - 1] : undefined;
          var firstEvent = recentWheelEvents[0];
          recentWheelEvents.push(_newEvent);
          if (_prevEvent && (_newEvent.delta > _prevEvent.delta || _newEvent.direction !== _prevEvent.direction)) {
            // Increasing or reverse-sign delta means the user started scrolling again. Clear the wheel event log.
            recentWheelEvents.splice(0);
          } else if (recentWheelEvents.length >= 15 && _newEvent.time - firstEvent.time < 500 && firstEvent.delta - _newEvent.delta >= 1 && _newEvent.delta <= 6) {
            // We're at the end of the deceleration of a momentum scroll, so there's no need
            // to wait for more events. Snap ASAP on the next tick.
            // Also, because there's some remaining momentum we'll bias the snap in the
            // direction of the ongoing scroll because it's better UX for the scroll to snap
            // in the same direction as the scroll instead of reversing to snap.  Therefore,
            // if it's already scrolled more than 20% in the current direction, keep going.
            var snapToThreshold = delta > 0 ? 0.8 : 0.2;
            lastEventBeforeSnap = _newEvent;
            recentWheelEvents.splice(0);
            timeout = (0, _utils.nextTick)(function () {
              swiper.slideToClosest(swiper.params.speed, true, undefined, snapToThreshold);
            }, 0); // no delay; move on next tick
          }

          if (!timeout) {
            // if we get here, then we haven't detected the end of a momentum scroll, so
            // we'll consider a scroll "complete" when there haven't been any wheel events
            // for 500ms.
            timeout = (0, _utils.nextTick)(function () {
              var snapToThreshold = 0.5;
              lastEventBeforeSnap = _newEvent;
              recentWheelEvents.splice(0);
              swiper.slideToClosest(swiper.params.speed, true, undefined, snapToThreshold);
            }, 500);
          }
        }

        // Emit event
        if (!ignoreWheelEvents) emit('scroll', e);

        // Stop autoplay
        if (swiper.params.autoplay && swiper.params.autoplayDisableOnInteraction) swiper.autoplay.stop();
        // Return page scroll on edge positions
        if (position === swiper.minTranslate() || position === swiper.maxTranslate()) return true;
      }
    }
    if (e.preventDefault) e.preventDefault();else e.returnValue = false;
    return false;
  }
  function events(method) {
    var targetEl = swiper.el;
    if (swiper.params.mousewheel.eventsTarget !== 'container') {
      targetEl = document.querySelector(swiper.params.mousewheel.eventsTarget);
    }
    targetEl[method]('mouseenter', handleMouseEnter);
    targetEl[method]('mouseleave', handleMouseLeave);
    targetEl[method]('wheel', handle);
  }
  function enable() {
    if (swiper.params.cssMode) {
      swiper.wrapperEl.removeEventListener('wheel', handle);
      return true;
    }
    if (swiper.mousewheel.enabled) return false;
    events('addEventListener');
    swiper.mousewheel.enabled = true;
    return true;
  }
  function disable() {
    if (swiper.params.cssMode) {
      swiper.wrapperEl.addEventListener(event, handle);
      return true;
    }
    if (!swiper.mousewheel.enabled) return false;
    events('removeEventListener');
    swiper.mousewheel.enabled = false;
    return true;
  }
  on('init', function () {
    if (!swiper.params.mousewheel.enabled && swiper.params.cssMode) {
      disable();
    }
    if (swiper.params.mousewheel.enabled) enable();
  });
  on('destroy', function () {
    if (swiper.params.cssMode) {
      enable();
    }
    if (swiper.mousewheel.enabled) disable();
  });
  Object.assign(swiper.mousewheel, {
    enable: enable,
    disable: disable
  });
}

},{"../../shared/utils.js":102,"ssr-window":6}],85:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = Navigation;
var _createElementIfNotDefined = _interopRequireDefault(require("../../shared/create-element-if-not-defined.js"));
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }
function _toConsumableArray(arr) { return _arrayWithoutHoles(arr) || _iterableToArray(arr) || _unsupportedIterableToArray(arr) || _nonIterableSpread(); }
function _nonIterableSpread() { throw new TypeError("Invalid attempt to spread non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }
function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }
function _iterableToArray(iter) { if (typeof Symbol !== "undefined" && iter[Symbol.iterator] != null || iter["@@iterator"] != null) return Array.from(iter); }
function _arrayWithoutHoles(arr) { if (Array.isArray(arr)) return _arrayLikeToArray(arr); }
function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) arr2[i] = arr[i]; return arr2; }
function Navigation(_ref) {
  var swiper = _ref.swiper,
    extendParams = _ref.extendParams,
    on = _ref.on,
    emit = _ref.emit;
  extendParams({
    navigation: {
      nextEl: null,
      prevEl: null,
      hideOnClick: false,
      disabledClass: 'swiper-button-disabled',
      hiddenClass: 'swiper-button-hidden',
      lockClass: 'swiper-button-lock',
      navigationDisabledClass: 'swiper-navigation-disabled'
    }
  });
  swiper.navigation = {
    nextEl: null,
    prevEl: null
  };
  var makeElementsArray = function makeElementsArray(el) {
    if (!Array.isArray(el)) el = [el].filter(function (e) {
      return !!e;
    });
    return el;
  };
  function getEl(el) {
    var res;
    if (el && typeof el === 'string' && swiper.isElement) {
      res = swiper.el.shadowRoot.querySelector(el);
      if (res) return res;
    }
    if (el) {
      if (typeof el === 'string') res = _toConsumableArray(document.querySelectorAll(el));
      if (swiper.params.uniqueNavElements && typeof el === 'string' && res.length > 1 && swiper.el.querySelectorAll(el).length === 1) {
        res = swiper.el.querySelector(el);
      }
    }
    if (el && !res) return el;
    // if (Array.isArray(res) && res.length === 1) res = res[0];
    return res;
  }
  function toggleEl(el, disabled) {
    var params = swiper.params.navigation;
    el = makeElementsArray(el);
    el.forEach(function (subEl) {
      if (subEl) {
        var _subEl$classList;
        (_subEl$classList = subEl.classList)[disabled ? 'add' : 'remove'].apply(_subEl$classList, _toConsumableArray(params.disabledClass.split(' ')));
        if (subEl.tagName === 'BUTTON') subEl.disabled = disabled;
        if (swiper.params.watchOverflow && swiper.enabled) {
          subEl.classList[swiper.isLocked ? 'add' : 'remove'](params.lockClass);
        }
      }
    });
  }
  function update() {
    // Update Navigation Buttons
    var _swiper$navigation = swiper.navigation,
      nextEl = _swiper$navigation.nextEl,
      prevEl = _swiper$navigation.prevEl;
    if (swiper.params.loop) {
      toggleEl(prevEl, false);
      toggleEl(nextEl, false);
      return;
    }
    toggleEl(prevEl, swiper.isBeginning && !swiper.params.rewind);
    toggleEl(nextEl, swiper.isEnd && !swiper.params.rewind);
  }
  function onPrevClick(e) {
    e.preventDefault();
    if (swiper.isBeginning && !swiper.params.loop && !swiper.params.rewind) return;
    swiper.slidePrev();
    emit('navigationPrev');
  }
  function onNextClick(e) {
    e.preventDefault();
    if (swiper.isEnd && !swiper.params.loop && !swiper.params.rewind) return;
    swiper.slideNext();
    emit('navigationNext');
  }
  function init() {
    var params = swiper.params.navigation;
    swiper.params.navigation = (0, _createElementIfNotDefined["default"])(swiper, swiper.originalParams.navigation, swiper.params.navigation, {
      nextEl: 'swiper-button-next',
      prevEl: 'swiper-button-prev'
    });
    if (!(params.nextEl || params.prevEl)) return;
    var nextEl = getEl(params.nextEl);
    var prevEl = getEl(params.prevEl);
    Object.assign(swiper.navigation, {
      nextEl: nextEl,
      prevEl: prevEl
    });
    nextEl = makeElementsArray(nextEl);
    prevEl = makeElementsArray(prevEl);
    var initButton = function initButton(el, dir) {
      if (el) {
        el.addEventListener('click', dir === 'next' ? onNextClick : onPrevClick);
      }
      if (!swiper.enabled && el) {
        var _el$classList;
        (_el$classList = el.classList).add.apply(_el$classList, _toConsumableArray(params.lockClass.split(' ')));
      }
    };
    nextEl.forEach(function (el) {
      return initButton(el, 'next');
    });
    prevEl.forEach(function (el) {
      return initButton(el, 'prev');
    });
  }
  function destroy() {
    var _swiper$navigation2 = swiper.navigation,
      nextEl = _swiper$navigation2.nextEl,
      prevEl = _swiper$navigation2.prevEl;
    nextEl = makeElementsArray(nextEl);
    prevEl = makeElementsArray(prevEl);
    var destroyButton = function destroyButton(el, dir) {
      var _el$classList2;
      el.removeEventListener('click', dir === 'next' ? onNextClick : onPrevClick);
      (_el$classList2 = el.classList).remove.apply(_el$classList2, _toConsumableArray(swiper.params.navigation.disabledClass.split(' ')));
    };
    nextEl.forEach(function (el) {
      return destroyButton(el, 'next');
    });
    prevEl.forEach(function (el) {
      return destroyButton(el, 'prev');
    });
  }
  on('init', function () {
    if (swiper.params.navigation.enabled === false) {
      // eslint-disable-next-line
      disable();
    } else {
      init();
      update();
    }
  });
  on('toEdge fromEdge lock unlock', function () {
    update();
  });
  on('destroy', function () {
    destroy();
  });
  on('enable disable', function () {
    var _swiper$navigation3 = swiper.navigation,
      nextEl = _swiper$navigation3.nextEl,
      prevEl = _swiper$navigation3.prevEl;
    nextEl = makeElementsArray(nextEl);
    prevEl = makeElementsArray(prevEl);
    [].concat(_toConsumableArray(nextEl), _toConsumableArray(prevEl)).filter(function (el) {
      return !!el;
    }).forEach(function (el) {
      return el.classList[swiper.enabled ? 'remove' : 'add'](swiper.params.navigation.lockClass);
    });
  });
  on('click', function (_s, e) {
    var _swiper$navigation4 = swiper.navigation,
      nextEl = _swiper$navigation4.nextEl,
      prevEl = _swiper$navigation4.prevEl;
    nextEl = makeElementsArray(nextEl);
    prevEl = makeElementsArray(prevEl);
    var targetEl = e.target;
    if (swiper.params.navigation.hideOnClick && !prevEl.includes(targetEl) && !nextEl.includes(targetEl)) {
      if (swiper.pagination && swiper.params.pagination && swiper.params.pagination.clickable && (swiper.pagination.el === targetEl || swiper.pagination.el.contains(targetEl))) return;
      var isHidden;
      if (nextEl.length) {
        isHidden = nextEl[0].classList.contains(swiper.params.navigation.hiddenClass);
      } else if (prevEl.length) {
        isHidden = prevEl[0].classList.contains(swiper.params.navigation.hiddenClass);
      }
      if (isHidden === true) {
        emit('navigationShow');
      } else {
        emit('navigationHide');
      }
      [].concat(_toConsumableArray(nextEl), _toConsumableArray(prevEl)).filter(function (el) {
        return !!el;
      }).forEach(function (el) {
        return el.classList.toggle(swiper.params.navigation.hiddenClass);
      });
    }
  });
  var enable = function enable() {
    var _swiper$el$classList;
    (_swiper$el$classList = swiper.el.classList).remove.apply(_swiper$el$classList, _toConsumableArray(swiper.params.navigation.navigationDisabledClass.split(' ')));
    init();
    update();
  };
  var disable = function disable() {
    var _swiper$el$classList2;
    (_swiper$el$classList2 = swiper.el.classList).add.apply(_swiper$el$classList2, _toConsumableArray(swiper.params.navigation.navigationDisabledClass.split(' ')));
    destroy();
  };
  Object.assign(swiper.navigation, {
    enable: enable,
    disable: disable,
    update: update,
    init: init,
    destroy: destroy
  });
}

},{"../../shared/create-element-if-not-defined.js":93}],86:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = Pagination;
var _classesToSelector = _interopRequireDefault(require("../../shared/classes-to-selector.js"));
var _createElementIfNotDefined = _interopRequireDefault(require("../../shared/create-element-if-not-defined.js"));
var _utils = require("../../shared/utils.js");
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }
function _toConsumableArray(arr) { return _arrayWithoutHoles(arr) || _iterableToArray(arr) || _unsupportedIterableToArray(arr) || _nonIterableSpread(); }
function _nonIterableSpread() { throw new TypeError("Invalid attempt to spread non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }
function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }
function _iterableToArray(iter) { if (typeof Symbol !== "undefined" && iter[Symbol.iterator] != null || iter["@@iterator"] != null) return Array.from(iter); }
function _arrayWithoutHoles(arr) { if (Array.isArray(arr)) return _arrayLikeToArray(arr); }
function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) arr2[i] = arr[i]; return arr2; }
function Pagination(_ref) {
  var swiper = _ref.swiper,
    extendParams = _ref.extendParams,
    on = _ref.on,
    emit = _ref.emit;
  var pfx = 'swiper-pagination';
  extendParams({
    pagination: {
      el: null,
      bulletElement: 'span',
      clickable: false,
      hideOnClick: false,
      renderBullet: null,
      renderProgressbar: null,
      renderFraction: null,
      renderCustom: null,
      progressbarOpposite: false,
      type: 'bullets',
      // 'bullets' or 'progressbar' or 'fraction' or 'custom'
      dynamicBullets: false,
      dynamicMainBullets: 1,
      formatFractionCurrent: function formatFractionCurrent(number) {
        return number;
      },
      formatFractionTotal: function formatFractionTotal(number) {
        return number;
      },
      bulletClass: "".concat(pfx, "-bullet"),
      bulletActiveClass: "".concat(pfx, "-bullet-active"),
      modifierClass: "".concat(pfx, "-"),
      currentClass: "".concat(pfx, "-current"),
      totalClass: "".concat(pfx, "-total"),
      hiddenClass: "".concat(pfx, "-hidden"),
      progressbarFillClass: "".concat(pfx, "-progressbar-fill"),
      progressbarOppositeClass: "".concat(pfx, "-progressbar-opposite"),
      clickableClass: "".concat(pfx, "-clickable"),
      lockClass: "".concat(pfx, "-lock"),
      horizontalClass: "".concat(pfx, "-horizontal"),
      verticalClass: "".concat(pfx, "-vertical"),
      paginationDisabledClass: "".concat(pfx, "-disabled")
    }
  });
  swiper.pagination = {
    el: null,
    bullets: []
  };
  var bulletSize;
  var dynamicBulletIndex = 0;
  var makeElementsArray = function makeElementsArray(el) {
    if (!Array.isArray(el)) el = [el].filter(function (e) {
      return !!e;
    });
    return el;
  };
  function isPaginationDisabled() {
    return !swiper.params.pagination.el || !swiper.pagination.el || Array.isArray(swiper.pagination.el) && swiper.pagination.el.length === 0;
  }
  function setSideBullets(bulletEl, position) {
    var bulletActiveClass = swiper.params.pagination.bulletActiveClass;
    if (!bulletEl) return;
    bulletEl = bulletEl["".concat(position === 'prev' ? 'previous' : 'next', "ElementSibling")];
    if (bulletEl) {
      bulletEl.classList.add("".concat(bulletActiveClass, "-").concat(position));
      bulletEl = bulletEl["".concat(position === 'prev' ? 'previous' : 'next', "ElementSibling")];
      if (bulletEl) {
        bulletEl.classList.add("".concat(bulletActiveClass, "-").concat(position, "-").concat(position));
      }
    }
  }
  function onBulletClick(e) {
    var bulletEl = e.target.closest((0, _classesToSelector["default"])(swiper.params.pagination.bulletClass));
    if (!bulletEl) {
      return;
    }
    e.preventDefault();
    var index = (0, _utils.elementIndex)(bulletEl) * swiper.params.slidesPerGroup;
    if (swiper.params.loop) {
      if (swiper.realIndex === index) return;
      var newSlideIndex = swiper.getSlideIndexByData(index);
      var currentSlideIndex = swiper.getSlideIndexByData(swiper.realIndex);
      if (newSlideIndex > swiper.slides.length - swiper.loopedSlides) {
        swiper.loopFix({
          direction: newSlideIndex > currentSlideIndex ? 'next' : 'prev',
          activeSlideIndex: newSlideIndex,
          slideTo: false
        });
      }
      swiper.slideToLoop(index);
    } else {
      swiper.slideTo(index);
    }
  }
  function update() {
    // Render || Update Pagination bullets/items
    var rtl = swiper.rtl;
    var params = swiper.params.pagination;
    if (isPaginationDisabled()) return;
    var el = swiper.pagination.el;
    el = makeElementsArray(el);
    // Current/Total
    var current;
    var previousIndex;
    var slidesLength = swiper.virtual && swiper.params.virtual.enabled ? swiper.virtual.slides.length : swiper.slides.length;
    var total = swiper.params.loop ? Math.ceil(slidesLength / swiper.params.slidesPerGroup) : swiper.snapGrid.length;
    if (swiper.params.loop) {
      previousIndex = swiper.previousRealIndex || 0;
      current = swiper.params.slidesPerGroup > 1 ? Math.floor(swiper.realIndex / swiper.params.slidesPerGroup) : swiper.realIndex;
    } else if (typeof swiper.snapIndex !== 'undefined') {
      current = swiper.snapIndex;
      previousIndex = swiper.previousSnapIndex;
    } else {
      previousIndex = swiper.previousIndex || 0;
      current = swiper.activeIndex || 0;
    }
    // Types
    if (params.type === 'bullets' && swiper.pagination.bullets && swiper.pagination.bullets.length > 0) {
      var bullets = swiper.pagination.bullets;
      var firstIndex;
      var lastIndex;
      var midIndex;
      if (params.dynamicBullets) {
        bulletSize = (0, _utils.elementOuterSize)(bullets[0], swiper.isHorizontal() ? 'width' : 'height', true);
        el.forEach(function (subEl) {
          subEl.style[swiper.isHorizontal() ? 'width' : 'height'] = "".concat(bulletSize * (params.dynamicMainBullets + 4), "px");
        });
        if (params.dynamicMainBullets > 1 && previousIndex !== undefined) {
          dynamicBulletIndex += current - (previousIndex || 0);
          if (dynamicBulletIndex > params.dynamicMainBullets - 1) {
            dynamicBulletIndex = params.dynamicMainBullets - 1;
          } else if (dynamicBulletIndex < 0) {
            dynamicBulletIndex = 0;
          }
        }
        firstIndex = Math.max(current - dynamicBulletIndex, 0);
        lastIndex = firstIndex + (Math.min(bullets.length, params.dynamicMainBullets) - 1);
        midIndex = (lastIndex + firstIndex) / 2;
      }
      bullets.forEach(function (bulletEl) {
        var _bulletEl$classList;
        var classesToRemove = _toConsumableArray(['', '-next', '-next-next', '-prev', '-prev-prev', '-main'].map(function (suffix) {
          return "".concat(params.bulletActiveClass).concat(suffix);
        })).map(function (s) {
          return typeof s === 'string' && s.includes(' ') ? s.split(' ') : s;
        }).flat();
        (_bulletEl$classList = bulletEl.classList).remove.apply(_bulletEl$classList, _toConsumableArray(classesToRemove));
      });
      if (el.length > 1) {
        bullets.forEach(function (bullet) {
          var bulletIndex = (0, _utils.elementIndex)(bullet);
          if (bulletIndex === current) {
            var _bullet$classList;
            (_bullet$classList = bullet.classList).add.apply(_bullet$classList, _toConsumableArray(params.bulletActiveClass.split(' ')));
          }
          if (params.dynamicBullets) {
            if (bulletIndex >= firstIndex && bulletIndex <= lastIndex) {
              var _bullet$classList2;
              (_bullet$classList2 = bullet.classList).add.apply(_bullet$classList2, _toConsumableArray("".concat(params.bulletActiveClass, "-main").split(' ')));
            }
            if (bulletIndex === firstIndex) {
              setSideBullets(bullet, 'prev');
            }
            if (bulletIndex === lastIndex) {
              setSideBullets(bullet, 'next');
            }
          }
        });
      } else {
        var bullet = bullets[current];
        if (bullet) {
          var _bullet$classList3;
          (_bullet$classList3 = bullet.classList).add.apply(_bullet$classList3, _toConsumableArray(params.bulletActiveClass.split(' ')));
        }
        if (params.dynamicBullets) {
          var firstDisplayedBullet = bullets[firstIndex];
          var lastDisplayedBullet = bullets[lastIndex];
          for (var i = firstIndex; i <= lastIndex; i += 1) {
            if (bullets[i]) {
              var _bullets$i$classList;
              (_bullets$i$classList = bullets[i].classList).add.apply(_bullets$i$classList, _toConsumableArray("".concat(params.bulletActiveClass, "-main").split(' ')));
            }
          }
          setSideBullets(firstDisplayedBullet, 'prev');
          setSideBullets(lastDisplayedBullet, 'next');
        }
      }
      if (params.dynamicBullets) {
        var dynamicBulletsLength = Math.min(bullets.length, params.dynamicMainBullets + 4);
        var bulletsOffset = (bulletSize * dynamicBulletsLength - bulletSize) / 2 - midIndex * bulletSize;
        var offsetProp = rtl ? 'right' : 'left';
        bullets.forEach(function (bullet) {
          bullet.style[swiper.isHorizontal() ? offsetProp : 'top'] = "".concat(bulletsOffset, "px");
        });
      }
    }
    el.forEach(function (subEl, subElIndex) {
      if (params.type === 'fraction') {
        subEl.querySelectorAll((0, _classesToSelector["default"])(params.currentClass)).forEach(function (fractionEl) {
          fractionEl.textContent = params.formatFractionCurrent(current + 1);
        });
        subEl.querySelectorAll((0, _classesToSelector["default"])(params.totalClass)).forEach(function (totalEl) {
          totalEl.textContent = params.formatFractionTotal(total);
        });
      }
      if (params.type === 'progressbar') {
        var progressbarDirection;
        if (params.progressbarOpposite) {
          progressbarDirection = swiper.isHorizontal() ? 'vertical' : 'horizontal';
        } else {
          progressbarDirection = swiper.isHorizontal() ? 'horizontal' : 'vertical';
        }
        var scale = (current + 1) / total;
        var scaleX = 1;
        var scaleY = 1;
        if (progressbarDirection === 'horizontal') {
          scaleX = scale;
        } else {
          scaleY = scale;
        }
        subEl.querySelectorAll((0, _classesToSelector["default"])(params.progressbarFillClass)).forEach(function (progressEl) {
          progressEl.style.transform = "translate3d(0,0,0) scaleX(".concat(scaleX, ") scaleY(").concat(scaleY, ")");
          progressEl.style.transitionDuration = "".concat(swiper.params.speed, "ms");
        });
      }
      if (params.type === 'custom' && params.renderCustom) {
        subEl.innerHTML = params.renderCustom(swiper, current + 1, total);
        if (subElIndex === 0) emit('paginationRender', subEl);
      } else {
        if (subElIndex === 0) emit('paginationRender', subEl);
        emit('paginationUpdate', subEl);
      }
      if (swiper.params.watchOverflow && swiper.enabled) {
        subEl.classList[swiper.isLocked ? 'add' : 'remove'](params.lockClass);
      }
    });
  }
  function render() {
    // Render Container
    var params = swiper.params.pagination;
    if (isPaginationDisabled()) return;
    var slidesLength = swiper.virtual && swiper.params.virtual.enabled ? swiper.virtual.slides.length : swiper.slides.length;
    var el = swiper.pagination.el;
    el = makeElementsArray(el);
    var paginationHTML = '';
    if (params.type === 'bullets') {
      var numberOfBullets = swiper.params.loop ? Math.ceil(slidesLength / swiper.params.slidesPerGroup) : swiper.snapGrid.length;
      if (swiper.params.freeMode && swiper.params.freeMode.enabled && numberOfBullets > slidesLength) {
        numberOfBullets = slidesLength;
      }
      for (var i = 0; i < numberOfBullets; i += 1) {
        if (params.renderBullet) {
          paginationHTML += params.renderBullet.call(swiper, i, params.bulletClass);
        } else {
          paginationHTML += "<".concat(params.bulletElement, " class=\"").concat(params.bulletClass, "\"></").concat(params.bulletElement, ">");
        }
      }
    }
    if (params.type === 'fraction') {
      if (params.renderFraction) {
        paginationHTML = params.renderFraction.call(swiper, params.currentClass, params.totalClass);
      } else {
        paginationHTML = "<span class=\"".concat(params.currentClass, "\"></span>") + ' / ' + "<span class=\"".concat(params.totalClass, "\"></span>");
      }
    }
    if (params.type === 'progressbar') {
      if (params.renderProgressbar) {
        paginationHTML = params.renderProgressbar.call(swiper, params.progressbarFillClass);
      } else {
        paginationHTML = "<span class=\"".concat(params.progressbarFillClass, "\"></span>");
      }
    }
    swiper.pagination.bullets = [];
    el.forEach(function (subEl) {
      if (params.type !== 'custom') {
        subEl.innerHTML = paginationHTML || '';
      }
      if (params.type === 'bullets') {
        var _swiper$pagination$bu;
        (_swiper$pagination$bu = swiper.pagination.bullets).push.apply(_swiper$pagination$bu, _toConsumableArray(subEl.querySelectorAll((0, _classesToSelector["default"])(params.bulletClass))));
      }
    });
    if (params.type !== 'custom') {
      emit('paginationRender', el[0]);
    }
  }
  function init() {
    swiper.params.pagination = (0, _createElementIfNotDefined["default"])(swiper, swiper.originalParams.pagination, swiper.params.pagination, {
      el: 'swiper-pagination'
    });
    var params = swiper.params.pagination;
    if (!params.el) return;
    var el;
    if (typeof params.el === 'string' && swiper.isElement) {
      el = swiper.el.shadowRoot.querySelector(params.el);
    }
    if (!el && typeof params.el === 'string') {
      el = _toConsumableArray(document.querySelectorAll(params.el));
    }
    if (!el) {
      el = params.el;
    }
    if (!el || el.length === 0) return;
    if (swiper.params.uniqueNavElements && typeof params.el === 'string' && Array.isArray(el) && el.length > 1) {
      el = _toConsumableArray(swiper.el.querySelectorAll(params.el));
      // check if it belongs to another nested Swiper
      if (el.length > 1) {
        el = el.filter(function (subEl) {
          if ((0, _utils.elementParents)(subEl, '.swiper')[0] !== swiper.el) return false;
          return true;
        })[0];
      }
    }
    if (Array.isArray(el) && el.length === 1) el = el[0];
    Object.assign(swiper.pagination, {
      el: el
    });
    el = makeElementsArray(el);
    el.forEach(function (subEl) {
      if (params.type === 'bullets' && params.clickable) {
        subEl.classList.add(params.clickableClass);
      }
      subEl.classList.add(params.modifierClass + params.type);
      subEl.classList.add(swiper.isHorizontal() ? params.horizontalClass : params.verticalClass);
      if (params.type === 'bullets' && params.dynamicBullets) {
        subEl.classList.add("".concat(params.modifierClass).concat(params.type, "-dynamic"));
        dynamicBulletIndex = 0;
        if (params.dynamicMainBullets < 1) {
          params.dynamicMainBullets = 1;
        }
      }
      if (params.type === 'progressbar' && params.progressbarOpposite) {
        subEl.classList.add(params.progressbarOppositeClass);
      }
      if (params.clickable) {
        subEl.addEventListener('click', onBulletClick);
      }
      if (!swiper.enabled) {
        subEl.classList.add(params.lockClass);
      }
    });
  }
  function destroy() {
    var params = swiper.params.pagination;
    if (isPaginationDisabled()) return;
    var el = swiper.pagination.el;
    if (el) {
      el = makeElementsArray(el);
      el.forEach(function (subEl) {
        subEl.classList.remove(params.hiddenClass);
        subEl.classList.remove(params.modifierClass + params.type);
        subEl.classList.remove(swiper.isHorizontal() ? params.horizontalClass : params.verticalClass);
        if (params.clickable) {
          subEl.removeEventListener('click', onBulletClick);
        }
      });
    }
    if (swiper.pagination.bullets) swiper.pagination.bullets.forEach(function (subEl) {
      var _subEl$classList;
      return (_subEl$classList = subEl.classList).remove.apply(_subEl$classList, _toConsumableArray(params.bulletActiveClass.split(' ')));
    });
  }
  on('changeDirection', function () {
    if (!swiper.pagination || !swiper.pagination.el) return;
    var params = swiper.params.pagination;
    var el = swiper.pagination.el;
    el = makeElementsArray(el);
    el.forEach(function (subEl) {
      subEl.classList.remove(params.horizontalClass, params.verticalClass);
      subEl.classList.add(swiper.isHorizontal() ? params.horizontalClass : params.verticalClass);
    });
  });
  on('init', function () {
    if (swiper.params.pagination.enabled === false) {
      // eslint-disable-next-line
      disable();
    } else {
      init();
      render();
      update();
    }
  });
  on('activeIndexChange', function () {
    if (typeof swiper.snapIndex === 'undefined') {
      update();
    }
  });
  on('snapIndexChange', function () {
    update();
  });
  on('snapGridLengthChange', function () {
    render();
    update();
  });
  on('destroy', function () {
    destroy();
  });
  on('enable disable', function () {
    var el = swiper.pagination.el;
    if (el) {
      el = makeElementsArray(el);
      el.forEach(function (subEl) {
        return subEl.classList[swiper.enabled ? 'remove' : 'add'](swiper.params.pagination.lockClass);
      });
    }
  });
  on('lock unlock', function () {
    update();
  });
  on('click', function (_s, e) {
    var targetEl = e.target;
    var el = swiper.pagination.el;
    if (!Array.isArray(el)) el = [el].filter(function (element) {
      return !!element;
    });
    if (swiper.params.pagination.el && swiper.params.pagination.hideOnClick && el && el.length > 0 && !targetEl.classList.contains(swiper.params.pagination.bulletClass)) {
      if (swiper.navigation && (swiper.navigation.nextEl && targetEl === swiper.navigation.nextEl || swiper.navigation.prevEl && targetEl === swiper.navigation.prevEl)) return;
      var isHidden = el[0].classList.contains(swiper.params.pagination.hiddenClass);
      if (isHidden === true) {
        emit('paginationShow');
      } else {
        emit('paginationHide');
      }
      el.forEach(function (subEl) {
        return subEl.classList.toggle(swiper.params.pagination.hiddenClass);
      });
    }
  });
  var enable = function enable() {
    swiper.el.classList.remove(swiper.params.pagination.paginationDisabledClass);
    var el = swiper.pagination.el;
    if (el) {
      el = makeElementsArray(el);
      el.forEach(function (subEl) {
        return subEl.classList.remove(swiper.params.pagination.paginationDisabledClass);
      });
    }
    init();
    render();
    update();
  };
  var disable = function disable() {
    swiper.el.classList.add(swiper.params.pagination.paginationDisabledClass);
    var el = swiper.pagination.el;
    if (el) {
      el = makeElementsArray(el);
      el.forEach(function (subEl) {
        return subEl.classList.add(swiper.params.pagination.paginationDisabledClass);
      });
    }
    destroy();
  };
  Object.assign(swiper.pagination, {
    enable: enable,
    disable: disable,
    render: render,
    update: update,
    init: init,
    destroy: destroy
  });
}

},{"../../shared/classes-to-selector.js":92,"../../shared/create-element-if-not-defined.js":93,"../../shared/utils.js":102}],87:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = Parallax;
var _utils = require("../../shared/utils.js");
function Parallax(_ref) {
  var swiper = _ref.swiper,
    extendParams = _ref.extendParams,
    on = _ref.on;
  extendParams({
    parallax: {
      enabled: false
    }
  });
  var setTransform = function setTransform(el, progress) {
    var rtl = swiper.rtl;
    var rtlFactor = rtl ? -1 : 1;
    var p = el.getAttribute('data-swiper-parallax') || '0';
    var x = el.getAttribute('data-swiper-parallax-x');
    var y = el.getAttribute('data-swiper-parallax-y');
    var scale = el.getAttribute('data-swiper-parallax-scale');
    var opacity = el.getAttribute('data-swiper-parallax-opacity');
    var rotate = el.getAttribute('data-swiper-parallax-rotate');
    if (x || y) {
      x = x || '0';
      y = y || '0';
    } else if (swiper.isHorizontal()) {
      x = p;
      y = '0';
    } else {
      y = p;
      x = '0';
    }
    if (x.indexOf('%') >= 0) {
      x = "".concat(parseInt(x, 10) * progress * rtlFactor, "%");
    } else {
      x = "".concat(x * progress * rtlFactor, "px");
    }
    if (y.indexOf('%') >= 0) {
      y = "".concat(parseInt(y, 10) * progress, "%");
    } else {
      y = "".concat(y * progress, "px");
    }
    if (typeof opacity !== 'undefined' && opacity !== null) {
      var currentOpacity = opacity - (opacity - 1) * (1 - Math.abs(progress));
      el.style.opacity = currentOpacity;
    }
    var transform = "translate3d(".concat(x, ", ").concat(y, ", 0px)");
    if (typeof scale !== 'undefined' && scale !== null) {
      var currentScale = scale - (scale - 1) * (1 - Math.abs(progress));
      transform += " scale(".concat(currentScale, ")");
    }
    if (rotate && typeof rotate !== 'undefined' && rotate !== null) {
      var currentRotate = rotate * progress * -1;
      transform += " rotate(".concat(currentRotate, "deg)");
    }
    el.style.transform = transform;
  };
  var setTranslate = function setTranslate() {
    var el = swiper.el,
      slides = swiper.slides,
      progress = swiper.progress,
      snapGrid = swiper.snapGrid;
    (0, _utils.elementChildren)(el, '[data-swiper-parallax], [data-swiper-parallax-x], [data-swiper-parallax-y], [data-swiper-parallax-opacity], [data-swiper-parallax-scale]').forEach(function (subEl) {
      setTransform(subEl, progress);
    });
    slides.forEach(function (slideEl, slideIndex) {
      var slideProgress = slideEl.progress;
      if (swiper.params.slidesPerGroup > 1 && swiper.params.slidesPerView !== 'auto') {
        slideProgress += Math.ceil(slideIndex / 2) - progress * (snapGrid.length - 1);
      }
      slideProgress = Math.min(Math.max(slideProgress, -1), 1);
      slideEl.querySelectorAll('[data-swiper-parallax], [data-swiper-parallax-x], [data-swiper-parallax-y], [data-swiper-parallax-opacity], [data-swiper-parallax-scale], [data-swiper-parallax-rotate]').forEach(function (subEl) {
        setTransform(subEl, slideProgress);
      });
    });
  };
  var setTransition = function setTransition() {
    var duration = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : swiper.params.speed;
    var el = swiper.el;
    el.querySelectorAll('[data-swiper-parallax], [data-swiper-parallax-x], [data-swiper-parallax-y], [data-swiper-parallax-opacity], [data-swiper-parallax-scale]').forEach(function (parallaxEl) {
      var parallaxDuration = parseInt(parallaxEl.getAttribute('data-swiper-parallax-duration'), 10) || duration;
      if (duration === 0) parallaxDuration = 0;
      parallaxEl.style.transitionDuration = "".concat(parallaxDuration, "ms");
    });
  };
  on('beforeInit', function () {
    if (!swiper.params.parallax.enabled) return;
    swiper.params.watchSlidesProgress = true;
    swiper.originalParams.watchSlidesProgress = true;
  });
  on('init', function () {
    if (!swiper.params.parallax.enabled) return;
    setTranslate();
  });
  on('setTranslate', function () {
    if (!swiper.params.parallax.enabled) return;
    setTranslate();
  });
  on('setTransition', function (_swiper, duration) {
    if (!swiper.params.parallax.enabled) return;
    setTransition(duration);
  });
}

},{"../../shared/utils.js":102}],88:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = Scrollbar;
var _ssrWindow = require("ssr-window");
var _utils = require("../../shared/utils.js");
var _createElementIfNotDefined = _interopRequireDefault(require("../../shared/create-element-if-not-defined.js"));
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }
function Scrollbar(_ref) {
  var swiper = _ref.swiper,
    extendParams = _ref.extendParams,
    on = _ref.on,
    emit = _ref.emit;
  var document = (0, _ssrWindow.getDocument)();
  var isTouched = false;
  var timeout = null;
  var dragTimeout = null;
  var dragStartPos;
  var dragSize;
  var trackSize;
  var divider;
  extendParams({
    scrollbar: {
      el: null,
      dragSize: 'auto',
      hide: false,
      draggable: false,
      snapOnRelease: true,
      lockClass: 'swiper-scrollbar-lock',
      dragClass: 'swiper-scrollbar-drag',
      scrollbarDisabledClass: 'swiper-scrollbar-disabled',
      horizontalClass: "swiper-scrollbar-horizontal",
      verticalClass: "swiper-scrollbar-vertical"
    }
  });
  swiper.scrollbar = {
    el: null,
    dragEl: null
  };
  function setTranslate() {
    if (!swiper.params.scrollbar.el || !swiper.scrollbar.el) return;
    var scrollbar = swiper.scrollbar,
      rtl = swiper.rtlTranslate;
    var dragEl = scrollbar.dragEl,
      el = scrollbar.el;
    var params = swiper.params.scrollbar;
    var progress = swiper.params.loop ? swiper.progressLoop : swiper.progress;
    var newSize = dragSize;
    var newPos = (trackSize - dragSize) * progress;
    if (rtl) {
      newPos = -newPos;
      if (newPos > 0) {
        newSize = dragSize - newPos;
        newPos = 0;
      } else if (-newPos + dragSize > trackSize) {
        newSize = trackSize + newPos;
      }
    } else if (newPos < 0) {
      newSize = dragSize + newPos;
      newPos = 0;
    } else if (newPos + dragSize > trackSize) {
      newSize = trackSize - newPos;
    }
    if (swiper.isHorizontal()) {
      dragEl.style.transform = "translate3d(".concat(newPos, "px, 0, 0)");
      dragEl.style.width = "".concat(newSize, "px");
    } else {
      dragEl.style.transform = "translate3d(0px, ".concat(newPos, "px, 0)");
      dragEl.style.height = "".concat(newSize, "px");
    }
    if (params.hide) {
      clearTimeout(timeout);
      el.style.opacity = 1;
      timeout = setTimeout(function () {
        el.style.opacity = 0;
        el.style.transitionDuration = '400ms';
      }, 1000);
    }
  }
  function setTransition(duration) {
    if (!swiper.params.scrollbar.el || !swiper.scrollbar.el) return;
    swiper.scrollbar.dragEl.style.transitionDuration = "".concat(duration, "ms");
  }
  function updateSize() {
    if (!swiper.params.scrollbar.el || !swiper.scrollbar.el) return;
    var scrollbar = swiper.scrollbar;
    var dragEl = scrollbar.dragEl,
      el = scrollbar.el;
    dragEl.style.width = '';
    dragEl.style.height = '';
    trackSize = swiper.isHorizontal() ? el.offsetWidth : el.offsetHeight;
    divider = swiper.size / (swiper.virtualSize + swiper.params.slidesOffsetBefore - (swiper.params.centeredSlides ? swiper.snapGrid[0] : 0));
    if (swiper.params.scrollbar.dragSize === 'auto') {
      dragSize = trackSize * divider;
    } else {
      dragSize = parseInt(swiper.params.scrollbar.dragSize, 10);
    }
    if (swiper.isHorizontal()) {
      dragEl.style.width = "".concat(dragSize, "px");
    } else {
      dragEl.style.height = "".concat(dragSize, "px");
    }
    if (divider >= 1) {
      el.style.display = 'none';
    } else {
      el.style.display = '';
    }
    if (swiper.params.scrollbar.hide) {
      el.style.opacity = 0;
    }
    if (swiper.params.watchOverflow && swiper.enabled) {
      scrollbar.el.classList[swiper.isLocked ? 'add' : 'remove'](swiper.params.scrollbar.lockClass);
    }
  }
  function getPointerPosition(e) {
    return swiper.isHorizontal() ? e.clientX : e.clientY;
  }
  function setDragPosition(e) {
    var scrollbar = swiper.scrollbar,
      rtl = swiper.rtlTranslate;
    var el = scrollbar.el;
    var positionRatio;
    positionRatio = (getPointerPosition(e) - (0, _utils.elementOffset)(el)[swiper.isHorizontal() ? 'left' : 'top'] - (dragStartPos !== null ? dragStartPos : dragSize / 2)) / (trackSize - dragSize);
    positionRatio = Math.max(Math.min(positionRatio, 1), 0);
    if (rtl) {
      positionRatio = 1 - positionRatio;
    }
    var position = swiper.minTranslate() + (swiper.maxTranslate() - swiper.minTranslate()) * positionRatio;
    swiper.updateProgress(position);
    swiper.setTranslate(position);
    swiper.updateActiveIndex();
    swiper.updateSlidesClasses();
  }
  function onDragStart(e) {
    var params = swiper.params.scrollbar;
    var scrollbar = swiper.scrollbar,
      wrapperEl = swiper.wrapperEl;
    var el = scrollbar.el,
      dragEl = scrollbar.dragEl;
    isTouched = true;
    dragStartPos = e.target === dragEl ? getPointerPosition(e) - e.target.getBoundingClientRect()[swiper.isHorizontal() ? 'left' : 'top'] : null;
    e.preventDefault();
    e.stopPropagation();
    wrapperEl.style.transitionDuration = '100ms';
    dragEl.style.transitionDuration = '100ms';
    setDragPosition(e);
    clearTimeout(dragTimeout);
    el.style.transitionDuration = '0ms';
    if (params.hide) {
      el.style.opacity = 1;
    }
    if (swiper.params.cssMode) {
      swiper.wrapperEl.style['scroll-snap-type'] = 'none';
    }
    emit('scrollbarDragStart', e);
  }
  function onDragMove(e) {
    var scrollbar = swiper.scrollbar,
      wrapperEl = swiper.wrapperEl;
    var el = scrollbar.el,
      dragEl = scrollbar.dragEl;
    if (!isTouched) return;
    if (e.preventDefault) e.preventDefault();else e.returnValue = false;
    setDragPosition(e);
    wrapperEl.style.transitionDuration = '0ms';
    el.style.transitionDuration = '0ms';
    dragEl.style.transitionDuration = '0ms';
    emit('scrollbarDragMove', e);
  }
  function onDragEnd(e) {
    var params = swiper.params.scrollbar;
    var scrollbar = swiper.scrollbar,
      wrapperEl = swiper.wrapperEl;
    var el = scrollbar.el;
    if (!isTouched) return;
    isTouched = false;
    if (swiper.params.cssMode) {
      swiper.wrapperEl.style['scroll-snap-type'] = '';
      wrapperEl.style.transitionDuration = '';
    }
    if (params.hide) {
      clearTimeout(dragTimeout);
      dragTimeout = (0, _utils.nextTick)(function () {
        el.style.opacity = 0;
        el.style.transitionDuration = '400ms';
      }, 1000);
    }
    emit('scrollbarDragEnd', e);
    if (params.snapOnRelease) {
      swiper.slideToClosest();
    }
  }
  function events(method) {
    var scrollbar = swiper.scrollbar,
      params = swiper.params;
    var el = scrollbar.el;
    if (!el) return;
    var target = el;
    var activeListener = params.passiveListeners ? {
      passive: false,
      capture: false
    } : false;
    var passiveListener = params.passiveListeners ? {
      passive: true,
      capture: false
    } : false;
    if (!target) return;
    var eventMethod = method === 'on' ? 'addEventListener' : 'removeEventListener';
    target[eventMethod]('pointerdown', onDragStart, activeListener);
    document[eventMethod]('pointermove', onDragMove, activeListener);
    document[eventMethod]('pointerup', onDragEnd, passiveListener);
  }
  function enableDraggable() {
    if (!swiper.params.scrollbar.el || !swiper.scrollbar.el) return;
    events('on');
  }
  function disableDraggable() {
    if (!swiper.params.scrollbar.el || !swiper.scrollbar.el) return;
    events('off');
  }
  function init() {
    var scrollbar = swiper.scrollbar,
      swiperEl = swiper.el;
    swiper.params.scrollbar = (0, _createElementIfNotDefined["default"])(swiper, swiper.originalParams.scrollbar, swiper.params.scrollbar, {
      el: 'swiper-scrollbar'
    });
    var params = swiper.params.scrollbar;
    if (!params.el) return;
    var el;
    if (typeof params.el === 'string' && swiper.isElement) {
      el = swiper.el.shadowRoot.querySelector(params.el);
    }
    if (!el && typeof params.el === 'string') {
      el = document.querySelectorAll(params.el);
    } else if (!el) {
      el = params.el;
    }
    if (swiper.params.uniqueNavElements && typeof params.el === 'string' && el.length > 1 && swiperEl.querySelectorAll(params.el).length === 1) {
      el = swiperEl.querySelector(params.el);
    }
    if (el.length > 0) el = el[0];
    el.classList.add(swiper.isHorizontal() ? params.horizontalClass : params.verticalClass);
    var dragEl;
    if (el) {
      dragEl = el.querySelector(".".concat(swiper.params.scrollbar.dragClass));
      if (!dragEl) {
        dragEl = (0, _utils.createElement)('div', swiper.params.scrollbar.dragClass);
        el.append(dragEl);
      }
    }
    Object.assign(scrollbar, {
      el: el,
      dragEl: dragEl
    });
    if (params.draggable) {
      enableDraggable();
    }
    if (el) {
      el.classList[swiper.enabled ? 'remove' : 'add'](swiper.params.scrollbar.lockClass);
    }
  }
  function destroy() {
    var params = swiper.params.scrollbar;
    var el = swiper.scrollbar.el;
    if (el) {
      el.classList.remove(swiper.isHorizontal() ? params.horizontalClass : params.verticalClass);
    }
    disableDraggable();
  }
  on('init', function () {
    if (swiper.params.scrollbar.enabled === false) {
      // eslint-disable-next-line
      disable();
    } else {
      init();
      updateSize();
      setTranslate();
    }
  });
  on('update resize observerUpdate lock unlock', function () {
    updateSize();
  });
  on('setTranslate', function () {
    setTranslate();
  });
  on('setTransition', function (_s, duration) {
    setTransition(duration);
  });
  on('enable disable', function () {
    var el = swiper.scrollbar.el;
    if (el) {
      el.classList[swiper.enabled ? 'remove' : 'add'](swiper.params.scrollbar.lockClass);
    }
  });
  on('destroy', function () {
    destroy();
  });
  var enable = function enable() {
    swiper.el.classList.remove(swiper.params.scrollbar.scrollbarDisabledClass);
    if (swiper.scrollbar.el) {
      swiper.scrollbar.el.classList.remove(swiper.params.scrollbar.scrollbarDisabledClass);
    }
    init();
    updateSize();
    setTranslate();
  };
  var disable = function disable() {
    swiper.el.classList.add(swiper.params.scrollbar.scrollbarDisabledClass);
    if (swiper.scrollbar.el) {
      swiper.scrollbar.el.classList.add(swiper.params.scrollbar.scrollbarDisabledClass);
    }
    destroy();
  };
  Object.assign(swiper.scrollbar, {
    enable: enable,
    disable: disable,
    updateSize: updateSize,
    setTranslate: setTranslate,
    init: init,
    destroy: destroy
  });
}

},{"../../shared/create-element-if-not-defined.js":93,"../../shared/utils.js":102,"ssr-window":6}],89:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = Thumb;
var _ssrWindow = require("ssr-window");
var _utils = require("../../shared/utils.js");
function Thumb(_ref) {
  var swiper = _ref.swiper,
    extendParams = _ref.extendParams,
    on = _ref.on;
  extendParams({
    thumbs: {
      swiper: null,
      multipleActiveThumbs: true,
      autoScrollOffset: 0,
      slideThumbActiveClass: 'swiper-slide-thumb-active',
      thumbsContainerClass: 'swiper-thumbs'
    }
  });
  var initialized = false;
  var swiperCreated = false;
  swiper.thumbs = {
    swiper: null
  };
  function onThumbClick() {
    var thumbsSwiper = swiper.thumbs.swiper;
    if (!thumbsSwiper || thumbsSwiper.destroyed) return;
    var clickedIndex = thumbsSwiper.clickedIndex;
    var clickedSlide = thumbsSwiper.clickedSlide;
    if (clickedSlide && clickedSlide.classList.contains(swiper.params.thumbs.slideThumbActiveClass)) return;
    if (typeof clickedIndex === 'undefined' || clickedIndex === null) return;
    var slideToIndex;
    if (thumbsSwiper.params.loop) {
      slideToIndex = parseInt(thumbsSwiper.clickedSlide.getAttribute('data-swiper-slide-index'), 10);
    } else {
      slideToIndex = clickedIndex;
    }
    if (swiper.params.loop) {
      swiper.slideToLoop(slideToIndex);
    } else {
      swiper.slideTo(slideToIndex);
    }
  }
  function init() {
    var thumbsParams = swiper.params.thumbs;
    if (initialized) return false;
    initialized = true;
    var SwiperClass = swiper.constructor;
    if (thumbsParams.swiper instanceof SwiperClass) {
      swiper.thumbs.swiper = thumbsParams.swiper;
      Object.assign(swiper.thumbs.swiper.originalParams, {
        watchSlidesProgress: true,
        slideToClickedSlide: false
      });
      Object.assign(swiper.thumbs.swiper.params, {
        watchSlidesProgress: true,
        slideToClickedSlide: false
      });
      swiper.thumbs.swiper.update();
    } else if ((0, _utils.isObject)(thumbsParams.swiper)) {
      var thumbsSwiperParams = Object.assign({}, thumbsParams.swiper);
      Object.assign(thumbsSwiperParams, {
        watchSlidesProgress: true,
        slideToClickedSlide: false
      });
      swiper.thumbs.swiper = new SwiperClass(thumbsSwiperParams);
      swiperCreated = true;
    }
    swiper.thumbs.swiper.el.classList.add(swiper.params.thumbs.thumbsContainerClass);
    swiper.thumbs.swiper.on('tap', onThumbClick);
    return true;
  }
  function update(initial) {
    var thumbsSwiper = swiper.thumbs.swiper;
    if (!thumbsSwiper || thumbsSwiper.destroyed) return;
    var slidesPerView = thumbsSwiper.params.slidesPerView === 'auto' ? thumbsSwiper.slidesPerViewDynamic() : thumbsSwiper.params.slidesPerView;

    // Activate thumbs
    var thumbsToActivate = 1;
    var thumbActiveClass = swiper.params.thumbs.slideThumbActiveClass;
    if (swiper.params.slidesPerView > 1 && !swiper.params.centeredSlides) {
      thumbsToActivate = swiper.params.slidesPerView;
    }
    if (!swiper.params.thumbs.multipleActiveThumbs) {
      thumbsToActivate = 1;
    }
    thumbsToActivate = Math.floor(thumbsToActivate);
    thumbsSwiper.slides.forEach(function (slideEl) {
      return slideEl.classList.remove(thumbActiveClass);
    });
    if (thumbsSwiper.params.loop || thumbsSwiper.params.virtual && thumbsSwiper.params.virtual.enabled) {
      for (var i = 0; i < thumbsToActivate; i += 1) {
        (0, _utils.elementChildren)(thumbsSwiper.slidesEl, "[data-swiper-slide-index=\"".concat(swiper.realIndex + i, "\"]")).forEach(function (slideEl) {
          slideEl.classList.add(thumbActiveClass);
        });
      }
    } else {
      for (var _i = 0; _i < thumbsToActivate; _i += 1) {
        if (thumbsSwiper.slides[swiper.realIndex + _i]) {
          thumbsSwiper.slides[swiper.realIndex + _i].classList.add(thumbActiveClass);
        }
      }
    }
    var autoScrollOffset = swiper.params.thumbs.autoScrollOffset;
    var useOffset = autoScrollOffset && !thumbsSwiper.params.loop;
    if (swiper.realIndex !== thumbsSwiper.realIndex || useOffset) {
      var currentThumbsIndex = thumbsSwiper.activeIndex;
      var newThumbsIndex;
      var direction;
      if (thumbsSwiper.params.loop) {
        var newThumbsSlide = thumbsSwiper.slides.filter(function (slideEl) {
          return slideEl.getAttribute('data-swiper-slide-index') === "".concat(swiper.realIndex);
        })[0];
        newThumbsIndex = thumbsSwiper.slides.indexOf(newThumbsSlide);
        direction = swiper.activeIndex > swiper.previousIndex ? 'next' : 'prev';
      } else {
        newThumbsIndex = swiper.realIndex;
        direction = newThumbsIndex > swiper.previousIndex ? 'next' : 'prev';
      }
      if (useOffset) {
        newThumbsIndex += direction === 'next' ? autoScrollOffset : -1 * autoScrollOffset;
      }
      if (thumbsSwiper.visibleSlidesIndexes && thumbsSwiper.visibleSlidesIndexes.indexOf(newThumbsIndex) < 0) {
        if (thumbsSwiper.params.centeredSlides) {
          if (newThumbsIndex > currentThumbsIndex) {
            newThumbsIndex = newThumbsIndex - Math.floor(slidesPerView / 2) + 1;
          } else {
            newThumbsIndex = newThumbsIndex + Math.floor(slidesPerView / 2) - 1;
          }
        } else if (newThumbsIndex > currentThumbsIndex && thumbsSwiper.params.slidesPerGroup === 1) {
          // newThumbsIndex = newThumbsIndex - slidesPerView + 1;
        }
        thumbsSwiper.slideTo(newThumbsIndex, initial ? 0 : undefined);
      }
    }
  }
  on('beforeInit', function () {
    var thumbs = swiper.params.thumbs;
    if (!thumbs || !thumbs.swiper) return;
    if (typeof thumbs.swiper === 'string' || thumbs.swiper instanceof HTMLElement) {
      var document = (0, _ssrWindow.getDocument)();
      var getThumbsElementAndInit = function getThumbsElementAndInit() {
        var thumbsElement = typeof thumbs.swiper === 'string' ? document.querySelector(thumbs.swiper) : thumbs.swiper;
        if (thumbsElement && thumbsElement.swiper) {
          thumbs.swiper = thumbsElement.swiper;
          init();
          update(true);
        } else if (thumbsElement) {
          var onThumbsSwiper = function onThumbsSwiper(e) {
            thumbs.swiper = e.detail[0];
            thumbsElement.removeEventListener('init', onThumbsSwiper);
            init();
            update(true);
            thumbs.swiper.update();
            swiper.update();
          };
          thumbsElement.addEventListener('init', onThumbsSwiper);
        }
        return thumbsElement;
      };
      var watchForThumbsToAppear = function watchForThumbsToAppear() {
        if (swiper.destroyed) return;
        var thumbsElement = getThumbsElementAndInit();
        if (!thumbsElement) {
          requestAnimationFrame(watchForThumbsToAppear);
        }
      };
      requestAnimationFrame(watchForThumbsToAppear);
    } else {
      init();
      update(true);
    }
  });
  on('slideChange update resize observerUpdate', function () {
    update();
  });
  on('setTransition', function (_s, duration) {
    var thumbsSwiper = swiper.thumbs.swiper;
    if (!thumbsSwiper || thumbsSwiper.destroyed) return;
    thumbsSwiper.setTransition(duration);
  });
  on('beforeDestroy', function () {
    var thumbsSwiper = swiper.thumbs.swiper;
    if (!thumbsSwiper || thumbsSwiper.destroyed) return;
    if (swiperCreated) {
      thumbsSwiper.destroy();
    }
  });
  Object.assign(swiper.thumbs, {
    init: init,
    update: update
  });
}

},{"../../shared/utils.js":102,"ssr-window":6}],90:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = Virtual;
var _ssrWindow = require("ssr-window");
var _utils = require("../../shared/utils.js");
function _toConsumableArray(arr) { return _arrayWithoutHoles(arr) || _iterableToArray(arr) || _unsupportedIterableToArray(arr) || _nonIterableSpread(); }
function _nonIterableSpread() { throw new TypeError("Invalid attempt to spread non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }
function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }
function _iterableToArray(iter) { if (typeof Symbol !== "undefined" && iter[Symbol.iterator] != null || iter["@@iterator"] != null) return Array.from(iter); }
function _arrayWithoutHoles(arr) { if (Array.isArray(arr)) return _arrayLikeToArray(arr); }
function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) arr2[i] = arr[i]; return arr2; }
function _typeof(obj) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (obj) { return typeof obj; } : function (obj) { return obj && "function" == typeof Symbol && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }, _typeof(obj); }
function Virtual(_ref) {
  var swiper = _ref.swiper,
    extendParams = _ref.extendParams,
    on = _ref.on,
    emit = _ref.emit;
  extendParams({
    virtual: {
      enabled: false,
      slides: [],
      cache: true,
      renderSlide: null,
      renderExternal: null,
      renderExternalUpdate: true,
      addSlidesBefore: 0,
      addSlidesAfter: 0
    }
  });
  var cssModeTimeout;
  var document = (0, _ssrWindow.getDocument)();
  swiper.virtual = {
    cache: {},
    from: undefined,
    to: undefined,
    slides: [],
    offset: 0,
    slidesGrid: []
  };
  var tempDOM = document.createElement('div');
  function renderSlide(slide, index) {
    var params = swiper.params.virtual;
    if (params.cache && swiper.virtual.cache[index]) {
      return swiper.virtual.cache[index];
    }
    // eslint-disable-next-line
    var slideEl;
    if (params.renderSlide) {
      slideEl = params.renderSlide.call(swiper, slide, index);
      if (typeof slideEl === 'string') {
        tempDOM.innerHTML = slideEl;
        slideEl = tempDOM.children[0];
      }
    } else if (swiper.isElement) {
      slideEl = (0, _utils.createElement)('swiper-slide');
    } else {
      slideEl = (0, _utils.createElement)('div', swiper.params.slideClass);
    }
    slideEl.setAttribute('data-swiper-slide-index', index);
    if (!params.renderSlide) {
      slideEl.innerHTML = slide;
    }
    if (params.cache) swiper.virtual.cache[index] = slideEl;
    return slideEl;
  }
  function update(force) {
    var _swiper$params = swiper.params,
      slidesPerView = _swiper$params.slidesPerView,
      slidesPerGroup = _swiper$params.slidesPerGroup,
      centeredSlides = _swiper$params.centeredSlides,
      isLoop = _swiper$params.loop;
    var _swiper$params$virtua = swiper.params.virtual,
      addSlidesBefore = _swiper$params$virtua.addSlidesBefore,
      addSlidesAfter = _swiper$params$virtua.addSlidesAfter;
    var _swiper$virtual = swiper.virtual,
      previousFrom = _swiper$virtual.from,
      previousTo = _swiper$virtual.to,
      slides = _swiper$virtual.slides,
      previousSlidesGrid = _swiper$virtual.slidesGrid,
      previousOffset = _swiper$virtual.offset;
    if (!swiper.params.cssMode) {
      swiper.updateActiveIndex();
    }
    var activeIndex = swiper.activeIndex || 0;
    var offsetProp;
    if (swiper.rtlTranslate) offsetProp = 'right';else offsetProp = swiper.isHorizontal() ? 'left' : 'top';
    var slidesAfter;
    var slidesBefore;
    if (centeredSlides) {
      slidesAfter = Math.floor(slidesPerView / 2) + slidesPerGroup + addSlidesAfter;
      slidesBefore = Math.floor(slidesPerView / 2) + slidesPerGroup + addSlidesBefore;
    } else {
      slidesAfter = slidesPerView + (slidesPerGroup - 1) + addSlidesAfter;
      slidesBefore = (isLoop ? slidesPerView : slidesPerGroup) + addSlidesBefore;
    }
    var from = activeIndex - slidesBefore;
    var to = activeIndex + slidesAfter;
    if (!isLoop) {
      from = Math.max(from, 0);
      to = Math.min(to, slides.length - 1);
    }
    var offset = (swiper.slidesGrid[from] || 0) - (swiper.slidesGrid[0] || 0);
    if (isLoop && activeIndex >= slidesBefore) {
      from -= slidesBefore;
      if (!centeredSlides) offset += swiper.slidesGrid[0];
    } else if (isLoop && activeIndex < slidesBefore) {
      from = -slidesBefore;
      if (centeredSlides) offset += swiper.slidesGrid[0];
    }
    Object.assign(swiper.virtual, {
      from: from,
      to: to,
      offset: offset,
      slidesGrid: swiper.slidesGrid,
      slidesBefore: slidesBefore,
      slidesAfter: slidesAfter
    });
    function onRendered() {
      swiper.updateSlides();
      swiper.updateProgress();
      swiper.updateSlidesClasses();
      emit('virtualUpdate');
    }
    if (previousFrom === from && previousTo === to && !force) {
      if (swiper.slidesGrid !== previousSlidesGrid && offset !== previousOffset) {
        swiper.slides.forEach(function (slideEl) {
          slideEl.style[offsetProp] = "".concat(offset - Math.abs(swiper.cssOverflowAdjustment()), "px");
        });
      }
      swiper.updateProgress();
      emit('virtualUpdate');
      return;
    }
    if (swiper.params.virtual.renderExternal) {
      swiper.params.virtual.renderExternal.call(swiper, {
        offset: offset,
        from: from,
        to: to,
        slides: function getSlides() {
          var slidesToRender = [];
          for (var i = from; i <= to; i += 1) {
            slidesToRender.push(slides[i]);
          }
          return slidesToRender;
        }()
      });
      if (swiper.params.virtual.renderExternalUpdate) {
        onRendered();
      } else {
        emit('virtualUpdate');
      }
      return;
    }
    var prependIndexes = [];
    var appendIndexes = [];
    var getSlideIndex = function getSlideIndex(index) {
      var slideIndex = index;
      if (index < 0) {
        slideIndex = slides.length + index;
      } else if (slideIndex >= slides.length) {
        // eslint-disable-next-line
        slideIndex = slideIndex - slides.length;
      }
      return slideIndex;
    };
    if (force) {
      swiper.slidesEl.querySelectorAll(".".concat(swiper.params.slideClass, ", swiper-slide")).forEach(function (slideEl) {
        slideEl.remove();
      });
    } else {
      for (var i = previousFrom; i <= previousTo; i += 1) {
        if (i < from || i > to) {
          var slideIndex = getSlideIndex(i);
          swiper.slidesEl.querySelectorAll(".".concat(swiper.params.slideClass, "[data-swiper-slide-index=\"").concat(slideIndex, "\"], swiper-slide[data-swiper-slide-index=\"").concat(slideIndex, "\"]")).forEach(function (slideEl) {
            slideEl.remove();
          });
        }
      }
    }
    var loopFrom = isLoop ? -slides.length : 0;
    var loopTo = isLoop ? slides.length * 2 : slides.length;
    for (var _i = loopFrom; _i < loopTo; _i += 1) {
      if (_i >= from && _i <= to) {
        var _slideIndex = getSlideIndex(_i);
        if (typeof previousTo === 'undefined' || force) {
          appendIndexes.push(_slideIndex);
        } else {
          if (_i > previousTo) appendIndexes.push(_slideIndex);
          if (_i < previousFrom) prependIndexes.push(_slideIndex);
        }
      }
    }
    appendIndexes.forEach(function (index) {
      swiper.slidesEl.append(renderSlide(slides[index], index));
    });
    if (isLoop) {
      for (var _i2 = prependIndexes.length - 1; _i2 >= 0; _i2 -= 1) {
        var index = prependIndexes[_i2];
        swiper.slidesEl.prepend(renderSlide(slides[index], index));
      }
    } else {
      prependIndexes.sort(function (a, b) {
        return b - a;
      });
      prependIndexes.forEach(function (index) {
        swiper.slidesEl.prepend(renderSlide(slides[index], index));
      });
    }
    (0, _utils.elementChildren)(swiper.slidesEl, '.swiper-slide, swiper-slide').forEach(function (slideEl) {
      slideEl.style[offsetProp] = "".concat(offset - Math.abs(swiper.cssOverflowAdjustment()), "px");
    });
    onRendered();
  }
  function appendSlide(slides) {
    if (_typeof(slides) === 'object' && 'length' in slides) {
      for (var i = 0; i < slides.length; i += 1) {
        if (slides[i]) swiper.virtual.slides.push(slides[i]);
      }
    } else {
      swiper.virtual.slides.push(slides);
    }
    update(true);
  }
  function prependSlide(slides) {
    var activeIndex = swiper.activeIndex;
    var newActiveIndex = activeIndex + 1;
    var numberOfNewSlides = 1;
    if (Array.isArray(slides)) {
      for (var i = 0; i < slides.length; i += 1) {
        if (slides[i]) swiper.virtual.slides.unshift(slides[i]);
      }
      newActiveIndex = activeIndex + slides.length;
      numberOfNewSlides = slides.length;
    } else {
      swiper.virtual.slides.unshift(slides);
    }
    if (swiper.params.virtual.cache) {
      var cache = swiper.virtual.cache;
      var newCache = {};
      Object.keys(cache).forEach(function (cachedIndex) {
        var cachedEl = cache[cachedIndex];
        var cachedElIndex = cachedEl.getAttribute('data-swiper-slide-index');
        if (cachedElIndex) {
          cachedEl.setAttribute('data-swiper-slide-index', parseInt(cachedElIndex, 10) + numberOfNewSlides);
        }
        newCache[parseInt(cachedIndex, 10) + numberOfNewSlides] = cachedEl;
      });
      swiper.virtual.cache = newCache;
    }
    update(true);
    swiper.slideTo(newActiveIndex, 0);
  }
  function removeSlide(slidesIndexes) {
    if (typeof slidesIndexes === 'undefined' || slidesIndexes === null) return;
    var activeIndex = swiper.activeIndex;
    if (Array.isArray(slidesIndexes)) {
      for (var i = slidesIndexes.length - 1; i >= 0; i -= 1) {
        swiper.virtual.slides.splice(slidesIndexes[i], 1);
        if (swiper.params.virtual.cache) {
          delete swiper.virtual.cache[slidesIndexes[i]];
        }
        if (slidesIndexes[i] < activeIndex) activeIndex -= 1;
        activeIndex = Math.max(activeIndex, 0);
      }
    } else {
      swiper.virtual.slides.splice(slidesIndexes, 1);
      if (swiper.params.virtual.cache) {
        delete swiper.virtual.cache[slidesIndexes];
      }
      if (slidesIndexes < activeIndex) activeIndex -= 1;
      activeIndex = Math.max(activeIndex, 0);
    }
    update(true);
    swiper.slideTo(activeIndex, 0);
  }
  function removeAllSlides() {
    swiper.virtual.slides = [];
    if (swiper.params.virtual.cache) {
      swiper.virtual.cache = {};
    }
    update(true);
    swiper.slideTo(0, 0);
  }
  on('beforeInit', function () {
    if (!swiper.params.virtual.enabled) return;
    var domSlidesAssigned;
    if (typeof swiper.passedParams.virtual.slides === 'undefined') {
      var slides = _toConsumableArray(swiper.slidesEl.children).filter(function (el) {
        return el.matches(".".concat(swiper.params.slideClass, ", swiper-slide"));
      });
      if (slides && slides.length) {
        swiper.virtual.slides = _toConsumableArray(slides);
        domSlidesAssigned = true;
        slides.forEach(function (slideEl, slideIndex) {
          slideEl.setAttribute('data-swiper-slide-index', slideIndex);
          swiper.virtual.cache[slideIndex] = slideEl;
          slideEl.remove();
        });
      }
    }
    if (!domSlidesAssigned) {
      swiper.virtual.slides = swiper.params.virtual.slides;
    }
    swiper.classNames.push("".concat(swiper.params.containerModifierClass, "virtual"));
    swiper.params.watchSlidesProgress = true;
    swiper.originalParams.watchSlidesProgress = true;
    if (!swiper.params.initialSlide) {
      update();
    }
  });
  on('setTranslate', function () {
    if (!swiper.params.virtual.enabled) return;
    if (swiper.params.cssMode && !swiper._immediateVirtual) {
      clearTimeout(cssModeTimeout);
      cssModeTimeout = setTimeout(function () {
        update();
      }, 100);
    } else {
      update();
    }
  });
  on('init update resize', function () {
    if (!swiper.params.virtual.enabled) return;
    if (swiper.params.cssMode) {
      (0, _utils.setCSSProperty)(swiper.wrapperEl, '--swiper-virtual-size', "".concat(swiper.virtualSize, "px"));
    }
  });
  Object.assign(swiper.virtual, {
    appendSlide: appendSlide,
    prependSlide: prependSlide,
    removeSlide: removeSlide,
    removeAllSlides: removeAllSlides,
    update: update
  });
}

},{"../../shared/utils.js":102,"ssr-window":6}],91:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = Zoom;
var _ssrWindow = require("ssr-window");
var _utils = require("../../shared/utils.js");
function _slicedToArray(arr, i) { return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _unsupportedIterableToArray(arr, i) || _nonIterableRest(); }
function _nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }
function _iterableToArrayLimit(arr, i) { var _i = null == arr ? null : "undefined" != typeof Symbol && arr[Symbol.iterator] || arr["@@iterator"]; if (null != _i) { var _s, _e, _x, _r, _arr = [], _n = !0, _d = !1; try { if (_x = (_i = _i.call(arr)).next, 0 === i) { if (Object(_i) !== _i) return; _n = !1; } else for (; !(_n = (_s = _x.call(_i)).done) && (_arr.push(_s.value), _arr.length !== i); _n = !0); } catch (err) { _d = !0, _e = err; } finally { try { if (!_n && null != _i["return"] && (_r = _i["return"](), Object(_r) !== _r)) return; } finally { if (_d) throw _e; } } return _arr; } }
function _arrayWithHoles(arr) { if (Array.isArray(arr)) return arr; }
function _toConsumableArray(arr) { return _arrayWithoutHoles(arr) || _iterableToArray(arr) || _unsupportedIterableToArray(arr) || _nonIterableSpread(); }
function _nonIterableSpread() { throw new TypeError("Invalid attempt to spread non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }
function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }
function _iterableToArray(iter) { if (typeof Symbol !== "undefined" && iter[Symbol.iterator] != null || iter["@@iterator"] != null) return Array.from(iter); }
function _arrayWithoutHoles(arr) { if (Array.isArray(arr)) return _arrayLikeToArray(arr); }
function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) arr2[i] = arr[i]; return arr2; }
function Zoom(_ref) {
  var swiper = _ref.swiper,
    extendParams = _ref.extendParams,
    on = _ref.on,
    emit = _ref.emit;
  var window = (0, _ssrWindow.getWindow)();
  extendParams({
    zoom: {
      enabled: false,
      maxRatio: 3,
      minRatio: 1,
      toggle: true,
      containerClass: 'swiper-zoom-container',
      zoomedSlideClass: 'swiper-slide-zoomed'
    }
  });
  swiper.zoom = {
    enabled: false
  };
  var currentScale = 1;
  var isScaling = false;
  var fakeGestureTouched;
  var fakeGestureMoved;
  var evCache = [];
  var gesture = {
    originX: 0,
    originY: 0,
    slideEl: undefined,
    slideWidth: undefined,
    slideHeight: undefined,
    imageEl: undefined,
    imageWrapEl: undefined,
    maxRatio: 3
  };
  var image = {
    isTouched: undefined,
    isMoved: undefined,
    currentX: undefined,
    currentY: undefined,
    minX: undefined,
    minY: undefined,
    maxX: undefined,
    maxY: undefined,
    width: undefined,
    height: undefined,
    startX: undefined,
    startY: undefined,
    touchesStart: {},
    touchesCurrent: {}
  };
  var velocity = {
    x: undefined,
    y: undefined,
    prevPositionX: undefined,
    prevPositionY: undefined,
    prevTime: undefined
  };
  var scale = 1;
  Object.defineProperty(swiper.zoom, 'scale', {
    get: function get() {
      return scale;
    },
    set: function set(value) {
      if (scale !== value) {
        var imageEl = gesture.imageEl;
        var slideEl = gesture.slideEl;
        emit('zoomChange', value, imageEl, slideEl);
      }
      scale = value;
    }
  });
  function getDistanceBetweenTouches() {
    if (evCache.length < 2) return 1;
    var x1 = evCache[0].pageX;
    var y1 = evCache[0].pageY;
    var x2 = evCache[1].pageX;
    var y2 = evCache[1].pageY;
    var distance = Math.sqrt(Math.pow(x2 - x1, 2) + Math.pow(y2 - y1, 2));
    return distance;
  }
  function getScaleOrigin() {
    if (evCache.length < 2) return {
      x: null,
      y: null
    };
    var box = gesture.imageEl.getBoundingClientRect();
    return [(evCache[0].pageX + (evCache[1].pageX - evCache[0].pageX) / 2 - box.x) / currentScale, (evCache[0].pageY + (evCache[1].pageY - evCache[0].pageY) / 2 - box.y) / currentScale];
  }
  function getSlideSelector() {
    return swiper.isElement ? "swiper-slide" : ".".concat(swiper.params.slideClass);
  }
  function eventWithinSlide(e) {
    var slideSelector = getSlideSelector();
    if (e.target.matches(slideSelector)) return true;
    if (swiper.slides.filter(function (slideEl) {
      return slideEl.contains(e.target);
    }).length > 0) return true;
    return false;
  }
  function eventWithinZoomContainer(e) {
    var selector = ".".concat(swiper.params.zoom.containerClass);
    if (e.target.matches(selector)) return true;
    if (_toConsumableArray(swiper.el.querySelectorAll(selector)).filter(function (containerEl) {
      return containerEl.contains(e.target);
    }).length > 0) return true;
    return false;
  }

  // Events
  function onGestureStart(e) {
    if (e.pointerType === 'mouse') {
      evCache.splice(0, evCache.length);
    }
    if (!eventWithinSlide(e)) return;
    var params = swiper.params.zoom;
    fakeGestureTouched = false;
    fakeGestureMoved = false;
    evCache.push(e);
    if (evCache.length < 2) {
      return;
    }
    fakeGestureTouched = true;
    gesture.scaleStart = getDistanceBetweenTouches();
    if (!gesture.slideEl) {
      gesture.slideEl = e.target.closest(".".concat(swiper.params.slideClass, ", swiper-slide"));
      if (!gesture.slideEl) gesture.slideEl = swiper.slides[swiper.activeIndex];
      var imageEl = gesture.slideEl.querySelector(".".concat(params.containerClass));
      if (imageEl) {
        imageEl = imageEl.querySelectorAll('picture, img, svg, canvas, .swiper-zoom-target')[0];
      }
      gesture.imageEl = imageEl;
      if (imageEl) {
        gesture.imageWrapEl = (0, _utils.elementParents)(gesture.imageEl, ".".concat(params.containerClass))[0];
      } else {
        gesture.imageWrapEl = undefined;
      }
      if (!gesture.imageWrapEl) {
        gesture.imageEl = undefined;
        return;
      }
      gesture.maxRatio = gesture.imageWrapEl.getAttribute('data-swiper-zoom') || params.maxRatio;
    }
    if (gesture.imageEl) {
      var _getScaleOrigin = getScaleOrigin(),
        _getScaleOrigin2 = _slicedToArray(_getScaleOrigin, 2),
        originX = _getScaleOrigin2[0],
        originY = _getScaleOrigin2[1];
      gesture.originX = originX;
      gesture.originY = originY;
      gesture.imageEl.style.transitionDuration = '0ms';
    }
    isScaling = true;
  }
  function onGestureChange(e) {
    if (!eventWithinSlide(e)) return;
    var params = swiper.params.zoom;
    var zoom = swiper.zoom;
    var pointerIndex = evCache.findIndex(function (cachedEv) {
      return cachedEv.pointerId === e.pointerId;
    });
    if (pointerIndex >= 0) evCache[pointerIndex] = e;
    if (evCache.length < 2) {
      return;
    }
    fakeGestureMoved = true;
    gesture.scaleMove = getDistanceBetweenTouches();
    if (!gesture.imageEl) {
      return;
    }
    zoom.scale = gesture.scaleMove / gesture.scaleStart * currentScale;
    if (zoom.scale > gesture.maxRatio) {
      zoom.scale = gesture.maxRatio - 1 + Math.pow(zoom.scale - gesture.maxRatio + 1, 0.5);
    }
    if (zoom.scale < params.minRatio) {
      zoom.scale = params.minRatio + 1 - Math.pow(params.minRatio - zoom.scale + 1, 0.5);
    }
    gesture.imageEl.style.transform = "translate3d(0,0,0) scale(".concat(zoom.scale, ")");
  }
  function onGestureEnd(e) {
    if (!eventWithinSlide(e)) return;
    if (e.pointerType === 'mouse' && e.type === 'pointerout') return;
    var params = swiper.params.zoom;
    var zoom = swiper.zoom;
    var pointerIndex = evCache.findIndex(function (cachedEv) {
      return cachedEv.pointerId === e.pointerId;
    });
    if (pointerIndex >= 0) evCache.splice(pointerIndex, 1);
    if (!fakeGestureTouched || !fakeGestureMoved) {
      return;
    }
    fakeGestureTouched = false;
    fakeGestureMoved = false;
    if (!gesture.imageEl) return;
    zoom.scale = Math.max(Math.min(zoom.scale, gesture.maxRatio), params.minRatio);
    gesture.imageEl.style.transitionDuration = "".concat(swiper.params.speed, "ms");
    gesture.imageEl.style.transform = "translate3d(0,0,0) scale(".concat(zoom.scale, ")");
    currentScale = zoom.scale;
    isScaling = false;
    if (zoom.scale > 1 && gesture.slideEl) {
      gesture.slideEl.classList.add("".concat(params.zoomedSlideClass));
    } else if (zoom.scale <= 1 && gesture.slideEl) {
      gesture.slideEl.classList.remove("".concat(params.zoomedSlideClass));
    }
    if (zoom.scale === 1) {
      gesture.originX = 0;
      gesture.originY = 0;
      gesture.slideEl = undefined;
    }
  }
  function onTouchStart(e) {
    var device = swiper.device;
    if (!gesture.imageEl) return;
    if (image.isTouched) return;
    if (device.android && e.cancelable) e.preventDefault();
    image.isTouched = true;
    var event = evCache.length > 0 ? evCache[0] : e;
    image.touchesStart.x = event.pageX;
    image.touchesStart.y = event.pageY;
  }
  function onTouchMove(e) {
    if (!eventWithinSlide(e) || !eventWithinZoomContainer(e)) return;
    var zoom = swiper.zoom;
    if (!gesture.imageEl) return;
    if (!image.isTouched || !gesture.slideEl) return;
    if (!image.isMoved) {
      image.width = gesture.imageEl.offsetWidth;
      image.height = gesture.imageEl.offsetHeight;
      image.startX = (0, _utils.getTranslate)(gesture.imageWrapEl, 'x') || 0;
      image.startY = (0, _utils.getTranslate)(gesture.imageWrapEl, 'y') || 0;
      gesture.slideWidth = gesture.slideEl.offsetWidth;
      gesture.slideHeight = gesture.slideEl.offsetHeight;
      gesture.imageWrapEl.style.transitionDuration = '0ms';
    }
    // Define if we need image drag
    var scaledWidth = image.width * zoom.scale;
    var scaledHeight = image.height * zoom.scale;
    if (scaledWidth < gesture.slideWidth && scaledHeight < gesture.slideHeight) return;
    image.minX = Math.min(gesture.slideWidth / 2 - scaledWidth / 2, 0);
    image.maxX = -image.minX;
    image.minY = Math.min(gesture.slideHeight / 2 - scaledHeight / 2, 0);
    image.maxY = -image.minY;
    image.touchesCurrent.x = evCache.length > 0 ? evCache[0].pageX : e.pageX;
    image.touchesCurrent.y = evCache.length > 0 ? evCache[0].pageY : e.pageY;
    var touchesDiff = Math.max(Math.abs(image.touchesCurrent.x - image.touchesStart.x), Math.abs(image.touchesCurrent.y - image.touchesStart.y));
    if (touchesDiff > 5) {
      swiper.allowClick = false;
    }
    if (!image.isMoved && !isScaling) {
      if (swiper.isHorizontal() && (Math.floor(image.minX) === Math.floor(image.startX) && image.touchesCurrent.x < image.touchesStart.x || Math.floor(image.maxX) === Math.floor(image.startX) && image.touchesCurrent.x > image.touchesStart.x)) {
        image.isTouched = false;
        return;
      }
      if (!swiper.isHorizontal() && (Math.floor(image.minY) === Math.floor(image.startY) && image.touchesCurrent.y < image.touchesStart.y || Math.floor(image.maxY) === Math.floor(image.startY) && image.touchesCurrent.y > image.touchesStart.y)) {
        image.isTouched = false;
        return;
      }
    }
    if (e.cancelable) {
      e.preventDefault();
    }
    e.stopPropagation();
    image.isMoved = true;
    var scaleRatio = (zoom.scale - currentScale) / (gesture.maxRatio - swiper.params.zoom.minRatio);
    var originX = gesture.originX,
      originY = gesture.originY;
    image.currentX = image.touchesCurrent.x - image.touchesStart.x + image.startX + scaleRatio * (image.width - originX * 2);
    image.currentY = image.touchesCurrent.y - image.touchesStart.y + image.startY + scaleRatio * (image.height - originY * 2);
    if (image.currentX < image.minX) {
      image.currentX = image.minX + 1 - Math.pow(image.minX - image.currentX + 1, 0.8);
    }
    if (image.currentX > image.maxX) {
      image.currentX = image.maxX - 1 + Math.pow(image.currentX - image.maxX + 1, 0.8);
    }
    if (image.currentY < image.minY) {
      image.currentY = image.minY + 1 - Math.pow(image.minY - image.currentY + 1, 0.8);
    }
    if (image.currentY > image.maxY) {
      image.currentY = image.maxY - 1 + Math.pow(image.currentY - image.maxY + 1, 0.8);
    }

    // Velocity
    if (!velocity.prevPositionX) velocity.prevPositionX = image.touchesCurrent.x;
    if (!velocity.prevPositionY) velocity.prevPositionY = image.touchesCurrent.y;
    if (!velocity.prevTime) velocity.prevTime = Date.now();
    velocity.x = (image.touchesCurrent.x - velocity.prevPositionX) / (Date.now() - velocity.prevTime) / 2;
    velocity.y = (image.touchesCurrent.y - velocity.prevPositionY) / (Date.now() - velocity.prevTime) / 2;
    if (Math.abs(image.touchesCurrent.x - velocity.prevPositionX) < 2) velocity.x = 0;
    if (Math.abs(image.touchesCurrent.y - velocity.prevPositionY) < 2) velocity.y = 0;
    velocity.prevPositionX = image.touchesCurrent.x;
    velocity.prevPositionY = image.touchesCurrent.y;
    velocity.prevTime = Date.now();
    gesture.imageWrapEl.style.transform = "translate3d(".concat(image.currentX, "px, ").concat(image.currentY, "px,0)");
  }
  function onTouchEnd() {
    var zoom = swiper.zoom;
    if (!gesture.imageEl) return;
    if (!image.isTouched || !image.isMoved) {
      image.isTouched = false;
      image.isMoved = false;
      return;
    }
    image.isTouched = false;
    image.isMoved = false;
    var momentumDurationX = 300;
    var momentumDurationY = 300;
    var momentumDistanceX = velocity.x * momentumDurationX;
    var newPositionX = image.currentX + momentumDistanceX;
    var momentumDistanceY = velocity.y * momentumDurationY;
    var newPositionY = image.currentY + momentumDistanceY;

    // Fix duration
    if (velocity.x !== 0) momentumDurationX = Math.abs((newPositionX - image.currentX) / velocity.x);
    if (velocity.y !== 0) momentumDurationY = Math.abs((newPositionY - image.currentY) / velocity.y);
    var momentumDuration = Math.max(momentumDurationX, momentumDurationY);
    image.currentX = newPositionX;
    image.currentY = newPositionY;
    // Define if we need image drag
    var scaledWidth = image.width * zoom.scale;
    var scaledHeight = image.height * zoom.scale;
    image.minX = Math.min(gesture.slideWidth / 2 - scaledWidth / 2, 0);
    image.maxX = -image.minX;
    image.minY = Math.min(gesture.slideHeight / 2 - scaledHeight / 2, 0);
    image.maxY = -image.minY;
    image.currentX = Math.max(Math.min(image.currentX, image.maxX), image.minX);
    image.currentY = Math.max(Math.min(image.currentY, image.maxY), image.minY);
    gesture.imageWrapEl.style.transitionDuration = "".concat(momentumDuration, "ms");
    gesture.imageWrapEl.style.transform = "translate3d(".concat(image.currentX, "px, ").concat(image.currentY, "px,0)");
  }
  function onTransitionEnd() {
    var zoom = swiper.zoom;
    if (gesture.slideEl && swiper.activeIndex !== swiper.slides.indexOf(gesture.slideEl)) {
      if (gesture.imageEl) {
        gesture.imageEl.style.transform = 'translate3d(0,0,0) scale(1)';
      }
      if (gesture.imageWrapEl) {
        gesture.imageWrapEl.style.transform = 'translate3d(0,0,0)';
      }
      gesture.slideEl.classList.remove("".concat(swiper.params.zoom.zoomedSlideClass));
      zoom.scale = 1;
      currentScale = 1;
      gesture.slideEl = undefined;
      gesture.imageEl = undefined;
      gesture.imageWrapEl = undefined;
      gesture.originX = 0;
      gesture.originY = 0;
    }
  }
  function zoomIn(e) {
    var zoom = swiper.zoom;
    var params = swiper.params.zoom;
    if (!gesture.slideEl) {
      if (e && e.target) {
        gesture.slideEl = e.target.closest(".".concat(swiper.params.slideClass, ", swiper-slide"));
      }
      if (!gesture.slideEl) {
        if (swiper.params.virtual && swiper.params.virtual.enabled && swiper.virtual) {
          gesture.slideEl = (0, _utils.elementChildren)(swiper.slidesEl, ".".concat(swiper.params.slideActiveClass))[0];
        } else {
          gesture.slideEl = swiper.slides[swiper.activeIndex];
        }
      }
      var imageEl = gesture.slideEl.querySelector(".".concat(params.containerClass));
      if (imageEl) {
        imageEl = imageEl.querySelectorAll('picture, img, svg, canvas, .swiper-zoom-target')[0];
      }
      gesture.imageEl = imageEl;
      if (imageEl) {
        gesture.imageWrapEl = (0, _utils.elementParents)(gesture.imageEl, ".".concat(params.containerClass))[0];
      } else {
        gesture.imageWrapEl = undefined;
      }
    }
    if (!gesture.imageEl || !gesture.imageWrapEl) return;
    if (swiper.params.cssMode) {
      swiper.wrapperEl.style.overflow = 'hidden';
      swiper.wrapperEl.style.touchAction = 'none';
    }
    gesture.slideEl.classList.add("".concat(params.zoomedSlideClass));
    var touchX;
    var touchY;
    var offsetX;
    var offsetY;
    var diffX;
    var diffY;
    var translateX;
    var translateY;
    var imageWidth;
    var imageHeight;
    var scaledWidth;
    var scaledHeight;
    var translateMinX;
    var translateMinY;
    var translateMaxX;
    var translateMaxY;
    var slideWidth;
    var slideHeight;
    if (typeof image.touchesStart.x === 'undefined' && e) {
      touchX = e.pageX;
      touchY = e.pageY;
    } else {
      touchX = image.touchesStart.x;
      touchY = image.touchesStart.y;
    }
    var forceZoomRatio = typeof e === 'number' ? e : null;
    if (currentScale === 1 && forceZoomRatio) {
      touchX = undefined;
      touchY = undefined;
    }
    zoom.scale = forceZoomRatio || gesture.imageWrapEl.getAttribute('data-swiper-zoom') || params.maxRatio;
    currentScale = forceZoomRatio || gesture.imageWrapEl.getAttribute('data-swiper-zoom') || params.maxRatio;
    if (e && !(currentScale === 1 && forceZoomRatio)) {
      slideWidth = gesture.slideEl.offsetWidth;
      slideHeight = gesture.slideEl.offsetHeight;
      offsetX = (0, _utils.elementOffset)(gesture.slideEl).left + window.scrollX;
      offsetY = (0, _utils.elementOffset)(gesture.slideEl).top + window.scrollY;
      diffX = offsetX + slideWidth / 2 - touchX;
      diffY = offsetY + slideHeight / 2 - touchY;
      imageWidth = gesture.imageEl.offsetWidth;
      imageHeight = gesture.imageEl.offsetHeight;
      scaledWidth = imageWidth * zoom.scale;
      scaledHeight = imageHeight * zoom.scale;
      translateMinX = Math.min(slideWidth / 2 - scaledWidth / 2, 0);
      translateMinY = Math.min(slideHeight / 2 - scaledHeight / 2, 0);
      translateMaxX = -translateMinX;
      translateMaxY = -translateMinY;
      translateX = diffX * zoom.scale;
      translateY = diffY * zoom.scale;
      if (translateX < translateMinX) {
        translateX = translateMinX;
      }
      if (translateX > translateMaxX) {
        translateX = translateMaxX;
      }
      if (translateY < translateMinY) {
        translateY = translateMinY;
      }
      if (translateY > translateMaxY) {
        translateY = translateMaxY;
      }
    } else {
      translateX = 0;
      translateY = 0;
    }
    if (forceZoomRatio && zoom.scale === 1) {
      gesture.originX = 0;
      gesture.originY = 0;
    }
    gesture.imageWrapEl.style.transitionDuration = '300ms';
    gesture.imageWrapEl.style.transform = "translate3d(".concat(translateX, "px, ").concat(translateY, "px,0)");
    gesture.imageEl.style.transitionDuration = '300ms';
    gesture.imageEl.style.transform = "translate3d(0,0,0) scale(".concat(zoom.scale, ")");
  }
  function zoomOut() {
    var zoom = swiper.zoom;
    var params = swiper.params.zoom;
    if (!gesture.slideEl) {
      if (swiper.params.virtual && swiper.params.virtual.enabled && swiper.virtual) {
        gesture.slideEl = (0, _utils.elementChildren)(swiper.slidesEl, ".".concat(swiper.params.slideActiveClass))[0];
      } else {
        gesture.slideEl = swiper.slides[swiper.activeIndex];
      }
      var imageEl = gesture.slideEl.querySelector(".".concat(params.containerClass));
      if (imageEl) {
        imageEl = imageEl.querySelectorAll('picture, img, svg, canvas, .swiper-zoom-target')[0];
      }
      gesture.imageEl = imageEl;
      if (imageEl) {
        gesture.imageWrapEl = (0, _utils.elementParents)(gesture.imageEl, ".".concat(params.containerClass))[0];
      } else {
        gesture.imageWrapEl = undefined;
      }
    }
    if (!gesture.imageEl || !gesture.imageWrapEl) return;
    if (swiper.params.cssMode) {
      swiper.wrapperEl.style.overflow = '';
      swiper.wrapperEl.style.touchAction = '';
    }
    zoom.scale = 1;
    currentScale = 1;
    gesture.imageWrapEl.style.transitionDuration = '300ms';
    gesture.imageWrapEl.style.transform = 'translate3d(0,0,0)';
    gesture.imageEl.style.transitionDuration = '300ms';
    gesture.imageEl.style.transform = 'translate3d(0,0,0) scale(1)';
    gesture.slideEl.classList.remove("".concat(params.zoomedSlideClass));
    gesture.slideEl = undefined;
    gesture.originX = 0;
    gesture.originY = 0;
  }

  // Toggle Zoom
  function zoomToggle(e) {
    var zoom = swiper.zoom;
    if (zoom.scale && zoom.scale !== 1) {
      // Zoom Out
      zoomOut();
    } else {
      // Zoom In
      zoomIn(e);
    }
  }
  function getListeners() {
    var passiveListener = swiper.params.passiveListeners ? {
      passive: true,
      capture: false
    } : false;
    var activeListenerWithCapture = swiper.params.passiveListeners ? {
      passive: false,
      capture: true
    } : true;
    return {
      passiveListener: passiveListener,
      activeListenerWithCapture: activeListenerWithCapture
    };
  }

  // Attach/Detach Events
  function enable() {
    var zoom = swiper.zoom;
    if (zoom.enabled) return;
    zoom.enabled = true;
    var _getListeners = getListeners(),
      passiveListener = _getListeners.passiveListener,
      activeListenerWithCapture = _getListeners.activeListenerWithCapture;

    // Scale image
    swiper.wrapperEl.addEventListener('pointerdown', onGestureStart, passiveListener);
    swiper.wrapperEl.addEventListener('pointermove', onGestureChange, activeListenerWithCapture);
    ['pointerup', 'pointercancel', 'pointerout'].forEach(function (eventName) {
      swiper.wrapperEl.addEventListener(eventName, onGestureEnd, passiveListener);
    });

    // Move image
    swiper.wrapperEl.addEventListener('pointermove', onTouchMove, activeListenerWithCapture);
  }
  function disable() {
    var zoom = swiper.zoom;
    if (!zoom.enabled) return;
    zoom.enabled = false;
    var _getListeners2 = getListeners(),
      passiveListener = _getListeners2.passiveListener,
      activeListenerWithCapture = _getListeners2.activeListenerWithCapture;

    // Scale image
    swiper.wrapperEl.removeEventListener('pointerdown', onGestureStart, passiveListener);
    swiper.wrapperEl.removeEventListener('pointermove', onGestureChange, activeListenerWithCapture);
    ['pointerup', 'pointercancel', 'pointerout'].forEach(function (eventName) {
      swiper.wrapperEl.removeEventListener(eventName, onGestureEnd, passiveListener);
    });

    // Move image
    swiper.wrapperEl.removeEventListener('pointermove', onTouchMove, activeListenerWithCapture);
  }
  on('init', function () {
    if (swiper.params.zoom.enabled) {
      enable();
    }
  });
  on('destroy', function () {
    disable();
  });
  on('touchStart', function (_s, e) {
    if (!swiper.zoom.enabled) return;
    onTouchStart(e);
  });
  on('touchEnd', function (_s, e) {
    if (!swiper.zoom.enabled) return;
    onTouchEnd(e);
  });
  on('doubleTap', function (_s, e) {
    if (!swiper.animating && swiper.params.zoom.enabled && swiper.zoom.enabled && swiper.params.zoom.toggle) {
      zoomToggle(e);
    }
  });
  on('transitionEnd', function () {
    if (swiper.zoom.enabled && swiper.params.zoom.enabled) {
      onTransitionEnd();
    }
  });
  on('slideChange', function () {
    if (swiper.zoom.enabled && swiper.params.zoom.enabled && swiper.params.cssMode) {
      onTransitionEnd();
    }
  });
  Object.assign(swiper.zoom, {
    enable: enable,
    disable: disable,
    "in": zoomIn,
    out: zoomOut,
    toggle: zoomToggle
  });
}

},{"../../shared/utils.js":102,"ssr-window":6}],92:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = classesToSelector;
function classesToSelector() {
  var classes = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : '';
  return ".".concat(classes.trim().replace(/([\.:!+\/])/g, '\\$1') // eslint-disable-line
  .replace(/ /g, '.'));
}

},{}],93:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = createElementIfNotDefined;
var _utils = require("./utils.js");
function createElementIfNotDefined(swiper, originalParams, params, checkProps) {
  if (swiper.params.createElements) {
    Object.keys(checkProps).forEach(function (key) {
      if (!params[key] && params.auto === true) {
        var element = (0, _utils.elementChildren)(swiper.el, ".".concat(checkProps[key]))[0];
        if (!element) {
          element = (0, _utils.createElement)('div', checkProps[key]);
          element.className = checkProps[key];
          swiper.el.append(element);
        }
        params[key] = element;
        originalParams[key] = element;
      }
    });
  }
  return params;
}

},{"./utils.js":102}],94:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = createShadow;
var _utils = require("./utils.js");
function createShadow(params, slideEl, side) {
  var shadowClass = "swiper-slide-shadow".concat(side ? "-".concat(side) : '');
  var shadowContainer = (0, _utils.getSlideTransformEl)(slideEl);
  var shadowEl = shadowContainer.querySelector(".".concat(shadowClass));
  if (!shadowEl) {
    shadowEl = (0, _utils.createElement)('div', "swiper-slide-shadow".concat(side ? "-".concat(side) : ''));
    shadowContainer.append(shadowEl);
  }
  return shadowEl;
}

},{"./utils.js":102}],95:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = effectInit;
function effectInit(params) {
  var effect = params.effect,
    swiper = params.swiper,
    on = params.on,
    setTranslate = params.setTranslate,
    setTransition = params.setTransition,
    overwriteParams = params.overwriteParams,
    perspective = params.perspective,
    recreateShadows = params.recreateShadows,
    getEffectParams = params.getEffectParams;
  on('beforeInit', function () {
    if (swiper.params.effect !== effect) return;
    swiper.classNames.push("".concat(swiper.params.containerModifierClass).concat(effect));
    if (perspective && perspective()) {
      swiper.classNames.push("".concat(swiper.params.containerModifierClass, "3d"));
    }
    var overwriteParamsResult = overwriteParams ? overwriteParams() : {};
    Object.assign(swiper.params, overwriteParamsResult);
    Object.assign(swiper.originalParams, overwriteParamsResult);
  });
  on('setTranslate', function () {
    if (swiper.params.effect !== effect) return;
    setTranslate();
  });
  on('setTransition', function (_s, duration) {
    if (swiper.params.effect !== effect) return;
    setTransition(duration);
  });
  on('transitionEnd', function () {
    if (swiper.params.effect !== effect) return;
    if (recreateShadows) {
      if (!getEffectParams || !getEffectParams().slideShadows) return;
      // remove shadows
      swiper.slides.forEach(function (slideEl) {
        slideEl.querySelectorAll('.swiper-slide-shadow-top, .swiper-slide-shadow-right, .swiper-slide-shadow-bottom, .swiper-slide-shadow-left').forEach(function (shadowEl) {
          return shadowEl.remove();
        });
      });
      // create new one
      recreateShadows();
    }
  });
  var requireUpdateOnVirtual;
  on('virtualUpdate', function () {
    if (swiper.params.effect !== effect) return;
    if (!swiper.slides.length) {
      requireUpdateOnVirtual = true;
    }
    requestAnimationFrame(function () {
      if (requireUpdateOnVirtual && swiper.slides && swiper.slides.length) {
        setTranslate();
        requireUpdateOnVirtual = false;
      }
    });
  });
}

},{}],96:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = effectTarget;
var _utils = require("./utils.js");
function effectTarget(effectParams, slideEl) {
  var transformEl = (0, _utils.getSlideTransformEl)(slideEl);
  if (transformEl !== slideEl) {
    transformEl.style.backfaceVisibility = 'hidden';
    transformEl.style['-webkit-backface-visibility'] = 'hidden';
  }
  return transformEl;
}

},{"./utils.js":102}],97:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = effectVirtualTransitionEnd;
var _utils = require("./utils.js");
function effectVirtualTransitionEnd(_ref) {
  var swiper = _ref.swiper,
    duration = _ref.duration,
    transformElements = _ref.transformElements,
    allSlides = _ref.allSlides;
  var activeIndex = swiper.activeIndex;
  var getSlide = function getSlide(el) {
    if (!el.parentElement) {
      // assume shadow root
      var slide = swiper.slides.filter(function (slideEl) {
        return slideEl.shadowEl && slideEl.shadowEl === el.parentNode;
      })[0];
      return slide;
    }
    return el.parentElement;
  };
  if (swiper.params.virtualTranslate && duration !== 0) {
    var eventTriggered = false;
    var transitionEndTarget;
    if (allSlides) {
      transitionEndTarget = transformElements;
    } else {
      transitionEndTarget = transformElements.filter(function (transformEl) {
        var el = transformEl.classList.contains('swiper-slide-transform') ? getSlide(transformEl) : transformEl;
        return swiper.getSlideIndex(el) === activeIndex;
      });
    }
    transitionEndTarget.forEach(function (el) {
      (0, _utils.elementTransitionEnd)(el, function () {
        if (eventTriggered) return;
        if (!swiper || swiper.destroyed) return;
        eventTriggered = true;
        swiper.animating = false;
        var evt = new window.CustomEvent('transitionend', {
          bubbles: true,
          cancelable: true
        });
        swiper.wrapperEl.dispatchEvent(evt);
      });
    });
  }
}

},{"./utils.js":102}],98:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.getBrowser = getBrowser;
var _ssrWindow = require("ssr-window");
function _slicedToArray(arr, i) { return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _unsupportedIterableToArray(arr, i) || _nonIterableRest(); }
function _nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }
function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }
function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) arr2[i] = arr[i]; return arr2; }
function _iterableToArrayLimit(arr, i) { var _i = null == arr ? null : "undefined" != typeof Symbol && arr[Symbol.iterator] || arr["@@iterator"]; if (null != _i) { var _s, _e, _x, _r, _arr = [], _n = !0, _d = !1; try { if (_x = (_i = _i.call(arr)).next, 0 === i) { if (Object(_i) !== _i) return; _n = !1; } else for (; !(_n = (_s = _x.call(_i)).done) && (_arr.push(_s.value), _arr.length !== i); _n = !0); } catch (err) { _d = !0, _e = err; } finally { try { if (!_n && null != _i["return"] && (_r = _i["return"](), Object(_r) !== _r)) return; } finally { if (_d) throw _e; } } return _arr; } }
function _arrayWithHoles(arr) { if (Array.isArray(arr)) return arr; }
var browser;
function calcBrowser() {
  var window = (0, _ssrWindow.getWindow)();
  var needPerspectiveFix = false;
  function isSafari() {
    var ua = window.navigator.userAgent.toLowerCase();
    return ua.indexOf('safari') >= 0 && ua.indexOf('chrome') < 0 && ua.indexOf('android') < 0;
  }
  if (isSafari()) {
    var ua = String(window.navigator.userAgent);
    if (ua.includes('Version/')) {
      var _ua$split$1$split$0$s = ua.split('Version/')[1].split(' ')[0].split('.').map(function (num) {
          return Number(num);
        }),
        _ua$split$1$split$0$s2 = _slicedToArray(_ua$split$1$split$0$s, 2),
        major = _ua$split$1$split$0$s2[0],
        minor = _ua$split$1$split$0$s2[1];
      needPerspectiveFix = major < 16 || major === 16 && minor < 2;
    }
  }
  return {
    isSafari: needPerspectiveFix || isSafari(),
    needPerspectiveFix: needPerspectiveFix,
    isWebView: /(iPhone|iPod|iPad).*AppleWebKit(?!.*Safari)/i.test(window.navigator.userAgent)
  };
}
function getBrowser() {
  if (!browser) {
    browser = calcBrowser();
  }
  return browser;
}

},{"ssr-window":6}],99:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.getDevice = getDevice;
var _ssrWindow = require("ssr-window");
var _getSupport = require("./get-support.js");
var deviceCached;
function calcDevice() {
  var _ref = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {},
    userAgent = _ref.userAgent;
  var support = (0, _getSupport.getSupport)();
  var window = (0, _ssrWindow.getWindow)();
  var platform = window.navigator.platform;
  var ua = userAgent || window.navigator.userAgent;
  var device = {
    ios: false,
    android: false
  };
  var screenWidth = window.screen.width;
  var screenHeight = window.screen.height;
  var android = ua.match(/(Android);?[\s\/]+([\d.]+)?/); // eslint-disable-line
  var ipad = ua.match(/(iPad).*OS\s([\d_]+)/);
  var ipod = ua.match(/(iPod)(.*OS\s([\d_]+))?/);
  var iphone = !ipad && ua.match(/(iPhone\sOS|iOS)\s([\d_]+)/);
  var windows = platform === 'Win32';
  var macos = platform === 'MacIntel';

  // iPadOs 13 fix
  var iPadScreens = ['1024x1366', '1366x1024', '834x1194', '1194x834', '834x1112', '1112x834', '768x1024', '1024x768', '820x1180', '1180x820', '810x1080', '1080x810'];
  if (!ipad && macos && support.touch && iPadScreens.indexOf("".concat(screenWidth, "x").concat(screenHeight)) >= 0) {
    ipad = ua.match(/(Version)\/([\d.]+)/);
    if (!ipad) ipad = [0, 1, '13_0_0'];
    macos = false;
  }

  // Android
  if (android && !windows) {
    device.os = 'android';
    device.android = true;
  }
  if (ipad || iphone || ipod) {
    device.os = 'ios';
    device.ios = true;
  }

  // Export object
  return device;
}
function getDevice() {
  var overrides = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
  if (!deviceCached) {
    deviceCached = calcDevice(overrides);
  }
  return deviceCached;
}

},{"./get-support.js":100,"ssr-window":6}],100:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.getSupport = getSupport;
var _ssrWindow = require("ssr-window");
var support;
function calcSupport() {
  var window = (0, _ssrWindow.getWindow)();
  var document = (0, _ssrWindow.getDocument)();
  return {
    smoothScroll: document.documentElement && 'scrollBehavior' in document.documentElement.style,
    touch: !!('ontouchstart' in window || window.DocumentTouch && document instanceof window.DocumentTouch)
  };
}
function getSupport() {
  if (!support) {
    support = calcSupport();
  }
  return support;
}

},{"ssr-window":6}],101:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.processLazyPreloader = exports.preload = void 0;
var processLazyPreloader = function processLazyPreloader(swiper, imageEl) {
  if (!swiper || swiper.destroyed || !swiper.params) return;
  var slideSelector = function slideSelector() {
    return swiper.isElement ? "swiper-slide" : ".".concat(swiper.params.slideClass);
  };
  var slideEl = imageEl.closest(slideSelector());
  if (slideEl) {
    var lazyEl = slideEl.querySelector(".".concat(swiper.params.lazyPreloaderClass));
    if (lazyEl) lazyEl.remove();
  }
};
exports.processLazyPreloader = processLazyPreloader;
var unlazy = function unlazy(swiper, index) {
  if (!swiper.slides[index]) return;
  var imageEl = swiper.slides[index].querySelector('[loading="lazy"]');
  if (imageEl) imageEl.removeAttribute('loading');
};
var preload = function preload(swiper) {
  if (!swiper || swiper.destroyed || !swiper.params) return;
  var amount = swiper.params.lazyPreloadPrevNext;
  var len = swiper.slides.length;
  if (!len || !amount || amount < 0) return;
  amount = Math.min(amount, len);
  var slidesPerView = swiper.params.slidesPerView === 'auto' ? swiper.slidesPerViewDynamic() : Math.ceil(swiper.params.slidesPerView);
  var activeIndex = swiper.activeIndex;
  var slideIndexLastInView = activeIndex + slidesPerView - 1;
  if (swiper.params.rewind) {
    for (var i = activeIndex - amount; i <= slideIndexLastInView + amount; i += 1) {
      var realIndex = (i % len + len) % len;
      if (realIndex !== activeIndex && realIndex > slideIndexLastInView) unlazy(swiper, realIndex);
    }
  } else {
    for (var _i = Math.max(slideIndexLastInView - amount, 0); _i <= Math.min(slideIndexLastInView + amount, len - 1); _i += 1) {
      if (_i !== activeIndex && _i > slideIndexLastInView) unlazy(swiper, _i);
    }
  }
};
exports.preload = preload;

},{}],102:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.animateCSSModeScroll = animateCSSModeScroll;
exports.createElement = createElement;
exports.deleteProps = deleteProps;
exports.elementChildren = elementChildren;
exports.elementIndex = elementIndex;
exports.elementNextAll = elementNextAll;
exports.elementOffset = elementOffset;
exports.elementOuterSize = elementOuterSize;
exports.elementParents = elementParents;
exports.elementPrevAll = elementPrevAll;
exports.elementStyle = elementStyle;
exports.elementTransitionEnd = elementTransitionEnd;
exports.extend = extend;
exports.findElementsInElements = findElementsInElements;
exports.getComputedStyle = getComputedStyle;
exports.getSlideTransformEl = getSlideTransformEl;
exports.getTranslate = getTranslate;
exports.isObject = isObject;
exports.nextTick = nextTick;
exports.now = now;
exports.setCSSProperty = setCSSProperty;
var _ssrWindow = require("ssr-window");
function _toConsumableArray(arr) { return _arrayWithoutHoles(arr) || _iterableToArray(arr) || _unsupportedIterableToArray(arr) || _nonIterableSpread(); }
function _nonIterableSpread() { throw new TypeError("Invalid attempt to spread non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }
function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }
function _iterableToArray(iter) { if (typeof Symbol !== "undefined" && iter[Symbol.iterator] != null || iter["@@iterator"] != null) return Array.from(iter); }
function _arrayWithoutHoles(arr) { if (Array.isArray(arr)) return _arrayLikeToArray(arr); }
function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) arr2[i] = arr[i]; return arr2; }
function _defineProperty(obj, key, value) { key = _toPropertyKey(key); if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }
function _toPropertyKey(arg) { var key = _toPrimitive(arg, "string"); return _typeof(key) === "symbol" ? key : String(key); }
function _toPrimitive(input, hint) { if (_typeof(input) !== "object" || input === null) return input; var prim = input[Symbol.toPrimitive]; if (prim !== undefined) { var res = prim.call(input, hint || "default"); if (_typeof(res) !== "object") return res; throw new TypeError("@@toPrimitive must return a primitive value."); } return (hint === "string" ? String : Number)(input); }
function _typeof(obj) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (obj) { return typeof obj; } : function (obj) { return obj && "function" == typeof Symbol && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }, _typeof(obj); }
function deleteProps(obj) {
  var object = obj;
  Object.keys(object).forEach(function (key) {
    try {
      object[key] = null;
    } catch (e) {
      // no getter for object
    }
    try {
      delete object[key];
    } catch (e) {
      // something got wrong
    }
  });
}
function nextTick(callback) {
  var delay = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 0;
  return setTimeout(callback, delay);
}
function now() {
  return Date.now();
}
function getComputedStyle(el) {
  var window = (0, _ssrWindow.getWindow)();
  var style;
  if (window.getComputedStyle) {
    style = window.getComputedStyle(el, null);
  }
  if (!style && el.currentStyle) {
    style = el.currentStyle;
  }
  if (!style) {
    style = el.style;
  }
  return style;
}
function getTranslate(el) {
  var axis = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 'x';
  var window = (0, _ssrWindow.getWindow)();
  var matrix;
  var curTransform;
  var transformMatrix;
  var curStyle = getComputedStyle(el, null);
  if (window.WebKitCSSMatrix) {
    curTransform = curStyle.transform || curStyle.webkitTransform;
    if (curTransform.split(',').length > 6) {
      curTransform = curTransform.split(', ').map(function (a) {
        return a.replace(',', '.');
      }).join(', ');
    }
    // Some old versions of Webkit choke when 'none' is passed; pass
    // empty string instead in this case
    transformMatrix = new window.WebKitCSSMatrix(curTransform === 'none' ? '' : curTransform);
  } else {
    transformMatrix = curStyle.MozTransform || curStyle.OTransform || curStyle.MsTransform || curStyle.msTransform || curStyle.transform || curStyle.getPropertyValue('transform').replace('translate(', 'matrix(1, 0, 0, 1,');
    matrix = transformMatrix.toString().split(',');
  }
  if (axis === 'x') {
    // Latest Chrome and webkits Fix
    if (window.WebKitCSSMatrix) curTransform = transformMatrix.m41;
    // Crazy IE10 Matrix
    else if (matrix.length === 16) curTransform = parseFloat(matrix[12]);
    // Normal Browsers
    else curTransform = parseFloat(matrix[4]);
  }
  if (axis === 'y') {
    // Latest Chrome and webkits Fix
    if (window.WebKitCSSMatrix) curTransform = transformMatrix.m42;
    // Crazy IE10 Matrix
    else if (matrix.length === 16) curTransform = parseFloat(matrix[13]);
    // Normal Browsers
    else curTransform = parseFloat(matrix[5]);
  }
  return curTransform || 0;
}
function isObject(o) {
  return _typeof(o) === 'object' && o !== null && o.constructor && Object.prototype.toString.call(o).slice(8, -1) === 'Object';
}
function isNode(node) {
  // eslint-disable-next-line
  if (typeof window !== 'undefined' && typeof window.HTMLElement !== 'undefined') {
    return node instanceof HTMLElement;
  }
  return node && (node.nodeType === 1 || node.nodeType === 11);
}
function extend() {
  var to = Object(arguments.length <= 0 ? undefined : arguments[0]);
  var noExtend = ['__proto__', 'constructor', 'prototype'];
  for (var i = 1; i < arguments.length; i += 1) {
    var nextSource = i < 0 || arguments.length <= i ? undefined : arguments[i];
    if (nextSource !== undefined && nextSource !== null && !isNode(nextSource)) {
      var keysArray = Object.keys(Object(nextSource)).filter(function (key) {
        return noExtend.indexOf(key) < 0;
      });
      for (var nextIndex = 0, len = keysArray.length; nextIndex < len; nextIndex += 1) {
        var nextKey = keysArray[nextIndex];
        var desc = Object.getOwnPropertyDescriptor(nextSource, nextKey);
        if (desc !== undefined && desc.enumerable) {
          if (isObject(to[nextKey]) && isObject(nextSource[nextKey])) {
            if (nextSource[nextKey].__swiper__) {
              to[nextKey] = nextSource[nextKey];
            } else {
              extend(to[nextKey], nextSource[nextKey]);
            }
          } else if (!isObject(to[nextKey]) && isObject(nextSource[nextKey])) {
            to[nextKey] = {};
            if (nextSource[nextKey].__swiper__) {
              to[nextKey] = nextSource[nextKey];
            } else {
              extend(to[nextKey], nextSource[nextKey]);
            }
          } else {
            to[nextKey] = nextSource[nextKey];
          }
        }
      }
    }
  }
  return to;
}
function setCSSProperty(el, varName, varValue) {
  el.style.setProperty(varName, varValue);
}
function animateCSSModeScroll(_ref) {
  var swiper = _ref.swiper,
    targetPosition = _ref.targetPosition,
    side = _ref.side;
  var window = (0, _ssrWindow.getWindow)();
  var startPosition = -swiper.translate;
  var startTime = null;
  var time;
  var duration = swiper.params.speed;
  swiper.wrapperEl.style.scrollSnapType = 'none';
  window.cancelAnimationFrame(swiper.cssModeFrameID);
  var dir = targetPosition > startPosition ? 'next' : 'prev';
  var isOutOfBound = function isOutOfBound(current, target) {
    return dir === 'next' && current >= target || dir === 'prev' && current <= target;
  };
  var animate = function animate() {
    time = new Date().getTime();
    if (startTime === null) {
      startTime = time;
    }
    var progress = Math.max(Math.min((time - startTime) / duration, 1), 0);
    var easeProgress = 0.5 - Math.cos(progress * Math.PI) / 2;
    var currentPosition = startPosition + easeProgress * (targetPosition - startPosition);
    if (isOutOfBound(currentPosition, targetPosition)) {
      currentPosition = targetPosition;
    }
    swiper.wrapperEl.scrollTo(_defineProperty({}, side, currentPosition));
    if (isOutOfBound(currentPosition, targetPosition)) {
      swiper.wrapperEl.style.overflow = 'hidden';
      swiper.wrapperEl.style.scrollSnapType = '';
      setTimeout(function () {
        swiper.wrapperEl.style.overflow = '';
        swiper.wrapperEl.scrollTo(_defineProperty({}, side, currentPosition));
      });
      window.cancelAnimationFrame(swiper.cssModeFrameID);
      return;
    }
    swiper.cssModeFrameID = window.requestAnimationFrame(animate);
  };
  animate();
}
function getSlideTransformEl(slideEl) {
  return slideEl.querySelector('.swiper-slide-transform') || slideEl.shadowEl && slideEl.shadowEl.querySelector('.swiper-slide-transform') || slideEl;
}
function findElementsInElements() {
  var elements = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : [];
  var selector = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : '';
  var found = [];
  elements.forEach(function (el) {
    found.push.apply(found, _toConsumableArray(el.querySelectorAll(selector)));
  });
  return found;
}
function elementChildren(element) {
  var selector = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : '';
  return _toConsumableArray(element.children).filter(function (el) {
    return el.matches(selector);
  });
}
function createElement(tag) {
  var _el$classList;
  var classes = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : [];
  var el = document.createElement(tag);
  (_el$classList = el.classList).add.apply(_el$classList, _toConsumableArray(Array.isArray(classes) ? classes : [classes]));
  return el;
}
function elementOffset(el) {
  var window = (0, _ssrWindow.getWindow)();
  var document = (0, _ssrWindow.getDocument)();
  var box = el.getBoundingClientRect();
  var body = document.body;
  var clientTop = el.clientTop || body.clientTop || 0;
  var clientLeft = el.clientLeft || body.clientLeft || 0;
  var scrollTop = el === window ? window.scrollY : el.scrollTop;
  var scrollLeft = el === window ? window.scrollX : el.scrollLeft;
  return {
    top: box.top + scrollTop - clientTop,
    left: box.left + scrollLeft - clientLeft
  };
}
function elementPrevAll(el, selector) {
  var prevEls = [];
  while (el.previousElementSibling) {
    var prev = el.previousElementSibling; // eslint-disable-line
    if (selector) {
      if (prev.matches(selector)) prevEls.push(prev);
    } else prevEls.push(prev);
    el = prev;
  }
  return prevEls;
}
function elementNextAll(el, selector) {
  var nextEls = [];
  while (el.nextElementSibling) {
    var next = el.nextElementSibling; // eslint-disable-line
    if (selector) {
      if (next.matches(selector)) nextEls.push(next);
    } else nextEls.push(next);
    el = next;
  }
  return nextEls;
}
function elementStyle(el, prop) {
  var window = (0, _ssrWindow.getWindow)();
  return window.getComputedStyle(el, null).getPropertyValue(prop);
}
function elementIndex(el) {
  var child = el;
  var i;
  if (child) {
    i = 0;
    // eslint-disable-next-line
    while ((child = child.previousSibling) !== null) {
      if (child.nodeType === 1) i += 1;
    }
    return i;
  }
  return undefined;
}
function elementParents(el, selector) {
  var parents = []; // eslint-disable-line
  var parent = el.parentElement; // eslint-disable-line
  while (parent) {
    if (selector) {
      if (parent.matches(selector)) parents.push(parent);
    } else {
      parents.push(parent);
    }
    parent = parent.parentElement;
  }
  return parents;
}
function elementTransitionEnd(el, callback) {
  function fireCallBack(e) {
    if (e.target !== el) return;
    callback.call(el, e);
    el.removeEventListener('transitionend', fireCallBack);
  }
  if (callback) {
    el.addEventListener('transitionend', fireCallBack);
  }
}
function elementOuterSize(el, size, includeMargins) {
  var window = (0, _ssrWindow.getWindow)();
  if (includeMargins) {
    return el[size === 'width' ? 'offsetWidth' : 'offsetHeight'] + parseFloat(window.getComputedStyle(el, null).getPropertyValue(size === 'width' ? 'margin-right' : 'margin-top')) + parseFloat(window.getComputedStyle(el, null).getPropertyValue(size === 'width' ? 'margin-left' : 'margin-bottom'));
  }
  return el.offsetWidth;
}

},{"ssr-window":6}],103:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
Object.defineProperty(exports, "A11y", {
  enumerable: true,
  get: function get() {
    return _a11y["default"];
  }
});
Object.defineProperty(exports, "Autoplay", {
  enumerable: true,
  get: function get() {
    return _autoplay["default"];
  }
});
Object.defineProperty(exports, "Controller", {
  enumerable: true,
  get: function get() {
    return _controller["default"];
  }
});
Object.defineProperty(exports, "EffectCards", {
  enumerable: true,
  get: function get() {
    return _effectCards["default"];
  }
});
Object.defineProperty(exports, "EffectCoverflow", {
  enumerable: true,
  get: function get() {
    return _effectCoverflow["default"];
  }
});
Object.defineProperty(exports, "EffectCreative", {
  enumerable: true,
  get: function get() {
    return _effectCreative["default"];
  }
});
Object.defineProperty(exports, "EffectCube", {
  enumerable: true,
  get: function get() {
    return _effectCube["default"];
  }
});
Object.defineProperty(exports, "EffectFade", {
  enumerable: true,
  get: function get() {
    return _effectFade["default"];
  }
});
Object.defineProperty(exports, "EffectFlip", {
  enumerable: true,
  get: function get() {
    return _effectFlip["default"];
  }
});
Object.defineProperty(exports, "FreeMode", {
  enumerable: true,
  get: function get() {
    return _freeMode["default"];
  }
});
Object.defineProperty(exports, "Grid", {
  enumerable: true,
  get: function get() {
    return _grid["default"];
  }
});
Object.defineProperty(exports, "HashNavigation", {
  enumerable: true,
  get: function get() {
    return _hashNavigation["default"];
  }
});
Object.defineProperty(exports, "History", {
  enumerable: true,
  get: function get() {
    return _history["default"];
  }
});
Object.defineProperty(exports, "Keyboard", {
  enumerable: true,
  get: function get() {
    return _keyboard["default"];
  }
});
Object.defineProperty(exports, "Manipulation", {
  enumerable: true,
  get: function get() {
    return _manipulation["default"];
  }
});
Object.defineProperty(exports, "Mousewheel", {
  enumerable: true,
  get: function get() {
    return _mousewheel["default"];
  }
});
Object.defineProperty(exports, "Navigation", {
  enumerable: true,
  get: function get() {
    return _navigation["default"];
  }
});
Object.defineProperty(exports, "Pagination", {
  enumerable: true,
  get: function get() {
    return _pagination["default"];
  }
});
Object.defineProperty(exports, "Parallax", {
  enumerable: true,
  get: function get() {
    return _parallax["default"];
  }
});
Object.defineProperty(exports, "Scrollbar", {
  enumerable: true,
  get: function get() {
    return _scrollbar["default"];
  }
});
Object.defineProperty(exports, "Swiper", {
  enumerable: true,
  get: function get() {
    return _core["default"];
  }
});
Object.defineProperty(exports, "Thumbs", {
  enumerable: true,
  get: function get() {
    return _thumbs["default"];
  }
});
Object.defineProperty(exports, "Virtual", {
  enumerable: true,
  get: function get() {
    return _virtual["default"];
  }
});
Object.defineProperty(exports, "Zoom", {
  enumerable: true,
  get: function get() {
    return _zoom["default"];
  }
});
Object.defineProperty(exports, "default", {
  enumerable: true,
  get: function get() {
    return _core["default"];
  }
});
var _core = _interopRequireDefault(require("./core/core.js"));
var _virtual = _interopRequireDefault(require("./modules/virtual/virtual.js"));
var _keyboard = _interopRequireDefault(require("./modules/keyboard/keyboard.js"));
var _mousewheel = _interopRequireDefault(require("./modules/mousewheel/mousewheel.js"));
var _navigation = _interopRequireDefault(require("./modules/navigation/navigation.js"));
var _pagination = _interopRequireDefault(require("./modules/pagination/pagination.js"));
var _scrollbar = _interopRequireDefault(require("./modules/scrollbar/scrollbar.js"));
var _parallax = _interopRequireDefault(require("./modules/parallax/parallax.js"));
var _zoom = _interopRequireDefault(require("./modules/zoom/zoom.js"));
var _controller = _interopRequireDefault(require("./modules/controller/controller.js"));
var _a11y = _interopRequireDefault(require("./modules/a11y/a11y.js"));
var _history = _interopRequireDefault(require("./modules/history/history.js"));
var _hashNavigation = _interopRequireDefault(require("./modules/hash-navigation/hash-navigation.js"));
var _autoplay = _interopRequireDefault(require("./modules/autoplay/autoplay.js"));
var _thumbs = _interopRequireDefault(require("./modules/thumbs/thumbs.js"));
var _freeMode = _interopRequireDefault(require("./modules/free-mode/free-mode.js"));
var _grid = _interopRequireDefault(require("./modules/grid/grid.js"));
var _manipulation = _interopRequireDefault(require("./modules/manipulation/manipulation.js"));
var _effectFade = _interopRequireDefault(require("./modules/effect-fade/effect-fade.js"));
var _effectCube = _interopRequireDefault(require("./modules/effect-cube/effect-cube.js"));
var _effectFlip = _interopRequireDefault(require("./modules/effect-flip/effect-flip.js"));
var _effectCoverflow = _interopRequireDefault(require("./modules/effect-coverflow/effect-coverflow.js"));
var _effectCreative = _interopRequireDefault(require("./modules/effect-creative/effect-creative.js"));
var _effectCards = _interopRequireDefault(require("./modules/effect-cards/effect-cards.js"));
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

},{"./core/core.js":14,"./modules/a11y/a11y.js":64,"./modules/autoplay/autoplay.js":65,"./modules/controller/controller.js":66,"./modules/effect-cards/effect-cards.js":67,"./modules/effect-coverflow/effect-coverflow.js":68,"./modules/effect-creative/effect-creative.js":69,"./modules/effect-cube/effect-cube.js":70,"./modules/effect-fade/effect-fade.js":71,"./modules/effect-flip/effect-flip.js":72,"./modules/free-mode/free-mode.js":73,"./modules/grid/grid.js":74,"./modules/hash-navigation/hash-navigation.js":75,"./modules/history/history.js":76,"./modules/keyboard/keyboard.js":77,"./modules/manipulation/manipulation.js":78,"./modules/mousewheel/mousewheel.js":84,"./modules/navigation/navigation.js":85,"./modules/pagination/pagination.js":86,"./modules/parallax/parallax.js":87,"./modules/scrollbar/scrollbar.js":88,"./modules/thumbs/thumbs.js":89,"./modules/virtual/virtual.js":90,"./modules/zoom/zoom.js":91}],104:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.getAppHeight = void 0;
var getAppHeight = function getAppHeight() {
  function getHeight() {
    $('html').css('--app-height', $(window).innerHeight() + 'px');
  }
  getHeight();
  window.addEventListener('resize', function () {
    getHeight();
  });
};
exports.getAppHeight = getAppHeight;

},{}],105:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.getScrollWidth = void 0;
var getScrollWidth = function getScrollWidth() {
  $('html').css('--scroll-width', $(window).outerWidth() - $(document).width() + 'px');
};
exports.getScrollWidth = getScrollWidth;

},{}],106:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.headerScrollChange = void 0;
/* scroll header function */
var headerScrollChange = function headerScrollChange() {
  $(window).scroll(function () {
    var scroll = $(this).scrollTop();
    if (scroll > 0) {
      $('.header').addClass('scroll');
    } else {
      $('.header').removeClass('scroll');
    }
  });
};
exports.headerScrollChange = headerScrollChange;

},{}],107:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.inputCount = void 0;
var inputCount = function inputCount() {
  $('.js-count-btn').click(function () {
    var curInput = $(this).parent().find('.count-input');
    if ($(this).attr('data-type') == 'dec') {
      if (parseInt(curInput.val()) <= 1) {
        curInput.val(1);
      } else {
        curInput.val(parseInt(curInput.val()) - 1);
      }
    } else {
      curInput.val(parseInt(curInput.val()) + 1);
    }
    curInput.trigger('change');
  });
};
exports.inputCount = inputCount;

},{}],108:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.menuBtn = void 0;
var menuBtn = function menuBtn() {
  // open menu
  $('#hamburger').on('click', function () {
    $('body').toggleClass('overflow menu-show');
    $(this).toggleClass('is-active');
    $('#main-menu').toggleClass('show');
  });
  // close menu
  $(document).click(function (e) {
    if ($('#main-menu').has(e.target).length === 0 && $('#hamburger').has(e.target).length === 0 && $('#main-menu').hasClass('show') && !e.target.classList.contains('hamburger')) {
      $('body').removeClass('overflow menu-show');
      $('#hamburger').removeClass('is-active');
      $('#main-menu').removeClass('show');
    }
  });
};
exports.menuBtn = menuBtn;

},{}],109:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.videoModal = exports.simpleModal = exports.galleryModal = void 0;
var videoModal = function videoModal() {
  $('.js-video-modal').magnificPopup({
    type: 'iframe',
    mainClass: 'mfp-fade',
    tClose: 'Закрыть',
    tLoading: 'Загрузка',
    fixedContentPos: false,
    removalDelay: 160,
    preloader: false,
    callbacks: {
      open: function open() {
        $('body').addClass('overflow');
      },
      close: function close() {
        $('body').removeClass('overflow');
      }
    }
  });
};
exports.videoModal = videoModal;
var simpleModal = function simpleModal() {
  $('.js-simple-modal').magnificPopup({
    type: 'inline',
    mainClass: 'mfp-fade',
    tClose: 'Закрыть',
    tLoading: 'Загрузка',
    removalDelay: 160,
    closeBtnInside: true,
    fixedContentPos: true,
    preloader: false,
    callbacks: {
      open: function open() {
        $('body').addClass('overflow');
      },
      close: function close() {
        $('body').removeClass('overflow');
      }
    }
  });
};
exports.simpleModal = simpleModal;
var galleryModal = function galleryModal(galleryBlock) {
  $(galleryBlock).magnificPopup({
    delegate: 'a',
    type: 'image',
    mainClass: 'mfp-fade',
    tClose: 'Закрыть',
    tLoading: 'Загрузка',
    gallery: {
      enabled: true,
      tPrev: 'Назад',
      tNext: 'Вперед',
      tCounter: '<span class="mfp-counter"><span class="active">%curr%</span> / <span>%total%</span></span>'
    },
    image: {
      tError: 'Ошибка загрузки'
    }
  });
};
exports.galleryModal = galleryModal;

},{}],110:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.scrollTo = void 0;
var scrollTo = function scrollTo(selector, offset) {
  $("body").on('click', selector, function (e) {
    $('html,body').stop().animate({
      scrollTop: $('#' + $(this).attr('data-section')).offset().top - offset
    }, 1000);
    e.preventDefault();
  });
};
exports.scrollTo = scrollTo;

},{}],111:[function(require,module,exports){
"use strict";

function _typeof(obj) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (obj) { return typeof obj; } : function (obj) { return obj && "function" == typeof Symbol && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }, _typeof(obj); }
require("lazysizes/plugins/bgset/ls.bgset.js");
require("lazysizes/plugins/parent-fit/ls.parent-fit.js");
var _swiper = _interopRequireWildcard(require("swiper"));
require("jquery-form-styler");
var _headerScrollChange = require("./_func/_jq/headerScrollChange");
var _getAppHeight = require("./_func/_jq/getAppHeight");
var _getScrollWidth = require("./_func/_jq/getScrollWidth");
var _inputCount = require("./_func/_jq/inputCount");
var _modalMagnific = require("./_func/_jq/modalMagnific");
var _scrollTo = require("./_func/_jq/scrollTo");
var _menuBtn = require("./_func/_jq/menuBtn");
function _getRequireWildcardCache(nodeInterop) { if (typeof WeakMap !== "function") return null; var cacheBabelInterop = new WeakMap(); var cacheNodeInterop = new WeakMap(); return (_getRequireWildcardCache = function _getRequireWildcardCache(nodeInterop) { return nodeInterop ? cacheNodeInterop : cacheBabelInterop; })(nodeInterop); }
function _interopRequireWildcard(obj, nodeInterop) { if (!nodeInterop && obj && obj.__esModule) { return obj; } if (obj === null || _typeof(obj) !== "object" && typeof obj !== "function") { return { "default": obj }; } var cache = _getRequireWildcardCache(nodeInterop); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (key !== "default" && Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj["default"] = obj; if (cache) { cache.set(obj, newObj); } return newObj; }
/* TODO how change static images */

// slider

// custom select

// functions

/* ------------------- */

document.addEventListener('DOMContentLoaded', function () {
  // app height fix
  (0, _getAppHeight.getAppHeight)();
  (0, _getScrollWidth.getScrollWidth)();
  // scroll change
  (0, _headerScrollChange.headerScrollChange)();
  // mobile menu
  (0, _menuBtn.menuBtn)();
  // lang menu
  $('.js-lang-menu').click(function () {
    if ($(this).hasClass('active')) {
      $(this).removeClass('active');
      $(this).parent().find('.lang-list').slideUp(200);
    } else {
      $(this).addClass('active');
      $(this).parent().find('.lang-list').slideDown(200);
    }
  });
  $(document).click(function (e) {
    if (!e.target.classList.contains('js-lang-menu') && $('.js-lang-menu').hasClass('active')) {
      $('.js-lang-menu').removeClass('active');
      $('.js-lang-menu').parent().find('.lang-list').slideUp(200);
    }
  });
  // custom selects
  setTimeout(function () {
    $('.select-style').styler();
  }, 100);
  // count function
  (0, _inputCount.inputCount)();

  /* main resize change */
  function changeHeaderResize() {
    if ($(window).width() <= 960) {
      $('.header__content').addClass('mobile-update');
    } else {
      $('.header__content').removeClass('mobile-update');
    }
    if ($('.header__content').hasClass('mobile-update')) {
      $('.header__content .search-block').prependTo($('.header__content .main-menu'));
      $('.header__content .links-block').appendTo($('.header__content .main-menu'));
      if ($(window).width() <= 413) {
        $('.header__content .main-menu .main-menu__list').after($('.header__content .phone-link'));
      } else {
        $('.header__content .lang-block').after($('.header__content .main-menu .phone-link'));
      }
    } else {
      $('.header__content .logo-link').after($('.header__content .main-menu .search-block'));
      $('.header__content .search-block').after($('.header__content .main-menu .links-block'));
    }
  }
  changeHeaderResize();
  $(window).resize(function () {
    changeHeaderResize();
  });

  /* main page */
  // products slider
  document.querySelectorAll('.products-slider').forEach(function (productsSlider) {
    var productsSlider = new _swiper["default"](productsSlider, {
      modules: [_swiper.Navigation],
      lazy: true,
      speed: 800,
      loop: true,
      slidesPerView: 1,
      spaceBetween: 10,
      simulateTouch: false,
      navigation: {
        prevEl: productsSlider.parentElement.parentElement.querySelector('.slider-navigation .nav-btn.prev-btn'),
        nextEl: productsSlider.parentElement.parentElement.querySelector('.slider-navigation .nav-btn.next-btn')
      },
      breakpoints: {
        960: {
          slidesPerView: 4
        },
        768: {
          slidesPerView: 3
        },
        414: {
          slidesPerView: 2,
          spaceBetween: 20
        },
        341: {
          slidesPerView: 2
        }
      }
    });
  });
  // product slider
  document.querySelectorAll('.product-item .product-slider').forEach(function (productSlider) {
    var productSlider = new _swiper["default"](productSlider, {
      modules: [_swiper.Navigation, _swiper.Pagination],
      lazy: true,
      speed: 800,
      loop: true,
      slidesPerView: 1,
      spaceBetween: 10,
      pagination: {
        clickable: true,
        el: productSlider.parentElement.parentElement.querySelector('.slider-pagination')
      }
    });
  });
  // answers slider
  var answersSlider = new _swiper["default"]('#answers-slider', {
    modules: [_swiper.Navigation],
    lazy: true,
    speed: 800,
    simulateTouch: false,
    loop: true,
    slidesPerView: 1,
    spaceBetween: 30,
    navigation: {
      prevEl: '.main-answers .slider-navigation .nav-btn.prev-btn',
      nextEl: '.main-answers .slider-navigation .nav-btn.next-btn'
    },
    breakpoints: {
      1200: {
        slidesPerView: 3
      },
      768: {
        slidesPerView: 2
      }
    }
  });
  // answers video
  document.querySelectorAll('.answer-item').forEach(function (videoAnswer) {
    if (videoAnswer.querySelector('.item-video') !== null) {
      videoAnswer.addEventListener('mouseover', function () {
        var videoItem = this.querySelector('.item-video');
        videoItem.play();
      });
      videoAnswer.addEventListener('touchstart', function () {
        var videoItem = this.querySelector('.item-video');
        videoItem.play();
      });
      videoAnswer.addEventListener('mouseout', function () {
        var videoItem = this.querySelector('.item-video');
        videoItem.pause();
        // videoItem.currentTime = 0;
      });

      videoAnswer.addEventListener('touchend', function () {
        var videoItem = this.querySelector('.item-video');
        videoItem.pause();
        // videoItem.currentTime = 0;
      });
    }
  });
  // calc function
  $('#main-calc').change(function () {
    console.log('test');
    var name = $(this).find('select[name="equip"] option:checked').val(),
      power = parseInt($(this).find('select[name="equip"] option:checked').attr('data-power')),
      profit = parseInt($(this).find('select[name="equip"] option:checked').attr('data-profit')),
      service_price = parseFloat($(this).find('select[name="equip"] option:checked').attr('data-price')),
      count = parseInt($(this).find('input[name="count"]').val()),
      btc = parseInt($(this).attr('data-btc')),
      dollar = parseInt($(this).attr('data-btc'));
    $(this).find('input[name="service_price"]').val(service_price);
    var result = (btc * count * profit - count * power / 1000 * 24 * service_price * 1 / dollar) * 31;
    $(this).find('.result_value').text('$ ' + parseInt(result));
  });
  // answers info
  $('.js-info-link').click(function () {
    if ($(this).hasClass('active')) {
      $(this).removeClass('active').parent().find('.item-descr').slideUp(300);
    } else {
      $(this).addClass('active').parent().find('.item-descr').slideDown(300);
    }
  });

  /* product page */
  if ($('.product-main').length > 0) {
    var productThumbs = new _swiper["default"]("#mproduct-thumb", {
      modules: [_swiper.Thumbs, _swiper.FreeMode],
      speed: 800,
      spaceBetween: 15,
      slidesPerView: 5,
      direction: 'vertical',
      freeMode: true,
      watchSlidesProgress: true
    });
    var productMain = new _swiper["default"]("#mproduct-slider", {
      modules: [_swiper.Thumbs, _swiper.FreeMode],
      speed: 800,
      spaceBetween: 10,
      thumbs: {
        swiper: productThumbs
      }
    });
  }

  /* shop page */
  // scroll link
  (0, _scrollTo.scrollTo)('.js-scroll-link', -50);
  // calc range
  if (document.getElementById('range')) {
    var btc_range = document.getElementById('range'),
      btc_from = parseInt(btc_range.getAttribute('data-from')),
      btc_to = parseInt(btc_range.getAttribute('data-to'));
    noUiSlider.create(btc_range, {
      start: btc_from,
      connect: 'lower',
      step: 500,
      tooltips: true,
      format: {
        from: function from(value) {
          return parseInt(value);
        },
        to: function to(value) {
          return parseInt(value);
        }
      },
      range: {
        'min': btc_from,
        'max': btc_to
      }
    });
    btc_range.noUiSlider.on('update', function (values, handle) {
      $('#shop-calc').trigger('change');
    });
  }
  // shop calc
  $('#shop-calc').on('change', function () {
    var power = parseFloat($(this).attr('data-power')),
      days = parseInt($(this).attr('data-days')),
      electro = parseInt($(this).attr('data-electro')),
      count = parseInt($(this).find('input[name="packet"]:checked').val()),
      dollar = parseInt($(this).attr('data-dollar')),
      btc = btc_range.noUiSlider.get();
    var result = btc * (count * power) * dollar * days - count * electro;
    $(this).find('.result-block').text(parseInt(result).toLocaleString('ru'));
  });

  /* modals */
  (0, _modalMagnific.videoModal)();
  (0, _modalMagnific.simpleModal)();
});

},{"./_func/_jq/getAppHeight":104,"./_func/_jq/getScrollWidth":105,"./_func/_jq/headerScrollChange":106,"./_func/_jq/inputCount":107,"./_func/_jq/menuBtn":108,"./_func/_jq/modalMagnific":109,"./_func/_jq/scrollTo":110,"jquery-form-styler":1,"lazysizes/plugins/bgset/ls.bgset.js":4,"lazysizes/plugins/parent-fit/ls.parent-fit.js":5,"swiper":103}]},{},[111])

//# sourceMappingURL=common.js.map
