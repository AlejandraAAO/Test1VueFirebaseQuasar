<template>
  <div id="app">
    <nav class="navbar">
      <span class="title-text-navbar">Proyecto Inicial : Lista de compras</span>
    </nav>
    <main class="row bg-blue-grey-2">
      <div class="fit row wrap justify-start items-start content-start container-main">
        <div class="col-4 section-input-text container-section">
          <q-card>
            <q-card-section>
              <div class="text-h6 text-center">Items</div>
              <q-form
                @submit.prevent="saveItem">
                <q-input
                  v-model="newItem.name"
                  label="Nombre"  
                />
                <q-input
                  type="number"
                  v-model="newItem.quantity"
                />
                <div class="container-btn-submit">
                  <q-btn label="Guardar" type="submit" color="primary"/>
                
                </div>
              </q-form>
            </q-card-section>
          </q-card>
        </div>
        <div class="col-8 container-section">
          <q-card>
            <q-card-section>
              <div class="text-h6 text-center">Listado</div>
              
            </q-card-section>
            <q-separator inset />
            <q-card-section>
              <div class="text-h6 text-center">
                <q-table
                  :data="items"
                  :columns="columns"
                  row-key="name"
                />
                
              </div>
            </q-card-section>
          </q-card>
        </div>
      </div>
    </main>
  </div>
</template>

<script>
/* importamos firebase */
import firebase from 'firebase';
/* importamos la configuración  */
import firebaseConfig from './config';

/* inicializamos */
let app = firebase.initializeApp(firebaseConfig);
/* para conectarnos a la bd , base de datos completa*/
let db = app.database();

/* solo a la porcion q tendra de nombre items */
let dbRef = db.ref('items');


export default {
  name: "app",
  firebase:{
    /*referencia - conexion a quien apuntar*/
    items: dbRef
  },
  data(){
    return {
      columns:[
         {
          name: 'name', 
          field: 'name',
          label: 'Nombre',
          align: 'left',
          sortable: true
        },
        {
          name: 'quantity', 
          field: 'quantity',
          label: 'Cantidad',
          align: 'left',
          sortable: true
        }
      ],
      newItem:{
        name:'',
        quantity:0
      },
      /* ----PuntoImportante: se debe declarar un valor en 
      data con el mismo nombre de la referencia en firebase; sino saltara el aviso de undefined*/
      items:[]
    }
  },
  methods: {
    saveItem(){
      console.log('newItem',this.newItem);
      /* agregamos los datos a la bd de firebase */
      dbRef.push(this.newItem);

      this.newItem = {
        name:'',
        quantity:0
      };

    },
    
   
  },
  mounted(){
    
  }

};
</script>

<style lang="scss">
@import "@/assets/layout.scss";
</style>
