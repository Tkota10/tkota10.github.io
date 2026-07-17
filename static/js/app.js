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
      if (event.target.closest(".lightbox")) cursorEmoji = null;
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
    var raw = "";
    if (typeof block === "string") {
      raw = block;
    } else if (block && typeof block === "object") {
      if (Array.isArray(block.items)) raw = block.items.join(" ");
      else if (Array.isArray(block.text)) raw = block.text.join(" ");
      else raw = block.text || block.caption || "";
    }
    return raw.replace(/<[^>]+>/g, " ");
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

  // Like el(), but the content is trusted HTML from posts.js (inline
  // formatting: <strong>, <em>, <a>, <sup>, <code>, <br>).
  function elHTML(tag, className, html) {
    var node = document.createElement(tag);
    if (className) node.className = className;
    if (html) node.innerHTML = html;
    return node;
  }

  function appendArticleBlock(container, block) {
    if (typeof block === "string") {
      container.appendChild(elHTML("p", null, block));
      return;
    }

    if (!block || typeof block !== "object") return;

    if (block.type === "heading") {
      container.appendChild(elHTML("h2", "article-section-title", block.text));
      return;
    }

    if (block.type === "list" && Array.isArray(block.items)) {
      var list = elHTML(block.ordered ? "ol" : "ul", "article-list");
      block.items.forEach(function (item) {
        list.appendChild(elHTML("li", null, item));
      });
      container.appendChild(list);
      return;
    }

    if (block.type === "quote") {
      var quote = el("blockquote", "article-quote");
      var texts = Array.isArray(block.text) ? block.text : [block.text];
      texts.forEach(function (t) {
        quote.appendChild(elHTML("p", null, t));
      });
      container.appendChild(quote);
      return;
    }

    if (block.type === "image") {
      var figure = el("figure", "article-figure");
      var img = document.createElement("img");
      img.src = block.src;
      img.alt = block.alt || "";
      img.loading = "lazy";
      figure.appendChild(img);
      if (block.caption) {
        figure.appendChild(elHTML("figcaption", null, block.caption));
      }
      container.appendChild(figure);
      return;
    }

    if (block.type === "footnotes" && Array.isArray(block.items)) {
      var wrap = el("aside", "article-footnotes");
      var notes = document.createElement("ol");
      block.items.forEach(function (item) {
        notes.appendChild(elHTML("li", null, item));
      });
      wrap.appendChild(notes);
      container.appendChild(wrap);
      return;
    }

    container.appendChild(elHTML("p", null, block.text || ""));
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
    if (lightbox && !lightbox.hidden) {
      if (event.key === "Escape") closeLightbox();
      if (event.key === "ArrowLeft") stepLightbox(-1);
      if (event.key === "ArrowRight") stepLightbox(1);
      return;
    }
    if (event.key === "Escape") closeArticle(false);
  });

  /* ---------------- photos ---------------- */

  var photosLoaded = false;
  var photoFiles = [];
  var lightbox = null;
  var lightboxImg = null;
  var lightboxIndex = 0;

  function ensureLightbox() {
    if (lightbox) return;
    lightbox = el("div", "lightbox");
    lightbox.hidden = true;
    lightboxImg = document.createElement("img");
    lightbox.appendChild(lightboxImg);

    // Tap/click closes, but a horizontal swipe steps between photos
    // instead (the swipe's trailing click must not close the lightbox).
    var touchStartX = 0;
    var touchStartY = 0;
    var swiped = false;

    lightbox.addEventListener(
      "touchstart",
      function (event) {
        swiped = false;
        touchStartX = event.touches[0].clientX;
        touchStartY = event.touches[0].clientY;
      },
      { passive: true }
    );

    lightbox.addEventListener(
      "touchend",
      function (event) {
        var dx = event.changedTouches[0].clientX - touchStartX;
        var dy = event.changedTouches[0].clientY - touchStartY;
        if (Math.abs(dx) > 45 && Math.abs(dx) > Math.abs(dy)) {
          swiped = true;
          stepLightbox(dx < 0 ? 1 : -1);
        }
      },
      { passive: true }
    );

    lightbox.addEventListener("click", function () {
      if (swiped) {
        swiped = false;
        return;
      }
      closeLightbox();
    });

    document.body.appendChild(lightbox);
  }

  function showLightboxPhoto(index) {
    lightboxIndex = index;
    var file = photoFiles[index];
    lightboxImg.src = "Photos/" + file;
    lightboxImg.alt = file.replace(/\.[^.]+$/, "").replace(/[_-]+/g, " ");
  }

  function openLightbox(index) {
    ensureLightbox();
    showLightboxPhoto(index);
    lightbox.hidden = false;
    document.body.classList.add("lightbox-open");
  }

  function closeLightbox() {
    if (!lightbox || lightbox.hidden) return;
    lightbox.hidden = true;
    document.body.classList.remove("lightbox-open");
  }

  function stepLightbox(delta) {
    var next = (lightboxIndex + delta + photoFiles.length) % photoFiles.length;
    showLightboxPhoto(next);
  }

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
        photoFiles = files;
        files.forEach(function (file, index) {
          var img = document.createElement("img");
          img.src = "Photos/" + file;
          img.alt = file.replace(/\.[^.]+$/, "").replace(/[_-]+/g, " ");
          img.loading = "lazy";
          img.addEventListener("click", function () {
            openLightbox(index);
          });
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
