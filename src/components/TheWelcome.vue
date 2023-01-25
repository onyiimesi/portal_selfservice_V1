<script>
    import axios from "axios";
    import { useToast } from "vue-toastification"

    export default{
        name: 'invoice',
        
        data(){
            return{
                errors: [],
                errorss: [],

                name: '',
                customerCode: '',
                invoiceCode: '',

                allorg: [],
                allsuborg: [],
                allitem: [],
                organizationCode: "",
                subOrganizationCode: "",
                itemOrgCode: "",

                itemList: [],

                customFieldValues: [{
                   fieldValue: "",
                   id: 0,
                }],

                
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


            let selfs = this;
            $('.select2').select2().on("change", function() {
                selfs.payforService(this.value);
            });

            // let selfs = this;
            // $('.select22').select2().on("change", function() {
            //     selfs.onSelectChanges(this.value);
            // });

            // let selfss = this;
            // $('.select222').select2().on("change", function() {
            //     selfss.onSelectChangess(this.value);
            // }); 

        },

        methods: {

            payforService(val) {
                const toast = useToast();

                this.organizationCode = val;

                if (!this.organizationCode) {
                    toast.error("Please choose an organization");
                }else{

                    localStorage.setItem('organisation', this.organizationCode);

                    this.$router.push("/selfassessment/"+this.organizationCode);
                }

                
            },

            async billNumber() {
                this.errorss = [];
                const toast = useToast();

                if (!this.invoiceCode) {
                    toast.error("Please enter a valid bill number.");
                }else{

                    const result = await axios.get('api/Invoice/details/'+this.invoiceCode);

                    if(result.data.status == 250){
                        toast.error("Invalid Bill Number.");
                    }else if(result.data.result.length != 0){

                        const customer = result.data.result.customer.customerCode;

                        localStorage.setItem('customercode', customer);

                        this.$router.push("/viewinvoice/"+this.invoiceCode);
                    }

                }
            },
            
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
                        <div class="col-lg-9 border-bottom">
                            <div class="d-none d-md-none d-lg-block d-sm-block border-bottom">
                                <h3 class="text-center">Welcome to Revassure</h3>
                                <div class="line"></div>
                                <div class="started">
                                    <p>To get started:</p>

                                    <ul class="text-center">
                                        <li><strong>New Customer:</strong> Choose an organization below to pay for a service.</li>
                                        <li><strong>Existing Customer:</strong> Enter your Bill Number to pay for an invoice or Login to your dashboard using your customer number. </li>
                                    </ul>
                                </div>
                            </div>
                            <div class="text-center d-block d-md-block d-lg-none d-sm-none border-bottom">
                                <div>
                                    <router-link to="/" class="logo"><img src="/frontend/assets/images/fg-ras-logo.png" height="50" alt="logo"></router-link>

                                    <div class="mt-4">
                                        <h3 class="text-center">Welcome to Revassure</h3>
                                        <div class="line"></div>
                                        <div class="started">
                                            <p>To get started:</p>

                                            <ul>
                                                <li><strong>New Customer:</strong> Choose an organization below to pay for a service.</li>
                                                <li><strong>Existing Customer:</strong> Enter your Bill Number to pay for an invoice or Login to your dashboard using your customer number. </li>
                                            </ul>
                                            
                                        </div>
                                    </div>
                                </div>
                            </div>
                            
                            <div class="row justify-content-center pt-4 pb-4 pl-4 pr-4 border-bottom">
                                <div class="col-md-6 col-lg-12 col-sm-6">
                                    <form @submit.prevent="payforService">
                                        <h4 class="font-size-14 mb-3">Choose an Organization to <strong>"Pay for a Service"</strong></h4>
                                        <div class="">
                                            <select v-model="organizationCode" class="form-control s select2 w-75">
                                                <option v-for="item in allorg" :value="item.organisationCode">
                                                {{ item.organisationName }}
                                                </option>
                                            </select><br>
                                        </div>
                                    </form>
                                </div>
                            </div>

                            <div class="p-4">
                                <div class="p-2 border-bottom">
                                    <div class="alert alert-danger" v-if="errorss.length">
                                        <ul>
                                            <li v-for="error in errorss">{{ error }}</li>
                                        </ul>
                                    </div>
                                    <form @submit.prevent="billNumber">
                                        <h4 class="font-size-14 mb-3">Already have a bill number?</h4>
                                        <div class="form-group auth-form-group-custom d-flex">
                                            <i class="ri-money-dollar-circle-fill auti-custom-input-icon"></i>
                                            <label for="username">Bill Number</label>
                                            <input type="text" class="form-control" v-model="invoiceCode" placeholder="Enter Bill Number">

                                            <button class="btn btn-primary w-md ml-2" type="submit">Search</button>
                                        </div>
                                    </form>
                                </div>

                                <div class="p-2">
                                    <div class="alert alert-danger" v-if="errors.length">
                                        <b v-for="error in errors">{{ error }}</b>
                                    </div>
                                    <h4 class="font-size-14 mt-3 mb-3">Click the button below to login to your account.</h4>
                                    <div class="mb-4">

                                    <router-link to="/login"><button class="btn btn-success w-md waves-effect w-100">Login</button></router-link>
                                    </div>
                                </div>
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
