<script>
    import axios from "axios"

    export default{
        name: 'invoices',
        
        data(){
            return{
                errors: [],
                message: [],

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

            const res = localStorage.getItem('customercode');

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

                  <li>
                    <router-link :to="'/invoice/'+this.customerCode" class="waves-effect text-dark">
                      <i class="ri-dashboard-line" style="color: #fff !important;"></i>
                      <span style="color: #fff !important;">Dashboard</span>
                    </router-link>
                  </li>

                  <li>
                      <router-link :to="'/invoice/'+this.customerCode" class="waves-effect text-dark">
                          <i class="mdi mdi-receipt" style="color: #fff !important;"></i>
                          <span style="color: #fff !important;">My Bills</span>
                      </router-link>
                  </li>

                  <li>
                      <router-link :to="'/payments/'+this.customerCode" class="waves-effect text-dark">
                          <i class="mdi mdi-credit-card-outline" style="color: #fff !important;"></i>
                          <span style="color: #fff !important;">My Payments</span>
                      </router-link>
                  </li>

                  <li v-if="this.customerCode">
                      <router-link :to="'/self-assesment/'+this.customerCode" class="waves-effect text-dark">
                          <i class="mdi mdi-credit-card-outline" style="color: #fff !important;"></i>
                          <span style="color: #fff !important;">Pay for a Service</span>
                      </router-link>
                  </li>

                  <li>
                      <router-link :to="'/profile/'+this.customerCode" class=" waves-effect text-dark">
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
                        <h4 class="mb-0">Receipt</h4>

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
                    <div class="cards">
                        <div class="card-body table-responsive">
                            <!-- <div class="alert alert-success" v-if="message.length">
                                <strong v-for="msg in message">{{ msg }}</strong>
                            </div> -->
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
    
h1,h2,h3,h4,h5,h6{
  margin: 0;
  padding: 0;
}
p{
  margin: 0;
  padding: 0;
}

.aa .cards{
  background-color: #fff;
}

.brand-section{
 background-color: #fff;
 padding: 10px;
 border-bottom: 1px solid #ccc;
}
.brand-section h1{
  font-size: 28px;
  padding: 0 0 10px 0;
  color: #000;
}
.brand-section h3{
  font-size: 18px;
  padding: 0 0 10px 0;
  color: #000;
}

.body-section h4{
  padding: 0 0 20px 0;
}

.body-section .row{
  display: flex;
  flex-wrap: wrap;
}
.body-section .col-6{
  width: 50%;
  flex: 0 0 auto;
}
.body-section .text-white{
  color: #fff;
}
.company-details{
  float: right;
  text-align: right;
}
.company-details .sub-heading{
    color: #000;
}
.body-section{
  padding: 16px;
}

.body-section h4{
  font-size: 18px;
}

.heading{
  font-size: 16px;
  margin-bottom: 08px;
}
.body-section .sub-heading{
  color: #000;
  margin-bottom: 05px;
}
.body-section table{
  background-color: #fff;
  width: 100%;
  border-collapse: collapse;
  margin: 10px 0;
}
.body-section table thead tr{
  border-bottom: 1px solid #ccc;

  color: #000;
}
.body-section table td {
  vertical-align: middle !important;
  text-align: center;
  border-bottom: 1px solid #ccc;
}
.body-section table th, table td {
  padding-top: 08px;
  padding-bottom: 08px;
}

.body-section .table-bordered td, .table-bordered th {
  border: 1px solid #dee2e6;
}
.body-section .text-right{
  text-align: end;
}
.body-section .w-20{
  width: 20%;
}
.body-section .float-right{
  float: right;
}
tbody td{
    color: #000;
}


.dropdown-wrapper{
  position: relative;
  margin: 0 auto;
}
.selected-items{
  height: 38px;
  border: 1px solid lightgray;
  border-radius: 5px;
  padding: 5px 10px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin: 0;
}
.selected-items input{
  border: 0;
  outline: 0;
}
.dropdown-popover{
  position: absolute;
  border: 1px solid lightgray;
  top: 40px;
  left: 0;
  right: 0;
  background-color: #fff;
  width: 100%;
  z-index: 99;
  padding: 0;
  margin: 0;
  border-radius: 0 0 5px 5px;

}
.dropdown-popover input{
  width: 90%;
  margin: 10px;
}

.options{
  width: 100%;
}
.options ul{
  list-style: none;
  margin: 0;
  padding: 0 0 0 10px;
  max-height: 180px;
  overflow-y: scroll;
  overflow-x: hidden;
}
.options ul li{
  width: 100%;
  border-bottom: 1px solid lightgray;
  padding: 10px;
  background-color: #f1f1f1;
  cursor: pointer;
}
.options ul li:hover{
  background-color: #70878a;
  color: #fff;
}


.menu_arrange i{
  font-size: 40px;
}

@media print {
   .example-screen {
       display: none;
    }
}

::-webkit-scrollbar {
    display: none;
}
@page { 
    size: auto;  margin: 0mm; 
}



</style>
