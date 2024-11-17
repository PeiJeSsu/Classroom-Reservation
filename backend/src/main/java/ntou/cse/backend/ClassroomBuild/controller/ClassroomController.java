package ntou.cse.backend.ClassroomBuild.controller;

import ntou.cse.backend.ClassroomBuild.model.Classroom;
import ntou.cse.backend.ClassroomBuild.service.ClassroomInitService;
import ntou.cse.backend.ClassroomBuild.service.ClassroomService;
import jakarta.annotation.PostConstruct;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Set;

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

    @GetMapping("/all")
    public List<Classroom> getAllClassrooms() {
        return classroomService.getAllClassrooms();
    }

    @GetMapping("/floors")
    public List<String> getAllFloors() {
        return classroomService.getAllFloors();
    }

    @GetMapping("/floor/{floor}")
    public List<Classroom> getClassroomsByFloor(@PathVariable String floor) {
        return classroomService.getClassroomsByFloor(floor);
    }

    @GetMapping("/room/{roomNumber}")
    public Classroom getClassroomByRoomNumber(@PathVariable String roomNumber) {
        return classroomService.getClassroomByRoomNumber(roomNumber);
    }

    @GetMapping("/search")
    public List<Classroom> searchClassroomsByKeyword(@RequestParam String keyword) {
        return classroomService.searchClassroomsByKeyword(keyword);
    }
}

