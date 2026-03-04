(function () {
  var namespace = "robot-learning-cookbook";
  var key = "site-views";
  var apiUrl = "https://api.countapi.xyz/hit/" + namespace + "/" + key;

  function showCount(value) {
    var el = document.getElementById("site-view-counter");
    if (el) el.textContent = value.toLocaleString();
  }

  function init() {
    var footer = document.querySelector(".md-footer");
    if (!footer) return;
    var counter = document.createElement("div");
    counter.id = "site-view-counter";
    counter.setAttribute("aria-label", "Total page views");
    counter.style.cssText =
      "text-align:center;padding:0.4em 0.8em;font-size:0.85rem;color:var(--md-default-fg-color--light, #666);";
    counter.textContent = "…";
    footer.appendChild(counter);

    fetch(apiUrl)
      .then(function (r) {
        return r.json();
      })
      .then(function (data) {
        if (data && typeof data.value === "number") showCount(data.value);
      })
      .catch(function () {
        counter.textContent = "";
      });
  }

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", init);
  } else {
    init();
  }
})();
