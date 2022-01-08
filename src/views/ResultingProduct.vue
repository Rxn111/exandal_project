<template>
	<div class="home">
		
		<b-row>      
			
			<b-col md="10" class="mx-auto text-center">        
				<b-button v-b-toggle.sidebar-backdrop class="my-2">Registrar Nuevo Producto Resultante</b-button>  
				<json-excel :data="TableExport()" name="registro_de_producto_resultante.xls"></json-excel>
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
									<h4 class="text-success font-weight-bold">Registrar Nuevo Producto Resultante</h4>  
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
										label="N°Lote de PT"
										label-for="lot_pt"
										class="mt-3"
									>
										<b-form-input
											id="lot_pt" 
											v-model="newLotPt" 
											class="form-control" 
											type="number"
											min="0"
											trim
										>
										</b-form-input>
									</b-form-group>
									
									<b-form-group
										label="N°Orden de Fabricación de Registro de MP"
										label-for="production_order"
										class="mt-3"
									>
										<b-form-select
											id="production_order"
											class="form-control" 
											v-model="MPRegisterID" 
											:options="optionsMP"
										>
										</b-form-select>
									</b-form-group>
									
									<b-form-group
										label="Código Material"
										label-for="material_code"
										class="mt-3"
									>
										<b-form-input
											id="material_code" 
											v-model="newMaterialCode" 
											class="form-control" 
											type="text"
											disabled
										>
										</b-form-input>
									</b-form-group>
									
									<b-form-group
										label="Descripción"
										label-for="material_description"
										class="mt-3"
									>
										<b-form-input
											id="material_description" 
											v-model="newMaterialDescription" 
											class="form-control" 
											type="text"
											disabled
										>
										</b-form-input>
									</b-form-group>
									
									<b-form-group
										label="Unidad de Medida"
										label-for="material_unit"
										class="mt-3"
									>
										<b-form-input
											id="material_unit" 
											v-model="newMaterialUnit" 
											class="form-control" 
											type="text"
											disabled
										>
										</b-form-input>
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
			MPRegisterID: null,
			newLotPt: null,
			newProductionOrder: null,
			newMaterialCode: null,
			newMaterialDescription: null,
			newMaterialUnit: null,
			newUnitQuantity: null,
			
			optionsWS: [
				{ value: null, text: '-- Seleccione --', disabled: true},
				{ value: 1, text: "1"},
				{ value: 2, text: "2"}
			],			
			optionsOperators: [],
			optionsMaterials: [],
			optionsMP: [],
			items: [],
			tableColumns: [
				{key: 'index', label: 'item'},
				{key: 'date', label: 'Fecha'},
				{key: 'work_shift_id', label: 'Turno'},
				{key: 'register_date', label: 'Fecha Registro'},
				{key: 'register_time', label: 'Hora'},
				{key: 'production_order', label: 'N°Orden de fabricación'},
				{key: 'lot_pt', label: 'N°Lote de PT'},
				{key: 'material_code', label: 'Código de material'},
				{key: 'material_description', label: 'Descripción'},
				{key: 'material_unit', label: 'Und Med'},
				{key: 'unit_quantity', label: 'KG'},
			],
		}
	},
	watch: {
		MPRegisterID(){
			if(this.MPRegisterID){
				this.searchMPRegister();
			}
		}
	},
	beforeMount(){
		this.getDataTable();    
		this.getMPRegisterTable();
	},
	methods: {
		getDataTable(){
			this.items = [];
			
			axios
				.get(`${process.env.VUE_APP_HOST}/api/dashboard/registration/resulting-product/all`)
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
								production_order: item.production_order,
								lot_pt: item.lot_pt,
								material_code: item.mp_register.material.code,
								material_description: item.mp_register.material.description,
								material_unit: item.mp_register.material.unit,
								unit_quantity: item.unit_quantity,
							})
						})
					}
				});
		},
		getMPRegisterTable(){			
			axios
				.get(`${process.env.VUE_APP_HOST}/api/dashboard/registration/all`)
				.then(response => {
						
					if(response.data){
						let data = response.data;
						
						this.optionsMP.push(
							{ value: null, text: '-- Seleccione --', disabled: true},
						)
						
						data.map( item => {
							this.optionsMP.push({
								value: item.id,
								text: item.production_order,
							});
						});
					}
				});
		},
		searchMPRegister(){
			axios
			.get(`${process.env.VUE_APP_HOST}/api/dashboard/registration/all?mp_registerId=${this.MPRegisterID}`)
				.then(response => {
						
					if(response.data){
						let data = response.data;
						
						this.newProductionOrder = data[0].production_order;
						this.newMaterialCode = data[0].material.code;
						this.newMaterialDescription = data[0].material.description;
						this.newMaterialUnit = data[0].material.unit;
					}
				});
		},
		onSubmit(){
			
			if(!this.newDate || !this.newWorkShift || !this.newRegisterDatetime || !this.MPRegisterID || !this.newLotPt || !this.newUnitQuantity){
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
					production_order: this.newProductionOrder,
					mp_register_id: this.MPRegisterID,
					lot_pt: this.newLotPt,
					unit_quantity: this.newUnitQuantity
				}
				
				axios
				.post(`${process.env.VUE_APP_HOST}/api/dashboard/registration/resulting-product/create`, data)
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
			this.MPRegisterID = null;
			this.newLotPt = null;
			this.newMaterialCode = null;
			this.newMaterialDescription = null;
			this.newMaterialUnit = null;
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
						'N° ORDEN DE FABRICACIÓN': this.items[a]["production_order"],
						'N° LOTE DE PT': this.items[a]["lot_pt"],
						'CÓDIGO DE MATERIAL': this.items[a]["material_code"],
						'DESCRIPCIÓN': this.items[a]["material_description"],
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


