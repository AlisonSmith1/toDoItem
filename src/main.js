import { createApp } from "vue"; // 從 Vue 套件匯入創建應用的方法
import App from "./App.vue"; // 匯入你寫的主組件 App.vue
import "./assets/reset.css"; // 匯入全站的 CSS 重置樣式

createApp(App).mount("#app"); // createApp(App)(建立 Vue 應用)，#app(掛載到 HTML 中 id 為 "app" 的元素上)

// 在 Vue 中，<script> 的邏輯會「控制」什麼會顯示在 <template> 中。但它自己「不會直接顯示」在畫面上，而是透過資料綁定和指令來影響畫面。(ex.App.vue)
// 在 App.vue 中的 <template> 沒有使用（綁定）你在 <script> 裡定義的資料或元件，那這些內容就不會顯示在畫面上(ex.ToDoItem)
