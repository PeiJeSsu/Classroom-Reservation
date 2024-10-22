package com.example.approvalapplication;
import com.example.approvalapplication.ClassroomRequest;
import com.example.approvalapplication.ClassroomRequestService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("/api/classroom")
public class ClassroomRequestController {

    @Autowired
    private ClassroomRequestService service;

    @GetMapping("/requests")
    public List<ClassroomRequest> getAllRequests() {
        return service.getAllRequests();
    }

    @GetMapping("/requests/{id}")
    public Optional<ClassroomRequest> getRequestById(@PathVariable String id) {
        return service.getRequestById(id);
    }

    @PostMapping("/requests")
    public ClassroomRequest submitRequest(@RequestBody ClassroomRequest request) {
        return service.submitRequest(request);
    }

    @PutMapping("/requests/{id}/approve")
    public void approveRequest(@PathVariable String id) {
        service.approveRequest(id);
    }

    @PutMapping("/requests/{id}/disapprove")
    public void disapproveRequest(@PathVariable String id) {
        service.disapproveRequest(id);
    }
}