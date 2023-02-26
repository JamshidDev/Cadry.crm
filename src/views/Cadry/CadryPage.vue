<template>
    <div class="grid  py-4 px-1">
      <div class="col-12">
        <div class="grid px-2">
          <div class="col-12">
            <div class="w-full flex justify-content-between align-items-center">
              <Button
                icon="pi pi-arrow-circle-left"
                @click="goPush()"
                class="p-button-secondary p-button-rounded p-button-sm"
                v-tooltip.right="`Orqaga`"
              />
              <SelectButton
                v-model="live_router"
                :options="routerList"
                optionLabel="name"
                dataKey="value"
                @change="changeRouter"
                class="hidden xl:inline-block lg:inline-block md:inline-block"
              >
                <template #option="slotProps">
                  <i :class="[slotProps.option.value==live_router.value? 'text-white' : 'text-blue-600', slotProps.option.icon, 'text-sm  xl:hidden' ]"></i>
                  <div class="text-base uppercase font-semibold xl:inline-block hidden" :class="[slotProps.option.value==live_router.value? 'text-white' : 'text-blue-600']">
                    {{ slotProps.option.name }}
                  </div>
                </template>
              </SelectButton>
              <span></span>
              <!-- <Button
                icon="pi pi-sync"
                class="p-button-secondary "
                label="Lotin"
                v-tooltip.bottom="`Ma'lumotlarni lotinchaga o'girish`"
              /> -->
            </div>
            <div class="col-12 flex mt-4 xl:mt-0 lg:mt-0 md:mt-0 justify-content-center xl:hidden lg:hidden md:hidden">
              <SelectButton
                v-model="live_router"
                :options="routerList"
                optionLabel="name"
                dataKey="value"
                @change="changeRouter"
              >
                <template #option="slotProps">
                  <i :class="[slotProps.option.value==live_router.value? 'text-white' : 'text-blue-600', slotProps.option.icon, 'text-sm lg:text-lg md:text-lg  xl:hidden' ]"></i>
                  <div class="text-base uppercase font-semibold xl:inline-block hidden" :class="[slotProps.option.value==live_router.value? 'text-white' : 'text-blue-600']">
                    {{ slotProps.option.name }}
                  </div>
                </template>
              </SelectButton>
            </div>
          </div>
  
          <div class="col-12 pt-0 mt-4">
            <router-view
              v-slot="{ Component }"
            >
              <keep-alive>
                <component :is="Component" />
              </keep-alive>
            </router-view>
          </div>
        </div>
      </div>
    </div>
  </template>
  <script>
  
  export default {
    data() {
      return {
        live_router:{
            icon: "pi pi-align-left",
            value: "1",
            name: "Shaxsiy ma'lumotlar",
          },
        routerList: [
          {
            route: "",
            value: "1",
            name: "Shaxsiy ma'lumotlar",
            icon: "pi pi-home",
          },
          {
            route: "two",
            value: "2",
            name: "Ma'lumoti",
            icon: "pi pi-briefcase",
          },
          {
            route: "three",
            value: "3",
            name: "Faoliyati",
            icon: "pi pi-align-left",
          },
          {
            route: "four",
            value: "4",
            name: "Qarindoshlari",
            icon: "pi pi-users",
          },
          {
            route: "five",
            value: "5",
            name: "Qo'shimcha",
            icon: "pi pi-bars",
          },
          {
            route: "six",
            value: "6",
            name: "Tayyorlov",
            icon: "pi pi-bars",
          },
        ],
      };
    },
    methods: {
      goPush() {
        this.$router.push("/admin/partemployee");
      },
      changeRouter(event){
        let id = this.$route.params.id
        this.$router.push(`/admin/editemployee/${id}/${this.live_router.route}`)
      },
      ActiveRouter(name){
        if(name=='details-one'){
          this.live_router =  {
            route: "",
            value: "1",
            name: "Shaxsiy ma'lumotlar",
            icon: "pi pi-home",
          }
        }else if(name=='details-two'){
          this.live_router =  {
            route: "two",
            value: "2",
            name: "Ma'lumoti",
            icon: "pi pi-briefcase",
          }
        }else if(name=='details-three'){
          this.live_router =  {
            route: "three",
            value: "3",
            name: "Faoliyati",
            icon: "pi pi-align-left",
          }
        }else if(name=='details-four'){
          this.live_router =  {
            route: "four",
            value: "4",
            name: "Qarindoshlari",
            icon: "pi pi-users",
          }
        }else if(name=='details-five'){
          this.live_router =  {
            route: "five",
            value: "5",
            name: "Qo'shimcha",
            icon: "pi pi-bars",
          }
        }else if(name=='details-six'){
          this.live_router =  {
            route: "six",
            value: "6",
            name: "Tayyorlov",
            icon: "pi pi-bars",
          }
        }
      }
    },
    mounted(){
      this.ActiveRouter(this.$route.name)
    }
  };
  </script>
  <style lang="">
  </style>