package ntou.cse.backend.ClassroomBuild.controller;

import ntou.cse.backend.ClassroomBuild.exception.ClassroomAlreadyBannedLongerException;
import ntou.cse.backend.ClassroomBuild.model.Classroom;
import ntou.cse.backend.ClassroomBuild.service.ClassroomInitService;
import ntou.cse.backend.ClassroomBuild.service.ClassroomService;
import jakarta.annotation.PostConstruct;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
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

    @PatchMapping("/{id}/update-status")
    public Classroom updateKeyStatusAndBorrower(
            @PathVariable String id,
            @RequestParam Classroom.KeyStatus keyStatus,
            @RequestParam(required = false) String borrower,
            @RequestParam(required = false) String borrowerRole) {
        Classroom updatedClassroom = classroomService.updateKeyStatusAndBorrower(id, keyStatus, borrower, borrowerRole);
        if (updatedClassroom == null) {
            throw new IllegalArgumentException("Classroom not found with id: " + id);
        }
        return updatedClassroom;
    }

    @PatchMapping("/{roomNumber}/ban")
    public ResponseEntity<Object> banClassroom(
            @PathVariable String roomNumber,
            @RequestParam Integer unbanTime) {
        try {
            Classroom bannedClassroom = classroomService.banClassroomByRoomNumber(roomNumber, unbanTime);
            if (bannedClassroom != null) {
                return ResponseEntity.ok(bannedClassroom);
            } else {
                return ResponseEntity.status(404).body(null);
            }
        } catch (ClassroomAlreadyBannedLongerException e) {
            return ResponseEntity.status(400).body(e.getMessage());
        } catch (Exception e) {
            return ResponseEntity.status(500).body(null);
        }
    }

    @PatchMapping("/{roomNumber}/unban")
    public Classroom unbanClassroom(@PathVariable String roomNumber) {
        Classroom unbannedClassroom = classroomService.unbanClassroomByRoomNumber(roomNumber);
        if (unbannedClassroom == null) {
            throw new IllegalArgumentException("Classroom not found with room number: " + roomNumber);
        }
        return unbannedClassroom;
    }

    @PatchMapping("/unban-all")
    public List<Classroom> unbanAllClassrooms() {
        return classroomService.unbanAllClassrooms();
    }
}
