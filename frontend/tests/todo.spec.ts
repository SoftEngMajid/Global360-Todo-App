import { test, expect } from '@playwright/test';

test.describe('To-Do App E2E Tests', () => {
  
  // This runs before every single test to ensure we start on the right page
  test.beforeEach(async ({ page }) => {
    await page.goto('http://localhost:4200');
  });

  test('should allow a user to add and delete a to-do item', async ({ page }) => {
    const testTaskName = 'Ace the Global 360 Interview';

    // 1. ADD A TASK
    // We locate the input field by its placeholder text, just like a real user would
    const inputField = page.getByPlaceholder('What needs to be done?');
    await inputField.fill(testTaskName);
    
    // Click the Add button
    await page.getByRole('button', { name: 'Add' }).click();

    // 2. VERIFY IT WAS ADDED
    // We check that the text actually appeared on the screen
    const todoItem = page.getByText(testTaskName);
    await expect(todoItem).toBeVisible();

    // 3. DELETE THE TASK
    // Click the delete button next to our specific task
    await page.getByRole('button', { name: 'Delete' }).click();

    // 4. VERIFY IT WAS DELETED
    // Ensure the text is no longer visible on the screen
    await expect(todoItem).not.toBeVisible();
  });
});