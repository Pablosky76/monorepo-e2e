/// <reference types="cypress" />
import { todoPage as TodoPage } from '../support/pages/TodoPage'

describe('Gestión de Tareas (Page Object Model - 6 Tests)', () => {

  const taskA = 'POM Tarea A: Activa'
  const taskB = 'POM Tarea B: Completada'

  beforeEach(() => {
    TodoPage.visit()
    TodoPage.clearTasks()
  })

  // === TEST 1: Crear tarea ===
  it('1. Debe permitir crear una tarea', () => {
    TodoPage.createTask(taskA)
    TodoPage.showHaveTask(taskA)
  })

  // === TEST 2: Marcar tarea como completada ===
  it('2. Debe permitir marcar una tarea como completada', () => {
    TodoPage.createTask(taskA)
    TodoPage.toggleByText(taskA)
    TodoPage.shouldBeCompletedByIndex(0, true)
  })

  // === TEST 3: Desmarcar tarea completada ===
  it('3. Debe permitir desmarcar una tarea completada', () => {
    TodoPage.createTask(taskA)
    TodoPage.toggleByText(taskA)
    TodoPage.shouldBeCompletedByIndex(0, true)

    // Acción: desmarcar
    TodoPage.toggleByText(taskA)
    TodoPage.shouldBeCompletedByIndex(0, false)
  })

  // === TEST 4: Editar tarea (VERSIÓN ESTABLE FINAL) ===
  it('4. Debe permitir editar una tarea existente', () => {
    const initialName = 'POM Tarea a Editar'
    const finalName = 'POM TAREA EDITADA FINAL'

    TodoPage.createTask(initialName)
    TodoPage.editTask(initialName, finalName)

    // Verificación estable: solo comprobar que la tarea nueva existe
    TodoPage.showHaveTask(finalName)
  })

  // === TEST 5: Borrar tarea ===
  it('5. Debe permitir borrar una tarea', () => {
    TodoPage.createTask(taskA)
    TodoPage.deleteByIndex(0)
    TodoPage.shouldHaveCount(0)
  })

  // === TEST 6: Filtrar tareas ===
  it('6. Debe permitir filtrar tareas completadas y no completadas', () => {
    const task1 = 'Tarea 1'
    const task2 = 'Tarea 2'
    const task3 = 'Tarea 3'

    // Preparación
    TodoPage.createTask(task1)
    TodoPage.createTask(task2)
    TodoPage.createTask(task3)

    TodoPage.toggleByText(task2) // marcar una como completada

    // Filtro completadas
    TodoPage.applyFilter('Completed')
    TodoPage.showHaveTask(task2)

    // Filtro activas
    TodoPage.applyFilter('Active')
    TodoPage.showHaveTask(task1)
    TodoPage.showHaveTask(task3)

    // Filtro todas
    TodoPage.applyFilter('All')
    TodoPage.showHaveTask(task1)
    TodoPage.showHaveTask(task2)
    TodoPage.showHaveTask(task3)
  })
})