<template>
  <h1>{{ msg }}</h1>
  <div class="debag">
    <prev class="debag__wrapper" v-for="item in Object.keys(form)" :key="item">
      {{ form[item] }}
    </prev>
  </div>
  <form class="form" @submit="submit">
    <label type="email">Email:</label>
    <input
      :class="form.email.classesObj"
      @blur="form.email.blur"
      type="email"
      id="email"
      v-model="form.email.value"
    />
    <label type="password">Password:</label>
    <input
      :class="form.password.classesObj"
      @blur="form.password.blur"
      type="password"
      id="password"
      v-model="form.password.value"
    />
    <button>Submit Form</button>
  </form>
</template>

<script>
import { useForm } from "./use/form";

const required = (value) => !!value;
const minLength = (num) => (val) => {
  return val.length > num;
};

export default {
  props: {
    msg: String,
  },

  setup() {
    const form = useForm({
      email: {
        value: "",
        validators: {
          required,
          minLength: minLength(3),
        },
      },
      password: {
        value: "",
        validators: {
          required,
          minLength: minLength(3),
        },
      },
    });

    return { form };
  },
};
</script>

<style lang="scss">
.debag {
  display: flex;
  flex-flow: row;
  &__wrapper {
    display: contents;
    position: relative;
    width: 50%;
    height: 200px;
  }
}

.form {
  display: flex;
  flex-flow: column wrap;
  margin: 0 auto;
  max-width: 400px;
  gap: 0.2em;
  .default {
    border: 1px solid #2be2a9;
    &--invalid {
      border: 1px solid #fc2a54;
    }
  }
}
</style>
