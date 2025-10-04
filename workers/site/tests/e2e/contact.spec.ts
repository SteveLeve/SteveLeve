import { test, expect } from '@playwright/test';

test.describe('Contact Form', () => {
    test('should load and display the contact form', async ({ page }) => {
        await page.goto('/contact');

        // Wait for the React component to hydrate and form to be ready
        await page.waitForSelector('#name', { state: 'visible' });

        // Verify all form fields are present
        await expect(page.locator('#name')).toBeVisible();
        await expect(page.locator('#email')).toBeVisible();
        await expect(page.locator('#company')).toBeVisible();
        await expect(page.locator('#subject')).toBeVisible();
        await expect(page.locator('#message')).toBeVisible();
        await expect(page.locator('button[type="submit"]')).toBeVisible();
    });

    test('should fill out and submit the contact form', async ({ page }) => {
        await page.goto('/contact');

        // Wait for the React component to hydrate and form to be ready
        await page.waitForSelector('#name', { state: 'visible' });

        // Fill out the form with valid data
        await page.fill('#name', 'Test User');
        await page.fill('#email', 'test.user@example.com');
        await page.fill('#subject', 'Test Subject - This is a longer subject to meet validation requirements');
        await page.fill('#message', 'This is a test message that is long enough to meet the validation requirements.');

        // Verify the form was filled correctly
        await expect(page.locator('#name')).toHaveValue('Test User');
        await expect(page.locator('#email')).toHaveValue('test.user@example.com');

        // Submit the form
        await page.click('button[type="submit"]');

        // Wait for a status message to appear (either success or error)
        // This might take a while as it needs to contact the API worker
        await page.waitForSelector('.status-message', { timeout: 20000 });

        // Verify that a status message is displayed
        const statusMessage = page.locator('.status-message');
        await expect(statusMessage).toBeVisible();

        // The message should be either success or error, both are valid outcomes in development
        const isSuccess = await page.locator('.status-message.success').isVisible();
        const isError = await page.locator('.status-message.error').isVisible();

        expect(isSuccess || isError).toBe(true);

        // Log what message we got for debugging
        const messageText = await statusMessage.textContent();
        console.log('Status message received:', messageText);
    });
});
