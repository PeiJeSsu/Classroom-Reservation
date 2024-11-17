package ntou.cse.backend.ClassroomApply.repo;

import ntou.cse.backend.ClassroomApply.model.ClassroomApply;
import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.stereotype.Repository;
import java.time.LocalDateTime;
import java.util.List;

@Repository
public interface ClassroomApplyRepository extends MongoRepository<ClassroomApply, String> {
    List<ClassroomApply> findByFloorAndClassroomAndStartTimeBetweenAndIsApprovedTrue(String floor, String classroom, LocalDateTime startTime, LocalDateTime endTime);

    List<ClassroomApply> findByFloorAndClassroomAndIsApprovedTrueAndStartTimeBeforeAndEndTimeAfter(
            String floor, String classroom, LocalDateTime endTime, LocalDateTime startTime);

    List<ClassroomApply> findByIsApprovedNull();
}
