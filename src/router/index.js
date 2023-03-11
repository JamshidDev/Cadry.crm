import { createRouter, createWebHistory } from "vue-router";
const checkToken = () => {
  const token_date = localStorage.getItem("token_created_date");
  let date_token = new Date(token_date).getTime();
  let date_now = new Date().getTime();
  let distance = Math.floor((date_now - date_token) / 1000);
  if (distance > 20000) {
    return false;
  } else {
    return true;
  }
};

const beforeLogin = (to, from, next) => {
  const token = localStorage.getItem("access_token");
  if (token && from.name == "login") {
    next("/admin");
  } else if (token && checkToken()) {
    next("/admin");
  } else {
    localStorage.removeItem("access_token");
    localStorage.removeItem("token_created_date");
    next("login");
  }
};

const authLogin = (to, from, next) => {
  const token = localStorage.getItem("access_token");
  if (token && checkToken()) {
    next();
  } else {
    next("login");
  }
};

const routes = [
  {
    path: "/admin",
    name: "admin",
    beforeEnter: authLogin,
    component: function () {
      return import("../Layout/Layout.vue");
    },
    children: [
      {
        path: "/admin",
        name: "homepage",
        component: function () {
          return import("../views/HomePage.vue");
        },
      },
      {
        path: "/admin/statistic",
        name: "statistic",
        component: function () {
          return import("../views/StatisticPage.vue");
        },
      },
      {
        path: "/admin/view",
        name: "view",
        children: [
          {
            path: "/admin/view/vacanc/:railway_id/:organization_id/:department_id/:global",
            name: "ViewVacation",
            component: function () {
              return import("../views/ViewPages/Vacanc/VakantSverxPage.vue");
            },
          },
          {
            path: "/admin/view/birthday/:railway_id/:organization_id/:department_id/:global",
            name: "ViewBirthday",
            component: function () {
              return import("../views/ViewPages/Birthday/BirthdayPage.vue");
            },
          },
          {
            path: "/admin/view/retired/:railway_id/:organization_id/:department_id/:global",
            name: "ViewRetired",
            component: function () {
              return import("../views/ViewPages/Retired/RetiredPage.vue");
            },
          },
          {
            path: "/admin/view/sverx/:railway_id/:organization_id/:department_id/:global",
            name: "ViewSverx",
            component: function () {
              return import("../views/ViewPages/Sverx/SverxPage.vue");
            },
          },
          {
            path: "/admin/view/newcadry/:railway_id/:organization_id/:department_id/:global",
            name: "Newcadry",
            component: function () {
              return import("../views/ViewPages/NewCadry/NewCadryPage.vue");
            },
          },
          {
            path: "/admin/view/deletecadry/:railway_id/:organization_id/:department_id/:global",
            name: "Deletecadry",
            component: function () {
              return import("../views/ViewPages/DeleteCadry/DeleteCadry.vue");
            },
          },
          {
            path: "/admin/view/contractcadry/:railway_id/:organization_id/:department_id/:global",
            name: "Contractcadry",
            component: function () {
              return import(
                "../views/ViewPages/ContractCadry/ContractCadey.vue"
              );
            },
          },
          {
            path: "/admin/view/relativecadry/:railway_id/:organization_id/:department_id/:global",
            name: "Relativecadry",
            component: function () {
              return import(
                "../views/ViewPages/Relativecadry/RelativeCadryPage.vue"
              );
            },
          },
          {
            path: "/admin/view/careercadry/:railway_id/:organization_id/:department_id/:global",
            name: "Careercadry",
            component: function () {
              return import(
                "../views/ViewPages/CareerCadry/CareerCadryPage.vue"
              );
            },
          },
          {
            path: "/admin/view/vacation/:railway_id/:organization_id/:department_id/:global",
            name: "Vacation",
            component: function () {
              return import("../views/ViewPages/Vacation/VacationPage.vue");
            },
          },
          {
            path: "/admin/view/med/:railway_id/:organization_id/:department_id/:global",
            name: "Med",
            component: function () {
              return import("../views/ViewPages/Med/MedPage.vue");
            },
          },
          {
            path: "/admin/view/blacklist/:railway_id/:organization_id/:department_id/:global",
            name: "BlackList",
            component: function () {
              return import("../views/ViewPages/BlackCadry/BlackCadryPage.vue");
            },
          },
          {
            path: "/admin/view/stuffs/:railway_id/:organization_id/:department_id/:global",
            name: "Stuffs",
            component: function () {
              return import("../views/ViewPages/Stuff/StuffPage.vue");
            },
          },
          {
            path: "/admin/view/passport/:railway_id/:organization_id/:department_id/:global",
            name: "cadry-passport",
            component: function () {
              return import("../views/ViewPages/Passport/PassportPage.vue");
            },
          },
        ],
      },
      {
        path: "/admin/partstatistic",
        name: "partstatistic",
        component: function () {
          return import("../views/FactoryStatistic.vue");
        },
      },
      {
        path: "/admin/setting",
        name: "setting",
        component: function () {
          return import("../views/SettingPage.vue");
        },
      },
      {
        path: "/admin/employees",
        name: "employees",

        component: function () {
          return import("../views/EmployeesPage.vue");
        },
      },
      {
        path: "/admin/companies",
        name: "companies",

        component: function () {
          return import("../views/CompanyPage.vue");
        },
      },
      {
        path: "/admin/position",
        name: "position",

        component: function () {
          return import("../views/PositionPage.vue");
        },
      },
      {
        path: "/admin/message/incoming",
        name: "incoming-message",

        component: function () {
          return import("../views/Messages/EnterMessage.vue");
        },
      },
      {
        path: "/admin/message/outgoing",
        name: "outgoing-message",

        component: function () {
          return import("../views/Messages/OutputMessage.vue");
        },
      },
      {
        path: "/admin/position/userList/:position_id/:position_name",
        name: "positionList",

        component: function () {
          return import("../components/userList/PositionUserList.vue");
        },
      },
      {
        path: "/admin/partfactory",
        name: "partfactory",

        component: function () {
          return import("../views/PartFactory.vue");
        },
      },
      {
        path: "/admin/employee/view/:id",
        name: "viewdetails",

        component: function () {
          return import("../views/ViewDetailsPage.vue");
        },
      },
      {
        path: "/admin/department/cadry/:id/:name",
        name: "departmentcadry",

        component: function () {
          return import("../components/userList/DepartmentCadryList.vue");
        },
      },
      {
        path: "/admin/department/stuff/:id/:name",
        name: "departmentstuff",

        component: function () {
          return import("../views/DepartmentStuff.vue");
        },
      },
      {
        path: "/admin/department/stuff/cadry/:id/:name/:depId/:depName",
        name: "departmentstuffcadry",
        component: function () {
          return import("../components/userList/StuffCadry.vue");
        },
      },
      {
        path: "/admin/meds",
        name: "med",

        component: function () {
          return import("../views/MegPage.vue");
        },
      },
      {
        path: "/admin/tabel",
        name: "tabel",

        component: function () {
          return import("../views/Tabel/Tabel.vue");
        },
      },
      
      
      {
        path: "/admin/country-zone",
        name: "country-zone",
        component: function () {
          return import("../views/Regions/RegionPage.vue");
        },
      },
      {
        path: "/admin/country-zone/districts/:id/:name",
        name: "districts",
        component: function () {
          return import("../views/Districts/DistrictPage.vue");
        },
      },
      {
        path: "/admin/skill",
        name: "Skill",

        component: function () {
          return import("../views/SkillPage/SkillPage.vue");
        },
      },
      {
        path: "/admin/types",
        name: "types",

        component: function () {
          return import("../views/SkillPage/TypesPage.vue");
        },
      },
      {
        path: "/admin/dual",
        name: "dual",

        component: function () {
          return import("../views/SkillPage/DualPage.vue");
        },
      },
      {
        path: "/admin/skill/organization/:type_id/:direction_id/:date_equal/:railway_id/:name",
        name: "Skill-organization",

        component: function () {
          return import("../views/SkillPage/SkillorganizationPage.vue");
        },
      },
    
      {
        path: "/admin/direction",
        name: "SkillDirection",

        component: function () {
          return import("../views/SkillPage/DirectionPage.vue");
        },
      },
      
      {
        path: "/admin/profession",
        name: "SkillProfession",
        component: function () {
          return import("../views/SkillPage/ProfessionPage.vue");
        },
      },
      {
        path: "/admin/specialties",
        name: "SkillSpecialties",
        component: function () {
          return import("../views/SkillPage/SpecialtiesPage.vue");
        },
      },

      {
        path: "/admin/superadmin",
        name: "superadmin",
        component: function () {
          return import("../views/Admin/AdminPage.vue");
        },
      },
      {
        path: "/admin/vacation",
        name: "vacation",
        component: function () {
          return import("../views/VacationPage.vue");
        },
      },
      {
        path: "/admin/vacation-date",
        name: "vacation-date",
        component: function () {
          return import("../views/VacationDate/VacationDate.vue");
        },
      },
      {
        path: "/admin/punishment",
        name: "punishment",
        component: function () {
          return import("../views/PunishmentPage.vue");
        },
      },
      {
        path: "/admin/incentive",
        name: "incentive",
        component: function () {
          return import("../views/IncentivePage.vue");
        },
      },

      {
        path: "/admin/partemployee",
        name: "partemployee",
        component: function () {
          return import("../views/PartEmployeesPage.vue");
        },
      },
      {
        path: "/admin/historyemployee",
        name: "historyemployee",
        component: function () {
          return import("../views/HistoryEmployeePage.vue");
        },
      },
      {
        path: "/admin/historycadry",
        name: "history-cadry",
        component: function () {
          return import("../views/Archive/ArchiveCadryPage.vue");
        },
      },

      {
        path: "/admin/addnewemployee",
        name: "addnewemployee",
        component: function () {
          return import("../views/AddingNewEmployee.vue");
        },
      },
      {
        path: "/admin/profil",
        name: "profil",
        component: function () {
          return import("../views/ProfilPage.vue");
        },
      },
      {
        path: "/admin/zipfiles",
        name: "zipfiles",
        component: function () {
          return import("../views/DowloadedZIp/ZipPage.vue");
        },
      },
      {
        path: "/admin/editemployee/:id",
        name: "editemployee",
        component: function () {
          return import("../views/Cadry/CadryPage.vue");
        },
        children: [
          {
            path: "/admin/editemployee/:id",
            name: "details-one",
            component: function () {
              return import("../views/Cadry/CadryDetails/PersonalPage.vue");
            },
          },
          {
            path: "/admin/editemployee/:id/two",
            name: "details-two",
            component: function () {
              return import("../components/editEmployee/EditAcademy.vue");
            },
          },
          {
            path: "/admin/editemployee/:id/three",
            name: "details-three",
            component: function () {
              return import("../components/editEmployee/WorkActivity.vue");
            },
          },
          {
            path: "/admin/editemployee/:id/four",
            name: "details-four",
            component: function () {
              return import("../components/editEmployee/RelativeList.vue");
            },
          },
          {
            path: "/admin/editemployee/:id/five",
            name: "details-five",
            component: function () {
              return import("../views/Cadry/CadryDetails/AdditionalPage.vue");
            },
          },
          {
            path: "/admin/editemployee/:id/six",
            name: "details-six",

            component: function () {
              return import("../components/editEmployee/Otherpage.vue");
            },
          },
        ],
      },
    ],
  },

  {
    path: "/",
    name: "home",
    beforeEnter: beforeLogin,
  },
  {
    path: "/login",
    name: "login",
    component: function () {
      return import("../Layout/LoginPage.vue");
    },
  },
  {
    path: "/guide",
    name: "guide",

    component: function () {
      return import("../views/Guide/GuidePage.vue");
    },
    children: [
      {
        path: "/guide/",
        name: "guide-home",
        component: function () {
          return import("../views/Guide/Pages/GuideHomePage.vue");
        },
      },
      {
        path: "/guide/one",
        name: "guide-one",
        component: function () {
          return import("../views/Guide/Pages/LoginPage.vue");
        },
      },
      {
        path: "/guide/two",
        name: "guide-two",
        component: function () {
          return import("../views/Guide/Pages/NewCadry.vue");
        },
      },
    ],
  },

  {
    path: "/:pathMatch(.*)*",
    name: "NotFound",
    component: function () {
      return import("../views/NotFoundPage.vue");
    },
  },

];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;
