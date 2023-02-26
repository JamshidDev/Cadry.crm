<template >
  <div class="grid">
    <div
      class="
        col-12
        sm:col-12
        md:col-12
        lg:col-12
        xl:col-12
        my-1
        card
        shadow-1
        surface-0
        border-round-xl
      "
    >
      <div class="flex justify-content-between align-items-center px-4 py-2">
        <div class="font-medium text-base uppercase">
          Matn o'lchamini sozlash
        </div>
        <div class="layout-config-content">
          <div class="config-scale flex align-items-center">
            <Button
              icon="pi pi-minus"
              @click="decrementScale()"
              class="p-button-text"
              :disabled="scale === scales[0]"
            />
            <i
              class="pi pi-circle-on ml-1"
              v-for="s of scales"
              :class="{ 'scale-active': s == scale }"
              :key="s"
            />
            <Button
              icon="pi pi-plus"
              @click="incrementScale()"
              class="p-button-text"
              :disabled="scale === scales[scales.length - 1]"
            />
          </div>
        </div>
      </div>
    </div>
    <!-- <div
      class="
        col-12
        sm:col-12
        md:col-12
        lg:col-12
        xl:col-12
        card
        shadow-1
        surface-0
        my-1
        border-round-xl
      "
    >
      <div class="flex justify-content-between p-4">
        <div class="font-medium text-base uppercase">Tungi rejim</div>
        <InputSwitch v-model="darkMode" @change="customChangetheme($event)" />
      </div>
    </div>
    <div
      class="
        col-12
        sm:col-12
        md:col-12
        lg:col-12
        xl:col-12
        card
        shadow-1
        surface-0
        my-1
        border-round-xl
      "
    >
      <div class="flex justify-content-between p-4">
        <div class="font-medium text-base uppercase">Gorizantal menyu</div>
        <InputSwitch v-model="menuType" @change="changeMenu()" />
      </div>
    </div> -->
  </div>
</template>
<script>
import EventBus from "../util/appEventBus.js";
import {mapActions, mapGetters} from "vuex"
export default {
  data() {
    return {
      scale: localStorage.getItem('fontSize') || 14,
      scales: [12, 13, 14, 15, 16],
      darkMode:JSON.parse(localStorage.getItem('theme-dark')) || false,
      menuType:this.get_menuType,
    };
  },
  themeChangeListener: null,
  beforeUnmount() {
    EventBus.off("theme-change", this.themeChangeListener);
  },
  mounted() {
    this.themeChangeListener = () => {
      this.applyScale();
    };

    EventBus.on("theme-change", this.themeChangeListener);
  },
  methods: {
    ...mapActions(["actionMenu", "actionisDark"]),
    changeMenu(){
      console.log(this.menuType);
      this.actionMenu(this.menuType)
    },


    customChangetheme($event) {
      if (this.darkMode) {
        this.changeTheme($event, "bootstrap4-dark-blue", true);
        localStorage.setItem("theme-dark", JSON.stringify(true));
        this.actionisDark(true)
      } else {
        this.changeTheme($event,"lara-light-blue", true);
        localStorage.setItem("theme-dark", JSON.stringify(false));
        this.actionisDark(false)
      }
    },
    decrementScale() {
      this.scale--;
      this.applyScale();
    },
    incrementScale() {
      this.scale++;
      this.applyScale();
    },
    applyScale() {
      document.documentElement.style.fontSize = this.scale + "px";
      localStorage.setItem('fontSize', this.scale)
    },
    changeTheme(event, theme, dark) {
      EventBus.emit("theme-change", { theme: theme, dark: dark });
      event.preventDefault();
    },
  },
  computed:{
    ...mapGetters(["get_menuType"])
  },
  created(){
    this.menuType = this.get_menuType
  }
};
</script>
<style lang="scss">
.scale-active {
  color: rgb(88, 22, 211);
}
</style>