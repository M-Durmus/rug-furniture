export function openCartDrawer() {
  if (typeof window === "undefined") return;
  window.dispatchEvent(new Event("wool-loom-open-cart"));
}
