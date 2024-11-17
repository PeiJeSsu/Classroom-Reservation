package ntou.cse.backend.ClassroomBuild.service;

import ntou.cse.backend.ClassroomBuild.model.Classroom;
import ntou.cse.backend.ClassroomBuild.repo.ClassroomRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Set;
import java.util.stream.Collectors;

@Service
public class ClassroomService {

    @Autowired
    private ClassroomRepository classroomRepository;

    public List<Classroom> getAllClassrooms() {
        return classroomRepository.findAll();
    }

    public List<String> getAllFloors() {
        Set<String> floors = classroomRepository.findAll().stream()
                .map(Classroom::getFloor)
                .collect(Collectors.toSet());

        // 自定義排序邏輯，將英文樓層放在數字樓層前
        return floors.stream()
                .sorted((f1, f2) -> {
                    boolean isF1Numeric = f1.matches("\\d+");
                    boolean isF2Numeric = f2.matches("\\d+");

                    // 如果 f1 是數字而 f2 是英文，f2 應排在前面
                    if (isF1Numeric && !isF2Numeric) {
                        return 1;
                    }
                    // 如果 f2 是數字而 f1 是英文，f1 應排在前面
                    if (!isF1Numeric && isF2Numeric) {
                        return -1;
                    }
                    // 都是數字或都是英文，按自然順序排序
                    return f1.compareTo(f2);
                })
                .collect(Collectors.toList());
    }


    public List<Classroom> getClassroomsByFloor(String floor) {
        return classroomRepository.findByFloor(floor);
    }

    public Classroom getClassroomByRoomNumber(String roomNumber) {
        return classroomRepository.findByRoomNumber(roomNumber).orElse(null);
    }

    public List<Classroom> searchClassroomsByKeyword(String keyword) {
        return classroomRepository.findByFloorContainingOrRoomNumberContaining(keyword, keyword);
    }
}
