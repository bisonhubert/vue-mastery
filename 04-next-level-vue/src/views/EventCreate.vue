<template>
  <div>
    <h1>Create an Event</h1>
    <form @submit.prevent="createEvent">
      <BaseSelect 
        label="Select a category"
        v-model="event.categories"
        :options="categories"
        :class="{ error: $v.event.category.$error }"
        @blur="$v.event.category.$touch()"/>
      <template v-if="$v.event.category.$error">
        <p v-if="!$v.event.category.required" class="errorMessage">Category is required.</p>
      </template>

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
        <BaseSelect
          label="Select a time"
          v-model="event.time"
          :options="times"
          :class="{ error: $v.event.time.$error }"
          @blur="$v.event.time.$touch()"/>
      </div>
      <template v-if="$v.event.time.$error">
        <p v-if="!$v.event.time.required" class="errorMessage">Time is required.</p>
      </template>

      <BaseButton type="submit" buttonClass="-fill-gradient">Submit</BaseButton>
    </form>
  </div>
</template>


<script>
import NProgress from "nprogress";
import { required } from "vuelidate/lib/validators";

export default {
  name: "EventCreate",
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
  validations: {
    event: {
      category: {
        required
      },
      organizer: {
        required
      },
      title: {
        required
      },
      description: {
        required
      },
      location: {
        required
      },
      date: {
        required
      },
      time: {
        required
      }
    }
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
