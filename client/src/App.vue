<template>
  <div id="app">
    <h1 class="title has-text-centered">CRUD app</h1>
    <div class="field has-addons">
      <div class="control is-expanded">
        <input
          type="text"
          v-model="description"
          class="input"
          placeholder="Your text..."
        />
      </div>
      <div class="control">
        <a
          href="#!"
          class="button is-info"
          @click="addItem"
          :disabled="!description"
          >Add</a
        >
      </div>
    </div>
    <div class="notification" v-for="(item, i) in items" :key="item._id">
      <div class="columns">
        <input
          type="text"
          class="column input"
          v-if="isSelected(item)"
          v-model="editedDescription"
        />
        <p v-else class="column">
          <span class="tag is-primary">{{ i + 1 }}</span>
          {{ item.description }}
        </p>
        <div class="column is-narrow">
          <span
            class="icon has-text-primary"
            @click="isSelected(item) ? unselect() : select(item)"
          >
            <i class="material-icons">{{
              isSelected(item) ? "close" : "edit"
            }}</i>
          </span>
          <span
            class="icon has-text-info"
            @click="
              isSelected(item) ? updateItem(item, i) : removeItem(item, i)
            "
          >
            <i class="material-icons">{{
              isSelected(item) ? "save" : "delete"
            }}</i>
          </span>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import axios from "axios";

export default {
  name: "App",
  data() {
    return {
      items: [],
      description: "",
      editedDescription: "",
      selected: {},
    };
  },
  async mounted() {
    const responce = await axios.get("api/listItems");
    this.items = responce.data;
  },
  methods: {
    async addItem() {
      const response = await axios.post("api/listItems/", {
        description: this.description,
      });
      this.items.push(response.data);
      this.description = "";
    },
    async removeItem(item, i) {
      await axios.delete("api/listItems/" + item._id);
      this.items.splice(i, 1);
    },
    select(item) {
      this.selected = item;
      this.editedDescription = item.description;
    },
    isSelected(item) {
      return item._id === this.selected._id;
    },
    unselect() {
      this.selected = {};
      this.editedDescription = "";
    },
    async updateItem(item, i) {
      const response = await axios.put("api/listItems/" + item._id, {
        description: this.editedDescription,
      });
      this.items[i] = response.data;
      this.unselect();
    },
  },
};
</script>

<style>
#app {
  margin: auto;
  margin-top: 3rem;
  max-width: 700px;
}
.icon {
  cursor: pointer;
}
</style>
