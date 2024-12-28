package ntou.cse.backend.ClassroomApply.controller;

import ntou.cse.backend.ClassroomApply.exception.UserBannedException;
import ntou.cse.backend.ClassroomApply.model.ClassroomApply;
import ntou.cse.backend.ClassroomApply.service.ClassroomApplyService;
import ntou.cse.backend.ClassroomBuild.service.ClassroomService;
import ntou.cse.backend.UserInformation.model.User;
import ntou.cse.backend.UserInformation.service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.format.annotation.DateTimeFormat;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.*;
import org.springframework.http.ResponseEntity;
import java.time.LocalDateTime;
import java.time.OffsetDateTime;
import java.time.format.DateTimeFormatter;
import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/api/classroom_apply")
public class ClassroomApplyController {

    @Autowired
    private ClassroomApplyService classroomApplyService;
    @Autowired
    private UserService userService;
    @Autowired
    private ClassroomService classroomService;

    @PostMapping("/apply")
    public ResponseEntity<String> applyForClassroom(@RequestBody ClassroomApply request) {
        try {
            validateRequest(request);

            User targetUser = userService.getUserByEmail(request.getBorrower());
            if (targetUser == null) {
                throw new IllegalArgumentException("無法找到該借用者的電子郵件！");
            }

            LocalDateTime unbanTime = classroomService.getUnbanTimeByRoomNumber(request.getClassroom());
            classroomApplyService.createApplication(
                    request.getFloor(),
                    request.getClassroom(),
                    request.getStartTime(),
                    request.getEndTime(),
                    request.getBorrower().split("@")[0],
                    targetUser,
                    unbanTime
            );

            return ResponseEntity.ok("申請成功！");
        } catch (IllegalArgumentException | IllegalStateException ex) {
            return ResponseEntity.badRequest().body("申請失敗：" + ex.getMessage());
        } catch (UserBannedException ex) {
            return ResponseEntity.status(HttpStatus.FORBIDDEN).body("禁用錯誤：" + ex.getMessage());
        } catch (Exception ex) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("發生未知錯誤：" + ex.getMessage());
        }
    }

    private void validateRequest(ClassroomApply request) {
        if (request.getFloor() == null || request.getClassroom() == null || request.getBorrower() == null) {
            throw new IllegalArgumentException("缺少必要欄位：樓層、教室代碼或借用者！");
        }

        if (request.getStartTime().isAfter(request.getEndTime())) {
            throw new IllegalArgumentException("開始時間不能晚於結束時間！");
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
    public ClassroomApply denyApplication(@PathVariable String id, @RequestBody Map<String, String> requestBody) {
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
    @GetMapping("/borrower/{borrower}")
    public List<ClassroomApply> getApplicationsByBorrower(@PathVariable String borrower) {
        return classroomApplyService.findApplicationsByBorrower(borrower);
    }

}
