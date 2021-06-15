import { Ref, ref } from 'vue';

interface Visible {
  visible: Ref<boolean>;
  show: () => void;
  hide: () => void;
}

export function useVisible(): Visible {
  const visible = ref(false);

  const show = () => (visible.value = true);
  const hide = () => (visible.value = false);

  return {
    visible,
    show,
    hide,
  };
}
