package ntou.cse.backend.ClassroomApply.controller;

import ntou.cse.backend.ClassroomApply.model.ClassroomApply;
import ntou.cse.backend.ClassroomApply.service.ClassroomApplyService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.format.annotation.DateTimeFormat;
import org.springframework.web.bind.annotation.*;
import java.time.LocalDateTime;
import java.util.List;

@RestController
@RequestMapping("/api/classroom_apply")
public class ClassroomApplyController {

    @Autowired
    private ClassroomApplyService classroomApplyService;

    @PostMapping("/apply")
    public void applyForClassroom(@RequestParam String floor,
                                  @RequestParam String roomNumber,
                                  @RequestParam @DateTimeFormat(iso = DateTimeFormat.ISO.DATE_TIME) LocalDateTime startTime,
                                  @RequestParam @DateTimeFormat(iso = DateTimeFormat.ISO.DATE_TIME) LocalDateTime endTime) {

        classroomApplyService.createApplication(floor, roomNumber, startTime, endTime);
    }

    @GetMapping
    public List<ClassroomApply> getAllApplications() {
        return classroomApplyService.getAllApplications();
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
