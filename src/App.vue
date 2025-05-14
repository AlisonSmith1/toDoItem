<template>
  <div id="app">
    <h1>我的代辦清單</h1>
    <h2 id="list-summary" ref="listSummary" tabindex="-1">{{ listSummary }}</h2>

    <to-do-form @todo-added="addToDo"></to-do-form>

    <ul aria-labelledby="list-summary" class="stack-large">
      <li v-for="item in ToDoItems" :key="item.id">
        <to-do-item
          :label="item.label"
          :done="item.done"
          :id="item.id"
          @checkbox-changed="updateDoneStatus(item.id)"
          @item-deleted="deleteToDo(item.id)"
          @item-edited="editToDo(item.id, $event)"
          @update-label="updateLabelHandler($event)"
        >
        </to-do-item>
      </li>
    </ul>
  </div>
</template>

<script>
import ToDoItem from "./components/ToDoItem.vue";
import { nanoid } from "nanoid";
import ToDoForm from "./components/ToDoForm.vue";

export default {
  name: "app",
  components: {
    ToDoForm, // 對應 <to-do-form>
    ToDoItem, // 對應 <ToDoItem>
  },
  data() {
    return {
      ToDoItems: [
        { id: "todo-" + nanoid(), label: "Learn Vue", done: false },
        {
          id: "todo-" + nanoid(),
          label: "Create a Vue project with the CLI",
          done: true,
        },
        { id: "todo-" + nanoid(), label: "Have fun", done: true },
        { id: "todo-" + nanoid(), label: "Create a to-do list", done: false },
      ],
    };
  },
  methods: {
    // 加入的項目（舊的）
    addToDo(toDoLabel) {
      this.ToDoItems.push({
        id: "todo-" + nanoid(),
        label: toDoLabel,
        done: false,
      });
    },
    // 新增的方法：根據 id 更新 done 狀態
    updateDoneStatus(toDoId) {
      const target = this.ToDoItems.find((item) => item.id === toDoId);
      // 在 ToDoItems 陣列中，找出 id 等於傳入的 toDoId 的那個 item，並把它存成 target

      target.done = !target.done;
      // 把該項目的 done 狀態反轉（true → false，false → true），代表切換完成/未完成
    },
    deleteToDo(toDoId) {
      const itemIndex = this.ToDoItems.findIndex((item) => item.id === toDoId);
      this.ToDoItems.splice(itemIndex, 1); // 刪除對應項目
      this.$refs.listSummary.focus();
    },
    editToDo(toDoId, newLabel) {
      const toDoToEdit = this.ToDoItems.find((item) => item.id === toDoId);
      //item 是當前正在檢查的那一筆物件。
      toDoToEdit.label = newLabel; // 替換成新的文字
    },
    updateLabelHandler(payload) {
      const { id, label } = payload;
      const item = this.ToDoItems.find((todo) => todo.id === id);
      if (item) {
        item.label = label;
      }
    },
  },

  computed: {
    listSummary() {
      const finished = this.ToDoItems.filter((item) => item.done).length;
      return `${finished} out of ${this.ToDoItems.length} items completed`;
    },
  },
};
</script>

<style>
/* 以下為全域樣式（你貼上的內容） */
.btn {
  padding: 0.8rem 1rem 0.7rem;
  border: 0.2rem solid #4d4d4d;
  cursor: pointer;
  text-transform: capitalize;
}
.btn__danger {
  color: #fff;
  background-color: #ca3c3c;
  border-color: #bd2130;
}
.btn__filter {
  border-color: lightgrey;
}
.btn__danger:focus {
  outline-color: #c82333;
}
.btn__primary {
  color: #fff;
  background-color: #000;
}
.btn-group {
  display: flex;
  justify-content: space-between;
}
.btn-group > * {
  flex: 1 1 auto;
}
.btn-group > * + * {
  margin-left: 0.8rem;
}
.label-wrapper {
  margin: 0;
  flex: 0 0 100%;
  text-align: center;
}
[class*="__lg"] {
  display: inline-block;
  width: 100%;
  font-size: 1.9rem;
}
[class*="__lg"]:not(:last-child) {
  margin-bottom: 1rem;
}
@media screen and (min-width: 620px) {
  [class*="__lg"] {
    font-size: 2.4rem;
  }
}
.visually-hidden {
  position: absolute;
  height: 1px;
  width: 1px;
  overflow: hidden;
  clip: rect(1px 1px 1px 1px);
  clip: rect(1px, 1px, 1px, 1px);
  clip-path: rect(1px, 1px, 1px, 1px);
  white-space: nowrap;
}
[class*="stack"] > * {
  margin-top: 0;
  margin-bottom: 0;
}
.stack-small > * + * {
  margin-top: 1.25rem;
}
.stack-large > * + * {
  margin-top: 2.5rem;
}
@media screen and (min-width: 550px) {
  .stack-small > * + * {
    margin-top: 1.4rem;
  }
  .stack-large > * + * {
    margin-top: 2.8rem;
  }
}

/* App 外觀樣式 */
#app {
  background: #fff;
  margin: 2rem 0 4rem 0;
  padding: 1rem;
  padding-top: 0;
  position: relative;
  box-shadow: 0 2px 4px 0 rgb(0 0 0 / 20%), 0 2.5rem 5rem 0 rgb(0 0 0 / 10%);
}
@media screen and (min-width: 550px) {
  #app {
    padding: 4rem;
  }
}
#app > * {
  max-width: 50rem;
  margin-left: auto;
  margin-right: auto;
}
#app > form {
  max-width: 100%;
}
#app h1 {
  display: block;
  min-width: 100%;
  width: 100%;
  text-align: center;
  margin: 0;
  margin-bottom: 1rem;
}
</style>
