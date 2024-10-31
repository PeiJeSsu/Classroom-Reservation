package ntou.cse.backend.ClassroomBuild.service;

import ntou.cse.backend.ClassroomBuild.model.Classroom;
import ntou.cse.backend.ClassroomBuild.repo.ClassroomRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.Collections;
import java.util.List;
import java.util.stream.Collectors;

@Service
public class ClassroomService {

    @Autowired
    private ClassroomRepository classroomRepository;

    public List<String> getAllFloor() {
        List<Classroom> classrooms = classroomRepository.findAllFloors();
        return classrooms.stream()
                .map(Classroom::getFloor)
                .distinct()
                .collect(Collectors.toList());
    }

    public List<Classroom> getClassroomsByFloor(String floor) {
        return classroomRepository.findByFloor(floor);
    }

    public List<Classroom> searchClassrooms(String floor, String classroomCode, String searchQuery) {
        if (searchQuery != null && !searchQuery.isEmpty()) {
            if (classroomCode != null && !classroomCode.isEmpty()) {
                if(classroomCode.contains(searchQuery)){
                    return classroomRepository.findByRoomNumber(classroomCode);
                } else {
                    return Collections.emptyList();
                }

            } else if (floor != null && !floor.isEmpty()) {
                return classroomRepository.findByFloorAndRoomNumberContaining(floor, searchQuery);
            } else {
                return classroomRepository.findByRoomNumberContaining(searchQuery);
            }
        } else if (classroomCode != null && !classroomCode.isEmpty()) {
            // 完全匹配 `classroomCode`
            return classroomRepository.findByRoomNumber(classroomCode);
        } else if (floor != null && !floor.isEmpty()) {
            // 完全匹配 `floor`
            return classroomRepository.findByFloor(floor);
        } else {
            return classroomRepository.findAll();
        }
    }
}
