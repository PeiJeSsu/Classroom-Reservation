package ntou.cse.backend.ClassroomStatus.repo;

import ntou.cse.backend.ClassroomStatus.model.ClassroomStatus;
import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.stereotype.Repository;
import java.time.LocalDateTime;
import java.util.List;

@Repository
public interface ClassroomStatusRepository extends MongoRepository<ClassroomStatus, String> {

    // 查詢指定樓層、教室在某段時間內的狀態
    List<ClassroomStatus> findByFloorAndClassroomAndStartTimeBetweenAndStatus(
            String floor, String classroom, LocalDateTime startTime, LocalDateTime endTime, String status);

    // 查詢指定樓層、教室的狀態，且時間重疊的情況
    List<ClassroomStatus> findByFloorAndClassroomAndStatusAndStartTimeBeforeAndEndTimeAfter(
            String floor, String classroom, String status, LocalDateTime endTime, LocalDateTime startTime);

    // 查詢狀態為 null 的記錄
    List<ClassroomStatus> findByStatusNull();
}
