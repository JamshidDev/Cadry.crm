<template>
  <div>
    <div>
      <router-view> </router-view>
      <!-- <layout-vue></layout-vue> -->
    </div>
    <div>
      <Dialog
        v-model:visible="server_Error"
        :breakpoints="{
          '1960px': '30vw',
          '1600px': '40vw',
          '1200px': '70vw',
          '960px': '80vw',
          '640px': '90vw',
        }"
        :style="{ width: '50vw' }"
        :modal="true"
      >
        <template #header>
          <h6 class="w-full text-center text-2xl text-red-500 uppercase">
            Server xatosi
          </h6>
        </template>
        <p class="text-2xl font-normat text-red-400 text-center">
          {{ errorMessage.message }}
        </p>
        <p class="text-500 text-base text-center font-medium">
          Sizda kutilmagan xatolik yuzaga keldi...
        </p>
        <template #footer>
          <div class="grid">
            <div class="col-12 flex justify-content-center">
              <Button
                label="Yopish"
                icon="pi pi-times"
                class="p-button-sm p-button-danger"
                @click="server_Error = false"
              />
            </div>
          </div>
        </template>
      </Dialog>
    </div>
  </div>
</template>

<script>
import { mapActions } from 'vuex';

import LayoutVue from './Layout/Layout.vue';
import instance from './service/index';
import EventBus from './util/appEventBus.js';

export default {
  components: {
    LayoutVue,
  },
  data() {
    return {
      server_Error: false,
      errorMessage: "",
    };
  },
  methods: {
    ...mapActions([
      "set_appScrollX",
      "set_appScrollY",
      "set_screenWidth",
      "set_screenHeight",
    ]),
    handleScroll() {
      this.set_appScrollX(window.scrollX);
      this.set_appScrollY(window.scrollY);
    },
    reportWindowSize(event) {
      this.set_screenWidth(event.currentTarget.innerWidth);
      this.set_screenHeight(event.currentTarget.innerHeight);
    },
  },
  themeChangeListener: null,
  mounted() {
    this.themeChangeListener = (event) => {
      const elementId = "theme-link";
      const linkElement = document.getElementById(elementId);
      const cloneLinkElement = linkElement.cloneNode(true);
      const newThemeUrl = linkElement
        .getAttribute("href")
        .replace(this.$appState.theme, event.theme);

      cloneLinkElement.setAttribute("id", elementId + "-clone");
      cloneLinkElement.setAttribute("href", newThemeUrl);
      cloneLinkElement.addEventListener("load", () => {
        linkElement.remove();
        cloneLinkElement.setAttribute("id", elementId);
      });
      linkElement.parentNode.insertBefore(
        cloneLinkElement,
        linkElement.nextSibling
      );

      this.$appState.theme = event.theme;
      this.$appState.darkTheme = event.dark;
    };

    document.documentElement.style.fontSize =
      localStorage.getItem("fontSize") + "px";

    EventBus.on("theme-change", this.themeChangeListener);
  },

  beforeUnmount() {
    EventBus.off("theme-change", this.themeChangeListener);
  },
  created() {
    window.addEventListener("scroll", this.handleScroll);
    window.addEventListener("resize", this.reportWindowSize);

    instance.interceptors.response.use(
      (response) => response,
      (error) => {
        if (error.response.status >= 500) {
          this.errorMessage = error.response.data;
          this.server_Error = true;
        }
        return Promise.reject(error);
      }
    );
  },
  destroyed() {
    window.removeEventListener("scroll", this.handleScroll);
    window.addEventListener("resize", this.reportWindowSize);
  },
};
</script>
<style lang="scss">
.p-dropdown-panel {
    max-width: 100px;
  }
  
  .p-dropdown-item {
    white-space: normal !important;
  
  }
  .custom-icon-btn {
  padding: 10px 12px;
  background-color: transparent;
  border-radius: 6px;
  cursor: pointer;
  border: none;
  color: #3b82f6;
  background-color: #3b83f62b;

  &:hover {
    background-color: #3b83f64c;
  }

  &:focus {
    background-color: #3b83f6b8;
    color: #fff;
  }

  i {
    font-size: 16px;
    font-weight: bold;

  }
}

</style>


