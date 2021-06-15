<template>
  <main :class="{ overlay: visible }">
    <div class="main__btn--container" v-if="!visible">
      <button class="btn btn-outline btn-md" @click="show">
        Налоговый вычет
      </button>
    </div>
    <transition name="modal">
      <Modal @closeModal="hide" v-if="visible" />
    </transition>
  </main>
</template>

<script lang="ts">
import { defineComponent } from 'vue';

import Modal from '@/components/Modal.vue';
import { useVisible } from '@/composition/visible';
import './fonts.scss';

export default defineComponent({
  name: 'App',
  components: {
    Modal,
  },
  setup() {
    return { ...useVisible() };
  },
});
</script>

<style lang="scss">
#app {
  font-family: 'Lab Grotesque';
}

* {
  box-sizing: border-box;
  margin: 0;
  padding: 0;
}

main {
  display: flex;
  justify-content: center;
  align-items: center;
  min-height: 100vh;
  transition: 0.4s ease-in;
  background: linear-gradient(
      255.35deg,
      #dc3131 0.83%,
      rgba(255, 79, 79, 0) 108.93%
    ),
    #ff5e56;

  @media screen and (max-width: 414px) {
    display: block;
  }

  &.overlay {
    background: rgba(0, 0, 0, 0.3);
  }
}

.main__btn--container {
  position: absolute;
  left: 50%;
  top: 50%;
  transform: translate(-50%, -50%);
}

.btn {
  cursor: pointer;
  outline: 0;
  color: #fff;
  transition: 0.3s ease;
  white-space: nowrap;
}

.btn-default {
  background: linear-gradient(
      255.35deg,
      #dc3131 0.83%,
      rgba(255, 79, 79, 0) 108.93%
    ),
    #ff5e56;
  box-shadow: 0px 0px 24px rgba(234, 0, 41, 0.33);
  border-radius: 6px;
  border: none;

  &:hover {
    background: linear-gradient(
        255.35deg,
        #ea0029 0.83%,
        rgba(255, 79, 79, 0) 108.93%
      ),
      #ea0029;
  }

  &:disabled {
    background: #bec5cc;
    box-shadow: none;
  }
}

.btn-outline {
  background: transparent;
  border: 1px solid #fff;
  border-radius: 6px;

  &:hover {
    background: #fff;
    color: #000;
    border: 1px solid transparent;
  }
}

.btn-link {
  background: transparent;
  color: #ea0029;
  border: none;
  font-weight: 500;
  font-size: 14px;
  @media screen and (max-width: 414px) {
    font-size: 20px;
    margin-top: 10px;
  }
  @media screen and (max-width: 320px) {
    font-size: 15px;
  }

  &:hover {
    color: #f53a31;
  }
  &:focus {
    color: #ea0029;
  }
}

.btn-md {
  font-weight: 500;
  font-size: 16px;
  line-height: 24px;
  padding: 16px 30px;

  @media screen and (max-width: 414px) {
    font-size: 17px;
    padding: 15px 30px;
  }
}

.btn-lg {
  width: 100%;
  font-size: 16px;
  padding: 16px 0;
}

.btn-icon {
  background: none;
  border: none;
}

.modal-enter-active,
.modal-leave-active {
  transition: opacity 0.2s ease;
}

.modal-enter-from,
.modal-leave-to {
  opacity: 0;
}
</style>
