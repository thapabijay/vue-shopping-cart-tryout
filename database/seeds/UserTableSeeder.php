<?php

use Illuminate\Database\Seeder;

class UserTableSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        $users = [
            ['username'=>'admin', 'name'=>'Admin', 'email'=>'admin@admin.co.jp', 'password'=>bcrypt('asdfa@sdgf43')]
        ];        

        foreach ($users as $key => $value) {
            \App\User::updateOrCreate(['username'=>$value['username']],
            [
                'name'=>$value['name'],
                'email'=>$value['email'],
                'password'=>$value['password']
            ]);
        }
    }
}
