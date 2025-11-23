package com.example.circle_connectBackend.controller;

import com.example.circle_connectBackend.dto.ItemRequest;
import com.example.circle_connectBackend.dto.ItemResponse;
import com.example.circle_connectBackend.service.ItemService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/items")
@RequiredArgsConstructor
@Validated
public class ItemController {

    private final ItemService itemService;

    @PostMapping
    public ResponseEntity<ItemResponse> create(@RequestBody @Validated ItemRequest request) {
        ItemResponse created = itemService.create(request);
        return ResponseEntity.status(201).body(created);
    }

    @GetMapping("/{id}")
    public ResponseEntity<ItemResponse> getById(@PathVariable Long id) {
        return ResponseEntity.ok(itemService.getById(id));
    }

    @GetMapping
    public ResponseEntity<List<ItemResponse>> listAll(@RequestParam(value = "ownerId", required = false) String ownerId) {
        if (ownerId != null) return ResponseEntity.ok(itemService.listByOwner(ownerId));
        return ResponseEntity.ok(itemService.listAll());
    }

    @PutMapping("/{id}")
    public ResponseEntity<ItemResponse> update(@PathVariable Long id, @RequestBody @Validated ItemRequest request) {
        return ResponseEntity.ok(itemService.update(id, request));
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> delete(@PathVariable Long id) {
        itemService.delete(id);
        return ResponseEntity.noContent().build();
    }

    @PostMapping("/{id}/claim")
    public ResponseEntity<ItemResponse> claim(@PathVariable Long id) {
        return ResponseEntity.ok(itemService.markClaimed(id));
    }
}
