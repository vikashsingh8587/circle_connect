package com.example.circle_connectBackend.repository;

import com.example.circle_connectBackend.models.Item;
import org.springframework.data.jpa.repository.JpaRepository;
import java.util.List;

public interface ItemRepository extends JpaRepository<Item, Long> {
    List<Item> findByOwnerId(String ownerId);
    List<Item> findByStatus(String status); // optional convenience
}
