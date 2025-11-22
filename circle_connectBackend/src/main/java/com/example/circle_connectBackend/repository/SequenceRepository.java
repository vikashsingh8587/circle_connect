package com.example.circle_connectBackend.repository;

import com.example.circle_connectBackend.models.Sequence;
import org.springframework.data.jpa.repository.JpaRepository;

public interface SequenceRepository extends JpaRepository<Sequence, String> {
}
