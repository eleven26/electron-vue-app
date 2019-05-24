<?php

/**
 * 异步执行系统命令, 如果没有安装 swoole, 则同步执行
 *
 * @param string $command
 * @param \Closure $callback
 */
function async_exec($command, \Closure $callback = null)
{
    if (class_exists('swoole_async')) {
        if ($callback) {
            swoole_async::exec($command, $callback);
        } else {
            swoole_async::exec($command, function ($res) {
                echo $res;
            });
        }
    } else if (class_exists('Co')) {
        go(function () use ($command, $callback) {
            $ret = Co::exec($command);

            if ($callback) {
                $callback($ret['output']);
            } else {
                echo $ret['output'];
            }
        });
    } else {
        if ($callback) {
            $callback(system($command, $status));
        } else {
            echo system($command, $status);
        }
    }
}


$http = new Swoole\Http\Server("0.0.0.0", 9304);
$http->on('request', function ($request, $response) {
    //$response->header('Access-Control-Allow-Origin', '*');
    $response->header('Access-Control-Allow-Origin', $request->header['origin'] ?? '');
    $response->header('Access-Control-Allow-Methods', 'OPTIONS');
    $response->header('Access-Control-Allow-Headers', 'x-requested-with,session_id,Content-Type,token,Origin');
    $response->header('Access-Control-Max-Age', '86400');
    $response->header('Access-Control-Allow-Credentials', 'true');

    if ($request->server['request_method'] == 'OPTIONS') {
        $response->status(200);
        $response->end();
        return;
    };

    $post = json_decode($request->rawContent(), true);
    async_exec($post['command'], function ($res) use ($response) {
        $response->end($res);
    });
});
$http->start();
