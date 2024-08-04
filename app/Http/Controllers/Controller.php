<?php

namespace App\Http\Controllers;

use Exception;
use Illuminate\Foundation\Auth\Access\AuthorizesRequests;
use Illuminate\Foundation\Validation\ValidatesRequests;
use Illuminate\Support\Facades\Log;
use Illuminate\Routing\Controller as BaseController;

abstract class Controller extends BaseController
{
    use AuthorizesRequests, ValidatesRequests;

    public function sendResponse($message = "Action Successfull", $data = null, $withMeta = false, $responseCode = 200)
    {
        if ($withMeta) {
            return response()->json(["error" => false, "message" => $message, "data" => $data, 'meta' => [
                'page' => $data->currentPage(),
                'perPage' => $data->perPage(),
                'firstItem' => $data->firstItem(),
                'lastItem' => $data->lastItem(),
                'total' => $data->count(),
                'totalData' => $data->total(),
                'totalPage' => $data->lastPage()
            ]], $responseCode);
        } else {
            return response()->json(["error" => false, "message" => $message, "data" => $data], $responseCode);
        }
    }

    public function sendError($message = "Action Failed", $data = null, $responseCode = 400)
    {
        return response()->json(["error" => true, "message" => $message, "data" => $data], $responseCode);
    }

    public function handleException(Exception $e, $sendResponse = true)
    {
        $data['exception_message'] = $e->getMessage();
        $data['exception_code'] = $e->getCode();
        $data['exception_line'] = $e->getLine();
        $data['exception_file'] = $e->getFile();
        Log::error("Exception Message: " . $data['exception_message'] . " __LINE__" . $data['exception_line'] . " __FILE__ " . $data['exception_file']);
        if ($sendResponse) {
            return $this->sendError("Something went wrong.", $data, 400);
        } else {
            return false;
        }
    }

    public function limit()
    {
        $limit = request()->limit ?: 10;
        return $limit;
    }
}
