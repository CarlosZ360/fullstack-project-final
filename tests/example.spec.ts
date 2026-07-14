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
  await page.route('**/tasks', async (route, request) => {
    if (request.method() === 'POST') {
      const payload = request.postDataJSON();
      await route.fulfill({
        status: 201,
        contentType: 'application/json',
        body: JSON.stringify({
          id: payload.id || Date.now(),
          text: payload.text,
          completed: payload.completed || false,
        }),
      });
    }
  });

  // 3. Navegar a la aplicación
  await page.goto('/');

  // Seleccionar los elementos del DOM
  const taskInput = page.locator('input[placeholder="Agregar nueva tarea"]');
  const addButton = page.locator('button', { hasText: 'Agregar tarea' });

  // Ingresar e interactuar
  const newTask = 'Comprar leche';
  await taskInput.fill(newTask);
  await expect(taskInput).toHaveValue(newTask);

  // Hacer clic para agregar
  await addButton.click();

  // Verificar que el input se limpia (indica que el flujo asíncrono terminó correctamente)
  await expect(taskInput).toHaveValue('');

  // Verificar que la nueva tarea simulada aparece reflejada en la interfaz
  const taskListItem = page.getByText(newTask);
  await expect(taskListItem).toBeVisible();
});
