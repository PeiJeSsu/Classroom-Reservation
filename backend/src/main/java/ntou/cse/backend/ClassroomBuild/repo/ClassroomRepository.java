package ntou.cse.backend.ClassroomBuild.repo;

import ntou.cse.backend.ClassroomBuild.model.Classroom;
import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.data.mongodb.repository.Query;

import java.util.List;

public interface ClassroomRepository extends MongoRepository<Classroom, String> {
    List<Classroom> findByFloorAndRoomNumber(String floor, String roomNumber);
    List<Classroom> findByFloor(String floor);
    List<Classroom> findByRoomNumber(String roomNumber);
    List<Classroom> findByRoomNumberContaining(String roomNumber);
    List<Classroom> findByFloorAndRoomNumberContaining(String floor, String roomNumber);
    @Query(value = "{}", fields = "{'floor' : 1}")
    List<Classroom> findAllFloors();
}
