package com.example.approvalapplication;
import com.example.approvalapplication.ClassroomRequest;
import com.example.approvalapplication.ClassroomRequestRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class ClassroomRequestService {

    @Autowired
    private ClassroomRequestRepository repository;

    public List<ClassroomRequest> getAllRequests() {
        return repository.findAll();
    }

    public Optional<ClassroomRequest> getRequestById(String id) {
        return repository.findById(id);
    }

    public ClassroomRequest submitRequest(ClassroomRequest request) {
        return repository.save(request);
    }

    public void approveRequest(String id) {
        Optional<ClassroomRequest> request = repository.findById(id);
        if (request.isPresent()) {
            ClassroomRequest classroomRequest = request.get();
            classroomRequest.setApproved(true);
            repository.save(classroomRequest);
        }
    }

    public void disapproveRequest(String id) {
        Optional<ClassroomRequest> request = repository.findById(id);
        if (request.isPresent()) {
            ClassroomRequest classroomRequest = request.get();
            classroomRequest.setApproved(false);
            repository.save(classroomRequest);
        }
    }
}