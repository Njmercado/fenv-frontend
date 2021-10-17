<template>
    <div style="position: relative; height: 98vh; width: 100vw">
        <!-- Error notification -->
        <v-alert :value="openErrorNotification" type="error" transition="scale-transition" style="position: absolute; right: 32px; top: 10px">
            {{ errorMsg }}
        </v-alert>
        <v-row justify="center" align="center" style="height: 100vh; width: 100vw" class="bg-yellow">
            <v-col cols="12" xs="12" sm="12" md="4" lg="6" xl="6" align="center">
                <div class="font-blue text-h2">Fenv</div>
                <div class="text-subtitle-1">Sort your variables</div>
            </v-col>
            <v-col cols="12" xs="12" sm="12" md="8" lg="6" xl="6" align="center">
                <v-card class="login-card-styles">
                    <v-text-field
                        v-model = "email"
                        label="email"
                        :rules="emailRules"
                        outlined single-line dense
                    ></v-text-field>
                    <v-text-field
                        v-model = "password"
                        label="password"
                        :append-icon="showPassword ? 'mdi-eye' : 'mdi-eye-off'"
                        :rules="passwordRules"
                        :type="showPassword? 'text': 'password'"
                        @click:append="showPassword = !showPassword"
                        outlined
                        single-line dense
                    ></v-text-field>
                    <v-btn
                        color="#F2D16D"
                        small
                        style="margin-top: 16px"
                        @click="login()"
                        :disabled="disableLoginBtn"
                    ><span class="btn-font">log in</span></v-btn>
                    <v-btn color="#04BFBF" small style="margin-top: 16px"><span class="btn-font">signup</span></v-btn>
                    <div class="forget-password-link">do you forget your password?</div>
                </v-card>
            </v-col>
        </v-row>
    </div>
</template>

<script lang="ts">
import Vue from 'vue'
import { Rules } from '~/utils/rules'
import { mapGetters } from 'vuex';
export default Vue.extend({
    data: () => ({
        emailRules: Rules.EMAIL_RULES(),
        passwordRules: Rules.PASSWORD_RULES(),
        email: "",
        password: "",
        showPassword: false,
        disableLoginBtn: true,
        errorMsg: "",
        openErrorNotification: false
    }),
    watch: {
        email(value) {
            this.disableLoginBtn = !(value.length > 0 && this.password.length > 0)
        },
        password(value) {
            this.disableLoginBtn = !(value.length > 0 && this.email.length > 0)
        },
        errorMsg(value) {
            if(value.length > 0) {
                setTimeout(() => {
                    this.openErrorNotification = false
                }, 2000)
            }
        }
    },
    methods: {
        ...mapGetters({
            getError: "login/getError" 
        }),
        async login() {
            await this.$store.dispatch('login/login', {
                email: this.email,
                password: this.password
            })

            this.errorMsg = "";
            this.errorMsg = await this.getError();

            if(this.errorMsg != null) {
                this.openErrorNotification = true
            } else {
                this.$router.push("/dashboard")
            }
        },
    }
})
</script>

<style scoped>

    .forget-password-link {
        color: gray;
        font-size: calc(2vh + 10%);
        margin-top: 16px;
    }
    .forget-password-link:hover {
        cursor: pointer;
        color: #04BFBF; 
    }

    .login-card-styles {
        width: 50%;
        padding: 8vh 2vh;
    }
</style>
