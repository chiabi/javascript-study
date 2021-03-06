/*
	* Mighty base - Styleship's primary js tools used in web development.
	* Version 1.5.8
	* Edit 19. May. 2017
	* www.styleship.com
	* By Woos / Multimedia team Director;
	*
	* 본 소스는 법으로 보호되는 Styleship의 지적재산으로서
	* 본 제작자와 회사의 허가를 받지 않은 사용자 혹은 사이트등 어떠한 경우에도  
	* 무단 사용시에는 민형사상의 처벌 및 배상 책임이 발생합니다.
	* 
	ⓒ Styleship inc. All Right Reserved.
	*
	*
	* Update : v.1.5.8 - 콤보박스 멀티가 아닌 단일 선택 UI일때 간헐적으로 발생하는 "join..." 스크립트 에러 수정  
	* Update : v.1.5.7 - layer.source 스크립트에러 패치. layer popup 설정값 중 bodyScroll : "fix"일 경우 팝업창 닫았을 경우 스크롤 원상복구 되도록 변경.  layer 옵션중 closeButtonId(레이어 컨텐트 내에 레이어 닫기 버튼이 있을 경우 버튼의 ID를 사용하여 이를 닫기버튼으로 적용) 속성 추가. 
	* Update : v.1.5.6 - mightyBase refresh 메서드 실행시 셀렉박스 재설정 실행 추가. selectbox multi 설정시 선택한 항목들로 인덱스 텍스트의 변경 추가.
	* Update : v.1.5.5 -  <img> 태그 autofit 기능 개선(동적으로 추가된 이미지 객체들에 적용될 수 있도록 매서드 jQuery.addAutofit 기능 추가).
	* Update : v.1.5.4 - layer기능 개선(백그라운드 클릭으로 레이어 닫힘 옵션 오작동 버그 패치 및 정렬 계산 로직변경 maxWidth, maxHeight 옵션 추가).
	* Update : v.1.5.3 - <img> 태그 autofit 기능중 강제 opacity 적용부분 제거 패치 .
	* Update : v.1.5.2 - 레이어팝업 기능중 바디의 스크롤 픽스여부 적용 옵션 추가. 
	* Update : v.1.5.1 - <img> 태그 autofit 중복사용 버그패치, 소스최적화 작업. 
	* Update : v.1.5.0 - <img> 태그에 autofit 스타일 기능 추가. 
*/

function trace(d) {
    var c = "";
    for (var f = 0; f < arguments.length; f++) {
        if (f > 0) {
            c += ", "
        }
        c += arguments[f]
    }
    try {
        console.log(c)
    } catch (g) {}
}
try {
    if (!layer) {
        var layer = {};
        jQuery(function() {
            jQuery.mightyBase = jQuery("body:first").mightyBase()
        })
    }
} catch (e) {}
(function(a) {
    if (a.fn.mightyBase) {
        return a.fn.mightyBase
    }
    a.fn.mightyBase = function() {
        var g = new Object();
        var h = this;
        g.content = this;
        var c = a(this);
        var k = {}
          , i = {}
          , b = {};
        function l() {
            f();
            k.watch();
            i.watch();
            b.init()
        }
        h.refresh = function(m) {
            if (!m || m.toLowerCase() == "autofit") {
                b.init()
            }
            if (!m || m.toLowerCase() == "selectbox" || m.toLowerCase() == "select-box") {
                k.refresh()
            }
        }
        ;
        function f() {
            a.fn.addCss = function(m) {
                var n = a(this);
                if (!n.hasClass(m)) {
                    n.addClass(m)
                }
            }
            ;
            a.fn.removeCss = function(m) {
                var n = a(this);
                if (n.hasClass(m)) {
                    n.removeClass(m)
                }
            }
        }
        k = {
            openCss: "open_select_list",
            boxNo: 0,
            watch: function() {
                a(document).on("mousedown", ".select_box>button, .select_box>a", function(m) {
                    m.preventDefault();
                    k.toggleList(a(this))
                });
                a(document).on("mousedown", ".select_box>input", function(m) {
                    k.toggleList(a(this))
                });
                a(document).on("focusin", ".select_box button, .select_box a, .select_box input", function(m) {
                    k.viewList(a(this))
                });
                a(document).on("focusout", ".select_box button, .select_box a, .select_box input", function(m) {
                    k.focusoutFn(a(this))
                });
                a(document).on("mouseenter", ".select_box", function(m) {
                    if (a(this).hasClass("no_over")) {
                        return
                    }
                    k.viewList(a(this))
                });
                a(document).on("mouseleave", ".select_box", function(m) {
                    k.hideList(a(this))
                });
                a(document).on("click", ".select_box>ul>li>a, .select_box>ul>li>button", function(m) {
                    k.changeCurr(a(this))
                })
            },
            unwatch: function() {
                a(document).off("mousedown", ".select_box>button, .select_box>a", function(m) {
                    m.preventDefault();
                    k.toggleList(a(this))
                });
                a(document).off("mousedown", ".select_box>input", function(m) {
                    k.toggleList(a(this))
                });
                a(document).off("focusin", ".select_box button, .select_box a, .select_box input", function(m) {
                    k.viewList(a(this))
                });
                a(document).off("focusout", ".select_box button, .select_box a, .select_box input", function(m) {
                    k.focusoutFn(a(this))
                });
                a(document).off("mouseenter", ".select_box", function(m) {
                    if (a(this).hasClass("no_over")) {
                        return
                    }
                    k.viewList(a(this))
                });
                a(document).off("mouseleave", ".select_box", function(m) {
                    k.hideList(a(this))
                });
                a(document).off("click", ".select_box>ul>li>a, .select_box>ul>li>button", function(m) {
                    k.changeCurr(a(this))
                })
            },
            refresh: function() {
                k.unwatch();
                k.watch()
            },
            toggleList: function(o) {
                var m = o.parent();
                var n = m.children("ul");
                if (n.is(":hidden")) {
                    k.viewList(m)
                } else {
                    k.hideList(m)
                }
            },
            focusoutFn: function(m) {
                setTimeout(function() {
                    var p = null
                      , s = m
                      , r = false;
                    var o = jQuery(document.activeElement);
                    var q = o.data("selectboxNo");
                    for (var n = 0; n <= 7; n++) {
                        s = s.parent().size() ? s.parent() : s;
                        if (s.hasClass("select_box")) {
                            p = s;
                            if (!q) {
                                k.hideList(p);
                                return
                            }
                            if (p.data("selectboxNo") != q) {
                                k.hideList(p)
                            }
                            break
                        }
                    }
                }, 100)
            },
            viewList: function(p) {
                var n = null
                  , q = p;
                for (var m = 0; m <= 7; m++) {
                    if (q.hasClass("select_box")) {
                        n = q;
                        break
                    } else {
                        q = q.parent().size() ? q.parent() : q
                    }
                }
                if (!n) {
                    return
                }
                if (!n.data("selectboxNo")) {
                    k.boxNo++;
                    n.data("selectboxNo", k.boxNo)
                }
                n.find("a, button, input").each(function(r) {
                    a(this).data("selectboxNo", n.data("selectboxNo"))
                });
                var o = n.children("ul");
                n.addCss(k.openCss)
            },
            hideList: function(o) {
                var m = o;
                var n = m.children("ul");
                m.removeCss(k.openCss)
            },
            changeCurr: function(r) {
                var o = r.parent().parent().parent();
                var m;
                var q = o.children("ul");
                if (!o.data("indexText")) {
                    if (o.children("button").size() > 0) {
                        o.data("indexText", o.children("button").html())
                    } else {
                        if (o.children("a").size() > 0) {
                            o.data("indexText", o.children("a").html())
                        } else {
                            if (o.children("input").size() > 0) {
                                o.data("indexText", o.children("input").attr("value"))
                            } else {
                                o.data("indexText", "select")
                            }
                        }
                    }
                }
                if (o.children("button").size() > 0) {
                    m = o.children("button")
                } else {
                    if (o.children("a").size() > 0) {
                        m = o.children("a")
                    } else {
                        if (o.children("input").size() > 0) {
                            m = o.children("input")
                        } else {
                            m = null
                        }
                    }
                }
                var t = ""
                  , s = null
                  , n = null
                  , p = null;
                if (o.hasClass("multi")) {
                    if (r.parent().hasClass("curr")) {
                        r.parent().removeCss("curr")
                    } else {
                        r.parent().addCss("curr")
                    }
                    s = [];
                    n = [];
                    q.children("li").each(function(u) {
                        if (a(this).hasClass("curr")) {
                            p = a(this).attr("data-value") ? a(this).attr("data-value") : a(this).html();
                            t += t ? "," + p : p;
                            s.push(u);
                            n.push(p)
                        }
                    });
                    o.attr("data-no", s.join(",")).data("data-value", n.join(","))
                } else {
                    q.children("li").each(function(u) {
                        a(this).removeCss("curr");
                        if (a(this).find("a, button")[0] == r) {
                            s = u
                        }
                    });
                    r.parent().addCss("curr");
                    k.hideList(o);
                    p = r.attr("data-value") ? r.attr("data-value") : r.html();
                    t = p;
                    n = p;
                    o.attr("data-no", s).data("data-value", n)
                }
                if (m) {
                    if (o.children("input").size() > 0) {
                        m.attr("value", t);
                        m.val(t)
                    } else {
                        m.html(t)
                    }
                }
                o.data("no", s).data("value", n)
            }
        };
        i = {
            watch: function() {
                i.changeSrcAttr();
                i.setInteractiveAttrImg();
                i.setInteractiveAttrArea()
            },
            unwatch: function() {
                i.clearInteractiveAttrImg();
                i.clearInteractiveAttrArea()
            },
            setInteractiveAttrArea: function() {
                jQuery(document).on("mouseenter", ".interactive", function() {
                    var m = jQuery(this);
                    m.find("img[data-over]").each(function() {
                        var n = jQuery(this);
                        if (!n.attr("data-normal")) {
                            n.attr("data-normal", n.attr("src"))
                        }
                        if (n.attr("interactSelf") != "yes") {
                            n.attr("interactSelf", "no")
                        }
                        n.attr("src", n.attr("data-over"))
                    });
                    m.css("cursor", "pointer");
                    m.find("*.overContent").each(function() {
                        jQuery(this).css("display", "block")
                    });
                    m.find("*.overLayer").each(function() {
                        jQuery(this).css("display", "block")
                    });
                    m.find("*.outContent").each(function() {
                        jQuery(this).css("display", "none")
                    });
                    m.find("*.outLayer").each(function() {
                        jQuery(this).css("display", "none")
                    })
                }).on("mouseleave", ".interactive", function() {
                    var m = jQuery(this);
                    m.find("img[data-normal]").each(function(o) {
                        var p = jQuery(this);
                        var n = m.attr("curr");
                        if (p.attr("data-normal")) {
                            if (n != "yes") {
                                p.attr("src", p.attr("data-normal"))
                            } else {
                                p.attr("src", p.attr("data-curr"))
                            }
                        }
                    });
                    if (m.attr("curr") == "yes") {
                        m.find("img").each(function(n) {
                            var o = jQuery(this);
                            if (o.attr("data-curr")) {
                                o.attr("src", o.attr("data-curr"))
                            } else {
                                if (o.attr("data-over")) {
                                    o.attr("src", o.attr("data-over"))
                                }
                            }
                        })
                    }
                    m.find("*.overContent").each(function() {
                        jQuery(this).css("display", "none")
                    });
                    m.find("*.overLayer").each(function() {
                        jQuery(this).css("display", "none")
                    });
                    m.find("*.outContent").each(function() {
                        jQuery(this).css("display", "block")
                    });
                    m.find("*.outLayer").each(function() {
                        jQuery(this).css("display", "block")
                    })
                }).find("*.overLayer, *.overContent").each(function() {
                    jQuery(this).css("display", "none")
                })
            },
            clearInteractiveAttrArea: function() {
                jQuery(document).off("mouseenter", ".interactive").off("mouseleave", ".interactive");
                jQuery(".interactive").each(function(m) {
                    var n = jQuery(this);
                    n.css("cursor", "default")
                })
            },
            setInteractiveAttrImg: function() {
                jQuery(document).on("mouseover", "img[data-over]", function() {
                    var m = jQuery(this);
                    if (m.attr("interactSelf") == "no") {
                        return
                    }
                    m.css("cursor", "pointer");
                    if (!m.attr("data-normal")) {
                        m.attr("data-normal", m.attr("src"))
                    }
                    m.attr("src", m.attr("data-over"))
                }).on("mouseout", "img[data-over]", function() {
                    var m = jQuery(this);
                    if (m.attr("interactSelf") == "no") {
                        return
                    }
                    if (m.attr("curr") == "yes" && m.attr("data-curr")) {
                        m.attr("src", m.attr("data-curr"))
                    } else {
                        m.attr("src", m.attr("data-normal"))
                    }
                })
            },
            clearInteractiveAttrImg: function() {
                jQuery(document).off("mouseover", "img[data-over]").off("mouseout", "img[data-over]");
                jQuery("img[data-over]").each(function(m) {
                    var n = jQuery(this);
                    if (n.attr("data-normal")) {
                        n.attr("src", n.attr("data-normal"))
                    }
                    if (n.attr("data-over")) {
                        n.css("cursor", "default")
                    }
                })
            },
            changeSrcAttr: function() {
                a("body").find("*[src-over]").each(function() {
                    var m = a(this);
                    m.attr("data-over", m.attr("src-over")).removeAttr("src-over")
                });
                a("body").find("*[src-normal]").each(function() {
                    var m = a(this);
                    m.attr("data-normal", m.attr("src-normal")).removeAttr("src-normal")
                })
            }
        };
        a.download = function(m) {
            var n = window.open(m, "", "width=1,height=1,top=1600,left=2560,toolbar=no,location=no,directories=no,status=no,menubar=no,scrollbars=no,resizable=no");
            n.document.execCommand("SaveAs", "null", m);
            n.close()
        }
        ;
        a.documentParam = function(m) {
            var n = {};
            document.location.search.replace(/\??(?:([^=]+)=([^&]*)&?)/g, function() {
                function o(p) {
                    return decodeURIComponent(p.split("+").join(" "))
                }
                n[o(arguments[1])] = o(arguments[2])
            });
            if (!n[m]) {
                n[m] = ""
            }
            return n[m]
        }
        ;
        a.loadXML = function(m, n, p, o) {
            if (m.split("?").length > 1) {
                p = d(m.split("?")[1], p);
                m = m.split("?")[0];
                o = o ? o : "get"
            }
            jQuery.ajax({
                url: m,
                dataType: "xml",
                data: p ? p : {},
                type: o ? o : "post",
                success: function(q) {
                    n(jQuery(q))
                },
                error: function(r, s, q) {
                    trace("The requested XML(" + m + ") could not be loaded! (" + q + ")")
                }
            })
        }
        ;
        a.loadHTML = function(m, n, p, o) {
            if (m.split("?").length > 1) {
                p = d(m.split("?")[1], p);
                m = m.split("?")[0];
                o = o ? o : "get"
            }
            jQuery.ajax({
                url: m,
                dataType: "html",
                data: p ? p : {},
                type: o ? o : "post",
                success: function(q) {
                    n(jQuery(q))
                },
                error: function(r, s, q) {
                    trace("The requested HTML(" + m + ") could not be loaded! (" + q + ")")
                }
            })
        }
        ;
        a.loadJson = function(m, n, p, o) {
            if (m.split("?").length > 1) {
                p = d(m.split("?")[1], p);
                m = m.split("?")[0];
                o = o ? o : "get"
            }
            jQuery.ajax({
                url: m,
                dataType: "json",
                data: p ? p : {},
                type: o ? o : "post",
                success: function(q) {
                    n(jQuery(q))
                },
                error: function(r, s, q) {
                    trace("The requested Json(" + m + ") could not be loaded! (" + q + ")")
                }
            })
        }
        ;
        function d(q, p) {
            var m = q.split("&");
            var o = p ? p : {};
            for (var n = 0; n < m.length; n++) {
                o[m[n].split("=")[0]] = m[n].split("=")[1]
            }
            return o
        }
        a.load = function(n, m, o, q, p) {
            if (n.toLowerCase() == "xml") {
                a.loadXML(m, o, q, p)
            } else {
                if (n.toLowerCase() == "html") {
                    a.loadHTML(m, o, q, p)
                } else {
                    if (n.toLowerCase() == "json") {
                        a.loadJson(m, o, q, p)
                    }
                }
            }
        }
        ;
        function j() {
            a.browser = (function() {
                var n = navigator.userAgent.toLowerCase();
                var m = /(webkit)[ \/](\w.]+)/.exec(n) || /(opera)(?:.*version)?[ \/](\w.]+)/.exec(n) || /(msie) ([\w.]+)/.exec(n) || /(mozilla)(?:.*? rv:([\w.]+))?/.exec(n) || [];
                return {
                    name: m[1] || "",
                    version: m[2] || "0"
                }
            }());
            a.browserVer = null
        }
        layer = {
            ready: false,
            container: null,
            popup: {},
            bg: {},
            idList: [],
            zIndex: 999999,
            text: null,
            defaultOptn: {
                alignX: null,
                alignY: null,
                data: {},
                dataType: "post",
                closeButtonId: "",
                css: null,
                width: null,
                height: null,
                maxWidth: null,
                minWidth: null,
                maxHeight: null,
                minHeight: null,
                background: false,
                backgroundCss: null,
                backgroundColor: "transparent",
                backgroundOpacity: 0.5,
                backgroundClose: false,
                bodyScroll: "normal",
                zIndex: 999999
            },
            init: function() {
                if (layer.ready) {
                    return
                }
                layer.ready = true;
                if (a("div#layerPopup").size() == 0) {
                    a("body:first").append('<div id="layerPopup"></div>')
                }
                layer.container = a("div#layerPopup");
                layer.container.css({
                    position: "fixed",
                    left: 0,
                    top: 0,
                    width: 0,
                    height: 0,
                    "z-index": layer.zIndex
                })
            },
            open: function(u, r, o) {
                if (!layer.ready) {
                    layer.init()
                }
                if (!u || u.length < 4) {
                    return
                }
                if (layer.container.children("#" + r).size() > 0) {
                    layer.link(u.layerName);
                    return
                }
                o = a.extend(layer.defaultOptn, o);
                try {
                    if (typeof (o.data) != "object") {
                        o.data = {}
                    }
                    o.data.openType = "layer"
                } catch (s) {}
                var q = layer.buildBg(r, o);
                var n = o.css ? 'class="' + o.css + ' _layer_content _ajax" ' : 'class="_layer_content _ajax" ';
                var p = "";
                p += !o.width ? "" : "width:" + (typeof (o.width) == "number" ? o.width + "px; " : o.width + "; ");
                p += !o.height ? "" : "height:" + (typeof (o.height) == "number" ? o.height + "px; " : o.height + "; ");
                p += !o.maxWidth ? "" : "max-width:" + (typeof (o.maxWidth) == "number" ? o.maxWidth + "px; " : o.maxWidth + "; ");
                p += !o.maxHeight ? "" : "max-height:" + (typeof (o.maxHeight) == "number" ? o.maxHeight + "px; " : o.maxHeight + "; ");
                p += !o.minWidth ? "" : "min-width:" + (typeof (o.minWidth) == "number" ? o.minWidth + "px; " : o.minWidth + "; ");
                p += !o.minHeight ? "" : "min-height:" + (typeof (o.minHeight) == "number" ? o.minHeight + "px; " : o.minHeight + "; ");
                p += "position:fixed; ";
                var t = '<div id="' + r + '" ' + n + ' style="' + p + '" data-type="ajax"></div>';
                layer.container.append(t);
                var m = layer.container.children("#" + r);
                layer.popup[r] = m;
                layer.watch.call(r, o);
                a.loadHTML(u, function(v) {
                    m.html(v);
                    layer.watch.setAlign(r, layer.watch.alignData[r]);
                    if (o.closeButtonId != "") {
                        layer.setCloseButton(r, o.closeButtonId)
                    }
                }, o.data);
                return
            },
            iframe: function(p, s, m) {
                if (!layer.ready) {
                    layer.init()
                }
                if (!p || p.length < 4) {
                    return
                }
                if (p.split("?").length > 1) {
                    p = p + "&iframeName=" + s
                } else {
                    p = p + "?iframeName=" + s
                }
                m = a.extend(layer.defaultOptn, m);
                var o = layer.buildBg(s, m);
                var r = "position:fixed; ";
                r += !m.width ? "" : "width:100%; max-width:" + (typeof (m.width) == "number" ? m.width + "px; " : m.width + "; ");
                r += !m.height ? "" : "height:100%; max-height:" + (typeof (m.height) == "number" ? m.height + "px; " : m.height + "; ");
                var q = '<iframe src="LLLLL" id="NNNNN" name="NNNNN" width="WWWWW" height="HHHHH" style="' + r + '" class="_layer_content _iframe" ALLOWTRANSPARENCY="true"></iframe>';
                q = q.split("LLLLL").join(p).split("NNNNN").join(s).split("WWWWW").join(m.width).split("HHHHH").join(m.height);
                layer.container.append(q);
                var n = layer.container.children("#" + s);
                layer.popup[s] = n;
                layer.watch.call(s, m);
                return
            },
            source: function(r, p, n) {
                if (!layer.ready) {
                    layer.init()
                }
                if (typeof (r) != "string") {
                    return
                }
                n = a.extend(layer.defaultOptn, n);
                var q = layer.buildBg(p, n);
                var m = n.css ? 'class="' + n.css + ' _layer_content _ajax" ' : 'class="_layer_content _text" ';
                var t = "";
                t += !n.width ? "" : "width:" + (typeof (n.width) == "number" ? n.width + "px; " : n.width + "; ");
                t += !n.height ? "" : "height:" + (typeof (n.height) == "number" ? n.height + "px; " : n.height + "; ");
                t += !n.maxWidth ? "" : "max-width:" + (typeof (n.maxWidth) == "number" ? n.maxWidth + "px; " : n.maxWidth + "; ");
                t += !n.maxHeight ? "" : "max-height:" + (typeof (n.maxHeight) == "number" ? n.maxHeight + "px; " : n.maxHeight + "; ");
                t += !n.minWidth ? "" : "min-width:" + (typeof (n.minWidth) == "number" ? n.minWidth + "px; " : n.minWidth + "; ");
                t += !n.minHeight ? "" : "min-height:" + (typeof (n.minHeight) == "number" ? n.minHeight + "px; " : n.minHeight + "; ");
                t += "position:fixed; ";
                var s = '<div id="' + p + '" ' + m + ' style="' + t + '" data-type="text">' + r + "</div>";
                layer.container.append(s);
                var o = layer.container.children("#" + p);
                layer.popup[p] = o;
                layer.watch.call(p, n);
                layer.watch.setAlign(p, layer.watch.alignData[p]);
                if (n.closeButtonId != "") {
                    layer.setCloseButton(p, n.closeButtonId)
                }
                return
            },
            setCloseButton: function(m, p) {
                var o = "#" + m + " #" + p;
                var n = a(o).click(function(q) {
                    layer.close(a(this).data("layerID"))
                }).data("layerID", m)
            },
            buildBg: function(q, n) {
                var p;
                var o = "filter: alpha(opacity=" + (n.backgroundOpacity * 100) + "); -khtml-opacity:" + n.backgroundOpacity + "; -moz-opacity:" + n.backgroundOpacity + "; opacity:" + n.backgroundOpacity + "; ";
                o += "width:100%; height: 100%; position:fixed; left:0; top:0;";
                var m = n.backgroundCss ? 'class="' + n.backgroundCss + '" ' : "";
                if (n.background) {
                    p = '<div id="' + q + 'Bg" style="background-color:' + n.backgroundColor + "; " + o + ' " ' + m + ">&nbsp;</div>"
                } else {
                    p = '<div id="' + q + 'Bg" style="display:none"></div>'
                }
                layer.container.append(p);
                layer.bg[q] = layer.container.children("div#" + q + "Bg:last");
                if (n.backgroundClose) {
                    layer.bg[q].click(function(r) {
                        layer.close(q)
                    })
                }
                return layer.bg[q]
            },
            link: function(p, n) {
                if (!layer.ready) {
                    layer.init()
                }
                if (layer.container.children("#" + n).size() == 0) {
                    return
                }
                var m = layer.container.children("#" + n);
                var o = m.attr("data-type");
                if (p.split("openType=layer").length == 1) {
                    if (p.split("?").length > 1) {
                        p += "&openType=layer"
                    } else {
                        p += "?openType=layer"
                    }
                }
                if (o == "ajax") {
                    a.loadHTML(p, function(q) {
                        m.html(q)
                    })
                } else {
                    if (o == "iframe") {
                        m.attr("src", p)
                    }
                }
            },
            body: {
                bodyStyle: null,
                htmlStyle: null,
                lockMode: false,
                start: function(m) {
                    layer.body.lockMode = false;
                    var n = m.bodyScroll.toLowerCase();
                    if (n == "normal" || !m.bodyScroll) {
                        return
                    }
                    if (n == "fix") {
                        layer.body.bodyStyle = a("body").attr("style");
                        layer.body.htmlStyle = a("html").attr("style");
                        a("html").css({
                            overflow: "hidden"
                        });
                        a("body").css({
                            overflow: "hidden"
                        });
                        layer.body.lockMode = true
                    }
                },
                end: function(m) {
                    if (!layer.body.lockMode) {
                        return
                    }
                    if (layer.body.bodyStyle) {
                        a("body").attr("style", layer.body.bodyStyle)
                    } else {
                        a("body").removeAttr("style")
                    }
                    if (layer.body.htmlStyle) {
                        a("html").attr("style", layer.body.htmlStyle)
                    } else {
                        a("html").removeAttr("style")
                    }
                    layer.body.bodyStyle = null;
                    layer.body.htmlStyle = null;
                    layer.body.lockMode = false
                }
            },
            watch: {
                alignData: {},
                listener: null,
                call: function(n, m) {
                    if (!layer.watch.listener) {
                        layer.watch.listener = setInterval(function() {
                            layer.watch.consAlign()
                        }, 1000 / 12);
                        a(window).bind("resize", layer.watch.consAlign)
                    }
                    layer.watch.alignData[n] = {
                        alignX: m.alignX,
                        alignY: m.alignY
                    };
                    layer.watch.setAlign(n, layer.watch.alignData[n]);
                    layer.body.start(m)
                },
                consAlign: function() {
                    if (layer.container.children("div").size() == 0) {
                        layer.watch.kill();
                        return
                    }
                    for (var m in layer.watch.alignData) {
                        if (layer.watch.alignData[m]) {
                            layer.watch.setAlign(m, layer.watch.alignData[m])
                        }
                    }
                },
                setAlign: function(u, q) {
                    if (!q.alignY && !q.alignX) {
                        return
                    }
                    var m = layer.popup[u];
                    var s = a(window).width()
                      , t = a(window).height()
                      , n = m.width()
                      , o = m.height()
                      , r = q.alignX
                      , p = q.alignY;
                    if (String(r).split("%").length > 1) {
                        r = Number(r.split("%").join("")) / 100
                    }
                    m.css("left", Math.round((s - n) * r));
                    if (String(p).split("%").length > 1) {
                        p = Number(p.split("%").join("")) / 100
                    }
                    p = (p && p == 0) ? p : 0.5;
                    m.css("top", Math.round(Math.max(0, (t - o) * p)))
                },
                kill: function() {
                    layer.watch.alignData = {};
                    clearInterval(layer.watch.listener);
                    a(window).unbind("resize", layer.watch.consAlign);
                    layer.watch.listener = null;
                    layer.body.end()
                }
            },
            close: function(m) {
                if (!layer.ready) {
                    layer.init()
                }
                try {
                    var q = a.documentParam("iframeName");
                    if (q) {
                        parent.layer.close(q)
                    } else {
                        if (!m) {
                            m = layer.targetID(a(this))
                        }
                        if (!m) {
                            return
                        }
                        var n = layer.container.children("#" + m);
                        var o = layer.container.children("#" + m + "Bg");
                        if (n.size() > 0) {
                            n.remove()
                        }
                        if (o.size() > 0) {
                            o.remove()
                        }
                    }
                } catch (p) {}
                if (a("._layer_content").size() == 0) {
                    layer.body.end()
                }
            },
            closeAll: function() {
                if (!layer.ready) {
                    layer.init()
                }
                try {
                    var n = a.documentParam("iframeName");
                    if (n) {
                        parent.layer.closeAll()
                    } else {
                        layer.container.html("");
                        layer.watch.kill()
                    }
                } catch (m) {}
                layer.body.end()
            },
            targetID: function(o) {
                var n = o
                  , p = null;
                while (!n) {
                    try {
                        if (n.hasClass("_layer_content")) {
                            p = n.attr("id");
                            break
                        } else {
                            n = n.parent()
                        }
                    } catch (m) {
                        break
                    }
                }
                if (!p) {
                    p = layer.container.children(":last").attr("id")
                }
                return p
            }
        };
        layer.text = layer.source;
        b = {
            mode: "cover",
            posX: "50%",
            posY: "50%",
            blankImgSrc: "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAAC0lEQVQIW2NkAAIAAAoAAggA9GkAAAAASUVORK5CYII=",
            init: function() {
                b.handler();
                h.autofitHandler = b.handler;
                a.addAutoFit = function() {
                    h.autofitHandler()
                }
            },
            handler: function() {
                a("img.autofit, img[data-autofit], img[data-autofit-mode], img[data-autofit-position]").each(function() {
                    var m = a(this);
                    b.modifyAutofitImage(m)
                })
            },
            modifyAutofitImage: function(m) {
                if (m.attr("src") == b.blankImgSrc) {
                    return
                }
                m.data("src", m.attr("src"));
                m.attr("data-src", m.attr("src"));
                m.attr("src", b.blankImgSrc);
                var p = m.width();
                var o = m.height();
                b.getData(m);
                var n = "50% 50%";
                var q = "";
                if (a("html:first").hasClass("lt-ie9")) {
                    if (m.data("scaleMode") == "100% 100%") {
                        q += "filter: progid:DXImageTransform.Microsoft.AlphaImageLoader(src='" + m.attr("data-src") + "',sizingMethod='crop');";
                        q += "-ms-filter: progid:DXImageTransform.Microsoft.AlphaImageLoader(src='" + m.attr("data-src") + "',sizingMethod='crop');"
                    } else {
                        if (m.data("scaleMode") == "auto") {} else {
                            q += "behavior:url('../css/common/backgroundsize.min.htc'); ";
                            q += "-ms-behavior:url('../css/common/backgroundsize.min.htc'); "
                        }
                    }
                }
                q += "background-repeat:no-repeat; ";
                q += "background-image:url(" + m.attr("data-src") + "); ";
                q += "background-position:" + m.data("posX") + " " + m.data("posY") + "; ";
                q += "-webkit-background-size:" + m.data("scaleMode") + "; ";
                q += "-moz-background-size:" + m.data("scaleMode") + "; ";
                q += "-ms-background-size:" + m.data("scaleMode") + "; ";
                q += "-o-background-size:" + m.data("scaleMode") + "; ";
                q += "background-size:" + m.data("scaleMode") + "; ";
                m.attr("style", q)
            },
            getData: function(m) {
                var p = m.attr("data-autofit");
                m.data("scaleMode", b.mode).data("posX", b.posX).data("posY", b.posY);
                if (p) {
                    while (p.split("  ").length > 1) {
                        p = p.split("  ").join(" ")
                    }
                    var r = p.split(" ");
                    if (r[0]) {
                        m.data("scaleMode", r[0])
                    }
                    if (r[1]) {
                        m.data("posX", r[1])
                    }
                    if (r[2]) {
                        m.data("posY", r[2])
                    }
                }
                b.classScaleMode(m);
                var o = m.attr("data-autofit-mode");
                if (o) {
                    m.data("scaleMode", o)
                }
                if (m.data("scaleMode") == "noborder") {
                    m.data("scaleMode", "cover")
                } else {
                    if (m.data("scaleMode") == "noscale") {
                        m.data("scaleMode", "auto")
                    } else {
                        if (m.data("scaleMode") == "showall") {
                            m.data("scaleMode", "contain")
                        } else {
                            if (m.data("scaleMode") == "exactfit") {
                                m.data("scaleMode", "100% 100%")
                            }
                        }
                    }
                }
                var s = m.attr("data-autofit-position");
                if (s) {
                    while (s.split("  ").length > 1) {
                        s = s.split("  ").join(" ")
                    }
                    var t = s.split(" ");
                    if (t[0]) {
                        m.data("posX", t[0])
                    }
                    if (t[1]) {
                        m.data("posY", t[1])
                    } else {
                        m.data("posY", t[0])
                    }
                }
                var q = m.attr("data-autofit-position-x");
                if (q) {
                    m.data("posX", q)
                }
                var n = m.attr("data-autofit-position-y");
                if (n) {
                    m.data("posX", n)
                }
            },
            classScaleMode: function(m) {
                if (m.hasClass("cover") || m.hasClass("noborder")) {
                    m.data("scaleMode", "cover")
                }
                if (m.hasClass("auto") || m.hasClass("noscale")) {
                    m.data("scaleMode", "auto")
                }
                if (m.hasClass("contain") || m.hasClass("showall")) {
                    m.data("scaleMode", "contain")
                }
                if (m.hasClass("max") || m.hasClass("exactfit")) {
                    m.data("scaleMode", "100% 100%")
                }
            }
        };
        l();
        return h
    }
})(jQuery);