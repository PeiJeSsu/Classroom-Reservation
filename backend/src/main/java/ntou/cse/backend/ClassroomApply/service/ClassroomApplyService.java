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

    public ClassroomApply createApplication(String floor, String classroom, LocalDateTime date) {
        ClassroomApply application = new ClassroomApply();
        application.setFloor(floor);
        application.setClassroom(classroom);
        application.setDate(date);
        application.setApproved(false);

        return classroomApplyRepository.save(application);
    }

    public List<ClassroomApply> getAllApplications() {
        return classroomApplyRepository.findAll();
    }

    public ClassroomApply getApplicationById(String id) {
        Optional<ClassroomApply> application = classroomApplyRepository.findById(id);
        return application.orElse(null);
    }

    public ClassroomApply updateApplicationApprovalStatus(String id, boolean isApproved) {
        Optional<ClassroomApply> applicationOptional = classroomApplyRepository.findById(id);
        if (applicationOptional.isPresent()) {
            ClassroomApply application = applicationOptional.get();
            application.setApproved(isApproved);
            return classroomApplyRepository.save(application);
        }
        return null;
    }

    public List<ClassroomApply> findApplicationsByClassroomAndTime(String floor, String classroom, LocalDateTime startTime, LocalDateTime endTime) {
        return classroomApplyRepository.findByFloorAndClassroomAndDateBetween(floor, classroom, startTime, endTime);
    }
}
