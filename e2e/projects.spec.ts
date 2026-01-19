import { test, expect, type Page } from '@playwright/test';

// Helper to login (you'll need valid test credentials)
async function login(page: Page) {
  await page.goto('/login');
  // Use environment variables for test credentials
  const email = process.env.TEST_USER_EMAIL || 'test@example.com';
  const password = process.env.TEST_USER_PASSWORD || 'testpassword123';

  await page.fill('input[type="email"]', email);
  await page.fill('input[type="password"]', password);
  await page.click('button[type="submit"]');

  // Wait for redirect to dashboard
  await page.waitForURL(/\/app/);
}

test.describe('Project Management', () => {
  test.beforeEach(async ({ page }) => {
    // Skip these tests if no test credentials provided
    if (!process.env.TEST_USER_EMAIL) {
      test.skip();
    }
    await login(page);
  });

  test('should navigate to projects page', async ({ page }) => {
    await page.click('a[href="/app/projects"]');
    await expect(page).toHaveURL('/app/projects');
    await expect(page.locator('h1, h2')).toContainText(/Projekte/i);
  });

  test('should open create project dialog', async ({ page }) => {
    await page.goto('/app/projects');

    // Click "Neues Projekt" or "+" button
    const createButton = page.locator('button:has-text("Projekt"), button:has-text("+")').first();
    await createButton.click();

    // Dialog should open
    await expect(page.locator('text=/Neues Projekt|Projekt erstellen/i')).toBeVisible();
  });

  test('should create a new project', async ({ page }) => {
    await page.goto('/app/projects');

    // Open create dialog
    const createButton = page.locator('button:has-text("Projekt"), button:has-text("+")').first();
    await createButton.click();

    // Fill form
    const projectName = `E2E Test Project ${Date.now()}`;
    await page.fill('input[name="name"], input[placeholder*="Projektname"]', projectName);
    await page.fill('textarea[name="description"]', 'Created by E2E test');

    // Select status
    await page.click('button[role="combobox"]');
    await page.click('text=Aktiv');

    // Submit
    await page.click('button[type="submit"]');

    // Should show in list
    await expect(page.locator(`text="${projectName}"`)).toBeVisible({ timeout: 10000 });
  });

  test('should show empty state when no projects', async ({ page }) => {
    await page.goto('/app/projects');

    // If there are projects, skip this test
    const projectCards = page.locator('[data-testid="project-card"], article, .project-card');
    const count = await projectCards.count();

    if (count > 0) {
      test.skip();
    }

    // Should show empty state
    await expect(page.locator('text=/keine Projekte|no projects|leer/i')).toBeVisible();
  });
});
