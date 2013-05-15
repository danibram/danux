<?php

class Wardrobe extends Eloquent 
{
	public static $table = 'l_wardrobe_table';

    public static $rules = array(
        'name' => 'required|min:3',
        'width' => 'required|numeric|min:500|max:5000',
        'height' => 'required|numeric|min:500|max:3000',
        'prof' => 'required|numeric|min:300|max:680',
        'typedoor' => 'required|in:0,1,2'
    );

    
    public static function validate($data){
        return Validator::make($data, static::$rules);
    }

	public function modules()
    {
        return $this->has_many('module');
    }

    public function doors()
    {
        return $this->has_many('door');
    }

    public function accexts()
    {
        return $this->has_many_and_belongs_to('accext', 'l_accext_wardrobe_relation_table');
    }

    public function save_module_and_accesories($module) {
        // We first get the conf
        $conf = $module->configuration;
        // Now we have to check if there are relationships
        $relationships = $conf->type->relationships;
        if(sizeof($relationships) > 0){
            // if there are relations
            // We have to save that modules
            foreach ($relationships as $child) {
                //Module::
            }

        }

        $module->configuration = json_encode($module->configuration);
        $module_model = null;
        // Save the accesories for the module
        if($module != null){
            if(isset($module->accint)){
                // si existe el array 
                $accs_int = $module->accint;
                //extraigo el array
                unset($module->accint);
                //actualizo modelo          
                Module::update($module->id, (array) $module);
                //Guardado de materiales
                $module_model = Module::find($module->id); 
                // Borro lo que hay por seguridad
                // sino 'sync' hace cosas raras cuando guardas un ID que ya esta en la BD
                // Asi funciona bien
                $module_model->accints()->delete();
                $module_model->accints()->sync($accs_int);
            }else{
                Module::update($module->id, $module);
                //si no estan definidos los accesorios los borro de la base de datos
                // esto soluciona el problema de que quites todos los accesorios y guardes
                // asi todo OK
                $module_model = Module::find($module->id); 
                $module_model->accints()->delete();
            }
        }

        return $module_model;
    }
    // STATIC METHOD FOR BUILDING THE WARDROBE
    public static function rebuild_for_client($id) {
        $wardrobe = Wardrobe::find($id);
        $modules = $wardrobe->modules()->get();
        $doors = $wardrobe->doors()->get();
        $accext = $wardrobe->accexts()->get();
        // Arrays
        // modules
        $modules_array = array_map(function($object){
            // Rebuild the childs
            $object->rebuild_submodules();
            // Rebuild the parent
            $rebuilt = $object->rebuild_module();
            //return $rebuilt->new_conf('parent');
            return $rebuilt;
        }, $modules);
        $doors_array = array_map(function($object){
            // Obtenemos los materiales de cada puerta
            $materials = $object->materials()->get();
            // Obtenemos los identificadores de las puertas
            $materialdoor = DB::table('l_door_material_relation_table')->where_door_id($object->id)->get();
            //componemos el array de salida
            $materials_ids = array_map(function($material){
                return intval($material->doormaterial_id);
            }, $materialdoor);

            $result = $object->to_array();
            $result["material"] = $materials_ids;
            
            return $result;
        }, $doors);

        $json = array(
            'data' => $wardrobe->to_array(),
            'modules' => $modules_array,
            'doors' => $doors_array,
            'accext' => $accext,
        );
        return $json;
    }
    public static function rebuild_from_client($json_wardrobe){
        // Necesitamos descomponer el armario
        $id = $json_wardrobe->data->id;
        $wardrobe = Wardrobe::find($id);
        // UPDATE DATA
        Wardrobe::update($id, (array) $json_wardrobe->data);
        // UPDATE MODULES
        foreach ( (array) $json_wardrobe->modules as $module) {
            // Save the parent module
            $parent_module = $wardrobe->save_module_and_accesories($module);
            // The module is returned, now we save special configuration
            // We get the special configuration
            /*if(isset($module->configuration->type)){
                // Special configuration
                    $child_modules = $module->configuration->type->relationships;
                    if(sizeof($child_modules > 0)) {
                        $parent_module->save_childs($child_modules, $wardrobe);
                    }
                }
                
            } else {
                // Has no special configuration, so create one
                $parent_module->set_childs(null);
            }*/
        }
        // UPDATE DOORS
        /*array_map(function($door){
            if(isset($door->material)){ 
                //si existen los materiales
                $materials = $door["material"];
                //extraemos el array
                unset($door["material"]); 
                //Actualizamos el modelo
                Door::update($door["id"], $door);
                //guardamos los materiales
                $door_model = Door::find($door["id"]);
                //por seguridad borro lo que hay sino hay problemas
                $door_model->materials()->delete();
                $door_model->materials()->sync($materials);
            }else{
                Door::update($door["id"], $door);
                //si no estan definidos los materiales los borro de la base de datos
                // esto soluciona el problema de que quites todos los materiales y guardes
                // asi todo OK
                $door_model = Door::find($door["id"]);
                $door_model->materials()->delete();
            }

        }, $json_wardrobe["doors"]);

        // UPDATE ACCEXT
        if(isset($json_wardrobe["accext"])){ 
            //si existen los materiales
            $accs_ext = $json_wardrobe["accext"];
            $wardrobe_model = Wardrobe::find($id);
            $wardrobe_model->accexts()->delete();
            $wardrobe_model->accexts()->sync($accs_ext);
        }else{
            $wardrobe_model = Wardrobe::find($id);
            $wardrobe_model->accexts()->delete();
        }*/
    
    }

}