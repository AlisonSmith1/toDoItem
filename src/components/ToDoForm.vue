<template>
  <form @submit.prevent="onSubmit">
    <!--當使用者送出表單時，執行 onSubmit 方法，但不要讓瀏覽器刷新頁面。-->
    <h2 class="label-wrapper">
      <label for="new-todo-input" class="label__lg">
        What needs to be done?
      </label>
    </h2>
    <input
      type="text"
      id="new-todo-input"
      name="new-todo"
      autocomplete="off"
      v-model.lazy.trim="label"
      class="input__lg"
    />
    <button type="submit" class="btn btn__primary btn__lg">Add</button>
  </form>
</template>

<script>
export default {
  //子組件不需要接收來自父組件的資料，所以沒有使用 props。
  //子組件是通過事件傳遞 ($emit) 把資料發送回父組件。父組件會監聽這個事件並執行相應的處理。

  data() {
    return {
      label: "", // 用來綁定輸入框
    };
  },
  methods: {
    onSubmit() {
      if (this.label === "") {
        return;
      }
      this.$emit("todo-added", this.label);
      this.label = "";
    },
  },
};
</script>
