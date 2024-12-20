package ntou.cse.backend.ClassroomApply.service;

import ntou.cse.backend.ClassroomApply.exception.UserBannedException;
import ntou.cse.backend.ClassroomApply.model.ClassroomApply;
import ntou.cse.backend.ClassroomApply.repo.ClassroomApplyRepository;
import ntou.cse.backend.UserInformation.model.User;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import java.time.LocalDateTime;
import java.util.List;
import java.util.Optional;

@Service
public class ClassroomApplyService {

    @Autowired
    private ClassroomApplyRepository classroomApplyRepository;



    public void createApplication(String floor, String classroomCode, LocalDateTime startTime, LocalDateTime endTime, String borrower, User targetUser) {
        if (startTime.isAfter(endTime)) {
            throw new IllegalArgumentException("Start time cannot be after end time.");
        }
        // System.out.println(targetUser.getIsBanned());
        if (targetUser.getIsBanned()) {
            throw new UserBannedException("User is banned. Should not apply classroom.");
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

    public ClassroomApply updateApplicationApprovalStatus(String id, Boolean isApproved) {
        Optional<ClassroomApply> applicationOptional = classroomApplyRepository.findById(id);
        if (applicationOptional.isPresent()) {
            ClassroomApply application = applicationOptional.get();
            application.setApproved(isApproved);

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
