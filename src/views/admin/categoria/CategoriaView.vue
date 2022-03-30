<template>
  <div class="card">
    <h1>Gestión Categorias</h1>

      <Toast />
        <ConfirmDialog></ConfirmDialog>

    <Button
      label="Nueva Categoria"
      icon="pi pi-external-link"
      @click="openNuevaCategoria"
    />
    <Dialog
      header="Nueva Categoria"
      v-model:visible="dialog"
      :style="{ width: '50vw' }"
    >
      <div class="p-fluid grid">
        <div class="field col-12 md:col-12">
          <span class="p-float-label">
            <InputText id="inputtext" type="text" v-model="categoria.nombre" />
            <label for="inputtext">Nombre</label>
          </span>
        </div>
        <div class="field col-12 md:col-12">
          <span class="p-float-label">
            <InputText id="inputtext" type="text" v-model="categoria.detalle" />
            <label for="inputtext">Detalle</label>
          </span>
        </div>
      </div>
      <template #footer>
        <Button
          label="No"
          icon="pi pi-times"
          @click="closeNuevaCategoria"
          class="p-button-text"
        />
        <Button
          label="Guardar"
          icon="pi pi-check"
          @click="crearCategoria()"
          autofocus
        />
      </template>
    </Dialog>
    <ProgressSpinner v-if="cargando" style="width:50px;height:50px" strokeWidth="8" fill="var(--surface-ground)" animationDuration=".5s"/>
    
    <DataTable :value="categorias" responsiveLayout="scroll">
      <Column field="id" header="ID"></Column>
      <Column field="nombre" header="Nombre"></Column>
      <Column field="detalle" header="Detalle"></Column>
      <Column :exportable="false" style="min-width: 8rem">
        <template #body="slotProps">
          <Button
            icon="pi pi-pencil"
            class="p-button-rounded p-button-success mr-2"
            @click="editCategoria(slotProps.data)"
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
import * as categoriaService from "./../../../services/categoria.service";

export default {
  data() {
    return {
      categorias: null,
      dialog: false,
      categoria: {
        nombre: "",
        detalle: "",
      },
      estadoEdicion: false,
      cargando: true,
    };
  },
  async mounted() {
    this.listarCategorias();
  },
  methods: {
    async listarCategorias() {
      this.cargando = true;
      const { data } = await categoriaService.listaCategorias();
      this.categorias = data;
      this.cargando = false;
    },
    openNuevaCategoria() {
      this.dialog = true;
      // this.estadoEdicion = false
    },
    closeNuevaCategoria() {
      this.dialog = false;
    },
    async crearCategoria() {
      this.cargando = true;
      let datos;
      if(this.estadoEdicion){
        // editamos
        datos = await categoriaService.modificarCategoria(this.categoria.id, this.categoria);
        
      }else{
        datos = await categoriaService.guardarCategoria(this.categoria);
        
      }
      if (!datos.data.error) {
        this.listarCategorias();

        this.closeNuevaCategoria();
        this.estadoEdicion = false;
        this.categoria = {
          nombre: "",
          detalle: "",
        };
      }
    },
    editCategoria(data){
      this.estadoEdicion = true
      this.categoria = data
      this.openNuevaCategoria()
    },
    confirmEliminar(data) {
      this.cargando = true;
            this.$confirm.require({
                message: 'Está seguro de eliminar la categoria?',
                header: 'Eliminar',
                icon: 'pi pi-exclamation-triangle',
                accept: async () => {
                   await categoriaService.eliminarCategoria(data.id);
                  this.listarCategorias();
                    this.$toast.add({severity:'info', summary:'Eliminado', detail:'Categoria Eliminada', life: 3000});
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