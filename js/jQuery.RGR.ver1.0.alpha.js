(function($){
	$.fn.RangeGroup = function(options,tmp){ t = this; $this = $(t); 
		// declaracion de Variables.

		var defaults = {
			Codigo 		: ['IMEI','0000000'],		// formato del codigo del rango 
			MinRange 	: 0, 						// valor minimo de insercion 
			MaxRange 	: 1,						// valor maximo de insercion
			Textos 		: 	{
								freeitems 	: 'Items Libres',				// Items libres entre Grupos
								newRango 	: 'Nuevo Rango :',				// Crear Nuevo Rango
								unirup 		: 'unir hacia arraba',			// unir nuevo hacia arriba
								unirdown	: 'unir hacia abajo',			// unir nuevo hacia abajo
								itemsxgrupo	: 'Hay %s Items en el Grupo',	// contador de Items por grupo
								numitemsres	: 'N° de Items por Generar : ',	// descripcion final 
								buttons 	: 	{
													unir : 'unir Grupos',	// boton unir grupos (boton rojo)
													crea : 'crear rango',	// boton crear rango (boton verde)
													newR : 'Crear',			// boton crear en Nuevo Rango
													crnw : 'crear',			// boton crear en crear rango (boton verde popup)
													crcl : 'cancelar' 		// boton cancelar en crear rango (boton verde popup)
												}
							},
			Theme 		: 'default',				// Theme use: Name (name_style)
			addAtribs	: [], 						// ['attrib="value"','attrib2="value2"']
			appendRows	: function(e){},			// agregar campos al grupo --
			preCallback	: function(e,ui){},			// se ejecuta antes de iniciar el plugin.
			posCallback	: function(e,ui){},			// se ejecuta despues de iniciar el plugin
			endCallback : function(e,ui){},			// se ejecuta al terminar el Plugin
			RGRCallback	: function(e,ui){},			// se ejecuta al eliminar un grupo (RGR : remove group range)
			UGBCallback	: function(e,ui){},			// se ejecuta antes de unir dos grupos (before)
			UGACallback	: function(e,ui){},			// se ejecuta despues de unir dos grupos (after)
			fIeCallback : function(e,ui){},			// se ejecuta al existir items libres entre 2 grupos
			CRBCallback : function(e,ui){},			// se ejecuta antes de crear un rango en los items libres, cuando haces click en el boton crear rango
			CRACallback : function(e,ui){},			// se ejecuta despues de crear un rango en los items libres, cuando haces click en el boton crear rango
			NRBCallback : function(e,ui){},			// se ejecuta al hacer click en el boton Crear, (before)
			NRACallback : function(e,ui){},			// se ejecuta al hacer click en el boton Crear, (after)
			DRBCallback : function(e,ui){},			// se ejecuta antes de dividir un rango o grupo.
			DRACallback : function(e,ui){},			// se ejecuta despues de dividir un rango o grupo.
			FRBCallback : function(e,ui){},			// se ejecuta antes de Generar el Ultimo Rango.
			FRACallback : function(e,ui){},			// se ejecuta despues de Generar el Ultimo Rango.

			// Load Initial Change
			items 		: {
				rangos 	: {
					// Ejemplos de autoload inicial al cargar el plugin con datos.
					// rango : [1,10,1],				// Grupo
					// rango : [11,13,0],				// free Items
					// rango : [14,20,1]				// Grupo 3
				}
			}

		};

		o = $.extend({},defaults, options);

		// los Items de Trabajaran independientes al resto de datos.
		var _items 		= {rangos : {}};
		Rgroups = $.extend({},_items,o.items); // ahora se guardaran los items en Rgroups

		_addItemRange = function(item){
			// agregar item al grupo.
			// calcular la disponibilidad..
			// validar si existen items libres.. antes y despues
			// crear espacio de items libres o unir al grupo anterior.
			// crer grupo nuevo.
			// actualizar grupo de rango final..
			// fin
		}



		// Atributos y parametros reservados
		reserved = {
			codigo 	: ['[data-codigo]','data-codigo'],	// etiqueta donde se guardara el codigo
			ranmin 	: ['[data-min]','data-min'],		// etiqueta donde se guarda el valor minimo
			ranmax 	: ['[data-max]','data-max'],		// etiqueta donde se guarda el valor maximo
			dvalue	: ['[data-value]','data-value']		// etiqueta donde se guarda un valor
		};

		ui = $.extend({},reserved);

		// ..

		HTMLTemplate = {
			// Framework default HTML
			headerHTM	: function(w,ui){				// html por defecto que contiene la cabecera del plugin
				return '<div class="form-group"><label class="control-label col-xs-2">Codigo: </label><div class="col-lg-2"><input type="text" class="form-control" data-codigo id="codigo" name="codigo" placeholder="Ingrese Codigo" value="'+w.Codigo.join('')+'"></div><label class="control-label col-xs-2">Rango de Numeracion :</label><div class="col-lg-2"><input type="text" class="form-control" id="" data-min id="rango_inicio" name="rango_inicio" placeholder="inicio" value="'+w.MinRange+'"></div><label class="control-label col-separator"> - </label><div class="col-lg-2"><input type="text" class="form-control" data-max id="rango_fin" name="rango_fin" placeholder="fin" value="'+w.MaxRange+'"></div></div>';
			},
			newGroupHTM	: function(w,ui){
				return '<label class="control-label col-xs-2">'+w.Textos.newRango+'</label><div class="col-lg-2"><input type="text" class="form-control" id="" name="" placeholder=""></div><div class="col-lg-2"><input type="text" class="form-control" id="" name="" placeholder=""></div><button onclick="$.newRange($(this).prev().prev().children().get(0).value,$(this).prev().children().get(0).value)">'+w.Textos.buttons.newR+'</button>';
			},
			rFinalHTML	: function(w){
				// Rango Codigo Asigne
				var cnt = (w.Codigo[1].length * -1);
				var minimo = w.Codigo[0]+(w.Codigo[1] + w.MinRange).slice(cnt);
				var maximo = w.Codigo[0]+(w.Codigo[1] + w.MaxRange).slice(cnt);

				var rangeFinal = minimo + ' - ' + maximo;
				return '<label class="control-label col-xs-2">Rango Final Resultante:</label><div class="col-lg-2"><input type="text" class="form-control" id="" name="" placeholder=""></div><label class="control-label col-xs-1"> - '+w.MaxRange+'</label><label class="control-label col-xs-4">'+rangeFinal+'</label><span style="cursor:pointer;"><img src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABgAAAAYCAYAAADgdz34AAAABHNCSVQICAgIfAhkiAAAAAlwSFlzAAABqQAAAakBDAYwoQAAABl0RVh0U29mdHdhcmUAd3d3Lmlua3NjYXBlLm9yZ5vuPBoAAAF/SURBVEiJvZaxSgNBEIa/CadomyqFYCUGiyg2PoOBvIOlz6GVPkCavEDAUsRCUBshRRDSRLSWgI2IRS5CZCyygctldrM5iAtT3A37/XOzu/+eqCoxQ0QSYM899lV1HDUvJCAiDeAYOAT2gQ2XGgE94Bm4VdVrL0RV5wIoA21AI6MNlE2WAa8DgyXg0xgA9aCAg8cCu573dVPAtWWZyreAK8+XlC2B2J73gXOgBCQekfaMANBYAH0HToFtY818Io2sQDMAfwIq1g5ZINLMCnQ88BawHoIHRDrTM5YAqQG/jwEbIo9ufuqeqRnwH2C3gEAFeMtwaiXscamqr56cOUSkAjwAO/lcvkVDYLNA5S+5LqRAkqjqWER6wJET7Kpq6qoSoMrE7EbABxMn/TQqr+YK76nq2NqmF0wO0Rnwxfz6/AJ3wJqncnObZg/aCXDjmZSNgwB89qDlrGIYAVfgO5CbtYqCZucL2+wK2LUvbLv+lwtnFVfmyi/9oEBOrNBvyx/w474zn0udBQAAAABJRU5ErkJggg11c20806d1ed12b59139b2407febe8f7" /></span>';
			},
			addGrupoHTML: function(w,ui){
				return '<div class="grupo" data-group="1"><div class="row"><label class="control-label col-xs-2">Grupo 01 rangos :</label><div class="col-lg-2"><input type="text" class="form-control" id="" name="" placeholder="Documento"></div><label class="control-label col-separator"> - </label><div class="col-lg-2"><input type="text" class="form-control" id="" name="" placeholder="Documento"></div><span style="float:right;">x</span></div><div class="row"><div class="form-group"><div class="col-lg-12"><hr /></div></div></div><div class="row"><div class="col-lg-2"><input type="text" class="form-control" id="" name="" placeholder="Documento"></div><div class="col-lg-2"><input type="text" class="form-control" id="" name="" placeholder="Documento"></div><div class="col-lg-2"><input type="text" class="form-control" id="" name="" placeholder="Documento"></div><span>?</span></div><div class="row"><div class="col-lg-2"><input type="text" class="form-control" id="" name="" placeholder="Documento"></div><div class="col-lg-2"><input type="text" class="form-control" id="" name="" placeholder="Documento"></div><div class="col-lg-2"><input type="text" class="form-control" id="" name="" placeholder="Documento"></div><span>?</span></div></div>';
			},
			freeItemsHTML: function(w){
				return '<div class="freeitems" data-join=""><span><strong class="num">10</strong> items libres</span><button>unir grupos</button><button>crear rango</button></div>';
			}
		};

		template = $.extend({},HTMLTemplate,tmp);

		// validar si el elemento mensionado existe en el DOM
		_elmDOMExist 		= 		function(c){
			console.error('El elemento no existe en el DOM');
			return $(c).length > 0 ? true : false;
		} 

		// asignar x tipo de objeto.
		_AsignarDOM 		= 		function(c,v){ if(!_elmDOMExist(c)){return false;};
			switch(c[0].tagName.toLowerCase()){
				case ['div','span','p','section','label','strong','h1','h2','h3','h4','h5','h6','a','i']:
					c.text 	= v; break;
				case ['input','button'] : 
					c.value = v; break;
				default : $(c).attr(ui.dvalue,v); break;
			}
			return true;
		}

		// Crear Nuevo Rango
		_newRange 			= 		function(min,max){
			console.log(min);
			console.log(max);
			CGroup = $('.grupos');
			CGroup.append(template.addGrupoHTML());
		}

		// asignar a fila
		_setrow = function(data){ return '<div class="row">'+data+'</div>'; }
		html = {
			separator : '<div class="row"><div class="form-group"><hr /></div></div>'
		}

		// auto load items pre Insertados
		_preLoadItems 		=		function(w){
			// contar items a insertar , si > 0
			// insertar items o cancelar accion.
			console.log('validad si existen items');
			console.log(w);
		}

		// Private function

		// iniciar Plugin
		_init 				= function(){

			// sync : template
			template 		= $.extend({},HTMLTemplate,tmp);
			

			// Insertamos la Cabecera del Plugin.
			var cabecera 	= template.headerHTM(o);
			
			// header
			var header_rgr = '<div class="header_rgr">'+cabecera+'</div>';

			// Creamos el Elemento Principal, Contenedor de todo.
			content = document.createElement('div');
			content.className = 'content'; 
			content.style.padding = '20px'; content.style.margin = '20px'; // temporal

			// Creamos el contenedor de Grupos
			CGroup = document.createElement('div'); CGroup.className = 'grupos';


			content.innerHTML = _setrow(header_rgr) + html.separator;
			content.appendChild(CGroup);

			// Validar la insercion de items al cargar. (preLoadItems)
			_preLoadItems(Rgroups);


			// New Group 
			newGroup = document.createElement('div'); newGroup.className = 'newgrupo';
			newGroup.innerHTML = _setrow(template.newGroupHTM(o));

			content.appendChild(newGroup);
			
			// Final Group Option
			EndGroup = document.createElement('div'); EndGroup.className = '';
			EndGroup.innerHTML = _setrow(template.rFinalHTML(o));

			content.appendChild(EndGroup);

			// Insertamos el Content
			$($this).html(content);

		}

		this.codigo 			= 			function(){ if(!_elmDOMExist(ui.codigo[0])){return false;};
			$(ui.codigo[0]).val(o.Codigo); 
		}
		this.codigo.get 		= 			function(){ return o.Codigo; }
		this.codigo.set 		= 			function(c){ // asignar el codigo a un elemento del DOM
			console.log(typeof $(c)); 
		}
		$.fn.codigo 			=			function(){ if(!_elmDOMExist(this)){return false;};
 			console.log(this[0].tagName.toLowerCase());
		}

		this.codigo.min 		= function(){}
		this.codigo.min.get 	= function(){var cnt = o.Codigo.length; return (o.Codigo + o.MinRange).slice(cnt);}
		this.codigo.min.set 	= function(){}

		this.codigo.max 		= function(){}
		this.codigo.max.get 	= function(){var cnt = o.Codigo.length; return (o.Codigo + o.MaxRange).slice(cnt);}
		this.codigo.max.set 	= function(){}

		$.newRange 				= function(desde,hasta){
			_newRange(desde,hasta);
		}

		NewRange 			= function(){			// Crear Nuevo Rango

		}

		// Public functions
		this.init = function(){
			_init();
		}

		this.init(); // iniciando todo
	}





})(jQuery);