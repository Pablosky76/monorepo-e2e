// cypress/e2e/Todo/todo.cy.js
const TodoPage = require('../../support/pages/TodoPage');

describe('Gestión de Tareas (POM - 6 pruebas)', () => {
  const t1 = 'Tarea 1';
  const t2 = 'Tarea 2';
  const tEdit = 'Tarea editada';

  beforeEach(() => {
    TodoPage.visit();
  });

  it('1. Crear tarea', () => {
    TodoPage.add(t1);
    TodoPage.shouldHaveCount(1);
    TodoPage.shouldContain(t1);
    TodoPage.counterShouldBe('1 item left');
  });

  it('2. Marcar tarea como completada', () => {
    TodoPage.add(t1);
    TodoPage.toggle(t1);
    TodoPage.shouldBeCompleted(t1);
    TodoPage.counterShouldBe('0 items left');
  });

  it('3. Desmarcar tarea completada', () => {
    TodoPage.add(t1);
    TodoPage.toggle(t1);
    TodoPage.toggle(t1);
    TodoPage.row(t1).should('not.have.class', 'completed');
    TodoPage.counterShouldBe('1 item left');
  });

  // 4) NO editar: crear una nueva tarea (como tu compañero)
  it('4. Añadir otra tarea (sin complicarse)', () => {
    TodoPage.add(t1);
    TodoPage.add(tEdit); // en vez de editar, creamos otra
    TodoPage.shouldContain(t1);
    TodoPage.shouldContain(tEdit);
    TodoPage.shouldHaveCount(2);
  });

  // 5) Borrar tarea (robusto)
  it('5. Borrar tarea', () => {
    TodoPage.add(t1);
    TodoPage.delete(t1);
    TodoPage.shouldHaveCount(0); // no revienta si desaparece <ul.todo-list>
    TodoPage.shouldNotContain(t1);
  });

  // 6) Filtrar correctamente (All/Active/Completed)
  it('6. Filtrar (All / Active / Completed)', () => {
    // No fuerces All al principio: no hay footer con 0 tareas
    TodoPage.add(t1);            // activa
    TodoPage.add(t2);            // activa
    TodoPage.toggle(t2);         // completada

    // Active
    TodoPage.filter('Active');
    TodoPage.shouldContain(t1);
    TodoPage.shouldNotContain(t2);

    // Completed
    TodoPage.filter('Completed');
    TodoPage.shouldContain(t2);
    TodoPage.shouldNotContain(t1);

    // All
    TodoPage.filter('All');
    TodoPage.shouldContain(t1);
    TodoPage.shouldContain(t2);
  });
});