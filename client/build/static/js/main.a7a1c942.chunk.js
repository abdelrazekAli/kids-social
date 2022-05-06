(this["webpackJsonpreact-social"] =
  this["webpackJsonpreact-social"] || []).push([
  [0],
  {
    130: function (e, t, s) {},
    138: function (e, t, s) {},
    139: function (e, t, s) {},
    141: function (e, t, s) {},
    142: function (e, t, s) {},
    143: function (e, t, s) {},
    144: function (e, t, s) {},
    145: function (e, t, s) {},
    146: function (e, t, s) {},
    147: function (e, t, s) {},
    151: function (e, t, s) {},
    152: function (e, t, s) {},
    174: function (e, t) {},
    176: function (e, t) {},
    185: function (e, t, s) {},
    186: function (e, t, s) {},
    187: function (e, t, s) {},
    188: function (e, t, s) {},
    189: function (e, t, s) {},
    190: function (e, t, s) {},
    191: function (e, t, s) {},
    192: function (e, t, s) {},
    193: function (e, t, s) {},
    194: function (e, t, s) {},
    195: function (e, t, s) {},
    196: function (e, t, s) {},
    197: function (e, t, s) {},
    198: function (e, t, s) {},
    199: function (e, t, s) {},
    200: function (e, t, s) {
      "use strict";
      s.r(t);
      var c = s(1),
        n = s.n(c),
        a = s(44),
        r = s.n(a),
        i = s(3),
        o = s.n(i),
        l = s(68),
        d = s(6),
        u = s(4),
        j = function (e, t) {
          switch (t.type) {
            case "LOGIN_START":
              return { user: null, isFetching: !0, error: !1 };
            case "LOGIN_SUCCESS":
              return { user: t.payload, isFetching: !1, error: !1 };
            case "LOGIN_FAILURE":
              return { user: null, isFetching: !1, error: !0 };
            case "LOGOUT":
              return { user: null, isFetching: !1, error: !1 };
            default:
              return e;
          }
        },
        b = s(7),
        h = s.n(b),
        m = s(90),
        p = s(0),
        O = {
          user: JSON.parse(localStorage.getItem("user")) || null,
          isFetching: !1,
          error: !1,
        },
        x = Object(c.createContext)(O),
        f = function (e) {
          var t = e.children,
            s = Object(c.useReducer)(j, O),
            n = Object(u.a)(s, 2),
            a = n[0],
            r = n[1];
          return (
            Object(c.useEffect)(
              function () {
                localStorage.setItem("user", JSON.stringify(a.user));
              },
              [a.user]
            ),
            Object(p.jsx)(x.Provider, {
              value: {
                user: a.user,
                isFetching: a.isFetching,
                error: a.error,
                dispatch: r,
              },
              children: t,
            })
          );
        },
        g = O.user,
        v = (function () {
          var e = Object(d.a)(
            o.a.mark(function e() {
              var t;
              return o.a.wrap(
                function (e) {
                  for (;;)
                    switch ((e.prev = e.next)) {
                      case 0:
                        return (
                          (e.prev = 0),
                          (e.next = 3),
                          h.a.post("/api/v1/auth/refresh-token", {
                            token: g.refreshToken,
                          })
                        );
                      case 3:
                        return (
                          (t = e.sent),
                          localStorage.setItem(
                            "user",
                            JSON.stringify(
                              Object(l.a)(
                                Object(l.a)({}, g),
                                {},
                                { accessToken: t.data.accessToken }
                              )
                            )
                          ),
                          e.abrupt("return", t.data)
                        );
                      case 8:
                        (e.prev = 8), (e.t0 = e.catch(0)), console.log(e.t0);
                      case 11:
                      case "end":
                        return e.stop();
                    }
                },
                e,
                null,
                [[0, 8]]
              );
            })
          );
          return function () {
            return e.apply(this, arguments);
          };
        })(),
        N = h.a.create();
      if (g) {
        var y = Object(m.a)(g.accessToken);
        N.interceptors.request.use(
          (function () {
            var e = Object(d.a)(
              o.a.mark(function e(t) {
                var s, c;
                return o.a.wrap(function (e) {
                  for (;;)
                    switch ((e.prev = e.next)) {
                      case 0:
                        if (((s = new Date()), !(1e3 * y.exp < s.getTime()))) {
                          e.next = 6;
                          break;
                        }
                        return (e.next = 4), v();
                      case 4:
                        (c = e.sent), (t.headers["auth-token"] = c.accessToken);
                      case 6:
                        return e.abrupt("return", t);
                      case 7:
                      case "end":
                        return e.stop();
                    }
                }, e);
              })
            );
            return function (t) {
              return e.apply(this, arguments);
            };
          })(),
          function (e) {
            return Promise.reject(e);
          }
        );
      }
      var w = s(5),
        k = s(9);
      s(130);
      function I() {
        return Object(p.jsx)("div", {
          className: "topbarContainer",
          children: Object(p.jsx)("div", {
            children: Object(p.jsx)(w.b, {
              to: "/",
              children: Object(p.jsx)("span", {
                className: "logo",
                children: "Kids Social",
              }),
            }),
          }),
        });
      }
      s(138), s(139);
      function _(e) {
        var t = e.user,
          s = t.img;
        return Object(p.jsx)(w.b, {
          to: "/profile/".concat(null === t || void 0 === t ? void 0 : t._id),
          children: Object(p.jsxs)("li", {
            className: "rightbarFriend",
            children: [
              Object(p.jsx)("div", {
                className: "rightbarProfileImgContainer",
                children: Object(p.jsx)("img", {
                  className: "rightbarProfileImg",
                  src: s
                    ? "".concat("http://localhost:8800/images/").concat(s)
                    : "/assets/images/noAvatar.png",
                  alt: "userImg",
                }),
              }),
              Object(p.jsx)("span", {
                className: "rightbarUsername",
                children: null === t || void 0 === t ? void 0 : t.username,
              }),
            ],
          }),
        });
      }
      var C = s(220),
        S = s(221),
        T = s(96),
        L = s.n(T),
        E = s(97),
        F = s.n(E),
        P = s(215),
        R = s(216),
        D = s(217),
        A = s(218),
        q = s(219);
      function U() {
        var e = Object(c.useRef)(null),
          t = Object(c.useRef)(null),
          s = Object(c.useContext)(x),
          n = s.user,
          a = s.dispatch,
          r = Object(c.useState)(!1),
          i = Object(u.a)(r, 2),
          l = i[0],
          j = i[1],
          b = Object(c.useState)(!0),
          m = Object(u.a)(b, 2),
          O = m[0],
          f = m[1],
          g = Object(c.useState)([]),
          v = Object(u.a)(g, 2),
          N = v[0],
          y = v[1],
          k = (function () {
            var e = Object(d.a)(
              o.a.mark(function e(t) {
                var s;
                return o.a.wrap(
                  function (e) {
                    for (;;)
                      switch ((e.prev = e.next)) {
                        case 0:
                          if (((e.prev = 0), !(t.length > 0))) {
                            e.next = 8;
                            break;
                          }
                          return (
                            (e.next = 4),
                            h.a.get("/api/v1/users?search=".concat(t))
                          );
                        case 4:
                          (s = e.sent), y(s.data), (e.next = 9);
                          break;
                        case 8:
                          y([]);
                        case 9:
                          e.next = 14;
                          break;
                        case 11:
                          (e.prev = 11), (e.t0 = e.catch(0)), console.log(e.t0);
                        case 14:
                        case "end":
                          return e.stop();
                      }
                  },
                  e,
                  null,
                  [[0, 11]]
                );
              })
            );
            return function (t) {
              return e.apply(this, arguments);
            };
          })(),
          I = (function () {
            var e = Object(d.a)(
              o.a.mark(function e() {
                return o.a.wrap(
                  function (e) {
                    for (;;)
                      switch ((e.prev = e.next)) {
                        case 0:
                          return (
                            (e.prev = 0),
                            (e.next = 3),
                            h.a.post("/api/v1/auth/logout", {
                              token: n.refreshToken,
                            })
                          );
                        case 3:
                          e.sent &&
                            (a({ type: "LOGOUT" }),
                            window.location.replace("/")),
                            (e.next = 10);
                          break;
                        case 7:
                          (e.prev = 7),
                            (e.t0 = e.catch(0)),
                            window.location.replace("/");
                        case 10:
                        case "end":
                          return e.stop();
                      }
                  },
                  e,
                  null,
                  [[0, 7]]
                );
              })
            );
            return function () {
              return e.apply(this, arguments);
            };
          })();
        return (
          (window.onclick = function (t) {
            t.target === e.current && f(!O);
          }),
          Object(p.jsxs)("div", {
            children: [
              Object(p.jsxs)("button", {
                className: "toggle-button",
                onClick: function () {
                  j(!l),
                    document
                      .getElementById("root")
                      .classList.toggle("hide-root");
                },
                children: [
                  Object(p.jsx)("div", { className: "toggle-button-line" }),
                  Object(p.jsx)("div", { className: "toggle-button-line" }),
                  Object(p.jsx)("div", { className: "toggle-button-line" }),
                ],
              }),
              Object(p.jsx)("div", {
                className: l ? "sidebar d-block" : "sidebar",
                children: Object(p.jsxs)("div", {
                  className: "sidebarWrapper",
                  children: [
                    Object(p.jsxs)("ul", {
                      className: "sidebarList",
                      children: [
                        Object(p.jsx)(w.c, {
                          to: "/",
                          exact: !0,
                          children: Object(p.jsxs)("li", {
                            className: "sidebarListItem",
                            children: [
                              Object(p.jsx)(P.a, { className: "sidebarIcon " }),
                              Object(p.jsx)("span", {
                                className: "sidebarListItemText",
                                children: "Home",
                              }),
                            ],
                          }),
                        }),
                        Object(p.jsx)(w.c, {
                          to: "/learning",
                          exact: !0,
                          children: Object(p.jsxs)("li", {
                            className: "sidebarListItem",
                            children: [
                              Object(p.jsx)(R.a, { className: "sidebarIcon " }),
                              Object(p.jsx)("span", {
                                className: "sidebarListItemText",
                                children: "Learning",
                              }),
                            ],
                          }),
                        }),
                        Object(p.jsx)(w.c, {
                          to: "/profile/".concat(n._id),
                          children: Object(p.jsxs)("li", {
                            className: "sidebarListItem",
                            children: [
                              Object(p.jsx)(D.a, { className: "sidebarIcon" }),
                              Object(p.jsx)("span", {
                                className: "sidebarListItemText",
                                children: "Profile",
                              }),
                            ],
                          }),
                        }),
                        Object(p.jsx)(w.c, {
                          to: "/requests",
                          children: Object(p.jsxs)("li", {
                            className: "sidebarListItem",
                            children: [
                              Object(p.jsx)(A.a, { className: "sidebarIcon" }),
                              Object(p.jsx)("span", {
                                className: "sidebarListItemText",
                                children: "Requests",
                              }),
                            ],
                          }),
                        }),
                        Object(p.jsx)(w.c, {
                          to: "/chats",
                          children: Object(p.jsxs)("li", {
                            className: "sidebarListItem",
                            children: [
                              Object(p.jsx)(q.a, { className: "sidebarIcon" }),
                              Object(p.jsx)("span", {
                                className: "sidebarListItemText",
                                children: "Chats",
                              }),
                            ],
                          }),
                        }),
                        Object(p.jsx)(w.c, {
                          to: "/settings",
                          children: Object(p.jsxs)("li", {
                            className: "sidebarListItem",
                            children: [
                              Object(p.jsx)(C.a, { className: "sidebarIcon" }),
                              Object(p.jsx)("span", {
                                className: "sidebarListItemText",
                                children: "Settings",
                              }),
                            ],
                          }),
                        }),
                        Object(p.jsxs)("li", {
                          className: "sidebarListItem",
                          onClick: function () {
                            f(!O);
                          },
                          children: [
                            Object(p.jsx)(L.a, { className: "sidebarIcon" }),
                            Object(p.jsx)("span", {
                              className: "sidebarListItemText",
                              children: "Invite Friend",
                            }),
                          ],
                        }),
                        Object(p.jsxs)("li", {
                          className: "sidebarListItem",
                          onClick: I,
                          children: [
                            Object(p.jsx)(F.a, { className: "sidebarIcon" }),
                            Object(p.jsx)("span", {
                              className: "sidebarListItemText",
                              children: "Logout",
                            }),
                          ],
                        }),
                      ],
                    }),
                    Object(p.jsx)("hr", { className: "sidebarHr" }),
                    Object(p.jsxs)("div", {
                      className: "topbarCenter",
                      children: [
                        Object(p.jsxs)("div", {
                          className: "searchbar",
                          children: [
                            Object(p.jsx)(S.a, {}),
                            Object(p.jsx)("input", {
                              placeholder: "Search for relatives",
                              onKeyUp: function (e) {
                                return k(e.target.value);
                              },
                              className: "searchInput",
                            }),
                          ],
                        }),
                        Object(p.jsx)("div", {
                          className: "mt-1",
                          children:
                            N.length > 0 &&
                            N.map(function (e) {
                              return Object(p.jsx)(_, { user: e }, e._id);
                            }),
                        }),
                      ],
                    }),
                  ],
                }),
              }),
              !O &&
                Object(p.jsx)("modal", {
                  children: Object(p.jsx)("div", {
                    ref: e,
                    id: "myModal",
                    className: "modal",
                    children: Object(p.jsxs)("div", {
                      className: "modal-content p-relative",
                      children: [
                        Object(p.jsx)("span", {
                          ref: t,
                          onClick: function () {
                            return f(!0);
                          },
                          className: "modal-close",
                          children: "\xd7",
                        }),
                        Object(p.jsx)("h3", {
                          children: "Invite Your Friends",
                        }),
                        Object(p.jsxs)("form", {
                          className: "invite-form",
                          children: [
                            Object(p.jsx)("input", {
                              className: "invite-input",
                              placeholder: "Email Address",
                              type: "email",
                            }),
                            Object(p.jsx)("input", {
                              className: "invite-input button",
                              type: "submit",
                              value: "Invite",
                            }),
                          ],
                        }),
                      ],
                    }),
                  }),
                }),
            ],
          })
        );
      }
      s(141), s(142);
      function W(e) {
        var t = e.post,
          s = "http://localhost:8800/images/",
          n = t.img,
          a = t.userId.img,
          r = Object(c.useContext)(x).user,
          i = Object(c.useState)(!1),
          l = Object(u.a)(i, 2),
          j = l[0],
          b = l[1],
          h = Object(c.useState)(t.likes.length),
          m = Object(u.a)(h, 2),
          O = m[0],
          f = m[1],
          g = (function () {
            var e = Object(d.a)(
              o.a.mark(function e() {
                return o.a.wrap(function (e) {
                  for (;;)
                    switch ((e.prev = e.next)) {
                      case 0:
                        return (
                          f(j ? O - 1 : O + 1),
                          b(!j),
                          (e.next = 4),
                          N({
                            method: "put",
                            url: "/api/v1/posts/".concat(t._id, "/like"),
                            headers: { "auth-token": r.accessToken },
                          })
                        );
                      case 4:
                      case "end":
                        return e.stop();
                    }
                }, e);
              })
            );
            return function () {
              return e.apply(this, arguments);
            };
          })();
        return Object(p.jsx)("div", {
          className: "post",
          children: Object(p.jsxs)("div", {
            className: "postWrapper",
            children: [
              Object(p.jsx)("div", {
                className: "postTop",
                children: Object(p.jsxs)("div", {
                  className: "postTopLeft",
                  children: [
                    Object(p.jsx)(w.b, {
                      to: "/profile/".concat(t.userId._id),
                      children: Object(p.jsx)("img", {
                        className: "postProfileImg",
                        src: a
                          ? "".concat(s).concat(a)
                          : "/assets/images/noAvatar.png",
                        alt: "userImg",
                      }),
                    }),
                    Object(p.jsxs)("div", {
                      children: [
                        Object(p.jsx)(w.b, {
                          to: "/profile/".concat(t.userId._id),
                          children: Object(p.jsx)("span", {
                            className: "postUsername",
                            children: t.userId.username,
                          }),
                        }),
                        Object(p.jsx)("span", {
                          className: "postDate",
                          children: new Date(t.createdAt).toLocaleString(),
                        }),
                      ],
                    }),
                  ],
                }),
              }),
              Object(p.jsx)(w.b, {
                to: {
                  pathname: "/posts/".concat(t._id),
                  state: { isLiked: j },
                },
                children: Object(p.jsxs)("div", {
                  className: "postCenter",
                  children: [
                    Object(p.jsx)("span", {
                      className: "postText",
                      children: t.desc,
                    }),
                    n &&
                      Object(p.jsx)("img", {
                        className: "postImg",
                        src: "".concat(s).concat(n),
                        alt: "postImg",
                      }),
                  ],
                }),
              }),
              Object(p.jsxs)("div", {
                className: "postBottom",
                children: [
                  Object(p.jsxs)("div", {
                    className: "postBottomLeft",
                    onClick: g,
                    children: [
                      Object(p.jsx)("img", {
                        className: "likeIcon",
                        src: "".concat(s, "like.png"),
                        alt: "",
                      }),
                      Object(p.jsx)("span", {
                        className: "postLikeCounter",
                        children: O,
                      }),
                    ],
                  }),
                  Object(p.jsx)(w.b, {
                    to: {
                      pathname: "/posts/".concat(t._id),
                      state: { isLiked: j },
                    },
                    children: Object(p.jsx)("div", {
                      className: "postBottomRight",
                      children: Object(p.jsx)("span", {
                        className: "postCommentText",
                        children: "Comments",
                      }),
                    }),
                  }),
                ],
              }),
            ],
          }),
        });
      }
      s(143);
      var B = s(224),
        z = s(222),
        G = s(223);
      function H() {
        var e = Object(c.useRef)(),
          t = Object(c.useContext)(x).user,
          s = Object(c.useState)(null),
          n = Object(u.a)(s, 2),
          a = n[0],
          r = n[1],
          i = Object(c.useState)(!1),
          l = Object(u.a)(i, 2),
          j = l[0],
          b = l[1],
          m = (function () {
            var s = Object(d.a)(
              o.a.mark(function s(c) {
                var n, r, i;
                return o.a.wrap(
                  function (s) {
                    for (;;)
                      switch ((s.prev = s.next)) {
                        case 0:
                          if (
                            (c.preventDefault(),
                            (n = { userId: t._id, desc: e.current.value }),
                            !a && !n.desc)
                          ) {
                            s.next = 29;
                            break;
                          }
                          if ((b(!0), !a)) {
                            s.next = 19;
                            break;
                          }
                          return (
                            (r = new FormData()),
                            (i = "".concat(Date.now(), "_").concat(a.name)),
                            r.append("name", i),
                            r.append("file", a),
                            (n.img = i),
                            console.log(n),
                            (s.prev = 11),
                            (s.next = 14),
                            h.a.post("/api/v1/upload", r)
                          );
                        case 14:
                          s.next = 19;
                          break;
                        case 16:
                          (s.prev = 16),
                            (s.t0 = s.catch(11)),
                            console.log(s.t0);
                        case 19:
                          return (
                            (s.prev = 19),
                            (s.next = 22),
                            N.post("/api/v1/posts", n, {
                              headers: { "auth-token": t.accessToken },
                            })
                          );
                        case 22:
                          b(!1), window.location.reload(), (s.next = 29);
                          break;
                        case 26:
                          (s.prev = 26),
                            (s.t1 = s.catch(19)),
                            console.log(s.t1);
                        case 29:
                        case "end":
                          return s.stop();
                      }
                  },
                  s,
                  null,
                  [
                    [11, 16],
                    [19, 26],
                  ]
                );
              })
            );
            return function (e) {
              return s.apply(this, arguments);
            };
          })();
        return Object(p.jsxs)("div", {
          className: "share",
          children: [
            Object(p.jsxs)("div", {
              className: "shareWrapper",
              children: [
                Object(p.jsxs)("div", {
                  className: "shareTop",
                  children: [
                    Object(p.jsx)("img", {
                      className: "shareProfileImg",
                      src: "/assets/images/noAvatar.png",
                      alt: "",
                    }),
                    Object(p.jsx)("input", {
                      placeholder: "Write a post",
                      className: "shareInput",
                      ref: e,
                    }),
                  ],
                }),
                Object(p.jsx)("hr", { className: "shareHr" }),
                a &&
                  Object(p.jsxs)("div", {
                    className: "shareImgContainer",
                    children: [
                      Object(p.jsx)("img", {
                        className: "shareImg",
                        src: URL.createObjectURL(a),
                        alt: "",
                      }),
                      Object(p.jsx)(z.a, {
                        className: "shareCancelImg",
                        onClick: function () {
                          return r(null);
                        },
                      }),
                    ],
                  }),
                Object(p.jsxs)("form", {
                  className: "shareBottom",
                  onSubmit: m,
                  children: [
                    Object(p.jsx)("div", {
                      className: "shareOptions",
                      children: Object(p.jsxs)("label", {
                        htmlFor: "file",
                        className: "shareOption",
                        children: [
                          Object(p.jsx)(G.a, {
                            htmlColor: "#ec4747",
                            className: "shareIcon",
                          }),
                          Object(p.jsx)("span", {
                            className: "shareOptionText",
                            children: "Photo | Video",
                          }),
                          Object(p.jsx)("input", {
                            style: { display: "none" },
                            type: "file",
                            id: "file",
                            accept: ".png,.jpeg,.jpg",
                            onChange: function (e) {
                              return r(e.target.files[0]);
                            },
                          }),
                        ],
                      }),
                    }),
                    Object(p.jsx)("button", {
                      className: "shareButton",
                      type: "submit",
                      disabled: j,
                      children: "Post",
                    }),
                  ],
                }),
              ],
            }),
            j &&
              Object(p.jsx)("div", {
                className: "loading",
                children: Object(p.jsx)(B.a, {
                  color: "inherit",
                  size: "25px",
                }),
              }),
          ],
        });
      }
      function M(e) {
        var t = e.share,
          s = e.profile,
          n = Object(c.useState)([]),
          a = Object(u.a)(n, 2),
          r = a[0],
          i = a[1],
          l = Object(c.useContext)(x).user;
        return (
          Object(c.useEffect)(
            function () {
              (function () {
                var e = Object(d.a)(
                  o.a.mark(function e() {
                    var t;
                    return o.a.wrap(function (e) {
                      for (;;)
                        switch ((e.prev = e.next)) {
                          case 0:
                            if (!s) {
                              e.next = 6;
                              break;
                            }
                            return (
                              (e.next = 3),
                              h.a.get("/api/v1/posts/user/".concat(s))
                            );
                          case 3:
                            (t = e.sent), (e.next = 9);
                            break;
                          case 6:
                            return (
                              (e.next = 8),
                              h.a.get("/api/v1/posts/timeline/".concat(l._id))
                            );
                          case 8:
                            t = e.sent;
                          case 9:
                            i(t.data);
                          case 10:
                          case "end":
                            return e.stop();
                        }
                    }, e);
                  })
                );
                return function () {
                  return e.apply(this, arguments);
                };
              })()();
            },
            [l._id, s]
          ),
          Object(p.jsx)("div", {
            className: "feed",
            children: Object(p.jsxs)("div", {
              className: "feedWrapper",
              children: [
                t && Object(p.jsx)(H, {}),
                r.length > 0 &&
                  r.map(function (e) {
                    return Object(p.jsx)(W, { post: e }, e._id);
                  }),
              ],
            }),
          })
        );
      }
      s(144), s(145);
      function K(e) {
        var t = e.user,
          s = null === t || void 0 === t ? void 0 : t.img;
        return Object(p.jsx)(w.b, {
          to: "/profile/".concat(null === t || void 0 === t ? void 0 : t._id),
          children: Object(p.jsxs)("li", {
            className: "rightbarFriend",
            children: [
              Object(p.jsxs)("div", {
                className: "rightbarProfileImgContainer",
                children: [
                  Object(p.jsx)("img", {
                    className: "rightbarProfileImg",
                    src: s
                      ? "".concat("http://localhost:8800/images/").concat(s)
                      : "/assets/images/noAvatar.png",
                    alt: "userImg",
                  }),
                  Object(p.jsx)("div", {
                    className: "rightbarOnline",
                    title: "Online now",
                  }),
                ],
              }),
              Object(p.jsx)("span", {
                className: "rightbarUsername",
                children: null === t || void 0 === t ? void 0 : t.username,
              }),
            ],
          }),
        });
      }
      function J(e) {
        var t = e.user,
          s = e.home,
          n = e.online,
          a = e.hideImg,
          r = e.userFriends,
          i = e.onlineFriends,
          l = Object(c.useState)([]),
          j = Object(u.a)(l, 2),
          b = j[0],
          m = j[1],
          O = Object(c.useContext)(x).user;
        Object(c.useEffect)(
          function () {
            (function () {
              var e = Object(d.a)(
                o.a.mark(function e() {
                  var t;
                  return o.a.wrap(function (e) {
                    for (;;)
                      switch ((e.prev = e.next)) {
                        case 0:
                          return (
                            (e.next = 2),
                            h.a.get("/api/v1/users/friends/".concat(O._id))
                          );
                        case 2:
                          (t = e.sent), m(t.data);
                        case 4:
                        case "end":
                          return e.stop();
                      }
                  }, e);
                })
              );
              return function () {
                return e.apply(this, arguments);
              };
            })()();
          },
          [O._id]
        );
        var f =
            null === i || void 0 === i
              ? void 0
              : i.map(function (e) {
                  return b.find(function (t) {
                    return t._id === e.userId;
                  });
                }),
          g = function () {
            return Object(p.jsxs)(p.Fragment, {
              children: [
                !a &&
                  Object(p.jsx)("img", {
                    className: "rightbarAd",
                    src: "/assets/ad.jpg",
                    alt: "",
                  }),
                Object(p.jsx)("h4", {
                  className: "rightbarTitle",
                  children: "Friends",
                }),
                Object(p.jsx)("div", {
                  className: " rightbarFriendList",
                  children:
                    b.length > 0 &&
                    b.map(function (e) {
                      return Object(p.jsx)(_, { user: e }, e._id);
                    }),
                }),
              ],
            });
          },
          v = function () {
            return Object(p.jsxs)(p.Fragment, {
              children: [
                Object(p.jsx)("div", { className: "btn-container" }),
                (null === r || void 0 === r ? void 0 : r.length) > 0 &&
                  Object(p.jsxs)(p.Fragment, {
                    children: [
                      Object(p.jsx)("h4", {
                        className: "rightbarTitle",
                        children: "friends",
                      }),
                      Object(p.jsx)("div", {
                        className: "rightbarFollowings",
                        children: r.map(function (e) {
                          return Object(p.jsx)(_, { user: e }, e._id);
                        }),
                      }),
                    ],
                  }),
              ],
            });
          },
          N = function () {
            return Object(p.jsxs)(p.Fragment, {
              children: [
                Object(p.jsx)("div", { className: "btn-container" }),
                (null === f || void 0 === f ? void 0 : f.length) > 0
                  ? Object(p.jsxs)(p.Fragment, {
                      children: [
                        Object(p.jsx)("h4", {
                          className: "rightbarTitle",
                          children: "Online friends",
                        }),
                        Object(p.jsx)("div", {
                          className: "rightbarFollowings",
                          children:
                            null === f || void 0 === f
                              ? void 0
                              : f.map(function (e) {
                                  return Object(p.jsx)(
                                    K,
                                    { user: e },
                                    null === e || void 0 === e ? void 0 : e._id
                                  );
                                }),
                        }),
                      ],
                    })
                  : Object(p.jsx)("p", {
                      className: "no-online",
                      children: "There are no online friends",
                    }),
              ],
            });
          };
        return Object(p.jsx)("div", {
          className: "rightbar",
          children: Object(p.jsxs)("div", {
            className: "rightbarWrapper",
            children: [
              t && Object(p.jsx)(v, {}),
              s && Object(p.jsx)(g, {}),
              n && Object(p.jsx)(N, {}),
            ],
          }),
        });
      }
      s(146);
      function V() {
        return Object(p.jsxs)(p.Fragment, {
          children: [
            Object(p.jsx)(I, {}),
            Object(p.jsxs)("div", {
              className: "homeContainer",
              children: [
                Object(p.jsx)(U, {}),
                Object(p.jsx)(M, { share: !0 }),
                Object(p.jsx)(J, { home: !0 }),
              ],
            }),
          ],
        });
      }
      var Y = s(56),
        Q = (s(147), s(232)),
        X = s(61),
        Z = s(225),
        $ = s(227),
        ee = s(228),
        te = s(229),
        se = s(226),
        ce = (s(151), s(67));
      function ne(e) {
        var t = e.own,
          s = e.msg;
        return Object(p.jsx)(p.Fragment, {
          children: t
            ? Object(p.jsxs)("div", {
                className: "position-relative d-flex justify-content-end mb-4",
                children: [
                  Object(p.jsx)("div", {
                    className: "msg_cotainer_send",
                    children: s.content,
                  }),
                  Object(p.jsx)("span", {
                    className: "msg_time_send",
                    children: Object(ce.a)(s.createdAt),
                  }),
                ],
              })
            : Object(p.jsxs)("div", {
                className:
                  "position-relative d-flex justify-content-start mb-4",
                children: [
                  Object(p.jsx)("div", {
                    className: "msg_cotainer",
                    children: s.content,
                  }),
                  Object(p.jsx)("span", {
                    className: "msg_time",
                    children: Object(ce.a)(s.createdAt),
                  }),
                ],
              }),
        });
      }
      function ae() {
        var e = Object(c.useRef)(),
          t = Object(k.h)().friendId,
          s = Object(c.useContext)(x).user,
          n = Object(c.useState)(),
          a = Object(u.a)(n, 2),
          r = a[0],
          i = a[1],
          l = Object(c.useState)(!1),
          j = Object(u.a)(l, 2),
          b = j[0],
          m = j[1],
          O = Object(c.useState)([]),
          f = Object(u.a)(O, 2),
          g = f[0],
          v = f[1],
          N = Object(c.useRef)(),
          y = Object(c.useState)([]),
          _ = Object(u.a)(y, 2),
          C = _[0],
          S = _[1],
          T = Object(c.useState)(),
          L = Object(u.a)(T, 2),
          E = L[0],
          F = L[1],
          P = Object(c.useState)(0),
          R = Object(u.a)(P, 2),
          D = R[0],
          A = R[1],
          q = Object(c.useState)(null),
          W = Object(u.a)(q, 2),
          z = W[0],
          G = W[1],
          H = Object(c.useState)(Object(Q.a)()),
          M = Object(u.a)(H, 2),
          K = M[0],
          V = M[1],
          ce = Object(c.useState)(""),
          ae = Object(u.a)(ce, 2),
          re = ae[0],
          ie = ae[1],
          oe = Object(c.useState)(!1),
          le = Object(u.a)(oe, 2),
          de = le[0],
          ue = le[1];
        Object(c.useEffect)(
          function () {
            (function () {
              var e = Object(d.a)(
                o.a.mark(function e() {
                  var s;
                  return o.a.wrap(
                    function (e) {
                      for (;;)
                        switch ((e.prev = e.next)) {
                          case 0:
                            return (
                              (e.prev = 0),
                              (e.next = 3),
                              h.a.get("/api/v1/users/".concat(t))
                            );
                          case 3:
                            (s = e.sent), i(s.data), (e.next = 10);
                            break;
                          case 7:
                            (e.prev = 7),
                              (e.t0 = e.catch(0)),
                              console.log(e.t0);
                          case 10:
                          case "end":
                            return e.stop();
                        }
                    },
                    e,
                    null,
                    [[0, 7]]
                  );
                })
              );
              return function () {
                return e.apply(this, arguments);
              };
            })()();
          },
          [t]
        ),
          Object(c.useEffect)(
            function () {
              (function () {
                var e = Object(d.a)(
                  o.a.mark(function e() {
                    var c;
                    return o.a.wrap(
                      function (e) {
                        for (;;)
                          switch ((e.prev = e.next)) {
                            case 0:
                              return (
                                (e.prev = 0),
                                (e.next = 3),
                                h.a.get(
                                  "/api/v1/conversations/find/"
                                    .concat(t, "/")
                                    .concat(s._id)
                                )
                              );
                            case 3:
                              (c = e.sent), A(c.data), (e.next = 10);
                              break;
                            case 7:
                              (e.prev = 7),
                                (e.t0 = e.catch(0)),
                                console.log(e.t0);
                            case 10:
                            case "end":
                              return e.stop();
                          }
                      },
                      e,
                      null,
                      [[0, 7]]
                    );
                  })
                );
                return function () {
                  return e.apply(this, arguments);
                };
              })()();
            },
            [s, t]
          ),
          Object(c.useEffect)(
            function () {
              (function () {
                var e = Object(d.a)(
                  o.a.mark(function e() {
                    var t;
                    return o.a.wrap(
                      function (e) {
                        for (;;)
                          switch ((e.prev = e.next)) {
                            case 0:
                              return (
                                (e.prev = 0),
                                (e.next = 3),
                                h.a.get(
                                  "/api/v1/messages/".concat(
                                    null === D || void 0 === D ? void 0 : D._id
                                  )
                                )
                              );
                            case 3:
                              (t = e.sent), S(t.data), (e.next = 10);
                              break;
                            case 7:
                              (e.prev = 7),
                                (e.t0 = e.catch(0)),
                                console.log(e.t0);
                            case 10:
                            case "end":
                              return e.stop();
                          }
                      },
                      e,
                      null,
                      [[0, 7]]
                    );
                  })
                );
                return function () {
                  return e.apply(this, arguments);
                };
              })()();
            },
            [D]
          ),
          Object(c.useEffect)(function () {
            (e.current = Object(X.b)("ws://localhost:8900")),
              e.current.on("getMessage", function (e) {
                G({
                  sender: e.senderId,
                  content: e.text,
                  createdAt: Date.now(),
                });
              });
          }, []),
          Object(c.useEffect)(
            function () {
              z &&
                S(function (e) {
                  return [].concat(Object(Y.a)(e), [z]);
                });
            },
            [z]
          ),
          Object(c.useEffect)(function () {
            e.current.on("offering call", function (e) {
              console.log(e), ue(!0), ie(e.callType), V(e.callId);
            });
          }, []),
          Object(c.useEffect)(
            function () {
              e.current.emit("addUser", s._id),
                e.current.on("getUsers", function (e) {
                  v(
                    e.filter(function (e) {
                      return e.userId !== s._id;
                    })
                  );
                });
            },
            [s]
          );
        var je = (function () {
            var c = Object(d.a)(
              o.a.mark(function c(n) {
                var a, r;
                return o.a.wrap(
                  function (c) {
                    for (;;)
                      switch ((c.prev = c.next)) {
                        case 0:
                          if ((n.preventDefault(), m(!0), !E)) {
                            c.next = 17;
                            break;
                          }
                          return (
                            (a = {
                              sender: s._id,
                              content: E,
                              conversationId: D._id,
                            }),
                            e.current.emit("sendMessage", {
                              senderId: s._id,
                              receiverId: t,
                              text: E,
                            }),
                            (c.prev = 5),
                            (c.next = 8),
                            h.a.post("/api/v1/messages", a)
                          );
                        case 8:
                          (r = c.sent),
                            S([].concat(Object(Y.a)(C), [r.data])),
                            m(!1),
                            F(""),
                            (c.next = 17);
                          break;
                        case 14:
                          (c.prev = 14), (c.t0 = c.catch(5)), console.log(c.t0);
                        case 17:
                        case "end":
                          return c.stop();
                      }
                  },
                  c,
                  null,
                  [[5, 14]]
                );
              })
            );
            return function (e) {
              return c.apply(this, arguments);
            };
          })(),
          be = function (s) {
            e.current.emit("offering call", {
              friendId: t,
              callType: s,
              callId: K,
            });
          };
        return (
          Object(c.useEffect)(
            function () {
              N.current.scrollIntoView({
                behavior: "smooth",
                block: "nearest",
              });
            },
            [C]
          ),
          Object(p.jsxs)(p.Fragment, {
            children: [
              Object(p.jsx)(I, {}),
              Object(p.jsxs)("div", {
                className: "chatContainer",
                children: [
                  Object(p.jsx)(U, {}),
                  Object(p.jsx)("div", {
                    className: "container-fluid my-1",
                    children: Object(p.jsxs)("div", {
                      className: "row justify-content-center h-100",
                      children: [
                        b &&
                          Object(p.jsx)("div", {
                            className: "loading",
                            children: Object(p.jsx)(B.a, {
                              color: "inherit",
                              size: "20px",
                            }),
                          }),
                        Object(p.jsxs)("div", {
                          className: "col-md-8 col-xl-6 chat",
                          children: [
                            de &&
                              Object(p.jsx)("div", {
                                className: "caller",
                                children: Object(p.jsxs)("div", {
                                  className: "content",
                                  children: [
                                    Object(p.jsxs)("h4", {
                                      className: "text-center h4-fs",
                                      children: [r.username, " is calling..."],
                                    }),
                                    Object(p.jsxs)("div", {
                                      className: "call-btns",
                                      children: [
                                        Object(p.jsx)(Z.a, {
                                          variant: "contained",
                                          color: "secondary",
                                          className: "end-btn",
                                          onClick: function () {
                                            ue(!1),
                                              e.current.emit(
                                                "canceling call",
                                                s.username
                                              );
                                          },
                                          children: "Cancel",
                                        }),
                                        Object(p.jsx)(Z.a, {
                                          variant: "contained",
                                          className: "bg-green m-1",
                                          onClick: function () {
                                            var e;
                                            console.log(re),
                                              (e =
                                                "video" === re
                                                  ? "/room/video/".concat(K)
                                                  : "/room/voice/".concat(K));
                                            var t = window.open(
                                              e,
                                              "_blank",
                                              "noopener,noreferrer"
                                            );
                                            t && (t.opener = null),
                                              ue(!1),
                                              ie(""),
                                              V(Object(Q.a)());
                                          },
                                          children: "Answer",
                                        }),
                                      ],
                                    }),
                                  ],
                                }),
                              }),
                            Object(p.jsxs)("div", {
                              className: "card card-chat",
                              children: [
                                r &&
                                  Object(p.jsx)("div", {
                                    className: "card-header msg_head",
                                    children: Object(p.jsxs)("div", {
                                      className: "d-flex bd-highlight",
                                      children: [
                                        Object(p.jsx)("div", {
                                          className: "img_cont",
                                          children: Object(p.jsxs)(w.b, {
                                            to: "/profile/".concat(t),
                                            children: [
                                              Object(p.jsx)("img", {
                                                src: r.img
                                                  ? ""
                                                      .concat(
                                                        "http://localhost:8800/images/"
                                                      )
                                                      .concat(r.img)
                                                  : "/assets/images/noAvatar.png",
                                                className:
                                                  "rounded-circle user_img",
                                                alt: "",
                                              }),
                                              g.find(function (e) {
                                                return e.userId === t;
                                              }) &&
                                                Object(p.jsx)("div", {
                                                  className: "rightbarOnlineLg",
                                                  title: "Online now",
                                                }),
                                            ],
                                          }),
                                        }),
                                        Object(p.jsxs)("div", {
                                          className: "user_info",
                                          children: [
                                            Object(p.jsx)("span", {
                                              children: Object(p.jsx)(w.b, {
                                                to: "/profile/".concat(t),
                                                className: "pro-link",
                                                children: r.username,
                                              }),
                                            }),
                                            Object(p.jsx)("p", {
                                              children: "Private chat",
                                            }),
                                          ],
                                        }),
                                        Object(p.jsxs)("div", {
                                          className: "call-btns ml-1",
                                          children: [
                                            Object(p.jsx)(w.b, {
                                              to: "/room/voice/".concat(K),
                                              target: "_blank",
                                              children: Object(p.jsx)(se.a, {
                                                className: "color-blue f-start",
                                                title: "Start a Voice call",
                                                "aria-label": "call",
                                                onClick: function () {
                                                  be("voice");
                                                },
                                                children: Object(p.jsx)($.a, {
                                                  className: "color-blue fs-2",
                                                }),
                                              }),
                                            }),
                                            Object(p.jsx)(w.b, {
                                              to: "/room/video/".concat(K),
                                              target: "_blank",
                                              children: Object(p.jsx)(se.a, {
                                                className: "color-blue f-start",
                                                title: "Start a Video call",
                                                "aria-label": "call",
                                                onClick: function () {
                                                  be("video");
                                                },
                                                children: Object(p.jsx)(ee.a, {
                                                  className: "color-blue fs-2",
                                                }),
                                              }),
                                            }),
                                          ],
                                        }),
                                      ],
                                    }),
                                  }),
                                Object(p.jsxs)("div", {
                                  id: "message-container",
                                  className: "card-body msg_card_body",
                                  children: [
                                    C.map(function (e) {
                                      return Object(p.jsx)(
                                        ne,
                                        { msg: e, own: e.sender === s._id },
                                        e._id
                                      );
                                    }),
                                    Object(p.jsx)("div", { ref: N }),
                                  ],
                                }),
                                Object(p.jsx)("div", {
                                  className: "card-footer",
                                  children: Object(p.jsxs)("div", {
                                    className: "input-group",
                                    children: [
                                      Object(p.jsx)("textarea", {
                                        id: "message",
                                        name: "msg-input",
                                        className:
                                          "form-control type_msg textarea-bd",
                                        placeholder: "Write your message...",
                                        maxLength: "10000",
                                        value: E,
                                        onChange: function (e) {
                                          return F(e.target.value);
                                        },
                                        autoFocus: !0,
                                      }),
                                      Object(p.jsx)("button", {
                                        id: "sendBtn",
                                        className:
                                          "input-group-append  justify-content-end d-flex send-btn",
                                        disabled: b,
                                        onClick: function (e) {
                                          return je(e);
                                        },
                                        children: Object(p.jsx)("span", {
                                          className:
                                            "input-group-text send_btn bg-white color-main",
                                          children: Object(p.jsx)(te.a, {}),
                                        }),
                                      }),
                                    ],
                                  }),
                                }),
                              ],
                            }),
                          ],
                        }),
                      ],
                    }),
                  }),
                  Object(p.jsx)(J, {
                    hideImg: !0,
                    online: !0,
                    onlineFriends: g,
                  }),
                ],
              }),
            ],
          })
        );
      }
      s(152);
      var re = s(66),
        ie = s.n(re),
        oe =
          (s(185),
          function (e) {
            var t = e.peer,
              s = e.style,
              n = Object(c.useRef)();
            return (
              Object(c.useEffect)(
                function () {
                  t.on("stream", function (e) {
                    n.current.srcObject = e;
                  });
                },
                [t]
              ),
              Object(p.jsx)("video", {
                playsInline: !0,
                autoPlay: !0,
                ref: n,
                className: "h-40 w-50",
                style: s,
              })
            );
          }),
        le = { height: window.innerHeight / 2, width: window.innerWidth / 2 };
      function de() {
        var e = Object(c.useRef)(),
          t = Object(c.useRef)(),
          s = Object(c.useRef)([]),
          n = Object(k.h)(),
          a = n.type,
          r = n.roomID,
          i = Object(c.useState)([]),
          o = Object(u.a)(i, 2),
          l = o[0],
          d = o[1],
          j = Object(c.useState)(!1),
          b = Object(u.a)(j, 2),
          h = b[0],
          m = b[1],
          O = Object(c.useState)(!0),
          x = Object(u.a)(O, 2),
          f = x[0],
          g = x[1],
          v = Object(c.useState)(""),
          N = Object(u.a)(v, 2),
          y = N[0],
          w = N[1],
          _ = Object(c.useState)(!1),
          C = Object(u.a)(_, 2),
          S = C[0],
          T = C[1];
        return (
          Object(c.useEffect)(
            function () {
              (e.current = X.a.connect("ws://localhost:8900")),
                navigator.mediaDevices
                  .getUserMedia(
                    "video" === a ? { video: le, audio: !0 } : { audio: !0 }
                  )
                  .then(function (c) {
                    (t.current.srcObject = c),
                      e.current.emit("join room", r),
                      e.current.on("all users", function (t) {
                        var n = [];
                        t.forEach(function (t) {
                          var a = (function (t, s, c) {
                            var n = new ie.a({
                              initiator: !0,
                              trickle: !1,
                              stream: c,
                            });
                            return (
                              n.on("signal", function (c) {
                                e.current.emit("sending signal", {
                                  userToSignal: t,
                                  callerID: s,
                                  signal: c,
                                });
                              }),
                              n
                            );
                          })(t, e.current.id, c);
                          s.current.push({ peerID: t, peer: a }), n.push(a);
                        }),
                          d(n);
                      }),
                      e.current.on("user joined", function (t) {
                        g(!1), m(!0);
                        var n = (function (t, s, c) {
                          var n = new ie.a({
                            initiator: !1,
                            trickle: !1,
                            stream: c,
                          });
                          return (
                            n.on("signal", function (t) {
                              g(!1),
                                e.current.emit("returning signal", {
                                  signal: t,
                                  callerID: s,
                                });
                            }),
                            n.signal(t),
                            n
                          );
                        })(t.signal, t.callerID, c);
                        s.current.push({ peerID: t.callerID, peer: n }),
                          d(function (e) {
                            return [].concat(Object(Y.a)(e), [n]);
                          });
                      }),
                      e.current.on("receiving returned signal", function (e) {
                        g(!1),
                          s.current
                            .find(function (t) {
                              return t.peerID === e.id;
                            })
                            .peer.signal(e.signal);
                      });
                  });
            },
            [r, a]
          ),
          Object(c.useEffect)(function () {
            e.current.on("canceling call", function (e) {
              w(e), T(!0);
            });
          }, []),
          Object(p.jsxs)(p.Fragment, {
            children: [
              Object(p.jsx)(I, {}),
              Object(p.jsxs)("div", {
                className: "room-container",
                children: [
                  "video" === a
                    ? Object(p.jsx)("h4", { children: "Video Call" })
                    : Object(p.jsx)("h4", { children: "Voice Call" }),
                  S &&
                    Object(p.jsxs)("p", {
                      className: "alert-danger fs-25",
                      children: [y, " canceled the call"],
                    }),
                  h &&
                    Object(p.jsx)("p", {
                      className: "fs-25 color-main",
                      children: "Your friend joined",
                    }),
                  f &&
                    !S &&
                    Object(p.jsx)("p", {
                      className: "fs-25 color-main",
                      children: "Just wait until your friend join ...",
                    }),
                  l.map(function (e, t) {
                    return Object(p.jsx)(
                      oe,
                      {
                        peer: e,
                        style: "voice" === a ? { display: "none" } : null,
                      },
                      t
                    );
                  }),
                  "voice" === a &&
                    Object(p.jsx)("img", {
                      src: "/assets/signal.gif",
                      alt: "",
                    }),
                  Object(p.jsx)("div", {
                    className: "videos",
                    children: Object(p.jsx)("video", {
                      muted: !0,
                      ref: t,
                      autoPlay: !0,
                      playsInline: !0,
                      style: "voice" === a ? { display: "none" } : null,
                      className: "user-video",
                    }),
                  }),
                  Object(p.jsx)(Z.a, {
                    variant: "contained",
                    color: "secondary",
                    className: "end-btn mb-1",
                    onClick: function () {
                      return window.close();
                    },
                    children: "End Call",
                  }),
                ],
              }),
            ],
          })
        );
      }
      s(186), s(187);
      var ue = function (e) {
        var t = e.user;
        return Object(p.jsxs)("div", {
          className: "user-chat-card mb-2",
          children: [
            Object(p.jsx)("img", {
              src: t.profilePicture
                ? "http://localhost:8800/images/" + t.img
                : "/assets/images/noAvatar.png",
              alt: "user",
            }),
            Object(p.jsxs)("div", {
              className: "container",
              children: [
                Object(p.jsx)("h5", { children: t.username }),
                Object(p.jsx)(w.b, {
                  to: "/chat/".concat(t._id),
                  className: "btn btn-chat",
                  children: "Chat",
                }),
              ],
            }),
          ],
        });
      };
      function je() {
        var e = Object(c.useState)([]),
          t = Object(u.a)(e, 2),
          s = t[0],
          n = t[1],
          a = Object(c.useContext)(x).user;
        return (
          Object(c.useEffect)(
            function () {
              (function () {
                var e = Object(d.a)(
                  o.a.mark(function e() {
                    var t;
                    return o.a.wrap(function (e) {
                      for (;;)
                        switch ((e.prev = e.next)) {
                          case 0:
                            return (
                              (e.next = 2),
                              h.a.get("/api/v1/users/friends/".concat(a._id))
                            );
                          case 2:
                            (t = e.sent), n(t.data);
                          case 4:
                          case "end":
                            return e.stop();
                        }
                    }, e);
                  })
                );
                return function () {
                  return e.apply(this, arguments);
                };
              })()();
            },
            [a._id]
          ),
          Object(p.jsxs)(p.Fragment, {
            children: [
              Object(p.jsx)(I, {}),
              Object(p.jsxs)("div", {
                className: "chatsContainer",
                children: [
                  Object(p.jsx)(U, {}),
                  Object(p.jsxs)("div", {
                    className: "chats",
                    children: [
                      Object(p.jsxs)("div", {
                        className: "chatsHeader",
                        children: [
                          Object(p.jsx)("p", {
                            className: "mb-1",
                            children: "Get in Touch ",
                          }),
                          Object(p.jsx)("p", {
                            children: " Start Chat Your Friends",
                          }),
                        ],
                      }),
                      Object(p.jsx)("div", {
                        className: "users",
                        children:
                          s.length > 0 &&
                          s.map(function (e) {
                            return Object(p.jsx)(ue, { user: e }, e._id);
                          }),
                      }),
                    ],
                  }),
                ],
              }),
            ],
          })
        );
      }
      s(188), s(189);
      function be(e) {
        var t = e.msg;
        return Object(p.jsx)(p.Fragment, {
          children: Object(p.jsx)("div", {
            className: "alert-danger",
            children: Object(p.jsx)("p", { children: t }),
          }),
        });
      }
      function he() {
        var e = Object(c.useRef)(),
          t = Object(c.useRef)(),
          s = Object(c.useState)(""),
          n = Object(u.a)(s, 2),
          a = n[0],
          r = n[1],
          i = Object(c.useContext)(x),
          l = i.isFetching,
          j = i.dispatch,
          b = i.error,
          m = (function () {
            var s = Object(d.a)(
              o.a.mark(function s(c) {
                var n;
                return o.a.wrap(
                  function (s) {
                    for (;;)
                      switch ((s.prev = s.next)) {
                        case 0:
                          return (
                            c.preventDefault(),
                            j({ type: "LOGIN_START" }),
                            (s.prev = 2),
                            (s.next = 5),
                            h.a.post("/api/v1/auth/login", {
                              email: e.current.value,
                              password: t.current.value,
                            })
                          );
                        case 5:
                          (n = s.sent),
                            j({ type: "LOGIN_SUCCESS", payload: n.data }),
                            window.location.replace("/"),
                            (s.next = 14);
                          break;
                        case 10:
                          (s.prev = 10),
                            (s.t0 = s.catch(2)),
                            j({ type: "LOGIN_FAILURE" }),
                            500 === s.t0.response.status
                              ? r("Somthing went wrong!")
                              : r("Invalid email or password");
                        case 14:
                        case "end":
                          return s.stop();
                      }
                  },
                  s,
                  null,
                  [[2, 10]]
                );
              })
            );
            return function (e) {
              return s.apply(this, arguments);
            };
          })();
        return (
          (document.body.style.backgroundColor = "#0080ff"),
          Object(p.jsx)("div", {
            className: "login-page",
            children: Object(p.jsxs)("div", {
              className: "login-container",
              children: [
                Object(p.jsx)("div", {
                  className: "login-icon",
                  children: "Kids Social",
                }),
                Object(p.jsxs)("div", {
                  className: "login-form",
                  children: [
                    Object(p.jsx)("div", {
                      className: "login-title",
                      children: "Log In",
                    }),
                    Object(p.jsxs)("form", {
                      onSubmit: m,
                      children: [
                        Object(p.jsx)("input", {
                          className: "login-input",
                          placeholder: "Email Address",
                          type: "email",
                          required: !0,
                          ref: e,
                        }),
                        Object(p.jsx)("input", {
                          className: "login-input",
                          placeholder: "Password",
                          type: "password",
                          minLength: "6",
                          required: !0,
                          ref: t,
                        }),
                        Object(p.jsx)("button", {
                          className: "login-input button",
                          type: "submit",
                          disabled: l,
                          children: l
                            ? Object(p.jsx)(B.a, {
                                color: "#fff",
                                size: "20px",
                              })
                            : "Log In",
                        }),
                        b && Object(p.jsx)(be, { msg: a }),
                      ],
                    }),
                  ],
                }),
                Object(p.jsxs)("div", {
                  className: "login-signup",
                  children: [
                    "Don't have an account?",
                    Object(p.jsx)(w.b, {
                      to: "/register",
                      children: "Sign Up",
                    }),
                  ],
                }),
              ],
            }),
          })
        );
      }
      s(190);
      function me() {
        var e = Object(k.h)().userId,
          t = Object(c.useContext)(x).user,
          s = Object(c.useState)(),
          n = Object(u.a)(s, 2),
          a = n[0],
          r = n[1],
          i = Object(c.useState)(),
          l = Object(u.a)(i, 2),
          j = l[0],
          b = l[1],
          m = Object(c.useState)(!1),
          O = Object(u.a)(m, 2),
          f = O[0],
          g = O[1],
          v = null === j || void 0 === j ? void 0 : j.img;
        Object(c.useEffect)(
          function () {
            (function () {
              var s = Object(d.a)(
                o.a.mark(function s() {
                  var c, n;
                  return o.a.wrap(
                    function (s) {
                      for (;;)
                        switch ((s.prev = s.next)) {
                          case 0:
                            return (
                              (s.prev = 0),
                              (s.next = 3),
                              h.a.get("/api/v1/users/".concat(e))
                            );
                          case 3:
                            return (
                              (c = s.sent),
                              b(c.data),
                              (s.next = 7),
                              h.a.get("/api/v1/users/".concat(t._id))
                            );
                          case 7:
                            (n = s.sent), r(n.data), (s.next = 14);
                            break;
                          case 11:
                            (s.prev = 11),
                              (s.t0 = s.catch(0)),
                              console.log(s.t0);
                          case 14:
                          case "end":
                            return s.stop();
                        }
                    },
                    s,
                    null,
                    [[0, 11]]
                  );
                })
              );
              return function () {
                return s.apply(this, arguments);
              };
            })()();
          },
          [e, t._id]
        );
        var y = (function () {
            var e = Object(d.a)(
              o.a.mark(function e() {
                return o.a.wrap(function (e) {
                  for (;;)
                    switch ((e.prev = e.next)) {
                      case 0:
                        return (
                          g(!0),
                          (e.next = 3),
                          N({
                            method: "put",
                            url: "/api/v1/users/".concat(j._id, "/accept"),
                            headers: { "auth-token": t.accessToken },
                          })
                        );
                      case 3:
                        g(!1), window.location.reload();
                      case 5:
                      case "end":
                        return e.stop();
                    }
                }, e);
              })
            );
            return function () {
              return e.apply(this, arguments);
            };
          })(),
          _ = (function () {
            var e = Object(d.a)(
              o.a.mark(function e() {
                return o.a.wrap(function (e) {
                  for (;;)
                    switch ((e.prev = e.next)) {
                      case 0:
                        return (
                          g(!0),
                          (e.next = 3),
                          N({
                            method: "put",
                            url: "/api/v1/users/".concat(j._id, "/add"),
                            headers: { "auth-token": t.accessToken },
                          })
                        );
                      case 3:
                        g(!1), window.location.reload();
                      case 5:
                      case "end":
                        return e.stop();
                    }
                }, e);
              })
            );
            return function () {
              return e.apply(this, arguments);
            };
          })(),
          C = (function () {
            var e = Object(d.a)(
              o.a.mark(function e() {
                return o.a.wrap(function (e) {
                  for (;;)
                    switch ((e.prev = e.next)) {
                      case 0:
                        return (
                          g(!0),
                          (e.next = 3),
                          N({
                            method: "delete",
                            url: "/api/v1/users/".concat(j._id, "/cancel"),
                            headers: { "auth-token": t.accessToken },
                          })
                        );
                      case 3:
                        g(!1), window.location.reload();
                      case 5:
                      case "end":
                        return e.stop();
                    }
                }, e);
              })
            );
            return function () {
              return e.apply(this, arguments);
            };
          })(),
          S = (function () {
            var e = Object(d.a)(
              o.a.mark(function e() {
                return o.a.wrap(function (e) {
                  for (;;)
                    switch ((e.prev = e.next)) {
                      case 0:
                        return (
                          g(!0),
                          (e.next = 3),
                          N({
                            method: "delete",
                            url: "/api/v1/users/".concat(j._id, "/reject"),
                            headers: { "auth-token": t.accessToken },
                          })
                        );
                      case 3:
                        g(!1), window.location.reload();
                      case 5:
                      case "end":
                        return e.stop();
                    }
                }, e);
              })
            );
            return function () {
              return e.apply(this, arguments);
            };
          })(),
          T = (function () {
            var e = Object(d.a)(
              o.a.mark(function e() {
                return o.a.wrap(function (e) {
                  for (;;)
                    switch ((e.prev = e.next)) {
                      case 0:
                        return (
                          g(!0),
                          (e.next = 3),
                          N({
                            method: "put",
                            url: "/api/v1/users/".concat(j._id, "/delete"),
                            headers: { "auth-token": t.accessToken },
                          })
                        );
                      case 3:
                        g(!1), window.location.reload();
                      case 5:
                      case "end":
                        return e.stop();
                    }
                }, e);
              })
            );
            return function () {
              return e.apply(this, arguments);
            };
          })();
        return Object(p.jsxs)(p.Fragment, {
          children: [
            Object(p.jsx)(I, {}),
            Object(p.jsxs)("div", {
              className: "profile",
              children: [
                Object(p.jsx)(U, {}),
                j &&
                  a &&
                  Object(p.jsxs)("div", {
                    className: "profileRight",
                    children: [
                      Object(p.jsxs)("div", {
                        className: "profileRightTop",
                        children: [
                          Object(p.jsx)("div", {
                            className: "profileCover",
                            children: Object(p.jsx)("img", {
                              className: "profileUserImg",
                              src: v
                                ? ""
                                    .concat("http://localhost:8800/images/")
                                    .concat(v)
                                : "/assets/images/noAvatar.png",
                              alt: "userImg",
                            }),
                          }),
                          Object(p.jsx)("div", {
                            className: "profileInfo",
                            children: Object(p.jsx)("h4", {
                              className: "profileInfoName",
                              children: j.username,
                            }),
                          }),
                        ],
                      }),
                      t._id !== j._id &&
                        Object(p.jsx)("div", {
                          className: "btn-container",
                          children: a.friends.find(function (e) {
                            return e._id === j._id;
                          })
                            ? Object(p.jsxs)(p.Fragment, {
                                children: [
                                  Object(p.jsx)("button", {
                                    onClick: T,
                                    disabled: f,
                                    className: "btn btn-red",
                                    children: "Unfriend",
                                  }),
                                  Object(p.jsx)("button", {
                                    disabled: f,
                                    className: "btn btn-confirm",
                                    children: Object(p.jsx)(w.b, {
                                      to: "/chat/".concat(e),
                                      className: "color-light",
                                      children: "Chat",
                                    }),
                                  }),
                                ],
                              })
                            : a.sentRequests.find(function (e) {
                                return e._id === j._id;
                              })
                            ? Object(p.jsx)("button", {
                                onClick: C,
                                disabled: f,
                                className: "btn btn-red",
                                children: "Cancel",
                              })
                            : a.friendRequests.find(function (e) {
                                return e._id === j._id;
                              })
                            ? Object(p.jsxs)(p.Fragment, {
                                children: [
                                  Object(p.jsx)("button", {
                                    onClick: y,
                                    disabled: f,
                                    className: "btn btn-confirm",
                                    children: "Confirm",
                                  }),
                                  Object(p.jsx)("button", {
                                    onClick: S,
                                    disabled: f,
                                    className: "btn btn-delete",
                                    children: "Delete",
                                  }),
                                ],
                              })
                            : Object(p.jsx)("button", {
                                onClick: _,
                                disabled: f,
                                className: " btn btn-confirm",
                                children: "Add",
                              }),
                        }),
                      f &&
                        Object(p.jsx)("div", {
                          className: "loading",
                          children: Object(p.jsx)(B.a, {
                            color: "inherit",
                            size: "20px",
                          }),
                        }),
                      Object(p.jsxs)("div", {
                        className: "profileRightBottom",
                        children: [
                          Object(p.jsx)(J, {
                            user: !0,
                            userFriends: j.friends,
                          }),
                          Object(p.jsx)("h4", {
                            className: "rightbarTitle",
                            children: "Posts",
                          }),
                          Object(p.jsx)(M, { share: !1, profile: e }),
                        ],
                      }),
                    ],
                  }),
              ],
            }),
          ],
        });
      }
      s(191);
      function pe() {
        return Object(p.jsxs)(p.Fragment, {
          children: [
            Object(p.jsx)(I, {}),
            Object(p.jsxs)("div", {
              className: "learnContainer",
              children: [
                Object(p.jsx)(U, {}),
                Object(p.jsxs)("div", {
                  class: "learning-cards",
                  children: [
                    Object(p.jsx)("p", {
                      className: "learnHeader",
                      children: "Reading Is Dreaming With Open Eyes",
                    }),
                    Object(p.jsxs)("div", {
                      class: "card-grid",
                      children: [
                        Object(p.jsxs)(w.b, {
                          class: "card",
                          to: "/learning/history",
                          children: [
                            Object(p.jsx)("div", {
                              class: "card__background",
                              style: {
                                backgroundImage:
                                  "url('/assets/categories/history.jpg')",
                              },
                            }),
                            Object(p.jsxs)("div", {
                              class: "card__content",
                              children: [
                                Object(p.jsx)("p", {
                                  class: "card__category",
                                  children: "Category",
                                }),
                                Object(p.jsx)("h3", {
                                  class: "card__heading",
                                  children: "History",
                                }),
                              ],
                            }),
                          ],
                        }),
                        Object(p.jsxs)(w.b, {
                          class: "card",
                          to: "/learning/science",
                          children: [
                            Object(p.jsx)("div", {
                              class: "card__background",
                              style: {
                                backgroundImage:
                                  "url('/assets/categories/science.jpg')",
                              },
                            }),
                            Object(p.jsxs)("div", {
                              class: "card__content",
                              children: [
                                Object(p.jsx)("p", {
                                  class: "card__category",
                                  children: "Category",
                                }),
                                Object(p.jsx)("h3", {
                                  class: "card__heading",
                                  children: "Science",
                                }),
                              ],
                            }),
                          ],
                        }),
                        Object(p.jsxs)(w.b, {
                          class: "card",
                          to: "/learning/space",
                          children: [
                            Object(p.jsx)("div", {
                              class: "card__background",
                              style: {
                                backgroundImage:
                                  "url('/assets/categories/space.jpg')",
                              },
                            }),
                            Object(p.jsxs)("div", {
                              class: "card__content",
                              children: [
                                Object(p.jsx)("p", {
                                  class: "card__category",
                                  children: "Category",
                                }),
                                Object(p.jsx)("h3", {
                                  class: "card__heading",
                                  children: "Space",
                                }),
                              ],
                            }),
                          ],
                        }),
                        Object(p.jsxs)(w.b, {
                          class: "card",
                          to: "/learning/programming",
                          children: [
                            Object(p.jsx)("div", {
                              class: "card__background",
                              style: {
                                backgroundImage:
                                  "url('/assets/categories/programming.jpg')",
                              },
                            }),
                            Object(p.jsxs)("div", {
                              class: "card__content",
                              children: [
                                Object(p.jsx)("p", {
                                  class: "card__category",
                                  children: "Category",
                                }),
                                Object(p.jsx)("h3", {
                                  class: "card__heading",
                                  children: "Programming",
                                }),
                              ],
                            }),
                          ],
                        }),
                        Object(p.jsx)("div", {}),
                      ],
                    }),
                  ],
                }),
              ],
            }),
          ],
        });
      }
      s(192);
      function Oe() {
        var e = Object(c.useRef)(),
          t = Object(c.useRef)(),
          s = Object(c.useRef)(),
          n = Object(c.useRef)(),
          a = Object(c.useState)(!1),
          r = Object(u.a)(a, 2),
          i = r[0],
          l = r[1],
          j = Object(c.useState)({ isError: !1, msg: "" }),
          b = Object(u.a)(j, 2),
          m = b[0],
          O = b[1],
          x = (function () {
            var c = Object(d.a)(
              o.a.mark(function c(a) {
                return o.a.wrap(
                  function (c) {
                    for (;;)
                      switch ((c.prev = c.next)) {
                        case 0:
                          if (
                            (a.preventDefault(),
                            console.log("hi", s.current.value, n.current.value),
                            s.current.value === n.current.value)
                          ) {
                            c.next = 4;
                            break;
                          }
                          return c.abrupt(
                            "return",
                            O({
                              isError: !0,
                              msg: "Passwords are not the same",
                            })
                          );
                        case 4:
                          return (
                            l(!0),
                            O({ isError: !1, msg: "" }),
                            (c.prev = 6),
                            (c.next = 9),
                            h.a.post("/api/v1/auth/register", {
                              username: e.current.value,
                              email: t.current.value,
                              password: s.current.value,
                            })
                          );
                        case 9:
                          c.sent.data &&
                            (window.location.replace("/login"), l(!1)),
                            (c.next = 17);
                          break;
                        case 13:
                          (c.prev = 13),
                            (c.t0 = c.catch(6)),
                            l(!1),
                            409 === c.t0.response.status
                              ? O({ isError: !0, msg: "Email is already used" })
                              : O({ isError: !0, msg: "Somthing went wrong!" });
                        case 17:
                        case "end":
                          return c.stop();
                      }
                  },
                  c,
                  null,
                  [[6, 13]]
                );
              })
            );
            return function (e) {
              return c.apply(this, arguments);
            };
          })();
        return (
          (document.body.style.backgroundColor = "#0080ff"),
          Object(p.jsxs)("div", {
            className: "login-container",
            children: [
              Object(p.jsx)("div", {
                className: "login-icon",
                children: "Kids Social",
              }),
              Object(p.jsxs)("div", {
                className: "login-form",
                children: [
                  Object(p.jsx)("div", {
                    className: "login-title",
                    children: "Sign Up",
                  }),
                  Object(p.jsxs)("form", {
                    onSubmit: x,
                    children: [
                      Object(p.jsx)("input", {
                        className: "login-input",
                        placeholder: "Full Name",
                        type: "text",
                        required: !0,
                        ref: e,
                      }),
                      Object(p.jsx)("input", {
                        className: "login-input",
                        placeholder: "Email Address",
                        type: "email",
                        required: !0,
                        ref: t,
                      }),
                      Object(p.jsx)("input", {
                        className: "login-input",
                        placeholder: "Password",
                        type: "password",
                        required: !0,
                        ref: s,
                      }),
                      Object(p.jsx)("input", {
                        className: "login-input",
                        placeholder: "Confirm Password",
                        type: "password",
                        required: !0,
                        ref: n,
                      }),
                      Object(p.jsx)("button", {
                        className: "login-input button",
                        type: "submit",
                        disabled: i,
                        children: i
                          ? Object(p.jsx)(B.a, { color: "#fff", size: "20px" })
                          : "Sign Up",
                      }),
                      m.isError && Object(p.jsx)(be, { msg: m.msg }),
                    ],
                  }),
                ],
              }),
              Object(p.jsxs)("div", {
                className: "login-signup",
                children: [
                  "Have an account? ",
                  Object(p.jsx)(w.b, { to: "/login", children: "Log in" }),
                ],
              }),
            ],
          })
        );
      }
      s(193), s(194);
      var xe = function (e) {
        var t = e.request,
          s = Object(c.useContext)(x).user,
          n = t.img,
          a = Object(c.useState)(!1),
          r = Object(u.a)(a, 2),
          i = r[0],
          l = r[1],
          j = (function () {
            var e = Object(d.a)(
              o.a.mark(function e() {
                return o.a.wrap(function (e) {
                  for (;;)
                    switch ((e.prev = e.next)) {
                      case 0:
                        return (
                          l(!0),
                          (e.next = 3),
                          N({
                            method: "put",
                            url: "/api/v1/users/".concat(t._id, "/accept"),
                            headers: { "auth-token": s.accessToken },
                          })
                        );
                      case 3:
                        l(!1), window.location.reload();
                      case 5:
                      case "end":
                        return e.stop();
                    }
                }, e);
              })
            );
            return function () {
              return e.apply(this, arguments);
            };
          })(),
          b = (function () {
            var e = Object(d.a)(
              o.a.mark(function e() {
                return o.a.wrap(function (e) {
                  for (;;)
                    switch ((e.prev = e.next)) {
                      case 0:
                        return (
                          l(!0),
                          (e.next = 3),
                          N({
                            method: "delete",
                            url: "/api/v1/users/".concat(t._id, "/reject"),
                            headers: { "auth-token": s.accessToken },
                          })
                        );
                      case 3:
                        l(!1), window.location.reload();
                      case 5:
                      case "end":
                        return e.stop();
                    }
                }, e);
              })
            );
            return function () {
              return e.apply(this, arguments);
            };
          })();
        return Object(p.jsxs)("div", {
          className: "request",
          children: [
            Object(p.jsx)(w.b, {
              to: "/profile/".concat(t._id),
              children: Object(p.jsx)("img", {
                className: "req-img",
                src: n
                  ? "".concat("http://localhost:8800/images/").concat(n)
                  : "/assets/images/noAvatar.png",
                alt: "userImg",
              }),
            }),
            Object(p.jsxs)("div", {
              className: "req-details",
              children: [
                Object(p.jsx)(w.b, {
                  to: "/profile/".concat(t._id),
                  children: Object(p.jsx)("h3", { children: t.username }),
                }),
                Object(p.jsxs)("div", {
                  className: "req-buttons",
                  children: [
                    Object(p.jsx)("button", {
                      onClick: j,
                      disabled: i,
                      className: "btn btn-confirm",
                      children: "Confirm",
                    }),
                    Object(p.jsx)("button", {
                      onClick: b,
                      disabled: i,
                      className: "btn btn-delete",
                      children: "Delete",
                    }),
                  ],
                }),
              ],
            }),
            i &&
              Object(p.jsx)("div", {
                className: "loading",
                children: Object(p.jsx)(B.a, {
                  color: "inherit",
                  size: "20px",
                }),
              }),
          ],
        });
      };
      function fe() {
        var e = Object(c.useContext)(x).user,
          t = Object(c.useState)([]),
          s = Object(u.a)(t, 2),
          n = s[0],
          a = s[1];
        return (
          Object(c.useEffect)(
            function () {
              (function () {
                var t = Object(d.a)(
                  o.a.mark(function t() {
                    var s;
                    return o.a.wrap(function (t) {
                      for (;;)
                        switch ((t.prev = t.next)) {
                          case 0:
                            return (
                              (t.next = 2),
                              h.a.get(
                                "/api/v1/users/friendRequests/".concat(e._id)
                              )
                            );
                          case 2:
                            (s = t.sent), a(s.data);
                          case 4:
                          case "end":
                            return t.stop();
                        }
                    }, t);
                  })
                );
                return function () {
                  return t.apply(this, arguments);
                };
              })()();
            },
            [e._id]
          ),
          Object(p.jsxs)(p.Fragment, {
            children: [
              Object(p.jsx)(I, {}),
              Object(p.jsxs)("div", {
                className: "RequestsContainer",
                children: [
                  Object(p.jsx)(U, {}),
                  Object(p.jsx)("div", {
                    className: "requests",
                    children:
                      n.length > 0
                        ? n.map(function (e) {
                            return Object(p.jsx)(xe, { request: e }, e._id);
                          })
                        : Object(p.jsx)("h4", {
                            className: "h4-fs m-1",
                            children: "There are no friend requests",
                          }),
                  }),
                  Object(p.jsx)(J, { home: !0 }),
                ],
              }),
            ],
          })
        );
      }
      s(195), s(196), s(197);
      var ge = s(230);
      function ve(e) {
        var t = e.comment,
          s = t.userId.img,
          n = Object(c.useContext)(x).user,
          a = Object(c.useState)(!1),
          r = Object(u.a)(a, 2),
          i = r[0],
          l = r[1],
          j = (function () {
            var e = Object(d.a)(
              o.a.mark(function e() {
                return o.a.wrap(function (e) {
                  for (;;)
                    switch ((e.prev = e.next)) {
                      case 0:
                        return (
                          l(!0),
                          (e.next = 3),
                          N({
                            method: "delete",
                            url: "/api/v1/comments/".concat(t._id),
                            headers: { "auth-token": n.accessToken },
                          })
                        );
                      case 3:
                        l(!1), window.location.reload();
                      case 5:
                      case "end":
                        return e.stop();
                    }
                }, e);
              })
            );
            return function () {
              return e.apply(this, arguments);
            };
          })();
        return Object(p.jsxs)("div", {
          className: "comment",
          children: [
            Object(p.jsx)(w.b, {
              to: "/profile/".concat(t.userId._id),
              children: Object(p.jsx)("img", {
                className: "comment-img",
                src: s
                  ? "".concat("http://localhost:8800/images/").concat(s)
                  : "/assets/images/noAvatar.png",
                alt: "userImg",
              }),
            }),
            Object(p.jsxs)("div", {
              className: "comment-details comment-bg",
              children: [
                Object(p.jsx)(w.b, {
                  to: "/profile/".concat(t.userId._id),
                  children: Object(p.jsx)("h4", {
                    children: t.userId.username,
                  }),
                }),
                Object(p.jsx)("div", {
                  className: "comment-body",
                  children: Object(p.jsx)("p", { children: t.desc }),
                }),
              ],
            }),
            t.userId._id === n._id &&
              Object(p.jsx)(ge.a, {
                htmlColor: "red",
                className: "postDeleteIcon",
                onClick: j,
              }),
            i &&
              Object(p.jsx)("div", {
                className: "loading",
                children: Object(p.jsx)(B.a, {
                  color: "inherit",
                  size: "18px",
                }),
              }),
          ],
        });
      }
      var Ne = s(231);
      function ye(e) {
        var t = e.post,
          s = e.liked,
          n = t.img,
          a = Object(k.g)(),
          r = t.userId.img,
          i = Object(c.useContext)(x).user,
          l = "http://localhost:8800/images/",
          j = Object(c.useState)(t.likes.length),
          b = Object(u.a)(j, 2),
          m = b[0],
          O = b[1],
          f = Object(c.useState)(s),
          g = Object(u.a)(f, 2),
          v = g[0],
          y = g[1],
          I = Object(c.useState)(!1),
          _ = Object(u.a)(I, 2),
          C = _[0],
          S = _[1],
          T = Object(c.useState)(),
          L = Object(u.a)(T, 2),
          E = L[0],
          F = L[1],
          P = Object(c.useState)([]),
          R = Object(u.a)(P, 2),
          D = R[0],
          A = R[1];
        Object(c.useEffect)(
          function () {
            (function () {
              var e = Object(d.a)(
                o.a.mark(function e() {
                  var s;
                  return o.a.wrap(
                    function (e) {
                      for (;;)
                        switch ((e.prev = e.next)) {
                          case 0:
                            return (
                              (e.prev = 0),
                              (e.next = 3),
                              h.a.get("/api/v1/comments/".concat(t._id))
                            );
                          case 3:
                            (s = e.sent), A(s.data), (e.next = 10);
                            break;
                          case 7:
                            (e.prev = 7),
                              (e.t0 = e.catch(0)),
                              console.log(e.t0);
                          case 10:
                          case "end":
                            return e.stop();
                        }
                    },
                    e,
                    null,
                    [[0, 7]]
                  );
                })
              );
              return function () {
                return e.apply(this, arguments);
              };
            })()();
          },
          [t._id, C]
        );
        var q = (function () {
            var e = Object(d.a)(
              o.a.mark(function e() {
                return o.a.wrap(function (e) {
                  for (;;)
                    switch ((e.prev = e.next)) {
                      case 0:
                        return (
                          (e.next = 2),
                          N({
                            method: "put",
                            url: "/api/v1/posts/".concat(t._id, "/like"),
                            headers: { "auth-token": i.accessToken },
                          })
                        );
                      case 2:
                        O(v ? m - 1 : m + 1), y(!v);
                      case 4:
                      case "end":
                        return e.stop();
                    }
                }, e);
              })
            );
            return function () {
              return e.apply(this, arguments);
            };
          })(),
          U = (function () {
            var e = Object(d.a)(
              o.a.mark(function e() {
                var s;
                return o.a.wrap(function (e) {
                  for (;;)
                    switch ((e.prev = e.next)) {
                      case 0:
                        if (!(E.length > 0)) {
                          e.next = 7;
                          break;
                        }
                        return (
                          S(!0),
                          (s = { postId: t._id, desc: E }),
                          (e.next = 5),
                          N({
                            method: "post",
                            url: "/api/v1/comments",
                            data: s,
                            headers: { "auth-token": i.accessToken },
                          })
                        );
                      case 5:
                        S(!1), F("");
                      case 7:
                      case "end":
                        return e.stop();
                    }
                }, e);
              })
            );
            return function () {
              return e.apply(this, arguments);
            };
          })(),
          W = (function () {
            var e = Object(d.a)(
              o.a.mark(function e() {
                return o.a.wrap(function (e) {
                  for (;;)
                    switch ((e.prev = e.next)) {
                      case 0:
                        return (
                          S(!0),
                          (e.next = 3),
                          N({
                            method: "delete",
                            url: "/api/v1/posts/".concat(t._id),
                            headers: { "auth-token": i.accessToken },
                          })
                        );
                      case 3:
                        S(!1), a.goBack();
                      case 5:
                      case "end":
                        return e.stop();
                    }
                }, e);
              })
            );
            return function () {
              return e.apply(this, arguments);
            };
          })();
        return Object(p.jsx)("div", {
          className: "post",
          children: Object(p.jsxs)("div", {
            className: "postWrapper",
            children: [
              Object(p.jsxs)("div", {
                className: "postTop",
                children: [
                  Object(p.jsxs)("div", {
                    className: "postTopLeft",
                    children: [
                      Object(p.jsx)(w.b, {
                        to: "/profile/".concat(t.userId._id),
                        children: Object(p.jsx)("img", {
                          className: "postProfileImg",
                          src: r
                            ? "".concat(l).concat(r)
                            : "/assets/images/noAvatar.png",
                          alt: "userImg",
                        }),
                      }),
                      Object(p.jsxs)("div", {
                        children: [
                          Object(p.jsx)(w.b, {
                            to: "/profile/".concat(t.userId._id),
                            children: Object(p.jsx)("span", {
                              className: "postUsername",
                              children: t.userId.username,
                            }),
                          }),
                          Object(p.jsx)("span", {
                            className: "postDate",
                            children: new Date(t.createdAt).toLocaleString(),
                          }),
                        ],
                      }),
                    ],
                  }),
                  t.userId._id === i._id &&
                    Object(p.jsx)(ge.a, {
                      htmlColor: "red",
                      className: "postDeleteIcon",
                      onClick: W,
                    }),
                ],
              }),
              Object(p.jsxs)("div", {
                className: "postCenter",
                children: [
                  Object(p.jsx)("span", {
                    className: "postText",
                    children: t.desc,
                  }),
                  n &&
                    Object(p.jsx)("img", {
                      className: "postImg",
                      src: "".concat(l).concat(n),
                      alt: "postImg",
                    }),
                ],
              }),
              Object(p.jsxs)("div", {
                className: "postBottom",
                children: [
                  Object(p.jsxs)("div", {
                    className: "postBottomLeft",
                    children: [
                      Object(p.jsx)("img", {
                        className: "likeIcon",
                        src: "".concat(l, "like.png"),
                        onClick: q,
                        alt: "",
                      }),
                      Object(p.jsx)("span", {
                        className: "postLikeCounter",
                        children: m,
                      }),
                    ],
                  }),
                  Object(p.jsx)("div", {
                    className: "postBottomRight",
                    children: Object(p.jsx)("span", {
                      className: "postCommentText",
                      children: "Comments",
                    }),
                  }),
                ],
              }),
              Object(p.jsxs)("div", {
                className: "input-group mt-2 ",
                children: [
                  Object(p.jsx)("textarea", {
                    id: "message",
                    name: "comment-input",
                    style: { resize: "none" },
                    className: "form-control type_msg textarea-bd comment-bg",
                    placeholder: "Write a comment...",
                    value: E,
                    onChange: function (e) {
                      F(e.target.value);
                    },
                    maxLength: "10000",
                  }),
                  Object(p.jsx)("div", {
                    className: "input-group-append  justify-content-end d-flex",
                    children: Object(p.jsx)("button", {
                      onClick: U,
                      disabled: C,
                      className:
                        "input-group-text send_btn comment-bg color-main",
                      children: Object(p.jsx)(Ne.a, {}),
                    }),
                  }),
                ],
              }),
              C &&
                Object(p.jsx)("div", {
                  className: "loading",
                  children: Object(p.jsx)(B.a, {
                    color: "inherit",
                    size: "25px",
                  }),
                }),
              D.length > 0 &&
                D.map(function (e) {
                  return Object(p.jsx)(ve, { comment: e }, e._id);
                }),
            ],
          }),
        });
      }
      function we(e) {
        var t = e.location,
          s = Object(k.h)().postId,
          n = Object(c.useState)(),
          a = Object(u.a)(n, 2),
          r = a[0],
          i = a[1];
        return (
          Object(c.useEffect)(
            function () {
              (function () {
                var e = Object(d.a)(
                  o.a.mark(function e() {
                    var t;
                    return o.a.wrap(
                      function (e) {
                        for (;;)
                          switch ((e.prev = e.next)) {
                            case 0:
                              return (
                                (e.prev = 0),
                                (e.next = 3),
                                h.a.get("/api/v1/posts/".concat(s))
                              );
                            case 3:
                              (t = e.sent), i(t.data), (e.next = 10);
                              break;
                            case 7:
                              (e.prev = 7),
                                (e.t0 = e.catch(0)),
                                console.log(e.t0);
                            case 10:
                            case "end":
                              return e.stop();
                          }
                      },
                      e,
                      null,
                      [[0, 7]]
                    );
                  })
                );
                return function () {
                  return e.apply(this, arguments);
                };
              })()();
            },
            [s]
          ),
          Object(p.jsxs)(p.Fragment, {
            children: [
              Object(p.jsx)(I, {}),
              Object(p.jsxs)("div", {
                className: "postContainer",
                children: [
                  Object(p.jsx)(U, {}),
                  Object(p.jsx)("div", {
                    className: "feed",
                    children: Object(p.jsx)("div", {
                      className: "feedWrapper",
                      children:
                        r &&
                        Object(p.jsx)(ye, { post: r, liked: t.state.isLiked }),
                    }),
                  }),
                  Object(p.jsx)(J, { hideImg: !1, home: !0 }),
                ],
              }),
            ],
          })
        );
      }
      s(198);
      var ke = [
        {
          id: 1,
          header: "Pyramids",
          desc: "The Egyptian pyramids are ancient masonry structures located in Egypt. Approximately 80 pyramids were built within the Kingdom of Kush, now located in the modern country of Sudan. Of those located in modern Egypt, most were built as tombs for the country's pharaohs and their consorts during the Old and Middle Kingdom periods, The earliest known Egyptian pyramids are found at Saqqara, northwest of Memphis, although at least one step-pyramid-like structure has been found at Saqqara, dating to the First Dynasty: Mastaba 3808, which has been attributed to the reign of Pharaoh Anedjib, with inscriptions, and other archaeological remains of the period, suggesting there may have been others, The otherwise earliest among these is the Pyramid of Djoser built c. 2630-2610 BCE during the Third Dynasty. This pyramid and its surrounding complex are generally considered to be the world's oldest monumental structures constructed of dressed masonry, The most famous Egyptian pyramids are those found at Giza, on the outskirts of Cairo. Several of the Giza pyramids are counted among the largest structures ever built, The Pyramid of Khufu is the largest Egyptian pyramid. It is the only one of the Seven Wonders of the Ancient World still in existence, this is despite being the oldest wonder by about 2,000 years",
          img: "post/pyramids.jpg",
          category: "history",
        },
        {
          id: 2,
          header: "Luxor Temple",
          desc: "The temple has been in almost continuous use as a place of worship right up to the present day. During the Christian era, the temple's hypostyle hall was converted into a Christian church, and the remains of another Coptic church can be seen to the west. Then for thousands of years, the temple was buried beneath the streets and houses of Luxor. Eventually the mosque of Sufi Shaykh Yusuf Abu al-Hajjaj was built over it. This mosque was carefully preserved when the temple was uncovered and forms an integral part of the site today. Before the building works by Rameses II the northern end of the court was originally the entrance to the temple. It was an enclosed colonnade of seven pairs of 52-foot (16m) high open-flower papyrus columns. It was begun by Amenhotep III and completed by Tutankhamun and still support its huge",
          img: "post/luxor.jpg",
          category: "history",
        },
        {
          id: 3,
          header: "What is Physics ?",
          desc: "Physics is a branch of science that studies matter and its motion as well as how it interacts with energy and forces. Physics is a huge subject. There are many branches of physics including electricity, astronomy, motion, waves, sound, and light. Physics studies the smallest elementary particles and atoms as well as the largest stars and the universe.Scientists who are experts in physics are called physicists. Physicists use the scientific method to test hypotheses and develop scientific laws. Some of the most famous scientists in history are considered physicists such as Isaac Newton and Albert Einstein.Physics Subjects, Physics explains how the world around us works. Many of our modern technologies are based off of scientific discoveries made in the science of physics. Engineers use physics to help design airplanes, cars, buildings, and electronics such as computers and cell phones",
          img: "post/physics.jpg",
          category: "science",
        },
      ];
      s(199);
      function Ie(e) {
        var t = e.post,
          s = t.img;
        return Object(p.jsx)("div", {
          className: "readOnlyPost post",
          children: Object(p.jsx)("div", {
            className: "postWrapper",
            children: Object(p.jsxs)("div", {
              className: "postCenter",
              children: [
                s &&
                  Object(p.jsx)("img", {
                    className: "postImg",
                    src: "".concat("http://localhost:8800/images/").concat(s),
                    alt: "postImg",
                  }),
                Object(p.jsx)("span", {
                  className: "postText",
                  children: t.desc,
                }),
              ],
            }),
          }),
        });
      }
      function _e() {
        var e = Object(k.h)().category;
        return Object(p.jsxs)(p.Fragment, {
          children: [
            Object(p.jsx)(I, {}),
            Object(p.jsxs)("div", {
              className: "learnContainer",
              children: [
                Object(p.jsx)(U, {}),
                Object(p.jsxs)("div", {
                  className: "feed",
                  children: [
                    Object(p.jsx)("p", {
                      className: "learnHeader text-cap",
                      children: e,
                    }),
                    Object(p.jsx)("div", {
                      className: "",
                      children: ke.map(function (t) {
                        return (
                          t.category === e &&
                          Object(p.jsx)(Ie, { post: t }, t.id)
                        );
                      }),
                    }),
                  ],
                }),
              ],
            }),
          ],
        });
      }
      var Ce = function () {
        var e = Object(c.useContext)(x).user;
        return Object(p.jsx)(w.a, {
          children: Object(p.jsxs)(k.d, {
            children: [
              Object(p.jsx)(k.b, { path: "/login", component: he }),
              Object(p.jsx)(k.b, { path: "/register", component: Oe }),
              e
                ? Object(p.jsxs)(p.Fragment, {
                    children: [
                      Object(p.jsx)(k.b, {
                        exact: !0,
                        path: "/",
                        component: V,
                      }),
                      Object(p.jsx)(k.b, {
                        path: "/profile/:userId",
                        component: me,
                      }),
                      Object(p.jsx)(k.b, {
                        path: "/posts/:postId",
                        component: we,
                      }),
                      Object(p.jsx)(k.b, { path: "/requests", component: fe }),
                      Object(p.jsx)(k.b, { path: "/chats", component: je }),
                      Object(p.jsx)(k.b, {
                        path: "/chat/:friendId",
                        component: ae,
                      }),
                      Object(p.jsx)(k.b, {
                        path: "/room/:type/:roomID",
                        component: de,
                      }),
                      Object(p.jsx)(k.b, {
                        path: "/learning",
                        component: pe,
                        exact: !0,
                      }),
                      Object(p.jsx)(k.b, {
                        path: "/learning/:category",
                        component: _e,
                      }),
                    ],
                  })
                : Object(p.jsxs)(p.Fragment, {
                    children: [
                      Object(p.jsx)(k.a, { from: "/", to: "/login" }),
                      Object(p.jsx)(k.a, {
                        from: "/profile/:userId",
                        to: "/login",
                      }),
                      Object(p.jsx)(k.a, {
                        from: "/posts/:postId",
                        to: "/login",
                      }),
                      Object(p.jsx)(k.a, { from: "/requests", to: "/login" }),
                      Object(p.jsx)(k.a, { from: "/chats", to: "/login" }),
                      Object(p.jsx)(k.a, {
                        from: "/chat/:userId",
                        to: "/login",
                      }),
                      Object(p.jsx)(k.a, {
                        from: "/room/:type/:roomID",
                        to: "/login",
                      }),
                      Object(p.jsx)(k.a, { from: "/learning", to: "/login" }),
                      Object(p.jsx)(k.a, {
                        from: "/learning/:category",
                        to: "/login",
                      }),
                    ],
                  }),
            ],
          }),
        });
      };
      r.a.render(
        Object(p.jsx)(n.a.StrictMode, {
          children: Object(p.jsx)(f, { children: Object(p.jsx)(Ce, {}) }),
        }),
        document.getElementById("root")
      );
    },
  },
  [[200, 1, 2]],
]);
//# sourceMappingURL=main.a7a1c942.chunk.js.map
