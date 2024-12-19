package ntou.cse.backend.ClassroomStatus.controller;

import ntou.cse.backend.ClassroomStatus.model.ClassroomStatus;
import ntou.cse.backend.ClassroomStatus.service.ClassroomStatusService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.format.annotation.DateTimeFormat;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.*;
import org.springframework.http.ResponseEntity;
import java.time.LocalDateTime;
import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/api/classroom_status")
public class ClassroomStatusController {

    @Autowired
    private ClassroomStatusService classroomStatusService;

    @PostMapping("/update")
    public ResponseEntity<String> updateClassroomStatus(@RequestParam String floor,
                                                        @RequestParam String classroomCode,
                                                        @RequestParam @DateTimeFormat(iso = DateTimeFormat.ISO.DATE_TIME) LocalDateTime startTime,
                                                        @RequestParam @DateTimeFormat(iso = DateTimeFormat.ISO.DATE_TIME) LocalDateTime endTime) {
        try {
            classroomStatusService.updateClassroomStatus(floor, classroomCode, startTime, endTime);
            return new ResponseEntity<>("Classroom status updated successfully", HttpStatus.OK);
        } catch (IllegalArgumentException | IllegalStateException ex) {
            return new ResponseEntity<>(ex.getMessage(), HttpStatus.BAD_REQUEST);
        } catch (Exception ex) {
            return new ResponseEntity<>("An unexpected error occurred", HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    @GetMapping("/statusNow")
    public ResponseEntity<Map<String, String>> getAllClassroomStatusNow() {
        // 從服務層獲取教室狀態
        Map<String, String> classroomStatusMap = classroomStatusService.getClassroomStatusesNow();

        // 使用 println 顯示結果
        System.out.println("目前教室狀態：");
        classroomStatusMap.forEach((key, value) ->
                System.out.println("教室編號: " + key + " -> 狀態: " + value)
        );

        // 返回 HTTP 響應
        return new ResponseEntity<>(classroomStatusMap, HttpStatus.OK);
    }

    @GetMapping("/search")
    public List<ClassroomStatus> getClassroomStatusByClassroomAndTime(
            @RequestParam String floor,
            @RequestParam String classroomCode,
            @RequestParam @DateTimeFormat(iso = DateTimeFormat.ISO.DATE_TIME) LocalDateTime startTime,
            @RequestParam @DateTimeFormat(iso = DateTimeFormat.ISO.DATE_TIME) LocalDateTime endTime) {

        return classroomStatusService.getClassroomStatusByClassroomAndTime(floor, classroomCode, startTime, endTime);
    }

    @GetMapping("/{id}")
    public ClassroomStatus getClassroomStatusById(@PathVariable String id) {
        return classroomStatusService.getClassroomStatusById(id);
    }

    @PutMapping("/{id}/updateStatus")
    public ResponseEntity<ClassroomStatus> updateClassroomStatus(@PathVariable String id, @RequestParam String status) {
        ClassroomStatus updatedStatus = classroomStatusService.updateClassroomStatus(id, status);
        if (updatedStatus != null) {
            return new ResponseEntity<>(updatedStatus, HttpStatus.OK);
        } else {
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        }
    }
}