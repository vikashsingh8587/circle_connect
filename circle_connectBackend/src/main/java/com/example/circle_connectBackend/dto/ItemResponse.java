package com.example.circle_connectBackend.dto;

import lombok.*;
import java.math.BigDecimal;
import java.time.Instant;

@Getter @Setter @NoArgsConstructor @AllArgsConstructor @Builder
public class ItemResponse {
    private Long id;
    private String title;
    private String description;
    private String category;
    private String condition;
    private BigDecimal price;
    private Long ownerId;
    private String status;
    private Boolean allowPickup;
    private String pickupLocation;
    private Instant createdAt;
    private Instant updatedAt;
}
