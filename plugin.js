!function(global, factory) {
  if (typeof exports === "object" && typeof module === "object")
    module.exports = factory(
      require("ng.common"),
      require("tslib"),
      require("ng.forms"),
      require("ngx-translate.core"),
      require("wako-app.mobile-sdk"),
      require("ng.core"),
      require("ionic.angular")
    );
  else if (typeof define === "function" && define.amd)
    define([
      "ng.common", "tslib", "ng.forms", "ngx-translate.core",
      "wako-app.mobile-sdk", "ng.core", "ionic.angular"
    ], factory);
  else if (typeof exports === "object")
    exports.plugin = factory(
      require("ng.common"),
      require("tslib"),
      require("ng.forms"),
      require("ngx-translate.core"),
      require("wako-app.mobile-sdk"),
      require("ng.core"),
      require("ionic.angular")
    );
  else
    global.plugin = factory(
      global["ng.common"],
      global.tslib,
      global["ng.forms"],
      global["ngx-translate.core"],
      global["wako-app.mobile-sdk"],
      global["ng.core"],
      global["ionic.angular"]
    );
}(typeof self !== "undefined" ? self : this, function(CommonModule, tslib, FormsModule, TranslateModule, WakoSdk, ngCore, IonicModule) {
  "use strict";

  function CombinedPluginService(translate) {
    this.translate = translate;
  }

  CombinedPluginService.prototype.initialize = function() {
    var originalRequest = WakoSdk.WakoBaseHttpService.request;
    WakoSdk.WakoBaseHttpService.request = function(request, ...args) {
      if (request.url.includes("https://api.themoviedb.org/3") && !request.url.includes("include_adult")) {
        request.url += (request.url.includes("?") ? "&" : "?") + "include_adult=true";
      }
      return originalRequest.call(this, request, ...args);
    };
    WakoSdk.wakoLog("plugin initialized");
  };

  CombinedPluginService.prototype.afterInstall = function() {
    WakoSdk.wakoLog("plugin installed");
  };

  CombinedPluginService.prototype.afterUpdate = function() {
    WakoSdk.wakoLog("plugin updated");
  };

  CombinedPluginService.prototype.setTranslation = function(lang, translation) {
    this.translate.setDefaultLang(lang);
    this.translate.use(lang);
    this.translate.setTranslation(lang, translation);
  };

  // Define PluginModule
  function PluginModule() {}
  PluginModule.pluginService = CombinedPluginService;

  return PluginModule;
});
