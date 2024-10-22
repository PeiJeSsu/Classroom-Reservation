package ntou.cse.backend.ClassroomApply.controller;

import ntou.cse.backend.ClassroomApply.service.ClassroomApplyService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.format.annotation.DateTimeFormat;
import org.springframework.web.bind.annotation.*;

import java.time.LocalDateTime;

@RestController
@RequestMapping("/api/classroom_apply")
public class ClassroomApplyController {

    @Autowired
    private ClassroomApplyService classroomApplyService;

    @PostMapping("/apply")
    public void applyForClassroom(@RequestParam String floor,
                                  @RequestParam String roomNumber,
                                  @RequestParam @DateTimeFormat(iso = DateTimeFormat.ISO.DATE_TIME) LocalDateTime time) {

        classroomApplyService.createApplication(floor, roomNumber, time);
    }
}
