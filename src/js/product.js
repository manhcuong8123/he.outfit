document.addEventListener("DOMContentLoaded", () => {
  const saveButton = document.getElementById("saveButton");
  const popup = document.getElementById("notificationPopup");

  if (saveButton && popup) {
    saveButton.addEventListener("click", () => {
      popup.classList.remove("hidden");
      setTimeout(() => popup.classList.add("hidden"), 5000);
    });
  }
});
(function () {
  const raw = localStorage.getItem("items");
  const items = raw ? JSON.parse(raw) : [];

  const params = new URLSearchParams(location.search);
  const id = Number(params.get("id"));

  const product = items.find((x) => Number(x.stt) === id);

  function renderList(targetId, data) {
    const el = document.getElementById(targetId);
    if (!el) return;
    el.innerHTML = ""; 
    if (!data || (Array.isArray(data) && data.length === 0)) {
      const details = el.closest("details") || el.closest("#" + targetId);
      if (details) details.classList.add("hidden");
      return;
    }
    const arr = Array.isArray(data) ? data : [data];
    arr.forEach((entry) => {
      let url = "", label = "";
      if (typeof entry === "string") {
        url = label = entry;
      } else {
        url = entry.url;
        label = entry.label || entry.title || entry.url;
      }

     
      const a = document.createElement("a");
      a.href = url;
      a.target = "_blank";  
      a.className = "block hover:no-underline"; 

      const li = document.createElement("li");
      li.className = "py-2";
      li.appendChild(a);
      a.textContent = label;
      el.appendChild(li);
    });
  }

  if (!product) {
    const main = document.querySelector("main");
    main.insertAdjacentHTML(
      "afterbegin",
      '<div class="bg-white p-6 rounded-xl shadow-md mb-6 text-red-500">Không tìm thấy sản phẩm!</div>'
    );
    return;
  }

  // Render title và ảnh sản phẩm
  const titleEl = document.getElementById("prodTitle");
  if (titleEl) titleEl.textContent = `#${product.stt} ${product.title || ""}`;

  const hero = document.getElementById("heroImage");
  if (hero) {
    hero.src = product.mainImage;
    hero.alt = `Outfit #${product.stt}`;
  }

  const sourceLink = document.getElementById("sourceLink");
  if (sourceLink) {
    if (product.links?.source) {
      sourceLink.href = product.links.source;
      sourceLink.target = "_blank";
    } else {
      sourceLink.classList.add("hidden");
    }
  }
  const linkbag = document.getElementById("linkbag");
  if (linkbag) {
    if (product.links?.bag) {
      linkbag.href = product.links.bag;
      linkbag.target = "_blank";
    } else {
      linkbag.classList.add("hidden");
    }
  }
    const linkshose = document.getElementById("linkshose");
  if (linkshose) {
    if (product.links?.shoes) {
      linkshose.href = product.links.shoes;
      linkshose.target = "_blank";
    } else {
      linkshose.classList.add("hidden");
    }
  }
      const linkpaint = document.getElementById("linkpaint");
  if (linkpaint) {
    if (product.links?.pants) {
      linkpaint.href = product.links.pants;
      linkpaint.target = "_blank";
    } else {
      linkpaint.classList.add("hidden");
    }
  }
        const linkshirt = document.getElementById("linkshirt");
  if (linkshirt) {
    if (product.links?.shirt) {
      linkshirt.href = product.links.shirt;
      linkshirt.target = "_blank";
    } else {
      linkshirt.classList.add("hidden");
    }
  }
  renderList("listShirt", product.links?.shirt); 
  renderList("listPants", product.links?.pants); 
  renderList("listScarf", product.links?.scarf); 
  renderList("listShoes", product.links?.shoes); 
  renderList("listBag", product.links?.bag);
  renderList("listSource", product.links?.source);

  // const gridAlt = document.getElementById("gridAltPants");
  // if (gridAlt) {
  //   gridAlt.innerHTML = ""; 
  //   const alt = product.links?.alt_pants || [];
  //   (Array.isArray(alt) ? alt : []).forEach((entry) => {
  //     let url = "",
  //       label = "";
  //     if (typeof entry === "string") {
  //       url = label = entry;
  //     } else {
  //       url = entry.url;
  //       label = entry.label || entry.title || entry.url;
  //     }

  //     const a = document.createElement("a");
  //     a.href = url;
  //     a.target = "_blank";
  //     a.className =
  //       "rounded-lg border border-neutral-200 p-3 hover:bg-neutral-50 break-all";
  //     a.textContent = label;
  //     gridAlt.appendChild(a);
  //   });
  //   if (!alt.length) gridAlt.closest("details").classList.add("hidden");
  // }

  // Render “Phối đồ tương tự” từ các item còn lại
  const simWrap = document.querySelector("section .grid");
  if (simWrap) {
    const others = items
      .filter((x) => Number(x.stt) !== id)
      .sort(() => Math.random() - 0.5)
      .slice(0, 4);
    simWrap.innerHTML = "";
    others.forEach((p) => {
      const a = document.createElement("a");
      a.href = `product.html?id=${p.stt}`;
      a.className =
        "group rounded-[var(--radius)] overflow-hidden bg-white ring-1 ring-neutral-200 hover:shadow";
      a.innerHTML = `
        <img class="aspect-square w-full object-cover" src="${p.mainImage}" alt="look ${p.stt}">
        <div class="p-3 flex items-center justify-between text-sm">
          <span class="font-medium">#${p.stt}</span>
          <span class="text-neutral-500">Xem</span>
        </div>`;
      simWrap.appendChild(a);
    });
  }

  // Xử lý sự kiện quay lại
  document.getElementById("btnBack")?.addEventListener("click", () => {
    if (history.length > 1) history.back();
    else location.href = "index.html";
  });
})();
