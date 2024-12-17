package ntou.cse.backend.ClassroomStatus.service;

import ntou.cse.backend.ClassroomStatus.model.ClassroomStatus;
import ntou.cse.backend.ClassroomStatus.repo.ClassroomStatusRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import java.time.LocalDateTime;
import java.util.List;
import java.util.Optional;

@Service
public class ClassroomStatusService {

    @Autowired
    private ClassroomStatusRepository classroomStatusRepository;

    public void updateClassroomStatus(String floor, String classroomCode, LocalDateTime startTime, LocalDateTime endTime) {
        if (startTime.isAfter(endTime)) {
            throw new IllegalArgumentException("Start time cannot be after end time.");
        }

        // 先檢查該時間段內是否已經有教室被借用
        List<ClassroomStatus> conflictingStatuses = classroomStatusRepository.findByFloorAndClassroomAndStatusAndStartTimeBeforeAndEndTimeAfter(
                floor, classroomCode, "borrowed", endTime, startTime);

        // 如果已有借用紀錄，則拋出異常
        if (!conflictingStatuses.isEmpty()) {
            throw new IllegalStateException("The classroom is already borrowed.");
        }

        // 沒有衝突則創建新的借用狀態
        ClassroomStatus classroomStatus = new ClassroomStatus();
        classroomStatus.setFloor(floor);
        classroomStatus.setClassroom(classroomCode);
        classroomStatus.setStartTime(startTime);
        classroomStatus.setEndTime(endTime);
        classroomStatus.setStatus("borrowed");

        // 保存新的教室借用狀態
        classroomStatusRepository.save(classroomStatus);
    }

    // 查詢所有教室狀態
    public List<ClassroomStatus> getAllClassroomStatuses() {
        return classroomStatusRepository.findAll();
    }

    // 查詢特定教室的所有借用紀錄
    public List<ClassroomStatus> getClassroomStatusByClassroomAndTime(String floor, String classroomCode, LocalDateTime startTime, LocalDateTime endTime) {
        return classroomStatusRepository.findByFloorAndClassroomAndStartTimeBetweenAndStatus(floor, classroomCode, startTime, endTime, "borrowed");
    }

    // 查詢指定ID的教室狀態
    public ClassroomStatus getClassroomStatusById(String id) {
        Optional<ClassroomStatus> classroomStatus = classroomStatusRepository.findById(id);
        return classroomStatus.orElse(null);
    }

    // 更新教室的狀態 (例如解除借用狀態等)
    public ClassroomStatus updateClassroomStatus(String id, String status) {
        Optional<ClassroomStatus> classroomStatusOptional = classroomStatusRepository.findById(id);
        if (classroomStatusOptional.isPresent()) {
            ClassroomStatus classroomStatus = classroomStatusOptional.get();
            classroomStatus.setStatus(status);
            return classroomStatusRepository.save(classroomStatus);
        }
        return null;
    }
}
