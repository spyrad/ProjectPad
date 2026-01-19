import { test, expect, type Page } from '@playwright/test';

// Helper to login
async function login(page: Page) {
  await page.goto('/login');
  const email = process.env.TEST_USER_EMAIL || 'test@example.com';
  const password = process.env.TEST_USER_PASSWORD || 'testpassword123';

  await page.fill('input[type="email"]', email);
  await page.fill('input[type="password"]', password);
  await page.click('button[type="submit"]');
  await page.waitForURL(/\/app/);
}

test.describe('Notes - Notepad Feeling', () => {
  test.beforeEach(async ({ page }) => {
    if (!process.env.TEST_USER_EMAIL) {
      test.skip();
    }
    await login(page);
  });

  test('should navigate to notes page', async ({ page }) => {
    await page.click('a[href="/app/notes"]');
    await expect(page).toHaveURL('/app/notes');
    await expect(page.locator('h1, h2')).toContainText(/Notizen/i);
  });

  test('should open create note dialog', async ({ page }) => {
    await page.goto('/app/notes');

    // Click create button
    const createButton = page.locator('button:has-text("Notiz"), button:has-text("+")').first();
    await createButton.click();

    // Dialog should open
    await expect(page.locator('text=/Neue Notiz|Notiz erstellen/i')).toBeVisible();
  });

  test('CRITICAL: should have notepad feeling - monospace textarea', async ({ page }) => {
    await page.goto('/app/notes');

    const createButton = page.locator('button:has-text("Notiz"), button:has-text("+")').first();
    await createButton.click();

    // Find textarea
    const textarea = page.locator('textarea[name="content"]');
    await expect(textarea).toBeVisible();

    // Should have monospace font (Notepad feeling)
    const fontFamily = await textarea.evaluate((el) =>
      window.getComputedStyle(el).fontFamily
    );
    expect(fontFamily).toMatch(/mono|courier|consolas/i);

    // Should have minimum height
    const height = await textarea.evaluate((el) =>
      window.getComputedStyle(el).minHeight
    );
    // Should be at least 200px (configured as 300px)
    expect(parseInt(height)).toBeGreaterThanOrEqual(200);
  });

  test('CRITICAL: should submit note with Ctrl+Enter', async ({ page }) => {
    await page.goto('/app/notes');

    const createButton = page.locator('button:has-text("Notiz"), button:has-text("+")').first();
    await createButton.click();

    // Type note content
    const textarea = page.locator('textarea[name="content"]');
    const noteContent = `E2E Test Note ${Date.now()}`;
    await textarea.fill(noteContent);

    // Press Ctrl+Enter
    await textarea.press('Control+Enter');

    // Should close dialog and show note in list
    await expect(page.locator(`text="${noteContent}"`)).toBeVisible({ timeout: 10000 });
  });

  test('should create note with regular submit button', async ({ page }) => {
    await page.goto('/app/notes');

    const createButton = page.locator('button:has-text("Notiz"), button:has-text("+")').first();
    await createButton.click();

    // Fill textarea
    const textarea = page.locator('textarea[name="content"]');
    const noteContent = `Button Submit Test ${Date.now()}`;
    await textarea.fill(noteContent);

    // Click submit button
    const submitButton = page.locator('button[type="submit"]:has-text("Speichern")');
    await submitButton.click();

    // Should show in list
    await expect(page.locator(`text="${noteContent}"`)).toBeVisible({ timeout: 10000 });
  });

  test('should assign note to project', async ({ page }) => {
    await page.goto('/app/notes');

    const createButton = page.locator('button:has-text("Notiz"), button:has-text("+")').first();
    await createButton.click();

    // Fill content
    const textarea = page.locator('textarea[name="content"]');
    await textarea.fill('Note with project assignment');

    // Select project (if any exist)
    const projectSelect = page.locator('button[role="combobox"]').first();
    await projectSelect.click();

    // Select first project if available
    const firstOption = page.locator('[role="option"]').first();
    const optionsCount = await page.locator('[role="option"]').count();

    if (optionsCount > 0) {
      await firstOption.click();
    }

    // Submit
    await page.click('button[type="submit"]:has-text("Speichern")');

    // Should show in list
    await expect(page.locator('text="Note with project assignment"')).toBeVisible({ timeout: 10000 });
  });
});
