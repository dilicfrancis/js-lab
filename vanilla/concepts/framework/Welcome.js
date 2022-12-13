(function (global, jquery) {
  var Welcome = function (fname, lname, lang) {
    return new Welcome.default(fname, lname, lang);
  };
  var langs = ["en", "es"];
  var openings = {
    en: "Hi",
    es: "Hola",
  };
  var formalOpenings = {
    en: "Hello",
    es: "Saludos",
  };

  var logMsg = {
    en: "Logged In",
    es: "Inicio Sesion",
  };
  Welcome.prototype = {
    name: function () {
      return this.fname + " " + this.lname;
    },
    availableLang: function () {
      if (langs.indexOf(this.lang) === -1) {
        throw "Language Not Supported:(";
      }
    },
    display: function () {
      return openings[this.lang] + " " + this.fname + "!";
    },
    fmlDisplay: function () {
      return formalOpenings[this.lang] + ", " + this.name();
    },
    salute: function (official) {
      var message;
      if (official) {
        message = this.fmlDisplay();
      } else {
        message = this.display();
      }
      if (console) {
        console.log(message);
      }
      return this;
    },
    log: function () {
      if (console) {
        console.log(logMsg[this.lang] + ": " + this.name());
      }
      return this;
    },
    setLang: function (newLang) {
      this.lang = newLang;
      this.availableLang();
      return this;
    },
    htmlSalute: function (selector, official) {
      if (!$) {
        throw "JQuery not present";
      }
      if (!selector) {
        throw "Missing JQuery selector";
      }
      var message;
      if (official) {
        message = this.fmlDisplay();
      } else {
        message = this.display();
      }
      $(selector).html(message);

      return this;
    },
  };
  Welcome.default = function (fname, lname, lang) {
    var _this = this;
    _this.fname = fname || "John";
    _this.lname = lname || "Doe";
    _this.lang = lang || "en";
    _this.availableLang();
  };
  Welcome.default.prototype = Welcome.prototype;
  global.Welcome = global.W$ = Welcome;
})(window, $);
