<template>
  <div class="stack-small" v-if="!isEditing">
    <!-- 原本的 checkbox、label、Edit/Delete 按鈕 -->
    <div class="custom-checkbox">
      <!-- 使用 :for 綁定 id，顯示 label -->
      <label :for="id" class="checkbox-label">{{ label }}</label>

      <!-- 使用 :checked 綁定 isDone，當 isDone 為 true 時勾選該 checkbox -->
      <input
        type="checkbox"
        class="checkbox"
        :id="id"
        :checked="isDone"
        @change="$emit('checkbox-changed')"
      />
    </div>
    <!--@change是瀏覽器本身就內建支援的，不是自己取的-->
    <div class="btn-group">
      <button
        ref="editButton"
        type="button"
        class="btn"
        @click="toggleToItemEditForm"
      >
        編輯 <span class="visually-hidden">{{ label }}</span>
      </button>
      <button type="button" class="btn btn__danger" @click="deleteToDo">
        刪除 <span class="visually-hidden">{{ label }}</span>
      </button>
    </div>
  </div>
  <!--:（v-bind）用來將資料綁定到 HTML 屬性上（例如 checked、src、class）。 -->
  <!--@（v-on）用來將 DOM 事件綁定到 Vue 的方法（例如 click、input）。-->
  <to-do-item-edit-form
    v-else
    :id="id"
    :label="label"
    @edit-cancelled="handleEditCancelled"
    @edit-saved="handleEditSaved"
  />
</template>

<script>
import ToDoItemEditForm from "./ToDoItemEditForm";

//this 指的就是這個 Vue 元件的實例
export default {
  components: {
    ToDoItemEditForm,
  },
  // 定義元件的屬性 (props)
  props: {
    //用於接收父組件傳遞過來的資料，這些資料通常是父組件的狀態或屬性。
    label: {
      required: true, // label 是必須傳入的屬性
      type: String, // label 屬性必須是 String 類型
    },
    done: {
      default: false, // done 屬性有預設值 false，如果沒有傳入則預設為 false
      type: Boolean, // done 屬性必須是 Boolean 類型
    },
    id: {
      required: true, // id 是必須傳入的屬性
      type: String, // id 屬性必須是 String 類型
    },
  },

  //App.vue 的 data() 管理的是應用層級的資料（例如所有代辦事項）。
  //ToDoItem.vue 的 data() 管理的是單個代辦項目的局部資料（例如是否完成的狀態）。
  // 定義元件的資料 (data)
  data() {
    //定義組件內部的資料，它管理的是該組件的局部狀態。
    return {
      isEditing: false,
    };
  },
  methods: {
    deleteToDo() {
      this.$emit("item-deleted");
    },
    toggleToItemEditForm() {
      console.log(this.$refs.editButton); // 印出 HTMLButtonElement
      this.isEditing = true;
    },
    focusOnEditButton() {
      this.$nextTick(() => {
        const editButtonRef = this.$refs.editButton;
        if (editButtonRef) {
          editButtonRef.focus();
        }
      });
    },
    handleEditCancelled() {
      this.isEditing = false;
      this.focusOnEditButton(); // 讓焦點回到 Edit 按鈕，使用體驗更好（可選）
    },
    handleEditSaved(newLabel) {
      this.$emit("update-label", { id: this.id, label: newLabel }); // 傳給 App.vue
      this.isEditing = false;
      this.focusOnEditButton(); // 可選，加強可用性
    },
  },
  computed: {
    isDone() {
      return this.done;
    },
  },
};
</script>
