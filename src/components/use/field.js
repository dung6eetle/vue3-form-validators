import { reactive, ref, watch, computed } from "vue";

const not = (val) => !val;

export function useField(field) {
  const valid = ref(true);
  const value = ref(field.value);
  const errors = reactive({});
  const touched = ref(false);
  const classesObj = computed(() => {
    return {
      default: true,
      "default--invalid": !valid.value && touched.value,
    };
  });

  const reassign = (val) => {
    // иначе не обновится
    valid.value = true;

    Object.keys(field.validators ?? {}).map((name) => {
      const isValid = field.validators[name](val);
      errors[name] = not(isValid);
      if (not(isValid)) {
        // если хоть одно значение в валидаторе фолз делаю valid фолз
        valid.value = false;
      }
    });
  };

  watch(value, reassign);
  reassign(value.value);

  return {
    valid,
    value,
    errors,
    touched,
    blur: () => (touched.value = true),
    classesObj,
  };
}
