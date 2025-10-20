Feature: Gestión de tareas con TodoMVC (POM + Cucumber)
  Background:
    Given que visito la app de TodoMVC

  Scenario: Crear una tarea
    When creo la tarea "Comprar pan"
    Then debería ver 1 tarea en la lista
    And debería ver la tarea "Comprar pan"