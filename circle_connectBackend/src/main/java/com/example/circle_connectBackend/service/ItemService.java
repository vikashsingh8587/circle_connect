package com.example.circle_connectBackend.service;

import com.example.circle_connectBackend.dto.ItemRequest;
import com.example.circle_connectBackend.dto.ItemResponse;
import com.example.circle_connectBackend.mapper.ItemMapper;
import com.example.circle_connectBackend.models.Item;
import com.example.circle_connectBackend.models.ItemStatus;
import com.example.circle_connectBackend.models.User;
import com.example.circle_connectBackend.repository.ItemRepository;
import com.example.circle_connectBackend.repository.userRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.stream.Collectors;

@Service
@Transactional
@RequiredArgsConstructor
public class ItemService {

    private final ItemRepository itemRepository;
    private final userRepository userRepository;

    public ItemResponse create(ItemRequest request) {
        User owner = userRepository.findById(request.getOwnerId())
                .orElseThrow(() -> new IllegalArgumentException("Owner not found with id: " + request.getOwnerId()));

        Item item = ItemMapper.toEntity(request, owner);
        item.setStatus(ItemStatus.AVAILABLE);
        Item saved = itemRepository.save(item);
        return ItemMapper.toDto(saved);
    }

    public ItemResponse getById(Long id) {
        Item item = itemRepository.findById(id)
                .orElseThrow(() -> new IllegalArgumentException("Item not found with id: " + id));
        return ItemMapper.toDto(item);
    }

    public List<ItemResponse> listAll() {
        return itemRepository.findAll().stream()
                .map(ItemMapper::toDto)
                .collect(Collectors.toList());
    }

    public List<ItemResponse> listByOwner(String ownerId) {
        return itemRepository.findByOwnerId(ownerId).stream()
                .map(ItemMapper::toDto)
                .collect(Collectors.toList());
    }

    public ItemResponse update(Long id, ItemRequest request) {
        Item existing = itemRepository.findById(id)
                .orElseThrow(() -> new IllegalArgumentException("Item not found with id: " + id));

        if (request.getOwnerId() != null) {
            User newOwner = userRepository.findById(request.getOwnerId())
                    .orElseThrow(() -> new IllegalArgumentException("Owner not found with id: " + request.getOwnerId()));
            existing.setOwner(newOwner);
        }

        ItemMapper.updateEntityFromRequest(existing, request);
        Item saved = itemRepository.save(existing);
        return ItemMapper.toDto(saved);
    }

    public void delete(Long id) {
        if (!itemRepository.existsById(id)) {
            throw new IllegalArgumentException("Item not found with id: " + id);
        }
        itemRepository.deleteById(id);
    }

    // small helper: mark claimed
    public ItemResponse markClaimed(Long id) {
        Item existing = itemRepository.findById(id)
                .orElseThrow(() -> new IllegalArgumentException("Item not found with id: " + id));
        existing.setStatus(ItemStatus.CLAIMED);
        return ItemMapper.toDto(itemRepository.save(existing));
    }
}
