<template>
  <div>
    <div class="card">
      <Toolbar class="mb-4">
        <template #start>
          <Button
            label="Nueva Publicación"
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
        v-model:visible="publicacionDialog"
        :style="{ width: '650px' }"
        header="Nueva Publicacion"
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

        /-->
        <div class="field">
          <label for="t">Titulo</label>
          <InputText
            id="t"
            v-model.trim="publicacion.titulo"
            required="true"
            autofocus
            :class="{ 'p-invalid': submitted && !publicacion.titulo }"
          />
          <small class="p-error" v-if="submitted && !publicacion.titulo"
            >Titulo es un campo Obligatorio.</small
          >
        </div>
        <div class="formgrid grid">
        <div class="field col">
          <label for="inventoryStatus" class="mb-3">Nivel</label>
          <Dropdown
            id="inventoryStatus"
            v-model="publicacion.nivel"
            :options="niveles"
            optionLabel="label"
            optionValue="value"
            placeholder="Seleccione el nivel"
          >
            <template #value="slotProps">
              <div v-if="slotProps.value && slotProps.value.value">
                <span
                  :class="'product-badge status-' + slotProps.value.value"
                  >{{ slotProps.value.label }}</span
                >
              </div>
              <div v-else-if="slotProps.value && !slotProps.value.value">
                <span
                  :class="
                    'product-badge status-' + slotProps.value.toLowerCase()
                  "
                  >{{ slotProps.value }}</span
                >
              </div>
              <span v-else>
                {{ slotProps.placeholder }}
              </span>
            </template>
          </Dropdown>
        </div>
        <div class="field col">
          <label for="inventoryStatus" class="mb-3">Categoria</label>
          <Dropdown
            id="inventoryStatus"
            v-model="publicacion.categoria_id"
            :options="categorias"
            optionLabel="nombre"
            optionValue="id"
            placeholder="Seleccione categoria"
          >
          </Dropdown>
        </div>
        <div class="field col">
          <label for="inventoryStatus" class="mb-3">Empresa</label>
          <Dropdown
            id="inventoryStatus"
            v-model="publicacion.empresa_id"
            :options="empresas"
            optionLabel="nombre"
            optionValue="id"
            placeholder="Seleccione Empresa"
          >
          </Dropdown>
        </div>
        </div>
        <div class="field">
          <label for="descripcion">Descripción</label>
          <Textarea
            id="descripcion"
            v-model="publicacion.descripcion"
            required="false"
            rows="3"
            cols="20"
          />
        </div>
        <div class="field">
          <label for="requerimientos">requerimientos</label>
          <Textarea
            id="requerimientos"
            v-model="publicacion.requerimientos"
            required="false"
            rows="2"
            cols="20"
          />
        </div>

        <div class="field">
          <label class="mb-3">Tipo</label>
          <div class="formgrid grid">
            <div class="field-radiobutton col-6">
              <RadioButton
                id="cat1"
                name="tipo"
                value="Tiempo completo"
                v-model="publicacion.tipo"
              />
              <label for="cat1">Tiempo completo</label>
            </div>
            <div class="field-radiobutton col-6">
              <RadioButton
                id="publi2"
                name="tipo"
                value="Medio Tiempo"
                v-model="publicacion.tipo"
              />
              <label for="publi2">Medio Tiempo</label>
            </div>
            <div class="field-radiobutton col-6">
              <RadioButton
                id="publi3"
                name="tipo"
                value="Temporal"
                v-model="publicacion.tipo"
              />
              <label for="publi3">Temporal</label>
            </div>
            <div class="field-radiobutton col-6">
              <RadioButton
                id="category4"
                name="tipo"
                value="Pasantias"
                v-model="publicacion.tipo"
              />
              <label for="category4">Pasantias</label>
            </div>
            <div class="field-radiobutton col-6">
              <RadioButton
                id="category5"
                name="tipo"
                value="Servicio"
                v-model="publicacion.tipo"
              />
              <label for="category5">Servicio</label>
            </div>
          </div>
        </div>

        <div class="formgrid grid">
          <div class="field col">
            <label for="sal">salario</label>
            <InputNumber
              id="sal"
              v-model="publicacion.salario"
              mode="currency"
              currency="USD"
              locale="en-US"
            />
          </div>
          <div class="field col">
            <label for="t">Ubicación</label>
            <InputText
              id="t"
              v-model.trim="publicacion.ubicacion"
              required="true"
              autofocus
              :class="{ 'p-invalid': submitted && !publicacion.ubicacion }"
            />
            <small class="p-error" v-if="submitted && !publicacion.ubicacion"
              >ubicacion es un campo Obligatorio.</small
            >
          </div>
          {{ publicacion }}
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
            @click="guardarPublicacion"
          />
        </template>
      </Dialog>
    </div>
  </div>
</template>

<script>
import { onMounted, ref } from "vue";
import * as publicacionService from "./../../../services/publicacion.service.js";
import * as categoriaService from "./../../../services/categoria.service.js"
import * as empresaService from "./../../../services/empresa.service.js"

export default {
  setup() {
    onMounted(async () => {
      const { data } = await publicacionService.listaPublicaciones();
      publicaciones.value = data;
      console.log(publicaciones.value);
      const cat = await categoriaService.listaCategorias();
      categorias.value = cat.data
      const emp = await empresaService.listaEmpresas();
      empresas.value = emp.data.data
    });

    const publicaciones = ref();
    const publicacion = ref({});
    const categorias = ref({});
    const empresas = ref({});
    const publicacionDialog = ref(false);
    const submitted = ref(false);

    const niveles = ref([
	     	{label: 'JUNIOR', value: 'junior'},
	     	{label: 'SENIOR', value: 'senior'},
	     	{label: 'MANAGER', value: 'manager'}
    ]);


    const abrirDialog = () => {
            publicacion.value = {};
            submitted.value = false;
            publicacionDialog.value = true;
        };
    
    const guardarPublicacion = async () => {
            submitted.value = true;

			if (publicacion.value.titulo.trim()) {
        const { data } = await publicacionService.guardarPublicacion(publicacion.value)
                /*if (product.value.id) {
                    product.value.inventoryStatus = product.value.inventoryStatus.value ? product.value.inventoryStatus.value : product.value.inventoryStatus;
                    products.value[findIndexById(product.value.id)] = product.value;
                    toast.add({severity:'success', summary: 'Successful', detail: 'Product Updated', life: 3000});
                }
                else {
                    product.value.id = createId();
                    product.value.code = createId();
                    product.value.image = 'product-placeholder.svg';
                    product.value.inventoryStatus = product.value.inventoryStatus ? product.value.inventoryStatus.value : 'INSTOCK';
                    products.value.push(product.value);
                    toast.add({severity:'success', summary: 'Successful', detail: 'Product Created', life: 3000});
                }*/

                publicacionDialog.value = false;
                publicacion.value = {};
            }
        };

    return {
      publicaciones,
      publicacionDialog,
      abrirDialog,
      publicacion,
      niveles,
      empresas,
      submitted,
      categorias,
      guardarPublicacion,
    };
  },
};
</script>
<style lang="scss" scoped>
.table-header {
    display: flex;
    align-items: center;
    justify-content: space-between;

    @media screen and (max-width: 960px) {
        align-items: start;
	}
}

.product-image {
    width: 50px;
    box-shadow: 0 3px 6px rgba(0, 0, 0, 0.16), 0 3px 6px rgba(0, 0, 0, 0.23);
}

.p-dialog .product-image {
    width: 50px;
    margin: 0 auto 2rem auto;
    display: block;
}

.confirmation-content {
    display: flex;
    align-items: center;
    justify-content: center;
}
@media screen and (max-width: 960px) {
	::v-deep(.p-toolbar) {
		flex-wrap: wrap;
        
		.p-button {
            margin-bottom: 0.25rem;
        }
	}
}
</style>