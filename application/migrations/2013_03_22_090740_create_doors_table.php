<?php

class Create_Doors_Table {

	/**
	 * Make changes to the database.
	 *
	 * @return void
	 */
	public function up()
	{
		Schema::create('doors_table', function($table){
			$table->increments('id');
			$table->integer('wardrobe_id');
			$table->integer('type');
			$table->timestamps();
		});
	}

	/**
	 * Revert the changes to the database.
	 *
	 * @return void
	 */
	public function down()
	{
		Schema::drop('doors_table');
	}

}