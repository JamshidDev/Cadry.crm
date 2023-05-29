<template >
  <div class="w-full sidebar_box custom_bg">
    <Menu :model="item" class="w-full sidebar_menu custom_bg px-2 pb-8 border-none border-noround" />
  </div>
</template>
<script>
import { mapGetters } from 'vuex';

export default {
  data() {
    return {
      item: [
        {
          label: "Global",
          icon: "pi pi-globe",
          visible: () =>
            this.get_TitlePermission([
              "management_statistics",
              "management_organizations",
            ]),
          items: [
            {
              label: "Statistika",
              icon: "pi pi-chart-pie",
              to: "/admin/statistic",
              visible: () => this.get_adminPermissions("management_statistics"),
            },
            {
              label: "Korxonalar",
              icon: "pi pi-building",
              visible: () =>
                this.get_adminPermissions("management_organizations"),
              to: "/admin/employees",
            },
          ],
        },
        {
          label: "Asosiy",
          icon: "pi pi-microsoft",
          visible: () =>
            this.get_TitlePermission([
              "organization_statistics",
              "organization_cadries",
              "organization_departments",
              "organization_staffs",
              "organization_archive",
            ]),
          items: [
            {
              label: "Statistika",
              icon: "pi pi-chart-pie",
              to: "/admin/partstatistic",
              visible: () =>
                this.get_adminPermissions("organization_statistics"),
            },
            {
              label: "Xodimlar",
              icon: "pi pi-users",
              to: "/admin/partemployee",
              visible: () => this.get_adminPermissions("organization_cadries"),
            },
            {
              label: "Bo'limlar",
              icon: "pi pi-sitemap",
              to: "/admin/partfactory",
              visible: () =>
                this.get_adminPermissions("organization_departments"),
            },
            {
              label: "Shtat lavozimlari",
              icon: "pi pi-align-center",
              to: "/admin/position",
              visible: () => this.get_adminPermissions("organization_staffs"),
            },
            {
              label: "Arxivdan chiqarish",
              icon: "pi pi-shield",
              to: "/admin/historyemployee",
              visible: () => this.get_adminPermissions("organization_archive"),
            },
            {
              label: "Arxivdagi xodimlar",
              icon: "pi pi-shield",
              to: "/admin/historycadry",
              visible: () => this.get_adminPermissions("organization_archive"),
            },
            {
              label: "Hududlar",
              icon: "pi pi-database",
              to: "/admin/country-zone",
              visible: () => this.get_adminPermissions("organization_archive"),
            },
          ],
        },
        {
          label: "Monitoring",
          icon: "pi pi-th-large",
          visible: () =>
            this.get_TitlePermission([
              "organization_vacations",
              "organization_meds",
              "organization_discips",
              "organization_incentives",
            ]),

          items: [
            {
              label: "Muddatlar",
              icon: "pi pi-clock",
              visible: () =>
                this.get_adminPermissions("organization_vacations"),
              to: "/admin/deadline",
            },
            {
              label: "Xizmat safari",
              icon: "pi pi-cloud",
              visible: () =>
                this.get_adminPermissions("organization_vacations"),
              to: "/business-trip",
            },
            {
              label: "Ta'tillar",
              icon: "pi pi-calendar",
              visible: () =>
                this.get_adminPermissions("organization_vacations"),
              to: "/admin/vacation",
            },

            {
              label: "Ta'til muddati",
              icon: "pi pi-calendar",
              visible: () =>
                this.get_adminPermissions("organization_vacations"),
              to: "/admin/vacation-date",
            },

            {
              label: "Tibbiy ko'rik ",
              icon: "pi pi-id-card",
              visible: () => this.get_adminPermissions("organization_meds"),
              to: "/admin/meds",
            },
            {
              label: "Tabel",
              icon: "pi pi-id-card",
              visible: () => this.get_adminPermissions("organization_meds"),
              to: "/admin/tabel",
            },
            {
              label: "Jazolanganlar",
              icon: "pi pi-th-large",
              visible: () => this.get_adminPermissions("organization_discips"),
              to: "/admin/punishment",
            },
            {
              label: "Mukofatlanganlar",
              icon: "pi pi-star",
              visible: () =>
                this.get_adminPermissions("organization_incentives"),
              to: "/admin/incentive",
            },
            {
              label: "Tavsiya etilganlar",
              icon: "pi pi-briefcase",
              visible: () =>
                this.get_adminPermissions("organization_incentives"),
              to: "/admin/recomended",
            },
          ],
        },
        {
          label: "Tayorlov",
          icon: "pi pi-th-large",
          visible: () =>
            this.get_TitlePermission(["management_qualifications"]),

          items: [
            {
              label: "Xo'jaliklar",
              icon: "pi pi-stop",
              visible: () =>
                this.get_adminPermissions("management_qualifications"),
              to: "/admin/types",
            },
            {
              label: "Yo'nalishlar",
              icon: "pi pi-stop",
              visible: () =>
                this.get_adminPermissions("management_qualifications"),
              to: "/admin/direction",
            },
            {
              label: "Malaka oshirish",
              icon: "pi pi-stop",
              visible: () =>
                this.get_adminPermissions("management_qualifications"),
              to: "/admin/skill",
            },
            {
              label: "Texnikumlar",
              icon: "pi pi-stop",
              visible: () =>
                this.get_adminPermissions("management_qualifications"),
              to: "/admin/dual",
            },
            {
              label: "Kasblar",
              icon: "pi pi-stop",
              visible: () =>
                this.get_adminPermissions("management_qualifications"),
              to: "/admin/profession",
            },
            {
              label: "Kvalifikatsiyalar",
              icon: "pi pi-stop",
              visible: () =>
                this.get_adminPermissions("management_qualifications"),
              to: "/admin/specialties",
            },
          ],
        },
        {
          label: "Xavsizlik",
          icon: "pi pi-shield",
          visible: () =>
            this.get_TitlePermission(["admin","turnicet" ]),
          items: [
            {
              label: "Ma'sullar",
              icon: "pi pi-user",
              to: "/admin/superadmin",
              visible: () => this.get_adminPermissions("admin"),
            },
            {
              label: "Kirishlar",
              icon: "pi pi-book",
              visible: () => this.get_adminPermissions("organization_archive"),
              to: '/admin/login-history'
            },
            {
              label: "Turniket",
              icon: "pi pi-shield",
              visible: () => this.get_adminPermissions("turnicet"),
              to: '/admin/turnicet-history'
            },
            {
              label: "Amallar",
              icon: "pi pi-shield",
              visible: () => this.get_adminPermissions("admin"),
            },
          ],
        },
      ],
    };
  },
  computed: {
    ...mapGetters(["get_adminPermissions", "get_TitlePermission"]),
  },
};
</script>
<style lang="scss">
.sidebar_box {
  & .p-menu {
    background-color: #313a46 !important;
  }
}

.sidebar_box {
  height: 100vh;
  max-height: 100vh;
  overflow-y: auto !important;
}

// .sidebar_box::-webkit-scrollbar {
//   width: 10px;
//   scrollbar-color: #6ddd69 !important;

//   & ::-webkit-scrollbar {
//   width: 10px !important;
// }

// /* Track */
// &::-webkit-scrollbar-track {
//   background: #313a46 !important;
// }

// /* Handle */
// &::-webkit-scrollbar-thumb {
//   background: #313a46 !important;
// }

// /* Handle on hover */
// &::-webkit-scrollbar-thumb:hover {
//   background: #313a46 !important;
//   cursor: pointer;
// }
// }

.sidebar_box::-webkit-scrollbar-thumb:hover {
  background: #0b0d11 !important;
  border-radius: 10px !important;
  cursor: pointer !important;
}

.sidebar_box::-webkit-scrollbar {
  width: 10px;
  border-radius: 10px !important;
}


.sidebar_menu {
  min-height: calc(100vh - 58px);

  .p-menuitem {
    font-weight: 500;
    outline-width: 10px;
  }

  .p-menuitem-icon {
    padding-right: 10px;
    font-size: 18px !important;
  }

  .p-menuitem-text {
    color: #aeb2b5 !important;
    font-weight: 400 !important;
  }

  .p-menuitem-link:hover {
    background: #51657a !important;
    border-radius: 6px;
  }

  .p-menuitem-link:focus {
    border-radius: 6px;
    background: #51657a !important;
  }

  .p-menuitem-link:visited {
    border-radius: 6px;
    background: #51657a !important;
  }

  .router-link-active {
    border-radius: 6px;
    background: #51657a !important;

    .p-menuitem-icon,
    .p-menuitem-text {
      color: #fff !important;
    }
  }
}

.sidebar_menu {
  width: 100%;
}</style>