import { expect, test, type Page } from "@playwright/test";

async function dismissCookies(page: Page) {
  const decline = page.getByRole("button", { name: "Decline" });
  if (await decline.isVisible().catch(() => false)) {
    await decline.click();
  }
}

const routes = [
  "/",
  "/rugs",
  "/rugs/pale-oushak-field",
  "/furniture",
  "/services",
  "/services/rug-cleaning",
  "/blog",
  "/cart",
  "/checkout",
  "/account",
  "/contact",
  "/help",
  "/book-service",
  "/trade-program",
];

test("browse a rug, add it, and open checkout", async ({ page }) => {
  await page.goto("/rugs");
  await dismissCookies(page);
  const product = page.getByRole("link", { name: "Honey Oushak", exact: true }).first();
  await expect(product).toBeVisible();
  await product.click();
  await expect(page).toHaveURL(/\/rugs\/honey-oushak/);
  await page.getByRole("button", { name: "Add to cart" }).first().click();
  await expect(page.getByRole("button", { name: /Cart, [1-9]/ })).toBeVisible();
  await page.goto("/checkout");
  await expect(page.getByRole("heading", { name: "Checkout" })).toBeVisible();
});

test("submit a rug-care quote", async ({ page }) => {
  await page.goto("/book-service");
  await dismissCookies(page);
  await page.getByRole("button", { name: "Continue" }).click();
  await expect(page.getByLabel("State")).toBeVisible();
  await page.getByLabel("State").selectOption("new-jersey");
  await page.getByLabel("City").selectOption("newark");
  await page.getByLabel("ZIP code").fill("07102");
  await page.getByRole("button", { name: "Continue" }).click();
  await page.getByLabel("Width, feet").fill("8");
  await page.getByLabel("Length, feet").fill("10");
  await page.getByRole("button", { name: "Continue" }).click();
  await page.getByLabel("Name").fill("A. Patel");
  await page.getByRole("textbox", { name: "Email", exact: true }).fill("a.patel@example.com");
  await page.getByRole("button", { name: "Continue" }).click();
  await page.getByRole("button", { name: "Submit the quote" }).click();
  await expect(page.getByRole("heading", { name: "Quote request received" })).toBeVisible();
});

test("main templates do not scroll sideways", async ({ page }) => {
  for (const route of routes) {
    await page.goto(route);
    for (const width of [375, 768, 1024, 1440]) {
      await page.setViewportSize({ width, height: 900 });
      const overflow = await page.evaluate(
        () => document.documentElement.scrollWidth > document.documentElement.clientWidth + 1,
      );
      expect(overflow, `${route} at ${width}px`).toBe(false);
    }
  }
});
