<template>
	<div class="home">
		
		<b-row>      
			
			<b-col md="10" class="mx-auto text-center">        
				
				<b-button v-b-toggle.sidebar-backdrop class="my-2">Registrar Nueva Entrega</b-button>  
				<json-excel :data="TableExport()" name="registro_de_entrega_de_materia_prima.xls"></json-excel>	
				
					
				<b-card
					style="border: none;"
				>
					<b-sidebar
						id="sidebar-backdrop"
						ref="mySidebar"
						no-header
						backdrop
						shadow
						right 
						width="400px"
					>
						<template #default="{ hide }">
							<div class="p-3">
								<div class="font-weight-bold my-2">
									<h4 class="text-success font-weight-bold">Registrar Nueva Entrega</h4>  
								</div>
															
								<b-form class="form-content" @submit="onSubmit" @reset="onReset">								
									<b-form-group
										label="Fecha"
										label-for="date"
										class="mt-3"
									>
										 <flat-pickr
										 	id="date"
											v-model="newDate"
											class="form-control"
											:config="{ dateFormat: 'Y-m-d '}"
										/>
									</b-form-group>
									
									<b-form-group
										label="Turno"
										label-for="work_shift"
										class="mt-3"
									>
										<b-form-select
											id="work_shift"
											class="form-control" 
											v-model="newWorkShift" 
											:options="optionsWS"
										>
										</b-form-select>
									</b-form-group>
																	
									<b-form-group
										label="Fecha y Hora Registro"
										label-for="datetime"
										class="mt-3"
									>
										<flat-pickr
											id="datetime"
											v-model="newRegisterDatetime"
											class="form-control"                      
											:config="{ enableTime: true,dateFormat: 'Y-m-d H:i'}"
										/>
									</b-form-group>
									
									<b-form-group
										label="Operario"
										label-for="operatorId"
										class="mt-3"
									>
										<b-form-select 
											id="operatorId"
											v-model="newOperator"
											class="form-control" 
											:options="optionsOperators"
										>
										</b-form-select>
									</b-form-group>
									
									<b-form-group
										label="N°Orden de Fabricación"
										label-for="production_order"
										class="mt-3"
									>
										<b-form-input 
											id="production_order" 
											v-model="newProductionOrder" 
											type="number"
											class="form-control" 
											trim
											min="0"
										>
										</b-form-input>
									</b-form-group>
									
									<b-form-group
										label="N°Lote de MP"
										label-for="lot_mp"
										class="mt-3"
									>
										<b-form-input
											id="lot_mp" 
											v-model="newLotMp" 
											class="form-control" 
											type="number"
											min="0"
											trim
										>
										</b-form-input>
									</b-form-group>
																		
									<b-form-group
										label="Material"
										label-for="materialId"
										class="mt-3"
									>
										<b-form-select 
											id="materialId" 
											v-model="newMaterial" 
											:options="optionsMaterials" 
											class="form-control"
										>
										</b-form-select>
									</b-form-group>
																	
									<b-form-group
										label="KG"
										label-for="unit_quantity"
										class="mt-3"
									>
										<b-form-input
											id="unit_quantity" 
											v-model="newUnitQuantity" 
											class="form-control" 
											type="number"
											step=".01"
											min="0.00"
											trim
										>
										</b-form-input>
									</b-form-group>
									
									<div class="d-flex mt-4">
										<b-button										
											variant="success"
											class="mx-2"
											type="submit"
										>
											REGISTRAR
										</b-button>
										
										<b-button
											type="reset"
											variant="outline-secondary"
											@click="hide"
										>
											CANCELAR
										</b-button>
									</div>
									
								</b-form>
								
							</div>
						</template>
					</b-sidebar>
					
					
					<b-table
						striped
						hover
						responsive
						thead-class="bg-secondary text-white"     
						class="content-table"
						ref="refTable"
						:items="items"            
						:fields="tableColumns"
						show-empty
						empty-text="No se encontraron registros coincidentes"        
					>            
					</b-table>
				</b-card>
			</b-col>
		</b-row>
		
	</div>
</template>

<script>
import Vue from 'vue';
import flatPickr from 'vue-flatpickr-component'
import 'flatpickr/dist/flatpickr.css';
import axios from 'axios';
import moment from 'moment';
import Swal from 'sweetalert2'
import VueSweetalert2 from 'vue-sweetalert2';
import JsonExcel from "./download-excel";

Vue.use(VueSweetalert2);

export default {
	name: 'Home',
	components: {
		flatPickr,
		JsonExcel,
	},
	data() {
		return {
			newDate: null,
			newWorkShift: null,
			newRegisterDatetime: null,
			newOperator: null,
			newProductionOrder: null,
			newLotMp: null,
			newMaterial: null,
			newUnitQuantity: null,
			
			optionsWS: [
				{ value: null, text: '-- Seleccione --', disabled: true},
				{ value: 1, text: "1"},
				{ value: 2, text: "2"}
			],			
			optionsOperators: [],
			optionsMaterials: [],
			
			items: [],
			tableColumns: [
				{key: 'index', label: 'item'},
				{key: 'date', label: 'Fecha'},
				{key: 'work_shift_id', label: 'Turno'},
				{key: 'register_date', label: 'Fecha Registro'},
				{key: 'register_time', label: 'Hora'},
				{key: 'operator_code', label: 'Código Operario'},
				{key: 'operator_name', label: 'Nombre Operario'},
				{key: 'production_order', label: 'N°Orden de fabricación'},
				{key: 'lot_mp', label: 'N°Lote de MP'},
				{key: 'material_code', label: 'Código de material'},
				{key: 'material_description', label: 'Descripción'},
				{key: 'material_unit', label: 'Und Med'},
				{key: 'unit_quantity', label: 'KG'},
			],
		}
	},
	beforeMount(){
		this.getDataTable();    
		this.getDataOperator();
		this.getDataMaterial();
	},
	methods: {
		getDataTable(){
			this.items = [];
			
			axios
				.get(`${process.env.VUE_APP_HOST}/api/dashboard/registration/all`)
				.then(response => {
					
					if(response.data){
						let data = response.data;
						
						data.map( (item, index) => {
							this.items.push({
								index: index + 1,
								date: item.date,
								work_shift_id: item.work_shift_id,
								register_date: moment(item.registration_datetime).format("YYYY-MM-DD"),
								register_time: moment(item.registration_datetime).format("HH:mm"),
								operator_code: item.operator.code,
								operator_name: item.operator.name,
								production_order: item.production_order,
								lot_mp: item.lot_mp,
								material_code: item.material.code,
								material_description: item.material.description,
								material_unit: item.material.unit,
								unit_quantity: item.unit_quantity,
							})
						})
					}
				});
		},
		getDataOperator(){
			axios
			 .get(`${process.env.VUE_APP_HOST}/api/dashboard/registration/operators`)
				.then(response => {
					if(response.data){
						let data = response.data;
						
						this.optionsOperators.push({ 
							value: null, 
							text: '-- Seleccione --', 
							disabled: true
						});
						
						data.map( item => {
							this.optionsOperators.push({
								value: item.id,
								text: item.name,
							});
						});
					}
				});
		},
		getDataMaterial(){
			axios
			.get(`${process.env.VUE_APP_HOST}/api/dashboard/registration/materials`)
			.then(response => {
				if(response.data){
					let data = response.data;
					
					this.optionsMaterials.push({ 
						value: null, 
						text: '-- Seleccione --', 
						disabled: true
					});
					
					data.map( item => {
						this.optionsMaterials.push({
							value: item.id,
							text: item.description,
							unit: item.unit,
						});
					});
				}
			});
		},
		onSubmit(){
			
			if(!this.newDate || !this.newWorkShift || !this.newRegisterDatetime || !this.newOperator || !this.newProductionOrder || !this.newLotMp || !this.newMaterial || !this.newUnitQuantity){
				Swal.fire({
					title: 'Error!',
					text: 'No puede dejar espacios en blanco',
					icon: 'error',
					showConfirmButton: false,
					timer: 2100,
					buttonsStyling: false,
				});
			} else {
				
				let data = {
					date: this.newDate,
					work_shift_id: this.newWorkShift,
					registration_datetime: this.newRegisterDatetime,
					operator_id: this.newOperator,
					production_order: this.newProductionOrder,
					lot_mp: this.newLotMp,
					material_id: this.newMaterial,
					unit_quantity: this.newUnitQuantity
				}
				
				axios
				.post(`${process.env.VUE_APP_HOST}/api/dashboard/registration/create`, data)
				.then( () => {
					
					Swal.fire({
						title: 'Se ha registrado exitosamente!',
						icon: 'success',
						showConfirmButton: false,
						timer: 2100,
						buttonsStyling: false,
					});
					
					this.getDataTable();
					this.$refs['refTable'].refresh();
					this.$refs['mySidebar'].hide();
						
				});
			}
		},
		onReset(){
			this.newDate = null;
			this.newWorkShift = null;
			this.newRegisterDatetime = null;
			this.newOperator = null;
			this.newProductionOrder = null;
			this.newLotMp = null;
			this.newMaterial = null;
			this.newUnitQuantity = null;
		},
		TableExport(){
				
			let array = [];
			
			for (let a = 0; a < this.items.length; a++)
			{						
				let objBody = {
					'ITEM': a+1,
					'FECHA': this.items[a]["date"],
					'TURNO': this.items[a]["work_shift_id"],
					'FECHA DE REGISTRO': this.items[a]["register_date"],
					'HORA': this.items[a]["register_time"],
					'CODIGO OPERARIO': this.items[a]["operator_code"],
					'NOMBRE OPERARIO': this.items[a]["operator_name"],
					'NRO ORDEN DE FABRICACION': this.items[a]["production_order"],
					'NRO LOTE DE MP': this.items[a]["lot_mp"],
					'CDIGO DE MATERIAL': this.items[a]["material_code"],
					'DESCRIPCION': this.items[a]["material_description"],
					'UNIDAD DE MEDIDA': this.items[a]["material_unit"],
					'KG': this.items[a]["unit_quantity"],
				};
				
				array.push(objBody);
			}
			
			return array;
		}
	}
	
}
</script>

<style scoped>

	.content-table {
		border-collapse: collapse;
		margin: 25px 0;
		font-size: 0.9em;
		min-width: 400px;
		border-radius: 5px 5px 0 0;
		overflow: hidden;
		box-shadow: 0 0 20px rgba(0, 0, 0, 0.15);
	}

</style>


