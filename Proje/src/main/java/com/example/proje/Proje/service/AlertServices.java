package com.example.proje.Proje.service;

import com.example.proje.Proje.Repository.AlertRepository;
import com.example.proje.Proje.model.Alert;
import com.example.proje.Proje.model.Response;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpMethod;
import org.springframework.scheduling.annotation.Async;
import org.springframework.scheduling.annotation.Scheduled;
import org.springframework.stereotype.Service;



import java.io.IOException;
import java.net.HttpURLConnection;
import java.net.SocketException;
import java.net.URL;
import java.time.LocalDateTime;
import java.time.LocalTime;
import java.util.*;

@Service
public class AlertServices implements IAlertService {


     private AlertRepository alertRepository;
     private int count;

     @Autowired
     public AlertServices(AlertRepository alertRepository) {
         this.alertRepository=alertRepository;
     }

    public Optional<Alert> findByID(Long id){
       return alertRepository.findById(id);
   }
    public List<Alert> getAll(){
        return alertRepository.findAll();
    }
    public Alert create(Alert alert){

        alertRepository.save(alert);
       return alert;
    }
    public Alert update (Alert alert,Long id){
        Optional<Alert> changableAlert=alertRepository.findById(id);
        Alert attachedAlert = changableAlert.get();
        attachedAlert.setName(alert.getName());
        attachedAlert.setUrl(alert.getUrl());
        attachedAlert.setTime(alert.getTime());
        attachedAlert.setMethod(alert.getMethod());
        alertRepository.save(attachedAlert);
        return alert;
    }

    public void delete(Long id){
        alertRepository.deleteById(id);
    }

    @Scheduled(fixedRate = 1000)
    @Async
    public void TryScheduler() throws IOException {
        List<Alert> alertList = getAll();
        count++;
        for(Alert alert:alertList){
           if(count%alert.getTime()==0){
               int result=RequestResponse(alert);
               Response response=new Response();
               response.setRequestName(alert.getMethod().toString());
               response.setResponseTime(LocalTime.now());
               response.setResponse(Long.valueOf(result));
               if(alert.getListOfResponse().size()!=0) {
                   alert.getListOfResponse().add(alert.getListOfResponse().size() - 1, response);
               }
               else {
                   alert.getListOfResponse().add(response);
               }

           }
          alertRepository.save(alert);

       }
    }

    private int RequestResponse(Alert alert) throws IOException {
       String url=alert.getUrl();

       if(alert.getResponses()==null){
           alert.setResponses(new ArrayList<>());
       }

       try {
           URL obj= new URL(url);
           HttpURLConnection con=(HttpURLConnection)obj.openConnection();
           HttpMethod method=alert.getMethod();
           con.setRequestMethod(String.valueOf(method));
           int responseCode=con.getResponseCode();
           if(responseCode==200){

               alert.getResponses().add(1);
               return 1;
           }
           else{

               alert.getResponses().add(0);
               return 0;
           }
       }catch (SocketException exception){

           alert.getResponses().add(0);
           return 0;
       }


    }

}
