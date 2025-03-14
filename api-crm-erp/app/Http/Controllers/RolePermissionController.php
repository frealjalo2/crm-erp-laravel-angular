<?php

namespace App\Http\Controllers;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use Spatie\Permission\Models\Role;

class RolePermissionController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index(Request $request)
    {
        $search = $request->get("search");
        $roles = Role::with(["permissions"])->where("name", "like", "%".$search."%")->orderBy("id", "desc")->paginate(25);
        $resp = response()->json([
            "total" => $roles->total(),
            "roles" => $roles->map(function($role){
                $role->permission_pluck = $role->permissions->pluck("name");
                $role->created_at = $role->created_at->format("Y-m-d h:i A");
                return $role;
            }),
        ]);

        return $resp;
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        $is_role = Role::where("name", $request->name)->first();
        if($is_role){
            return response()->json([
                "message" => 403,
                "message_text" => "El rol ya existe"
            ]);
        }
        $role = Role::create([
            'guard_name' => 'api','name' => $request->name
        ]);
        foreach ($request->permissions as $key => $permission) {
            $role->givePermissionTo($permission);
        }

        return response()->json([
            "message" => 200,
            "role" => [
                "id" => $role->id,
                "permissions" => $role->permissions,
                "permission_pluck" => $role->permissions->pluck("name"),
                "created_at" => $role->created_at->format("Y-m-d h:i A"),
                "name" => $role->name,

            ]
        ]);
    }

    /**
     * Display the specified resource.
     */
    public function show(string $id)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, string $id)
    {
        $is_role = Role::where("name", $request->name)->where("id", "<>", $id)->first();
        if($is_role){
            return response()->json([
                "message" => 403,
                "message_text" => "El rol ya existe"
            ]);
        }
        $role = Role::findOrFail($id);
        $role->update($request->all());

        $role->syncPermissions($request->permissions);

        return response()->json([
            "message" => 200,
            "role" => [
                "id" => $role->id,
                "permissions" => $role->permissions,
                "permission_pluck" => $role->permissions->pluck("name"),
                "created_at" => $role->created_at->format("Y-m-d h:i A"),
                "name" => $role->name,

            ]
        ]);
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(string $id)
    {
        $role = Role::findOrFail($id);
        $role->delete();
        return response()->json([
            "message" => 200
        ]);
    }
}
