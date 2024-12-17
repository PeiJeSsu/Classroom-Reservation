package ntou.cse.backend.ClassroomApply.controller;

import ntou.cse.backend.ClassroomApply.model.ClassroomApply;
import ntou.cse.backend.ClassroomApply.service.ClassroomApplyService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.format.annotation.DateTimeFormat;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.*;
import org.springframework.http.ResponseEntity;
import java.time.LocalDateTime;
import java.util.List;

@RestController
@RequestMapping("/api/classroom_apply")
public class ClassroomApplyController {

    @Autowired
    private ClassroomApplyService classroomApplyService;

    @PostMapping("/apply")
    public ResponseEntity<String> applyForClassroom(@RequestParam String floor,
                                                    @RequestParam String classroomCode,
                                                    @RequestParam @DateTimeFormat(iso = DateTimeFormat.ISO.DATE_TIME) LocalDateTime startTime,
                                                    @RequestParam @DateTimeFormat(iso = DateTimeFormat.ISO.DATE_TIME) LocalDateTime endTime) {
        try {
            classroomApplyService.createApplication(floor, classroomCode, startTime, endTime);
            return new ResponseEntity<>("Application created successfully", HttpStatus.OK);
        } catch (IllegalArgumentException | IllegalStateException ex) {
                return new ResponseEntity<>(ex.getMessage(), HttpStatus.BAD_REQUEST);
        } catch (Exception ex) {
            return new ResponseEntity<>("An unexpected error occurred", HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    @GetMapping
    public List<ClassroomApply> getAllApplications() {
        return classroomApplyService.getAllApplications();
    }

    @GetMapping("/pending")
    public List<ClassroomApply> getAllPendingApplications() {
        return classroomApplyService.getAllPendingApplications();
    }

    @GetMapping("/{id}")
    public ClassroomApply getApplicationById(@PathVariable String id) {
        return classroomApplyService.getApplicationById(id);
    }

    @PutMapping("/{id}/approve")
    public ClassroomApply approveApplication(@PathVariable String id) {
        return classroomApplyService.updateApplicationApprovalStatus(id, true);
    }

    @PutMapping("/{id}/deny")
    public ClassroomApply denyApplication(@PathVariable String id) {
        return classroomApplyService.updateApplicationApprovalStatus(id, false);
    }

    @GetMapping("/search")
    public List<ClassroomApply> searchApplicationsByClassroomAndTime(
            @RequestParam String floor,
            @RequestParam String roomNumber,
            @RequestParam @DateTimeFormat(iso = DateTimeFormat.ISO.DATE_TIME) LocalDateTime startTime,
            @RequestParam @DateTimeFormat(iso = DateTimeFormat.ISO.DATE_TIME) LocalDateTime endTime) {

        return classroomApplyService.findApplicationsByClassroomAndTime(floor, roomNumber, startTime, endTime);
    }

}
