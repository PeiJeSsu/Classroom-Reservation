package ntou.cse.backend.ClassroomApply.service;

import ntou.cse.backend.ClassroomApply.model.ClassroomApply;
import ntou.cse.backend.ClassroomApply.repo.ClassroomApplyRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;

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
}
