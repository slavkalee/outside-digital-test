<template>
  <div class="input-field">
    <label>{{ label }}</label>
    <div class="input-field__container" :class="className" @click="focusInput">
      <input
        type="text"
        :placeholder="placeholder"
        :value="value"
        ref="focus"
        @input="$emit('update:value', $event.target.value)"
        autocomplete="off"
        :size="value.length || placeholder.length"
      />
      <span class="currency" v-if="value">₽</span>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';

import { useFocus } from '@/composition/focus';

export default defineComponent({
  props: {
    value: {
      type: String,
      required: true,
    },
    className: {
      type: Object,
      required: false,
    },
    label: {
      type: String,
      required: true,
    },
    placeholder: {
      type: String,
      required: false,
    },
  },
  setup() {
    return { ...useFocus() };
  },
});
</script>

<style lang="scss" scoped>
.input-field {
  &__container {
    border: 1px solid #dfe3e6;
    border-radius: 3px;
    position: relative;
    transition: 0.3s ease;
    overflow: hidden;
    cursor: text;

    .currency {
      font-size: 14px;
      margin-left: -10px;

      @media screen and (max-width: 414px) {
        font-size: 20px;
      }
    }

    &:hover {
      border: 1px solid #000;
    }

    &:focus-within {
      border: 1px solid #dfe3e6;
    }

    &.valid {
      border: 1px solid #07ec12;
    }
    &.invalid {
      border: 1px solid #f30000;
    }
  }

  label {
    display: block;
    font-weight: 500;
    font-size: 14px;
    color: #000000;
    margin-bottom: 10px;

    @media screen and (max-width: 414px) {
      font-size: 20px;
      margin-bottom: 20px;
    }
    @media screen and (max-width: 320px) {
      font-size: 16px;
      margin-bottom: 15px;
    }
  }
}

input[type='text'] {
  border-radius: 3px;
  border: none;
  outline: 0;
  padding: 8px 0px 8px 9px;
  font-family: 'Lab Grotesque';
  font-size: 14px;
  @media screen and (max-width: 414px) {
    font-size: 20px;
    padding: 12px 0px 12px 10px;
  }
  @media screen and (max-width: 320px) {
    font-size: 16px;
    padding: 12px 0px 12px 10px;
  }

  &::-webkit-outer-spin-button,
  &::-webkit-inner-spin-button {
    -webkit-appearance: none;
    margin: 0;
  }

  &::placeholder {
    color: #bec5cc;
  }
}
</style>
