package com.example.proje.Proje.service;

import com.example.proje.Proje.model.Alert;

import java.util.List;
import java.util.Optional;

public interface IAlertService {
    public Optional<Alert> findByID(Long id);
    public List<Alert> getAll();
    public Alert create(Alert alert);
    public Alert update (Alert alert,Long id);
    public void delete(Long id);


}
