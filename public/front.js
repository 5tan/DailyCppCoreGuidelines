var front = function() {

  function getUrlVars() {
    var vars = {};
    var parts = window.location.href.replace(/[?&]+([^=&]+)=([^&]*)/gi, function(m, key, value) {
      vars[key] = value;
    });
    return vars;
  }

  function getUrlParam(parameter, defaultvalue) {
    var urlparameter = defaultvalue;
    if (window.location.href.indexOf(parameter + "=") > -1) {
      urlparameter = getUrlVars()[parameter];
    }
    return urlparameter;
  }

  this.GetUnixDay = function() {
    return Math.floor((new Date()).getTime() /
      1000 / // to sec
      60 / // to min
      60 / // to hr
      24 // to days
    );
  }

  this.TodaysGuideline = function() {
    return Math.floor(GetUnixDay() % g_guidelines.length);
  }

  this.Update = function() {
    document.getElementById("current_guideline").innerHTML = this.current_guideline;
    document.getElementById("todays_guideline").innerHTML = TodaysGuideline();
    document.getElementById("guidelines_total").innerHTML = g_guidelines.length;
    document.getElementById("nav_today").href = "?guideline=" + TodaysGuideline();
    document.getElementById("nav_next").href = "?guideline=" + ((Number(this.current_guideline) + 1) % g_guidelines.length);
    document.getElementById("nav_random").href = "?guideline=" + Math.floor(Math.random() * g_guidelines.length);
    var prev = (Number(this.current_guideline) - 1) % g_guidelines.length;
    if (prev < 0) prev += g_guidelines.length
    document.getElementById("nav_prev").href = "?guideline=" + prev;

    document.getElementById("date").innerHTML = g_date;
    document.getElementById("commit").innerHTML = g_commit;
    document.getElementById("commit").href = "https://github.com/isocpp/CppCoreGuidelines/commit/" + g_commit;

    document.getElementById("guideline").innerHTML = (new showdown.Converter()).makeHtml(g_guidelines[this.current_guideline]);
  }


  this.current_guideline = Number(getUrlParam("guideline", TodaysGuideline())) % g_guidelines.length;

  Update();
  hljs.initHighlightingOnLoad();
}();
