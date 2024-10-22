package ntou.cse.backend.ClassroomBuild.service;

import ntou.cse.backend.ClassroomBuild.model.Classroom;
import ntou.cse.backend.ClassroomBuild.repo.ClassroomRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class ClassroomService {

    @Autowired
    private ClassroomRepository classroomRepository;

    public List<Classroom> getAllClassrooms() {
        return classroomRepository.findAll();
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
