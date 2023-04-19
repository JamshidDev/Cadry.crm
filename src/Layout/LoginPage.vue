<template >
 <div class=" login_container">
  <form
    class="
     bg-img
      w-full
      min-h-screen
      overflow-hidden
      flex
      justify-content-center
      align-items-start
      pt-8
    "
  >
    <div class="question_btn">
      <Button
        icon="pi pi-question-circle"
        class="p-button-rounded p-button-text p-button-lg"
        v-tooltip="'Yordam'"
      />
    </div>
    <div class="footer_version">
      <div class="text-sm w-full text-center uppercase font-medium pb-1">
        versiya 2.0.0
      </div>
    </div>
    <div class="grid w-full lg:pt-0 xl:pt-8">
     
      <div class="col-12 xl:col-8 lg:col-7 pt-8 hidden xl:block lg:block">
        <div class="grid">
          <div class="col-12 flex justify-content-center">
            <img
              class="large_logo mx-auto"
              src="@/assets/picture/login_logo.png"
            />
          </div>
          <div class="col-12 pt-4">
            <div class="animation_text">
              <div class="logo_title mt-2  btn-shine font-bold uppercase text-5xl ">
                Odas Enerji CA
              </div>
              <div class="logo_subtitle  btn-shine2  mt-6 font-bold uppercase text-3xl ">
                Mas'uliyati cheklangan jamiyati 
              </div>
            </div>
          </div>
        </div>

      </div>
      <div class="col-12 xl:col-4 lg:col-5 lg:px-4 xl:px-6 md:px-4 px-4">
        <div class="grid lg:pt-4 xl:pt-8">
          <div class="col-12 lg:hidden xl:hidden ">
           <div class="col-12 flex justif-content-center">
             <img
              class="login_logo mx-auto"
              src="@/assets/picture/login_logo.png"
              alt=""
            />
           </div>
          </div>
          <div class="col-12 pb-2">
            <h3 class="text-center uppercase mb-1 text-2xl text-blue-600">Tizimga kirish</h3>
            <h3 class="text-blue-600 text-center text-sm uppercase mt-0">Korxonaga ma'sul xodim sifatida kirish</h3>
          </div>
          <div class="col-12">
            <InputText
              type="text"
              class="w-full font-bold"
              v-model.trim="user.email"
              placeholder="Login"
              @keyup.enter="login()"
            />
          </div>
          <div class="col-12">
            <Password
              v-model="user.password"
              placeholder="Parol"
              class="w-full mb-3 "
              inputClass="w-full font-bold"
              toggleMask
              :feedback="false"
              @keyup.enter="login()"
            ></Password>
          </div>
          <div class="col-12">
            <Button
              label="Kirish"
              icon="pi pi-enter"
              iconPos="left"
              class="w-full uppercase"
              :loading="loading"
              @click="login()"
            />
          </div>
          <div class="col-12">
            <Divider align="center" class="bg-transparent">
                <span class="text-sm uppercase font-bold text-blue-600 ">Yoki</span>
            </Divider>
          </div>
          <div class="col-12">
            <Button type="button" class="w-full p-button-success p-button-sm">
              <i class="pi pi-angle-double-right" style="font-size: 2rem"></i>
            <span class="ml-2 font-medium uppercase">Ishchi xodim sifatida kirish</span>
        </Button>
          </div>
        </div>
      </div>

      <div class="col-12">
        <Toast />
      </div>
    </div>
  </form>
 </div>
</template>
<script>
import { mapActions } from 'vuex';

import authService from '../service/servises/authService';

export default {
  data() {
    return {
      user: {
        email: null,
        password: null,
      },
      loading: false,
    };
  },
  methods: {
    ...mapActions(["set_adminPermissions"]),
    login() {
      this.controlLoader(true);
      authService
        .loginAdmin(this.user)
        .then((res) => {
          console.log(res.data);
          localStorage.setItem("access_token", res.data.access_token);
          localStorage.setItem("token_created_date", res.data.created_at);


          authService
            .get_AdminDetails()
            .then((res) => {
              let permissions = [];
              if (
                res.data.roles.permissions &&
                res.data.roles.permissions.length
              ) {
                res.data.roles.permissions.forEach((item) => {
                  permissions.push(item.name);
                });
              }
              this.set_adminPermissions(permissions);
              localStorage.setItem(
                "admin_avatar",
                res.data.photo
              );

              localStorage.setItem(
                "organization",
                JSON.stringify(res.data.organization)
              );
              localStorage.setItem(
                "profil",
                JSON.stringify(res.data)
              );

              localStorage.setItem(
                "Adminpermissions",
                JSON.stringify(permissions)
              );

              this.$router.push("/");

              this.controlLoader(false);
            })
            .catch((error) => {
              console.log(error);
            });
        })
        .catch((error) => {
          this.controlLoader(false);
          this.$toast.add({
            severity: "error",
            summary: "Tizimga kirish",
            detail: "Login yoki parol noto'g'ri",
            life: 3000,
          });
        });
    },
    controlLoader(item) {
      this.loading = item;
    },
  },
};
</script>
<style scoped lang="scss">
.login_container {
  background: #1e293b;

  & .login_logo {
    max-width: 120px;
    height: auto !important;
    height: auto;
  }
}

.bg-img{
 background-image: url("https://vacancy.argos.uz/_nuxt/img/intro-bottom.252c7df.png");
 background-repeat: no-repeat;
 background-position: bottom;
 background-size: 100%;
 
}

::v-deep(.p-password input) {
  width: 15rem;
}
.login_logo {
  height: 70px;
}
.large_logo{
  height: 200px;
}
.question_btn {
  position: absolute;
  right: 20px;
  top: 20px;
}

.footer_version{
  position: absolute;
  bottom: 0px !important;
  width: 100% !important;
  
}


.animation_text {
  position: relative;
}
.btn-shine {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  padding: 12px 48px;
  color: #fff;
  background: linear-gradient(to right, #4d4d4d 0, #fff 10%, #4d4d4d 20%);
  background-position: 0;
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  animation: shine 3s infinite linear;
  animation-fill-mode: forwards;
  -webkit-text-size-adjust: none;
  font-weight: 600;
  font-size: 16px;
  text-decoration: none;
  white-space: nowrap;
}
.btn-shine2 {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  padding: 12px 48px;
  color: #fff;
  background: linear-gradient(to right, #4d4d4d 0, #fff 10%, #4d4d4d 20%);
  background-position: 0;
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  animation: shine2 3s infinite linear;
  animation-fill-mode: forwards;
  -webkit-text-size-adjust: none;
  font-weight: 600;
  font-size: 16px;
  text-decoration: none;
  white-space: nowrap;
}
@keyframes shine {
  0% {
    background-position: 0;
  }
  25% {
    background-position: 150px;
  }
  50% {
    background-position: 300px;
  }
  75% {
    background-position: 450px;
  }
  100% {
    background-position: 600px;
  }
}
@keyframes shine2 {
  0% {
    background-position: 0;
  }
  25% {
    background-position: 100px;
  }
  50% {
    background-position: 200px;
  }
  75% {
    background-position: 300px;
  }
  100% {
    background-position: 400px;
  }
}
.min_height_screen {
  min-height: 100vh;
  height: 100%;
}
.login_banner {
  background-color: #1e293b;
  min-height: 100%;
}
.login_logo_container {
  padding: 30px;
  display: flex;
  flex-direction: column;
  position: relative;
  & > .logo_picture {
    height: 200px;
    margin: 0px auto;
  }
  & > .animation_text > .logo_title {
    font-size: 30px !important;
    text-transform: uppercase;
    font-weight: 600;
    margin: 0px auto;
    color: #ffffff;
  }
  & > .animation_text > .logo_subtitle {
    font-size: 20px;
    top: 100px;
    text-transform: uppercase;
    font-weight: 600;
    margin: 0px auto;
    color: #ffffff;
  }
}

</style>