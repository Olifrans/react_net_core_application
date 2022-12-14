//https://api.pushio.com/webpush/sdk/wpIndex_min.js


!(function (t) {
  var e = {
      pmr: null,
      appId: null,
      apikey: null,
      pt: "standard",
      vid: null,
      subtkn: null,
      subauth: null,
      subp256: null,
      ts: null,
      appver: null,
      ver: 1,
      uagnt: null,
      sw: null,
      sh: null,
      sdensity: null,
      lat: null,
      lon: null,
      accuracy: null,
      locale: null,
      tz: null,
      lp: null,
      tojson: function () {
        return {
          pmr: this.pmr,
          appId: this.appId,
          apikey: this.apikey,
          pt: "standard",
          vid: this.vid,
          subtkn: this.subtkn,
          subauth: this.subauth,
          subp256: this.subp256,
          ts: this.ts,
          appver: this.appver,
          ver: "1.0",
          uagnt: this.uagnt,
          sw: this.sw,
          sh: this.sh,
          sdensity: this.sdensity,
          lat: this.lat,
          lon: this.lon,
          accuracy: this.accuracy,
          locale: this.locale,
          tz: this.tz,
          edti: this.edti,
          usrid: this.usrid,
          lp: this.lp,
        };
      },
    },
    n = {
      level: "debug",
      error: function (t) {
        ("error" != this.level &&
          "info" != this.level &&
          "debug" != this.level) ||
          console.error(t);
      },
      info: function (t) {
        ("info" != this.level && "debug" != this.level) || console.info(t);
      },
      debug: function (t) {
        "debug" == this.level && console.log(t);
      },
    },
    r = "subscription",
    s = "visitorId",
    o = "regData",
    a = "WPushconfigData",
    u = "lastRegSent",
    c = "NP",
    g = "RegSent",
    l = "lat",
    d = "lon",
    h = "accuracy",
    f = "userId",
    p = "edti",
    v = "LS",
    D = "DB",
    S = "Analytics",
    b = "ei",
    y = "eiContext",
    m = "lp",
    E = "resendReg",
    R = "appVer",
    P = function () {
      var t = !0;
      return (
        "serviceWorker" in navigator ||
          ((t = !1), n.error("No Service Worker support!")),
        "PushManager" in window || ((t = !1), n.error("No Push API Support!")),
        "Notification" in window ||
          ((t = !1), n.error("No Notification API Support!")),
        t
      );
    },
    I = function () {
      if (
        null != typeof window.crypto &&
        null != typeof window.crypto.getRandomValues
      ) {
        var t = function (e, i, n) {
            return e.length >= i ? e : t(n + e, i, n || " ");
          },
          e = function (e) {
            var i = e.toString(16);
            return t(i, 4, "0");
          },
          i = new window.Uint16Array(8);
        return (
          window.crypto.getRandomValues(i),
          [
            e(i[0]) + e(i[1]),
            e(i[2]),
            e(i[3]),
            e(i[4]),
            e(i[5]) + e(i[6]) + e(i[7]),
          ].join("-")
        );
      }
      var n = new Date().getTime();
      return "xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx".replace(
        /[xy]/g,
        function (t) {
          var e = (n + 16 * Math.random()) % 16 | 0;
          return (
            (n = Math.floor(n / 16)), ("x" === t ? e : (7 & e) | 8).toString(16)
          );
        }
      );
    },
    w = function (t) {
      var e = null;
      if (t)
        try {
          e = JSON.stringify(t);
        } catch (t) {}
      return e;
    },
    O = function (t) {
      var e = null;
      if (t)
        try {
          e = JSON.parse(t);
        } catch (e) {
          n.error("unable to parse JSON String" + t);
        }
      return e;
    },
    C = function (t, e, i, n) {
      var r = ((i - t) * Math.PI) / 180,
        s = ((n - e) * Math.PI) / 180,
        o =
          Math.sin(r / 2) * Math.sin(r / 2) +
          Math.cos((t * Math.PI) / 180) *
            Math.cos((i * Math.PI) / 180) *
            Math.sin(s / 2) *
            Math.sin(s / 2),
        a = 6371 * (2 * Math.atan2(Math.sqrt(o), Math.sqrt(1 - o)));
      return Math.round(1e3 * a);
    },
    A = {
      storeData: function (t, e, i = v) {
        let n = T.getAPIKey();
        i == D
          ? (this.dbStore.initDB(n), this.dbStore.storeDBData(t, e))
          : i == v &&
            (this.sessionStore.init(n), this.sessionStore.storeData(t, e));
      },
      getStoreData: function (t, e = v) {
        let i = T.getAPIKey();
        return e == D
          ? (this.dbStore.initDB(i), this.dbStore.getDBData(t))
          : e == v
          ? (this.sessionStore.init(i), this.sessionStore.getStoreData(t))
          : void 0;
      },
      removeStoreData: function (t, e = v) {
        let i = T.getAPIKey();
        return e == D
          ? (this.dbStore.initDB(i), this.dbStore.removeDBData(t))
          : e == v
          ? (this.sessionStore.init(i), this.sessionStore.removeData(t))
          : void 0;
      },
      clear: function (t = v) {
        let e = T.getAPIKey();
        t == D
          ? (this.dbStore.initDB(e), this.dbStore.removeAllDBData())
          : t == v &&
            (this.sessionStore.init(e), this.sessionStore.removeAllData());
      },
      dbStore: {
        db: null,
        prefix: null,
        initDB: function (t) {
          return (
            this.db ||
              ((this.prefix = t),
              (this.db = new Promise(function (e, i) {
                var n = window.indexedDB.open("wpDatabase", 1);
                n.addEventListener("upgradeneeded", function (e) {
                  e.target.result.createObjectStore(t + "_rsysWPData", {
                    keyPath: "type",
                  });
                }),
                  n.addEventListener("success", function (t) {
                    return e(n.result);
                  }),
                  n.addEventListener("error", function (t) {
                    return i(t);
                  });
              }))),
            this.db
          );
        },
        getObjectStore: function (t) {
          var e =
              arguments.length > 1 && void 0 !== arguments[1] && arguments[1],
            i = e ? "readwrite" : "readonly";
          return t
            .transaction([A.dbStore.prefix + "_rsysWPData"], i)
            .objectStore(A.dbStore.prefix + "_rsysWPData");
        },
        requestToPromise: function (t) {
          var e =
              arguments.length > 1 && void 0 !== arguments[1]
                ? arguments[1]
                : function (t) {
                    return t.target.result;
                  },
            i =
              arguments.length > 2 && void 0 !== arguments[2]
                ? arguments[2]
                : function (t) {
                    return t.target.error;
                  };
          return new Promise(function (n, r) {
            t.addEventListener("success", function (t) {
              return n(e(t));
            }),
              t.addEventListener("error", function (t) {
                return r(i(t));
              });
          });
        },
        storeDBData: function (t, e) {
          let i = T.getAPIKey();
          try {
            return this.initDB(i).then(function (i) {
              return A.dbStore.requestToPromise(
                A.dbStore.getObjectStore(i, !0).put({ type: t, value: e })
              );
            });
          } catch (t) {
            n.error(t);
          }
        },
        getDBData: function (t) {
          let e = T.getAPIKey();
          try {
            return (
              (data = this.initDB(e).then(function (e) {
                return A.dbStore.requestToPromise(
                  A.dbStore.getObjectStore(e).get(t),
                  function (t) {
                    if (void 0 !== t.target.result)
                      return t.target.result.value;
                  }
                );
              })),
              data
            );
          } catch (t) {
            n.error(t);
          }
        },
        removeDBData: function (t) {
          let e = T.getAPIKey();
          try {
            return (
              (data = this.initDB(e).then(function (e) {
                return A.dbStore.requestToPromise(
                  A.dbStore.getObjectStore(e, !0).delete(t),
                  function (t) {
                    if (void 0 !== t.target.result)
                      return t.target.result.value;
                  }
                );
              })),
              data
            );
          } catch (t) {
            n.error(t);
          }
        },
        removeAllDBData: function () {
          let t = T.getAPIKey();
          this.initDB(t).then(function (t) {
            return A.dbStore.requestToPromise(
              A.dbStore.getObjectStore(t, !0).clear(),
              function (t) {
                if (void 0 !== t.target.result) return t.target.result.value;
              }
            );
          });
        },
      },
      sessionStore: {
        nameSpace: null,
        lsSupport: window.localStorage,
        init: function (t) {
          this.nameSpace = t + "_";
        },
        storeData: function (t, e) {
          this.lsSupport.setItem(this.nameSpace + t, e);
        },
        getStoreData: function (t) {
          return this.lsSupport.getItem(this.nameSpace + t);
        },
        removeData: function (t) {
          return this.lsSupport.removeItem(this.nameSpace + t);
        },
        removeAllData: function () {
          this.lsSupport.clear();
        },
      },
    },
    T = {
      configData: null,
      swLocation: "/webpush-service-worker.js",
      permission: null,
      subscription: null,
      dirtyChk: !1,
      logLevel: "info",
      latPos: null,
      longPos: null,
      acc: null,
      geoPermStatus: "X",
      isSwAlreadyRegistered: !1,
      doCleanUp: !1,
      isUsrIdUpdated: !1,
      locUsrid: null,
      isEdtiUpdated: !1,
      locEdtiId: null,
      eiContext: {},
      CONVERSION_PARAMS: {
        TYPE: null,
        ORDERID: null,
        ORDERTOTAL: null,
        NUMITEMS: null,
        CUSTOMERID: null,
      },
      LOG_LEVEL: { DEBUG: "debug", INFO: "info", ERROR: "error" },
      setLogLevel: function (t) {
        !t ||
          ("" == t.trim() && "debug" !== t && "info" !== t && "error" !== t) ||
          (n.level = t);
      },
      validateConfigObject: async function () {
        if (
          !(
            this.configData &&
            this.configData.appserviceKey &&
            this.configData.apiKey &&
            this.configData.accountToken &&
            this.configData.apiHost
          )
        )
          throw new Error(
            'Invalid configuration object it should contain following mandatatory attributes {"appserviceKey": "","apiKey":"XXXXXXXX", "accountToken": "XXXXXXXXXXX", "apiHost": "api.pushio.com"}'
          );
      },
      setEdti: function (t) {
        !T.isNotificationPermNotRequested() &&
          this.getSubscription() &&
          ((this.isEdtiUpdated = !0),
          (this.locEdtiId = t),
          (this.dirtyChk = !0),
          this.dirty());
      },
      resetEdti: function () {
        this.setEdti("");
      },
      getEdti: function () {
        let t = this.getBaseRequestPath() + "/edti?vi=" + this.getVisitorId();
        return this.getRemoteData(t);
      },
      setUserId: function (t) {
        !T.isNotificationPermNotRequested() &&
          this.getSubscription() &&
          ((this.locUsrid = t),
          (this.isUsrIdUpdated = !0),
          (this.dirtyChk = !0),
          this.dirty());
      },
      resetUserId: function () {
        this.setUserId("");
      },
      getUserId: function () {
        let t = this.getBaseRequestPath() + "/userid?vi=" + this.getVisitorId();
        return this.getRemoteData(t);
      },
      setAppversion: function (t) {
        t &&
          null != t &&
          "" != t &&
          (this.storeData(R, t),
          (cd = this.getConfigData()),
          cd &&
            "string" != typeof cd &&
            "object" == typeof cd &&
            "string" == typeof t &&
            t != cd.appver &&
            (n.debug("updating app version and sending registration"),
            (cd.appver = t),
            this.setConfigData(cd),
            (this.dirtyChk = !0),
            this.dirty()));
      },
      enableAnalytics: function (t) {
        if ("boolean" != typeof t)
          throw Error("Flag value should be true/false");
        this.storeData(S, t),
          this.storeData(S, t, D),
          t || this.resetEngagementContext();
      },
      isAnalyticsEnabled: function () {
        let t = this.getStoreData(S);
        return void 0 === t || null == t || "true" == t || 1 == t;
      },
      getEngagementContext: async function () {
        return this.isAnalyticsEnabled()
          ? await this.getStoreData(y, D)
              .then((t) => (void 0 === t ? null : t))
              .catch((t) => ({}))
          : null;
      },
      resetEngagementContext: function () {
        try {
          this.removeStoreData(b, D), this.removeStoreData(y, D);
        } catch (t) {
          n.error("Error while resetEngagementContext " + error);
        }
      },
      raiseConversionEvent: function (t, e = null, i = !1) {
        this.isAnalyticsEnabled()
          ? this.getEngagementContext()
              .then((r) => {
                if (
                  r &&
                  null != r &&
                  Object.keys(r).length > 0 &&
                  null != r.ei
                ) {
                  let n = N.CONVERSION_TYPE[t];
                  void 0 === n && (n = N.CONVERSION_TYPE.OTHERS),
                    (paramsToSend = {
                      ei: null,
                      type: null,
                      orderId: null,
                      orderTotal: null,
                      numItems: null,
                      customerId: null,
                    }),
                    (paramsToSend.type = n),
                    (paramsToSend.ei = r.ei),
                    (paramsToSend.uagnt = self.navigator.userAgent),
                    void 0 !== e &&
                      null != e &&
                      0 != Object.keys(e).length &&
                      e.TYPE == N.CONVERSION_TYPE.PURCHASE &&
                      ((paramsToSend.orderId = e.ORDERID),
                      (paramsToSend.orderTotal = e.ORDERTOTAL),
                      (paramsToSend.numItems = e.NUMITEMS),
                      (paramsToSend.customerId = e.CUSTOMERID)),
                    T.sendRequest(
                      this.getBaseRequestPath() + "/event/conversion",
                      w(paramsToSend)
                    ).then((t) => {
                      t && i && T.resetEngagementContext();
                    });
                } else
                  n.debug(
                    "Can not raise Conversion Event due to no ei available"
                  );
              })
              .catch((t) => {
                n.error(
                  "Unable to find Engagement context hence not raising conversion event"
                );
              })
          : n.debug("Suppressing Events due to user disabled analytics");
      },
      raisePurchaseEvent: function (t, e = !1) {
        if (void 0 === t || null == t || 0 == Object.keys(t).length)
          throw Error(
            "Invalid conversionParams Object, It should contain {TYPE:'PURCHASE', ORDERID: <ORDER_ID>, ORDERTOTAL: <ORDER_TOTAL_VALUE>}"
          );
        if (
          t.TYPE != N.CONVERSION_TYPE.PURCHASE ||
          null == t.ORDERID ||
          null == t.ORDERTOTAL
        )
          throw Error(
            "Invalid Purchase Event Parameters, It should contain {TYPE:'PURCHASE', ORDERID: <ORDER_ID>, ORDERTOTAL: <ORDER_TOTAL_VALUE>}"
          );
        this.raiseConversionEvent(N.CONVERSION_TYPE.PURCHASE, t, e);
      },
      validate: function () {
        return (
          this.validateConfigObject()
            .then()
            .catch((t) => {
              n.error(t);
            }),
          !!P()
        );
      },
      serviceWorkerLocation: async function () {
        let t = this.getConfigData();
        return t && t.swLoc && (this.swLocation = t.swLoc), this.swLocation;
      },
      initialized: function () {
        return !!this.configData;
      },
      initRegData: function () {
        var t = this.getRegJsonObj();
        t && null != t && (e = t);
      },
      getRegJsonObj: function () {
        var t = this.getStoreData(o);
        if (t) {
          n.debug("Found Registration Data at client storage");
          try {
            if (((e = t), "string" == typeof t)) {
              var i = O(t);
              return (e = i), i;
            }
          } catch (t) {
            n.error("Error while parsing persistedRegData");
          }
        }
        return null;
      },
      init: function (t) {
        if (this.initialized()) return;
        this.configData = O(t);
        let e = O(this.getStoreData(a));
        if (e && null != e && this.configData && null != this.configData) {
          let t = this.getStoreData(R);
          t && null != t && "" != t && (this.configData.appver = t),
            (e.appserviceKey == this.configData.appserviceKey &&
              e.apiKey == this.configData.apiKey &&
              e.accountToken == this.configData.accountToken &&
              e.apiHost == this.configData.apiHost) ||
              (this.dirtyChk = !0);
        }
        this.setConfigData(this.configData),
          this.initRegData(),
          n.debug("lazy::" + this.configData.lazy),
          n.debug("this.configData:: " + w(this.configData)),
          this.removeStoreData(f),
          this.removeStoreData(p),
          this.removeStoreData(f, D),
          this.removeStoreData(p, D);
        var i = this.getRegJsonObj();
        if (i) {
          delete i.usrid, delete i.edti;
          let t = w(i);
          (t = this.removeSensitiveDataFrmReg(t)), this.persistRegStrData(t);
        }
        this.configData.lazy
          ? this.isSWRegistered().then((t) => {
              t &&
                !T.isNotificationPermNotRequested() &&
                this.getSubscription() &&
                T.register();
            })
          : this.register();
      },
      dirty: function () {
        if (!this.getSubscription()) return;
        var t = this.getStoreData(u);
        t || (t = new Date().getTime());
        var e = new Date().getTime(),
          i = (e - t) / 864e5,
          r = this.getStoreData(c);
        n.debug("currTime::" + e),
          n.debug("lastRegSentTime::" + t),
          r &&
            r != this.getNotificationPermission() &&
            (n.debug("persistedPmr::" + r),
            n.debug(
              "getNotificationPermission::" + this.getNotificationPermission()
            ),
            "denied" === r && "granted" === this.getNotificationPermission()
              ? this.generateVistorId(!0)
              : "granted" === r &&
                "denied" === this.getNotificationPermission() &&
                (this.doCleanUp = !0),
            (this.dirtyChk = !0));
        let s = A.getStoreData(E);
        this.dirtyChk || !s || (1 != s && "true" != s) || (this.dirtyChk = !0),
          this.isRegistrationDataChanged(),
          n.debug("timeDiff:: " + i),
          n.debug("dirtyChk:: " + this.dirtyChk),
          (this.dirtyChk || i > 1) && this.triggerReg();
      },
      triggerReg: function () {
        this.isSwAlreadyRegistered
          ? this.populateAndSendReg()
          : this.registerServiceWorker();
      },
      isRegistrationDataChanged: function () {
        let t = this.getRegJsonObj(),
          e = this.getConfigData();
        this.dirtyChk ||
          null == t ||
          (t.pmr == this.getOptInOptOutStatus() &&
            t.appId == e.appId &&
            t.apikey == e.apiKey &&
            t.vid == this.getVisitorId() &&
            t.appver == e.appver &&
            t.uagnt == navigator.userAgent &&
            t.sw == screen.width &&
            t.sh == screen.height &&
            t.sdensity == window.devicePixelRatio &&
            t.locale == navigator.language &&
            t.tz == Intl.DateTimeFormat().resolvedOptions().timeZone &&
            "standard" == t.pt) ||
          this.triggerReg();
      },
      geoLocationChanged: function () {
        A.getStoreData(m);
        let t = A.getStoreData(l),
          e = A.getStoreData(d);
        navigator.geolocation.getCurrentPosition((i) => {
          let r = i.coords.latitude,
            s = i.coords.longitude,
            o = i.coords.accuracy;
          if (
            (A.storeData(m, "A"),
            t && e && null != t && null != e && "null" != t && "null" != e)
          ) {
            if (t && e && r && s) {
              C(t, e, r, s) > 500 &&
                (n.debug(
                  "Geo Location Changed morethan 500 mtr, Hence Raising Registration"
                ),
                T.dirtyChk || T.triggerReg());
            }
          } else
            A.storeData(l, r),
              A.storeData(d, s),
              A.storeData(h, o),
              this.triggerReg();
        });
      },
      getConfigData: function () {
        if (!this.initialized()) {
          var t = this.getStoreData(a);
          t && (this.configData = O(t));
        }
        return this.configData;
      },
      setConfigData: function (t) {
        this.storeData(a, w(t));
      },
      register: async function () {
        await this.isSWRegistered(),
          this.validate() &&
            (this.setConfigData(this.getConfigData()),
            this.dirty(),
            n.debug("calling register function"),
            this.registerServiceWorker());
      },
      requestNotificationPermission: async function () {
        return await window.Notification.requestPermission();
      },
      isWebSiteRegistered: function () {
        return !!this.getStoreData(g);
      },
      getNotificationPermission: function () {
        return Notification.permission;
      },
      isNotificationPermGranted: function () {
        return "granted" === this.getNotificationPermission();
      },
      isNotificationPermDenied: function () {
        return "denied" === this.getNotificationPermission();
      },
      isNotificationPermNotRequested: function () {
        return "default" === this.getNotificationPermission();
      },
      getOptInOptOutStatus: function () {
        return this.isNotificationPermGranted()
          ? "I"
          : (this.isNotificationPermDenied(), "O");
      },
      isSWRegistered: async function () {
        var t = await T.serviceWorkerLocation()
          .then((t) => t)
          .catch((t) => T.swLocation);
        return await navigator.serviceWorker.getRegistrations().then((e) => {
          try {
            var r = !1;
            if (e.length > 0)
              for (i = 0; i < e.length; i++)
                if (-1 != e[i].active.scriptURL.indexOf(t)) {
                  (T.isSwAlreadyRegistered = !0), (r = !0);
                  break;
                }
          } catch (t) {
            n.error("Error while getting existing registrations");
          }
          return r;
        });
      },
      unregisterServiceWorker: async function () {
        "serviceWorker" in navigator &&
          navigator.serviceWorker
            .getRegistrations()
            .then(function (t) {
              if (t.length > 0)
                for (i = 0; i < t.length; i++)
                  if (t[i].scope.indexOf(window.location.origin) > -1) {
                    t[i].pushManager
                      .getSubscription()
                      .then((t) => {
                        t && t.unsubscribe();
                      })
                      .catch((t) => {
                        n.error("Error while unsbscribing" + t.message);
                      }),
                      t[i].unregister();
                    break;
                  }
            })
            .catch((t) => {
              n.error("Error while unregister service worker" + t.message);
            });
      },
      registerServiceWorker: async function () {
        (this.isNotificationPermNotRequested() ||
          this.isNotificationPermGranted()) &&
          (await this.requestNotificationPermission(),
          this.isNotificationPermGranted() &&
            (await this.serviceWorkerLocation()
              .then((t) => {
                navigator.serviceWorker
                  .register(t)
                  .then(function (t) {
                    var e;
                    n.debug("Registering Service Worker"),
                      t.installing
                        ? (e = t.installing)
                        : t.waiting
                        ? (e = t.waiting)
                        : t.active && (e = t.active),
                      e &&
                        ("activated" == e.state && T.subscribeUser(t),
                        e.addEventListener("statechange", function (e) {
                          "activated" == e.target.state && T.subscribeUser(t);
                        }));
                  })
                  .catch((t) => {
                    n.error(t.message);
                  });
              })
              .catch((t) => {
                n.error(t.message);
              })));
      },
      checkSubscriptionAndSendRegistration: function (t) {
        var e = this.getSubscription();
        this.subscriptionChanged(t, e);
      },
      subscriptionChanged: function (t, e) {
        var i = w(t);
        n.debug("persistedSubscription::" + e),
          n.debug("subscription::" + i),
          (this.dirtyChk || e != i) &&
            (n.debug(
              "Subscription Token changed Hence raising Registration Event"
            ),
            this.setSubscription(t),
            this.populateAndSendReg());
      },
      setSubscription: function (t) {
        var e = w(t);
        (this.subscription = e), this.storeData(r, e), this.storeData(r, e, D);
      },
      getSubscription: function () {
        return this.subscription ? this.subscription : this.getStoreData(r);
      },
      storeData: function (t, e, i = v) {
        return A.storeData(t, e, i);
      },
      getStoreData: function (t, e = v) {
        return A.getStoreData(t, e);
      },
      removeStoreData: function (t, e = v) {
        return A.removeStoreData(t, e);
      },
      unRegister: function () {
        var t = this.getStoreData(o);
        try {
          t &&
            (this.sendRequest(this.getBaseRequestPath() + "/dereg", t),
            this.cleanUp());
        } catch (t) {
          n.error("Error in unRegister");
        }
      },
      cleanUp: function () {
        try {
          A.clear(v), A.clear(D), this.unregisterServiceWorker();
        } catch (t) {
          n.error("Error in unRegister");
        }
      },
      getVisitorId: function () {
        return this.generateVistorId(!1);
      },
      generateVistorId: function (t) {
        var e = this.getStoreData(s);
        return (
          (!t && e) || ((e = I()), A.storeData(s, e), A.storeData(s, e, D)), e
        );
      },
      getAPIKey: function () {
        var t = this.getConfigData();
        return t ? t.apiKey : null;
      },
      getSubscriptionEndPoint: function () {
        var t = this.getSubscription();
        return t ? O(t).endpoint : null;
      },
      getSubscriptionAuth: function () {
        var t = this.getSubscription();
        return t ? O(t).keys.auth : null;
      },
      getSubscriptionP256: function () {
        var t = this.getSubscription();
        return t ? O(t).keys.p256dh : null;
      },
      validateAndStorRegData: function (t) {
        t &&
          ((t = this.removeSensitiveDataFrmReg(t)), this.persistRegStrData(t));
      },
      persistRegStrData: function (t) {
        A.storeData(o, t), A.storeData(o, t, D);
      },
      removeSensitiveDataFrmReg: function (t) {
        if (t && "string" == typeof t) {
          let e = O(t);
          delete e.usrid, delete e.edti, (t = w(e));
        }
        return t;
      },
      getGeoPermissionStatus: async function () {
        if (((T.geoPermStatus = "X"), navigator.geolocation))
          if (((T.geoPermStatus = "U"), navigator.permissions)) {
            var t = await navigator.permissions.query({ name: "geolocation" });
            n.debug("Geo Permission status" + t.state),
              "granted" == t.state
                ? navigator.geolocation.getCurrentPosition(
                    T.getGeoPosition,
                    T.getGeoPermError
                  )
                : "denied" === t.state &&
                  ((T.geoPermStatus = "D"),
                  (e.lat = null),
                  (e.lon = null),
                  (e.accuracy = null));
          } else
            navigator.geolocation.getCurrentPosition(
              T.getGeoPosition,
              T.getGeoPermError
            );
      },
      getGeoPosition: async function (t) {
        t &&
          ((T.geoPermStatus = "A"),
          (T.latPos = t.coords.latitude),
          (T.longPos = t.coords.longitude),
          (T.acc = t.coords.accuracy));
      },
      storeGeoLocation: function () {
        A.storeData(l, e.lat),
          A.storeData(d, e.lon),
          A.storeData(h, e.accuracy),
          A.storeData(m, e.lp);
      },
      getGeoPermError: async function (t) {
        if (t)
          switch (t.code) {
            case t.PERMISSION_DENIED:
              T.geoPermStatus = "D";
              break;
            case t.POSITION_UNAVAILABLE:
            case t.PERMISSION_DENIED_TIMEOUT:
              T.geoPermStatus = "E";
          }
        (e.lat = null), (e.lon = null), (e.accuracy = null);
      },
      populateRegData: async function () {
        var t = this.getConfigData();
        if (!t) throw new Error("WebPush SDK not initialized");
        (e.pmr = this.getOptInOptOutStatus()),
          (e.appId = t.appId),
          (e.apikey = t.apiKey),
          (e.vid = this.getVisitorId()),
          (e.subtkn = this.getSubscriptionEndPoint()),
          (e.subauth = this.getSubscriptionAuth()),
          (e.subp256 = this.getSubscriptionP256()),
          (e.ts = new Date().getTime()),
          (e.appver = t.appver),
          (e.ver = "1.0.3"),
          (e.pt = "standard"),
          (e.uagnt = navigator.userAgent),
          (e.sw = screen.width),
          (e.sh = screen.height),
          (e.sdensity = window.devicePixelRatio),
          (e.lp = null),
          (e.lat = null),
          T.latPos,
          (e.lon = null),
          T.longPos,
          (e.accuracy = null),
          T.acc,
          (e.locale = navigator.language),
          (e.tz = Intl.DateTimeFormat().resolvedOptions().timeZone),
          this.storeGeoLocation();
      },
      urlB64ToUint8Array: function (t) {
        const e = (t + "=".repeat((4 - (t.length % 4)) % 4))
            .replace(/\-/g, "+")
            .replace(/_/g, "/"),
          i = atob(e),
          n = new Uint8Array(i.length);
        for (let t = 0; t < i.length; t++) n[t] = i.charCodeAt(t);
        return n;
      },
      getRegistrationEndPoint: function () {
        return this.getBaseRequestPath() + "/reg";
      },
      populateAndSendReg: async function () {
        await this.populateRegData(),
          this.isUsrIdUpdated && (e.usrid = this.locUsrid),
          this.isEdtiUpdated && (e.edti = this.locEdtiId);
        let t = e;
        "string" != typeof e && (t = w(e)),
          this.sendRegistration(this.getRegistrationEndPoint(), t),
          A.storeData(c, Notification.permission);
      },
      subscribeUser: function (t) {
        n.debug("subscribing user");
        const e = {
          applicationServerKey: this.urlB64ToUint8Array(
            this.getConfigData().appserviceKey
          ),
          userVisibleOnly: !0,
        };
        t.pushManager
          .subscribe(e)
          .then(function (t) {
            n.debug("Subscription Object" + w(t)),
              T.checkSubscriptionAndSendRegistration(t);
          })
          .catch(function (t) {
            n.error(t.message);
          });
      },
      getApiHost: function () {
        let t = this.getConfigData(),
          e = null;
        return (
          t && t.apiHost
            ? (e = t.apiHost)
            : ((jsonConfig = O(t)), (e = jsonConfig.apiHost)),
          e && e.endsWith("/") && (e = e.substring(0, e.length - 1)),
          e
        );
      },
      getBaseRequestPath: function () {
        let t = this.getConfigData();
        var e = "",
          i = "";
        t && t.accountToken
          ? ((e = t.accountToken), (i = t.apiKey))
          : ((jsonConfig = O(t)),
            (e = jsonConfig.accountToken),
            (i = jsonConfig.apiKey));
        let n = this.getApiHost();
        return (
          n && n.endsWith("/") && (n = n.substring(0, n.length - 1)),
          n + "/webpushlistener/wpl/v3/signal/" + e + "/" + i
        );
      },
      sendRegistration: async function (t, e) {
        this.validateAndStorRegData(e);
        return (
          this.sendRequest(t, e)
            .then((t) => {
              t
                ? (A.storeData(u, new Date().getTime()),
                  A.storeData(g, !0),
                  A.storeData(E, !1),
                  this.isUsrIdUpdated && (this.isUsrIdUpdated = !1),
                  this.isEdtiUpdated && (this.isEdtiUpdated = !1))
                : A.storeData(E, !0),
                T.doCleanUp && T.cleanUp(),
                (T.dirtyChk = !1),
                (T.doCleanUp = !1);
            })
            .catch((t) => {
              n.error("Error while sending Registration");
            }),
          null
        );
      },
      sendRequest: async function (t, e) {
        if (!e) return;
        let i = !1;
        const r = t;
        n.debug("Data is sending to ::" + r);
        try {
          await fetch(r, {
            method: "post",
            mode: "no-cors",
            headers: { "Content-Type": "application/json" },
            body: e,
          }),
            (i = !0);
        } catch (t) {
          i = !1;
        }
        return (this.dirtyChk = !1), i;
      },
      getRemoteData: function (t) {
        try {
          var e = new XMLHttpRequest();
          return e.open("GET", t, !1), e.send(null), e.responseText;
        } catch (e) {
          console.log("Error fetching data" + t, e);
        }
        return null;
      },
    },
    N = {
      CONVERSION_TYPE: { PURCHASE: "PURCHASE", OTHERS: "OTHERS" },
      init: function (t) {
        T.init(t);
      },
      setEdti: function (t) {
        T.setEdti(t);
      },
      resetEdti: function () {
        T.resetEdti();
      },
      getEdti: function () {
        return T.getEdti();
      },
      setUserId: function (t) {
        T.setUserId(t);
      },
      resetUserId: function () {
        T.resetUserId();
      },
      getUserId: function () {
        return T.getUserId();
      },
      setAppversion: function (t) {
        T.setAppversion(t);
      },
      enableAnalytics: function (t) {
        T.enableAnalytics(t);
      },
      isAnalyticsEnabled: function () {
        return T.isAnalyticsEnabled();
      },
      getEngagementContext: function () {
        return T.getEngagementContext();
      },
      resetEngagementContext: function () {
        T.resetEngagementContext();
      },
      raiseConversionEvent: function (t, e = null, i = !1) {
        T.raiseConversionEvent(t, e, i);
      },
      raisePurchaseEvent: function (t, e = !1) {
        T.raisePurchaseEvent(t, e);
      },
      register: function () {
        T.register();
      },
      getNotificationPermission: function () {
        return T.getNotificationPermission();
      },
      getOptInOptOutStatus: function () {
        return T.getOptInOptOutStatus();
      },
      unRegister: function () {
        T.unRegister();
      },
      getVisitorId: function () {
        return T.getVisitorId();
      },
      getStoreData: function (t, e = v) {
        return T.getStoreData(t, e);
      },
      getAPIKey: function () {
        return T.getAPIKey();
      },
      setLogDebugLevel: function () {
        T.setLogLevel(T.LOG_LEVEL.DEBUG);
      },
      setLogInfoLevel: function () {
        T.setLogLevel(T.LOG_LEVEL.INFO);
      },
      setLogERRORLevel: function () {
        T.setLogLevel(T.LOG_LEVEL.ERROR);
      },
    };
  if (t.webPushManager)
    throw new Error("WebPushManager has already been defined");
  t.webPushManagerAPI = N;
})(void 0 === typeof window ? this : window),
  (function () {
    let t = document.getElementById("rsyswpsdk").getAttribute("wpconfig");
    webPushManagerAPI.init(t);
  })();
