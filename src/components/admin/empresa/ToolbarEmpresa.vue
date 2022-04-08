<template>
  <Toolbar class="mb-4">
        <template #start>
          <Button
            label="Nueva Empresa"
            icon="pi pi-plus"
            class="p-button-success mr-2"
            @click="abrirDialog"
          />
          <Button
            label="Eliminar"
            icon="pi pi-trash"
            class="p-button-danger"
            @click="confirmDeleteSelected"
            :disabled="!selectedProducts || !selectedProducts.length"
          />
        </template>

        <template #end>
          <FileUpload
            mode="basic"
            accept="image/*"
            :maxFileSize="1000000"
            label="Importar"
            chooseLabel="Import"
            class="mr-2 inline-block"
          />
          <Button
            label="Exportar"
            icon="pi pi-upload"
            class="p-button-help"
            @click="exportCSV($event)"
          />
        </template>
      </Toolbar>

      <Dialog
        v-model:visible="empresaDialog"
        :style="{ width: '650px' }"
        header="Nueva Empresa"
        :modal="true"
        class="p-fluid"
      >
        <!--img
          src="https://www.primefaces.org/wp-content/uploads/2020/05/placeholder.png"
          :alt="product.image"
          class="product-image"
          v-if="product.image"

estado
empresa_id
categoria_id
persona_id






descripcion
telefono
nombre_contacto
logo

        /-->
        <div class="field">
          <label for="t">nombre</label>
          <InputText
            id="t"
            v-model.trim="empresa.nombre"
            required="true"
            autofocus
            :class="{ 'p-invalid': submitted && !empresa.nombre }"
          />
          <small class="p-error" v-if="submitted && !empresa.nombre"
            >nombre es un campo Obligatorio.</small
          >
        </div>
        <div class="field">
          <label for="t">Nombre Contacto</label>
          <InputText
            id="t"
            v-model.trim="empresa.nombre_contacto"
            required="true"
            autofocus
            :class="{ 'p-invalid': submitted && !empresa.nombre_contacto }"
          />
          <small class="p-error" v-if="submitted && !empresa.nombre_contacto"
            >nombre contacto es un campo Obligatorio.</small
          >
        </div>
        <div class="formgrid grid">
        <div class="field col">
          <label for="inventoryStatus" class="mb-3">Ciudad</label>
          <InputText
            id="t"
            v-model.trim="empresa.ciudad"
            required="true"
            autofocus
            :class="{ 'p-invalid': submitted && !empresa.ciudad }"
          />
        </div>

        <div class="field col">
          <label for="inventoryStatus" class="mb-3">Pais</label>
          <InputText
            id="t"
            v-model.trim="empresa.pais"
            required="true"
            autofocus
            :class="{ 'p-invalid': submitted && !empresa.pais }"
          />
        </div>
        </div>
        <div class="field">
          <label for="descripcion">Descripción</label>
          <Textarea
            id="descripcion"
            v-model="empresa.descripcion"
            required="false"
            rows="3"
            cols="20"
          />
        </div>
        <div class="field">
          <label for="requerimientos">telefono</label>
          <InputText
            id="t"
            v-model.trim="empresa.telefono"
            required="true"
            autofocus
            :class="{ 'p-invalid': submitted && !empresa.telefono }"
          />
        </div>

        <div class="field">
            <input type="file" @change="onImagenSeleccionada">
          
        </div>

        <div class="formgrid grid">
          <div class="field col">
            <label for="t">direccion</label>
            <InputText
              id="t"
              v-model.trim="empresa.direccion"
              required="true"
              autofocus
              :class="{ 'p-invalid': submitted && !empresa.direccion }"
            />
            <small class="p-error" v-if="submitted && !empresa.direccion"
              >direccion es un campo Obligatorio.</small
            >
          </div>
          <div class="field col">
            <label for="t">sitio_web</label>
            <InputText
              id="t"
              v-model.trim="empresa.sitio_web"
              required="true"
              autofocus
              :class="{ 'p-invalid': submitted && !empresa.sitio_web }"
            />
            <small class="p-error" v-if="submitted && !empresa.sitio_web"
              >sitio_web es un campo Obligatorio.</small
            >
          </div>
          {{ empresa }}
          <!--div class="field col">
            <label for="quantity">Quantity</label>
            <InputNumber id="quantity" v-model="product.quantity" integeronly />
          </div-->
        </div>
        <template #footer>
          <Button
            label="Cancel"
            icon="pi pi-times"
            class="p-button-text"
            @click="hideDialog"
          />
          <Button
            label="Save"
            icon="pi pi-check"
            class="p-button-text"
            @click="guardarEmpresa"
          />
        </template>
      </Dialog>
</template>

<script>
import { ref } from "vue";
import * as empresaService from "./../../../services/empresa.service"

export default {
    setup(){

        const empresas = ref();
        const empresa = ref({});
        const empresaDialog = ref(false);
        const submitted = ref(false);
        const selectedEmpresas = ref();
            // paginacion lazy
        const totalRecords = ref(0);
        const loading = ref(false);
        const lazyParams = ref({});

        const abrirDialog = () => {
            empresa.value = {};
            submitted.value = false;
            empresaDialog.value = true;
        };

        const guardarEmpresa = async () => {
            submitted.value = true;
            // empresa.value.logo = "prueba.jpg"

			if (empresa.value.nombre.trim()) {
                const fd = new FormData()
                fd.append('nombre', empresa.value.nombre);
                fd.append('sitio_web', empresa.value.sitio_web);
                fd.append('direccion', empresa.value.direccion);
                fd.append('ciudad', empresa.value.ciudad);
                fd.append('pais', empresa.value.pais);
                fd.append('descripcion', empresa.value.descripcion);
                fd.append('telefono', empresa.value.telefono);
                fd.append('nombre_contacto', empresa.value.nombre_contacto);
                fd.append('logo', empresa.value.logo);
        const { data } = await empresaService.guardarEmpresa(fd)
                console.log(data)

                //listarPublicacion()

                empresaDialog.value = false;
                empresa.value = {};
            }
        };

        const onImagenSeleccionada = (event) => {
            console.log(event.target.files[0])
            empresa.value.logo = event.target.files[0]
        }

        return {
            empresas,
            empresa,
            empresaDialog,
            submitted,
            selectedEmpresas,
            totalRecords,
            loading,
            lazyParams,
            abrirDialog,
            guardarEmpresa,
            onImagenSeleccionada
        }
    }

}
</script>

<style>

</style>