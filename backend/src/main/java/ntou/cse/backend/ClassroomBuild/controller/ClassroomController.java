package ntou.cse.backend.ClassroomBuild.controller;

import jakarta.annotation.PostConstruct;
import ntou.cse.backend.ClassroomBuild.model.Classroom;
import ntou.cse.backend.ClassroomBuild.service.ClassroomInitService;
import ntou.cse.backend.ClassroomBuild.service.ClassroomService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/classroom_build")
public class ClassroomController {
    @Autowired
    private ClassroomInitService classroomInitService;

    @Autowired
    private ClassroomService classroomService;

    @PostConstruct
    public void initializeClassrooms() {
        classroomInitService.initClassrooms();
    }

    @GetMapping("/floor")
    public List<String> getAllFloors() {
        return classroomService.getAllFloor();
    }

    @GetMapping("/floor/{floor}")
    public List<Classroom> getClassroomsByFloor(@PathVariable String floor) {
        return classroomService.getClassroomsByFloor(floor);
    }

    @GetMapping("/search")
    public List<Classroom> searchClassrooms(
            @RequestParam(required = false) String floor,
            @RequestParam(required = false) String classroomCode,
            @RequestParam(required = false) String searchQuery) {

        return classroomService.searchClassrooms(floor, classroomCode, searchQuery);
    }
}
