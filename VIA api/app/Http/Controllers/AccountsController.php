<?php

namespace App\Http\Controllers;

use App\Models\Accounts;
use Illuminate\Http\Request;

class AccountsController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        return Accounts::all();
    }

    /**
     * Store a newly created resource in storage.
     */
    public function signup(Request $request)
    {
        $request->validate([
            'name' => 'required|string|max:255',
            'email' => 'required|email|unique:accounts,email',
            'password' => 'required|min:6'
        ]);

        $account = Accounts::create([
            'name' => $request->name,
            'email' => $request->email,
            'password' => $request->password
        ]);

        return response()->json([
            'success' => true,
            'msg' => 'Account created successfully',
            'user' => $account
        ], 201);
    }

    /**
     * Display the specified resource.
     */
    public function login(Request $request)
    {
        $request->validate([
            'email' => 'required|email',
            'password' => 'required'
        ]);

        $account = Accounts::where('email', $request->email)->first();

        if (!$account) {
            return response()->json([
                'success' => false,
                'msg' => 'Invalid email'
            ], 401);
        }
        if ($request->password !== $account->password) {
            return response()->json([
                'success' => false,
                'msg' => 'Invalid password'
            ], 401);
        }
        if ($request->password !== $account->password && !$account) {
            return response()->json([
                'success' => false,
                'msg' => 'Invalid credentials'
            ], 401);
        }

        $token = $account->createToken('via_token')->plainTextToken;

        return response()->json([
            'success' => true,
            'msg' => 'Login successful',
            'user' => $account,
            'token' => $token
        ]);
    }

    public function profile(Request $request)
    {
        if (!$request->user()) {
        return response()->json([
            'success' => false,
            'msg' => 'Unauthorized'
        ], 401);
    }
        return response()->json([
            'success' => true,
            'user' => $request->user()
        ]);
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, $id)
    {
        $account = Accounts::findOrFail($id);

        $request->validate([
            'name' => 'sometimes|string|max:255',
            'email' => 'sometimes|email|unique:accounts,email,' . $account->id,
            'password' => 'sometimes|min:6',
            'phone' => 'sometimes|numeric|max:20',
        ]);

        $data = $request->only(['name', 'email', 'phone']);

        if ($request->password) {
            $data['password'] = $request->password;
        }

        $account->update($data);

        return response()->json([
            'success' => true,
            'msg' => 'Account updated successfully',
            'user' => $account,
        ]);
    }

public function updateProfile(Request $request)
{
    $user = $request->user();

    if (!$user) {
        return response()->json([
            'success' => false,
            'msg' => 'Unauthorized'
        ], 401);
    }

    $request->validate([
        'name' => 'required|string|max:255',
        'email' => 'required|email|unique:accounts,email,' . $user->id,
        'password' => 'nullable|min:6'
    ]);

    $user->name = $request->name;
    $user->email = $request->email;

    if ($request->password) {
        $user->password = $request->password;
    }

    $user->save();

    return response()->json([
        'success' => true,
        'msg' => 'Profile updated',
        'user' => $user
    ]);
}

    /**
     * Remove the specified resource from storage.
     */
    public function logout(Request $request)
    {
        $request->user()->currentAccessToken()->delete();

        return response()->json([
            'success' => true,
            'msg' => 'Logged out'
        ]);
    }
}
