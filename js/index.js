function updateManilaTime() {
  const manilaTime = new Date().toLocaleTimeString("en-US", {
    timeZone: "Asia/Manila",
    hour: "2-digit",
    minute: "2-digit",
    second: "2-digit",
    hour12: false,
  });

  document.getElementById("manila-time").textContent = manilaTime;
}

function updateDetroitTime() {
  const detroitTime = new Date().toLocaleTimeString("en-US", {
    timeZone: "America/Detroit",
    hour: "2-digit",
    minute: "2-digit",
    second: "2-digit",
    hour12: false,
  });

  document.getElementById("nyc-time").textContent = detroitTime;
}

setInterval(updateManilaTime, 1000);
updateManilaTime();

setInterval(updateDetroitTime, 1000);
updateDetroitTime();

const sectionNav = document.getElementById("section-nav");
const sectionNodes = Array.from(
  document.querySelectorAll("#display-box .content > div[id]")
);
const sections = Object.fromEntries(sectionNodes.map((section) => [section.id, section]));

function toTitleCaseFromId(id) {
  return id
    .split(/[-_\s]+/)
    .filter(Boolean)
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
    .join(" ");
}

function getSectionLabel(section) {
  return toTitleCaseFromId(section.id);
}

function renderSectionButtons() {
  if (!sectionNav) {
    return;
  }

  sectionNav.innerHTML = "";
  sectionNodes.forEach((section) => {
    const button = document.createElement("button");
    button.type = "button";
    button.className = "btn";
    button.dataset.target = section.id;
    button.textContent = getSectionLabel(section);
    sectionNav.appendChild(button);
  });
}

renderSectionButtons();

const buttons = sectionNav ? sectionNav.querySelectorAll(".btn") : document.querySelectorAll(".btn");

const displayBox = document.getElementById("display-box");

function openSection(targetId, updateHash = true) {
  let shown = false;

  for (const id in sections) {
    sections[id].style.display = "none";
  }

  if (sections[targetId]) {
    sections[targetId].style.display = "block";
    shown = true;
  }

  if (shown) {
    displayBox.classList.remove("empty");
    if (updateHash) {
      history.replaceState(null, "", `#${targetId}`);
    }
  } else {
    displayBox.classList.add("empty");
    if (updateHash && !window.location.hash) {
      history.replaceState(null, "", window.location.pathname + window.location.search);
    }
  }
}

buttons.forEach((btn) => {
  btn.addEventListener("click", () => {
    openSection(btn.getAttribute("data-target"));
  });
});

function openSectionFromHash() {
  const targetId = decodeURIComponent(window.location.hash.replace("#", ""));
  if (targetId) {
    openSection(targetId, false);
  }
}

openSectionFromHash();
window.addEventListener("hashchange", openSectionFromHash);
