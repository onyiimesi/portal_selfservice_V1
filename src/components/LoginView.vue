<script>
    import axios from "axios";
    import { useToast } from "vue-toastification"

    export default{
        name: 'login',
        
        data(){
            return{
                errors: [],
                errorss: [],

                name: '',
                customerCode: '',

                
            }
        },

        async mounted(){

            const result = await axios.get('https://assessmentapi.revassuredev.com/api/Organization/organizations', {
                headers: {
                    clientid : 'abc123',
                    Authorization: '0*EI&LBEey28Y#p1e3qmVD'
                }
            },);
            this.allorg = result.data.result;

        },

        methods: {
            
            async customerInvoice() {
                this.errors = [];
                const toast = useToast();

                if (!this.customerCode) {
                    toast.error("Please login using your customer number.");
                }else{

                    const result = await axios.get('api/Invoice/customerinvoices/'+this.customerCode);

                    if(result.data.result.length != 0){

                        localStorage.setItem('customercode', this.customerCode);

                        this.$router.push("/invoice/"+this.customerCode);
                    }else{
                        toast.error("Please login using your customer number");
                    }

                }
            },
        },
    }
</script>

<template>
  <div class="container-fluid p-0">
    <div class="row no-gutters">
        <div class="col-lg-6 h-sm-10 d-none d-md-none d-lg-block d-sm-block">
            <div class="authentication-page-content p-4 d-flex align-items-center min-vh-100">
                <div class="w-100">
                    <div class="row justify-content-center">
                        <div class="col-lg-9">
                            <div>
                                <div class="text-center">
                                    <div>
                                        <router-link to="/" class="logo d-none d-sm-block"><img src="/frontend/assets/images/fg-ras-logo.png" height="50" alt="logo"></router-link>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        <div class="col-lg-6">
            <div class="pt-5 bg-white d-flex align-items-center min-vh-100">
                <div class="w-100">
                    <div class="row justify-content-center">
                        <div class="col-lg-9">
                            <div class="text-center d-none d-md-none d-lg-block d-sm-block">
                                <h4 class="font-size-24 mt-4 pb-2">Welcome Back !</h4>
                                <p class="text-muted font-size-14">Sign in to your Account.</p>
                            </div>
                            <div class="text-center d-block d-md-block d-lg-none d-sm-none">
                                <div>
                                    <router-link to="/" class="logo"><img src="/frontend/assets/images/fg-ras-logo.png" height="50" alt="logo"></router-link>

                                    <h4 class="font-size-18 mt-4">Welcome Back !</h4>
                                    <p class="text-muted">Sign in to your Account.</p>
                                </div>
                            </div>
                            
                            <div class="p-4 mt-5">
                                <form class="form-horizontal" @submit.prevent="customerInvoice">
    
                                    <div class="form-group auth-form-group-custom mb-4">
                                        <i class="ri-user-2-line auti-custom-input-icon"></i>
                                        <label for="username">Email Address / Mobile Number</label>
                                        <input type="text" class="form-control" v-model="customerCode" placeholder="Enter email address or mobile number">
                                    </div>
            
                                    <div class="form-group auth-form-group-custom mb-4">
                                        <i class="ri-lock-2-line auti-custom-input-icon"></i>
                                        <label for="userpassword">Password</label>
                                        <input type="password" class="form-control" id="userpassword" placeholder="Enter password">
                                    </div>


                                    <div class="mt-4 text-center">
                                        <button class="btn btn-success w-md waves-effect waves-light" type="submit">Log In</button>
                                    </div>

                                    <div class="mt-4 text-center">
                                        <router-link to="/" class="text-muted"><i class="mdi mdi-lock mr-1"></i> Forgot your password?</router-link>
                                    </div>
                                </form>
                            </div>

                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</div>


  <router-view></router-view>
</template>

<style>

</style>
