<script>
    import Person from '../models/personModel';
    import Vue from 'vue'
    import vueResource from 'vue-resource';
    import moment from 'moment';
    Vue.use(vueResource)
    export default {
        name: 'modal',
        props: {
            id: Number         
        },
        data() {
            return {
                options: [
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
                personEntity: Person,
                selected: 0,
            }
        },
     

  
        watch: {
            id: function () {
                if (this.id > 0) {
                    this.$http.get(`https://localhost:44390/api/person/${this.id}`).then((response) => {
                        this.personEntity = response.data;
                        this.personEntity.dateOfBirth = moment(this.personEntity.dateOfBirth).format("YYYY-MM-DD")
                        console.log(this.personEntity.gender )
                    });
                }
                else {
                    this.personEntity = new Person(0, "", "", "", new Date(), 0, "");
                }
            }
        },
        methods: {
            
            close() {
                this.$emit('close');
                this.personEntity = new Person(0, "", "", "", new Date(), 0, "");
            },
            addPerson: function () {            
                if (this.personEntity.personId > 0) {
                    this.$http.put("https://localhost:44390/api/person", this.personEntity).then(() => {
                        this.close();
                    });   
                }
                else {                  
                    this.$http.post("https://localhost:44390/api/person", this.personEntity).then(() => {
                        this.close();
                    });             
                }
                    
            },
        },
    };
</script>

<template>
    <div class="modal-backdrop">
        <div class="modal" role="dialog">
            <header class="modal-header">
                <slot name="header">
                    <strong>
                        Add or edit person details
                    </strong>
                </slot>
            </header>
            <section class="modal-body">
                <slot name="body">
                    <div>
                        <div class="row">
                            <div class="column" style=" align-items: flex-start;"><strong>First Name</strong></div>
                            <div class="column">
                                <input class="form-control" type="text" v-model="personEntity.firstName">
                            </div>
                        </div>
                        <br />
                        <div class="row">
                            <div class="column"><strong>SurName</strong></div>
                            <div class="column">
                                <input class="form-control" type="text" v-model="personEntity.surName">
                            </div>
                        </div>
                        <br />
                        <div class="row">
                            <div class="column"><strong>Gender</strong></div>
                            <div class="column">
                                <select class="form-control" v-model="personEntity.gender">
                                    <option>Choose Gender</option>
                                    <option v-for="option in options" v-bind:key="option.id" v-bind:value="option.id">{{ option.name }}</option>
                                </select>
                            </div>
                        </div>
                        <br />
                        <div class="row">
                            <div class="column"><strong>Email Address</strong></div>
                            <div class="column">
                                <input class="form-control" type="text" v-model="personEntity.emailAddress">
                            </div>
                        </div>
                        <br />
                        <div class="row">
                            <div class="column"><strong>Phone Number</strong></div>
                            <div class="column">
                                <input class="form-control" type="text" v-model="personEntity.phoneNumber">
                            </div>
                        </div>
                        <br />
                        <div class="row">
                            <div class="column"><strong>Date of Birth</strong></div>
                            <div class="column">
                                <input class="form-control" type="date" v-model="personEntity.dateOfBirth">
                            </div>
                        </div>
                        <br />
                    </div>

                </slot>
            </section>
            <footer class="modal-footer">
                <slot name="footer">

                    <button type="button"
                            class="btn-green"
                            @click="close">
                        Cancel
                    </button>
                    <button type="button" style="padding-left:30px;"
                            class="btn-green"
                            @click="addPerson">
                        OK
                    </button>
                </slot>
            </footer>
        </div>
    </div>
</template>

<style>
    .modal-backdrop {
        position: fixed;
        top: 0;
        bottom: 0;
        left: 0;
        right: 0;
        background-color: rgba(0, 0, 0, 0.3);
        display: flex;
        justify-content: center;
        align-items: center;
    }

    .modal {
        background: #FFFFFF;
        box-shadow: 2px 2px 20px 1px;
        overflow-x: auto;
        display: flex;
        flex-direction: column;
        width:400px;
    }

    .modal-header,
    .modal-footer {
        padding: 15px;
        display: flex;
    }
    .column {
        float: left;
        width: 45%;
    }

    /* Clear floats after the columns */
    .row:after {
        content: "";
        display: table;
        clear: both;
    }
    .modal-header {
        border-bottom: 1px solid #eeeeee;
        color: #4AAE9B;
        justify-content: space-between;
    }

    .modal-footer {
        border-top: 1px solid #eeeeee;
        justify-content: flex-end;
    }

    .modal-body {
        position: relative;
        padding: 20px 10px;
    }

    .btn-close {
        border: none;
        font-size: 20px;
        padding: 20px;
        cursor: pointer;
        font-weight: bold;
        color: #4AAE9B;
        background: transparent;
    }

    .btn-green {
        color: white;
        background: #4AAE9B;
        border: 1px solid #4AAE9B;
        border-radius: 2px;
        margin-left: 5px
    }
</style>