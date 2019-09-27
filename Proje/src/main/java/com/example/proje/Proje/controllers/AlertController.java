package com.example.proje.Proje.controllers;

import com.example.proje.Proje.model.Alert;

import org.springframework.beans.factory.annotation.Autowired;
import com.example.proje.Proje.service.IAlertService;
import org.springframework.web.bind.annotation.*;

import javax.validation.Valid;
import java.util.List;
import java.util.Optional;


@RestController
@CrossOrigin("*")
public class AlertController {

    private IAlertService iAlertService;

    @Autowired
    public AlertController(IAlertService iAlertService) {
        this.iAlertService = iAlertService;
    }




    @RequestMapping("/list")
    public List<Alert> listAlerts()
    {

        return iAlertService.getAll();
    }



    /*@PostMapping("/loginn")
    public String authenticate(@RequestBody String username,@RequestBody String password) {
        System.out.println("SSSSSSS");
        return "You are authenticated";
    }*/

    @RequestMapping("/alert/show/{id}")
    public Optional<Alert> getAlert(@PathVariable String id){

        return iAlertService.findByID(Long.valueOf(id));
    }

    @PutMapping("/alert/edit/{id}")
    public Alert edit(@Valid @RequestBody Alert alert, @PathVariable String id){
        iAlertService.update(alert,Long.valueOf(id));
        return iAlertService.findByID(Long.valueOf(id)).get();
    }

    @PostMapping("/alert/new")
    public Alert newAlert(@RequestBody final Alert alert)  {

        return iAlertService.create(alert);
    }



    @RequestMapping ("/delete/{id}")
    public String delete(@PathVariable String id){
        iAlertService.delete(Long.valueOf(id));
        return "/list";
    }



}
