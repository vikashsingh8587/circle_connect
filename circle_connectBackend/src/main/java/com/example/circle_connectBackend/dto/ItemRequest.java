package com.example.circle_connectBackend.dto;

import lombok.*;

import java.math.BigDecimal;

@Getter @Setter @NoArgsConstructor @AllArgsConstructor @Builder
public class ItemRequest {


    private String title;

    private String description;

    private String category;

    private String condition;


    private BigDecimal price;


    private Long ownerId;

    private Boolean allowPickup = true;

    private String pickupLocation;
}
