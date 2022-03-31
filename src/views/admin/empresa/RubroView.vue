<template>
  <div class="card">
    <h1>Gestión Rubro</h1>

      <Toast />
        <ConfirmDialog></ConfirmDialog>

    <Button
      label="Nueva Rubro"
      icon="pi pi-external-link"
      @click="openNuevaRubro"
    />
    <Dialog
      header="Nuevo Rubro"
      v-model:visible="dialog"
      :style="{ width: '50vw' }"
    >
      <div class="p-fluid grid">
        <div class="field col-12 md:col-12">
          <span class="p-float-label">
            <InputText id="inputtext" type="text" v-model="rubro.nombre" />
            <label for="inputtext">Nombre</label>
          </span>
        </div>
        <div class="field col-12 md:col-12">
          <span class="p-float-label">
            <InputText id="inputtext" type="text" v-model="rubro.detalle" />
            <label for="inputtext">Detalle</label>
          </span>
        </div>
      </div>
      <template #footer>
        <Button
          label="No"
          icon="pi pi-times"
          @click="closeNuevaRubro"
          class="p-button-text"
        />
        <Button
          label="Guardar"
          icon="pi pi-check"
          @click="crearRubro()"
          autofocus
        />
      </template>
    </Dialog>
    <ProgressSpinner v-if="cargando" style="width:50px;height:50px" strokeWidth="8" fill="var(--surface-ground)" animationDuration=".5s"/>
    
    <DataTable :value="rubros" responsiveLayout="scroll">
      <Column field="id" header="ID"></Column>
      <Column field="nombre" header="Nombre"></Column>
      <Column field="detalle" header="Detalle"></Column>
      <Column :exportable="false" style="min-width: 8rem">
        <template #body="slotProps">
          <Button
            icon="pi pi-pencil"
            class="p-button-rounded p-button-success mr-2"
            @click="editRubro(slotProps.data)"
          />
          <Button
            icon="pi pi-trash"
            class="p-button-rounded p-button-warning"
            @click="confirmEliminar(slotProps.data)"
          />
        </template>
      </Column>
    </DataTable>
  </div>
</template>

<script>
import * as rubroService from "./../../../services/rubro.service";

export default {
  data() {
    return {
      rubros: null,
      dialog: false,
      rubro: {
        nombre: "",
        detalle: "",
        estado: true
      },
      estadoEdicion: false,
      cargando: true,
    };
  },
  async mounted() {
    this.listarRubros();
  },
  methods: {
    async listarRubros() {
      this.cargando = true;
      const { data } = await rubroService.listaRubros();
      this.rubros = data;
      this.cargando = false;
    },
    openNuevaRubro() {
      this.dialog = true;
      // this.estadoEdicion = false
    },
    closeNuevaRubro() {
      this.dialog = false;
    },
    async crearRubro() {
      this.cargando = true;
      let datos;
      if(this.estadoEdicion){
        // editamos
        datos = await rubroService.modificarRubro(this.rubro.id, this.rubro);
        
      }else{
        datos = await rubroService.guardarRubro(this.rubro);
        
      }
      if (!datos.data.error) {
        this.listarRubros();

        this.closeNuevaRubro();
        this.estadoEdicion = false;
        this.rubro = {
          nombre: "",
          detalle: "",
        };
      }
    },
    editRubro(data){
      this.estadoEdicion = true
      this.rubro = data
      this.openNuevaRubro()
    },
    confirmEliminar(data) {
      this.cargando = true;
            this.$confirm.require({
                message: 'Está seguro de eliminar el Rubro?',
                header: 'Eliminar',
                icon: 'pi pi-exclamation-triangle',
                accept: async () => {
                   await rubroService.eliminarRubro(data.id);
                  this.listarRubros();
                    this.$toast.add({severity:'info', summary:'Eliminado', detail:'Rubro Eliminado', life: 3000});
                },
                reject: () => {
                    this.$toast.add({severity:'error', summary:'Rejected', detail:'You have rejected', life: 3000});
                }
            });
            this.cargando = false;
        },
  },
};
</script>

<style>
</style>