import React from "react"
import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { describe, it, expect, vi } from 'vitest'
import TaskInput from './TaskInput'

//Generame la prueba del componente TaskInput
describe("Componente TaskInput", () => {
  it("debe llamar a onAddTask con el texto ingresado y limpiar el input al hacer clic en el botón", async () => {
    const mockOnAddTask = vi.fn();
    render(<TaskInput onAddTask={mockOnAddTask} />);

    const input = screen.getByPlaceholderText("Agregar nueva tarea");
    const button = screen.getByRole("button", { name: "Agregar tarea" });

    // Simular escritura del usuario
    await userEvent.type(input, "Comprar leche");
    expect(input).toHaveValue("Comprar leche");

    // Simular clic en el botón
    await userEvent.click(button);

    // Verificar que la función fue llamada correctamente
    expect(mockOnAddTask).toHaveBeenCalledTimes(1);
    expect(mockOnAddTask).toHaveBeenCalledWith("Comprar leche");

    // Verificar que el input se haya limpiado
    expect(input).toHaveValue("");
  });

  it("no debe llamar a onAddTask si el input está vacío o solo contiene espacios", async () => {
    const mockOnAddTask = vi.fn();
    render(<TaskInput onAddTask={mockOnAddTask} />);

    const input = screen.getByPlaceholderText("Agregar nueva tarea");
    const button = screen.getByRole("button", { name: "Agregar tarea" });

    // Intentar agregar con input vacío
    await userEvent.click(button);
    expect(mockOnAddTask).not.toHaveBeenCalled();

    // Intentar agregar solo con espacios en blanco
    await userEvent.type(input, "   ");
    await userEvent.click(button);
    expect(mockOnAddTask).not.toHaveBeenCalled();
  });

  it("no debe ejecutar onAddTask ni dejar espacios residuales si el usuario ingresa solo espacios", async () => {
    const mockOnAddTask = vi.fn();
    render(<TaskInput onAddTask={mockOnAddTask} />);

    const input = screen.getByPlaceholderText("Agregar nueva tarea");
    const button = screen.getByRole("button", { name: "Agregar tarea" });

    // El usuario ingresa intencionalmente múltiples espacios en blanco
    await userEvent.type(input, "   ");
    await userEvent.click(button);

    // Falla aquí: La función se ejecuta erróneamente o el input se queda con los espacios
    expect(mockOnAddTask).not.toHaveBeenCalled();
    expect(input).toHaveValue(""); 
  });  


});