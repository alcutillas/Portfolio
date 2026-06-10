export const HOME_SECTIONS = ["", "proyectos", "stack", "sobre-mi", "contacto"];

let activeHomeSectionId = "";

if (typeof window !== "undefined") {
  const initialHash = window.location.hash.replace("#", "");
  if (HOME_SECTIONS.includes(initialHash)) {
    activeHomeSectionId = initialHash;
  }
}

const homeSectionListeners = new Set();

export function getActiveHomeSectionId() {
  return activeHomeSectionId;
}

export function setActiveHomeSectionId(id) {
  const next = id === "hero" ? "" : (id ?? "");
  if (activeHomeSectionId === next) return;
  activeHomeSectionId = next;
  homeSectionListeners.forEach((listener) => listener(next));
}

export function subscribeActiveHomeSection(listener) {
  homeSectionListeners.add(listener);
  listener(activeHomeSectionId);
  return () => homeSectionListeners.delete(listener);
}

export function scrollToHash(hash) {
  const target = document.getElementById(hash);
  const container = document.getElementById("page-scroll");
  if (!target) return;

  if (container) {
    container.scrollTo({ top: target.offsetTop, behavior: "smooth" });
    return;
  }

  target.scrollIntoView({ behavior: "smooth" });
}

export function navigateHomeSection(id) {
  const sectionId = id === "hero" ? "" : id;
  const hash = sectionId ? `#${sectionId}` : "";
  window.history.replaceState(null, "", `/${hash}`);
  setActiveHomeSectionId(sectionId);
  window.dispatchEvent(
    new CustomEvent("home-section-nav", { detail: { id: sectionId } }),
  );
}

export function isMobileNav() {
  return window.matchMedia("(max-width: 767px)").matches;
}
