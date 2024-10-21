package ntou.cse.backend.ClassroomBuild.controller;

import ntou.cse.backend.ClassroomBuild.service.ClassroomService;
import jakarta.annotation.PostConstruct;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.RestController;

@RestController
public class ClassroomController {
    @Autowired
    private ClassroomService classroomService;

    @PostConstruct
    public void initializeClassrooms() {
        classroomService.initClassrooms();
    }
}

