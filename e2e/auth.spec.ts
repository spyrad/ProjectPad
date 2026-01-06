import { test, expect } from '@playwright/test';

test.describe('Authentication', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/');
  });

  test('should show login page by default', async ({ page }) => {
    await expect(page).toHaveURL('/login');
    await expect(page.locator('h1')).toContainText(/ProjectPad|Anmelden/i);
  });

  test('should navigate to signup page', async ({ page }) => {
    await page.goto('/login');

    // Click "Registrieren" or signup link
    const signupLink = page.locator('a[href="/signup"]');
    await expect(signupLink).toBeVisible();
    await signupLink.click();

    await expect(page).toHaveURL('/signup');
    await expect(page.locator('h1, h2')).toContainText(/Registrier|Konto erstell/i);
  });

  test('should show validation errors on empty login form', async ({ page }) => {
    await page.goto('/login');

    // Try to submit without filling form
    const submitButton = page.locator('button[type="submit"]');
    await submitButton.click();

    // Should show validation errors
    await expect(page.locator('text=/erforderlich|required/i')).toBeVisible();
  });

  test('should show error for invalid credentials', async ({ page }) => {
    await page.goto('/login');

    // Fill with invalid credentials
    await page.fill('input[type="email"]', 'invalid@example.com');
    await page.fill('input[type="password"]', 'wrongpassword');

    const submitButton = page.locator('button[type="submit"]');
    await submitButton.click();

    // Should show error message (wait for API response)
    await expect(page.locator('text=/ungültig|invalid|fehler|error/i')).toBeVisible({ timeout: 10000 });
  });

  test('should show password mismatch error on signup', async ({ page }) => {
    await page.goto('/signup');

    // Fill form with mismatched passwords
    await page.fill('input[type="email"]', 'test@example.com');
    const passwordInputs = page.locator('input[type="password"]');
    await passwordInputs.nth(0).fill('password123');
    await passwordInputs.nth(1).fill('differentpassword');

    const submitButton = page.locator('button[type="submit"]');
    await submitButton.click();

    // Should show password mismatch error
    await expect(page.locator('text=/stimmen nicht überein|do not match/i')).toBeVisible();
  });
});
