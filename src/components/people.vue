<template>
    <div id="people" class="container">
        <div style="margin-bottom:15px;">
            <h2>Add and edit people data</h2>

            <button type="button"
                    class="btn-green"
                    @click="showModal">
                Add
            </button>
        </div>
        <v-client-table class="" :selected-to="selectedRow" :data="rows" :columns="columns" :options="options">
            <div slot="gender" slot-scope="{ row }">
                {{getGender(row.gender)}}
            </div>
            <div slot="edit" slot-scope="{ row }">
                <button class="btn-green" @click="editPerson(row.personId)">Edit</button>
            </div>
        </v-client-table>
        <modal v-show="isModalVisible" :id="idValue"
               @close="closeModal" />
    </div>
</template>

<script>
import {ClientTable} from 'vue-tables-2';
    import Vue from 'vue'
    import vueResource from 'vue-resource'
    import Person from '../models/personModel';
    import modal from '../components/add-edit.vue';
    Vue.use(vueResource)
Vue.use(ClientTable);
export default {
        name: "People",
        components: {
            modal,
        },
  data() {
    return {
        selectedRow: [],
        id : 0,
      columns: [    
        "firstName",
        "surName",
        "gender",
        "emailAddress",
        "phoneNumber",
          "dateOfBirth",
          "edit"
      ],
        rows: [],
        isModalVisible: false,
        personEntity: Person,
        genders: [
            {
                "id": "0",
                "name": "N/A",

            },
            {
                "id": "1",
                "name": "Male",

            },
            {
                "id": "2",
                "name": "Female",
            }
        ],

      options: {
        filterByColumn: true,
        perPage: 10,
  
          dateColumns: ["dateOfBirth"],
        dateFormat: "YYYY-mm-dd",
        datepickerOptions: {
          showDropdowns: true,
          autoUpdateInput: true
        },
        pagination: { chunk: 10, dropdown: false },
          filterable: ["firstName", "surName"],
        headings: {
            firstName: "First Name",
            surName: "Surname",
            emailAddress: "Email Address",
            phoneNumber: "Phone Number",
            dateOfBirth: "Date Of Birth"
        }
      }
    };
  },
  mounted() {
    this.getAllUsers();
        },
        computed: {
            // a computed getter
            idValue: function () {
                // `this` points to the vm instance
                return this.id;
            }
        },
  methods: {
      getAllUsers: function() {
          this.$http.get(`https://localhost:44390/api/person`).then((response) => {
              this.rows = (response.data);
          });
    },
      getGender: function (value) {   
        return  this.genders.find(p => p.id == value).name;
      },
      showModal: function() {
          this.isModalVisible = true;
      },
      closeModal: function() {
          this.isModalVisible = false;
          this.getAllUsers();
          this.id = 0;
      },
      editPerson: function (id) {
          this.id = id;       
          this.showModal();
    }
  }
};
</script>

<style scoped>
    .btn-green {
        color: white;
        background: #4AAE9B;
        border: 1px solid #4AAE9B;
        border-radius: 2px;
        margin-left: 5px
    }
    #people {
        text-align: center;
        width: 95%;
        margin: 0 auto;
    }

    h2 {
        margin-bottom: 30px;
    }

    th,
    td {
        text-align: left;
        border-color:black;
    }

        th:nth-child(n+2),
        td:nth-child(n+2) {
            text-align: center;
        }

    thead tr:nth-child(2) th {
        font-weight: normal;
    } 

    .VueTables__dropdown-pagination {
        margin-left: 10px;
    }

    .VueTables__highlight {
        background: yellow;
        font-weight: normal;
    }




</style>