package ntou.cse.backend.controller;

import ntou.cse.backend.service.ClassroomService;
import jakarta.annotation.PostConstruct;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.RestController;

@RestController
public class ClassroomController {
    @Autowired
    private ClassroomService classroomService;

    @PostConstruct
    public String initializeClassrooms() {
        classroomService.initClassrooms();
        return "Classrooms initialized";
    }
}

