<template>
  <div>
    <h1>Create an Event</h1>
    <form @submit.prevent="createEvent">
      <label>Select a category</label>
      <BaseInput label="Select a category" v-model="event.categories" type="select" class="field" :options="categories" />

      <h3>Name & describe your event</h3>
      <div class="field">
       <BaseInput label="Title" v-model="event.title" placeholder="Add a title" type="text" class="field"/>
      </div>

      <div class="field">
        <BaseInput label="Description" v-model="event.description" placeholder="Add a description" type="text" class="field"/>
      </div>

      <h3>Where is your event?</h3>
      <div class="field">
        <BaseInput label="Location" v-model="event.location" placeholder="Add a location" type="text" class="field"/>
      </div>

      <h3>When is your event?</h3>
      <div class="field">
        <BaseInput label="Date" v-model="event.date" placeholder="Add a location" type="datepicker" class="field"/>
      </div>

      <div class="field">
        <BaseInput label="Select a time" v-model="event.time" type="select" class="field" :options="times" />
      </div>

      <input type="submit" class="button -fill-gradient" value="Submit"/>
    </form>
  </div>
</template>


<script>
import NProgress from "nprogress";

export default {
  data() {
    const times = [];
    for (let i = 1; i <= 24; i++) {
      times.push(i + ":00");
    }
    return {
      times,
      categories: this.$store.state.categories,
      event: this.createFreshEventObject()
    };
  },
  methods: {
    createEvent() {
      NProgress.start();
      this.$store
        .dispatch("event/createEvent", this.event)
        .then(() => {
          this.$router.push({
            name: "event-show",
            params: { id: this.event.id }
          });
          this.event = this.createFreshEventObject();
        })
        .catch(() => {
          NProgress.done();
        });
    },
    createFreshEventObject() {
      const user = this.$store.state.user.user;
      const id = Math.floor(Math.random() * 10000000);

      return {
        id: id,
        user: user,
        category: "",
        organizer: user,
        title: "",
        description: "",
        location: "",
        date: "",
        time: "",
        attendees: []
      };
    }
  }
};
</script>

<style scoped>
.field {
  margin-bottom: 24px;
}
</style>
