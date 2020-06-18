<template>
  <div id="app">
    <router-view />
  </div>
</template>

<script lang="ts">
// @ is an alias to /src

import { Component, Prop, Vue } from "vue-property-decorator";

import { State, Getter, Mutation, Action } from "vuex-class";

import {} from "vuex";

@Component
export default class App extends Vue {
  @Action("setUser") setUser: any;

  created() {
    this.setUser(localStorage.tsToken);
  }
}
</script>

<style lang="scss">
</style>
