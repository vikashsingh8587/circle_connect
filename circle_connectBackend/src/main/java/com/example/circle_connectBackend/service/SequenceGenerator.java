package com.example.circle_connectBackend.service;

import com.example.circle_connectBackend.models.Sequence;
import com.example.circle_connectBackend.repository.SequenceRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class SequenceGenerator {

    @Autowired
    private SequenceRepository sequenceRepository;

    public long generateSequence(String role) {

        Sequence seq = sequenceRepository.findById(role)
                .orElseGet(() -> {
                    Sequence newSeq = new Sequence();
                    newSeq.setRole(role);
                    newSeq.setCount(0L);
                    return newSeq;
                });


        seq.setCount(seq.getCount() + 1);

        sequenceRepository.save(seq);

        return seq.getCount();
    }
}
