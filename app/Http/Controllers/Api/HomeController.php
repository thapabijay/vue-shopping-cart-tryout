<?php

namespace App\Http\Controllers\Api;

use Illuminate\Http\Request;
use App\Http\Controllers\Controller;

class HomeController extends Controller
{
    public function getPhotos(){
        $file_data = [];
        $path = '/';        
        $files = \Storage::disk('images')->allFiles();
        foreach ($files as $file) {
            $file_path = $file;  

            $file_data[] = '/images/'.$file_path;
        }        
        return response()->json($file_data);
    }
}
