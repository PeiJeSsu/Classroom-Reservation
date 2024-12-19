package ntou.cse.backend.ClassroomApply.service;

import ntou.cse.backend.ClassroomApply.model.ClassroomApply;
import ntou.cse.backend.ClassroomApply.repo.ClassroomApplyRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import java.time.LocalDateTime;
import java.util.List;
import java.util.Optional;

@Service
public class ClassroomApplyService {

    @Autowired
    private ClassroomApplyRepository classroomApplyRepository;

    public void createApplication(String floor, String classroomCode, LocalDateTime startTime, LocalDateTime endTime, String borrower) {
        if (startTime.isAfter(endTime)) {
            throw new IllegalArgumentException("Start time cannot be after end time.");
        }

        List<ClassroomApply> conflictingApplications = classroomApplyRepository.findByFloorAndClassroomAndIsApprovedTrueAndStartTimeBeforeAndEndTimeAfter(
                floor, classroomCode, endTime, startTime);

        if (!conflictingApplications.isEmpty()) {
            throw new IllegalStateException("The classroom is already booked and approved during the requested time.");
        }

        ClassroomApply application = new ClassroomApply();
        application.setFloor(floor);
        application.setClassroom(classroomCode);
        application.setStartTime(startTime);
        application.setEndTime(endTime);
        application.setBorrower(borrower);
        application.setApproved(null);

        classroomApplyRepository.save(application);
    }

    public List<ClassroomApply> getAllApplications() {
        return classroomApplyRepository.findAll();
    }

    public List<ClassroomApply> getAllPendingApplications() {
        return classroomApplyRepository.findByIsApprovedNull();
    }

    public ClassroomApply getApplicationById(String id) {
        Optional<ClassroomApply> application = classroomApplyRepository.findById(id);
        return application.orElse(null);
    }

    public ClassroomApply updateApplicationApprovalStatus(String id, Boolean isApproved, String reason) {
        Optional<ClassroomApply> applicationOptional = classroomApplyRepository.findById(id);
        if (applicationOptional.isPresent()) {
            ClassroomApply application = applicationOptional.get();
            application.setApproved(isApproved);
            if (!isApproved && reason != null && !reason.isEmpty()) {
                application.setDenyReason(reason); // 設置拒絕理由
            } else if (isApproved) {
                application.setDenyReason(null); // 批准時清除拒絕理由
            }
            return classroomApplyRepository.save(application);
        }
        return null;
    }

    public List<ClassroomApply> findApplicationsByClassroomAndTime(String floor, String classroom, LocalDateTime startTime, LocalDateTime endTime) {
        return classroomApplyRepository.findByFloorAndClassroomAndStartTimeBetweenAndIsApprovedTrue(floor, classroom, startTime, endTime);
    }
    public List<ClassroomApply> findApplicationsByBorrower(String borrower) {
        return classroomApplyRepository.findByBorrower(borrower);
    }
}
