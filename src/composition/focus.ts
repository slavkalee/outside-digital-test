import { Ref, ref } from "vue";

interface Focus {
  focus: Ref<() => void>;
  focusInput: () => void;
}

export function useFocus(): Focus {
  const focus = ref();

    const focusInput = () => {
      focus.value.focus();
    };

  return {
    focus,
    focusInput
  }
}