(function () {
  "use strict";

  var TABS = ["about", "writing", "photos"];
  var WORDS_PER_MINUTE = 200;

  var tabButtons = document.querySelectorAll(".tab");
  var panels = document.querySelectorAll(".panel");
  var writingList = document.getElementById("writing-list");
  var articleView = document.getElementById("article-view");
  var articleContent = document.getElementById("article-content");
  var photoGrid = document.getElementById("photo-grid");

  /* ---------------- bunny cursor ---------------- */

  function initBunnyCursor() {
    if (!window.matchMedia("(pointer: fine)").matches) return;

    var root = document.documentElement;
    var bunny = document.createElement("span");
    bunny.className = "bunny-cursor";
    bunny.setAttribute("aria-hidden", "true");
    bunny.textContent = "🐇";
    document.body.appendChild(bunny);

    var interactiveCursorTargets =
      "button, a, input, select, textarea, [role='button']";

    function hideBunny() {
      bunny.classList.remove("visible");
      root.classList.remove("bunny-cursor-active");
    }

    document.addEventListener("pointermove", function (event) {
      if (event.pointerType !== "mouse") return;

      var overInteractive = event.target.closest(interactiveCursorTargets);
      var overCard = event.target.closest(".content-card");
      var overArticleClose = event.target.closest("#article-close");
      var cursorEmoji = "🐇";
      if (overCard) cursorEmoji = null;
      if (overInteractive) cursorEmoji = "🕳️";
      if (overArticleClose) cursorEmoji = null;
      var showCursor = Boolean(cursorEmoji);

      bunny.classList.toggle("visible", showCursor);
      root.classList.toggle("bunny-cursor-active", showCursor);

      if (showCursor) {
        bunny.textContent = cursorEmoji;
        bunny.style.setProperty("--bunny-x", event.clientX + "px");
        bunny.style.setProperty("--bunny-y", event.clientY + "px");
      }
    });

    document.addEventListener("pointerout", function (event) {
      if (!event.relatedTarget) hideBunny();
    });
    window.addEventListener("blur", hideBunny);
  }

  initBunnyCursor();

  /* ---------------- theme ---------------- */

  document.getElementById("theme-toggle").addEventListener("click", function () {
    var next =
      document.documentElement.dataset.theme === "dark" ? "light" : "dark";
    document.documentElement.dataset.theme = next;
    try {
      localStorage.setItem("theme", next);
    } catch (e) {}
  });

  /* ---------------- tabs ---------------- */

  function setTab(name, updateHash) {
    if (TABS.indexOf(name) === -1) name = "about";
    tabButtons.forEach(function (btn) {
      btn.classList.toggle("active", btn.dataset.tab === name);
    });
    panels.forEach(function (panel) {
      panel.hidden = panel.dataset.panel !== name;
    });
    closeArticle(false);
    if (updateHash) {
      history.replaceState(null, "", "#" + name);
    }
  }

  tabButtons.forEach(function (btn) {
    btn.addEventListener("click", function () {
      setTab(btn.dataset.tab, true);
      window.scrollTo({ top: 0 });
    });
  });

  document.getElementById("site-name").addEventListener("click", function () {
    setTab("about", true);
    window.scrollTo({ top: 0 });
  });

  /* ---------------- writing ---------------- */

  var posts = window.POSTS || [];

  function blockText(block) {
    if (typeof block === "string") return block;
    if (!block || typeof block !== "object") return "";
    if (Array.isArray(block.items)) return block.items.join(" ");
    return block.text || "";
  }

  function postText(post) {
    return (post.body || []).map(blockText).join(" ");
  }

  function readMinutes(post) {
    var words = postText(post).split(/\s+/).filter(Boolean).length;
    return Math.max(1, Math.round(words / WORDS_PER_MINUTE));
  }

  function formatDate(iso) {
    var d = new Date(iso + "T00:00:00");
    return d.toLocaleDateString("en-US", {
      year: "numeric",
      month: "long",
      day: "numeric",
    });
  }

  function el(tag, className, text) {
    var node = document.createElement(tag);
    if (className) node.className = className;
    if (text) node.textContent = text;
    return node;
  }

  function appendArticleBlock(container, block) {
    if (typeof block === "string") {
      container.appendChild(el("p", null, block));
      return;
    }

    if (!block || typeof block !== "object") return;

    if (block.type === "heading") {
      container.appendChild(el("h2", "article-section-title", block.text));
      return;
    }

    if (block.type === "list" && Array.isArray(block.items)) {
      var list = el("ul", "article-list");
      block.items.forEach(function (item) {
        list.appendChild(el("li", null, item));
      });
      container.appendChild(list);
      return;
    }

    container.appendChild(el("p", null, block.text || ""));
  }

  function renderList() {
    writingList.textContent = "";
    posts.forEach(function (post, index) {
      var row = el("button", "writing-row");
      row.type = "button";

      var top = el("div", "writing-row-top");
      top.appendChild(el("span", "writing-row-title", post.title));
      top.appendChild(el("span", "writing-row-date", formatDate(post.date)));
      row.appendChild(top);

      row.appendChild(el("p", "writing-row-teaser", post.teaser));

      var meta = el("div", "writing-row-meta");
      meta.appendChild(el("span", "post-dot"));
      meta.appendChild(
        el("span", null, readMinutes(post) + " min read")
      );
      row.appendChild(meta);

      row.addEventListener("click", function () {
        openArticle(index);
      });
      writingList.appendChild(row);
    });
  }

  function openArticle(index) {
    var post = posts[index];
    if (!post) return;

    articleContent.textContent = "";

    var header = el("header", "article-header");
    var meta = el("div", "article-meta");
    meta.appendChild(el("span", "post-dot"));
    meta.appendChild(
      el("span", null, formatDate(post.date) + " · " + readMinutes(post) + " min read")
    );
    header.appendChild(meta);
    header.appendChild(el("h1", "article-title", post.title));
    articleContent.appendChild(header);

    articleContent.appendChild(el("hr", "article-divider"));

    var body = el("div", "article-body");
    post.body.forEach(function (block) {
      appendArticleBlock(body, block);
    });
    articleContent.appendChild(body);

    writingList.hidden = true;
    articleView.hidden = false;
    document.body.classList.add("reading");
    window.scrollTo({ top: 0 });
  }

  function closeArticle(scroll) {
    if (articleView.hidden) return;
    articleView.hidden = true;
    writingList.hidden = false;
    document.body.classList.remove("reading");
    if (scroll) window.scrollTo({ top: 0 });
  }

  document
    .getElementById("article-close")
    .addEventListener("click", function () {
      closeArticle(true);
    });

  document
    .getElementById("article-back")
    .addEventListener("click", function (event) {
      event.preventDefault();
      closeArticle(true);
    });

  document.addEventListener("keydown", function (event) {
    if (event.key === "Escape") closeArticle(false);
  });

  /* ---------------- photos ---------------- */

  var photosLoaded = false;

  function loadPhotos() {
    if (photosLoaded) return;
    photosLoaded = true;
    fetch("Photos/manifest.json")
      .then(function (response) {
        if (!response.ok) throw new Error("manifest missing");
        return response.json();
      })
      .then(function (files) {
        if (!files.length) throw new Error("no photos");
        files.forEach(function (file) {
          var img = document.createElement("img");
          img.src = "Photos/" + file;
          img.alt = file.replace(/\.[^.]+$/, "").replace(/[_-]+/g, " ");
          img.loading = "lazy";
          photoGrid.appendChild(img);
        });
      })
      .catch(function () {
        photoGrid.appendChild(
          el("p", "photo-grid-empty", "No photos yet — check back soon.")
        );
      });
  }

  document
    .querySelector('[data-tab="photos"]')
    .addEventListener("click", loadPhotos);

  /* ---------------- init ---------------- */

  var initial = location.hash.replace("#", "");
  setTab(initial, false);
  if (initial === "photos") loadPhotos();
  renderList();
})();
