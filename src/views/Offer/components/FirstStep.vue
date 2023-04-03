<template>
  <div class="grid" v-if="get_select_infos">
    <div class="col-12 flex justify-content-center">
      <div class="avatar-box " :class="{ 'invaalid-avatar': !image.src && submitted }">
        <img v-show="image.src" alt="" :src="image.src">
        <img v-show="!image.src" alt="" src="../../../assets/avatar/emptyy_avatar.jpg">
        <span class="edit-btn" @click="upload_avatar()">
          <i class='bx bx-edit'></i>
        </span>
      </div>
    </div>
    <div class="col-12 xl:col-4 lg:col-4 md:col-6 mb-2">
      <h6 class="mb-1 pl-2 candidate-input-label">Ismingiz</h6>
      <InputText type="text" name="candidate-firt-name" class="w-full font-normal " placeholder="Kiriting"
        v-model="v$.firt_name.$model" :class="{ 'p-invalid': v$.firt_name.$invalid && submitted }" />
      <span class="error-input-message block">{{ v$.firt_name.$errors[0]?.$message }}</span>
    </div>
    <div class="col-12 xl:col-4 lg:col-4 md:col-6 mb-2">
      <h6 class="mb-1 pl-2 candidate-input-label">Familiyangiz</h6>
      <InputText type="text" name="candidate-last-name" class="w-full font-normal" placeholder="Kiriting"
        v-model="v$.last_name.$model" :class="{ 'p-invalid': v$.last_name.$invalid && submitted }" />
      <span class="error-input-message block">{{ v$.last_name.$errors[0]?.$message }}</span>
    </div>
    <div class="col-12 xl:col-4 lg:col-4 md:col-6 mb-2">
      <h6 class="mb-1 pl-2 candidate-input-label">Sharifingiz</h6>
      <InputText type="text" name="candidate-third-name" class="w-full font-normal" placeholder="Kiriting"
        v-model="v$.third_name.$model" :class="{ 'p-invalid': v$.third_name.$invalid && submitted }" />
      <span class="error-input-message block">{{ v$.third_name.$errors[0]?.$message }}</span>
    </div>

    <div class="col-12 xl:col-4 lg:col-4 md:col-6 mb-2">
      <h6 class="mb-1 pl-2 candidate-input-label">Tug'ilgan sana</h6>
      <Calendar class="w-full font-normal" :manualInput="true" name="candidate-birthdate" v-maska="'##/##/####'"
        dateFormat="dd/mm/yy" :showButtonBar="true" placeholder="Sanani tanlang" v-model="v$.birthdate.$model"
        :class="{ 'p-invalid': v$.birthdate.$invalid && submitted }" />
      <span class="error-input-message block">{{ v$.birthdate.$errors[0]?.$message }}</span>
    </div>
    <div class="col-12 xl:col-4 lg:col-4 md:col-6 mb-2">
      <h6 class="mb-1 pl-2 candidate-input-label">Tug'ilgan viloyat</h6>
      <Dropdown name="candidate-birt-region" :options="get_select_infos.regions" optionLabel="name"
        placeholder="Viloyatni tanlang" class="w-full font-normal" v-model="v$.birth_regoin.$model"
        :class="{ 'p-invalid': v$.birth_regoin.$invalid && submitted }" />
      <span class="error-input-message block">{{ v$.birth_regoin.$errors[0]?.$message }}</span>
    </div>
    <div class="col-12 xl:col-4 lg:col-4 md:col-6 mb-2">
      <h6 class="mb-1 pl-2 candidate-input-label">Tug'ilgan tuman</h6>
      <Dropdown name="candidate-birt-city" :options="get_select_infos.cities" optionLabel="name" :filter="true"
        v-model="v$.birth_city.$model" :class="{ 'p-invalid': v$.birth_city.$invalid && submitted }"
        placeholder="Tumanni tanlang" class="w-full font-normal">
        <template #value="slotProps">
          <div class="country-item country-item-value" v-if="slotProps.value">
            <div>{{ slotProps.value.name }}</div>
          </div>
          <span v-else>
            {{ slotProps.placeholder }}
          </span>
        </template>
        <template #option="slotProps">
          <div class="country-item">
            <div>{{ slotProps.option.name }}</div>
          </div>
        </template>
      </Dropdown>
      <span class="error-input-message block">{{ v$.birth_city.$errors[0]?.$message }}</span>
    </div>
    <div class="col-12 xl:col-4 lg:col-4 md:col-6 mb-2">
      <h6 class="mb-1 pl-2 candidate-input-label">Yashash viloyat</h6>
      <Dropdown name="candidate-live-region" :options="get_select_infos.regions" optionLabel="name"
        placeholder="Viloyatni tanlang" class="w-full font-normal" v-model="v$.live_region.$model"
        :class="{ 'p-invalid': v$.live_region.$invalid && submitted }" />
      <span class="error-input-message block">{{ v$.live_region.$errors[0]?.$message }}</span>
    </div>
    <div class="col-12 xl:col-4 lg:col-4 md:col-6 mb-2">
      <h6 class="mb-1 pl-2 candidate-input-label">Yashash tuman</h6>
      <Dropdown name="candidate-live-city" :options="get_select_infos.cities" optionLabel="name" :filter="true"
        v-model="v$.live_city.$model" :class="{ 'p-invalid': v$.live_city.$invalid && submitted }"
        placeholder="Tumanni tanlang" class="w-full font-normal">
        <template #value="slotProps">
          <div class="country-item country-item-value" v-if="slotProps.value">
            <div>{{ slotProps.value.name }}</div>
          </div>
          <span v-else>
            {{ slotProps.placeholder }}
          </span>
        </template>
        <template #option="slotProps">
          <div class="country-item">
            <div>{{ slotProps.option.name }}</div>
          </div>
        </template>
      </Dropdown>
      <span class="error-input-message block">{{ v$.live_city.$errors[0]?.$message }}</span>
    </div>
    <div class="col-12 xl:col-4 lg:col-4 md:col-6 mb-2">
      <h6 class="mb-1 pl-2 candidate-input-label">Yashash manzil (to'liq)</h6>
      <InputText type="text" name="candidate-live-adress" class="w-full font-normal" placeholder="Kiriting"
        v-model="v$.live_adress.$model" :class="{ 'p-invalid': v$.live_adress.$invalid && submitted }" />
      <span class="error-input-message block">{{ v$.live_adress.$errors[0]?.$message }}</span>
    </div>
    <div class="col-12 xl:col-4 lg:col-4 md:col-6 mb-2">
      <h6 class="mb-1 pl-2 candidate-input-label">Millat</h6>
      <Dropdown name="candidate-nationality" :options="get_select_infos.nationalities" optionLabel="name"
        placeholder="Millatni tanlang" class="w-full font-normal" v-model="v$.nationality.$model"
        :class="{ 'p-invalid': v$.nationality.$invalid && submitted }" />
      <span class="error-input-message block">{{ v$.nationality.$errors[0]?.$message }}</span>
    </div>
    <div class="col-12 xl:col-4 lg:col-4 md:col-6 mb-2">
      <h6 class="mb-1 pl-2 candidate-input-label">Pasport seriya va raqami</h6>
      <InputText type="text" name="candidate-pasport-seriya" class="w-full font-normal" placeholder="Kiriting"
        v-model="v$.passport_seriya.$model" :class="{ 'p-invalid': v$.passport_seriya.$invalid && submitted }" />
      <span class="error-input-message block">{{ v$.passport_seriya.$errors[0]?.$message }}</span>
    </div>
    <div class="col-12 xl:col-4 lg:col-4 md:col-6 mb-2">
      <h6 class="mb-1 pl-2 candidate-input-label">Pasport JSHR</h6>
      <InputText type="text" name="candidate-pasport-jshr" class="w-full font-normal" placeholder="Kiriting"
        v-maska="'##############'" v-model="v$.passport_jshr.$model"
        :class="{ 'p-invalid': v$.passport_jshr.$invalid && submitted }" />
      <span class="error-input-message block">{{ v$.passport_jshr.$errors[0]?.$message }}</span>
    </div>
    <div class="col-12 xl:col-4 lg:col-4 md:col-6 mb-2">
      <h6 class="mb-1 pl-2 candidate-input-label">Pasport berilgan viloyat</h6>
      <Dropdown name="candidate-passport-region" :options="get_select_infos.regions" optionLabel="name"
        placeholder="Viloyatni tanlang" class="w-full font-normal" v-model="v$.passport_region.$model"
        :class="{ 'p-invalid': v$.passport_region.$invalid && submitted }" />
      <span class="error-input-message block">{{ v$.passport_region.$errors[0]?.$message }}</span>
    </div>
    <div class="col-12 xl:col-4 lg:col-4 md:col-6 mb-2">
      <h6 class="mb-1 pl-2 candidate-input-label">Pasport berilgan tuman</h6>
      <Dropdown name="candidate-passport-city" :options="get_select_infos.cities" optionLabel="name"
        v-model="v$.passport_city.$model" :class="{ 'p-invalid': v$.passport_city.$invalid && submitted }" :filter="true"
        placeholder="Tumanni tanlang" class="w-full font-normal">
        <template #value="slotProps">
          <div class="country-item country-item-value" v-if="slotProps.value">
            <div>{{ slotProps.value.name }}</div>
          </div>
          <span v-else>
            {{ slotProps.placeholder }}
          </span>
        </template>
        <template #option="slotProps">
          <div class="country-item">
            <div>{{ slotProps.option.name }}</div>
          </div>
        </template>
      </Dropdown>
      <span class="error-input-message block">{{ v$.passport_city.$errors[0]?.$message }}</span>
    </div>
    <div class="col-12 xl:col-4 lg:col-4 md:col-6 mb-2">
      <h6 class="mb-1 pl-2 candidate-input-label">Pasport berilgan sana</h6>
      <Calendar class="w-full font-medium" :manualInput="true" name="candidate-passport-date" v-maska="'##/##/####'"
        dateFormat="dd/mm/yy" :showButtonBar="true" placeholder="Sanani tanlang" v-model="v$.passport_date.$model"
        :class="{ 'p-invalid': v$.passport_date.$invalid && submitted }" />
      <span class="error-input-message block">{{ v$.passport_date.$errors[0]?.$message }}</span>
    </div>
    <div class="col-12 xl:col-4 lg:col-4 md:col-6 mb-2">
      <h6 class="mb-1 pl-2 candidate-input-label">Pasport tugash sana</h6>
      <Calendar class="w-full font-medium" :manualInput="true" name="candidate-passport-date" v-maska="'##/##/####'"
        dateFormat="dd/mm/yy" :showButtonBar="true" placeholder="Sanani tanlang" v-model="v$.passport_date2.$model"
        :class="{ 'p-invalid': v$.passport_date2.$invalid && submitted }" />
      <span class="error-input-message block">{{ v$.passport_date2.$errors[0]?.$message }}</span>
    </div>
    <div class="col-12 xl:col-4 lg:col-4 md:col-6 mb-2">
      <h6 class="mb-1 pl-2 candidate-input-label">Telefon raqam</h6>
      <InputText type="text" name="candidate-phone" class="w-full font-normal" placeholder="Kiriting"
        v-maska="'(##)-###-##-##'" v-model="v$.phone.$model" :class="{ 'p-invalid': v$.phone.$invalid && submitted }" />
      <span class="error-input-message block">{{ v$.phone.$errors[0]?.$message }}</span>
    </div>
    <div class="col-12">
      <button class="hidden" id="check_form1" @click="check_form((!v$.$invalid))">Check</button>
      <Cropper ref="avatar_ref" @cropper_blob_file="avatar_pic($event)" />
    </div>

  </div>
</template>

<script>
import {
  mapActions,
  mapGetters,
} from 'vuex';

import Cropper from '@/components/cropperPicture/Cropper.vue';
import { useVuelidate } from '@vuelidate/core';
import {
  helpers,
  maxLength,
  minLength,
  required,
} from '@vuelidate/validators';

export default {
  setup() {
    const v$ = useVuelidate();
    return { v$ };
  },
  components: {
    Cropper,
  },
  computed: {
    ...mapGetters([
      "get_candidate_form1", "get_select_infos"
    ]),
  },
  data() {
    return {
      firt_name: null,
      last_name: null,
      third_name: null,
      birthdate: null,
      birth_regoin: null,
      birth_city: null,
      live_region: null,
      live_city: null,
      live_adress: null,

      nationality: null,
      passport_seriya: null,
      passport_jshr: null,
      passport_region: null,
      passport_city: null,
      passport_date: null,
      passport_date2: null,

      phone: null,

      submitted: false,

      image: {
        src: null,
        type: "image/jpg",
        blob:null,
      },

    }
  },
  methods: {
    ...mapActions([
      "set_candidate_form1",
    ]),
    check_form(isValid) {
      this.submitted = true;
      // this.$emit('checked_form1')
      this.save_store()
      if (isValid) {
        this.$emit('checked_form1')
      }
    },
    remote_check() {
      document.getElementById('check_form1').click()
    },
    check_store() {
      this.firt_name = this.get_candidate_form1.firt_name;
      this.last_name = this.get_candidate_form1.last_name;
      this.third_name = this.get_candidate_form1.third_name;
      this.birthdate = this.get_candidate_form1.birthdate;
      this.birth_regoin = this.get_candidate_form1.birth_regoin;
      this.birth_city = this.get_candidate_form1.birth_city;
      this.live_region = this.get_candidate_form1.live_region;

      this.live_city = this.get_candidate_form1.live_city;
      this.live_adress = this.get_candidate_form1.live_adress;
      this.nationality = this.get_candidate_form1.nationality;
      this.passport_seriya = this.get_candidate_form1.passport_seriya;
      this.passport_jshr = this.get_candidate_form1.passport_jshr;
      this.passport_region = this.get_candidate_form1.passport_region;
      this.passport_city = this.get_candidate_form1.passport_city;
      this.passport_date = this.get_candidate_form1.passport_date;
      this.passport_date2 = this.get_candidate_form1.passport_date2;
      this.image = this.get_candidate_form1.avatar_picture? this.get_candidate_form1.avatar_picture : {
        src: null,
        type: "image/jpg",
        blob:null,
      };
      this.phone = this.get_candidate_form1.phone;
    },
    save_store() {
      let data = {
        firt_name: this.firt_name,
        last_name: this.last_name,
        third_name: this.third_name,
        birthdate: this.birthdate,
        birth_regoin: this.birth_regoin,
        birth_city: this.birth_city,
        live_region: this.live_region,
        live_city: this.live_city,
        live_adress: this.live_adress,

        nationality: this.nationality,
        passport_seriya: this.passport_seriya,
        passport_jshr: this.passport_jshr,
        passport_region: this.passport_region,
        passport_city: this.passport_city,
        passport_date: this.passport_date,
        passport_date2: this.passport_date2,
        avatar_picture: this.image,
        phone: this.phone,

      }
      this.set_candidate_form1(data)

    },
    upload_avatar() {
      this.$refs.avatar_ref.open_device_store()
    },
    avatar_pic(event) {
      console.log(event);
      this.image.src = event.imgUrl;
      this.image.blob = event.blob;
    }

  },
  created() {
    this.check_store();
  },

  validations() {
    return {

      firt_name: { required: helpers.withMessage("Maydon to'ldirilishi shart!", required) },
      last_name: { required: helpers.withMessage("Maydon to'ldirilishi shart!", required) },
      third_name: { required: helpers.withMessage("Maydon to'ldirilishi shart!", required) },
      birthdate: { required: helpers.withMessage("Maydon to'ldirilishi shart!", required) },
      birth_regoin: { required: helpers.withMessage("Maydon to'ldirilishi shart!", required) },
      birth_city: { required: helpers.withMessage("Maydon to'ldirilishi shart!", required) },
      live_region: { required: helpers.withMessage("Maydon to'ldirilishi shart!", required) },
      live_city: { required: helpers.withMessage("Maydon to'ldirilishi shart!", required) },
      live_adress: { required: helpers.withMessage("Maydon to'ldirilishi shart!", required) },
      nationality: { required: helpers.withMessage("Maydon to'ldirilishi shart!", required) },
      passport_seriya: { required: helpers.withMessage("Maydon to'ldirilishi shart!", required) },
      passport_jshr: {
        required: helpers.withMessage("Maydon to'ldirilishi shart!", required),
        minLength: helpers.withMessage("JSHR 14 ta raqamdan iborat bo'lishi shart!", minLength(14)),

      },

      passport_region: { required: helpers.withMessage("Maydon to'ldirilishi shart!", required) },
      passport_city: { required: helpers.withMessage("Maydon to'ldirilishi shart!", required) },
      passport_date: { required: helpers.withMessage("Maydon to'ldirilishi shart!", required) },
      passport_date2: { required: helpers.withMessage("Maydon to'ldirilishi shart!", required) },
      phone: { required: helpers.withMessage("Maydon to'ldirilishi shart!", required) },




      // career_date1: {
      //   required: helpers.withMessage("Maydon to'ldirilishi shart!", required),

      // },
      // career_date2: {
      //   required: helpers.withMessage("Maydon to'ldirilishi shart!", required),
      //   minLength: helpers.withMessage("Yilni to'g'ri kiriting!", minLength(4)),

      // },

    };
  },
}
</script>

<style lang="scss">
.candidate-input-label {
  font-size: 14px;
  color: #2e5890;
  font-family: 'Poppins', sans-serif !important;
}

.error-input-message {
  color: #e24c4c !important;
  font-size: 12px;
  padding-left: 4px;
  font-weight: 500;
}

.invaalid-avatar {
  border: 2px solid #e02a36da !important;
}

.avatar-box {
  width: 120px;
  height: 160px;
  border: 1px solid #ced4da;
  position: relative;

  &>img {
    width: 100%;
    height: 100%;
    object-fit: cover;
  }

  &>.edit-btn {
    position: absolute;
    bottom: -6px;
    right: -16px;
    background-color: #fff;
    width: 30px;
    height: 30px;
    display: flex;
    justify-content: center;
    align-items: center;
    border-radius: 50%;
    border: 1px solid #ced4da;
    cursor: pointer;

    i {
      font-size: 20px;
      color: #9fadbb;
      background-color: #fff;
      font-weight: 500;
    }
  }
}</style>