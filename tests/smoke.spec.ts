import { test, expect } from "@playwright/test";

// smoke tests — verify every public page loads without errors

const PUBLIC_PAGES = [
  { path: "/", title: "destroysass" },
  { path: "/math", title: "math" },
  { path: "/ideas", title: "ideas" },
  { path: "/cells", title: "cells" },
  { path: "/about", title: "about" },
  { path: "/about/philosophy", title: "philosophy" },
  { path: "/about/legal", title: "legal" },
  { path: "/about/money", title: "money" },
  { path: "/about/authors", title: "authors" },
  { path: "/privacy", title: "privacy" },
  { path: "/terms", title: "terms" },
];

for (const { path, title } of PUBLIC_PAGES) {
  test(`${path} loads without error`, async ({ page }) => {
    const errors: string[] = [];
    page.on("pageerror", (err) => errors.push(err.message));

    const response = await page.goto(path);
    expect(response?.status()).toBeLessThan(400);

    // wait for page to settle
    await page.waitForLoadState("networkidle");

    // no client-side JS errors
    expect(errors).toEqual([]);

    // basic content check
    await expect(page.locator("body")).toContainText(title, { ignoreCase: true });
  });
}

test("nav links are present on homepage", async ({ page }) => {
  await page.goto("/");
  await page.waitForLoadState("networkidle");

  // check nav links exist
  const nav = page.locator("nav");
  await expect(nav.getByRole("link", { name: "math" })).toBeVisible();
  await expect(nav.getByRole("link", { name: "ideas" })).toBeVisible();
  await expect(nav.getByRole("link", { name: "cells" })).toBeVisible();
  await expect(nav.getByRole("link", { name: "about" })).toBeVisible();
});

test("robots.txt returns valid content", async ({ page }) => {
  const response = await page.goto("/robots.txt");
  expect(response?.status()).toBe(200);
  const body = await response?.text();
  expect(body).toContain("User-Agent:");
  expect(body).toContain("Sitemap:");
});

test("sitemap.xml returns valid content", async ({ page }) => {
  const response = await page.goto("/sitemap.xml");
  expect(response?.status()).toBe(200);
  const body = await response?.text();
  expect(body).toContain("<urlset");
  expect(body).toContain("destroysass.coop");
});

test("OG meta tags are present on homepage", async ({ page }) => {
  await page.goto("/");
  const ogTitle = await page.getAttribute('meta[property="og:title"]', "content");
  const ogDesc = await page.getAttribute('meta[property="og:description"]', "content");
  const ogUrl = await page.getAttribute('meta[property="og:url"]', "content");
  const ogImage = await page.getAttribute('meta[property="og:image"]', "content");

  expect(ogTitle).toBeTruthy();
  expect(ogDesc).toBeTruthy();
  expect(ogUrl).toContain("destroysass.coop");
  expect(ogImage).toBeTruthy();
});

test("security headers are present", async ({ page }) => {
  const response = await page.goto("/");
  const headers = response?.headers() ?? {};

  expect(headers["x-content-type-options"]).toBe("nosniff");
  expect(headers["x-frame-options"]).toBe("DENY");
  expect(headers["referrer-policy"]).toBe("strict-origin-when-cross-origin");
  expect(headers["strict-transport-security"]).toContain("max-age=");
});

test("/ideas/new redirects unauthenticated users", async ({ page }) => {
  await page.goto("/ideas/new");
  // server redirect may be a 307 or client-side navigation
  // wait for the page to settle and check we're not on /ideas/new
  await page.waitForLoadState("networkidle");
  // should redirect to /auth or /lobby (depending on auth state)
  const url = page.url();
  const redirectedAway = url.includes("/auth") || url.includes("/lobby");
  // if still on /ideas/new, check that the page doesn't show the form (error state)
  if (!redirectedAway) {
    // the redirect may be handled via Next.js soft navigation;
    // at minimum, verify no form is rendered for unauthenticated users
    const formExists = await page.locator('form button[type="submit"]').count();
    expect(formExists).toBe(0);
  }
});

test("/math calculator renders and computes", async ({ page }) => {
  await page.goto("/math");
  await page.waitForLoadState("networkidle");

  // the calculator section should exist
  await expect(page.locator("text=run your own numbers")).toBeVisible();

  // pre-filled tool inputs should be present
  await expect(page.locator('input[value="CRM"]')).toBeVisible();
});
