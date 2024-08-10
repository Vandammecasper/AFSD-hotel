import { test, expect } from '@playwright/test';


test('login', async ({ page }) => {
  await page.goto('http://localhost:5173/');
  await page.getByRole('link', { name: 'LOGIN' }).click();
  await page.getByPlaceholder('youremail@example.com').click();
  await page.getByPlaceholder('youremail@example.com').fill('caspervandamme03@gmail.com');
  await page.getByPlaceholder('youremail@example.com').press('Tab');
  await page.getByPlaceholder('Your password').fill('Wachtwoord');
  await page.getByPlaceholder('Your password').press('Enter');
  await expect(page).toHaveURL('http://localhost:5173/');
});

test('make a reservation', async ({ page }) => {
  await page.goto('http://localhost:5173/');
  await page.getByRole('link', { name: 'LOGIN' }).click();
  await page.getByPlaceholder('youremail@example.com').click();
  await page.getByPlaceholder('youremail@example.com').fill('caspervandamme03@gmail.com');
  await page.getByPlaceholder('youremail@example.com').press('Tab');
  await page.getByPlaceholder('Your password').fill('Wachtwoord');
  await page.getByPlaceholder('Your password').press('Enter');
  await page.getByRole('button', { name: 'Make a reservation' }).click();
  await page.locator('[data-test="dp-input"]').click();
  await page.getByText('19').click();
  await page.getByText('25').click();
  await page.locator('[data-test="select-button"]').click();
  await page.getByPlaceholder('Number of people').click();
  await page.getByPlaceholder('Number of people').fill('2');
  await page.getByRole('button', { name: 'Find a room' }).click();
  await page.getByRole('button', { name: '2 person bedroom deluxe 30 m' }).click();
  await page.getByPlaceholder('Reservation name').click();
  await page.getByPlaceholder('Reservation name').fill('Van Damme');
  await page.getByPlaceholder('Reservation name').press('Tab');
  await page.getByPlaceholder('Guest 1 email').fill('caspervandamme03@gmail.com');
  await page.getByPlaceholder('Guest 1 email').press('Tab');
  await page.getByPlaceholder('Guest 2 email').fill('olivia@gmail.com');
  await page.getByRole('button', { name: 'Complete reservation' }).click();
  await page.getByRole('button', { name: 'Complete reservation' }).click();
  await page.getByRole('link', { name: 'MY RESERVATIONS' }).click();
  await page.getByRole('heading', { name: 'person bedroom deluxe' }).nth(1).click();
  await page.getByText('Aug 2024 - 25 Aug 2024').click();
});

test('edit room', async ({ page }) => {
  await page.goto('http://localhost:5173/');
  await page.getByRole('link', { name: 'LOGIN' }).click();
  await page.getByPlaceholder('youremail@example.com').click();
  await page.getByPlaceholder('youremail@example.com').fill('caspervandamme03@gmail.com');
  await page.getByPlaceholder('youremail@example.com').press('Tab');
  await page.getByPlaceholder('Your password').fill('Wachtwoord');
  await page.getByPlaceholder('Your password').press('Enter');
  await page.getByRole('link', { name: 'ROOM OVERVIEW' }).click();
  await page.getByRole('button').nth(1).click();
  await page.getByLabel('Flatscreen-tv').check();
  await page.getByLabel('Balcony').check();
  await page.getByLabel('Free wifi').check();
  await page.getByLabel('Smoke free').check();
  await page.getByRole('button', { name: 'Update room' }).click();
  await page.goto('http://localhost:5173/admin/overview');
  await page.getByRole('link', { name: '2 person bedroom deluxe (Room' }).click();
  await expect(page.locator('text=Free wifi')).not.toBeVisible();
  await page.getByRole('button', { name: 'GO BACK' }).click();
  await page.getByRole('button').nth(1).click();
  await page.getByLabel('Flatscreen-tv').check();
  await page.getByLabel('Balcony').check();
  await page.getByLabel('Free wifi').check();
  await page.getByLabel('Free parking').check();
  await page.getByLabel('Smoke free').check();
  await page.getByRole('button', { name: 'Update room' }).click();
  await page.getByRole('link', { name: '2 person bedroom deluxe (Room' }).click();
  await page.getByText('Free parking').click();
});