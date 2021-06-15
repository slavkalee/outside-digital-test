<template>
  <form class="form" @submit.prevent="submit">
    <InputField
      label="Ваша зарплата в месяц"
      placeholder="Введите данные"
      :value="form.value"
      @update:value="form.value = $event"
      :className="{
        invalid: v$.value.$dirty && v$.value.required.$invalid,
      }"
    />

    <div
      class="invalid-message"
      v-if="v$.value.$dirty && v$.value.required.$invalid"
    >
      Поле обязательно для заполнения
    </div>

    <div class="form__link--container" v-if="form.value">
      <button
        type="button"
        class="btn btn-link"
        @click="
          onCalculate();
          visible = true;
        "
      >
        Расcчитать
      </button>
    </div>

    <div class="form__calculate" v-if="visible">
      <div class="form__calculate_title">
        Итого можете внести в качестве досрочных:
      </div>

      <div
        class="form__calculate_result"
        v-for="calc of payments"
        :key="calc.id"
      >
        <input
          type="checkbox"
          :value="calc"
          v-model="form.checkboxes"
          :class="{
            invalid: v$.checkboxes.$dirty && v$.checkboxes.required.$invalid,
          }"
        />
        <span class="form__calculate_value"
          >{{ calc.value }} рублей
          <span class="grey-text">{{ getSuffix(calc.year) }}</span></span
        >
      </div>
    </div>

    <div class="form__radio--field">
      <div class="radio__subtitle">Что уменьшаем?</div>
      <div class="form__radio--container">
        <div class="form__radio_btn">
          <input
            id="radio-1"
            type="radio"
            name="radio"
            value="Платёж"
            v-model="form.picked"
            checked
          />
          <label for="radio-1">Платёж</label>
        </div>
        <div class="form__radio_btn">
          <input
            id="radio-2"
            type="radio"
            name="radio"
            value="Срок"
            v-model="form.picked"
          />
          <label for="radio-2">Срок</label>
        </div>
      </div>
    </div>
    <div class="form__submit--container">
      <button
        type="submit"
        class="btn btn-lg btn-default"
        :disabled="v$.$dirty && v$.$invalid"
      >
        Добавить
      </button>
    </div>
  </form>
</template>

<script lang="ts">
import { computed, defineComponent, reactive, ref } from 'vue';
import { useStore } from 'vuex';
import { useVuelidate } from '@vuelidate/core';
import { required } from '@vuelidate/validators';

import InputField from '@/components/InputField.vue';
import { useVisible } from '@/composition/visible';
import { FormReactive, Payment } from '@/interfaces';
import { getSuffix } from '@/utils';
import { Result } from '@/interfaces';

export default defineComponent({
  components: {
    InputField,
  },
  setup(_, ctx) {
    const store = useStore();

    const form = reactive<FormReactive>({
      value: '',
      picked: 'Платёж',
      checkboxes: [],
    });

    const payments = ref<Payment[]>([]);

    const rules = computed(() => ({
      value: { required },
      picked: { required },
      checkboxes: { required },
    }));

    const onCalculate = () => {
      const result = [];
      const limitAmount = 260000;

      const yearlyDeduction = computed(() => +form.value * 12 * 0.13);
      const period = computed(() =>
        Math.round(limitAmount / yearlyDeduction.value)
      );
      const residualAmount = computed(
        () => limitAmount % yearlyDeduction.value
      );

      for (let i = 0; i < period.value; i++) {
        result.push({
          year: i + 1,
          value: yearlyDeduction.value,
        } as Payment);
      }

      result.push({
        year: result.length + 1,
        value: residualAmount.value,
      } as Payment);

      payments.value = [...result];
    };

    const v$ = useVuelidate(rules, form);

    const resetValues = () => {
      form.value = '';
      form.picked = 'Платёж';
      form.checkboxes = [];
      v$.value.$reset();
    };

    const submit = () => {
      v$.value.$touch();
      if (v$.value.$invalid) return;

      store.commit('addResult', {
        id: Date.now(),
        salary: form.value,
        reduceMode: form.picked,
        payments: form.checkboxes,
      } as Result);

      resetValues();
      ctx.emit('closeModal');
    };

    return {
      form,
      v$,
      onCalculate,
      getSuffix,
      submit,
      payments,
      ...useVisible(),
    };
  },
});
</script>

<style lang="scss">
.form {
  &__link--container {
    margin-top: 10px;
  }

  &__radio--field {
    margin-top: 24px;
    display: flex;
    align-items: center;
    @media screen and (max-width: 414px) {
      margin-top: 35px;
      display: block;
    }
    @media screen and (max-width: 414px) {
      margin-top: 20px;
    }

    .radio__subtitle {
      margin-right: 32px;
      font-weight: 500;
      font-size: 14px;
      color: #000000;
      @media screen and (max-width: 414px) {
        font-size: 20px;
      }
      @media screen and (max-width: 320px) {
        font-size: 16px;
      }
    }
  }

  &__radio--container {
    display: flex;

    @media screen and (max-width: 414px) {
      margin-top: 30px;
    }
  }

  &__radio_btn {
    display: inline-block;

    &:not(:last-child) {
      margin-right: 16px;
    }

    input[type='radio'] {
      display: none;
    }

    label {
      display: inline-block;
      cursor: pointer;
      padding: 6px 12px;
      border-radius: 50px;
      user-select: none;
      font-weight: normal;
      font-size: 14px;
      background: #eef0f2;
      transition: 0.3s ease;

      @media screen and (max-width: 414px) {
        padding: 11px 19px;
        font-size: 18px;
      }
      @media screen and (max-width: 320px) {
        padding: 7px 18px;
        font-size: 14px;
      }

      &:hover {
        background: #dfe3e6;
      }
    }

    input[type='radio']:checked + label {
      background: linear-gradient(
          255.35deg,
          #dc3131 0.83%,
          rgba(255, 79, 79, 0) 108.93%
        ),
        #ff5e56;
      color: #fff;
    }
  }

  &__submit--container {
    margin-top: 40px;
  }

  &__calculate {
    &_result {
      display: flex;
      align-items: center;
      padding: 18px 0;
      border-bottom: 1px solid #dfe3e6;
    }
    &_value {
      margin-left: 11px;
      font-size: 15px;
      @media screen and (max-width: 414px) {
        margin-left: 15px;
        font-size: 20px;
      }
      @media screen and (max-width: 320px) {
        font-size: 16px;
      }
    }
    &_title {
      font-weight: 500;
      font-size: 14px;
      line-height: 24px;
      color: #000000;
      margin-top: 16px;
      @media screen and (max-width: 414px) {
        margin-top: 25px;
        font-size: 20px;
        line-height: 35px;
      }
      @media screen and (max-width: 320px) {
        font-size: 16px;
        line-height: 24px;
      }
    }

    input[type='checkbox'] {
      cursor: pointer;
      appearance: none;
      -webkit-appearance: none;
      height: 18px;
      width: 18px;
      background: #ffffff;
      border: 1px solid #dfe3e6;
      border-radius: 6px;
      display: flex;
      justify-content: center;
      align-items: center;
      outline: 0;
      @media screen and (max-width: 414px) {
        height: 25px;
        width: 25px;
      }
      @media screen and (max-width: 320px) {
        height: 20px;
        width: 20px;
      }

      &.invalid {
        border: 1px solid #dc3131;
      }

      &:after {
        font-family: 'Font Awesome 5 Free';
        font-weight: 900;
        content: '\f00c';
        font-size: 12px;
        color: #fff;
        display: none;
        @media screen and (max-width: 414px) {
          font-size: 18px;
        }
        @media screen and (max-width: 320px) {
          font-size: 14px;
        }
      }

      &:hover {
        border: 1px solid #000;
      }

      &:checked {
        border: 1px solid #ff5e56;
        background: linear-gradient(
            255.35deg,
            #dc3131 0.83%,
            rgba(255, 79, 79, 0) 108.93%
          ),
          #ff5e56;
      }
      &:checked:after {
        display: block;
      }
    }
  }

  .grey-text {
    color: #aaafb1;
  }
}

.invalid-message {
  color: #ea0029;
  font-size: 10px;
  margin-top: 5px;

  @media screen and (max-width: 414px) {
    font-size: 18px;
    margin-top: 10px;
  }
}
</style>
