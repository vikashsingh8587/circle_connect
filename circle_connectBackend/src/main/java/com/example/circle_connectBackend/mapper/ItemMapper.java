package com.example.circle_connectBackend.mapper;

import com.example.circle_connectBackend.dto.ItemRequest;
import com.example.circle_connectBackend.dto.ItemResponse;
import com.example.circle_connectBackend.models.Item;

import com.example.circle_connectBackend.models.User;

public class ItemMapper {

    public static Item toEntity(ItemRequest req, User owner) {
        return Item.builder()
                .title(req.getTitle())
                .description(req.getDescription())
                .category(req.getCategory())
                .condition(req.getCondition())
                .price(req.getPrice())
                .owner(owner)
                .allowPickup(req.getAllowPickup() == null ? Boolean.TRUE : req.getAllowPickup())
                .pickupLocation(req.getPickupLocation())
                .build();
    }

    public static ItemResponse toDto(Item item) {
        return ItemResponse.builder()
                .id(item.getId())
                .title(item.getTitle())
                .description(item.getDescription())
                .category(item.getCategory())
                .condition(item.getCondition())
                .price(item.getPrice())
                .ownerId(item.getOwner() != null ? Long.valueOf(item.getOwner().getId()) : null)
                .status(item.getStatus() != null ? item.getStatus().name() : null)
                .allowPickup(item.getAllowPickup())
                .pickupLocation(item.getPickupLocation())
                .createdAt(item.getCreatedAt())
                .updatedAt(item.getUpdatedAt())
                .build();
    }

    public static void updateEntityFromRequest(Item existing, ItemRequest req) {
        if (req.getTitle() != null) existing.setTitle(req.getTitle());
        if (req.getDescription() != null) existing.setDescription(req.getDescription());
        if (req.getCategory() != null) existing.setCategory(req.getCategory());
        if (req.getCondition() != null) existing.setCondition(req.getCondition());
        if (req.getPrice() != null) existing.setPrice(req.getPrice());
        if (req.getAllowPickup() != null) existing.setAllowPickup(req.getAllowPickup());
        if (req.getPickupLocation() != null) existing.setPickupLocation(req.getPickupLocation());
    }
}
