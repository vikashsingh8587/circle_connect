circle_connectBackend/
│
├── src/
│   ├── main/
│   │   ├── java/
│   │   │   └── com/example/circle_connectBackend/
│   │   │       ├── CircleConnectBackendApplication.java
│   │   │
│   │   │       ├── config/                # Security, JWT, CORS configs
│   │   │       │   ├── SecurityConfig.java
│   │   │       │   ├── JwtFilter.java
│   │   │       │   └── JwtUtils.java
│   │   │
│   │   │       ├── controller/            # All REST controllers
│   │   │       │   ├── AuthController.java
│   │   │       │   ├── UserController.java
│   │   │       │   ├── ItemController.java
│   │   │       │   ├── CartController.java
│   │   │       │   ├── ClaimRequestController.java
│   │   │       │   ├── MessageController.java
│   │   │       │   └── NotificationController.java
│   │   │
│   │   │       ├── service/               # Business logic layer
│   │   │       │   ├── UserService.java
│   │   │       │   ├── ItemService.java
│   │   │       │   ├── CartService.java
│   │   │       │   ├── ClaimRequestService.java
│   │   │       │   ├── MessageService.java
│   │   │       │   └── NotificationService.java
│   │   │
│   │   │       ├── repository/            # JpaRepository interfaces
│   │   │       │   ├── UserRepository.java
│   │   │       │   ├── ItemRepository.java
│   │   │       │   ├── ItemImageRepository.java
│   │   │       │   ├── CartItemRepository.java
│   │   │       │   ├── ClaimRequestRepository.java
│   │   │       │   ├── TransactionHistoryRepository.java
│   │   │       │   ├── MessageRepository.java
│   │   │       │   └── NotificationRepository.java
│   │   │
│   │   │       ├── model/                 # ALL Entity classes + enums
│   │   │       │   ├── User.java
│   │   │       │   ├── Role.java
│   │   │       │   ├── Item.java
│   │   │       │   ├── ItemImage.java
│   │   │       │   ├── Category.java
│   │   │       │   ├── CartItem.java
│   │   │       │   ├── ClaimRequest.java
│   │   │       │   ├── TransactionHistory.java
│   │   │       │   ├── Message.java
│   │   │       │   ├── Notification.java
│   │   │       │   ├── ItemStatus.java
│   │   │       │   ├── ViewType.java
│   │   │       │   ├── ClaimStatus.java
│   │   │       │   └── NotificationType.java
│   │   │
│   │   │       ├── dto/                   # Request/response payloads
│   │   │       │   ├── LoginRequest.java
│   │   │       │   ├── RegisterRequest.java
│   │   │       │   ├── ItemRequest.java
│   │   │       │   ├── CartRequest.java
│   │   │       │   └── MessageRequest.java
│   │   │
│   │   │       ├── exception/             # Global exception handler
│   │   │       │   ├── GlobalExceptionHandler.java
│   │   │       │   └── ResourceNotFoundException.java
│   │   │
│   │   │       └── util/                  # Utility classes
│   │   │           └── FileUploadUtil.java
│   │   │
│   │   ├── resources/
│   │   │   ├── application.properties     # DB + JPA + JWT config
│   │   │   └── static/                    # Static files (optional)
│   │   │
│   │   └── webapp/
│   │       └── (optional JSP if needed)
│   │
│   └── test/
│       └── java/
│           └── com/example/circle_connectBackend/
│               └── (unit tests)
│
├── pom.xml
└── README.md
