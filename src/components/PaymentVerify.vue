<script>
    import axios from "axios"

    export default{
        name: 'invoices',
        
        data(){
            return{
                errors: [],
                message: [],

                allinvoices: [],

                receipt: [],

                customerCode: '',

                allinvoice: {

                    organisationCode: '',
                    subOrganisationCode: '',
                    subOrganisationName: '',
                    customerCode: '',
                },

                customer: {
                    customerCode: '',

                },

                invoice: {
                  invoiceCode: '',
                  invoiceDate: '',
                },

                items: {
                    amount: '',
                },

                invoiceCode: '',

            }
            
        },

        created(){
            const response = localStorage.getItem('customercode');

            this.customerCode = response;
  
        },

        async mounted(){

            const result = await axios.get('https://assessmentapi.revassuredev.com/api/Receipt/details/'+this.$route.params.invoiceCode);
            this.receipt = result.data.result;

            await axios.get('api/Invoice/details/'+this.$route.params.invoiceCode)

            .then(res => {
                this.allinvoice = res.data.result.organisation;
                this.allinvoice = res.data.result.subOrganisation;
                this.customer = res.data.result.customer;
                this.invoice = res.data.result.invoice;
                this.items = res.data.result.items;

            })
            .catch(err => {
                console.log(err);
            })

            const res = localStorage.getItem('customercode');

            const response = await axios.get('https://assessmentapi.revassuredev.com/api/Payment/verify/'+this.$route.params.invoiceCode,{
                    headers: {
                        clientid : 'abc123',
                        Authorization: '0*EI&LBEey28Y#p1e3qmVD'
                    }
                });
                
            if (response) {
                // console.log(response);
                this.message.push(response.data.message);

            }
 
            
        },

        computed: {
            
            total: function(){

                let total = [];

                Object.entries(this.items).forEach(([key, val]) => {
                    total.push(val.amount) // the value of the current key.
                });

                return total.reduce(function(total, num){ return total + num }, 0);

            },

            tax: function(){

                let total = [];

                Object.entries(this.items).forEach(([key, val]) => {
                    total.push(val.tax) // the value of the current key.
                });

                return total.reduce(function(total, num){ return total + num }, 0);

            },
        },
        
    }
</script>

<template>
  <div id="layout-wrapper">
    

    <!-- ========== Left Sidebar Start ========== -->
    <div class="vertical-menu">

        <div data-simplebar class="h-100">

            <!--- Sidemenu -->
            <div id="sidebar-menu">
                <!-- Left Menu Start -->
                <ul class="metismenu list-unstyled" id="side-menu">
                    <li class="menu-title" style="color: #fff !important;">Menu</li>

                    <li v-if="!this.customerCode">
                        <router-link to="/" class="waves-effect text-dark">
                            <i class="ri-dashboard-line" style="color: #fff !important;"></i>
                            <span style="color: #fff !important;">Dashboard</span>
                        </router-link>
                    </li>

                    <li v-if="this.customerCode">
                        <router-link :to="'/invoice/'+this.customerCode" class="waves-effect text-dark">
                            <i class="ri-dashboard-line" style="color: #fff !important;"></i>
                            <span style="color: #fff !important;">Dashboard</span>
                        </router-link>
                    </li>

                    <li v-if="this.customerCode">
                        <router-link :to="'/invoice/'+this.customerCode" class="waves-effect text-dark">
                            <i class="mdi mdi-receipt" style="color: #fff !important;"></i>
                            <span style="color: #fff !important;">My Invoices</span>
                        </router-link>
                    </li>

                    <li v-if="this.customerCode">
                        <router-link to="/payments" class="waves-effect text-dark">
                            <i class="mdi mdi-credit-card-outline" style="color: #fff !important;"></i>
                            <span style="color: #fff !important;">My Payments</span>
                        </router-link>
                    </li>

                    <li v-if="this.customerCode">
                        <router-link to="/" class=" waves-effect text-dark">
                            <i class="mdi mdi-account" style="color: #fff !important;"></i>
                            <span style="color: #fff !important;">My Profile</span>
                        </router-link>
                    </li>



                </ul>
            </div>
            <!-- Sidebar -->
        </div>
    </div>
    <!-- Left Sidebar End -->

    <div class="main-content">
      <div class="page-content">
        <div class="container-fluid">

            <!-- start page title -->
            <div class="row">
                <div class="col-12">
                    <div class="page-title-box d-flex align-items-center justify-content-between">
                        <h4 class="mb-0">Payment</h4>

                        <div class="page-title-right">
                            <ol class="breadcrumb m-0">
                                <li class="breadcrumb-item"><a href="javascript: void(0);">fg-ras</a></li>
                                <li class="breadcrumb-item active">Dashboard</li>
                            </ol>
                        </div>

                    </div>
                </div>
            </div>
            <!-- end page title -->

            

            <div class="row aa mb-5">
                <div class="col-md-12 example-print">
                    <div class="cards pt-3">
                        <div class="receipt p-2 bg-success ml-auto mr-auto w-25" v-if="this.message != ''">
                            <h4 style="font-size: 16px;" class="text-center text-white">{{this.message[0]}}</h4>
                        </div>
                        <div class="card-body table-responsive">
                            <div class="brand-section" >
                                <div class="row">
                                    <div class="col-6">
                                        <h1 class="text-dark">{{allinvoice.organisationCode}}</h1>
                                        
                                        <h3 class="text-dark">{{allinvoice.subOrganisationName}}</h3>
                                    </div>
                                    <div class="col-6">
                                        <div class="company-details">
                                            <h2 class="heading">Invoice #{{invoice.invoiceCode}}</h2>
                                            <p class="sub-heading">Invoice Date: {{invoice.invoiceDate}} </p>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            <div class="body-section">
                                <div class="row">
                                    
                                    <div class="col-6">
                                        <h4>Invoice To:</h4>
        
                                        <p class="sub-heading">Customer Code: {{invoice.customerCode}} </p>
                                        <!-- <p class="sub-heading">Invoice Date: {{invoice.invoiceDate}} </p> -->
                                        <p class="sub-heading">Curency Code: {{invoice.currencyCode}} </p>
                                    </div>
                                    <div class="col-6">
                                        <h4>Bill To:</h4>
                                        <p class="sub-heading">Full Name:  <strong>{{customer.firstname}} {{customer.lastname}}</strong></p>
                                        <p class="sub-heading">Email Address:  <strong>{{customer.emailAddress}}</strong></p>
                                        <p class="sub-heading">Phone Number:  <strong>{{customer.mobileNumber1}}, {{customer.mobileNumber2}}</strong></p>
                                        <p class="sub-heading">LGA,State: <strong>{{customer.lgaCode}}, {{customer.stateCode}}</strong> </p>
                                    </div>
                                </div>
                            </div>

                            <div class="body-section">
                                <table class="text-center">
                                    <thead>
                                        <tr>
                                            <th>ITEM</th>
                                            <th class="w-20">Price</th>
                                            <th class="w-20">Quantity</th>
                                            <th class="w-20">Amount</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        <tr v-for="item in items">
                                            <td>{{item.itemName}}</td>
                                            <td>{{item.price}}</td>
                                            <td>{{item.quantity}}</td>
                                            <td>{{item.amount}}</td>
                                        </tr>
                                        <!-- <tr>
                                            <td colspan="3" class="text-right">Sub Total</td>
                                            <td> 10.XX</td>
                                        </tr> -->
                                        <tr>
                                            <td colspan="3" class="text-right">Tax Total</td>
                                            <td> {{ tax }}</td>
                                        </tr>
                                        <tr>
                                            <td colspan="3" class="text-right">Grand Total</td>
                                            <td> {{ total }} </td>
                                        </tr>
                                    </tbody>
                                </table>
                                <br>
                                <h3 class="heading">Payment Status: {{invoice.paymentStatus}}</h3>
                                <!-- <h3 class="heading">Payment Mode: Cash on Delivery</h3> -->
                            </div>

                        </div>
                    </div>
                </div> <!-- end col -->
            </div> <!-- end row -->


        </div> <!-- container-fluid -->
    </div>
    <!-- End Page-content -->

    <footer class="footer">
      <div class="container-fluid">
          <div class="row">
              <div class="col-sm-8">
                  <div class="text-sm-right d-none d-sm-block">
                      &copy; 2022 Federal Government Revenue Assurance Project. Powered by Intelligence
                  </div>
              </div>
          </div>
      </div>
    </footer>
    </div>
  </div>


  <router-view></router-view>
</template>

<style>
    @media only screen and (max-width: 768px) {
        .receipt{
            width: 80% !important;
        }
    }
</style>
