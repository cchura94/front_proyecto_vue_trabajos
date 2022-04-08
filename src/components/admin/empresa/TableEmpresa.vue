<template>
<DataTable ref="dt" :lazy="true" :value="publicaciones" v-model:selection="selectedPublicaciones" dataKey="id" 
                :paginator="true" :rows="2" :filters="filters" :totalRecords="totalRecords"
                :loading="loading" @page="onPage($event)"
                paginatorTemplate="FirstPageLink PrevPageLink PageLinks NextPageLink LastPageLink CurrentPageReport RowsPerPageDropdown" :rowsPerPageOptions="[5,10,25]"
                currentPageReportTemplate="Showing {first} to {last} of {totalRecords} products" responsiveLayout="scroll">
                <template #header>
                    <div class="table-header flex flex-column md:flex-row md:justiify-content-between">
						<h5 class="mb-2 md:m-0 p-as-md-center">Gestión Publicaciones</h5>
						<span class="p-input-icon-left">
                            <i class="pi pi-search" />
                            <InputText v-model="filters['global'].value" placeholder="Search..." />
                        </span>
					</div>
                </template>

                <Column selectionMode="multiple" style="width: 3rem" :exportable="false"></Column>
                <Column field="titulo" header="Titulo" :sortable="true" style="min-width:10rem"></Column>
                <Column field="nivel" header="Nivel" :sortable="true" style="min-width:10rem"></Column>
                <Column field="categoria.nombre" header="Categoria" :sortable="true" style="min-width:10rem"></Column>
                 <Column field="empresa.nombre" header="Empresa" :sortable="true" style="min-width:10rem"></Column>
                <Column field="salario" header="Salario" :sortable="true" style="min-width:10rem"></Column>
                
                <Column :exportable="false" style="min-width:8rem">
                    <template #body="slotProps">
                        <Button icon="pi pi-pencil" class="p-button-rounded p-button-success mr-2" @click="editProduct(slotProps.data)" />
                        <Button icon="pi pi-trash" class="p-button-rounded p-button-warning" @click="confirmDeleteProduct(slotProps.data)" />
                    </template>
                </Column>
            </DataTable>

  
</template>

<script>
export default {

}
</script>

<style>

</style>