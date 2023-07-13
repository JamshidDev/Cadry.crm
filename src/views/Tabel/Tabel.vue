<template>
  <div class="grid px-1 w-full">
    <div class="col-12">
      <div class="grid">
        <div class="col-6 y-0 py-0">
          <span class="text-2xl font-semibold"
            >Tabel
            <span class="text-base text-primary pl-2"> ({{ totalPage }})</span>
          </span>
        </div>
        <div class="col-6 pb-0">
          <bread-crumb :breadCump="[{ name: 'Tabel', path: '' }]"></bread-crumb>
        </div>
      </div>
    </div>

    <div class="col-12 flex flex-wrap gap-2 align-items-center">
      <Calendar
        v-model="current_month"
        view="month"
        dateFormat="mm/yy"
        @date-select="changeCalendar"
        :loading="loading"
        :manual-input="false"
        style="width: 200px"
        class="p-inputtext-sm"
      />
      <!-- <Button icon="pi pi-download" label="Yuklash T-12" class="p-button-success p-button-sm"></Button>
            <Button icon="pi pi-download" label="Yuklash T-13" class="p-button-success p-button-sm"></Button> -->
      <span class="p-input-icon-left">
        <i class="pi pi-search" />
        <InputText
          class="p-inputtext-sm"
          v-model.trim="search_cadry"
          :disabled="loading"
          placeholder="Qidiruv..."
          @keyup="search_name(this.search_cadry)"
          @keyup.enter="search_name(this.search_cadry)"
        />
      </span>
      <Button
        icon="pi pi-microsoft"
        @click="auto_select()"
        label=""
        :loading="loading"
        v-tooltip.bottom="`Bo'sh katakchalarni to'ldirish`"
        class="p-button-secondary text-sm p-button-sm"
      ></Button>
      <Button
        icon="pi pi-sync"
        @click="auto_clear()"
        label=""
        :loading="loading"
        v-tooltip.bottom="`Barcha katakchalarni tozalash (istisno - РП)`"
        class="p-button-danger text-sm p-button-sm"
      ></Button>
      <ToggleButton
        v-model="is_delete"
        onLabel="Faol"
        offLabel="Tozalash"
        :disabled="loading"
        v-tooltip.bottom="`Tanlash yo'li bilan tozalash`"
        onIcon="pi pi-circle-fill"
        offIcon="pi pi-ban"
        class="text-sm font-normal uppercase p-button-sm"
      />
      <Button
        icon="pi pi-sync"
        @click="load_turnicate()"
        label="Turniketdan to'ldirish"
        :loading="loading"
        v-tooltip.bottom="`Ma'lumotlarni turniketdan yuklash`"
        class="p-button-success text-sm p-button-sm"
      ></Button>
    </div>

    <div class="col-12">
      <div class="tabel-cointer-box">
        <div class="tabel-container">
          <table class="tabel-box" v-if="!loading">
            <tr class="tabel-row tabel-row-header">
              <td class="tabel-col-header"><span> F.I.SH </span></td>
              <td
                class="tabel-col"
                v-for="(month_day, index) in Tabel_days"
                :key="index"
                :class="
                  ['Ya', 'Sh'].includes(month_day.weekday) && 'weekend_days'
                "
                @click="select_col(index)"
              >
                <div class="content-month">
                  <span>{{ month_day.day }}</span>
                  <span>{{ month_day.weekday }}</span>
                </div>
              </td>
              <td class="tabel-col">
                <div class="summ">
                  <span>Kun</span>
                  <span>soat</span>
                </div>
              </td>
            </tr>

            <tr
              class="tabel-row"
              v-for="(cadry, cadry_index) in Tabel_cadry"
              :key="cadry"
            >
              <td class="tabel-col-header" @click="select_row(cadry_index)">
                {{ `(${cadry.number})- ` + cadry.fullname }}
              </td>

              <td
                class="tabel-col tabel-col-content content-element"
                v-for="(item, day_index) in cadry.days"
                :key="day_index"
                :class="`content-bg-${item.category_id}`"
                @click="select_day(cadry.id, item.day, cadry_index, day_index)"
                @contextmenu.prevent="unselect_day(cadry_index, day_index)"
              >
                <div class="work_panel" v-if="item.category_id">
                  <span>{{ category_name(item.category_id) }}</span>
                  <span v-if="item.work_time">{{ item.work_time }}</span>
                </div>
              </td>

              <td class="tabel-col-sum">
                <div class="total_summ">
                  <span>{{ total_sum(cadry.id).total_day }}</span>
                  <span>{{ total_sum(cadry.id).total_time }}</span>
                </div>
              </td>
            </tr>
          </table>
          <div class="grid w-full relative">
            <div
              class="col-12 flex justify-content-center align-items-center relative p-4"
            >
              <Paginator
                :template="{
                  '640px': ' PrevPageLink PageLinks NextPageLink ',
                  '960px':
                    'FirstPageLink PrevPageLink PageLinks NextPageLink LastPageLink ',
                  '1300px':
                    'FirstPageLink PrevPageLink PageLinks NextPageLink LastPageLink ',
                  default:
                    'FirstPageLink PrevPageLink PageLinks NextPageLink LastPageLink ',
                }"
                v-model:first="current_page"
                v-model:rows="params.per_page"
                :totalRecords="total_item"
                v-show="total_item > 10"
                class="py-0 text-base"
                style="background: transparent; height: 30px; max-height: 30px"
                template="FirstPageLink PrevPageLink PageLinks NextPageLink LastPageLink "
                @page="changePagination($event)"
              >
              </Paginator>
            </div>
          </div>
          <ProgressBarLoader
            v-if="loading"
            :min_height="'400px'"
          ></ProgressBarLoader>
        </div>
      </div>
    </div>

    <div
      class="xl:col-8 lg:col-7 col-12 flex flex-wrap gap-2 align-content-center"
    >
      <Dropdown
        id="tabel_types"
        style="min-width: 200px; width: 500px"
        v-model="type_val"
        :options="category_List"
        :loading="loading"
        optionLabel="fullname"
        :filter="true"
        placeholder="Tanlang"
        @change="changeType"
      >
        <template #value="slotProps">
          <div class="country-item country-item-value" v-if="slotProps.value">
            <div>{{ slotProps.value.fullname }}</div>
          </div>
          <span v-else>
            {{ slotProps.placeholder }}
          </span>
        </template>
        <template #option="slotProps">
          <div class="country-item">
            <div>{{ slotProps.option.fullname }}</div>
          </div>
        </template>
      </Dropdown>
      <InputNumber
        :disabled="loading"
        v-model="work_time"
        inputId="minmax-buttons"
        mode="decimal"
        showButtons
        :min="0"
        :max="100"
        placeholder="Ish vaqti"
      />
    </div>
    <div
      class="xl:col-4 lg:col-5 col-12 mb-6 xl:mb-0 lg:mb-0 md:mb-0 flex justify-content-end align-items-center"
    >
      <Button
        icon="pi pi-download"
        label=""
        class="p-button-success text-sm font-normal uppercase mr-2"
        @click="dowload_exel()"
        :loading="download_loading"
      ></Button>
      <Button
        icon="pi pi-save"
        label="Saqlash"
        class="p-button-primary text-sm font-normal uppercase"
        @click="save_tabel()"
        :loading="save_loading"
      ></Button>
    </div>
    <div class="col-12">
      <Toast position="top-right" />
    </div>
  </div>
</template>

<script>
import {
  mapActions,
  mapGetters,
} from 'vuex';

import BreadCrumb from '@/components/BreadCrumb/BreadCrumb.vue';
import ProgressBarLoader from '@/components/loaders/ProgressBarLoader.vue';
import TabelService from '@/service/servises/TabelService';
import Formatter from '@/util/formatter';

export default {
  components: {
    BreadCrumb,
    ProgressBarLoader,
  },
  data() {
    return {
      Formatter,
      loading: false,
      download_loading: false,
      save_loading: false,
      is_delete: false,
      totalPage: 0,
      total_item: 0,
      search_cadry: null,
      select_user_list: [],
      current_work_time: null,
      current_work_type: null,
      current_month: new Date(),
      type_val: null,
      work_time: null,
      Tabel_days: [],
      Tabel_cadry: [],
      category_List: [],
      all_cadry_list: [],
      search_tabel_list: [],
      original_all_cadry_list: [],
      params: {
        page: 0,
        per_page: 10,
      },
      current_page: 0,
      select_date: {
        year: null,
        month: null,
      },
    };
  },
  computed: {
    ...mapGetters([
      "get_tabel_days",
      "get_cadry_list",
      "get_category_val",
      "get_category_list",
    ]),
  },
  watch: {
    work_time(val) {
      this.current_work_time = val;
    },
    params(val) {
      console.log(val);
    },
  },
  methods: {
    ...mapActions([
      "set_tabel_days",
      "set_category_list",
      "set_cadry_list",
      "set_category_val",
      "set_tabel",
    ]),

    changeType() {
      this.work_time = this.type_val.work_time;
      this.current_work_type = this.type_val.id;
    },
    changeCalendar() {
      let new_date = new Date(this.current_month);
      this.select_date.year = new_date.getFullYear();
      this.select_date.month = new_date.getMonth() + 1;
      this.get_tabels(this.select_date);
    },
    get_tabels(payload) {
      this.loading = true;
      this.download_loading = true;
      this.save_loading = true;
      TabelService.get_Tabels({
        year: payload.year,
        month: payload.month,
      }).then((res) => {
        this.Tabel = res.data;

        this.Tabel_days = res.data.days;
        this.category_List = res.data.categories;
        this.type_val = res.data.categories[0];
        this.current_work_type = res.data.categories[0].id;
        this.work_time = res.data.categories[0].work_time;

        this.totalPage = res.data.cadries.length;
        let number = 0;
        res.data.cadries.forEach((item) => {
          number++;
          item.number = number;
        });

        this.all_cadry_list = res.data.cadries;
        this.search_tabel_list = res.data.cadries;
        this.pagination_page(
          this.search_tabel_list,
          this.params.per_page,
          this.params.page
        );
        this.loading = false;
        this.download_loading = false;
        this.save_loading = false;
      });
    },

    load_turnicate() {
      this.loading = true;
      this.download_loading = true;
      this.save_loading = true;
      this.pagination_page(
            [],
            this.params.per_page,
            this.params.page
          );

      TabelService.load_Turnicate({
        year: this.select_date.year,
        month: this.select_date.month,
      })
        .then((res) => {
          this.Tabel = res.data;

          this.Tabel_days = res.data.days;
          this.category_List = res.data.categories;
          this.type_val = res.data.categories[0];
          this.current_work_type = res.data.categories[0].id;
          this.work_time = res.data.categories[0].work_time;

          this.totalPage = res.data.cadries.length;
          let number = 0;
          res.data.cadries.forEach((item) => {
            number++;
            item.number = number;
          });

          this.all_cadry_list = res.data.cadries;
          this.search_tabel_list = res.data.cadries;
          this.pagination_page(
            this.search_tabel_list,
            this.params.per_page,
            this.params.page
          );
        })
        .finally(() => {
          this.loading = false;
          this.download_loading = false;
          this.save_loading = false;
        });
    },

    async select_day(cadry_id, day, cadry_index, day1_index) {
      if (this.is_delete) {
        this.Tabel_cadry[cadry_index].days[day1_index].category_id = null;
        this.Tabel_cadry[cadry_index].days[day1_index].work_time = null;
      } else {
        this.Tabel_cadry[cadry_index].days[day1_index].category_id =
          this.current_work_type;
        this.Tabel_cadry[cadry_index].days[day1_index].work_time =
          this.current_work_time;
      }
      return true;
    },
    unselect_day(cadry_index, day1_index) {
      this.Tabel_cadry[cadry_index].days[day1_index].category_id = null;
      this.Tabel_cadry[cadry_index].days[day1_index].work_time = null;
    },
    category_name(id) {
      return this.category_List.filter((item) => item.id == id)[0].name;
    },
    total_sum(cadry_id) {
      let days = this.Tabel_cadry.filter((cadry) => cadry.id == cadry_id)[0]
        .days;
      let total_day = 0;
      let total_time = 0;
      days.forEach((item) => {
        if (item.work_time > 0) {
          total_day++;
          total_time = total_time + item.work_time;
        }
      });

      return {
        total_day,
        total_time,
      };
    },
    pagination_page(array, per_page, page) {
      this.total_item = array.length;
      this.totalPage = array.length;
      this.current_page = page * per_page;
      this.total_item = array.length;
      this.Tabel_cadry = array.slice(page * per_page, (page + 1) * per_page);
    },
    changePagination(event) {
      console.log(event);
      this.params.page = event.page;
      this.params.per_page = event.rows;
      this.current_page = event.page * event.rows;

      this.pagination_page(
        this.search_tabel_list,
        this.params.per_page,
        this.params.page
      );
    },
    select_row(cadry_index) {
      for (
        let item = 0;
        item < this.Tabel_cadry[cadry_index].days.length;
        item++
      ) {
        if (this.is_delete) {
          this.Tabel_cadry[cadry_index].days[item].category_id = null;
          this.Tabel_cadry[cadry_index].days[item].work_time = null;
        } else {
          if (
            this.Tabel_cadry[cadry_index].days[item].category_id == null &&
            this.Tabel_cadry[cadry_index].days[item].work_time == null
          ) {
            this.Tabel_cadry[cadry_index].days[item].category_id =
              this.current_work_type;
            this.Tabel_cadry[cadry_index].days[item].work_time =
              this.current_work_time;
          }
        }
      }
    },
    select_col(day_index) {
      this.Tabel_cadry.forEach((cadry) => {
        console.log(this.is_delete);
        if (this.is_delete) {
          cadry.days[day_index].category_id = null;
          cadry.days[day_index].work_time = null;
        } else {
          if (
            cadry.days[day_index].category_id == null &&
            cadry.days[day_index].work_time == null
          ) {
            cadry.days[day_index].category_id = this.current_work_type;
            cadry.days[day_index].work_time = this.current_work_time;
          }
        }
      });
    },
    auto_select() {
      this.all_cadry_list.forEach((cadry) => {
        cadry.days.forEach((day, index) => {
          if (
            day.category_id == null &&
            day.work_time == null &&
            this.current_work_type != 3
          ) {
            if (this.Tabel_days[index].before_day) {
              day.category_id = 1;
              day.work_time = 7;
            } else {
              day.category_id = this.current_work_type;
              day.work_time = this.current_work_time;
            }
          }
        });
      });
    },
    auto_clear() {
      if (this.all_cadry_list.length > 0) {
        this.all_cadry_list.forEach((cadry) => {
          cadry.days.forEach((day) => {
            if (day.category_id == 3) {
              day.work_time = 0;
            } else {
              day.category_id = null;
              day.work_time = null;
            }
          });
        });
        this.$toast.add({
          severity: "success",
          summary: "Tozalandi",
          detail: "Muvofaqiyatli bajarrildi",
          life: 2000,
        });
      }
    },
    search_name(search_text) {
      if (search_text) {
        this.search_tabel_list = [];
        this.params.page = 0;
        this.params.per_page = 10;
        let number = 1;
        this.all_cadry_list.forEach((cadry) => {
          if (
            cadry.fullname.toLowerCase().search(search_text.toLowerCase()) !==
            -1
          ) {
            cadry.number = number++;
            this.search_tabel_list.push(cadry);
          }
        });
        this.pagination_page(
          this.search_tabel_list,
          this.params.per_page,
          this.params.page
        );
      } else {
        let number = 0;
        this.all_cadry_list.forEach((item) => {
          number++;
          item.number = number;
        });
        this.search_tabel_list = this.all_cadry_list;
        this.pagination_page(this.search_tabel_list, 10, 0);
      }
    },
    save_tabel() {
      this.save_loading = true;
      this.save_loading = true;
      let data = {
        cadries: this.all_cadry_list,
        year: this.select_date.year,
        month: this.select_date.month,
      };
      console.log(data);
      TabelService.create_Tabels({ data }).then((res) => {
        this.$toast.add({
          severity: "success",
          summary: "Saqlandi",
          detail: "Muvofaqiyatli bajarrildi",
          life: 2000,
        });
        this.save_loading = false;
      });
    },
    dowload_exel() {
      this.download_loading = true;
      TabelService.dowload_Tabels({
        year: this.select_date.year,
        month: this.select_date.month,
      }).then((response) => {
        console.log(response);
        var fileURL = window.URL.createObjectURL(
          new Blob([response.data], {
            type: "application/excelx",
          })
        );
        var fileLink = document.createElement("a");
        fileLink.href = fileURL;
        fileLink.setAttribute(
          "download",
          `Tabel(${
            this.select_date.month > 10
              ? this.select_date.month
              : "0" + this.select_date.month
          }-${this.select_date.year}).xlsx`
        );
        document.body.appendChild(fileLink);
        fileLink.click();
        document.body.removeChild(fileLink);
        this.download_loading = false;
      });
    },
  },
  created() {
    let now = new Date();
    this.select_date.year = now.getFullYear();
    this.select_date.month = now.getMonth() + 1;
    this.get_tabels(this.select_date);
  },
};
</script>

<style lang="scss" scoped>
.tabel-cointer-box {
  width: 100% !important;
  position: relative;
  max-width: 100% !important;
  overflow: auto;
  // min-height: calc(100vh - 280px);
  // max-height: calc(100vh - 280px);
  height: auto;
  min-height: 200px;
  background-color: #fff;
  padding: 10px;
  border-radius: 8px;

  &::-webkit-scrollbar {
    width: 6px !important;
  }

  /* Track */
  &::-webkit-scrollbar-track {
    box-shadow: inset 0 0 5px grey;
    border-radius: 4px;
  }

  /* Handle */
  &::-webkit-scrollbar-thumb {
    background: #3b82f6;
    border-radius: 4px;
  }

  /* Handle on hover */
  &::-webkit-scrollbar-thumb:hover {
    background: #3b82f6;
    cursor: pointer !important;
  }
}

.tabel-container {
  min-width: 100% !important;
  background-color: #fff;
  transition: all 0.3s ease;
}

.tabel-box {
  width: 100%;
  // border: 1px solid #ced4da;
  border-collapse: collapse;
  position: relative;
  transition: all 0.3s ease-out;

  .tabel-row-header {
    // position: sticky;
    // top: -2px;
    background-color: #fff;
    border: 1px solid #ced4da;
    // box-shadow: 0px 1px #ced4da;
    transition: all 0.3s ease-out;
  }

  .tabel-col {
    width: 40px;
    max-width: 40px;
    min-width: 30px;
    height: auto;
    min-height: 42px;
    border: 1px solid #ced4da;
    transition: all 0.3s ease-out;
    cursor: pointer !important;

    .content-month {
      display: flex;
      flex-direction: column;

      span {
        width: 100%;
        text-align: center;
        font-weight: 500;
        font-size: 12px;
      }
    }

    .summ {
      display: flex;
      flex-direction: column;

      span {
        width: 100%;
        text-align: center;
        font-weight: 500;
        font-size: 12px;
      }
    }
  }

  .tabel-col-sum {
    max-width: 60px;
    min-width: 60px;
    border: 1px solid #ced4da;

    .total_summ {
      span {
        display: block;
        text-align: center;
        font-weight: 500;
        font-size: 12px;
      }
    }
  }

  .tabel-col-header {
    width: 200px;
    max-width: 200px;
    min-width: 160px;
    padding: 2px 4px;
    text-align: center;
    font-size: 12px;
    font-weight: 500 !important;

    span {
      display: inline-block;
      width: 100%;
      text-align: center;
      font-weight: 500;
      font-size: 12px;
    }
  }

  .tabel-col-header:nth-child(1) {
    border: 1px solid #ced4da;
  }

  .tabel-col-header:nth-child(n + 2) {
    border: 1px solid #1779db;
  }
}

* {
  user-select: none !important;
}
</style>