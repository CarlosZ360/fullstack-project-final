import { test, expect } from '@playwright/test';

test('Agregar una tarea y verificar que aparece en la lista', async ({ page }) => {
  // 1. Mockear el GET inicial (la lista arranca vacía)
  await page.route('**/tasks', async (route, request) => {
    if (request.method() === 'GET') {
      await route.fulfill({
        status: 200,
        contentType: 'application/json',
        body: JSON.stringify([]), // Array vacío inicialmente
      });
    }
  });

  // 2. Mockear el POST (cuando el usuario agrega la tarea)

});
