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
                  <q-btn label="Guardar" type="submit" color="blue-6"/>
                
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
                >
                   <template v-slot:body="props">
                     <q-tr :props="props">
                      <q-td key="name" :props="props"> {{ props.row.name }}</q-td>
                      <q-td key="quantity" :props="props"> {{ props.row.quantity }}</q-td>
                      <q-td key="extra" :props="props"> {{ props.row.extra }}
                        <q-btn round color="red-5" icon="delete_outline" size="0.6rem" @click="actionDeleteItem(props.row)"/>
                      </q-td>
                     </q-tr>
                   </template>
                </q-table>
                
              </div>
            </q-card-section>
          </q-card>
        </div>
      </div>
    </main>
    <q-dialog v-model="confirm" persistent>
      <q-card>
        <q-card-section class="row items-center">
          <q-avatar icon="question_answer" color="primary" text-color="white" />
          <span class="q-ml-sm">Estas seguro que quieres eliminarlo?</span>
        </q-card-section>

        <q-card-actions align="right">
          <q-btn flat label="Por ahora no" color="primary" v-close-popup />
          <q-btn flat label="Si" color="primary" @click="deleteItem" />
        </q-card-actions>
      </q-card>
    </q-dialog>
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
      /* ventanita de confirmación */
      confirm: false,
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
        },
        {
          name: 'extra', 
          field: '',
          label: '',
          align: 'left',
         
        }
      ],
      newItem:{
        name:'',
        quantity:0
      },
      /* item seleccionado sin ningun valor */
      itemSelected:undefined,
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
    actionDeleteItem(item){
      this.confirm = true;
      /* guardamos los datos de la fila que selecionamos para eliminar */
      this.itemSelected = item;
    },
   deleteItem(){
     console.log(this.itemSelected);
      /* buscamos un elemento atraves de la funcion child */
      dbRef.child(this.itemSelected['.key']).remove();
      /* ocultamos el confirm */
      this.confirm = false;
      /* limpiamos la variable */
      this.itemSelected = null;
   }
  },
  mounted(){
    
  }

};
</script>

<style lang="scss">
@import "@/assets/layout.scss";
</style>
