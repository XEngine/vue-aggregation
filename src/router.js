import Vue from "vue";
import Router from "vue-router";
import Category from "./views/category.vue";

Vue.use(Router);

export default new Router({
  mode: "history",
  routes: [
    {
      path: window.location.pathname,
      name: "Category",
      component: Category
    }
  ]
});
