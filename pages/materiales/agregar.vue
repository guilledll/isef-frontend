<template>
  <div>
    <GlobalHeader :title="header.title" :text="header.text" />
    <div class="flex flex-col gap-3 lg:flex-row">
      <!-- AGREGAR MATERIALES -->
      <div class="w-full gap-3 lg:order-last lg:w-72 lg:block"></div>
    </div>
    <div>
      <form @submit.prevent="addNewForm">
        <!--<label for="new-form">Agregar form</label> -->
        <button>Agregar más materiales</button>
      </form>
    </div>
    <div>
      <ul>
        <li v-for="(todo, index) in todos" :key="todo.id">
          <FormMaterialCreate
            @remove="todos.splice(index, 1)"
            @agregar="resultado"
          />
        </li>
      </ul>
    </div>
  </div>
</template>

<script>
//import MaterialesService from '@/services/materiales.service';
export default {
  layout: 'AppLayout',
  data() {
    return {
      todos: [{ id: '' }],
      nextTodoId: 0,
      depositos: [],
      materiales: [],
      current: 'form',
      header: {
        title: 'Materiales',
        text: 'materiales... etc.',
      },
    };
  },
  methods: {
    resultado(data) {
      //console.log(data);
      this.materiales.push(data);
      console.log(this.materiales);
    },
    addNewForm: function () {
      this.todos.push({
        id: this.nextTodoId++,
      });
    },
  },
};
</script>

<style></style>
