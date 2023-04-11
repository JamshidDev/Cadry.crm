<template>
    <div class="offer-page">
        <div class="offer-container">
            <div class="grid">
                <div class="col-12 flex justify-content-center">
                    <div class="panel-header py-4">
                        <img class="org-logo" src="../../assets/picture/login_logo.png" alt="">
                        <div class="organization-name font-poppins">
                            ODAS ENERJI CA
                        </div>
                    </div>
                </div>
                <div class="col-12 panel-body mb-8">
                    <div class="col-12 flex  justify-content-between body-header align-items-center ">
                        <div class="body-info">
                            <span>{{ active_step }} - {{ step_list[active_step - 1].name }}</span>
                        </div>
                        <div class="body-number">
                            <span>{{ active_step }}</span>
                            <span>/</span>
                            <span>{{ step_list.length }}</span>
                        </div>
                    </div>
                    <div class="col-12 panel-compoent">
                        <Transition name="slide-right">

                            <div class="audio-tab tab-item" v-if="active_step == step_list[0].index">
                                <FirstStep ref="ref_form1" @checked_form1="next_form()" />
                            </div>
                            <div class="task_tab tab-item" v-else-if="active_step == step_list[1].index">
                                <SecondStep ref="ref_form2" @checked_form2="next_form()" />
                            </div>
                            <div class="test_tab tab-item" v-else-if="active_step == step_list[2].index">
                                <ThirdStep ref="ref_form3" @checked_form3="next_form()" />
                            </div>
                            <div class="comment_tab tab-item" v-else-if="active_step == step_list[3].index">
                                <FourthStep ref="ref_form4" @checked_form4="next_form()" />
                            </div>
                            <div class="comment_tab tab-item" v-else-if="active_step == step_list[4].index">
                                <FivethStep ref="ref_form5" @back_step="previous_Step()" @submit_event="submit_msg()" />
                            </div>

                        </Transition>

                    </div>
                    <div class="col-12 flex  align-items-center panel-control" v-if="active_step !== 5"
                        :class="active_step == 1 ? 'justify-content-end' : 'justify-content-between'">
                        <button class="previous-btn" :class="active_step == 1 && 'hidden'" @click="previous_Step()"> <i
                                class='bx bx-left-arrow-alt'></i>Oldingi
                        </button>
                        <button class="next-btn" @click="next_Step()">Keyingi <i class='bx bx-right-arrow-alt'></i></button>
                    </div>


                </div>
            </div>
        </div>
        <CheckLoader ref="ref_check_loader" />
        <Toast position="top-right" />
    </div>
</template>

<script>
import {
  mapActions,
  mapGetters,
} from 'vuex';

import SlugService from '@/service/servises/SlugService';

import formatter from '../../util/formatter';
import CheckLoader from './components/CheckLoader.vue';
import FirstStep from './components/FirstStep.vue';
import FivethStep from './components/FivethStep.vue';
import FourthStep from './components/FourthStep.vue';
import SecondStep from './components/SecondStep.vue';
import ThirdStep from './components/ThirdStep.vue';

export default {
    components: {
        FirstStep,
        SecondStep,
        ThirdStep,
        FourthStep,
        FivethStep,
        CheckLoader,
    },
    data() {
        return {
            step_list: [
                {
                    index: 1,
                    name: "Shaxsiy ma'lumotlar"
                },
                {
                    index: 2,
                    name: "Oligoh ma'lumotlari"
                },
                {
                    index: 3,
                    name: "Yaqin qarindosh ma'lumotlari"
                },
                {
                    index: 4,
                    name: "Mehnat faoliyat ma'lumotlari"
                },
                {
                    index: 5,
                    name: "Tasdiqlash"
                },
            ],
            active_step: 1,
            formatter,

        }
    },
    computed: {
        ...mapGetters([
            "get_candidate_relatives", "get_candidate_careers", "get_candidate_form1", "get_candidate_form2", "get_candidate_academy","get_candidate_picture"
        ]),
    },
    methods: {
        ...mapActions([
            "set_select_infos",
        ]),
        next_Step() {
            // this.active_step++;
            if (this.active_step == 1) {
                this.$refs.ref_form1.remote_check()
            } else if (this.active_step == 2) {
                this.$refs.ref_form2.remote_check()
            } else if (this.active_step == 3) {
                this.$refs.ref_form3.remote_check()
            }
            else if (this.active_step == 4) {
                this.$refs.ref_form4.remote_check()
            }
        },
        next_form() {
            this.active_step++;
        },
        previous_Step() {
            this.active_step--;
        },
        get_confirm_link() {
            SlugService.get_candidate_info(this.$route.params.reception_token).then((res) => {
                this.set_select_infos(res.data)
                this.$refs.ref_check_loader.loading_control();
            }).catch((error) => {
                console.log(error);
                this.$refs.ref_check_loader.deprecated();
            })
        },
        submit_msg() {
            let candidate = new FormData();
            candidate.append('first_name', this.get_candidate_form1.firt_name);
            candidate.append('last_name', this.get_candidate_form1.last_name);
            candidate.append('middle_name', this.get_candidate_form1.third_name);
            candidate.append('birht_date', this.formatter.outDateFormatter(this.get_candidate_form1.birthdate));
            candidate.append('birth_region_id', this.get_candidate_form1.birth_regoin.id);
            candidate.append('birth_city_id', this.get_candidate_form1.birth_city.id);
            candidate.append('address_region_id', this.get_candidate_form1.live_region.id);
            candidate.append('address_city_id', this.get_candidate_form1.live_city.id);
            candidate.append('address', this.get_candidate_form1.live_adress);
            candidate.append('nationality_id', this.get_candidate_form1.nationality.id);
            candidate.append('passport', this.get_candidate_form1.passport_seriya);
            candidate.append('jshshir', this.get_candidate_form1.passport_jshr);
            candidate.append('pass_date', this.formatter.outDateFormatter(this.get_candidate_form1.passport_date));
            candidate.append('pass_date2', this.formatter.outDateFormatter(this.get_candidate_form1.passport_date2));
            candidate.append('pass_region_id', this.get_candidate_form1.passport_region.id);
            candidate.append('pass_city_id', this.get_candidate_form1.passport_city.id);
            candidate.append('pass_city_id', this.get_candidate_form1.passport_city.id);
            candidate.append('photo', this.get_candidate_picture.blob);
            candidate.append('phone', this.get_candidate_form1.phone);
            candidate.append('education_id', this.get_candidate_form2.academy.id);
            candidate.append('academictitle_id', this.get_candidate_form2.academy_title.id);
            candidate.append('academicdegree_id', this.get_candidate_form2.academy_degree.id);
            candidate.append('party_id', this.get_candidate_form2.party.id);
            candidate.append('gmail', this.get_candidate_form2.email);
            candidate.append('deputy', this.get_candidate_form2.organ);
            candidate.append('military_rank', this.get_candidate_form2.military_rank);
            candidate.append('language', this.get_candidate_form2.languages.map(item => item.id));

            candidate.append('relatives', JSON.stringify(this.get_candidate_relatives));
            candidate.append('career', JSON.stringify(this.get_candidate_careers));
            candidate.append('institut', JSON.stringify(this.get_candidate_academy));


            SlugService.add_condidate(
                {
                    slug: this.$route.params.reception_token,
                    data: candidate,
                }
            ).then((res) => {
                this.$refs.ref_form5.submitted_msg(res.data);
                localStorage.removeItem('candidate_relatives');
                localStorage.removeItem('candidate_careers');
                localStorage.removeItem('candidate_form1');
                localStorage.removeItem('candidate_form2');
                localStorage.removeItem('candidate_academy');

            }).catch((error) => {
                console.log(error.message);
                this.$refs.ref_form5.stop_loading();
                this.$toast.add({
              severity: "error",
              summary: error.message,
              detail: "Iltimos keyinroq qayta urinib ko'ring",
              life: 4000,
            });
            })
        }
    },
    created() {
        this.get_confirm_link();
       
    }
}
</script>

<style lang="scss" scoped>
// @import url('https://fonts.googleapis.com/css2?family=Poppins:ital,wght@0,400;0,500;0,600;0,700;0,800;0,900;1,400;1,500;1,600;1,700;1,800;1,900&display=swap');
// .font-poppins{
//     font-family: 'Poppins', sans-serif !important;

// }
.offer-page {
    width: 100%;
    min-height: 100vh;
    box-sizing: border-box !important;
    display: flex;
    flex-direction: column;
    font-family: 'Poppins', sans-serif !important;
    padding: 20px;

    &>.offer-container {
        width: 100%;
        max-width: 1300px;
        margin-left: auto;
        margin-right: auto;

        .panel-header {
            display: flex;
            width: 500px;
            align-items: center;

            gap: 30px;

            .org-logo {
                width: 60px;
                object-fit: cover;
            }

            .organization-name {
                font-size: 36px;
                font-weight: 600;
                color: #2e5890;
            }
        }

        .panel-compoent {
            padding: 20px 0px 20px 0px;
            overflow: hidden;
        }

        .panel-body {
            background-color: #fff;

            box-shadow: 0 0.75rem 1.5rem rgba(18, 38, 63, .03);
            border-radius: 20px;
            height: auto;
            padding: 20px;

            .body-header {
                border-bottom: 1px solid #8fc7f94d;
            }

            .body-info {
                color: #2e5890;
                font-weight: 600;
                font-size: 18px;
            }

            .body-number {
                width: 40px;
                height: 40px;
                border-radius: 50%;
                background-color: #9ecffa4d;
                display: flex;
                align-items: center;
                justify-content: center;

                &>span {
                    color: #2e5890;
                    font-weight: 600;
                    font-size: 14px;
                }


            }

            .panel-control {
                .next-btn {
                    padding: 10px 20px;
                    background-color: #2e5890;
                    border: 1px solid transparent;
                    color: #fff;
                    border-radius: 10px;
                    cursor: pointer;
                    display: flex;
                    align-items: center;
                    gap: 10px;

                    &:hover {
                        background-color: #4076bc;
                    }
                }

                .previous-btn {
                    padding: 10px 20px;
                    background-color: #f46a6a;
                    border: 1px solid transparent;
                    color: #fff;
                    border-radius: 10px;
                    cursor: pointer;
                    display: flex;
                    align-items: center;
                    gap: 10px;

                    &:hover {
                        background-color: #cd5b5b;
                    }
                }
            }
        }


    }
}

.slide-right-enter-active {
    transition: all 0.3s cubic-bezier(0.65, 0, 0.35, 1);
}

.slide-right-leave-active {
    transition: transform 0.1s cubic-bezier(0.65, 0, 0.35, 1);
    display: none;
}

.slide-right-enter-from {
    transform: translateX(80%);
    opacity: 0;
}

.slide-right-enter-to {
    transform: translateX(0%);
    opacity: 1;
}

.slide-right-leave-from {
    transform: scale(1);
}


@media (max-width: 768px) {
    .offer-page {
        width: 100%;
        min-height: 100vh;
        box-sizing: border-box !important;
        display: flex;
        flex-direction: column;
        font-family: 'Poppins', sans-serif !important;
        padding: 20px;

        &>.offer-container {
            width: 100%;
            max-width: 1300px;
            margin-left: auto;
            margin-right: auto;

            .panel-header {
                display: flex;
                width: 500px;
                align-items: center;
                justify-content: center;

                gap: 30px;

                .org-logo {
                    width: 50px;
                    object-fit: cover;
                }

                .organization-name {
                    font-size: 26px;
                    font-weight: 700;
                    color: #2e5890;
                }
            }

            .panel-compoent {
                padding: 60px 0px 20px 0px;
                overflow: hidden;
            }

            .panel-body {
                background-color: #fff;

                box-shadow: 0 0.75rem 1.5rem rgba(18, 38, 63, .03);
                border-radius: 20px;
                height: auto;
                padding: 20px;

                .body-header {
                    border-bottom: 1px solid #8fc7f94d;
                }

                .body-info {
                    color: #2e5890;
                    font-weight: 600;
                    font-size: 16px;
                }

                .body-number {
                    width: 40px;
                    height: 40px;
                    border-radius: 50%;
                    background-color: #9ecffa4d;
                    display: flex;
                    align-items: center;
                    justify-content: center;

                    &>span {
                        color: #2e5890;
                        font-weight: 600;
                        font-size: 14px;
                    }


                }

                .panel-control {
                    .next-btn {
                        padding: 10px 20px;
                        background-color: #2e5890;
                        color: #fff;
                        border-radius: 10px;
                        cursor: pointer;
                        display: flex;
                        align-items: center;
                        gap: 10px;

                        &:hover {
                            background-color: #4076bc;
                        }
                    }

                    .previous-btn {
                        padding: 10px 20px;
                        background-color: #f46a6a;
                        color: #fff;
                        border-radius: 10px;
                        cursor: pointer;
                        display: flex;
                        align-items: center;
                        gap: 10px;

                        &:hover {
                            background-color: #cd5b5b;
                        }
                    }
                }
            }


        }
    }
}
</style>